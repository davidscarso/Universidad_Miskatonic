# Universidad Kaliber — ForoXNovela

Sitio web ficticio de una universidad Lovecraftiana, complemento de una novela. Portal académico con foro de investigación, correo interno, gestor de archivos y aviso legal: todo el contenido es ficción.

## Cómo abrirlo

No hay build ni dependencias. Abrir `src/index.html` en cualquier navegador (doble clic basta).

```
src/
├── index.html          ← SPA única: header, modales y placeholders
├── acceso-restringido.html
├── css/styles.css      ← tema oscuro estética foro de los 2000
├── js/
│   ├── navegacion.js   ← router por hash (#inicio, #foro, #correo, #archivos, #perfil)
│   ├── main.js         ← login, modales, guarda de acceso, disclaimer
│   ├── inicio.js       ← vista portada + modal de noticias
│   ├── foro.js         ← vista foro + trigger de upload
│   ├── correo.js       ← vista correo
│   ├── archivos.js     ← gestor de archivos con preview
│   ├── perfil.js       ← vista perfil + modal de foto ampliada
│   └── footer.js       ← footer compartido (se inyecta en todas las páginas)
└── assets/images/      ← favicon.png y logo.png
```

**Credenciales (ficticias):** usuario `SALCEDO.D`, contraseña `136136`. Sin sesión, `#correo`, `#archivos` y `#perfil` muestran el panel de Acceso Restringido.

## Desarrollo dirigido por especificación (SDD)

La `spec/` es la constitución del proyecto. Toda feature nueva sigue este flujo:

1. Crear `spec/features/NNN-nombre-feature/` (siguiente libre: `022`)
2. Escribir `spec.md` — qué hace y criterios de aceptación
3. Escribir `plan.md` — cómo se implementa respetando `spec/constitution/tech-stack.md`
4. Escribir `tasks.md` — checklist
5. Implementar y validar (`node --check` sobre los JS + smoke test en navegador)
6. Actualizar `spec/constitution/roadmap.md` → "Hecho ✅"

> Si una feature choca con la constitución, se replantea la feature, nunca la constitución.

## Estado

Features 001-021 implementadas (ver `spec/constitution/roadmap.md`). Stack: HTML + CSS + JavaScript vanilla, sin framework, sin build.
