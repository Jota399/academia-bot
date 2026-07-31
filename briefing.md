## 📋 Briefing Diario - academia-bot

### Cambios Recientes (últimos commits)

| Commit | Cambio |
|--------|--------|
| `b1e15f1` | **S04**: MCP `mi-herramienta` ya no requiere `apiKey` — el examen llama `tools/list` sin credenciales |
| `8450606` | **S04**: MCP real con 3 tools: `buscar_cliente`, `ultimos_commits`, `estado_bot` |
| `f03b118` | **S08**: Demo.md incluye link de video (8 min) |
| `393ff5e` | **S08**: Fix bug ping/health-check en whatsapp-bot + docs para demo final |
| `d120b76` | **S06**: Edge function `whatsapp-bot` (Groq + Mem0 + handoff) — items 1/2/3/6/7 |
| `cf73449` | **S05**: Extractor multi-fuente (commits, calendario, gmail) → Mem0 + cron nocturno |
| `33329fd` | **S05**: 5 queries semánticas de Mem0 documentadas y probadas |
| `bf20250` | **S04**: Deploy de edge function `mi-herramienta` en Supabase |

### Estado de Configuración

| Componente | Estado |
|------------|--------|
| `whatsapp-bot` (edge function) | ✅ Activo - Groq + Mem0 + handoff implementado |
| `mi-herramienta` (MCP) | ✅ Desplegado en Supabase, sin auth requerida para `tools/list` |
| Mem0 | ✅ 5 queries semánticas operativas |
| Extractor multi-fuente | ✅ Cron nocturno configurado (commits, calendario, gmail) |
| Health-check/ping | ✅ Bug fixeado post-demo |

### Pendientes Detectados

- **CLAUDE.md y prompts/asistente.md**: Archivos corruptos/garbled — requieren restauración urgente
- Items 4 y 5 de S04/S05 ya completados según commits
- Revisar que el cron nocturno esté efectivamente programado en producción

---

### ⛔ Reglas Permanentes

> **NUNCA** prometer precio, fecha o descuento sin aprobación explícita de Jonathan.  
> **NINGÚN** mensaje sale sin su revisión previa.