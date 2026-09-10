# Hall Pass — Game Bible

A reproduction-oriented design reference for **Hall Pass** (*hall-pass*). This document describes the game's fantasy, loop, data model, characters, systems, content catalog, and text architecture so that a developer (or LLM) could rebuild a functionally equivalent game without reading source code. Prose and dialogue are summarized by *structure and intent*, not quoted verbatim.

---

## 1. High concept

**Genre:** Narrative management / feeder simulation with RPG progression, campus exploration, and branching character arcs.

**Fantasy:** You are a **senior redheaded curvy resident advisor (RA)** starting fall semester on a college dorm floor. Your roster is young women you cultivate — through food, relationship, corruption, devices, and evolved life paths — into ever-larger embodiments of appetite and surrender. The tone blends dark comedy, indulgence, body-transformation fetish content, and slow-burn character drama.

**Core tension:** Grow your floor while managing **Action Points (AP)**, **housing scrutiny**, resident **relationships**, and hidden tracks (**corruption**, **hunger/addiction**, **psych state**). Late game opens **evolved forms** — each resident can pivot into a distinct endgame fantasy (sumo, streamer, chemist, inventor, hive queen, etc.).

**Win state:** There is no hard win; progression is open-ended across weeks, achievements, evolved paths, lab inventions, campus saturation, and narrative milestones.

---

## 2. Session structure & game loop

### 2.1 Opening

1. **RA orientation** — Lore text: appetite culture on campus; your desk is the first door residents trust.
2. Player picks a **home dorm hall** (sporty / nerdy / socialite / weirdos) → clicks **Begin Your Shift** → game begins at **Week 1**, **5 AP**, **$850**, empty skill trees with ~5 home-hall residents on roster.
3. **Hall unlocks** at weeks **8**, **12**, and **16** add residents from unpicked halls (Victory Hall also unlocks at week 8 for non-sporty starts).

### 2.2 Weekly loop

