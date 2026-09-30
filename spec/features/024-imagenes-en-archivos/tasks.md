# 024 · Imágenes reales en el sector de Archivos - Tareas

## Implementación

- [x] `src/js/archivos.js` — `fileContents`: `image` + `imageAlt` en `templo`, `manuscrito` y `profesor`.
- [x] `src/js/archivos.js` — `folderContents.imagenes`: `thumb` en los 3 archivos (se conserva `icon`).
- [x] `src/js/archivos.js` — `buildPreviewBody()` con panel `.preview-media` + `.preview-detail`, y `is-split` toggleado en `openFilePreview()` (con `encodeURI()`).
- [x] `src/js/archivos.js` — `updateFilesGrid()` renderiza `.file-thumb` cuando hay `thumb`.
- [x] `src/css/styles.css` — `.file-thumb`, `.file-thumb img`.
- [x] `src/css/styles.css` — `.modal-body.is-split`, `.preview-media`, `.preview-media-img`, `.preview-detail`.
- [x] `src/css/styles.css` — responsive (columna ≤ 900px, miniatura de 64px ≤ 600px).

## Validación

- [x] `node --check src/js/*.js`
- [x] Smoke test automatizado (Chrome headless + CDP, 35 aserciones): 3 miniaturas cargadas, 3 detalles con imagen real + texto actual + título + `alt`, maximizar/restaurar y Escape en cada uno, carpetas de `.txt` sin regressión, móvil 375px sin desborde y modal en columnas.
- [x] Verificación visual (screenshots) en 1280px y 375px: grilla con miniaturas, modal imagen-izquierda/texto-derecha y apilado en móvil.
- [x] Validar contra los criterios de aceptación de `spec.md`.

## Documentación

- [x] Crear `spec/features/024-imagenes-en-archivos/` con `spec.md`, `plan.md` y `tasks.md`
- [x] Mover la feature a "Hecho" en `../../constitution/roadmap.md`
- [x] Actualizar `AGENTS.md` y `README.md` con el nuevo estado y siguiente número (`025`)
