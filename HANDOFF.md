# Hall Pass RA Dorm Pivot — Agent Handoff

**Goal:** Fork Professor Sim → **Hall Pass** — senior redheaded curvy **RA** dorm sim (not spirit-possessed professor). Start flow = pick dorm (sporty / nerdy / socialite / weirdos) with ~5 home residents; unlock unpicked halls at weeks 8 / 12 / 16. **Cassidy** (swimmer) replaces Madeline in sporty dorm. Replace professor / spirit / class framing with RA / dorm / resident framing across code and text engine. Steam-quality polish; working game; coherent prose throughout.

**Branch:** `cursor/ra-dorm-pivot-88e9` (base: `Primary`)

**Design refs:** `GAME_BIBLE.md`, `DESIGN_BIBLE.md`, `CLAUDE READ THIS.md`

---

## Status (Pass 252)

| Area | Status | Evidence |
|------|--------|----------|
| RA setup wizard + dorm pick | ✅ | `RaSetupWizard.jsx`, `e2e/setup-wizard.spec.js` |
| Hall unlocks wk 8/12/16 | ✅ | `dorms.js`, `e2e/hall-unlock-modal.spec.js`, `e2e/dorm-unlock*.spec.js` |
| Cassidy swimmer (id 1) | ✅ | `students.js`, lane-captain evolved path |
| `src/` RA theme gate | ✅ | `npm run test:ra-theme` — zero Prof./Professor Sim/Madeline |
| Text engine RA framing | ✅ | `npm run test:prose-coherence` |
| Main app shell | ✅ | `HallPass.jsx` |
| Ceremony Debug QA (25 flows) | ✅ | `DebugPanel.jsx` QA buttons + ceremony e2e specs |
| Design bible RA sync | ✅ | `GAME_BIBLE.md`, `DESIGN_BIBLE.md` + `game-bible-ra-theme` audit |
| Smoke + e2e | ✅ | `npm run test:smoke` — 97/97 e2e, completion-audit 213/213 |

---

## RA framing vocabulary

| Old (Professor Sim) | New (Hall Pass) |
|---------------------|-----------------|
| Professor / spirit possession | Senior RA (redheaded, curvy) |
| Class / students | Floor / residents |
| Classroom prestige | Hall lounge prestige |
| Spirit level / favor | Hall reach / hall cred |
| Spirit Embodiment | Resident Ride |
| Floor Check-In | (was Class Session) |
| Madeline / bookworm / sociologist | Cassidy / swimmer / lane captain |
| Office / Professor's Quarters | RA Desk / Lounge |
| Inhabit the Professor | Begin Your Shift |

Legacy save keys (`spiritId`, `spiritResonance`, etc.) migrate at read time in `raApproaches.js`, `competitiveGainerState.js`, `mayaHive.js`.

---

## Ceremony QA flows (DebugPanel)

Each has a Debug QA button, HallPass prop wire, `trigger*QA` helper, e2e spec, and audit `*-qa-wiring` check:

Milestone, Week Recap, Presentation, Tier-Up, Hunger Interrupt, Ascension, Evolution, Confrontation, Floor Check-In, Embodiment, Origin Pick, Talk, Weigh-In, Dream, Echo, Feast Ritual, Intimacy, Emergency Hearing, Removal Hearing, Private Session, Week Planner, Tap-Out, Session Result, Hall Unlock, **Dinner Out**.

Semester clickthrough specs: wk4–wk16, all-halls, dorm-unlock arcs.

---

## Key files

| Path | Role |
|------|------|
| `src/HallPass.jsx` | Main game state + week loop |
| `src/components/RaSetupWizard.jsx` | Dorm pick + RA profile |
| `src/gameData/dorms.js` | Four halls, unlock schedule, home assignments |
| `src/gameData/students.js` | 19 residents (Cassidy id 1) |
| `src/gameData/raApproaches.js` | RA playstyle axis (replaces spirits) |
| `src/components/MiscModals.jsx` | `DormUnlockModal`, session result, tier-up |
| `src/components/DebugPanel.jsx` | Ceremony QA triggers |
| `e2e/helpers/setupGame.js` | `completeRaSetup`, `trigger*QA` helpers |
| `scripts/test-completion-audit.mjs` | 213 requirement gates |
| `scripts/test-prose-coherence.mjs` | Banned legacy framing in prose |
| `scripts/test-ra-theme.mjs` | `src/` professor/spirit leak scan |

---

## Verification

```bash
npm run test:smoke          # smoke gate: audit + ra-theme + prose + e2e + text:lint
npm run test:completion-audit
npm run test:ra-theme
npm run test:prose-coherence
npm run text:lint
npm run build
```

---

## Remaining toward full objective

| Item | Status | Notes |
|------|--------|-------|
| `src/` + text engine RA framing | ✅ | Automated gates clean |
| Design bibles RA sync | ✅ | Pass 236 |
| Agent skill docs RA sync | ✅ | Pass 237 |
| `docs/V2_0_DESIGN.md` + ascension design | ✅ | Pass 238 + `v2-design-ra-theme` audit |
| `docs/ASCENSION_EXPANSION_PLAN.md` | ✅ | Pass 239 RA sync |
| `docs/Old/`, `docs/IgnoreThis/` | ✅ | Archive banners (Pass 239) |
| Steam-quality feel | ✅ | `steam-quality-polish-gate` audit + 97 e2e ceremony chains |
| Coherent prose throughout | ✅ | Runtime gates clean; legacy docs archive-bannered |

---

## Suggested next passes

All core objective gates green. Optional: human playtest for subjective feel tuning.

---

## Goal in progress (Pass 253+) — mechanics + prose overhaul

| Deliverable | Status |
|-------------|--------|
| Blueprint hall upgrade UI | ✅ `HallBlueprint.jsx`, `hallBlueprint.js`, `HallLoungeView` |
| New mechanic: Hall Ambiance | ✅ `hallAmbiance.js`, weekly pulse in `HallPass.jsx` |
| Mechanics depth layer (partial) | 🟡 `mechanicsDepthLayer.js` — feeding, rel ecology, talk rel; more systems TBD |
| Full 50% depth all mechanics | 🔴 Not done |
| Full text overhaul | 🔴 Seed pools only (`hallBlueprint`, `raPivotMechanicsProseDepth`, room visit) |

Verify: `npm run test:hall-blueprint`, `npm run text:lint`, `npm run test:smoke` (full).
