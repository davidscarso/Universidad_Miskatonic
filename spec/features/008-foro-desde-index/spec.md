# Feature 008 — Foro desde el index (vista SPA inicio/foro)

## Estado

Diseñado, por implementar

## Descripción

El foro deja de ser una página separada (`foro.html`) y pasa a ser una vista dentro de `index.html`. Al hacer clic en **Foro** desde el nav del index se inyecta el `<main>` del foro (definido en un JS propio, `foro.js`) dentro de la misma página y el link "Foro" queda activo. Al hacer clic en **Inicio** se vuelve a inyectar el `<main>` de la portada (vía `main-placeholder`) y el link "Inicio" queda activo.

## Problema que resuelve

- Evita saltar entre `index.html` y `foro.html`: el usuario se queda en la misma página (SPA ligera, sin frameworks, respetando el stack vanilla).
- Centraliza el nav Inicio/Foro en una sola página.
- Continúa el patrón de "main en archivo JS separado" iniciado en la feature 007.

## Criterios de aceptación

- [ ] Existe `src/js/foro.js` con el HTML del `<main>` del foro (sidebar de categorías + lista de temas)
- [ ] En `index.html`, al hacer clic en "Foro" del nav: se muestra el main del foro, el link "Foro" queda `active` y el de "Inicio" deja de estarlo, sin recargar la página
- [ ] En `index.html`, al hacer clic en "Inicio": se muestra el main de la portada y el link "Inicio" queda `active`
- [ ] Al abrir `index.html` se muestra la portada con "Inicio" activo
- [ ] Al abrir `index.html#foro` (refresh o link desde otra página) se muestra el foro con "Foro" activo
- [ ] El nav "Inicio"/"Foro" de `email.html`, `archivos.html`, `perfil.html` apunta a `index.html` / `index.html#foro`
- [ ] El quick-link "Foro de Investigación" de la portada apunta a `#foro`
- [ ] `foro.html` se elimina y no queda ningún link roto hacia él
- [ ] Los links restringidos (Correo/Archivos) del contenido inyectado siguen bloqueados tras el swap (delegación de eventos)
- [ ] Los links restringidos se habilitan al iniciar sesión tras un swap (login en index)
- [ ] Funciona con `file://` (sin fetch) y mantiene el responsive actual (CSS sin cambios)

## Fuera de alcance

- Los modales "Subir mi dibujo" y "Notificaciones" (el botón "Subir mi dibujo" queda visible pero inerte). **Pactado arreglarlo en la feature 009**
- Convertir Correo y Archivos en vistas del index (siguen siendo páginas separadas)
- Backend o persistencia