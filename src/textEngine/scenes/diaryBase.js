// ═══════════════════════════════════════════════════════════════
// SCENE: BASE DIARY — per-student sub-arcs for all 19 characters
//
// Prose Council audit deliverable: one small, sexy sub-arc/character
// moment for every single student in the roster, staged across weight
// ranges and corruption tiers. These entries capture the emotional
// core of transformation for each resident.
//
// Structure: registerPool("diary.<studentId>.<arcName>", variants)
// Selectors: stage, stageMin/stageMax, corruption (0/1/2), season, mood
// Each sub-arc: 3 variants minimum (discovery, fracture, release)
// ═══════════════════════════════════════════════════════════════

import { registerPool } from '../engine.js';

// ══════════════════════════════════════════════════════════════════
// BRITTANY (0) — Cheerleader — "The Uniform"
// Sub-arc: She's dropped from the squad (informal weigh-ins).
// Her gaining becomes the first thing that belongs to nobody's clipboard.
// ══════════════════════════════════════════════════════════════════

registerPool("diary.brittany.uniform", [
  // Beat 1: Discovery — the loss she doesn't quite grieve.
  { when: { studentId: 0, stageMin: 3, stageMax: 3, corruption: [0] }, weight: 4, text: [
    "Coach left my name off the performance roster this week. Scheduling conflict, he said. I ate an extra dinner and thought about it and then stopped thinking about it.",
    "Weigh-in today. Not my weight — the squad's. I sat in the back row. Nobody asked. I had a second helping at dinner and I'm not going to write about why.",
  ]},
  // Beat 2: The fracture — she admits the relief.
  { when: { studentId: 0, stageMin: 4, stageMax: 5, corruption: [1] }, weight: 4, text: [
    "I keep waiting to miss the uniform. I've tried the feeling on a few times. It fits wrong. Not the uniform — the *missing*. Something else fits better now.",
    "Tried on my old cheer shorts today. They didn't close. I sat on my bed for a while. Then I went to the dining hall and I didn't count anything.",
  ]},
  // Beat 3: Release — ownership declared.
  { when: { studentId: 0, stageMin: 5, stageMax: 6, corruption: [2] }, weight: 4, text: [
    "My body was the squad's for four years. Performance property. They kept the clipboard; I kept the muscle memory.",
    "Now I eat what I want, when I want, as much as I want, and there is nobody's score to keep. I'm keeping my own.",
    "Coach saw me on campus. Something crossed his face. I smiled. I've been practicing that smile.",
  ]},
  // Fallback
  { when: {}, text: [
    "The roster feels lighter now. So do I.",
    "Nobody's asking for splits at dawn. I'm sleeping in and waking up hungry.",
    "My body stopped auditioning for them. It started keeping score for me.",
  ]},
]);

// ══════════════════════════════════════════════════════════════════
// CASSIDY (1) — Swimmer — "The Dataset"
// Sub-arc: She starts keeping field notes on her own transformation.
// Clinical distance gradually erodes as she documents herself.
// ══════════════════════════════════════════════════════════════════

registerPool("diary.cassidy.dataset", [
  { when: { studentId: 1, stageMin: 2, stageMax: 3, corruption: [0] }, weight: 4, text: [
    "Field note, Week 3. [Subject] reports appetite increase outside structured meal windows. Hyposeason plan: stress response, elevated cortisol. Recommend monitoring.",
    "Field note, Week 5. [Subject] appetite continues elevated. Stress hypothesis weakening. Secondary hypothesis under consideration. No intervention at this time.",
  ]},
  { when: { studentId: 1, stageMin: 3, stageMax: 4, corruption: [1] }, weight: 4, text: [
    "Field note, Week 7. [Subject] — I — notes that appetite is no longer attributable to identified stressors. Notes this without distress. Notes that the noting is itself notable. Updating baseline.",
    "The brackets around [Subject] look strange today. I keep typing them and deleting them and retyping them. The data doesn't change.",
  ]},
  { when: { studentId: 1, stageMin: 4, stageMax: 6, corruption: [2] }, weight: 4, text: [
    "Week 11. I am the trial. The dosing is irregular and entirely self-administered. Efficacy: excellent. Side effects: none I'm interested in correcting.",
    "I ate two dinners tonight and wrote them both up as data and then I didn't write them up as data. I just ate them.",
    "No brackets. No [Subject]. I don't want to correct this. I am very good at my job and I am using that skill to not correct this.",
  ]},
  { when: {}, text: [
    "The field work continues. The observer continues. So does the data.",
    "Field note, miscellaneous: appetite elevated. Attribution: unresolved. Next measure: tomorrow.",
    "I keep writing it down. The brackets feel less necessary every week.",
  ]},
]);

