# Tareas — Feature 011 Archivos desde el index (SPA)

## Implementación

- [x] Crear `src/js/archivos.js` con el main del gestor + `window.renderArchivos()` + lógica de carpetas/preview
- [x] Mover datos `fileContents`/`folderContents`, `updateFilesGrid`, `openFilePreview` y handlers desde `main.js` a `archivos.js`
- [x] Eliminar del handler de Escape en `main.js` la rama `filePreviewModal`
- [x] Actualizar `navegacion.js`: vista `archivos` en dispatch, hash `#archivos`, nav `active` de cuatro vistas
- [x] Modificar `index.html`: nav "Archivos" → `#archivos` con `data-view`; cargar `archivos.js`
- [x] Actualizar quick-link "Archivos" en `inicio.js` → `#archivos`
- [x] Actualizar nav y quick-link "Archivos" en `perfil.html` → `index.html#archivos`
- [x] Eliminar `src/archivos.html`

## Validación

- [x] Abrir `index.html` → portada con "Inicio" activo
- [x] Con sesión: clic en "Archivos" → gestor con carpeta "Documentos" activa, "Archivos" activo; vuelta a Inicio/Foro/Correo OK
- [x] Abrir `index.html#archivos` directo → gestor con "Archivos" activo
- [x] Sin sesión: el link "Archivos" del nav no navega (bloqueado); tampoco el quick-link restringido
- [x] Cambiar de carpeta (Imágenes/Videos/Investigación) → actualiza grilla, título y contador
- [x] Clic en archivo → abre vista previa con título y contenido correctos
- [x] Cerrar preview por X, clic en el fondo y Escape → se cierra y resetea el tamaño
- [x] Minimizar y maximizar la preview funcionan
- [x] Hacer swaps Archivos ↔ otras vistas varias veces → no se acumulan listeners; carpetas y preview siguen funcionando
- [x] Verificar que ninguna página deja un link apuntando a `archivos.html`
- [x] Responsive del gestor inyectado en desktop + mobile
- [x] Abrir con doble clic (`file://`, sin servidor)

## Documentación

- [x] Actualizar `spec/constitution/roadmap.md`