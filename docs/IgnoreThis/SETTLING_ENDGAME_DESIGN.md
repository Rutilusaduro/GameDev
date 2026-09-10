> **ARCHIVED — pre–Hall Pass design notes.** Canonical RA dorm design: `GAME_BIBLE.md`, `DESIGN_BIBLE.md`, `HANDOFF.md`. Content below is historical.

Professor Sim — "The Settling" Endgame Design & Build Record

The Settling is the weight endgame. When a girl grows past mobility (stage 10),
she leaves the class roster and moves into a dedicated area where the loop
changes: no more Talk, dinner, or mobile-only singles. Three durable
interaction trees keep her — Socialize, Feed, Care — and over time her play
pattern locks her into one of three final forms. This document records the
design and the four-milestone build that shipped it.

It replaces the old single-button "Hold Court" capstone. That code stays in the
tree for old saves (`IMMOBILITY_ARRIVAL`, the comfort-milestone and hint
helpers) but the new flow drives everything from stage 10 onward.

## Core model

Three immobility tiers, read from weight stage by `getImmobilityTier(student)`:

- **0 — mobile.** Normal class roster.
- **1 — settled (stage 10).** Leaves the roster, enters The Settling. Passive
  weekly gain once she has Arrived.
- **2 — leviathan (stage 11).** The room's gravity. Unlocks the gathering
  capstone and locks her final form.

State lives on the student object:

- `immobilityArrived` — passive settling switched on.
- `settleCounts: { socialize, feed, care }` — how she's been kept. Drives the
  final form.
- `finalForm` — a branch key (`'feed' | 'care' | 'socialize'`) once locked.
- `stomachCapacity` — built by stuffing; now feeds the Ever-Expanding loop.
- `lastRefitLbs`, `courtPreference`, `courtHints`, `courtComfort` — re-fit,
  food preference, hint escalation, comfort milestones (carried from the old
  Hold Court system, folded into the Care tree).

All of it lives in `src/gameData/immobilityArrival.js`. The view is
`src/views/SettlingView.jsx`. Handlers live in `src/ProfessorSim.jsx`. Prose is
under `src/textEngine/scenes/settling/`.

## The three trees (`SETTLING_ACTIONS`)

Each tree is a two-click flow: pick the tree, pick the action. Subs carry
`{ id, label, apCost, sceneKey, effects, gate, action }`.

**Socialize** — bring the world to her.
- Court Gossip, Confide, Praise Her Size — relationship, light gain on praise.
- Bring Visitors (`hasVisitor` gate) — a mobile girl comes to sit with her.
- Get Close (`relTier2` gate) — defers to the intimacy selector.

**Feed** — bring her what she craves.
- Hand-Feed Preferred (`hasPreference` gate) — her known taste, +20%.
- Big Spread, Stuffing — Stuffing adds stomach capacity.
- Private Feeding (`relTier1` gate) — defers to the private session flow.

**Care For** — tend her where she rests.
- Re-fit Clothes (`needsRefit` gate) and Tend Her (fires the hint escalation
  once per week).
- Comfort milestones (Reinforced Bed, Fan, Climate Control, etc.) inject
  dynamically into the menu via `getAvailableCareSubs(student)`.

Gates resolve in the view's `gateSub(sub, s, students)`. Special actions
(`openIntimacy`, `privateSession`, `refit`, `comfort`) defer to existing
handlers that own their own AP and prose; everything else runs through the
unified `runSettlingAction(s, branch, sub)`.

## Final forms

Determined by the dominant `settleCounts` branch, locked on her first
settling action at leviathan (`markFinalForm`, no-op on a tie). Stored as the
branch key; `getFinalForm` maps it to display copy.

- **Feed → Ever-Expanding** — growth uncapped; she keeps settling outward.
- **Care → Comfort Queen** — the room is hers; other girls seek her warmth.
- **Socialize → The Adored** — pleasure center; the campus orbits her.

A tie or zero counts leaves her formless at leviathan, where the player picks
by hand (see M4).

## The four milestones, as shipped

### M1 — model + roster split + trees + prose

