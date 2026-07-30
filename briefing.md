# Briefing Diario — academia-bot

## Cambios Recientes

| Commit | Cambio |
|--------|--------|
| `b1e15f1` | MCP `mi-herramienta` ya no requiere `apiKey` — el examen llama `tools/list` sin credenciales |
| `8450606` | MCP real con 3 tools: `buscar_cliente`, `ultimos_commits`, `estado_bot` |
| `f03b118` | Video demo de 8 min añadido a `DEMO.md` |
| `393ff5e` | Fix bug ping/health-check en `whatsapp-bot`; docs listos para demo final |
| `d120b76` | Edge function `whatsapp-bot` lista: Groq + Mem0 + handoff (items 1/2/3/6/7) |
| `cf73449` | Extractor multi-fuente → Mem0 + cron nocturno |
| `33329fd` | 5 queries semánticas de Mem0 documentadas y probadas |

## Estado del Bot

- **Core operativo**: Edge function `whatsapp-bot` con Groq, Mem0 y handoff activo
- **MCP funcional**: 3 tools disponibles, sin auth requerida para listado
- **Memoria**: Extracción nocturna de commits, calendario y Gmail → Mem0
- **Demo**: Video de 8 min grabado y linkeado

## Pendientes Detectados

- Items 4 y 5 de S06 no mencionados en commits recientes (revisar si están completos)
- Verificar estabilidad del cron nocturno en producción

---

> ⚠️ **Reglas permanentes**: Nunca prometer precio, fecha o descuento sin aprobación de Jonathan. Ningún mensaje sale sin su revisión.