# Farm Girl (Mary Jane) — Grok Prompts for ProfessorSim

These prompts generate all text content for the Farm Girl archetype (id 14, replaces Sophie).
Paste each prompt separately into Grok and collect the output.

---

### Grok Prompts for Text Generation

---

#### GROK PROMPT 1 — Character constants: reactions, diary, activity text, outfits (both paths)

```
You are writing content for an adult text game about a professor who fattens his students. The writing register is explicit, sensual feedism content. All content is consensual — the student actively wants this and is devoted to the professor.

CHARACTER: Mary Jane — 20-year-old agriculture major, from the rural south. She has a big chest and wide hips, a warm sunny personality, and she grew up cooking everything from scratch on a working family farm. She joined the professor's class because she heard he appreciated people who love food. She is direct, proud, unironic about her appetite. Her favorite food is sweet potato pie. She loves cooking for people. She speaks with a mild southern accent (never overdone — she's educated, just southern).

PHYSICAL REGISTER: Describe her body explicitly and with warmth. Belly, breasts (explicitly large from the start and growing), hips, thighs. Focus on softness, warmth, the give of fat. At higher weights: belly forward between thighs, no lap. Breasts enormous and resting on belly.

WEIGHT STAGES:
- stageIdx 0 (~258 lbs): Noticeably fat, generous chest, soft belly, wide hips. Still very mobile.
- stageIdx 1 (~320 lbs): Clearly very fat. Belly heavy and forward. Chest enormous.
- stageIdx 2 (~419 lbs): Very fat. Belly large and prominent. Moving is deliberate.
- stageIdx 3 (~519 lbs): Enormous. Belly sits between thighs, no lap. Chest rests on top of belly.
- stageIdx 4 (~630 lbs): Colossal. Near-immobile. Belly and breasts dominate.
- stageIdx 5 (~820 lbs): Blob. Fully immobile. She fills a corner. Everything is geography.

POV NOTE: Activity text is second-person professor ("you"). Reactions and diary are first-person Mary Jane ("I").

---

GENERATE ALL OF THE FOLLOWING:

**A. EVOLVED_REACTIONS.homestead_queen** — 6 strings (stageIdx 0–5), first-person Mary Jane, ~40–60 words each.
She's just finished a cooking/feeding session. Her reaction: physical (belly full, warmth of the food, how heavy she feels), then emotional (pride, contentment, love of this specific life). References her homestead setup, Grandma Mae in later stages (3+).

**B. EVOLVED_REACTIONS.state_fair_queen** — 6 strings (stageIdx 0–5), first-person Mary Jane, ~40–60 words each.
She's just come back from a fair competition. Physical state: full, heavy, possibly sticky with pie filling. Emotional: competitive pride, references Darcy at stages 1+, the crowd at stages 2+.

**C. EVOLVED_DIARY.homestead_queen** — 6 strings (stageIdx 0–5), intimate diary voice, ~70–90 words each.
What it means to her to build this homestead thing. The cooking, the feeding, the professor's role, the way her body has changed and what she thinks about that. At stages 3+: Grandma Mae's voice, the weekly calls, what Mae thinks about all this.

**D. EVOLVED_DIARY.state_fair_queen** — 6 strings (stageIdx 0–5), intimate diary voice, ~70–90 words each.
The fair circuit, what competing feels like in this body. Darcy. The number on the scale. What it means to get bigger and better at the same time. At stages 3+: being known, being the one people come to watch.

**E. EVOLVED_OUTFITS.homestead_queen** — 6 strings (stageIdx 0–5), ~30–50 words each.
What Mary Jane is wearing during homestead sessions. Early: denim overalls, flannel, aprons. As she grows: clothing that struggles to contain her, increasingly creative solutions, the apron becoming load-bearing. At blob: wide cotton draping, or just the apron.

**F. EVOLVED_OUTFITS.state_fair_queen** — 6 strings (stageIdx 0–5), ~30–50 words each.
Her competition outfit. Early: competition tank and stretch shorts. As she grows: the jersey stretched tight, custom-made for her, sponsor logos lost in the stretch. At blob: a banner-width jersey sewn to size, something that reads more like a flag.

**G. EVOLVED_ACTIVITY_TEXT.homestead_queen** — 6 entries (stageIdx 0–5), professor POV, ~70–90 words each.
You arrive at her dorm homestead. What you see: the room, the smell, what she looks like working at her setup. Focus on the domestic warmth, her body visible even while cooking, the way the room barely holds her at higher stages. Ends with an invitation to sit and eat.

**H. EVOLVED_ACTIVITY_TEXT.state_fair_queen** — 6 entries (stageIdx 0–5), professor POV, ~70–90 words each.
You watch Mary Jane compete at the fair. The venue, the crowd, Darcy across the table. Mary Jane's body at the competition table, what the judges and crowd see. How she moves (or doesn't, at high stages). Ends just before the horn sounds.

Output format:
const EVOLVED_REACTIONS = {
  // ... existing entries ...
  homestead_queen: [
    `...`, // stageIdx 0
    `...`, // stageIdx 1
    // etc.
  ],
  state_fair_queen: [ ... ],
};
const EVOLVED_DIARY = {
  homestead_queen: [ ... ],
  state_fair_queen: [ ... ],
};
const EVOLVED_OUTFITS = {
  homestead_queen: [ ... ],
  state_fair_queen: [ ... ],
};
// Activity text entries are functions because they reference s (student object):
const EVOLVED_ACTIVITY_TEXT = {
  homestead_queen: [
    (s) => `...`, // stageIdx 0
    // etc.
  ],
  state_fair_queen: [ ... ],
};
```

