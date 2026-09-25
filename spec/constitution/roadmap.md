# Roadmap

_Orden y estado de las features. Es la vista de "qué hay hecho, qué toca ahora y qué viene". Cada entrada apunta a su carpeta en `features/`._

## Hecho ✅

_Features completadas, en orden de implementación._

1. **001 · Inicio** — Página principal que emula la portada de una universidad Lovecraftiana
2. **002 · Login mejorado + Perfil** — Control de acceso a secciones restringidas y página de perfil
3. **003 · Correo** — Página de correo electrónico ficticio con bandejas y correos fake
4. **004 · Foro** — Foro de investigación con categorías, temas fake y sistema de notificaciones
5. **005 · Archivos** — Gestor de archivos estilo Google Drive con carpetas y contenido
6. **006 · Footer compartido** — Footer reutilizado vía JS en todas las páginas, universidad unificada a "Kaliber"
7. **007 · Main del inicio en archivo separado** — El `<main>` de la portada se extrae a `inicio.js` y se inyecta vía placeholder
8. **008 · Foro desde el index (SPA)** — El foro pasa a ser una vista del index: main en `foro.js`, inyección al hacer clic en "Foro" con estado `active`, `navegacion.js` como controlador de hash, `foro.html` eliminado
9. **009 · Activar "Subir mi dibujo" en la vista foro** — Modales de upload y notificaciones llevados al index; botón de notificaciones con badge en el header; trigger del upload ligado en `renderForo()`
10. **010 · Correo desde el index (SPA)** — El correo pasa a ser una vista del index (mismo patrón que 008): main en `correo.js`, inyección vía `#correo` con estado `active`, `email.html` eliminado
11. **011 · Archivos desde el index (SPA)** — El gestor de archivos pasa a ser una vista del index: main y toda su lógica (carpetas, preview) en `archivos.js`, inyección vía `#archivos` con estado `active`, `archivos.html` eliminado
12. **012 · Perfil desde el index (SPA) + guarda de acceso** — El perfil pasa a ser la vista `#perfil` (`perfil.js`, entrada por el botón de usuario, `perfil.html` eliminado); `#correo`, `#archivos` y `#perfil` sin sesión muestran el panel de Acceso Restringido con botón de login (`renderAccesoRestringido` en `main.js`, guarda en `navegacion.js`)
13. **013 · Modal de disclaimer** — Aviso legal que aparece la primera vez en la vista Inicio: fondo claro estilo papel (contrasta con el tema oscuro), link "Adquirir el libro" (placeholder) y botón Aceptar que guarda `disclaimerAccepted` en `localStorage` para no volver a mostrarlo

## Siguiente 🔜

_Aún no hay features en cola. Las nuevas se crean como `features/NNN-nombre-feature/` con `spec.md`, `plan.md` y `tasks.md`._

## Backlog / ideas 💡

> Cada feature nueva se crea como `features/NNN-nombre-feature/` con `spec.md`, `plan.md` y `tasks.md` antes de tocar código.
