# Tareas — Feature 018 Perfil: ampliar foto en modal

## Implementación

- [x] `perfil.js`: envolver el módulo en IIFE (patrón `archivos.js` / `correo.js`)
- [x] `perfil.js`: markup de `#avatarPreviewModal` con ids prefijados `avatar*` y base `.preview-*`
- [x] `perfil.js`: `title="Ampliar foto"` en `.profile-avatar`
- [x] `perfil.js`: `bindPerfil(main)` con clic en avatar, `×`, fondo, maximizar/restaurar y `Escape` (`activeKeydown`)
- [x] `perfil.js`: helpers `resetPreviewState()` / `closeAvatarModal()` (limpian `active` + `is-maximized`)
- [x] `styles.css`: `.profile-avatar` clicable (`cursor: pointer` + hover)
- [x] `styles.css`: `.avatar-preview-body` (flex center, sin scroll) y `.avatar-preview-img` (contain, máx. 100%)
- [x] `styles.css`: sin tocar `.modal-content` / `.preview-content` compartidos

## Validación

- [x] `node --check src/js/*.js`
- [x] Smoke headless: con sesión, `#perfil` → clic en avatar → modal `active` con la imagen cargada (`naturalWidth === 1024`)
- [x] Smoke: maximizar supera los 500px de `.preview-content` y restaurar vuelve al tamaño base
- [x] Smoke: cierra con `×`, con clic en el fondo y con `Escape`
- [x] Smoke de regresión: Archivos (abrir + maximizar archivo) y Correo (abrir email) siguen funcionando
- [x] Sin sesión: `#perfil` sigue mostrando Acceso Restringido (sin regresiones)
- [x] Sin IDs duplicados en el DOM respecto a `#filePreviewModal` / `#emailPreviewModal`

## Documentación

- [x] Crear `spec/features/018-perfil-foto-modal/` con `spec.md`, `plan.md` y `tasks.md`
- [x] `roadmap.md`: 018 agregado a "Hecho ✅" y siguiente número `019`
- [x] `AGENTS.md` / `README.md`: estado 001-018, siguiente `019`
- [x] Validar contra los criterios de aceptación de `spec.md`
- [x] Mover la feature a "Hecho" en `../../constitution/roadmap.md`
