# Plan — Feature 007 Main del inicio en archivo separado

## Enfoque

Crear un archivo `src/js/inicio.js` que defina el HTML del `<main>` de la portada como constante y lo inserte en un elemento `<div id="main-placeholder">` al cargar la página. Reemplazar el `<main>` estático de `index.html` por el placeholder. Mismo patrón que `footer.js` (feature 006).

## Cambios

### Nuevo archivo
- `src/js/inicio.js` — Define el HTML del main (hero, Últimas Noticias, Accesos Rápidos) y lo inserta en `#main-placeholder`

### Archivos modificados
- `src/index.html` — Reemplazar `<main class="main">…</main>` por `<div id="main-placeholder"></div>`, agregar `<script src="js/inicio.js">` junto a los demás scripts

### Documentación
- `spec/constitution/roadmap.md` — Agregar 007 a "Hecho" y 008 (main del foro) a "Siguiente"

## Decisiones

- **Inyección vía JS constante**: se elige el patrón de `footer.js` por consistencia con la feature 006 y porque funciona con `file://` (un `fetch()` de HTML no funcionaría en local)
- **Nombre del archivo**: `inicio.js` (mismo idioma del contenido, español)
- **El css no se toca**: el markup inyectado preserva las clases existentes (`hero`, `news`, `quick-links`)
- **El orden de los scripts**: `inicio.js` se carga **antes** de `main.js` al final del body. `main.js` ataca los links `[data-restricted]` (class + click handler) en su `DOMContentLoaded`; si el contenido se inyectara después, esas protecciones no se aplicarían a los links inyectados

## Riesgos

- Flash de página sin contenido al cargar mientras se inyecta (mitigado: script al final del body, ejecución inmediata)
- Textos placeholder existentes en el hero (ej: "COMPLETAR ALGO ACA") se conservan tal cual; pulirlos es trabajo aparte