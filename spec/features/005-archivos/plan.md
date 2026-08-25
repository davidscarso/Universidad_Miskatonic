# 005 · Archivos — Plan

## Enfoque

Crear una página de gestor de archivos estilo Google Drive con diseño de dos columnas: panel de carpetas a la izquierda y contenido a la derecha. Modal redimensionable para previsualizar archivos.

## Implementación

1. **Crear `src/archivos.html`**
   - Header consistente con navegación
   - Layout de dos columnas (carpetas + contenido)
   - Panel izquierdo con estructura de árbol de carpetas
   - Panel derecho con grid de iconos de archivos
   - Modal redimensionable para previsualizar contenido
   - Footer consistente

2. **Agregar estilos en `src/css/styles.css`**
   - Estilos para layout de archivos (carpetas + contenido)
   - Estilos para árbol de carpetas
   - Estilos para grid de archivos
   - Estilos para iconos de archivos
   - Estilos para modal redimensionable
   - Estilos responsive

3. **Actualizar `src/js/main.js`**
   - Función para navegar entre carpetas
   - Función para abrir/cerrar modal de previsualización
   - Función para redimensionar modal
   - Contenido fake según tipo de archivo

4. **Actualizar links en todas las páginas**
   - Cambiar "escritorio.html" por "archivos.html" en navegación
   - Actualizar textos de "Escritorio" a "Archivos"

## Estructura de carpetas fake

```
📁 Documentos
   ├── 📄 Tesis sobre los Mitos.txt
   ├── 📄 Carta del Decano.txt
   └── 📄 Notas de clase.txt
📁 Imágenes
   ├── 🖼️ Templo submarino.jpg
   ├── 🖼️ Manuscrito antiguo.jpg
   └── 🖼️ Profesor Armitage.jpg
📁 Videos
   ├── 🎥 Excavación Arkham.mp4
   └── 🎥 Conferencia Cthulhu.mp4
📁 Investigación
   ├── 📄 Reporte expedición.txt
   └── 📄 Análisis manuscritos.txt
```

## Decisiones

- **Diseño Google Drive** — Estándar de la industria, intuitivo
- **Modal redimensionable** — Usar CSS resize para simplicidad
- **Contenido fake** — Textos e imágenes placeholder

## Riesgos

- **Responsive** — Panel de carpetas debe colapsar en móvil
- **Modal** — Redimensionamiento puede ser complejo en móvil
