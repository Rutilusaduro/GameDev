# Skill: Any Game — Re-Instantiating the Pack for a New Format, POV, or Premise

The pack's reference points (campus sim, weekly slots, a cast the player
feeds) are one instantiation, and everything load-bearing underneath is
format-blind. This skill is the translation layer: what never changes, how
each concept maps onto other game shapes, how POV restructures the prose
budget, and the intake that turns "I want a game about X" into the
artifacts the other skills consume. Run this FIRST for any game that isn't
a management sim about feeding a cast — then hand its outputs to the
protocol in `11`.

## 1. The invariant core (never translated, never dropped)

1. The loop: observe → invest → change → react → anticipate (`01` §1).
2. Ladders with named rungs; every crossing fires an event (`01` §2).
3. The coverage matrix: state-relevant content covers every applicable
   rung and tier (`04` §2).
4. State picks the words — prose that would read identically at any body
   size gets keyed or cut (`02` §8).
5. The voice contract and style ledger (`02`).
6. Anti-repetition and contradiction discipline, automated or manual
   (`04` §3, Manifesto).
7. The quality gates (`07`) and the flag-batch tuning loop.
8. The hard rules (pack README). Not translatable, not tunable.

If a proposed format genuinely can't host one of these, the design is the
problem — a game with no ladder is a gallery, no coverage is a game that
ignores its own fantasy, no gates is a slot machine. Redesign until the
core fits; it always fits.

## 2. Format translation table

Each Professor-Sim concept, its abstract role, and what fills that role in
five other format archetypes. The abstract-role column is the real
content; the archetype columns are worked examples, and a new format just
answers the same question.

| Sim concept | Abstract role | VN | Parser IF | Idle/incremental | RPG-lite | Chat RP |
|---|---|---|---|---|---|---|
| Week + action slots | Scarce, spendable time unit | Chapters; scene picks per chapter | Turns; a hunger clock | Tick budget; energy | In-game days; stamina | Scene budget per session |
| Weigh-in | The ritual where numbers are allowed | Recurring tailor / photo-shoot scene | WEIGH verb + one canonical scale room | Milestone screen with ceremony prose | Guild physical / quartermaster fitting | The measuring scene, player-invoked |
| Wardrobe fit states | State the body outgrows in stages | Sprite outfit tiers + strain beats | Worn-object states with per-state descriptions | Upgrade track ("replace the chair") | Armor/uniform refits as smith events | Described outfit carried in the facts dict |
| Campus | Public space where she is seen | Any recurring social set-piece | Rooms with size-aware exits and furniture | Ambient witness log lines | Towns, taverns, thrones | Wherever the scene is set — narrate witnesses |
| Cast of students | Bodies whose arcs interleave | Route heroines | NPCs met by exploration | Units/advisors with spotlight rotation | Party members | The RP's named characters |
| Money/meals economy | The cost curve her growth raises | Gift/date budget | Inventory and rations | The core numeric loop itself | Gold and provisions | Narrated scarcity, tracked lightly |
| Hunger interrupts | The world initiating at the player | Phone messages between chapters | NPC arrives at your location | Event popups | Random encounters, camp scenes | Her turn opens the scene |
| Ending matrix | Payoff keyed to final state × psych | Route endings | Endgame room text variants | Prestige/ascension epilogue | Epilogue slides | The closing scene, state-summarized |

Two structural notes:

- **Pure-branching formats** (kinetic VN, hand-authored Twine with no
  random pools): the engine's variety machinery maps to *conditional
  insert discipline* — fixed prose with state-keyed inserts at authored
  points, one insert set per rung band, same coverage matrix, dedupe by
  proofreading (`04` §3). The pools become spreadsheet columns; the laws
  survive the loss of the RNG.
- **Number-first formats** (idle/incremental): prose density inverts —
  hundreds of one-clause micro-renders instead of scenes. The lexicon
  (`09`) becomes the main deliverable and the exemplar bar applies to
  single clauses. Ceremony scenes at milestones carry the beats that
  need room.

## 3. The POV / subject matrix (who gains, who drives, who narrates)

The pack's default stance — player feeds, NPC gains, second-person
observer — is one cell. The others redistribute the prose budget; the
skills all still apply, aimed differently.

| Configuration | What changes |
|---|---|
| **NPC gains, player feeds** (default) | The pack as written. |
| **Player character gains** (self-gain) | Interiority becomes the primary channel: `03` §7's arc voice ladder is written for the PC and rendered in second person ("you catch yourself…"). Observation beats become self-observation — mirrors, photos, the reach of your own arms. The NPC reaction ecology (`03` §5) is promoted from garnish to the main witness layer: the world's reactions are how the player sees themselves. Choice architecture becomes self-negotiation — "just this once" is a button, denial is a *player-facing* option whose costs and pleasures both render. Persona pools become one deep PC-voice ladder plus NPC commentary pools. |
| **NPC feeder, player gains** | Power inversion: the dominant-as-care register (`10` §8) belongs to an NPC; refusal content (`01` §4) becomes the PLAYER's verbs and must always work — consent surfaces (`05` §5) move from nice-to-have to load-bearing, since the player is the one being led. Write the feeder with the attentiveness rule: their watching is the content. |
| **Mutual gain** | Two full arcs, one relationship. Contrast bodies/stances (`05` §1); comparison dimensions (relSize) earn their keep; scenes where each notices the other's change before their own. |
| **Many gain, player manages** | Spotlight rotation: full scene prose for one or two characters per time unit, ambient one-liners for the rest (the `08` §1 micro-render surfaces). Aggregate views need their own pools ("the hall eats louder than it did in autumn"). Staggered arcs (`01` §3) become the whole pacing system. |
| **The world does it** (curse, facility, magic) | The feeder's voice contract attaches to the mechanism — a curse has escalation logic, a machine has malfunction tiers (`05` §4's rules-lawyer note). Anticipation shifts from "will she say yes" to "what will it do next," so telegraph rules and let the player learn them. |

