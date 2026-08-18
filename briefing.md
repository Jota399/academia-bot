## Briefing Diario - academia-bot

### Cambios Recientes
- **MCP real desplegado**: `mi-herramienta` ahora es un MCP funcional en Supabase con 3 tools (`buscar_cliente`, `ultimos_commits`, `estado_bot`) — ya no requiere apiKey para el examen
- **Extractor multi-fuente operativo**: Commits, calendario y Gmail → Mem0, con cron nocturno
- **WhatsApp-bot estable**: Fix de ping/health-check aplicado, edge function con Groq + Mem0 + handoff funcionando
- **Demo documentada**: Video de 8 minutos linkeado en DEMO.md

### Estado de Config
- Edge function `whatsapp-bot`: ✅ Activa (Groq + Mem0 + handoff)
- Edge function `mi-herramienta` (MCP): ✅ Desplegada en Supabase
- Mem0: ✅ 5 queries semánticas documentadas y probadas
- Cron nocturno: ✅ Configurado para ingesta multi-fuente

### Pendientes Detectados
- **Archivo CLAUDE.md corrupto**: Contenido ilegible (encoding dañado o binario) — requiere restauración urgente
- **Prompt de asistente corrupto**: `prompts/asistente.md` también con encoding dañado
- Verificar integridad del resto de prompts/documentación tras el merge

---

### ⛔ Reglas Permanentes
- **Nunca** prometer precio, fecha o descuento sin aprobación explícita de Jonathan
- **Ningún mensaje** sale sin revisión de Jonathan