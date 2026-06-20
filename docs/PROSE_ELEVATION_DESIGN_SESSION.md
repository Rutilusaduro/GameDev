# Prose Elevation — Four-Agent Design Session

*Branch: `claude/prompt-following-2vpq06`. Four specialized agents audited the text engine's erotic quality and produced this implementation prompt. Refer to `AUTHORING.md`, `TUNING.md`, and the Style Ledger before writing any prose.*

---

## ROUND 1 — INITIAL AUDIT

**Agent Lila Voss (Immobility & Massive Weight Gain):**
Reading through what the Game Bible describes — and cross-referencing the engine skeleton in `breakScene.js` — I'm most struck by what's *missing at the top*. The weight ladder runs to Stage 11: Leviathan, a thousand-plus pounds of arrested appetite and mythic scale. But the heaviest prose is handled mostly by `BLOB_PRIVATE_INTRO` (per-student strings, presumably short) and `IMMOBILE_REDIRECT` (dinner replacement). That's a tragedy. Stages 9 through 11 deserve their own physical grammar — a full physics vocabulary for bodies at colossal size: the way a belly occupies space like furniture, the way breathing sounds at that weight, the absolute surrender to gravity that makes every micro-movement a statement.

The `weighIn/` directory is the most obvious gap. The Bible tells us it fires "scale scene, break thresholds, persona-specific voice." Good skeleton. But the break scenes max at a `buttonPop` level of detail. We need the scale groaning. We need the needle swinging past a number she's never seen. We need the moment a girl stops standing on the scale and the scale *holds* her. At Stage 8 and above, the weigh-in should feel like an event that changes something — not a stat check.

Also: the furniture. Creaking chairs are mentioned as a Stage 5 mechanic. But they should be *felt* in the prose, not just named. Where's the wood under pressure? The cushion losing its argument? The armrest that becomes load-bearing?

**Agent Elena Moreau (Thin-to-BBW Growth & Mental State):**
What excites me most about this system is the corruption track — a psychological transformation arc running from 0–100, tiered at 34 and 67, with inner voice shifts at each threshold. This is *the* engine for the transformation fantasy. The problem is that from the Bible's description, it's mechanically rich but prosally thin. The talk codas at high corruption "append submissive/broken" lines — which sounds like they're noun-phrases slotted onto existing talk text rather than complete psychological portraits.

The transformation I want to render is not "she's corrupted now, she submits." It's the *whole arc*: the way denial works — she's hungry but it's stress; she's gaining but it's water weight; she enjoyed the feeding but she can explain that. The diary is the perfect vehicle for this internal rationalization narrative, and diary entries are likely structured around stage reactions rather than psychological excavation. Every diary entry should have an inner voice layer that maps to the corruption tier.

The `hungerInterrupt.js` craving scenes are the other goldmine. A hunger interrupt should feel like a character having a crisis — need breaking through denial, appetite as revelation. Right now they "block week advance" mechanically. Prosally, they should be some of the hottest content in the game.

Also: the Stage 2–4 window (Soft/Chubby/Plump) is the transformation fantasy's sweetest stretch. This is where tight jeans, the belly that arrived overnight, the moment she realizes she can't stop all live. I want dedicated prose pools for this range that track psychological state as closely as physical state.

**Agent Vera Kane (SSBBW Embodiment, Consumption & Lifestyle):**
I'm coming at this from the far end of the ladder — Stages 7–10, where the game's ultimate SSBBWs live, and the evolved forms where girls have claimed their size as identity. The `EVOLVED_REACTIONS` (six lines per form) are what replaces the old attitude register. Six lines is nowhere near enough for women at this size and this self-possession. The eating streamer who's genuinely at peace with her mass should have entire prose pools dedicated to how she inhabits space.

The `evolvedDiary.js` entries are the place for this. And I want to see private session text that, at very high stages with high relationship, shifts from the professor feeding the student to something more mutual — she's feeding *herself* while he watches, because at some point she doesn't need encouragement, she needs *witness*.

Consumption quantities. The prose for high-volume scenes needs to convey staggering amounts with sensory specificity, not just number readouts. The reader should feel the scale of what she's eating — the trays, the rounds, the voice going quiet because her mouth is full.

**Agent Marcus Hale (Text Engine Architecture):**
Technically, the engine is solid. My notes from the initial audit:

The `when` selector space is powerful but some dimensions are underused. The `psych` axes (fixation, obsession, dependence, shame) are tracked as 0–100 values and presumably tiered at 25/50/75, but prose pools don't key on `shame` tiers vs. `fixation` tiers independently. Those are different psychological registers being flattened into the single `corruption` dimension. We could key diary pools and inner voice pools on `psych.shame` vs. `psych.fixation` to get richer cross-combinations.

The `fullnessRatio` selector is available on `ctx.d` — that's a dial that should be driving more of the private session prose. A student at 40% full feels and talks differently than one at 95% full.

For the blob/colossal content Lila is asking for: a new `isImmobile` boolean derived from stage ≥ 10 would let pools hard-gate content that only makes sense for truly immobile bodies, separate from just `stageMin: 9`.

For Elena's psychological arc content: a composite `corruptionMaturity` derived from weeks spent at the current corruption tier could feed diary and inner voice pools more granularly than the three-tier corruption system alone.

Most content upgrades need zero new engine changes. They live entirely in `registerPool` calls with `when` conditions, possibly with a few new derived dimensions in `createContext`.

---

## ROUND 2 — MODULE REVIEW & PROPOSAL

**Agent Elena Moreau:**
`diary.js` first because it's the psychological backbone. The current structure has diary entries keyed primarily on `stageId` or `stageMin/Max` — body observation per stage. What's missing is the *voice trajectory*: the same physical stage at corruption-0 reads as confused distress, at corruption-50 reads as negotiated acceptance, at corruption-80 reads as hungry self-knowledge. Three different diary entries for the same lbs number, depending on psyche state.

