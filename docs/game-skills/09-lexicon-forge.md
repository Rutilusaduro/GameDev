# Skill: Lexicon Forge — Building the Word Layer for Any Setting

The word-grain lexicon (`word.*`) is where a game's prose quality is
actually decided: skeletons supply rhythm, but the words players remember
come out of these pools. This skill is the method for forging a lexicon
from nothing, for any theme — the worked examples run one weight-gain pool
and one noir pool through the same steps to prove the method doesn't care.
Shapes, floors, and the family inventory are law in the Text Engine
Manifesto (§6.1, §6.6); this file is how to fill them well.

## 1. The forge protocol (per pool)

1. **Brief the pool** before writing a word (see §2 — one brief per pool,
   always written down; an unbriefed pool becomes synonym soup).
2. **Seed the wildcard** with the most concrete words the setting owns —
   things a camera could film, a hand could feel, a mic could record.
   Abstract candidates ("impressive", "noticeable") don't survive seeding.
3. **Walk the ladder.** At each rung band ask two questions: *which seed
   words become MORE true here?* (promote them into a banded variant with
   `weight: 2`) and *what word exists ONLY here?* (the only-here words —
   a waistband can "complain" at stage 3 but only "surrender" at stage 6).
   Only-here words are the pool's whole reason to exist; if a rung band
   produced none, you haven't imagined that rung's physical reality yet.
4. **Overlay the psych registers.** Same fact, different mind: the pool
   carries at least one variant group keyed on the psychology axis, so a
   timid subject and a brazen one pull different words. Dialogue-adjacent
   pools carry one group per tier.
5. **Tag the collisions.** Multi-word entries whose punch word is under 4
   letters, and any two phrasings that mean the same thing, get explicit
   `tags` so dedupe sees them as one identity.
6. **Read the pool aloud in one breath.** Any two entries that blur
   together: cut one. A pool of 10 sharp entries beats 30 near-synonyms —
   padding doesn't add variety, it adds mush the dedupe layer then has to
   ration.
7. **Count and lint.** Floors met, ladder covered, `text:lint` clean.

## 2. The pool brief

Five lines, written above the pool as its header block:

```
key + SHAPE:     word.beltState — CLAUSE (reads after a comma)
axes:            fitWaist (all 6 states) × shame tier overlay
floor:           3 per fit state; '' entries allowed (optional slot)
banned here:     "straining" (owned by word.seamSound), any number
register note:   the belt is a narrator; deadpan, never alarmed
```

The **banned-here line** is what keeps pools from converging: each pool
owns its signature words and the neighbors renounce them. When two pools
both want a word, the one whose shape uses it more precisely keeps it.

## 3. Sourcing vocabulary (where the words come from)

Run these sweeps before writing entries; harvest nouns and verbs, then
compress into the pool's shape:

- **The material sweep.** List the setting's actual materials and objects:
  denim, elastic, vinyl booth seats, dorm chairs, trays, radiators. Words
  anchored to a material ("the elastic's last argument") age better than
  free-floating adjectives.
- **The sense-by-sense sweep.** For the pool's phenomenon, one pass per
  sense. Weight-gain worked row — *a full belly*: sight (dome, curve,
  overhang), touch (taut, drum-tight, heat through the shirt), sound (the
  seam's creak, a zipper's tick-tick retreat), motion (the settle after
  she stops, the slow spread on sitting), interoception (heaviness,
  warmth, the deep pull of it). Interoception is the genre's home sense;
  most competitors never write it.
- **The profession sweep.** Each cast member's vocation donates vocabulary
  to her scenes: a chef plates and portions, a lifter counts reps and
  plates of another kind, an influencer frames and captions. Persona word
  choices do more identity work than persona sentences.
- **The verb-first pass.** For every adjective candidate, ask what verb
  shows it: "heavy" → settles, sinks, presses; "tight" → bites, digs,
  holds on. Verbs survive dedupe better (more of them) and carry motion.

## 4. Worked example A — weight-gain, `word.sitVerb`

