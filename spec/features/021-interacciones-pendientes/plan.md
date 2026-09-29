# 021 · Interacciones pendientes de Foro y Correo — Plan

## Enfoque

Reutilizar los modales y patrones ya existentes en `index.html`, `main.js`, `correo.js` y `archivos.js`. Las nuevas interacciones serán simulaciones locales, adecuadas para el alcance estático del proyecto, sin introducir backend ni dependencias.

## Implementación

1. Reactivar en `src/index.html` el botón de notificaciones que actualmente está comentado.
2. Revisar en `src/js/main.js` la apertura, cierre y marcado de notificaciones.
3. Añadir atributos accesibles al botón, al badge y a los controles del modal.
4. Convertir los temas de `src/js/foro.js` en datos estructurados con detalle, autor, fecha y respuestas.
5. Añadir un modal de detalle de tema reutilizando las clases `.preview-*`.
6. Enlazar el clic de cada tema con el modal mediante delegación de eventos.
7. Implementar cierre por botón, fondo y Escape, además de maximizar y restaurar.
8. Crear en `src/js/correo.js` el modal de redacción y sus campos.
9. Añadir validación de destinatario, asunto y cuerpo.
10. Simular el envío, mostrar confirmación y limpiar el formulario.
11. No añadir persistencia ni modificar las bandejas existentes.
12. Revisar `src/js/foro.js` y `src/js/main.js` para confirmar que la subida de dibujos y sus modales siguen funcionando tras los cambios.
13. Validar el comportamiento en escritorio, móvil y mediante `file://`.
14. Actualizar la documentación y el roadmap después de completar la implementación.

## Decisiones

- **Modal de tema de solo lectura** — Aporta navegación funcional sin convertir todavía el foro en un sistema persistente.
- **Redacción simulada** — Mantiene la ficción del sitio y evita añadir backend; el correo no aparecerá en una bandeja tras recargar.
- **Reutilización de `.preview-*`** — Evita duplicar estilos y conserva el comportamiento visual de Archivos y Correo.
- **Notificaciones en memoria** — El estado se conserva solo durante la sesión de la página, igual que el estado leído del correo actual.

## Riesgos

- **Listeners duplicados al cambiar de vista** — Limpiar listeners específicos de modales o usar el patrón IIFE y `activeKeydown` ya presente.
- **Colisión de IDs entre modales** — Usar prefijos específicos, por ejemplo `topic*`, `compose*` y `notification*`.
- **El modal puede exceder la pantalla en móvil** — Probar los breakpoints existentes y ajustar únicamente reglas `.preview-*` si es necesario.
- **El botón de notificaciones puede mostrarse sin sesión** — Definir y probar explícitamente si será público o restringido; la propuesta lo mantiene visible como parte del portal.
- **La simulación podría confundirse con envío real** — Mostrar confirmación indicando claramente que es una simulación.