// ══════════════════════════════════════════════════════════════════
// KYLIE (2) — Influencer — "The Unfiltered Frame"
// Sub-arc: Filming herself eating, she forgets to perform for one moment.
// The audience sees her real hunger. She doesn't re-film it.
// ══════════════════════════════════════════════════════════════════

registerPool("diary.kylie.unfiltered", [
  { when: { studentId: 2, stageMin: 4, stageMax: 4, corruption: [0] }, weight: 4, text: [
    "Shot a video today for the channel. Set up, hit record, did the whole bit — you know, the eating-aesthetic thing I do. Halfway through I just forgot the camera was there and ate like I actually eat.",
    "Uploaded the one where I forgot to perform. The one where my face just closed in on the fork and I didn't narrate my appetite. Usually I edit those out.",
  ]},
  { when: { studentId: 2, stageMin: 4, stageMax: 5, corruption: [1] }, weight: 4, text: [
    "The unfiltered video is my best engagement number. The comments are mostly about how real it looks. I watched it back and I can see the exact moment I stopped thinking about the camera.",
    "I'm not sure if I'm going to film the next one or just eat.",
  ]},
  { when: { studentId: 2, stageMin: 5, stageMax: 6, corruption: [2] }, weight: 4, text: [
    "I uploaded the one where I'm just eating. No script. No framing. Just me and a tray and an appetite nobody had to ask about.",
    "The engagement is insane. But I'm not reading the comments because I don't want to perform gratitude.",
  ]},
  { when: {}, text: [
    "No filter. Just me.",
    "Left the ring light off tonight. Ate anyway. Filmed nothing.",
    "The hunger doesn't need good lighting to be real.",
  ]},
]);

// ══════════════════════════════════════════════════════════════════
// SERENA (3) — Athlete — "The New PR"
// Sub-arc: She tracks her gaining with training-log precision.
// Lb gained per week = weekly volume. Stage = tier advancement.
// ══════════════════════════════════════════════════════════════════

registerPool("diary.serena.newpr", [
  { when: { studentId: 3, stageMin: 3, stageMax: 4, corruption: [0] }, weight: 4, text: [
    "Started a new log. Metrics: weekly volume, conversion rate, stage tier. It's helping me understand the progression. The numbers make sense.",
    "I don't have to make sense of the wanting part separately from the numbers.",
    "PR this week: +2.1 lbs in 7 days. New personal record. Logged it.",
  ]},
  { when: { studentId: 3, stageMin: 4, stageMax: 5, corruption: [1] }, weight: 4, text: [
    "Weekly volume trending up. I could attribute this to increased baseline nutrition.",
    "I'm not going to because the attribution would be a lie. The attribution would be an excuse.",
    "I'm not looking for excuses. I'm looking for better metrics.",
    "Crossed into Plump tier yesterday. Logged it. PR stands at stage gain speed of +1 tier per 11.2 weeks. Excellent trajectory.",
  ]},
  { when: { studentId: 3, stageMin: 5, stageMax: 6, corruption: [2] }, weight: 4, text: [
    "New event. No weight class. No ceiling. The spreadsheet has infinite rows and I keep filling them and the numbers keep climbing. I'm competing against myself and I'm winning every single session.",
    "This is what winning looks like. It looks like more.",
  ]},
  { when: {}, text: [
    "New event. New build. New PR to chase.",
    "Logged today's intake. Volume up. Excuses down.",
    "The scale moved. I moved with it. Personal best.",
  ]},
]);

