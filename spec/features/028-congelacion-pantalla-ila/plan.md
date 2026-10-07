# 028 · Congelación de pantalla tras el fallo ILA - Plan

_Cómo se implementa lo descrito en `spec.md`. Debe respetar la `constitution/`._

## Enfoque

La modal de bloqueo es **global** (markup estático en `index.html`, como `loginModal`), no pertenece a la vista Archivos: así puede aparecer aunque el lector haya navegado a otra vista en los 7 segundos. La lógica vive en un módulo nuevo `bloqueo.js` (dueño del markup, patrón `subida.js` de la 027) que expone dos funciones de programación/cancelación; `terminal.js` (026) solo las invoca en los dos puntos de interés. Todo es cliente: timers + CSS, sin backend ni librerías.

## Implementación

1. `src/index.html` — markup nuevo junto a `#loginModal`:

   ```html
   <div class="modal freeze-modal" id="freezeModal">
       <div class="freeze-content">
           <div class="freeze-symbols" id="freezeSymbolsTop"></div>
           <div class="freeze-center">
               <div class="freeze-title">■■ BLOQUEO DE SEGURIDAD — NODO 136 ■■</div>
               <p class="freeze-message">Señal de la terminal 136 corrompida. El nodo requiere reinicio manual.</p>
               <pre class="freeze-dump" id="freezeDump"></pre>
               <p class="freeze-alert">— ESPERANDO REINICIO MANUAL EN LA TERMINAL 136 —</p>
           </div>
           <div class="freeze-symbols" id="freezeSymbolsBottom"></div>
       </div>
   </div>
   ```

   Sin botones de ningún tipo. Y `<script src="js/bloqueo.js">` **antes** de `js/terminal.js` (línea ~176) para que su listener de `Escape` esté registrado primero.

2. `src/js/bloqueo.js` (nuevo, IIFE) —
   - `var timer` (timeout de 7000 ms) y `var interval` (regeneración de símbolos ~200 ms), `var activo`.
   - Alfabeto de glitch: `░▓█▄▀▒■◄►▲▼╬╣╠╦╩═║╔╗╚╝…` (monospace del sitio).
   - `programarCongelacionILA()`: limpia un timer anterior (anti-doble-disparo) y programa `mostrar()` a 7 s.
   - `cancelarCongelacionILA()`: limpia el timer si aún no disparó (no tiene efecto una vez mostrado — no hay cierre).
   - `mostrar()`: si `#freezeModal` existe y no está activo → `.active`, pinta contenido inicial y arranca el `setInterval` de regeneración (filas de símbolos arriba/abajo + volcado hex falso de ~8 líneas con direcciones `0x…` y bytes aleatorios).
   - Listener `keydown` en **fase capture** de `document`: si `activo` y la tecla es `Escape` → `preventDefault` + `stopPropagation` + `stopImmediatePropagation` (ningún otro listener de la página recibe el Escape).
   - Exposición: `window.programarCongelacionILA` y `window.cancelarCongelacionILA` (con guard `&&` en el llamador, como `abrirTerminalILA`).

3. `src/js/terminal.js` —
   - Último paso de `SECUENCIA_REANUDACION`: la acción `a` pasa a ser una función que llama `deshabilitarInput()` **y** `window.programarCongelacionILA && window.programarCongelacionILA()`.
   - `cerrarTerminal()`: suma `window.cancelarCongelacionILA && window.cancelarCongelacionILA()` (cierre con `×`, Escape o fondo → cancela el bloqueo).
   - Navegar de vista **no** llama `cerrarTerminal`, así que el timer sigue corriendo y el freeze aparece igual (modal global).

4. `src/css/styles.css` (bloque nuevo al final del archivo) —
   - `.freeze-modal { z-index: 400; background-color: rgba(0, 0, 0, 0.92); }` (por encima de los `z-index: 300` de previews/terminal; negro ya usado por `.modal`, sin tokens nuevos).
   - `.freeze-content`: `100vw × 100vh`, flex column, `justify-content: space-between`, padding, `overflow: hidden`; `::after` con `repeating-linear-gradient` de scanlines (negro transparente, `pointer-events: none`).
   - `.freeze-center`: centrado, `text-align: center`.
   - `.freeze-title`: `--accent-glow`, letter-spacing, animaciones nuevas `freeze-jitter` (`steps`, ±2 px) + `freeze-flicker` (opacidad).
   - `.freeze-message`: `--text-primary`.
   - `.freeze-dump`: monospace, `--link-color` atenuado sobre `--header-bg`, `white-space: pre`, borde `--border-color`.
   - `.freeze-alert`: `--accent-glow` con la animación **existente** `terminal-blink` (reuso de la 026).
   - `.freeze-symbols`: `--text-muted`, `white-space: pre`, centrado.
   - `@media (max-width: 600px)`: fuentes más chicas y padding reducido.

5. `src/index.html` — `<script src="js/bloqueo.js"></script>` junto a los demás.

## Decisiones

- **Feature nueva `028` (no amendar 026)** — 026 está cerrada y commiteada; este es un artefacto nuevo (modal, CSS y smoke propios) que depende de ella. Decisión del usuario.
- **Cerrar la terminal cancela el bloqueo; navegar no** — decisión del usuario: `×`/Escape/fondo dentro de los 7 s cancelan (así `smoke026` sigue verde sin tocar); cambiar de vista sin cerrar deja correr el timer y el freeze igual golpea (es global).
- **Sin persistencia: F5 lo limpia** — decisión del usuario: sin `localStorage`/`sessionStorage`, sin resets ocultos.
- **Contenido "pánico de kernel"** — decisión del usuario: título glitch + símbolos + hex dump vivo + aviso parpadeante, con la paleta dorado/rojo/gris existente y scanlines de negro transparente (no es token de color nuevo).
- **Escape inerte (bloqueo total)** — decisión del usuario: capture + `stopImmediatePropagation` mientras está activo; registrado en la carga, antes que los listeners de `main.js`/`terminal.js`/`subida.js`.
- **Markup en `index.html`, lógica en `bloqueo.js`** — decisión del usuario: patrón de la 027; global como `loginModal` para sobrevivir a cambios de hash.
- **Solo dispara tras el fallo final** — el gatillo es el último paso de `SECUENCIA_REANUDACION`; si el lector nunca escribe "Continuar", no hay bloqueo.
- **`z-index: 400`** — los modales existentes usan 200/300; 400 queda arriba de todo sin tocar los existentes.

## Riesgos

- **Timer huérfano** — cubierto: `cancelarCongelacionILA()` en `cerrarTerminal()`; el timeout vive en `bloqueo.js`, separado de los timers de la terminal (limpiar la terminal no lo toca, y `programarCongelacionILA` limpia el anterior antes de programar).
- **Doble disparo** (reabrir y volver a fallar) — `programar()` limpia el timer previo y `mostrar()` guarda `activo`.
- **smoke026 se rompe si el freeze aparece a mitad de sus checks** — cubierto con la decisión "cerrar cancela": el smoke cierra la terminal con Escape ~1 s después del fallo → timer cancelado → 46/46 intacto.
- **Escape cierra modales de detrás** — cubierto con el listener capture; verificado en el smoke (Escape no cierra el freeze ni la terminal debajo).
- **Colisión de ids** — todos los ids van prefijados `freeze*` (convención 018).
- **El smoke alarga** — secuencia inicial ≈ 6 s + reanudación ≈ 4 s + espera de 7 s + caso de cancelación ≈ 8 s ≈ 25-30 s totales; se espera con `poll`, no con tiempos fijos.