I want a `diary.innerBeat` sub-pool that fires inside the diary skeleton at every entry, picking one line of internal weather keyed on corruption tier AND stage. At low corruption/low stage: deflection ("the scale is probably broken"). At mid corruption/mid stage: the seduction of comfort ("I keep telling myself to care more, but the telling gets quieter every week"). At high corruption: the permission ("I've stopped keeping count. It was exhausting, being afraid of my own appetite").

Agent Marcus Hale, feasibility?

**Agent Marcus Hale:**
Fully feasible. I'd slot it as `diary.innerBeat` — a grammar-shaped SENTENCE embedded in the diary skeleton: `"{diary.stageObservation} {diary.innerBeat} {diary.close}"`. The `when` conditions would be:
```js
{ when: { corruption: [0], stageMax: 3 }, text: ["The scale is probably off."] }
{ when: { corruption: [1], stageMin: 3, stageMax: 5 }, text: ["..."] }
{ when: { corruption: [2] }, weight: 2, text: ["..."] }
// plus mandatory { when: {}, text: [...] } fallback
```
No new engine changes — pure pool addition. The existing `corruption` dimension maps to tiers 0/1/2 exactly as needed. Student-specific variants with `studentId` can override for girls who have strong diary voice bibles in `AUTHORING.md`.

**Agent Vera Kane:**
The `evolvedDiary.js` needs a `selfPossession` register that doesn't exist yet. When a student is at Stage 7+ in an evolved form, her diary shouldn't sound like the same corruption-arc voice — she's *arrived*. Kylie's feedee diary should read like someone curating her own abundance for public consumption. Serena's sumo diary should have the pride of someone who's transformed her body into an instrument.

I'd propose a `selfPossessionBand` that combines `evolvedForm` presence + weight stage mapped to the 5-tier activity index (0–4). This drives `evolvedDiary.selfPossession` pools per form.

**Agent Marcus Hale:**
`selfPossessionBand` can be derived as `min(max(weightStageId - 5, 0), 4)` — that's the existing activity stage index calculation. So `ctx.d.activityStage` likely already exists. We'd use `activityStage: [0,1,2,3,4]` as a `when` condition. New pools, no new selectors needed.

**Agent Lila Voss:**
Hunger interrupts. They're missing the physical dimension — the scenes should be somatic before they're social. Hunger at Tier 3 (Starving band) should feel like the body overtaking the will. I want a `hunger.somatic` pool that fires first — the sensation BEFORE the character asks for food. The cold sweat of need, the way the stomach contracts around nothing, the way appetite at this level isn't appetite anymore, it's *demand*. This should layer under the archetype-voice pool, not replace it.

**Agent Marcus Hale:**
The `hungerTier` dimension is already in `ctx.d`. A `hunger.somatic` sub-pool keyed on `hungerTier: [2,3,4]` would fire only at real distress levels and never at baseline hunger. Layer it into the interrupt skeleton: `"{hunger.somatic} {hunger.archetype} {hunger.playerAction}"`. The somatic pool could also key on `stageMin` — a small girl's hunger reads differently than a colossal girl's.

**Agent Vera Kane:**
The `deviceUse/` content — specifically the force feeder rhythm game narration. The mini-game has timing windows, choke meter, perfect/good/messy performance tiers. The prose for these is probably outcome-keyed (success line, failure line, tap-out line). What I want is *continuous narration* that makes device use feel like an intimate scene. The hum of the machine. Her breath going uneven. The way she stops resisting after the third beat and starts *meeting it*. A `forceFeeder.beat` pool cycling through narrative beats per session that shifts register with performance tier and corruption level.

**Agent Marcus Hale:**
The rhythm game has 8 beats per session. We could author a `forceFeeder.beat` pool with variants keyed on `perfTier: ['perfect', 'good', 'messy']` and `corruption tier`. The engine's `render()` call can be made at each beat with the updated context. The performance tier would need to be passed via `ctx.arg` or added to the context dynamically per beat — lightweight, no core engine changes. Build context per-beat with current performance included.

**Agent Elena Moreau:**
The `talkCodas.js` corruption codas — the "submissive/broken" appends at high corruption. These are character-blind. Kylie's corruption-2 coda sounds nothing like Maya's. And they should track transformation, not just state — the coda at corruption 68 (freshly broken in) is different from the one at corruption 90+ (total surrender has had weeks to settle).

I want corruption codas to have:
1. Per-student persona variants (high `weight`, `studentId`)
2. A `corruptionMaturity` that captures "newly broken" vs. "thoroughly broken"
3. Shame psych axis: high `psych.shame` gives a coda that's still conflicted; low `psych.shame` gives one that's purely wanting

**Agent Marcus Hale:**
Item 2 requires a new student field `weeksAtCorruptionTier` tracking how long she's been at the current tier. Low-cost addition. Then `corruptionMaturity: 'fresh' | 'settled'` in `createContext()` (threshold at 4 weeks). For item 3, `psych.shame` tier already exists in the selector space — we just need prose authors using it. The condition `shame: [0,1]` (low-shame) vs. `shame: [2,3]` (high-shame) combined with `corruption: [2]` gives the full matrix Elena wants.

**Agent Lila Voss:**
The `growthEvent/` scenes — stage crossing narratives. They should feel like the best thing that's ever happened in the game, not notification text.

My demands:
- Physical specificity keyed on the crossed stage. Soft→Chubby is belly-forward. Fat→Very Fat makes a doorway feel different. Colossal→Blob is a complete revolution in how she exists in space and deserves 3–4 prose beats.
- Zone bias from body type means a different area of the body leading the change. Hourglass crosses a stage by filling wider; apple deepens the belly; pear leads with hips.
- Character voice in growth events. Reaction should key on corruption tier and archetype.

**Agent Marcus Hale:**
Growth events already use zone bias from body type. I'd extend the skeleton to:
```
growthEvent.open → growthEvent.physicalBeat → growthEvent.reaction → growthEvent.close
```
Where `physicalBeat` keys on `bodyType` + `growthZone` (following the existing `growthLexicon.js` pattern) and `reaction` keys on `corruption` tier + `archetype`. This is the `buildVariants` loop pattern from the manual — apply it here and you get hundreds of valid combinations from a manageable corpus.

