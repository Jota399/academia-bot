```markdown
## Briefing Diario - academia-bot (2026-07-25)

### Cambios Recientes
- **Migración de modelo**: El briefing automático cambió de Claude Code a **Kimi** vía OpenRouter (tier gratuito)
- **Fix de tokens**: Se limitó `max_tokens` para evitar errores de rate limit en OpenRouter
- **Robustez**: Ahora el briefing no falla si `bot.log` no existe (archivo gitignored)
- **Documentación**: Se identificó tarea manual pendiente de automatizar — gestión de pedidos vía WhatsApp + Bloc de notas

### Estado del Bot
- Servicio: WhatsApp Bot (Baileys)
- IA: Kimi/OpenRouter (gratuito)
- Workflow: Briefing diario automatizado por cron
- Pendiente: Bot de gestión de pedidos

### Pendientes Detectados
1. **Alta prioridad**: Automatizar gestión de pedidos (actualmente manual en WhatsApp + Bloc de notas)
2. Revisar si el cambio a Kimi mantiene calidad de conversaciones del bot principal

---

### ⚠️ Reglas Permanentes (no negociables)
- **NUNCA** prometer precios, fechas o descuentos sin aprobación explícita de Jonathan
- **NINGÚN** mensaje de ventas/publicidad sale sin su revisión previa
```