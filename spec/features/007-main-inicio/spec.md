# Feature 007 — Main del inicio en archivo separado

## Estado

Por implementar

## Descripción

Extraer el contenido principal (`<main>`) de `index.html` hacia un archivo JavaScript separado (`src/js/inicio.js`) e inyectarlo dentro de la página mediante un placeholder, siguiendo el mismo patrón que la feature 006 (footer.js).

Así, `index.html` queda como un "cascarón" con el header, el login y los scripts compartidos, y al acceder desde el nav a **Inicio** se muestra la página con todo el contenido inyectado.

## Problema que resuelve

- El `<main>` de la portada (hero, noticias, accesos rápidos) vive en el mismo archivo que el resto del layout, mezclando contenido con estructura.
- Preparar el terreno para reutilizar el mismo patrón en otras secciones (Foro), manteniendo un único punto de mantenimiento para el contenido.

## Criterios de aceptación

- [ ] `index.html` no contiene el `<main>` hardcodeado: solo un `#main-placeholder`
- [ ] El contenido inyectado se ve idéntico al actual (hero, Últimas Noticias, Accesos Rápidos)
- [ ] Al hacer clic en "Inicio" desde el nav se muestra el index con el contenido completo
- [ ] El contenido se inyecta vía JavaScript desde un único archivo `inicio.js`
- [ ] La inyección no rompe el login/logout ni los links restringidos del contenido
- [ ] Funciona abriendo `index.html` con doble clic (`file://`), sin servidor
- [ ] Se mantiene el diseño responsive actual (CSS sin cambios)

## Fuera de alcance

- Extraer el `<main>` del foro (será la feature 008, a validar tras esta)
- Extraer el header duplicado (existe `header.js` pero ninguna página lo usa)
- Backend o persistencia