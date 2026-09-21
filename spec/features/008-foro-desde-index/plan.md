# Plan — Feature 008 Foro desde el index (SPA inicio/foro)

## Enfoque

Convertir `index.html` en una SPA ligera con dos vistas — Inicio y Foro — que conviven en el mismo `#main-placeholder`, con el nav marcando la vista activa:

1. **Renderers**: `foro.js` (nuevo) y `inicio.js` (refactorizado) solo saben renderizar su `<main>` en el placeholder. No deciden nada.
2. **Controlador**: `navegacion.js` (nuevo, carga solo en index) decide qué vista mostrar según `location.hash`, inyecta el contenido y marca el nav activo. Escucha `hashchange` para soportar refresh y back/forward.
3. **Housekeeping**: todos los links que apuntaban a `foro.html` pasan a `index.html#foro` (o `#foro` desde el propio index) y se elimina `foro.html`.

## Cambios

### Nuevos archivos
- `src/js/foro.js` — Constante `FORO_MAIN_HTML` con el `<main class="main forum-layout">` actual de `foro.html` (aside de categorías + botón "Subir mi dibujo" + sección de temas) y función `window.renderForo()` que reemplaza el contenido de `#main-placeholder`
- `src/js/navegacion.js` — Controlador de vistas del index:
  - Lee `location.hash` al cargar: `#foro` → foro, resto/vacío → inicio
  - Listener de `hashchange` (soporta back/forward y links)
  - Marca `.active` en el nav correspondiente (`a[data-view="inicio"]` / `a[data-view="foro"]`)
  - Llama al renderer adecuado vaciando antes el placeholder
  - Tras cada render reaplica el estado de links restringidos (`window.toggleRestrictedLinks`)
  - Delegación de click sobre `[data-restricted="true"]` con clase `.restricted` → `preventDefault()` (cubre links inyectados después del `DOMContentLoaded` de main.js)

### Archivos modificados
- `src/js/inicio.js` — Refactor: dejar de inyectar automáticamente en `DOMContentLoaded` y exponer `window.renderInicio()` (mismo HTML actual). Nota: así no se pelea con el foro por el placeholder
- `src/js/main.js` — Mínimo: exportar `window.toggleRestrictedLinks` para poder reaplicar el bloqueo tras cada swap (una línea). El binding actual de clicks en main.js queda para la carga inicial
- `src/index.html` — Nav Inicio/Foro con `href="#inicio"` / `href="#foro"` y `data-view`; quitar el `active` hardcodeado de Inicio; cargar scripts en este orden: `foro.js`, `inicio.js`, `navegacion.js`, `main.js`, `header.js`, `footer.js`
- `src/email.html`, `src/archivos.html`, `src/perfil.html`, `src/acceso-restringido.html` — Nav "Foro" → `index.html#foro`
- Contenido dentro de `inicio.js`: quick-link "Foro de Investigación" → `#foro`

### Archivos eliminados
- `src/foro.html`

### Documentación
- `spec/constitution/roadmap.md` — Actualizar descripción de 008 y mover a "Hecho" cuando se implemente

## Decisiones

- **SPA solo para Inicio/Foro**: Correo y Archivos siguen siendo páginas separadas con nav normal
- **Hash en lugar de estado en memoria**: `#foro` permite refresh, back/forward y sirve de puente desde el nav de otras páginas (`index.html#foro`)
- **Renderers separados del controlador**: cada JS solo renderiza su main; la decisión de qué se muestra vive en un solo lugar (`navegacion.js`)
- **Delegación de eventos para `[data-restricted]`**: los quick-links restringidos del contenido inyectado necesitan `preventDefault` aunque se inyecten después del `DOMContentLoaded` de main.js
- **`foro.html` se elimina**: se actualizan todos sus referentes (nav de email/archivos/perfil/acceso-restringido y quick-link del index)
- **Modales fuera de alcance**: "Subir mi dibujo" y Notificaciones no viajan al index → el botón queda inerte (aceptado por el usuario)

## Riesgos

- **Orden de scripts crítico** en index: `foro.js` → `inicio.js` → `navegacion.js` → `main.js`. `navegacion.js` debe inyectar el contenido ANTES de que corra el `DOMContentLoaded` de main.js para que los links restringidos iniciales queden ligados
- **Links restringidos tras el swap**: resuelto con delegación de click + rellamada a `toggleRestrictedLinks`
- **Enlace directo/refresh a `index.html#foro`**: cubierto por la lectura del hash al cargar
- **Flash de contenido vacío al cargar**: mitigado con scripts al final del body
- **Header duplicado**: sigue igual en las páginas (fuera de alcance)