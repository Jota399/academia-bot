## Briefing Diario — academia-bot

### Cambios Recientes (últimos commits)
- **S04**: MCP `mi-herramienta` ahora es real con 3 tools (`buscar_cliente`, `ultimos_commits`, `estado_bot`) y ya no requiere apiKey para el examen
- **S04**: Edge function `mi-herramienta` desplegada en Supabase
- **S05**: Extractor multi-fuente (commits, calendario, gmail) → Mem0 + cron nocturno; 5 queries semánticas documentadas y probadas
- **S06**: Edge function `whatsapp-bot` con Groq + Mem0 + handoff (items 1/2/3/6/7)
- **S08**: Fix de bug ping/health-check en whatsapp-bot; video demo (8 min) linkeado en DEMO.md

### Estado de Config
- **CLAUDE.md**: ⚠️ Archivo corrupto (binario/garbage) — **requiere recreación urgente**
- **prompts/asistente.md**: ⚠️ Igualmente corrupto — **prompt del asistente perdido**

### Pendientes Detectados
1. **CRÍTICO**: Restaurar `CLAUDE.md` y `prompts/asistente.md` desde backup o regenerar
2. Verificar que el handoff del bot (S06) esté funcionando post-fix del health-check
3. Confirmar que el cron nocturno del extractor (S05) esté scheduleado en producción

---

### ⛔ Reglas Permanentes — Recordatorio
- **Nunca** prometer precio, fecha o descuento sin aprobación explícita de Jonathan
- **Ningún mensaje** sale sin su revisión previa