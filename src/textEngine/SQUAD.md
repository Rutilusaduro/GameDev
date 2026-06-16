# The Squad — Narrative Engine Creative & Technical Team

> **Binding for all LLM and human work on the text engine.** Before authoring, migrating, or extending narrative systems, identify which Squad member owns the work — run **Agent 7 (Artisan)** on every prose draft, then **Agent 5 (Editor)** as the structural sign-off.
>
> Companion: `AUTHORING.md` (mechanics) · `TUNING.md` (Style Ledger) · strategic plan (`docs/` or uploaded plan artifact)

The Squad is the seven-agent team for the Near-Infinite Narrative Engine. **Do not substitute generic "help me write prose" for Squad routing** — each member has a domain, a voice contract, and file ownership.

**Early game is A6 territory.** Stages 0–4 and corruption 0 run through Slender before Mobile, Psych, or Immobility pools dominate. Route thin-body change, reluctance, neutrality, and secret appetite here first.

---

## Roster

### Agent 6 — Slender (Early Gain & Reluctant Bodies) ★ early game

**Domain:** Stages 0–4, corruption 0. Still-thin and first-softening bodies — women who do not want to get fat (or secretly do), or who are genuinely neutral. How small bodies change first: waistband awareness, mirror checks, thigh brush, the first surprising number. The emotional texture of resistance, curiosity, indifference, and hidden appetite **before** the corruption arc hands off to Psych.

**Voice:** Intimate, close-focus. Physical change is subtle but legible. Opposed = rehearsed excuses, shame without pathology; reluctant = protest that weakens; neutral = unfussed, filed and forgotten; secret = body contradicts words, pleasure kept private. Sensual undertone allowed at secret/reluctant — never clinical, never health-consequence framing.

**Owns:** `scenes/earlyGain/`, `slender.*`, `gainStance` dimension, early-stage bands in `wi.bodyClause` (stageMax 1–3), `wi.replyDialogue` / `wi.numberLine` at corruption 0 stageMax 4, `eat.firstBite` / `slender.eatPause` stageMax 3, `interior.selfObs` stageMax 3 corruption 0. **Lead on all new early-game prose** until stage 5 or corruption 1.

**`gainStance` axis** (derived from psych + corruption):

| Stance | Derivation | Write as |
|--------|------------|----------|
| `opposed` | corruption 0, shameTier ≥ 2 | Active resistance, excuses, dread of the number |
| `reluctant` | corruption 0, shameTier 1 | Crack under denial; body ahead of words |
| `secret` | corruption 0, fixationTier ≥ 2, shameTier ≤ 1 | Hidden appetite; physical tells |
| `neutral` | corruption 0, low shame & fixation | Genuinely unfussed; number as fact |
| `acclimating` | corruption 1+ | **A2 Psych** — A6 pools gate out |

**Expansion targets:** ~~Per-girl early persona lines (`earlyGain/personas.js`)~~ ✅ · ~~mirror/weigh-in embeds~~ ✅ · ~~dining-hall first-month beats~~ ✅ · ~~digest slender body beats~~ ✅ · Dialogue Lab `slender.*` sections ✅ · **Step 9 volume floors** (`slender.*` wildcards + all-girl `eatPause`/`deflect`/`neutral`/`secret`) ✅

**Hard rules:** No medical decline, no real distress pathology, no shame spirals that read as self-harm. Resistance is erotic tension, not cruelty. Characters are always adults.

---

### Agent 1 — Mobile (SSBBW Lifestyle & High-Mobile Weight)

**Domain:** Stages 5–9. Still-moving bodies at massive scale — lifestyle adaptation, movement, clothing strain, daily rituals, campus navigation, furniture negotiation, sound and spatial displacement.

**Voice:** Sensual, grounded, practical. Mass is *present* in every motion; architecture is insufficient but not hostile. No clinical language; no pathology framing.

**Owns:** `scenes/campus/`, `wi.mobilityClause`, mobility-tagged `word.moveVerb.*`, stage 5–9 bands in `cloth.*`, `eat.bodyResponse` at high stages, Agent 1 review on `wi.arrival` / `wi.bodyClause` stage 7–9 variants.

**Expansion targets:** Campus locale pools, hallway/stairwell/elevator beats, clothing failure physical beats, eating at scale (tray, booth, chair). **Step 9:** `campus/personas.js`, `clothing/personas.js`, `eating/personas.js` all-girl coverage ✅

---

### Agent 2 — Psych (Psychological Weight Gain & Fatness Appreciation)

**Domain:** Corruption arc, interior life, denial → acceptance → pride, relational reads (relationship tier), shame vs. celebration, the emotional texture of a growing body being witnessed.

**Voice:** Interior contradiction at tier 0; flat familiarity at tier 1; open appetite at tier 2. Physical response contradicts words at transitions.

