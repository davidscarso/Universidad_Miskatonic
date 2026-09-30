# 023 · Campana de notificaciones con sesión y error de login inline - Tareas

## Implementación

- [x] `src/index.html` — reordenar `.user-container`: `loginBtn`, `profileBtn`, `notificationBtn`, `logoutBtn`; campana con `style="display: none;"`.
- [x] `src/index.html` — agregar `<p class="login-error" id="loginError" role="alert" hidden>` dentro de `.login-form`.
- [x] `src/js/main.js` — declarar `notificationBtn` con los controles del header y mostrarlo/ocultarlo en `updateUIForLoggedInUser` / `updateUIForLoggedOutUser` (eliminar la declaración duplicada del bloque de notificaciones).
- [x] `src/js/main.js` — helper global `window.limpiarErrorLogin()`.
- [x] `src/js/main.js` — rama `else` del submit: sin `alert()` ni `// TODO`; muestra `#loginError`, marca los inputs con `.field-error`, focus + select en `#password`.
- [x] `src/js/main.js` — limpiar el error al escribir, al cerrar la modal (`×` y fondo) y al abrirla desde el header y desde Acceso Restringido.
- [x] `src/css/styles.css` — `.login-error` y `.form-group input.field-error`.
- [x] `src/css/styles.css` — `.notification-btn` con `border: none` + subrayado rojo al hover (consistente con nombre y Salir).

## Validación

- [x] `node --check src/js/*.js`
- [x] Smoke test automatizado (Chrome headless + CDP, 27 aserciones): sin sesión la campana está oculta; login correcto muestra nombre → campana → Salir y la campana abre su modal; logout la oculta; credenciales mal sin `alert()`, error visible, se limpia al escribir y al reabrir; Escape cierra; acceso restringido abre el login sin error residual.
- [x] Verificación visual (screenshots) en 1280 px y 375 px: sin desborde horizontal, orden correcto, estilo del error acorde al tema oscuro.
- [x] Validar contra los criterios de aceptación de `spec.md`.

## Documentación

- [x] Crear `spec/features/023-header-notificaciones-y-error-login/` con `spec.md`, `plan.md` y `tasks.md`
- [x] Marcar como `[x]` los criterios pendientes de `001`-`011` y las tasks pendientes de `020` y `021` (validación manual hecha por el usuario)
- [x] Actualizar el criterio de `021` sobre la visibilidad de la campana (solo con sesión)
- [x] Mover la feature a "Hecho" en `../../constitution/roadmap.md`
- [x] Actualizar `AGENTS.md` y `README.md` con el nuevo estado y siguiente número (`024`)
