# Professor Sim — Game Bible

A reproduction-oriented design reference for **Professor Sim** (*professor-sim*). This document describes the game's fantasy, loop, data model, characters, systems, content catalog, and text architecture so that a developer (or LLM) could rebuild a functionally equivalent game without reading source code. Prose and dialogue are summarized by *structure and intent*, not quoted verbatim.

---

## 1. High concept

**Genre:** Narrative management / feeder simulation with RPG progression, campus exploration, and branching character arcs.

**Fantasy:** You are a **gluttony spirit** who inhabits a university professor at the start of semester. Your class is a roster of young women you cultivate — through food, relationship, corruption, devices, and evolved life paths — into ever-larger embodiments of appetite and surrender. The tone blends dark comedy, indulgence, body-transformation fetish content, and slow-burn character drama.

**Core tension:** Grow the class while managing **Action Points (AP)**, **admin scrutiny**, student **relationships**, and hidden tracks (**corruption**, **hunger/addiction**, **psych state**). Late game opens **evolved forms** — each student can pivot into a distinct endgame fantasy (sumo, streamer, chemist, inventor, hive queen, etc.).

**Win state:** There is no hard win; progression is open-ended across weeks, achievements, evolved paths, lab inventions, campus saturation, and narrative milestones.

---

## 2. Session structure & game loop

### 2.1 Opening

1. **Spirit intro** — Lore text: gluttony spirit vs. modern scarcity culture; professor is "the first door."
2. Player clicks **Inhabit the Professor** → game begins at **Week 1**, **5 AP**, **$850**, empty skill trees.

### 2.2 Weekly loop

```
┌─────────────────────────────────────────────────────────────┐
│  PLAYER TURN (spend AP on actions until depleted or done)   │
│  · Per-student: Talk, Dinner, Private Session, Items,       │
│    Evolved activities, Devices, Intimacy, Weigh-in          │
│  · Class-wide: Pizza, Potluck, Feast, Group Dinner, Class   │
│  · Meta: Campus explore, Lab build, Skill purchases        │
└───────────────────────────┬─────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  END WEEK                                                    │
│  · Hunger interrupt check (may block advance)              │
│  · Week++, grant AP (cap 20)                                 │
│  · Passive lbs/class events/device ticks/digestion           │
│  · Relationship ecology, scrutiny, saturation, pantry restock│
└─────────────────────────────────────────────────────────────┘
```

### 2.3 Primary UI views

| View | Purpose |
|------|---------|
| **class** | Roster grid; click student → detail |
| **student** | Full detail: stats, diary, evolved panel, actions |
| **actions** | Class-wide AP actions |
| **inventory** | Pantry items → target student |
| **campus** | 18-node exploration map |
| **lab** | Talia's workshop: parts, tech tree, blueprints |
| **devices** | Built device inventory, equip/use |
| **skills** | Classroom prestige skill tree (lbs-cost upgrades) |
| **achievements** | Milestone tracker |
| **log** | Event history |

Navigation tabs appear dynamically (e.g. **student** tab when one is selected).

---

## 3. Core resources

| Resource | Start | Notes |
|----------|-------|-------|
| **Week** | 1 | Semester milestones at weeks 5, 10, 15, 20, 25, 30 |
| **AP** | 5/week base | Cap 20; modified by classroom skills, prestige-lite, scrutiny penalties |
| **Money** | $850 | Dinners, lab builds, Destiny shop, etc. |
| **Admin scrutiny** | 0 | Rises from visible large students, campus device use, network; gates random events |
| **Spirit level** | 1 | `1 + floor(totalClassLbsGained / 40)` — boosts force-feed |
| **Spirit skill points** | level − 1 | Spent in Influence / Gluttony / Corruption trees |
| **Classroom prestige** | 0 | Spent on `SKILL_TREE` upgrades (costs 50–2000 "prestige" bought with **student lbs**) |

---

## 4. Student data model

Each student (`INIT_STUDENTS`) has:

| Field | Description |
|-------|-------------|
| `id` | 0–18 roster index |
| `name`, `archetype`, `role`, `age`, `bodyType` | Identity & flavor |
| `lbs`, `startLbs` | Current and starting weight |
| `relationship` | 0–100; default 20 (Sophia/Talia 18, Lilith 0, Indiana 10) |
| `mood` | happy, focused, stressed, tired, etc. — filters class scenes |
| `personality` | commanding, analytical, dry, etc. — voice in text engine |
| `corruption` | 0–100 hidden psyche track |
| `fullness`, `stomachCapacity`, `consumedCalories` | Stomach model |
| `evolvedForm` | null or form id after evolution |
| `evolvedSkills[]`, `evolvedSkillsSpent` | Post-evolution skill purchases (lbs currency) |
| `equip` | Device slots (head, neck, back, waist, legs, fullBody, etc.) |
| `psych` | fixation, obsession, dependence, shame (0–100 each) |
| `hidden` | Lilith, Indiana Bones start hidden |
| `addictionLevel`, `hungerTier`, `weeksWithoutPlayerFeed` | Sophia hunger track (also generalizable) |

