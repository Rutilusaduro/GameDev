# Tuning Modular Dialogue — the Flag-Batch Loop

> **Audience: the LLM (or human) fixing dialogue that "doesn't make sense."** This is the editing counterpart to `MIGRATION.md` (building) and `AUTHORING.md` (content rules). The loop below has been run live; every example is a real fix from those batches.

## The loop

1. **User rolls** in the Dialogue Lab (DebugPanel → 🎲 Dialogue Lab): picks a section, locks or randomizes state params, rolls 5 samples at a time.
2. **User flags** bad samples. Flagging shows a checkbox per dialogue node (the engine trace maps every span to the module that produced it); each checked node gets a note ("what's the problem with [wi.moodTag]?"). Save → Done → 📋 Copy all.
3. **User pastes the batch** into chat. Each entry carries the section, the FULL generating state, the text, and per-node problems:
   ```
   === FLAGGED 2/7 ===
   section: weighIn.introBig
   state: Maya (id 8) · 130 lbs (stage 1 Slim) · corruption 90 (tier 2) · mood observant · hunger 0 …
   ---
   <text>
   --- problems ---
   [wi.greeting] "…not the paperwork." → Not the paperwork?
   ```
4. **Fixer triages the whole batch in one pass**, then commits once: `Tune dialogue batch N: <short list>` and pushes.

## Triage protocol (per flagged item)

1. **Locate.** The node tag names the pool. No tag (older flags) → grep the distinctive phrase; fragments are literal strings in `scenes/`.
2. **Reproduce.** Rebuild the captured state as a synthetic student in node, render the same section 5-10×. The state line has everything: id, lbs, corruption points, mood, hunger, addiction, withdrawal, campus.
3. **Classify** (see taxonomy) and pick the matching fix pattern.
4. **Hunt the pattern, not just the instance.** Every flag is a sample from a class. Grep for siblings before moving on — when the user banned "It is not a question", "It is not *really* a question" was sitting in another pool.
5. **Re-verify**: re-render the captured state until the problem can't appear; run a banned-phrase grep over a few hundred renders; `npm run text:lint` clean.

## Diagnosis taxonomy (with real cases)

| Class | Real example | Fix pattern |
|---|---|---|
| **Missing selector gate** — line implies state the girl isn't in | Sophia at 90 lbs: "The variance shouldn't be this large"; Lilith at stage 0: "I'm collecting mass"; generic "water weight" at stage 0 | Add/tighten `when` (usually `stageMin: 2`); write replacement content for the now-empty cell (tiny Lilith *wants* mass: "So little of me…") |
| **Tier leak through pooling** — wildcard or shared pool surfaces wrong-tier psychology | tier-0 encourage skeleton firing at corruption 2; "still negotiating with herself" reachable at cor 1 | `priority: 1` on tier-shaped skeleton variants (hard gate in pool mode); corruption-gate tone-loaded fragments |
| **Adjacent-beat contradiction** — two slots/skeletons fight each other | "The scale is not the first thing on her mind." → next sentence she marches to the platform; "The hall announces her…" skeleton + a floorboards sound clause (sound described twice) | Rephrase one side to coexist, or remove the clashing slot from that skeleton's `{join}` |
| **Intra-sentence contradiction** — independently-rolled slots combine into nonsense | "wearily **breezes** in" | Make one pool neutral to the other's axis (verb pools are pace-neutral), or key both on the same axis |
| **Grammar-shape violation** — fragment doesn't fit its slot's shape | "softness poured into her old shape" as a participle clause | Rewrite to the declared shape ("her old shape rounding out in every direction") |
| **Game-logic violation** — text describes something the game state forbids | LCD/big scale for a 130-lb girl (it only exists for girls who broke the analog scale, >400 lbs) | Gate at the *tool/render* level (Lab stage floor, `bigScale` flag), not just prose |
| **Style-ledger violation** — a construction the user has banned | "She says X. **That is** new/progress."; "She doesn't say why. **You both know** why." | Rewrite; grep the whole codebase for siblings; add to the ledger below |
| **Clunky line, no rule yet** | "The scale waits; so does she."; the open-palm waiting foodAsk line | Delete or rewrite (dialogue beats usually read better as actual dialogue); consider whether a new ledger rule generalizes |
| **Verbatim correction** — user supplies exact wording | "I'm still hungry. I'm always hungry now." | Apply exactly as given; their wording wins |
| **Feature request disguised as a flag** | "she should ask/demand food after the weigh-in" | New slot/beat (e.g. `wi.foodAsk`): empty wildcard, state-keyed variants weighted heavy so the behavior reliably fires, escalation keyed on corruption |

