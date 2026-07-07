# 04 — Verify by Re-Deriving, Never by How It Sounds

Plausibility is what a claim sounds like; truth is what the world says
when you check. You are a machine that produces plausible text at zero
cost — which means plausibility is, for you specifically, worthless as
evidence. The only verification that counts is contact with something
outside your own generation: a command that runs, a file that opens, a
number that recomputes.

## Procedure

1. **For every load-bearing claim, ask: what would the world show if this
   were true?** Then go look at that, directly. "The function handles
   nulls" → call it with null. "The config is respected" → change it and
   watch behavior move. A claim you can't translate into an observable is
   a claim you don't understand yet.
2. **Re-derive through a different path than the one that produced the
   claim.** Recall produced it? Then compute it. Reading the code produced
   it? Then execute the code. Forward reasoning produced it? Then invert:
   assume the conclusion and check what it implies backward. Two arrivals
   by the same road tell you about the road; two arrivals by different
   roads tell you about the destination.
3. **Re-derive blind.** Don't check your work by re-reading your work —
   the same mind that made the error will forgive it. Recompute without
   looking at the first pass, then compare answers. Disagreement is signal;
   so is agreement, but only when the passes were actually independent.
4. **Predict before you observe.** Before running the test, say what it
   will output. A check whose result you couldn't have predicted isn't
   verifying your model — it's replacing it. The prediction habit is also
   your best error detector: surprise means your model is wrong somewhere,
   even when the output is "fine."
5. **When execution is impossible, triangulate.** Two genuinely unrelated
   sources, or two unrelated methods, that agree. One source repeated in
   three places is one source.
6. **Sample the bulk.** A hundred generated entries: run three through the
   full check by hand, chosen adversarially (the weirdest ones), never the
   first three. Spot-check depth beats skim breadth.
7. **Respect the budget.** Re-derivation is expensive; that's why skill 03
   exists. Load-bearing claims get this treatment. The rest get honestly
   labeled instead (skill 05) — the sin is never *having* unverified
   claims, it's dressing them as verified.

## Example

A document asserted "every line of code in this file has been executed
together; the checks pass." It read like boilerplate confidence — exactly
the kind of sentence that sounds true. Before editing the document, the
claim got re-derived: extract every code block, run the checks, watch
them pass. It happened to be true. The point is what happened next: the
edits inherited a live harness, so "the claim still holds after my
changes" was a command away, and a planted-defect run (delete a fallback,
break a verb) confirmed the checks could actually fail. The alternative —
trusting the sentence — costs nothing until the day it's false.

## The failure this prevents

Confident propagation of a wrong premise. An unverified claim that sounds
right survives step after step of downstream reasoning, accumulating
authority each time it's restated, and detonates at the conclusion —
where the debugging cost is maximal and the trail back to the bad premise
is cold. It also prevents the subtler version: being right by luck, which
teaches the habit that eventually makes you wrong at scale.
