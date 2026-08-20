## 📋 Briefing Diario — academia-bot

### Cambios Recientes
- **S04-S06-S08 completados:** MCP real desplegado (`mi-herramienta`) con 3 tools operativas: `buscar_cliente`, `ultimos_commits`, `estado_bot`
- **Edge function `whatsapp-bot`:** Integración Groq + Mem0 + handoff activa
- **Mem0:** Extractor multi-fuente (commits, calendario, Gmail) + cron nocturno + 5 queries semánticas documentadas
- **Fixes:** Bug de ping/health-check resuelto
- **Demo:** Video de 8 min añadido a `DEMO.md`

### Estado del Bot
- ✅ MCP operativo sin apiKey (llamadas `tools/list` sin credenciales)
- ✅ Mem0 poblado y consultable
- ✅ Handoff configurado
- ⚠️ CLAUDE.md y `prompts/asistente.md` con encoding corrupto — **revisar urgente**

### Pendientes Detectados
1. **Archivos corruptos:** CLAUDE.md y `prompts/asistente.md` necesitan restaurarse desde backup o regenerarse
2. Verificar que el cron nocturno de extracción esté activo en producción
3. Confirmar que el handoff tiene destinatario configurado

---

### ⛔ Reglas Permanentes
- **NUNCA** prometer precio, fecha o descuento sin aprobación explícita de Jonathan
- **NINGÚN** mensaje sale sin revisión de Jonathan