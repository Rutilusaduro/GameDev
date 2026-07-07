# Skill: Agent Protocol — Running a Whole Game Build as an AI Agent

The other skills say what good looks like; this one says how an agent
actually gets there across dozens of sessions without drifting, bloating,
or shipping unreviewed prose. It generalizes the production repo's
seven-agent Squad into portable roles any model can rotate through. Follow
it whether you're one model doing everything or an orchestrator spawning
specialists.

## 1. The role wheel

Never draft and approve in the same breath. Every piece of work has a lead
role and passes through the two gates. Roles are prompts, worn one at a
time — announce the switch to yourself in the transcript.

| Role | Owns | Never does |
|---|---|---|
| **Designer** | The one-page design (`01` §8), ladders, economy, palette (`05`), ending matrix | Prose |
| **Architect** | Engine build (Manifesto), setting pack, dimensions, shell wiring (`08`), lint pack | Prose; content decisions |
| **Casting** | Cast sheets, voice contracts, arc voice ladders (`03`) | Scene writing |
| **Author(s)** | Domain prose drafts — split by ladder band (early / mid / ceiling) and by beat family, so early-game restraint and ceiling-scale awe are written in different registers on purpose | Approving own drafts |
| **Artisan** | The mandatory rewrite pass: every draft line reread aloud for sense, flow, register; gimmicks pushed into dialogue; stage labels purged | Structural sign-off |
| **Editor** | The structural gate: shapes, fallbacks, coverage counts, lint clean, ledger grep, sample renders | Rewriting content it just gated |
| **Reader** | Adversarial QA: rolls samples at hostile states, flags per `07` §3, runs the three-playthrough test | Fixing what it flags |

Minimum cycle for any content batch: **Author → Artisan → Editor.** The
Reader runs per release, and after every wave for the first three waves.

## 2. Build phases (each ends verified, or it didn't happen)

| Phase | Work | Read first | Done when |
|---|---|---|---|
| 0 | One-page design + cast sheets + kink palette + hard-rule check | `01`, `03`, `05` | Owner signs the page (see §5) |
| 1 | Engine + morphology, verbatim | Manifesto IV, VIII | smoke passes all checks |
| 2 | Setting pack: ladders, deriver, dimensions, identity modules | Manifesto V | probe renders differ per rung |
| 3 | Lexicon first wave + lint pack | `09`, Manifesto VI–VII | lint clean; planted defect caught |
| 4 | Vertical slice: ONE beat family, full ladder + psych coverage, wired into the shell | `04`, `08`, `10` | slice playable; 20-render review passes |
| 5 | Content waves, one beat family per wave, by render frequency | `02`, `04`, `10` | per-wave gates (`07` §2–3) |
| 6 | Systems depth as content demands it | `06` | endgame has ≥3 live systems |
| 7 | Release gates + tuning loop forever | `07` | flag batches come back boring |

The vertical slice (phase 4) is the anti-drift device: it proves engine,
lexicon, shell, and voice agree before volume production starts. Skipping
to volume is the most expensive mistake an agent makes.

## 3. Session discipline

- **Open every session the same way:** re-read the one-page design, the
  style ledger, and `STATE.md` (below). Long builds die of forgotten
  context, and an agent's context is per-session by definition.
- **Keep `STATE.md` live** at the project root: current phase, coverage
  matrix status (family × rung × tier, filled / N-A / gap), open flags,
  decisions made with owner sign-off, next wave. Update it as the last
  act of every session — it is the handoff to your next self.
- **One wave, one session** where feasible. A session that half-finishes
  two families leaves two gap-riddled matrices no one remembers.
- **Lint clean between sessions, no exceptions.** A red harness at session
  start means archaeology instead of authoring.
- **Separate drafting from gating in time, personas, or both.** The Artisan
  pass on a fresh read catches what the Author's context-warm read cannot.
  If you're a single model in a single session, write the batch, do
  unrelated work (wire a dimension, update STATE.md), then return in the
  Artisan role.
- **Calibrate before writing:** two exemplars from `10` in the target beat
  family, every time. Cheap, and it measurably raises the floor.

## 4. Self-review ritual (per content batch)

1. Read every line aloud (Artisan). Stumble = rewrite.
2. Diagnosis sweep from `10`: hunt asserted conclusions, name-drumming,
   telepathy, adjective piles; convert to staged evidence.
3. Ledger + clinical grep (`02` §3), plus this pack's hard rules.
4. Shape/fallback/coverage counts (Editor), then lint until clean.
5. Sample renders at the four corners: lowest rung × lowest psych, lowest
   × highest, highest × lowest, highest × highest — plus two mid-band
   rolls. Read them as a player, then file what fails as flags, fix by
   class, re-render.

## 5. Asking the owner (batch it, then build)

Decisions an agent must not make silently: kink palette and heat ceiling;
cast size and any character's core identity; ladder length and the
ceiling's nature (immobility? beyond?); art/asset commitments; anything
touching the hard rules. Collect these into ONE question list at phase 0
and get sign-off. Mid-build, only escalate when a decision would rewrite
shipped content — otherwise pick the reversible option, record it in
`STATE.md` under "decisions taken, reversible," and keep moving.

## 6. Scaling up (multi-agent builds)

When spawning parallel workers: split by beat family, never by file — two
agents in one family duplicate imagery and fight over pool briefs. Every
worker inherits: the one-page design, the cast sheet for its characters,
its families' pool briefs (`09` §2), the ledger, and the two relevant
exemplars. Merges go through one Editor pass — quality gates don't
parallelize. The lint harness is the only arbiter two agents both trust;
when outputs disagree with each other stylistically, the exemplar gallery
decides, and if it can't, the flatter line wins (flourishes are a budget,
`10` §10).

## 7. Failure modes of agent-built games (check yourself against these)

| Failure | Smell in the output | Root cause | Fix |
|---|---|---|---|
| Quota prose | Pools full of grammatical, forgettable variants | Author role run without calibration or curation | `10` before writing; generate 2×, cut half (`09` §7) |
| Convergent cast | Every character witty in the same key by mid-game | Voice contracts unread after phase 0 | Re-read contract before any persona batch; attribution test per wave |
| Coverage theater | Matrix full, but banded variants are the wildcard reworded | Counting entries instead of reading them | Corner renders (§4.5); only-here test per band (`09` §1.3) |
| Engine gold-plating | Session budget spent on resolver features no pool uses | Architect role left running unsupervised | The Manifesto engine is finished; new mechanisms need a flag that demands them |
| Ledger rot | Old tells creep back in wave 6 | Ledger read at phase 0, never again | Ledger grep is per-batch, automated, in the harness |
| Silent scope creep | New families, axes, kinks appearing mid-wave | Skipping §5 batching | STATE.md decision log reviewed at session open |

## 8. The standing order

Ship the smallest verified thing, log the state, and let the harness — never
your own satisfied re-read — tell you it's good. An agent that trusts its
gates outproduces one that trusts its taste, and the player only ever meets
the output.
