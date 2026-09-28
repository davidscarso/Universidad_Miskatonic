# AGENTS.md

## Project Status

Spec-driven development in progress. Features 001-019 implemented. Next feature number: `020`.

- `spec/` — project constitution and feature specs
- `src/` — all source code (HTML, CSS, JS)

## What This Project Is

A fictional Lovecraftian university website (Spanish-language content), companion to a novel:
- SPA with hash router (`navegacion.js`): `#inicio`, `#foro`, `#correo`, `#archivos`, `#perfil`
- Homepage emulating a university portal
- Research forum with posts (4 states: active, closed, deleted, restricted)
- Login (hardcoded credentials `SALCEDO.D` / `136136`, single user, `localStorage` session)
- Fictional email inbox
- File manager (Google Drive style)
- Legal disclaimer modal (first visit, `localStorage` flag)

## Tech Stack (from constitution)

- **Languages:** HTML, CSS, JavaScript (vanilla, no framework)
- **Runtime:** None (static files)
- **Storage:** SQLite or JSON files if needed
- **Tests:** None defined yet
- **Deployment:** Local for now; GitHub Pages later

## SDD Workflow

The constitution (`spec/constitution/`) is authoritative. Features must conform to it.

**To add a feature:**
1. Create `spec/features/NNN-nombre-feature/` (next number: `020`)
2. Write `spec.md` (what + acceptance criteria)
3. Write `plan.md` (how, respecting tech-stack.md)
4. Write `tasks.md` (checklist)
5. Implement and validate: `node --check src/js/*.js` + smoke test (open `src/index.html`, exercise the touched views)
6. Update `spec/constitution/roadmap.md` (move to "Hecho")

**If a feature conflicts with the constitution, rework the feature—never the constitution.**

## Key Files

- `spec/constitution/mission.md` — project scope and principles
- `spec/constitution/tech-stack.md` — technical constraints
- `spec/constitution/roadmap.md` — feature status tracking
- `spec/features/NNN-nombre-feature/` — template for new features (spec, plan, tasks)
- `spec/features/001-inicio/` … `019-noticias-modal/` — implemented features (001-019)
- `src/js/navegacion.js` — hash router + access guard (views entry point)
- `src/js/main.js` — login, modals, restricted-access panel, disclaimer
- `opencode.json` — context7 MCP server configured (⚠ contains a committed API key: rotate it and move it out of the repo)

## Style

- Dark theme, 2000s forum aesthetic
- All documentation in Spanish
