# 013 · Modal de disclaimer (aviso legal)

**Estado:** implementado ✅

## Qué hace

- Al llegar a la vista **Inicio** por primera vez aparece un modal de **aviso legal** que indica que la página es ficticia.
- El modal tiene estilo "papel/legal" (fondo claro, tipografía serif), deliberadamente distinto al tema oscuro del sitio, para que lea como un documento legal.
- Incluye un link **"Adquirir el libro"** (placeholder `href="#"` para completar más tarde) y un único botón **Aceptar**.
- Tras aceptar, se guarda `disclaimerAccepted` en `localStorage` y **el modal no vuelve a aparecer nunca** en ese navegador.
- Solo se cierra con el botón Aceptar: sin X, sin Escape y sin cierre por clic en el fondo (aceptación explícita).

## Por qué

La página se crea a partir de una novela y su público son los lectores de ese libro. Hace falta avisar, de forma visible y clara, que todo el contenido (universidad, correo, foro, archivos) es ficción y no corresponde a una institución real, evitando que un lector lo tome por información real o por un sitio institucional genuino.

## Criterios de aceptación

- [x] Al cargar `index.html` con la vista Inicio y sin `disclaimerAccepted`, el modal aparece con `.active`.
- [x] El modal contiene título "Aviso legal", texto que declara el carácter ficticio, link "Adquirir el libro" y botón "Aceptar".
- [x] Entrando directo a `#foro` (sin pasar por Inicio) el modal no aparece.
- [x] Clic en "Aceptar" → se guarda `disclaimerAccepted=true` en `localStorage` y el modal se cierra.
- [x] Con el flag guardado, el modal no vuelve a aparecer en ninguna carga ni al volver a Inicio.
- [x] Escape, la X (no existe) y el clic en el fondo **no** cierran el modal.
- [x] Estilo claro tipo documento (fondo papel, texto oscuro, serif) y sin los efectos glow del tema oscuro.
- [x] El modal queda por encima de los otros modales (z-index 300 > 200).
- [x] Responsive en mobile (390px): el contenido cabe sin desbordes.
- [x] Con el sitio sin JS, el modal no tapa la página (display:none por defecto).

## Fuera de alcance

- Poner la URL real de compra del libro (queda `href="#"`; se completa cuando se tenga el link).
- Mostrar el disclaimer en `acceso-restringido.html` o en vistas que no sean Inicio.
- Gestión de cookies/consentimiento real o textos legales vinculantes.
- Volver a mostrarlo tras borrar datos del navegador (comportamiento esperado de localStorage).
