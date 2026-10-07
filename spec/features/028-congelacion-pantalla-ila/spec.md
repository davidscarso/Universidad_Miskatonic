# 028 · Congelación de pantalla tras el fallo ILA

**Estado:** implementado ✅

## Qué hace

Cuando la terminal ILA (`026`) termina su secuencia en el fallo final (*"Se requiere reinicio manual en la terminal 136"*), **7 segundos después** aparece una **modal de bloqueo a pantalla completa** (`#freezeModal`):

- Ocupa el 100% del viewport desde el primer momento (sin maximizar/minimizar).
- **No tiene** botones de `×`, maximizar ni minimizar; Escape y el clic en el fondo **no la cierran** (Escape queda inerte para toda la página mientras está activa).
- Tapa todo lo de atrás: la terminal sigue `.active` debajo, pero el `body` queda con scroll bloqueado y ninguna interacción llega a los elementos de atrás.
- Muestra contenido de **pantalla congelada**: título de bloqueo con animación de glitch, filas de símbolos corruptos (`░▓█▄▀▒╔╗║╬…`) que se regeneran solas, un volcado hex falso que cambia periódicamente y un aviso rojo parpadeante de reinicio manual — estética "pánico de kernel" con la paleta existente del sitio.

El bloqueo **solo vive hasta recargar la página** (F5): no usa `localStorage` ni `sessionStorage`.

## Por qué

El momento narrativo central de la 026 es la IA (ILA) colapsando y pidiendo un reinicio *físico* en la terminal 136. Congelar la pantalla del lector 7 segundos después cierra ese arco: la ficción rompe la cuarta pared y el sitio queda "bloqueado" como si el nodo 136 se hubiera corrompido de verdad.

## Criterios de aceptación

- [x] 7 s después de que aparezca la línea final de fallo de `SECUENCIA_REANUDACION`, `#freezeModal` tiene la clase `active` (antes de los 7 s no aparece).
- [x] El disparo es **solo** tras el fallo final (escribir "Continuar"); si la secuencia no termina, nunca aparece.
- [x] Cerrar la terminal (`×`, Escape o clic en el fondo) dentro de los 7 s **cancela** el bloqueo; navegar de vista sin cerrar la terminal **no** lo cancela (la modal es global, vive en `index.html`).
- [x] `#freezeModal .freeze-content` cubre todo el área de contenido del layout (`100vw` × `100vh`, ±1 px, sin desplazamiento de origen) y no deja huecos: los puntos de muestra (esquinas y centro) resuelven dentro del bloqueo, incluida la franja del gutter de `scrollbar-gutter` (que no muestra contenido de detrás).
- [x] El markup del bloqueo no contiene ningún botón de cierre, maximizar ni minimizar.
- [x] Escape con el bloqueo activo **no** cierra el freeze ni ningún modal de detrás (listener en fase capture con `stopImmediatePropagation`); un segundo Escape posterior a desactivarlo vuelve a comportarse normal.
- [x] El clic en cualquier zona del bloqueo no lo cierra.
- [x] El bloqueo es efectivo: `body` con `overflow: hidden` y la terminal sigue `.active` debajo, inalcanzable.
- [x] El contenido muestra símbolos/letras corruptas y un volcado hex falso; el texto **cambia** entre dos muestras separadas (la pantalla "se corrompe" en vivo) y hay animación CSS activa (glitch/parpadeo).
- [x] Recargar la página (F5) limpia el bloqueo (sin storage).
- [x] `node --check src/js/*.js` pasa sin errores.
- [x] Las suites de 023 (27), 024 (35), 025 (26), 026 (46) y 027 (50) siguen en verde.
- [x] La feature queda documentada en `spec/`, `roadmap.md`, `AGENTS.md` y `README.md`.

## Fuera de alcance

- Que el bloqueo tenga cualquier vía de cierre (oculta o no) además de F5.
- Persistir el estado de bloqueo entre sesiones (`localStorage`/`sessionStorage`).
- Sonidos, vibración o efectos sobre el navegador fuera de la página.
- Modificar la secuencia o el texto de la terminal 026.
