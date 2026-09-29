# 020 · Correcciones de calidad y navegación — Plan

## Enfoque

Corregir primero los comportamientos existentes con cambios mínimos y compatibles con la SPA vanilla. El estado del disclaimer seguirá en `localStorage`, el contenido del foro permanecerá en memoria y el cambio de categoría se resolverá dentro de `renderForo()` sin introducir rutas nuevas ni dependencias.

## Implementación

1. Eliminar en `src/js/main.js` el borrado automático de `disclaimerAccepted`.
2. Verificar en `src/js/inicio.js` que el disclaimer solo se active cuando no esté aceptado.
3. Mantener en `src/js/footer.js` la apertura manual del disclaimer sin modificar el hash.
4. Corregir `openFilePreview()` en `src/js/archivos.js` para insertar `file.content` dentro de un contenedor HTML válido, sin envolverlo en un `<p>` adicional.
5. Revisar los previews de todos los archivos para confirmar que el cambio no altera el modal compartido.
6. Editar los textos visibles de `src/js/inicio.js` y `src/js/foro.js`, eliminando placeholders y errores ortográficos.
7. Organizar en `src/js/foro.js` los temas por categoría mediante una estructura de datos en memoria.
8. Añadir `data-category` a los controles de categoría y manejar sus clics con delegación de eventos.
9. Renderizar título, contador, categoría activa y temas según la categoría seleccionada.
10. Evitar que los controles de categoría naveguen a `#suenos`, `#compulsiones` o `#dibujos`; la URL debe permanecer en `#foro`.
11. Actualizar la documentación de la feature y el roadmap cuando la implementación esté validada.

## Decisiones

- **Estado del disclaimer en `localStorage`** — Se conserva el mecanismo existente porque es suficiente para el sitio estático y ya forma parte de la especificación.
- **Categorías sin hash propio** — Se mantiene `#foro` para respetar el router actual y evitar añadir rutas que no representan vistas completas.
- **Datos del foro en memoria** — Se mantiene el modelo ficticio estático; no se introduce backend ni persistencia.
- **HTML de previews** — Se corrige únicamente la estructura inválida, sin reemplazar el sistema actual de contenido estático.

## Riesgos

- **El disclaimer podría no abrirse al navegar entre vistas** — Probar Inicio, navegación SPA y enlaces del footer después de aceptar.
- **El cambio de categoría podría perder listeners tras un render** — Usar delegación desde el contenedor estable o volver a enlazar handlers después de cada render.
- **El contenido de las categorías podría quedar inconsistente** — Verificar que cada contador coincida con el número de temas mostrado.
- **El HTML de los previews podría afectar estilos existentes** — Revisar Archivos en escritorio y móvil.
