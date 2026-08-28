# Briefing Diario — Academia-Bot

## Cambios Recientes

| Commit | Cambio |
|--------|--------|
| `b1e15f1` | MCP sin apiKey — examen llama `tools/list` sin credenciales |
| `8450606` | MCP real con 3 tools: `buscar_cliente`, `ultimos_commits`, `estado_bot` |
| `f03b118` | Demo: link de video 8 min en `DEMO.md` |
| `393ff5e` | Fix bug ping/health-check + docs para demo final |
| `d120b76` | Edge function `whatsapp-bot` (Groq + Mem0 + handoff) |
| `cf73449` | Extractor multi-fuente → Mem0 + cron nocturno |
| `bf20250` | Deploy edge function `mi-herramienta` en Supabase |

## Estado de Configuración

- **MCP**: Operativo, 3 tools disponibles, sin requisito de apiKey
- **WhatsApp Bot**: Edge function con Groq + Mem0 + handoff activo
- **Memoria**: Extractor multi-fuente (commits, calendario, gmail) + queries semánticas funcionando
- **Health-check**: Bug recién corregido

## Pendientes Detectados

- Verificar que el cron nocturno del extractor esté programado en Supabase
- Confirmar handoff conditions funcionan correctamente en producción

---

## ⚠️ Reglas Permanentes

> **Nunca** prometer precio, fecha o descuento sin aprobación explícita de Jonathan.
> **Ningún mensaje** sale sin su revisión previa.