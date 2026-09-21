# Tareas — Feature 010 Correo desde el index (SPA)

## Implementación

- [x] Crear `src/js/correo.js` con el main del correo + `window.renderCorreo()`
- [x] Actualizar `navegacion.js`: vista `correo` en dispatch, hash `#correo`, nav `active` de tres vistas
- [x] Modificar `index.html`: nav "Correo" → `#correo` con `data-view`; cargar `correo.js`
- [x] Actualizar quick-link "Correo Interno" en `inicio.js` → `#correo`
- [x] Actualizar nav "Correo" en `archivos.html` → `index.html#correo`
- [x] Actualizar nav y quick-link "Correo" en `perfil.html` → `index.html#correo`
- [x] Eliminar `src/email.html`

## Validación

- [x] Abrir `index.html` → portada con "Inicio" activo
- [x] Con sesión: clic en "Correo" → main del correo, "Correo" activo; clic en Inicio/Foro → vuelve
- [x] Abrir `index.html#correo` directo → correo con "Correo" activo
- [x] Sin sesión: el link "Correo" del nav no navega (bloqueado); tampoco los quick-links restringidos
- [x] Hacer clic en bandejas (`#inbox`, `#sent`, `#drafts`, `#deleted`) → no cambia la vista
- [x] Verificar que ninguna página deja un link apuntando a `email.html`
- [ ] Responsive del correo inyectado en desktop + mobile
- [x] Abrir con doble clic (`file://`, sin servidor)

## Documentación

- [x] Actualizar `spec/constitution/roadmap.md`