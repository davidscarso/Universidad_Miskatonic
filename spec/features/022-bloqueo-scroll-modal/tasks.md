# 022 · Bloqueo de scroll del fondo con modal abierto — Tareas

## Implementación

- [x] `spec/features/NNN-nombre-feature/tasks.md`: plantilla con las secciones Implementación / Validación / Documentación (patrón 017)
- [x] `styles.css`: `html { scrollbar-gutter: stable; }`
- [x] `styles.css`: regla `body:has(.modal.active / .login-modal.active / .disclaimer-modal.active) { overflow: hidden; }`
- [x] `styles.css`: `overscroll-behavior: contain` en `.modal-content` y `.disclaimer-content`

## Validación

- [x] `node --check src/js/*.js` (sin cambios JS, consistencia)
- [x] `git diff --check`
- [x] Grep: la regla usa las 3 clases de modal y ningún `.active` genérico
- [x] Confirmar `overflow-y: auto` intacto en `.modal-content`, `.modal-body` y `.disclaimer-content`
- [x] Smoke en navegador (Chrome headless + CDP, 21/21 checks): disclaimer, login, notificaciones, foro y upload bloquean el fondo; scroll preservado; modal interno scrollea; Escape cierra; control sin modal scrollea
- [x] Validar los criterios de aceptación de `spec.md`

## Documentación

- [x] Crear `spec/features/022-bloqueo-scroll-modal/` con `spec.md`, `plan.md` y `tasks.md`
- [x] Mover la feature a "Hecho" en `../../constitution/roadmap.md` (siguiente `023`)
- [x] Actualizar `AGENTS.md` y `README.md` a estado 001-022, siguiente libre `023`
