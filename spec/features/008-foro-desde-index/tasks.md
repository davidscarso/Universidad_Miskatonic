# Tareas — Feature 008 Foro desde el index (SPA inicio/foro)

## Implementación

- [x] Crear `src/js/foro.js` con `FORO_MAIN_HTML` + `window.renderForo()`
- [x] Refactorizar `src/js/inicio.js`: exponer `window.renderInicio()` en lugar de auto-inyectar
- [x] Crear `src/js/navegacion.js` (lectura de hash, `hashchange`, nav activo, render, reaplicar restringidos, delegación de click)
- [x] Exportar `window.toggleRestrictedLinks` en `src/js/main.js`
- [x] Modificar `src/index.html`: nav con `#inicio`/`#foro` + `data-view`, quitar `active` estático, cargar scripts en orden
- [x] Actualizar quick-link "Foro de Investigación" en `inicio.js` → `#foro`
- [x] Actualizar nav "Foro" → `index.html#foro` en `email.html`, `archivos.html`, `perfil.html`, `acceso-restringido.html`
- [x] Eliminar `src/foro.html`

## Validación

- [x] Abrir `index.html` → portada con "Inicio" activo
- [x] Clic en "Foro" → main del foro visible, "Foro" activo, "Inicio" sin active, sin recargar
- [x] Clic en "Inicio" → portada de nuevo, "Inicio" activo
- [x] Abrir `index.html#foro` directo (refresh) → foro con "Foro" activo
- [x] Botón atrás del navegador alterna entre foro y portada correctamente
- [x] Desde `email.html` clic en "Foro" del nav → llega a `index.html#foro` con foro visible
- [x] Sin sesión: el quick-link "Correo Interno" de la portada está bloqueado; tras hacer swap inicio→foro→inicio sigue bloqueado
- [x] Iniciar sesión en index y volver a hacer swaps: los links restringidos se habilitan
- [x] Verificar que ninguna página deja un link apuntando a `foro.html`
- [x] Responsive (desktop + mobile) del foro inyectado
- [x] Abrir con doble clic (`file://`, sin servidor)

## Documentación

- [x] Actualizar `spec/constitution/roadmap.md`