// ══════════════════════════════════════════════════════════════════
// FIONA (4) — Artsy — "The Subject"
// Sub-arc: Before the formal Artisan Gallery, she stages one session.
// Just herself, camera timer, full plate. She doesn't perform.
// ══════════════════════════════════════════════════════════════════

registerPool("diary.fiona.subject", [
  { when: { studentId: 4, stageMin: 2, stageMax: 3, corruption: [0] }, weight: 4, text: [
    "Set up the camera today. Studio, good light, three hours. Just ate. Didn't perform. Let the timer click. Developed the prints alone at 2am.",
    "One of the frames is perfect. I pinned it above my desk without a caption. The subject is beautiful and honest and I'm not sure I've seen myself like that before.",
  ]},
  { when: { studentId: 4, stageMin: 3, stageMax: 4, corruption: [1] }, weight: 4, text: [
    "I've pinned three more prints since the first. Each session the light is different, the fullness is different, something in my face is softer.",
    "I look at them and I think: here. I was here and I was hungry and I didn't apologize for it.",
    "The camera doesn't lie. Neither do I, in these frames.",
  ]},
  { when: { studentId: 4, stageMin: 4, stageMax: 5, corruption: [2] }, weight: 4, text: [
    "The art is choosing itself now. Every appetite becomes a composition. Every weight gain a study in form. I am the medium and the artist and the subject. This feels correct.",
    "I'm going to need more plates.",
  ]},
  { when: {}, text: [
    "The subject is excellent. The work is just beginning.",
    "Pinned another print above the desk. No caption. Full plate in every frame.",
    "The light caught my fullness tonight. Honest. Unretouched.",
  ]},
]);

// ══════════════════════════════════════════════════════════════════
// DESTINY (5) — Gamer — "Achievement Unlocked"
// Sub-arc: She typed an embarrassing ideal weight into a character
// creator years ago, deleted it, and has now reached that number.
// Screenshots the scale. Sets a new target.
// ══════════════════════════════════════════════════════════════════

registerPool("diary.destiny.achievement", [
  { when: { studentId: 5, stageMin: 3, stageMax: 4, corruption: [0] }, weight: 4, text: [
    "Saw a number on the scale that I remember typing into a build calculator years ago. The number I was ashamed of. The number I deleted without telling anyone.",
    "That number is real now. That number is me. I don't know if I should have told someone.",
  ]},
  { when: { studentId: 5, stageMin: 4, stageMax: 5, corruption: [1] }, weight: 4, text: [
    "Hit the target weight this morning. Took a screenshot. Named it 'Achievement Unlocked' and didn't delete it. Set a new target. The new target is higher.",
    "This is a build. This is a build I'm running. And I'm very good at running builds.",
  ]},
  { when: { studentId: 5, stageMin: 5, stageMax: 6, corruption: [2] }, weight: 4, text: [
    "New build selected. Old ashamed version of me would not recognize the specs. Current version: very interested in what comes next in the progression.",
    "Save point: achieved. Next tier unlocked. Continue.",
  ]},
  { when: {}, text: [
    "New high score.",
    "Screenshot the scale. New target set. Tier climbing.",
    "Old ashamed build deleted. Current specs: running hot.",
  ]},
]);

// ══════════════════════════════════════════════════════════════════
// TIFFANY (6) — Sorority — "The Uncounted Night"
// Sub-arc: She's always tracking everyone else's plate.
// One night she stops keeping count for herself.
// ══════════════════════════════════════════════════════════════════

