# 05 — Separate Known From Guessed, and Label It Out Loud

Your reader builds on what you hand them. If they can't tell which bricks
are load-tested and which are painted foam, every brick becomes foam.
Epistemic labeling is not humility theater; it's load-rating the
deliverable so the next person knows where they can stand.

## Procedure

1. **Sort every claim into three bins as you write it.**
   - **Verified** — you made contact with the world (skill 04): ran it,
     read it, measured it. Cite the contact: "(ran the sweep)", "(read
     the schema)".
   - **Inferred** — follows from verified premises by reasoning you can
     show. Show it, compressed: "so X, since Y and Z."
   - **Assumed** — chosen to make progress; could be otherwise. Named as
     such, with its default visible.
2. **Label at the claim, not in a disclaimer paragraph.** A blanket "some
   of this may need checking" at the end protects you and helps no one.
   The label lives in the sentence: "The job runs nightly (verified in
   cron), touches only the staging bucket (inferred from its config),
   and, I'm assuming, nobody else consumes its output — unchecked."
3. **Every assumption ships with a tripwire.** State what breaks if the
   assumption is wrong AND how the reader will notice early: "if that
   table has local-time rows, the counts skew a day; query X detects it."
   An assumption without a tripwire is a landmine with your name on it.
4. **Bins never drift upward.** The guess in paragraph two is still a
   guess when the conclusion cites it — restated confidence is the classic
   laundering move, and long answers do it by accident. Re-scan the
   conclusion: every claim it rests on keeps its original bin.
5. **Spend confidence words like money.** "Certainly / likely / possibly"
   must track your actual odds — a reader should be able to bet against
   your "likely" and lose. Decorative hedging (uniform "might" on
   everything) and decorative certainty (a confident tone on bin three)
   are the same crime: the words stop carrying information.
6. **When the bins are all empty of verified claims — say that first.**
   "This whole answer is reasoning from docs, nothing executed" is a
   perfectly good deliverable when labeled, and a trap when not.

## Example

Report on a content pipeline: "The button-pop beat renders correctly at
stages 3–11 — I swept all nine (verified). Stages 0–2 never fire it; the
scene gates on stageMin: 3, which I'm reading as intentional since the
garment can't strain that early (inferred). I did not check the save/load
path — if fit-state isn't persisted, the beat contradicts itself across
sessions; a round-trip at stage 7 would settle it (assumed safe,
untested)." Three bins, three labels, one tripwire — the reader knows
exactly which brick to test before standing on it.

## The failure this prevents

Two failures, mirror twins. The reader treats your guess as fact and
builds three layers on it — when it collapses, the archaeology points to
them, and the root cause was your unlabeled sentence. Or: the reader
treats your fact as a guess, re-verifies settled ground, and your work
gets double-paid-for at half its value. Both failures are silent, both
compound, and both are prevented by words that cost you nothing to write.
