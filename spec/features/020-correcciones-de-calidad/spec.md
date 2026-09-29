# 020 · Correcciones de calidad y navegación

**Estado:** implementado ✅

## Qué hace

Corrige problemas de calidad funcional y de contenido detectados en la SPA: el disclaimer respeta su aceptación, el preview de archivos genera HTML válido, el contenido visible deja de contener textos provisionales, y las categorías del foro funcionan sin contaminar el hash de navegación.

## Por qué

Estas correcciones afectan comportamientos ya implementados y pueden producir una experiencia inconsistente: el aviso legal reaparece siempre, el preview de archivos contiene HTML inválido, la portada muestra texto de desarrollo y las categorías del foro no cambian realmente el contenido.

## Criterios de aceptación

- [x] El disclaimer aparece automáticamente solo cuando `disclaimerAccepted` no vale `true`.
- [x] Después de aceptar el disclaimer, recargar la página no lo muestra de nuevo automáticamente.
- [x] Los enlaces del footer pueden abrir manualmente el disclaimer incluso después de haberlo aceptado.
- [x] El preview de archivos no genera elementos `<p>` anidados inválidamente.
- [x] Los archivos de texto continúan mostrando sus párrafos, saltos y contenido correctamente.
- [x] No queda texto provisional como `COMPLETAR ALGO ACA` en el contenido visible.
- [x] Los textos corregidos mantienen coherencia ortográfica, narrativa y terminológica.
- [x] Las categorías Sueños, Compulsiones y Dibujos muestran su propia lista de temas.
- [x] Al cambiar de categoría se actualizan el título, el contador, la lista y el estado activo.
- [x] El hash permanece en `#foro` al cambiar de categoría.
- [x] Recargar `index.html#foro` mantiene la vista del foro sin caer en Inicio.
- [x] La solución conserva el funcionamiento responsive actual.

## Fuera de alcance

- Rotación o retirada de claves expuestas en la configuración de OpenCode.
- Redacción y envío de correos.
- Persistencia de categorías, temas o contenido mediante backend.
- Creación de nuevos modales o detalle completo de los temas del foro.