---

#### GROK PROMPT 2 — homestead_queen EVOLVED_EVENTS (6 multi-phase events)

```
You are writing content for an adult text game about a professor who fattens his students. The writing register is explicit, sensual feedism content. All content is consensual.

CHARACTER: Mary Jane — farm girl, homestead_queen evolved path. 20-year-old agriculture major from the rural south. She has converted her dorm room into a working homestead kitchen — cast iron, jars of preserves, a folding table covered in food. Growing larger at every stage.

RECURRING NPC: Grandma Mae — Mary Jane's grandmother, calls on video chat. Proud of Mary Jane, sends care packages, knows the professor is involved but approves. Appears at:
- Stage 1 (stageIdx 1): Video call, first time Mae sees the setup
- Stage 2 (stageIdx 2): Mae sends a recipe box
- Stage 3 (stageIdx 3): Weekly calls now, Mary Jane eats while they talk
- Stage 4 (stageIdx 4): "Baby, you're going to run out of room."
- Stage 5 (stageIdx 5): Mae drives up. She is physically there. She starts crying and then starts cooking.

POV: "You" = the professor throughout (second-person POV).

TONE: Warm, domestic, intimate. The "fat sexy cattle" register of the eating captain but softer and more loving. The feeding is mutual and desired. The food is real and elaborate.

WEIGHT STAGES:
- stageIdx 0 (~258 lbs): First visit. She's set up a small spread. The room smells incredible.
- stageIdx 1 (~320 lbs): She's found her groove. The operation has expanded.
- stageIdx 2 (~419 lbs): She's known campus-wide for her cooking. You come when she calls.
- stageIdx 3 (~519 lbs): She barely leaves the room. The homestead is her world.
- stageIdx 4 (~630 lbs): The room strains to hold her. Grandma Mae's warning in the air.
- stageIdx 5 (~820 lbs): Blob. Mae is there. The final harvest table.

---

GENERATE: EVOLVED_EVENTS.homestead_queen — 6 event objects (stageIdx 0–5).

Each event has this structure:
```js
{
  title: "...",
  intro: (s) => `...`, // opening scene, ~80–100 words, professor arrives, sees Mary Jane
  phases: [
    {
      text: (history, s) => `...`, // ~80–100 words, the scene develops
      choices: [
        { id:'flag_name', label:"...", result:`...`, lbs:X, rel:X, flag:'flag_name' },
        { id:'flag_name2', label:"...", result:`...`, lbs:Y, rel:Y, flag:'flag_name2' },
      ]
    },
    {
      text: (history, s) => `...`, // second phase — deeper in the feeding
      choices: [
        { id:'choice_a', label:"...", result:(s)=>`...`, lbs:X, rel:X, flag:'choice_a' },
        { id:'choice_b', label:"...", result:(s)=>`...`, lbs:Y, rel:Y, flag:'choice_b' },
      ]
    }
  ],
  endings: [
    {
      condition: (h) => h.includes('ate_everything') && h.includes('choice_a'),
      text: (h, s, gain) => `...`, // ~80–100 words, payoff paragraph with real body gain
      gainBonus: 8,
      relBonus: 10,
    },
    {
      condition: (h) => true, // fallback
      text: (h, s, gain) => `...`,
      gainBonus: 4,
      relBonus: 6,
    }
  ]
}
```

IMPORTANT: Use `result: (s) => \`...\`` function form for all results (not string literals). This prevents runtime errors.