registerPool("diary.tiffany.uncounted", [
  { when: { studentId: 6, stageMin: 3, stageMax: 4, corruption: [0] }, weight: 4, text: [
    "Hosted an event tonight. Twenty-three residents, three courses, wine for the ones who wanted it.",
    "I was the hostess, the timekeeper, the plate-counter. I made sure everyone had enough because that's what I do.",
    "Halfway through dessert I realized I hadn't eaten. I hadn't even set a place for myself.",
  ]},
  { when: { studentId: 6, stageMin: 4, stageMax: 5, corruption: [1] }, weight: 4, text: [
    "The next event, I put a plate down for me. I didn't count it. I just ate when the moment felt right. The dress felt different walking home. Tighter. Different. Not bad.",
    "I'm not sure when I stopped keeping count for myself. I'm just noticing it stopped.",
  ]},
  { when: { studentId: 6, stageMin: 5, stageMax: 6, corruption: [2] }, weight: 4, text: [
    "Hosted again last night. No spreadsheet, no count. I fed the room and I fed myself and the dress was tight and I didn't bother to change. Felt excellent walking home.",
    "The uncomplicated feeling is becoming my favorite.",
  ]},
  { when: {}, text: [
    "More is more, babe.",
    "Set out another plate for me. Didn't log it. Felt like winning.",
    "The room ate and I ate and nobody kept count this time.",
  ]},
]);

// ══════════════════════════════════════════════════════════════════
// PRIYA (7) — Overachiever — "The Spreadsheet"
// Sub-arc: She built the spreadsheet to horrify herself.
// She's been updating actuals every week. She hasn't corrected anything.
// ══════════════════════════════════════════════════════════════════

registerPool("diary.priya.spreadsheet", [
  { when: { studentId: 7, stageMin: 2, stageMax: 3, corruption: [0] }, weight: 4, text: [
    "Built a spreadsheet. Rows 1-30 for weeks, columns for starting weight, weekly gain, cumulative, stage, projected end. Made it to show myself the trajectory and correct it. To see the problem clearly.",
    "I'm updating the actuals every week. The projected end weight keeps going up.",
  ]},
  { when: { studentId: 7, stageMin: 3, stageMax: 4, corruption: [1] }, weight: 4, text: [
    "Week 7: projected end weight 280. Week 12: projected end weight 295. Week 16: projected end weight 310.",
    "I keep updating the projection because the trajectory keeps changing. Or maybe because I keep changing.",
    "I haven't corrected anything. I'm just updating the projections.",
  ]},
  { when: { studentId: 7, stageMin: 4, stageMax: 6, corruption: [2] }, weight: 4, text: [
    "The spreadsheet is perfect. The data is perfect. The only thing that's not perfect is the pretense that I'm going to correct any of it.",
    "I open it every morning and I smile at the numbers and I add to them.",
    "The projection updates itself. So do I.",
  ]},
  { when: {}, text: [
    "KPIs: excellent. Overperformance: sustained.",
    "Updated actuals. Projection climbed again. Smiled at the graph.",
    "Still no corrective action. The data looks better every week.",
  ]},
]);

// ══════════════════════════════════════════════════════════════════
// MAYA (8) — Quiet — "The Right Size"
// Sub-arc: She sits in you's office. The chair fits her differently.
// She's become the comfortable position. She stays two minutes after.
// ══════════════════════════════════════════════════════════════════

registerPool("diary.maya.chair", [
  { when: { studentId: 8, stageMin: 4, stageMax: 5, corruption: [0] }, weight: 4, text: [
    "Sat in the office today for longer than I needed to. The chair was different. Or I was. The fit was exact. No adjusting. Just right.",
    "Stayed two minutes after the conversation ended. Just sat there in the right-fitting chair. Went home.",
  ]},
  { when: { studentId: 8, stageMin: 5, stageMax: 6, corruption: [1] }, weight: 4, text: [
    "The chair knows me now. That's the only way to describe it. It holds me. I hold it. It's mutual.",
    "Stayed longer this time. Not words. Just the sitting.",
  ]},
  { when: { studentId: 8, stageMin: 5, stageMax: 6, corruption: [2] }, weight: 4, text: [
    "I love the chair. I should say that plainly. I eat and I sit and the chair receives me and I'm exactly the size and shape the chair was waiting for. This is what home feels like.",
  ]},
  { when: {}, text: [
    "Home.",
    "Sat in the chair longer than I needed. The fit held.",
    "Left two minutes late. Went home full.",
  ]},
]);

// ══════════════════════════════════════════════════════════════════
// CHLOÉ (9) — Transfer (French) — "L'Américaine"
// Sub-arc: Letters home to Paris track the journey from horror at
// portions to genuine appetite to the request: send the dress with extra fabric.
// ══════════════════════════════════════════════════════════════════

