# Prose Elevation 2 — Per-Student Sub-Arc Design Session

*Branch: `claude/prompt-following-2vpq06`. Four-agent collaborative audit with mandatory per-student sub-arc coverage for all 19 characters. Refer to `AUTHORING.md`, `TUNING.md`, and `GAME_BIBLE.md` before implementing.*

---

## ROUND 1 — INITIAL AUDIT

**Agent Lila Voss:**
The sub-arc mandate is exactly right, and it's also the hardest problem to solve well: every student needs her own erotic signature, and that signature has to live in the *same body* whether she's at Stage 2 or Stage 10. What makes Brittany's size erotic is not the same thing that makes Maya's size erotic. What makes Lilith's size terrifying-in-a-good-way is nothing like what makes Mary Jane's size feel inevitable and warm.

My contribution to each sub-arc will be the physical anchor — the specific way each girl's size *manifests in space and sensation* that is hers alone. The immobility and massive-gain beats aren't the same for everyone. A colossal culinary student (Reneé) filling up her kitchen is a completely different physical fantasy than a colossal predator (Lilith) who can no longer reach her prey and has decided that's fine. I'll flag these distinctions in each sub-arc.

What I need from the team: every sub-arc should have a moment where the body itself makes the argument. Not the character deciding, not the player pushing — the body leading. That's the core of what I do, and I want it in every one of these nineteen entries.

**Agent Elena Moreau:**
The arc I care about most is the one between the first week and the moment of surrender. Most of these students start thin or moderate and end somewhere massive — but the prose currently pays most attention to the endpoints. My job in this session is the *middle*: the week she stops fighting, the diary entry where the rationalization machine sputters out and she admits something, the moment she reaches for more without being asked.

For each sub-arc I'll provide the psychological core — what's the specific mental architecture she's built that allows her to get here? What does she tell herself? When does that telling become a lie she enjoys telling? Because the eroticism of the corruption arc is the erosion of the self-narrative, and each character's self-narrative is different.

For the two hidden students (Lilith, Indiana Bones): they're both unusual cases. Lilith doesn't have a corruption arc — she has an evolution arc. Indiana Bones is a late-unlock with different relationship dynamics. I'll adapt the sub-arc framing for both.

**Agent Vera Kane:**
I'm coming at this from the question of *who she becomes*, not who she was. The SSBBW at high stages isn't just a heavier version of the girl who walked in Week 1 — she's reorganized. Her relationship to food, space, furniture, clothing, time, attention — all of it has restructured around her size. That reorganization is sexy, and it's different for every archetype.

For the evolved forms especially: Kylie's reorganization looks like content. Serena's looks like athletic reinvention. Maya's looks like a nest. Tiffany's looks like a social infrastructure upgrade. Each one of these is its own fantasy, and the sub-arcs should hook into that final form's logic even in the early stages — a seed planted in the diary at Stage 2 that blooms into the evolved form at Stage 8.

I'll also specifically flag the consumption quantity dimension for students with high-capacity paths (Destiny, Reneé, Tiffany chapter feasts, Indiana Bones if she finds field rations). Some of these girls are going to eat staggering amounts and the prose should be ready for it.

**Agent Marcus Hale:**
Architecturally, the sub-arc system has to be zero-overhead from an implementation standpoint. Every sub-arc lives in existing pools, in existing module files, hanging off existing `when` conditions. My approach for all nineteen:

1. **Each sub-arc gets a `studentId`-keyed variant** in one or two existing pools (`diary.innerBeat`, `grow.reaction`, `attitude`, `talkCodas`), with `weight: 4` so it dominates for that student.
2. **For students with unique flags** (Brittany's `brittanyUniformRetired`, Fiona's `fionaSelfDocumenting`), I'll propose one boolean flag per arc, set by the game during normal state progression, that gates the sub-arc's most specific variant.
3. **For the two hidden students**, the sub-arc lives in the same pools but with `studentId: 15` / `studentId: 17` conditions that only ever fire for them — no new files needed.
4. **Stage gates** are expressed as `stageMin` on the variant; the arc "activates" naturally when she crosses the relevant threshold.

Zero new scene files. Zero new module keys. Every sub-arc is implemented as 1–4 new variant entries across existing pools.

---

## ROUND 2 — MODULE REVIEW & PER-STUDENT SUB-ARC DEVELOPMENT

*Agents work through the roster systematically. Agent Marcus Hale notes scaffolding for each arc as it's developed.*

**Agent Elena Moreau:**
Let me take the first pass on each student's psychological core, and the other creative agents and Marcus can layer in the physical and architectural specifics.

**Students 0–4 (Brittany through Fiona):**

Brittany's arc is the clearest of all of them: the squad is the container of her identity, and she's outgrowing it literally. The eroticism is in the guilty thrill of that outgrowing — she didn't plan it, she can't quite stop it, and she keeps finding reasons to stay at practice anyway. The moment she stops calling it "support" and starts just showing up is the arc's emotional peak.

Madeline is harder because she's the intellectual. Her self-narrative is built from language — citations, frameworks, careful analysis. The arc for her is that she turns her considerable analytical machinery toward her own gaining and discovers that she can always find an academic justification for what she's already feeling. The research becomes confession by degree.

Kylie I see as fundamentally about audience: she performs everything, including her gaining. The arc is the private moment that escapes the performance — a bite taken off camera, a reflection glimpsed in a dark window, a diary entry she forgets to frame for anyone.

Serena's arc is athletic identity under pressure. She's been the most fit person in most rooms her whole life. The sub-arc is the moment she stops measuring fitness in the old way — and I want her first run after crossing a significant stage to be in the diary: worse time, better body.

Fiona's self-documentation arc is mine to claim first: she photographs the world with complete attention and complete unselfconsciousness, but she never turns the camera on herself. The sub-arc is the night she does. The image is good. She enters it.

**Agent Lila Voss:**
Adding physical anchors for these five:

Brittany — the moment the uniform stops zipping should be described kinesthetically, not visually: the tug of the zipper, the resistance, the breath she's holding, the decision to let it go. The sound it makes. This is her arc's physical keystone.

Madeline — her body shows up in her prose as text. She notices her belly by noticing the angle of a book resting on it. She notices her thighs by how the library chair feels under them. She notices weight by noticing the world adjusting to accommodate her. Always mediated through the intellectual frame — until that frame cracks.

For Kylie the physical anchor is the camera itself: the phone she's always holding at exactly the right angle, and then, at high stages, the realization that there's no angle that flattens her anymore. She starts shooting wide instead. The physics of her body winning the argument with her curation.

Serena's physical anchor is muscle memory: the way a body that used to sprint still expects to sprint, and the warmth of that expectation meeting the warm reality of much more mass. Her arc is in the surprised pleasure of discovering her body knows something she didn't.

Fiona's physical anchor is the photograph itself. She doesn't look in mirrors — that's for people who are looking for something. But she looks at photographs. And the photograph of herself at Stage 5 is the first time she has looked at herself and seen something she recognizes as *hers*.

**Agent Vera Kane:**
At the high-stage end, here's what each of these five becomes and what the sub-arc seeds:

Brittany becomes the Big Squad Captain: she invents new routines that foreground size, mass, and presence rather than agility. The sub-arc at Stage 2 ("uniform won't zip") blooms at Stage 8 into routines where her belly leading the movement is the choreography.

Madeline becomes the Community Researcher: her academic framework becomes the thesis that justifies everything. The arc at Stage 3 ("I've found a paper that says...") blooms at Stage 7 into a presentation where she is the case study.

Kylie becomes the Feedee Creator: her channel is her life. The arc at Stage 2 ("private moment escaping the frame") blooms at Stage 9 into the Wren collab where she eats more on camera than she ever has and doesn't frame it at all.

Serena becomes the Sumo: the athletic identity doesn't die, it transforms into something that requires mass. The arc at Stage 4 ("worse time, better body") blooms at Stage 8 into the bout where she wins by sheer presence.

Fiona becomes the Artisan Gallery: her self-portrait at Stage 5 becomes the capstone of the Permanent Collection.

**Agent Marcus Hale:**
Scaffolding for students 0–4:

- **Brittany (0):** Flag `brittanyUniformStrained: false → true` at Stage 5 (any feeding session that would have strained the uniform). `diary.innerBeat (studentId: 0, stageMin: 5, flag: brittanyUniformStrained)` fires the guilty-thrill variant. `grow.reaction (studentId: 0, stageMin: 5)` fires zipper-tug keystone. `attitude (studentId: 0, stageMin: 5)` fires the "showed up to practice anyway" line. Estimated: 4 new variants across 3 pools.

