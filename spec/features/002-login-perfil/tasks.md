# 002 · Login mejorado + Perfil — Tareas

## HTML

- [x] Agregar clase `restricted` a links de correo y escritorio en nav
- [x] Agregar atributo `title="Necesitas iniciar sesión"` a esos links
- [x] Agregar clase `restricted` a quick-links de correo y escritorio
- [x] Agregar botón de logout (icono ×) oculto
- [x] Modificar botón de login para ser link a perfil.html

## CSS

- [x] Estilos para `.nav-link.restricted` (opaco, cursor no permitido)
- [x] Estilos para `.quick-link-card.restricted` (opaco, sin hover)
- [x] Estilos para `.logout-btn`
- [x] Estilos para página de perfil

## JavaScript

- [x] Función `toggleRestrictedLinks(enable)`
- [x] Función `logout()`
- [x] Modificar `updateUIForLoggedInUser()` para mostrar nombre + logout
- [x] Agregar event listener para botón logout
- [x] Actualizar estado de links al cargar página

## Perfil

- [x] Crear `src/perfil.html` con estructura base
- [x] Agregar header con navegación
- [x] Agregar contenido de perfil (nombre, links)
- [x] Agregar footer

## Validación

- [x] Verificar links deshabilitados al cargar página
- [x] Verificar tooltip en mouseover
- [x] Verificar habilitación al loguearse
- [x] Verificar logout funcional
- [x] Verificar página de perfil accesible
- [x] Mover feature a "Hecho" en `../../constitution/roadmap.md`
