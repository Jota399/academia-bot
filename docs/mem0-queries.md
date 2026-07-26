# Queries de Mem0 — seguimiento de clientas (Jonathan / academia-bot)

Adaptadas al negocio real: ayudar a negocios pequeños a implementar IA con Claude,
enfocado en que la IA lleve el seguimiento de clientas. Todas corren contra
`user_id=jonathan-academia-bot`, alimentado por `scripts/mem0-extractor.mjs`
(commits + calendario + gmail).

## 1. ¿Qué me está preguntando una clienta puntual? ✅ probada

**Query:** `correo de Panadería Doña Rosa preguntando el precio del bot de WhatsApp`

Búsqueda semántica, no por palabra exacta: sin usar "correo" ni "precio" literal
en los datos guardados con esas palabras exactas, Mem0 conectó tres hechos de
tres fuentes distintas:
- El correo real (`gmail`) preguntando precio del plan mensual.
- El evento de calendario (`calendario`) de la llamada de descubrimiento con la
  misma clienta.
- El commit (`commits`) donde quedó documentado que el seguimiento de pedidos
  todavía es manual (WhatsApp + Bloc de notas).

Esto es exactamente el "segundo cerebro": una pregunta en lenguaje natural cruza
las 3 fuentes y arma el contexto completo de esa clienta sin que yo tenga que
buscar en 3 lugares distintos.

## 2. ¿Qué le quita más tiempo a mi negocio cada semana? ✅ probada

**Query:** `qué le quita más tiempo a Jonathan cada semana en su negocio`

Devolvió el hecho guardado en la sesión de hoy: que el seguimiento de clientas
es la prioridad #1 y lo que más tiempo consume — útil como recordatorio de foco
cada vez que se evalúa una nueva feature o cliente.

## 3. ¿Qué negocios tengo pendientes de responder o decidir?

**Query:** `clientas o negocios prospecto pendientes de seguimiento o respuesta`

Pensada para correr cada mañana antes de revisar WhatsApp/correo: junta correos
sin responder (ej. precio pendiente de aprobación) y eventos de calendario
donde el negocio está esperando una decisión (ej. Consultorio Dental Sonrisas).

## 4. ¿Qué citas tengo agendadas con clientas prospecto?

**Query:** `citas o llamadas agendadas con negocios prospecto próximamente`

Pensada para el briefing de la mañana — trae solo los eventos de `calendario`,
útil para no llegar a una llamada sin contexto de qué se habló antes.

## 5. ¿Qué cambió recientemente en el bot?

**Query:** `qué cambió recientemente en el repo de academia-bot según los commits`

Complementa al workflow `briefing-diario.yml` (S03): mientras ese genera un
resumen con Kimi, esta query permite preguntarle a Mem0 directamente sin
esperar al cron.

---

**Nota de precio/compromisos:** ninguna de estas queries autoriza a un bot a
responder precio, fecha o descuento directamente a una clienta — eso sigue
requiriendo aprobación explícita de Jonathan (regla permanente del proyecto).
Mem0 aquí es memoria de contexto para decidir más rápido, no un canal de
respuesta automática.
