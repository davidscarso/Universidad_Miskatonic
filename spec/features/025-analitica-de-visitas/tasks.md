# 025 · Analítica de visitas - Tareas

## Implementación

- [x] `src/js/analitica.js` — IIFE con `ANALITICA_ENDPOINT`, `decidir()`, `RUTAS`, `contarVista()`, `cargar()` e init (`hashchange` + guard de producción).
- [x] `src/index.html` — `<script src="js/analitica.js"></script>` antes de `navegacion.js`.

## Validación

- [x] `node --check src/js/*.js`
- [x] Smoke test automatizado (Chrome headless + CDP): sin inyección con `file://` ni con http localhost, `decidir()` con los 3 casos, `count()` con spy en la carga inicial (`title: 'Inicio'`) y tras cada `hashchange`, hashes desconocidos ignorados, sin errores de consola.
- [x] Regresión: suites de 023 (27 aserciones) y 024 (35) en verde.
- [x] Validar contra los criterios de aceptación de `spec.md`.

## Documentación

- [x] Crear `spec/features/025-analitica-de-visitas/` con `spec.md`, `plan.md` y `tasks.md`.
- [x] Mover la feature a "Hecho" en `../../constitution/roadmap.md` (siguiente libre: `026`).
- [x] Actualizar `AGENTS.md` y `README.md` con el nuevo estado y siguiente número (`026`), dejando constancia de que el sitio usa GoatCounter.
- [x] Documentar cómo excluir las visitas propias (`#toggle-goatcounter` / *Settings → Ignore IPs*).
