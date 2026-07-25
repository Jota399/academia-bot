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
