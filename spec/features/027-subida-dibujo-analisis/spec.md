# 027 · Subida de dibujo con análisis de coincidencias

**Estado:** implementado ✅

## Qué hace

El botón **"Subir mi dibujo"** del foro abre el `#uploadModal` existente. Al publicar, en lugar del `alert()` actual, el mismo modal recorre 3 pasos (formulario → proceso → resultado):

1. **Validación**: si no hay archivo seleccionado, error inline en rojo (`role="alert"`, patrón 023) y no arranca nada. Título y categoría siguen validando con los `required` nativos.
2. **Subida (ficticia)**: se oculta el formulario y aparece *"Subiendo \<archivo\>"* con una barra de bloques `░▓█` dorada que avanza del 0% al 100% (~2.5 s).
3. **Análisis (ficticio)**: *"Analizando coincidencias"* con una segunda barra 0→100% (~3.5 s) y log ficticio intercalado (`Extrayendo trazos…`, `Calculando huella perceptual…`, `Comparando con archivo histórico…`).
4. **Resultado**: *"Tu dibujo coincide con N dibujos anteriores"* (N aleatorio de **1 a 10**) y una lista/tabla con exactamente N registros, cada uno con:
   - **nombre**: título ficticio de un dibujo anterior (pool del sitio, sin repetir en la corrida),
   - **nro**: número de registro único `REG-####`,
   - **fecha**: aleatoria dentro de los **últimos 10 años**, siempre estrictamente anterior a hoy.
   - Botón **"Cerrar"** que cierra el modal y resetea el formulario.
5. **Vista de registro**: el **nombre** de cada registro es un enlace (dorado subrayado, colores del sitio) que abre `#matchPreviewModal` con la base `.preview-*` (`×` + maximizar `□/⧉`, título = el nombre del registro):
   - El **primer registro** de la lista muestra la imagen real `assets/images/Archivos/REG0136_OZ.png` (ajustada al contenedor).
   - Los **restantes** muestran un mensaje de censura con el mismo ADN que el panel de Acceso Restringido (⚠, título "Contenido Censurado", divider, mensaje de la Oficina de Censura, caso `Registro REG-####` con el `nro` propio del registro y nota de Asuntos Académicos), **sin** botón de "Iniciar Sesión".
   - Escape cierra **primero** el preview y deja la subida abierta; un segundo Escape cierra la subida. El clic en el fondo cierra solo el preview.

## Por qué

El flujo de subida del foro (feature 009) quedó incompleto: publicar solo mostraba un `alert()` de simulación. La novela necesita que subir un dibujo tenga "momento" — la universidad analizando el dibujo y descubriendo coincidencias con registros anteriores, en la misma línea ficcional que la terminal ILA (026).

## Criterios de aceptación

- [x] Desde el foro, "Subir mi dibujo" abre `#uploadModal` con el formulario visible (comportamiento actual intacto).
- [x] Enviar sin archivo muestra un error inline rojo `role="alert"` dentro del modal y **no** inicia el proceso (sin `alert()` en ninguna parte del flujo).
- [x] Enviar con archivo oculta el formulario y muestra la fase de **subida** con barra `0% → 100%` animada bloque a bloque.
- [x] Tras la subida corre la fase de **análisis** con su propia barra `0% → 100%` y el log ficticio.
- [x] Al terminar se muestra el resultado con un **N entre 1 y 10** y **exactamente N** registros.
- [x] Cada registro tiene las 3 claves (`nombre`, `nro`, `fecha`): `nro` únicos dentro de la corrida, `fecha` en formato `dd Mmm yyyy` estrictamente anterior a hoy.
- [x] Las fechas generadas caen dentro de los últimos 10 años.
- [x] Durante el proceso, el botón "Publicar dibujo" no permite doble envío.
- [x] `×`, Escape y clic en el fondo cierran el modal en **cualquier** paso; al reabrir, el formulario está limpio y sin restos del proceso anterior (sin timers fantasma).
- [x] El botón "Cerrar" del resultado cierra y resetea el modal.
- [x] La lista de resultados entra en la modal (scroll interno si N es grande) y en móvil (≤600px) los campos se apilan sin romper el layout.
- [x] El nombre de cada registro de resultado es un enlace clicable y enfocable con la paleta del sitio (dorado `--link-color`, hover `--link-hover`, subrayado) y conserva el recorte con elipsis.
- [x] Clic en la **primera** fila abre `#matchPreviewModal` mostrando `assets/images/Archivos/REG0136_OZ.png` con la imagen cargada (`naturalWidth > 0`) y el nombre del registro como título.
- [x] Clic en las **restantes** filas abre el mismo modal con el mensaje de censura (⚠, título, divider, mensaje, caso `Registro REG-####` con el `nro` de esa fila y nota) y **sin** botón "Iniciar Sesión".
- [x] El modal de preview tiene `×` y maximizar/restaurar `□/⧉` (base `.preview-*` existente).
- [x] Escape cierra primero el preview y la subida sigue activa; un segundo Escape cierra la subida. El fondo cierra solo el preview. Cerrar la subida por cualquier vía cierra también el preview; reabrir queda limpio.
- [x] En móvil (≤600px) la imagen y el bloque de censura no rompen el layout de la modal.
- [x] La suite `smoke027` ampliada (enlace → imagen, enlace → censura con N ≥ 2, Escape en cascada, fondo solo cierra el preview) pasa en verde.
- [x] `node --check src/js/*.js` pasa sin errores.
- [x] Las suites de 023 (27), 024 (35), 025 (26) y 026 (46) siguen en verde.
- [x] La feature queda documentada en `spec/`, `roadmap.md`, `AGENTS.md` y `README.md`.

## Fuerza de alcance

- Subida/almacenamiento real de archivos o publicación real en el foro.
- Backend de cualquier tipo.
- Cambiar el resto del formulario (título, categoría, descripción) o su validación nativa.
- Modificar el botón del foro o su apertura (`foro.js`).
