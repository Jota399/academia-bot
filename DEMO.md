# Demo — OpenClaw de Jonathan

**Video (8 min):** _(pega aquí el link cuando lo grabes — ej. YouTube sin listar, Loom, o Drive)_

## Guion

### 1. El problema (2 min)
"Ayudo a negocios pequeños a implementar IA con Claude. Lo que más tiempo me quita cada
semana es atender clientas y correos — cada negocio que pregunta por WhatsApp o email
tengo que responderle yo mismo, uno por uno, sin memoria de qué hablamos antes. Quiero
que la IA lleve ese seguimiento por mí."

### 2. Sistema en vivo, con datos reales (3 min)
- Mostrar el WhatsApp real: mandar un mensaje al sandbox de Twilio (+1 415-523-8886) desde
  el celular, en vivo, y que el bot responda en menos de 10 segundos — mostrar cómo NUNCA
  da precio ni agenda en firme (dice "Jonathan te escribe pronto").
- Mandar una pregunta de precio real y mostrar en los logs de Supabase cómo quedó
  etiquetada para handoff (`pregunta-precio`), sin que el bot inventara nada.
- Correr `node agents/orchestrator.mjs` (repo `mis-agentes`) en vivo y mostrar el
  briefing nocturno: qué clientas están pendientes (Mem0), qué cambió en el repo
  (GitHub), y qué handoffs hubo en el bot (logs de Supabase) — las 3 fuentes juntas.

### 3. Arquitectura (2 min)
- **Memoria:** `CLAUDE.md` (reglas fijas: nunca prometer precio/fecha sin aprobación) +
  Mem0 (hechos que cambian: qué preguntó cada clienta, qué cambió en el repo).
- **Herramientas:** edge function en Supabase (`whatsapp-bot`) que lee Mem0 en vivo y
  responde vía Groq; MCP de GitHub para leer commits reales.
- **Automatización:** 3 crons en GitHub Actions — `briefing-diario.yml` (resumen diario),
  `mem0-nightly.yml` (extractor multi-fuente hacia Mem0), `orquesta.yml` (orquestador de
  3 subagentes en `mis-agentes`) — más el Stop hook que deja un checkpoint en Mem0 cada
  vez que cierro una sesión de Claude Code.
- **Canal de salida:** WhatsApp real vía Twilio Sandbox — el mismo canal donde llegan
  las clientas de verdad.

### 4. Qué sigue (1 min)
- Reemplazar las fuentes de ejemplo de calendario/Gmail (item 4 de S05) por datos reales
  cuando tenga clientas agendadas de verdad.
- Conectar Chatwoot para que el handoff no solo quede en logs, sino que me llegue una
  notificación real.
- Mover el WhatsApp del sandbox de Twilio a un número propio de negocio.
- Repetir este mismo patrón (Memoria + Herramientas + Automatización + Canal) para cada
  negocio pequeño al que le implemente esto — es la plantilla, no un caso único.
