# 014 · Links del footer abren el modal de disclaimer

**Estado:** implementado ✅

## Qué hace

- Los tres links del footer (**Aviso Legal**, **Política de Privacidad**, **Contacto**) abren el mismo modal de aviso legal de la feature 013.
- Funciona aunque el lector ya lo haya aceptado antes: es una acción explícita para re-leer el aviso.
- El clic no altera la navegación: no cambia el hash ni re-renderiza la vista actual.

## Por qué

El aviso legal solo se mostraba una vez, al llegar a Inicio. Después de aceptarlo queda fuera de alcance: un lector que quiera volver a consultar el aviso, la política de privacidad o un medio de contacto no tiene forma de hacerlo. Los links del footer ya existían pero no hacían nada (`href="#"`).

## Criterios de aceptación

- [x] Clic en "Aviso Legal", "Política de Privacidad" o "Contacto" → el modal `#disclaimerModal` queda `.active`.
- [x] Abre también con `disclaimerAccepted` ya guardado (y "Aceptar" vuelve a cerrarlo sin problema).
- [x] El clic no modifica `location.hash` (no salta a `#inicio` por el `href="#"`).
- [x] Abierto desde el footer en `#foro` (u otra vista), la vista actual se mantiene: no se re-renderiza la portada.
- [x] En `acceso-restringido.html` (sin modal) el clic no produce errores ni cambios visibles.
- [x] `node --check` sobre `footer.js`.

## Fuera de alcance

- Contenido distinto para cada link (los tres abren el mismo modal, tal como se pidió).
- Páginas independientes de aviso legal / privacidad / contacto.
- Cambiar el disparo automático de la feature 013 (sigue apareciendo la primera vez en Inicio).
