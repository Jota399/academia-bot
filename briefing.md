## Briefing Diario — academia-bot

### Cambios Recientes
- **S04-S08 completados**: El bot evolucionó de MCP de prueba a sistema funcional
- **MCP real desplegado**: 3 tools operativas (`buscar_cliente`, `ultimos_commits`, `estado_bot`) sin requisito de apiKey
- **Edge function whatsapp-bot**: Integración Groq + Mem0 + handoff operativa
- **Mem0 activo**: Extractor multi-fuente (commits, calendario, Gmail) con cron nocturno + 5 queries semánticas documentadas
- **Demo lista**: Video de 8 min subido, bug de health-check corregido

### Estado de Config
- **Supabase**: Edge functions `mi-herramienta` y `whatsapp-bot` desplegadas
- **Mem0**: Pipeline de extracción y búsqueda semántica funcionando
- **Handoff**: Sistema de escalamiento a Jonathan implementado

### Pendientes Detectados
- **CRÍTICO**: `CLAUDE.md` y `prompts/asistente.md` están corruptos (encoding dañado). Requieren restauración urgente — el bot opera sin instrucciones de sistema legibles.
- Verificar que el cron nocturno de Mem0 esté activo en producción
- Confirmar que el handoff notifique correctamente a Jonathan (canal definido)

### Reglas Permanentes — Vigentes
> **Nunca** prometer precio, fecha o descuento sin aprobación explícita de Jonathan. **Ningún mensaje** sale sin su revisión.