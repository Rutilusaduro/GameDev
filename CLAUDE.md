# CLAUDE.md

Weight-gain themed college sim (React + Vite, plain JS, no test framework).

## Commands

- `npm run dev` — dev server
- `npm run lint` — eslint over src/
- `npm run text:lint` — **text-engine content linter** (static checks + a full dynamic render sweep). Must be clean for any keys you add or touch.
- `npm run build` — vite production build

## Project map

- `src/textEngine/` — the modular text engine. `engine.js` (resolver), `lexicon.js` (word.* pools), `modules.js` (core phrase modules), `scenes/` (per-feature content; `scenes/index.js` is the barrel — add every new scene file to it).
- `src/gameData/` — pure game state/logic (students, stages, corruption, hunger/addiction, pharmacist, talk system…). Keep these engine-free; render at call sites.
- `src/components/` — React UI (modals render engine output; they should hold no prose).
- `docs/modular-text-system.md` — engine reference (slots, selectors, filters, pool mode, `{join}`).
- `DESIGN_BIBLE.md` — game design.

## Writing game prose — READ THIS FIRST

**Before writing or editing ANY narrative text, read `src/textEngine/AUTHORING.md`.** It is the binding content contract: skeleton/fragment composition, `registerPool` semantics, grammar-shape rules, the selector cookbook, per-girl voice conventions, and anti-patterns. The canonical exemplar scenes to copy are `src/textEngine/scenes/weighIn/` and `src/textEngine/scenes/talkEncourage.js`.

The one-sentence version: never write a monolithic paragraph as a variant — write a skeleton with fragment slots, give every pool a wildcard fallback, key fragments on game state (stage, bodyType, mood, corruption, hunger, studentId…), and run `npm run text:lint` until clean.