- **Madeline (1):** No flag needed. `diary.innerBeat (studentId: 1, stageMin: 2)` fires the "found a paper" rationalization variant. `diary.innerBeat (studentId: 1, stageMin: 5, corruption: [1])` fires the "the paper was already my position" confession variant. `attitude (studentId: 1, stageMin: 3)` fires the book-resting-on-belly physical anchor. Estimated: 4 variants across 2 pools.

- **Kylie (2):** Flag `kyliePrivateMoment: false → true` at first feeding scene where no camera action was taken. `diary.innerBeat (studentId: 2, stageMin: 3, flag: kyliePrivateMoment)` fires the escaped-frame variant. `attitude (studentId: 2, stageMin: 7)` fires the "no angle flattens me anymore" variant. Estimated: 3 variants across 2 pools.

- **Serena (3):** No flag needed. `diary.innerBeat (studentId: 3, stageMin: 4)` fires the "worse time, better body" run entry. `grow.reaction (studentId: 3, stageMin: 4)` fires the muscle-memory physical anchor. Estimated: 3 variants across 2 pools.

- **Fiona (4):** Flag `fionaSelfPhotographed: false → true` at first Field Shoot where she photographs herself (or any non-subject Studio Session at Stage 5+). `diary.innerBeat (studentId: 4, stageMin: 5, flag: fionaSelfPhotographed)` fires the self-portrait variant. `evolvedDiary (artisan_gallery, activityStage: 2)` fires the exhibition capstone. Estimated: 3 variants across 2 pools.

**Agent Elena Moreau:**
Students 5–9 (Destiny through Chloé):

Destiny's arc is about the conflict between gaming identity and body identity — and specifically, the way hunger interrupts. She's always been able to play through anything: hunger, fatigue, discomfort. The sub-arc begins when she can't anymore, when her body interrupts a ranked session and she has to tap out for food. The first time this happens she's furious. The third time, she discovers she doesn't mind. The fifth time, she brings the food to the stream and keeps playing.

Tiffany's arc: she has always been the one who makes sure everyone else has enough. The hostess refills plates, doesn't think about her own. The sub-arc is the evening she eats as much as she serves — possibly more — and instead of hiding it, holds it up as evidence that the party is working. "Look at what we're doing here." Her own size becomes the social proof that her hospitality is real.

Priya's arc is the spreadsheet that's been running for six weeks. She's the overachiever — she tracked everything. The sub-arc is that she starts tracking gaining as a goal, not a variable, and the rigor she brought to her GPA is now directed at a different metric entirely.

Maya's arc is quietness becoming presence. She barely speaks; she fills space with something other than words. The sub-arc is the growing physical presence that makes her silence feel enormous — the way the room accommodates her, the way people position themselves relative to her, the way her quiet becomes structural rather than personal.

Chloé's arc is the Frenchwoman discovering that American excess is permission she'd always wanted but never had the cultural context for. The arc is the series of small surrenders that accumulate: the plate she cleans for the first time, the dish she goes back for, the evening she hosts three people and eats as much as all of them combined.

**Agent Lila Voss:**
Physical anchors for 5–9:

Destiny's physical anchor is the headset: she's always had it on when she ate. At first it was background. Then it was the main event. At high stages, the headset comes off while she eats because she can't do two things anymore that both require total attention. Food won.

Tiffany's physical anchor is the serving dish: she's always been on the other side of it. The sub-arc's kinesthetic moment is the first time she sits at the table as a guest at her own party, and someone else refills her plate.

Priya's physical anchor is the desk chair — specifically, the way the padding under her feels different at different stages. She notices the compression, then she notes it, then she adds it to the spreadsheet.

Maya's physical anchor is weight in bed: she becomes aware of how her body settles into a mattress differently, how getting up takes longer, and instead of finding this alarming she finds it intimate — the bed holds her in a way that nothing else does.

Chloé's physical anchor is the table: French dining is ritualized, structured, measured. American portions are chaos. Her arc is the first time she clears an American plate and looks at it with something like respect.

**Agent Vera Kane:**
High-stage flowering for 5–9:

Destiny becomes the Eating Streamer: the arc at Stage 2 ("hunger interrupts the session") flowers at Stage 8 into a full eating stream where the game is the background.

Tiffany becomes the Chapter Hostess: the arc at Stage 4 ("eating as much as she serves") flowers at Stage 8 into a 12-person feast where she's the architect and the centerpiece.

Priya becomes the Competitive Gainer: the arc at Stage 3 ("the spreadsheet with a goal in it") flowers at Stage 8 into the corkboard where she's measuring against her classmates and winning.

Maya becomes the Delivery Hive Queen: the arc at Stage 4 ("quietness becoming presence") flowers at Stage 10 into an entire dorm reorganizing around her gravity.

Chloé becomes the Salon de l'Appétit: the arc at Stage 3 ("first time she cleared an American plate") flowers at Stage 8 into La Grande Soirée.

**Agent Marcus Hale:**
Scaffolding for students 5–9:

- **Destiny (5):** Flag `destinyHeadsetMoment: false → true` at first hunger interrupt that fires during a gaming session (check `currentActivity: 'stream'` or `currentActivity: 'gaming'`). `hungerInterrupt (studentId: 5, flag: destinyHeadsetMoment)` fires the "food won" variant. `diary.innerBeat (studentId: 5, stageMin: 4)` fires the "third time I didn't mind" variant. Estimated: 3 variants across 2 pools.

- **Tiffany (6):** Flag `tiffanySatDownAtTable: false → true` at Stage 5+ when Tiffany's own fullness exceeds 70% during any class action she's hosting. `diary.innerBeat (studentId: 6, stageMin: 5, flag: tiffanySatDownAtTable)` fires the "social proof" variant. `attitude (studentId: 6, stageMin: 5)` fires the plate-filled-for-her physical anchor. Estimated: 3 variants across 2 pools.

- **Priya (7):** No flag needed. `diary.innerBeat (studentId: 7, stageMin: 3)` fires the spreadsheet-with-a-goal variant. `talkCodas (studentId: 7, corruption: [2], corruptionMaturity: 'settled')` fires the "optimal caloric surplus" line. Estimated: 3 variants across 2 pools.

- **Maya (8):** No flag needed. `diary.innerBeat (studentId: 8, stageMin: 5)` fires the "bed holds her" variant. `diary.innerBeat (studentId: 8, stageMin: 9, isImmobile: true)` fires the nest-complete variant. `BLOB_PRIVATE_INTRO (studentId: 8)` fires the room-reorganized-around-her variant. Estimated: 4 variants across 2 pools.

- **Chloé (9):** No flag needed. `diary.innerBeat (studentId: 9, stageMin: 2)` fires the "c'est obscène" (approval) variant in French register. `diary.innerBeat (studentId: 9, stageMin: 5)` fires the "first time she called it civilization" variant. `grow.reaction (studentId: 9)` uses French interjections. Estimated: 4 variants across 2 pools.

**Agent Elena Moreau:**
Students 10–14 (Reneé through Mary Jane):

Reneé's arc is the cook who becomes the feast. She has always tasted everything, refined everything, never finished a dish she made for someone else. The sub-arc is the evening she does: she finishes it, then she goes back, then she's eating from the pot at midnight with no plate, no staging, just warmth and hunger and the quiet of a kitchen that's hers alone. The art falls away and what remains is the appetite.

Kaylee's arc is the nursing student with medical knowledge that should be alarming and isn't. She knows the metabolic math precisely. She knows what's happening at every stage. The sub-arc is the long exercise of finding the specific evidence that validates what she's already doing — the literature review that comes back with exactly the answer she wanted.

Nadia's arc is the psychologist observing herself as a subject. She has clinical language for everything and she applies it to her own gaining: "engagement behaviors," "reinforcement patterns," "hedonic set point adjustment." Around Stage 4, her notes stop being clinical. She starts calling things by their right names.

Daisy's arc is the early childhood educator who teaches children about their bodies with warmth and without shame all week, and comes home and tries the same approach on herself. It works. This surprises her less than she expected.

Mary Jane's arc is the farm girl's philosophy of abundance: good land bears good weight, the harvest doesn't apologize, you don't thin the crop when it's thriving. She applies this to herself with complete matter-of-fact warmth. No conflict, no denial — just the deep satisfaction of someone who knows the season and trusts it.

**Agent Lila Voss:**
Physical anchors for 10–14:

Reneé's physical anchor is the kitchen at night: the specific quality of eating standing up, from the pot, in the dark, the warmth of food against the cold of the hour, the way her belly presses against the counter's edge as she leans in.

