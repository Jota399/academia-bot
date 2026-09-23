## 📋 Briefing Diario — academia-bot

### Cambios Recientes
- **MCP real implementado**: `mi-herramienta` ahora es un MCP con 3 tools (`buscar_cliente`, `ultimos_commits`, `estado_bot`)
- **Eliminada dependencia de apiKey** para el examen MCP (llama `tools/list` sin credenciales)
- **Edge function whatsapp-bot** operativa (Groq + Mem0 + handoff) — items 1/2/3/6/7 completados
- **Sistema de memoria**: extractor multi-fuente (commits, calendario, gmail) + cron nocturno + 5 queries semánticas documentadas
- **Demo final lista**: video de 8 min linkeado, bug de ping/health-check corregido

### Estado del Bot
| Componente | Estado |
|------------|--------|
| MCP tools | ✅ Operativo (sin auth para examen) |
| WhatsApp edge function | ✅ Desplegada |
| Mem0 + extracción | ✅ Activo con cron |
| Demo/health-check | ✅ Estable |

### Pendientes Detectados
- Ninguno crítico visible en commits recientes

---

### ⚠️ Reglas Permanentes
- **Nunca** prometer precio, fecha o descuento sin aprobación explícita de Jonathan
- **Ningún mensaje** sale sin su revisión previa