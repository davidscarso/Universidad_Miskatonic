# Tareas — Feature 017 Perfil con foto de perfil

## Implementación

- [x] `perfil.js`: reemplazar el símbolo `☺` por `<img class="profile-avatar-img">` con `alt`
- [x] `styles.css`: `.profile-avatar` circular (`border-radius: 50%`, `overflow: hidden`)
- [x] `styles.css`: regla `.profile-avatar-img` (100% × 100%, `object-fit: cover`)
- [x] `styles.css`: eliminar la regla `.avatar-symbol` sin uso
- [x] `roadmap.md`: 017 agregado a "Hecho ✅" y siguiente número `018`
- [x] `AGENTS.md` / `README.md`: estado 001-017, siguiente `018`

## Validación

- [x] `node --check src/js/perfil.js`
- [x] Smoke headless: con sesión, `#perfil` → `img.complete && naturalWidth === 1024`
- [x] Smoke headless: tamaño renderizado del avatar 96×96 y `border-radius` circular
- [x] Sin referencias huérfanas a `.avatar-symbol` (grep)
- [x] Sin sesión: `#perfil` sigue mostrando Acceso Restringido (sin regresiones)

## Documentación

- [x] Crear `spec/features/017-perfil-foto/` con `spec.md`, `plan.md` y `tasks.md`
- [x] Validar contra los criterios de aceptación de `spec.md`
- [x] Mover la feature a "Hecho" en `../../constitution/roadmap.md`
