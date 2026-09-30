# 024 · Imágenes reales en el sector de Archivos

**Estado:** implementado ✅

## Qué hace

La carpeta *Imágenes* del gestor de archivos muestra la miniatura real de cada archivo en la grilla (en lugar del emoji 🖼️) y al abrir el detalle la modal presenta la imagen a la izquierda junto al detalle escrito actual a la derecha, con scroll independiente. En pantallas angostas la imagen queda arriba y el texto debajo.

Se usan los 3 PNG de `src/assets/images/Archivos/` (Templo submarino, Manuscrito antiguo, Profesor Armitage), uno por cada `.jpg` de la carpeta.

## Por qué

Hasta ahora los tres archivos de imagen se abstrían como texto (`[IMAGEN: …]`), de modo que el usuario nunca veía la imagen que el nombre prometía. Con las imágenes reales el gestor se comporta como uno real (Drive) y la data ilustrativa de la novela se aprecia.

## Criterios de aceptación

- [x] En la carpeta *Imágenes*, los 3 archivos muestran una miniatura real (no el emoji 🖼️).
- [x] Las 3 miniaturas cargan correctamente con `file://` (rutas con espacios resueltas).
- [x] Las miniaturas tienen `alt=""` (decorativas, el nombre visible ya las describe).
- [x] Al hacer clic en un archivo de imagen, la modal de detalle abre en layout partido: imagen a la izquierda, detalle escrito a la derecha.
- [x] El detalle escrito actual de cada archivo se conserva íntegro (mismos párrafos que antes).
- [x] La imagen del detalle tiene `alt` descriptivo tomado del propio contenido.
- [x] La imagen se ajusta al panel sin recortarse (`object-fit: contain`) y el texto hace scroll por separado.
- [x] Maximizar/restaurar, `×`, clic en el fondo y Escape siguen funcionando en la modal de detalle.
- [x] Los archivos `.txt` (Documentos, Investigación) quedan exactamente como antes: sin panel de imagen y con el ícono emoji.
- [x] En pantallas ≤ 900 px la modal se apila (imagen arriba, texto debajo) sin desborde horizontal.
- [x] En 1280 px y 375 px no hay scroll horizontal en la grilla ni en la modal.
- [x] `node --check src/js/*.js` pasa sin errores.

## Fuera de alcance

- Comprimir las imágenes (la de ~2,8 MB entra en el backlog "Optimizar imágenes").
- Reemplazar el texto `[IMAGEN: …]` de los archivos `.txt` por imágenes.
- Lightbox con zoom o carga diferida (`loading="lazy"`) de las miniaturas.
- Agregar imágenes a otras carpetas del gestor.
