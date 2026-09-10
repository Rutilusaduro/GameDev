# The Settling — Teeth Plan

The Settling shipped structurally sound (three trees, final forms, gathering)
but the moment-to-moment content is toothless. This plan fixes five specific
failures. Squad lead throughout: **A3 Immobility**; A7 Artisan rewrites every
draft line, A5 Editor gates each milestone, A4 Architect owns the modal and
mechanic plumbing in M2/M3, A2 Psych shades corruption variants.

## The five failures

1. **Prose asserts instead of delivering.** Lines like "You name it
   specifically — not vaguely, not euphemistically" (`settling/socialize.js`,
   `set.socialize.praise`) claim concreteness and then withhold the words. The
   player reads a stage direction, not a scene. Same disease across
   `set.feed.*` and `set.care.*`: "she says the thing back to you in a form
   you can actually use" — what form? What thing?
2. **Leviathan physical content ignores immobility.** `INTIMACY_SCENES` has no
   stage gating (`intimacyData.js` — only `minTier`), so a stage-11 girl can be
   offered *Against the Wall* and *Kissing Pull* (standing scenes). Her
   `her_weight` scene opens with "She lowers herself onto you" — a girl who
   cannot stand cannot lower herself onto anyone.
3. **Weigh-in still runs through the office.** `SettlingDetailView` wires the
   standard `openWeighIn` → `WeighInModal` → `wi.arrival`, whose stage-10 pool
   has her *arriving at the doorway*. A settled girl does not arrive anywhere.
   The player should go to her, and she should be past getting on any scale
   under her own power.
4. **No physical stakes.** Her mass on you is written as cozy. At a thousand
   pounds it should carry real risk.
