# Briefing Diario — academia-bot

## Cambios recientes

| Commit | Cambio |
|--------|--------|
| `b1e15f1` | MCP sin autenticación: `mi-herramienta` ahora responde `tools/list` sin apiKey |
| `8450606` | MCP operativo con 3 tools: `buscar_cliente`, `ultimos_commits`, `estado_bot` |
| `f03b118` | Demo documentada: link de video 8 min en `DEMO.md` |
| `393ff5e` | Fix crítico: bug de ping/health-check en `whatsapp-bot` |
| `d120b76` | Core del bot: edge function con Groq + Mem0 + handoff |
| `cf73449` + `33329fd` | Pipeline de memoria: extractor multi-fuente → Mem0 + 5 queries semánticas testeadas |

**Arquitectura actual:** Bot (Groq) ↔ Mem0 (memoria) ↔ MCP (herramientas) — todo serverless en Supabase.

---

## Estado de configuración

| Componente | Estado |
|------------|--------|
| `whatsapp-bot` (edge function) | ✅ Deployed, health-check fixado |
| `mi-herramienta` (MCP) | ✅ Deployed, 3 tools disponibles |
| Mem0 | ✅ 5 queries semánticas documentadas |
| Extractor + cron nocturno | ✅ Operativo (commits, calendario, gmail) |

**Nota:** El CLAUDE.md y `prompts/asistente.md` aparecen corruptos (encoding). Revisar si es intencional o necesita fix.

---

## Pendientes detectados

1. **Corruptos:** `CLAUDE.md` y `prompts/asistente.md` — verificar si afectan al sistema o son placeholder
2. **Items S06 sin detalle:** commit menciona "item 1/2/3/6/7" — faltan 4 y 5, o están en otros commits
3. **Monitoreo:** cron nocturno activo pero sin alertas de fallo documentadas

---

## Reglas permanentes 🔒

> **Nunca** prometer precio, fecha o descuento sin aprobación explícita de Jonathan.  
> **Ningún mensaje** sale sin su revisión previa.