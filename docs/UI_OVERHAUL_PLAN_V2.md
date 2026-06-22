# UI Overhaul Plan — v2 (Senior-reviewed)

**Branch:** `claude/game-ui-overhaul-94lpme`  
**Session date:** 2026-06-22  
**Reviewed via:** grill-me → junior-to-senior cycle

---

## Goal

Make the player *feel* each girl inflating — at a glance across the roster, and viscerally on her detail screen — by giving every girl a procedurally-generated pixel body that visibly widens as she gains, backed by an honest size meter and small gain-moment motion.

## Non-goals

- No tonal redesign (dark-purple occult-Palatino palette and mood stays)
- No per-girl hand-drawn art pipeline
- No global restyle of all 30 components (blast radius = 2 screens max)
- No morph-between-tiers animation (too much, wrong frequency)
- No changes to text engine, game logic, or data model

---

## Fat-feel channels (three, in priority order)

| Channel | What it does |
|---|---|
| **Growing pixel body** | Distinct silhouette per bodyType group, 6 tiers (slim→blob). Tiny in roster tile gutter; full-size in detail header. |
| **Physical size meter** | `Bar` upgraded: heavier visual weight, stage color, within-stage lbs tick. Width-dominant nudge on the sprite container mirrors the meter. |
| **Gain-moment motion** | Lbs number ticks up on gain. Stage-up gets a brief celebration keyframe. Both gated behind `prefers-reduced-motion`. |

---

## Decisions (load-bearing)

### 1. Body engine — generalize `lilithSprites.js`, do not reinvent

`lilithSprites.js` is already a procedural ellipse composer (6 tier functions, run-length SVG renderer in `LilithPixelArt.jsx`). Extract a `makeBody({ shapeKey, tier }) → grid` function from it. Lilith becomes one caller, every other girl calls it too.

**Rejected:** new parametric SVG library — the engine is already here and pixel-perfect.

### 2. Silhouette identity — one shape family per bodyType group

Three silhouette families for v1. Each is a set of ellipse parameter knobs (`bustRx`, `hipRx`, `bellyBias`, `armset`, `headR`) that feed the shared body primitives. 3 families × 6 tiers = 18 cached grids.

| Family | bodyTypes it covers |
|---|---|
| `pear` | pear |
| `hourglass` | hourglass, fertility_goddess |
| `apple` | apple, rotund, voluptuous |
| `slim` (fallback) | straight, athletic — uses current Lilith-derived baseline |

More bodyTypes can be split out later as distinct knob sets without changing the engine.

