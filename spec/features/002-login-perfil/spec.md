# 002 · Login mejorado + Perfil de usuario

**Estado:** implementado ✅

## Qué hace

Mejora el sistema de login existente para controlar el acceso a secciones restringidas (correo y escritorio). Incluye una página de perfil de usuario simple con navegación.

## Por qué

Los usuarios necesitan diferenciar entre contenido público (inicio, foro) y contenido que requiere autenticación (correo, escritorio). El perfil proporciona un punto de acceso centralizado para el usuario logueado.

## Criterios de aceptación

- [ ] Links de correo y escritorio deshabilitados por defecto
- [ ] Tooltip "Necesitas iniciar sesión" en mouseover sobre links deshabilitados
- [ ] Al loguearse, links de correo y escritorio se habilitan
- [ ] Botón de login muestra nombre de usuario al estar logueado
- [ ] Botón de usuario enlaza a página de perfil
- [ ] Icono de logout visible al lado del nombre de usuario
- [ ] Al hacer logout, links se deshabilitan y botón vuelve a "Iniciar Sesión"
- [ ] Página de perfil accesible desde botón de usuario
- [ ] Perfil muestra links a home, correo y escritorio
- [ ] Responsive funciona correctamente

## Fuera de alcance

- Perfil con campos editables
- Gestión de-avatar o imagen de perfil
- Múltiples usuarios o roles
