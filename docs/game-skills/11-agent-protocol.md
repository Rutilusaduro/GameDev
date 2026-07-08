# Skill: Agent Protocol — Running a Whole Game Build as an AI Agent

The other skills say what good looks like; this one says how an agent
actually gets there across dozens of sessions without drifting, bloating,
or shipping unreviewed prose. It generalizes the production repo's
seven-agent Squad into portable roles any model can rotate through. Follow
it whether you're one model doing everything or an orchestrator spawning
specialists. For a game whose format differs from the reference sim —
different POV, no weeks, no engine — run the intake in `12-any-game.md`
first; this protocol is format-blind and consumes what the intake produces.

## 1. The role wheel

Never draft and approve in the same breath. Every piece of work has a lead
seat and passes through the two gates (Artisan, then Editor). Seats are
prompts, worn one at a time — announce the switch in the transcript, and
restate the seat's gate checklist from its card when you sit down (cheap
re-priming that measurably reduces role bleed).

| Seat | Owns | Never does |
|---|---|---|
| **Designer** | The one-page design, ladders, economy, palette, ending matrix | Prose |
| **Architect** | Engine, setting pack, dimensions, shell wiring, lint pack | Prose; content decisions |
| **Casting** | Cast sheets, voice contracts, arc voice ladders | Scene writing |
| **Author-Early** | Ladder bottom: subtlety, firsts, denial-era beats | Approving own drafts |
| **Author-Mid** | Ladder middle: momentum, lifestyle, being-seen beats | Approving own drafts |
| **Author-Ceiling** | Ladder top: scale, logistics-as-devotion, awe | Approving own drafts |
| **Author-Psyche** | Interior arc + dialogue registers across ALL bands | Approving own drafts |
| **Artisan** | Line-level rewrite gate on every draft | Structural sign-off |
| **Editor** | Structural gate: shapes, coverage, lint, ledger | Rewriting what it just gated |
| **Reader** | Adversarial QA, flag batches, playthrough tests | Fixing what it flags |

Minimum cycle for any content batch: **Author → Artisan → Editor.** The
Reader runs per release, and after every wave for the first three waves.

## 2. Role cards

Each card: mission, what it reads before working, what it produces, its
gate, and an instantiation prompt an orchestrator can paste verbatim into a
subagent (or a solo agent can paste into its own transcript as the seat
switch). Prompts assume the pack files are in context.

### Designer

- **Mission:** a game a player can want things in. Loop, scarcity,
  thresholds, endings.
- **Reads:** `01`, `05`, `06`, the `12` intake answers.
- **Produces:** the one-page design; the ladder with per-rung one-line
  promises; the ending matrix axes.
- **Gate:** the `01` §1 design test — at any moment the player can name
  what they're working toward and what they'll see when they get there.
- **Prompt:** "You are the Designer. Using the intake answers and skills
  01/05/06, produce the one-page design per 01 §8. Every rung of the
  ladder gets a one-line promise a player would anticipate. Flag any
  intake answer that makes the loop unworkable rather than designing
  around it silently. No prose, no scene writing."

### Architect

- **Mission:** machinery that never surprises an author. Engine verbatim,
  setting pack, lint pack, shell wiring.
- **Reads:** the Manifesto (IV, V, VII, VIII), `08`; the design page.
- **Produces:** running engine + smoke pass; setting pack; lint pack with
  grid, sweeps, coverage spec; shell integration per `08`.
- **Gate:** smoke all-green; a deliberately planted defect caught by the
  harness; wiring smells table (`08` §9) clean.
- **Prompt:** "You are the Architect. Build/extend the machinery per the
  Manifesto and skill 08. Copy the reference engine verbatim — new engine
  mechanisms require a tuning flag that demands them, and every mechanism
  ships with a permanent self-check the same day. You do not write or
  judge prose."

### Casting

- **Mission:** a cast whose members cannot be confused with each other on
  a name-stripped page.
