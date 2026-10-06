# 026 · Terminal simulador de servidores (ILA) - Plan

_Cómo se implementa lo descrito en `spec.md`. Debe respetar la `constitution/`._

## Enfoque

La terminal es una **segunda modal dentro de la vista Archivos** (mismo patrón que `filePreviewModal` y que `emailPreviewModal` en Correo): el markup vive en `renderArchivos()` y la lógica en un módulo nuevo `terminal.js` que expone dos funciones (`abrirTerminalILA` y `bindTerminalILA`) de las cuales `archivos.js` se encarga de llamar. El simulador es una máquina de estados secuencial con `setTimeout`s limpiables: no hay backend, todo es ficción en el cliente.

## Implementación

1. `src/js/archivos.js` — `folderContents.investigacion`: agregar `{ name: 'Reporte ILA.txt', type: 'text', content: 'reporteILA', meta: '6 KB • 16 Oct 1928', icon: '&#128187;' }` (icono 💻 para diferenciarlo de los `.txt` de texto).
2. `src/js/archivos.js` — `fileContents.reporteILA`: párrafos ficticios de contexto + `<a href="#" class="terminal-launch">▸ Ejecutar simulador de terminal (ILA)</a>`.
3. `src/js/archivos.js` — `renderArchivos()`: markup nuevo `#terminalModal` (`.modal.terminal-modal` + `.modal-content.terminal-content` con header `#terminalHeader`/`#terminalTitle`, botones `#terminalMaximizeBtn` y `#terminalCloseBtn`, `.terminal-body` con `#terminalOutput` y `#terminalInputLine` con prompt `ila@kaliber:~$` + `#terminalInput`) justo después de `#filePreviewModal`; y al final, tras `bindHandlers(main)`, `if (window.bindTerminalILA) window.bindTerminalILA(main);`.
4. `src/js/archivos.js` — `bindHandlers()`: delegación de clic sobre el `#filePreviewModal` para `.terminal-launch` con `preventDefault()` (patrón de la 019: no alterar el hash) que llama a `window.abrirTerminalILA()`.
5. `src/js/archivos.js` — `activeKeydown` (Escape): si `.terminal-modal.active` existe, **no** cerrar la preview (la terminal se cierra con su propio listener y el guard evita cerrar ambas de una).
6. `src/js/terminal.js` (nuevo, IIFE) —
   - `limpiarTimers()` + lista de `setTimeout` pendientes; se limpia al cerrar y al reabrir (evita líneas fantasma).
   - `agregarLinea(texto, clase)` → `<div class="term-line …">` con `textContent` (sin `innerHTML` con datos del usuario; el eco del comando se agrega como texto).
   - `reproducir(secuencia)` — array de pasos `{ texto, clase, delay }` encadenado con `setTimeout`; los pasos con `prog` ejecutan `programarCarga()`.
   - **Pasos de carga animada** (`{ prog: { prefijo, desde, hasta, celdas, sufijo? } }`): `programarCarga()` crea **una sola línea** y la actualiza con ticks programados vía `programar()` — `pintarCarga()` arma la barra (`░` vacío, `▓` cabeza parcial, `█` lleno) + contador de %, 20 celdas, ~1.5 s por barra (`Cargando modelo ILA-7` 0→80%, `Estado de análisis` 0→98%, `Verificando bloques de memoria` 0→100% `OK`); los ticks viven en la misma lista de timers, así que cerrar o reabrir no deja barras a medias.
   - **Secuencia inicial:** banner ASCII de bloques `ILA` (clase `term-banner`), subtítulo `Kaliber AI department` (clase `term-subtitle`), boot, carga del modelo animada 0→80%, `ERROR E-MOD-13: fallo al iniciar el modelo` (clase `term-error`), línea `Estado de análisis` animada 0→98% (clase `term-progress`), prompt de confirmación; al final habilita `#terminalInput` y lo enfoca.
   - **Submit del input:** `trim()` + `toLowerCase()`; si no es `continuar` → eco (`term-echo`) + `ERROR: el comando no es correcto. Vuelva a intentarlo.` (`term-error`) + re-prompt; si es → eco + secuencia de reanudación (con la carga de memoria animada 0→100% `OK`) terminada en `term-blink`: *"Se requiere reinicio manual en la terminal 136 para continuar."* y `deshabilitarInput()`.
   - `abrirTerminalILA()`: reset total (output vacío, input deshabilitado y limpio, `is-maximized` removido), `.active` en la modal, arranca la secuencia.
   - `cerrarTerminal()`: quita `.active`, limpia timers.
   - Botones: `×` → cerrar; maximizar → alterna `.is-maximized` y `title` (`Maximizar`/`Restaurar`); clic en el fondo de la modal → cerrar; `Escape` → cerrar solo si está activa.
