# Tareas — Feature 009 Activar "Subir mi dibujo" en la vista foro

## Implementación

- [x] Agregar botón de notificaciones con badge al header de `index.html`
- [x] Agregar modal de upload y modal de notificaciones a `index.html`
- [x] Ligar el botón "Subir mi dibujo" inyectado en `renderForo()` de `foro.js`

## Validación

- [x] En `index.html`, entrar a la vista foro y hacer clic en "Subir mi dibujo" → abre el modal
- [x] Lo mismo entrando directo a `index.html#foro`
- [x] Cerrar el modal de upload por X, clic en fondo y Escape
- [x] Seleccionar archivo → muestra el nombre
- [x] Publicar → confirma (simulación) y resetea el formulario
- [x] Hacer swaps inicio↔foro varias veces y verificar que el botón sigue abriendo el modal (sin listeners acumulados)
- [x] Clic en el botón de notificaciones → abre su modal; "Marcar todas como leídas" limpia y oculta el badge
- [x] Las vistas inicio/foro y la navegación por hash siguen funcionando
- [x] Abrir con doble clic (`file://`, sin servidor)

## Documentación

- [x] Actualizar `spec/constitution/roadmap.md`