Kaylee's physical anchor is the medical reference materials: the BMI chart with her own numbers highlighted, and the exact moment she looks at the chart and looks at herself and decides the chart is wrong about something important.

Nadia's physical anchor is the notebook she uses for observation notes: at Stage 2 it's clinical. At Stage 4, she starts putting brackets around observations ("noted — wanted more [did not enter as variable]"). At Stage 6, the brackets have taken over.

Daisy's physical anchor is a child's book about bodies she reads aloud: at some stage she reads it to herself, quietly, alone, like a permission slip written for someone smaller but applicable to her anyway.

Mary Jane's physical anchor is the kitchen scale she grew up with — the one you weigh grain on, that goes up to a hundred pounds. She's used it for produce all her life. The sub-arc's key moment is her putting her hand on the scale, feeling the weight register, and thinking: *good crop this season.*

**Agent Vera Kane:**
High-stage flowering for 10–14:

Reneé becomes the Cultivator: the arc at Stage 4 ("eating from the pot alone") flowers at Stage 8 into harvesting her taste tester's accumulated lbs, having herself become enormous through the work of feeding others.

Kaylee has no evolution path, which makes her arc the purest: it ends with her, at whatever stage she reaches, having made a complete internal peace with her own knowledge and her own appetite. The arc's end is the diary entry where she doesn't cite a source.

Nadia becomes the Psych Researcher: the arc at Stage 4 ("notes stop being clinical") flowers at Stage 7 into a research journal where she is the primary subject and has stopped pretending otherwise.

Daisy becomes the Homeroom Queen: the arc at Stage 4 ("teacher becomes student") flowers at Stage 8 into a classroom of women who have all given themselves the same permission she gave herself.

Mary Jane becomes the State Fair Queen: the arc at Stage 3 ("good crop this season") flowers at Stage 9 into the fair day weigh-in, where she stands on the platform with the same ease as standing on her grandmother's porch.

**Agent Marcus Hale:**
Scaffolding for students 10–14:

- **Reneé (10):** Flag `reneePotNightEating: false → true` at first self-feed event at Stage 4+ (any `selfFeed` or `gluttonyInstinct` trigger). `diary.innerBeat (studentId: 10, stageMin: 4, flag: reneePotNightEating)` fires the "eating from the pot" variant. `grow.reaction (studentId: 10)` uses culinary-register language ("the reduction is complete"). Estimated: 3 variants across 2 pools.

- **Kaylee (11):** No flag needed. `diary.innerBeat (studentId: 11, stageMin: 3)` fires the "BMI chart review" rationalization variant. `diary.innerBeat (studentId: 11, stageMin: 6, corruption: [2])` fires the "didn't cite a source" variant. `attitude (studentId: 11, stageMin: 4)` fires the chart-vs-body visual anchor. Estimated: 4 variants across 2 pools.

- **Nadia (12):** Flag `nadiaBracketsNote: false → true` at Stage 4 corruption-1 crossing. `diary.innerBeat (studentId: 12, stageMin: 3)` fires the clinical-observer variant. `diary.innerBeat (studentId: 12, stageMin: 5, flag: nadiaBracketsNote)` fires the brackets-taking-over variant. Estimated: 3 variants across 2 pools.

- **Daisy (13):** Flag `daisyPermissionSlip: false → true` at Stage 4 (or any event where her own fullness reaches 80%+ during a homeroom session). `diary.innerBeat (studentId: 13, stageMin: 4, flag: daisyPermissionSlip)` fires the "read it to myself" variant. `attitude (studentId: 13, stageMin: 4)` fires the warm self-permission line. Estimated: 3 variants across 2 pools.

- **Mary Jane (14):** No flag needed. `diary.innerBeat (studentId: 14)` fires at every stage using harvest vocabulary — the language is consistent from Stage 1 to Stage 11, only the quantity changes. `grow.reaction (studentId: 14)` uses grain/harvest metaphors. Estimated: 4 variants across 2 pools (one per stage band).

**Agent Elena Moreau:**
Students 15–18 plus wrapping on 16 (the hidden two + Sophia + Talia):

Lilith (hidden, predator) doesn't have a corruption arc — her psychology is already predatory, already certain, already without shame. Her sub-arc is physical: at high stages, she becomes too large for some of the spaces she used to hunt through. Rather than framing this as limitation, the arc reframes it as *elevation* — she doesn't go to the prey anymore, the prey comes to her. She has become the gravity. This is purely Lila's territory, but I'll note that Lilith's diary (if she has one) should read nothing like the other girls'. It's not confession. It's chronicle.

Indiana Bones (hidden, explorer) is a late-unlock character who arrives already shaped by fieldwork, physical competence, and a particular relationship with measurement and documentation. Her sub-arc: she has catalogued artifacts on four continents and described the stratigraphy of a dozen dig sites, but she has never turned that attention on her own body. The arc is that attention turning inward — the explorer who discovers the most interesting dig is herself.

Sophia (pharmacy) has the most technically sophisticated self-awareness of any student. She knows exactly what's happening pharmacologically. The sub-arc is the private diary she keeps that reads like a case study except for the annotations — notes in a different color, added later, that say things like "observed: did not want the session to end" and "note: previous estimate of desired intake revised upward."

Talia (inventor) tracks everything because tracking is how she thinks. She tracks her own mass because the device-building requires knowing it precisely. The sub-arc is the gradual transformation of her lab logs from precise data entries to documents that have been revised, crossed out, and in one memorable instance contain a small doodle where a number should be.

**Agent Lila Voss:**
Physical anchors for 15–18 (Lilith, Indiana, Sophia, Talia):

Lilith's physical anchor is the doorframe. At Stage 5, she moves through them without thinking. At Stage 7, she turns sideways. At Stage 9, she doesn't need to turn — but she doesn't fit without touching both sides, and the touch is proprioceptive, deliberate. She knows her own width the way a ship's captain knows the channel depth. At Stage 10, she stays in one place. Everything comes to her.

Indiana Bones' physical anchor is the dig journal: she uses the same format for her own measurements as for artifact dimensions. "Subject: left arm, circumference at midpoint — [measurement]. Comparative note: softer than Q3."

Sophia's physical anchor is the compound log: she keeps exact records of everything she administers, everything she observes. The physical moment is her updating her own entry with a measurement that surprises her — and noting, in the margin, "expected resistance at this threshold. Resistance absent."

Talia's physical anchor is the precision scale in the lab, which she uses for both parts and herself. The sub-arc's keystone moment is weighing herself on the lab scale for device-building purposes and the readout is a number she didn't plan for. She writes it down. Then she crosses it out. Then she writes it again in larger handwriting.

**Agent Vera Kane:**
High-stage flowering for 15–18:

Lilith's arc doesn't flower into an evolved path — it flowers into a stage. At Stage 10, the hunt map collapses to Danny (delivery only), and instead of being diminishment, the prose should treat it as apotheosis. She is the thing that things come to now.

Indiana Bones' arc flowers into the Relic Hunter quests: she treats every discovered site with the same care she's started applying to her own body. The most important artifact she's catalogued all semester is herself.

Sophia's arc flowers into the Goddess of Excess (pharmacist stage 4): the case study has reached its conclusion, and the conclusion is that she is the most successful experiment she's ever run.

Talia's arc flowers into the Machine Goddess: the lab logs that started as data and ended as marginalia are themselves artifacts of the transformation. The machine she's built is herself.

**Agent Marcus Hale:**
Scaffolding for students 15–18:

- **Lilith (15, hidden):** Lilith-specific diary pool `diary.lilith` (existing or new; she likely has bespoke handling). Add variants at `stageMin: 7` (doorframe-turn begins), `stageMin: 9` (both-sides-touching), `stageMin: 10` (gravity-center). Also `grow.reaction (studentId: 15, stageMin: 8)` fires the "things come to me now" attractor pivot. No flags needed — stage gates suffice. Estimated: 5 variants across 2 pools.

- **Indiana Bones (17, hidden):** Indiana likely has minimal text content on unlock. Add `diary.innerBeat (studentId: 17, stageMin: 3)` using dig-journal formatting: short, measured, with a note appended in different voice. `grow.reaction (studentId: 17)` uses stratigraphy language. `attitude (studentId: 17, stageMin: 5)` fires the "most interesting dig site" line. Estimated: 4 variants across 3 pools.

