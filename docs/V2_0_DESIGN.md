# Hall Pass 2.0 — Design Document

Version bump: **1.0.0 → 2.0.0** (legacy fork → RA dorm sim)

## North Star

Every system, scene, and description should feel **more** — more prose, more payoff, more ways to interact with growth, more sensory specificity, more unlockable depth. 2.0 is not a patch; it is a second game built on the first game's skeleton, reframed for a senior **RA** cultivating dorm **residents** (not possession fantasy).

## Five New Major Systems

### 1. Resident Ride (Embodiment)

**Fantasy:** You slip into a resident's perspective — feeling her hunger from the inside, steering her hands toward the fridge, making her do things she'll rationalize later. RA influence mechanic, not possession.

**Loop:**
- Spend AP to **Ride Along** with a resident (1–2 AP by tier)
- While embodied, pick from **embodiment actions** (raid pantry, secret binge, seduce appetite, mirror confession, text the RA, roommate temptation, etc.)
- Each action has weight/corruption/relationship outcomes
- **Release** returns to RA desk; resident retains an echo debuff (+gain next week)

**Unlock gates:**
| Gate | Unlocks |
|------|---------|
| Influence skill `spirit_ride` (Influence T2) | Basic ride-along (1 resident/week) |
| Influence skill `deep_ride` (Influence T3) | Extended actions + 2 ride-alongs/week |
| Hall lounge `embodiment_chamber` | Cheaper ride-along (−1 AP) |
| Resident stage 3+ | Body-aware actions (feel fullness from inside) |
| Resident stage 5+ | Surrender actions (auto-binge, public eating) |
| Resident stage 7+ | Mythic actions (immobile feast from within) |

### 2. Craving Resonance Network

**Fantasy:** Appetite is contagious. When one girl eats with abandon, the others feel it — a web of craving that amplifies the whole floor.

**Loop:**
- Build **resonance links** between resident pairs (costs relationship + AP)
- Linked residents share **craving pulses** when either is fed heavily
- **Network tier** rises with link count → floor-wide passive bonuses
- Weekly **resonance surge** event when network crosses thresholds

**Unlock gates:**
| Gate | Unlocks |
|------|---------|
| Influence skill `hunger_web` (Gluttony T2) | First link slot |
| Hall lounge `resonance_bells` | +2 link slots, surge events |
| Combined floor lbs > 2000 | Network tier 2 |
| Combined floor lbs > 5000 | Network tier 3 (hive appetite) |

### 3. Feast Rituals

**Fantasy:** Ceremonial multi-resident feeding — structured events with escalating spectacle, prose, and payoff.

**Tiers:**
1. **Communion Snack** (2 residents, 2 AP) — shared plate, intimacy prose
2. **Floor Banquet** (4 residents, 3 AP) — courses, competitive eating undertones
3. **Floor Feast** (6+ residents, 4 AP) — full ceremony, hall cred burst
4. **Leviathan Vigil** (immobile residents only, 3 AP) — bedside feasts, mythic prose

**Unlock gates:** hall lounge prestige tree + hall reach + week milestones.

### 4. Body Echo Archive

**Fantasy:** Key transformation moments are preserved. Revisit them with expanded prose — the weigh-in that broke her resolve, the dinner where she unbuttoned, the first time she couldn't see her feet.

**Loop:**
- Auto-capture **echo moments** at milestones (stage-up, corruption tier, evolution, immobility)
- **Archive tab** on resident detail — replay any captured moment
- Replay uses **depth-tier prose** (longer, more sensory each replay)
- **Resonate** action: spend AP to deepen an echo → permanent +gain buff on that resident

**Unlock gates:** influence skill `memory_palace` + hall lounge `echo_gallery`.

### 5. Appetite Dreams

**Fantasy:** Surreal dream-state feeding — impossible portions, symbolic foodscapes, your influence walking through a resident's subconscious appetite.

**Loop:**
- Triggered: end-of-week roll OR manual action (2 AP) on sleeping resident
- **Dream scenarios** keyed by archetype, corruption, weight stage
- Choices within dreams affect waking hunger tier + relationship
- **Lucid dream** unlock: player steers outcome directly

**Unlock gates:** influence skill `dream_walk` + resident corruption 40+ + stage 2+.

## Visual System — Resident Portraits

- Pixel-art silhouette portraits per resident × weight tier (like Lilith sprites)
- Shown on resident detail, embodiment modal, echo archive, dream modal
- `StudentPortrait` component + `studentSprites.js` data

## Prose Expansion Strategy

1. **Depth layers** — every V2 scene ships with `depth.js` (long-form variants)
2. **Stage coverage** — all new pools keyed on weight stage 0–11
3. **Archetype voice** — per-student `when: { studentId }` fragments
4. **Existing scene pass** — add `v2Depth.js` imports to high-traffic scenes (dinner, feed, talk, weigh-in, session)

## Skill Tree Additions (Influence)

| ID | Tree | Tier | Effect |
|----|------|------|--------|
| `spirit_ride` | influence | 1 | Unlock embodiment |
| `deep_ride` | influence | 2 | Extended embodiment |
| `hunger_web` | gluttony | 1 | Resonance links |
| `dream_walk` | corruption | 1 | Appetite dreams |
| `memory_palace` | influence | 1 | Body echo archive |
| `ritual_master` | gluttony | 2 | Feast rituals tier 3+ |

## Hall Lounge Prestige Additions

| ID | Tier | Effect |
|----|------|--------|
| `embodiment_chamber` | 2 | Cheaper inhabit |
| `resonance_bells` | 2 | Resonance network slots |
| `echo_gallery` | 3 | Echo archive + resonate |
| `ritual_kitchen` | 2 | Feast rituals tier 1–2 |
| `dream_chamber` | 3 | Manual dream trigger |

## Integration Points

- New nav tab: **Floor Influence** (embodiment + resonance + rituals hub)
- Resident detail: embodiment button, echo archive panel, dream trigger
- End week: resonance surge roll, dream roll, echo capture
- `player.v2State` object holds all subsystem state
