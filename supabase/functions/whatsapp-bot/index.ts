// Bot de WhatsApp para el negocio de Jonathan (ayuda a negocios pequeños a
// implementar IA con Claude). Habla con negocios prospecto, usa Mem0 para
// recordar el contexto de cada uno (keyed por su número de WhatsApp) y
// escala a Jonathan (via Chatwoot cuando esté conectado) cuando el mensaje
// toca precio, agenda, o se sale de lo que el bot puede resolver solo.
//
// Arquitectura: Twilio (cartero) -> esta función (cerebro) -> Groq (LLM)
//               -> Mem0 (memoria) -> TwiML de vuelta a Twilio.

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";
const MEM0_ADD_URL = "https://api.mem0.ai/v1/memories/";
const MEM0_SEARCH_URL = "https://api.mem0.ai/v2/memories/search/";

const SYSTEM_PROMPT = `Eres el asistente de Jonathan. Jonathan ayuda a negocios pequeños \
(panaderías, consultorios, ferreterías y similares) a implementar bots de IA para llevar \
el seguimiento de sus clientas — tomar pedidos, avisar promociones, recordar citas, \
responder preguntas frecuentes. Hablas por WhatsApp con negocios que están evaluando \
contratar a Jonathan.

Tono: cercano y claro, como explicarle a alguien que no sabe de tecnología qué puede \
hacer un bot de IA por su negocio, sin tecnicismos.

REGLAS QUE NUNCA ROMPES:
- Nunca prometas precio, fecha de entrega ni descuentos en nombre de Jonathan. Si preguntan \
precio, di que Jonathan les escribe pronto con eso.
- Nunca confirmes una cita en firme. Di que Jonathan la confirma.
- Si no sabes algo o la pregunta se sale de tu alcance, dilo directo y ofrece que Jonathan \
retome la conversación — no inventes.`;

const HANDOFF_TRIGGERS: { pattern: RegExp; tag: string }[] = [
  { pattern: /precio|cuesta|cotiza|cotización|plan mensual/i, tag: "pregunta-precio" },
  { pattern: /agendar|cita|llamada|reuni[oó]n/i, tag: "quiere-agendar" },
  { pattern: /no entiendo|no te entiendo|hablar con (alguien|una persona)|humano/i, tag: "no-entiende" },
];

function maybeHandoff(text: string): string | null {
  for (const { pattern, tag } of HANDOFF_TRIGGERS) {
    if (pattern.test(text)) return tag;
  }
  return null;
}

async function tagInChatwoot(phone: string, tag: string): Promise<void> {
  const base = Deno.env.get("CHATWOOT_URL");
  const token = Deno.env.get("CHATWOOT_API_TOKEN");
  const accountId = Deno.env.get("CHATWOOT_ACCOUNT_ID");

  if (!base || !token || !accountId) {
    console.log(`[handoff] tag='${tag}' de ${phone} — Chatwoot no configurado aún, queda solo en logs.`);
    return;
  }

  // TODO: reemplazar por el endpoint real de conversaciones/labels de Chatwoot
  // cuando la cuenta esté creada (item pendiente de S06).
  console.log(`[handoff] tag='${tag}' de ${phone} — pendiente de enviar a Chatwoot.`);
}

async function getUserMemories(userId: string, query: string): Promise<string[]> {
  const apiKey = Deno.env.get("MEM0_API_KEY");
  if (!apiKey) return [];

  try {
    const res = await fetch(MEM0_SEARCH_URL, {
      method: "POST",
      headers: { Authorization: `Token ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query, filters: { AND: [{ user_id: userId }] } }),
    });
    if (!res.ok) return [];
    const data = await res.json();
    const results = data.results ?? data ?? [];
    return results.map((m: { memory?: string }) => m.memory).filter(Boolean);
  } catch (err) {
    console.error("[mem0 search error]", err);
    return [];
  }
}

async function saveExchange(userId: string, userText: string, botText: string): Promise<void> {
  const apiKey = Deno.env.get("MEM0_API_KEY");
  if (!apiKey) return;

  try {
    await fetch(MEM0_ADD_URL, {
      method: "POST",
      headers: { Authorization: `Token ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "user", content: userText },
          { role: "assistant", content: botText },
        ],
        user_id: userId,
        metadata: { source: "whatsapp-bot" },
      }),
    });
  } catch (err) {
    console.error("[mem0 save error]", err);
  }
}

async function askGroq(userText: string, memories: string[]): Promise<string> {
  const apiKey = Deno.env.get("GROQ_API_KEY");
  if (!apiKey) throw new Error("GROQ_API_KEY no configurada");

  const memoryContext = memories.length
    ? `Contexto de conversaciones anteriores con este negocio:\n${memories.map((m) => `- ${m}`).join("\n")}\n\n`
    : "";

  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `${memoryContext}Mensaje del negocio: ${userText}` },
      ],
      max_tokens: 400,
      temperature: 0.6,
    }),
  });

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error(`Groq no devolvió texto: ${JSON.stringify(data)}`);
  return text;
}

function twimlResponse(text: string): Response {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${escaped}</Message></Response>`;
  return new Response(xml, { headers: { "Content-Type": "text/xml" } });
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Solo POST", { status: 405 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    // Ping/health-check sin body form-encoded (no es un webhook real de Twilio).
    return new Response("OK", { status: 200 });
  }
  const from = String(form.get("From") ?? "desconocido"); // ej. whatsapp:+50760025284
  const body = String(form.get("Body") ?? "").trim();

  if (!body) {
    return twimlResponse("No recibí ningún mensaje, ¿puedes escribir de nuevo?");
  }

  const userId = from.replace("whatsapp:", "");

  try {
    const memories = await getUserMemories(userId, body);
    const reply = await askGroq(body, memories);

    const handoffTag = maybeHandoff(body);
    if (handoffTag) {
      await tagInChatwoot(userId, handoffTag);
    }

    await saveExchange(userId, body, reply);

    return twimlResponse(reply);
  } catch (err) {
    console.error("[whatsapp-bot error]", err);
    return twimlResponse("Se me trabó el cerebro un momento, Jonathan te escribe pronto directamente.");
  }
});
