# Modular Text — Authoring Guide

Read this before adding or editing game prose in the text engine.

## Slot grammar

```
{module}                    invoke module
{module:ref}                retarget to ctx.ref
{module|cap}                filter after resolution
{module|prefix: }           prepend only if non-empty
{join:a,b,c|prefix:, }      resolve slots, drop empties, join with commas + final "and"
```

**Limitation:** no `:ref` retarget inside a `{join:...}` key list.

## Registration

```js
import { registerPool } from '../engine.js';

registerPool('wi.example', [
  { when: { stageMin: 4, bodyType: 'pear' }, weight: 2, text: ['her hips settle wide'] },
  { when: { studentId: 0 }, weight: 4, text: ['"Moving."'] },  // persona — verbatim dialogue
  { when: {}, text: ['generic fallback', 'another option', 'third option', 'fourth option'] },
]);
```

- Use `registerPool` for all new content (default for v2 scenes).
- `weight: 0` parks drafts; `weight: 4` boosts persona-specific lines.
- Generic fragments must be **tone-neutral** — no NOT-conditions exist; a cheery generic must not undercut withdrawal context.

## Selector cookbook

| Key | Values |
|---|---|
| `stage` / `stageMin` / `stageMax` | 0–11 (Slight→Leviathan) |
| `corruption` | 0, 1, 2 |
| `relationship` | 0–3 |
| `mood` | student mood string |
| `bodyType` | pear, apple, hourglass, athletic, … |
| `archetype` | cheerleader, bookworm, … |
| `studentId` | 0–17 roster id |
| `hungerTier` / `hungerTierMin` | 0–4 |
| `addictionLevel` / `addictionLevelMin` | 0–4 |
| `inWithdrawal` | true / false |
| `lastCompound` | pharmacist compound id |
| `campusTierMin` / `campusFattening` | campus softening |
| `bigScale` | ctx.globals.bigScale |
| `skill` | skillEffects flag name |

Stage bands for body copy: light ≤2 · rounded 3–5 · heavy 6–8 · vast 9+.

## Content rules

1. **Mine, don't paraphrase** persona dialogue — voice lives in the quotes.
2. **≥4 texts** at wildcard per pool module; **≥3** per keyed cell; **≥2** dialogue lines per persona per corruption tier.
3. **Skeleton + slots** — connective tissue in skeletons; fragments do one job each.
4. Never register a module named `join` (reserved meta-slot).

## Anti-patterns

- Monoliths (>200 chars in pool modules — `text:lint` errors)
- Missing wildcard fallback
- Fragments doing a neighbor slot's job
- Tone-loaded generics
- Re-registering the same key (overwrites with dev warning)

## Validation

```bash
npm run text:lint
```

Debug panel → **⚖ Weigh-in sweep** for eyeball coverage.

## smooth() note

`render()` runs a smoothing pass that capitalizes after `. ` and collapses spaces. It does **not** cap after `\n\n` — intentional lowercase after paragraph breaks is fine; use `{ noSmooth: true }` when appending codas.

## Worked examples

- Weigh-in: `src/textEngine/scenes/weighIn/` (arrival → settle → scale → stepOff → reply)
- Talk encourage: `src/textEngine/scenes/talkEncourage.js`
