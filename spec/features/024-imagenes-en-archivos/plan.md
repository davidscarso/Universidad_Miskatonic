# 024 · Imágenes reales en el sector de Archivos - Plan

_Cómo se implementa lo descrito en `spec.md`. Debe respetar la `constitution/`._

## Enfoque

Cargar las imágenes como datos más de los dos diccionarios que ya alimentan la vista (`fileContents` para el detalle y `folderContents` para la grilla) y renderizarlas con los mismos elementos que usa el resto del sitio: `.modal-body` + `.preview-content` (base compartida de previews de Archivos/Correo/Noticias/Perfil) y `.detail-body` para el texto. No se toca el router, la guarda de acceso ni el comportamiento de cierre de modales.

## Implementación

1. `src/js/archivos.js` — `fileContents`: agregar `image` y `imageAlt` a las claves `templo`, `manuscrito` y `profesor` (los 3 PNG de `src/assets/images/Archivos/`).
2. `src/js/archivos.js` — `folderContents.imagenes`: agregar `thumb` con el mismo path a cada uno de los 3 archivos; se conserva `icon` por si se cae la imagen.
3. `src/js/archivos.js` — `buildPreviewBody(file)`: si el archivo tiene `image` devuelve el panel `.preview-media` con `<img class="preview-media-img">` + el bloque `.detail-body.preview-detail` con `file.content`; si no, devuelve solo `file.content` (comportamiento actual de los `.txt`).
4. `src/js/archivos.js` — `openFilePreview()`: alternar la clase `is-split` sobre `#previewBody` y pintar con `buildPreviewBody()`. Rutas con espacios/acentos envueltas en `encodeURI()`.
5. `src/js/archivos.js` — `updateFilesGrid()`: si el archivo tiene `thumb`, renderizar `<div class="file-thumb"><img … alt=""></div>` en lugar de `<div class="file-icon">`.
6. `src/css/styles.css` — `.file-thumb` + `.file-thumb img` (`object-fit: cover`, alto 90px) junto a `.file-icon`.
7. `src/css/styles.css` — `.modal-body.is-split` (flex, `gap`, `overflow: hidden`), `.preview-media` (42%, centrado, borde), `.preview-media-img` (`object-fit: contain`) y `.preview-detail` (`flex: 1`, scroll propio) junto a `.modal-body`.
8. `src/css/styles.css` — en `@media (max-width: 900px)`: `.modal-body.is-split` pasa a columna, la imagen se limita a `45vh` y el detalle deja de scrollear por su cuenta; en `@media (max-width: 600px)`: `.file-thumb` baja a 64px.
9. `spec/` — crear esta carpeta y llevar `roadmap.md`, `AGENTS.md` y `README.md` a `001-024` / siguiente `025`.

## Decisiones

- **Imagen al lado del texto (no arriba/abajo, no sola)** - decisión del usuario: reproduce la ficha de perfil (foto + datos) y aprovecha el ancho de la modal; en móvil se apila para no comprimir el texto.
- **`encodeURI()` en los `src`** - los nombres tienen espacios (`Templo submarino.png`); el encodeo evita diferencias entre `file://` y un futuro servidor.
- **Panel con la clase `is-split` toggleada en JS** - una sola modal reutiliza dos layouts sin duplicar markup ni modales, y los handlers de cierre/maximizar no cambian.
- **`object-fit: cover` en la grilla y `contain` en el detalle** - la miniatura necesita recorte tipo Drive; el detalle debe mostrar la imagen completa.
- **`alt=""` en miniaturas** - son decorativas: el nombre del archivo está visible al lado y repetirlo perjudica la lectura por pantalla.
- **No se comprime el PNG de 2,8 MB** - queda en el backlog "Optimizar imágenes" para no mezclar tamaños de archivo con lógica de la vista.

## Riesgos

- **Peso de carga (≈5 MB entre las 3 imágenes)** - solo se piden al abrir la carpeta/modal, con `file://` son locales; si el sitio pasa a GitHub Pages conviene optimizar (backlog).
- **Ruta rota si se mueve la carpeta** - validado con `naturalWidth > 0` en el smoke test para las 3 miniaturas y las 3 imágenes de detalle.
- **Regresión en los `.txt`** - el smoke test abre *Documentos* y verifica que la modal siga sin `is-split` y con el contenido de siempre.
