# V2.0 Overhaul — Agent Handoff

**Goal:** Upgrade Professor Sim 1.0 → 2.0 (full scope in `docs/V2_0_DESIGN.md`)

**Branch:** `cursor/game-2-0-overhaul-8189`

## Status

| Item | Status |
|------|--------|
| Design doc | ✅ `docs/V2_0_DESIGN.md` |
| Spirit Embodiment | 🔄 in progress |
| Craving Resonance | ⏳ pending |
| Feast Rituals | ⏳ pending |
| Body Echo Archive | ⏳ pending |
| Appetite Dreams | ⏳ pending |
| Student portraits | ⏳ pending |
| Prose expansion | ⏳ pending |
| Skill/classroom unlocks | ⏳ pending |
| Integration + version bump | ⏳ pending |

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
