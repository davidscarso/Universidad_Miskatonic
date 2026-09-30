# 021 · Interacciones pendientes de Foro y Correo

**Estado:** implementado ✅

## Qué hace

Activa controles visibles que todavía no tienen una interacción completa: notificaciones del header, lectura detallada de temas del foro y redacción simulada de correos. También verifica que la subida de dibujos conserve su comportamiento después de los cambios.

## Por qué

Algunas vistas muestran controles que parecen funcionales pero no responden: el botón de notificaciones está oculto, los temas del foro no tienen detalle y el botón Redactar no realiza ninguna acción. Esto reduce la coherencia entre la interfaz y el comportamiento observable.

## Criterios de aceptación

- [x] El botón de notificaciones del header es visible solo con sesión iniciada y abre el modal existente.
- [x] El modal de notificaciones permite marcar todas como leídas.
- [x] Marcar todas como leídas elimina los estados no leídos y oculta el badge.
- [x] Cada tema del foro puede abrir un detalle de solo lectura.
- [x] El detalle del tema muestra título, autor, fecha, contenido y respuestas.
- [x] El detalle del tema puede cerrarse con `×`, clic en el fondo y Escape.
- [x] El detalle del tema permite maximizar y restaurar la ventana.
- [x] El botón Redactar abre un formulario con destinatario, asunto y cuerpo.
- [x] El formulario de redacción valida los campos obligatorios.
- [x] El envío del correo muestra una confirmación simulada y limpia el formulario.
- [x] La redacción no pretende persistir ni enviar datos reales.
- [x] La subida de dibujos continúa abriendo su modal y reseteando el formulario.
- [x] Los controles nuevos tienen nombres accesibles y funcionan en móvil.

## Fuera de alcance

- Backend, envío real o persistencia de correos.
- Persistencia de notificaciones, temas o dibujos.
- Sistema de respuestas reales en los temas.
- Edición de correos existentes o administración de bandejas.
- Cambios en el sistema de autenticación.
