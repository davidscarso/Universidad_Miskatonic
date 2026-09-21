# Tareas — Feature 008 Foro desde el index (SPA inicio/foro)

## Implementación

- [ ] Crear `src/js/foro.js` con `FORO_MAIN_HTML` + `window.renderForo()`
- [ ] Refactorizar `src/js/inicio.js`: exponer `window.renderInicio()` en lugar de auto-inyectar
- [ ] Crear `src/js/navegacion.js` (lectura de hash, `hashchange`, nav activo, render, reaplicar restringidos, delegación de click)
- [ ] Exportar `window.toggleRestrictedLinks` en `src/js/main.js`
- [ ] Modificar `src/index.html`: nav con `#inicio`/`#foro` + `data-view`, quitar `active` estático, cargar scripts en orden
- [ ] Actualizar quick-link "Foro de Investigación" en `inicio.js` → `#foro`
- [ ] Actualizar nav "Foro" → `index.html#foro` en `email.html`, `archivos.html`, `perfil.html`, `acceso-restringido.html`
- [ ] Eliminar `src/foro.html`

## Validación

- [ ] Abrir `index.html` → portada con "Inicio" activo
- [ ] Clic en "Foro" → main del foro visible, "Foro" activo, "Inicio" sin active, sin recargar
- [ ] Clic en "Inicio" → portada de nuevo, "Inicio" activo
- [ ] Abrir `index.html#foro` directo (refresh) → foro con "Foro" activo
- [ ] Botón atrás del navegador alterna entre foro y portada correctamente
- [ ] Desde `email.html` clic en "Foro" del nav → llega a `index.html#foro` con foro visible
- [ ] Sin sesión: el quick-link "Correo Interno" de la portada está bloqueado; tras hacer swap inicio→foro→inicio sigue bloqueado
- [ ] Iniciar sesión en index y volver a hacer swaps: los links restringidos se habilitan
- [ ] Verificar que ninguna página deja un link apuntando a `foro.html`
- [ ] Responsive (desktop + mobile) del foro inyectado
- [ ] Abrir con doble clic (`file://`, sin servidor)

## Documentación

- [ ] Actualizar `spec/constitution/roadmap.md`