5. **Enormity is told, rarely shown.** The pools lean on abstractions ("her
   vastness", "the fact of her") instead of anchors — named body regions,
   architecture, numbers.

## M1 — Concreteness pass (prose only, no code)

**Style Ledger additions** (`TUNING.md`), enforceable by grep:

- **Narrated assertion.** Banned: text that reports speech or specificity
  without delivering it ("you name it specifically", "you tell her what she
  is", "she says the thing", "you say all of it"). If the beat is praise, the
  pool contains the praise, quoted. If the beat is her verdict, the pool
  contains the verdict.
- **Abstract-noun payload.** "Her enormity/vastness/immensity/scale" may
  garnish a sentence; it may not BE the sentence. Every stage-10/11 variant
  needs at least one **concrete anchor**: a named body region doing something
  ("her upper arm swallows the cloth to the wrist"), an object/architecture
  interaction (doorframe, reinforced bed, floor joists, the two pushed-together
  mattresses she predates), or a number (`{subject.lbs}`, trays, feet of
  width).

**Rewrite sweep**, in place, same keys, same skeletons:

- `set.socialize.praise` — becomes a real dialogue beat. New sub-pool
  `set.socialize.praise.line` of quoted praise (stage × corruption), composed
  with a reaction pool. The current "you tell her how vast she is" variants are
  retired.
- `set.socialize.gossip` / `confide` — keep the oracle framing (it works), cut
  the "she says the thing" placeholders, put one concrete verdict or
  confession in each variant.
- `set.feed.*` — mostly good; sweep for anchors (name the trays, the count,
  where the food rests on her).
- `set.care.tend.beat` — closest to right already; light anchor pass.
- `set.gather` — anchor pass + one variant per final form (closes the design
  doc's open hook).

**Verify:** `npm run text:lint`; grep the Ledger patterns over
`scenes/settling/` returns zero; sample renders at stage 10/11 × corruption
0/1/2.

## M2 — Weigh-in goes to her

**Flow.** `getImmobilityTier(s) >= 1` → `openWeighIn` opens the modal in
`settled` mode. No `AnalogScale` needle: she is not stepping on anything. The
visual is a flat industrial readout card; the prose does the work.

**Hardware fiction.** Load-cell pads under her platform — the reinforced-bed
comfort milestone retrofitted as a freight scale. If `courtComfort.bed` isn't
done yet, the rig is portable pads worked under her by hand, which the prose
makes appropriately effortful.

**New pools** (`scenes/settling/weigh.js`, namespace `set.weigh`):

- `set.weigh.travel` — you cross campus to her room, kit in hand. She knows
  weigh-day; she is exactly where she always is.
- `set.weigh.rig` — the mechanics of weighing someone who cannot mount a
  scale. Stage 10: she can still shift her hips a few inches to help you seat
  a pad, and it costs her visible effort and breath. Stage 11: she cannot help
  at all; the rig and you do everything, and the text says so plainly.
- `set.weigh.number` — the readout beat. Uses `{subject.lbs}` and the delta
  since last weigh. The number is always spoken or shown, never summarized.
- `set.weigh.react` — persona lines (`studentId`, weight 4) pooled with
  corruption generics, benchmark pattern.

Every pool carries the M1 anchor rule from birth. `wi.arrival`'s stage-10/11
office variants stop being reachable (settled flow never calls them); they
stay registered for old saves.

**Verify:** node self-check rendering each beat at stage 10/11 × corruption
0/1/2 × bed done/undone; `text:lint`; `npm run build`.

## M3 — Intimacy at scale + the pass-out gamble

**Stage-gate the menu.** Add `maxStage` to `INTIMACY_SCENES` entries;
`IntimacySceneSelector` filters on `getStage(s.lbs).id`. Standing or
posture-dependent scenes — `wall_press`, `kissing_pull`, `thighs_lap`,
`squeeze_thighs` as currently written — cap at 9. Scenes that survive at 10+
(`her_weight`, `under_her`, `belly_focus`, `feed_close`, `chest_buried`,
`squeeze_chest`) get their `stageMin: 10` fragments audited and rewritten: no
lowering herself, no standing, no walking to you. You position yourself
against her, you work your way under a rolled portion of her, she shifts what
she can shift — which at stage 11 is almost nothing, and the prose owns it.

**Two settled-only scenes** (`minStage: 10`), built immobile-first:

- **Pinned** — the rework of "her weight on you" for a girl who can't climb
  onto anything: with your help she rolls part of herself over you, and once
  it's down, it's down. You do not get up until she decides to shift, and
  shifting takes her minutes.
- **Her Terrain** — you on her: climbing, kneeling into, being absorbed by a
  body the size of the bed itself. The scene where her scale is the whole
  event.

**Pass-out mechanic.** Choices where her mass comes over you get
`pinRisk: true` (Pinned's commit choices; `under_her`'s `take_weight` /
`stay_under` / `let_weight_press`; `her_weight` at tier ≥ 1). When taken with
`getImmobilityTier(s) >= 1`:

- Roll once: 20% at stage 10, 35% at stage 11.
- On hit: render `intimacy.blackout` (a new pool — the weight settles, your
  vision goes, you wake hours later still half-under her; stage and corruption
  variants — mortified at corruption 0, serenely unapologetic at 2), the
  scene ends there, choice rewards still apply plus a rel bonus (she does not
  forget a man who let her do that), then AP → 0 and `advanceWeek()`.
- UI: risky choices carry a visible tag — "⚠ she could put you out for the
  week" — so it reads as a gamble the player chose, never a gotcha.

Implementation stays inside the existing `ActiveIntimacyScene` choice handler
in `HallPass.jsx`; no new state shape beyond the `pinRisk` flag and the
blackout pool.

**Verify:** `text:lint`; a node self-check that forces the roll both ways and
asserts week advance + AP zero; manual scene walk at stage 11 confirming no
standing scene is offered.

## M4 — Enormity overlay

One shared pool file, `scenes/settling/enormity.js`: `set.enorm` — single
FULL-SENTENCE scale beats keyed `stageMin: 10` / `stageMin: 11` and
`bodyType`. The senses the current pools skip: the heat she throws at three
feet, the sound of an arm being moved, the floor's opinion, how long a shiver
takes to cross her, furniture she has annexed. Woven as an optional slot into
the settling skeletons, `set.weigh`, and the two new intimacy scenes
(`{set.enorm|prefix: }` with an empty-string fallback so it can vanish
cleanly, same pattern as `intimacy.selectorOverlay`).

Skipped: a campus-wide enormity meter and per-girl measurement tracking —
anchors in prose cover the fantasy; add tracked measurements only if a later
feature needs the numbers.

## Order and size

M1 → M2 → M3 → M4. M1 is pure prose and lands the biggest complaint first.
M2 and M3 each touch one modal/handler plus new pools. M4 is one file plus
skeleton edits. Every milestone ends with `text:lint` clean, `npm run lint`,
`npm run build`, and its own node self-check where logic changed.
