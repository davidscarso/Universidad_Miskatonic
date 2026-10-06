# 027 · Subida de dibujo con análisis de coincidencias

**Estado:** implementado ✅

## Qué hace

El botón **"Subir mi dibujo"** del foro abre el `#uploadModal` existente. Al publicar, en lugar del `alert()` actual, el mismo modal recorre 3 pasos (formulario → proceso → resultado):

1. **Validación**: si no hay archivo seleccionado, error inline en rojo (`role="alert"`, patrón 023) y no arranca nada. Título y categoría siguen validando con los `required` nativos.
2. **Subida (ficticia)**: se oculta el formulario y aparece *"Subiendo \<archivo\>"* con una barra de bloques `░▓█` dorada que avanza del 0% al 100% (~1.5 s).
3. **Análisis (ficticio)**: *"Analizando coincidencias"* con una segunda barra 0→100% (~2 s) y log ficticio intercalado (`Extrayendo trazos…`, `Calculando huella perceptual…`, `Comparando con archivo histórico…`).
4. **Resultado**: *"Tu dibujo coincide con N dibujos anteriores"* (N aleatorio de **1 a 10**) y una lista/tabla con exactamente N registros, cada uno con:
   - **nombre**: título ficticio de un dibujo anterior (pool del sitio, sin repetir en la corrida),
   - **nro**: número de registro único `REG-####`,
   - **usuario**: uno de los 10 autores del foro (pool, sin repetir),
   - **fecha**: aleatoria dentro de los **últimos 10 años**, siempre estrictamente anterior a hoy.
   - Botón **"Cerrar"** que cierra el modal y resetea el formulario.

## Por qué

El flujo de subida del foro (feature 009) quedó incompleto: publicar solo mostraba un `alert()` de simulación. La novela necesita que subir un dibujo tenga "momento" — la universidad analizando el dibujo y descubriendo coincidencias con registros anteriores, en la misma línea ficcional que la terminal ILA (026).

## Criterios de aceptación

- [x] Desde el foro, "Subir mi dibujo" abre `#uploadModal` con el formulario visible (comportamiento actual intacto).
- [x] Enviar sin archivo muestra un error inline rojo `role="alert"` dentro del modal y **no** inicia el proceso (sin `alert()` en ninguna parte del flujo).
- [x] Enviar con archivo oculta el formulario y muestra la fase de **subida** con barra `0% → 100%` animada bloque a bloque.
- [x] Tras la subida corre la fase de **análisis** con su propia barra `0% → 100%` y el log ficticio.
- [x] Al terminar se muestra el resultado con un **N entre 1 y 10** y **exactamente N** registros.
- [x] Cada registro tiene las 4 claves (`nombre`, `nro`, `usuario`, `fecha`): `nro` únicos dentro de la corrida, `usuario` perteneciente al pool del foro, `fecha` en formato `dd Mmm yyyy` estrictamente anterior a hoy.
- [x] Las fechas generadas caen dentro de los últimos 10 años.
- [x] Durante el proceso, el botón "Publicar dibujo" no permite doble envío.
- [x] `×`, Escape y clic en el fondo cierran el modal en **cualquier** paso; al reabrir, el formulario está limpio y sin restos del proceso anterior (sin timers fantasma).
- [x] El botón "Cerrar" del resultado cierra y resetea el modal.
- [x] La lista de resultados entra en la modal (scroll interno si N es grande) y en móvil (≤600px) los campos se apilan sin romper el layout.
- [x] `node --check src/js/*.js` pasa sin errores.
- [x] Las suites de 023 (27), 024 (35), 025 (26) y 026 (46) siguen en verde.
- [x] La feature queda documentada en `spec/`, `roadmap.md`, `AGENTS.md` y `README.md`.

## Fuerza de alcance

- Subida/almacenamiento real de archivos o publicación real en el foro.
- Backend de cualquier tipo.
- Cambiar el resto del formulario (título, categoría, descripción) o su validación nativa.
- Modificar el botón del foro o su apertura (`foro.js`).
