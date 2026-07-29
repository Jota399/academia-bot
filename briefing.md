## Briefing Daily — academia-bot

### Cambios recientes
- **S08**: Demo final completada — video de 8 min agregado a `DEMO.md`, bug de health-check/ping corregido en `whatsapp-bot`
- **S06**: Edge function `whatsapp-bot` operativa (Groq + Mem0 + handoff)
- **S05**: Extractor multi-fuente (commits, calendario, gmail) → Mem0 + cron nocturno; 5 queries semánticas documentadas
- **S04**: MCP real desplegado con 3 tools (`buscar_cliente`, `ultimos_commits`, `estado_bot`) — ya no requiere apiKey para `tools/list`

### Estado de config
- CLAUDE.md y `prompts/asistente.md` están **corruptos/garbled** (encoding roto). Requieren restauración urgente.
- Edge functions: `whatsapp-bot` y `mi-herramienta` (MCP) desplegadas en Supabase.

### Pendientes detectados
1. **CRÍTICO**: Restaurar `CLAUDE.md` y `prompts/asistente.md` desde backup o regenerar.
2. Verificar que el cron nocturno del extractor esté activo en producción.
3. Validar que Mem0 tenga contexto actualizado tras los últimos commits.

---

### Recordatorio permanente
> ❌ **Nunca** prometer precio, fecha o descuento sin aprobación explícita de Jonathan.
> ✋ **Ningún mensaje** sale sin su revisión.