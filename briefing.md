## Briefing Diario — academia-bot

### Cambios Recientes
- **S04**: MCP `mi-herramienta` operativo con 3 tools (`buscar_cliente`, `ultimos_commits`, `estado_bot`) — ya no requiere apiKey para `tools/list`
- **S05**: Extractor multi-fuente (commits, calendario, Gmail) → Mem0 + cron nocturno documentado; 5 queries semánticas probadas
- **S06**: Edge function `whatsapp-bot` lista (Groq + Mem0 + handoff), items 1/2/3/6/7 completados
- **S08**: Bug de ping/health-check corregido; video de demo (8 min) linkeado en DEMO.md

### Estado de Config
- **CLAUDE.md**: Archivo corrupto/garbage — **requiere restauración urgente**
- **prompts/asistente.md**: También corrupto — **revisar backup**
- MCP desplegado en Supabase, extractor y bot funcionales

### Pendientes Detectados
1. **CRÍTICO**: Restaurar CLAUDE.md y prompts/asistente.md desde backup (archivos de configuración esenciales dañados)
2. Verificar integridad de otros archivos de configuración
3. Confirmar que el cron nocturno del extractor está activo en producción

### Reglas Permanentes — Recordatorio
- ⛔ **Nunca** prometer precio, fecha o descuento sin aprobación explícita de Jonathan
- ⛔ **Ningún mensaje** sale sin su revisión previa