- **Sophia (16):** Flag `sophiaAnnotatedLog: false → true` at Stage 4 pharmacist path, synthesis session 5+. `diary.innerBeat (studentId: 16, stageMin: 4)` fires the case-study-with-annotations variant. `evolvedDiary (pharmacist, activityStage: 3)` fires the "Goddess" arc capstone. `attitude (studentId: 16, stageMin: 5)` fires "resistance absent" compound-log language. Estimated: 4 variants across 3 pools.

- **Talia (18):** Flag `taliaScaleSurprise: false → true` at first session where Talia's mass for a device build exceeds her prior-week record. `diary.innerBeat (studentId: 18, stageMin: 3)` fires the lab-log variant (clinical with warm corrections). `diary.innerBeat (studentId: 18, stageMin: 6, flag: taliaScaleSurprise)` fires the large-handwriting variant. `grow.reaction (studentId: 18)` uses technical-register language that gives way. Estimated: 4 variants across 2 pools.

---

## ROUND 3 — REFINEMENT & SAMPLE CREATION

**Agent Elena Moreau:**
Looking across all nineteen sub-arcs, I want to name the two master tensions that run through them:

*Tension A — Knowledge vs. surrender.* Madeline, Kaylee, Nadia, Sophia all have versions of this: the character knows, and the knowing doesn't stop anything. What makes it erotic is the gap between understanding and compliance — the way the intellectual framework is retrofitted after the fact, or applied in the wrong direction. These arcs need to be written so the reader feels the knowledge bending.

*Tension B — Performance vs. private self.* Kylie, Tiffany, Destiny, Brittany all perform their identities (influencer, hostess, gamer, cheerleader) and the gaining slowly creates a gap between the performance and something realer underneath. These arcs need the moment of private contact — the thing that escapes the frame.

The five students who have neither tension (Mary Jane, Maya, Reneé, Lilith, Indiana Bones) are the clearest: they don't resist, they don't perform. Their arcs are pure *arrival* — body becoming what it was always going to become, appetite acknowledged without ceremony. These should be the most physically specific prose, because the psychology is uncomplicated and all the charge is in the body itself.

**Agent Vera Kane:**
On the consumption dimension for the three students with the highest eating potential:

Destiny: the eating stream focus-bar mini-game has her eating massive quantities with brand involvement. Her sub-arc should seed a line in the diary — even at Stage 3 — about the amount she can put away during a good session. Not pride yet. Just notation. The pride comes later.

Reneé: her Cultivator path involves harvesting enormous lbs from a taste tester, which means she's the one doing the feeding. But her own consumption is quieter and more intimate. The diary line from the pot-eating arc should reappear in the evolvedDiary: same warmth, enormously larger scale.

Tiffany: the Chapter Hostess feasts reach 12 people and courses. Her evolved diary should have a line about how much she eats at her own feasts, and it should be a larger number every time. The early-arc line ("ate as much as I served") should echo in the evolved arc ("ate as much as the table combined, and held the room together").

**Agent Lila Voss:**
My final demand before samples: for the three blob/near-immobile scenarios (Maya Stage 10, Lilith Stage 10, and any student who reaches that range), the prose must describe furniture as character. The mattress that accepts her. The chair that fails. The doorframe she now spans. These are not props — they're witnesses. Write them with the same specificity as you'd write a person.

Also: the physical anchor for Daisy is a children's book about bodies — I want that image in the sample passage. It's the most unexpected and therefore the hottest item on this list. A woman teaching herself body acceptance from a book she reads to five-year-olds is character in two sentences.

**Agent Marcus Hale:**
Final technical note before samples: the full sub-arc system I've described above requires:

- **12 boolean student flags** (one per student where the arc has a specific trigger moment; seven students need no flag)
- **~68 new variant entries** across approximately 8 existing pool files
- **0 new module keys**
- **0 new engine changes**
- **2 new derived selectors** (from Session 1, already proposed: `corruptionMaturity`, `selfPossessionBand`)

Every variant follows the `breakScene.js` authoring pattern. Every pool has or will have a `{ when: {} }` fallback. The lint cycle will catch any missing fallbacks. This is a content sprint, not an architecture change.

---

# DELIVERABLES

---

## 1. EXECUTIVE AUDIT SUMMARY

The text engine is architecturally sound. The prose layer's central gap is **character specificity at the emotional level** — the `when` selector space supports differentiation by student, stage, corruption, and psych axis, but the authored content often doesn't exploit the full matrix. The four major opportunities:

**The sub-arc gap:** Nineteen students share a small set of generic inner voice and diary variants. Each student should have her own psychological fingerprint in the prose — the specific thing she tells herself, the particular rationalization she uses, the exact moment her self-narrative cracks. This session's mandatory sub-arc catalog addresses this directly.

**The two master tensions:** All nineteen arcs can be understood through two frameworks: *knowledge vs. surrender* (the intellectual characters who understand and comply anyway) and *performance vs. private self* (the social characters whose gaining creates a gap between role and reality). These tensions should be the organizing principle for inner voice and diary content.

**The arrival characters:** Mary Jane, Maya, Reneé, Lilith, and Indiana Bones have none of the above tensions — they arrive without resistance. Their arcs are purely physical and therefore need the most body-specific, sensation-specific language. Furniture as character. Appetite as weather. Size as home.

**The high-stage void:** Stages 8–11 have thin prose coverage. Every student's sub-arc should be seeded early and flower at high stages. The bloom matters as much as the seed.

---

## 2. PRIORITIZED ENHANCEMENT LIST

1. **`diary.innerBeat` — add all 19 `studentId`-keyed variants** with corruption/stage cross-keys. Highest leverage: every diary entry becomes character-specific.

2. **`grow.reaction` — add per-student variants** at relevant stage thresholds. Growth events should feel like each girl specifically, not a generic archetype.

3. **`attitude.js` — add `studentId`-keyed lines at Stage 5+** for all students. At very high stages, attitude lines should reflect the evolved or near-evolved self, not just archetype.

4. **`talkCodas.js` — differentiate per student** using `studentId` + `corruptionMaturity` + `psych.shame`. The broken-in coda is character-defining.

5. **`hungerInterrupt.js` — add per-student personal interrupt variants** (especially Destiny, Sophia, Reneé). The craving scenes should feel like her specifically.

6. **`evolvedDiary.js` — add `selfPossessionBand`-keyed variants per evolved form** that echo the early sub-arc seed in the high-stage bloom.

7. **`BLOB_PRIVATE_INTRO` (`students.js`) — expand to pools** with `isImmobile: true` + `studentId` + relationship tier cross-keying. Maya, Destiny (potential), and any other blob student should each have 4+ variants minimum.

8. **12 student flags** (listed in §3 below) — add to student model and set at appropriate game events.

---

## 3. MODULAR TEXT ENGINE GUIDELINES

*(Scaffolded by Agent Marcus Hale.)*

### 3.1 Student flags — add to `INIT_STUDENTS` (all default `false`)

```js
// In INIT_STUDENTS[id]:
brittanyUniformStrained: false,    // id 0 — set at Stage 5 feeding
kyliePrivateMoment: false,         // id 2 — set at first unfimed feeding
fionaSelfPhotographed: false,      // id 4 — set at Stage 5 self-shoot
destinyHeadsetMoment: false,       // id 5 — set at first gaming hunger interrupt
tiffanySatDownAtTable: false,      // id 6 — set at Stage 5 self-fullness > 70% during class action
reneePotNightEating: false,        // id 10 — set at Stage 4 gluttonyInstinct trigger
nadiaBracketsNote: false,          // id 12 — set at Stage 4 corruption-1 crossing
daisyPermissionSlip: false,        // id 13 — set at Stage 4 self-fullness > 80% during homeroom
sophiaAnnotatedLog: false,         // id 16 — set at pharmacist synthesis session 5+
taliaScaleSurprise: false,         // id 18 — set when Talia lbs-record exceeded during build
```

*(Brittany: `brittanyUniformStrained` / Fiona: `fionaSelfPhotographed` / Lilith: no flag needed, stage gates suffice / Indiana Bones: no flag needed)*

### 3.2 Pool scaffolding overview

All sub-arc content lives in these existing pools. Every variant follows `breakScene.js` shape conventions and includes a `{ when: {} }` fallback in its pool:

| Pool | File | New variants |
|------|------|-------------|
| `diary.innerBeat` | `diary.js` | ~34 (2 per student, some students 3+) |
| `grow.reaction` | `growthEvent/` | ~19 (1 per student minimum) |
| `attitude.*` | `attitude.js` | ~24 (stage-gated per student) |
| `talkCodas.*` | `talkCodas.js` | ~12 (corruption-2 students) |
| `hungerInterrupt.*` | `hungerInterrupt.js` | ~8 (specific students) |
| `diary.lilith` | diary or bespoke | ~5 (stage-gated, Lilith only) |
| `BLOB_PRIVATE_INTRO` | `students.js` | ~12 (Maya + Lilith + 2 others) |
| `evolvedDiary.*` | `evolvedDiary.js` | ~19 (1 per evolved path, echoing sub-arc seed) |