Brief: VP-3SG, how she takes a chair; axes stage (all rungs) × corruption
overlay; floor 8 wildcard; banned here: "plops" (cartoon register), any
furniture noun (the chair pool owns those); register: gravity is real and
friendly.

```js
// Shape: VP-3SG. How she takes a chair. Stage covers 0–11; corruption
// shades the manner. Banned here: "plops", furniture nouns.
registerPool('word.sitVerb', [
  { when: {}, text: [
    'sits', 'settles', 'takes the seat', 'sinks down', 'lowers herself',
    'eases down', 'drops into place', 'comes to rest',
  ]},
  { when: { stageMax: 2 }, text: ['perches', 'folds neatly down', 'slips into the seat'] },
  { when: { stageMin: 3, stageMax: 5 }, weight: 2, text: [
    'settles in with a small bounce', 'fills the seat', 'lands softly',
  ]},
  { when: { stageMin: 6, stageMax: 8 }, weight: 2, text: [
    'descends in stages', 'commits to the chair', 'settles with a long exhale',
    'arrives seat-first, the rest of her following',
  ]},
  { when: { stageMin: 9 }, weight: 2, tags: ['lower'], text: [
    'docks', 'lowers herself by handholds', 'settles the way a ship settles',
  ]},
  { when: { corruption: [0], stageMin: 3 }, weight: 2, text: [
    'sits carefully, testing the chair before trusting it',
  ]},
  { when: { corruption: [2], stageMin: 3 }, weight: 2, text: [
    'claims the chair', 'settles like the chair should be grateful',
  ]},
]);
```

Every stage band earned an only-here entry ("perches" / "descends in
stages" / "docks"); the corruption overlay makes the same physics read as
caution or as ownership; "settles the way a ship settles" is tagged so its
punch word dedupes against the plain "lowers herself by handholds".

## 5. Worked example B — noir, `word.rainState`

Same protocol, different world. Brief: NP describing the rain through the
office window; axes caseHeat bands × integrity overlay; floor 6; banned
here: "pouring" (the dimension name — engine labels stay out of prose);
register: the rain is the city's opinion of him.

```js
// Shape: NP. The rain as the city's opinion. Banned here: "pouring".
registerPool('word.rainState', [
  { when: {}, text: [
    'a slow gray drizzle', 'rain with no ambition', 'the same rain as yesterday',
    'a rain that starts nothing and finishes nothing', 'static on the glass',
    'weather the city forgot to cancel',
  ]},
  { when: { caseHeatMin: 3 }, weight: 2, text: [
    'rain like a tapped phone line', 'a downpour with somewhere to be',
  ]},
  { when: { integrity: 'bent' }, weight: 2, text: [
    'rain that knows what he did', 'a dirty rinse over a dirty street',
  ]},
]);
```

The method transferred whole: concrete seeds, only-here entries at the hot
band, a psych overlay that makes weather read as conscience.

## 6. Expansion passes (growing a live lexicon)

- **The flag harvest.** Every tuning flag on a word pool is a vocabulary
  gap, and the fix is usually a new only-here entry at the flagged state —
  never a weaker penalty or a broader wildcard.
- **The echo audit.** When the sweep's repeat rate creeps up, the top
  repeated stems name the pools that need entries. Add words; don't touch
  the constants.
- **The register audit.** Sample the pool at psych extremes; if tier 0 and
  tier 3 read the same, the overlay group is missing or too light.
- **One pool per pass.** Expanding six pools at once produces six mediocre
  pools; the brief, the sweeps, and the read-aloud test only work with
  attention on one pool at a time.

## 7. Requesting a lexicon from a model (the brief is the prompt)

Hand the model: the pool brief (§2), the shape law table, three exemplar
entries in the target register, and the banned-here list. Ask for 2× the
floor, then cut half — generation is cheap, curation is the craft. Reject
any batch containing: near-duplicates, abstract qualifiers, engine labels,
clinical terms, or entries that ignore the shape contract. The cut list is
worth keeping; rejected entries often seed a *different* pool's brief.
