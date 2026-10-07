# 027 · Subida de dibujo con análisis de coincidencias - Tareas

## Implementación

- [x] `src/index.html` — markup `#uploadFileError` (dentro del form), `#uploadProcess` y `#uploadResult` dentro de `#uploadModal`; `<script src="js/subida.js">`.
- [x] `src/js/subida.js` — IIFE dueña del modal: bindings de cierre/backdrop/Escape, file-area, validación de archivo, máquina de pasos con barras `░▓█`, generación de N registros (`nombre`, `nro`, `fecha`), `resetModal()`.
- [x] `src/js/main.js` — eliminar el bloque upload completo y su rama en el `Escape`.
- [x] `src/css/styles.css` — `.upload-error`, fases/progress/log monospace, `.match-table` responsive (≤600px apilado).
- [x] `src/js/subida.js` — nombre de registro como `<a class="match-nombre-link" data-idx>` + delegación en `#matchList`; modal `#matchPreviewModal` inyectado (fila 1 → imagen `REG0136_OZ.png`, resto → censura `.restricted-*` sin botón con el `nro` del registro); Escape con prioridad de preview; `cerrarModal()` cierra también el preview.
- [x] `src/css/styles.css` — `a.match-nombre-link` (dorado/subrayado/hover, elipsis heredada) y `.match-censor-body` (centrado del bloque de censura).

## Validación

- [x] `node --check src/js/*.js`
- [x] Smoke test automatizado (Chrome headless + CDP): error sin archivo → subida 0→100 → análisis 0→100 + log → resultado con N∈[1,10] y registros válidos → cerrar/reabrir limpio → Escape/fondo → sin errores de consola.
- [x] Smoke027 ampliado: todos los nombres son enlaces → fila 1 abre la imagen `REG0136_OZ.png` cargada (`naturalWidth > 0`) con el nombre como título → resto abre censura sin botón de sesión (hasta 3 intentos si N=1) → Escape cierra solo el preview y luego la subida → fondo cierra solo el preview → sin errores de consola.
- [x] Regresión: suites de 023 (27), 024 (35), 025 (26) y 026 (46) en verde.
- [x] Regresión tras la ampliación: 023 (27), 024 (35), 025 (26) y 026 (46) en verde.
- [x] Validar contra los criterios de aceptación de `spec.md` (incluida la vista de registro).

## Documentación

- [x] Crear `spec/features/027-subida-dibujo-analisis/` con `spec.md`, `plan.md` y `tasks.md`.
- [x] Mover la feature a "Hecho" en `../../constitution/roadmap.md` (siguiente libre: `028`).
- [x] Actualizar `AGENTS.md` y `README.md` con el nuevo estado, siguiente número (`027` → `001-027` / `028`) y `subida.js` en el árbol.
- [x] Amendar la entrada 27 del `roadmap.md` con la vista de registro (enlace → imagen `REG0136_OZ.png` / censura).
