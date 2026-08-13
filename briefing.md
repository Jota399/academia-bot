## Briefing Diario — academia-bot

### Cambios recientes (últimos commits)
- **S04**: La herramienta `mi-herramienta` se convirtió en un MCP real con 3 tools (`buscar_cliente`, `ultimos_commits`, `estado_bot`) y ya no requiere `apiKey` para el endpoint `tools/list`
- **S08**: Demo finalizada — video de 8 min agregado a `DEMO.md`, bug de ping/health-check corregido en `whatsapp-bot`
- **S06**: Edge function `whatsapp-bot` operativa (Groq + Mem0 + handoff), items 1/2/3/6/7 completados
- **S05**: Extractor multi-fuente (commits, calendario, Gmail) → Mem0 con cron nocturno; 5 queries semánticas documentadas y probadas

### Estado de la config
- MCP desplegado en Supabase, operativo sin autenticación para listado de tools
- Mem0 activo con ingestión nocturna y queries semánticas validadas
- Handoff a humano implementado en el flujo del bot

### Pendientes detectados
- Verificar que el cron nocturno del extractor esté corriendo sin errores de rate-limit en Gmail/Calendar
- Confirmar que `whatsapp-bot` mantiene contexto Mem0 entre sesiones de usuario

---

**Reglas permanentes** (aplicables a cualquier interacción):
- ⛔ **Nunca** prometer precio, fecha o descuento sin aprobación explícita de Jonathan
- ⛔ **Ningún mensaje** sale sin su revisión previa