# 023 · Campana de notificaciones con sesión y error de login inline

**Estado:** implementado ✅

## Qué hace

La campana de notificaciones del header pasa a estar disponible solo para usuarios autenticados y se ubica inmediatamente a la derecha del nombre de usuario. Además, cuando el login recibe credenciales incorrectas muestra un mensaje de error dentro de la propia modal de login, con los campos resaltados, en lugar de un `alert()` del navegador.

## Por qué

La campana abría un modal de notificaciones que no corresponde a un visitante sin sesión y aparecía antes que el nombre de usuario, lo que rompía el orden lógico "quién soy → qué me avisan → salir". Por otro lado, el `alert()` bloquea la página, no respeta el tema visual y el `// TODO` del código pedía expresamente reemplazarlo por una solución propia.

## Criterios de aceptación

- [x] Sin sesión iniciada, la campana de notificaciones no se muestra en el header.
- [x] Con sesión iniciada, la campana es visible (junto con el nombre y el botón Salir).
- [x] Con sesión iniciada, el orden en el header es: nombre de usuario → campana → Salir.
- [x] Al iniciar sesión la campana aparece sin recargar la página; al cerrar sesión desaparece.
- [x] La campana no produce un parpadeo visible al cargar la página (arranca oculta en el HTML).
- [x] Con sesión, la campana abre el modal de notificaciones existente (badge "3", "Marcar todas como leídas").
- [x] Sin sesión no hay forma de abrir el modal de notificaciones.
- [x] Credenciales incorrectas: NO se ejecuta `alert()`; la modal de login permanece abierta.
- [x] Credenciales incorrectas: aparece el mensaje "Credenciales incorrectas. Acceso denegado." dentro de la modal, con `role="alert"`.
- [x] Credenciales incorrectas: ambos campos se resaltan con borde rojo y el foco queda en la contraseña (texto seleccionado).
- [x] El mensaje de error desaparece al escribir en cualquier campo y al reabrir la modal.
- [x] Credenciales correctas: el login cierra, se guarda la sesión y se muestra la UI autenticada (como hasta ahora).
- [x] Escape, `×` y el clic en el fondo siguen cerrando la modal de login.
- [x] El botón "Iniciar Sesión" del panel de Acceso Restringido abre la modal sin arrastrar un error anterior.
- [x] Responsive: en 1280, 768 y 375 px la fila header no desborda y el orden se mantiene.
- [x] Funciona con `file://` y `node --check src/js/*.js` pasa sin errores.

## Fuera de alcance

- El `alert()` de "Dibujo publicado exitosamente" en `main.js` (subida de dibujos).
- Persistencia del badge de notificaciones entre sesiones.
- Focus trap / `role="dialog"` de la modal de login (ver 022).
- Backend o validación real de credenciales.
