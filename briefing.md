## 📋 Briefing Diario - 2026-07-26

### Cambios recientes
- **Agente de cron (S04)**: Ahora usa MCP de GitHub real (list_commits, get_file_contents, create_pull_request) y **abre PR en lugar de push directo**
- **Fix**: Límite de `max_tokens` ajustado para tier gratuito de OpenRouter
- **Fix**: El briefing ya no falla si `bot.log` no existe (está en `.gitignore`)
- **Documentación**: Pendiente anotado — automatizar gestión de pedidos vía WhatsApp + Bloc de notas

### Estado de la config
- Proveedor de LLM: **Kimi vía OpenRouter** (migrado desde Claude Code)
- Workflow `briefing-diario`: Activo en cron con agente autónomo
- Proceso: Agente → PR → revisión manual (ya no push directo)

### Pendientes detectados
1. **Automatizar gestión de pedidos WhatsApp + Bloc de notas** — marcado como tarea manual pendiente
2. Revisar PRs del agente de cron antes de merge

---

### 🚨 Reglas permanentes (recordatorio)
- **Nunca** prometer precio, fecha o descuento sin aprobación explícita de Jonathan
- **Ningún mensaje** sale sin su revisión personal