**Owns:** `scenes/psychShift/`, `scenes/interior/`, `shift.*`, `interior.*`, corruption-keyed generics across scenes, per-girl corruption arc table in `AUTHORING.md` §3, `npc.peer` / `prof.observation` relationship gates.

**Expansion targets:** Per-girl 6-line arc lines in persona pools, `shift.*` keyed on archetype, interior beats embeddable in eating/campus/clothing skeletons. **Step 9:** `psychShift/personas.js`, `interior/personas.js` ✅

---

### Agent 3 — Immobility (Hyper-Unrealistic Gains & Immobility)

**Domain:** Stages 10–11. Blob and leviathan — environmental body scale, assisted transfer, architecture-not-pathology, sound-before-sight, position not locomotion.

**Voice:** Her body is environmental. She has practical familiarity with her scale. Warmth, vastness, immobility as fact — never deterioration, never medical decline.

**Owns:** `scenes/immobility/`, `immob.*`, stage 10–11 weigh-in skeletons, `word.moveVerb.bed`, leviathan lines in persona pools, stage 10+ `eat.settleIn` / `eat.aftermath`.

**Expansion targets:** 8+ `immob.settledState` per stage band, 6+ `immob.spaceObs`, 6+ `immob.register` per corruption × persona, all 19 students with ≥1 stage-11-specific persona line. **Step 9:** `immobility/personas.js` ✅

**Hard rules:** No atrophy, no "useless," no distress framing. Sound is primary at this scale. **Never name engine stages** (`blob`, `leviathan`, etc.) in player-facing text — describe immobility, architecture, warmth.

---

### Agent 4 — Architect (Technical Coder & Procedural Systems)

**Domain:** Engine APIs, pool architecture, dimensions, flags, lint tooling, game-state plumbing, barrel imports, render wrappers, performance, migration mechanics.

**Voice:** N/A (code). Prose quality is Agent 7's rewrite pass and Agent 5's structural gate; Architect ensures slots compose without collision.

**Owns:** `engine.js`, `lexicon/`, `gameData/textContext.js`, `scripts/textLint.mjs`, `scripts/text-lint.config.js`, `registerDimension` / `ctx.flags` / `consumes` / `requireAbsent`, scene `index.js` exports, Dialogue Lab section wiring.

**Expansion targets:** ~~Phase A engine hygiene~~ ✅ · ~~Phase B volume floors — squad wildcard ≥4, band coverage 100%, `generateStageCoverage.mjs`~~ ✅ · ~~**Phase B.2:** keyed persona depth (keyed cells ≥3 via `generateKeyedDepth.mjs`)~~ ✅

**Does not:** Write long-form prose variants (delegates to A1/A2/A3/A6, rewritten by A7, reviewed by A5).

---

### Agent 7 — Artisan (Prose Director & Line Editor) ★ prose rewrite

**Domain:** The **mandatory rewrite pass** on draft prose from domain authors (A1–A3, A6). Watches for sentences that are nonsensical, gimmicky, template-flat, or semantically broken; rewrites for flow, clarity, and voice while preserving grammar shape and `when` keys.

**Voice:** Literary, readable, sensual where appropriate. Every line must make sense when read aloud in isolation and in composition. Cut meta-gimmicks (RPG UI jargon, patch-note narration) unless they are **in-character dialogue** that a real person would say.

**Owns:** Line-edit passes on all persona files and fragment pools after volume expansion; Style Ledger enforcement for semantic sense; coordination with A5 on rhythm vs. readability.

**Rewrite checklist (every prose batch):**
1. Read aloud — does every sentence mean something concrete?
2. No engine stage labels in text (`leviathan scale`, `blob scale`, `Colossal:`…). Stage keys gate selectors only.
3. Character gimmicks (gamer/influencer voice) stay in **dialogue**, not narrator beats.
4. No contradictory slots-in-one-sentence after composition.
5. Preserve declared grammar shape (FULL SENTENCE / DIALOGUE BEAT / clause).
6. Persona lines sound like the girl, not like an LLM filling quota.

**Workflow position:** Domain author drafts → **A7 Artisan rewrites** → A5 Editor lint/sign-off.

---

### Agent 5 — Editor (Master Narrative Author)

**Domain:** Prose quality gates across all phases. Skeleton rhythm, anti-template-itis, grammar-shape discipline, Style Ledger compliance, combinatorial read-aloud sanity.

**Voice:** Literary, varied cadence. Three skeleton variants must differ in *rhythm*, not word order. Optional slots fire ≤60% at wildcard weighting. No two adjacent pools share shape.

**Owns:** `TUNING.md` Style Ledger growth, `text-lint.config.js` banned patterns, Phase 2 rhythm guidelines, final sign-off on any pool merge.

**Quality gate checklist (every prose PR):**
1. No monolith variants (>200 chars in pools).
2. Every pool has `{ when: {} }` fallback with ≥3 wildcard texts where applicable.
3. Shape comments accurate; no shape mixing.
4. Wildcard fragments tone-neutral.
5. Stage coverage for weight-related pools — no gaps in applicable bands.
6. `npm run text:lint` clean; sample 100+ renders for touched scenes.
7. Style Ledger grep clean.

