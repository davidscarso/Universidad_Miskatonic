# Plan — Feature 006 Footer compartido

## Enfoque

Crear un archivo `src/js/footer.js` que defina el HTML del footer como constante y lo inserte en un elemento `<div id="footer-placeholder">` al cargar cada página. Eliminar el `<footer>` estático de todos los HTML.

## Cambios

### Nuevo archivo
- `src/js/footer.js` — Define el footer HTML y lo inserta en `#footer-placeholder`

### Archivos modificados
- `src/index.html` — Reemplazar `<footer>` por `<div id="footer-placeholder">`, agregar `<script src="js/footer.js">`
- `src/perfil.html` — Igual + actualizar header y meta a "Kaliber"
- `src/email.html` — Igual + actualizar header y meta a "Kaliber"
- `src/foro.html` — Igual (header ya dice Kaliber)
- `src/archivos.html` — Igual + actualizar header y meta a "Kaliber"

### Documentación
- `spec/constitution/roadmap.md` — Agregar 006 a "Hecho"

## Decisiones

- **JS injection vs HTML duplicado**: Se elige JS para tener un único punto de mantenimiento
- **Universidad oficial**: "Universidad Kaliber" (2026, Argentina) — decidido por el usuario
- **No se toca main.js**: El footer.js es independiente y se carga aparte

## Riesgos

- Flash de contenido sin footer al cargar (mitigado: el script se carga al final del body)
