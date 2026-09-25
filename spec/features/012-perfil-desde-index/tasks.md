# Tareas — Feature 012 Perfil desde el index (SPA) + guarda de acceso

## Implementación

- [x] Crear `src/js/perfil.js` con `window.renderPerfil()` (tarjeta con nombre de la sesión + accesos rápidos `#inicio`/`#correo`/`#archivos`)
- [x] `navegacion.js`: lista `restrictedViews`, helpers `isRestricted`/`hasSession` y guarda en `renderView()` antes del dispatch
- [x] `navegacion.js`: vista `perfil` en dispatch, hash `#perfil` en `getViewFromHash`, `.active` del `#profileBtn` en `setActive`
- [x] `navegacion.js`: exponer `window.refreshCurrentView()`
- [x] `main.js`: `window.renderAccesoRestringido()` en top-level con el markup de `acceso-restringido.html` + botón "Iniciar Sesión"
- [x] `main.js`: helpers `isRestrictedHash()`/`refreshRestrictedView()` y hooks en el login exitoso y en `logout()`
- [x] `index.html`: `profileBtn` → `href="#perfil"`; cargar `js/perfil.js` antes de `js/navegacion.js`
- [x] `styles.css`: `.profile-btn.active` y `.restricted-content .login-btn`
- [x] Eliminar `src/perfil.html`

## Validación

- [x] `node --check` sobre `perfil.js`, `navegacion.js` y `main.js`
- [x] Sin sesión: `index.html#correo`, `#archivos` y `#perfil` directos → panel de Acceso Restringido con mensaje y registro NK-1928-047
- [x] Sin sesión: `index.html` (`#inicio`) e `index.html#foro` cargan normal (sin panel)
- [x] Sin sesión: nav-links y quick-links de Correo/Archivos siguen con clase `.restricted` (bloqueados)
- [x] Botón del panel restringido → abre `#loginModal`
- [x] Con sesión (login `SALCEDO.D`): `#perfil` muestra la tarjeta con "Damián Salcedo"; `#profileBtn` activo; ningún nav-link activo
- [x] Con sesión: `#correo` y `#archivos` muestran su contenido real
- [x] Login desde el panel con `#correo` en el hash → aparece la bandeja de entrada
- [x] Logout con `#archivos` (o `#correo`/`#perfil`) abierto → panel de acceso restringido; en `#inicio`/`#foro` no cambia nada
- [x] Accesos rápidos del perfil navegan dentro de la SPA y los restringidos quedan bloqueados sin sesión
- [x] Swaps Inicio/Foro/Correo/Archivos/Perfil repetidos → sin listeners acumulados
- [x] Ninguna referencia a `perfil.html` en `src/` (grep)
- [x] Responsive del perfil y del panel restringido en desktop + mobile
- [x] Abrir con doble clic (`file://`, sin servidor)

## Documentación

- [x] Actualizar `spec/constitution/roadmap.md` (012 en "Hecho" + renumeración 010/011)
