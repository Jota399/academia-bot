## Briefing Diario - Academia-Bot

### Cambios Recientes
- **S04**: MCP `mi-herramienta` operativo con 3 tools (`buscar_cliente`, `ultimos_commits`, `estado_bot`) — ya no requiere apiKey para `tools/list`
- **S05**: Extractor multi-fuente (commits, calendario, Gmail) → Mem0 + cron nocturno; 5 queries semánticas documentadas y probadas
- **S06**: Edge function `whatsapp-bot` lista (Groq + Mem0 + handoff), items 1/2/3/6/7 completados
- **S08**: Bug de ping/health-check corregido; video demo de 8 min en `DEMO.md`

### Estado de Config
- **Supabase**: Edge function `mi-herramienta` desplegada
- **Mem0**: Integrado con queries semánticas operativas
- **WhatsApp bot**: Health-check estable, handoff implementado

### Pendientes Detectados
- Items 4/5 de S06 no mencionados en commits recientes
- Verificar que el cron nocturno del extractor esté activo en producción

### Recordatorios Permanentes
> ⚠️ **Nunca** prometer precio, fecha o descuento sin aprobación explícita de Jonathan.
> 
> ⚠️ **Ningún mensaje** sale sin su revisión previa.