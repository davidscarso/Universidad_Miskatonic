---
description: Planifica una nueva feature con el flujo SDD del proyecto (spec → plan → tareas) antes de tocar código
agent: plan
---

Quiero añadir esta funcionalidad: $ARGUMENTS

Antes de escribir código, prepará un plan que cumpla el flujo SDD de AGENTS.md y `spec/`:

1. **Constitución primero**: leé `spec/constitution/mission.md`, `tech-stack.md` y `roadmap.md` (más AGENTS.md). Si la idea entra en conflicto con la constitución, proponé rehacer la feature — nunca la constitución. Determiná el próximo número libre de feature (hoy: `027`).
2. **Los 3 documentos de la feature** en `spec/features/NNN-nombre-feature/` (si es un cambio sobre una feature ya existente, se actualizan sus specs actuales, no se crea otra):
   - `spec.md` — QUÉ y POR QUÉ + criterios de aceptación concretos, verificables (checkboxes `[x]`, medibles en el navegador o con `node --check`).
   - `plan.md` — CÓMO: archivos que se modifican y qué cambia en cada uno, decisiones tomadas y riesgos, respetando `tech-stack.md` (HTML/CSS/JS vanilla, sin frameworks, sin backend, contenido en español, tema oscuro y paleta existentes, sin tokens de color nuevos).
   - `tasks.md` — checklist en 3 bloques: Implementación, Validación y Documentación.
3. **Mis decisiones**: listá como opciones claras las dudas que debo resolver yo antes de implementar (contenido, estilo, comportamiento, alcance).
4. **Validación prevista**: cómo se verifica cada criterio de aceptación — `node --check src/js/*.js`, smoke test funcional de las vistas tocadas y regresión de las suites de features anteriores.
5. **Cierre documental**: qué actualizarías en `spec/constitution/roadmap.md` (mover a "Hecho" + siguiente libre), `AGENTS.md` y `README.md` con el nuevo rango `001-NNN`.
6. **Estilo de código**: IIFE, `var`, 4 espacios, comillas simples, sin comentarios, sin librerías.

No modifiques ningún archivo —ni specs ni código— hasta que apruebe el plan. Una vez aprobado, ejecutá en este orden: crear los specs → resolver conmigo las decisiones pendientes → implementar → validar → actualizar documentación. Nunca hagas commit ni push sin que lo pida explícitamente.
