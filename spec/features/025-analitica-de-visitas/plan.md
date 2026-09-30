# 025 · Analítica de visitas - Plan

_Cómo se implementa lo descrito en `spec.md`. Debe respetar la `constitution/`._

## Enfoque

Un módulo desacoplado (`analitica.js`, IIFE, patrón del resto del código) que decide por su cuenta si debe medir, inyecta el `count.js` de GoatCounter y dispara `count()` en la carga inicial y en cada `hashchange`. **No se toca `navegacion.js`** ni ningún otro JS: el router no se entera de que existe la analítica y viceversa.

## Implementación

1. `src/js/analitica.js` — IIFE con:
   - `ANALITICA_ENDPOINT = 'https://unicaliber.goatcounter.com/count'` (constante a la vista; vacía ⇒ sin medición).
   - `decidir(protocolo, host)`: `true` solo si el protocolo es `https:`/`http:` y el host termina en `.github.io` (GitHub Pages). `file://`, localhost y cualquier otro host → `false`.
   - `RUTAS`: mapa hash → título (`''`, `#`, `#inicio` → `Inicio`; `#foro` → `Foro`; `#correo` → `Correo`; `#archivos` → `Archivos`; `#perfil` → `Perfil`). Hash no conocido ⇒ no se cuenta.
   - `contarVista()`: si `window.goatcounter.count` no existe o el hash es desconocido, no hace nada; si existe, llama `count({ path: location.pathname + location.search + location.hash, title: RUTAS[location.hash] })` dentro de `try/catch`.
   - `cargar()`: `window.goatcounter = { no_onload: true }` (patrón SPA de la doc de GoatCounter, debe ir **antes** de inyectar el script) + `<script async src="https://gc.zgo.at/count.js" data-goatcounter="…">`; con `setInterval` espera a que `count` exista y cuenta la vista inicial. Todo en `try/catch`.
   - Init: registra `window.addEventListener('hashchange', contarVista)` siempre (en localhost es no-op porque `goatcounter` no existe) y llama `cargar()` solo si `decidir(location.protocol, location.hostname)`.
   - Expone `window.analitica = { decidir, contarVista, RUTAS }` como superficie mínima para el smoke test.
2. `src/index.html` — `<script src="js/analitica.js"></script>` inmediatamente **antes** de `navegacion.js`.
3. `spec/` — crear esta carpeta y llevar `roadmap.md` (entrada 25 en "Hecho", siguiente `026`), `AGENTS.md` (líneas 5, 34, 49) y `README.md` (líneas 32, 43) a `001-025`.

## Decisiones

- **GoatCounter en lugar de GA4/Clarity/Umami** — decisión del usuario para medir "solo tráfico agregado": gratis (uso no comercial, 100k pág./mes), sin cookies ⇒ sin banner de consentimiento, ~3 KB, sin dependencias de build y con API documentada para SPAs por hash.
- **Solo en producción (hostname `.github.io`)** — decisión del usuario: el dashboard jamás recibe datos de `file://` ni del servidor local. Si en el futuro se publica en un dominio propio, basta agregarlo a la lista de hosts de `decidir()`.
- **Sin medir `acceso-restringido.html`** — decisión del usuario: ningún link apunta a esa página (el panel pasó a la SPA en la 012).
- **Listener propio de `hashchange` en vez de tocar `navegacion.js`** — módulo acoplable sin riesgo de regresión en el router; el listener es idempotente y no-op cuando no hay endpoint.
- **`no_onload: true` + `count()` manual** — evita que `count.js` envíe `/` en cada carga y nos deje en una sola métrica; cada vista de la SPA debe ser una página distinta para que el dashboard sirva.
- **Hashes desconocidos no cuentan** — `navegacion.js` ya los ignora; además evita registrar ruidos como `#toggle-goatcounter` (el flag con el que un dueño bloquea su propio navegador).
- **`window.goatcounter = { no_onload: true }` antes de inyectar, sin `data-goatcounter-settings`** — la doc indica que ese atributo *pisa* el objeto global; setearlo en JS preserva el patrón de su ejemplo de SPA.

## Riesgos

- **Adblocker bloquea `gc.zgo.at` / `goatcounter.com`** — `contarVista()` ve que `count` no existe y no hace nada; verificado con spy y sin errores de consola.
- **`count.js` tarda en cargar** — el `setInterval` del patrón oficial espera hasta 1 s; si no aparece, la vista inicial simplemente no se cuenta (no rompe nada).
- **Script externo de terceros** — se deja constancia en spec/plan/README; el endpoint y el host están a la vista y el kill-switch es vaciar la constante.
- **Visitas propias ensuciando el dashboard** — GoatCounter ignora localhost/privadas por defecto; en producción se excluye abriendo la URL con `#toggle-goatcounter` o con *Settings → Ignore IPs* (documentado en el README/plan).