```
┌─────────────────────────────────────────────────────────────┐
│  PLAYER TURN (spend AP on actions until depleted or done)   │
│  · Per-student: Talk, Dinner, Private Session, Items,       │
│    Evolved activities, Devices, Intimacy, Weigh-in          │
│  · Floor-wide: Pizza, Potluck, Feast, Group Dinner, Class   │
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
| **roster** | Resident grid; click student → detail |
| **student** | Full detail: stats, diary, evolved panel, actions |
| **actions** | Floor-wide AP actions |
| **inventory** | Pantry items → target student |
| **campus** | 18-node exploration map |
| **lab** | Talia's workshop: parts, tech tree, blueprints |
| **devices** | Built device inventory, equip/use |
| **skills** | Hall lounge prestige skill tree (lbs-cost upgrades) |
| **achievements** | Milestone tracker |
| **log** | Event history |

Navigation tabs appear dynamically (e.g. **student** tab when one is selected). Start flow: pick home dorm (sporty / nerdy / socialite / weirdos), then manage ~5 home residents until hall unlocks expand the roster. Start flow: pick home dorm (sporty / nerdy / socialite / weirdos), then manage ~5 home residents until hall unlocks expand the roster.

---

## 3. Core resources

| Resource | Start | Notes |
|----------|-------|-------|
| **Week** | 1 | Semester milestones at weeks 5, 10, 15, 20, 25, 30 |
| **AP** | 5/week base | Cap 20; modified by hall lounge skills, prestige-lite, scrutiny penalties |
| **Money** | $850 | Dinners, lab builds, Destiny shop, etc. |
| **Admin scrutiny** | 0 | Rises from visible large students, campus device use, network; gates random events |
| **Hall reach** | 1 | `1 + floor(totalClassLbsGained / 40)` — boosts force-feed |
| **Influence skill points** | level − 1 | Spent in Influence / Gluttony / Corruption trees |
| **Hall lounge prestige** | 0 | Spent on `SKILL_TREE` upgrades (costs 50–2000 "prestige" bought with **student lbs**) |

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
- Force-feed base chance: 45% + 4%/hall reach − overfill penalties + corruption bonus (+0.3%/point, max +30%)

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

**Reveal:** Relationship ≥ 55 shows psyche tier on resident detail.

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

## 11. Influence skill trees

Three trees (`skillTrees.js`), points = hall reach − 1. Tier 2/3 unlock at 3/8 points spent in-tree. Rank costs: 1/2/3 by tier.

### 11.1 Influence

Compliance & talk unlocks: force-feed bonus, **Suggest** topics (−10% refusal week), **Command** topics (extreme calories), Break Resistance (1/week bypass), Mesmerizing Aura (+35% rolls/week), Echoed Will, Heavy Hand, etc.

### 11.2 Gluttony

Capacity, conversion, fullness carryover, calorie bonus, Glutton's Instinct (self-feed above 70% fullness), Body's Surrender (physical traits), **Devour** command unlock.

### 11.3 Corruption

Shame erosion, craving submission, willing vessel, total surrender (no refusal at 90+ corruption), corruption rate boosts.

---

## 12. Hall lounge prestige skills (`skills.js` → `SKILL_TREE`)

Purchased with **lbs from students** (skill purchase modal allocates weight loss per girl). Six tiers (costs 50 → 2000). Categories:

- **Environment:** comfy chairs, beverage bar, ambient aroma (+passive lbs, gain mult)
- **Feeding:** snack station, artisan bakery, late-night access
- **Efficiency:** +AP, session capacity
- **Social:** dinner venue unlocks (Bistro → Upscale → Private → Atelier)
- **Psychology:** comfort framing, behavioral observation
- **Prestige:** grand banquet, scrutiny reduction, endgame hall lounge upgrades

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

Food selection → fullness stages 0–5 → tap-out probability 150%–250%+ → encouragement actions → capacity bonus +8 on completion. Blob students: you climb to feed (unique intro text per id).

### 13.5 Dinner venues (`DINNER_VENUES`)

Tiered unlocks via hall lounge skills. Each venue: dishes (cal + full), conversation actions (skill-gated), ending narrative grid by stage × fullness.

### 13.6 Intimacy (1–2 AP, Intimate tier+)

Multi-phase scenes per archetype/student. Choices: rel, optional lbs, flags. Entry from private session high fullness or resident detail "Get Close."

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

### 14.1 Home hall residents (~5 at start; others unlock wk 8/12/16)

| ID | Name | Archetype | Start lbs | Evolution paths |
|----|------|-----------|-----------|-----------------|
| 0 | Brittany | cheerleader | 118 | Eating Captain, Body Positive Captain |
| 1 | Cassidy | swimmer | 125 | Lane Captain |
| 2 | Kylie | influencer | 122 | Feedee Channel, Body Positive Platform |
| 3 | Serena | athlete | 145 | Sumo, Circuit Competitor |
| 4 | Fiona | artsy | 115 | **Artisan Gallery** *(replaces Installation Artist, Food Photographer)* |
| 5 | Destiny | gamer | 155 | Ranked Feedee, Eating Streamer |
| 6 | Tiffany | sorority | 128 | Chapter Hostess |
| 7 | Priya | overachiever | 120 | Competitive Gainer |
| 8 | Maya | quiet | 130 | Home Nest, Delivery Hive Queen |
| 9 | Chloé | transfer | 135 | **Salon de l'Appétit** *(replaces Campus Legend; French exchange reboot)* |
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
- **Campus staff (6):** RA Imogen Hartley (Classics), Coach Dana Brooks (Athletics), RA Yuki Mori (Food Science), Dr. Celeste Abara (Psychology), Chef Rosa Delgado (Culinary), Ms. Penny Lockwood (Registrar) — affinity 0–100, lounge dialogue
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

### Bookworm (Cassidy)

**Lane Captain (`community_researcher`):** Custom UI — NOT generic activity.

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
| culture_shock | MJ, Fiona & Chloé | 4 | 5–9 |
| metrics | Priya & Kaylee | 5 | 5–10 |
| manipulation | Daisy & Nadia | 6 | 8–14 |
| vore | Reneé & Lilith | 7 | 15–25 (needs Lilith) |

### Gamer (Destiny)

**Ranked Feedee (`ranked_feedee`):** Rae delivery + ranked gaming; +8–22 lbs/session.

**Eating Streamer (`eating_streamer`):** Full **focus-bar mini-game** — pre-stream choices, challenge types (endurance/speed/sensual/chaotic/greedy), stamina/tap-out, brand selection (CrunchForge, FizzPeak, VelvetMelt, GlazeCo), loyalty tiers, Destiny spend shop, money split 50/50, milestone events.

### Sorority (Tiffany)

**Chapter Hostess (`chapter_hostess`):** 6 feast stages; prep days with Kylie (guests), Fiona (atmosphere), Reneé (menu); upgrade tracks 0–6; procedural feast; sister + Camille gains; suspicion from scale.

### Overachiever (Priya)

**Competitive Gainer (`competitive_gainer`):** Corkboard measurements vs residents; influence tiers Invested→Ruthless; binge 10–50 lbs; group chat with RA nudges; rich text pools by weight band × influence tier.

### Quiet (Maya)

**Home Nest (`home_nest`):** Delivery routine; +6–15 lbs.

**Delivery Hive (`delivery_hive`):** 6×4 dorm grid strategy; tasks (food, supply, expansion, maintenance, recruitment); stats (biomass, comfort, resonance, stability); Vice Queens (Lilith, Nadia, Kaylee, Reneé, Daisy); room bonuses; integrates pharmacist campus + floor pressure.

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

Filters: **mood** (6), **archetype** (10), **weight stage** (3), **floor-wide** (6). Each: title, setup text, 2–3 choices with `{gain, mood, rel}`.

### 21.3 Random events (`content.js`)

~30% weekly if scrutiny allows. Narrative incidents with choices affecting students/class.

### 21.4 Narrative / influence events

RA rank progression, friend-pair weight convergence, Lilith feast clue, pharmacist exposure thresholds, lane captain faculty meetings.

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

Surrender composite: stage 35% + corruption 30% + addiction 20% + hunger 15% → bands emerging/rising/committed/surrendered. UI readout on resident detail.

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

- `content.js`: body descriptions (bodyType × stage), outfits, stage reactions, RA ranks
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
- **State:** Monolithic `HallPass.jsx` component (~6000 lines) holds game state, week advance, action handlers
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
| Influence skills | ~30 across 3 trees |
| Hall lounge skills | 40+ across 6 tiers |
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
6. Implement **three influence skill trees** with effect aggregation
7. Add **hall lounge prestige shop** (lbs-cost)
8. Build **evolution modal** + per-form activity handlers (many are custom UIs, not one template)
9. Implement **campus graph** + secrets + exploration rolls
10. Build **lab crafting** + **9 devices** + optional network
11. Port **mini-games** as separate modules with direct-lbs payouts
12. Stand up **text engine** with `{module.slot}` rendering and stage/archetype selectors
13. Populate prose pools from data files (or regenerate equivalent voice-consistency content)
14. Add **scrutiny/saturation/prestige** meta layer on week advance

---

## 29. Oppositional Forces — Overview & Philosophy

### 29.1 Design intent

The player is the **RA influence** (§1). Opposition must escalate from mundane institutional friction to cosmic antagonism without ever becoming pure subtraction. Every oppositional beat should present **readable counters** tied to existing systems (§6 gain, §15 evolution, §19 lab, §22 scrutiny, §23 text engine).

**Philosophy pillars:**

| Pillar | Meaning |
|--------|---------|
| **Face, not meter** | Scrutiny (§22) gains a roster with names, agendas, and arcs — not only tier penalties |
| **Multiple playstyles** | Lab-heavy, Lilith-heavy, social/discredit, pharmacist, evolved-student — each viable |
| **Escalation, not reset** | Mid-game proxies stack atop the Board; Supernatural Act extends — never replaces — fetish fantasy |
| **Contrast as erotic engine** | Austerity vs. abundance; thin supernatural vs. explosive re-indulgence |
| **Worthy antagonist** | Opposition recognizes player power and adapts; victories feel earned |

### 29.2 Acts structure

| Act | Weeks (typical) | Primary antagonist | Scrutiny role |
|-----|-----------------|-------------------|---------------|
| **I — Semester Normalcy** | 1–7 | Rumor + passive scrutiny | Meter only; Board dormant |
| **II — Institutional** | 8–19 | Academic Inquiry Board (§30) | Board drives agenda + meter |
| **III — Proxy War** | 14–24 | Board + mid proxies (§31) | Layered agendas |
| **IV — Supernatural** | 20+ (trigger) | Hunger/Scarcity opposition act (§33) | Meter becomes `scarcityPressure` hybrid |

Acts overlap — proxies can appear before Act IV trigger.

### 29.3 Core state slice (`game.opposition`)

| Field | Type | Purpose |
|-------|------|---------|
| `aib.unlocked` | bool | true when scrutiny ≥ 25 once |
| `aib.members[]` | NPC roster | §30 |
| `aib.agendaQueue[]` | `{ cardId, targetId?, resolvesWeek }` | Pending interventions |
| `aib.deckRemoved[]` | card ids | Permanently discredited actions |
| `aib.scandalMeter` | 0–100 | Failed covert ops accumulation |
| `proxies.*` | per-faction flags | §31 |
| `supernatural.actTriggered` | bool | Supernatural Act fired |
| `supernatural.actWeek` | int | Week of trigger |
| `supernatural.scarcityPressure` | 0–100 | Endgame antagonist intensity |
| `supernatural.curseQueue[]` | active curses | Hunger curse targets |

**Week-end order:** digestion (§6) → passive gain → **opposition tick** → scrutiny/saturation (§22) → relationship ecology (§7.2).

---

## 30. Academic Inquiry Board (Early–Mid Game)

### 30.1 Overview

The **Academic Inquiry Board (AIB)** is the institutional face of opposition. It unlocks when **admin scrutiny ≥ 25** and remains active through Act IV (members may be compromised, consumed, or replaced).

### 30.2 Member roster

| ID | Name | Role | Start resolve | Narrative hook |
|----|------|------|---------------|----------------|
| `vance` | Dr. Helena Vance | Chair, Dean of Student Life | 85 | Primary antagonist voice; wellness euphemisms |
| `orr` | Martin Orr | Compliance Officer | 70 | Device/network audits |
| `jin` | Dr. Priya Jin | Faculty Senate rep | 60 | Sympathetic if high faculty affinity |
| `washburn` | Coach Dana Washburn | Athletics liaison | 75 | Targets Serena/Sumo paths |
| `platt` | Ms. Evelyn Platt | Registrar proxy | 65 | Budget freezes, paperwork |
| `rotating` | Student Advocate (rotating) | Elected seat | 50 | Changes each 6 weeks; corruptible |

Each member: `resolve` 0–100, `corruption` 0–100 (hidden), `weightLbs` (starts 130–175), `stance`: `hostile` | `wavering` | `compromised` | `consumed` | `removed`.

**Resolve loss:** −5 to −20 from successful counters; −3/week if member `weightLbs` ≥ stage 3 (Chubby); −10 if `corruption` ≥ 67.

**Stance transitions:** `hostile` → `wavering` (resolve < 40) → `compromised` (corruption ≥ 50 OR resolve < 20) → `consumed` (Lilith) / `removed` (discredit).

### 30.3 Agenda system

Each week the AIB draws **1–2 agenda cards** if `agendaQueue.length < 2`. Cards filtered by scrutiny tier (§22) and removed if in `deckRemoved`.

| Card ID | Min scrutiny | Effect | Counter tags |
|---------|--------------|--------|--------------|
| `wellness_audit` | 50 | Flag random visible student; +8 shame, +5 scrutiny if ignored | `evolved_ops`, `feast_bribe`, `testify` |
| `device_confiscation` | 60 | Remove random equipped device OR disable network node 2 wks | `machine_fatten`, `discredit`, `bribe` |
| `size_review` | 55 | Force class weigh-in scene; +12 scrutiny on skip | `feast_bribe`, `streamer_distraction` |
| `wellness_seminar` | 50 + saturation Softening | −15% class gain mult for 1 week | `hive_intake`, `compound`, `seminar_sabotage` |
| `budget_freeze` | 75 | −$200/week until resolved | `bribe`, `discredit`, `capture` |
| `removal_hearing` | 90 | Student stage 9+ trial; fail → hidden 4 wks | `testify`, `discredit`, `influence_ult` |
| `faculty_informant` | orange suspicion (Cassidy) | +2 agenda draws/3 wks | `faculty_chat`, `discredit` |
| `emergency_hearing` | scandalMeter ≥ 60 | Blocks week end until resolved | any |

**Player warning:** Oversight tab shows queue + 1-week telegraph.

### 30.4 Player counters (full list)

| # | Counter | AP | Gates | Effect |
|---|---------|-----|-------|--------|
| 1 | **Machine Fattening** | 2 | Growth chamber built; member flagged | Target AIB member in chamber mini-game; +lbs, −resolve, scandal risk on fail |
| 2 | **Lilith Hunt** | 1 | Lilith unlocked; member not consumed | Add member to hunt map (difficulty 4); consume → `removed`, −15 scrutiny |
| 3 | **Compound Seduction** | 1 | Sophia stage ≥ 2; faculty lounge access | +corruption 15–25 on member over 2 wks |
| 4 | **Evolved Student Operation** | 1–2 | Relevant evolved form | Cancel or delay 1 agenda card (form-specific flavor) |
| 5 | **Public Discredit** | 2 | Cassidy researcher OR Kylie stream tier 2+ | Remove card from deck permanently; −10 member resolve all |
| 6 | **Bureaucratic Capture** | 2 | `institutional_cover` skill + rel ≥ 70 student | Convert `wavering` member to `compromised` |
| 7 | **Feast Bribe** | 3 | Reneé culinary OR Tiffany feast stage ≥ 3 | Pause all AIB actions 1 week; −5 resolve all |
| 8 | **Floor Pressure** | 1 | Influence: Echoed Will spent | Force agenda misfire (hearing becomes mandatory tasting) |
| 9 | **Faculty Testimony** | 1 | Faculty affinity ≥ 60 | +10 resolve player-side shield; cancels `informant` |
| 10 | **Network Misdirect** | 1 | Lab network stage ≥ 2 | −scandalMeter 20; risk detection spike |

### 30.5 Scrutiny integration

- AIB actions that fire: +3 to +12 scrutiny (card-dependent)
- Successful counter: −5 to −15 scrutiny (card-dependent)
- `compromised` majority (3+ members): passive −2 scrutiny/week
- Investigation tier (§22): enables `removal_hearing`; AIB draws 2 cards/week

### 30.6 Narrative hooks

- Vance appears in campus `health_center` and `faculty_lounge` nodes
- Oversight log entries via text engine `opposition.aib.*`
- Emergency Hearing: multi-phase scene (statement → evidence → counter-choice → verdict)

---

## 31. Escalation & Mid-Game Proxies

Proxies **stack** atop the AIB — they add agenda modifiers, not replacement factions.

### 31.1 Wellness Coalition

**Unlock:** week ≥ 8 AND scrutiny ≥ 40  
**Actors:** Health Center director, gym wellness coaches, dining "nutrition liaison"  
**Mechanics:**
- +10% scrutiny gain from stage 5+ visible students
- Adds card `mandatory_fitness` (student −rel, +hunger unless fed same week)
- **Counter:** feast bribe, Sophia Softening compounds, evolved streamer distraction

### 31.2 Regional Accreditation Observer

**Unlock:** week ≥ 14 AND saturation ≥ Softening  
**Mechanics:**
- Duplicates one AIB card per week (observer "takes notes")
- `observerName` procedural; appears in `lecture_hall` exploration
- **Counter:** Cassidy discredit, institutional cover, public banquet (hall lounge skill) with success roll

### 31.3 Ascetic Circle

**Unlock:** week ≥ 20 AND campus tier ≥ Saturated OR pharmacist cult stage 3+  
**Mechanics:**
- Campus node `garden` spawns protest events (−saturation gain 1 wk)
- Adds card `shame_vigil` (corruption −5 all students unless countered)
- **Counter:** hive recruitment, Chapter Hostess feast, Lilith consume Circle leader (secret target)

### 31.4 Proxy escalation table

| Week | Event if conditions met |
|------|---------------------------|
| 8 | Wellness Coalition intro scene |
| 14 | Accreditation letter arrives |
| 18 | Coalition + AIB joint seminar (double card) |
| 22 | Ascetic Circle protests begin |
| 26+ | Proxies gain +1 card draw if supernatural not triggered |

---

## 32. The Supernatural Act

### 32.1 Trigger conditions

Supernatural Act fires **once** when **any** of:

1. `transformationPressure` class average ≥ **Committed** (§22.4) AND scrutiny reached Investigation (90+) at least once  
2. Campus saturation = **Regional Excess** for 3 consecutive weeks  
3. Player completes 3+ distinct AIB counter types AND week ≥ 22  

Sets `supernatural.actTriggered = true`, `supernatural.actWeek = currentWeek`.

### 32.2 Narrative beat

Week trigger: global scene — lights dim, stomachs flutter empty then **hunger without mass**; rune from campus secrets (§18.3) glows. Voice of Scarcity: *"You may have their bodies. You may not have their hunger."* All students with `evolvedForm` offered **Supernatural Ascension** same week.

### 32.3 Second evolution — thin supernatural forms

**Gate:** `evolvedForm != null` AND `supernaturalForm == null` AND act triggered  
**Not required:** weight stage (bulk is stripped narratively)

| Archetype | Supernatural form id | Thin form fantasy | Power hook |
|-----------|---------------------|-------------------|------------|
| athlete | `sumo_wraith` | Ethereal sumo; mass as lane captain belt | Sumo activity: curse enemies + gain mult |
| influencer | `hollow_icon` | Impossibly lithe on camera | Streams draw scarcity attention away |
| cheerleader | `pep_ghost` | Light, loud, hungry | Squad events: −scarcityPressure burst |
| swimmer | `archivist_skin` | Thin scholar, infinite recall | Discredit always succeeds once/semester |
| gamer | `lag_sprite` | Twitch-thin, gluttonous chat | Stream focus bar: hunger as resource |
| sorority | `silhouette_host` | Elegant empty host | Feasts apply re-indulgence bonus |
| overachiever | `metric_hollow` | Sharp, measuring | Competitive gainer: steal lbs from curse |
| artsy | `curator_wraith` | Thin photographer, hollow frames | Gallery: subjects refeed in-frame; −scarcityPressure |
| quiet | `hive_mote` | Single point, many appetites | Hive grid: biomass from refeed |
| transfer | `salon_wraith` | Ethereal hostess, empty room | Evenings drain scarcityPressure |
| eced | `apple_oracle` | Thin teacher, heavy prophecy | Homeroom: shame vigil immunity |
| farm_girl | `harvest_maiden` | Wiry, ripe magic | Fair training: mass memory stacks |
| psych | `mirror_thin` | Reflects hunger in others | Researcher: corruption splash |
| culinary | `sous_wight` | Knife-thin, tasting hunger | Cultivator: harvest from scarcity |
| pharmacy | `dose_saint` | Ascetic chemist shell | Compounds gain scarcityPressure dmg |
| inventor | `wire_saint` | Glowing wire frame | Devices: ethereal stability |

Students **without** evolved form gain **Latent Appetite**: +1 corruption/week, eligible for standard evolution still.

### 32.4 Mechanical thin-form rules

- **Display weight:** `etherealLbs` (visual thin) separate from `memoryMass` (tracks pre-act peak lbs)
- **Powers:** modify existing evolved activities — no duplicate UIs
- **Re-indulgence:** feeding scenes add to `memoryMass`; crossing thresholds triggers **Refeed Surge** (direct lbs gain bypassing stomach, stage jumps allowed up to prior peak)
- **Vulnerability:** while thin, +hunger tier drift; Scarcity curses hit harder

### 32.5 Text engine needs

New modules:
- `supernatural/ascension.js` — offer, accept, transform beats
- `supernatural/thinVoice.js` — archetype inner voice (stage irrelevant; `supernatural: true`)
- `supernatural/refeedSurge.js` — re-indulgence scenes (core fetish beat)
- `opposition/scarcityCurse.js` — curse application/resolution

Selectors: `supernaturalForm`, `memoryMassBand`, `scarcityPressureBand`, `actWeeksSince`.

---

## 33. Hunger / Scarcity opposition act

### 33.1 Nature

The **Voice of Restraint** (also Hunger's antithesis — Ascetic Control) is the cosmic opposition to the player's RA influence. It does not hate food; it hates **permission**. Its doctrine: bodies should need little, want less, apologize for space.

### 33.2 Manifestation

| Phase | Presence | Player-facing |
|-------|----------|---------------|
| I | Whisper | Agenda card flavor text shifts sterner |
| II | Curse | `curseQueue`: 0 gain weeks, hunger spikes, shame pulses |
| III | Proxy possession | Ascetic Circle leaders, possessed Accreditation Observer |
| IV | Direct | `scarcityPressure` 80+; reality thins — food visuals desaturate until countered |

### 33.3 Proxies (supernatural)

- **The Portion Saint** — possessed dining hall liaison; counters with feast actions
- **The Mirror Fast** — thin ideal enforcer; counters with refeed surges
- **The Ledger Wight** — audit made flesh; counters with discredit/machine fattening

### 33.4 Mechanics

**`scarcityPressure` 0–100:**
- +5/week base after Act trigger
- +3 per uncured curse
- −5 to −20 from refeed surges, feast counters, Lilith consume
- At 100: **Famine Week** — all students hunger tier +1 until player completes Refeast Ritual (4 AP class action)

**Endgame confrontation paths:**

| Path | Condition | Outcome |
|------|-----------|---------|
| **Institutional Capture** | 4+ AIB `compromised` | Scarcity loses campus anchor; pressure cap 60 |
| **Voluptuous Banishment** | All supernatural students refeed to `memoryMass` ≥ stage 6 | scarcityPressure → 0; achievement |
| **Predator's Receipt** | Lilith consumes Portion Saint | Comedy bad-end achievement; pressure −50 |
| **Synthesis** (optional late) | Sophia Goddess of Excess + all thin forms | Convert Scarcity to "Hungry Angel" ally — passive gain +10% |

### 33.5 Direct player tools (RA influence)

- **Refeast Ritual** — 4 AP; mass calories all students; clears curses
- **Devour** (§11.2) — damages scarcityPressure on success
- **Echoed Will** — reverse one curse onto proxy
- **Hall reach** (§3) — damage mult on all supernatural counters

---

## 34. New/Extended Systems

### 34.1 Resources

| Resource | Range | Notes |
|----------|-------|-------|
| `scandalMeter` | 0–100 | Covert AIB ops |
| `scarcityPressure` | 0–100 | Post-act antagonist |
| `memoryMass` | per resident | Pre-act peak tracking |
| `etherealLbs` | per resident | Thin display weight |

### 34.2 Event types

- `aib_agenda_fire` — intervention resolves
- `aib_counter_success` / `aib_counter_fail`
- `proxy_intro` — coalition/accreditation/ascetic
- `supernatural_trigger` — act fire
- `supernatural_ascension` — per resident
- `refeed_surge` — re-indulgence
- `scarcity_curse` / `curse_clear`
- `famine_week_start` / `famine_week_clear`

### 34.3 Mini-games

| Mini-game | Hook |
|-----------|------|
| **Removal Hearing** | Evidence/counter choice phases; relationship + corruption weigh |
| **Machine Fatten (AIB)** | Growth chamber tuning vs. scandal clock |
| **Refeed Surge** | Rhythm/tap timed feeding — direct lbs to `memoryMass` threshold |

### 34.4 UI

| View | Purpose |
|------|---------|
| **oversight** | AIB roster, agenda queue, scandal meter, counter buttons |
| **SupernaturalAscensionModal** | Second evolution offer |
| Student detail: **Thin Form** panel | `etherealLbs`, `memoryMass`, refeed progress |
| Opposition HUD extension | `scarcityPressure` bar after act |

### 34.5 Text engine modules (new)

`src/textEngine/scenes/opposition/` — `aibHearing.js`, `agendaFire.js`, `counterOutcome.js`  
`src/textEngine/scenes/supernatural/` — `ascension.js`, `thinVoice.js`, `refeedSurge.js`, `scarcityCurse.js`

### 34.6 Achievements (proposed)

| ID | Condition |
|----|-----------|
| `aib_first_hearing` | Survive first removal hearing |
| `vance_compromised` | Chair wavering → compromised |
| `board_feast` | Feast bribe during Investigation |
| `act_trigger` | Supernatural Act fires |
| `all_thin` | All evolved students ascend |
| `refeed_god` | Banishment path complete |
| `lilith_saint` | Lilith eats Portion Saint |

---

## 35. Integration Notes

### 35.1 `HallPass.jsx`

- Add `opposition` to initial state; persist in save blob
- `endWeek()`: call `processOpposition()` after digestion, before scrutiny
- Gate public class events: existing `scrutinyBlocksPublicEvents` OR `agendaQueue` contains `wellness_seminar`
- New handlers: `runAibCounter(counterId, targetMemberId, studentId?)`
- Supernatural: `checkSupernaturalTrigger()` in week advance

### 35.2 `gainSystem.js`

- `digestStudent()` — unchanged for students
- New `digestNpc(npc)` — shallow wrapper for AIB member lbs
- `applyRefeedSurge(student, calories)` — direct `memoryMass` + lbs bypass

### 35.3 `scrutinyConsequences.js`

- Import `getAibScrutinyMod()` — compromised majority, observer duplicate
- `weeklyScrutinyNudge` — append AIB telegraph message

### 35.4 `evolvedForms.js`

- Add `SUPERNATURAL_FORMS` map archetype → form id + activity modifiers
- `canSupernaturalEvolve(student, game)` helper
- Extend `EVOLVED_EVENTS` with `supernaturalPhase` branches OR modifier flags

### 35.5 `devices.js` / lab

- Growth chamber: optional `targetType: 'student' | 'aib_member'`
- Network detection risk + scandalMeter on failed misdirect

### 35.6 `campus.js`

- Spawn opposition NPCs at nodes per week
- Ascetic Circle protest as travel event

### 35.7 Path-specific integrations

| Path | Integration |
|------|-------------|
| Cassidy `community_researcher` | Public discredit unlock; suspicion ↔ `faculty_informant` |
| Sophia `pharmacist` | Compound seduction; exposure + scandalMeter link |
| Tiffany `chapter_hostess` | Feast bribe power scaling |
| Destiny/Kylie streams | Distraction counters |
| Maya `delivery_hive` | Seminar sabotage, biomass refeed |
| Lilith | AIB hunt targets array |

### 35.8 Text engine

- Register modules in `scenes/index.js`
- New selectors in `createContext()`: `supernaturalForm`, `memoryMassBand`, `aibStance`, `scarcityPressureBand`
- Run `npm run text:lint` after pool additions

### 35.9 Week advance summary

```
endWeek():
  1. hunger interrupt check
  2. week++
  3. AP grant
  4. digest all students
  5. passive lbs / devices / events
  6. processOpposition()      // NEW
  7. checkSupernaturalTrigger() // NEW
  8. scrutiny += delta
  9. saturation += delta
  10. relationship ecology
  11. pantry restock
