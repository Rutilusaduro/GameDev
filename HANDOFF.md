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
| Student portraits | ✅ StudentPortrait component |
| Prose expansion | ✅ v2 depth + v2ProseExpansion |
| Skill/classroom unlocks | ✅ 6 spirit skills + 5 classroom upgrades |
| Integration + version bump | ✅ 2.0.0, build passes |
| Resonance on feed | ✅ pulse wired |
| Echo capture (feed/weigh-in/stage) | ✅ wired |
| V2 depth on feed/talk/wi/dinner | ✅ depthRenderer |
| Per-student portrait accents | ✅ roster + detail |
| Embodiment actions expanded | ✅ 14 actions |

## Key Files (V2)

- `src/gameData/v2/` — subsystem state + logic
- `src/textEngine/scenes/v2/` — all V2 prose
- `src/components/v2/` — modals and views
- `src/views/SpiritHubView.jsx` — central V2 nav

## Verification

```bash
npm run text:lint   # must be clean
npm run lint        # eslint
npm run build       # production build
```

## Next Steps

1. Finish embodiment system end-to-end
2. Build remaining 4 systems
3. Wire into ProfessorSim.jsx
4. Mass prose depth pass
5. Run linters, commit, push, update PR
