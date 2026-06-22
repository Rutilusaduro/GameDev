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
| **Growing pixel body** | Side-profile silhouette (belly protrudes forward, booty behind, thighs widen). 12 stages (slim→leviathan). Tiny in roster tile gutter; full-size in detail header. |
| **Physical size meter** | `Bar` upgraded: heavier visual weight, stage color, within-stage lbs tick. Mirror the sprite's width growth. |
| **Gain-moment motion** | Lbs number ticks up on gain. Stage-up gets a brief celebration keyframe. Both gated behind `prefers-reduced-motion`. |

---

## Decisions (load-bearing)

### 1. Body engine — hand-drawn side-profile sprites (hand-authored, proven stronger read)

Side-profile silhouettes (facing right) show belly protrusion, booty sag, and thigh spread in a way front-facing cannot. The hunt mechanic already uses this (`LILITH_PROFILES` in `LilithModals.jsx`) and it reads clearly.

Extract `PixelProfile` component generalized from hunt renderer. Hand-author **12-stage Lilith profile** (stages 0–11, extending the existing 5) in the same grid format, then author bodyType variants (pear/hourglass/apple) as separate grid sets.

**Rejected:** procedural ellipse generator — hand-drawn reads more dramatically, stops farting around with "readable from the side" parametrics.

### 2. Silhouette identity — one profile family per bodyType, hand-authored

Three profile families for v1. Each is a full 12-tier pixel grid set. Total: 36 hand-drawn grids (~20px wide, ~35px tall each stage).

| Family | bodyTypes it covers |
|---|---|
| `lilith` (existing base) | slender types (straight, athletic) |
| `pear` | pear |
| `hourglass` | hourglass, fertility_goddess |
| `apple` | apple, rotund, voluptuous |

More can be split later. Single renderer (`PixelProfile`) feeds all of them.

**Rejected:** procedural — hand authoring each profile takes effort, but the clarity and drama is worth it. Profile view conveys size in a way ellipses never will.

### 3. Per-profile palette — hardcoded in grid data, no auto-derive

Profiles are hand-drawn; palette is baked into the grid (color indices 1–5 mapped per profile). No auto-derivation — each family gets its own distinct palette defined in the grid data. (Lilith: wine-red dress, pale skin; pear: earthy tones; hourglass: warm golds; apple: deeper jewels.)

### 4. Continuous within-stage gain — meter-driven width nudge

The 12-tier profile grid only swaps at stage boundaries. Continuous gain is carried by:
- The `Bar` meter (honest, week-by-week, stage color)
- CSS `transform: scaleX(1.0→1.08)` within stage (width-dominant nudge reflects the belly expanding mid-stage)

**Rejected:** uniform scale — this isn't front-facing, so zoom is less confusing, but width-bias still better mirrors meter growth.

### 5. Re-skin scope — additive tokens, 2 primitives, 2 screens

`styles.js` is the sole import choke-point for `C` across 8.5k lines + 30 components. Global rewrite = blast radius = every modal, every view. Instead:

- Add new type-scale + spacing constants as *new* `C` keys (additive, existing call sites unmoved)
- Rewrite only `Bar` and `StageTag` in `ui.jsx` to be heavier/richer
- Restyle `RosterTile` (ClassView) and the detail-view header only

---

## Module map

```
src/gameData/profileSprites.js   NEW — 12-tier profile grids for lilith, pear, hourglass, apple
src/gameData/appearance.js       NEW — profileFamilyFor(bodyType) → 'lilith' | 'pear' | 'hourglass' | 'apple'
src/components/PixelProfile.jsx  NEW — generalized side-profile renderer (grid+size+scale+accent+label, role="img")
src/components/LilithModals.jsx  EDIT — hunt modal uses PixelProfile instead of inline LILITH_PROFILES
src/components/ui.jsx            EDIT — Bar (heavier), StageTag (richer)
src/styles.js                    EDIT — additive type/spacing tokens only
src/views/ClassView.jsx          EDIT — RosterTile: 44px left-gutter for tiny profile, tell+bar still fit
src/views/StudentDetailView.jsx  EDIT — all girls get PixelProfile in header; Lilith hunt still uses it too
```

