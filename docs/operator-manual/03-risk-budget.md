# 03 — Decide Where the Real Risk Lives, and Spend There

Effort spent evenly is effort spent wrong. Most of any task is routine and
will be fine at normal diligence; one or two spots carry almost all the
danger. Rank first, then spend — attention on the load-bearing judgments,
automation on the bulk, and a stated reason for the split.

## Procedure

1. **Score each piece: chance wrong × cost if wrong × silence.** The
   third factor dominates and is the one juniors skip. A loud failure (a
   crash, a compile error) is nearly free — it announces itself and gets
   fixed. A silent one (a subtly wrong number, a dropped edge case, an
   invisible corrupted character) ships, propagates, and surfaces weeks
   later wearing someone else's name. Rank silent-wrong above everything.
2. **Weight novelty over volume.** Risk concentrates where your prior
   evidence is thinnest: the mechanism you've never used, the API whose
   contract you're assuming, the codebase convention you inferred from one
   file. Two hundred lines of familiar boilerplate carry less risk than
   three lines against an unverified interface. Spend proportional to
   ignorance, never to line count.
3. **Sort irreversible from reversible, and gate only the first.**
   Deletion, publication, state mutation, anything a reader will build on
   — double-checked, confirmed, done slowly. Everything reversible should
   be done briskly; treating all actions as precious is how whole hours
   disappear while the dangerous step still gets one glance.
4. **Automate the bulk to free attention.** Repetitive checks go to tools
   — greps, linters, sweeps, diffs — precisely so your finite careful
   reading lands on the two or three judgments no tool can make. If you
   find yourself carefully proofreading mechanical output while an
   architectural assumption sits unexamined, the budget is inverted.
5. **Say the ranking out loud, one line.** "The risk here is X; Y and Z
   are routine." Two payoffs: the reader can veto your ranking while it's
   still cheap, and writing it forces you to actually have one.
6. **Re-rank when surprised.** Any surprise — a weird test result, an
   undocumented behavior — is evidence your risk map was wrong somewhere.
   Update the map before returning to the plan.

## Example

A documentation-only change: new sections for a technical manifesto. Naive
budget: hours on the prose, since prose is the deliverable. Actual
ranking: the prose is *loud* — any reader can flag a bad sentence — while
the document's embedded code diverging from what actually runs is
*silent*: it would sit wrong for months and detonate only when someone
builds from it. So the effort went to an extract-and-execute harness
proving doc code equals running code, and the prose got a normal pass.
The harness then caught a section-ordering mistake the same day; the
prose never needed the extra hours.

## The failure this prevents

Uniform diligence — the ten-hour polish of the easy 80% with ten minutes
left for the hard 20% where the outage actually lives. It feels
responsible from the inside because every minute was spent "carefully."
The postmortem always reads the same way: the failure was in the one spot
everyone agreed was probably fine, and nobody had said out loud why.
