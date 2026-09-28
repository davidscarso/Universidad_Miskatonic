# Plan — Feature 016 Correo: bandejas funcionales + modal de lectura

## Enfoque

Un solo modal de previsualización compartido (`.preview-modal` / `.preview-content`) usado por Archivos y Correo, arreglado a nivel de CSS (el bug real era `.modal-content { max-width:500px; max-height:80vh }` pisando cualquier ancho inline). Y `correo.js` reescrito como IIFE al estilo de `archivos.js`: modelo de datos de 4 bandejas en memoria, render de lista por bandeja y una modal que se rellena al hacer clic.

## Implementación

1. `src/css/styles.css`
   - `.file-preview-modal` / `.file-preview-content` → `.preview-modal` / `.preview-content`, **agregando `max-width:none; max-height:none;`** (libera el maximize) y quitando `resize:both` del overlay.
   - Nuevo `.preview-content.is-maximized` (clase en vez de estilos inline): `width/height:100vw/100vh`, `position:fixed`, `top/left:0`, `z-index:300`.
   - Intercambio de icono por CSS: `.icon-restore` oculto por defecto; con `.is-maximized` se alternan `□` (`&#9633;`) y `⧉` (`&#10697;`).
   - `.modal-control-btn.close-btn` para el `×` (en flujo normal, tamaño de fuente legible).
   - `.preview-footer` + `.preview-read-btn` (botón "Leído" alineado a la derecha).
   - `.email-empty` para bandeja vacía; regla responsive que referenciaba `.file-preview-content` pasa a `.preview-content` (con `.is-maximized` ganando por especificidad 0-2-0).
   - Se elimina `.email-detail` (markup reemplazado por la modal).
2. `src/js/archivos.js`
   - Markup del modal: mismas clases `.preview-*`; **sin botón de minimizar**; maximizar con dos spans de icono; `×` como `<button class="modal-control-btn close-btn">` en `modal-controls`.
   - Handlers: maximize pasa a `classList.toggle('is-maximized')` + actualizar `title`; se eliminan `minimizeModal` y `resetModalSize` (un helper `closePreview()` limpia `active` + `is-maximized` + título); `openFilePreview` resetea el estado antes de abrir.
3. `src/js/correo.js` (reescritura como IIFE)
   - Datos: `mailboxes = { inbox(3), sent(1 nuevo), drafts(1), deleted(1 nuevo ficticio) }` con `from, to, subject, date, preview, body, read`.
   - Sidebar: links `<a href="#correo" data-mailbox="…">` con `preventDefault()` (sin contaminar el hash).
   - `renderFolder()` actualiza activo, título, total, contadores (Entrada = no leídos) y la lista; estado vacío `.email-empty`.
   - Clic en fila → `openEmail()`: rellena `#emailPreviewTitle`, `.detail-meta` (De/Para/Asunto) y `.detail-body`, muestra/oculta `#emailReadBtn` según sea Entrada, y activa la modal.
   - "Leído": marca `read=true`, quita `.unread` de la fila, actualiza contadores y cierra.
   - Cierre: `×`, clic en el fondo y `Escape` (listener único a nivel módulo, patrón `activeKeydown` de `archivos.js`); al cerrar se limpia `is-maximized`.
4. Documentación: `roadmap.md` (016 en Hecho + backlog ajustado), `AGENTS.md` (siguiente `017`), `README.md` (estado 001-016).
5. Validación: `node --check` + smoke test headless con harness temporal.

## Decisiones

- **Clase `.is-maximized` en vez de estilos inline** — el CSS `max-width`/`max-height` de `.modal-content` no se toca (lo siguen usando login, upload y notificaciones); solo `.preview-content` lo neutraliza. Los estilos inline además se reseteaban a mano y a medias (bug original).
- **Iconos `□` / `⧉` en el mismo botón, alternados por CSS** — un solo nodo de botón, sin lógica de innerHTML; `title` se actualiza en JS para accesibilidad.
- **Sin minimizar** (pedido) — se elimina el botón y su handler; el estado de altura a 40px con `overflow:hidden` que no se restauraba desaparece con él.
- **Datos en memoria a nivel de IIFE** — el estado de "leído" y la bandeja activa sobreviven a los cambios de vista dentro de la sesión, y se resetean al recargar (ficción simple, sin `localStorage`).
- **Modal dentro de la vista (patrón archivos)** en vez de estática en `index.html` — misma estructura que ya existe; `correo.js` es el dueño de su modal.
- **Contadores**: Entrada = no leídos (observable al marcar "Leído"); Salida/Borradores/Eliminados = total de mensajes.
- **Contenido nuevo mínimo**: 1 enviado (Damián Salcedo → Prof. Armitage), 1 borrador (sin enviar) y 1 eliminado ficticio, para que las tres bandejas tengan algo que abrir.

## Riesgos

- **Romper el modal de archivos** — se reutiliza su estructura y handlers; smoke test mide que el maximize supera los 500px y que abrir/cerrar un archivo sigue funcionando.
- **Afectar a los otros modales** — `.modal-content` no se modifica; los cambios son solo en `.preview-*`.
- **Escape con dos listeners (archivos + correo)** — cada uno consulta su propio modal; solo una vista está montada a la vez y el de archivos se vuelve no-op sin `#filePreviewModal`.
- **Clic en el fondo de la modal cerrando por accidente** — es el comportamiento de todos los modales del sitio (consistente).
