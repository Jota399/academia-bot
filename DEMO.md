# Demo — OpenClaw de Jonathan

**Video:** https://drive.google.com/file/d/17NPvIEQ6VJQH4FjfDY8tkbgMjgLGqAje/view?usp=drive_link

## Guion

Este guion sirve para las dos cosas: grabar el video (item 8) y presentar en vivo al
grupo (item 10). Es el mismo texto — en vivo, léelo como conversación, no como lectura;
en video, grábalo en una sola toma si puedes, se nota más natural que cortado en pedazos.

**Antes de empezar (checklist de 2 min):**
- [ ] Celular con WhatsApp a la mano, ya guardado el número del sandbox (+1 415-523-8886)
      y el código `join nor-driving` mandado (si pasó mucho tiempo desde el último mensaje,
      el sandbox a veces pide re-unirse — probarlo ANTES de la llamada/grabación).
- [ ] Pestaña abierta con los logs de Supabase (`function_edge_logs` / `function_logs`).
- [ ] Terminal abierta en `mis-agentes`, lista para correr `node agents/orchestrator.mjs`
      sin tener que buscar la carpeta en vivo.
- [ ] Repo `academia-bot` abierto en GitHub en otra pestaña (para mostrar `CLAUDE.md` y
      los workflows de Actions rápido, sin navegar en vivo).
- [ ] Si es en vivo: prueba tu internet/audio 5 min antes. Si es video: ten un segundo
      intento en mente por si el bot tarda más de lo normal en responder.

### 1. El problema (2 min)
> "Ayudo a negocios pequeños a implementar IA con Claude — negocios que quieren usar IA
> pero todavía no saben cómo. Lo que más tiempo me quita a mí cada semana, y lo que le
> pasa a cualquier negocio chico, es atender clientas y correos uno por uno: cada mensaje
> por WhatsApp o email lo tengo que responder yo mismo, sin que quede memoria de qué
> hablamos antes. Si una clienta pregunta hoy y vuelve a preguntar en dos semanas, empiezo
> de cero otra vez. Lo que construí es que la IA lleve ese seguimiento por mí — que
> conteste, recuerde, y me avise solo cuando de verdad me necesita a mí."

*(Qué mostrar en pantalla: nada todavía, o el celular en la mano — este minuto es solo
hablar directo a cámara/grupo.)*

### 2. Sistema en vivo, con datos reales (3 min)
- **Mandar un mensaje real** al sandbox de Twilio desde el celular, en vivo, y que el bot
  responda en menos de 10 segundos.
  > "Miren, esto es de verdad, no una simulación — le escribo ahora mismo al bot."
- **Mostrar la regla de oro:** preguntar algo que suene a precio o fecha ("¿cuánto cuesta
  el paquete básico?") y señalar que el bot NUNCA promete nada — responde algo tipo
  "eso te lo confirma Jonathan directamente" en vez de inventar un número.
  > "Esto es a propósito: el bot informa y agenda, pero nunca promete precio ni fecha en
  > mi nombre. Eso lo decido yo, siempre."
- **Mostrar el handoff en los logs de Supabase**: esa misma pregunta de precio quedó
  etiquetada (`pregunta-precio`) sin que el bot inventara nada — abrir la pestaña ya
  preparada y señalar la línea en el log.
- **Correr `node agents/orchestrator.mjs`** en vivo (repo `mis-agentes`) y mostrar el
  briefing nocturno completo: qué clientas están pendientes (Mem0), qué cambió en el
  repo (GitHub), y qué handoffs hubo en el bot (logs de Supabase) — las 3 fuentes
  combinadas en un solo resumen.
  > "Esto corre solo, cada noche, sin que yo lo tenga que pedir — lo estoy corriendo
  > ahora a mano solo para que lo vean en vivo."

### 3. Arquitectura (2 min)
> "Rápido, cómo está armado esto por dentro, en 4 piezas:"
- **Memoria:** `CLAUDE.md` (reglas fijas y permanentes — nunca prometer precio ni fecha
  sin mi aprobación) + Mem0 (hechos que cambian día a día — qué preguntó cada clienta,
  qué cambió en el repo).
- **Herramientas:** una edge function en Supabase (`whatsapp-bot`) que lee Mem0 en vivo y
  responde usando Groq como modelo; un MCP de GitHub para leer commits reales del repo.
- **Automatización:** 3 crons en GitHub Actions corriendo solos — `briefing-diario.yml`
  (resumen diario), `mem0-nightly.yml` (extrae info de varias fuentes hacia Mem0),
  `orquesta.yml` (el orquestador de 3 subagentes que acabo de correr) — más un Stop hook
  que guarda un checkpoint en Mem0 cada vez que cierro una sesión de Claude Code.
- **Canal de salida:** WhatsApp real vía Twilio Sandbox — el mismo canal por donde me
  escriben las clientas de verdad, no un canal de prueba aparte.

### 4. Qué sigue (1 min)
> "Esto no es el final, es la base. Lo que sigue:"
- Reemplazar las fuentes de ejemplo de calendario/Gmail (item 4 de S05) por datos reales
  cuando tenga clientas agendadas de verdad.
- Conectar Chatwoot para que el handoff no se quede solo en un log, sino que me llegue
  una notificación real a mí.
- Mover el WhatsApp del sandbox de Twilio a un número propio de negocio.
- Repetir este mismo patrón — Memoria + Herramientas + Automatización + Canal — para
  cada negocio pequeño al que le implemente esto. Esta es la plantilla, no un caso único.

**Si algo falla en vivo:** ten el video ya grabado como respaldo y di algo como "si por
internet no responde ahora, aquí está grabado funcionando" — no te pongas a debuggear
en vivo frente al grupo, cambia al video y sigue con la arquitectura.
