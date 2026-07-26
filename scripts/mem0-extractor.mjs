import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(__dirname, "data");

const MEM0_API_KEY = process.env.MEM0_API_KEY;
const USER_ID = process.env.MEM0_USER_ID || "jonathan-academia-bot";

if (!MEM0_API_KEY) {
  console.error("Falta MEM0_API_KEY en el entorno.");
  process.exit(1);
}

function extractCommits() {
  const log = execSync('git log -15 --pretty=format:"%ad|%s" --date=short', {
    cwd: REPO_ROOT,
  }).toString();
  return log
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [date, ...rest] = line.split("|");
      const message = rest.join("|");
      return `Commit del ${date} en academia-bot: ${message}`;
    });
}

function extractCalendar() {
  const raw = JSON.parse(readFileSync(path.join(DATA_DIR, "calendar-snapshot.json"), "utf8"));
  return raw.eventos.map(
    (e) => `Evento de agenda "${e.titulo}" el ${e.fecha}. Notas: ${e.notas}`
  );
}

function extractGmail() {
  const raw = JSON.parse(readFileSync(path.join(DATA_DIR, "gmail-snapshot.json"), "utf8"));
  return raw.correos.map(
    (c) => `Correo de ${c.de}, asunto "${c.asunto}" (${c.fecha}). Resumen: ${c.resumen}`
  );
}

async function saveFact(text, source) {
  const res = await fetch("https://api.mem0.ai/v1/memories/", {
    method: "POST",
    headers: {
      Authorization: `Token ${MEM0_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [{ role: "user", content: text }],
      user_id: USER_ID,
      metadata: { source },
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Mem0 ${res.status}: ${body}`);
  }
  return res.json();
}

const sources = {
  commits: extractCommits(),
  calendario: extractCalendar(),
  gmail: extractGmail(),
};

let totalFacts = 0;
for (const [source, facts] of Object.entries(sources)) {
  console.log(`\n[${source}] ${facts.length} facts encontrados`);
  for (const fact of facts) {
    await saveFact(fact, source);
    totalFacts += 1;
  }
  console.log(`[${source}] ${facts.length} facts guardados en Mem0`);
}

console.log(`\nTotal: ${totalFacts} facts guardados en Mem0 (user_id=${USER_ID}) desde ${Object.keys(sources).length} fuentes.`);
