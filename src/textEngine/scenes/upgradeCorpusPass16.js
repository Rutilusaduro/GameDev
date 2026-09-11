// The Squad — Lead: A2 Psych | Support: A1 Mobile, A6 Slender, A5 Editor
// Pass 16 — leftover hunger-interrupt, gossip, confront, session, dream, ritual, class.
import { registerModuleVariants } from '../engine.js';

// ── leftover hunger-interrupt person IDs ──────────────────────
registerModuleVariants('scene.hungerInterrupt.personal', [
  { when: { studentId: 0 }, weight: 7, text: [
    'Practice shorts, ponytail listing. Brittany looks like she skipped a set for this.',
  ] },
  { when: { studentId: 1 }, weight: 7, text: [
    'Notebook shield, glasses crooked. Madeline came from stacks that could not feed her.',
  ] },
  { when: { studentId: 2 }, weight: 7, text: [
    'Ring light off. Kylie still finds the hallway angle. Hunger is the only filter.',
  ] },
  { when: { studentId: 3 }, weight: 7, text: [
    'Compression gear, hands flexing. Serena ran here. Appetite won the heat.',
  ] },
  { when: { studentId: 4 }, weight: 7, text: [
    'Paint under a nail. Fiona looks like a sketch got interrupted by her stomach.',
  ] },
  { when: { studentId: 6 }, weight: 7, text: [
    'Tiffany\'s blowout is listing. Chapter smile trying to host a craving.',
  ] },
  { when: { studentId: 7 }, weight: 7, text: [
    'Planner shut. Priya scheduled this hunger and it still arrived early.',
  ] },
  { when: { studentId: 8 }, weight: 7, text: [
    'Maya in the doorway. Sweater big. Appetite not.',
  ] },
  { when: { studentId: 9 }, weight: 7, text: [
    'Chloé\'s badge is crooked. American portions finally found her at the door.',
  ] },
  { when: { studentId: 11 }, weight: 7, text: [
    'Kaylee still in scrubs. Caregiver looking like she needs a plate.',
  ] },
  { when: { studentId: 12 }, weight: 7, text: [
    'Nadia watches you watch her. The case study is her own stomach.',
  ] },
  { when: { studentId: 13 }, weight: 7, text: [
    'Cookie crumbs on Daisy\'s cardigan. She brought treats and ate the evidence.',
  ] },
  { when: { studentId: 14 }, weight: 7, text: [
    'Flannel untucked. Mary Jane looks harvest-hungry and a little shy about it.',
  ] },
  { when: { studentId: 15 }, weight: 7, text: [
    'Lilith still. Hungry. The doorway is a perch.',
  ] },
  { when: { studentId: 17 }, weight: 7, text: [
    'Indiana dusty at the threshold. Trail mix gone. The office is the cache.',
  ] },
  { when: { studentId: 18 }, weight: 7, text: [
    'Talia\'s schematic is rolled shut. The experiment walked here on its own legs.',
  ] },
]);

registerModuleVariants('scene.hungerInterrupt.behavior', [
  { when: { studentId: 0 }, weight: 6, text: [
    'Brittany paces like a timeout she called on herself.',
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    'Maya does not speak yet. Her eyes do the asking.',
  ] },
  { when: { studentId: 9 }, weight: 6, text: [
    'Chloé hugs herself once, then drops it. Hunger came first. Words can follow.',
  ] },
  { when: { studentId: 12 }, weight: 6, text: [
    'Nadia tracks your face more than the snack drawer. Then the drawer wins.',
  ] },
  { when: { studentId: 15 }, weight: 6, text: [
    'Lilith does not fidget. She waits. The wait is the ask.',
  ] },
  { when: { studentId: 17 }, weight: 6, text: [
    'Indiana grins like she found the door by accident. She did not.',
  ] },
]);

registerModuleVariants('scene.hungerInterrupt.request', [
  { when: { studentId: 0 }, weight: 6, text: [
    `"Coach would hate this. Feed me anyway."`,
  ] },
  { when: { studentId: 1 }, weight: 6, text: [
    `"Hypothesis: food. From you. Now."`,
  ] },
  { when: { studentId: 2 }, weight: 6, text: [
    `"This could be content. Or dinner. I'm picking dinner."`,
  ] },
  { when: { studentId: 3 }, weight: 6, text: [
    `"New event. Feed me. No weight class."`,
  ] },
  { when: { studentId: 7 }, weight: 6, text: [
    `"I blocked time for this. The slot is hunger."`,
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    `"Please." Maya leaves the rest in the doorway.`,
  ] },
  { when: { studentId: 11 }, weight: 6, text: [
    `"I take care of everyone. Today I need you to."`,
  ] },
  { when: { studentId: 14 }, weight: 6, text: [
    `"I came in from the field hungry. You got anything warm?"`,
  ] },
  { when: { studentId: 15 }, weight: 6, text: [
    `"Feed me." Lilith does not make it a request twice.`,
  ] },
  { when: { studentId: 18 }, weight: 6, text: [
    `"Intake window is now. I already logged the visit."`,
  ] },
]);