**Body types** (affect description text): pear, straight, hourglass, athletic, apple, rotund, voluptuous, mom_bod, fertility_goddess.

---

## 5. Weight stages

12 stages by `lbs` threshold (`WEIGHT_STAGES`):

| ID | Label | Min lbs | Narrative role |
|----|-------|---------|----------------|
| 0 | Slight | 80 | Underweight baseline |
| 1 | Slim | 120 | Early softness |
| 2 | Soft | 135 | Visible curve |
| 3 | Chubby | 162 | Tight clothes |
| 4 | Plump | 195 | Belly, double chin |
| 5 | Heavy | 238 | Waddle, creaking chairs |
| 6 | Fat | 285 | Rolling walk |
| 7 | Very Fat | 360 | Wide doorways |
| 8 | Enormous | 465 | Couch-filling |
| 9 | Colossal | 595 | Hallway issues |
| 10 | Blob | 820 | Immobile |
| 11 | Leviathan | 1000 | Mythic scale |

Stages drive: appearance text, outfit descriptions, attitude lines, diary entries, evolved activity tier index, scrutiny contribution (stage 5+), immobile redirects for dinner.

---

## 6. Gaining & stomach model

**Design principle:** Most feeding adds **calories + fullness**, not immediate lbs. Weight converts at **week end** via digestion. **Evolved activities, mini-games, compounds with immediateLbsGain, and device set-pieces** bypass this and apply direct lbs.

### 6.1 Key constants

- `calsPerLb`: 3500
- `baseCapacity`: 100 fullness units (+ scaling from starting weight)
- Capacity growth: +15 per 50 lbs gained; +30 on stage-up
- Stuffed week: 50% base (+10%/streak) chance +5 permanent capacity
- Force-feed base chance: 45% + 4%/spirit level − overfill penalties + corruption bonus (+0.3%/point, max +30%)

### 6.2 Feed flow

1. Action specifies calories + fullness cost.
2. If `fullness + cost > capacity` → roll force-feed (or auto-success at corruption 90+ with Total Surrender skill).
3. On success: bank calories in `consumedCalories`, apply corruption/rel gains, optional inner-voice line.
4. Week end: `digestStudent()` converts calories → lbs with metabolic/digest multipliers; reset fullness (partial carryover from skills).

### 6.3 Passive gain (weekly)

Per visible student: random 1–3 lbs + skill passives + semester/random events + corruption auto-eating + campus/pharmacist/cult/saturation bonuses. Lilith: fixed 1 lb/week. Reneé skips while cultivator digesting.

---

## 7. Relationship system

### 7.1 Inner Circle tiers

| Tier | Label | Min rel | Unlocks |
|------|-------|---------|---------|
| 0 | Acquaintance | 0 | Base interactions |
| 1 | Close | 45 | Private sessions |
| 2 | Intimate | 70 | Intimacy scenes, premium venues |
| 3 | Devoted | 90 | +10% gain bonus, max trust content |

### 7.2 Relationship ecology (weekly)

- **Decay:** 3+ weeks without player feed → −2 rel/week (max −5); Devoted exempt
- **Favoritism:** Feed-count gap ≥ 3 → favored +1, neglected −3
- **Hunger denial:** −5 to −14 rel by hunger tier when refusing feed

### 7.3 Group dynamics

- **Group dinner:** Two students; jealousy lines for thin vs. fed pairings (`THIN_JEALOUSY`, `FAT_ENCOURAGE`)
- **Influence pairs:** Friend weight convergence events in `content.js`

---

## 8. Corruption (hidden psyche)

| Tier | Min | Label | Weekly auto-lbs | Behavior |
|------|-----|-------|-----------------|----------|
| 0 | 0 | Hesitant | — | Embarrassed inner voice on feeds |
| 1 | 34 | Conflicted | 0–2 | Accepts conflict |
| 2 | 67 | Broken In | 1–4 | 35% self-stuff at week end |

**Sources:** force-feed (+2), stuffed week (+1), stage-up (+3), talk topics, skills, compounds.

**Reveal:** Relationship ≥ 55 shows psyche tier on student detail.

**Talk registers:** Submissive / Broken codas append at high corruption when skills unlocked.

---

## 9. Hunger & addiction

Parallel track (strongest on Sophia; system supports all students):

| Addiction | Levels 0–4: None → Dependent |
| Hunger tier | 0–4: Normal → Starving (capped at 2 if addiction < 2) |

