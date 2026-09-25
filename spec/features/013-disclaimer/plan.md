# Plan — Feature 013 Modal de disclaimer (aviso legal)

## Enfoque

Modal estático en el HTML (igual que `loginModal`/`uploadModal`) + decisión de mostrarlo en la única vista que importa (Inicio) + handler de aceptación en `main.js`:

1. **`index.html`** lleva el markup del modal (`disclaimerModal`) siempre presente pero oculto (`display: none` hasta `.active`).
2. **`inicio.js`**, al final de `renderInicio()`, lo abre si `localStorage.disclaimerAccepted !== 'true'`.
3. **`main.js`**, en su `DOMContentLoaded` (el markup ya existe al cargar), liga el botón Aceptar: guarda el flag y cierra el modal.
4. **`styles.css`** define el look "papel/legal" con z-index propio (300), por encima de los modales existentes (200).

## Cambios

### Archivos modificados
- `src/index.html`
  - Nuevo bloque antes de los `<script>`: `.disclaimer-modal#disclaimerModal` (`role="dialog"`, `aria-modal`, `aria-labelledby`) > `.disclaimer-content` con `.disclaimer-title` "Aviso legal", tres `.disclaimer-text`, `.disclaimer-link` "Adquirir el libro" (`href="#"`) y `.disclaimer-accept-btn#disclaimerAcceptBtn` "Aceptar"
- `src/js/inicio.js`
  - Al final de `renderInicio()`: si existe `#disclaimerModal` y no hay flag → `classList.add('active')`
- `src/js/main.js`
  - Dentro del `DOMContentLoaded`: queries de `disclaimerModal`/`disclaimerAcceptBtn` y handler de clic → `localStorage.setItem('disclaimerAccepted', 'true')` + `classList.remove('active')`
  - **Sin** ramas nuevas en los handlers de Escape ni cierre por backdrop
- `src/css/styles.css`
  - Nueva sección `/* Disclaimer Modal */` al final de la sección de modales:
    - `.disclaimer-modal` — fixed, fullscreen, backdrop `rgba(0,0,0,0.75)`, `z-index: 300`, flex centrado, `padding: 1rem`
    - `.disclaimer-content` — fondo `#f7f5ef`, texto `#1d1d1b`, serif (`Georgia, 'Times New Roman', serif`), borde `#c9c3b4`, `max-width: 520px`, `padding: 2.25rem 2.5rem`, sombra sobria, `text-align: left`
    - `.disclaimer-title` — versalitas espaciadas, borde inferior sutil
    - `.disclaimer-text` — `line-height: 1.7`, gris oscuro
    - `.disclaimer-link` — azul tinta subrayado (hover: subrayado completo)
    - `.disclaimer-accept-btn` — fondo `#2c2c2c`, texto papel, padding `0.7rem 2rem`, hover `#000`
    - `@media (max-width: 600px)` — paddings y tipografía reducidos

### Documentación
- `spec/features/013-disclaimer/{spec.md, plan.md, tasks.md}` — nuevo
- `spec/constitution/roadmap.md` — `13. **013 · Modal de disclaimer** …` en "Hecho ✅"

## Decisiones

- **Disparo en `renderInicio()` con check inline** (no exponer una función desde `main.js`): `navegacion.js` registra su listener de `DOMContentLoaded` antes que `main.js`, así que en el render inicial una función definida dentro del callback de `main.js` podría no existir aún (riesgo ya aprendido en 012). El markup sí es estático, así que su *handler* en `main.js` no tiene ese problema.
- **Una sola vez para siempre** vía `localStorage.disclaimerAccepted` (misma estrategia que la sesión `loggedIn`).
- **Solo botón Aceptar**: sin X, sin Escape, sin clic en el fondo — la aceptación debe ser explícita, como un aviso legal. En consecuencia los handlers de Escape existentes no se tocan.
- **Se muestra al renderizar Inicio**, no en la primera carga sea cual sea la vista: es lo que pide "cuando vamos a la página inicio". Si se entra directo a `#foro`, aparecerá en la primera visita a Inicio.
- **Estilo papel deliberadamente ajeno al tema oscuro** (fondo claro, serif, sin glow, sin bordes accent): debe leerse como un documento legal ajeno a la ficción del sitio.
- **`z-index: 300`** para quedar por encima de `loginModal`/`uploadModal`/`notificationModal` (200).
- **Link de compra como placeholder `href="#"`**: no se inventa una URL. El `hashchange` a `'#'` resultante resuelve a `'inicio'`, igual que `currentView`, así que no provoca re-render ni efectos secundarios; se reemplazará por la URL real (con `target="_blank"`) cuando exista.

## Riesgos

- **Borrar los datos del sitio** vuelve a mostrarlo (comportamiento esperado de localStorage).
- **`href="#"` en el placeholder** cambia el hash de la URL; sin efecto funcional hoy (ver decisión arriba), se elimina al poner la URL real.
- **Overlay tapando la página con JS roto**: no puede pasar — el estado por defecto es `display: none` y solo JS lo abre.
