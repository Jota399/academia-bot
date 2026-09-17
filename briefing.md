## Briefing Diario — academia-bot

### Cambios Recientes
- **S04-S08 completados**: MCP real desplegado con 3 tools (`buscar_cliente`, `ultimos_commits`, `estado_bot`) — ya no requiere apiKey
- **Edge function whatsapp-bot**: integración Groq + Mem0 + handoff operativa
- **Mem0 activo**: extractor multi-fuente (commits, calendario, gmail) con cron nocturno + 5 queries semánticas documentadas
- **Fix crítico**: resuelto bug de ping/health-check para estabilidad
- **Demo lista**: video de 8 min documentado en DEMO.md

### Estado del Bot
| Componente | Estado |
|------------|--------|
| MCP (mi-herramienta) | ✅ Producción (Supabase) |
| WhatsApp edge function | ✅ Desplegada |
| Mem0 + embeddings | ✅ Activo con cron |
| Health checks | ✅ Estables post-fix |

### Pendientes Detectados
- Ninguno crítico visible en commits

---

### ⚠️ Reglas Permanentes — Aplicar Siempre
- **Nunca** prometer precio, fecha o descuento sin aprobación explícita de Jonathan
- **Ningún mensaje** sale sin revisión de Jonathan