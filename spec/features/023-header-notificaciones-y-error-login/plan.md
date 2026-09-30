# 023 · Campana de notificaciones con sesión y error de login inline - Plan

_Cómo se implementa lo descrito en `spec.md`. Debe respetar la `constitution/`._

## Enfoque

Reutilizar el mismo mecanismo que ya usan `#profileBtn` y `#logoutBtn` (mostrar/ocultar por `style.display` dentro de `updateUIForLoggedInUser` / `updateUIForLoggedOutUser`) para la campana, reordenando el DOM del `user-container`. El error de login se resuelve con un mensaje dentro del formulario (`<p hidden>` + clase de error en los inputs), sin crear nuevos modales ni usar librerías, manteniendo el tema oscuro y el patrón de modales existente.

## Implementación

1. `src/index.html` — `.user-container`: mover el bloque `#notificationBtn` para que quede después de `#profileBtn` y antes de `#logoutBtn`, y agregarle `style="display: none;"` para que no parpadee al cargar.
2. `src/index.html` — dentro de `.login-form`, antes del botón Ingresar, agregar `<p class="login-error" id="loginError" role="alert" hidden>`.
3. `src/js/main.js` — subir `const notificationBtn` junto a los otros controles del header y mostrarlo (`flex`) en `updateUIForLoggedInUser` / ocultarlo (`none`) en `updateUIForLoggedOutUser`.
4. `src/js/main.js` — helper global `window.limpiarErrorLogin()` que oculta `#loginError` y quita `.field-error` de los inputs.
5. `src/js/main.js` — en la rama `else` del `submit` de `#loginForm`: eliminar el `alert()` y el `// TODO`, mostrar `#loginError`, marcar los dos inputs, focus + select en `#password`.
6. `src/js/main.js` — limpiar el error: al escribir en usuario/contraseña (`input`), al abrir la modal (`#loginBtn` y `#restrictedLoginBtn`) y al cerrarla (`×`, clic en el fondo).
7. `src/css/styles.css` — `.login-error` (fondo rojo tenue, borde rojo con acento a la izquierda, tipografía del sitio) y `.form-group input.field-error` (borde rojo).
8. `src/css/styles.css` — `.notification-btn` pierde el borde rectangular (`border: none`) y usa subrayado rojo al hover (`border-bottom`), igual que `.profile-btn` y `.logout-btn`, para que la campana no rompa la fila "nombre → campana → Salir".
9. `spec/` — crear esta carpeta (spec/plan/tasks), marcar `[x]` en los criterios pendientes de 001-011 y en las tasks de 020-021, ajustar el criterio de 021 sobre la visibilidad de la campana y actualizar roadmap, `AGENTS.md` y `README.md` a `024`.

## Decisiones

- **Mensaje inline en la modal (no modal dedicada ni toast)** - el `// TODO` original sugería cerrar el login y abrir otra modal; se descartó porque un error de credenciales no debería sacar al usuario del formulario. El toast se descartó por ser ajeno a la estética de foro 2000s.
- **Ocultar la campana con `display: none` en el HTML** - evita el flash de un elemento que luego se oculta al correr `DOMContentLoaded`.
- **Reordenar el DOM en lugar de usar `order` de flexbox** - `order` dejaría el orden lógico y el de accesibilidad (Tab) en desacuerdo; con el DOM correcto ambos coinciden.
- **`window.limpiarErrorLogin` global** - `renderAccesoRestringido` vive fuera del scope de `DOMContentLoaded` y necesita limpiar el error al abrir la modal desde el panel restringido.
- **No tocar el `alert()` de subida de dibujos** - fuera de alcance, acordado con el usuario.

## Riesgos

- **Regresión en el flujo de sesión** - el mismo smoke test cubre login correcto, incorrecto, logout y acceso restringido (27 aserciones).
- **Responsive del header con 3 elementos de usuario en 375 px** - verificado sin desborde horizontal (`scrollWidth <= innerWidth`).
- **Renombrado/eliminado de `notificationBtn`** - único punto de acceso desde `main.js`; no hay otros consumidores en `foro.js` u otras vistas.
