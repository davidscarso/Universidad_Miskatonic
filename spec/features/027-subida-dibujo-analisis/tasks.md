# 027 · Subida de dibujo con análisis de coincidencias - Tareas

## Implementación

- [x] `src/index.html` — markup `#uploadFileError` (dentro del form), `#uploadProcess` y `#uploadResult` dentro de `#uploadModal`; `<script src="js/subida.js">`.
- [x] `src/js/subida.js` — IIFE dueña del modal: bindings de cierre/backdrop/Escape, file-area, validación de archivo, máquina de pasos con barras `░▓█`, generación de N registros (`nombre`, `nro`, `usuario`, `fecha`), `resetModal()`.
- [x] `src/js/main.js` — eliminar el bloque upload completo y su rama en el `Escape`.
- [x] `src/css/styles.css` — `.upload-error`, fases/progress/log monospace, `.match-table` responsive (≤600px apilado).

## Validación

- [x] `node --check src/js/*.js`
- [x] Smoke test automatizado (Chrome headless + CDP): error sin archivo → subida 0→100 → análisis 0→100 + log → resultado con N∈[1,10] y registros válidos → cerrar/reabrir limpio → Escape/fondo → sin errores de consola.
- [x] Regresión: suites de 023 (27), 024 (35), 025 (26) y 026 (46) en verde.
- [x] Validar contra los criterios de aceptación de `spec.md`.

## Documentación

- [x] Crear `spec/features/027-subida-dibujo-analisis/` con `spec.md`, `plan.md` y `tasks.md`.
- [x] Mover la feature a "Hecho" en `../../constitution/roadmap.md` (siguiente libre: `028`).
- [x] Actualizar `AGENTS.md` y `README.md` con el nuevo estado, siguiente número (`027` → `001-027` / `028`) y `subida.js` en el árbol.
