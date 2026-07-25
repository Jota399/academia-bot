# academia-bot

Bot de WhatsApp (whatsapp-web.js) para atender y dar seguimiento a clientas de negocios pequeños en nombre de Jonathan.

## Reglas del proyecto
- Nunca prometer precios, fechas o descuentos a nombre del cliente sin aprobación explícita de Jonathan.
- Ningún mensaje sale por WhatsApp sin que Jonathan lo revise primero.
- Tono: cercano y cálido, trato de tú (ver `prompts/ejemplos-few-shot.md` para la voz exacta).

## Estructura
- `index.js` — entry point del bot.
- `src/` — lógica del bot.
- `config/` — configuración.
- `prompts/` — personas (asistente, analista, redactor) y ejemplos few-shot que definen cómo responde el bot.

## Nunca commitear
- `.env` (credenciales/tokens)
- `.wwebjs_auth/` (sesión activa de WhatsApp — equivale a una credencial de login)
- `.wwebjs_cache/`, `node_modules/`, `bot.log`

## Pendiente de automatizar (S04 — tarea manual real)
Hoy Jonathan gestiona los pedidos de sus clientas totalmente a mano, cruzando dos herramientas: WhatsApp (donde llegan las solicitudes) y el Bloc de notas de Windows (donde las copia a una lista y las va tachando conforme las completa). No hay estructura ni registro real, solo texto plano que se pierde al cerrar la nota.

**Idea a automatizar más adelante:** que el bot capture cada pedido entrante por WhatsApp y lo agregue a una lista persistente (archivo o base de datos) asociada al remitente, con un comando tipo `!pedidos` para verla y `!listo <n>` para marcarla como hecha — reemplazando el copiar/pegar/tachar manual en el Bloc de notas.