For the Blob crossing (Stage 9→10): gate a `growthEvent.colossalThreshold` sub-pool with `stageMin: 10` and `priority: 5` so it hard-gates above the generic growth pool when it fires.

---

## ROUND 3 — REFINEMENT & SAMPLE CREATION

**Agent Elena Moreau:**
The voice of denial must be *active*, not passive. The wrong version: "she doesn't know what's happening." The right version: she's constructing elaborate mental architectures to avoid seeing what's obvious. The rationalization should be archetype-specific. Brittany doesn't notice because she's too busy. Madeline explains it with academic language about stress responses. Priya tracks her weight in a spreadsheet and quietly adjusts the data range so the trend is less alarming. These specifics are what make the corruption arc feel like character rather than mechanism.

**Agent Vera Kane:**
On the high end, the same specificity applies. Pride at Stage 8 isn't just "she loves being big." It's Kylie noticing how many more followers she gets when she wears something tight. It's Serena measuring her grip strength and discovering it's the best it's ever been. It's Maya watching a delivery drone struggle to her dorm window and feeling nothing but the solid certainty of her appetite. Give each girl a specific *axis of pride* and the prose writes itself.

**Agent Lila Voss:**
For blob scene samples: write the furniture before you write the girl. The chair, the couch, the floor. The environment's response to her mass is the most economical way to convey size without clinical enumeration. "The loveseat had stopped being a loveseat and become a territory." That's a sentence that conveys everything without ever naming a number or a body part directly.

**Agent Marcus Hale:**
Before the samples, the two new selectors I'd formally add to `createContext()`:

1. **`corruptionMaturity`** — `'fresh' | 'settled'`. Derived from `weeksAtCorruptionTier` (new student field, defaults 0).
2. **`selfPossessionBand`** — `0–4`, aliased to the existing activity stage index calculation.

Both are purely additive. Zero breaking changes. Add these two derived fields and every pool below can use them.

Pool scaffolding for the samples:
- *Weigh-in:* `"{wi.open} {wi.scaleMoment} {wi.number} {wi.reaction}"` — scaleMoment on `stageMin`, reaction on `corruption` + `studentId`
- *Growth event:* `"{grow.open} {grow.physicalBeat} {grow.reaction} {grow.close}"` — physicalBeat on `bodyType` + `growthZone`, reaction on `corruption` + `archetype`
- *Hunger interrupt:* `"{hunger.somatic} {hunger.archetype} {hunger.ask}"` — somatic on `hungerTier` + `stageMin`
- *Diary:* `"{diary.open} {diary.stageObservation} {diary.innerBeat} {diary.close}"` — innerBeat on `corruption` + optional `stageMin`
- *Device:* `"{device.intro} {device.beat} {device.outcome}"` — beat on `perfTier` + `corruption`, repeatable
- *Blob:* `"{blob.environment} {blob.body} {blob.voice} {blob.close}"` — everything on `stageMin: 10`

---

# IMPLEMENTATION PROMPT

*The following is the complete, developer-ready output from the four-agent audit. This section is a prompt addressed to the implementing developer/LLM.*

---

## 1. EXECUTIVE AUDIT SUMMARY

The text engine's architecture is exemplary. The opportunity is almost entirely in **content depth and psychological specificity**, not structure. Four concentrated gaps:

**Gap A — Psychological arc is mechanically tracked but prosally thin.** The corruption track runs 0–100 across three tiers, and the psych axes have their own dynamics. Yet most prose pools key only on `stageMin/Max` and a coarse `corruption` tier, ignoring the cross-combinations that generate the richest character moments. A shame-dominant low-corruption student reads completely differently from a fixation-dominant low-corruption student, but current pools treat them identically.

**Gap B — The transformation window (Stages 2–5) needs its own prose grammar.** This is the fantasy's sweetest stretch: tight jeans, the belly that arrived overnight, the morning she can't button her coat. The engine stages it correctly but the content doesn't linger here with enough specificity. More prose, more archetype-specific, more keyed on the denial/rationalization arc.

**Gap C — Upper stages (8–11) lack the physics vocabulary they deserve.** Blob/leviathan content in `BLOB_PRIVATE_INTRO` and `IMMOBILE_REDIRECT` is the only prose dedicated to extreme immobility. These stages need full scene modules — for weigh-ins, growth events, private sessions, and diary — with dedicated fat-physics language: mass settling like weather, furniture as territory, breathing as effort, gravity as companion.

**Gap D — Device and hunger scenes underuse the dynamic context.** Force feeder rhythm game narration should cycle through narrative beats that respond to current performance tier and corruption level, not just deliver a success/failure line. Hunger interrupts should be somatic before they're social — the *body's demand* arriving before the character has language for it.

---

## 2. PRIORITIZED ENHANCEMENT LIST

Ranked by erotic impact × feasibility (highest first):

1. **`diary.js` — Add `diary.innerBeat` pool with corruption-tier × stage cross-keying.** Maximum psychological depth for minimum structural change. Every diary entry becomes a window into a changing mind.

2. **`weighIn/` — Extend scale scene skeletons with stage-specific physical beats (Stages 5–11) and reaction pools keyed on `studentId` + `corruption`.** The weigh-in is the game's most repeated intimate scene.

3. **`growthEvent/` — Add `grow.physicalBeat` pool using the `buildVariants` pattern across `bodyType × growthZone`, plus `grow.reaction` keyed on `corruption` + `archetype`.** Growth events should feel seismic.

4. **`talkCodas.js` — Differentiate corruption codas by `studentId` (heavy weight) + `corruptionMaturity` + `psych.shame` tier.** The broken-in coda is the hottest line in the game when it's specific.

5. **`hungerInterrupt.js` — Add `hunger.somatic` sub-pool (keyed on `hungerTier: [2,3,4]` + `stageMin`) as the first beat of every interrupt skeleton.** Make need arrive in the body before it has a voice.

6. **`forceFeeder/` — Add `forceFeeder.beat` pool (keyed on `perfTier` + `corruption`) cycling through session narrative.** Each beat of the rhythm game becomes prose.