registerPool("diary.chloe.americaine", [
  { when: { studentId: 9, stageMin: 2, stageMax: 3, corruption: [0] }, weight: 4, text: [
    "À Maman: les portions ici are obscène. A scientific obscenity. A form of cultural aggression. I observed this from a great distance. I continue observing.",
    "À Maman: the dining hall has surrendered to me. Or I am surrendering to it. Still observing which is which.",
  ]},
  { when: { studentId: 9, stageMin: 3, stageMax: 4, corruption: [1] }, weight: 4, text: [
    "À Maman: I have found a crêperie that does not exist in Paris. It exists only here, in this abundance. I have been three times this week. I am beginning to prefer the abundance to the restraint.",
    "À Maman: a strange confession, but: I am happy here. The smallness I brought from Paris is becoming insufficient. I am outgrowing it like an old dress.",
  ]},
  { when: { studentId: 9, stageMin: 4, stageMax: 6, corruption: [2] }, weight: 4, text: [
    "À Maman: I need you to send my blue dress. No, the other one. The one with the extra fabric. The one you said I would never need. I need it now.",
    "À Maman: l'Amérique m'a changée. Not damaged. Changed. I am larger and this is not a shame. This is an accomplishment.",
  ]},
  { when: {}, text: [
    "C'est obscène. C'est merveilleux.",
    "À Maman: another dinner I did not refuse. The dress is getting tight.",
    "À Maman: I am learning appetite. It is a generous teacher.",
  ]},
]);

// ══════════════════════════════════════════════════════════════════
// RENEÉ (10) — Culinary — "The Recipe"
// Sub-arc: She opens a new category in her culinary journal: self.
// The entry reads like a recipe notation. Perfect proofing.
// ══════════════════════════════════════════════════════════════════

registerPool("diary.renee.recipe", [
  { when: { studentId: 10, stageMin: 3, stageMax: 4, corruption: [0] }, weight: 4, text: [
    "New category in the journal today: self. The entry: subject is soft, warming, resting properly. Temperature stable. This is observation.",
    "Fed myself the way I feed everyone else. Excellent yield.",
  ]},
  { when: { studentId: 10, stageMin: 4, stageMax: 5, corruption: [1] }, weight: 4, text: [
    "The subject is round. Resting. When pressed, it holds the impression, then rises back, slow and certain — the way good dough does when it has had time, fat, warmth.",
    "Flavor profile: butter, yeast, contentment, the specific satisfaction of a body that has been fed well.",
  ]},
  { when: { studentId: 10, stageMin: 5, stageMax: 6, corruption: [2] }, weight: 4, text: [
    "Subject is perfectly proofed. Fat content: increasing. This is correct. This is the recipe working. Yield: abundant. No corrections needed. The journal entry is complete.",
  ]},
  { when: {}, text: [
    "The recipe is ready. The kitchen is warm.",
    "Fed myself again tonight. Yield: excellent. Resting time: generous.",
    "The journal entry smells like butter. So do I.",
  ]},
]);

// ══════════════════════════════════════════════════════════════════
// KAYLEE (11) — Nursing — "The Patient"
// Sub-arc: She runs a clinical self-assessment.
// Clinical distance gradually dissolves as language becomes intimate.
// ══════════════════════════════════════════════════════════════════

