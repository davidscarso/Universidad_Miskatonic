# Tareas — Feature 013 Modal de disclaimer (aviso legal)

## Implementación

- [x] `index.html`: markup del `#disclaimerModal` (título, 3 párrafos, link "Adquirir el libro", botón "Aceptar")
- [x] `inicio.js`: al final de `renderInicio()`, abrir el modal si no hay `disclaimerAccepted`
- [x] `main.js`: handler del botón Aceptar → guarda el flag y cierra el modal
- [x] `styles.css`: sección `/* Disclaimer Modal */` con estilo papel/legal + `z-index: 300` + responsive
- [x] `roadmap.md`: 013 agregado a "Hecho ✅"

## Validación

- [x] `node --check` sobre `inicio.js` y `main.js`
- [x] Perfil limpio: `index.html` → modal con `.active`, botón "Aceptar" y link "Adquirir el libro"
- [x] Perfil limpio: `index.html#foro` directo → sin modal
- [x] Clic en "Aceptar" → flag `disclaimerAccepted=true` y modal cerrado
- [x] Misma sesión de navegador, recarga en Inicio → sin modal (persiste la aceptación)
- [x] Sin sesión de click: Escape y clic en el fondo no cierran el modal (no hay handler)
- [x] Modal por encima de otros modales (z-index 300)
- [x] Responsive 390px sin desbordes
- [x] Sin JS el modal no tapa la página (`display: none` por defecto)

## Documentación

- [x] Crear `spec/features/013-disclaimer/` con `spec.md`, `plan.md` y `tasks.md`
