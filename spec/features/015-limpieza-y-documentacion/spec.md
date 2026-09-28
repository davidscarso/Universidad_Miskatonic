# 015 · Limpieza de código muerto + actualización de documentación

**Estado:** implementado ✅

## Qué hace

- **Elimina código muerto y duplicado en `main.js`** sin cambiar el comportamiento visible del sitio:
  - El binding de `#uploadDrawingBtn` que `main.js` hacía al cargar la página (ya lo hace `foro.js` en cada render, desde la feature 009).
  - La prevención de clics en enlaces `restricted` (duplicada: `navegacion.js` la resuelve con delegación en `document`).
  - Los dos listeners separados de `Escape` (se unifican en uno solo que cierra login, upload y notificaciones).
- **Actualiza `README.md`**: descripción del proyecto, estructura de carpetas, cómo abrirlo y flujo SDD.
- **Actualiza `AGENTS.md`**: estado real del proyecto (features 001-015), siguiente número de feature (`016`) y lista de archivos clave al día.

## Por qué

La revisión del proyecto detectó código que ya no cumple ninguna función o que está escrito dos veces: suma ruido, confunde a quien relea el archivo y puede provocar efectos dobles si algo cambia en el futuro. La documentación (README de una línea y AGENTS.md diciendo "features 001-004, siguiente 005") quedó desactualizada respecto a las 15 features implementadas.

## Criterios de aceptación

- [x] `main.js` ya no contiene el bloque de binding de `#uploadDrawingBtn` (ese binding vive solo en `foro.js`).
- [x] `main.js` ya no contiene su propio handler de clics para `[data-restricted="true"]` (existe solo la delegación de `navegacion.js`).
- [x] `main.js` tiene un único listener de `keydown` para cerrar modales con `Escape` (login, upload y notificaciones).
- [x] El sitio se comporta igual: "Subir mi dibujo" abre el modal desde el foro; los links restringidos sin sesión siguen bloqueados y con tooltip; `Escape` cierra los tres modales.
- [x] `node --check` sobre `src/js/main.js`.
- [x] `README.md` describe el proyecto, su estructura y cómo abrirlo.
- [x] `AGENTS.md` refleja el estado real (001-015 hechas, siguiente `016`).
- [x] `roadmap.md` incluye 015 en "Hecho ✅".

## Fuera de alcance

- Corregir el `alert()` de credenciales incorrectas (TODO de `main.js`, pendiente en backlog).
- Corregir los `<p>` anidados del preview de archivos (`archivos.js`).
- Limpiar el hash ensuciado por links de categorías/bandejas.
- Textos sin terminar del inicio (`inicio.js`) y cambios de lore (`miskatonic.edu` vs "Kaliber").
- Rotación de la API key presente en `opencode.json` (asunto de seguridad aparte, urgente).
