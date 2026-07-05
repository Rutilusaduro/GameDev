# Expansion Plan: 20 Ideas + The Ascension System

Design session output. Twenty ideas to radically expand Professor Sim:
two for character creation (Part A), three for UX (Part B), five for
midgame (Part C), and a ten-step implementation plan for the endgame
**Ascension system** (Part D) — every girl, at max size, transforms into a
supernatural form reborn at 100 lbs with new mechanics, abilities, events,
and dialogue. Part E is the full 18-girl form roster with per-girl event
chains that extend each girl's existing evolved-form arc.

House rules bind everything here: adults only, consensual fantasy, no
health-consequence framing, size desirable throughout, engine labels never
in prose.

---

## Part A — Character creation (2)

### A1. The Nineteenth Chair (player-built student)

One custom student, built at semester start from the systems the cast
already runs on: archetype (new or existing), bodyType, gain stance, psych
axis starting tiers, voice contract (pick 5 owned phrases + 1 taboo topic
from curated lists — freeform text can't be persona-pooled), wardrobe
identity, and — once Ascension ships — her eventual form. Mechanically she
is data, not code: trait-keyed generics already cover her everywhere;
creation assembles a starter persona kit (2 lines per corruption tier per
major slot) from template families keyed to the voice picks. The Dossier
(B1) tracks her like anyone else. Payoff: replay identity, and proof the
content architecture really is data-driven — if the Nineteenth Chair needs
special-case code anywhere, that's a lint-worthy architecture bug.

### A2. Origin decks (pickable backstories, replay divergence from week 1)

Each girl gets 2–3 origin cards shown at first meaningful contact
(Brittany: "ex-gymnast under a hard coach" vs "pageant-circuit legacy";
Maya: "moved every two years" vs "eight siblings, loud house"). A card
sets starting psych tiers, one exclusive early event chain, one standing
dialogue register tweak, and re-seeds her arc voice ladder's beat 1. Cost
is bounded: an origin is a `when` dimension (`origin`) plus ~a dozen keyed
variants per girl, not a parallel script. Two runs with different origin
picks read differently at stage 0, which is exactly where replays are
currently most samey.

---

## Part B — UX (3)

### B1. The Dossier (per-girl living journal)

One screen per girl that turns save state into story: weight line graph
with rung-crossing markers, psych trajectories drawn as bands, pinned
moment cards from persistent flags ("the booth incident — week 9"), her
diary excerpts inline, wardrobe casualty list, and — front and center —
the **next threshold panel**: pounds to the next rung, garment closest to
failure, psych tier in motion. The genre's engine is anticipation; today
that lives in the player's head. The Dossier makes it a place you visit.

### B2. Scene stage (presentation layer for the text engine)

Scenes currently arrive as blocks. Present them as beats: paragraph-level
reveal on tap/keypress, a slim state header (locale, week, her silhouette
chip at current stage), choice buttons carrying intent icons (observe /
press / feed / wait) so menus read as stances, and a scrollback drawer.
One renderer component, driven by the beat structure scenes already have;
`opts.trace` even tags which spans came from which slot for the dev
overlay. Biggest perceived-quality win per line of code on the mobile
build.

### B3. Week planner + week-in-review

Planning: a slot board you drag girls onto, with each slot showing
predicted cost (her appetite raises meal prices — surface it), scheduling
conflicts, and interrupt likelihood ("Destiny is at hunger 3 — expect a
knock"). Review: end of week, a short reel of delta cards — pounds gained
per girl, thresholds crossed, garments lost, psych shifts — each card
tappable into its Dossier moment. Closes the loop the design bible
promises: invest → change → SEE the change → plan the next one.

---

## Part C — Midgame (5)

### C1. Rivalry & pact webs (girl↔girl relationships)

A sparse girl-to-girl relation graph — rival, partner-in-gain, mentor,
orbit — that generates two-subject scenes from existing machinery
(`ctx.ref` and `relSize` already exist; the engine was built for this).
Brittany×Serena leaderboard arcs, Kylie filming Tiffany's feasts, Nadia
quietly profiling whoever's growing fastest. Relations shift on shared
scenes and weigh-in deltas. Midgame's problem is that girls only relate to
YOU; this multiplies content quadratically without new systems.

### C2. Campus institutions (upgradeable venues as event generators)

Dining hall, gym, the pharmacist's clinic, a secret Gainers' Society, the
tailor's shop — each an institution with 3 upgrade tiers bought with money
+ time, each tier changing available scenes, prices, and NPC ecology
(reinforced booths unlock stage-8+ group dinners; the Society runs
initiation chains and monthly "records nights"). Institutions give midgame
money a destination, give the campus visible mass-response beyond the
existing `campusFattening` flag, and generate interrupts on their own.

### C3. Semester festivals (whole-cast setpieces on the calendar)

Four fixed setpieces a semester — harvest fair, midwinter formal (dress
fittings a week before: wardrobe drama at scale), spring eating invitational,
end-of-year showcase. Each renders the ENTIRE cast at current state into
one composed sequence: group portraits, cross-girl comparisons, public
rung ceremonies for whoever crossed that month. Festivals give the midgame
rhythm markers, force the interleaved-arc design to perform on stage, and
are the natural home of the genre's before/after echo.

### C4. Professor specialization tree (new verbs, not bigger numbers)

Three short branches — Nutritionist (custom meal plans: standing weekly
orders per girl), Researcher (studies with stipends: enroll girls, collect
data beats, publish for money + campus shifts), Patron (commissions:
tailor-made wardrobe, furniture, private venue nights). Each rank unlocks
a verb that changes what a time slot IS, not a multiplier. Picks are
per-run and gate distinct scene families, so midgames diverge by build.

### C5. Reputation & whispers (visibility as a managed resource)

A campus rumor state on two axes: how much is known, and how it's framed
(discreet benefactor ↔ open legend). Choices in public beats move it;
girls' stances filter it (secret-stance girls avoid you at high notoriety;
eager ones seek you out — interrupt generation keyed on reputation).
High-knowledge states unlock petitioner events: girls you've never fed
knocking. Midgame stops being a pure resource loop and becomes about how
loudly you operate.

---

## Part D — The Ascension System (endgame): 10-step implementation plan

**The fantasy:** a girl who reaches the top of the mortal ladder (stage 11
— the ladder has been labeled *ascension* since the stage table was
written) doesn't stop; she transcends. A ceremony fires, and she is reborn
in a supernatural form at 100 lbs — a mermaid, a valkyrie, a dryad — with
her memories, her voice, her relationship with you, and a brand-new gain
cycle governed by form mechanics: abilities, essence, form events, and a
final apotheosis at cycle-2 stage 11. Every existing system (appetite,
wardrobe, furniture, economy, interrupts, dialogue) keeps running,
reflavored per form. The endgame becomes: guide the whole cast through
ascension and reshape the campus into something mythic.

Each step is a shippable increment with its own verify gate, per the
repo's build discipline (lint clean → eslint → build → Dialogue Lab pass).
The Squad owns it as a ninth workstream: A4 Architect steps 1–3, A2 Psych
+ A7 Artisan on ceremony/dialogue content, A5 Editor gates every step, A1/
A3 supply stage-band prose in the new cycle, A6 owns cycle-2 stages 0–4
(the "slender again, but changed" register — her old early-game content
must NOT fire; she remembers being a leviathan).

### Step 1 — Design lock (data before prose)

Write `docs/ASCENSION_DESIGN.md` freezing: the 18-form roster (Part E),
trigger rule, rebirth transaction, the essence economy, ability count (3
per girl), event chain shape (3 beats + 1 interrupt family each), and
explicit NON-goals for v1 (no form-vs-form combat, no new stage ladder, no
player ascension). Add the Squad ownership row. **Verify:** doc reviewed
against every hard rule in `docs/game-skills/00`; every Part E ability
maps onto an EXISTING system hook (appetite/wardrobe/economy/interrupt/
psych) — any ability needing a brand-new system gets cut or redesigned
now.

### Step 2 — State plumbing & save shape

`student.ascension = null | { formId, cycle: 2, ascendedWeek, peakLbs,
essence, abilities: {unlocked:[], cooldowns:{}}, formFlags: {} }`.
Derivations in `textContext.js`: `formId`, `isAscended`, `essenceTier`
(0–3 ladder), `auraTier` (public-manifestation intensity). The generalized
`when` rule makes all of these instantly selectable — no engine edits.
Stage derivation unchanged: cycle 2 reuses the 12-stage ladder on her
reset lbs (massive content reuse; every stage-banded system keeps
working). Save version bump + migration (old saves get `ascension: null`).
**Verify:** node probes render existing scenes for an artificially
ascended girl with zero new content — nothing crashes, wildcards carry it;
save round-trips at 3 states; `text:lint` clean.

### Step 3 — The threshold and the ceremony

Eligibility: stage 11 + corruption tier 2 + relationship ≥ Devoted + her
personal catalyst (a per-girl flag from her evolved-form arc — Part E; the
ceremony is the crown of the arc she already has). Two-week buildup: a new
interrupt family (`asc.stirring.*`) — strange appetite, dreams, the form
bleeding through. Then the ceremony scene: skeleton framework
(`asc.ceremony.arrival/turn/emergence/first Words`) with per-girl persona
files carrying the emergence beat — this is THE persona showcase, budget
like an ending. The rebirth transaction: store `peakLbs`, set lbs 100,
archive wardrobe (garments become **relics** — callback items), keep all
world flags and relationship state, set `ascension`. Player consent
surface: ascension fires only on player confirmation at the ceremony
choice ("she's asking you to see this through") — it's the point of no
return for that girl. **Verify:** ceremony sweep across 18 girls ×
corruption/mood grid; continuity gate — post-rebirth renders never
describe leviathan-scale body outside designated memory/callback slots
(fact `asc.reborn` + `forbids` on old-scale fragments); lint clean.

### Step 4 — Form prose foundation (the word layer)

Form overlays on the core lexicon via `registerModuleVariants`:
`word.size`, `word.body`, `word.moveVerb`, `word.adv.*` gain
formId-keyed variant groups (a mermaid at stage 6 is "heavy in the water's
hands"; a dragon's gain goes to haunch and hoard-belly and wing-root).
New beat family `asc.portrait.*` (the observation family for ascended
girls). Coverage law applies in full: form content is weight-related, so
**every form × every applicable stage band** — enforce via a new
`ascended` coverage band in `text-lint.config.js` (probes stages 0–11 ×
formId). Slender-again register: cycle-2 stages 0–4 keyed `isAscended` so
A6's mortal early-game content can't leak (she is small; she is not
uncertain). **Verify:** `--coverage` ascended band ≥80% climbing to 100 by
step 10; stem gate holds at ≤1%; sample renders per form read distinct.

### Step 5 — Essence and abilities framework

One resource, **essence**: earned when she gains in-form, when her
catalyst activity runs (Part E), and at rung crossings; her essence word
itself is a pool (`word.essence` keyed formId — brine, ichor, gleam,
sap...). Abilities: a data table (`gameData/ascension/abilities.js`) —
`{ id, formId, name, essenceCost, cooldownWeeks, hook, params }` where
`hook` is one of a fixed set the game loop already exposes:
`appetiteMod`, `feedEvent`, `economyMod`, `interruptSpawn`, `psychNudge`,
`wardrobeEvent`, `campusMod`. Three per girl (54 total), each with a
rendered beat (`asc.ability.<id>`). UI: essence meter + ability buttons on
her card, disabled states explained in-fiction. **Verify:** a script
sweeps all 54 abilities — fire, assert the state delta matches `params`,
assert the beat renders clean; lint sweep includes ability templates.

### Step 6 — Form gain loops (the second climb feels different)

Per-form gain modifiers as data on the weekly tick + form-specific gain
events: the mermaid's weight is graceful in water and monumental on land
(dual-context prose; tank capacity ladder as her furniture system); the
dragon converts hoarded wealth to mass on a schedule; the dryad grows
with her grove (planting events bank future gain); the djinn gains when
wishes are granted. Implemented as `FORM_GAIN_RULES` consumed by the
existing gain system — no second engine. Cycle-2 pacing: faster early
rungs (she knows how to do this), gated late rungs behind essence — the
slow-burn contract, inverted then restored. **Verify:** 20-week simulated
runs per form land inside design curves (script asserts bounds); no
interaction breaks the mortal girls' tick; lint.

### Step 7 — Form event chains and interrupts (the content mass)

Per girl: a 3-beat signature chain (Part E) in `asc.<girl>.*` pools, one
form interrupt family, and callbacks that pay off pre-ascension flags
(the office chair Brittany broke is bronzed in the trophy case; the
doorframe that taught Maya is now inside her grove's arch). Persona lines
mined from each girl's evolved-form arc so the ascended voice is
continuous with the career voice she built. Every chain wired into the
Dialogue Lab SECTIONS. Volume floors apply (wildcard ≥4, keyed ≥3,
persona ≥2/tier). **Verify:** `--volume` on `asc.` namespaces; flag-batch
tuning per chain until a batch comes back boring; ledger grep.

### Step 8 — Cast ecology (ascended among mortals)

Reactions: mortal girls react to an ascended girl per stance × her
`auraTier` (a secret-stance girl confides in the dryad; a rival trains
harder under a valkyrie's eye); ascended react to each other (a
`refForm` dimension mirrors `refArchetype`). Group scenes: festival
setpieces (C3) get ascended variants; two-form encounter pools for
high-affinity pairs (mermaid × selkie/Melusine water-court beats; hearth
× harvest joint feasts). Campus adaptation tiers: shrine, aquarium hall,
the grove, the hoard-vault — institution upgrades (C2) with devotion-beat
framing. Mentorship mechanic: an ascended girl can catalyze a mortal
girl's late-stage growth (ability hooks), knitting endgame back into the
core loop. **Verify:** group-scene sweep across form pairs; shared-scene
fact gates (one narrator tone per scene); no mortal-content leakage at
`isAscended`.

### Step 9 — Meta-progression, endings, NG+

The **Pantheon** screen: all 18 forms, silhouettes filling in as girls
ascend, essence totals, apotheosis progress. Per-girl ending matrix gains
a dimension: final state × psych × relationship × (mortal peak | ascended
| apotheosis — cycle-2 stage 11, her form's crown scene, written like the
ceremony: persona-heavy, budgeted like a finale). Campus transformation
event at N ascensions (the semester the college stops pretending).
NG+ hooks: start a run with one chosen girl already ascended (her
Dossier carries over); pantheon gallery persists across runs. **Verify:**
ending-matrix render sweep (every cell non-empty, state-true); the three-
playthrough protocol with ascension rushed / spread / refused (refusing
the ceremony must be content, not a wall — she waits, and says so).

### Step 10 — Ship gate

Full quality pass per `docs/game-skills/07`: strict volume + strict
coverage including the ascended band; style-ledger grep extended (form
keys are engine labels — `mermaid`/`valkyrie` as ENGINE KEYS never appear
as bare stage-label prose; the fiction names them in-voice or describes
the lived form); content-safety gate (every form reads as an adult woman
transformed — mythic, never bestial, never younger; the compass's taboo
rail re-checked per form); perf check (registry size, save size with 18
ascensions); docs updated (AUTHORING roster gains a form column +
six-beat ascended voice guides; the gamedev skill's coverage rule notes
the second cycle); release checklist verbatim. **Verify:** the checklist,
zero exceptions — plus one full playthrough to a single apotheosis on a
phone build.

---

## Part E — The form roster (18 girls, 18 ascensions)

Format per girl: **Form** — why it's hers · rebirth image · gain-loop
twist · signature ability (of 3) · 3-beat event chain · a first-words
line. Every chain extends her existing evolved-form arc; catalysts cite
it. All forms are adult women transformed — mythic bodies, human minds,
her voice always.

**0 · Brittany — Valkyrie.** The captain who abolished weigh-ins now
chooses the worthy. Reborn mid-backflip in a crack of stadium light,
100 lbs of coiled brightness with wings that eat as she does. Twist: gains
"glory-weight" when her squad feasts after wins — their triumph is her
mass. Ability: *Roll Call* — marks a mortal girl; that girl's appetite and
confidence surge for a week. Chain: (1) the bronzed chair unveiled in the
trophy case; (2) wing-fitting the squad uniform — the tailor weeps, twice;
(3) the Choosing: she leads the heaviest squad on campus onto the field
under banners. First words: "New event. Divine weight class. I'm keeping
score."

**1 · Madeline — Sphinx.** The self-study concludes: she was the thesis.
Reborn couchant on the library steps, tawny, precise, hungry for questions.
Twist: gains when riddles are answered wrong — campus feeds her curiosity
literally; finals week is a banquet. Ability: *Open Stacks* — extracts one
true answer about any girl's hidden state (psych tiers revealed). Chain:
(1) she re-shelves her own gain journals under "primary sources"; (2) the
riddle seminar — students bring food offerings by unspoken instinct; (3)
she poses YOU the riddle she never solved: why you started. First words:
"Fascinating. The dataset was me."

**2 · Kylie — Siren.** Engagement made flesh. Reborn on a livestream that
never buffers, voice with a subscriber count. Twist: gains from adoration
— viewer counts convert to pounds on stream nights; going viral is a
binge. Ability: *Pinned Comment* — enthralls a venue for a night; every
scene there gains a rapt audience and doubled reactions. Chain: (1) the
collab format returns with a co-host who can't look away; (2) the
platform flags her as "unclassifiable content," she frames the notice;
(3) the concert on the quad — campus attendance total, wrenWatchesEverything
in the front row. First words: "No filter. Literally none exist for this."

**3 · Serena — Mermaid.** The athlete finds the arena where mass is pure
grace. Reborn in the campus pool at a hundred pounds that the water
adores. Twist: dual-context body — weightless elegance submerged,
monumental presence ashore; her furniture ladder is tank capacity; lap
records fall as she grows. Ability: *Wake* — her training tide; any girl
who swims with her leaves ravenous. Chain: (1) the natatorium reopens with
her name and a deeper end; (2) land day — she tries the old track on a
tail-turned-legs hour and laughs at gravity; (3) the exhibition meet:
she races her own old record and outweighs it. First words: "No weight
class in open water. Finally."

**4 · Fiona — Galatea.** The composition completes itself; canvas becomes
marble becomes warm. Reborn as a living statue stepping off her own
gallery plinth. Twist: gains at gallery openings — being SEEN adds to her;
poses bank "study-weight" released as sudden bloom. Ability: *Still Life*
— holds a scene's moment; everyone present re-experiences their best
memory of her body at any size (callback engine as an ability). Chain: (1)
the gallery retrospective re-hung in chronological size order; (2) she
poses for the sculpture class and corrects their proportions from the
plinth; (3) the unveiling of her final piece: herself, ongoing. First
words: "The medium was never paint."

**5 · Destiny — Glitch Sprite.** The build was never for the character.
Reborn pixel-first out of her own stream overlay, physics slightly
negotiable. Twist: save-states — she can bank a body snapshot and
"rollback" for a day (wardrobe pranks, doorway jokes), but the timeline
always reconciles with interest. Ability: *Duplication Glitch* — one meal
renders twice. Chain: (1) speedrun: the dining hall's menu, 100%; (2) her
overlay starts rendering her true size while the camera shows the seed
save — chat calls it the best effect all year; (3) the arcade cabinet that
only she fits — because it reshapes for her. First words (dialogue, in
voice): "Patch notes: base model reset. All expansions retained."

**6 · Tiffany — Feast Nymph.** The chapter's Wednesday feasts were rites
all along. Reborn wreathed in orchard-light in the chapter kitchen.
Twist: gains when others are fed under her roof — hostess-weight; the
house itself grows rooms to fit the parties. Ability: *Open Invitation* —
a feast event any girls can attend; everyone leaves heavier and fonder.
Chain: (1) the chapter room's table extends itself overnight; (2) rush
week: legacy alumnae return, decades softer, and kneel to kiss her hand;
(3) the Feast of the House — every plate refills until every guest
surrenders. First words: "More is more, babe. It's doctrine now."

**7 · Priya — Djinn.** KPIs become wishes; the framework becomes binding.
Reborn in a spiral of ledger-smoke, bangles ringing like closing bells.
Twist: gains per wish granted — she brokers desires (girls' cravings,
your projects) and takes her fee in pounds. Ability: *Terms & Conditions*
— guarantees one player plan this week cannot fail, price named up front.
Chain: (1) her planner's goals column starts granting itself; (2) the
oversubscribed office hours: a queue of petitioners with snacks as
offerings; (3) the audit — she calculates what she owes HERSELF and
grants it, spectacularly. First words: "Overperformance, as forecast.
State your wish."

**8 · Maya — Dryad.** "Home." Reborn where the doorframe used to be — the
dorm grows an arch of living oak to fit her forever. Twist: rooted gain —
her grove (planted events) banks growth that blooms in seasons; in her
grove she is vast; walking out, she carries a hundred pounds of spring.
Ability: *Deep Root* — a girl who rests in the grove sheds a shame tier.
Chain: (1) the first acorn: she plants her old dorm bed slats; (2) the
grove eats the quad corner and the college quietly re-draws the map; (3)
winter: she settles into the great oak's lap and the campus brings her
harvest tribute unprompted. First words: "Home. Bigger now."

**9 · Chloé — Melusine.** The salon hostess's secret was always in the
bath. Reborn coiled and iridescent in a claw-foot tub of seawater, wit
intact. Twist: two bodies — hostess-form at table (gains from every
dinner she pours), true serpent-tailed form in water; peeking at her bath
uninvited costs trust, being INVITED is the intimacy ladder's crown.
Ability: *Table Wine* — her pour deepens any dinner scene one heat band
(within gates). Chain: (1) the salon moves to the bathhouse, invitation
only; (2) a guest almost sees, and Chloé's handling of it becomes campus
legend; (3) the mam visit — her mother arrives, takes one look, and says
she has her grandmother's tail. First words: "The dinners were never
about the food, love."

**10 · Reneé — Hearth Demigoddess.** The kitchen was an altar the whole
time. Reborn in oven-light, flour-dusted, ambrosia on the pass. Twist:
gains when her cooking transforms someone — first bites of her ambrosia
dishes trigger craving events; she tastes everything into being and the
tasting is her diet. Ability: *Staff Meal* — feeds the whole cast at
once; global fullness + mood lift, her essence spikes. Chain: (1) the
menu that reads guests and prints their true craving; (2) the health
inspector leaves as a regular; (3) the Last Course: a dish that shows the
eater who they're becoming — served to you. First words: "Sit. You'll eat
what you are."

**11 · Kaylee — Fertility Goddess.** The nursing student's "aggressive
self-care" graduates to divinity; the body type was a prophecy. Reborn
haloed in harvest-gold, warm as a ward at midnight. Twist: blessing
overflow — her own gain radiates; girls near her gain easier (aura
mechanics), and she gains when they cross rungs, a benevolent pyramid.
Ability: *Bedside Manner* — clears a girl's withdrawal/stress states and
converts them to appetite. Chain: (1) the clinic waiting room is suddenly
always full and always calm; (2) the blessing of the dining hall, tray by
tray; (3) the harvest vigil — she sits up all night with the newest
gainer and the campus sleeps well. First words: "Self-care worked.
Everyone-care next."

**12 · Nadia — Dream-Eater.** The analyst finally gets primary access.
Reborn between one blink and the next, tapir-shadowed, notebook now
unnecessary. Twist: gains from desires witnessed — she walks dreams;
girls' unspoken cravings are her meals, and her session notes accelerate
their psych arcs. Ability: *Session Notes* — reveals and advances one
girl's hidden desire a tier (with her dreamed consent, always shown).
Chain: (1) office hours move to 3 a.m. without announcement or complaint;
(2) she tells YOU what you dream about, accurately, gently; (3) the group
dream — the whole cast shares one banquet dream and wakes hungry, and
Nadia wakes full. First words: "You already know I know. Interesting."

**13 · Daisy — Angel of Plenty.** "Bless it" was operative language.
Reborn in Sunday light with wings like warm biscuits rising. Twist:
literal blessings — her endearments carry weight (a "bless your heart"
adds pounds); she gains through gratitude at her table. Ability: *Grace* —
converts one economy purchase to free per week (providence). Chain: (1)
the pie that multiplies at the church potluck; (2) story hour: her
kindergarteners' drawings of her all include the halo, and the parents
notice; (3) the county fair blue ribbon for a dish she blessed but never
cooked. First words: "Well bless it. Bless ALL of it."

**14 · Mary Jane — Harvest Queen.** The farm answers to her now. Reborn
at first frost, crowned in wheat, the land breathing with her. Twist:
season-scale gain — she grows with her crops (planting choices are gain
investment; harvest weeks are her binges) and the whole cast's food
prices track her favor. Ability: *Bumper Crop* — doubles campus food
abundance for a week (feeds every girl's arc at once). Chain: (1) the
county surveyor finds the farm is measurably larger; (2) the harvest
festival (C3) reorganizes itself around her chair; (3) midwinter: she
sleeps a week and the college eats preserves she put up "for exactly
this." First words: "Land always feeds the ones who feed it."

**15 · Lilith — Lamia.** Not an ascension — a reveal. "Soon." arrives:
she was never mortal, and stage 11 merely made the costume too small.
Reborn — unveiled — as a serpent from the waist down, coil after coil,
amused that you're surprised. Twist: her 100 lbs is the human half only;
coil-mass is a second hidden ladder that grows on secrets and moonlit
hunts (of desserts; this is our genre); she was mentoring appetite this
whole time. Ability: *Old Hunger* — awakens a chosen girl's next craving
event immediately, magnified. Chain: (1) every scene she was ever in
gains a retroactive footnote (flag-driven callbacks: she KNEW); (2) the
shed skin displayed in the biology wing, labeled "donor anonymous"; (3)
the moonlit garden dinner where she finally explains what she's been
growing here: a court. First words: "Soon" — said as "Now."

**16 · Sophia — Potion Witch.** The pharmacy shelf goes non-Euclidean.
Reborn in a cloud of chamomile and ozone, lab coat now pointing at the
hem. Twist: alchemy — the existing compound system (Drugs.txt) becomes
her spellbook; she brews the pharmacist's catalog as true potions, tests
on herself first (anxiously, precisely, gaining), and unlocks recipes as
essence spells. Ability: *Double-Checked Dose* — any compound applied
this week has its effect guaranteed and doubled, side effects narrated
kindly. Chain: (1) the dissertation defense where the committee drinks
the results; (2) the cauldron incident — a wellness tea that makes the
faculty lounge very happy and very hungry; (3) the apothecary opens:
girls queue with symptoms like "not enough" and leave cured. First
words: "Statistically significant. Personally significant. Same thing
now."

**17 · Indiana Bones — Dragon.** The expedition was always heading here.
Reborn in the museum vault she was cataloguing, scaled in dig-site gold,
wings too small and unbothered. Twist: hoard-gain — wealth and artifacts
convert to mass on a schedule (her economy inverts: money is FOOD);
campus treasures migrate toward her nest and she gains interest.
Ability: *Appraisal* — turns any owned item into essence or pounds,
player's choice, with a story about its provenance. Chain: (1) the
nest in the archive stacks, discovered by a very calm librarian; (2)
the "acquisitions" dispute with the museum board, settled by sitting on
the disputed case; (3) first flight — short, glorious, ending in the
lake, to the mermaid's applause. First words: "Every legend I chased.
Turns out the treasure guards herself."

---

### Cross-cutting notes for Part E

- **Catalysts extend evolved arcs:** each girl's ascension catalyst flag
  is the capstone of her existing evolved-form storyline (squad legacy,
  salon, gallery, circuit, feasts), so the career arc and the myth arc
  are one continuous line.
- **Affinity clusters for step 8:** water court (Serena, Chloé, Lilith's
  garden pond, Indy's lake landing); hearth ring (Reneé, Daisy,
  Tiffany, Mary Jane); night office (Nadia, Lilith, Madeline); spotlight
  (Kylie, Brittany, Fiona, Destiny); providers (Priya, Kaylee, Sophia,
  Maya as sanctuary). Cluster scenes are the cheapest high-density
  ascended content.
- **Voice continuity is the whole game:** every first-words line above is
  the girl's cheat-sheet voice, transposed. If an ascended line couldn't
  be re-attributed name-stripped, it fails the persona test — same bar as
  mortal dialogue.
