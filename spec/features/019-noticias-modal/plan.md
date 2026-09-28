# Plan — Feature 019 Noticias de Inicio: modal con el artículo completo

## Enfoque

Mismo patrón de las 016/018: la modal **vive dentro de la vista** (dueña: `inicio.js`), se apoya en las clases base ya existentes `.preview-modal` / `.preview-content` y en `.detail-meta` / `.detail-body` (pensados para el lector de Correo). `inicio.js` pasa a ser una IIFE con el patrón `activeKeydown` para mantener un único listener de `Escape` por módulo. **No hay cambios de CSS**: todo el estilo del modal ya existe.

## Implementación

1. `src/js/inicio.js`
   - Envolver el módulo en una IIFE `(function() { ... })();` exponiendo `window.renderInicio`.
   - Nuevo modelo de datos `newsArticles` (claves `ia`, `sueno`, `hilos`), cada uno con `title`, `date` y `body` (3 párrafos `<p>`):
     - `ia` — "Impulso para la aplicacion de Inteligencia artificial", 15 de Octubre, 2024
     - `sueno` — "Tesis sobre EL Sueño Lúcido", 12 de Octubre, 2020
     - `hilos` — "Teoria de los Hilos Cuánticos", 8 de Octubre, 2015
   - Tarjetas: cada `<a class="news-link">` pasa de `href="acceso-restringido.html"` a **`href="#"` + `data-article="<clave>"`**.
   - Markup de modal al final del `<main>` con **ids prefijados `news*`**:
     - `#newsPreviewModal` → `.modal.preview-modal`
     - `.modal-content.preview-content` con `#newsPreviewTitle` (header), `#newsMaximizeBtn` (`□`/`⧉`) y `#newsCloseBtn` (`×`) en `.modal-controls`
     - `.modal-body` con `<div class="detail-meta" id="newsPreviewMeta">` (fecha) y `<div class="detail-body" id="newsPreviewBody">` (3 párrafos)
   - Nueva función `bindInicio(main)`:
     - **delegación** de clic sobre `.news-grid` → `e.target.closest('.news-link')` → `preventDefault()` → leer `data-article` → rellenar título/meta/cuerpo → `resetPreviewState()` + `.active`
     - `#newsCloseBtn` → cerrar; clic en el fondo (`e.target === modal`) → cerrar
     - `#newsMaximizeBtn` → `classList.toggle('is-maximized')` + actualizar `title`
     - `Escape` → listener único de módulo con patrón `activeKeydown` (se remueve el anterior al re-render)
     - helpers `resetPreviewState(modal)` y `closeNewsModal(modal)` (limpian `active` + `is-maximized` + título del botón)
   - La lógica del **disclaimer** se mantiene intacta al final de `renderInicio`.
2. `src/css/styles.css` — **sin cambios** (reutiliza `.preview-*`, `.detail-meta`, `.detail-body`).
3. Documentación: `roadmap.md` (019 en "Hecho", siguiente `020`), `AGENTS.md` (001-019, siguiente `020`), `README.md` (001-019); backlog: del bullet *"Contenido del inicio"* se elimina *"links de noticias que salen del SPA hacia `acceso-restringido.html`"* (resuelto aquí), dejando solo el texto/typos.
4. Validación: `node --check src/js/*.js` + smoke headless (3 links → modal con título/fecha/3 párrafos, maximize, `Escape`, fondo, `×`, hash `#inicio`, sin navegación a `acceso-restringido.html`) + regresión de Perfil, Archivos y Correo.

## Decisiones

- **Modal dentro de la vista, ids `news*`** — convención ya elegida en 016/018: se reutiliza la **base CSS**, no los nodos; evita IDs duplicados y acoplamiento entre vistas.
- **IIFE + `activeKeydown`** — `inicio.js` era una función global suelta; igual que `archivos.js`/`correo.js`/`perfil.js`, un solo listener de `Escape` por módulo.
- **Delegación de un solo listener en `.news-grid`** — en vez de 3 listeners por tarjeta: menos nodos ligados y sigue funcionando si cambian las noticias.
- **Datos de artículos como objeto en el módulo** — contenido fijo del repo (mismo criterio que los datos de `correo.js` y `fileContents` de `archivos.js`); sin `localStorage`.
- **`href="#"` + `preventDefault()`** (pedido del usuario) — el link queda semánticamente como enlace, no navega fuera del SPA y resuelve el item de backlog. Descartado `href="acceso-restringido.html"` con preventDefault (HTML que apunta a una página muerta) y descartado `<button>` (rompe la estética de "link" de las tarjetas).
- **Cero CSS nuevo** — `.preview-content`, `.detail-meta` y `.detail-body` ya existen y están probados; menos riesgo de regresión y diff mínimo.
- **Artículos breves (fecha + 3 párrafos)** — pedido explícito: "no debe ser muy extenso".

## Riesgos

- **Disclaimer tapando la modal de noticias** — el disclaimer es estático en `index.html` y la modal se inyecta con la vista; el smoke verifica que la de noticias abre estando el disclaimer activo/aceptado.
- **Escape con listeners de otros módulos en el DOM** — cada módulo consulta solo su propio modal; solo una vista está montada a la vez y los demás quedan en no-op (regresión en smoke).
- **Link que navega por accidente** — `preventDefault()` en la delegación; verificado comprobando que `location.hash` sigue en `#inicio` y que no se carga `acceso-restringido.html`.
- **Contenido con caracteres especiales** — texto fijo en el repo, sin inyección de usuario; sin riesgo de XSS.