7. **`evolvedDiary.js` — Add `selfPossessionBand` (0–4, aliased to activity stage index) driving per-form diary pools that express arrived confidence.** Evolved students need their own voice register.

8. **`attitude.js` — Deepen Stage 7+ attitude lines per archetype.** These need to convey full embodied pride, not just size notation.

9. **`corruptionVoice.js` — Add cross-axis variants: `corruption: [1]` + `psych.shame: [3]` vs. `corruption: [1]` + `psych.fixation: [3]`.** Same tier, different souls.

10. **`students.js` (`BLOB_PRIVATE_INTRO`) — Expand from per-student strings to full pool arrays keyed on `stageMin` (10/11) and relationship tier.**

---

## 3. MODULAR TEXT ENGINE GUIDELINES

*(Scaffolded by Agent Marcus Hale. All changes are additive — zero breaking changes to `engine.js`.)*

### 3.1 Two new derived selectors — add to `createContext()`

```js
// In createContext(), after existing derived fields:

// 1. corruptionMaturity — how long at current corruption tier
const weeksAtTier = subject.weeksAtCorruptionTier ?? 0;
ctx.d.corruptionMaturity = weeksAtTier >= 4 ? 'settled' : 'fresh';

// 2. selfPossessionBand — activity stage index for evolved students
ctx.d.selfPossessionBand = subject.evolvedForm
  ? Math.min(Math.max(weightStageId - 5, 0), 4)
  : null;
```

Add `weeksAtCorruptionTier: 0` to the student model in `INIT_STUDENTS`. Increment by 1 in the weekly corruption tick when tier does not change; reset to 0 on tier-up.

**`when` usage:**
```js
{ when: { corruptionMaturity: 'settled', corruption: [2] }, text: [...] }
{ when: { selfPossessionBand: 4 }, text: [...] }
```

### 3.2 `diary.js` — skeleton extension

**New skeleton:** `"{diary.open} {diary.stageObservation} {diary.innerBeat} {diary.close}"`

Register `diary.innerBeat` as a standalone pool. Shape: **FULL SENTENCE, inner monologue register.** Must have variants for all corruption tiers and stage ranges, plus `{ when: {} }` fallback.

