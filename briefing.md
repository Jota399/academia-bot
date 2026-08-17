## Briefing Diario — Academia-Bot

### Cambios Recientes
- **MCP desacoplado**: `mi-herramienta` ahora es un MCP real con 3 tools (`buscar_cliente`, `ultimos_commits`, `estado_bot`) — ya no requiere apiKey para `tools/list`
- **WhatsApp Bot funcional**: Edge function con Groq + Mem0 + handoff, fix de bug en health-check
- **Memoria activa**: Extractor multi-fuente (commits, calendario, gmail) + cron nocturno, 5 queries semánticas documentadas
- **Demo lista**: Video de 8 min linkeado en `DEMO.md`

### Estado de Config
- Edge functions desplegadas en Supabase
- MCP operativo sin autenticación en endpoint de listado
- Integración Mem0-Groq-WhatsApp estable

### Pendientes Detectados
- Archivos `CLAUDE.md` y `prompts/asistente.md` con encoding corrupto — requieren restauración urgente
- Verificar handoff humano en producción real

### Reglas Permanentes
> ⚠️ **Nunca** prometer precio, fecha o descuento sin aprobación explícita de Jonathan.  
> **Ningún mensaje** sale sin su revisión previa.