# 016 · Correo: bandejas funcionales + modal de lectura

**Estado:** implementado ✅

## Qué hace

- **Las cuatro bandejas son navegables**: al hacer clic en Entrada, Salida, Borradores o Eliminados se muestra la lista de esa bandeja (con su título, contador y estado activo en el sidebar). El hash queda en `#correo` (no se contamina con `#inbox`).
- **Al clickear un correo se abre una modal** con: **emisor (De), receptor (Para), asunto y texto**.
  - **Entrada**: la modal tiene `×` (cerrar), maximizar/restaurar y botón **"Leído"** — que cierra la modal y marca el correo como leído (desaparece el punto rojo y baja el contador de no leídos).
  - **Salida, Borradores, Eliminados**: la modal tiene solo `×` y maximizar/restaurar (muestra el contenido, no lo edita ni ofrece acciones).
- **Modal estilo Archivos pero arreglada**: cerrar (`×`), **maximizar ↔ restaurar** con icono que cambia correctamente (`□` ↔ `⧉`) y `title` actualizado. **Sin minimizar**. El maximize realmente ocupa la pantalla (el bug que lo bloqueaba estaba en el CSS: `max-width:500px` de `.modal-content`).
- **Nuevo correo eliminado ficticio** en la bandeja Eliminados (más 1 enviado y 1 borrador con contenido, para que todas las bandejas tengan algo que abrir).
- El **modal de Archivos se repara con la misma implementación** (comparten las clases `.preview-*`): maximize real, iconos correctos, sin minimizar, estado se limpia al cerrar.

## Por qué

El correo era estático: las cuatro bandejas eran links a `#inbox`/`#sent`/… que solo ensuciaban el hash sin cambiar nada, el detalle del correo era un `<div>` oculto con un solo mensaje hardcodeado, y no había forma de leer los otros correos ni de marcarlos como leídos. El modal de archivos no maximizaba (tope de `max-width`), su icono nunca cambiaba a "restaurar" y el `×` estaba posicionado absoluto fuera del grupo de controles.

## Criterios de aceptación

- [x] Clic en Entrada / Salida / Borradores / Eliminados → cambia la lista, el título, el contador y la marca `.active`; `location.hash` sigue en `#correo`.
- [x] Cada bandeja muestra sus correos (Entrada 3, Salida 1, Borradores 1, Eliminados 1 — este último nuevo y ficticio).
- [x] Clic en un correo de Entrada → modal con De, Para, Asunto y Texto; `×` la cierra.
- [x] Botón "Leído" solo en Entrada: cierra la modal, quita `.unread` de la fila y decrementa el contador de no leídos.
- [x] En Salida / Borradores / Eliminados la modal NO tiene botón "Leído" (solo `×` y maximizar/restaurar) y no edita nada.
- [x] Maximize: el contenido llega al ancho/alto de la ventana (mayor a 500px en escritorio); el icono cambia `□` → `⧉` y el `title` a "Restaurar"; volver a clickear restaura al tamaño original.
- [x] `Escape` y clic en el fondo cierran la modal; al reabrir siempre arranca en tamaño normal.
- [x] Modal de Archivos con el mismo comportamiento (maximize/restore reales, `×` en el grupo de controles, botón de minimizar eliminado).
- [x] `node --check` sobre `correo.js` y `archivos.js`.
- [x] Sin errores JS en el smoke test headless (vistas `#correo` y `#archivos`).

## Fuera de alcance

- Persistir el estado "leído" en `localStorage` (se pierde al recargar; ficción, basta en memoria).
- Redactar/editar/enviar correos ni borradores (la modal solo muestra).
- Bandeja de spam, búsqueda y paginación.
- El `alert()` de credenciales incorrectas (`main.js`, ver backlog).
- Categorías del foro que ensuciaban el hash (`#suenos`, `#dibujos`) — resuelto en la feature 020.
