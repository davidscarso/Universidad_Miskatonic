# 018 · Perfil: ampliar foto en modal

**Estado:** implementado ✅

## Qué hace

- Al hacer **clic en la foto de perfil** (`.profile-avatar` en la vista `#perfil`) se abre una **modal con la imagen ampliada**, usando la misma base visual que el previsualizador de Archivos (`.preview-modal` / `.preview-content`).
- La modal incluye el **mismo header de controles** de Archivos/Correo: título "Foto de Damián Salcedo", botón **maximizar/restaurar** (`□` / `⧉`) y `×` para cerrar.
- La imagen se muestra **ajustada a la ventana** (`object-fit: contain`, sin scroll, sin deformarse); al maximizar ocupa toda la pantalla.
- Cierre por `×`, **clic en el fondo** y **tecla `Escape`**.
- El avatar muestra affordance de clic (`cursor: pointer` + hover con resalte + `title="Ampliar foto"`).
- La imagen ampliada conserva el `alt` accesible.

## Por qué

La feature 017 puso la foto real de Damián Salcedo, pero solo a 100×100 recortada en círculo: no permite ver la imagen completa. Ya existe un modal de previsualización probado (016, compartido por Archivos y Correo) con maximizar, cierre y responsive; reutilizar su base en vez de inventar otro lightbox mantiene una única "cara" de modal en todo el sitio y suma una interacción esperable en cualquier perfil.

## Criterios de aceptación

- [x] Con sesión, clic en `.profile-avatar` (foto o contenedor) abre `#avatarPreviewModal` con la foto ampliada; el hash **no** cambia.
- [x] La modal reutiliza `.preview-modal` / `.preview-content`: `×`, maximizar/restaurar (`□`/`⧉`), clic en el fondo y `Escape` la cierran.
- [x] Al abrir siempre arranca **no maximizada** (estado `is-maximized` limpio tras cada apertura/cierre).
- [x] La imagen se ajusta a la ventana (contain, sin scroll ni deformación) y ocupa el 100% al maximizar.
- [x] Affordance visible: `cursor: pointer` + hover en el avatar y `title="Ampliar foto"`; `alt` accesible en la imagen ampliada.
- [x] Solo cambia `#perfil`: Archivos, Correo, login, upload y notificaciones siguen funcionando (regresión en smoke).
- [x] Sin IDs duplicados con `#filePreviewModal` / `#emailPreviewModal` (ids con prefijo `avatar`).
- [x] `node --check src/js/*.js` sin errores.
- [x] Sin errores JS en el smoke test headless.

## Fuera de alcance

- Zoom/pan o galería de imágenes (navegación entre varias fotos).
- Cambiar o subir la foto de perfil (sigue siendo un archivo fijo del repo).
- Lightbox de terceros o librerías (stack vanilla, sin dependencias).
- Ampliar imágenes de Archivos con este modal (ya tiene el suyo).
