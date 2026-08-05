# Briefing Diario — academia-bot

## Cambios Recientes (últimos commits)

| Commit | Cambio |
|--------|--------|
| `b1e15f1` | **S04**: MCP `mi-herramienta` ya no requiere `apiKey` — el examen llama `tools/list` sin credenciales |
| `8450606` | **S04**: `mi-herramienta` convertido en MCP real con 3 tools: `buscar_cliente`, `ultimos_commits`, `estado_bot` |
| `f03b118` | **S08**: Demo video (8 min) linkeado en `DEMO.md` |
| `393ff5e` | **S08**: Fix bug ping/health-check en `whatsapp-bot`, docs `memory/log.md` y `DEMO.md` listos |
| `d120b76` | **S06**: Edge function `whatsapp-bot` operativa (Groq + Mem0 + handoff), items 1/2/3/6/7 |
| `cf73449` | **S05**: Extractor multi-fuente (commits, calendario, gmail) → Mem0 + cron nocturno |
| `33329fd` | **S05**: 5 queries semánticas de Mem0 documentadas y probadas |

## Estado del Bot

- ✅ **Core operativo**: Edge function `whatsapp-bot` con Groq + Mem0 + handoff
- ✅ **MCP funcional**: 3 tools disponibles sin autenticación para el examen
- ✅ **Memoria**: Extractor multi-fuente + queries semánticas funcionando
- ✅ **Demo**: Video de 8 min listo, docs actualizados

## Pendientes Detectados

- **CLAUDE.md y prompts/asistente.md**: Archivos corruptos/garbled — requieren restauración urgente
- Verificar que el cron nocturno del extractor esté activo en producción
- Confirmar que el health-check fix (`393ff5e`) está deployado en el edge function activo

---

## ⚠️ Reglas Permanentes — OBLIGATORIAS

> **NUNCA** prometer precio, fecha o descuento sin aprobación explícita de Jonathan.
> **NINGÚN** mensaje sale sin su revisión previa.