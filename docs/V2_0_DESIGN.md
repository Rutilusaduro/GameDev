# Professor Sim 2.0 — Design Document

Version bump: **1.0.0 → 2.0.0**

## North Star

Every system, scene, and description should feel **more** — more prose, more payoff, more ways to interact with growth, more sensory specificity, more unlockable depth. 2.0 is not a patch; it is a second game built on the first game's skeleton.

## Five New Major Systems

### 1. Spirit Embodiment (Possession)

**Fantasy:** The gluttony spirit can slip out of the professor and ride inside a student — feeling her hunger from the inside, steering her hands toward the fridge, making her do things she'll rationalize later.

**Loop:**
- Spend AP to **Inhabit** a student (1–2 AP by tier)
- While embodied, pick from **embodiment actions** (raid pantry, secret binge, seduce appetite, mirror confession, text the professor, roommate temptation, etc.)
- Each action has weight/corruption/relationship outcomes
- **Release** returns to professor body; student retains a "echo" debuff (+gain next week)

**Unlock gates:**
| Gate | Unlocks |
|------|---------|
| Spirit skill `spirit_ride` (Influence T2) | Basic inhabit (1 student/week) |
| Spirit skill `deep_ride` (Influence T3) | Extended actions + 2 inhabits/week |
| Classroom `embodiment_chamber` | Cheaper inhabit (−1 AP) |
| Student stage 3+ | Body-aware actions (feel fullness from inside) |
| Student stage 5+ | Surrender actions (auto-binge, public eating) |
| Student stage 7+ | Mythic actions (immobile feast from within) |

### 2. Craving Resonance Network

**Fantasy:** Appetite is contagious. When one girl eats with abandon, the others feel it — a web of craving that amplifies the whole class.

**Loop:**
- Build **resonance links** between student pairs (costs relationship + AP)
- Linked students share **craving pulses** when either is fed heavily
- **Network tier** rises with link count → class-wide passive bonuses
- Weekly **resonance surge** event when network crosses thresholds

**Unlock gates:**
| Gate | Unlocks |
|------|---------|
| Spirit skill `hunger_web` (Gluttony T2) | First link slot |
| Classroom `resonance_bells` | +2 link slots, surge events |
| Combined class lbs > 2000 | Network tier 2 |
| Combined class lbs > 5000 | Network tier 3 (hive appetite) |

### 3. Feast Rituals

**Fantasy:** Ceremonial multi-student feeding — structured events with escalating spectacle, prose, and payoff.

**Tiers:**
1. **Communion Snack** (2 students, 2 AP) — shared plate, intimacy prose
2. **Class Banquet** (4 students, 3 AP) — courses, competitive eating undertones
3. **Sacred Gluttony** (6+ students, 4 AP) — full ceremony, spirit favor burst
4. **Leviathan Vigil** (immobile students only, 3 AP) — bedside feasts, mythic prose

**Unlock gates:** classroom prestige tree + spirit level + week milestones.

### 4. Body Echo Archive

**Fantasy:** Key transformation moments are preserved. Revisit them with expanded prose — the weigh-in that broke her resolve, the dinner where she unbuttoned, the first time she couldn't see her feet.

**Loop:**
- Auto-capture **echo moments** at milestones (stage-up, corruption tier, evolution, immobility)
- **Archive tab** on student detail — replay any captured moment
- Replay uses **depth-tier prose** (longer, more sensory each replay)
- **Resonate** action: spend AP to deepen an echo → permanent +gain buff on that student

**Unlock gates:** spirit skill `memory_palace` + classroom `echo_gallery`.

### 5. Appetite Dreams

**Fantasy:** Surreal dream-state feeding — impossible portions, symbolic foodscapes, the spirit walking through a student's subconscious appetite.

**Loop:**
- Triggered: end-of-week roll OR manual action (2 AP) on sleeping student
- **Dream scenarios** keyed by archetype, corruption, weight stage
- Choices within dreams affect waking hunger tier + relationship
- **Lucid dream** unlock: player steers outcome directly

**Unlock gates:** spirit skill `dream_walk` + student corruption 40+ + stage 2+.

## Visual System — Student Portraits

- Pixel-art silhouette portraits per student × weight tier (like Lilith sprites)
- Shown on student detail, embodiment modal, echo archive, dream modal
- `StudentPortrait` component + `studentSprites.js` data

## Prose Expansion Strategy

1. **Depth layers** — every V2 scene ships with `depth.js` (long-form variants)
2. **Stage coverage** — all new pools keyed on weight stage 0–11
3. **Archetype voice** — per-student `when: { studentId }` fragments
4. **Existing scene pass** — add `v2Depth.js` imports to high-traffic scenes (dinner, feed, talk, weigh-in, session)

## Skill Tree Additions (Spirit)

| ID | Tree | Tier | Effect |
|----|------|------|--------|
| `spirit_ride` | influence | 1 | Unlock embodiment |
| `deep_ride` | influence | 2 | Extended embodiment |
| `hunger_web` | gluttony | 1 | Resonance links |
| `dream_walk` | corruption | 1 | Appetite dreams |
| `memory_palace` | influence | 1 | Body echo archive |
| `ritual_master` | gluttony | 2 | Feast rituals tier 3+ |

## Classroom Prestige Additions

| ID | Tier | Effect |
|----|------|--------|
| `embodiment_chamber` | 2 | Cheaper inhabit |
| `resonance_bells` | 2 | Resonance network slots |
| `echo_gallery` | 3 | Echo archive + resonate |
| `ritual_kitchen` | 2 | Feast rituals tier 1–2 |
| `dream_chamber` | 3 | Manual dream trigger |

## Integration Points

- New nav tab: **Spirit** (embodiment + resonance + rituals hub)
- Student detail: embodiment button, echo archive panel, dream trigger
- End week: resonance surge roll, dream roll, echo capture
- `player.v2State` object holds all subsystem state
