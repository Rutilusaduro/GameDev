# Craft Reference — palette, body, attitude, subgenres, examples

Companion to `SKILL.md`. All examples here are original and written about a clearly-adult stand-in character ("Dana," 20s) so they can be lifted as voice reference without copying any source. The firm limits in `SKILL.md` apply to everything below.

- [Sensory palette](#sensory-palette)
- [The body — by region, scaled by stage](#the-body--by-region-scaled-by-stage)
- [The attitude spectrum, in lines](#the-attitude-spectrum-in-lines)
- [Subgenre craft notes](#subgenre-craft-notes)
- [Mode A — long-form, beat-structured](#mode-a--long-form-beat-structured)
- [Mode B — a body lexicon, engine-ready](#mode-b--a-body-lexicon-engine-ready)

## Sensory palette

Lean on these; vary them so none repeats inside a passage.

- **Weight / heft:** heavy, ponderous, weighed-down, sinking, settling, anchored, a slow gravity, the pull of her own mass.
- **Softness:** plush, pillowy, doughy, yielding, give, pliant, downy-soft, melting.
- **Movement / jiggle:** sway, wobble, ripple, quake, tremble, roll, the long after-motion when she stops, waves traveling through her.
- **Warmth:** radiant, warm-bodied, a furnace under the softness, cozy heat.
- **Overflow / spread:** spilling, cascading, mounding, pooling, brimming, overrunning, claiming the space around her.
- **Strain (clothing/furniture):** straining, biting, creaking, groaning, a seam losing its argument, a button departing, fabric conceding.
- **Fullness / satiation:** stuffed, sated, brimful, packed, heavy and content, the pleasant ache of a body at capacity.
- **Growth in progress:** swelling, rounding, thickening, deepening, expanding, arriving, the body still moving outward after the bite lands.

**Avoid-list** (the tired stuff): "like a beached whale," "fat as a house," every belly compared to a "balloon," chains of intensifiers ("so so so big"), "morbidly," any diet/before-after moralizing, and — always — clinical or medical phrasing. Also obey the repo's `TUNING.md` Style Ledger.

## The body — by region, scaled by stage

The aesthetic is a soft, exaggerated, overflowing hourglass — top-and-bottom heavy, belly-led, everything plush and mobile. Richest detail lands in the mid-to-large range; scale up or down with the weight stage.

**Belly.** The lead of the figure. Early: a soft roundness pressing at a waistband, a hand drawn to it. Mid: a full, heavy dome that sits in her lap, doubles softly when she leans, swings when she shifts. Large: a vast warm expanse that spills past her knees, overhangs whatever she's sitting on, and keeps settling long after she's still.

**Bust.** Generous and heavy throughout. Mid: full and soft, resting on the upper belly, straining the front of anything cut for a smaller woman. Large: a wide, deep shelf of softness that wobbles with every motion, overruns any garment, and presses warm against her own arms.

**Hips & thighs.** Where width comes from. Mid: wide, soft hips that crowd a chair, thick thighs that press together and spread when she sits. Large: hips that need a doorway turned sideways, pillar-thick thighs that swallow the seat and each other, dimpling softly under their own weight.

**Rear.** Broad and deep. Mid: a full, round seat that needs the wider chair. Large: a vast soft shelf that claims a second seat, spreads when she settles, and sways behind her when she moves.

**Arms, face, the whole.** Soft round arms that dimple at the elbow; a softening jaw and full cheeks that warm a smile; the overall impression of abundance — a woman who takes up more room than she did, and wears it well. (No decline, no atrophy, no medical note anywhere — see the firm limits.)

## The attitude spectrum, in lines

The same moment — a tightening waistband at dinner — across the axis:

1. **Opposed:** "Dana tugs the waistband away from her skin and tells herself it shrank in the wash. The button disagrees. She ignores the button."
2. **Reluctant:** "She means to push the plate away. Her hand, warm and a little traitorous, pulls it closer instead, and she pretends not to notice the heat that puts in her face."
3. **Acclimating:** "She thumbs the button open without quite deciding to, sighs as the pressure eases, and lets the next forkful be exactly as large as she wants it."
4. **Proud:** "Dana leans back so the seam has to work for it, watching you watch the strain, and smiles. 'Go on. Tell me it's too small.'"
5. **Dominant feeder:** "She slides the plate across to you, unhurried, certain. 'I'm going to be bigger by the end of this,' she says, 'and you're going to help. Start cutting.'"

**Light degradation** (consensual, affectionate underneath): "'Look at you,' she purrs, not unkindly, 'couldn't stop if the building were on fire.'" Keep the warmth audible under the tease — never real contempt.

## Subgenre craft notes

- **Feeder / feedee:** write the wordless understanding — the refilled plate before she asks, the hand at the small of a back that's getting broader. Generosity reads as devotion.
- **Stuffing:** structure as a build — capacity, the tightening dome, the tipping point ("one more and she'll be past full — so of course there's one more"), the heavy sated aftermath. Sensation over inventory.
- **Immobility (celebrated):** the eroticism is vastness and being *kept* and adored — too big for the booth, settled and attended. Never "useless," never decline, never pain past the mild. She is enormous and content.
- **Magical / sci-fi growth:** give the impossible an internal logic (a curse that feeds on appetite, an enchanted kitchen, runaway nanotech). Lean into spectacle and consequence-free expansion.
- **Soft vore:** soft, gentle, fantastical — non-gory, non-fatal, consensual; the prey unharmed, the predator left bigger and softer. Surreal and sensual, never grim.

## Mode A — long-form, beat-structured

Write rich, but in liftable beats, with parallel variants where a range is needed. Sketch (an enchanted-dessert scene, attitude = acclimating):

> **[Setup]** The cafe was empty but for Dana and the slice the witch had left "on the house," and she knew better, and she ate it anyway.
> **[Trigger]** The first forkful was warm and impossibly rich; the second she barely tasted, because the third was already on its way.
> **[Growth — write a variant per size band]**
> · *small:* A soft new weight rounded at her middle, pressing her waistband into a thin complaint.
> · *mid:* Her belly swelled full and heavy into her lap, {word.size} and warm, her blouse losing ground with every breath.
> · *large:* She spread outward in slow, unstoppable waves, soft flesh claiming the booth and then reaching past it.
> **[Consequence]** The bench gave a low, wooden groan and the table edge vanished into the swell of her.
> **[Reaction — acclimating]** Dana thumbed the last button open, sighed as the pressure let go, and reached, unhurried, for the fork again.

Hand it over flagged by beat so it drops into the `MIGRATION.md` inventory; the size-banded growth beat maps straight onto the weight ladder.

## Mode B — a body lexicon, engine-ready

Paste-ready for the coding side; conforms to the `gamedev-text-engine` conventions (namespaced keys, shape comments, `when`-banded for stage coverage, `{ when: {} }` fallback, `{word.*}`/`{subject.*}` reuse, backticks for any quoted line). Static authored content.

```js
// src/textEngine/scenes/<feature>/bodyLexicon.js  (or merge into lexicon)
import { registerPool } from '../../engine.js';

// ── desc.belly — FULL SENTENCE, scales with stage ─────────────
registerPool("desc.belly", [
  { when: { stageMax: 2 }, text: [
    "A soft new roundness presses at her waistband, a weight {subject.first} keeps resting a hand on.",
  ]},
  { when: { stageMin: 3, stageMax: 5 }, text: [
    "Her belly sits full and round in her lap, soft and warm, doubling gently when she leans.",
  ]},
  { when: { stageMin: 6, stageMax: 8 }, weight: 2, text: [
    "Her belly spreads heavy across her thighs, {word.size} and swaying, settling slowly whenever she shifts.",
  ]},
  { when: { stageMin: 9 }, weight: 2, text: [
    "Her belly pours forward past her knees, a vast warm expanse that keeps moving long after she's still.",
  ]},
  { when: {}, text: ["Her belly is soft, full, and gloriously heavy."] },
]);

// ── desc.bust — FULL SENTENCE ─────────────────────────────────
registerPool("desc.bust", [
  { when: { stageMax: 4 }, text: [
    "Her chest is full and soft, straining the front of anything cut for a smaller woman.",
  ]},
  { when: { stageMin: 5 }, weight: 2, text: [
    "Her bust is a wide, heavy shelf of softness, wobbling with every motion and overrunning whatever she wears.",
  ]},
  { when: {}, text: ["Her bust is generous, soft, and heavy."] },
]);

// ── desc.hips — FULL SENTENCE ─────────────────────────────────
registerPool("desc.hips", [
  { when: { stageMax: 4 }, text: [
    "Her hips are wide and soft, crowding the chair, her thighs pressing warm together.",
  ]},
  { when: { stageMin: 5 }, weight: 2, text: [
    "Her hips claim the whole seat and then some, pillar-thick thighs spreading and dimpling under their own soft weight.",
  ]},
  { when: {}, text: ["Her hips and thighs are wide, soft, and plush."] },
]);

// ── desc.whole — composed skeleton ────────────────────────────
registerPool("desc.whole", [
  { when: {}, text: ["{desc.belly} {desc.bust} {desc.hips}"] },
]);
```

Ask for any region, mood, or subgenre as a topic ("a stuffing-aftermath lexicon," "Maya's proud-exhibitionist voice," "a magical rapid-gain surge") and this is the shape it comes back in.
