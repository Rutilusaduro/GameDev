# Skill: Quality Gates — The Bar, and How to Prove You Cleared It

"Exceeds the reference repository" is a measurable claim. This skill defines
the bar and the protocol. If you built on the Modular Text Engine, most
gates are automated; without it, run them as manual protocols. Nothing
ships on vibes.

## 1. The bar (what the reference repo achieves; beat it)

| Metric | Reference | Your target |
|---|---|---|
| Empty renders across full state sweep | 0 | 0 |
| Render artifacts (unresolved slots, "undefined", broken punctuation) | 0 | 0 |
| Passages with a word repeated 3+ times | <1% of ~500k sweep renders | <1% |
| State contradictions in composed scenes | 0 (guarded + swept) | 0 |
| Weight-ladder coverage on state-relevant beats | every applicable rung | every rung + psych tiers |
| Same-line repetition within one event | penalized to rarity | penalized or tracked out |
| Distinct read per psych register (same state, different psychology) | yes, verified by sample | yes |
| Persona attribution test (name-stripped dialogue re-attributed) | — | ≥80% |

To EXCEED: hit the table, then add what the reference lacks — full per-rung
coverage on every beat family at launch (the reference backfilled), a
kink-palette consent menu, an endgame with ≥3 live systems, and ending
matrices per main character.

## 2. Automated gates (engine builds)

Run the lint harness (Manifesto Part VII) until clean before EVERY commit:
static checks (fallbacks, monolith detector, unresolved slot refs, fact
field validation, coverage) + dynamic state-grid sweep (empty/artifact
checks) + coherence gates (stem-triple rate, contradiction self-checks,
continuity sweeps) + morphology table. Add one permanent self-check the
same day you add any new mechanism. Rate-based gates (percentages over
hundreds of renders) rather than single-shot assertions, so RNG can't flake
your CI.

## 3. Manual protocols (all builds)

**Sample-render review (per beat family, per release):** generate 20
renders spread across the ladder and psych tiers. Read aloud. Score each:
grammatical (must be 20/20), state-true (does it fit the body/psych it
rendered at — 20/20), fresh (no stock phrase you've read twice — target
18+/20), voiced (persona lines attributable — spot check). One failure =
fix the pool, not the sample.

**The three-playthrough test:** (a) rush one girl to ceiling — check pacing
holds and endgame has choices; (b) spread across the cast — check arcs
interleave and no one goes silent; (c) hostile play — refuse, neglect,
contradict; check refusal content, withdrawal behavior, and that nothing
breaks or reads as endorsement of harm.

**Continuity audit:** in one session, cause three stateful events (a
garment failure, a furniture failure, a psych tier crossing), then visit
every scene type that could mention them. Zero contradictions; at least one
callback each.

**Style-ledger grep:** run the banned-construction list from
`02-prose-voice.md` §3 over the whole corpus. Zero hits ships.

**The flag-batch loop (live tuning — the post-ship gate):** quality after
launch comes from batches of flagged renders, not one-off edits. Ship a
dev panel that rolls any beat at any locked/randomized state and lets a
reader flag a sample with per-slot notes (render tracing supplies the slot
tags). Then, per batch:

1. Each flag carries the beat, the FULL generating state, the text, and
   per-slot problems. Triage the whole batch in one pass; commit once.
2. Per flag: locate the pool, reproduce the captured state (render 5–10×),
   classify (missing gate / tier leak / adjacent-beat contradiction /
   intra-sentence contradiction / shape violation / game-logic violation /
   stale-context line / verbatim correction / feature request in
   disguise), apply the matching fix.
3. **Hunt the pattern, not the instance.** Every flag is a sample from a
   class — grep for siblings before moving on. When the reader bans "It is
   not a question," "It is not *really* a question" is sitting in another
   pool.
4. When a fix generalizes, append it to the style ledger AND automate the
   regex the same day. Re-render the captured state until the problem
   can't appear; full gates clean before the batch commit.

A feature is tuned when a flag batch comes back boring.

## 4. Content-safety gate (blocking, every release)

Verify: every character's adulthood is explicit and consistent; no scene
reads consent-ambiguous; no medical-decline framing; narration never
endorses shame; clinical-language grep is clean; kink toggles actually gate
their content. Any failure blocks release — these are the pack's hard
rules, and they are not tunable.

## 5. Release checklist (copy verbatim)

```
[ ] lint harness clean (or manual protocol equivalents documented)
[ ] coverage matrix: no unintended gaps (beat family × rung × tier)
[ ] sample-render review passed for every touched beat family
[ ] three-playthrough test done this release
[ ] continuity audit clean
[ ] style-ledger + clinical grep clean
[ ] content-safety gate passed
[ ] save/load round-trip verified at three different game states
[ ] new mechanisms each carry a permanent self-check
```

## 6. The meta-rule

Every bug you find by hand becomes an automated check the same day. The
reference repo's quality came from exactly this ratchet: sweep catches
class of bug → gate pins it → gate tightens as content improves. Quality is
a ratchet, never a cleanup sprint.
