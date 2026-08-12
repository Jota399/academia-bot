## Briefing Diario — Academia-Bot

### Cambios Recientes
- **MCP real desplegado**: `mi-herramienta` ahora es un MCP con 3 tools (`buscar_cliente`, `ultimos_commits`, `estado_bot`), sin requisito de apiKey para el examen
- **Extractor multi-fuente operativo**: commits + calendario + Gmail → Mem0, con cron nocturno
- **WhatsApp-bot funcional**: Groq + Mem0 + handoff, bug de health-check corregido
- **Demo lista**: video de 8 min documentado en DEMO.md

### Estado de Config
- Edge functions: `whatsapp-bot` y `mi-herramienta` desplegadas en Supabase
- Mem0: 5 queries semánticas documentadas y probadas
- MCP: tools/list accesible sin credenciales (modo examen)

### Pendientes Detectados
- CLAUDE.md y prompts/asistente.md con corrupción de caracteres (encoding issue) — **requiere revisión urgente**
- S06 items 4 y 5 pendientes según commits previos

### Recordatorio de Reglas Permanentes
> **Nunca** prometer precio, fecha o descuento sin aprobación explícita de Jonathan. **Ningún mensaje** sale sin su revisión previa.