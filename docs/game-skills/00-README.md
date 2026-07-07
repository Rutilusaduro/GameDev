# Game Skills Pack — Fat-Fetish Text Game Construction

A set of portable skills for building text/menu-driven or text-adventure
games about adult women gaining weight — deep, sexy, fun, and technically
sound. Paste any file into any LLM's context to grant that competence; load
several for full coverage. Each file is self-contained.

## The files

| File | Grants | Load when |
|---|---|---|
| `01-game-design.md` | Core loop, pacing, choice architecture, progression | Designing or extending a game |
| `02-prose-voice.md` | The house voice; banned constructions; escalation craft | Writing ANY player-facing text |
| `03-character-craft.md` | Cast design: archetypes, stances, psych axes, persona voice | Creating or writing characters |
| `04-content-architecture.md` | Beat families, scene templates, coverage, engine wiring, migration | Structuring content at scale |
| `05-fetish-compass.md` | Subgenre map, intensity calibration, what lands | Choosing/writing kink content |
| `06-systems-depth.md` | Hunger, wardrobe, environment, psych state machines | Building game mechanics |
| `07-quality-gates.md` | QA protocol, render review, the live tuning loop, the quality bar | Before shipping; after shipping |
| `08-shell-integration.md` | Wiring the engine into VN / management / parser shells; UI render sites; saves; dev panel | Building or debugging the game body around the engine |
| `09-lexicon-forge.md` | The method for building `word.*` pools for any setting; pool briefs; sourcing sweeps | Creating or expanding the word layer |
| `10-exemplar-gallery.md` | Graded weak→strong passages per beat family, with diagnoses | Calibrating before ANY prose session |
| `11-agent-protocol.md` | Role cards with instantiation prompts, build phases, session discipline, multi-agent scaling | An AI agent running the build |
| `12-any-game.md` | Format translation, POV/subject matrix, premise remap worksheet, rigor tiers, the new-game intake | Starting ANY game that differs from the reference sim in format, POV, or premise |

The engine these skills assume (when one is used) is specified end-to-end
in the **Text Engine Manifesto** (`docs/TEXT_ENGINE_MANIFESTO.md`) — a
self-contained document with a verified reference implementation, a worked
setting pack, and a four-layer lint harness. `04` tells you how to organize
content; the Manifesto tells you how to build and police the machine.

## Hard rules (bind every file; no skill overrides these)

1. **Every character is an adult, always.** College-age or older, 18+,
   written as adults. Never a minor, never anyone who could read as
   underage, never sexualized youth. If a beat would point that way, stop
   and flag it instead of working around it.
2. **Consensual fiction.** Desire drives the arc. Dominance, encouragement,
   and reluctance-to-acceptance arcs are in; violation is not.
3. **No health-consequence framing.** No real pain, medical decline,
   atrophy, or death. Bodies in these games are fantasy-durable; the
   fiction treats size as desirable and sustainable.
4. **No shame-as-truth.** Characters may feel shame (it is a psychology
   dial), and the prose may explore it — the *narrative voice* never
   endorses it. Size is treated as desirable by the world of the game.
5. **Minimal clinical language.** No BMI, no "obesity", no medical
   vocabulary. The lexicon is sensual, spatial, and warm.

## Order of operations for a new game

0. If the game differs from the reference sim in format, POV, or premise
   (it usually does), run the `12-any-game.md` intake first — it
   translates every concept below into the new shape.
1. Read `01` and write the one-page design (loop, cast size, ladder, arc).
2. Read `03`, build the cast sheet. Read `05`, pick the kink palette.
3. Read `04` (+ the Text Engine Manifesto if using the engine), lay out
   beat families and ladders. Build the word layer with `09`; wire the
   shell with `08`.
4. Write content under `02` at all times; calibrate each session against
   `10` first.
5. Gate every release with `07`.

**If the builder is an AI agent, start at `11-agent-protocol.md`** — it
sequences all of the above into phases, roles, and session discipline, and
says when to stop and ask the owner. Its phase 0 consumes the `12` intake.