registerPool("diary.kaylee.patient", [
  { when: { studentId: 11, stageMin: 3, stageMax: 4, corruption: [0] }, weight: 4, text: [
    "Self-assessment today. Soft layer: increasing. Warmth distribution: symmetric. Palpation results: compliance noted. The examination is thorough. This is good practice.",
    "I documented everything in proper notation. Filed under my own name.",
  ]},
  { when: { studentId: 11, stageMin: 4, stageMax: 5, corruption: [1] }, weight: 4, text: [
    "The assessment is becoming a form of tender observation. Soft becomes softer. Warmth becomes welcome. The old vocabulary no longer contains what I'm feeling.",
    "I wrote: 'subject demonstrates increased compliance with additional intake. Subject is... not correcting this.' I left the note unfinished.",
  ]},
  { when: { studentId: 11, stageMin: 5, stageMax: 6, corruption: [2] }, weight: 4, text: [
    "No assessment today. Just: I am soft and warm and full and this is good nursing care for myself. This is the most aggressive self-care I've ever practiced and I approve completely.",
    "The chart is closed. I am the cure now.",
  ]},
  { when: {}, text: [
    "Vital signs: all excellent.",
    "Self-assessment note: soft, compliant, well-fed. Chart closed for the night.",
    "Palpation: warm. Disposition: satisfied.",
  ]},
]);

// ══════════════════════════════════════════════════════════════════
// NADIA (12) — Psych — "The Case Study"
// Sub-arc: She's assembled a literature review. She's clearly in the studies.
// She names this out loud to you, mid-bite.
// ══════════════════════════════════════════════════════════════════

registerPool("diary.nadia.casestudy", [
  { when: { studentId: 12, stageMin: 2, stageMax: 3, corruption: [0] }, weight: 4, text: [
    "Read the hall appetite logs and weight-gain dynamics today. Assembled a review. Noted that I appear in several observation entries. This is professional interest.",
    "The case studies are thorough. The mechanism is clear. I am clear about the mechanism.",
  ]},
  { when: { studentId: 12, stageMin: 3, stageMax: 4, corruption: [1] }, weight: 4, text: [
    "I know what's happening. I've read the literature. I know the outcome of every choice I'm making. I'm making the choices anyway. The meta-awareness doesn't prevent anything, it just clarifies intent.",
    "Told you this out loud. Mid-bite. Then another bite.",
  ]},
  { when: { studentId: 12, stageMin: 4, stageMax: 6, corruption: [2] }, weight: 4, text: [
    "The hall log and I merged. I am writing myself into the case study in real time. The observer is the subject is the analyst. The observation is inseparable from the happening.",
    "This is the richest psychological material I've ever inhabited.",
  ]},
  { when: {}, text: [
    "The dynamic is named. So am I.",
    "Re-read the literature. I'm in every footnote I care about.",
    "Another bite while I think it through. The theory holds.",
  ]},
]);

// ══════════════════════════════════════════════════════════════════
// DAISY (13) — ECED — "The Softening"
// Sub-arc: The children use her as a pillow. She feeds them; they press
// against her warmth. She thinks: this is what a body is for.
// ══════════════════════════════════════════════════════════════════

registerPool("diary.daisy.softening", [
  { when: { studentId: 13, stageMin: 3, stageMax: 4, corruption: [0] }, weight: 4, text: [
    "The children reached for me today the way they reach for their own mothers. With complete ease. My belly was where they wanted to be during read-aloud.",
    "I fed them snacks and they pressed against my warmth and stayed. This is what I'm becoming.",
  ]},
  { when: { studentId: 13, stageMin: 4, stageMax: 5, corruption: [1] }, weight: 4, text: [
    "Sofia picked my lap over the floor today without thinking. Just climbed up like I was made for this. Like my body was made to receive her. Maybe it is.",
    "I fed them and I fed myself and the children didn't notice where one ended and the other began. Bless it, I think. Bless all of it.",
  ]},
  { when: { studentId: 13, stageMin: 5, stageMax: 6, corruption: [2] }, weight: 4, text: [
    "I am soft and the children are comfortable. This is the most purposeful I've ever felt. My body is a home for the people I love. My body is for warmth and presence and feeding.",
    "I will feed them forever. I will be exactly this soft forever.",
  ]},
  { when: {}, text: [
    "Soft is strong. Warm is everything.",
    "A child fell asleep against my belly during story time. I didn't move.",
    "Fed them snacks, fed myself, let the warmth stay.",
  ]},
]);

// ══════════════════════════════════════════════════════════════════
// MARY JANE (14) — Farm Girl — "Ripe"
// Sub-arc: She catches her reflection in a car window.
// One word, exactly right, then back to eating.
// ══════════════════════════════════════════════════════════════════