## The Style Ledger (banned constructions — grows every batch)

Check NEW content against this list too, not just fixes. When a fix generalizes, append it here **and** to the AUTHORING.md anti-patterns.

1. **"Statement. That is X."** narrator tic ("That is new." / "That is progress."). Fold the judgment into the sentence or cut it. (In-character dialogue saying "that is…" is fine.)
2. **Knowing-narrator winks**: "She doesn't say why. You both know why." / "Neither of you mentions it." / "It is not (really) a question." Show the behavior instead, or convert to dialogue.
3. **Gain-excuse lines below stage 2** ("water weight", "I'll cut back", large-variance talk). At stage 0-1 there is nothing to explain away — use neutral or hungry-for-more content.
4. **Double-described phenomena** in one sentence (two sound clauses, two body clauses). One slot per phenomenon per sentence; check what each skeleton already asserts before joining clauses onto it.
5. **Pace/energy contradictions** ("wearily breezes"). Verb pools stay pace-neutral.
6. **Big-scale references outside stage 7+** — the industrial scale exists only for girls who broke the analog one.
7. **Tone-loaded generics in shared pools** — any fragment with tier-specific psychology gets a corruption gate, full stop.
8. **Stale-context dialogue**: greetings referencing things not in the scene ("not the paperwork"), pre-weigh lines that only make sense post-weigh ("Same time next week"). Place lines in the beat where their content is true.

## Fix mechanics quick-reference

- **Gate**: add `when` keys to the offending variant (split a variant if only some texts need the gate).
- **Relocate**: move a line to the beat where it belongs (greeting → post-weigh reply), rewording for the new position.
- **Replace**: keep pool sizes ≥ the AUTHORING.md floors when deleting — write a replacement in the same shape and register.
- **New behavior**: new pool with empty wildcard + heavily-weighted state-keyed variants (weights 6-12 make a conditional behavior reliable without being mandatory), wired into the template with `{slot|prefix: }`.
- **Persona additions**: `personas.js` style — `studentId` + `corruption` (+ stage band), `weight: 4`, dialogue stays in the girl's cheat-sheet voice.

## Verification recipe (every batch)

```bash
npm run text:lint        # static + 150k-render sweep, must be clean
npm run lint             # eslint (one pre-existing StreamPreStreamPanel error is baseline)
```
Plus a node script that (a) re-renders each flagged item's exact captured state ~5-10×, (b) sweeps a few hundred randomized renders asserting every banned phrase from this batch AND the ledger is absent. Then one commit per batch (`Tune dialogue batch N: …`), push to the working branch.

## Tooling map (if it needs extending)

- **Engine trace**: `render(tpl, ctx, { trace: [] })` records `{key, text, leaf, depth}` per slot; "leaf" ignores `subject.*` identity slots so sentences with `{subject.lbs}` stay annotatable. Renderers thread `opts.trace`.
- **Dialogue Lab** (`src/components/DialogueLab.jsx`): `SECTIONS` maps section → render fn + relevant-params list (drives dropdown dithering) + optional `stageMin` gate. New migrated features must add a section entry.
- **Lint** (`scripts/textLint.mjs`): add new flagship templates to `SWEEPS`; banned phrases can be added to `ARTIFACTS` if they're mechanically detectable.
