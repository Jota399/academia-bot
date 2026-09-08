# Briefing Diario — academia-bot

## Cambios Recientes (últimos commits)

| Commit | Cambio clave |
|--------|--------------|
| `b1e15f1` | MCP `mi-herramienta` ya no requiere `apiKey` — el examen llama `tools/list` sin credenciales |
| `8450606` | MCP real con 3 tools: `buscar_cliente`, `ultimos_commits`, `estado_bot` |
| `f03b118` | Demo: link de video (8 min) añadido a `DEMO.md` |
| `393ff5e` | Fix bug ping/health-check en `whatsapp-bot` + docs para demo final |
| `d120b76` | Edge function `whatsapp-bot` operativa (Groq + Mem0 + handoff) |
| `cf73449` | Extractor multi-fuente → Mem0 + cron nocturno |
| `33329fd` | 5 queries semánticas de Mem0 documentadas y probadas |

## Estado de Config

- ✅ **MCP desplegado** en Supabase (`mi-herramienta`)
- ✅ **WhatsApp-bot** edge function: Groq + Mem0 + handoff activo
- ✅ **Mem0**: extractor multi-fuente + queries semánticas funcionando
- ✅ **Health-check** estabilizado tras fix reciente
- ⚠️ **CLAUDE.md y prompts/asistente.md**: archivos corruptos (encoding), requieren revisión

## Pendientes Detectados

1. **Corregir archivos corruptos**: `CLAUDE.md` y `prompts/asistente.md` tienen encoding roto — posible pérdida de instrucciones del sistema
2. **Verificar** que el cron nocturno del extractor esté scheduleado en Supabase
3. **Confirmar** que `tools/list` sin auth no expone información sensible

---

## 🚨 Reglas Permanentes

> **Nunca** prometer precio, fecha o descuento sin aprobación explícita de Jonathan.
> **Ningún mensaje** sale sin su revisión previa.