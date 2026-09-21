# Plan — Feature 010 Correo desde el index (SPA)

## Enfoque

Replicar la arquitectura de la feature 008 (SPA inicio/foro) añadiendo una tercera vista **Correo**:

1. `correo.js` (nuevo) define el `<main>` del correo y expone `window.renderCorreo()`, igual que `foro.js`/`inicio.js`.
2. `navegacion.js` aprende a renderizar la vista `correo` y a resolver el hash `#correo`, marcando el nav activo.
3. Todos los links que apuntaban a `email.html` pasan a `#correo` (desde el index) o `index.html#correo` (desde otras páginas) y se elimina `email.html`.

El correo es contenido estático (no requiere binding extra en `main.js`); solo hay que respetar la restricción del nav ("Correo" es `data-restricted` y queda bloqueado sin sesión vía la delegación existente).

## Cambios

### Nuevos archivos
- `src/js/correo.js` — Constante con el `<main class="main email-layout">` de `email.html` (aside de bandejas + sección de correos + detalle oculto) y `window.renderCorreo()` que reemplaza el contenido de `#main-placeholder`

### Archivos modificados
- `src/js/navegacion.js`
  - Query `.nav-link[data-view="correo"]` para el active
  - `getViewFromHash`: `#correo` → `'correo'`
  - `renderView`: dispatch a `renderCorreo()` (los hash internos `#inbox`/`#sent`/etc. siguen devolviendo `null` → no cambian la vista)
  - `setActive` maneja las tres vistas
- `src/index.html`
  - Nav "Correo": `href="#correo"`, conserva `data-restricted="true"`, agrega `data-view="correo"`
  - Cargar `js/correo.js` en la lista de renderers (antes de `navegacion.js`)
- `src/js/inicio.js` — Quick-link "Correo Interno": `href="#correo"` (conserva `data-restricted`)

### Archivos eliminados
- `src/email.html`

### Referencias a `email.html` en otras páginas
- `src/archivos.html` — Nav "Correo" → `index.html#correo`
- `src/perfil.html` — Nav "Correo" → `index.html#correo`; quick-link "Correo" → `index.html#correo`

### Documentación
- `spec/constitution/roadmap.md` — Agregar 010 a "Hecho"

## Decisiones

- **`email.html` se elimina** (mismo criterio que 008 con `foro.html`): la SPA es la única vía al correo
- **Orden de scripts** en index: `correo.js`, `foro.js`, `inicio.js`, `navegacion.js`, `main.js`, `footer.js` (renderers antes del controlador; controlador antes que `main.js`)
- **Sin cambios en `main.js`**: el correo es estático; la restricción del nav ya la cubre la delegación de `[data-restricted]` en navegacion.js
- **Contenido oculto (`email-detail` con `display:none`)**: se copia tal cual de `email.html` (no hay JS que lo muestre, comportamiento íntegro)

## Riesgos

- **Acceso directo a `index.html#correo` sin sesión** muestra el correo: igual que ocurría con `email.html` navegable directo (protección puramente cosmética del proyecto, aceptada)
- **Hash internos del correo** (`#inbox` etc.): cubiertos, devuelven `null` y no alteran la vista