Pick ONE cell as primary at intake. Hybrids exist (a self-gain game with a
feeder NPC), and they inherit the requirements of every cell they touch.

## 4. The premise remap worksheet

Given any premise — space freighter, royal court, seaside bakery, monster
guild, corporate retreat — answer these nine; the answers seed the design
page, the beat families, and every pool brief:

1. **The institution:** what shared structure holds the cast together and
   generates recurring scenes? (The campus-analog.)
2. **The scarce resource:** what does the player spend? What does growth
   make more expensive?
3. **The ritual:** where do numbers get to be numbers? What ceremony
   frames them?
4. **The witness set:** which furniture, garments, vehicles, doorways,
   and instruments will testify to size? List ten; these are `word.*`
   material-sweep seeds (`09` §3).
5. **The providers:** who cooks, serves, procures, enables? (Food must
   come from somewhere the fiction respects.)
6. **The public/private line:** where is she seen, where is she alone?
   (Public beats and mirror beats need homes.)
7. **The seasonal texture:** what changes on the calendar-analog so time
   is felt? (Cargo runs, court seasons, tourist waves.)
8. **The ceiling's architecture:** at the top of the ladder, what does
   this world rebuild around her? (The endgame-systems seed, `06` §3.)
9. **The premise's own vocabulary:** twenty words this setting owns that
   no other setting would use. (The lexicon's only-here head start.)

An answer of "none" to any of 1–8 is a design gap to fix now — the
worksheet is cheap; discovering the gap in wave 4 is not.

## 5. Rigor tiers (when there's no engine, or no code at all)

The gates scale down; they never disappear. Coverage, the ledger, and the
hard rules apply at every tier — only the automation depth changes.

| Tier | Project shape | Machinery | Gates |
|---|---|---|---|
| 0 | RP prompt pack / one-shot scenario for an LLM | Voice contract + hard rules + 2–3 exemplars from `10` + a facts list maintained in-chat + the ladder as a stage table | Self-review ritual (`11` §5) run conversationally; ledger grep by eye |
| 1 | Twine / Ren'Py / small hand-coded game | Descriptor functions, variant arrays, per-scene facts dict (`04` §3); conditional-insert discipline (§2) | Manual protocols (`07` §3) per release; grep scripts for the ledger |
| 2 | Anything bigger, or anything meant to grow | The full engine per the Manifesto | Automated gates (`07` §2) |

Tier rule of thumb: the moment you catch yourself writing the same
descriptor switch a third time, you've outgrown tier 1 — the Manifesto
engine costs an afternoon and repays it the same week.

## 6. The intake (run before phase 0; the answers ARE the owner questions)

Twelve questions. Ask the owner what they care about; propose defaults for
the rest and mark them reversible. The completed intake is the sign-off
artifact `11` §6 requires.

1. Format archetype (§2 table — or describe a new one and fill its
   column).
2. POV/subject configuration (§3 — pick the primary cell).
3. Premise, tone, and era — then run the §4 worksheet.
4. Cast size (1 to many) and whether the player character has a body in
   play.
5. Ladder: how many rungs, and what the ceiling IS (immobility? beyond?
   something premise-specific?).
6. Kink palette, 2–4 modes (`05` §1), and the heat ceiling.
7. Time structure and the scarce resource.
8. Rigor tier (§5) and target scope (jam game / full build / living
   project).
9. Art: none, portraits, sprite tiers? (Prose granularity fills whatever
   art can't — `08` §5.)
10. Endings shape: matrix axes, or open-ended with prestige.
11. Anything the owner bans or requires beyond the hard rules.
12. Confirm the hard rules verbatim. Every character an adult, always —
    whatever the premise, whatever the format.

**Deliverables derived from the intake** (produce all six before writing
any content): the one-page design (`01` §8) · cast sheets (`03`) · the
renamed beat-family list with a coverage matrix skeleton (`04` §1–2) ·
the ladder with per-rung promises in premise vocabulary · the first ten
pool briefs (`09` §2) seeded from worksheet answers 4 and 9 · `STATE.md`
initialized (`11` §8).

## 7. Worked micro-example (the table in motion)

"Player-character gain, parser IF, deep-space salvage tug, solo cast, tier
2." Intake yields: time unit = salvage runs; ritual = the airlock's mass
readout (the ship is the scale); witness set = pressure suit, pilot
couch, maintenance crawlways, the galley hatch; providers = the ship's
fabricator, whose portion logic drifts generous (the world-does-it cell,
secondary); public/private = docking stations vs. the empty ship; ceiling
architecture = the tug refitted around its pilot, station engineers
politely not asking. Beat families rename to: cockpit portrait, galley,
readout ritual, suit-fit, dockside, fabricator interrupts, refit events,
run epilogues. The pack applies from there without further translation —
which is the point of this file.