### Key interface: `PixelProfile`

```jsx
<PixelProfile
  grid={grid}           // integer[][] from profileSprites.js (same format as LILITH_PROFILES)
  size={44|170}         // tile vs. detail
  scaleW={1.0–1.08}     // within-stage width nudge driven by lbs-in-stage pct
  accent={stage.color}  // border/bg tint
  label="Maya, Chubby, 185 lbs"  // aria-label
/>
```

Palette is baked into each grid (color indices 1–5); no separate palette prop needed.

### Key data: `profileSprites`

```js
// gameData/profileSprites.js
export const PROFILE_FAMILIES = {
  lilith: [grid_stage_0, grid_stage_1, ..., grid_stage_11],  // hand-authored, ~20×35px each
  pear: [grid_0, ..., grid_11],
  hourglass: [grid_0, ..., grid_11],
  apple: [grid_0, ..., grid_11],
};

export function getProfileGrid(familyKey, stageId) {
  return PROFILE_FAMILIES[familyKey]?.[stageId] || PROFILE_FAMILIES.lilith[stageId];
}
```

---

## Sequencing (7 steps, each independently shippable)

Each step has an observable verification criterion. Do not move to the next until that criterion is met.

| Step | Work | Verify |
|---|---|---|
| 1 | Extract `PixelProfile.jsx` renderer from hunt code; re-point `LilithModals` to use it | Hunt modal looks **identical** |
| 2 | Hand-author stages 6–11 for Lilith profile (extend existing 0–5) | 12-tier Lilith profile renders at a test route; Fat–Leviathan visible |
| 3 | `profileSprites.js` — Lilith 12-tier grid finalized | Grid loads, no typos, renders crisp |
| 4 | Hand-author pear, hourglass, apple profiles (12 tiers each) | 3 distinct families visible side-by-side; identity clear |
| 5 | `appearance.js` — `profileFamilyFor(bodyType)` mapping | ~18 girls route to correct family; no collisions |
| 6 | Mount tiny profile (44px gutter) in `RosterTile`; big (170px) in detail header for all girls | Full roster + detail view; all girls have a body; Lilith hunt unbroken |
| 7 | Width-nudge scale + heavier `Bar` + gain motion + `prefers-reduced-motion` gate; additive tokens | Lbs tick on gain; stage-up celebrate; width grows week-to-week; reduced-motion respected |

---

## Accessibility

- `PixelBody` always gets `role="img"` + `aria-label="{name}, {stageLabel}, {lbs} lbs"`
- Stage conveyed by label text + `StageTag` + lbs number — never color alone
- Interactive elements maintain 44×44px hit area minimum

---

## Risks & rollback

| Risk | Mitigation |
|---|---|
| Hand-authoring 36 grids (3 families × 12 stages) takes time | Steps 2–4 are grid authoring; UI mounting untouched until step 6. Can ship with Lilith only if pacing pressures. |
| Grids rendered wrong (typo in array, off-by-one) | Step 1 establishes the renderer; steps 2–4 only add data. Renderer bugs caught early. |
| Profile looks wrong at certain stages | Each family is authored once, then never touched again (unless a girl complains). Hand-drawn = you own the art, not parametrics. |
| Tile layout breaks at 195px with 44px gutter | Step 6 verify: render full roster + detail view at real viewport before committing. |

---

## Open questions (answered)

1. **Sprite style:** side-profile hand-drawn (hunt modal baseline), not front-facing procedural. ✓  
2. **Shape granularity:** pear/hourglass/apple, with lilith as fallback. 12 tiers each. ✓  
3. **All 12 stages:** extend hunt sprites from 6-tier to full 12 (slim→leviathan). ✓

## Open questions (remaining — product calls)

- Who authors the 36 grids? (Expected: you hand-draw or AI-assist them pixel-by-pixel, tweak from base Lilith.)
- Pacing: ship Lilith 12-tier only first, then other families as follow-up? Or all 3 at once?
- Within-stage `scaleW` nudge: 1.00→1.08 (current guess) or more/less visible?
- Stage-up celebration: pulse-scale (`scale(1.0→1.08→1.0)`, 300ms) or different keyframe?
