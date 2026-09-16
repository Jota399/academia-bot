# Briefing Diario — academia-bot

## Cambios Recientes

| Commit | Cambio |
|--------|--------|
| `b1e15f1` | MCP `mi-herramienta` ya no requiere `apiKey` — el examen llama `tools/list` sin credenciales |
| `8450606` | MCP convertido a servidor real con 3 tools: `buscar_cliente`, `ultimos_commits`, `estado_bot` |
| `f03b118` | Demo: link de video (8 min) agregado a `DEMO.md` |
| `393ff5e` | Fix bug ping/health-check en `whatsapp-bot`; docs actualizadas para demo final |
| `d120b76` | Edge function `whatsapp-bot` lista: Groq + Mem0 + handoff (ítems 1/2/3/6/7) |
| `33329fd` | 5 queries semánticas de Mem0 documentadas y probadas |
| `cf73449` | Extractor multi-fuente (commits, calendario, gmail) → Mem0 + cron nocturno |
| `bf20250` | Deploy de edge function `mi-herramienta` en Supabase |

## Estado del Bot

| Componente | Estado |
|------------|--------|
| `whatsapp-bot` (Groq + Mem0 + handoff) | ✅ Operativo |
| `mi-herramienta` (MCP con 3 tools) | ✅ Deployado en Supabase, sin auth para examen |
| Extractor multi-fuente + Mem0 | ✅ Funcionando con cron nocturno |
| Demo final | ✅ Documentada con video |

## Pendientes Detectados

- **Archivos corruptos**: `CLAUDE.md` y `prompts/asistente.md` están codificados/garbage — requieren restauración desde backup o regeneración
- Verificar que el cron nocturno del extractor esté programado en Supabase Dashboard

---

## ⚠️ Reglas Permanentes

> **Nunca** prometer precio, fecha o descuento sin aprobación explícita de Jonathan.  
> **Ningún mensaje** sale sin su revisión previa.