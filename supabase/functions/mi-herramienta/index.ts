// Setup type definitions for built-in Supabase Runtime APIs
import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

const TOOLS = [
  {
    name: "buscar_cliente",
    description: "Busca en la memoria (Mem0) qué preguntó o pendiente tiene una clienta de academia-bot",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Nombre de la clienta o tema a buscar" },
      },
      required: ["query"],
    },
  },
  {
    name: "ultimos_commits",
    description: "Trae los últimos commits del repo academia-bot en GitHub",
    inputSchema: {
      type: "object",
      properties: {
        cantidad: { type: "number", description: "Cuántos commits traer (por defecto 5)" },
      },
    },
  },
  {
    name: "estado_bot",
    description: "Revisa si el bot de WhatsApp (whatsapp-bot) está vivo y contestando",
    inputSchema: { type: "object", properties: {} },
  },
];

async function buscarCliente(query: string, mem0Key: string) {
  const res = await fetch("https://api.mem0.ai/v1/memories/search/", {
    method: "POST",
    headers: {
      Authorization: `Token ${mem0Key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, user_id: "jonathan-academia-bot" }),
  });
  if (!res.ok) return `No se pudo buscar en Mem0 (status ${res.status})`;
  const data = await res.json();
  const results = Array.isArray(data) ? data : data.results ?? [];
  if (!results.length) return `Sin resultados en memoria para "${query}"`;
  return results
    .slice(0, 5)
    .map((r: { memory?: string; text?: string }) => `- ${r.memory ?? r.text}`)
    .join("\n");
}

async function ultimosCommits(cantidad: number, githubToken: string) {
  const res = await fetch(
    `https://api.github.com/repos/Jota399/academia-bot/commits?per_page=${cantidad}`,
    {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "academia-bot-mcp",
      },
    },
  );
  if (!res.ok) return `No se pudo leer GitHub (status ${res.status})`;
  const commits = await res.json();
  return commits
    .map((c: { commit: { message: string }; sha: string }) => `- ${c.sha.slice(0, 7)} ${c.commit.message.split("\n")[0]}`)
    .join("\n");
}

async function estadoBot() {
  const url = "https://zvsmbpmaonfettzpbuee.supabase.co/functions/v1/whatsapp-bot";
  try {
    const res = await fetch(url, { method: "POST", body: "" });
    return `whatsapp-bot respondió con status ${res.status} — ${res.status === 200 ? "en línea" : "revisar"}`;
  } catch (err) {
    return `whatsapp-bot no respondió: ${err}`;
  }
}

async function callTool(name: string, args: Record<string, unknown>) {
  const mem0Key = Deno.env.get("MEM0_API_KEY") ?? "";
  const githubToken = Deno.env.get("GITHUB_TOKEN") ?? "";

  switch (name) {
    case "buscar_cliente":
      return buscarCliente(String(args.query ?? ""), mem0Key);
    case "ultimos_commits":
      return ultimosCommits(Number(args.cantidad ?? 5), githubToken);
    case "estado_bot":
      return estadoBot();
    default:
      throw new Error(`Herramienta desconocida: ${name}`);
  }
}

export default {
  fetch: withSupabase({ auth: ["publishable", "secret"] }, async (req) => {
    const body = req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const { method, params, id } = body;

    if (method === "initialize") {
      return Response.json({
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: "2024-11-05",
          capabilities: { tools: {} },
          serverInfo: { name: "academia-bot-mcp", version: "1.0.0" },
        },
      });
    }

    if (method === "tools/list") {
      return Response.json({ jsonrpc: "2.0", id, result: { tools: TOOLS } });
    }

    if (method === "tools/call") {
      try {
        const text = await callTool(params?.name, params?.arguments ?? {});
        return Response.json({
          jsonrpc: "2.0",
          id,
          result: { content: [{ type: "text", text }] },
        });
      } catch (err) {
        return Response.json({
          jsonrpc: "2.0",
          id,
          error: { code: -32000, message: String(err) },
        });
      }
    }

    // Compatibilidad con el saludo original (curl simple sin JSON-RPC)
    const name = body.name ?? new URL(req.url).searchParams.get("name");
    if (name) {
      return Response.json({
        message: `¡Hola ${name}! 😊 Bienvenido/a a academia-bot.`,
        timestamp: new Date().toISOString(),
      });
    }

    return Response.json({
      jsonrpc: "2.0",
      id: id ?? null,
      error: { code: -32601, message: `Método no soportado: ${method}` },
    });
  }),
};
