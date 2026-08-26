## Briefing Diario — academia-bot

### Cambios Recientes
- **S04**: MCP `mi-herramienta` ahora es real con 3 tools (`buscar_cliente`, `ultimos_commits`, `estado_bot`). Se quitó el requisito de apiKey — el examen llama `tools/list` sin credenciales.
- **S05**: Extractor multi-fuente (commits, calendario, gmail) → Mem0 + cron nocturno. Documentadas 5 queries semánticas de Mem0.
- **S06**: Edge function `whatsapp-bot` operativa (Groq + Mem0 + handoff).
- **S08**: Fix de bug ping/health-check en `whatsapp-bot`. Video demo de 8 min añadido a `DEMO.md`.

### Estado de Config
- **Archivos críticos corruptos**: `CLAUDE.md` y `prompts/asistente.md` presentan codificación dañada (binario/garbage). **Requiere restauración urgente** — sin estos, el contexto del asistente está perdido.
- MCP desplegado en Supabase, sin autenticación para listado de tools.
- WhatsApp-bot: health-check establecido, demo documentada.

### Pendientes Detectados
1. **Restaurar `CLAUDE.md` y `prompts/asistente.md`** — prioridad crítica.
2. Verificar que el handoff del bot funcione correctamente sin el contexto corrupto.
3. Confirmar que el cron nocturno del extractor está activo en producción.

---

### Reglas Permanentes
> - **Nunca** prometer precio, fecha o descuento sin aprobación explícita de Jonathan.
> - **Ningún mensaje** sale sin su revisión previa.