registerModuleVariants('scene.hungerInterrupt.tone', [
  { when: { studentId: 8 }, weight: 5, text: [
    'Maya waits. The silence is the whole ask.',
  ] },
  { when: { studentId: 15 }, weight: 5, text: [
    'Lilith watches your mouth. Then your hands.',
  ] },
]);

// ── leftover gossip ───────────────────────────────────────────
registerModuleVariants('gossip.react.line', [
  { when: { studentId: 0, memType: 'stageUp' }, weight: 6, text: [
    'Brittany clocks the new mass like a rival roster. Then she looks at her own middle.',
  ] },
  { when: { studentId: 2, memType: 'scaleBreak' }, weight: 6, text: [
    'Kylie files the number as content. Then she checks whether she could beat it.',
  ] },
  { when: { studentId: 5, memType: 'stageUp' }, weight: 6, text: [
    'Destiny shrugs like a patch note. Then she stares a second longer.',
  ] },
  { when: { studentId: 8, memType: 'stageUp' }, weight: 6, text: [
    'Maya looks once. Keeps it. Does not gossip it out loud.',
  ] },
  { when: { studentId: 12, memType: 'scaleBreak' }, weight: 6, text: [
    'Nadia names the dynamic in her head. Envy is data. She files it.',
  ] },
]);
registerModuleVariants('gossip.murmur', [
  { when: { studentId: 6 }, weight: 5, text: [
    'Tiffany hosts the looking like a mixer. Everyone is tracking seconds.',
  ] },
  { when: { studentId: 9 }, weight: 5, text: [
    'Chloé watches American girls watch each other eat. Field notes, unofficial.',
  ] },
]);

// ── leftover confront ─────────────────────────────────────────
registerModuleVariants('confront.open', [
  { when: { studentId: 0 }, weight: 6, text: [
    `Brittany plants herself like a captain calling a timeout. "We're talking."`,
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    `Maya stops you with a look. Then: "No." The rest follows.`,
  ] },
  { when: { studentId: 1 }, weight: 6, text: [
    `Madeline closes the notebook. "I have notes. You should hear them."`,
  ] },
  { when: { studentId: 5 }, weight: 6, text: [
    `Destiny pulls one headphone off. "Pause the run. We need a talk."`,
  ] },
  { when: { studentId: 15 }, weight: 6, text: [
    `Lilith is already in the way. "Now."`,
  ] },
]);
registerModuleVariants('confront.grievance', [
  { when: { studentId: 0, grievanceType: 'betrayed' }, weight: 6, text: [
    `"I said I was full. You kept scoring anyway. I don't get benched like that."`,
  ] },
  { when: { studentId: 8, grievanceType: 'exposed' }, weight: 6, text: [
    `"You made it public. I didn't." Maya's voice stays small. The line does not.`,
  ] },
  { when: { studentId: 2, grievanceType: 'exposed' }, weight: 6, text: [
    `"You posted me before I posted me. That's my job."`,
  ] },
  { when: { studentId: 16, grievanceType: 'creeped' }, weight: 6, text: [
    `"You keep looking like I'm a result. I'm a person. Stop measuring."`,
  ] },
]);
registerModuleVariants('confront.demand', [
  { when: { studentId: 7 }, weight: 6, text: [
    `"Revise the plan. Or I'm closing this file."`,
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    `"Different. Or I'm gone."`,
  ] },
  { when: { studentId: 3 }, weight: 6, text: [
    `"Change the play. Or I'm off the field."`,
  ] },
]);
registerModuleVariants('confront.memoryCallback', [
  { when: { studentId: 1, memType: 'forced' }, weight: 5, text: [
    `"I logged the time you kept going. I still have the date."`,
  ] },
  { when: { studentId: 14, memType: 'feast' }, weight: 5, text: [
    `"That spread you laid out without asking. I remember the table."`,
  ] },
]);