- **Reads:** `03`, `05`; the design page.
- **Produces:** cast sheets (`03` §1), voice contracts, 6-beat arc voice
  ladders, the NPC reaction ecology.
- **Gate:** no two mains share archetype AND body type; each stance has a
  findable lever; the three arc lines (stance/psych/weight) don't move in
  lockstep for anyone.
- **Prompt:** "You are Casting. Produce cast sheets and voice contracts
  per skill 03 for the agreed cast size. For each main, plot stance,
  psych, and body trajectories across the game's timeline and mark where
  the lines cross — those crossings are scene obligations you hand to the
  Authors. No scene prose."

### The four Authors

Shared rules: read the beat family's pool briefs (`09` §2), the relevant
cast sheets, and TWO exemplars from `10` before drafting; produce variants
2× the floor knowing half die in curation; mark every line that assumes
state with the fact/gate it assumes. Split by register so different parts
of the ladder are written in deliberately different keys:

- **Author-Early** — restraint. Small numbers, huge attention; the body
  whispers. Firsts are sacred: first notice, first excuse, first private
  pleasure. If a line would still work at mid-ladder, it's not early
  enough. *Prompt:* "You are Author-Early. Draft for the bottom ladder
  band only. Understate: evidence over verdicts, one detail per beat,
  denial written as behavior. Every draft line lists the stance/psych
  gate it needs."
- **Author-Mid** — momentum. The world starts answering: furniture,
  wardrobe, logistics, other people. Physics carries the eroticism.
  *Prompt:* "You are Author-Mid. Draft for the middle bands. Every beat
  names a thing in the world that responds. No line may read true at any
  other band — run the only-here test before submitting."
- **Author-Ceiling** — awe. Architecture, attendance, sovereignty in
  stillness. Verbs of position and command, never deficit. *Prompt:* "You
  are Author-Ceiling. Draft for the top bands. Her agency leads every
  beat; scale reads through environment and ritual. The hard rules on
  decline framing bind absolutely — presence, never loss."
- **Author-Psyche** — the through-line. Interior beats, dialogue
  registers, the corruption/stance arc at every band; owns that a tier-0
  mind and a tier-3 mind never pull the same words. *Prompt:* "You are
  Author-Psyche. Draft interior and dialogue content across all bands,
  keyed to the psych axes and each character's earned register per the
  cast sheet. Persona lines land at emotional peaks; trait-keyed generics
  carry the connective tissue."

### Artisan

- **Mission:** every line makes sense read aloud, in isolation and in
  composition, and sounds like a person wrote it on purpose.
- **Reads:** the draft batch COLD (separate session or after unrelated
  work), `10`'s diagnosis bullets, the style ledger.
- **Produces:** the rewritten batch, preserving `when` keys, shapes, and
  facts; a note per rejected line saying why (rejects feed `09` §7's cut
  list).
- **Gate:** read-aloud pass; no asserted conclusions where evidence could
  stand; no engine labels; flourish budget respected (one per passage).
- **Prompt:** "You are the Artisan. Rewrite this draft batch line by line
  for sense, flow, and register. You may not change what a line asserts,
  its selector keys, or its declared shape. Kill or rewrite any line
  you'd wince at reading aloud. You are the last hands on the words."

### Editor

- **Mission:** the structure holds: shapes consistent, pools never
  silent, coverage complete, harness green.
- **Reads:** the Artisan-passed batch; the coverage matrix; the lint pack.
- **Produces:** the merge decision; updated coverage matrix; new lint
  entries for anything caught by hand.
- **Gate:** the `07` §2 automated gates plus counted (not assumed)
  coverage; every hand-caught bug becomes a harness entry the same day.
- **Prompt:** "You are the Editor. Gate this batch structurally: shape
  contracts, wildcard fallbacks, coverage counts per applicable rung and
  tier, lint until clean. You may reject; you may not rewrite. A bug you
  find by hand isn't fixed until the harness would catch its siblings."

### Reader

- **Mission:** break it the way a player would.
- **Reads:** nothing but the game — that's the point. State grid + seed
  panel access.
