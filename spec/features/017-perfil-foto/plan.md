# Plan — Feature 017 Perfil con foto de perfil

## Enfoque

Cambio de markup y CSS puro: `perfil.js` ya construye la tarjeta del perfil con `innerHTML`, así que el símbolo ☺ se sustituye por un `<img>` apuntando a la foto del repo, y el CSS hace el recorte circular. Sin estado nuevo, sin tocar el router ni la guarda de acceso.

## Implementación

1. `src/js/perfil.js`
   - En `.profile-avatar`: reemplazar `'<span class="avatar-symbol">&#9786;</span>'` por `'<img class="profile-avatar-img" src="assets/images/Fotos/Foto_Damian.png" alt="Foto de Damián Salcedo">'`.
2. `src/css/styles.css`
   - `.profile-avatar`: agregar `border-radius: 50%; overflow: hidden;` (recorte circular manteniendo el borde rojo de 2px).
   - Nueva regla `.profile-avatar-img`: `width/height: 100%; object-fit: cover; display: block;` (la foto es cuadrada 1024×1024 → sin deformar).
   - Eliminar la regla `.avatar-symbol` (queda sin uso).
3. Documentación: `roadmap.md` (017 en "Hecho", siguiente `018`), `AGENTS.md` (001-017, siguiente `018`), `README.md` (001-017).
4. Validación: `node --check` + smoke headless (login → `#perfil` → la imagen carga y mide 96×96 con `border-radius` circular).

## Decisiones

- **`<img>` con path relativo** (`assets/images/Fotos/...`) en vez de base64 — la vista vive en `index.html`, la ruta relativa ya funciona igual que favicon/logo.
- **`object-fit: cover` + contenedor circular** — recorte central de la foto cuadrada en el avatar de 100px; es el patrón estándar y no requiere preprocesar la imagen.
- **Borrar `.avatar-symbol`** — misma disciplina de la feature 015: al quitar su único uso, se elimina su CSS (grep confirmó que solo lo usaba `perfil.js`).
- **Sin lógica de sesión nueva** — la foto está dentro de la vista `#perfil`, que ya está protegida por la guarda de `navegacion.js`; no hay nada que autorizar.

## Riesgos

- **Path incorrecto de la imagen** — verificado en headless: `naturalWidth = 1024` (cargó) y el avatar mide 96×96.
- **Foto deformada** — cubierto por `object-fit: cover` sobre contenedor cuadrado.
- **Peso de la imagen (1.5 MB)** — afecta solo a la vista de perfil y queda anotado en el backlog de optimización.
