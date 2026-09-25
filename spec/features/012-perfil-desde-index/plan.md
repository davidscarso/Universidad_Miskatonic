# Plan — Feature 012 Perfil desde el index (SPA) + guarda de acceso

## Enfoque

Replicar la arquitectura de las features 008/010/011 (vistas del index con `window.renderX()` + dispatch por hash en `navegacion.js`), añadiendo una quinta vista **Perfil** y, de paso, una **guarda central de vistas privadas** que faltaba: `#correo`, `#archivos` y `#perfil` sin sesión muestran un panel de error de acceso en lugar del contenido.

1. `perfil.js` (nuevo) define el `<main>` de la vista perfil y expone `window.renderPerfil()`.
2. `navegacion.js` resuelve `#perfil`, lo despacha, marca el botón de usuario como activo y **antes de despachar cualquier vista chequea la sesión**: si la vista es privada y no hay sesión, llama a `window.renderAccesoRestringido()`.
3. `main.js` define `window.renderAccesoRestringido()` **en top-level** (fuera de su callback de `DOMContentLoaded`) y expone los hooks de refresh tras login/logout.
4. `perfil.html` se elimina (mismo criterio que 008/010/011 con sus páginas).

## Cambios

### Nuevos archivos
- `src/js/perfil.js` — `window.renderPerfil()` (top-level, como los demás renderers):
  - Crea `<main class="main">` con `.profile-section` (tarjeta: avatar, `.profile-name` = `localStorage.username || 'Profesor Admin'`, rol, email) y `.profile-links` (quick-links `#inicio`, `#correo`, `#archivos` con `data-restricted="true"`, hrefs `index.html#…` → `#…`)
  - Lo inyecta en `#main-placeholder` (misma secuencia `innerHTML = ''` + `appendChild` que los otros renderers)
  - Sin sesión **no decide nada**: la guarda de `navegacion.js` lo intercepta antes
- `spec/features/012-perfil-desde-index/` — `spec.md`, `plan.md`, `tasks.md`

### Archivos modificados
- `src/js/navegacion.js`
  - `restrictedViews = ['correo', 'archivos', 'perfil']` + helpers `isRestricted(view)` y `hasSession()`
  - `renderView(view)`: si `isRestricted(view) && !hasSession()` → `window.renderAccesoRestringido()`; si no, dispatch normal (agregada la rama `perfil` → `renderPerfil()`)
  - `getViewFromHash`: `#perfil` → `'perfil'`
  - `setActive`: alterna `.active` sobre `#profileBtn` cuando `view === 'perfil'` (en esa vista ningún nav-link queda activo)
  - Expone `window.refreshCurrentView()` (re-render de `currentView`) para que `main.js` lo use tras login/logout
- `src/js/main.js`
  - **Nuevo top-level** `window.renderAccesoRestringido()`: construye `<main class="main restricted-page">` con el markup de `acceso-restringido.html` (stamp, título, divider, mensaje, registro NK-1928-047, nota) **+ botón "Iniciar Sesión"** (`.login-btn`) que hace `loginModal.classList.add('active')`; lo inyecta en `#main-placeholder` y liga el botón sobre el nodo recién creado (se recrea por render → no acumula listeners)
  - Helpers `isRestrictedHash()` (hash actual es `#correo`/`#archivos`/`#perfil`) y `refreshRestrictedView()` (llama a `window.refreshCurrentView()` solo si el hash es privado)
  - Login exitoso → `refreshRestrictedView()`; `logout()` → `refreshRestrictedView()`
- `src/index.html`
  - `profileBtn`: `href="perfil.html"` → `href="#perfil"` (línea 33)
  - Scripts: insertar `js/perfil.js` antes de `js/navegacion.js` → `archivos, correo, foro, inicio, perfil, navegacion, main, footer` (renderers antes del controlador)
- `src/css/styles.css`
  - `.profile-btn.active` — mismo efecto que `.nav-link.active` (texto primario + borde inferior accent)
  - `.restricted-content .login-btn` — `display: block; margin: 1.5rem auto 0`

### Archivos eliminados
- `src/perfil.html` — única referencia externa en `src/index.html:33` (grep verificado; las menciones restantes son históricas en specs anteriores, no se tocan)

### Documentación
- `spec/constitution/roadmap.md` — 012 agregado a "Hecho ✅" (y renumerada la lista duplicada 009/010/011)

## Decisiones

- **Guarda central en `navegacion.js`, no en cada renderer**: un solo punto decide qué renderiza según sesión; los renderers se mantienen puros y solo se usan con sesión
- **`renderAccesoRestringido` en top-level de `main.js`**: `navegacion.js` registra su listener de `DOMContentLoaded` antes que `main.js` (orden de scripts), así que el render inicial lo necesita ya definido; viviría `undefined` si quedara dentro del callback. La lógica de sesión ya vive en `main.js` (`toggleRestrictedLinks`, login), así que no se creó un archivo nuevo
- **El botón del panel vive en el HTML que inyecta el render** (igual que el preview de Archivos en 011): su listener se liga por render, sin acumulación
- **Logout en vista privada → panel de acceso restringido** (en vez de redirigir a `#inicio`): un solo mecanismo (`refreshCurrentView`) para las tres vistas y refuerza el mensaje de restricción
- **Login exitoso solo refresca si el hash es privado**: evitar re-renders innecesarios de `#inicio`/`#foro` que resetearían su estado visual
- **`perfil.html` se elimina**: mismo criterio que 008/010/011; `acceso-restringido.html` se conserva (lo usan los "Leer más" de `inicio.js`)
- **El perfil no tiene nav-link en el header**: entrada solo por el botón de usuario (que ya se oculta sin sesión)
- **Datos de la tarjeta**: nombre = sesión (`localStorage.username`); rol y email quedan fijos como en `perfil.html`

## Riesgos

- **Orden de scripts / momento de definición**: si `renderAccesoRestringido` no está en top-level, el render inicial de un hash privado falla (`undefined is not a function`) — cubierto con un smoke test headless de `index.html#correo` sin sesión
- **`refreshCurrentView` definido dentro del callback de navegación**: disponible recién al terminar ese callback, siempre antes de cualquier click de usuario — riesgo aceptado y verificado
- **Acceso directo a `#foro`/`#inicio` sin sesión**: sigue permitido a propósito (son públicas)
- **Listeners acumulados**: el subtree de la vista se reconstruye entero por render y el botón del panel es nuevo cada vez; solo hay un listener de `hashchange` y uno de `click` con delegación (previos)
