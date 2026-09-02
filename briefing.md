## Briefing Diario — academia-bot

### Cambios recientes (últimos commits)
- **S04 completado**: MCP `mi-herramienta` desplegado en Supabase con 3 tools funcionales (`buscar_cliente`, `ultimos_commits`, `estado_bot`). Se eliminó el requisito de apiKey para el examen.
- **S05 completado**: Extractor multi-fuente (commits, calendario, Gmail) → Mem0 + cron nocturno. 5 queries semánticas documentadas y probadas.
- **S06 completado**: Edge function `whatsapp-bot` operativa (Groq + Mem0 + handoff).
- **S08 completado**: Fix de bug ping/health-check, video demo de 8 min documentado en `DEMO.md`.

### Estado de la config del bot
- **Infraestructura**: Edge functions en Supabase operativas (`whatsapp-bot`, `mi-herramienta`).
- **Memoria**: Mem0 integrado con extractor multi-fuente y cron nocturno activo.
- **MCP**: Herramienta propia funcional sin autenticación para examen.
- **Health-check**: Bug resuelto, monitoreo estable.

### Pendientes detectados
- **CLAUDE.md**: Archivo corrupto/garbled (codificación dañada). **Requiere restauración urgente** — contiene el contexto crítico del proyecto.
- **prompts/asistente.md**: También corrupto. Los prompts del asistente no son legibles.

### Recordatorios permanentes
> ⚠️ **Nunca prometer precio, fecha o descuento sin aprobación explícita de Jonathan.**
> 
> ⚠️ **Ningún mensaje sale sin su revisión.**

---

**Acción inmediata sugerida**: Restaurar `CLAUDE.md` y `prompts/asistente.md` desde backup o regenerar su contenido con Jonathan.