# 028 · Congelación de pantalla tras el fallo ILA

**Estado:** implementado ✅

## Qué hace

Cuando la terminal ILA (`026`) termina su secuencia en el fallo final (*"Se requiere reinicio manual en la terminal 136"*), **7 segundos después** aparece una **modal de bloqueo a pantalla completa** (`#freezeModal`):

- Ocupa el 100% del viewport desde el primer momento (sin maximizar/minimizar).
- **No tiene** botones de `×`, maximizar ni minimizar; Escape y el clic en el fondo **no la cierran** (Escape queda inerte para toda la página mientras está activa).
- Tapa todo lo de atrás: la terminal sigue `.active` debajo, pero el `body` queda con scroll bloqueado y ninguna interacción llega a los elementos de atrás.
- Muestra contenido de **pantalla congelada**: título de bloqueo con animación de glitch, filas de símbolos corruptos (`░▓█▄▀▒╔╗║╬…`) que se regeneran solas, un volcado hex falso que cambia periódicamente y un aviso rojo parpadeante de reinicio manual — estética "pánico de kernel" con la paleta existente del sitio.

El bloqueo **solo vive hasta recargar la página** (F5): no usa `localStorage` ni `sessionStorage`.

### Consola secreta (ampliación)

Mientras el bloqueo está activo, **Escape abre una consola oculta** (`#consoleModal`) con el mismo patrón de modal que la terminal ILA de la 026 (`×`, maximizar/restaurar `□/⧉`, 80vw×80vh ↔ 100%), pero con estética propia de **fondo negro `#000000` y texto ámbar `#ffb000`** (único color nuevo, pedido explícitamente). La consola es un callejón sin salida: **cualquier texto** que se escriba se devuelve como eco y responde `ERROR: comando no reconocido.`, sin ejecutar nada. Cerrar la consola (`×`, Escape o clic en el fondo) **no desbloquea nada**: el freeze sigue activo detrás.

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
- [x] Con el bloqueo activo, **Escape abre `#consoleModal`** (consola secreta) sin que ningún listener de detrás reciba la tecla; un segundo Escape la cierra y el freeze sigue `.active` (toggle Escape).
- [x] La consola sigue el patrón de la terminal 026: tiene `×` y maximizar/restaurar `□/⧉`, mide 80vw×80vh y al maximizar pasa a 100% del viewport; el clic en el fondo también la cierra.
- [x] La consola usa fondo negro `#000000` con texto ámbar `#ffb000` (único color nuevo, pedido por el usuario), monospace `'Courier New'`, y un `z-index` por encima del freeze.
- [x] Al abrir muestra el banner "Consola de mantenimiento — nodo 136" (más líneas de contexto/hint) y el foco queda en su input.
- [x] Escribir cualquier texto no vacío devuelve el eco (`ila@kaliber:~$ …`) y la respuesta `ERROR: comando no reconocido.`; la entrada vacía no agrega líneas y nunca se ejecuta ningún comando.
- [x] Cerrar la consola (×, Escape o fondo) no desbloquea la página: el freeze sigue `.active`, el `body` oculto y los elementos de atrás siguen inalcanzables.
- [x] `node --check src/js/*.js` pasa sin errores.
- [x] La suite `smoke028` ampliada (consola: ESC abre/cierra, maximizar, comandos → "no reconocido", cierres sin desbloquear) pasa en verde.
- [x] Las suites de 023 (27), 024 (35), 025 (26), 026 (46) y 027 (50) siguen en verde.
- [x] La feature queda documentada en `spec/`, `roadmap.md`, `AGENTS.md` y `README.md`.

## Fuera de alcance

- Que el bloqueo tenga cualquier vía de cierre (oculta o no) además de F5.
- Que la consola secreta ejecute comandos reales, tenga historial persistente o autocomplete.
- Persistir el estado de bloqueo entre sesiones (`localStorage`/`sessionStorage`).
- Sonidos, vibración o efectos sobre el navegador fuera de la página.
- Modificar la secuencia o el texto de la terminal 026.
