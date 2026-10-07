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
22. **022 · Bloqueo de scroll del fondo con modal abierto** — Regla CSS `body:has(...)` + `overflow: hidden` para las 3 clases de modal, `scrollbar-gutter: stable` sin salto de layout y `overscroll-behavior: contain` en los contenidos
23. **023 · Campana de notificaciones con sesión y error de login inline** — La campana pasa a mostrarse solo con sesión iniciada y queda a la derecha del nombre de usuario (orden: nombre → campana → Salir); las credenciales incorrectas muestran un mensaje `role="alert"` dentro de la modal de login con los inputs en rojo, reemplazando el `alert()`
24. **024 · Imágenes reales en el sector de Archivos** — La carpeta Imágenes muestra miniaturas reales en la grilla y el detalle abre con la imagen a la izquierda y el detalle escrito actual a la derecha (`is-split`), apilándose en pantallas angostas; los `.txt` quedan igual
25. **025 · Analítica de visitas** — `analitica.js` envía métricas agregadas a GoatCounter (`unicaliber.goatcounter.com`, sin cookies y sin banner de consentimiento): cada vista de la SPA se cuenta como una página (`Inicio`, `Foro`, `Correo`, `Archivos`, `Perfil`) en la carga inicial y en cada `hashchange`; solo se activa en producción (hostname `.github.io`), así que `file://` y el servidor local no ensucian el dashboard
26. **026 · Terminal simulador de servidores (ILA)** — `Reporte ILA.txt` (nuevo en Investigación) abre vía enlace una modal de terminal al 80% de la pantalla (`terminal.js`): banner ASCII `ILA` + "Kaliber AI department", arranque ficticio con error de modelo y cargas de porcentaje animadas bloque a bloque (modelo 80%, estado 98%, memoria 100%), prompt que exige escribir `Continuar` (otro comando se rechaza), reanudación que termina en fallo con parpadeo de "reinicio manual en la terminal 136" y input deshabilitado; colores y monospace existentes, Escape cierra primero la terminal
27. **027 · Subida de dibujo con análisis de coincidencias** — El botón "Subir mi dibujo" del foro recorre 3 pasos dentro del `#uploadModal` (`subida.js`): validación con error inline `role="alert"` si falta el archivo (sin `alert()`), subida ficticia con barra `░▓█` 0→100%, análisis con segunda barra y log intercalado, y resultado "Tu dibujo coincide con N dibujos anteriores" con N de 1 a 10 registros (`nombre` del pool de dibujos, `nro` `REG-####` únicos y fechas aleatorias dentro de los últimos 10 años siempre anteriores a hoy); `×`/Escape/fondo cierran en cualquier paso y reabrir queda limpio. **Vista de registro:** el nombre de cada fila es un enlace que abre `#matchPreviewModal` — la primera fila muestra la imagen real `REG0136_OZ.png` con el nombre del registro como título, el resto muestra un bloque de censura (estilo "Acceso Restringido", con el `nro` propio y sin botón de sesión); `×`/maximizar `□/⧉` y Escape en cascada (primero el preview, luego la subida)
28. **028 · Congelación de pantalla tras el fallo ILA** — 7 segundos después de que la terminal ILA (026) termina en el fallo de reinicio manual, `#freezeModal` (markup global en `index.html`, lógica en `bloqueo.js`) tapa toda el área de contenido sin `×`/maximizar/minimizar: Escape queda inerte (capture + `stopImmediatePropagation`), los clics no cierran, el `body` queda con scroll bloqueado y el contenido muestra "pánico de kernel" con la paleta existente (título glitch, símbolos y volcado hex que se regeneran, aviso rojo parpadeante, scanlines); cerrar la terminal dentro de los 7 s cancela el bloqueo, navegar de vista no, y F5 lo limpia (sin storage)

## Siguiente 🔜

_No hay features pendientes. La siguiente feature libre es `029`._

## Backlog / ideas 💡

> Cada feature nueva se crea como `features/NNN-nombre-feature/` con `spec.md`, `plan.md` y `tasks.md` antes de tocar código.

- **Alerta de login** — ~~reemplazar el `alert()` de credenciales incorrectas (`main.js`) por una modal con el mensaje~~ (resuelto en la 023, con mensaje inline en la modal de login).
- **Contenido del inicio** — ~~texto con "COMPLETAR ALGO ACA" y errores tipográficos (`inicio.js`)~~ (resuelto en la 020); ~~links de noticias que salen del SPA hacia `acceso-restringido.html`~~ (resuelto en la 019).
- **Optimizar imágenes** — `logos.png` (663 KB) se sirve en el header; los 3 PNG de `assets/images/Archivos/` (≈5 MB, de la 024) y `Fotos/Foto_Damian.png` (1.5 MB) se cargan sin comprimir. ~~`logo.png`, `logos3.png` y la hoja de propuestas ChatGPT sin uso~~ (eliminadas del repo).
- **`opencode.json` con API key committeada** — rotar la clave y sacarla del repo (urgente, asunto de seguridad).
