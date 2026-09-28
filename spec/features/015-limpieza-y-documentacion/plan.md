# Plan — Feature 015 Limpieza de código muerto + actualización de documentación

## Enfoque

Limpieza quirúrgica sobre `main.js`: quitar solo lo que está duplicado o sin efecto, dejando a cada responsabilidad un único dueño (upload → `foro.js`, clicks restricted → `navegacion.js`, cierre de modales → un solo handler en `main.js`). Después, poner al día la documentación (`README.md`, `AGENTS.md`, `roadmap.md`) para que refleje el proyecto real. Sin cambios de CSS ni de comportamiento visible.

## Implementación

1. `src/js/main.js` — eliminar el bloque `// Forum: Upload Drawing Modal` que bindea `#uploadDrawingBtn` (`main.js:191-204`). El botón lo crea `foro.js` en `renderForo()` y allí se liga su clic (feature 009); en la carga inicial sobre `#foro` el binding llegaba a ejecutarse dos veces (inofensivo por idempotencia de `classList.add`, pero es redundante).
2. `src/js/main.js` — eliminar el `document.querySelectorAll('[data-restricted="true"]')` con su listener de clic (`main.js:72-78`). `navegacion.js` ya hace lo mismo con delegación en `document` (`navegacion.js:62-68`), que además cubre los links dinámicos que `main.js` nunca alcanzaba a bindear.
3. `src/js/main.js` — unificar los dos listeners de `keydown` (uno para `#loginModal` y otro para upload/notificaciones) en un único handler al final del `DOMContentLoaded` que cierre con `Escape` los tres modales activos.
4. `node --check src/js/main.js` y verificación manual de los tres flujos afectados.
5. `README.md` — reescribir: qué es el proyecto, stack, estructura de carpetas, cómo abrirlo y flujo SDD.
6. `AGENTS.md` — actualizar estado (001-015), siguiente número (`016`), lista de features y archivos clave.
7. `spec/constitution/roadmap.md` — agregar 015 a "Hecho ✅".

## Decisiones

- **Dueño único por responsabilidad** — el binding de upload queda solo en `foro.js` (mismo patrón que footer.js liga sus propios links en la 014); no se tocó `foro.js` porque ya estaba correcto.
- **Conservar la delegación de `navegacion.js`, no la de `main.js`** — la delegación cubre nodos dinámicos (quick-links re-renderizados) y vive en el controlador de vistas; la de `main.js` solo bindeaba los links existentes al cargar.
- **Un solo listener de Escape en `main.js`** — tres condiciones (`loginModal`, `uploadModal`, `notificationModal`) en un mismo handler: menos registro de listeners y un único lugar de mantenimiento. El Escape de `#filePreviewModal` vive en `archivos.js` (dueño de ese modal) y no se toca.
- **Docs como parte de la misma feature** — la limpieza y la documentación actualizada son el mismo "update" pedido; separarlas en dos features añadiría trámite sin valor.
- **Sin cambios de comportamiento visible** — es una feature de mantenimiento: si algo cambia a nivel de UI, es un bug de la implementación.

## Riesgos

- **Romper el modal de upload** — verificado: `foro.js` liga `#uploadDrawingBtn` tras cada render; se prueba abriendo el modal desde `#foro` en una carga limpia y tras navegar fuera y volver.
- **Links restricted clicables sin sesión** — verificado: la delegación de `navegacion.js` sigue interceptando y el tooltip de "Necesitas iniciar sesión" se gestiona con `toggleRestrictedLinks`.
- **Escape dejar de cerrar algún modal** — verificado para login, upload y notificaciones en el handler unificado.
