# 001 · Inicio — Plan

## Enfoque

Crear una página estática HTML con CSS vanilla y JavaScript mínimo. Se prioriza la estética de foros de los 2000 con tema oscuro, usando colores oscuros, tipografías monoespaciadas o serif, y elementos decorativos Lovecraftianos.

## Implementación

1. **Crear estructura de archivos**
   - `src/index.html` — página principal
   - `src/css/styles.css` — estilos globales
   - `src/js/main.js` — interacciones básicas
   - `src/assets/images/` — imágenes decorativas

2. **HTML (`index.html`)**
   - Header con logo/nombre de universidad y navegación
   - Sección hero con bienvenida y descripción
   - Sección de noticias ficticias
   - Sección de enlaces rápidos (foro, email, escritorio)
   - Botón de login en header
   - Footer con copyright

3. **CSS (`styles.css`)**
   - Variables CSS para colores (tema oscuro)
   - Estilos de header y navegación
   - Estilos de secciones principales
   - Estilos de footer
   - Media queries para responsive

4. **JavaScript (`main.js`)**
   - Navegación activa (highlight de página actual)
   - Efecto hover en elementos interactivos
   - Funcionalidad básica de login (mock)

## Decisiones

- **HTML estático** — Sin frameworks, cumple con constitution/tech-stack.md
- **CSS vanilla** — Sin preprocessores, simplicidad
- **JS mínimo** — Solo interacciones básicas, sin dependencias
- **Colores oscuros** — #1a1a2e, #16213e, #0f3460, #e94560 ( Lovecraftiano)

## Riesgos

- **Responsive** — Puede requerir ajustes en diferentes breakpoints
- **Accesibilidad** — Asegurar contraste suficiente en tema oscuro
- **Imágenes** — Necesitar assets decorativos (se pueden usar placeholders inicialmente)
