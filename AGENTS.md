# AGENTS.md

## Project Status

Spec-driven development in progress. Features 001-004 implemented.

- `spec/` — project constitution and feature specs
- `src/` — all source code (HTML, CSS, JS)

## What This Project Is

A fictional Lovecraftian university website (Spanish-language content):
- Homepage emulating a university portal
- Research forum with posts (4 states: active, closed, deleted, restricted)
- Login (hardcoded credentials, single user)
- Fictional email inbox
- File manager (Google Drive style)

## Tech Stack (from constitution)

- **Languages:** HTML, CSS, JavaScript (vanilla, no framework)
- **Runtime:** None (static files)
- **Storage:** SQLite or JSON files if needed
- **Tests:** None defined yet
- **Deployment:** Local for now; GitHub Pages later

## SDD Workflow

The constitution (`spec/constitution/`) is authoritative. Features must conform to it.

**To add a feature:**
1. Create `spec/features/NNN-nombre-feature/` (next number: `005`)
2. Write `spec.md` (what + acceptance criteria)
3. Write `plan.md` (how, respecting tech-stack.md)
4. Write `tasks.md` (checklist)
5. Implement
6. Update `spec/constitution/roadmap.md` (move to "Hecho")

**If a feature conflicts with the constitution, rework the feature—never the constitution.**

## Key Files

- `spec/constitution/mission.md` — project scope and principles
- `spec/constitution/tech-stack.md` — technical constraints
- `spec/constitution/roadmap.md` — feature status tracking
- `spec/features/001-inicio/` — homepage feature (spec, plan, tasks)
- `spec/features/002-login-perfil/` — login + profile feature (spec, plan, tasks)
- `spec/features/003-email/` — email feature (spec, plan, tasks)
- `spec/features/004-foro/` — forum feature (spec, plan, tasks)
- `opencode.json` — context7 MCP server configured

## Style

- Dark theme, 2000s forum aesthetic
- All documentation in Spanish
