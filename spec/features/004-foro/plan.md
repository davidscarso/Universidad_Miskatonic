# 004 · Foro de Investigación — Plan

## Enfoque

Crear una página de foro estática con diseño de dos columnas: sidebar con categorías y área principal con lista de temas. Agregar modales para subir dibujos y notificaciones.

## Implementación

1. **Crear `src/foro.html`**
   - Header consistente con navegación y campana de notificaciones
   - Layout de dos columnas (sidebar + contenido)
   - Sidebar con 3 categorías
   - Área principal con lista de temas fake
   - Botón "Subir mi dibujo"
   - Modal de carga de archivo
   - Modal de notificaciones
   - Footer consistente

2. **Agregar estilos en `src/css/styles.css`**
   - Estilos para layout de foro (sidebar + main)
   - Estilos para categorías
   - Estilos para lista de temas
   - Estilos para botón de subir dibujo
   - Estilos para modales (subir archivo, notificaciones)
   - Estilos para campana de notificaciones
   - Estilos responsive

3. **Actualizar `src/js/main.js`**
   - Función para abrir/cerrar modal de subir dibujo
   - Función para abrir/cerrar modal de notificaciones
   - Contador de notificaciones no leídas
   - Simulación de notificaciones fake

## Decisiones

- **Diseño de dos columnas** — Estándar para foros, intuitivo
- **Contenido fake** — Temas y notificaciones predefinidos
- **Modales simples** — Sin funcionalidad real de subida

## Riesgos

- **Responsive** — Sidebar debe colapsar en móvil
- **Consistencia** — Mantener mismo header/footer que otras páginas
