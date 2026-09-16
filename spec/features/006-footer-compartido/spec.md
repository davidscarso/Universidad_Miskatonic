# Feature 006 — Footer compartido

## Estado

Implementado

## Descripción

Reutilizar el footer de la página index en todas las demás páginas que tengan un footer, mediante un archivo JavaScript compartido (`footer.js`) que inyecta el HTML del footer de forma dinámica.

## Problema que resuelve

Los 5 HTML del proyecto tenían un `<footer>` con estructura idéntica pero contenido inconsistente:
- `index.html`: "Universidad Kaliber", 2026, Argentina
- Las demás: "Universidad Miskatonic", 1928, Massachusetts

Esto generaba confusión sobre cuál era la universidad "oficial" del proyecto.

## Criterios de aceptación

- [ ] El footer se muestra en todas las páginas con el mismo contenido
- [ ] El contenido del footer es: "© 2026 Universidad Kaliber. Todos los derechos reservados." / "Neuquén, NEUQUÉN, Argentina."
- [ ] Los links del footer (Aviso Legal, Política de Privacidad, Contacto) están presentes
- [ ] El footer se inyecta vía JavaScript desde un único archivo `footer.js`
- [ ] No hay HTML de footer duplicado en ningún archivo `.html`
- [ ] El header de todas las páginas muestra "Universidad Kaliber" (consistencia)
- [ ] El footer se ve correctamente en desktop y mobile (responsive)

## Fuera de alcance

- Funcionalidad real de los links del footer (siguen apuntando a `#`)
- Backend o persistencia
