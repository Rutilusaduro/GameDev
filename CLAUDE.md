# Professor Sim — Agent Guide

## Project map

| Area | Path |
|---|---|
| Main game shell | `src/ProfessorSim.jsx` |
| Students & stages | `src/gameData/students.js`, `stages.js` |
| Modular text engine | `src/textEngine/engine.js` |
| Scene modules (barrel) | `src/textEngine/scenes/index.js` |
| Weigh-in v2 slots | `src/textEngine/scenes/weighIn/` |
| Talk encourage slots | `src/textEngine/scenes/talkEncourage.js` |
| Design reference | `DESIGN_BIBLE.md` |
| Engine reference | `docs/modular-text-system.md` |

**Before writing or editing any game prose, read `src/textEngine/AUTHORING.md`.** Engine API details live in `docs/modular-text-system.md`.

## Commands

```bash
npm run dev          # Vite dev server
npm run build        # Production build
npm run lint         # ESLint
npm run text:lint    # Text engine static + dynamic validation
```

## Text engine quick reference

- Register pool modules with `registerPool(key, variants, opts)` — weighted variant pick, then uniform text pick within variant.
- Legacy modules use `registerModule` (default `select: 'best'`) — unchanged behavior for existing scenes.
- Compose with slots: `{wi.pace} {wi.moveVerb}`; optional clauses via `{join:a,b|prefix:, }`.
- Always provide a wildcard `{ when: {} }` fallback unless intentionally whitelisted in `scripts/textLint.mjs`.