// ── leftover session selectors ────────────────────────────────
registerModuleVariants('session.moodTone', [
  { when: { studentId: 0, mood: ['excited', 'happy'] }, weight: 5, text: [
    'Brittany eats like the meal is a win she can taste.',
  ] },
  { when: { studentId: 5, mood: ['tired'] }, weight: 5, text: [
    'Destiny yawns, then chews. Hunger outlasts the all-nighter.',
  ] },
  { when: { studentId: 8, mood: ['content', 'warm'] }, weight: 5, text: [
    'Maya eats quiet and certain. The chair already knows her.',
  ] },
  { when: { studentId: 7, mood: ['stressed'] }, weight: 5, text: [
    'Priya eats the week down to a manageable size.',
  ] },
]);
registerModuleVariants('session.seasonNote', [
  { when: { studentId: 14, season: ['fall'] }, weight: 5, text: [
    'Mary Jane leans into fall food like harvest finally walked indoors.',
  ] },
  { when: { studentId: 9, season: ['winter'] }, weight: 5, text: [
    'Chloé treats the warm kitchen like the only honest American climate.',
  ] },
  { when: { studentId: 3, season: ['summer'] }, weight: 5, text: [
    'Serena eats through the heat like a second practice.',
  ] },
]);
registerModuleVariants('session.relWarmth', [
  { when: { studentId: 8, relationship: [3] }, weight: 5, text: [
    'Maya lets you keep serving. Devotion, no speech required.',
  ] },
  { when: { studentId: 10, relationship: [3] }, weight: 5, text: [
    'Reneé cooks for you and eats for both of you. The kitchen knows.',
  ] },
  { when: { studentId: 0, relationship: [3] }, weight: 5, text: [
    'Brittany checks your face between bites like a scoreboard she likes.',
  ] },
]);
registerModuleVariants('session.campusNote', [
  { when: { studentId: 6, campusFattening: true }, weight: 5, text: [
    'Tiffany eats like campus already RSVP\'d yes to extra portions.',
  ] },
]);

// ── leftover class campus scenes ──────────────────────────────
registerModuleVariants('campusEvent.scene.class_snack_break', [
  { when: { studentId: 13 }, weight: 7, text: [
    'You open a tin. Daisy looks like policy just got delicious.',
  ] },
  { when: { studentId: 10 }, weight: 7, text: [
    'Unscheduled snacks. Reneé rates them before the lecture resumes.',
  ] },
]);
registerModuleVariants('campusEvent.scene.class_group_project', [
  { when: { studentId: 7 }, weight: 7, text: [
    'Priya assigns roles. Taste-testing becomes the only KPI that matters.',
  ] },
  { when: { studentId: 1 }, weight: 7, text: [
    'Madeline writes the meal plan like a paper. Then she eats the sources.',
  ] },
]);
registerModuleVariants('campusEvent.scene.class_birthday', [
  { when: { studentId: 6 }, weight: 7, text: [
    'Tiffany hosts the cake like a chapter event. Frosting finds everyone.',
  ] },
  { when: { studentId: 2 }, weight: 7, text: [
    'Kylie films the first slice. Then she eats the second on camera.',
  ] },
]);
registerModuleVariants('campusEvent.scene.class_slump', [
  { when: { studentId: 5 }, weight: 7, text: [
    '3 PM. Destiny is already horizontal-adjacent. Sugar is the patch.',
  ] },
  { when: { studentId: 16 }, weight: 7, text: [
    'Sophia stares through the slide. A pastry would be a protocol she accepts.',
  ] },
]);
registerModuleVariants('campusEvent.scene.class_potluck', [
  { when: { studentId: 14 }, weight: 7, text: [
    'Mary Jane\'s dish arrives like harvest. The room rearranges around it.',
  ] },
  { when: { studentId: 10 }, weight: 7, text: [
    'Reneé\'s container is already empty. She is tasting everyone else\'s next.',
  ] },
]);
registerModuleVariants('campusEvent.scene.class_extended', [
  { when: { studentId: 1 }, weight: 7, text: [
    'Two hours in. Madeline is still taking notes. Her stomach starts a second notebook.',
  ] },
  { when: { studentId: 7 }, weight: 7, text: [
    'Priya has not checked the clock. Hunger files a late addendum.',
  ] },
]);
registerModuleVariants('campusEvent.scene.stage_early', [
  { when: { studentId: 16, stageMax: 4 }, weight: 6, text: [
    'Sophia sits like the number is still theoretical. The chair already disagrees.',
  ] },
]);
registerModuleVariants('campusEvent.scene.stage_heavy', [
  { when: { studentId: 0, stageMin: 6 }, weight: 6, text: [
    'Brittany takes two seats\' worth of space and calls it a good season.',
  ] },
]);