- Passive hunger rise weekly by addiction level
- **Withdrawal:** addiction ≥ 2 and 2+ weeks without player feed → 0.55× gain, mood/rel penalties, 55% interrupt chance before week advance
- **Feed resolves hunger:** tier-based drop; talk −1 hunger
- **Interrupts:** `pickInterruptStudent()` — craving/starving/withdrawal scenes block actions

---

## 10. Psych state (four axes)

Each 0–100: **fixation, obsession, dependence, shame**. Tier labels at 25/50/75. Modified by devices, force-feeder outcomes, network mesh. Feeds growth-event tone and device dependence scaling.

---

## 11. Spirit skill trees

Three trees (`skillTrees.js`), points = spirit level − 1. Tier 2/3 unlock at 3/8 points spent in-tree. Rank costs: 1/2/3 by tier.

### 11.1 Influence

Compliance & talk unlocks: force-feed bonus, **Suggest** topics (−10% refusal week), **Command** topics (extreme calories), Break Resistance (1/week bypass), Mesmerizing Aura (+35% rolls/week), Echoed Will, Heavy Hand, etc.

### 11.2 Gluttony

Capacity, conversion, fullness carryover, calorie bonus, Glutton's Instinct (self-feed above 70% fullness), Body's Surrender (physical traits), **Devour** command unlock.

### 11.3 Corruption

Shame erosion, craving submission, willing vessel, total surrender (no refusal at 90+ corruption), corruption rate boosts.

---

## 12. Classroom prestige skills (`skills.js` → `SKILL_TREE`)

Purchased with **lbs from students** (skill purchase modal allocates weight loss per girl). Six tiers (costs 50 → 2000). Categories:

- **Environment:** comfy chairs, beverage bar, ambient aroma (+passive lbs, gain mult)
- **Feeding:** snack station, artisan bakery, late-night access
- **Efficiency:** +AP, session capacity
- **Social:** dinner venue unlocks (Bistro → Upscale → Private → Atelier)
- **Psychology:** comfort framing, behavioral observation
- **Prestige:** grand banquet, scrutiny reduction, endgame classroom upgrades

Each skill has `passiveBonus`, `apBonus`, `gainMult`, `unlocks[]`, and flavor **class reactions**.

---

## 13. Player actions catalog

### 13.1 Single-student (`ACTIONS_SINGLE`)

| Action | AP | Effect |
|--------|-----|--------|
| Take to Dinner | 2 | Multi-course venue dinner → calories/fullness + conversation choices |

### 13.2 Class actions (`ACTIONS_CLASS`)

| Action | AP | Calories (class) | Fullness |
|--------|-----|------------------|----------|
| Pizza Party | 3 | 12k–24k | 40 |
| Potluck | 2 | 9k–18k | 30 |
| Holiday Feast | 5 | 28k–52k | 70 |
| Group Dinner | 3 | 14k–30k | 45 (two students) |

### 13.3 Talk (`TALK_CONFIG`: 1 AP)

| Topic | Gate | Effect |
|-------|------|--------|
| Check in | — | +2 rel |
| Compliment figure | — | +3 rel |
| Encourage appetite | — | +1 rel, +1 corruption (text engine) |
| Plant suggestion | Influence T1 | +2 corruption, −10% refusal week |
| Suggest meant for more | Influence T1 | +3 corruption |
| Command: clean plates | Influence T3 | 6000 cal, 30 full, +3 corruption |
| Command: devour | Devour unlock | 45k cal, 100 full, +18 corruption, devour scene |

### 13.4 Private session (2 AP, Close tier+)

Food selection → fullness stages 0–5 → tap-out probability 150%–250%+ → encouragement actions → capacity bonus +8 on completion. Blob students: professor climbs to feed (unique intro text per id).

### 13.5 Dinner venues (`DINNER_VENUES`)

Tiered unlocks via classroom skills. Each venue: dishes (cal + full), conversation actions (skill-gated), ending narrative grid by stage × fullness.

### 13.6 Intimacy (1–2 AP, Intimate tier+)

Multi-phase scenes per archetype/student. Choices: rel, optional lbs, flags. Entry from private session high fullness or student detail "Get Close."

### 13.7 Weigh-in

Interactive scale scene via text engine (`weighIn/`): stage reactions, break scenes, persona-specific voice.

### 13.8 Inventory items

Pantry restocks 2–3 random items/week. Use on student → calories + fullness.

| Item | Cal | Full |
|------|-----|------|
| Weight-Gain Shake | 2400 | 10 |
| Dozen Donuts | 3600 | 22 |
| Family Lasagna | 5200 | 34 |
| Whole Cake | 7800 | 42 |
| Heavy Cream Latte | 1400 | 6 |
| Snack Crate | 4600 | 26 |
| Banquet Platter | 9800 | 55 |
| Double-Cream Fudge | 6400 | 18 |
| + exploration-only finds | varies | varies |

---

## 14. Character roster

### 14.1 Core class (visible day 1)

