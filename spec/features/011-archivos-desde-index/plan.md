# Plan — Feature 011 Archivos desde el index (SPA)

## Enfoque

Replicar la arquitectura de la feature 008/010 (SPA inicio/foro/correo) añadiendo una cuarta vista **Archivos**, con la diferencia clave de que Archivos **tiene lógica propia** que hoy está en `main.js`:

1. `archivos.js` (nuevo) define el `<main>` del gestor (`.files-layout`), expone `window.renderArchivos()` y **contiene toda la lógica** de carpetas, grilla y vista previa, ligada al render (por inyección directa sobre los nodos creados + delegación de eventos para los items dinámicos).
2. `main.js` pierde toda la sección "Files: Folder Navigation and File Preview" (datos `fileContents`/`folderContents`, `updateFilesGrid`, `openFilePreview` y handlers): esa lógica se mueve íntegra a `archivos.js`. También se quita la rama `filePreviewModal` del handler de Escape.
3. `navegacion.js` aprende a renderizar la vista `archivos` y a resolver el hash `#archivos`, marcando el nav activo.
4. Todos los links que apuntaban a `archivos.html` pasan a `#archivos` (desde el index) o `index.html#archivos` (desde otras páginas) y se elimina `archivos.html`.

## Cambios

### Nuevos archivos
- `src/js/archivos.js` — Contiene, cerrado en un IIFE:
  - Los datos `fileContents` (10 archivos) y `folderContents` (4 carpetas) movidos desde `main.js`
  - `window.renderArchivos()`: crea el `<main class="main files-layout">` (sidebar de carpetas + header con `currentFolder`/`filesCount` + `filesGrid` + modal `filePreviewModal`), lo inyecta en `#main-placeholder` y llama a `bindHandlers(main)`
  - `updateFilesGrid()` / `openFilePreview()` / `resetModalSize()` (reset del tamaño tras cerrar, que antes vivía en un segundo handler de clic en el fondo)
  - `bindHandlers(main)`:
    - Navegación de carpetas por **delegación** sobre `.folder-tree` (los `folder-item` cambian por render)
    - Clic en archivos por **delegación** sobre `filesGrid` (los `file-item` cambian por render)
    - Cierre de preview por X, clic en el fondo y **Escape**, minimizar/maximizar con reset de tamaño al cerrar
    - El handler de Escape se registra en `document` con referencia guardada y se des-registra antes de volver a registrar (evita acumular listeners entre renders)
    - Carpeta "Documentos" activa y grilla inicial cargada por defecto

### Archivos modificados
- `src/js/main.js`
  - Eliminar las líneas de la sección "Files: Folder Navigation and File Preview" (elementos, datos, funciones y handlers del preview)
  - Quitar del handler de Escape la rama `filePreviewModal` (ahora la maneja `archivos.js`; la referencia en `main.js` sería `null` porque el modal se inyecta por render)
- `src/js/navegacion.js`
  - Query `.nav-link[data-view="archivos"]` para el active
  - `getViewFromHash`: `#archivos` → `'archivos'`
  - `renderView`: dispatch a `renderArchivos()`
  - `setActive` maneja las cuatro vistas
- `src/index.html`
  - Nav "Archivos": `href="#archivos"`, conserva `data-restricted="true"`, agrega `data-view="archivos"`
  - Cargar `js/archivos.js` en la lista de renderers (antes de `navegacion.js`)
- `src/js/inicio.js` — Quick-link "Archivos": `href="#archivos"` (conserva `data-restricted`)

### Archivos eliminados
- `src/archivos.html`

### Referencias a `archivos.html` en otras páginas
- `src/perfil.html` — Nav "Archivos" → `index.html#archivos`; quick-link "Archivos" → `index.html#archivos`

### Documentación
- `spec/constitution/roadmap.md` — Agregar 011 a "Hecho"

## Decisiones

- **`archivos.html` se elimina** (mismo criterio que 008 con `foro.html` y 010 con `email.html`): la SPA es la única vía a Archivos
- **La lógica deja `main.js` y va a `archivos.js`**: no puede ligarse al `DOMContentLoaded` porque los nodos se inyectan por render. Se usa **delegación de eventos** en `.folder-tree` y `#filesGrid` para soportar los items que se renderizan/regeneran dinámicamente
- **El modal de vista previa vive dentro del HTML que inyecta `archivos.js`** (no en el index estático): es exclusivo de la vista Archivos. Es `position: fixed`, así que su ubicación en el DOM no afecta layout
- **El `notificationModal` de `archivos.html` no se traslada**: código muerto (no había botón que lo abriera en esa página) y el index ya tiene su propio `notificationModal` (009). Evita duplicar IDs
- **Orden de scripts** en index: `archivos.js`, `correo.js`, `foro.js`, `inicio.js`, `navegacion.js`, `main.js`, `footer.js` (renderers antes del controlador; controlador antes que `main.js`)
- **Handler de Escape en `archivos.js`**: registrado/des-registrado por render (guarda la referencia) para no acumular listeners en la SPA
- **Sin `alert`s nuevos**: se conserva el comportamiento actual de la página (nada de submisiones reales)

## Riesgos

- **Acceso directo a `index.html#archivos` sin sesión** muestra Archivos: igual que ocurría con `archivos.html` navegable directo (protección puramente cosmética del proyecto, aceptada)
- **Regresión en la lógica de Archivos** al moverla de `main.js` a `archivos.js`: se mitiga conservando los mismos datos y el mismo marcado, y validando con Edge headless carpetas, preview, cierre y swaps
- **Listeners acumulados** entre renders: cubierto con el des-registro del handler de Escape y con la reconstrucción completa del subtree de la vista en cada render (delegación única por render)