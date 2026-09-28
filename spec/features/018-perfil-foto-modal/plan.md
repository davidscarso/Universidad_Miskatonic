# Plan — Feature 018 Perfil: ampliar foto en modal

## Enfoque

Mismo patrón que la 016: **la modal vive dentro de la vista** (dueña: `perfil.js`) y se apoya en las clases base ya existentes `.preview-modal` / `.preview-content` (que traen maximize real, iconos `□`/`⧉`, responsive y `overflow:hidden`). No se toca `archivos.js` ni `correo.js`, ni el CSS compartido de `.modal-content`/`.preview-content`: solo se añaden reglas nuevas para el avatar y para el cuerpo de la imagen. `perfil.js` pasa a ser una IIFE al estilo de `archivos.js`/`correo.js` para poder mantener un único listener de `Escape` por módulo (`activeKeydown`).

## Implementación

1. `src/js/perfil.js`
   - Envolver todo en una IIFE `(function() { ... })();` exponiendo `window.renderPerfil` (consistencia con `archivos.js` / `correo.js`).
   - Markup del avatar: añadir `title="Ampliar foto"` a `.profile-avatar`.
   - Nuevo markup de modal al final del `<main>`, con **ids con prefijo `avatar`** para no chocar con `#filePreviewModal` / `#emailPreviewModal`:
     - `#avatarPreviewModal` → `.modal.preview-modal`
     - `.modal-content.preview-content` con `#avatarPreviewTitle` ("Foto de Damián Salcedo"), `#avatarMaximizeBtn` (`□`/`⧉`) y `#avatarCloseBtn` (`×`) dentro de `.modal-controls`
     - `.modal-body.avatar-preview-body` con `<img class="avatar-preview-img" src="assets/images/Fotos/Foto_Damian.png" alt="Foto de Damián Salcedo">`
   - Nueva función `bindPerfil(main)` (extraída de `renderPerfil`, igual que hace `bindHandlers` en archivos):
     - clic en `.profile-avatar` → `resetPreviewState()` + `modal.classList.add('active')`
     - `#avatarCloseBtn` → cerrar
     - clic en el fondo (`e.target === modal`) → cerrar
     - `#avatarMaximizeBtn` → `toggle('is-maximized')` + actualizar `title`
     - `Escape` → listener único de módulo con patrón `activeKeydown` (se remueve el anterior antes de re-registrar)
     - helpers `resetPreviewState(modal)` y `closeAvatarModal(modal)` (limpian `active` + `is-maximized` + título del botón)
2. `src/css/styles.css`
   - `.profile-avatar`: `cursor: pointer;` + `transition` y estado `:hover` (borde/sombra de acento) para marcar que es clicable.
   - Nueva regla `.avatar-preview-body`: `display:flex; align-items:center; justify-content:center; overflow:hidden;` (anula el `overflow-y` con scroll del `.modal-body` genérico).
   - Nueva regla `.avatar-preview-img`: `max-width:100%; max-height:100%; width:auto; height:auto; object-fit:contain; display:block;` (contain + sin deformar; escala sola al maximizar).
   - **Sin tocar** `.modal-content`, `.preview-content` ni `.preview-content.is-maximized` (compartidos con Archivos y Correo).
3. Documentación: `roadmap.md` (018 en "Hecho", siguiente `019`), `AGENTS.md` (001-018, siguiente `019`), `README.md` (001-018).
4. Validación: `node --check src/js/*.js` + smoke headless (login → `#perfil` → clic en avatar → abrir/maximizar/restaurar/cerrar por `×`, fondo y `Escape`) + regresión de Archivos y Correo.

## Decisiones

- **Modal propio con ids `avatar*` en vez de reutilizar `#filePreviewModal`** — es la convención ya elegida en la 016 ("modal dentro de la vista, dueño: su módulo"): se reutiliza la **base CSS** (`.preview-*`), no los nodos. Así no hay IDs duplicados ni acoplamiento entre vistas.
- **IIFE + `activeKeydown`** — `perfil.js` era una función suelta a nivel global; el patrón de archivos/correo evita variables globales y garantiza un solo listener de `Escape` por módulo (el anterior se remueve al re-renderizar).
- **`object-fit: contain` + flex center en el body** — pedido del usuario: ajustar a la ventana sin scroll ni recorte; el resize al maximizar lo resuelve el CSS (la imagen escalada es cuadrada 1024×1024, así que nunca se deforma).
- **Clic delegado en `.profile-avatar`, no en la `<img>`** — área clickeable completa (los 100px del avatar) y el handler sigue funcionando si mañana cambia el `src`.
- **Sin `alert()`/`console` y sin tocar el router** — el hash no cambia y la guarda de acceso de `navegacion.js` sigue siendo la única autorización para llegar a `#perfil`.

## Riesgos

- **Escape con listeners de archivos/correo aún en el documento** — cada módulo consulta solo su propio modal; solo una vista está montada a la vez y los demás handlers quedan en no-op. Mitigado con smoke de regresión.
- **Efectos colaterales en otros modales** — `.modal-body` global trae `overflow-y:auto` y monoespaciada; la clase `.avatar-preview-body` solo añade flex/overflow por especificidad, sin modificar la regla base.
- **Romper el modal de Archivos** — no se edita `archivos.js` ni sus clases; se verifica abriendo un archivo y maximizándolo en el smoke.
- **Imagen duplicada en el DOM** (avatar + modal) — misma ruta ya cacheada por el navegador; costo nulo y evita re-renderizados.
