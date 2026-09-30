# 025 · Analítica de visitas

**Estado:** implementado ✅

## Qué hace

El sitio envía métricas de tráfico **agregadas** a [GoatCounter](https://www.goatcounter.com) (hosted, gratis para uso no comercial) cuando corre en producción:

- **Endpoint:** `https://unicaliber.goatcounter.com/count` (cuenta propia del proyecto).
- **Qué se mide:** cada vista de la SPA como una "página" aparte — `Inicio`, `Foro`, `Correo`, `Archivos`, `Perfil` — más visitantes únicos, referrers/procedencia, países, navegadores y sistemas desde el dashboard de GoatCounter.
- **Cómo:** `src/js/analitica.js` inyecta `count.js` (≈3 KB, `async`) solo si el protocolo es http/https **y** el hostname termina en `.github.io`; cuenta la vista inicial y vuelve a contar en cada `hashchange`. El envío usa `path = location.pathname + location.search + location.hash`.

## Por qué

No hay backend ni acceso a los logs de GitHub Pages, así que para saber si alguien visita el sitio (y desde dónde) hace falta un contador externo. El usuario pidió medir **solo tráfico agregado, sin IPs crudas**, en un sitio que se publica en GitHub Pages.

## Privacidad

- GoatCounter **no usa cookies** → no hace falta banner de consentimiento ni cambios en el disclaimer de 013.
- No se envían IPs crudas a ningún servicio propio ni se almacena nada en el repo.
- Toda la decisión de medir vive en un solo archivo con el endpoint a la vista; para dejar de medir basta con vaciar `ANALITICA_ENDPOINT`.

## Criterios de aceptación

- [x] Con `file://` no se inyecta ningún `<script data-goatcounter>` y no hay errores de consola.
- [x] Con http en localhost/`127.0.0.1` tampoco se inyecta (guard de producción) → los datos del dashboard nunca se contamina al desarrollar.
- [x] `decidir('https:', 'davidscarso.github.io')` devuelve `true`; `decidir('http:', 'localhost')` y `decidir('file:', '')` devuelven `false`.
- [x] En producción, la vista inicial se cuenta con `title: 'Inicio'`.
- [x] Cada `hashchange` a `#inicio`, `#foro`, `#correo`, `#archivos` o `#perfil` dispara un `count()` con el título correspondiente.
- [x] Hashes desconocidos (p. ej. `#toggle-goatcounter`) **no** se cuentan como página.
- [x] Si `count.js` no carga (adblocker) o lanza error, el sitio sigue funcionando igual (`try/catch` + no-op).
- [x] `navegacion.js` no se modifica: la analítica escucha su propio `hashchange`.
- [x] `src/index.html` solo cambia por el `<script src="js/analitica.js">`.
- [x] Las suites de 023 (27 aserciones) y 024 (35) siguen en verde.
- [x] `node --check src/js/*.js` pasa sin errores.
- [x] La feature queda documentada en `spec/`, `roadmap.md`, `AGENTS.md` y `README.md` (incluye que el sitio usa GoatCounter y cómo excluir las visitas propias).

## Fuera de alcance

- IPs crudas, logs de servidor o base de datos de visitas (decisión explícita del usuario).
- Heatmaps, grabaciones de sesión o Clarity.
- Google Search Console / sitemap (enlace orgánico).
- Eventos de la SPA (login, subir dibujo, abrir notificaciones).
- Medición de `acceso-restringido.html` (página huérfana sin links entrantes).
- Comprimir imágenes y `opencode.json` con API key (ya están en el backlog).