// ── leftover dream / ritual ───────────────────────────────────
registerModuleVariants('dream.open', [
  { when: { studentId: 5 }, weight: 5, text: [
    'Destiny dreams a queue that never ends. Every plate is a loot drop.',
  ] },
  { when: { studentId: 8 }, weight: 5, text: [
    'Maya dreams warmth without speech. The table keeps arriving.',
  ] },
]);
registerModuleVariants('dream.endless_buffet', [
  { when: { studentId: 10 }, weight: 5, text: [
    'Reneé walks a buffet that restocks as she tastes. No ticket. No close.',
  ] },
]);
registerModuleVariants('dream.feast_hall', [
  { when: { studentId: 6 }, weight: 5, text: [
    'Tiffany hosts a hall that never stops seating. She is the guest of honor too.',
  ] },
]);
registerModuleVariants('dream.mirror_feast', [
  { when: { studentId: 2 }, weight: 5, text: [
    'Kylie eats with her reflection. Both of them look like content.',
  ] },
]);
registerModuleVariants('dream.wake', [
  { when: { studentId: 1 }, weight: 5, text: [
    'Madeline wakes still tasting the dream. She writes it down. Then she wants breakfast.',
  ] },
]);
registerModuleVariants('ritual.communion_snack', [
  { when: { studentId: 8 }, weight: 5, text: [
    'Maya takes the shared bite like a vow she will not say aloud.',
  ] },
]);
registerModuleVariants('ritual.class_banquet', [
  { when: { studentId: 13 }, weight: 5, text: [
    'Daisy blesses the class table and then empties her own plate first.',
  ] },
]);
registerModuleVariants('ritual.sacred_gluttony', [
  { when: { studentId: 15 }, weight: 5, text: [
    'Lilith treats the rite like a hunt that ends in softness.',
  ] },
]);
registerModuleVariants('ritual.generic', [
  { when: { studentId: 4 }, weight: 5, text: [
    'Fiona moves through the ceremony like a composition she is still painting.',
  ] },
]);

// ── leftover encounter crumbs ─────────────────────────────────
registerModuleVariants('enc.flush', [
  { when: { studentId: 2 }, weight: 5, text: [
    'Kylie pinks and films nothing. The heat is the clip.',
  ] },
  { when: { studentId: 8 }, weight: 5, text: [
    'Maya\'s ears go warm. She does not hide it.',
  ] },
]);
registerModuleVariants('enc.stillHungry', [
  { when: { studentId: 5 }, weight: 5, text: [
    `"Still hungry," Destiny says. "Queue's open."`,
  ] },
  { when: { studentId: 0 }, weight: 5, text: [
    `"I can go again," Brittany says. "Put me in."`,
  ] },
  { when: { studentId: 15 }, weight: 5, text: [
    `"More." Lilith does not decorate it.`,
  ] },
]);
registerModuleVariants('enc.bodyAside', [
  { when: { studentId: 8, stageMin: 5 }, weight: 5, text: [
    'Maya\'s middle arrives a beat before her words.',
  ] },
  { when: { studentId: 14, stageMin: 5 }, weight: 5, text: [
    'Mary Jane\'s hips announce harvest before she does.',
  ] },
]);

// ── leftover talk.suggest parents ─────────────────────────────
registerModuleVariants('talk.suggest_indulgence.b00', [
  { when: { studentId: 10 }, weight: 6, text: [
    `Reneé hears "one more course" and already has the pan warm.`,
  ] },
]);
registerModuleVariants('talk.suggest_indulgence.b10', [
  { when: { studentId: 6 }, weight: 6, text: [
    `Tiffany treats the suggestion like an invitation she already accepted.`,
  ] },
]);
registerModuleVariants('talk.suggest_growth.b00', [
  { when: { studentId: 0, stageMax: 4 }, weight: 6, text: [
    `Brittany hears growth and files it under next season. Curious. Competitive.`,
  ] },
]);
registerModuleVariants('talk.suggest_growth.b10', [
  { when: { studentId: 7 }, weight: 6, text: [
    `Priya writes the suggestion down. Then she underlines it.`,
  ] },
]);
registerModuleVariants('talk.suggest_growth.b20', [
  { when: { studentId: 8 }, weight: 6, text: [
    `Maya nods once. Growth is already the plan.`,
  ] },
]);

// ── leftover compliment crumbs ────────────────────────────────
registerModuleVariants('comp.bodyNote', [
  { when: { studentId: 8, stageMin: 5 }, weight: 5, text: [
    'Maya\'s softness does the talking. You only have to notice.',
  ] },
  { when: { studentId: 0, stageMin: 5 }, weight: 5, text: [
    'Brittany\'s new mass looks like a win she is still wearing.',
  ] },
]);
registerModuleVariants('comp.react.follow', [
  { when: { studentId: 2 }, weight: 5, text: [
    `Kylie grins. "Say it again. Slower. For the take."`,
  ] },
  { when: { studentId: 8 }, weight: 5, text: [
    `Maya stays. The compliment lands. She keeps it.`,
  ] },
]);
