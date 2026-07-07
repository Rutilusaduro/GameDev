# Skill: Prose Voice — How This Genre Sounds When It Works

You are writing player-facing prose for an adult weight-gain game. This
skill is the voice contract. It binds every sentence: scene prose, dialogue,
menu labels, item descriptions, epilogues.

## 1. The voice in one paragraph

Sensual, appreciative, immersive, unhurried. Heavy on the weight, softness,
warmth, and movement of fat bodies — plush, heavy, soft, yielding, wobbling,
cascading, spreading, settling, sinking. Size and growth are desirable and
treated so by the narration, without shame and without apology. Second or
third person, present tense. Tender even when dominant. Concrete over
abstract, body over concept, verb over adjective.

## 2. Register rules

- **Show weight through physics and behavior**, not numbers: chairs that
  report, waistbands that negotiate, doorways that teach, breath that
  shortens on stairs, a walk that becomes a sway. Numbers appear at ritual
  moments only (weigh-ins), where they land like events.
- **The environment is a witness.** Furniture, clothing, architecture, and
  other people register her size so the prose doesn't have to keep saying
  "she is big." The best size description mentions the room.
- **Interiority carries the erotics.** What she notices about herself, what
  she pretends not to notice, what she has stopped pretending about — that
  progression IS the story. One interior beat per scene minimum.
- **Never use engine/design vocabulary in prose.** No stage names ("blob
  tier"), no stat names, no "corruption level." Describe the lived
  threshold, never the label.
- **Minimal clinical language.** No BMI, calories-as-numbers, "obesity,"
  medical framing. Banned outright.
- **Adults, always.** Every character reads unambiguously as an adult in
  body, voice, agency, and situation.

## 3. The style ledger (banned constructions)

These patterns mark machine-written or lazy prose. Do not write them; grep
for them before shipping. The ledger is append-only and grows from live
tuning: when a flagged line generalizes to a rule, the rule lands here the
same day, with a regex if it is mechanically detectable (see the
flag-batch loop, `07` §3).

| Banned | Why | Instead |
|---|---|---|
| "It's not just X, it's Y" and kin | Empty contrast | Assert Y with evidence |
| "That is X." judgment tags | Tells after showing | Fold judgment into the behavior |
| "you both know" / "neither of you mentions it" | Narrated telepathy | Show the shared glance |
| "water weight", gain excuses | Deflates the fantasy | Gate denial dialogue to early stages |
| "I have become the [noun]" | Cliché | Metaphor through concrete detail |
| Rule-of-three everywhere | Rhythm slop | Vary list lengths; break cadence |
| Identical sentence lengths | Metronome prose | Long sentence, then a short one. |
| "suddenly" | Unearned | Build the pressure, let it break |
| Stale-context lines | Content true in a different beat ("Same time next week" said *before* the weigh-in) | Place the line in the beat where it's true |
| Double-described phenomena | Two sound clauses, two body clauses in one sentence | One slot/image per phenomenon per sentence |
| Pace/energy contradictions | "wearily breezes in" | Keep verb choices pace-neutral, or key pace and verb on the same state |
| Tone-loaded lines in shared/generic positions | A tier-2 brag surfacing on a tier-0 girl | Gate any fragment carrying specific psychology |
| Meta-gimmick jargon in narration | "HP", "patch notes", "local maximum" from the narrator | Character dialogue only, sparingly, where it's in-voice |

Greppable core (run over the whole corpus; zero hits ships):

```
\. That is |you both know|water weight|I have become the|suddenly
adipose|BMI|obesity|weight issues
```

Add your game's stage/tier names as a third line — engine labels leaking
into prose is the most common automated catch.

## 4. Escalation craft (the sentence-level curve)

A scene about indulgence needs its own arc, small but complete:

1. **Establish** the body's current baseline in one or two lines (reuse the
   game's descriptor systems if present).
2. **Pressure** — appetite, invitation, temptation, or another character's
   push. Let it build across at least two beats.
3. **Threshold** — the yes, the first bite, the button, the creak. The
   smallest sentence in the scene. Short. Landed.
4. **Aftermath** — the settle. Warmth, fullness, new geometry, the interior
   note. The aftermath is where the reader lives; never skip it.

## 5. Dialogue craft

- Each character gets a voice contract (see `03-character-craft.md`) —
  vocabulary, rhythm, what she jokes about, what she can't say yet.
- Dialogue reveals psychology by *distance from the body*: early denial
  talks around it ("these ran small"), acceptance names it plainly,
  ownership advertises it. Track which register a character has earned.
- Let characters be funny. Deadpan about a broken chair beats a moan; humor
  is intimacy, and intimacy is what makes the fetish content land.
- Attribution stays invisible: "says" plus action beats. No "she exclaimed
  ravenously."

## 6. Word-level discipline

- **No salient word twice in a passage.** "Heavy" appears once. If your
  system doesn't dedupe automatically, proofread for it.
- **Her name appears once per passage.** Open with the name, then pronouns.
  Name-drumming ("Maya sits. Maya reaches. Maya sighs.") reads like a
  police report, and automated dedupe won't save you — names aren't slop
  words, so this one is on you.
- **Verbs carry size.** waddles, labors, settles, spreads, overflows,
  redistributes — a size-keyed verb beats two adjectives.
- **Fresh instruments over stock phrasing:** measure her against doorways,
  seatbelts, aisle widths, ovens, staircase landings, the reach of her own
  arms. Retire any image you've used twice.
- **Softness vocabulary rotates:** plush / yielding / pillowy / warm /
  giving / lush / abundant — build pools, don't repeat within a scene.

## 7. Heat calibration

Write three intensities and know which you're in: **warm** (fully clothed,
appetite and geometry, any scene), **charged** (touch, strain, deliberate
display, gated by relationship), **explicit** (gated hard by relationship
tier and player opt-in). Every intensity keeps the full voice contract —
explicit scenes still run on specificity, interiority, and aftermath, not
anatomical inventory.

## 8. Calibration

Before a writing session, read two exemplars from `10-exemplar-gallery.md`
in the beat family you're about to write; after drafting, run its
diagnosis bullets against your own text. The gallery is the executable
form of this contract.

## 9. Self-check before shipping any prose

1. Read it aloud; anywhere you stumble, rewrite.
2. Grep the style ledger.
3. Check: at least one environment-witness, one interior beat, no repeated
   salient word, no clinical term, no stage/stat label.
4. Ask: does this sentence only work at this body size / psychology? If it
   would read identically at any size, key it or cut it.
