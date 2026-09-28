# Tareas — Feature 015 Limpieza de código muerto + actualización de documentación

## Implementación

- [x] `main.js`: eliminar el bloque de binding de `#uploadDrawingBtn` (responsabilidad de `foro.js`)
- [x] `main.js`: eliminar el handler propio de clics en `[data-restricted="true"]` (responsabilidad de `navegacion.js`)
- [x] `main.js`: unificar los dos listeners de `Escape` en uno solo (login + upload + notificaciones)
- [x] `README.md`: reescribir con descripción, estructura, uso y flujo SDD
- [x] `AGENTS.md`: estado real (001-015), siguiente feature `016`, archivos clave al día
- [x] `roadmap.md`: 015 agregado a "Hecho ✅"

## Validación

- [x] `node --check src/js/main.js`
- [x] Carga en `#foro`: "Subir mi dibujo" abre el modal (binding de `foro.js`)
- [x] Sin sesión: clic en "Correo"/"Archivos" → bloqueado, sin cambiar el hash, con tooltip
- [x] Con sesión: los links restringidos quedan habilitados
- [x] `Escape` cierra el modal de login
- [x] `Escape` cierra el modal de upload
- [x] `Escape` cierra el modal de notificaciones
- [x] Login/logout y disclaimer (013/014) sin regresiones

## Documentación

- [x] Crear `spec/features/015-limpieza-y-documentacion/` con `spec.md`, `plan.md` y `tasks.md`
- [x] Validar contra los criterios de aceptación de `spec.md`
- [x] Mover la feature a "Hecho" en `../../constitution/roadmap.md`
