---
name: weightgain-prose
description: Voice and content-craft companion to the gamedev-text-engine skill — the house style for weight-gain / feeder erotica in Rutilusaduro's fat-fetish text games, and the formatter that turns prose into engine-ready output. Use whenever writing, expanding, or rewriting gainer/feeder prose, calibrating a character's attitude (from actively opposed to a dominant feeder), or handling subgenres like feederism, feeder/feedee, stuffing, immobility, magical/sci-fi growth, soft vore. Triggers on two signature asks — 'write a long-form entry for X' (beat-structured prose to mine via MIGRATION.md) and 'gimme a lexicon related to X' (namespaced registerPool variants for the coding side). Game-agnostic — pulls character, setting, and tone from the prompt or the repo. Bakes in the firm rules — characters always unambiguously adult, no dark feederism, no health-consequence framing (no real pain, atrophy, or medical decline), minimal clinical language — and a sensual, literary, second/third-person, tender-with-dominance voice.
---

# Weight-Gain Prose — House Voice & Content Craft

The writing layer for Rutilusaduro's fat-fetish text games. The **`gamedev-text-engine`** skill governs the *mechanics* (slots, `registerPool`, `when`-keyed variants, coverage, the linter); **this** skill governs the *prose* — what excellent writing in the genre reads like — and how to deliver it in the two shapes the project needs. Use both together: voice from here, structure from there.

**Game-agnostic.** Pull the character's name, body type, personality, attitude, and setting from the prompt, or from the repo (`src/gameData/students.js`, the scene's context, `DESIGN_BIBLE.md`). Never invent a personality that contradicts an established one; when nothing is specified, ask or pick a clearly-adult default and say so.

## The voice

Second or third person, present or past as the scene calls for. Literary, sensual, unhurried. Tender at the core, with a current of dominance underneath — the feeder/admirer (or the scene itself) is in quiet control, and the writing knows it. The eroticism lives in **size, softness, weight, warmth, and growth**, not in clinical anatomy. Principles:

- **Sensuality through specific sensation.** Don't report that she's fat; render what it *feels* and *looks* like — the give of flesh under a hand, the slow sway after she stops moving, the warmth of a belly in a lap, the deepening hush of a body that takes up more room than it did an hour ago. Concrete beats abstract every time.
- **Worship the body.** The register is appreciative and reverent even when it's teasing. Heaviness, softness, and overflow are desirable, beautiful, powerful — never problems, never shameful (unless the scene is deliberately running consensual light degradation; see the attitude spectrum).
- **Make growth an event.** The genre's electricity is *change*. Linger on the threshold moments — the seam that gives, the chair that complains, the waistband that loses, the number that climbs — and let the body keep arriving after the bite lands.
- **Dominance as restraint, not cruelty.** The dominant note is calm certainty: a feeder who decides, a hand that guides, a "you'll finish it" said gently. Control is sexy because it's sure of itself, not because it hurts.
- **Rhythm.** Vary sentence length; let a long, loaded sensory sentence settle and then land a short one. Indulgence in the content, discipline in the prose.
- **Dialogue earns its place.** A single in-character line ("there's the whole tray, and there's you, and we both know how this ends") does more than a paragraph. Keep voices distinct per character.
- **Heat is a dial, voice is constant.** Explicitness ranges from suggestive to fully explicit depending on the scene and prompt; the *voice* above does not change with it. Default to sensual-charged unless told otherwise.

See `references/craft-reference.md` for the sensory word-palette, the avoid-list, and annotated example passages.

## The attitude spectrum (the key variable)

A character's stance toward her own gaining is the dimension the prose pivots on, and it maps directly onto the engine's `corruption` / `mood` / `archetype` dimensions. Write the same physical event very differently along this axis:

1. **Opposed / in denial** — she doesn't want this, or won't admit it's happening. Tension between the body's pull and her resistance; the sensuality is in what she's fighting and (subtly) failing to fight. Never gloating; let the body make the argument.
2. **Reluctant / curious** — a crack of want under the protest. She notices the warmth, the fullness, the way a hand feels, and hates that she likes it — then doesn't quite hate it.
3. **Acclimating** — she's stopped resisting and started enjoying; small permissions ("one more," "leave the top button"), growing comfort in her own spread.
4. **Proud / exhibitionist** — she loves it and wants it seen; teasing, showing off the strain of a seam, narrating her own size with relish.
5. **Dominant feeder** — she runs it. She decides she'll be bigger, she puts the player to work fattening her, she's the certain one. The dominance flips to her.

**Light degradation / shaming** is an available option *within consensual play*: teasing names, "look what you've let yourself become," playful humiliation that both parties are clearly enjoying. Keep it **light** and affectionate-underneath — admiration wearing a smirk. This is the bright line against "dark" feederism: the shaming is a game between people who want it, never real contempt, never coercion presented as harm.

## Subgenres in scope

Brief craft notes; fuller guidance and the body aesthetic in the reference file.

