# Tareas — Feature 014 Links del footer abren el modal de disclaimer

## Implementación

- [x] `footer.js`: agregar `data-disclaimer="true"` a los tres links del footer
- [x] `footer.js`: ligar clic con `preventDefault()` + abrir `#disclaimerModal` si existe
- [x] `roadmap.md`: 014 agregado a "Hecho ✅"

## Validación

- [x] `node --check` sobre `footer.js`
- [x] Perfil con aceptación previa: clic en "Aviso Legal" → modal `.active`
- [x] El clic no modifica `location.hash` (sin salto a `#inicio`)
- [x] En `#foro`: clic en "Contacto" → modal abierto y `forum-layout` sigue visible (sin re-render de la portada)
- [x] "Política de Privacidad" abre el mismo modal
- [x] Tras abrir desde el footer, "Aceptar" cierra el modal
- [x] `acceso-restringido.html`: clic en un link del footer → sin errores ni cambios
- [x] El disparo automático de 013 sigue funcionando (primera visita a Inicio)

## Documentación

- [x] Crear `spec/features/014-footer-links-disclaimer/` con `spec.md`, `plan.md` y `tasks.md`
