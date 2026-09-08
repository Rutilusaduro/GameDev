# V2.0 Overhaul — Agent Handoff

**Goal:** Upgrade Professor Sim 1.0 → 2.0 (full scope in `docs/V2_0_DESIGN.md`)

**Branch:** `cursor/game-2-0-overhaul-8189`

## Status

| Item | Status |
|------|--------|
| Design doc | ✅ `docs/V2_0_DESIGN.md` |
| Spirit Embodiment | ✅ wired |
| Craving Resonance | ✅ wired |
| Feast Rituals | ✅ wired |
| Body Echo Archive | ✅ wired |
| Appetite Dreams | ✅ wired |
| Student portraits | ✅ procedural sprites + hair + immobile tier |
| V2 depth layer | ✅ 40+ scene kinds via `depthRenderer` |
| Skill/classroom unlocks | ✅ 6 spirit skills + 5 classroom upgrades |
| Integration + version bump | ✅ 2.0.0, build passes |
| Wife lessons bridge | ✅ lesson + talk trees |
| Homeroom Queen bridge | ✅ conference + activities |
| Evolved events V2 | ✅ `renderEvolvedEventProse` |
| Stream live V2 | ✅ `renderStreamBeat` |
| Collab stream V2 | ✅ action popups + legacy payoff/stageup depth |
| Interior self-obs | ✅ talk check-in + eating |
| Campus exploration depth | ✅ sighting/travel/find |
| Opposition V2 | ✅ `renderOppositionLine` + endgame |

## Key Files (V2)

- `src/gameData/v2/` — subsystem state + logic
- `src/textEngine/scenes/v2/` — V2 prose + depthRenderer
- `src/components/v2/` — modals and views
- `src/views/SpiritHubView.jsx` — central V2 nav
- `src/textEngine/scenes/collabStream/` — collab stream engine bridge
- `src/textEngine/scenes/stream/liveBridge.js` — Destiny streaming live depth

## Verification

```bash
npm run text:lint   # exit 0 (monolith warnings remain on legacy pools)
npm run lint        # eslint
npm run build       # production build
```

## Remaining Toward 2.0

1. Mass legacy prose sweep (~35k scene lines — depth layer is additive, not full rewrite)
2. Monolith decomposition (~144 text:lint flags — homeroom/cultivator/settling)
3. Unique per-girl art beyond procedural pixel silhouettes
4. Recording session / contest / sumo mini-game bridges (same pattern as collab)
5. Opposition agenda/hearing prose expansion
6. Completion audit before marking goal done
