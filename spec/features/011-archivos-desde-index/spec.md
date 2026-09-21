# Feature 011 — Archivos desde el index (vista SPA)

## Estado

Por implementar

## Descripción

Continuación del patrón de las features 008 y 010 aplicado al gestor de archivos: `archivos.html` deja de ser una página separada y pasa a ser una vista dentro de `index.html`. Al hacer clic en **Archivos** desde el nav (con sesión iniciada) se inyecta el `<main>` del gestor de archivos (definido en `archivos.js`) dentro de la misma página y el link "Archivos" queda activo. Al hacer clic en Inicio/Foro/Correo se vuelve a la view correspondiente.

A diferencia de 008/010, Archivos **no es contenido estático**: tiene navegación por carpetas, actualización de la grilla de archivos y un modal de vista previa con minimizar/maximizar/cerrar. Toda esa lógica (hoy en `main.js`, ligada al cargar la página) debe vivir ahora en `archivos.js` y ligarse al inyectar la vista.

## Problema que resuelve

- Evita la navegación a una página separada para Archivos: todo vive en la SPA del index
- Aprovecha la arquitectura de renderers (`archivos.js`) + controlador (`navegacion.js`) ya montada en 008/010
- Respeta la restricción: el link "Archivos" del nav sigue bloqueado sin sesión (delegación de `[data-restricted]`)
- La lógica de carpetas/preview deja de depender de elementos presentes al `DOMContentLoaded` y pasa a ligarse por render, sin listeners acumulados entre cambios de vista

## Criterios de aceptación

- [ ] Existe `src/js/archivos.js` con el `<main>` del gestor (sidebar de carpetas + grilla de archivos + modal de vista previa) y `window.renderArchivos()`
- [ ] La lógica de carpetas/preview (hoy en `main.js`) queda en `archivos.js` **y sale de `main.js`** (sin duplicados ni código muerto)
- [ ] En `index.html`, al hacer clic en "Archivos" (con sesión): se muestra el gestor con la carpeta "Documentos" activa por defecto, el link "Archivos" queda `active` y los demás lo pierden, sin recargar
- [ ] Cambiar de carpeta actualiza la grilla, el título y el contador (comportamiento igual a la página actual)
- [ ] Clic en un archivo abre la vista previa; Cerrar (X), clic en el fondo y Escape la cierran; minimizar/maximizar funcionan y el tamaño se resetea al cerrar
- [ ] Al abrir `index.html#archivos` (refresh o link externo) se muestra el gestor con "Archivos" activo
- [ ] Sin sesión, el link "Archivos" del nav sigue bloqueado (no navega ni hace swap)
- [ ] El nav "Archivos" de `perfil.html` apunta a `index.html#archivos`
- [ ] El quick-link "Archivos" de la portada apunta a `#archivos`
- [ ] `archivos.html` se elimina y no queda ningún link roto hacia él
- [ ] Cambiar varias veces de vista (Archivos ↔ Inicio/Foro/Correo) no acumula listeners ni rompe carpetas/preview
- [ ] Funciona con `file://` (sin fetch) y mantiene el responsive actual (CSS sin cambios)

## Fuera de alcance

- Subida real de archivos (contenido estático simulado)
- Funcionalidad real del gestor (persistencia, subcarpetas)
- Convertir más secciones en vistas del index (solo Archivos)
- Backend o persistencia

## Notas

- El `notificationModal` que traía `archivos.html` (notificaciones de archivos) **no se traslada**: no tenía ningún botón que lo abriera en esa página (código muerto) y el index ya tiene su propio `notificationModal` (de la 009). Evitar duplicar el ID.