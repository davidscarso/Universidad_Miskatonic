# Tareas — Feature 019 Noticias de Inicio: modal con el artículo completo

## Implementación

- [x] `inicio.js`: envolver el módulo en IIFE (patrón `archivos.js` / `correo.js` / `perfil.js`)
- [x] `inicio.js`: modelo `newsArticles` con `title`, `date` y `body` (3 párrafos) para `ia`, `sueno` e `hilos`
- [x] `inicio.js`: `.news-link` con `href="#"` + `data-article` (deja de salir a `acceso-restringido.html`)
- [x] `inicio.js`: markup de `#newsPreviewModal` con ids prefijados `news*` y base `.preview-*`
- [x] `inicio.js`: `bindInicio(main)` con delegación en `.news-grid`, `×`, fondo, maximizar/restaurar y `Escape` (`activeKeydown`)
- [x] `inicio.js`: helpers `resetPreviewState()` / `closeNewsModal()` (limpian `active` + `is-maximized`)
- [x] `inicio.js`: lógica del disclaimer intacta
- [x] `styles.css`: sin cambios (reutiliza `.preview-*`, `.detail-meta`, `.detail-body`)

## Validación

- [x] `node --check src/js/*.js`
- [x] Smoke: los 3 links abren `#newsPreviewModal` con título, fecha y 3 párrafos correctos
- [x] Smoke: `location.hash` sigue en `#inicio` y no se navega a `acceso-restringido.html`
- [x] Smoke: maximizar supera los 500px y restaurar vuelve al tamaño base; sin residuo `is-maximized` al cerrar
- [x] Smoke: cierra con `×`, con clic en el fondo y con `Escape`
- [x] Smoke: sin IDs duplicados respecto a `#filePreviewModal` / `#emailPreviewModal` / `#avatarPreviewModal`
- [x] Smoke de regresión: Perfil (018), Archivos y Correo siguen funcionando
- [x] Smoke: el disclaimer de primera visita no impide abrir la modal de noticias

## Documentación

- [x] Crear `spec/features/019-noticias-modal/` con `spec.md`, `plan.md` y `tasks.md`
- [x] `roadmap.md`: 019 agregado a "Hecho ✅" y siguiente número `020`
- [x] Backlog: retirado "links de noticias que salen del SPA" del bullet "Contenido del inicio"
- [x] `AGENTS.md` / `README.md`: estado 001-019, siguiente `020`
- [x] Validar contra los criterios de aceptación de `spec.md`
- [x] Mover la feature a "Hecho" en `../../constitution/roadmap.md`
