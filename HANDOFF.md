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
| Legacy talk prose | ✅ named thin pool sweep (65 pools turn 34); wifeLessons + monolith _f* |
| V2 wildcard depth | ✅ v2WildcardDepth.js — 83 emb/res/ritual/echo/dream/*.v2.depth pools padded |
| Banned-pattern lint | ✅ 0 style-ledger violations (149→28 total warnings; infra only remains) |
| V2_0 mechanical audit | ✅ gate fidelity fixes — resonance_bells surge, echo_gallery archive, dream_chamber hub, lucid steer, ritual milestones, embodiment AP tiers |
| Campus device depth | ✅ all 19 students on vulnerability; keyed reaction + deviceFlavor padded |

## V2_0 Completion Audit (evidence-based)

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Version 2.0.0 | ✅ | `package.json`, `V2_CONFIG.version` |
| Spirit Embodiment system | ✅ | `spiritEmbodiment.js`, `EmbodimentModal`, skill/classroom gates, echo debuff on release |
| Craving Resonance system | ✅ | `cravingResonance.js`, links/pulses/tiers/surge, `resonance_bells` gate |
| Feast Rituals (4 tiers) | ✅ | `feastRituals.js`, `FeastRitualModal`, week/spirit milestones |
| Body Echo Archive | ✅ | `bodyEcho.js`, capture hooks, `EchoArchivePanel`, resonate buff |
| Appetite Dreams | ✅ | `appetiteDreams.js`, weekly roll + manual trigger, lucid steer choices |
| Student portraits | ✅ | `StudentPortrait.jsx`, `studentSprites.js` — 19 students, 7 tiers, hair/features/glow |
| Skill tree (6 skills) | ✅ | `skillTrees.js` — spirit_ride, deep_ride, hunger_web, dream_walk, memory_palace, ritual_master |
| Classroom (5 upgrades) | ✅ | `skills.js` — embodiment_chamber, resonance_bells, echo_gallery, ritual_kitchen, dream_chamber |
| Spirit nav + integration | ✅ | `SpiritHubView`, `player.v2State`, end-week hooks in `ProfessorSim.jsx` |
| Prose depth layers | ✅ | 50+ scene kinds via `appendV2Depth`; monolith/named/wildcard sweeps; 0 banned-pattern violations |
| Build + text lint | ✅ | `npm run build`, `npm run text:lint` exit 0 |
| ESLint | ✅ | `npm run lint` — 0 errors (78 pre-existing warnings) |

### Not blocking 2.0 ship (per design doc / scope)

| Item | Status | Notes |
|------|--------|-------|
| Bespoke hand-drawn sprites | Optional | Design doc specifies procedural pixel silhouettes; implemented |
| Infra lint warnings (28) | Low | psych-keyed word.*, legacy registerModule, stem dedupe |
| Keyed cells <3 texts (14) | Low | campus.dev edge cases; volume gate not strict |

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
- `src/textEngine/scenes/diarySceneDepth.js` — late-stage diary.innerBeat per-student (stage 9–11, immobile)
- `src/textEngine/scenes/diaryEvolvedSceneDepth.js` — evolved-form diary stage 11 c1/c3 + wildcard depth
- `src/textEngine/scenes/diaryPhaseDSceneDepth.js` — PhaseD forms (gainer/goddess/salon/gallery/pharmacist) s9–11 depth
- `src/textEngine/scenes/evolved/evolvedSceneDepth.js` — per-student evolved.v2.depth variants
- `src/textEngine/scenes/salonGallerySceneDepth.js` — salon/gallery hub + form evolved depth pools
- `src/textEngine/scenes/opposition/oppositionHearingFragmentDepth.js` — hearing removal phase0._d0 depth
- `src/textEngine/scenes/cultivator/monolithFragmentDepth.js` — harvest/digest/growth _N.fM fragment depth (auto-gen)
- `src/textEngine/scenes/settling/settlingMonolithFragmentDepth.js` — care/feed/socialize _N.fM depth (auto-gen)
- `src/textEngine/scenes/opposition/oppositionMonolithFragmentDepth.js` — hearing _N.fM depth (auto-gen)
- `src/textEngine/scenes/monolithFragmentDepth.js` — global remaining _N.fM depth (auto-gen)
- `src/textEngine/scenes/wifeLessons/talkDepth.js` — wifeLessons.talk.* depth (405 pools, auto-gen)
- `src/textEngine/scenes/namedPoolDepth.js` — final named thin pool depth (65 pools, auto-gen)
- `src/textEngine/scenes/v2WildcardDepth.js` — V2 wildcard depth (83 pools, auto-gen)
- `scripts/generateV2WildcardDepth.mjs` — regen V2 wildcard depth
- `src/textEngine/scenes/settling/settlingFragmentDepth.js` — decomposed care/gossip/confide _d* fragment depth
- `src/textEngine/scenes/settling/settlingFeedFragmentDepth.js` — feed spread/stuffing _d27–44 fragment depth
- `src/textEngine/scenes/v2/echo/echoSceneDepth.js` — per-student echo.type.* replay variants
- `src/textEngine/scenes/v2/studentArchetypeDepth.js` — full 19-student voice on resonance/ritual/dream/echo V2 pools

## Verification

```bash
npm run text:lint   # exit 0 (28 infra warnings: psych-keyed, legacy modules, stem dedupe)
npm run lint        # exit 0 errors (78 pre-existing warnings)
npm run build       # production build
```

## Remaining Toward 2.0

1. ~~ESLint errors~~ — fixed turn 40 (11 missing imports)
2. Infra lint warnings (28) — psych-keyed word.* pools, legacy registerModule migration, stem dedupe gate
3. 14 keyed cells under volume target (non-strict) — mostly campus.dev edge selectors
4. Bespoke hand-drawn art — optional; procedural portrait system satisfies design doc
