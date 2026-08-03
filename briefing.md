## Briefing Diario — academia-bot (2026-07-25)

### Cambios Recientes
- **S04**: MCP server real desplegado en Supabase con 3 tools (`buscar_cliente`, `ultimos_commits`, `estado_bot`) — ya no requiere apiKey
- **S05**: Extractor multi-fuente (commits, calendario, Gmail) → Mem0 + cron nocturno; 5 queries semánticas documentadas
- **S06**: Edge function `whatsapp-bot` (Groq + Mem0 + handoff) — items 1/2/3/6/7 completados
- **S08**: Fix de bug ping/health-check en whatsapp-bot; video demo de 8 min linkeado en `DEMO.md`

### Estado de Config
- **CLAUDE.md**: ⚠️ Archivo corrupto (contenido binario/garbage) — **requiere restauración urgente**
- **prompts/asistente.md**: ⚠️ Igualmente corrupto — **no usable en producción**

### Pendientes Críticos
1. **Restaurar CLAUDE.md y prompts/asistente.md** — sin estos el bot opera sin guía de comportamiento
2. Verificar que el handoff S06→humano funcione correctamente post-fix de health-check
3. Validar que el cron nocturno de S05 esté activo en producción

---

### ⛔ Reglas Permanentes (recordatorio)
- **Nunca** prometer precio, fecha o descuento sin aprobación explícita de Jonathan
- **Ningún mensaje** sale sin su revisión previa