| ID | Name | Archetype | Start lbs | Evolution paths |
|----|------|-----------|-----------|-----------------|
| 0 | Brittany | cheerleader | 118 | Eating Captain, Body Positive Captain |
| 1 | Madeline | bookworm | 125 | Community Researcher |
| 2 | Kylie | influencer | 122 | Feedee Channel, Body Positive Platform |
| 3 | Serena | athlete | 145 | Sumo, Circuit Competitor |
| 4 | Fiona | artsy | 115 | Installation Artist, Food Photographer |
| 5 | Destiny | gamer | 155 | Ranked Feedee, Eating Streamer |
| 6 | Tiffany | sorority | 128 | Chapter Hostess |
| 7 | Priya | overachiever | 120 | Competitive Gainer |
| 8 | Maya | quiet | 130 | Home Nest, Delivery Hive Queen |
| 9 | Chloe | transfer | 135 | Campus Legend |
| 10 | Reneé | culinary | 148 | Cultivator (special unlock) |
| 11 | Kaylee | nursing | 132 | *(no evolution offer)* |
| 12 | Nadia | psych | 117 | Psych Researcher |
| 13 | Daisy | eced | 138 | Homeroom Queen (Apprentice) |
| 14 | Mary Jane | farm_girl | 125 | Wife Lessons, Homestead Queen, State Fair Queen |
| 16 | Sophia | pharmacy_grad | 122 | Pharmacist (Chemist) |
| 18 | Talia | inventor | 118 | Machine Goddess (Inventor) |

### 14.2 Hidden characters

**Lilith (id 15, predator)** — Hidden until investigation: feast clue → 1 AP room 312. Passive 1 lb/week. Hunt campus map for men (seduction minigame). `lilithKillCount` gates Reneé's Cultivator evolution. Feasting Beauty path; no standard evolution modal.

**Indiana Bones (id 17, explorer)** — Hidden until campus secret `library_basement` (requires 7+ secrets + prereq chain). Relic hunter quests link to pharmacist saturation loot.

### 14.3 NPCs

- **Cultivator taste tester** — Procedural name from pool; 295 lbs start; Reneé's sub-game
- **Faculty (6):** Dr. Imogen Hartley (Classics), Coach Dana Brooks (Athletics), Prof. Yuki Mori (Food Science), Dr. Celeste Abara (Psychology), Chef Rosa Delgado (Culinary), Ms. Penny Lockwood (Registrar) — affinity 0–100, lounge dialogue
- **Lilith hunt targets:** 14 named men + Danny (delivery, blob-only)
- **Homeroom Queen participants:** 6 named moms/students in Daisy's path
- **Chapter Hostess NPCs:** Sisters Courtney, Madison, Savannah; alumni Camille

---

## 15. Evolution system

### 15.1 Default unlock

- Weight stage ≥ **4 (Plump)** — *except culinary*
- Relationship ≥ **60**
- No existing `evolvedForm`
- Archetype has entry in `EVOLUTION_OFFER`

### 15.2 Cultivator exception (Reneé)

- `lilithUnlocked` AND `lilithKillCount ≥ 1` AND relationship ≥ 60 (no weight stage gate)

### 15.3 Evolution flow

1. Student detail shows **Propose a New Direction** button
2. Modal: path-specific intro + 1–2 choices (`EVOLUTION_OFFER`)
3. Sets `evolvedForm` id
4. Unlocks evolved activity button, skill tree (if any), custom UI panels

### 15.4 Activity stage index

`min(max(weightStageId - 5, 0), 4)` → 5 tiers mapping to weight stages 5–9+. Drives `EVOLVED_EVENTS` branching narratives and reaction lines.

### 15.5 Evolved skill trees

Spend **lbs gained since start** minus prior spends. Five skills per tree typical costs: 20 / 40 / 70 / 110 / 160 lbs. Effects: passiveBonus, activityGainBonus, activityRelBonus, weeklyScrutinyReduce, freeActivityCharge, doubleActivityCharge.

### 15.6 Arrival capstones (stage 9+)

2 AP, +8–14 lbs, repeatable. Forms: sumo, eating_streamer, feedee_creator, machine_goddess, competitive_gainer, delivery_hive.

---

## 16. Evolution paths — detailed

### Athlete (Serena)

**Sumo (`sumo`):** Tournament arc vs Dana Mercer; activity +4–8 lbs; interactive `EVOLVED_EVENTS` per stage; sumo skill tree; eating contest mini-game tie-in.

**Circuit (`eating_competitor`):** Timed eating records; +3–7 lbs/activity.

### Influencer (Kylie)

**Feedee Creator (`feedee_creator`):** Collab partner picker; stream/recording content; Wren recurring character; +3–6 lbs.

**Body Positive Creator (`body_positive_creator`):** Rebrand → TEDx → billboard arc; +2–5 lbs.

### Cheerleader (Brittany)

