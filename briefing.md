# 📋 Briefing Diario — academia-bot

**Fecha:** 2024-01-09 | **Hora:** ~10:30 AM

---

## Estado de la configuración

| Componente | Estado | Notas |
|------------|--------|-------|
| `prompts/asistente.md` | ✅ Al día | Reglas de aprobación claras, tono definido |
| `prompts/redactor.md` | ✅ Al día | Diferenciación WhatsApp/correo, marca de borrador |
| `prompts/analista.md` | ✅ Al día | Framework de análisis operativo completo |
| `prompts/ejemplos-few-shot.md` | ✅ Al día | 4 ejemplos sólidos, patrones de voz bien documentados |
| `CLAUDE.md` | ✅ Al día | Estructura del proyecto y reglas de seguridad actualizadas |

**Veredicto:** Config al día. Todas las personas están sincronizadas con las reglas permanentes.

---

## Pendientes detectados

**🟡 Archivo no encontrado:** `bot.log` — No hay logs para revisar errores recientes. Si el bot está corriendo en producción, verificar que el logging esté activo en `index.js` o `src/`.

**🟡 No hay `.gitignore` visible en el briefing:** Aunque `CLAUDE.md` lista qué no commitear, confirmar que `.gitignore` existe y cubre:
- `.env`
- `.wwebjs_auth/`
- `.wwebjs_cache/`
- `node_modules/`
- `bot.log`

---

## Recordatorios de seguridad (siempre vigentes)

> 🔒 **Nunca** prometer precio, fecha o descuento sin aprobación de Jonathan.
> 
> 👁️ **Ningún mensaje** sale por WhatsApp sin su revisión previa.
>
> 📝 Todo output debe marcarse como borrador o pendiente de aprobación cuando aplique.

---

## Acción sugerida para hoy

1. Verificar existencia de `.gitignore` y que `bot.log` esté siendo generado (aunque no commiteado).
2. Si hay instancia corriendo, pedir `tail -20 bot.log` para revisar salud operativa.

---

*Briefing generado. ¿Necesitas que profundice en algo?*
