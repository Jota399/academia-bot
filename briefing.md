# Briefing Diario — Academia-Bot

## Cambios Recientes (últimos commits)

| Commit | Cambio |
|--------|--------|
| `b1e15f1` | **S04**: MCP `mi-herramienta` ya no requiere `apiKey` — el examen llama `tools/list` sin credenciales |
| `8450606` | **S04**: MCP convertido en servidor real con 3 tools: `buscar_cliente`, `ultimos_commits`, `estado_bot` |
| `f03b118` | **S08**: Demo.md ahora incluye link al video de 8 min |
| `393ff5e` | **S08**: Fix de bug ping/health-check en whatsapp-bot + logs para demo final |
| `d120b76` | **S06**: Edge function `whatsapp-bot` operativa (Groq + Mem0 + handoff) |
| `cf73449` | **S05**: Extractor multi-fuente (commits, calendario, gmail) → Mem0 + cron nocturno |
| `33329fd` | **S05**: 5 queries semánticas de Mem0 documentadas y probadas |

## Estado del Bot

| Componente | Estado |
|------------|--------|
| WhatsApp Bot (Groq + Mem0 + handoff) | ✅ Operativo (`d120b76`) |
| MCP Server (`mi-herramienta`) | ✅ 3 tools activas, sin auth requerida |
| Mem0 | ✅ 5 queries semánticas probadas, extractor multi-fuente con cron |
| Health-check / Ping | ✅ Bug fixeado (`393ff5e`) |
| Demo | ✅ Video de 8 min listo |

## Pendientes Detectados

- **CLAUDE.md y prompts/asistente.md**: Archivos corruptos (encoding roto) — requieren restauración urgente
- Sin CLAUDE.md funcional, no hay contexto de negocio ni instrucciones del sistema

## ⚠️ Reglas Permanentes (recordatorio)

1. **Nunca prometer precio, fecha o descuento** sin aprobación explícita de Jonathan
2. **Ningún mensaje sale sin su revisión** — todo pasa por aprobación manual