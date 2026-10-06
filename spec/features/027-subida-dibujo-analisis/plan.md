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
     1. `Subiendo <archivo> ` 0→100%, ~1.5 s.
     2. `Analizando coincidencias ` 0→100%, ~2 s, con `logs` programados a mitad de ventana: `Extrayendo trazos…`, `Calculando huella perceptual…`, `Comparando con archivo histórico…`.
     3. Paso final `a:` → `mostrarResultado()`.
   - **Generación de datos** (`Math.random`):
     - `N = 1 + Math.floor(Math.random() * 10)`.
     - `TITULOS` (≥12 títulos ficticios) y `USUARIOS` (los 10 autores de `foro.js`) se barajan y recortan a N (sin repetir).
     - `nro`: `REG-` + 4 dígitos, únicos dentro de la corrida (reintentar colisiones).
     - `fecha`: timestamp entre `hoy − 10 años` y `ayer` (estrictamente anterior a hoy), formato `dd Mmm yyyy` con mes abreviado (`Ene…Dic`), estilo de los metadatos del sitio.
   - **Cierre en cualquier paso** (`×`, Escape, fondo, "Cerrar"): `limpiarTimers()` + `resetModal()` (form visible, proceso/resultado ocultos, logs/barras vacíos, `procesando = false`, form reseteado).
3. `src/js/main.js` — se elimina el bloque `// Forum: Upload Drawing Modal` (líneas ~214-260) y la rama `uploadModal` del handler de `Escape` (~317-319). El resto no se toca.
4. `src/css/styles.css` — bloque final:
   - `.upload-error` (espejo de `.login-error`), `.upload-phase-text`/`.upload-progress`/`.upload-log` en `'Courier New', monospace` con `--link-color`/`--text-muted` (paleta existente, sin tokens nuevos).
   - `.match-table`: filas `grid` con columnas `nro | nombre | usuario | fecha`; cabecera discreta; scroll interno (`max-height` + `overflow-y`) para N grandes.
   - `@media (max-width: 600px)`: filas apiladas (4 campos en bloque).
5. `spec/` — esta carpeta; `roadmap.md` entrada 27 en "Hecho" y siguiente `028`; `AGENTS.md` (estado 001-027, árbol, Key Files + `subida.js`) y `README.md` (árbol + 001-027).
6. Validación — `node --check src/js/*.js` (11 archivos), smoke027 nuevo (Chrome headless + CDP) y regresión de 023/024/025/026.

## Decisiones

- **Wizard dentro del mismo `#uploadModal`** — decisión del usuario: un solo modal, un solo Escape/backdrop, reset simple; sin apilar modales.
- **Archivo obligatorio** — decisión del usuario: hoy no se exige; ahora sin archivo hay error inline y no arranca el proceso (necesario para que "el dibujo coincide con…" tenga sentido).
- **Registro = título de dibujo + `REG-####` + usuario + fecha** — decisión del usuario.
- **Fechas: últimos 10 años, siempre < hoy** — decisión del usuario.
- **`subida.js` como dueño nuevo** — decisión del usuario: patrón de módulos del proyecto; `main.js` queda más limpio.
- **Barra de bloques `░▓█` en texto** — misma técnica que la terminal (026): sin librerías, un solo nodo de DOM actualizado, timers limpiables.
- **Pool de usuarios = los autores de `foro.js`** — coherencia narrativa con el sitio (Armitage, Decano West, etc.).
- **`alert()` eliminado** — igual que la 023 hizo con el `alert()` de login.

## Riesgos

- **Timers fantasma** (cerrar a mitad del proceso) — cubierto: todos los pasos van por `programar()`; `limpiarTimers()` en cada vía de cierre; el smoke verifica que reabrir empieza limpio.
- **Doble submit** — cubierto con el flag `procesando` + submit solo en el paso formulario.
- **La rama Escape de `main.js` dejara de cerrar el upload** — cubierto: `subida.js` registra su propio listener de `Escape`.
- **Regresión del resto de `main.js` (login/notificaciones)** — cubierto con las suites 023/025 en la regresión.
- **Duración del smoke** — proceso ≈ 3.5-4 s con `poll` sobre condiciones (timeout 10 s), igual que 026.