Each ending's `text` function should end with a payoff paragraph about the physical weight gain (`gain` = lbs accumulated): describe how much heavier she is now, what her belly looks and feels like, the warmth and fullness of the change.

Flags to include: `ate_everything`, `called_mae_back`, `told_her_about_you`, `second_helping`, `cleaned_the_pot`.

Lbs per choice: 6–15 lbs per choice (higher at higher stages). gainBonus: 4–12.

Generate all 6 events (stageIdx 0–5). Title the blob stage event (stageIdx 5) "The Final Harvest Table."
```

---

#### GROK PROMPT 3 — state_fair_queen EVOLVED_EVENTS (6 events, phases 1–2 + contest flag)

```
You are writing content for an adult text game about a professor who fattens his students. The writing register is explicit, sensual feedism content. All content is consensual.

CHARACTER: Mary Jane — farm girl, state_fair_queen evolved path. 20-year-old agriculture major from down south. She competes in pie-eating contests at county and state fairs. Growing larger at every stage.

RECURRING RIVAL: Darcy from Meadowview. Her stats:
- stageIdx 0: 310 lbs — dismissive, veteran, wins this stage
- stageIdx 1: 350 lbs — respects Mary Jane now, it's close, barely wins
- stageIdx 2: 390 lbs — nervous. "Where are you putting all that?" Mary Jane wins for first time.
- stageIdx 3: 430 lbs — openly awed, starts clapping when Mary Jane wins
- stageIdx 4: 465 lbs — "I can't compete with you anymore." Comes to watch.
- stageIdx 5: 500 lbs — competing in the open bracket, there to see Mary Jane win the invitational

POV: "you" = Mary Jane (FIRST PERSON — same shift as eating_captain). The professor is implied but not "you."

WEIGHT STAGES:
- stageIdx 0 (~258 lbs): First county fair entry. Judges don't know her. Darcy wins.
- stageIdx 1 (~320 lbs): County championship. Second year. Darcy barely wins.
- stageIdx 2 (~419 lbs): State qualifier. Mary Jane crosses Darcy on the scoreboard for the first time.
- stageIdx 3 (~519 lbs): State fair finals. Mary Jane wins. Press is there.
- stageIdx 4 (~630 lbs): Tri-state invitational. They build a bigger scale. She is the draw.
- stageIdx 5 (~820 lbs, blob): Grand Fair Invitational. She barely fits the tent. The contest is incidental.

---

GENERATE: EVOLVED_EVENTS.state_fair_queen — 6 event objects (stageIdx 0–5).

Structure is IDENTICAL to eating_captain events (see that constant for reference). 2 phases + endings. Endings have `startsContest: true` (the pie-eating mini-game starts when this ending fires).

Phase 1 = Backstage warmup + weighing in. Pre-stuff food, seeing Darcy, crowd energy.
Phase 2 = First public weigh-in. Scale reads the number. Darcy reacts. Crowd reacts.

Endings: at least one "good" ending (both ate aggressively, ready for the contest) and one "great" ending (flags align — loaded, confident, intimidated Darcy). All endings have `startsContest: true`.

