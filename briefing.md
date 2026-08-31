# Briefing Diario — Academia-Bot

## Cambios Recientes

| Commit | Cambio |
|--------|--------|
| `b1e15f1` | MCP sin apiKey: el examen ahora llama `tools/list` sin credenciales |
| `8450606` | `mi-herramienta` → MCP real con 3 tools: `buscar_cliente`, `ultimos_commits`, `estado_bot` |
| `f03b118` | Demo: video de 8 min añadido a `DEMO.md` |
| `393ff5e` | Fix bug ping/health-check en whatsapp-bot; docs listos para demo final |
| `d120b76` | Edge function `whatsapp-bot` lista: Groq + Mem0 + handoff (items 1/2/3/6/7) |
| `cf73449` | Extractor multi-fuente (commits/calendario/gmail) → Mem0 + cron nocturno |
| `bf20250` | Deploy de `mi-herramienta` en Supabase |

## Estado de Config

- **CLAUDE.md**: ❌ **Corrupto** (encoding dañado, necesita restauración)
- **prompts/asistente.md**: ❌ **Corrupto** (mismo problema de encoding)
- **MCP**: ✅ Operativo, sin apiKey requerida
- **Mem0**: ✅ Integrado con 5 queries semánticas documentadas
- **WhatsApp bot**: ✅ Edge function deployada, health-check arreglado

## Pendientes Detectados

1. **URGENTE**: Restaurar `CLAUDE.md` y `prompts/asistente.md` — el encoding está roto
2. Verificar que el cron nocturno del extractor esté activo en producción
3. Confirmar que `buscar_cliente` tiene acceso real a la base de datos de clientes

---

## ⚠️ Reglas Permanentes

- **Nunca** prometer precio, fecha o descuento sin aprobación explícita de Jonathan
- **Ningún mensaje** sale sin su revisión previa