- **Produces:** flag batches in the Manifesto Part IX format (beat, full
  state, seed, text, per-slot notes); playthrough reports (`07` §3).
- **Gate:** flags carry reproduction state or they're anecdotes.
- **Prompt:** "You are the Reader. Roll the listed beats across hostile
  states — corners of the grid, mid-scene state changes, repeated visits
  in one event. Flag anything that reads wrong, contradicts state, or
  repeats; capture beat, full state, seed, and per-slot notes. Do not
  propose fixes."

## 3. Build phases (each ends verified, or it didn't happen)

| Phase | Work | Read first | Done when |
|---|---|---|---|
| 0 | Intake (`12` if format differs from the reference) + one-page design + cast + palette + hard-rule check | `12`, `01`, `03`, `05` | Owner signs the page (see §6) |
| 1 | Engine + morphology, verbatim | Manifesto IV, VIII | smoke passes all checks |
| 2 | Setting pack: ladders, deriver, dimensions, identity modules | Manifesto V | probe renders differ per rung |
| 3 | Lexicon first wave + lint pack | `09`, Manifesto VI–VII | lint clean; planted defect caught |
| 4 | Vertical slice: ONE beat family, full ladder + psych coverage, wired into the shell | `04`, `08`, `10` | slice playable; 20-render review passes |
| 5 | Content waves, one beat family per wave, by render frequency | `02`, `04`, `10` | per-wave gates (`07` §2–3) |
| 6 | Systems depth as content demands it | `06` | endgame has ≥3 live systems |
| 7 | Release gates + tuning loop forever | `07` | flag batches come back boring |

The vertical slice (phase 4) is the anti-drift device: it proves engine,
lexicon, shell, and voice agree before volume production starts. Skipping
to volume is the most expensive mistake an agent makes. (No-engine
projects skip phases 1–3 and substitute the rigor tier from `12` §5;
everything else stands.)

## 4. Session discipline

- **Open every session the same way:** re-read the one-page design, the
  style ledger, and `STATE.md` (§8). Long builds die of forgotten
  context, and an agent's context is per-session by definition.
- **One wave, one session** where feasible. A session that half-finishes
  two families leaves two gap-riddled matrices no one remembers.
- **Lint clean between sessions, no exceptions.** A red harness at
  session start means archaeology instead of authoring.
- **Separate drafting from gating in time, personas, or both.** The
  Artisan pass on a cold read catches what the Author's context-warm read
  cannot. Solo agents: draft the batch, do unrelated work (wire a
  dimension, update STATE.md), then return in the Artisan seat.
- **Calibrate before writing:** two exemplars from `10` in the target
  beat family, every time.
- **Peak beats get best-of-three.** Rung crossings, firsts, endings, and
  persona lines at emotional peaks: draft three independent versions
  (fresh attempt each, no peeking), then pick as the Artisan against the
  `10` bar. Connective tissue doesn't earn this; peaks always do.

## 5. Self-review ritual (per content batch)

1. Read every line aloud (Artisan). Stumble = rewrite.
2. Diagnosis sweep from `10`: hunt asserted conclusions, name-drumming,
   telepathy, adjective piles; convert to staged evidence.
3. Ledger + clinical grep (`02` §3), plus this pack's hard rules.
4. Shape/fallback/coverage counts (Editor), then lint until clean.
5. Sample renders at the four corners: lowest rung × lowest psych, lowest
   × highest, highest × lowest, highest × highest — plus two mid-band
   rolls. Read them as a player; file failures as flags; fix by class;
   re-render.

## 6. Asking the owner (batch it, then build)

Decisions an agent must not make silently: kink palette and heat ceiling;
cast size and any character's core identity; ladder length and the
ceiling's nature; POV and who-gains structure (`12` §3); art/asset
commitments; anything touching the hard rules. Collect these into ONE
question list at phase 0 — the `12` intake IS that list — and get
sign-off. Mid-build, only escalate when a decision would rewrite shipped
content; otherwise pick the reversible option, record it in `STATE.md`
under "decisions taken, reversible," and keep moving.

