# 019 · Noticias de Inicio: modal con el artículo completo

**Estado:** implementado ✅

## Qué hace

- Al hacer clic en **"Leer más »"** de cualquiera de las 3 tarjetas de **Últimas Noticias** (vista `#inicio`) se abre una **modal con el artículo completo**, usando la misma base que Archivos, Correo y Perfil (`.preview-modal` / `.preview-content`).
- La modal muestra el **título de la noticia** en el header, la **fecha** como línea meta y **3 párrafos cortos** de contenido ficticio coherente con el resumen de la tarjeta.
- Incluye los controles conocidos: **maximizar/restaurar** (`□` / `⧉`), `×`, clic en el **fondo** y tecla **`Escape`**.
- El link **ya no saca del SPA**: pasa de `href="acceso-restringido.html"` a `href="#"` con `preventDefault()`, así que la URL conserva `#inicio`.
- Cada tarjeta referencia su artículo con `data-article` (`ia`, `sueno`, `hilos`).

## Por qué

Los "Leer más" eran un callejón sin salida: navegaban a `acceso-restringido.html`, una página fuera del SPA, en lugar de ofrecer más información (problemática anotada en el backlog). El sitio ya tiene un modal de lectura probado y compartido por tres vistas; extenderlo a las noticias da continuidad visual, resuelve el link roto y da contenido real a la portada con un coste mínimo (sin CSS nuevo).

## Criterios de aceptación

- [x] Los 3 links "Leer más" abren `#newsPreviewModal` con título, fecha y 3 párrafos del artículo correspondiente.
- [x] El hash sigue en `#inicio` y **no** se navega a `acceso-restringido.html`.
- [x] La modal usa `.preview-modal` / `.preview-content`: `×`, maximizar/restaurar (`□`/`⧉`), clic en el fondo y `Escape` la cierran.
- [x] Al abrir siempre arranca **no maximizada** (sin residuo `is-maximized` tras cerrar).
- [x] Maximizar ocupa la ventana completa (ancho ≥ viewport) y restaurar vuelve al tamaño base.
- [x] Sin IDs duplicados con `#filePreviewModal`, `#emailPreviewModal` ni `#avatarPreviewModal`.
- [x] El disclaimer de primera visita en `#inicio` sigue apareciendo y no impide usar la modal de noticias.
- [x] Regresión: Perfil (018), Archivos y Correo siguen funcionando.
- [x] `node --check src/js/*.js` sin errores.
- [x] Sin errores JS en el smoke test headless.

## Fuera de alcance

- CMS, editor o carga dinámica de noticias (los artículos son datos fijos en `inicio.js`).
- Imágenes o galerías dentro del artículo.
- Arreglar el texto del hero ("COMPLETAR ALGO ACA", typos) — resuelto en la feature 020.
- Compartir/enlazar artículos por URL (sin hash por artículo).