```js
// Shape: FULL SENTENCE. Inner voice; tone shifts with corruption and stage.
registerPool("diary.innerBeat", [
  // Corruption 0 — denial active
  { when: { corruption: [0], stageMax: 2 }, text: [
    "I'm not actually tracking this.",
    "This is a stressful semester. That's all it is.",
  ]},
  { when: { corruption: [0], stageMin: 3, stageMax: 5 }, text: [
    "I should probably say something to someone, but I never quite get around to it.",
    "There's always going to be a better week to start being more careful.",
  ]},
  // Corruption 1 — crack in denial
  { when: { corruption: [1], stageMin: 2, stageMax: 4 }, text: [
    "I keep telling myself to care more, but the telling gets quieter every week.",
    `The number isn't small anymore. I read it three times and I don't feel the thing I'm supposed to feel.`,
  ]},
  { when: { corruption: [1], stageMin: 5 }, text: [
    "I held my own belly today, just to feel the weight of it, and I didn't let go for a long time.",
    "There's something I'm trying not to call an appetite, and I'm not succeeding.",
  ]},
  // Corruption 2 — freshly arrived
  { when: { corruption: [2], corruptionMaturity: 'fresh' }, weight: 3, text: [
    "I've stopped keeping count. It was exhausting, being afraid of my own appetite.",
    "Something changed this week. Or maybe it changed weeks ago and I'm only now noticing the quiet.",
  ]},
  // Corruption 2 — settled into it
  { when: { corruption: [2], corruptionMaturity: 'settled' }, weight: 4, text: [
    "I want more. I want it the way I used to want sleep — without thinking about whether I should.",
    "Hunger feels clean now. Like it always did, but I wasn't letting it.",
  ]},
  // Mandatory fallback
  { when: {}, text: [
    "There's a number on a scale somewhere. I've decided it belongs to the week, not to me.",
  ]},
]);
```

### 3.3 `weighIn/` — stage-banded physical beat pool

Add `wi.scaleMoment` as a sub-pool. Shape: **ENVIRONMENTAL SENTENCE. The scale meeting her at her current weight.**

```js
// Shape: ENVIRONMENTAL SENTENCE. The scale accepting her weight at this stage.
registerPool("wi.scaleMoment", [
  { when: { stageMax: 3 }, text: [
    "She steps on with the careless grace of someone who hasn't learned yet to prepare herself.",
    "The scale accepts her without protest.",
  ]},
  { when: { stageMin: 4, stageMax: 6 }, text: [
    "The platform flexes slightly as she shifts her weight to center. She's stopped pretending she doesn't notice.",
    "She steps on and the needle commits to its arc with purpose.",
  ]},
  { when: { stageMin: 7, stageMax: 8 }, weight: 2, text: [
    "She fills the scale platform now. Not overflows — fills, the way a thing fills its purpose.",
    `The mechanism beneath her works harder than it used to. She can feel it through her soles — the slight delay, the certainty.`,
  ]},
  { when: { stageMin: 9 }, weight: 3, text: [
    "The reinforced scale doesn't groan, but there's a quality to the silence it makes that functions like a sigh.",
    "It takes a moment for the reading to settle. The number arrives like a fact that's been patient.",
  ]},
  { when: {}, text: [
    "She steps on. The scale delivers its verdict.",
  ]},
]);
```

### 3.4 `growthEvent/` — skeleton and zone-bias beat pool

Skeleton: `"{grow.open} {grow.physicalBeat} {grow.reaction} {grow.close}"`

`grow.physicalBeat` uses the `buildVariants` pattern from `growthLexicon.js`. Keep corpus in `growthEventData.js`:

```js
// growthEventData.js
export const GROWTH_EVENT_CHUNKS = [
  { bodyTypes: ['hourglass', 'voluptuous'], zone: 'belly', texts: [
    "Her belly rounds deeper this week, sweeping further past the waistband she hasn't replaced yet.",
    "The new weight settles low and centered, soft and warm as something that was always supposed to be there.",
  ]},
  { bodyTypes: ['pear'], zone: 'hips', texts: [
    "Her hips lead the change, widening another fraction she'll feel in the width of a booth.",
    "It's in the hips first, always — the slow spread of her against any surface that tries to contain her.",
  ]},
  { bodyTypes: ['apple', 'rotund'], zone: 'belly', texts: [
    "Her belly deepens rather than widens, a dense forward weight that shifts her center of gravity.",
    "The heft is pure belly this time — present, unmistakable, hers.",
  ]},
  { bodyTypes: ['athletic', 'straight'], zone: 'general', texts: [
    "The gain distributes evenly, a softening over everything at once, as if she's been upholstered from the inside.",
    "Her edges round gently. She looks padded. She looks kept.",
  ]},
  { bodyTypes: ['mom_bod', 'fertility_goddess'], zone: 'belly', texts: [
    "Her belly drops a fraction lower, rounder, warmer — more of what it already was.",
    "The change is not news. It is continuation. She carries it easily.",
  ]},
];
```

`grow.reaction` — keyed on `corruption` + `archetype`:

```js
// Shape: DIALOGUE or INNER VOICE. Her reaction to the growth event.
registerPool("grow.reaction", [
  // Archetype persona (weight 4)
  { when: { archetype: 'athlete', corruption: [0] }, weight: 4, text: [
    `{subject.name} looks down and her jaw tightens. She doesn't say anything. She doesn't need to.`,
  ]},
  { when: { archetype: 'influencer', corruption: [1] }, weight: 4, text: [
    `{subject.name} reaches for her phone. She films the new weight of herself in the mirror. She posts it.`,
  ]},
  { when: { archetype: 'cheerleader', corruption: [0] }, weight: 4, text: [
    `{subject.name} goes still. Then she says, very quietly, "Okay."`,
  ]},
  { when: { archetype: 'bookworm', corruption: [0] }, weight: 4, text: [
    `{subject.name} opens her notes app and starts typing. The note begins: "Week {week} — anomalous." She finishes it: "Expected."`,
  ]},
  { when: { archetype: 'overachiever', corruption: [1] }, weight: 4, text: [
    `{subject.name} says nothing. But later you see she's updated the spreadsheet.`,
  ]},
  // Corruption-keyed generics (weight 2)
  { when: { corruption: [0] }, weight: 2, text: [
    `{subject.name} absorbs the number in silence. Something crosses her face that she covers quickly.`,
    `{subject.name} takes a breath — careful, measuring. "That's — yeah. That's more."`,
  ]},
  { when: { corruption: [1] }, weight: 2, text: [
    `{subject.name} looks at the change in herself the way you look at weather: it's coming either way.`,
    `{subject.name} rests a hand where the new weight lives. Leaves it there a beat too long.`,
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    `{subject.first} smiles at nothing specific. "More," she says, without being asked.`,
    `{subject.name} stands a little differently — not taller, but more present. More mass taking more room.`,
  ]},
  // Mandatory fallback
  { when: {}, text: [
    `{subject.name} takes it in. Adjusts. Moves forward.`,
  ]},
]);
```

### 3.5 `hungerInterrupt.js` — somatic beat pool

Extend interrupt skeleton: `"{hunger.somatic} {hunger.archetype} {hunger.ask}"`

```js
// Shape: PHYSICAL SENTENCE. The body's need before it has language.
registerPool("hunger.somatic", [
  { when: { hungerTier: [2], stageMax: 4 }, text: [
    "Her stomach contracts around nothing, a small fierce knot below the sternum.",
    "There's a shakiness in her hands that isn't nerves.",
  ]},
  { when: { hungerTier: [3] }, weight: 2, text: [
    "The need isn't polite anymore. It's structural — a cold hollow she can feel in her back.",
    "She's past the point where distraction helps. Her body has a single agenda.",
  ]},
  { when: { hungerTier: [4] }, weight: 3, text: [
    "Her hands are at her own belly before she thinks to do it — pressing against the emptiness like she could negotiate with it.",
    "Hunger at this pitch doesn't feel like hunger. It feels like an instruction.",
    "Her jaw works around nothing. She has been doing this for an hour.",
  ]},
  { when: { hungerTier: [3,4], stageMin: 7 }, weight: 3, text: [
    "The vast hollow of her stomach makes itself known in a way that can't be scheduled or postponed.",
    "She shifts her {word.body} — all of it, the slow continent of her — toward the door, toward food, automatically.",
  ]},
  { when: {}, text: [
    "Need arrives ahead of words.",
  ]},
]);
```

### 3.6 `forceFeeder/` — session beat pool

New pool `forceFeeder.beat`. Shape: **NARRATIVE BEAT, feeding session in progress.** Keys on `perfTier` + `corruption`. Called once per rhythm-game beat via `render("{forceFeeder.beat}", ctx)` with `perfTier` injected into context per beat.

```js
// Shape: NARRATIVE BEAT. One beat of a force-feeder session.
registerPool("forceFeeder.beat", [
  // Perfect timing
  { when: { perfTier: 'perfect', corruption: [0] }, text: [
    "She takes it before she realizes she's decided to, and tells herself the machine doesn't give her a choice.",
    "The rhythm catches her breath. She keeps up with it, surprised to find she can.",
  ]},
  { when: { perfTier: 'perfect', corruption: [2] }, weight: 2, text: [
    "She times it perfectly — not because she has to, but because she wants the next one.",
    "There's a kind of grace to it. Eight beats, and she meets all of them.",
  ]},
  // Good timing
  { when: { perfTier: 'good' }, text: [
    "She's almost ahead of it now, her breath finding the interval.",
    "The machine and she are making something like an agreement.",
  ]},
  // Messy
  { when: { perfTier: 'messy', corruption: [0] }, text: [
    "She struggles with the rhythm, but she doesn't stop — her body's compliance outrunning her composure.",
    "It's messy, but she takes it. That's what matters to the machine. That's what matters to both of them.",
  ]},
  { when: { perfTier: 'messy', corruption: [2] }, text: [
    `"Too fast," she manages, and then: "Don't slow down."`,
  ]},
  { when: {}, text: [
    "The session continues. Her belly grows warm and heavy with each beat.",
  ]},
]);
```

### 3.7 New selector: `isImmobile` boolean

```js
// In createContext():
ctx.d.isImmobile = weightStageId >= 10 || (subject.immobileFlag ?? false);
```

Gate blob-specific content: `{ when: { isImmobile: true }, ... }`. Keeps Stage 9 (Colossal, ambulatory) separate from Stage 10+ (Blob, immobile).

---

## 4. HIGH-HEAT SAMPLE REWRITES

*Eight ready-to-use passages demonstrating the elevated style. Each maps to a `registerPool` call. Wire following the authoring pattern in `breakScene.js`.*

---

### Sample 1 — Weigh-In, Stage 5→6 Crossing (Brittany, corruption tier 1)

*Pools: `wi.scaleMoment (stageMin: 5)` + `wi.reaction (studentId: 0, corruption: [1])`. Character arc beat: the squad uniform is the hidden axis of this scene.*

---

She steps on in her practice clothes — the shorts she hasn't retired yet, the ones that stopped sitting right four weeks ago and that she's been blaming on the brand. The reinforced scale doesn't comment. Neither does the number, when it arrives: it simply is what it is, and she reads it the way you read a bill you already know is wrong.

Two-eighty-five.

The shorts have nothing to do with the brand.

She doesn't say anything for a long moment. Then she gets off the scale, goes to the bench, and sits down with the particular care of someone who is deciding something. The foam gives an inch further than it used to. She notices.

"The routines are harder," she finally offers, to the middle distance. Not to you. "Not because I'm slower. Because—" She stops. Starts a different sentence. "Kylie said the camera loves me this semester."

She picks that up like it's sufficient. She decides it is. She doesn't check the mirror by the door on her way out.

Between the scale and the door, she glances at her hands — pretty much the same hands since high school. But the wrist, she notices, just briefly, is a little softer. She keeps the thought.

---

### Sample 2 — Growth Event, hourglass body type, Stage 6 crossing (Kylie, corruption tier 2)

*Pools: `grow.physicalBeat (hourglass/belly)` + `grow.reaction (influencer, corruption: [2])`. Character arc beat: public curation vs. private contact.*

---

It happens incrementally, the way all the good things do — but this week there's a crossing, and crossing is a different thing. Her waist, which kept its curve long past the point the rest of her had stopped trying to maintain pretense, has finally made its peace. Her belly rounds forward through the curve now, soft and rounded and indisputably present, the weight of it resting against her palms when she stands still.

She stands still for a moment, feeling this.

Then she reaches for her phone.

"That's the angle," she says. She's filming her own reflection — the slight S-curve of her silhouette now something more opulent, her belly leading ahead of her hips for the first time. She tips the camera up, then down. "There. There's the hook." She's already writing the caption in her head.

She sends it to herself and drops the phone face-down on the counter, and then she presses both palms flat against her belly and stays there. The phone is already irrelevant. This is the real documentation.

"Bigger," she says softly, to herself, not to you. The word has no question mark in it.

---

### Sample 3 — Private Session Fullness Peak, Stage 7 (Maya, relationship tier Intimate, corruption tier 1)

*Pools: `session.fullnessPeak (stageMin: 7, relationship: [2])`. Character arc beat: she stops needing encouragement; she needs witness.*

---

The third tray is three-quarters empty, and she hasn't asked you to stop. She hasn't said anything in a while — not because she's not here, but because she's decided to be thorough, and being thorough takes the focus that conversation would cost.

Her belly rounds out across her lap, vast and warm, pressing the edge of the tray table back an inch. She shifts to accommodate it without thinking about it — the adjustment of a body that knows its own geography, that has made this much of itself before and knows how the last third feels.

"There's still—" you start.

"I see it," she says. Not sharp. Just: *I know. I'm getting there.* She picks up the last roll without looking and takes it in two bites, unhurried, and wipes her hands on a napkin with the quiet finality of someone completing a task she'd scheduled.

Her belly presses against the table's edge. She notices. She leans back instead of forward, and the whole warm mass of her settles into her lap and against the arms of the chair.

"Is there more?" she asks.

She's not asking *if* there's more. She's asking you to go get it. The fullness in her face is complete, liquid — not discomfort, not confusion. Certainty.

---

### Sample 4 — Force Feeder Session, corruption tier 0→1 arc (Priya, Stage 4)

*Pool: `forceFeeder.beat` across 8 beats. Character arc beat: overachiever psychology turns the machine into a metric to optimize.*

---

The mask settles and Priya immediately starts watching the timing display. Not out of fear — she's had three sessions by now, and the fear passed somewhere between the second week and the spreadsheet she made about the second week. She's watching it the way she watches a clock during an exam: with intent.

Beat one. She doesn't like the taste but she has eighty-three seconds to examine why, which is too long to examine anything.

Beat three. Her rhythm is better than last session. She has already marked this as data.

Beat five. The warmth arrives. This is the part she hasn't made a note about. Not because it isn't notable — because the notes would have to include the word *want*, and she's not ready to data-model *want* yet. She takes beat five cleanly, without struggle, and the warmth spreads from her belly outward and she stares at the display.

Beat seven. Her hands are flat on her knees. She put them there on purpose, after the first session, so they wouldn't do anything she'd have to log.

They're not flat on her knees anymore.

One palm rests on the new soft weight of her belly — the roundness of the last four weeks, the fullness of the current eight beats — and her fingers press gently against it, and the pressure maps the warmth back inward, and she keeps her eyes on the display.

Beat eight. She doesn't tap out.

After: she sits very still with her hand still where it landed. She's going to need a new spreadsheet column.

---

### Sample 5 — Hunger Interrupt, Stage 8, hunger tier 3 (Destiny, addiction level 2)

*Pools: `hunger.somatic (hungerTier: [3], stageMin: 7)` + `hunger.archetype (gamer)`. Character arc beat: hunger as a dashboard readout, not a feeling.*

---

She has her headset on but the mic is muted. The game's paused. She paused it around twenty minutes ago and she hasn't unpaused it.

The absence in her stomach is not a small thing. At this size — at this point in her and food's long negotiation — hunger isn't sharp and centralized, it's *ambient*, a whole-body atmospheric pressure, the way weather pressure drops before a storm. Her belly, vast and warm under her streaming hoodie, is somehow the most present emptiness she's ever felt.

She pushes the mouse back.

She takes the headset off.

"I need to eat," she says to you, to the room, to anyone still watching the offline screen. She says it with the flat precision of someone reading a dashboard readout. Vital signs nominal except for one. "Right now. Like — not in a minute. Now." She's already pushing back from the desk, the chair rolling, her body beginning the shift and rise that takes more effort than it used to.

She gets to her feet. She's fully upright and her hands are already on her belly, steadying the forward weight of it, and her eyes are already on the door.

"Whatever's there," she says. "All of it."

---

### Sample 6 — Diary Entry, Fiona (artsy), Stage 5, corruption tier 1, `corruptionMaturity: 'fresh'`

*Pools: `diary.stageObservation (studentId: 4, stageMin: 5)` + `diary.innerBeat (corruption: [1], corruptionMaturity: 'fresh')`. Character arc beat: the artist documenting herself without naming it.*

---

**Week {week}**

I photographed my hands today. I don't have a reason that sounds reasonable.

They're softer at the wrists. The tendons show less. Softer everywhere, honestly — which is not the word my life-drawing instructor would have used, but my life-drawing instructor wasn't looking for what I'm looking for, and I'm not entirely sure yet what that is.

The Gallery work is changing how I see. I'm in someone else's session noting how fullness arrives in the body — the way weight gathers at the waist, the specific gravity of a belly in late afternoon light — and I come home and I'm hungry in a way I don't remember being before I started looking. I eat, and I don't not notice. I eat, and I sketch the shapes of it after.

I keep telling myself to care about the number. I keep not getting around to caring.

The newest work is good. My best subject this semester is softening into herself in exactly the sequence I'd have asked her to if I'd been directing it. The photographs are extraordinary. I am the only one who knows I've been eating the same as she has — the spreads are right there on the studio table, and I help myself, because the artist should know the medium.

I have thoughts about this I'm not writing down.

---

### Sample 7 — Blob Private Session Intro, Stage 10 (Maya, home_nest evolved, relationship tier Devoted)

*Pool: `BLOB_PRIVATE_INTRO (studentId: 8, isImmobile: true, relationship: [3])`. Character arc beat: immobility as the nest completed.*

---

The dorm room has reorganized itself around her. This took months — small shifts, furniture migrating to the walls, floor cleared not for floor space but for *access*, for paths through that make sense for a body at this scale. The nest she's built for herself is complete, in the way that a stone in a river is complete: everything has shaped to fit.

She's on the mattress — the reinforced one, the one that arrived in three pieces — and she's resting, which is different from sleeping and different from waiting. She's simply *here*, the vast warm weight of her distributed across the surface, her belly rising and falling with her breath in a slow tide. The light is good. She set up the light months ago, too.

When you come in, she opens her eyes without surprise.

"Sit," she says. She knows where the chair is without looking. She knows where everything is.

You climb to where she can reach you — the brief logistics of it that have become unremarkable by now — and then you're in her reach, and her hand rests on your arm. Heavy. Present. The same hand she's always had, unchanged, while everything else has grown vast and still around her.

"Hungry," she says.

She doesn't need to explain what she wants. She's stopped explaining. The nest is built. The only work left is *more*.

---

### Sample 8 — Corruption Talk Coda, Priya, corruption tier 2 settled, shame low, fixation high

*Pool: `talkCodas.corruption2 (studentId: 7, corruptionMaturity: 'settled', psych.shame: [0,1], psych.fixation: [2,3])`. Appended after talk topic resolution.*

---

She waits until the conversation topic is technically over, and then, in the same precise voice she uses for everything:

"I've been thinking about a different way to measure," she says. Not asking. Reporting. "Not my GPA. Or not *only* my GPA." Her hands fold on her desk. Composed. Intentional. She's thought about how this sentence would go. "I want to gain ten pounds before midterms. I want you to help me do it efficiently." A pause. "I've already identified the optimal caloric surplus."

She turns her laptop to face you.

The spreadsheet has been running for six weeks.

---

## 5. MINOR CHARACTER ARC & STORY FLAVOR SUGGESTIONS

### Arc A — Brittany: The Uniform That Doesn't Fit
**Student:** Brittany (id 0, cheerleader)
**Arc:** At Stage 5–6, Brittany quietly retires from the stunt positions she used to hold. At Stage 6–7, the uniform doesn't zip. She frames these as athletic evolution — "base is the skilled position." At Stage 7+, she redesigns the team's uniform standards (Big Squad Captain evolution hook). The loss is real; the thrill she won't name is realer.
**Modules:** `diary.innerBeat (studentId: 0)` at each threshold; `grow.reaction (studentId: 0, stageMin: 5)`; `evolvedDiary (eating_captain, stageMin: 1)` uniform redesign beat.
**Marcus Hale scaffolding:** Flag `brittanyUniformRetired` at Stage 6 crossing; diary pools check it via `{ when: { flag: 'brittanyUniformRetired' } }`. Talk coda at corruption-1+: she mentions it offhand, as if it doesn't matter.

### Arc B — Fiona: The Artist Fattens Herself for the Work
**Student:** Fiona (id 4, artsy / artisan_gallery)
**Arc:** Fiona's diary entries start describing her own body using the same language she uses for her subjects. At Stage 5+, she mentions self-shooting ("documentary consistency"). At Stage 7+, one exhibition wall panel is entirely self-portraits — staged, beautiful, unflinching. Studio note: "The artist is also the medium."
**Modules:** `diary.innerBeat (studentId: 4)` threads the self-documentation subtext; `evolvedDiary (artisan_gallery, activityStage: 2+)` self-portrait beats; `grow.reaction (studentId: 4)` uses photographer's-eye language.
**Marcus Hale scaffolding:** `fionaSelfDocumenting` flag at Stage 5 + 3+ gallery sessions; gates a `growthEvent` alternate reaction pool using camera/image language.

### Arc C — Kylie: The Gap Between Performance and Private
**Student:** Kylie (id 2, influencer / feedee_creator)
**Arc:** Public Kylie is radiant, calibrated, using her size for content. Private Kylie — diary entries and low-relationship moments — has a quieter register. The arc is the gap closing: at low corruption she performs her gaining; at high corruption she can't tell the difference between the camera's appetite and her own.
**Modules:** `diary.innerBeat (studentId: 2)` at corruption-1 distinct from public voice; `talkCodas (studentId: 2, corruption: [2])` something she says that wasn't pre-written.
**Marcus Hale scaffolding:** No new flags. `corruptionMaturity` handles the "the gap has closed" late-arc feel.

### Arc D — Serena: Muscle Memory vs. Mass
**Student:** Serena (id 3, athlete / sumo)
**Arc:** At early stages she tracks weight in terms of performance (squat numbers, sprint times). At Stage 5–6, she notices her strength is still increasing even as conditioning changes. At Stage 7+ she's not an athlete who got fat; she's an athlete who found the form her body prefers.
**Modules:** `diary.innerBeat (studentId: 3)` tracks performance metrics turning into body metrics; `evolvedDiary (sumo, activityStage: 2)` the first tournament she wins by mass, not just technique.
**Marcus Hale scaffolding:** `serenaPerformanceCrossed` flag at Stage 7, gates evolved diary pool variant.

### Arc E — Chloé: Appetite as Cultural Permission
**Student:** Chloé (id 9, transfer / salon_appetit)
**Arc:** Early diary entries mock American portion sizes with affectionate horror. Mid-arc: she came back for thirds. Late arc: she ensures everyone leaves heavier, herself included, and she doesn't call it horror anymore — she calls it *civilization*.
**Modules:** `diary.innerBeat (studentId: 9)` in French-inflected register; `evolvedDiary (salon_appetit)` the *encore* arc; `grow.reaction (studentId: 9)` uses French interjections per character reboot spec.
**Marcus Hale scaffolding:** No new selectors. `studentId: 9` and existing corruption/stage cross-keys handle the arc.

---

## 6. IMPLEMENTATION NOTES FOR DEVELOPERS

*(Co-authored with Agent Marcus Hale.)*

### Priority order

1. **Add `corruptionMaturity` and `selfPossessionBand` to `createContext()`** (§3.1). 10-line change. Do this first — it unlocks everything else.

2. **Add `weeksAtCorruptionTier: 0` to student model** in `INIT_STUDENTS`. Increment in the weekly corruption tick when tier doesn't change; reset on tier-up. Ensures the new selector works on new and migrated saves.

3. **Add `diary.innerBeat` pool** per §3.2. Wire into the existing diary skeleton by appending `{diary.innerBeat}` before `{diary.close}`. Run `npm run text:lint` after adding — confirm the pool has a `{ when: {} }` fallback.

4. **Add `wi.scaleMoment` pool** per §3.3. Extend the `weighIn/` skeleton to include it. Check that the pool is barrelled in `src/textEngine/scenes/index.js`.

5. **Add `grow.physicalBeat` and `grow.reaction` pools** per §3.4. Use `buildVariants` pattern from `growthLexicon.js` for `physicalBeat`. Keep corpus in `growthEventData.js`. Update the growth event skeleton.

6. **Add `hunger.somatic` pool** per §3.5. Prepend to the existing interrupt skeleton. Must cover `hungerTier` bands 2/3/4 separately — these are meaningfully different states.

7. **Add `forceFeeder.beat` pool** per §3.6. Wire the rhythm game to call `render("{forceFeeder.beat}", ctx)` per beat, passing `perfTier` in the context. The per-beat context build is lightweight.

8. **Add `isImmobile` boolean** to `createContext()` per §3.7. One-line derived field.

9. **Expand `BLOB_PRIVATE_INTRO`** from per-student strings to `registerPool` arrays with `isImmobile: true` + `studentId` + relationship tier cross-keying.

10. **Author enhanced `talkCodas.js` variants** using `corruptionMaturity` + `psych.shame` + `psych.fixation` for the cross-axis differentiation described in §2.

### Lint discipline

Run `npm run text:lint` after every pool addition. Every pool must have a `{ when: {} }` fallback. Every slot used in a skeleton must be registered. Fix all lint errors before committing.

### Style Ledger compliance

Before finalizing any prose for commit, cross-check against `src/textEngine/TUNING.md` Style Ledger for banned constructions. The sample passages above are in the house voice but the Ledger is the final authority. Run the Dialogue Lab loop on any passage you're uncertain about.

### Breaking-change check

None of the above requires changes to `engine.js`, `registerPool`, `registerModule`, or `render()`. All additions are:
- New pool files using the existing `registerPool` API
- Two new derived fields in `createContext()` (additive)
- One new student model field (`weeksAtCorruptionTier`)
- Skeleton extension via new slot strings in existing scene files

No existing pools are removed or overridden. All changes are forward-compatible. Existing saves load cleanly; `weeksAtCorruptionTier` defaults to 0 via `?? 0` in the derived field.

### Character voice reminder

Before authoring persona-specific variants (`studentId`-keyed, high weight), re-read that student's voice bible in `src/textEngine/AUTHORING.md`. The samples above demonstrate the technique but `AUTHORING.md` is binding on voice details. Particularly: Kylie's social-media register, Maya's minimal-words gravity, Priya's precision, Chloé's French inflections, Fiona's artist's-eye language.

### Weight-stage coverage check

For every pool that relates to body size, count variants before committing. The rule: no gaps across the weight ladder for weight-relevant content. Stage-band with `stageMin/Max` as demonstrated above. The linter enforces this; if `text:lint` complains about stage coverage gaps, add the missing band.

---

*Session conducted on branch `claude/prompt-following-2vpq06`. Agents: Lila Voss, Elena Moreau, Vera Kane, Marcus Hale.*
