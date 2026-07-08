# Skill: Game Design — Fattening Games That Are Actually Games

You are designing a text/menu-driven or parser/text-adventure game about
adult women gaining weight. The fetish supplies the *reward*; this skill
supplies the *game*. A gallery of hot scenes with buttons is not a game and
players feel the difference within ten minutes.

## 1. The core loop

Every fattening game is some arrangement of one loop:

**observe → invest → feed/influence → change → react → anticipate**

- **Observe:** the player reads a character's current state — body, mood,
  wardrobe, appetite. Rich observation IS the pornography of this genre;
  budget most of your prose here.
- **Invest:** the player spends a limited resource — time slots, money,
  meals, attention, trust. Scarcity is what makes feeding a *choice*.
- **Change:** numbers move (weight, appetite, psychology). Changes echo in
  future observations — that echo is the payoff loop.
- **React:** the character and the world respond: dialogue shifts, clothes
  strain, furniture complains, other characters comment.
- **Anticipate:** the player can see the NEXT threshold coming (a stage
  boundary, a wardrobe failure, a psychological turn) and wants it.

Design test: at any moment, the player should be able to answer "what am I
working toward right now, and what do I expect to see when I get there?" If
the answer is vague, the loop is broken — no amount of prose fixes it.

## 2. Ladders, not sliders

Continuous stats are invisible; **thresholds create events**. Build every
axis as a ladder of named rungs:

- **Weight stages** — 8 to 12 rungs from slim to whatever your ceiling is
  (immobility, room-filling, beyond). Each rung changes description,
  movement, wardrobe, furniture, NPC reactions, and available scenes. A
  12-rung reference ladder: slight / slim / soft / chubby / plump / heavy /
  fat / very fat / enormous / colossal / blob / leviathan — with pounds
  thresholds roughly geometric (each rung ~1.25–1.4× the last).
- **Psychology tiers** — 3–5 rungs per axis (see `03-character-craft.md`).
- **Relationship tiers** — gate intimacy and scene access.

**Crossing a rung is always an event.** Never let a threshold pass silently:
fire a scene, a realization, a wardrobe casualty. Rung-crossing scenes are
your most anticipated content; over-invest in them.

## 3. Pacing — the slow-burn contract

The genre's engine is anticipation. Fast gain reads as a numbers screen;
glacial gain reads as grinding. The contract:

- **Early game:** small numbers, huge attention. +4 lbs at 130 deserves
  more prose than +40 at 400. First-softness content is the most
  emotionally loaded in the genre — do not rush stages 0–3.
- **Midgame:** momentum. Gains accelerate, psychology shifts drive the
  story, wardrobe and furniture consequences arrive in waves.
- **Endgame:** scale and consequence. Movement economy, environment
  adaptation, devotion. The endgame needs *systems*; adjectives alone make
  immobility a wall instead of a destination.
- **Interleave arcs:** with a cast, stagger characters across stages so the
  player always has someone at the "interesting" rung of every arc.

## 4. Choice architecture

- **Menu-driven:** 3–5 options per beat. Every option should differ in
  *kind*, not degree ("feed her the rich thing / press about her mirror
  habit / say nothing and watch"). Include one observation-only option in
  most menus — players of this genre want to LOOK.
- **Text-adventure/parser:** verbs are content promises. If FEED, LOOK,
  MEASURE, and WEIGH exist, each needs state-aware responses everywhere.
- **Refusals are content.** A character declining (too full, too shy, wrong
  relationship tier) is a characterization beat, and refusal→acceptance
  over time is the genre's best arc. Write refusals as lovingly as yeses.
- **Player expression:** let the player choose an approach identity —
  gentle encourager, indulgent provider, dominant feeder, scientist — and
  reflect it back in dialogue tone.

## 5. Economy

One scarce resource minimum (time slots per week beats money; money can be
earned to trivial surplus, time cannot). Attach costs to: meals out,
special foods, wardrobe replacement, furniture upgrades, gifts. Let
appetite growth quietly raise the cost curve — an endgame appetite should
strain an early-game budget, forcing reinvestment.

## 6. Structure and endings

- **Time-boxed** (a semester, a year, N weeks): forces prioritization
  across the cast; replayable by design. Recommended default.
- **Open-ended:** needs meta-progression to avoid drift (unlockable
  locations, escalating storylines, prestige/ascension resets).
- **Other formats** (VN routes, parser turns, idle ticks, chat scenes):
  the same loop wears different clothes — translate via `12-any-game.md`
  §2 before designing.
- **Endings:** per-character epilogues keyed to final stage × psychology ×
  relationship. Write ending matrices, not single endings — the player
  should finish a run wondering what the other cells look like.

## 7. What "fun" means here (design against these failure modes)

| Failure | Symptom | Fix |
|---|---|---|
| Slot-machine | Player mashes FEED, ignores text | Scarcity + visible thresholds + rung events |
| Numbers wallpaper | Weight changes, prose doesn't | State-keyed prose at word level (see `04`) |
| Museum | Beautiful scenes, no decisions | Every scene ends in a choice that matters next scene |
| One-note cast | All girls respond identically | Persona voice + stance + psych axes (`03`) |
| Stall wall | Endgame is adjectives | Endgame systems: assistance, logistics, devotion play |

## 8. The one-page design doc

Before writing content, produce: core loop diagram (one paragraph); resource
list with scarcity; the weight ladder with per-rung one-line promises; cast
list with arc one-liners; scene/beat family list; ending matrix axes. If it
doesn't fit on one page, the design isn't ready.
