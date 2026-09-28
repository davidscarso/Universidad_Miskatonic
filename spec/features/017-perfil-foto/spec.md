# 017 · Perfil con foto de perfil

**Estado:** implementado ✅

## Qué hace

- La vista `#perfil` muestra la **foto de Damián Salcedo** (`assets/images/Fotos/Foto_Damian.png`, 1024×1024) dentro del avatar, en lugar del símbolo genérico ☺.
- La foto se muestra **recortada en círculo** (100×100, `object-fit: cover`) con el borde rojo de acento de la universidad, integrada con el resto de la tarjeta de perfil.
- La imagen tiene `alt` accesible ("Foto de Damián Salcedo").
- Se elimina el glifo `☺` y su CSS `.avatar-symbol` (queda sin uso → sin código muerto).

## Por qué

El perfil es la identidad del personaje dentro de la ficción, y hasta ahora mostraba una carita genérica. Ya existe la foto del personaje en `src/assets/images/Fotos/` y es un solo markup + CSS reemplazar el glifo por la imagen real.

## Criterios de aceptación

- [x] Con sesión, `#perfil` renderiza `<img class="profile-avatar-img" src="assets/images/Fotos/Foto_Damian.png" alt="...">` dentro de `.profile-avatar`.
- [x] El avatar queda circular (borde rojo visible, foto recortada sin deformarse).
- [x] La imagen carga correctamente (verificado: `naturalWidth = 1024`, tamaño renderizado 96×96 dentro del avatar).
- [x] Sin sesión no cambia nada: `#perfil` sigue mostrando el panel de Acceso Restringido (la foto vive dentro de la vista restringida).
- [x] `☺` / `.avatar-symbol` eliminados de `perfil.js` y `styles.css` (sin referencias huérfanas).
- [x] `node --check` sobre `perfil.js`.
- [x] Sin errores JS en el smoke test headless.

## Fuera de alcance

- Subir o cambiar la foto desde la interfaz (la foto es un archivo fijo del repo).
- Editor de imagen, recorte manual o galería de avatares.
- Otras fotos de la carpeta `Fotos/`.
- Optimizar el peso de la imagen (1.5 MB) — backlog.
