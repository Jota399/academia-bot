# Briefing Diario — Academia-Bot

## Cambios Recientes (últimos commits)

| Commit | Cambio |
|--------|--------|
| `b1e15f1` | **S04**: MCP `mi-herramienta` ya no requiere `apiKey` — el examen de tools/list funciona sin credenciales |
| `8450606` | **S04**: MCP convertido en servidor real con 3 tools: `buscar_cliente`, `ultimos_commits`, `estado_bot` |
| `f03b118` | **S08**: Demo.md incluye link al video de demo (8 min) |
| `393ff5e` | **S08**: Fix de bug ping/health-check en whatsapp-bot + docs para demo final |
| `d120b76` | **S06**: Edge function `whatsapp-bot` operativa (Groq + Mem0 + handoff) |
| `cf73449` | **S05**: Extractor multi-fuente (commits, calendario, gmail) → Mem0 + cron nocturno |
| `bf20250` | **S04**: Deploy de edge function `mi-herramienta` en Supabase |

## Estado de Config

- **CLAUDE.md**: ⚠️ **Corrupto** (contenido binario/garbage) — requiere restauración urgente
- **prompts/asistente.md**: ⚠️ **Corrupto** (mismo problema de encoding)
- **MCP tools**: Operativas (`buscar_cliente`, `ultimos_commits`, `estado_bot`)
- **WhatsApp bot**: Funcional con health-check corregido
- **Mem0**: Conectado con extractor multi-fuente y cron nocturno

## Pendientes Detectados

1. **🔴 CRÍTICO**: Restaurar `CLAUDE.md` y `prompts/asistente.md` desde backup o regenerar
2. Verificar que el MCP sin `apiKey` no expone datos sensibles
3. Confirmar que el cron nocturno de extracción está activo en producción

---

## ⛔ Reglas Permanentes

> **Nunca** prometer precio, fecha o descuento sin aprobación explícita de Jonathan.  
> **Ningún mensaje** sale sin su revisión previa.