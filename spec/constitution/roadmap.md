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
14. **014 · Links del footer abren el disclaimer** — Aviso Legal, Política de Privacidad y Contacto del footer abren el mismo modal de 013 (con `preventDefault` para no alterar el hash), incluso después de haberlo aceptado; sin modal en `acceso-restringido.html` el clic no hace nada
15. **015 · Limpieza de código muerto + documentación** — `main.js` pierde el binding de `#uploadDrawingBtn` (dueño: `foro.js`), su handler duplicado de links restricted (dueño: `navegacion.js`) y sus dos listeners de `Escape` (unificados en uno); `README.md` reescrito y `AGENTS.md` puesto al día (001-015, siguiente `016`)
16. **016 · Correo: bandejas funcionales + modal de lectura** — Las 4 bandejas (Entrada/Salida/Borradores/Eliminados) cambian la lista sin tocar el hash; clic en un correo abre una modal (De/Para/Asunto/Texto) con `×`, maximizar/restaurar y —solo en Entrada— botón "Leído" que marca leído y baja el contador; +1 enviado, +1 borrador y +1 eliminado ficticio; modal de Archivos reparado con la misma base compartida `.preview-*` (maximize real, iconos `□`/`⧉`, sin minimizar)
17. **017 · Perfil con foto de perfil** — El avatar de `#perfil` muestra la foto de Damián Salcedo (`Fotos/Foto_Damian.png`) recortada en círculo con el borde rojo de acento; se elimina el glifo `☺` y su CSS `.avatar-symbol`
18. **018 · Perfil: ampliar foto en modal** — Clic en el avatar de `#perfil` abre la foto en grande con la misma base `.preview-*` que Archivos/Correo (`×`, maximizar/restaurar `□`/`⧉`, fondo y `Escape`); imagen ajustada a la ventana (`contain`, sin scroll), `perfil.js` pasa a IIFE con patrón `activeKeydown`, ids con prefijo `avatar*` para no chocar con los otros modales
19. **019 · Noticias de Inicio: modal con el artículo completo** — Los 3 "Leer más" de Últimas Noticias abren una modal `.preview-*` (título, fecha y 3 párrafos ficticios por noticia) con `×`, maximizar/restaurar, fondo y `Escape`; `inicio.js` pasa a IIFE, el link deja de salir del SPA (`href="#"` + `preventDefault`, resuelve el item del backlog) y no hizo falta CSS nuevo
20. **020 · Correcciones de calidad y navegación** — Disclaimer persistente, HTML válido en previews, limpieza editorial y categorías funcionales del foro
21. **021 · Interacciones pendientes de Foro y Correo** — Notificaciones, detalle de temas y redacción simulada de correos

## Siguiente 🔜

_No hay features pendientes. La siguiente feature libre es `022`._

## Backlog / ideas 💡

> Cada feature nueva se crea como `features/NNN-nombre-feature/` con `spec.md`, `plan.md` y `tasks.md` antes de tocar código.

- **Alerta de login** — reemplazar el `alert()` de credenciales incorrectas (`main.js`) por una modal con el mensaje (TODO pendiente en el código).
- **Contenido del inicio** — ~~texto con "COMPLETAR ALGO ACA" y errores tipográficos (`inicio.js`)~~ (resuelto en la 020); ~~links de noticias que salen del SPA hacia `acceso-restringido.html`~~ (resuelto en la 019).
- **Optimizar imágenes** — `logos.png` (136 KB) se sirve en el header y `logo.png` (1.8 MB) + la hoja de propuestas ChatGPT quedaron sin uso en `src/assets/images/`.
- **`opencode.json` con API key committeada** — rotar la clave y sacarla del repo (urgente, asunto de seguridad).