Ending text should set up the contest: "You're ready. The pies are on the table. The horn is about to sound." Short, forward-looking — the mini-game continues the story.

Flags: `loaded` (ate aggressively backstage), `paced` (ate smart), `confident` (owned the weigh-in), `intimidated_darcy`, `crowd_moment`.

Lbs per backstage choice: 6–14 lbs.

TONE: Same as eating_captain — "you" = Mary Jane, 40% physical / 40% Darcy dialogue + crowd / 20% venue atmosphere. The fair has an open-air tent, summer heat, judges in western wear, a PA system, sawdust on the ground.
```

---

#### GROK PROMPT 4 — Fair contest food & action popups, weigh-in 2 text, payoff text

```
You are writing content for an adult text game about a professor who fattens his students. The writing register is explicit, sensual feedism content. All content is consensual.

CHARACTER: Mary Jane — farm girl, state_fair_queen path. You (= Mary Jane, first-person) are in a pie-eating contest at the fair. Darcy is your rival. The fair tent is hot and open-air. The crowd is in summer clothes.

FOODS (available in the mini-game):
- sweet_potato (Sweet Potato Pie 🥧)
- peach_cobbler (Peach Cobbler 🍑)  
- apple_pie (Apple Pie 🍎)
- pecan_pie (Pecan Pie 🥜)
- corn_pudding (Corn Pudding 🌽)
- pound_cake (Pound Cake 🎂)
- banana_pudding (Banana Pudding 🍌)
- fried_chicken (Fried Chicken 🍗)
- biscuits_gravy (Biscuits & Gravy 🍳)
- hushpuppies (Hushpuppies 🟡)

WEIGHT STAGES:
- stageIdx 0 (~258 lbs): Noticeably fat, generous chest, mobile
- stageIdx 1 (~320 lbs): Very fat, heavy belly
- stageIdx 2 (~419 lbs): Very fat, deliberate movement
- stageIdx 3 (~519 lbs): Enormous, no lap, slow
- stageIdx 4 (~630 lbs): Colossal, near-immobile
- stageIdx 5 (~820 lbs): Blob, fully immobile, everything is geography

POV: First-person "you" = Mary Jane throughout. What you feel, what your body does, what Darcy does, what the crowd sees.

REGISTER: Physical sensory detail 40%, Darcy interaction 40%, fair venue/atmosphere 20%. 3–5 sentences per popup.

---

GENERATE THE FOLLOWING:

**A. FAIR_FOOD_POPUPS** — for each food × 6 stages = 60 popup strings.
What it feels like to eat that specific food: texture, taste, how it goes down, belly responding, weight accumulating. Specific to the food (sweet potato pie feels different from fried chicken).

**B. FAIR_ACTION_POPUPS.loosen_belt** — 6 strings. Unhooking the belt/waistband. Your belly comes forward in the competition jersey. Someone in the crowd makes a sound. 3–4 sentences per stage.

**C. FAIR_ACTION_POPUPS.fan_yourself** — 6 strings. The heat and fullness together. Fanning gives your belly a moment to settle. Brief relief that lets you keep going. 2–3 sentences per stage.

**D. FAIR_ACTION_POPUPS.taunt_darcy** — 6 strings. You look over at Darcy and say something or make eye contact. Her reactions vary by stage (see Darcy weight progression above). 3–4 sentences per stage.

**E. FAIR_ACTION_POPUPS.steal_darcy** — 6 strings (stages 3–5 are the only ones triggered, but generate all 6 for safety). You reach across and take one of Darcy's plates. Her reaction. 3–4 sentences per stage.

**F. FAIR_WEIGH_IN_2_TEXT** — 6 functions `(yourStartLbs, yourGain, darcyStartLbs, darcyGain) => string`.
The second weigh-in scene after the contest ends. Both competitors step on the scale again. Judge reads both numbers (starting weight + gain). Mary Jane's physical state: how much heavier she feels, what the gain looks and feels like on her frame. ~80–100 words each. Scale up in physical explicitness.

