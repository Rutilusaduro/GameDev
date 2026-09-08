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
| Student portraits | ✅ procedural sprites + hair + features + archetype glow (all 19) |
| V2 depth layer | ✅ 40+ scene kinds + per-student talk/feed/dinner/session/wi + spirit/resonance/ritual/dream/echo voice |
| V2 scene depth.js | ✅ embodiment, resonance, rituals, dreams, echo (stage-keyed local depth) |
| Skill/classroom unlocks | ✅ 6 spirit skills + 5 classroom upgrades |
| Integration + version bump | ✅ 2.0.0, build passes |
| V2 mechanical fidelity | ✅ echo debuff, resonance lbs tiers/rel cost/surge, ritual favor, interactive dreams, lucid unlock, dream chamber gate |
| Wife lessons bridge | ✅ lesson + talk trees |
| Homeroom Queen bridge | ✅ conference + activities + pool decomposition |
| Evolved events V2 | ✅ `renderEvolvedEventProse` |
| Stream live V2 | ✅ `renderStreamBeat` |
| Collab stream V2 | ✅ action popups + legacy payoff/stageup depth |
| Recording session V2 | ✅ filming bridge + legacy depth wrappers |
| Eating contest V2 | ✅ food/action/devour/weigh-in/payoff depth |
| Sumo match V2 | ✅ exchange/bout/corner/aftermath/payoff depth |
| Interior self-obs | ✅ talk check-in + eating |
| Campus exploration depth | ✅ sighting/travel/find |
| Opposition V2 | ✅ agenda pools (10 cards) + hearing bridge + depth |
| Echo/pulse gameplay prose | ✅ renderEchoCapture toasts + renderResonancePulse on feed pulse |
| Legacy talk prose | 🔄 Destiny offstream + homeroom conference/activity depth; prior stream/settling/device/opposition |

## Key Files (V2)

- `src/gameData/v2/` — subsystem state + logic
- `src/textEngine/scenes/v2/` — V2 prose + depthRenderer
- `src/components/v2/` — modals and views
- `src/views/SpiritHubView.jsx` — central V2 nav
- `src/textEngine/scenes/collabStream/` — collab stream engine bridge
- `src/textEngine/scenes/eatingContest/` — competitive circuit contest bridge
- `src/textEngine/scenes/sumoMatch/` — sumo match engine bridge
- `src/textEngine/scenes/dinner/dinnerReactionsDepth.js` — group reaction + unbutton stage/student depth
- `src/textEngine/scenes/dinner/dinnerEndingDepth.js` — endOpen/endClose/ending variants
- `src/textEngine/scenes/homeroom/homeroomActivityDepth.js` — parent meeting + health unit activity pools
- `src/textEngine/scenes/hungerFragmentsDepth.js` — feed/deny/compound/talk outcome depth
- `src/textEngine/scenes/milestone/milestoneSceneDepth.js` — stage/corruption/student milestone depth
- `src/textEngine/scenes/intimacy/intimacySceneDepth.js` — bodyFeel/climax/encourages personas
- `src/textEngine/scenes/campus/campusSceneDepth.js` — missing student campus nav beats
- `src/textEngine/scenes/weeklyEvent/weeklyEventSceneDepth.js` — per-student weekly fragment depth
- `src/textEngine/scenes/deviceTick/deviceTickSceneDepth.js` — per-student tick dependence/sensation/growth
- `src/textEngine/scenes/deviceSceneDepth.js` — catalog/psych stage+corruption+student depth
- `src/textEngine/scenes/growthEvent/growthEventSceneDepth.js` — surge/settle/environment/student depth
- `src/textEngine/scenes/campusDevice/campusDeviceSceneDepth.js` — campus device encounter/reaction personas
- `src/textEngine/scenes/opposition/oppositionSceneDepth.js` — agenda/counter/hearing/endgame student+stage depth
- `src/textEngine/scenes/opposition/oppositionHearingSceneDepth.js` — per-student hearing removal/emergency/verdict depth
- `src/textEngine/scenes/collabStream/collabStreamSceneDepth.js` — stage-keyed collab reveal/zoom/push/crash depth
- `src/textEngine/scenes/recordingSession/recordingSessionSceneDepth.js` — per-student recording oneMore take depth
- `src/textEngine/scenes/recordingSession/recordingSessionWrapDepth.js` — wrap/payoff pools + per-student endings
- `src/textEngine/scenes/settling/settlingSceneDepth.js` — per-student care/socialize/feed/weigh immobility depth
- `src/textEngine/scenes/streamSceneDepth.js` — stage-keyed Destiny live stream end/tap/round depth
- `src/textEngine/scenes/destinyOffstreamSceneDepth.js` — off-stream talk/activity/weigh-in stage depth
- `src/textEngine/scenes/v2/studentArchetypeDepth.js` — full 19-student voice on resonance/ritual/dream/echo V2 pools

## Verification

```bash
npm run text:lint   # exit 0 (monolith warnings remain on legacy pools)
npm run lint        # eslint
npm run build       # production build
```

## Remaining Toward 2.0

1. Mass legacy prose sweep — diary monoliths + more homeroom/evolved pools still open; offstream/homeroom depth added turn 24
2. Unique per-girl art beyond procedural pixel silhouettes (features/glow done; bespoke sprites optional)
3. Completion audit vs `docs/V2_0_DESIGN.md` — five V2 systems wired ✅; prose depth additive pass ongoing
