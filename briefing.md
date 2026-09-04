## 📋 Briefing Diario — academia-bot

### Cambios Recientes (últimos commits)

| Commit | Cambio |
|--------|--------|
| `b1e15f1` | **MCP sin auth**: el examen ahora llama `tools/list` sin necesitar apiKey |
| `8450606` | **MCP real operativo**: 3 tools disponibles (`buscar_cliente`, `ultimos_commits`, `estado_bot`) |
| `f03b118` | Demo documentada: link de video de 8 min en `DEMO.md` |
| `393ff5e` | Fix crítico: bug de ping/health-check en whatsapp-bot |
| `d120b76` | **S06 completo**: edge function whatsapp-bot con Groq + Mem0 + handoff |
| `cf73449` | Extractor multi-fuente (commits, calendario, gmail) → Mem0 + cron nocturno |
| `33329fd` | 5 queries semánticas de Mem0 documentadas y probadas |

---

### Estado de Config

| Componente | Estado |
|------------|--------|
| WhatsApp Bot (Groq + Mem0 + handoff) | ✅ Operativo |
| MCP (`mi-herramienta`) | ✅ Desplegado en Supabase, 3 tools activas |
| Mem0 | ✅ Con 5 queries semánticas + extractor multi-fuente |
| Health-check/ping | ✅ Fix aplicado |
| Cron nocturno | ✅ Activo |

---

### Pendientes Detectados

- **CLAUDE.md y prompts/asistente.md**: archivos corruptos/garbage data — requieren restauración urgente
- Sin acceso a prompts de sistema actualizados del asistente

---

### ⚠️ Reglas Permanentes — Aplican Siempre

1. **Nunca** prometer precio, fecha o descuento sin aprobación explícita de Jonathan
2. **Ningún** mensaje sale sin revisión de Jonathan
3. Handoff automático activo: cualquier tema sensible → escalación humana