**Eating Captain (`eating_captain`):** Squad competition circuit; +4–7 lbs.

**Big Squad Captain (`big_squad_captain`):** Abolish weigh-ins; culture change; +2–5 lbs.

### Bookworm (Madeline)

**Community Researcher (`community_researcher`):** Custom UI — NOT generic activity.

1. **Present Thesis** (1 AP) → unlock case studies
2. Pick **4 of 7 case study pairs** (1 AP each) — adds suspicion + lbs
3. **Final review** (1 AP) — outcome by suspicion bracket (green/yellow/orange/red)
4. Optional **faculty chats** if orange/red (Ward, Harmon, Chen)

Case study pairs:

| ID | Pair | Suspicion | Gain |
|----|------|-----------|------|
| social_pressure | Kylie & Tiffany | 1 | 4–8 |
| competitive | Brittany & Serena | 2 | 6–11 |
| night_in | Destiny & Maya | 3 | 4–8 |
| culture_shock | MJ, Fiona & Chloe | 4 | 5–9 |
| metrics | Priya & Kaylee | 5 | 5–10 |
| manipulation | Daisy & Nadia | 6 | 8–14 |
| vore | Reneé & Lilith | 7 | 15–25 (needs Lilith) |

### Gamer (Destiny)

**Ranked Feedee (`ranked_feedee`):** Rae delivery + ranked gaming; +8–22 lbs/session.

**Eating Streamer (`eating_streamer`):** Full **focus-bar mini-game** — pre-stream choices, challenge types (endurance/speed/sensual/chaotic/greedy), stamina/tap-out, brand selection (CrunchForge, FizzPeak, VelvetMelt, GlazeCo), loyalty tiers, Destiny spend shop, money split 50/50, milestone events.

### Sorority (Tiffany)

**Chapter Hostess (`chapter_hostess`):** 6 feast stages; prep days with Kylie (guests), Fiona (atmosphere), Reneé (menu); upgrade tracks 0–6; procedural feast; sister + Camille gains; suspicion from scale.

### Overachiever (Priya)

**Competitive Gainer (`competitive_gainer`):** Corkboard measurements vs classmates; spirit tiers Invested→Ruthless; binge 10–50 lbs; group chat with professor nudges; rich text pools by weight band × spirit.

### Quiet (Maya)

**Home Nest (`home_nest`):** Delivery routine; +6–15 lbs.

**Delivery Hive (`delivery_hive`):** 6×4 dorm grid strategy; tasks (food, supply, expansion, maintenance, recruitment); stats (biomass, comfort, resonance, stability); Vice Queens (Lilith, Nadia, Kaylee, Reneé, Daisy); room bonuses; integrates pharmacist campus + spirit pressure.

### Transfer (Chloe)

**Campus Legend (`campus_legend`):** Food challenge circuit; booth meals; +5–10 lbs.

### ECED (Daisy)

**Homeroom Queen (`homeroom_queen`):** Tuesday school sessions; 6 NPC participants; baking sessions; suspicion meter; parent conference events; group activities; +4–9 lbs.

### Farm girl (Mary Jane)

**Wife Lessons (`wife_lessons`):** Neighborhood women philosophy; +5–12 lbs.

**Homestead Queen (`homestead_queen`):** Grandma Mae, cast iron, recipes; +5–10 lbs.

**State Fair Queen (`state_fair_queen`):** Training hub with evolved collaborators; fair day weigh-in/judging; Fair Pride meter; +varies.

### Psych (Nadia)

**Psych Researcher (`psych_researcher`):** Pick feeder/feedee subject; journal pages per focus; +4–9 lbs.

### Culinary (Reneé)

**Cultivator (`cultivator`):** Recruit taste tester (295 lbs); 4 harvest cycles max; taste-test sessions (branching foods); fat bar + suspicion bar; digest weeks between cycles; harvest transfers lbs to Reneé (65–470 by tester stage).

### Pharmacy (Sophia)

**Pharmacist (`pharmacist`):** Four stages by synthesis sessions (0/3/7/12):

| Stage | Label | Unlocks |
|-------|-------|---------|
| 1 | Corporate Chemist | Stage-1 compounds, home synthesis |
| 2 | Wellness to Excess | Campus fattening, stronger compounds |
| 3 | Cult Chemist | Circle distribution, addiction cure |
| 4 | Goddess of Excess | Ascension protocol |

**16 compounds** with cal/full mult, corruption, addiction/hunger deltas, immediate lbs, metabolic slowdown.

**Exposure risk** 0–100 → audit events, synthesis pause.

**Cult (stage 3+):** Circle size max 40, devotion, supply reservoir; distribution routes (pickup, dorm captains, union bulk, tithe).

**Campus narrative tiers:** Softening → Saturated → Regional Excess — passive lbs, weekly events, hive pipeline.

### Inventor (Talia)

