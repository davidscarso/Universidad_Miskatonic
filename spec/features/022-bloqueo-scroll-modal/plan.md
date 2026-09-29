# 022 · Bloqueo de scroll del fondo con modal abierto — Plan

## Enfoque

Bloqueo declarativo en CSS, sin tocar JS: una regla `body:has(...)` detecta cualquier modal con `.active` y aplica `overflow: hidden` al viewport. Un solo punto de mantenimiento cubre los 10 modales actuales y cualquier futuro.

## Implementación

1. `src/css/styles.css` (bloque de modales, ~línea 1166):
   - `html { scrollbar-gutter: stable; }` — reserva el ancho del scrollbar y evita el salto horizontal al bloquear el scroll.
   - Selectores **específicos** (`.active` también lo usan nav/categorías/bandejas, nunca usarlo genérico):
     ```css
     body:has(.modal.active),
     body:has(.login-modal.active),
     body:has(.disclaimer-modal.active) { overflow: hidden; }
     ```
   - `.modal-content, .disclaimer-content { overscroll-behavior: contain; }` — refuerzo contra scroll chaining táctil.
2. Verificar que `.modal-content`, `.modal-body` y `.disclaimer-content` conservan `overflow-y: auto` (scroll interno intacto).
3. Sin cambios en JS: apertura/cierre siguen siendo `classList.add/remove('active')`.

## Decisiones

- **CSS `:has()` y no JS** — punto único, cubre modales globales e inyectados por la SPA; soportado desde Chrome 105 / Firefox 121 / Safari 15.4 (el sitio ya exige JS). Se descartó el helper en `main.js` (~20 call points en 6 archivos) por invasivo y el MutationObserver por innecesario.
- **`overflow: hidden` y no `position: fixed` en body** — `overflow:hidden` preserva la posición de scroll; `fixed` la pierde.
- **Selectores con las 3 clases de modal** — `.login-modal` y `.disclaimer-modal` no comparten la clase `.modal`.

## Riesgos

- **Navegador sin `:has()`** — degradación al comportamiento actual (sin bloqueo), nunca roto.
- **Salto de layout** — mitigado con `scrollbar-gutter: stable` en `html`.
- **Táctil** — `overflow:hidden` bloquea el body; `overscroll-behavior: contain` refuerza dentro del modal.
