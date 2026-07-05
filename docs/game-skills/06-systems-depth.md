# Skill: Systems Depth — Mechanics That Make the Fantasy Playable

Prose supplies the heat; systems supply the game. This skill catalogs the
mechanical layers that made the reference implementation deep, ordered by
value-per-effort. Each system: state it tracks, events it fires, prose it
keys. Build them as data + pure functions (engine-free), render at the UI.

## 1. Appetite & hunger (build first)

- **State:** appetite baseline (grows with indulgence), fullness (0–capacity,
  decays per time slot), capacity (grows when limits are approached),
  hunger tier (0–4 derived), addiction level (0–4, grows with player-fed
  meals, decays without).
- **Events:** hunger interrupts (she seeks the player out — urgency scales
  with tier), withdrawal moods at high addiction + neglect, capacity
  milestones.
- **Prose keys:** fullness ratio bands; hunger tier in dialogue; addiction
  in behavior beats. The appetite loop is the engine of everything else:
  bigger appetite → more eating → more weight → bigger appetite. Tune its
  slope carefully; it IS your difficulty curve.

## 2. Wardrobe state (build second)

Full model in `04-content-architecture.md` §5. Systems notes: replacement
costs money and a time slot (economy hook); characters differ in replacement
behavior by stance (opposed replaces instantly; secret keeps the tight ones
deliberately; owned shops a size ahead or refuses to); wardrobe milestones
("first size up", "gave up on the old jeans") are persistent flags with
callback value.

## 3. Furniture & environment scaling

Rate environment objects (chairs, booths, beds, desks, car seats, scales)
with a capacity stage. Subject stage vs object stage yields: fine / snug /
complaining / at-risk / failed / N-A-needs-alternative. Failures are
events + persistent world flags (the broken office chair stays broken and
mentioned). At high stages, flip from "does she fit" to "what has been
replaced for her" — reinforced seating, widened doorways, the custom scale.
Every replacement is a devotion beat and a money sink.

## 4. Psychology state machines

Axes from `03-character-craft.md` §4, mechanized: each axis is a 0–3 tier
with thresholds; player actions and events push values; **tier crossings
fire scenes** (the psych shift scene: interior monologue + changed behavior
demo). Interaction rules worth hardcoding: high shame suppresses public
scenes until ownership flips how they read; high dependence + neglect
generates interrupts; obsession unlocks mirror/self content. Keep the
master corruption axis (denial→acclimating→owned) as the spine every
dialogue system keys on.

## 5. Relationship & trust

Tiers gate scene access, dialogue registers, and heat band. Earn via time
spent, kept promises, reading her right (choosing the option matching her
stance beats generic kindness). Track per-character; display it; let high
tiers unlock her *initiating*.

## 6. Time & economy

Week structure with N action slots; scenes cost slots; income (job/salary)
per week; costs: meals (scaling with her appetite!), wardrobe, furniture,
gifts, venues. The genre-specific trick: **her growth raises the cost
curve**, so midgame prosperity becomes endgame logistics — feeding an
endgame appetite is a project, and that project is content.

## 7. Interrupts & living-world events

A scheduler that checks per time slot: hunger interrupts, wardrobe
emergencies, rival/NPC events, weather/season beats, random craving calls.
Weight by state so the world escalates with the cast. Interrupts are the
system that makes characters feel alive between player-initiated scenes;
budget at least one interrupt family per major system. Interrupt scenes
are multi-slot (arrival + behavior + request): have the behavior beat
establish a tone fact the request must agree with, or an irritated
behavior will pool with a pleading request and read as two different
women at the door.

## 8. Meta-progression & endings

- Persistent flags feed an epilogue matrix (final stage × corruption ×
  relationship per character).
- New-game+ hooks: unlocked start states, remembered wardrobe, a gallery
  of achieved thresholds.
- Optional ascension/prestige for open-ended games: a character "completes"
  (reaches her arc's crown state) and becomes a fixture NPC with her own
  reaction stance, freeing the player's slots for the next arc.

## 9. Save/persistence checklist

Persist: all character stats + psych values + wardrobe (with integrity) +
world flags + week + economy + no-repeat memory (as arrays). Derive
everything else. Version your save shape from day one; migration pain
arrives otherwise.

## 10. Tuning heuristics

- First rung crossing within the first 15 minutes of play.
- A visible change (prose, wardrobe, furniture, dialogue) every 2–3 player
  actions.
- No dead slots: every action either moves a number, fires a beat, or
  banks a resource — and SAYS so.
- Endgame check: at the ceiling stage, count the systems still producing
  choices. Fewer than three means the endgame is a wall; add logistics,
  devotion, and world-adaptation systems until it isn't.