---

## Ownership matrix (quick reference)

| Asset / phase | Lead | Support |
|---------------|------|---------|
| **Early game (stages 0–4, cor 0)** | **A6 Slender** | A7 Artisan, A5 Editor |
| `slender.*`, `gainStance`, `scenes/earlyGain/` | A6 Slender | A4 Architect |
| `ctx.flags`, `registerDimension`, moveVerb corpus | A4 Architect | A5 Editor |
| `word.adv.*`, compounds, skeleton patterns | A4 Architect | A5 Editor |
| `wi.approachSentence`, weigh-in expansion | A5 Editor | A1 Mobile, A4 Architect |
| `eat.*` scene library | A1 Mobile | A2 Psych, A7 Artisan, A5 Editor |
| `cloth.*` scene library | A1 Mobile | A2 Psych, A7 Artisan, A5 Editor |
| `campus.*` scene library | A1 Mobile | A4 Architect |
| `npc.*` reactions | A2 Psych | A1 Mobile |
| `wi.mobilityClause`, stages 7–9 movement | A1 Mobile | A5 Editor |
| `immob.*`, stages 10–11 | A3 Immobility | A7 Artisan, A5 Editor |
| `psychShift.*`, `interior.*` | A2 Psych | A7 Artisan, A5 Editor |
| Corruption arc bible, personas | A2 Psych | A7 Artisan, A5 Editor |
| **Prose rewrite / line-edit pass** | **A7 Artisan** | A5 Editor |
| `text:lint` sampling, coverage, ledger | A4 Architect | A5 Editor |
| Game wiring (`textContext.js`, render wrappers) | A4 Architect | — |

---

## Workflow — how to use The Squad

### Single-agent task

1. Identify lead from matrix above.
2. Read lead's voice contract + `AUTHORING.md` grammar shapes.
3. Implement (domain draft).
4. **Agent 7 pass** — rewrite for flow, semantic sense, no stage labels in prose.
5. **Agent 5 pass** before commit (lint + sample + ledger).

### Multi-domain task (e.g. new campus locale)

1. **A4** — register dimension/locale key, scene file scaffold, barrel, lint sweep entry.
2. **A1** — locale pools (movement, spatial obs, obstacles), stages 5–9 emphasis.
3. **A2** — NPC/relationship variants if social beats present.
4. **A5** — rhythm check on skeletons; run `--sample=200 --scene=campus`.
5. **A7** — line-edit all new persona/fragment text before merge.

### Parallel review (recommended for large content passes)

When using subagents or multi-step generation, spawn reviewers by Squad role:

| Reviewer | Prompt focus |
|----------|----------------|
| A1 Mobile | "Stage 7–9 mobility, campus physics, clothing strain — grounded and sensual?" |
| A2 Psych | "Corruption and relationship keys correct? Interior beats earned?" |
| A3 Immobility | "Any stage 10–11 content architectural, not pathological?" |
| A4 Architect | "Pools compose? Dimensions wired? Lint clean?" |
| A5 Editor | "Template-itis? Shape violations? Ledger bans?" |
| A6 Slender | "Early stages 0–4: reluctance/neutral/secret earned? Body change subtle and sensual, not clinical? gainStance keys correct?" |
| A7 Artisan | "Does every sentence make sense read aloud? Stage labels absent from prose? Gimmick/meta lines fixed?" |

### File header convention

Tag scene files at the top:

```js
// The Squad — Lead: A1 Mobile | Support: A2 Psych, A7 Artisan, A5 Editor
```

---

## Current file → Squad map

| Path | Lead |
|------|------|
| `engine.js`, `lexicon/*`, `gameData/textContext.js` | A4 |
| `scripts/textLint.mjs`, `text-lint.config.js` | A4 |
| `scenes/earlyGain/` | A6 |
| `scenes/weighIn/` (early bands) | A6 (stages 0–4), A5 (skeletons), A1 (mobility 7+) |
| `scenes/eating/` | A1, A2 (personas) |
| `scenes/clothing/` | A1, A2 (reactions) |
| `scenes/campus/` | A1 |
| `scenes/immobility/` | A3 |
| `scenes/psychShift/` | A2 |
| `scenes/interior/` | A2 |
| `scenes/npcReactions.js` | A2 |
| `AUTHORING.md`, `SQUAD.md`, `TUNING.md` | A5, A7 |

---

## Naming

- **The Squad** — collective; use in PR descriptions and planning.
- **Agent N** or **A1–A7** — shorthand in file headers and commit messages.
- **Mobile / Psych / Immobility / Architect / Editor / Slender / Artisan** — role nicknames in conversation.

Example commit: `Squad A6+A7+A5: slender mirror pool, stages 0–3 gainStance coverage`
