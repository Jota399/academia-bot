## 📋 Briefing Diario - academia-bot

### Cambios recientes (últimos commits)
- **MCP server funcional**: `mi-herramienta` ahora es un MCP real con 3 tools (`buscar_cliente`, `ultimos_commits`, `estado_bot`) — ya desplegado en Supabase
- **Sin apiKey para examen**: el MCP ahora responde `tools/list` sin credenciales (requisito del examen)
- **WhatsApp-bot edge function**: integración completa Groq + Mem0 + handoff a producción
- **Mem0 activo**: extractor multi-fuente (commits, calendario, gmail) con cron nocturno + 5 queries semánticas documentadas
- **Demo lista**: video de 8 min subido, bug de ping/health-check corregido

### Estado de configuración
| Componente | Estado |
|------------|--------|
| MCP Supabase | ✅ Producción, sin auth para tools/list |
| WhatsApp edge function | ✅ Deployed (Groq + Mem0) |
| Mem0 + cron nocturno | ✅ Activo |
| Handoff a humano | ✅ Configurado |

### Pendientes detectados
- **Archivos corruptos**: `CLAUDE.md` y `prompts/asistente.md` muestran contenido binario/garabato — requieren restauración urgente
- Verificar que el handoff funcione correctamente sin los prompts base

---

### ⛔ Reglas permanentes (aplicables hoy)
> **Sin excepciones**: Nunca prometer precio, fecha o descuento sin aprobación explícita de Jonathan.  
> **Sin excepciones**: Ningún mensaje sale sin su revisión previa.