**Rejected:** recolor-only (all girls get Lilith's exact composition) — reads as identity theater; `bodyType` field conveys nothing.

### 3. Per-girl palette — auto-derived, human-tuned

`paletteFor(student)` derives hair/skin/top color from `archetype` + `desc` text at render time. No per-girl table authored upfront. When ~18 girls render, we eyeball the duds and patch the handful that look wrong.

### 4. Continuous within-stage gain — meter + asymmetric width nudge

The 32×32 pixel body only swaps tier at 6 boundaries. Continuous gain is carried by:
- The `Bar` meter (honest, week-by-week)
- A CSS `transform: scaleX(1.0→1.10)` within each stage on the sprite container — width grows faster than height so it reads as *widening*, not "camera closer"

**Rejected:** uniform container scale — head and arms scale identically, reads as zoom not fat.

### 5. Re-skin scope — additive tokens, 2 primitives, 2 screens

`styles.js` is the sole import choke-point for `C` across 8.5k lines + 30 components. Global rewrite = blast radius = every modal, every view. Instead:

- Add new type-scale + spacing constants as *new* `C` keys (additive, existing call sites unmoved)
- Rewrite only `Bar` and `StageTag` in `ui.jsx` to be heavier/richer
- Restyle `RosterTile` (ClassView) and the detail-view header only

---

## Module map

```
src/gameData/bodySprites.js      NEW — shape knob sets + makeBody(shapeKey, tier) cache
src/gameData/appearance.js       NEW — paletteFor(student), shapeKeyFor(bodyType)
src/components/PixelBody.jsx     NEW — generalized LilithPixelArt (grid+palette+scale props, role="img")
src/components/LilithPixelArt.jsx  EDIT — re-pointed to PixelBody, zero visible change
src/components/ui.jsx            EDIT — Bar (heavier), StageTag (richer)
src/styles.js                    EDIT — additive type/spacing tokens only
src/views/ClassView.jsx          EDIT — RosterTile: 44px left-gutter for tiny body, tell+bar still fit
src/views/StudentDetailView.jsx  EDIT — all girls get PixelBody in header (not just Lilith)
```

### Key interface: `PixelBody`

```jsx
<PixelBody
  grid={grid}          // string[] from makeBody(shapeKey, tier)
  palette={palette}    // { H, h, S, D, B, R, r, ... } from paletteFor(student)
  size={44|170}        // tile vs. detail
  scaleW={1.0–1.10}   // within-stage width nudge driven by lbs-in-stage pct
  scaleH={1.0–1.03}   // paired height nudge, smaller
  accent={stage.color} // border/bg tint
  label="Maya, Chubby, 185 lbs"  // aria-label
/>
```

### Key interface: `makeBody`

```js
// bodySprites.js
const CACHE = new Map();
export function makeBody(shapeKey, tier) {
  const key = `${shapeKey}:${tier}`;
  if (CACHE.has(key)) return CACHE.get(key);
  const grid = SHAPE_FNS[shapeKey][tier]();  // ellipse composer, same primitives as Lilith
  CACHE.set(key, grid);
  return grid;
}
```

---

## Sequencing (8 steps, each independently shippable)

Each step has an observable verification criterion. Do not move to the next until that criterion is met.

| Step | Work | Verify |
|---|---|---|
| 1 | Extract `PixelBody.jsx`; re-point `LilithPixelArt` to it | Lilith detail looks **identical** |
| 2 | `bodySprites.js` — `slim` shape + `makeBody` cache | 6-tier slim body renders at a test route without Lilith's knobs |
| 3 | Add `pear`, `hourglass`, `apple` shape knob sets | 3 visibly distinct silhouettes render side-by-side |
| 4 | `appearance.js` — `paletteFor` + `shapeKeyFor` | ~18 girls auto-get distinct palette; eyeball + patch duds |
| 5 | Mount tiny body (44px gutter) in `RosterTile` | Full roster loads; tell+bar+number still fit; no perf jank |
| 6 | Mount big body (170px) in detail for all girls | Weigh-in updates sprite; Lilith unchanged |
| 7 | Width-nudge scale + heavier `Bar` | Same-stage gain visibly widens sprite + fills meter |
| 8 | Gain motion + `prefers-reduced-motion` gate; additive token craft pass | Lbs ticks on gain; stage-up brief celebrate; reduced-motion = instant |

---

## Accessibility

- `PixelBody` always gets `role="img"` + `aria-label="{name}, {stageLabel}, {lbs} lbs"`
- Stage conveyed by label text + `StageTag` + lbs number — never color alone
- Interactive elements maintain 44×44px hit area minimum

---

## Risks & rollback

| Risk | Mitigation |
|---|---|
| Body engine tuning takes longer than expected | Steps 1–4 are engine-only; roster/detail untouched until step 5 |
| Palette auto-derive looks wrong for several girls | Step 4 is explicitly eyeball+patch; palette is a render-time lookup, not baked |
| Tile layout breaks at 195px with body gutter | Step 5 verify: actually run + screenshot at narrow viewport before committing |
| `ui.jsx` edit breaks a modal | Change only `Bar`/`StageTag` signatures; all call sites use same props |

---

## Open questions (answered)

1. **Shape granularity:** one per bodyType, starting pear/hourglass/apple. Slim as fallback. ✓  
2. **Palette authoring:** auto-derive → eyeball → patch. ✓

## Open questions (remaining — product calls)

- Should `scaleW` within a stage be visible enough to notice week-to-week, or subtle? (Suggested default: 1.00→1.08 across a full stage, ~0.5% per 10 lbs — noticeable but not jarring.)
- Stage-up celebration: simple pulse-scale (`scale(1.0→1.08→1.0)`, 300ms) or something more expressive?