**Machine Goddess (`machine_goddess`):** Lab sessions gather parts; research blueprints; build devices spending **Talia's own lbs** (min 125/140/160 by tier); instability + breakthroughs; stage 2+ **network mesh**; +2–6 lbs/session.

---

## 17. Lilith — Feasting Beauty

- **Unlock:** Investigation chain from group feast clue
- **Hunt map:** 11 nodes with stage-gated access (shrinks as she grows; blob = delivery only)
- **Seduction:** Approach men → difficulty 1–3 → consume → kill count++
- **Physical moves unlock by weight:** Hip Sway 150, Belly Press 240, Cleavage Smother 340, Gut Press 540
- **Digestion:** Blocks hunting until complete
- **Passive:** 1 lb/week always
- **Excluded** from scrutiny as "visible large student" count

---

## 18. Campus exploration

### 18.1 Map (18 nodes)

office, lecture_hall, science_wing, quad, library, dining_hall, gym, dorms, faculty_lounge, garden, food_court, student_union, coffee_shop, arts_wing, outdoor_track, health_center, theater, rooftop

Movement via exits; **Look**, **Search**, **Talk** actions cost AP in campus view.

### 18.2 Exploration rolls (on travel)

| Event | Chance |
|-------|--------|
| Travel flavor | 62% |
| Student sighting | 48% |
| Ingredient find | 22% |
| Secret progress (search) | 38% |
| Lilith sighting | 4% (if unlocked) |

### 18.3 Ten campus secrets (chain)

Examples: archive carrel → lab cold room → rooftop rune → gym tunnel → dining cellar → library basement (unlocks Indiana Bones). Solve types: **search** (RNG on Search) or **observe** (repeated Look). Gates: `campusTierMin`, `minSecretsSolved`, prerequisite ids.

### 18.4 Indiana Bones quests

| Quest | Nodes | Reward |
|-------|-------|--------|
| Tunnel Markings | gym → outdoor_track | tunnel_fungus |
| Botanical Specimen | garden → science_wing | archive_herb |
| Basement Inscriptions | library → theater | basement_relic |
| Wellness Trail | union → dining → rooftop | saturated_extract (needs campus tier 2, Sophia stage 3) |

---

## 19. Lab, devices & network

### 19.1 Lab loop (Talia)

1. **Run lab session** (1 AP) → gather parts by stage
2. **Research** blueprint via tech tree (breakthroughs 💡)
3. **Build** device — costs parts + money + Talia lbs
4. Equip on students or use as events

**Parts:** scrap, circuits, servos, reagents, exotics.

### 19.2 Nine inventions

| Device | Type | Slot/Use |
|--------|------|----------|
| Force Feeder (feeding_mask) | event/station | Rhythm mini-game |
| Auto-Feed Arm | equip | back |
| Obedience Belt | equip | waist |
| Weight Belt (auto_bloating_belt) | equip | waist |
| Furniture Harness | equip | fullBody |
| Reinforced Legs | equip | legs |
| Growth Chamber | event | tuning mini-game |
| Growth Formula (serum) | consumable | inject |
| Hunger Ray | campus_tool | pulse/sustain modes |

Each has stability, risk, weekly effects, malfunctions, growth profiles.

### 19.3 Tech tree (`labTechTree.js`)

Breakthrough currency; categories: core, feeding, restraint, structural, automation, nexus. Stage gates auto-unlock automation (stage 2) and nexus (stage 3).

### 19.4 Circuit boards (`inventionUpgrades.js`)

Per-device mastery trees; Force Feeder most developed (choke meter, timing windows, burst mode). Points from use performance (perfect/good/messy).

### 19.5 Device gating

Corruption tier required to equip certain devices; intensity mult 0.72 / 1.0 / 1.18 by tier.

### 19.6 Device usage mini-games

| Type | Devices |
|------|---------|
| Rhythm | Force Feeder |
| Tuning | Growth chamber, serum |
| Route allocation | Auto-feeder arm, endless hunger |

### 19.7 Network (lab stage ≥ 2)

Nodes with automation levels; weekly mesh drip (55% chance lbs to random student if automation ≥ 25); detection risk → scrutiny; Talia proposals approve/deny; subject influence from avg relationship.

### 19.8 Campus device encounters

38% on travel if lab active; target NPC or student; applies gain + discovery risk → scrutiny.

---

## 20. Mini-games catalog

