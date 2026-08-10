# Briefing Diario — Academia-Bot

## Cambios Recientes (últimos commits)

- **S04 MCP completo**: `mi-herramienta` ahora es un MCP real con 3 tools (`buscar_cliente`, `ultimos_commits`, `estado_bot`). Ya no requiere apiKey — el examen llama `tools/list` sin credenciales.
- **S08 Demo finalizada**: video de 8 min agregado a `DEMO.md`, bug de ping/health-check corregido en `whatsapp-bot`.
- **S06 Edge function `whatsapp-bot`**: operativo con Groq + Mem0 + handoff (items 1/2/3/6/7).
- **S05 Mem0 activo**: extractor multi-fuente (commits, calendario, gmail) con cron nocturno; 5 queries semánticas documentadas y probadas.

## Estado de Configuración

| Componente | Estado |
|------------|--------|
| MCP `mi-herramienta` | ✅ Producción (Supabase) |
| Edge `whatsapp-bot` | ✅ Operativo (Groq + Mem0) |
| Mem0 + cron nocturno | ✅ Activo |
| Health-check | ✅ Fix aplicado |
| Demo video | ✅ 8 min en DEMO.md |

## Pendientes Detectados

- Ninguno crítico visible en commits recientes.

---

## ⚠️ Reglas Permanentes (recordatorio)

1. **Nunca prometer precio, fecha o descuento** sin aprobación explícita de Jonathan.
2. **Ningún mensaje sale sin su revisión** — todo copy debe ser aprobado.