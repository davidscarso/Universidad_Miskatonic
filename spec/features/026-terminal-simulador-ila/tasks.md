# 026 · Terminal simulador de servidores (ILA) - Tareas

## Implementación

- [x] `src/js/archivos.js` — `folderContents.investigacion`: `Reporte ILA.txt` (icono 💻) y `fileContents.reporteILA` con contexto + enlace `.terminal-launch`.
- [x] `src/js/archivos.js` — markup `#terminalModal` en `renderArchivos()`, llamada a `bindTerminalILA(main)`, delegación del clic en `.terminal-launch` con `preventDefault`, guard de Escape (no cierra la preview si la terminal está activa).
- [x] `src/js/terminal.js` — IIFE: `abrirTerminalILA`, `cerrarTerminal`, `bindTerminalILA`, timers limpiables, secuencia (banner ILA → boot → error de modelo → 98% → prompt), manejo del input (comando incorrecto / `Continuar`), fallo final con blink + input deshabilitado, `×`, maximizar, fondo y Escape.
- [x] `src/css/styles.css` — `.terminal-content` (80vw × 80vh, `.is-maximized` a 100%), `.terminal-body`, `.term-*`, `.term-blink` + `@keyframes`, línea de prompt/input, responsive ≤600px.
- [x] `src/index.html` — `<script src="js/terminal.js"></script>`.

## Validación

- [x] `node --check src/js/*.js`
- [x] Smoke test automatizado (Chrome headless + CDP): archivo en Investigación → preview → enlace → modal al 80% → banner/subtítulo/error/98%/prompt → comando erróneo rechazado → `Continuar` aceptado → parpadeo + input deshabilitado → maximize/Escape/backdrop → reabrir limpia la secuencia → sin errores de consola.
- [x] Regresión: suites de 023 (27), 024 (35) y 025 (26) en verde.
- [x] Validar contra los criterios de aceptación de `spec.md`.

## Documentación

- [x] Crear `spec/features/026-terminal-simulador-ila/` con `spec.md`, `plan.md` y `tasks.md`.
- [x] Mover la feature a "Hecho" en `../../constitution/roadmap.md` (siguiente libre: `027`).
- [x] Actualizar `AGENTS.md` y `README.md` con el nuevo estado y siguiente número (`027`).