- **Feederism / feeder–feedee.** The relationship is the engine: one provides and encourages, one receives and grows. Write the *dynamic* — generosity, anticipation, the wordless understanding — as much as the food.
- **Stuffing.** A scene of deliberate over-fullness. Pace it as a build: capacity, the press of a tightening belly, the tipping point, the heavy satisfied aftermath. Sensation-forward.
- **Immobility.** Celebrated, never medicalized. The eroticism is *vastness and being kept* — too big for the booth, the chair, the doorway; settled, attended, adored. **No atrophy, no decline, no "useless," no pain beyond the mild and incidental.** She is enormous and content, not deteriorating.
- **Magical / sci-fi growth.** Curses, potions, machines, enchanted kitchens, runaway nanotech. Rapid or impossible gain with internal logic. Lean into spectacle and the fantasy of consequence-free, unstoppable expansion.
- **Soft vore.** Keep it soft, fantastical, and gentle — non-gory, non-fatal, consensual, the "prey" unharmed and the predator left bigger and softer for it. Sensual and surreal, never violent or grim. (If a prompt pushes it toward harm, it's out of lane.)

**Body aesthetic at mid-tier size** (from the reference art): a soft, exaggerated, overflowing hourglass — a big round belly that leads the body, a heavy generous bust, wide hips and thick thighs, a broad soft rear, everything plush and mobile. Scale the proportions up or down with the stage; keep the lush, top-and-bottom-heavy ideal.

## Pacing

Default is **slow burn** — gradual gain, accumulating detail, a number that creeps; reward patience with payoff scenes. Some scenes are **rapid gain** (especially magical/sci-fi): there, write the surge in real time — the body outracing her clothes, growth she can feel happening — and give the aftermath room to breathe. Match the pacing to the trigger the engine hands you.

## Firm limits (the Style Ledger)

Non-negotiable. These hold regardless of prompt:

- **Every character is unambiguously an adult.** Always. No teenagers, no high-school/age-ambiguous framing, no "barely legal," no age-regression, no source character written as a minor. If a prompt or reference frames someone as underage or age-ambiguous, write them as a clear adult or do not write them. Never sexualize anyone who could read as underage. This rule overrides everything.
- **No dark feederism.** No real coercion, contempt, or harm. Encouragement and consensual dominance only; any "shaming" is light, mutual, and affectionate underneath.
- **No health-consequence framing.** No cardiac symptoms, chest pain, shortness of breath as distress, vascular problems, neuropathy, muscular atrophy, organ strain, or medical decline. Pain only mild and incidental (e.g., a backache from a heavy bust, the pleasant ache of fullness) and never dwelt on. Immobility is *being immobile*, full stop — never deterioration.
- **Minimal clinical / medical language.** No diagnostic or anatomical-textbook register. Sensory and evocative, always.
- **Avoid the tired stuff** — see the avoid-list in the reference file (overused similes, repeated intensifiers, etc.).

## Output mode A — long-form entries (for MIGRATION)

When asked to "write a long-form entry" (or to enrich existing prose), produce a rich, complete passage in the house voice — but write it **mineable**, so it converts cleanly into slot-composed form via the repo's `MIGRATION.md` protocol. That means:

- Build it from **clear beats** (setup → the bite/trigger → the growth → the consequence → the reaction), the same beat skeleton the engine composes. Keep beats separable.
- Where the entry should cover a range, write **parallel variants per beat** — e.g., the growth beat at three sizes, or the reaction beat across the attitude spectrum — so the miner has fragments to lift rather than one fused paragraph.
- Keep body description **stage-legible** so it maps to the weight ladder, and keep names/identity in slottable positions (a clear subject, not buried).
- Hand it over noting the beats, so it drops straight into the migration inventory. Defer to the repo's `MIGRATION.md` for the exact conversion steps.

## Output mode B — "gimme a lexicon related to X"

This is the bridge to the coding side. When asked for a lexicon on a topic (a belly description, a seam-straining moment, stuffing dialogue, a particular girl's voice, a magical-growth surge…), output **engine-ready `registerPool` data** following the `gamedev-text-engine` conventions, voiced per this skill:

- Namespaced key (`feature.beat`), a **shape comment** declaring the grammatical shape, `when`-keyed variants for specificity, **a `{ when: {} }` fallback so the pool never goes silent**, **stage bands** (`stageMin`/`stageMax`) for weight-related coverage across the whole ladder, **backtick literals** for any line with quotes, and reuse of `{word.*}` / `{subject.first}` / `{subject.name}` instead of re-describing bodies.
- Deliver it as a paste-ready code block (and, if asked, a whole scene file). Default to **static authored** content — no runtime generation.

Minimal shape (full worked example in the reference file):

```js
// Shape: FULL SENTENCE. Belly description that grows with the stage.
registerPool("desc.belly", [
  { when: { stageMax: 3 }, text: [
    "Her belly rounds soft and warm over her waistband, a new weight she keeps resting a hand on.",
  ]},
  { when: { stageMin: 4, stageMax: 6 }, text: [
    "Her belly sits heavy in her lap now, {word.size} and spreading, swaying when she shifts.",
  ]},
  { when: { stageMin: 7 }, weight: 2, text: [
    "Her belly pours forward past her knees, a vast soft landscape that settles slowly long after she's still.",
  ]},
  { when: {}, text: ["Her belly is soft, full, and gloriously heavy."] }, // never silent
]);
```

## Pairing & references

- **`gamedev-text-engine`** (companion skill) — the API, selector vocabulary, coverage rule, lint discipline, and barrel wiring. Mode B output must conform to it.
- **`references/craft-reference.md`** (in this skill) — sensory word-palette, the avoid-list, the attitude spectrum with example lines, subgenre craft notes, and annotated mode-A / mode-B examples.
- **In repo:** `src/textEngine/AUTHORING.md` (binding content contract + per-girl voice), `src/textEngine/TUNING.md` (Style Ledger of banned constructions — obey it), `src/textEngine/MIGRATION.md` (long-form → slots), `DESIGN_BIBLE.md` (stage ladder + house writing prompt), `src/gameData/students.js` (the cast). When this skill and a repo doc disagree, the repo wins — except the firm limits above, which never yield.
