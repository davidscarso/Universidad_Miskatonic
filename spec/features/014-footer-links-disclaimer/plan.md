# Plan — Feature 014 Links del footer abren el modal de disclaimer

## Enfoque

El footer ya se inyecta con `footer.js` y sus tres links son nodos dinámicos creados por ese mismo módulo. Se aprovecha ese hecho: **`footer.js` liga su propio clic** inmediatamente después de crear el footer (mismo patrón que `foro.js`, que liga `#uploadDrawingBtn` tras hacer su render), y abre el modal estático `#disclaimerModal` que vive en `index.html`.

## Cambios

### Archivos modificados
- `src/js/footer.js`
  - Markup de los tres links: `<a href="#" data-disclaimer="true">Aviso Legal|Política de Privacidad|Contacto</a>`
  - Tras `placeholder.appendChild(footer)`: `footer.querySelectorAll('.footer-links a')` y para cada link un listener de clic que:
    1. `e.preventDefault()` — sin esto, `href="#"` dispara `hashchange`, `getViewFromHash('#')` devuelve `'inicio'` y `navegacion.js` re-renderiza la portada (se pierde la vista actual)
    2. `document.getElementById('disclaimerModal')` y si existe `classList.add('active')`
  - Guard `if (modal)`: `acceso-restringido.html` carga `footer.js` pero no tiene el modal → el clic solo evita el salto de hash

### Documentación
- `spec/features/014-footer-links-disclaimer/{spec.md, plan.md, tasks.md}` — nuevo
- `spec/constitution/roadmap.md` — `14. **014 · Links del footer abren el disclaimer** …` en "Hecho ✅"

## Decisiones

- **Selector `.footer-links a`**: cubre los tres links actuales y cualquier link que se agregue al footer en el futuro ("todos los links del footer").
- **Lógica de apertura en `footer.js`, no en `main.js`**: el footer liga sus propios nodos dinámicos y así no hace falta delegación en `document` (listener global adicional) ni que `footer.js` solo marque atributos esperando a `main.js`. `main.js` sigue siendo el dueño del cierre y del flag `disclaimerAccepted`.
- **Abre sin importar el flag**: el clic es explícito; "Aceptar" de nuevo re-guarda un flag que ya existe y cierra (sin efectos adicionales).
- **Mismo contenido para los tres links** (lo pedido). Textos distintos por link sería otra feature.
- **El disparo automático de 013 no cambia**: sigue apareciendo la primera vez en Inicio.
- **Sin cambios de CSS**: `.footer-links a` ya está estilado (línea 726) y los atributos nuevos no afectan el aspecto.

## Riesgos

- **`href="#"` sin `preventDefault`** provocaría un salto a la portada — cubierto con el `preventDefault` y verificado con un test que comprueba que `location.hash` no cambia.
- **Listeners acumulados**: no aplica — el footer se crea por carga completa de la página (no es una vista re-renderizable de la SPA).
- **Página sin modal** (`acceso-restringido.html`): guard `if (modal)`; el clic queda sin efecto visible.