**G. FAIR_PAYOFF_TEXT** — 6 functions `(gain) => string`.
End-of-contest payoff paragraph. How much heavier Mary Jane is now than when she walked in. Physical description of the gain — where the weight settled, belly forward and warmer, chest heavier. ~60–90 words, escalating explicitness.
- stageIdx 0–1: modest, clothes tighter, belly heavier
- stageIdx 2–3: explicit belly geometry, no lap, forward and warm and real
- stageIdx 4: she is enormous and the gain is visible across the fairgrounds
- stageIdx 5 (blob): the change in her belly is measured in feet of forward extension

Output format:
const FAIR_FOOD_POPUPS = {
  sweet_potato: [`...`, `...`, `...`, `...`, `...`, `...`], // stageIdx 0–5
  peach_cobbler: [ ... ],
  // etc.
};
const FAIR_ACTION_POPUPS = {
  loosen_belt: [ ... ],
  fan_yourself: [ ... ],
  taunt_darcy: [ ... ],
  steal_darcy: [ ... ],
};
const FAIR_WEIGH_IN_2_TEXT = [
  (yourStart, yourGain, darcyStart, darcyGain) => `...`,
  // etc.
];
const FAIR_PAYOFF_TEXT = [
  (gain) => `...`,
  // etc.
];
```

---

#### GROK PROMPT 5 — Ascension bridge texts + TAP_OUT + IMMOBILE_REDIRECT for Mary Jane

```
You are writing content for an adult text game about a professor who fattens his students. The writing register is explicit, sensual feedism content. All content is consensual.

CHARACTER: Mary Jane — farm girl, id 14. 20-year-old agriculture major from the south. Two possible evolved paths: homestead_queen (domestic cooking/feeding arc) or state_fair_queen (competitive pie-eating arc). At Blob stage (~820 lbs), she hits the ascension choice (Celestial or Umbral path).

---

GENERATE THE FOLLOWING:

**A. ASCENSION_BRIDGE.homestead_queen** — 1 string, function `(s) => string`, ~80–100 words.
She is at Blob stage. Before the ascension choice appears, this scene fires. She is in her homestead. The room is full. Grandma Mae called last night. She is enormous. What does she say or think at this threshold? Reference the homestead identity — the cooking, the feeding, the warmth — before the divine door opens.

**B. ASCENSION_BRIDGE.state_fair_queen** — 1 string, function `(s) => string`, ~80–100 words.
She is at Blob stage. The fair career. The scale at the last invitational. Darcy watching. What does she say or think at this threshold? Reference the competitive eating identity — the circuit, the body, the numbers — before the divine door opens.

**C. TAP_OUT_DIALOGUE[14]** — 4 strings (one per weight stage variant: stages 0–3, mapped to "light/medium/heavy/extreme" tap-out moments).
Mary Jane taps out of a private session because she's too full. First-person Mary Jane. Warm but honest — she doesn't want to stop but she's done. Southern voice, present in the body. 20–35 words each.
Format: `{ light:"...", medium:"...", heavy:"...", extreme:"..." }` (or just 4 strings in an array, whichever matches the existing pattern)

**D. IMMOBILE_REDIRECT[14].blob** — 1 string, ~50–70 words.
Mary Jane can't leave her room at Blob stage. The professor tries to take her to dinner. She doesn't pretend it's not happening — she acknowledges the situation warmly and practically, suggests the food come to her. Southern register, not sad about it.

**E. IMMOBILE_REDIRECT[14].celestial** — 1 string, ~50–70 words.
Celestial path Mary Jane (angel/celestial stage) can't leave her sanctum. Same scenario. Add celestial flavor — warmth, light, feathers. She is enormous and glowing and unbothered.

**F. IMMOBILE_REDIRECT[14].umbral** — 1 string, ~50–70 words.
Umbral path Mary Jane (succubus/demon stage) can't leave the void chamber. Add umbral flavor — cool, violet, commanding. She summons the food to her.

Output format:
ASCENSION_BRIDGE.homestead_queen = (s) => `...`;
ASCENSION_BRIDGE.state_fair_queen = (s) => `...`;
// TAP_OUT and IMMOBILE_REDIRECT in their existing constant structures
```

