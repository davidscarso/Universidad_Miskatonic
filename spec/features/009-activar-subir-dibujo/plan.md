# Plan — Feature 009 Activar "Subir mi dibujo" en la vista foro

## Enfoque

Aprovechar el estado actual del SPA: los elementos estáticos de `index.html` (modales, botones) son ligados por `main.js` con normalidad en su `DOMContentLoaded`, porque existen en el DOM al cargar. El único caso dinámico es el botón "Subir mi dibujo", que se crea al renderizar la vista foro: se liga dentro de `renderForo()`.

## Cambios

### Archivos modificados

- `src/index.html`
  - Header: agregar el botón de notificaciones (`#notificationBtn`) con badge (`#notificationBadge`) dentro de `.user-container`, usando las clases que ya existen en el CSS (`.notification-btn`, `.notification-icon`, `.notification-badge`)
  - Cuerpo: agregar el modal de upload (`#uploadModal`, con `#uploadForm`, `#fileUploadArea`, `#drawingFile`, `#drawingTitle`, `#drawingCategory`, `#drawingDescription`, `#fileName`) y el modal de notificaciones (`#notificationModal`, con `#closeNotificationModal`, `#markAllReadBtn`), same estructura que tenían en `foro.html`

- `src/js/foro.js`
  - En `renderForo()`, tras insertar el `<main>`: ligar el click de `#uploadDrawingBtn` (nuevo elemento creado en cada render) para abrir `#uploadModal.active`. Como el elemento se recrea en cada render, no acumula listeners duplicados

- `src/js/main.js` — sin cambios: los elementos ahora estáticos en `index.html` son detectados y ligados por sus handlers existentes (open via button, close via close-modal/X, click-outside, submit con reset, file selection, mark-all-read, Escape)

### Documentación
- `spec/constitution/roadmap.md` — Agregar 009 a "Hecho"

## Decisiones

- **Modales estáticos en index vs inyectados**: estáticos, al lado del login (que ya estaba así). `main.js` los liga en su `DOMContentLoaded` sin tocar código
- **Botón de notificaciones solo en el header del index**: la vista foro solo existe ahí; los estilos estaban definidos en el CSS desde antes, sin uso
- **Binding del upload en `foro.js`** en vez de delegación global: el botón es específico de la vista foro y se rebinde con cada render
- **No se toca `main.js`**: minimiza riesgo; la unica omission anterior era el disparador del upload dinámico

## Riesgos

- **Doble binding en carga directa a `#foro`**: en ese caso main.js y foro.js ambos ligan el botón; es inofensivo (dos `classList.add('active')`)
- **Badge de notificaciones estático** (count fijo): no hay backend; aceptado, consistente con el resto del contenido fake