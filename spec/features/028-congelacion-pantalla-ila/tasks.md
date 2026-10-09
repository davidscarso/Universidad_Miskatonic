# 028 · Congelación de pantalla tras el fallo ILA - Tareas

## Implementación

- [x] `src/index.html` — markup `#freezeModal` (`.modal.freeze-modal` + `.freeze-content` con símbolos, título, mensaje, dump y aviso; **sin** botones) junto a `#loginModal`; `<script src="js/bloqueo.js">` antes de `js/terminal.js`.
- [x] `src/js/bloqueo.js` — IIFE nueva: `window.programarCongelacionILA()` (timeout de 7 s, anti-doble-disparo), `window.cancelarCongelacionILA()`, `mostrar()` (`.active` + `setInterval` que regenera filas de símbolos y volcado hex falso) y listener de `Escape` en fase capture con `stopImmediatePropagation`.
- [x] `src/js/terminal.js` — acción final de `SECUENCIA_REANUDACION` → `deshabilitarInput()` + `programarCongelacionILA()`; `cerrarTerminal()` → `cancelarCongelacionILA()`.
- [x] `src/css/styles.css` — bloque `.freeze-*` (z-index 400, 100vw×100vh absoluto, scanlines, `freeze-jitter`/`freeze-flicker`, reuso de `terminal-blink`, `@media ≤600px`), sin tokens de color nuevos.

## Ampliación: consola secreta

- [x] `src/index.html` — markup `#consoleModal` (réplica de la terminal 026 con ids `console*`: `×`, maximizar `□/⧉`, `#consoleOutput`, prompt + `#consoleInput`) junto a `#freezeModal`.
- [x] `src/js/bloqueo.js` — `abrirConsola()` (banner + foco), `cerrarConsola()`, `procesarEntradaConsola()` (vacío → nada; resto → eco + `ERROR: comando no reconocido.`), bindings de `×`/maximizar/fondo/Enter, y `Escape` como toggle dentro del listener capture actual.
- [x] `src/css/styles.css` — bloque `.console-*`: z-index 500, 80vw×80vh ↔ 100%, negro `#000000` + ámbar `#ffb000` (único color nuevo, pedido), `@media ≤600px`.

## Validación

- [x] `node --check src/js/*.js` (12/12)
- [x] Smoke028 nuevo (CDP, puerto 9448) → **17/17**: no aparece antes de 7 s → aparece a los 7 s tras el fallo → cubre 100vw×100vh sin huecos → sin botones de cierre → Escape/clic no lo cierran → atrás bloqueado (body `overflow: hidden`, terminal `.active` debajo) → símbolos vivos (el texto cambia entre muestras) → animación activa → cerrar la terminal antes de 7 s cancela → sin errores de consola.
- [x] Smoke028 ampliado con la consola: ESC abre (freeze sigue activo) → banner + foco → maximizar 80↔100 → comando arbitrario → eco + "no reconocido" → vacío no hace nada → ESC/×/fondo cierran sin desbloquear → sin errores de consola.
- [x] Regresión: suites de 023 (27), 024 (35), 025 (26), 026 (46) y 027 (50) en verde.
- [x] Validar contra los criterios de aceptación de `spec.md`.
- [x] Validar los criterios nuevos de la consola secreta.
- [x] Regresión final 023-027 tras la ampliación.

## Documentación

- [x] Crear `spec/features/028-congelacion-pantalla-ila/` con `spec.md`, `plan.md` y `tasks.md`.
- [x] Mover la feature a "Hecho" en `../../constitution/roadmap.md` (siguiente libre: `029`).
- [x] Actualizar `AGENTS.md` y `README.md` con el nuevo estado, siguiente número (`001-028` / `029`) y `bloqueo.js` en el árbol/Key Files.
- [x] Amendar la entrada 28 del `roadmap.md` con la consola secreta (ESC, negro/ámbar, "comando no reconocido").
