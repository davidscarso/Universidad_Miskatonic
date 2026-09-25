# 012 · Perfil desde el index (SPA) + guarda de acceso

**Estado:** implementado ✅

## Qué hace

- El botón con el nombre de usuario (header) lleva al perfil como **vista `#perfil` del index**, en lugar de a la página suelta `perfil.html`.
- La vista de perfil muestra la tarjeta con el **nombre de la sesión** (`localStorage.username`), rol y email, más accesos rápidos a Inicio, Correo y Archivos.
- **Las tres vistas privadas (`#correo`, `#archivos`, `#perfil`) quedan protegidas**: sin sesión, el hash directo muestra un panel de **Acceso Restringido** (mismo mensaje que `acceso-restringido.html`) con un botón que abre el modal de login.
- Al iniciar sesión desde ese panel, la vista se re-renderiza y muestra su contenido real. Al cerrar sesión estando en una vista privada, vuelve a aparecer el panel de acceso restringido.

## Por qué

`perfil.html` quedó como la única página fuera del patrón SPA (las features 008/010/011 ya migraron foro, correo y archivos), lo que duplica header/footer y exige mantener links `index.html#...` en dos lugares. Además, `#correo` y `#archivos` eran navegables directo sin sesión: la protección existente era solo cosmética (links bloqueados) y no había mensaje de error de acceso.

## Criterios de aceptación

- [x] El botón de usuario del header apunta a `#perfil` y solo se muestra con sesión iniciada.
- [x] Con sesión, `#perfil` renderiza la tarjeta de perfil con el nombre de la sesión (fallback: "Profesor Admin") y los tres accesos rápidos.
- [x] Con sesión, `#perfil` deja el botón de usuario con estilo activo y ningún nav-link del header queda activo.
- [x] Sin sesión, entrar directo a `#perfil`, `#correo` o `#archivos` muestra el panel de Acceso Restringido con el mensaje de error y el registro NK-1928-047.
- [x] El botón "Iniciar Sesión" del panel restringido abre el modal de login.
- [x] Login exitoso estando en una vista privada re-renderiza esa vista con su contenido real.
- [x] Logout estando en una vista privada muestra el panel de acceso restringido; en `#inicio`/`#foro` no cambia nada.
- [x] Sin sesión, los nav-links y quick-links de Correo/Archivos siguen bloqueados (clase `.restricted`).
- [x] `#inicio` y `#foro` siguen siendo públicos (sin panel).
- [x] Los accesos rápidos del perfil navegan dentro de la SPA (`#inicio`, `#correo`, `#archivos`).
- [x] No queda ninguna referencia a `perfil.html` en `src/`; `perfil.html` eliminado.
- [x] Cambiar entre vistas repetidas veces no acumula listeners (el botón del panel se recrea por render).

## Fuera de alcance

- Proteger `#foro` (es público por la misión) o añadir roles/usuarios múltiples.
- Cambiar las credenciales hardcodeadas o la sesión en `localStorage`.
- Modificar `acceso-restringido.html` (sigue existiendo para los "Leer más" del inicio).
- Recuperar contenido de correo/archivos borrado o persistencia real.
