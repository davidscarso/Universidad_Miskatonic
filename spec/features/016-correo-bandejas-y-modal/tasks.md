# Tareas — Feature 016 Correo: bandejas funcionales + modal de lectura

## Implementación

- [x] `styles.css`: `.file-preview-*` → `.preview-*` con `max-width/max-height:none` (arregla el maximize)
- [x] `styles.css`: `.is-maximized`, intercambio de icono `□`/`⧉`, `.close-btn`, `.preview-footer`/`.preview-read-btn`, `.email-empty`
- [x] `styles.css`: eliminar `.email-detail` y actualizar la regla responsive al nombre nuevo
- [x] `archivos.js`: markup del modal sin minimizar, iconos de maximize/restore, `×` como botón en `modal-controls`
- [x] `archivos.js`: maximize por clase, eliminar `minimizeModal` y `resetModalSize`, limpiar estado al abrir/cerrar
- [x] `correo.js`: modelo de 4 bandejas (incluye 1 enviado, 1 borrador y 1 eliminado ficticio)
- [x] `correo.js`: clic en bandeja cambia la lista sin tocar el hash
- [x] `correo.js`: modal con De/Para/Asunto/Texto; "Leído" solo en Entrada (marca leído + baja contador + cierra)
- [x] `correo.js`: cierre con `×`, fondo y `Escape`; estado maximizado se limpia al cerrar
- [x] `roadmap.md`: 016 en "Hecho ✅" y backlog ajustado
- [x] `AGENTS.md` / `README.md`: estado 001-016, siguiente `017`

## Validación

- [x] `node --check` sobre `correo.js`, `archivos.js` y el resto de `src/js/*.js`
- [x] Smoke headless: clic en las 4 bandejas → cambia lista/título/contador/hash sigue en `#correo`
- [x] Smoke: abrir correo de Entrada → modal con los 4 campos; "Leído" cierra y quita `.unread` y decrementa contador
- [x] Smoke: en Salida/Borradores/Eliminados no existe botón "Leído"
- [x] Smoke: maximize → `offsetWidth` > 500px y `title="Restaurar"`; segundo clic restaura
- [x] Smoke: modal de archivos → mismo comportamiento de maximize/restore y sin minimizar
- [x] Smoke: `Escape` cierra la modal de correo

## Documentación

- [x] Crear `spec/features/016-correo-bandejas-y-modal/` con `spec.md`, `plan.md` y `tasks.md`
- [x] Validar contra los criterios de aceptación de `spec.md`
- [x] Mover la feature a "Hecho" en `../../constitution/roadmap.md`