7. `src/css/styles.css` —
   - `.terminal-content`: `width: 80vw; height: 80vh; max-width: none; max-height: none; padding: 0; display: flex; flex-direction: column;` (pisa `.modal-content` que trae `max-width: 500px`).
   - `.terminal-content.is-maximized`: 100vw × 100vh `fixed` (patrón `.preview-content.is-maximized`).
   - `.terminal-body`: fondo `var(--header-bg)`, scroll propio (`overscroll-behavior: contain`), `'Courier New', monospace`, `0.9rem`, `line-height: 1.6`, padding `1.25rem`.
   - `.term-line` (`--text-primary`), `.term-banner` (arte ASCII, `--link-color`, `white-space: pre`, centrado), `.term-subtitle` (`--link-hover`, letter-spacing), `.term-error` (`--accent-glow`), `.term-progress` (`--link-color`), `.term-echo` (`--text-muted`, con prefijo `> `), `.term-ok`.
   - `.term-blink`: `animation: terminal-blink 0.9s step-end infinite` + `@keyframes terminal-blink { 0%,100% {opacity:1} 50% {opacity: .15} }`.
   - `#terminalInputLine`: flex, prompt dorado `ila@kaliber:~$`, `#terminalInput` sin borde/fondo, color y caret dorados; `.is-disabled` oculta la línea de prompt (tras el fallo).
   - `@media (max-width: 600px)`: `.terminal-content` a `92vw × 85vh`.
8. `src/index.html` — `<script src="js/terminal.js"></script>` junto a los demás (antes de `navegacion.js`).
9. `spec/` — crear esta carpeta; `roadmap.md` entrada 26 en "Hecho" y siguiente `027`; `AGENTS.md` (líneas 5, 34, 49) y `README.md` (árbol de archivos, líneas 33, 44) a `001-026` / siguiente `027`.

## Decisiones

- **Modal dentro de `renderArchivos` (no en `index.html`)** — igual que `filePreviewModal`/`emailPreviewModal`: la terminal solo existe en la vista que la abre, y al volver a entrar la secuencia arranca limpia.
- **80% de ancho *y* alto (80vw × 80vh)** — decisión del usuario ("que ocupe un 80% de la pantalla"); maximizar la lleva a 100%.
- **`Reporte ILA.txt` con preview + enlace** — decisión del usuario: el archivo se comporta como cualquier `.txt` y el enlace es el que dispara la terminal (evita que un clic accidental dispare la secuencia).
- **Paleta existente** — decisión del usuario: dorado `--link-color`/`--link-hover` para banner, progreso y prompt; rojo `--accent-glow` para errores; gris para el resto. Sin variables nuevas, coherente con la 001-025.
- **`continuar` se acepta sin distinguir mayúsculas y con espacios alrededor** — el rechazo solo aplica a otras palabras; así el usuario no se atasca por una mayúscula, y el mensaje de "comando incorrecto" sigue existiendo para cualquier otra entrada.
- **Tras el fallo el input se deshabilita** — decisión del usuario: la terminal queda muerta (el "reinicio manual en la terminal 136" es narrativo, no navegable); solo se cierra.
- **Guard de Escape en `archivos.js`** — sin él, Escape cerraría la terminal *y* la preview de atrás de una; con él, el orden de cierre respeta lo que está arriba.
- **Líneas con `textContent`, eco como texto** — la terminal nunca interpreta HTML; lo que escribe el usuario solo se muestra, no se inyecta.
- **Timers en una lista limpiable** — un usuario que cierre a mitad de la secuencia no debe ver líneas apareciendo al reabrir.

## Riesgos

- **Timers huérfanos** — cubierto: `limpiarTimers()` en `abrirTerminalILA()` y en `cerrarTerminal()`; el smoke verifica que al reabrir no aparezcan líneas de la ejecución anterior.
- **El enlace del preview rompe la SPA** (`href="#"` cambia el hash) — cubierto con `preventDefault()` (mismo fix que la 019) y verificado en el smoke: el hash sigue en `#archivos` tras el clic.
- **Doble cierre con Escape** — cubierto con el guard; verificado: con la terminal abierta, Escape cierra solo la terminal y la preview sigue activa; un segundo Escape la cierra.
- **Colisión de ids con `filePreviewModal`** — todos los ids van prefijados `terminal*` (convención de la 018).
- **La secuencia alarga el smoke test** — delays de 300-650 ms por línea y ~1.5 s por carga animada (secuencia inicial ≈ 6 s, reanudación ≈ 4 s, dentro de los timeouts de 10/12 s del smoke); el smoke espera sobre condiciones (`poll`), no sobre tiempos fijos.
