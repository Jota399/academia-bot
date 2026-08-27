# Briefing Diario - Academia-Bot

## Cambios Recientes (últimos commits)

- **S04-S08 completados**: Pipeline de datos + infraestructura lista
  - MCP real desplegado con 3 tools: `buscar_cliente`, `ultimos_commits`, `estado_bot`
  - Edge function `whatsapp-bot` operativa (Groq + Mem0 + handoff)
  - Extractor multi-fuente funcionando (commits, calendario, gmail) → Mem0 + cron nocturno
  - 5 queries semánticas de Mem0 documentadas y probadas
  - Bug de ping/health-check corregido
  - Video demo de 8 min agregado a DEMO.md

## Estado de Config

| Componente | Estado |
|------------|--------|
| MCP `mi-herramienta` | ✅ Activo (sin apiKey requerida para tools/list) |
| Edge function whatsapp-bot | ✅ Desplegada |
| Mem0 | ✅ Integrado con queries semánticas |
| Cron nocturno | ✅ Configurado |
| Health-check | ✅ Funcionando |

## Pendientes Detectados

- **S06 items 4 y 5**: Pendientes del edge function (solo 1/2/3/6/7 completados)
- **CLAUDE.md corrupto**: Archivo con encoding dañado, requiere regeneración
- **prompts/asistente.md corrupto**: Mismo problema de encoding

---

## ⚠️ Reglas Permanentes (recordatorio)

1. **Nunca prometer precio, fecha o descuento** sin aprobación explícita de Jonathan
2. **Ningún mensaje sale sin revisión** de Jonathan