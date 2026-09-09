# Briefing Diario - academia-bot

## Cambios Recientes

| Commit | Descripción |
|--------|-------------|
| `b1e15f1` | **MCP sin auth**: El examen ahora llama `tools/list` sin requerir `apiKey` |
| `8450606` | **MCP funcional**: `mi-herramienta` expone 3 tools (`buscar_cliente`, `ultimos_commits`, `estado_bot`) |
| `f03b118` | **Demo**: Video de 8 minutos linkeado en `DEMO.md` |
| `393ff5e` | **Fix crítico**: Bug de ping/health-check en `whatsapp-bot` resuelto |
| `d120b76` | **Core**: Edge function `whatsapp-bot` con Groq + Mem0 + handoff (items 1/2/3/6/7) |
| `33329fd` | **Mem0**: 5 queries semánticas documentadas y probadas |
| `cf73449` | **Extractor**: Multi-fuente (commits, calendario, gmail) → Mem0 + cron nocturno |
| `bf20250` | **Deploy**: Edge function `mi-herramienta` en Supabase |

## Estado del Bot

| Componente | Estado |
|------------|--------|
| `whatsapp-bot` | ✅ Operativo (Groq + Mem0 + handoff) |
| `mi-herramienta` (MCP) | ✅ Deployado, 3 tools disponibles |
| Mem0 | ✅ 5 queries semánticas activas |
| Extractor | ✅ Cron nocturno configurado |
| Health-check | ✅ Fix aplicado |

## Pendientes Detectados

- **Items S06 faltantes**: 4 y 5 (no mencionados en commits recientes)
- Verificar integración end-to-end MCP ↔ bot tras quitar `apiKey`

---

## ⚠️ Reglas Permanentes

> **Nunca** prometer precio, fecha o descuento sin aprobación explícita de Jonathan.  
> **Ningún mensaje** sale sin su revisión previa.