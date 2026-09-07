## 📋 Briefing Diario — academia-bot

### Cambios Recientes
- **S04**: MCP `mi-herramienta` desplegado en Supabase con 3 tools (`buscar_cliente`, `ultimos_commits`, `estado_bot`). Ya no requiere `apiKey` para `tools/list`.
- **S05**: Extractor multi-fuente (commits, calendario, Gmail) → Mem0 + cron nocturno. Documentadas 5 queries semánticas probadas.
- **S06**: Edge function `whatsapp-bot` operativa (Groq + Mem0 + handoff).
- **S08**: Fix de bug en ping/health-check de `whatsapp-bot`. Demo final documentada con video de 8 min en `DEMO.md`.

### Estado de Config
- **MCP**: Funcionando sin autenticación para listado de tools.
- **Mem0**: Integrado con flujo de memoria activo.
- **WhatsApp bot**: Salud verificada, handoff operativo.
- **Demo**: Video listo y documentado.

### Pendientes Detectados
- Verificar estabilidad del cron nocturno de extracción.
- Confirmar que `buscar_cliente` tiene cobertura de casos edge (clientes nuevos sin historial).

---

### ⚠️ Reglas Permanentes
- **Nunca** prometer precio, fecha o descuento sin aprobación explícita de Jonathan.
- **Ningún mensaje** sale sin su revisión previa.