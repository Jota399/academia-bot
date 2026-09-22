## Briefing Diario — academia-bot

### Cambios recientes (últimos commits)
- **S04 completado**: MCP `mi-herramienta` desplegado en Supabase con 3 tools operativas: `buscar_cliente`, `ultimos_commits`, `estado_bot`. Ya no requiere apiKey para el examen (tools/list sin credenciales).
- **S05 completado**: Extractor multi-fuente (commits, calendario, gmail) → Mem0 + cron nocturno. 5 queries semánticas documentadas y probadas.
- **S06 completado**: Edge function `whatsapp-bot` (Groq + Mem0 + handoff) — items 1/2/3/6/7.
- **S08 completado**: Fix de bug ping/health-check, link de video demo (8 min) agregado a DEMO.md.

### Estado de la config
- **Archivos dañados detectados**: `CLAUDE.md` y `prompts/asistente.md` contienen contenido corrupto/codificado (no legible). Requieren restauración urgente.
- MCP y edge functions operativos según commits.
- Mem0 integrado con flujo de memoria activo.

### Pendientes detectados
1. **Restaurar `CLAUDE.md`** — contiene instrucciones críticas del proyecto, actualmente ilegible.
2. **Restaurar `prompts/asistente.md`** — prompt del asistente corrupto.
3. Verificar que el handoff del S06 esté completamente funcional (items 4/5/8 pendientes de confirmación).

---

### 🔒 Reglas permanentes — recordatorio
- **Nunca** prometer precio, fecha o descuento sin aprobación explícita de Jonathan.
- **Ningún mensaje** sale sin su revisión previa.