registerPool("diary.maryjane.ripe", [
  { when: { studentId: 14, stageMin: 4, stageMax: 5, corruption: [0] }, weight: 4, text: [
    "Saw myself in the car window walking back from the dining hall. Stopped. Looked at the reflection the way I look at the garden in late summer.",
    "Used one word and kept walking: Ripe.",
  ]},
  { when: { studentId: 14, stageMin: 5, stageMax: 6, corruption: [1] }, weight: 4, text: [
    "The word keeps coming back: ripe. Like the peach at the end of summer. Like the garden when it's been good to you. Like all the things that are ready and full and at their peak.",
    "I'm at my peak. The knowing sits right.",
  ]},
  { when: { studentId: 14, stageMin: 5, stageMax: 6, corruption: [2] }, weight: 4, text: [
    "Everything ripe falls from the tree. Everything ripe feeds what comes next. I'm ripe and full and absolutely ready to fall into whatever's next.",
  ]},
  { when: {}, text: [
    "Harvest time.",
    "Walked past the car window slow. One word: ripe.",
    "Ate my fill from the dining hall. Felt like late summer.",
  ]},
]);

// ══════════════════════════════════════════════════════════════════
// SOPHIA (16) — Pharmacy Grad — "The Trial"
// Sub-arc: Field notes on herself. Brackets disappear. She removes the distance.
// ══════════════════════════════════════════════════════════════════

registerPool("diary.sophia.trial", [
  { when: { studentId: 16, stageMin: 2, stageMax: 3, corruption: [0] }, weight: 4, text: [
    "Field note, Week 3. [Subject] reports appetite increase outside structured meal windows. Hyposeason plan: stress response, elevated cortisol. Recommend monitoring.",
    "Field note, Week 5. [Subject] appetite continues elevated. Stress hypothesis weakening. Secondary hypothesis under consideration. No intervention at this time.",
  ]},
  { when: { studentId: 16, stageMin: 3, stageMax: 4, corruption: [1] }, weight: 4, text: [
    "Field note, Week 7. [Subject] — I — notes that appetite is no longer attributable to identified stressors. Notes this without distress. Notes that the noting is itself notable. Updating baseline.",
    "The brackets around [Subject] look strange today. I keep typing them and deleting them and retyping them. The data doesn't change.",
  ]},
  { when: { studentId: 16, stageMin: 4, stageMax: 6, corruption: [2] }, weight: 4, text: [
    "Week 11. I am the trial. The dosing is irregular and entirely self-administered. Efficacy: excellent. Side effects: none I'm interested in correcting.",
    "I ate two dinners tonight and wrote them both up as data and then I didn't write them up as data. I just ate them.",
    "No brackets. No [Subject]. I don't want to correct this. I am very good at my job and I am using that skill to not correct this.",
  ]},
  { when: {}, text: [
    "The field work continues. So do I.",
    "Week note: appetite outside meal windows. Intervention: declined.",
    "The brackets around [Subject] are getting harder to type.",
  ]},
]);

// ══════════════════════════════════════════════════════════════════
// TALIA (18) — Inventor — "The Justification"
// Sub-arc: Six pages of technical research justifying eating more.
// All technically accurate. She also knows the reason is hunger and pleasure.
// ══════════════════════════════════════════════════════════════════

registerPool("diary.talia.justification", [
  { when: { studentId: 18, custom: false, stageMin: 2, stageMax: 3, corruption: [0] }, weight: 4, text: [
    "Researched metabolic baselines today. Found papers on how increased body mass affects lab output. Wrote three pages. Technically sound. Entirely true. Also entirely a rationalization.",
    "I know why I'm eating more. The papers are real anyway.",
  ]},
  { when: { studentId: 18, custom: false, stageMin: 3, stageMax: 4, corruption: [1] }, weight: 4, text: [
    "Expanded the research. Found more papers. Found papers I wrote.",
    "Found papers I wrote that prove I was building toward this from the beginning. The arguments are excellent. The conclusion was already decided.",
    "The justification is airtight. The hunger is real.",
  ]},
  { when: { studentId: 18, custom: false, stageMin: 4, stageMax: 6, corruption: [2] }, weight: 4, text: [
    "The lab notes are full now. Conductivity: improved. Field resonance: optimal at this current mass.",
    "Metabolic baseline: perfectly calibrated for precision work. All true. All excellent. All necessary.",
    "I'm going to keep building the machines. And the machines are going to keep working better when I'm this big.",
    "And I'm going to keep being this big. The math is perfect.",
  ]},
  { when: {}, text: [
    "The research justifies itself. So do I.",
    "Added two pages to the lab notes. Metabolic baseline: elevated. Conclusion: favorable.",
    "The papers are airtight. The hunger is louder anyway.",
  ]},
]);