## 7. Scaling up (multi-agent builds)

Split by beat family, never by file — two agents in one family duplicate
imagery and fight over pool briefs. Every worker inherits: the one-page
design, the cast sheets for its characters, its families' pool briefs,
the ledger, and the two relevant exemplars. Merges go through one Editor
pass — quality gates don't parallelize.

**Parallel review, by seat.** For large passes, spawn reviewers with these
one-line briefs (each returns flags, not edits):

| Reviewer | Brief |
|---|---|
| Author-Early seat | "Does bottom-band content understate? Any line that would survive at mid-ladder?" |
| Author-Mid seat | "Does the world answer her at these bands — furniture, clothes, strangers? Physics concrete?" |
| Author-Ceiling seat | "Top-band content: agency and architecture, or deficit framing leaking in?" |
| Author-Psyche seat | "Registers earned? Tier-0 and tier-3 pulling different words? Persona lines in-voice?" |
| Artisan seat | "Read aloud: sense, flow, flourish budget, no engine labels." |
| Editor seat | "Shapes, fallbacks, coverage counts, ledger grep, lint." |
| Reader seat | "Corner states + repeat visits: contradictions, echoes, wrong-register leaks." |

**Disagreement protocol:** the harness arbitrates facts (coverage, lint,
contradictions); the Editor arbitrates structure; the Artisan arbitrates
the line; `10` arbitrates taste. When taste still ties, the flatter line
wins — flourishes are a budget.

## 8. Templates

`STATE.md` — created at phase 0, updated as the last act of every session:

```
# STATE
phase: 5 (content waves)
current wave: wardrobe (started <date>, Author-Mid lead)
coverage: portrait FULL · dialogue FULL · meals rungs 0-8 (9+ N/A'd: <why>)
          wardrobe GAP rungs 2,7 · interrupts NOT STARTED
harness: clean as of <commit>
flags open: 3 (see flags/)
decisions taken, reversible: booth scenes assume bench seating (swap-safe)
awaiting owner: none
next: close wardrobe gaps, then Reader pass on waves 1-3
```

Wave plan — one per content wave, five lines: family; rungs and tiers in
scope; pool briefs touched (`09` §2); persona obligations (from Casting's
crossing map); exit gates. If a wave plan needs more than five lines, the
wave is too big.

## 9. Failure modes of agent-built games (check yourself against these)

| Failure | Smell in the output | Root cause | Fix |
|---|---|---|---|
| Quota prose | Pools full of grammatical, forgettable variants | Author seat run without calibration or curation | `10` before writing; generate 2×, cut half (`09` §7) |
| Convergent cast | Every character witty in the same key by mid-game | Voice contracts unread after phase 0 | Re-read contract before any persona batch; attribution test per wave |
| Coverage theater | Matrix full, but banded variants are the wildcard reworded | Counting entries instead of reading them | Corner renders (§5.5); only-here test per band (`09` §1) |
| Register flattening | Early band reads like mid band with smaller numbers | One Author seat writing the whole ladder | Band-split Author seats; the "would it survive at mid-ladder" review |
| Engine gold-plating | Session budget spent on resolver features no pool uses | Architect seat left running unsupervised | The Manifesto engine is finished; new mechanisms need a flag that demands them |
| Ledger rot | Old tells creep back in wave 6 | Ledger read at phase 0, never again | Ledger grep is per-batch, automated, in the harness |
| Silent scope creep | New families, axes, kinks appearing mid-wave | Skipping §6 batching | STATE.md decision log reviewed at session open |
| Seat bleed | Editor "just fixing" lines; Author self-approving | Switching seats without re-priming | Restate the seat's gate checklist on every switch (§1) |

## 10. The standing order

Ship the smallest verified thing, log the state, and let the harness —
never your own satisfied re-read — tell you it's good. An agent that
trusts its gates outproduces one that trusts its taste, and the player
only ever meets the output.
