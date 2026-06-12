# Migrating Legacy Dialogue to Modular Form

> **Audience: the LLM (or human) converting an existing feature's prose into the slot-composed system.** Read `AUTHORING.md` first — it defines the content rules this process produces. This file defines the *process*. The weigh-in migration (`scenes/weighIn/`, replacing `scenes/weighIn.js` + `gameData/weighInReplies.js`) and the encourage migration (`scenes/talkEncourage.js`, replacing the `encourage` pool in `gameData/talkDialogue.js`) are the worked examples — every step below was used to produce them.

## The goal, in one paragraph

Legacy dialogue is monolithic: whole paragraphs indexed by one or two variables (corruption tier arrays, `[studentId][stageBand][corTier]` builder functions, hardcoded per-girl strings in components). The target form is **skeletons + fragment pools**: short sentence templates whose slots are filled from small pools of fragments, each fragment gated by game state (`when` selectors) and chosen by weighted RNG (`registerPool`). One migrated feature should react along *every* relevant axis at once — stage, bodyType, mood, corruption, hunger, addiction, withdrawal, per-girl — and recombine combinatorially so the player rarely reads the same paragraph twice.

## Step 1 — Inventory every text source

Before designing anything, find ALL the prose for the feature:

1. Engine modules already registered for it (grep `registerModule` for the feature's namespace) — these are often "modular" in name only: each variant a complete pre-written sentence in a bodyType×stage grid.
2. `gameData/` dictionaries and builder functions (tier arrays, per-student dicts, `(s) => string` functions).
3. **Hardcoded strings in components** — modals frequently hide per-girl scenes (the weigh-in's BREAK_SCENES lived in `WeighInModal.jsx`).
4. Map the render call sites: which component/game-logic calls what, with which arguments, and what integration hooks exist (e.g. `appendCampusWeighIn` and the `weighIn.campus` key had to survive the weigh-in migration untouched).

Also confirm which selector axes are *available* for this feature (see the AUTHORING.md cookbook) and which the legacy code already used implicitly — legacy indexing is your selector map (stage band `light/rounded/heavy/vast` → `stageMin/stageMax` 0-2 / 3-5 / 6-8 / 9+).

## Step 2 — Design beats and slots before writing any text

- **Beats** = the narrative phases of the feature (arrival → settle → scale approach → step-off → reply, for the weigh-in). Each beat is ONE pool of 2-6 *skeleton* variants — short templates containing slots — so sentence rhythm varies, not just word choice.
- **Slots** = the fragment pools the skeletons draw from. Build a slot inventory table first: module key, grammar shape (ADVERBIAL / VERB PHRASE / PARTICIPLE CLAUSE / FULL SENTENCE / DIALOGUE BEAT), which axes key it, and which legacy text feeds it.
- Reserve one **dialogue slot per beat that carries personality** (`wi.replyDialogue`, `enc.owned`…) — that's where per-girl voice goes.
- Optional color (body clauses, face clauses, sounds, mood tags) hangs off skeletons via `{join:a,b|prefix:, }` and weighted-`""` pools, so it can be present, stacked, or absent.
- Stage extremes often need **different sentence shapes**, not just different words — give immobile stages (10-11) their own skeleton variants ("Her belly arrives before the rest of her…").

File layout for a multi-beat feature: a folder (`scenes/<feature>/`) with `index.js` (templates + render API), `fragments.js` (shared pools), `personas.js` (per-girl variants), plus any sub-scene files. A single-beat feature is one file (`scenes/talkEncourage.js`).

## Step 3 — Mine the legacy prose (the protocol)

Work through the legacy text in file order. Per paragraph:

1. **Quoted dialogue → persona variants, VERBATIM.** The voice lives in the quotes; never paraphrase them. Key on `studentId` + `corruption` + a wide stage range so multiple mined lines co-pool, `weight: 4`.
2. **Body-description sentences →** normalize to the destination slot's grammar shape (a full sentence becomes a participle clause if the slot demands it), then file under the source cell's selectors.
3. **Narrator tags** (mood flavor, number receptions) → their own small slots (`wi.moodTag`, `wi.numberLine`).
4. **Connective tissue** ("she says, and means it") → drop it; skeletons supply connective tissue now.
5. One legacy paragraph typically yields 2-4 fragments. Recombination more than replaces the lost variant count.

Sanity-check mined lines against their *new, wider* reach: a line written for the "rounded" band may now be selectable at stage 0 if you only gate it on corruption. **If a line implies gain, gate it `stageMin: 2`.** (This bit us twice in tuning — see TUNING.md ledger.)

Targets: every pool ≥4 texts at wildcard, every keyed cell ≥3, every girl ≥2 dialogue beats per corruption tier in personality slots. Girls without legacy prose (new roster additions) get NEW persona lines written from the AUTHORING.md voice cheat-sheet.

## Step 4 — Registration mechanics

- `registerPool` for everything new. `registerModuleVariants` to extend shared pools from `personas.js`.
- Wildcard fallback on every pool (lint enforces it).
- **Tier-shaped skeletons need `priority: 1`** on the tier variants: in pool mode the wildcard stays RNG-eligible, and a tier-0-shaped fallback WILL leak into tier-2 renders without the priority gate. (This was a real bug in the first encourage build.)
- Optional slots: weighted `""` entries; optional clause groups: `{join:…|prefix:, }`; optional single slots: `{slot|prefix: }`.
- Watch for **cross-slot contradictions**: a pace-adverb slot feeding a verb slot must not produce "wearily breezes" — keep verb pools pace-neutral, or key both on the same axis.

## Step 5 — Wire-up

- `index.js` exports template constants + `renderX(student, week, opts)` wrappers. **Thread `opts.trace` into every `render` call** — the Dialogue Lab needs provenance.
- The component becomes pure presentation: it imports renderers, memoizes RNG text per phase (`useMemo` keyed on phase/student), and holds zero prose.
- Talk topics migrate declaratively: add `engineTemplate: "{talk.<topic>}"` to the topic in `talkSystem.js`; `TalkModal.buildResponse` routes it. Codas keep appending afterwards unchanged.
- Add the new scene file(s) to `src/textEngine/scenes/index.js` (the barrel) and a section entry to `DialogueLab.jsx` `SECTIONS` (with its relevant-params list and any stage gate).

## Step 6 — Retire the legacy

Delete the legacy source **in the same commit** as the replacement (avoids double-registration warnings and dead code). Check it's the sole importer first (`grep -rn` the filename). Preserve any cross-feature keys/integrations verbatim (`weighIn.campus`, coda renders).

## Step 7 — Verify

1. `npm run text:lint` — must be clean for your namespace (it includes the monolith detector and a dynamic sweep; add your templates to the SWEEPS list in `scripts/textLint.mjs`).
2. Node spot-renders across the extremes: smallest stage × cor 0, biggest × cor 2, hungry/withdrawal states, 2-3 distinct girls. Read the output like a player.
3. `npm run lint` + `npm run build`.
4. Roll the feature in the Dialogue Lab; then run the TUNING.md loop — migration is finished when a flag batch comes back boring.
