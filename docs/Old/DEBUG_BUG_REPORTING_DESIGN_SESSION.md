> **ARCHIVED — pre–Hall Pass design notes.** Canonical RA dorm design: `GAME_BIBLE.md`, `DESIGN_BIBLE.md`, `HANDOFF.md`. Content below is historical.

# Debug & Bug Reporting — Three-Agent Design Session

**Branch:** `cursor/oppositional-forces-design-935f`  
**Participants:** Alex (Game Designer), Jordan (Coding Genius), Raven (Author)  
**Reference:** `GAME_BIBLE.md` §§1–37, existing `DebugPanel.jsx` + Dialogue Lab  
**Output:** Appendable Bible §36 + implementation priority

---

## Round 1 — Initial Reactions

**Alex:** The current debug panel is a dev cheat sheet — AP, scrutiny, student lbs, Dialogue Lab. That's essential for us, but players who hit a soft-lock or a blank modal have *no* structured way to help. A robust system needs two tiers: **Developer Console** (full state surgery, opposition triggers, text sweeps) and **Field Notes** (player-facing bug report that never exposes cheats). The report should answer: what week, what screen, what were you doing, what broke — and attach a reproducible snapshot without making the player dig through localStorage. Biggest risk: reports that are useless ("it broke"). Biggest opportunity: every report includes last 40 log lines + active modal stack + opposition queue so we can replay 80% of bugs from JSON alone.

**Jordan:** Architecturally this is a **ring buffer + snapshot exporter**, not a new game system. `window.onerror` and `unhandledrejection` feed `errorRingBuffer` (cap 20). `buildGameSnapshot()` pulls a sanitized slice from ProfessorSim root state — students trimmed to ids/names/lbs/evolvedForm/flags, opposition full, week/AP/scrutiny, log tail, version, userAgent. Wrap the app in `GameErrorBoundary` — on catch, push structured error + offer Field Notes modal pre-filled. Debug Panel gets tabs: **State** (existing), **Opposition** (scrutiny/scandal/trigger hearing/supernatural), **Field Notes** (preview + copy/download JSON). Phase 2 can add GitHub issue URL template. Don't send telemetry without opt-in — export is copy/paste or download only. Dialogue Lab already sweeps text; bug reports should link `textLint` module list hash when DEV.

**Raven:** Call it **Field Notes** in-universe — the professor's marginalia when reality glitches. Player copy: *"Something didn't taste right. Leave a note for the archivist."* Categories as mood, not JIRA: **Stuck / Blank screen / Numbers wrong / Story broke / Other**. Error boundary fallback prose: *"The semester hiccuped. Your progress is still here — file a Field Note if it keeps happening."* Debug tier stays green-terminal; Field Notes tier is parchment-on-dark, same modal family as weigh-in. Never break the fourth wall harder than the game already does for debug.

---

## Round 2 — Core Mechanics Brainstorm & Critique

**Alex:** Proposal for §36 structure:

| Tier | Who | Access | Powers |
|------|-----|--------|--------|
| Field Notes | Player | Log footer + error screen | Report + snapshot export, no cheats |
| Debug Panel | Dev / `import.meta.env.DEV` | 🐛 button | State edit, Dialogue Lab, opposition lab |
| Dialogue Lab | Writer / dev | Inside Debug | Text sweeps, module coverage |

**Field Notes flow:** Open → pick category → optional steps-to-reproduce → auto snapshot → Copy JSON / Download `.json` → optional GitHub link with body prefilled.

**Debug Opposition lab** (extends current gap): set scandal meter, queue removal hearing, fire Supernatural Act, compromise member, clear agenda queue — so opposition bugs are reproducible without playing 20 weeks.

**Jordan:** Snapshot schema v1:

```js
{
  schemaVersion: 1,
  gameVersion: "1.0.0",
  exportedAt: ISO,
  environment: { userAgent, viewport, dev: boolean },
  session: { week, ap, money, adminScrutiny, view },
  students: [{ id, name, lbs, evolvedForm, supernaturalForm, hidden, flags }],
  opposition: { ...sanitized },
  ui: { activeModals: [], eventQueueLen },
  logTail: string[],
  errors: [{ message, stack, at }],
  playerNote: { category, steps },
}
```

Critique: student object must stay small — no full equip trees unless `verbose: true` dev flag. `GameErrorBoundary` should `componentDidCatch` and store `errorInfo.componentStack`. Reproduction presets in Debug: "Week 12 Investigation + AIB unlocked", "Supernatural Act triggered".

**Raven:** Field Notes categories get one line of flavor each in the modal. Snapshot export button: **"Seal the note"** (download). Copy: **"Transcribe to clipboard"**. Opposition debug is *backstage* — no Field Notes mention. When a hearing modal blanks, the log should auto-tag `[hearing]` so reports cluster.

**Alex:** Sold on schema v1. One addition: **last action** string — ProfessorSim pushes to `lastPlayerAction` on every `doClass`, `advanceWeek`, counter run. Reports without it are still useful; with it they're gold. Phase 1 ships boundary + Field Notes + opposition debug tab. Phase 2: save-slot attach, screenshot canvas hook, GitHub issue template.

---

## Round 3 — Refinement & Integration

**Jordan:** Implementation order:

1. `src/utils/errorRingBuffer.js` — init on app load  
2. `src/gameData/bugReport.js` — `buildGameSnapshot`, `downloadBugReport`, `copyBugReport`  
3. `src/components/GameErrorBoundary.jsx` — wrap `ProfessorSim` in `main.jsx`  
4. `src/components/BugReportModal.jsx` — player-facing Field Notes  
5. Extend `DebugPanel.jsx` — tabs: State | Opposition | Field Notes  
6. `ProfessorSim` — `lastPlayerAction`, log footer link, pass snapshot builder closure  

Lint: no PII fields. Cap log tail at 40 lines / 8KB.

**Alex:** Balance: Debug button stays low-opacity in production but Field Notes is *more* visible than debug — players should find it. Achievement unrelated. Opposition lab buttons need confirm for "Fire Supernatural Act" — irreversible mid-save.

**Raven:** Sample Field Notes header:

*"The archivist keeps every note. Week, weight, what you were doing when the world stuttered — so the next semester runs smoother."*

### Sample Prose — Error Boundary

The room doesn't disappear. Your students are still there, still hungry, still yours — but the scene catches, like a held breath.

*Something in the semester skipped a beat.*

Your progress remains. If the hiccup repeats, leave a Field Note. The archivist reads everything.

---

## Appendix — Phase 2 backlog

- Save slot attach (base64 compressed)  
- `npm run text:lint` hash in DEV snapshots  
- GitHub issue URL prefilled from `BUG_REPORT_TEMPLATE.md`  
- Screenshot via `html2canvas` opt-in  
- Playwright repro script generator from snapshot (stretch)
