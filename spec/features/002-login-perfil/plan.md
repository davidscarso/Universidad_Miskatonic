# 002 · Login mejorado + Perfil — Plan

## Enfoque

Modificar el HTML existente para agregar clases de estado a los links restringidos, actualizar JavaScript para controlar el estado de login/logout, y crear una nueva página de perfil con el mismo estilo visual.

## Implementación

1. **Modificar `src/index.html`**
   - Agregar clase `restricted` a links de correo y escritorio (nav y quick-links)
   - Agregar atributo `title="Necesitas iniciar sesión"` a esos links
   - Agregar botón de logout (icono ×) oculto por defecto
   - Envolver botón de login en container para login/perfil

2. **Modificar `src/css/styles.css`**
   - Estilos para `.nav-link.restricted` y `.quick-link-card.restricted`
   - Estilos para `.logout-btn`
   - Estilos para tooltip nativo
   - Estilos para página de perfil

3. **Modificar `src/js/main.js`**
   - Función `toggleRestrictedLinks(enable)` para habilitar/deshabilitar
   - Función `logout()` que limpie localStorage y actualice UI
   - Modificar `updateUIForLoggedInUser()` para mostrar nombre + botón logout
   - Agregar event listener para botón logout
   - Agregar tooltips dinámicos

4. **Crear `src/perfil.html`**
   - Página simple con header, contenido de perfil y footer
   - Links a home, correo y escritorio
   - Mismo tema oscuro

## Decisiones

- **Clase `restricted`** — Se aplica a links que requieren login, se remueve al autenticar
- **Tooltip nativo** — Usar atributo `title` para simplicidad, sin dependencias
- **Perfil simple** — Solo muestra info básica y links, sin funcionalidad adicional

## Riesgos

- **Consistencia** — Asegurar que todos los links restringidos tengan la misma clase
- **Estado de sesión** — Usar localStorage para persistir estado entre recargas