### 3.3 `when` condition patterns for sub-arc variants

```js
// Standard per-student diary variant (corruption-keyed):
{ when: { studentId: N, corruption: [1], stageMin: 3 }, weight: 4, text: [...] }

// Flag-gated sub-arc keystone moment:
{ when: { studentId: N, flag: 'brittanyUniformStrained', stageMin: 5 }, weight: 5, text: [...] }

// High-stage arrival character (no corruption complexity needed):
{ when: { studentId: 14, stageMin: 6 }, weight: 4, text: [...] }

// Lilith stage-gated (no corruption dimension):
{ when: { studentId: 15, stageMin: 10, isImmobile: true }, weight: 5, text: [...] }

// Two-selector mature arc variant (use corruptionMaturity from Session 1):
{ when: { studentId: 7, corruption: [2], corruptionMaturity: 'settled' }, weight: 5, text: [...] }
```

### 3.4 Flag-setting trigger points (code locations)

```js
// brittanyUniformStrained → set in gainSystem.js or session handling
// when: student.id === 0 && weightStageId >= 5 && any feeding session
// flag not yet set

// kyliePrivateMoment → set in action handlers
// when: student.id === 2 && feeding action taken && no 'record' or 'stream' activity active

// fionaSelfPhotographed → set in ArtisanGalleryModal or fieldShoot handler
// when: student.id === 4 && weightStageId >= 5 && fieldShoot self-target (or studio solo session)

// destinyHeadsetMoment → set in hungerInterrupt handler
// when: student.id === 5 && hungerTier >= 2 && interrupt fires during stream/gaming context

// Others follow same pattern: one flag set once at one natural game event
```

---

## 4. HIGH-HEAT SAMPLE REWRITES

*Eight passages demonstrating sub-arc integration across scene types. Each maps to the pool variants described above.*

---

### Sample 1 — Weigh-In with Brittany's Uniform Arc (Stage 5→6 crossing, `brittanyUniformStrained: true`)

*Pool: `wi.reaction (studentId: 0, stageMin: 5, flag: brittanyUniformStrained)` + `diary.innerBeat (studentId: 0, stageMin: 5)` echo.*

---

The scale delivers its number and she reads it the way she reads a scoreboard she's already decided doesn't count.

She doesn't say it's wrong. She said that three weigh-ins ago and she's moved on. Now she says nothing, which is a different kind of processing — the kind that happens below the vocal cords, in the chest, where things settle into the category of *true*.

"I went to practice yesterday," she says, not entirely for you. "Just to see how the girls are doing." She pauses. "Just to see."

She's been going to practice every week since Stage 4. Not running drills — she'd stopped the drills quietly, around the same time she stopped trying to zip the uniform. But she's been there, watching from the sideline, and the girls wave, and she waves back, and something in the air between them has changed in a way she keeps not-naming.

"Coach said she might bring me on as a choreographer." She smooths the front of the shirt she's wearing instead of the uniform. It's bigger. It's softer. It fits. "She said I 'command presence.'" She tastes this phrase, evidently, because a small expression crosses her face that isn't quite a smile and isn't quite anything else.

She doesn't check the scale a second time. She already knows.

---

### Sample 2 — Kaylee's Diary: Nursing Student Rationalization Arc (Stage 4, corruption tier 0→1)

*Pool: `diary.innerBeat (studentId: 11, stageMin: 3, corruption: [0])` transitioning to `(corruption: [1])`.*

---

**Week {week}**

Did some reading this week. There's a 2019 meta-analysis in the *Journal of Nutritional Science* that suggests the metabolic differences between individuals with different set points are much larger than previously reported — which, if accurate, suggests the standard chart-based assessments are not merely imprecise but potentially *misleading* in cases like mine.

The study has some methodological limitations. I've noted them in the margin.

I've also found two related papers that support the same general conclusion. I've noted their limitations too, though they are fewer.

Anyway: the gain this week was expected based on the caloric surplus I've been maintaining — I calculated it exactly, which is the nursing training, I don't miss details. What I didn't calculate was how it would feel, which is warmer than expected and also different from concerning, which is what I was expecting it to feel like.

I made an appointment with myself to worry about this. I keep rescheduling it.

---

### Sample 3 — Growth Event, Reneé (culinary, Stage 4, `reneePotNightEating: true`)

*Pool: `grow.reaction (studentId: 10, stageMin: 4)` + `grow.physicalBeat (bodyType: rotund, zone: belly)`.*

---

The stage crossing comes on a Thursday, which is her long kitchen day: lunch service, prep for the week, the kind of day that ends at ten with flour on her wrists and a satisfaction that has nothing to do with acclaim.

Her belly had been building toward this all month. Round already, heavy already, the kind of weight that shifts her center of gravity an inch forward and makes her lean into counters instead of away from them. This week it finds the new number with a kind of purpose: a depth of curve that makes her apron sit differently, a weight at the front of her that makes reaching across a full cooktop a thing she reroutes around rather than through.

She finds out about the crossing the way she finds out about most things: indirectly, through experience. The pot handle she always grabs with her right hand is an inch further than it should be. She adjusts.

She doesn't write it down. She's not that kind of cook.

But that night — midnight, the kitchen hers alone, the leftover cassoulet in the pot on the cold burner — she eats standing up, both hands, no plate, no staging. Just the warmth of what's there and the quiet of no one watching and the slow, entire satisfaction of a woman who has found out what she needs and is giving it to herself without argument.

Her belly presses warm against the counter's edge. She leans in instead of away.

---

### Sample 4 — Nadia's Diary: Observer Becoming Subject (Stage 4–5, `nadiaBracketsNote: true`)

*Pool: `diary.innerBeat (studentId: 12, stageMin: 4, flag: nadiaBracketsNote)`.*

---

**Week {week} — Observation Log [personal, not for study]**

