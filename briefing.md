# Briefing Diario - Academia Bot

## Cambios Recientes

| Commit | Cambio |
|--------|--------|
| `b1e15f1` | **S04**: MCP `mi-herramienta` ya no requiere `apiKey` — el examen llama `tools/list` sin credenciales |
| `8450606` | **S04**: MCP real con 3 tools: `buscar_cliente`, `ultimos_commits`, `estado_bot` |
| `f03b118` | **S08**: Demo video (8 min) linkeado en `DEMO.md` |
| `393ff5e` | **S08**: Fix bug ping/health-check en `whatsapp-bot`, docs para demo final |
| `d120b76` | **S06**: Edge function `whatsapp-bot` con Groq + Mem0 + handoff (items 1/2/3/6/7) |
| `33329fd` | **S05**: 5 queries semánticas de Mem0 documentadas y probadas |
| `cf73449` | **S05**: Extractor multi-fuente (commits, calendario, gmail) → Mem0 + cron nocturno |
| `bf20250` | **S04**: Deploy de `mi-herramienta` en Supabase |

## Estado de Config

- **MCP**: Operativo, 3 tools disponibles, sin auth requerida para listado
- **WhatsApp Bot**: Edge function activa (Groq + Mem0 + handoff), health-check corregido
- **Mem0**: 5 queries semánticas validadas, ingesta multi-fuente con cron nocturno
- **Demo**: Video de 8 min documentado

## Pendientes Detectados

- **CLAUDE.md**: Archivo corrupto (encoding binario) — requiere regeneración urgente
- **prompts/asistente.md**: Mismo problema de corrupción — revisar backup
- Sin estos archivos, el contexto del asistente está comprometido

## ⚠️ Reglas Permanentes

> **Nunca** prometer precio, fecha o descuento sin aprobación explícita de Jonathan.  
> **Ningún** mensaje sale sin su revisión previa.