| Mini-game | Trigger | Mechanics |
|-----------|---------|-----------|
| **Force Feeder rhythm** | Installed mask, run session | 8 beats, choke meter, perfect→failure tiers → stage bumps, psych deltas |
| **Eating contest** | Maya evolved events | Food pools, unbutton/rub/taunt/steal actions, Maya weight curve |
| **Sumo bout** | Serena evolved | Moves, corner feeding, ring-fill, vs Dana |
| **Collab stream** | Kylie feedee_creator | Food queue, Wren lines, blob announcement |
| **Recording session** | Kylie tier 3+ rel | Angle/food/pace → quality tiers |
| **Stream focus bar** | Destiny eating_streamer | Pre-stream, challenges, stamina, tap-out, brand loyalty |
| **Device tuning** | Chamber, serum | Magnitude vs stability → quality tier |
| **Device route** | Feeder arm, hunger ray | Allocate belly/campus/reserve |
| **Lilith seduction** | Hunt map | Approach → difficulty roll → consume |
| **Hive grid** | Maya delivery_hive | 6×4 room control, tasks, VPs |
| **Pharmacist synthesis** | Sophia lab UI | Compound selection, exposure, yield |
| **Cultivator taste test** | Reneé | Branching food choices, fat/suspicion |
| **Fair day / MJ recipes** | Mary Jane paths | Training, judging, cooking |
| **Weigh-in** | Any student | Scale scene, break thresholds |

**Note:** Mini-game lbs gains are **direct** (bypass stomach model).

---

## 21. Events

### 21.1 Semester events (fixed weeks)

| Week | Title | Class gain |
|------|-------|------------|
| 5 | Midterm Stress | 4–8 |
| 10 | Fall Festival | 6–12 |
| 15 | End of Semester Party | 8–16 |
| 20 | Spring Food Fair | 7–14 |
| 25 | Finals Fuel | 5–10 |
| 30 | Class Anniversary | 10–20 |

### 21.2 Class scenes (~20 interactive)

Filters: **mood** (6), **archetype** (10), **weight stage** (3), **class-wide** (6). Each: title, setup text, 2–3 choices with `{gain, mood, rel}`.

### 21.3 Random events (`content.js`)

~30% weekly if scrutiny allows. Narrative incidents with choices affecting students/class.

### 21.4 Narrative / influence events

Professor rank progression, friend-pair weight convergence, Lilith feast clue, pharmacist exposure thresholds, community researcher faculty meetings.

### 21.5 Growth events (`growthEvents.js`)

Triggered by: major device use, malfunctions ≥8 lbs, stage jumps, digest stage-ups ≥8 lbs. Queued narrative scenes via text engine with zone bias from body type.

### 21.6 Hunger interrupts

Personal/archetype-specific craving scenes; block week advance until resolved.

### 21.7 Devour scene

Long-form narrative; random victim; 3 corruption tiers; effect: 45k cal, 100 full, +18 corruption, +3 rel.

---

## 22. Meta systems

### 22.1 Admin scrutiny

| Tier | Min | AP penalty | Blocks public events |
|------|-----|------------|----------------------|
| Quiet | 0 | 0 | no |
| Noticed | 50 | 0 | no |
| Review | 75 | −1 | no |
| Investigation | 90 | −2 | yes |

Sources: stage 5+ visible students (+1/week each), campus devices, network. Reduced by devoted students, skills, evolved scrutiny reduction.

### 22.2 Campus saturation

Score 0–100 from pharmacist narrative, cult supply, lab inventions, avg stage. Tiers: Normal → Softening → Saturated → Regional Excess. Passive +1–2 lbs/week at high tiers; heavier new student starts.

### 22.3 Prestige-lite

Long-run score from week/10, lab stage, saturation, narrative count → +0–2 AP/week, lab breakthrough bonus.

### 22.4 Transformation pressure

Surrender composite: stage 35% + corruption 30% + addiction 20% + hunger 15% → bands emerging/rising/committed/surrendered. UI readout on student detail.

### 22.5 Relationship ecology

Documented in §7.2; jealousy text engine scenes on favoritism.

---

## 23. Text engine architecture

### 23.1 Design

Modular prose system (`src/textEngine/`). Templates use `{module.slot}` syntax resolved by `render()` in `engine.js`. Context built from `{ subject, week, ... }` with automatic selectors for stage, corruption tier, archetype.

### 23.2 Scene modules (register in `scenes/index.js`)

| Module area | Purpose |
|-------------|---------|
| `attitude.js` | Stage × archetype attitude lines |
| `diary.js` / `evolvedDiary.js` | Weekly diary entries |
| `weighIn/` | Scale scenes, personas, break thresholds |
| `talkEncourage.js` / `talkCodas.js` | Talk topic prose + corruption codas |
| `hungerInterrupt.js` / `hungerLexicon.js` | Craving scenes |
| `stream*.js` | Streaming mini-game narration |
| `deviceTick/` / `deviceUse/` / `deviceMalfunction/` | Device weekly prose |
| `deviceCampusUse/` | Campus encounter text |
| `forceFeeder/` | Rhythm game lines |
| `growthEvent/` | Stage crossing narratives |
| `campusExplorationText.js` / `campusSoftening.js` | Exploration flavor |
| `talia/` | Inventor voice |
| `hiveIntake.js` | Hive recruitment |
| `jealousyReaction.js` / `corruptionVoice.js` | Ecology + feed voice |
| `destinyOffstream.js` | Off-stream character beats |

