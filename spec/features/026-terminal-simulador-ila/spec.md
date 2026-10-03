# 026 · Terminal simulador de servidores (ILA)

**Estado:** implementado ✅

## Qué hace

Un archivo nuevo en **Archivos → Investigación**, `Reporte ILA.txt`, contiene un enlace que abre una **modal de terminal al 80% de la pantalla** (80vw × 80vh): un simulador de terminal de servidores con la estética del sitio (tema oscuro, dorado y rojo, `'Courier New', monospace`), al estilo de las terminales de OpenCode/Claude.

La secuencia que reproduce es siempre la misma (ficticia):

1. Banner ASCII de bloques **ILA** en dorado + subtítulo **"Kaliber AI repartamente"**.
2. Arranque ficticio (`KaliberOS 2.6 — nodo de cálculo 136`, conexión al servidor remoto) y **carga del modelo ILA-7 animada**: `Cargando modelo ILA-7 [░▓█] 0% → 80%`, la barra se rellena bloque por bloque con el contador subiendo.
3. **Mensaje de error de inicio de modelo** en rojo (`ERROR E-MOD-13: fallo al iniciar el modelo`).
4. Línea **`Estado de análisis: [░▓█]`** con barra animada bloque a bloque del 0% al **98%**.
5. Prompt: `¿Desea continuar? Escriba "Continuar" y pulse Enter` con input real (`ila@kaliber:~$`).
6. Si la respuesta **no** es `continuar`: eco del texto + en rojo *"el comando no es correcto. Vuelva a intentarlo"* y vuelve a pedirlo.
7. Si la respuesta **es** `Continuar`: 3-4 mensajes ficticios de reanudación (con la verificación de memoria animada `0% → 100% OK`) que terminan en **fallo**: línea en rojo con **parpadeo** *"Se requiere reinicio manual en la terminal 136 para continuar"*, input deshabilitado y la modal queda muerta hasta que el usuario la cierre.

## Por qué

El contenido de la novela necesita un "momento" interactivo: la IA de la universidad (ILA) fallando a mitad de un análisis y pidiendo un reinicio manual en una terminal física. La carpeta Investigación es el lugar narrativo natural, y una terminal simulada encaja con la estética foro/terminal de los 2000 del sitio.

## Criterios de aceptación

- [x] `Investigación` muestra un archivo nuevo `Reporte ILA.txt` (3 archivos en total, contador actualizado).
- [x] El clic abre la preview de texto normal (mismo comportamiento que los demás `.txt`).
- [x] Dentro de la preview hay un enlace que, al hacer clic, **no altera el hash** de la SPA y abre la modal de terminal.
- [x] La modal mide 80% del ancho y 80% del alto de la ventana (`getBoundingClientRect` ≈ 80vw/80vh).
- [x] La modal usa la monospace del sitio y los colores existentes: dorado `--link-color` para banner/prompt, rojo `--accent-glow` para errores, sin tokens de color nuevos.
- [x] Aparece el banner ASCII `ILA` con el subtítulo `Kaliber AI repartamente`.
- [x] Aparece el mensaje de error de inicio de modelo.
- [x] Las tres cargas (modelo 0→80%, análisis 0→98%, memoria 0→100% `OK`) se rellenan **secuencialmente** bloque por bloque con el contador de % subiendo en cada paso; el smoke verifica que el % avanza entre dos muestras y que el texto final de cada barra es exacto.
- [x] El input está deshabilitado hasta el prompt de confirmación, y se enfoca solo cuando se habilita.
- [x] Escribir cualquier cosa distinta de `continuar` muestra el mensaje de comando incorrecto y permite reintentar.
- [x] Escribir `Continuar` (con mayúsculas, minúsculas o rodeado de espacios) ejecuta la secuencia de reanudación.
- [x] La secuencia termina con el error de reinicio manual de la terminal 136 con **parpadeo** (animación CSS activa).
- [x] Tras el fallo el input queda deshabilitado; la modal solo se puede cerrar (`×`, Escape o clic en el fondo) y queda muerta.
- [x] Cerrar y reabrir reinicia la secuencia completa desde el banner (sin líneas fantasma por timers pendientes).
- [x] Maximizar/restaurar de la terminal funciona (80% ↔ 100%).
- [x] Escape cierra **primero** la terminal; si no está abierta, cierra la preview del archivo como hasta ahora.
- [x] `node --check src/js/*.js` pasa sin errores.
- [x] Las suites de 023 (27), 024 (35) y 025 (26) siguen en verde.
- [x] La feature queda documentada en `spec/`, `roadmap.md`, `AGENTS.md` y `README.md`.

## Fuera de alcance

- Efecto máquina de escribir carácter a carácter, sonidos o música.
- Comandos reales (que la terminal responda a algo distinto de `continuar`).
- Que la "terminal 136" sea una vista navegable o exista como archivo.
- Cambiar el contenido de los archivos de Investigación existentes.
