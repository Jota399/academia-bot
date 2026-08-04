# 📋 Briefing Diario — academia-bot

## Cambios Recientes (últimos commits)

| Commit | Cambio clave |
|--------|-------------|
| `b1e15f1` | **S04**: MCP `mi-herramienta` ya no requiere `apiKey` — el examen llama `tools/list` sin credenciales |
| `8450606` | **S04**: MCP convertido a servidor real con 3 tools: `buscar_cliente`, `ultimos_commits`, `estado_bot` |
| `f03b118` | **S08**: Demo documentada — link de video (8 min) en `DEMO.md` |
| `393ff5e` | **S08**: Fix de bug ping/health-check en `whatsapp-bot` + docs para demo final |
| `d120b76` | **S06**: Edge function `whatsapp-bot` operativa (Groq + Mem0 + handoff) |
| `cf73449` | **S05**: Extractor multi-fuente (commits, calendario, gmail) → Mem0 + cron nocturno |
| `33329fd` | **S05**: 5 queries semánticas de Mem0 documentadas y probadas |

**Resumen**: Sistema completo desplegado. El bot de WhatsApp ya integra Groq + Mem0 con handoff. El MCP expone 3 herramientas listas para el examen. Demo final grabada y documentada.

---

## Estado de Config del Bot

| Componente | Estado |
|------------|--------|
| `whatsapp-bot` (edge function) | ✅ Operativo — Groq + Mem0 + handoff |
| `mi-herramienta` (MCP) | ✅ Desplegado en Supabase, sin auth para examen |
| Mem0 | ✅ Con queries semánticas documentadas |
| Extractor/cron nocturno | ✅ Multi-fuente: commits, calendario, gmail |
| Health-check/ping | ✅ Fix aplicado post-demo |

---

## Pendientes Detectados

- **CLAUDE.md corrupto** — archivo ilegible (encoding dañado), necesita restauración urgente
- **prompts/asistente.md corrupto** — mismo problema de encoding
- Sin estos archivos, el contexto del asistente está comprometido

---

## ⚠️ Reglas Permanentes (recordatorio)

> **Nunca** prometer precio, fecha o descuento sin aprobación explícita de Jonathan.
> 
> **Ningún mensaje** sale sin su revisión previa.