import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const { GITHUB_PERSONAL_ACCESS_TOKEN, KIMI_API_KEY, REPO_OWNER, REPO_NAME } = process.env;

const transport = new StdioClientTransport({
  command: "npx",
  args: ["-y", "@modelcontextprotocol/server-github"],
  env: { GITHUB_PERSONAL_ACCESS_TOKEN, PATH: process.env.PATH },
});
const mcp = new Client({ name: "briefing-agent", version: "1.0.0" }, { capabilities: {} });
await mcp.connect(transport);

async function callTool(name, args) {
  const res = await mcp.callTool({ name, arguments: args });
  return res.content?.[0]?.text ?? "";
}

async function getFile(path) {
  try {
    const raw = await callTool("get_file_contents", { owner: REPO_OWNER, repo: REPO_NAME, path });
    const parsed = JSON.parse(raw);
    if (parsed.content) return Buffer.from(parsed.content, "base64").toString("utf8");
    return raw;
  } catch {
    return "(no encontrado)";
  }
}

const commitsRaw = await callTool("list_commits", { owner: REPO_OWNER, repo: REPO_NAME, perPage: 10 });
let commitsSummary;
try {
  const commits = JSON.parse(commitsRaw);
  commitsSummary = commits.map((c) => `- ${c.sha.slice(0, 7)} ${c.commit.message.split("\n")[0]}`).join("\n");
} catch {
  commitsSummary = commitsRaw.slice(0, 1000);
}

const claudeMd = await getFile("CLAUDE.md");
const asistente = await getFile("prompts/asistente.md");

const systemPrompt = `Eres el analista del bot de WhatsApp de Jonathan (academia-bot).
Con los últimos commits del repo y su CLAUDE.md, escribe un briefing diario breve:
- Qué cambió recientemente (según los commits)
- Estado de la config del bot
- Cualquier pendiente detectado
- Recordatorio de las reglas permanentes: nunca prometer precio, fecha o descuento sin
  aprobación de Jonathan, y ningún mensaje sale sin su revisión.
Responde solo con el contenido en markdown, breve y directo.`;

const userPrompt = `Commits recientes:\n${commitsSummary}\n\nCLAUDE.md:\n${claudeMd}\n\nprompts/asistente.md:\n${asistente}`;

const completion = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${KIMI_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "moonshotai/kimi-k2",
    max_tokens: 800,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  }),
}).then((r) => r.json());

let briefing = completion.choices?.[0]?.message?.content ?? `(sin respuesta de Kimi: ${JSON.stringify(completion)})`;
briefing = briefing.trim().replace(/^```(?:markdown)?\n/, "").replace(/\n```$/, "");

const date = new Date().toISOString().slice(0, 10);
const branch = `briefing/${date}-${Date.now()}`;

await callTool("create_branch", { owner: REPO_OWNER, repo: REPO_NAME, branch, from_branch: "master" });
await callTool("push_files", {
  owner: REPO_OWNER,
  repo: REPO_NAME,
  branch,
  files: [{ path: "briefing.md", content: briefing }],
  message: `briefing: actualización automática ${date}`,
});
const pr = await callTool("create_pull_request", {
  owner: REPO_OWNER,
  repo: REPO_NAME,
  title: `Briefing diario ${date}`,
  head: branch,
  base: "master",
  body: "Generado automáticamente por el agente de cron (Kimi + MCP de GitHub).",
});

console.log("PR creado:", pr);

await mcp.close();