Built the data model (tiers, `SETTLING_ACTIONS`, `settleCounts`, final-form
scaffolding, the dynamic Care menu) and the gold-accented `SettlingView`
(`SettlingListView` + `SettlingDetailView`, the two-click trees, the
`DestinyBar`). Split the roster in `ProfessorSim`: settled girls leave
`ClassView` and render in The Settling. Added the nav entry. Wrote the first
prose pools (care / socialize / feed) and the render entrypoint
`renderSettlingScene`. Intimacy and private-feeding folded in as deferring
subs from the start.

### M2 — deeper Feed and Socialize

Made two dead-feeling loops compound, reusing existing state (no new fields):

- **Feed → Ever-Expanding loop.** `stomachCapacity` was a tracked-but-inert
  stat. Now every feed gains `+floor((capacity − baseCapacity) / 8)` lbs, so
  stuffing (which raises capacity) and her own growth compound into all future
  feeding.
- **Socialize → The Adored standing.** `settleCounts.socialize` doubles as
  "standing." Each social act adds `+floor(standing / 4)` relationship, so the
  more the campus already orbits her, the harder each act lands.

`TreeCard` headers show a live build readout; the action toast reports the
relationship bonus when it fires.

### M3 — leviathan gathering capstone

At tier 2, a "Gather Her Court" node sits above the three trees. The others
come to her unprompted: `getAttendees()` picks the four closest available girls
by relationship; the gathering gives her relationship and each attendee a small
relationship + gain bump. New `set.gather` prose pool carries the space-takeover
and girls-attend beats (stage-11 with corruption variants; attendee names
threaded through globals).

**Form-neutral by design:** `runGathering` never touches `settleCounts`. Being
attended is the shared payoff of The Adored and Comfort Queen, so it must not
tip the final form either way.

### M4 — branching final-form effects + campus radiate + tie-breaker

Each locked form earns a weekly signature (`FINAL_FORM_FX`, applied in the
weekly tick):

- **Ever-Expanding (feed)** — `finalFormSelfGain` adds +3–6 lbs to her own
  settling each week. Self-focused, uncapped.
- **Comfort Queen (care)** — `applyFinalFormRadiate` soothes the campus: every
  other girl sheds 2 discontent per week.
- **The Adored (socialize)** — radiate warms the campus: every other girl gains
  +1 relationship toward the player per week.

Radiate effects scale with how many leviathans hold each form; the leviathans
themselves are exempt. Feed feeds herself, Care and Socialize reach outward —
the same split the fantasy implies.

The tie-breaker: when she reaches leviathan with no dominant branch, the detail
view shows a chooser (`chooseFinalForm` / `chooseLeviathanForm`) so the player
locks her form by hand. It only appears while she's formless, which can only
happen on a tie.

## File map

- `src/gameData/immobilityArrival.js` — all model, helpers, final-form logic.
- `src/views/SettlingView.jsx` — list + detail, the trees, DestinyBar, gather
  node, tie-breaker chooser.
- `src/ProfessorSim.jsx` — roster split, `runSettlingAction`, `runGathering`,
  `chooseLeviathanForm`, the weekly radiate + self-gain wiring, nav.
- `src/textEngine/scenes/settling/` — `care.js`, `socialize.js`, `feed.js`,
  `gather.js`, and `index.js` (barrel + `renderSettlingScene`).

## Verification

No test framework in this repo; each milestone left a runnable node self-check
behind (attendee sort/cap/self-exclude + prose render for M3; self-gain,
radiate soothe/warm, and chooser lock for M4). Every milestone built clean
(`vite build`) and added no new lint errors beyond the pre-existing
`researchBlueprint` undefined in untouched code.

## Open hooks for later

- Final-form-specific gather prose (the gathering reads the same at every form).
- Adored standing could unlock a free unprompted visit at a threshold; M3 folded
  the "they come to her" fantasy into the gathering instead of running a second
  parallel system, but the threshold idea is still open.
- Campus-saturation meta-track: the radiate effects are per-girl and weekly;
  they could feed a campus-wide readout if The Settling ever needs a top-level
  progress spine.
