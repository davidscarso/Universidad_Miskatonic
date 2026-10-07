# 027 · Subida de dibujo con análisis de coincidencias - Plan

_Cómo se implementa lo descrito en `spec.md`. Debe respetar la `constitution/`._

## Enfoque

El `#uploadModal` es estático en `index.html` y hoy su bloque entero (cierre, backdrop, file-area, submit con `alert()`, rama Escape) vive en `main.js`. Se crea el módulo **`src/js/subida.js`** como dueño único del modal (convención "un dueño por modal" de la 015/018) y el modal se vuelve un wizard de 3 pasos: formulario → proceso → resultado, todo en cliente con timers limpiables (patrón de la 026). No hay backend: todo es ficción.

## Implementación

1. `src/index.html` — dentro de `#uploadModal .modal-content`:
   - `<p class="upload-error" id="uploadFileError" role="alert" hidden>` dentro del form, antes del botón de submit.
   - `#uploadProcess` (hidden): `#uploadPhaseText` (título de la fase), `#uploadProgress` (barra monospace) y `#uploadLog` (líneas ficticias).
   - `#uploadResult` (hidden): `#matchSummary` (conteo), `#matchList` (tabla de registros) y `#uploadResultClose` (botón "Cerrar").
   - `<script src="js/subida.js"></script>` después de `main.js`.
2. `src/js/subida.js` (nuevo, IIFE, `var`, sin comentarios) —
   - Bindings movidos desde `main.js`: `#closeUploadModal`, clic en el backdrop, file-area (click → input, change → nombre de archivo) y su propia rama de `Escape`.
   - `timers[]` + `programar()/limpiarTimers()`; flag `procesando` que bloquea doble submit.
   - **Submit**: `preventDefault()` → si `!files.length` → mostrar `#uploadFileError` y abortar; si hay archivo → ocultar error, ocultar form, mostrar `#uploadProcess`, arrancar la secuencia.
   - **Secuencia** (máquina de pasos como `reproducir()` de 026, con pasos `prog` que animan la barra `░▓█` 0→100% actualizando UNA línea):
     1. `Subiendo <archivo> ` 0→100%, ~2.5 s.
     2. `Analizando coincidencias ` 0→100%, ~3.5 s, con `logs` programados a mitad de ventana: `Extrayendo trazos…`, `Calculando huella perceptual…`, `Comparando con archivo histórico…`.
     3. Paso final `a:` → `mostrarResultado()`.
   - **Generación de datos** (`Math.random`):
     - `N = 1 + Math.floor(Math.random() * 10)`.
     - `TITULOS` (≥12 títulos ficticios) se baraja y recorta a N (sin repetir).
     - `nro`: `REG-` + 4 dígitos, únicos dentro de la corrida (reintentar colisiones).
     - `fecha`: timestamp entre `hoy − 10 años` y `ayer` (estrictamente anterior a hoy), formato `dd Mmm yyyy` con mes abreviado (`Ene…Dic`), estilo de los metadatos del sitio.
   - **Cierre en cualquier paso** (`×`, Escape, fondo, "Cerrar"): `limpiarTimers()` + `resetModal()` (form visible, proceso/resultado ocultos, logs/barras vacíos, `procesando = false`, form reseteado).
   - **Registros con enlace**: `mostrarResultado()` pinta el nombre como `<a href="#" class="match-nombre match-nombre-link" data-idx="…">` (fila 1 = variante imagen, resto = censura) y guarda los registros en una variable de módulo; el clic se resuelve por **delegación** en `#matchList` (se reconstruye con `innerHTML` en cada corrida, un solo listener).
   - **Modal `#matchPreviewModal`**: inyectado por `subida.js` con la base `.preview-modal`/`.preview-content` (header: `h3#matchPreviewTitle` + maximizar `□/⧉` + `×`; `modal-body#matchPreviewBody`). `abrirPreview(idx)` rellena título y cuerpo: **idx 0** → `<img class="avatar-preview-*" src="assets/images/Archivos/REG0136_OZ.png">` (contain centrado); **resto** → bloque `.restricted-*` sin `.login-btn`, con el `nro` del registro en el caso. `×`/fondo/Escape cierran solo el preview; maximizar alterna `.is-maximized`.
   - **Escape con prioridad**: si el preview está activo, Escape lo cierra él solo; si no, cierra la subida (mismo patrón que 026 sobre terminal+preview). `cerrarModal()` cierra también el preview por las dudas.