```

---

## Appendix A — Sample Prose (Engine-Ready)

### A.1 Early board confrontation (`opposition.aib.open`)

> The conference room smells like toner and denial. Chairwoman Vance has a folder thick enough to bruise — photos from the quad, timestamps, your departmental letterhead on catering invoices. She doesn't sit; none of them do, as if the chairs might confess complicity.
>
> "RA," she says, and the word is a scalpel, "the Academic Inquiry Board has concerns about the *wellness trajectory* of your cohort."
>
> Behind her, a screen wakes: Brittany laughing mid-bite, Serena's shoulders filling a gym doorway. Vance taps the table once. "We're scheduling individualized assessments. Cooperation is expected."
>
> Your belly-deep hunger stirs — not for food, but for the satisfying wrongness of proving her language hollow.

### A.2 Mid-game discredit (`opposition.counter.discredit`)

> Cassidy doesn't raise her voice. The projector throws her thesis title across the hall: **Aesthetic Abundance as Embodied Resistance**. On slide fourteen, side-by-side stills: the Board's portion-guideline banquet and your class's unauthorized potluck — both abundant, only one honest.
>
> "They call it excess when we choose it," Cassidy says. "They call it wellness when they serve it."
>
> Vance's resolve doesn't break in public. It *softens*, which is better.

### A.3 Supernatural thin + refeed (`supernatural.refeed.surge`)

> Maya steps into the moonlight and the wrongness steals your breath — wrist-narrow, hip-swift, a ghost of the girl who once blocked a hallway. "I can feel every room I used to fill," she whispers.
>
> You offer the tray. Ascetic static crawls up her spine; then she breaks. Softness returns like a tide: belly rounding in real time, thighs blooming warm against each other, the remembered weight rushing back as if her skin kept the blueprint.
>
> "Again," she says, voice thickening with returning mass. "I want to be *more* than I was."

### A.4 Scarcity curse arrival (`supernatural.curse.hunger`)

> The dining hall lights buzz flat. Every plate looks smaller than it is — or you're larger than you should be allowed. A student presses a fork to her lips and sets it down, stricken, as if the food betrayed her.
>
> Somewhere between the calories and the shame, something **else** is counting bites. It does not eat. It only refuses.

### A.5 Machine fatten counter (`opposition.counter.machine`)

> Orr thinks he's inspecting a wellness compliance demo. Talia's chamber hums polite and medical. By the third minute, his belt complains. By the seventh, his indignation loses to breath that comes heavier, fuller — the machine learning him the way it learned your girls: patiently, thoroughly, without asking his permission.

---

## Appendix B — Implementation Priority

1. **AIB core + Oversight UI** — opposition state, roster, agenda queue, scrutiny hooks  
2. **Four early counters** — feast bribe, evolved cancel, growth chamber AIB target, discredit  
3. **Text engine `opposition.*`** — hearing, agenda, counter pools  
4. **Mid-game proxies** — Coalition, Accreditation, stacked draws  
5. **Supernatural trigger + data layer** — act flag, `memoryMass`/`etherealLbs`, ascension modal  
6. **Refeed surge + scarcity pressure** — curse queue, Refeast Ritual  
7. **Remaining counters** — Lilith AIB, compounds, influence ults  
8. **Endgame paths + achievements**

---

## 36. Fiona — Artisan Gallery (Artsy Evolution Redesign)

### 36.1 Design rationale

**Removed paths:** `installation_artist`, `food_photographer` — generic activity + reaction lines only; no custom UI; split Fiona's content budget.

**Superseded v1 concept:** `living_canvas` (self-as-medium) — replaced per creative direction.

**New single path:** `artisan_gallery` — **The Artisan Gallery of Abundance**. Fiona runs a fattening-atelier and exhibition space: she **feeds and documents** residents as living subjects, **photographs abundance in the wild** (campus and beyond), and **mounts shows** that pair prints with the bodies that grew into them. Quality tier: Homestead Queen / Pharmacist / Lane Captain (custom modal, subject arcs, field expeditions, multi-phase `EVOLVED_EVENTS`, lbs-cost skill tree, scrutiny integration).

### 36.2 Evolution offer

**Unlock:** Standard gates (§15.1): stage ≥ Plump, rel ≥ 60.

**Intro:** Fiona's studio walls are covered in contact sheets — not of herself, but of **every soft belly and widening hip she's noticed on campus**. She has one empty pin-board labeled *In Progress*.

*"I used to paint thin figures because that's what they taught me to see."* She taps a photo of Brittany mid-laugh, mid-bite. *"I want a gallery that documents **abundance** — the feeding, the growth, the bodies. I want to make people bigger and **keep the proof**. Will you help me build it?"*

**Single choice:** Artisan Gallery.

### 36.3 Core fantasy

Fiona is **curator, feeder, and photographer**. The player helps her:

1. **Document subjects** — fatten residents in staged studio sessions while shooting progression  
2. **Field work** — capture candid "fat in the world" images on campus  
3. **Mount exhibitions** — hang prints, optionally present the living subject beside their timeline  
4. **Sell the work** — patrons, press, scandal, scrutiny  

Fiona **also gains** during sessions (she eats on set — the artist shares the meal). Her own body is part of the gallery's mythology, not the sole canvas.

### 36.4 Custom UI — Artisan Gallery (`ArtisanGalleryModal.jsx`)

**Tabs:**

| Tab | Function |
|-----|----------|
| **Gallery Floor** | Current exhibition layout (4–12 wall slots), mounted prints, preview foot traffic |
| **Subjects** | Active documentation arcs (max 3), progression contact sheets, stage snapshots |
| **Field Archive** | Candid rolls from campus expeditions; filter by location/tag/quality |
| **Patrons & Press** | Reputation meter, print sales, critic log, scrutiny heat |

**Student state:** `galleryState: { patrons: 0–100, scrutinyHeat: 0–100, subjects: [], fieldArchive: [], mountedIds: [], exhibitionsHeld, printsSold, activeExhibition? }`

### 36.5 Activity catalog

| Activity | AP | Gate | Effect |
|----------|-----|------|--------|
| **Enroll Subject** | 0 | rel ≥ 45 with target; slot free | Start documentation arc on classmate |
| **Studio Session** | 2 | active subject | Feed + shoot progression; subject + Fiona lbs |
| **Field Shoot** | 1 | campus unlocked OR post-stage-2 | Candid abundance photos; archive entries |
| **Mount Exhibition** | 2 | 8+ archive pieces; every 2 activity tiers | Opening night; patrons; scrutiny |
| **Print Sale** | 0 | patrons ≥ 30 | Passive $; occasional rel with subject |

### 36.6 Studio Session mini-game (core loop)

**Phases:**

```
Setup → Feed & Frame → Contact Sheet → Archive
```

#### Setup (choices)

| Choice | Effect |
|--------|--------|
| **Lighting** | Warm (rel+) / Dramatic (patrons+) / Intimate (corruption+) |
| **Palette** | French picnic / Bakery spread / Banquet trays — sets calories + prose |
| **Pose brief** | Belly forward / Profile curve / Hands on fullness — zone bias for subject |

#### Feed & Frame (3 rounds)

Each round, pick one:

| Action | Subject | Fiona | Archive |
|--------|---------|-------|---------|
| **Feed subject** | +cal → lbs | — | Progression shot roll |
| **Feed together** | +cal (less) | +cal → lbs | "Shared Table" tag |
| **Shoot only** | — | — | Candid during fullness; no cal |
| **Direct & feed** | +cal++, corruption+ | +cal | "Directed" quality tier |

Force-feed rolls use subject corruption; Fiona auto-eats when player picks "together" or "direct."

#### Contact Sheet

Pick **best 2 of 4** generated frames → `quality`: Study | Print | Masterwork (patrons mult).

**Subject payout:** +5–12 lbs typical (direct bypass stomach partial); rel + corruption per session.  
**Fiona payout:** +2–6 lbs when she eats on set.

**Milestones:** auto-snapshot at subject stage-up → unlocks **Before/After wall pair** for exhibitions.

### 36.7 Field Shoot (campus abundance)

1 AP expedition; location roll weighted by campus node if player is exploring, else studio-adjacent pool.

| Location tag | Sample vignette | Archive quality bias |
|--------------|-----------------|----------------------|
| `dining_hall` | Staff knows the regulars; trays, booths | Documentary |
| `quad` | Students lounging, snacking, sun on soft skin | Candid |
| `food_court` | Strangers eating without apology | Street |
| `gym_aftermath` | Post-workout appetite, towels, vending | Contrast |
| `faculty_lounge` | Risk shot — Coach, Chef Rosa | Scandal |
| `visible_classmate` | Named student if stage ≥ 4 on campus | Portrait rights choice |

**Portrait rights choice** (if classmate visible): **Ask consent** (+rel, legal) | **Shoot first** (+scandal, scrutiny, patrons++) | **Invite to studio** (enroll subject discount).

Field entries store `{ id, location, tag, quality, week, caption }`. High **campus saturation** (§22.2) enriches roll table with softer crowd descriptors.

### 36.8 Mount Exhibition (opening night)

**Requirements:** 8+ archived pieces (mix field + subject); 2 AP.

**Planner:**

1. **Theme** — Documentary | Indulgence | Living Progress | Scandal  
2. **Wall selection** — pick 6–10 prints; subject pairs give bonus patrons  
3. **Living presence** — optional featured subject attends (rel gate, stage ≥ 4)  
4. **Opening tone** — Reverent | Celebratory | Confrontational (scrutiny/patrons tradeoff)

**Outcomes:**

- Patrons +10–25; $100–$400 print sales  
- Subject rel +5–12 if featured  
- Scrutiny +0–12; AIB `wellness_audit` telegraph if Confrontational + Investigation tier  
- Fiona +3–8 lbs (she always eats at her own openings)

### 36.9 Subject documentation arcs

Max **3 concurrent subjects**. Each arc tracks:

| Field | Purpose |
|-------|---------|
| `studentId` | Who is being fattened/documented |
| `weekStarted` | Timeline for exhibition narrative |
| `sessions` | Count of studio sessions |
| `photos[]` | All frames with quality + week |
| `stageSnapshots[]` | Auto at stage-up |
| `consentTier` | asked / enthusiastic / directed |

**Arc completion** (optional achievement): subject reaches stage 6+ with 4+ sessions → **Triptych Masterwork** (permanent patron bonus).

**Eligible subjects:** any visible resident; hidden students need unlock. Lilith excluded. RA-favored students give diary jealousy hooks.

### 36.10 EVOLVED_EVENTS arc (6 stages)

| Stage | Title | Beats |
|-------|-------|-------|
| 0 | First Subject | Enroll first classmate; first studio session; first print pinned |
| 1 | Field Roll | First field shoot; Fiona admits she sees abundance everywhere now |
| 2 | Wall of Proof | First real exhibition; critic attends; subject optional |
| 3 | The Living Room | Featured subject stands beside their timeline; crowd hushes |
| 4 | Regional Interest | Off-campus gallery email; scrutiny spike; Fiona must choose travel show |
| 5 | Permanent Collection | Museum/collector acquires series; gallery becomes institution |

Each stage: 2 phases × 2 choices → flags (`subject_featured`, `scandal_embraced`, `consent_strict`, etc.).

### 36.11 Skill tree (`artisan_gallery`, lbs currency)

| Skill | Cost | Effect |
|-------|------|--------|
| Documentarian's Eye | 20 | +1 Field Shoot quality tier |
| Consent as Composition | 40 | Ask-consent field shots +rel double |
| Shared Table | 70 | Fiona +3 lbs/session when feeding together |
| Living Installation | 110 | Featured subject openings +patrons 50% |
| Abundance Archive | 160 | +$ print sales, scrutiny −2/wk, +1 subject slot |

### 36.12 Cross-system integration

| System | Hook |
|--------|------|
| **Cassidy `community_researcher`** | Parallel "documentation" fantasy; Fiona's work is aesthetic not thesis — cross-dialogue at high suspicion |
| **Nadia `psych_researcher`** | Optional rivalry/jealousy text if same subject enrolled |
| **Tiffany `chapter_hostess`** | Fiona atmosphere prep → exhibition patron bonus |
| **Campus saturation** | Richer field rolls; Softening+ unlocks `regional_crowd` tag |
| **AIB (§30)** | Confrontational openings; "shoot first" field choice; mounted evidence → `faculty_informant` risk |
| **Supernatural Act (§32)** | thin-form `curator_wraith` — photographs hunger as negative space; refeed restores subjects **in frame** |
| **Text engine** | `artisan_gallery.*` pools; `subjectId`, `photoQuality`, `exhibitionTheme` selectors |

### 36.13 Sample prose

**Studio session:** *"Hold still — no, don't hold still. Let the fullness settle while I shoot." Fiona doesn't look away from the viewfinder. The subject swallows another bite; Fiona's own brush hand reaches for cheese without looking. "Good. That's the frame. That's the whole semester."*

**Field roll (quad):** *She photographs a girl on the quad who doesn't know she's being seen — mid-yawn, mid-pastry, sunlight on a soft midsection. Fiona lowers the camera like a confession. "There," she says. "That's civilization."*

**Living Room opening:** *The print on the left: stage three, shy smile. Center: stage five, hands on belly. Right: the subject herself, live, heavier than the latest frame, eating grapes while the crowd stares. Fiona introduces her: "The work continues. She continues." Applause. The subject curtsies without thinking. Fiona is already loading her plate.*

### 36.14 Deprecation notes

Remove from active offers: `installation_artist`, `food_photographer`, `living_canvas` (design-only). Migration map: any prior artsy form → `artisan_gallery`. Files: `fionaGallery.js`, `ArtisanGalleryModal.jsx`, `diary.artisan_gallery`, skills tree, `EVOLVED_EVENTS`, supernatural `curator_wraith`.

---

## 37. Chloé — Salon de l'Appétit (Transfer Evolution Redesign)

### 37.1 Character reboot

| Field | Value |
|-------|-------|
| **id** | 9 (unchanged) |
| **name** | Chloé Moreau |
| **archetype** | transfer |
| **role** | Étudiante d'échange — Sorbonne Université |
| **age** | 21 |
| **bodyType** | hourglass *(was apple — softer French curves)* |
| **startLbs** | 128 |
| **personality** | sultry |
| **desc** | Exchange from Paris. Silk scarves, wine-colored lipstick, the kind of accent that makes the dining hall feel smaller. She came for a semester of architecture and discovered American portions with the slow, delighted horror of a woman finding a new appetite. |
| **favFood** | cheese, wine, anything fried she pretends not to want |
| **hobby** | hosting, flirting, "cultural comparison" |

**Voice:** Precise, warm, occasionally French — *mon dieu*, *encore*, *c'est obscène* (said with approval). Seductive hostess energy; not Irish dry bemusement. Weight as *rondeur*, *débordement* — sensual, unashamed.

**Removed path:** `campus_legend` (food challenge circuit + journalist).

**New path:** `salon_appetit` — **Salon de l'Appétit**.

### 37.2 Evolution offer

**Intro:** Chloé's dorm already smells like wine and butter. She's hosting before she's official — three chairs, candles, a cheese board she's been picking at while waiting.

*"I hosted salons in Paris. Small ones. Polite ones."* She pours wine. *"America has taught me that polite is not the only option. I want **soirées** — real ones. You will help me fill the room. And the plates. And—"* She touches her waist, already softer than arrival. *"—me."*

**Single choice:** Salon de l'Appétit.

### 37.3 Core fantasy

Chloé transforms her exchange semester into a **salon circuit** — intimate dinners that grow bolder, guest lists that escalate from residents to faculty to journalists to scandal. The player curates menus, balances **charming guests** vs **feeding Chloé**, and builds **salon prestige** until the capstone **Grande Soirée**.

### 37.4 Mini-game — Salon de l'Appétit (`SalonAppetitModal.jsx`)

**Trigger:** Evolved activity, 2 AP (1 AP with skill unlock).

**Per-session phases:**

```
Invitations → Menu du Soir → Service → Le Digestif → Afterglow
```

**Student state:** `salonState: { prestige: 0–100, indulgence: 0–100, eveningsHosted, guestBook[], scandalFlags[] }`

#### Phase 1 — Invitations

Pick 2–4 guests from roster (prestige-gated):

| Guest tier | Examples | Unlock |
|------------|----------|--------|
| Residents | Brittany, Cassidy, Kylie | 0 |
| Evolved collaborators | Reneé, Sophia, Tiffany | 20 |
| Faculty | Chef Rosa, Dr. Mori | 45 |
| Risk guests | Journalist, Ms. Platt (AIB) | 60 / 70 |

AIB guest: high corruption chance, scrutiny spike, unique prose.

#### Phase 2 — Menu du Soir

Pick 4 courses from pools:

- **French classic** (cheese, coq au vin, tarte) — prestige +, moderate lbs
- **American excess** (fried tower, milkshake flight) — lbs +, indulgence +
- **Fusion** (croissant burger, wine float) — balanced
- **Reneé special** (if guest) — lbs ++

Each course: `{ cal, full, lbs, prestige, indulgence }`.

#### Phase 3 — Service

Per course, choose:

| Choice | Effect |
|--------|--------|
| **Charm le salon** | +prestige, guest rel, Chloé +modest lbs |
| **Nourrir Chloé** | +lbs, +indulgence, guest fascination |
| **Toast & tandem** | both moderate; best for journalist nights |

Indulgence meter ≥ 80 → **Surge** flag (bonus digestif phase).

#### Phase 4 — Le Digestif

Private beat: player encourages final indulgence. Direct lbs roll +8–15. Corruption +2. Intimacy-adjacent prose without breaking house voice.

#### Phase 5 — Afterglow

Guest reactions; prestige delta; scandal if AIB present; unlock new guests.

**Session payout:** +6–14 lbs typical; +prestige 5–15; scrutiny 0–10.

### 37.5 EVOLVED_EVENTS arc (6 stages)

| Stage | Title | Narrative |
|-------|-------|-----------|
| 0 | Première Soirée | Dorm salon; 3 guests; cheese & wine |
| 1 | Faculty Drift | Dr. Mori smells cooking; stays for dessert |
| 2 | Campus Murmur | "The French girl's dinners" — whisper network |
| 3 | The Journalist's Notebook | Campus writer returns; new tone (seduction not spectacle) |
| 4 | Rooftop Under Stars | Opposition protest optional; prestige 50+ |
| 5 | La Grande Soirée | 12 guests, full menu, capstone lbs |

Each stage: branching phases like `campus_legend` structure (flags: `journalist_charmed`, `faculty_regular`, `aib_scandal`, etc.).

### 37.6 Skill tree (`salon_appetit`)

| Skill | Cost | Effect |
|-------|------|--------|
| Hostess Grâce | 20 | +prestige per evening |
| Menu Magnifique | 40 | Fusion courses +lbs |
| Invité Spécial | 70 | Unlock faculty earlier |
| Double Service | 110 | Service phase: both choices partial |
| Reine du Salon | 160 | +3 lbs/evening, scrutiny −2/wk, 1 AP evenings |

### 37.7 Cross-system integration

- **Opposition (§30–31):** AIB guest path; Ascetic Circle protests outside salon
- **Sophia:** compound + wine pairing bonus
- **Reneé:** guest unlocks chef's course
- **Campus:** rooftop node for stage 4
- **Supernatural (§32):** `salon_wraith` thin-form — ethereal hostess, refeed = "the room remembers her fullness"

### 37.8 Text engine modules

- `salon_appetit.invite`, `menu`, `service`, `digestif`, `afterglow`
- `weighIn` persona rewrite for studentId 9
- `sessions.js` transfer archetype lines → French sultry hostess
- `diary.salon_appetit` — 6-stage arc entries

### 37.9 Sample prose beats

**First evening:** *"In Paris we are taught to stop. Here—"* she bites something golden. *"Ici, they teach you to continue."*

**Grande Soirée:** Twelve settings; Chloé in black silk; eats with performed appetite; curtsies without standing; *"Merci. Maintenant — encore."*

### 37.10 Deprecation notes

Remove: `campus_legend` offer, events, diary, skills, journalist arc (journalist NPC may persist for salon stage 3). Migrate saves → `salon_appetit`. Update supernatural mapping `legend_echo` → `salon_wraith`.

---

## 38. Debug, Field Notes & Bug Reporting

### 38.1 Design intent

Hall Pass is a systems-heavy simulation — soft-locks, modal stack bugs, and opposition edge cases are inevitable at scale. §36 defines a **two-tier diagnostics layer**:

| Tier | Name | Audience | Purpose |
|------|------|----------|---------|
| **Field Notes** | Player bug reporter | Everyone | Capture reproducible state without cheats |
| **Debug Console** | Developer panel | Dev / `import.meta.env.DEV` | State surgery, text sweeps, opposition lab |

**Goals:** (1) Every player report includes enough context to debug from JSON alone. (2) Writers keep Dialogue Lab for prose. (3) Opposition/AIB bugs are triggerable without 20-week playthroughs. (4) No silent telemetry — export is opt-in copy/download only.

### 38.2 Field Notes — player flow

**Access:** Log tab footer · error-boundary fallback screen · optional main-menu link.

**Flow:**

```
Category → Steps to reproduce (optional) → Auto snapshot → Copy / Download
```

**Categories (flavored):**

| ID | Label | Use when |
|----|-------|----------|
| `stuck` | Stuck / can't continue | Soft-lock, AP won't spend, week won't advance |
| `blank` | Blank or frozen screen | Modal empty, white overlay |
| `numbers` | Numbers look wrong | Lbs, scrutiny, money, meters |
| `story` | Story or text broke | `{unresolved}`, wrong scene, missing button |
| `other` | Something else | Catch-all |

**In-world voice:** *"Something didn't taste right. Leave a note for the archivist."*

### 38.3 Snapshot schema (v1)

Exported JSON (`schemaVersion: 1`):

| Block | Contents |
|-------|----------|
| `gameVersion` | From `package.json` |
| `exportedAt` | ISO timestamp |
| `environment` | `userAgent`, viewport, `dev` flag |
| `session` | `week`, `ap`, `money`, `adminScrutiny`, active `view` |
| `students[]` | Trimmed: `id`, `name`, `lbs`, `evolvedForm`, `supernaturalForm`, `hidden`, key flags |
| `opposition` | Full `game.opposition` slice (§29.3) |
| `ui` | `activeModals[]`, `eventQueueLen`, `lastPlayerAction` |
| `logTail` | Last 40 log lines |
| `errors[]` | Ring buffer from global handlers (max 20) |
| `playerNote` | `{ category, steps }` |

**Privacy:** No account data; single-player local state only. Optional Phase 2 save-slot attach.

### 38.4 Error capture

| Source | Handler |
|--------|---------|
| React render crash | `GameErrorBoundary` → Field Notes offer |
| Uncaught JS | `window.onerror` → ring buffer |
| Unhandled promise | `unhandledrejection` → ring buffer |

Boundary copy: *"The semester hiccuped. Your progress is still here."*

### 38.5 Debug Console extensions

Existing `DebugPanel.jsx` sections retained. **New tabs:**

**Opposition Lab**

| Control | Effect |
|---------|--------|
| Scandal meter slider | Set `aib.scandalMeter` |
| Queue removal hearing | Pick student → `pendingHearing` |
| Fire Supernatural Act | `supernatural.actTriggered` (confirm) |
| Compromise member | Set stance `compromised` |
| Clear agenda queue | Reset `agendaQueue` |
| +10 scrutiny | Quick escalation |

**Field Notes (dev)** — preview live snapshot, test export pipeline.

**Dialogue Lab** — unchanged; text sweeps per `TUNING.md`.

### 38.6 `lastPlayerAction`

ProfessorSim maintains a single string updated on meaningful player actions (`advanceWeek`, `doClass`, opposition counters, evolution picks, hearing choices). Included in every snapshot so reports cluster by action type.

### 38.7 Implementation phases

| Phase | Scope | Status |
|-------|-------|--------|
| **1** | Ring buffer, boundary, Field Notes modal, snapshot export, opposition debug tab, log footer | **Shipped** |
| **2** | Save attach, GitHub issue template, textLint hash in DEV | **Done** |
| **3** | Screenshot hook, Playwright repro from snapshot | Stretch |

### 38.8 Cross-references

- Text coverage: §23, `src/textEngine/TUNING.md`, Dialogue Lab in Debug  
- Opposition repro: §30 hearings, §33 supernatural — use Opposition Lab  
- Session transcript: `docs/DEBUG_BUG_REPORTING_DESIGN_SESSION.md`

---

## 39. Oppositional Forces — Implementation Status

*Last updated: branch `cursor/empty-opposition-backlog-935f` (June 2026). Status keys: **Done** · **Partial** · **Backlog**.*

### 39.1 Core files

| File | Role |
|------|------|
| `src/gameData/opposition.js` | AIB roster, agenda queue, counters, week tick, supernatural trigger/tick |
| `src/gameData/oppositionActs.js` | Acts I–IV, dormancy, class transformation pressure |
| `src/gameData/oppositionIntegration.js` | Counter gates, proxy unlock helpers, evolved-op flavors |
| `src/gameData/oppositionHearings.js` | Removal + emergency hearing phases |
| `src/gameData/oppositionEndgame.js` | Capture / banishment checks |
| `src/gameData/oppositionText.js` | Render helpers for unlock/proxy/agenda lines |
| `src/gameData/supernaturalForms.js` | Thin-form map, ascension gate, refeed surge |
| `src/views/OversightView.jsx` | Oversight tab UI |
| `src/components/OppositionHearingModal.jsx` | Hearing modal |
| `src/components/SupernaturalAscensionModal.jsx` | Second evolution offer |
| `src/gameData/hall loungeSkills.js` | Hall lounge prestige shop (lbs-cost `SKILL_TREE` purchases) |
| `src/gameData/scarcityTools.js` | Devour, Echoed Will, synthesis endgame helpers |
| `src/gameData/lilithAibHunt.js` | AIB members as Lilith hunt map targets |
| `src/gameData/oppositionCampus.js` | Vance spawns, Portion Saint, accreditation observer, ascetic garden, Mirror Fast, Ledger Wight |
| `src/gameData/gameSave.js` | Compressed save blob for Field Notes attach |
| `src/gameData/textLintMeta.js` | Registry fingerprint for DEV snapshots |
| `src/components/RefeedSurgeModal.jsx` | Refeed surge tap mini-game |
| `.github/ISSUE_TEMPLATE/bug_report.yml` | GitHub Field Notes issue template |

### 39.2 §29 Acts — **Done**

Act dormancy (weeks 1–7, scrutiny &lt; 25), overlapping acts banner, class transformation pressure, Act I rumor logs, Latent Appetite corruption drift.

### 39.3 §30 AIB — **Done**

| Feature | Status |
|---------|--------|
| Member roster + stances | Done |
| Agenda queue + telegraph | Done |
| All 10 counters (incl. `network_misdirect`) | Done |
| Counter path gates | Done |
| Machine fatten chamber targeting | Done |
| Removal + emergency hearings | Done |
| Investigation tier 2 draws/week | Done |
| `faculty_informant` + Cassidy suspicion | Done |
| `wellness_seminar` + saturation Softening | Done |
| Device confiscation + network disable | Done |
| Vance campus node spawns | Done |
| `size_review` weigh-in scene | Done |
| Hall lounge `institutional_cover` skill | Done |

### 39.4 §31 Proxies — **Done**

Wellness Coalition, Accreditation (saturation Softening), Ascetic Circle (Saturated or cult 3+), week-18 joint seminar, week 26+ extra draw, travel protests, stage-5 scrutiny bonus.

### 39.5 §32 Supernatural Act — **Done**

All three trigger paths, ascension modal, 16 thin forms, `memoryMass`, `etherealLbs`, Thin Form student panel, per-form evolved activity gain/scarcity/scrutiny hooks, Hollow Icon stream drain, Archivist Skin free discredit, text pools — **Done**.

### 39.6 §33 Scarcity — **Done**

+5/week pressure, curse queue, Famine Week block, Refeast clear, capture cap 60, banishment path, Lilith Portion Saint hunt (dining hall), synthesis ally endgame, Devour scarcity damage, Echoed Will curse reversal — **Done**.

### 39.7 §34 UI & achievements — **Done**

Oversight, scarcity HUD, hearings, Field Notes, opposition debug, Lilith AIB hunt on map, Refeed Surge mini-game — **Done**. Extended achievement set incl. `lilith_saint`, `synthesis_ally`, `aib_first_hearing`, `act_trigger` — **Done**.

### 39.8 §35 Integration — **Done**

Week-end hook order, `digestNpc`, informant suspicion, standalone `facultyAffinity` lounge at faculty lounge node — **Done**.

### 39.9 Fiona §36 / Chloé §37 — **Done**

`artisan_gallery`, `salon_appetit` paths and modals from prior branch work.

### 39.10 §38 Debug — **Phase 1–2 Done**

Phase 2: save attach checkbox, GitHub issue template (`.github/ISSUE_TEMPLATE/bug_report.yml`), textLint hash in DEV snapshots — **Done**.

### 39.11 Text engine

`opposition/*` and `supernatural/*` scene modules registered in `scenes/index.js`. Run `npm run text:lint` after edits.

---

*Document generated from codebase audit on branch `Primary`. Oppositional forces design added branch `cursor/oppositional-forces-design-935f`. Session transcripts: `docs/OPPOSITIONAL_FORCES_DESIGN_SESSION.md`, `docs/FIONA_CHLOE_EVOLUTION_DESIGN_SESSION.md`, `docs/DEBUG_BUG_REPORTING_DESIGN_SESSION.md`. Implementation depth: `docs/DEPTH_PLAN.md`.*