Behavioral note: subject presented at dining hall with elevated appetite markers consistent with habituated caloric increase pattern. Subject selected largest available portion without deliberate choice process [automatic, not goal-directed]. Subject returned for additional portion. [Note: "subject" is me. I'm aware.]

Environmental response: chair at usual table is now insufficient for comfortable prolonged sitting [cushion compressed to substrate, left armrest contact point shifted 3 cm rightward]. Adjusted seating to larger option at end of table without conscious deliberation. [Note: I did notice, after. I just — didn't do anything about it.]

Hedonic assessment: elevated positive affect associated with high-caloric intake, consistent with dopaminergic reinforcement pattern. Self-reported: "felt good." [Bracketed note added several days later: this is a significant understatement. The clinical language was doing work here that I'm not sure I authorized it to do.]

Hypothesis (revised, third version): the gap between observed behavior and reported attitude in this subject is narrowing. Initial hypothesis was that observed behavior would remain ego-dystonic indefinitely. Revised hypothesis: ego-syntonic integration may be occurring faster than predicted.

[Note in different ink, bottom of page:] I think I just wanted more. I think I've been wanting more for a while. I don't know why I needed to write four paragraphs to say that.

---

### Sample 5 — Talia's Lab Log: Inventor Sub-Arc (Stage 3–4, `taliaScaleSurprise: true`)

*Pool: `diary.innerBeat (studentId: 18, stageMin: 3)` + `diary.innerBeat (studentId: 18, stageMin: 6, flag: taliaScaleSurprise)`.*

---

**Lab Log — Week {week}**

Device build: belt module v2 (stability +12 from v1). Estimated lbs expenditure for construction: 14. Actual lbs expenditure: 14.2. Within acceptable variance (1.4%). 

Total mass available for builds: [crossed out] [different handwriting] [crossed out again] okay.

Current total mass: [number written, circled, then a note: "this is fine, this is for the build calculations"] [smaller note: "I'm not upset about it"] [smallest note: :)]

Post-build output test: device performance within spec. Noted: wearing the completed belt during the test produced unanticipated secondary reading on the sensory feedback array. Array is functioning correctly. Reading was me. I have added this to the calibration data.

Build queue for next week: feeder arm extension (est. 8–10 lbs). Available mass: comfortable. 

[Note in pencil, added after page was finished:] The number is bigger than it was in the spring. I've been tracking it in column G. Column G has a good trend. I think I like column G.

---

### Sample 6 — Lilith's Stage 9 Diary: Predator Becomes Gravity (Stage 9, `isImmobile: false, stageMin: 9`)

*Pool: `diary.lilith (studentId: 15, stageMin: 9)`.*

---

I went to the north quad this week. There's a bench I used to use as staging — good sightlines, foot traffic, the kind of bench that puts you in position.

I got there. I sat down.

A man stopped to ask if I was alright.

I told him I was hungry.

He got me something from the food cart. He came back while I was eating it and asked if I wanted more. I said yes. He went back again.

This isn't new — I've never had to work hard. But it's different now. Before, it was a choice I made, a movement I initiated. Now it happens because I am here, because I am this, because something about me in this place on this bench causes a different gravity than I used to make.

I didn't move for three hours. Three different people brought me things. One of them sat down and talked to me for forty minutes. I don't need to go anywhere.

I'm going to figure out if Danny delivers to the quad.

---

### Sample 7 — Mary Jane's Growth Event: Harvest Philosophy (Stage 5, any body type)

*Pool: `grow.reaction (studentId: 14, stageMin: 5)`.*

---

She comes back from the scale and doesn't say anything for a moment — but it's not the silence of someone processing something difficult. It's the silence of someone settling into something known.

"My grandma had a saying," she says finally, not hurrying it. "She'd walk the fields in fall and say, *good land bears good weight.* Didn't matter what the almanac said or what the yield was supposed to be. If the harvest was heavy, the land was healthy."

She rests both hands on her belly — not dramatically, not for you, just the way you rest your hands on a surface that belongs to you.

"I'm a good harvest this year," she says, matter-of-factly. "That's all."

She says it like someone closing a ledger. Like the column adds up and the total is right and there's nothing else to check.

---

### Sample 8 — Indiana Bones' First Diary Entry Post-Unlock (Stage 3, early arc)

*Pool: `diary.innerBeat (studentId: 17, stageMin: 3)`.*

---

**Field Journal — Campus (Active Site)**

Week {week}. Acclimatization continues. American university environments present unusual archaeological challenges: layers are compressed, stratigraphy is rapid, subjects don't hold still.

Physical note [usually I don't include these but the site demands it]: the expedition gear that fit at summer's end now doesn't. Left jacket specifically. Buttons viable but circumference around midsection has shifted +7–9 cm from baseline. Consistent with caloric surplus conditions (dining hall access, no field-ration constraints, significant reduction in active excavation).

Comparative note: at Crete dig, Year 2, I lost 4 kg over six weeks. Here I have gained approximately the same amount in less time. Environmental variables are obvious.

[Different pen, added later:] I spent ten minutes this afternoon trying to record the jacket circumference measurement in the same format I'd use for a find. Width at widest point. Material condition: excellent, soft. State of preservation: actively changing.

I don't know what I'm doing. But I've been at sites where I didn't know what I was looking at for months before it became obvious. I'm going to keep taking measurements.

---

## 5. PER-STUDENT SUB-ARC CATALOG (MANDATORY DELIVERABLE)

*Complete entry for all 19 students. Format: name / archetype / core arc / erotic power / modular home + scaffolding.*

---

### 0 — Brittany (cheerleader)

**Core arc:** At Stage 5, the squad uniform stops zipping. Brittany retires from stunt positions quietly, keeps attending practice "as support," and slowly transforms the loss of her old role into an argument for a new one — one that requires exactly the body she has now. The guilty thrill of outgrowing the container she built her identity around.

**Erotic power:** The intersection of identity loss and bodily liberation. The thrill is in what she can't name: that she keeps showing up, keeps being seen, keeps growing beyond the role that couldn't hold her.

**Modular home:** `diary.innerBeat (studentId: 0, stageMin: 5)` — guilt/thrill arc. `grow.reaction (studentId: 0, stageMin: 5)` — zipper tug, decision to exhale. `attitude (studentId: 0, stageMin: 5)` — "showed up to practice anyway, in something softer." Flag: `brittanyUniformStrained` at Stage 5.

---

### 1 — Madeline (bookworm)

**Core arc:** Madeline's gaining comes accompanied by an ever-shifting bibliography. At Stage 2, she's found a study that says individual variation in set point is underappreciated. At Stage 4, she's found three supporting papers. At Stage 6, she's stopped noting the limitations. The research has become indistinguishable from the desire.

**Erotic power:** The knowledge bending — a sharp mind doing the work of rationalization with full academic rigor applied in the wrong direction. The reader knows before she does that the literature review is desire wearing a citation.

**Modular home:** `diary.innerBeat (studentId: 1, stageMin: 2)` — first citation variant. `diary.innerBeat (studentId: 1, stageMin: 5, corruption: [1])` — "the paper was my conclusion before I found it" variant. `attitude (studentId: 1, stageMin: 4)` — book resting on belly as physical anchor.

---

### 2 — Kylie (influencer)

**Core arc:** Every aspect of Kylie's gaining is content — shot, framed, captioned, posted. The sub-arc is the moment that escapes the frame: a bite taken off camera, a reflection in a dark window, a diary entry she writes without imagining an audience. The arc is the gap between the performance and the private contact, and its closure: eventually she can't tell the difference between what she wants and what she'd post.

**Erotic power:** The moment when cultivation gives way to pure appetite — when the influencer stops performing gaining and starts just *gaining*. The camera's absence is more erotic than its presence.

**Modular home:** `diary.innerBeat (studentId: 2, stageMin: 3, flag: kyliePrivateMoment)` — the escaped-frame variant. `attitude (studentId: 2, stageMin: 7)` — "no angle that flatens this anymore; she shoots wide." `evolvedDiary (feedee_creator, activityStage: 3)` — the Wren collab where she forgets to frame anything. Flag: `kyliePrivateMoment`.

---

### 3 — Serena (athlete)

**Core arc:** Serena times her runs at every stage. At Stage 4, the time is worse than it's ever been; the body feels better than it's ever been. She writes both data points in her diary and doesn't know which one to trust. By Stage 6, she's stopped timing and started noticing different things: momentum, stability, how the ground receives her differently, how she fills the frame of a doorway. A different kind of athletic mastery.

**Erotic power:** Athletic identity transforming rather than dying — the precision and discipline remain, applied to a completely different set of measurements. The eroticism is the mastery surviving the form change.

**Modular home:** `diary.innerBeat (studentId: 3, stageMin: 4)` — "worse time, better body" variant. `grow.reaction (studentId: 3, stageMin: 4)` — muscle memory meeting mass. `attitude (studentId: 3, stageMin: 6)` — "different kind of presence in a room." `evolvedDiary (sumo, activityStage: 2)` — wins by mass, not technique.

---

### 4 — Fiona (artsy)

**Core arc:** Fiona photographs everything and everyone with complete unselfconsciousness. She has never photographed herself — not because she's ashamed, but because she's always been behind the lens. At Stage 5, one night in the studio, she turns the camera around. The photograph is extraordinary. She enters it in a show. The artist who was always the witness becomes, once, the subject.

**Erotic power:** Attention turned inward on a body the artist has been cultivating without admitting it. The self-portrait is the moment of full erotic acknowledgment — artistic and bodily simultaneously.

**Modular home:** `diary.innerBeat (studentId: 4, stageMin: 5, flag: fionaSelfPhotographed)` — "the image is good" variant. `grow.reaction (studentId: 4)` — photographer's-eye language on her own change. `evolvedDiary (artisan_gallery, activityStage: 2+)` — self-portrait enters Permanent Collection. Flag: `fionaSelfPhotographed`.

---

### 5 — Destiny (gamer)

**Core arc:** Destiny has always been able to play through anything: hunger, fatigue, the controller growing slick. At Stage 3, hunger starts breaking her concentration in a way she can't ignore. She's furious the first time she has to tap out for food. The fifth time, she brings the food to the stream. The tenth time, she realizes the eating IS the stream — and the sessions where she eats on camera get three times the viewers.

**Erotic power:** The body interrupting and overriding the will — and then the will accepting this as the new strategy. The gamer identity doesn't die; it absorbs the appetite and is larger for it.

**Modular home:** `hungerInterrupt (studentId: 5, flag: destinyHeadsetMoment)` — "food won" variant. `diary.innerBeat (studentId: 5, stageMin: 4)` — "third time I didn't mind, fifth time it was the plan." `evolvedDiary (eating_streamer, activityStage: 2)` — the session that made the channel. Flag: `destinyHeadsetMoment`.

---

### 6 — Tiffany (sorority)

**Core arc:** Tiffany has always been the one who ensures everyone else has enough. At Stage 5, she notices she's eating as much as she's serving. Instead of hiding it, she holds it up: if the hostess eats, the party is real. Her own visible appetite becomes the social permission slip for the entire chapter. Her size is not incidental to her hospitality — it is its proof of concept.

**Erotic power:** The social permission structure inverting — she used to grant permission by presiding, now she grants it by consuming. Her body is the argument for everyone else's indulgence.

**Modular home:** `diary.innerBeat (studentId: 6, stageMin: 5, flag: tiffanySatDownAtTable)` — "social proof" variant. `attitude (studentId: 6, stageMin: 5)` — "someone refilled her plate for once." `evolvedDiary (chapter_hostess, activityStage: 3)` — "ate as much as the table combined, held the room together." Flag: `tiffanySatDownAtTable`.

---

### 7 — Priya (overachiever)

**Core arc:** Priya tracks everything. At some point she starts tracking her gaining as a *goal variable*, not a dependent one. The spreadsheet that began as documentation becomes a project plan. The overachiever who used to measure GPA now measures a different kind of achievement with the same intensity and the same precision — and the same fierce satisfaction when the numbers move in the right direction.

**Erotic power:** Pure overachiever psychology applied to gaining — the drive, the metrics, the satisfaction of a number going right. The eroticism is in the transfer of intensity from one domain to another.

**Modular home:** `diary.innerBeat (studentId: 7, stageMin: 3)` — "spreadsheet with a goal in it" variant. `talkCodas (studentId: 7, corruption: [2], corruptionMaturity: 'settled')` — "optimal caloric surplus" line. `attitude (studentId: 7, stageMin: 5)` — the corkboard goes up, measurements versus classmates.

---

### 8 — Maya (quiet)

**Core arc:** Maya barely speaks. Her presence has always been the quietest in any room. The sub-arc is the way this changes meaning as her size grows — the quietness stops being absence and becomes a kind of weight, a gravity, a center. By Stage 9 she isn't quiet because she has nothing to say; she's quiet because she has become the room's organizing principle and doesn't need to speak.

**Erotic power:** Stillness and size as dominance — the quietest person in the room becoming its gravitational center. Immobility as complete arrival rather than limitation.

**Modular home:** `diary.innerBeat (studentId: 8, stageMin: 5)` — "the bed holds her in a way that nothing else does." `diary.innerBeat (studentId: 8, stageMin: 9, isImmobile: true)` — nest complete variant. `BLOB_PRIVATE_INTRO (studentId: 8, relationship: [3])` — room reorganized around her, hand offered for climbing.

---

### 9 — Chloé (transfer)

**Core arc:** Chloé arrived from Paris with the instilled Gallic principle of restraint: a little of something magnificent is better than a lot of something ordinary. American portions were, at first, genuine horror. Then the horror became investigation. Then the investigation became appetite. The arc is the series of small surrenders — the first plate she clears completely, the first dish she goes back for, the evening she calls it *civilization* for the first time without irony.

**Erotic power:** Cultural restraint dissolving into genuine hunger — the sophisticated European discovering that excess is a dialect she'd never learned but finds she was always fluent in. The accent becomes approval.

**Modular home:** `diary.innerBeat (studentId: 9, stageMin: 2)` — "c'est obscène" variant, said with approval, in French register. `diary.innerBeat (studentId: 9, stageMin: 5)` — "called it civilization for the first time." `grow.reaction (studentId: 9)` — French interjections, *rondeur*, *encore*. `evolvedDiary (salon_appetit, activityStage: 2)` — the evening she eats as much as all her guests combined.

---

### 10 — Reneé (culinary)

**Core arc:** Reneé has always tasted everything she made and finished nothing she made for someone else. The sub-arc is the night she does finish it. Then she goes back. Then it's midnight and she's eating from the pot, standing up, no plate, no staging — just warmth and hunger and the quiet of a kitchen that is entirely hers. The art of cooking falls away and what remains is the pure appetite the art was always in service of.

**Erotic power:** The cook's professional distance collapsing into intimate consumption. The discipline of the chef (portions, presentation, restraint) yielding completely to what the appetite actually wants. Cooking as extended foreplay to eating.

**Modular home:** `diary.innerBeat (studentId: 10, stageMin: 4, flag: reneePotNightEating)` — "eating from the pot" midnight variant. `grow.reaction (studentId: 10)` — culinary-register language: "the reduction is complete, the season is right." `evolvedDiary (cultivator, activityStage: 2)` — harvesting from her taste tester while her own midnight eating continues. Flag: `reneePotNightEating`.

---

### 11 — Kaylee (nursing)

**Core arc:** Kaylee knows the metabolic math of what's happening to her. The sub-arc is the way she handles that knowledge: by finding the specific studies that validate what she's already feeling, the literature review that always comes back with the answer she wanted, the BMI chart she looked at and decided was methodologically unsound. The arc ends with a diary entry where she doesn't cite anything. Just states what's true.

**Erotic power:** Knowledge as a tool that bends to serve desire — the intelligence that should be a guardrail becoming a road sign pointing the same direction as the appetite. The nurse who knows everything and does it anyway.

**Modular home:** `diary.innerBeat (studentId: 11, stageMin: 3)` — "found three supporting papers" rationalization variant. `diary.innerBeat (studentId: 11, stageMin: 6, corruption: [2])` — "didn't cite a source" variant. `attitude (studentId: 11, stageMin: 4)` — "BMI chart vs. this particular body" anchor line.

---

### 12 — Nadia (psych)

**Core arc:** Nadia observes her own gaining with clinical rigor. She notes "engagement behaviors," "reinforcement patterns," "hedonic set point adjustments." Around Stage 4, she notices she's started adding brackets to her own notes — `[note: this is me]`, `[note: I wanted more]`. By Stage 5, the brackets have taken over. The observer has become the subject, and the subject has stopped being clinical.

**Erotic power:** The psychologist's vocabulary working against her — the precision of her observation making the desire more visible, not less. The arc is the clinical language giving way to the simple truth underneath it.

**Modular home:** `diary.innerBeat (studentId: 12, stageMin: 3)` — clinical-observer variant with early brackets. `diary.innerBeat (studentId: 12, stageMin: 5, flag: nadiaBracketsNote)` — brackets-taking-over variant, plain language emerging. `evolvedDiary (psych_researcher, activityStage: 2)` — herself as primary subject, openly. Flag: `nadiaBracketsNote`.

---

### 13 — Daisy (eced)

**Core arc:** Daisy teaches young children about their bodies with warmth and without shame every week. She uses picture books. She says "your body is good and your body is yours" to four children at a time, in the same patient voice. At Stage 4, she reads one of these books to herself. Quietly. At home. It works. This surprises her less than she expected.

**Erotic power:** The simplest possible permission given to the most unexpected recipient — a woman teaching children body acceptance gives herself the same lesson, in the same language, and discovers it lands. The gentleness of the sub-arc is the heat of it.

**Modular home:** `diary.innerBeat (studentId: 13, stageMin: 4, flag: daisyPermissionSlip)` — "read the book to myself at home" variant. `attitude (studentId: 13, stageMin: 4)` — "same warm voice she uses with the children, for herself." `evolvedDiary (homeroom_queen, activityStage: 2)` — a classroom of women who've given themselves the same permission. Flag: `daisyPermissionSlip`.

---

### 14 — Mary Jane (farm_girl)

**Core arc:** Mary Jane grew up understanding that good land bears good weight and the harvest doesn't apologize. She applies this to herself with complete matter-of-fact warmth from Stage 1 onward — no crisis, no resistance, no internal debate. The sub-arc isn't a transformation arc; it's a *confirmation* arc. Everything she's always known is proved true by her own body across the semester.

**Erotic power:** The absence of conflict. The body simply doing what it was going to do and the person simply being at peace with it — the earthy, unconflicted acceptance that is its own kind of heat. No drama, no rationalization, just the quiet satisfaction of a harvest that came in right.

**Modular home:** `diary.innerBeat (studentId: 14)` — consistent harvest vocabulary across all stages (the language doesn't change, only the scale). `grow.reaction (studentId: 14)` — grain/harvest metaphors. `attitude (studentId: 14)` — same warmth at Stage 2 as Stage 10, amplitude increasing but register stable.

---

### 15 — Lilith (predator, hidden)

**Core arc:** Lilith hunts actively through most of her arc — moving through the campus, selecting targets, consuming them. At Stage 8, some spaces start to close. At Stage 9, she's choosing her staging position once and staying there. At Stage 10, she's not going anywhere. The arc is not loss of the predator's competence — it's the predator discovering that at sufficient mass, the hunting is no longer necessary. Things come to her now. The gravity has shifted.

**Erotic power:** The active predator becoming the passive attractor — a different kind of power, enormously amplified. The hunt map collapsing from eleven nodes to one is not diminishment; it's apotheosis. She doesn't go to the prey. The prey arrives, and she holds court.

**Modular home:** `diary.lilith (studentId: 15, stageMin: 7)` — first "staying in position" variant. `diary.lilith (studentId: 15, stageMin: 9)` — "things come to me now" variant. `diary.lilith (studentId: 15, stageMin: 10, isImmobile: true)` — gravity-center capstone. `grow.reaction (studentId: 15, stageMin: 8)` — "the doorframe knows my width" physical anchor. No flag needed; stage gates sufficient.

---

### 16 — Sophia (pharmacy_grad)

**Core arc:** Sophia keeps a private pharmacological journal that reads like a case study. It has subject numbers, compound logs, observed outcomes. The annotations — added later, in different ink — are a different document entirely: "observed: did not want the session to end," "note: previous estimate of desired intake revised upward," "status update: resistance absent at this threshold." The case study is her. The experiment is going exactly as hoped.

**Erotic power:** The scientist whose experiment succeeds beyond specification — who understands every mechanism of what's happening and chooses, with full knowledge, to continue. The pharmacist optimizing toward excess.

**Modular home:** `diary.innerBeat (studentId: 16, stageMin: 4)` — "case study with annotations" variant. `diary.innerBeat (studentId: 16, stageMin: 4, flag: sophiaAnnotatedLog, corruption: [2])` — "the annotations have taken over the case study" variant. `evolvedDiary (pharmacist, activityStage: 3)` — Goddess of Excess arc: the most successful experiment she's run. Flag: `sophiaAnnotatedLog`.

---

### 17 — Indiana Bones (explorer, hidden)

**Core arc:** Indiana Bones has catalogued artifacts on four continents, described the stratigraphy of a dozen dig sites, and never once turned that attention on herself. At Stage 3, she starts. She uses the same field journal format — dimensions, condition assessments, comparative notes. She describes her left arm circumference with the same care she'd give a bronze age vessel. Around Stage 5, she writes: "most interesting subject this site has produced."

**Erotic power:** Archaeological attention applied to a body in active transformation — the careful, patient attention of someone who knows how to see change written in layers. The explorer who finds the most important dig site is herself.

**Modular home:** `diary.innerBeat (studentId: 17, stageMin: 3)` — dig-journal format, first self-measurements. `diary.innerBeat (studentId: 17, stageMin: 5)` — "most interesting subject this site has produced" variant. `grow.reaction (studentId: 17)` — stratigraphy language: "new layer visible, consistent with previous deposit pattern." `attitude (studentId: 17, stageMin: 5)` — "takes her own measurements with the same calipers."

---

### 18 — Talia (inventor)

**Core arc:** Talia tracks her own mass because device-building requires it — she spends her own lbs and needs accurate input values. The lab logs are precise. But the annotations tell a different story: numbers crossed out and rewritten, estimates that keep being revised upward, one entry where a figure should be and instead there's a small doodle that is clearly a face. The lab technician's precision gives way, in the margins, to something warmer.

**Erotic power:** Engineering precision meeting warmth — the margins of the technical document as the real autobiography. The woman who can calculate anything discovering that the most interesting value in the dataset is one she doesn't want to minimize.

**Modular home:** `diary.innerBeat (studentId: 18, stageMin: 3)` — "lab log with warm corrections" variant (crossed-out numbers, the doodle). `diary.innerBeat (studentId: 18, stageMin: 6, flag: taliaScaleSurprise)` — "column G has a good trend" variant. `evolvedDiary (machine_goddess, activityStage: 2)` — the machine she built is herself, the margins are the real specifications. Flag: `taliaScaleSurprise`.

---

## 6. IMPLEMENTATION NOTES FOR DEVELOPERS

*(Co-authored with Agent Marcus Hale.)*

### Implementation order

1. **Add all 10 student flags** to `INIT_STUDENTS` (see §3.1). All default `false`. Add flag-setting logic at the specified trigger points. This is the prerequisite for all flag-gated sub-arc variants.

2. **Add `diary.innerBeat` pool** (from Session 1, §3.2) if not already present. This pool is the home for approximately 34 of the 68 new variants — implement it first.

3. **Add per-student diary variants in batches of 3–4 students** per commit. Run `npm run text:lint` after each batch. Each batch should cover the `diary.innerBeat` variants, `grow.reaction` variants, and `attitude` variants for those students together, so related content is authored and tested together.

4. **Add `grow.reaction` per-student variants** to the growth event skeleton (from Session 1, §3.4). The `buildVariants` pattern handles body-type × zone combinations; `studentId`-keyed variants layer on top with `weight: 4` to dominate when the right student fires the event.

5. **Expand `BLOB_PRIVATE_INTRO`** for Maya (id 8) and Lilith (id 15) from single strings to pool arrays with `isImmobile: true` + relationship tier cross-keying.

6. **Add `diary.lilith` pool** for Lilith's stage-gated chronicle variants (she likely has bespoke handling separate from the standard `diary.innerBeat`; verify in the existing diary module).

7. **Add `evolvedDiary` sub-arc echo variants** — these are the bloom moments for each student's seed arc. Author these after the early-stage variants so the echo is intentional.

### Authoring principles for sub-arc variants

- **Each student has one sub-arc, not a genre.** The variants should all feel like they're serving the same specific psychological or physical story for that student. Avoid generic corruption-tier language for `studentId`-keyed variants — the character is the selector.
- **The seed and the bloom should echo each other in language.** Brittany's Stage 5 diary variant ("command presence") should rhyme with her evolved diary at Stage 8 (the same phrase, different weight). Reneé's midnight eating at Stage 4 should appear in a different form in the Cultivator evolvedDiary.
- **Arrival characters (Mary Jane, Maya, Reneé, Lilith, Indiana Bones) need body-specific language, not psychological language.** The prose for these five should be physically dense and psychologically simple: the body doing what it does, the character at peace with it, the sensation described with full attention.
- **The knowledge-benders (Madeline, Kaylee, Nadia, Sophia) need the intelligence present in the prose.** Their variants should use their respective vocabularies — academic citations, medical references, clinical observation notes, pharmacological logs — and the reader should feel the intelligence working against itself.

### Lint discipline

Run `npm run text:lint` after every pool addition. All 19 `diary.innerBeat` student variants must live in a pool that has a `{ when: {} }` fallback. The fallback should be generic enough to work for any student but specific enough to not be meaningless. Confirm every `studentId` reference maps to an actual student id in `INIT_STUDENTS`.

### Flag wiring locations

```
brittanyUniformStrained → session.js or gainSystem.js (stage 5 crossing check)
kyliePrivateMoment      → action handlers for dinner/private session (no stream/record context)
fionaSelfPhotographed   → ArtisanGalleryModal.jsx or fieldShoot handler
destinyHeadsetMoment    → hungerInterrupt.js (check student.id === 5 and context)
tiffanySatDownAtTable   → classEvents.js or session handling (Tiffany fullness > 70% during class action)
reneePotNightEating     → corruption.js or gainSystem.js (gluttonyInstinct auto-feed trigger)
nadiaBracketsNote       → corruption.js (corruption tier 1 crossing for student 12)
daisyPermissionSlip     → session.js or classEvents.js (Daisy fullness > 80% during homeroom activity)
sophiaAnnotatedLog      → pharmacist path synthesis handler (session 5)
taliaScaleSurprise      → talia.js device build handler (lbs record exceeded)
```

### Voice reminders by student

Before writing each student's sub-arc variants, re-read their voice specification in `AUTHORING.md`. Key voice notes:
- **Brittany:** Upbeat surface, hidden processing. Her diary never says the difficult thing directly.
- **Madeline:** Academic register. Citations. Careful language that is always slightly doing too much work.
- **Kaylee:** Medical-adjacent precision. Knowing and choosing.
- **Nadia:** Clinical brackets that give way. The most literal demonstration of a mind meeting its limit.
- **Mary Jane:** Plain, warm, unhurried. Harvest vocabulary. No drama anywhere.
- **Lilith:** Chronicle, not confession. She doesn't have a corruption arc; she has a power arc.
- **Indiana Bones:** Field journal format. Measured, comparative, with a note in different pen.
- **Talia:** Technical with warm annotations. The crossed-out number tells the story the typed number doesn't.

---

*Session conducted on branch `claude/prompt-following-2vpq06`. Agents: Lila Voss, Elena Moreau, Vera Kane, Marcus Hale.*