3. `src/js/main.js` — se elimina el bloque `// Forum: Upload Drawing Modal` (líneas ~214-260) y la rama `uploadModal` del handler de `Escape` (~317-319). El resto no se toca.
4. `src/css/styles.css` — bloque final:
   - `.upload-error` (espejo de `.login-error`), `.upload-phase-text`/`.upload-progress`/`.upload-log` en `'Courier New', monospace` con `--link-color`/`--text-muted` (paleta existente, sin tokens nuevos).
   - `.match-table`: filas `grid` con columnas `nro | nombre | fecha`; cabecera discreta; scroll interno (`max-height` + `overflow-y`) para N grandes.
   - `a.match-nombre-link` (dorado `--link-color`, subrayado, hover `--link-hover`, visitado; elipsis heredado de `.match-nombre`) y `.match-censor-body` (flex centrado + scroll del bloque `.restricted-*` dentro del modal).
   - Reutiliza `.preview-*`, `.avatar-preview-body/img` y `.restricted-*` existentes → sin tokens nuevos y **sin cambios en `index.html`**.
   - `@media (max-width: 600px)`: filas apiladas (3 campos en bloque).
5. `spec/` — esta carpeta; `roadmap.md` entrada 27 en "Hecho" y siguiente `028`; `AGENTS.md` (estado 001-027, árbol, Key Files + `subida.js`) y `README.md` (árbol + 001-027).
6. Validación — `node --check src/js/*.js` (11 archivos), smoke027 nuevo (Chrome headless + CDP) y regresión de 023/024/025/026.

## Decisiones

- **Wizard dentro del mismo `#uploadModal`** — decisión del usuario: un solo modal, un solo Escape/backdrop, reset simple; sin apilar modales.
- **Archivo obligatorio** — decisión del usuario: hoy no se exige; ahora sin archivo hay error inline y no arranca el proceso (necesario para que "el dibujo coincide con…" tenga sentido).
- **Registro = título de dibujo + `REG-####` + fecha** — decisión del usuario (el campo `usuario` se eliminó después de la revisión).
- **Fechas: últimos 10 años, siempre < hoy** — decisión del usuario.
- **`subida.js` como dueño nuevo** — decisión del usuario: patrón de módulos del proyecto; `main.js` queda más limpio.
- **Barra de bloques `░▓█` en texto** — misma técnica que la terminal (026): sin librerías, un solo nodo de DOM actualizado, timers limpiables.
- **Ampliar 027 en vez de crear la 028** — decisión del usuario: es un cambio sobre los resultados que ya existen; `028` sigue libre.
- **Imagen `assets/images/Archivos/REG0136_OZ.png` (sin `@`)** — decisión del usuario: es el archivo real que ya existe en la carpeta.
- **Título del preview = nombre del registro clicado** — decisión del usuario.
- **Censura = panel de Acceso Restringido sin botón** — decisión del usuario: mismo ADN visual (⚠, título, divider, caso `Registro REG-####`, nota) con el texto de la Oficina de Censura.
- **Preview con `×` + maximizar `□/⧉`** — decisión del usuario: misma base `.preview-*` que el resto de vistas del sitio.
- **Enlace dorado subrayado** — decisión del usuario: paleta existente (`--link-color`/`--link-hover`), sin tokens nuevos.
- **`alert()` eliminado** — igual que la 023 hizo con el `alert()` de login.

## Riesgos

- **Timers fantasma** (cerrar a mitad del proceso) — cubierto: todos los pasos van por `programar()`; `limpiarTimers()` en cada vía de cierre; el smoke verifica que reabrir empieza limpio.
- **Doble submit** — cubierto con el flag `procesando` + submit solo en el paso formulario.
- **La rama Escape de `main.js` dejara de cerrar el upload** — cubierto: `subida.js` registra su propio listener de `Escape`.
- **Regresión del resto de `main.js` (login/notificaciones)** — cubierto con las suites 023/025 en la regresión.
- **Dos modales activos (subida + preview)** — cubierto: Escape con prioridad en el listener único de `subida.js`; fondo y `×` del preview no burbujean al de subida (comparación de `e.target`); `body:has(...)` ya bloquea el scroll con cualquiera de los dos activo y el preview inyectado al final del DOM queda encima.
- **Clic delegado sobre `#matchList` reconstruido con `innerHTML`** — cubierto: un solo listener en la lista con `data-idx`; los registros vivos se guardan en una variable de módulo.
- **N = 1 no tiene fila de censura** — cubierto en el smoke con hasta 3 intentos de subida hasta obtener N ≥ 2.
- **Duración del smoke** — proceso ≈ 6.5 s con `poll` sobre condiciones (timeout 10 s), igual que 026; con reintentos de N, hasta ~3 corridas.
