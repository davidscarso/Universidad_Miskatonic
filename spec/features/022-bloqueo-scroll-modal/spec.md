# 022 · Bloqueo de scroll del fondo con modal abierto

**Estado:** implementado ✅

## Qué hace

Cuando cualquier modal está abierto, la página de fondo deja de hacer scroll (rueda del ratón y táctil). El contenido dentro del modal sigue scrolleando normalmente. Al cerrar el modal, el scroll del fondo se restaura en la posición anterior.

## Por qué

Hoy los modales (`position: fixed`) no bloquean el scroll: al girar la rueda o arrastrar en táctil sobre el overlay, la página de fondo se mueve detrás del modal, lo que rompe la sensación de diálogo y puede perderse la posición de lectura.

## Criterios de aceptación

- [x] Con cualquier modal abierto (login, upload, notificaciones, disclaimer, previews de noticias/temas/correo/archivos/avatar y compose) el fondo NO scrollea.
- [x] El contenido dentro del modal SÍ hace scroll normalmente.
- [x] Al cerrar el último modal, el scroll del fondo queda en la posición previa.
- [x] No hay salto horizontal de layout al bloquear/desbloquear el scrollbar.
- [x] Funciona con los modales inyectados dinámicamente por la SPA y con `file://`.
- [x] Escape, clic en el fondo y `×` siguen cerrando los modales (sin regresiones).
- [x] En móvil/táctil el fondo no se mueve con el dedo (overscroll contenido).

## Fuera de alcance

- Focus trap, `role="dialog"` y retorno de foco (accesibilidad de modales).
- Crear nuevos modales.
- Cambios de comportamiento de apertura/cierre en JS.