### 23.3 Content layers outside engine

- `content.js`: body descriptions (bodyType × stage), outfits, stage reactions, professor ranks
- `students.js`: TAP_OUT_DIALOGUE, IMMOBILE_REDIRECT, BLOB_PRIVATE_INTRO (per-id voice)
- `evolvedForms.js`: EVOLVED_REACTIONS (6 lines/form), EVOLVED_EVENTS (branching), EVOLUTION_OFFER intros
- `miniGames.js`: Contest/sumo/stream/recording narrative constants
- Path-specific files: `competitiveGainerText.js`, `chapterHostess.js`, `mayaHive.js`, `pharmacist*.js`, etc.

### 23.4 Lint

`npm run text:lint` validates module references and placeholder tags.

---

## 24. Achievements

| ID | Condition |
|----|-----------|
| first_gain | Any student gains weight |
| stage2–stage9 | Reach Chubby / Heavy / Very Fat / Colossal / Blob |
| all_soft / all_chubby / all_plump | Whole class reaches stage |
| total100 / total500 / total1000 | Combined class gain lbs |
| rel_max | Any student 100% rel |
| all_rel50 | All students ≥50% rel |
| narrative5 / narrative10 | Trigger N narrative events |

---

## 25. Body & voice content matrix

For each student, prose varies by:

- **Weight stage** (0–11) — body desc, outfit, attitude, diary
- **Archetype** — choice of template pools
- **Corruption tier** — inner voice, talk codas
- **Relationship tier** — private session tone, intimacy availability
- **Evolved form** — replaces header, unlocks evolved reactions (6-stage arc lines)
- **Mood** — class scene selection
- **Pharmacist campus tier** — softens exploration sighting weights

**Body types** map to different shape vocabulary in `content.js` BODY descriptors.

---

## 26. Technical stack (reference implementation)

- **Frontend:** React (JSX), Vite, PWA
- **State:** Monolithic `ProfessorSim.jsx` component (~6000 lines) holds game state, week advance, action handlers
- **Data:** `src/gameData/*.js` pure data + logic
- **Views:** `src/views/*.jsx` per screen
- **Components:** Modals for dinner, talk, evolution, devices, streams, etc.
- **Persistence:** Browser-based session (implementation-specific)

### Key files map

| Domain | Primary files |
|--------|---------------|
| Students | `students.js`, `content.js` |
| Gaining | `gainSystem.js`, `corruption.js`, `hungerAddiction.js` |
| Sessions | `sessions.js`, `classEvents.js`, `intimacy.js`, `talkSystem.js` |
| Evolution | `evolvedForms.js`, `skills.js`, path files |
| Campus | `campus.js`, `campusExploration.js`, `campusSecrets.js` |
| Lab | `talia.js`, `labParts.js`, `labTechTree.js`, `devices.js` |
| Text | `src/textEngine/**` |

---

## 27. Content scope summary

| Category | Approximate count |
|----------|-------------------|
| Playable students | 19 (17 visible + 2 hidden) |
| Evolution paths | 30+ form ids across 16 archetypes |
| Weight stages | 12 |
| Spirit skills | ~30 across 3 trees |
| Classroom skills | 40+ across 6 tiers |
| Lab devices | 9 |
| Campus nodes | 18 |
| Campus secrets | 10 |
| Faculty NPCs | 6 |
| Pantry items | 14 |
| Compounds | 16 |
| Class scenes | ~20 |
| Achievements | 16 |
| Text scene modules | 30+ |
| Evolved forms with full event trees | 25+ in `EVOLVED_EVENTS` |

---

## 28. Reproduction checklist

To rebuild functionally equivalent game:

1. Implement **weekly loop** with AP, digestion, passive gain
2. Build **student roster** with all fields in §4
3. Implement **stomach model** (§6) as default feed path
4. Wire **relationship tiers** gating sessions/intimacy/evolution
5. Add **corruption + hunger** parallel tracks
6. Implement **three spirit skill trees** with effect aggregation
7. Add **classroom prestige shop** (lbs-cost)
8. Build **evolution modal** + per-form activity handlers (many are custom UIs, not one template)
9. Implement **campus graph** + secrets + exploration rolls
10. Build **lab crafting** + **9 devices** + optional network
11. Port **mini-games** as separate modules with direct-lbs payouts
12. Stand up **text engine** with `{module.slot}` rendering and stage/archetype selectors
13. Populate prose pools from data files (or regenerate equivalent voice-consistency content)
14. Add **scrutiny/saturation/prestige** meta layer on week advance

---

*Document generated from codebase audit on branch `Primary`. For implementation depth plans see `docs/DEPTH_PLAN.md`.*