// ══════════════════════════════════════════════════════════════════
// LILITH (15) — Predator (Hidden) — "The Chair"
// Sub-arc: She takes a chair at the feast. It accommodates her — barely.
// The fit is precise. She feels it. She adds more plates.
// ══════════════════════════════════════════════════════════════════

registerPool("diary.lilith.chair", [
  { when: { studentId: 15, stageMin: 4, stageMax: 5 }, weight: 4, text: [
    "Took a chair at the feast. Sat down. The fit was perfect and precise and total. The wood said something when I made my presence clear. I picked up a plate.",
  ]},
  { when: { studentId: 15, stageMin: 5, stageMax: 7 }, weight: 4, text: [
    "The chair knows who sits in it now. The frame protests under the mass. The sound is music. I smile at the chair. Not at the food. At the fact of my arrival.",
    "I added two more plates.",
  ]},
  { when: { studentId: 15, stageMin: 7, stageMax: 10 }, weight: 4, text: [
    "The chair is dying under me in the most satisfying way. The wood groans. The fit is absolute. This is what dominance feels like — the room rearranging itself around your mass.",
    "Soon.",
  ]},
  { when: { studentId: 15, stageMin: 11 }, weight: 4, text: [
    "The chair surrendered long ago. I am the feast now — vast, still, attended. Plates find me without my asking.",
    "The fit is total. The room orbits. I eat because the gravity demands it.",
  ]},
  { when: {}, text: [
    "The feast awaits.",
    "Took my chair. The wood learned my weight. I reached for another plate.",
    "The room arranged itself around me. I ate like arrival.",
  ]},
]);

// ══════════════════════════════════════════════════════════════════
// INDIANA BONES (17) — Explorer (Hidden) — "The Map"
// Sub-arc: She measures herself with expedition precision.
// Field notebook notation. Site expanding. Ground soft. Very promising.
// ══════════════════════════════════════════════════════════════════

registerPool("diary.indiana.fieldmap", [
  { when: { studentId: 17, stageMin: 2, stageMax: 3 }, weight: 4, text: [
    "*EXPEDITION LOG — Site Designation: [personal]*",
    "Week three. Initial survey complete. Site perimeter: stable. Ground topography: warming. No expedition hazards detected. Recommend extended field stay.",
  ]},
  { when: { studentId: 17, stageMin: 3, stageMax: 5 }, weight: 4, text: [
    "*EXPEDITION LOG — Site Expansion Phase*",
    "Belly circumference up four inches since survey. Hips: corresponding expansion. Thighs: notable softening — ground cover thick, excellent insulation properties.",
    "General topography: rounder, warmer, increasingly promising. Surface texture: surprisingly pleasant.",
    "I have dispatched no reports to housing because this does not fit standard inspection categories.",
  ]},
  { when: { studentId: 17, stageMin: 5, stageMax: 10 }, weight: 4, text: [
    "*EXPEDITION LOG — Final Phase*",
    "Site is expanding under active conditions. Provisioning continues. This site is very promising.",
    "I have extended my field stay indefinitely. I am not finished looking.",
    "Additional measurements required. Comprehensive survey in progress. Additional surveys: ongoing.",
  ]},
  { when: {}, text: [
    "Expedition status: very promising.",
    "*FIELD NOTE:* perimeter expanding. Ground soft. Provisioning adequate.",
    "Survey ongoing. No return date set.",
  ]},
]);
