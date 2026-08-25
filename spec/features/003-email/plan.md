# 003 · Página de Correo — Plan

## Enfoque

Crear una página estática HTML con diseño de dos columnas: sidebar izquierda para navegación de bandejas y área principal para listar correos. Contenido fake predefinido.

## Implementación

1. **Crear `src/email.html`**
   - Header consistente con navegación
   - Layout de dos columnas (sidebar + contenido)
   - Sidebar con 4 bandejas y botón redactar
   - Área principal con lista de correos fake
   - Footer consistente

2. **Agregar estilos en `src/css/styles.css`**
   - Estilos para layout de correo (sidebar + main)
   - Estilos para bandejas de navegación
   - Estilos para lista de correos
   - Estilos para correos no leídos
   - Estilos para botón redactar

3. **Corregir bug de logout**
   - Agregar atributo `data-restricted="true"` a links restringidos en index.html y perfil.html
   - Actualizar main.js para usar selector `[data-restricted="true"]`
   - Actualizar styles.css para usar selector `[data-restricted="true"]`

## Decisiones

- **Diseño de dos columnas** — Estándar para clientes de correo, intuitivo
- **Contenido fake** — Textos predefinidos, no se guardan
- **Sin JavaScript adicional** — Página estática, solo necesita estilos

## Riesgos

- **Responsive** — Sidebar debe colapsar en móvil
- **Consistencia** — Mantener mismo header/footer que otras páginas
