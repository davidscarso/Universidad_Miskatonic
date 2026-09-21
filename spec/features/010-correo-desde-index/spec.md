# Feature 010 — Correo desde el index (vista SPA)

## Estado

Por implementar

## Descripción

Continuación del patrón de la feature 008 aplicado al correo: `email.html` deja de ser una página separada y pasa a ser una vista dentro de `index.html`. Al hacer clic en **Correo** desde el nav (con sesión iniciada) se inyecta el `<main>` del correo (definido en `correo.js`) dentro de la misma página y el link "Correo" queda activo. Al hacer clic en Inicio/Foro se vuelve a la view correspondiente.

## Problema que resuelve

- Evita la navegación a una página separada para el correo: todo vive en la SPA del index
- Aprovecha la arquitectura de renderers (`correo.js`) + controlador (`navegacion.js`) ya montada en 008
- Respeta la restricción: el link "Correo" del nav sigue bloqueado sin sesión (delegación de `[data-restricted]`)

## Criterios de aceptación

- [ ] Existe `src/js/correo.js` con el `<main>` del correo (sidebar de bandejas + lista de mensajes) y `window.renderCorreo()`
- [ ] En `index.html`, al hacer clic en "Correo" (con sesión): se muestra el main del correo, el link "Correo" queda `active` y los demás lo pierden, sin recargar
- [ ] Al abrir `index.html#correo` (refresh o link externo) se muestra el correo con "Correo" activo
- [ ] Sin sesión, el link "Correo" del nav sigue bloqueado (no navega ni hace swap)
- [ ] El nav "Correo" de `archivos.html` y `perfil.html` apunta a `index.html#correo`
- [ ] El quick-link "Correo Interno" de la portada apunta a `#correo`
- [ ] `email.html` se elimina y no queda ningún link roto hacia él
- [ ] Los hash internos del correo (`#inbox`, `#sent`, `#drafts`, `#deleted`) no cambian la vista
- [ ] Funciona con `file://` (sin fetch) y mantiene el responsive actual (CSS sin cambios)

## Fuera de alcance

- Funcionalidad real de bandejas/correos (contenido estático)
- Convertir Archivos en vista del index (sigue siendo página separada)
- Backend o persistencia