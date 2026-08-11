## 📋 Briefing Diario - Academia-Bot

### Cambios Recientes
- **MCP server real**: `mi-herramienta` ahora tiene 3 tools (`buscar_cliente`, `ultimos_commits`, `estado_bot`) y ya no requiere apiKey
- **Extractor multi-fuente**: Sistema que alimenta Mem0 desde commits, calendario y Gmail con cron nocturno
- **Edge function whatsapp-bot**: Integración Groq + Mem0 + handoff operativa
- **Demo lista**: Video de 8 min subido, bug de health-check corregido

### Estado del Bot
| Componente | Estado |
|-----------|--------|
| MCP server (mi-herramienta) | ✅ Desplegado en Supabase, sin auth requerida |
| Mem0 | ✅ 5 queries semánticas documentadas y probadas |
| WhatsApp bot (Groq+Mem0) | ✅ Edge function activa |
| Extractor/cron | ✅ Nocturno configurado |

### Pendientes Detectados
- Revisar items 1/2/3/**6/7** del S06 (marcados como parciales en el commit)
- Validar flujo de handoff en producción

---

### ⚠️ Reglas Permanentes
> **Sin excepciones:** Nunca prometer precio, fecha o descuento sin aprobación explícita de Jonathan. Ningún mensaje sale sin su revisión previa.