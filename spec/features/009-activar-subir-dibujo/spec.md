# Feature 009 — Activar "Subir mi dibujo" en la vista foro

## Estado

Por implementar

## Descripción

En la feature 008 el foro pasó a ser una vista del index, pero los modales de "Subir mi dibujo" y de Notificaciones quedaron fuera de alcance: el botón "Subir mi dibujo" quedó visible pero inerte. Esta feature trae ambos modales al `index.html` (junto al modal de login) y liga el botón inyectado con el foro para que funcione dentro del SPA.

## Problema que resuelve

- El botón "Subir mi dibujo" (inyectado con la vista foro) no abría ningún modal porque no existía en `index.html`
- Los modales de upload y notificaciones viajaban en `foro.html`, que fue eliminado
- El CSS ya tenía estilos `.notification-btn` / `.notification-badge` sin uso: se aprovechan para dar disparador al modal de notificaciones

## Criterios de aceptación

- [ ] `index.html` contiene el modal de upload (`#uploadModal`) y el de notificaciones (`#notificationModal`)
- [ ] En la vista foro del index, "Subir mi dibujo" abre el modal de upload (también si se entra al foro tras un swap, sin recargar)
- [ ] El modal de upload permite elegir archivo, muestra el nombre y al publicar confirma y resetea el formulario
- [ ] El modal de upload se cierra por X, clic en el fondo y tecla Escape
- [ ] Hay un botón de notificaciones con badge en el header del index que abre su modal
- [ ] "Marcar todas como leídas" limpia los no leídos y oculta el badge
- [ ] Funciona con y sin sesión, en `index.html` y en `index.html#foro`, y tras swaps inicio↔foro
- [ ] Los modales no rompen las vistas inicio/foro ni la navegación por hash
- [ ] Funciona con `file://` (sin servidor)

## Fuera de alcance

- Backend o persistencia real del upload
- Convertir Correo y Archivos en vistas del index (siguen siendo páginas separadas)