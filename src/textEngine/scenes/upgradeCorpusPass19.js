// The Squad — Lead: A2 Psych | Support: A1 Mobile, A6 Slender, A5 Editor
// Pass 19 — leftover force-feeder, weigh-in greetings, session notes,
// campus locale, leftover set-feed/praise, leftover stream.pre lines.
import { registerModuleVariants } from '../engine.js';

// ── leftover force-feeder (A1/A2; no health-consequence) ──────
registerModuleVariants('ff.setup', [
  { when: { studentId: 18 }, weight: 6, text: [
    'Talia checks the harness like a protocol she wrote. Pink already. Ready.',
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    'Maya sits. Straps wait. She looks at you once. The look is the yes.',
  ] },
  { when: { studentId: 5 }, weight: 6, text: [
    'Destiny drops into the chair like a raid seat. "Queue me."',
  ] },
]);
registerModuleVariants('ff.harness', [
  { when: { studentId: 18 }, weight: 6, text: [
    'Talia buckles herself in with lab-hand certainty, already flushed',
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    'Maya leans back and lets the straps finish the sentence',
  ] },
  { when: { studentId: 0 }, weight: 6, text: [
    'Brittany sits like a starter in new gear, straps clicking home',
  ] },
]);
registerModuleVariants('ff.openDialogue', [
  { when: { studentId: 18 }, weight: 6, text: [
    `"Calibration first. Then we exceed it," Talia says.`,
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    `"Do it." Maya does not decorate the ask.`,
  ] },
  { when: { studentId: 2 }, weight: 6, text: [
    `"If this is a take, make it count," Kylie says, already sitting back.`,
  ] },
  { when: { studentId: 16 }, weight: 6, text: [
    `"For the record, this is still a study." Sophia's voice is not convincing.`,
  ] },
]);
registerModuleVariants('ff.machineBeat', [
  { when: { studentId: 18 }, weight: 5, text: [
    'Talia watches the pump the way she watches a graph. Then she stops watching and just takes it.',
  ] },
  { when: { studentId: 8 }, weight: 5, text: [
    'The pump finds Maya\'s rhythm. She goes still and lets it work.',
  ] },
  { when: { studentId: 5 }, weight: 5, text: [
    'Destiny rides the pulses like a buff she queued on purpose.',
  ] },
]);
registerModuleVariants('ff.intakeClause', [
  { when: { studentId: 8 }, weight: 6, text: [
    'each pulse disappearing into Maya without commentary',
  ] },
  { when: { studentId: 10 }, weight: 6, text: [
    'paste landing like a sauce she already rated and accepted',
  ] },
  { when: { studentId: 15 }, weight: 6, text: [
    'tribute sliding down as if the machine finally learned manners',
  ] },
]);
registerModuleVariants('ff.swellBeat', [
  { when: { studentId: 8 }, weight: 6, text: [
    'Maya\'s middle arrives in visible waves. She keeps her hands in her lap and lets it.',
  ] },
  { when: { studentId: 0 }, weight: 6, text: [
    'Brittany\'s belly rounds like a scoreboard ticking up. She watches it win.',
  ] },
  { when: { studentId: 2 }, weight: 6, text: [
    'Kylie\'s stomach posts in real time. She does not crop the swell.',
  ] },
]);
registerModuleVariants('ff.closeBeat', [
  { when: { studentId: 18 }, weight: 6, text: [
    'When it stops, Talia is heavier and already thinking about the next trial.',
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    'The harness loosens on more of Maya. She stays seated. Warm. Kept.',
  ] },
  { when: { studentId: 13 }, weight: 6, text: [
    'Daisy blesses the extra when the straps open. "Look at you," she tells herself.',
  ] },
]);
registerModuleVariants('ff.closeDialogue', [
  { when: { studentId: 18 }, weight: 6, text: [
    `"Exceeds the model," Talia says, palm on the new swell. "Again. Soon."`,
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    `"More." Maya's one-word review. The chair already agrees.`,
  ] },
  { when: { studentId: 5 }, weight: 6, text: [
    `"Buff applied," Destiny says. "I'm logging this chair as home spawn."`,
  ] },
]);

// ── leftover weigh-in greetings / settle ──────────────────────
registerModuleVariants('wi.greeting', [
  { when: { studentId: 8 }, weight: 6, text: [
    `"Hey." Maya sits. The rest of the greeting is showing up.`,
  ] },
  { when: { studentId: 0 }, weight: 6, text: [
    `"Let's get the number." Brittany is already halfway to the platform.`,
  ] },
  { when: { studentId: 1 }, weight: 6, text: [
    `"I brought the notes." Madeline means the week, not the scale.`,
  ] },
  { when: { studentId: 5 }, weight: 6, text: [
    `"Booting the scale," Destiny says. "I already know it's patched up."`,
  ] },
  { when: { studentId: 16, stageMax: 4 }, weight: 6, text: [
    `"Hi. Just the usual check." Sophia sounds like she almost believes it.`,
  ] },
  { when: { studentId: 9 }, weight: 6, text: [
    `"Right, so. The number." Chloé says it like weather from home.`,
  ] },
]);
registerModuleVariants('wi.settleAction', [
  { when: { studentId: 8 }, weight: 6, text: [
    'Maya sets nothing down she does not need. She is already here.',
  ] },
  { when: { studentId: 7 }, weight: 6, text: [
    'Priya aligns the bag with the desk edge, then faces the number.',
  ] },
  { when: { studentId: 10 }, weight: 6, text: [
    'Reneé parks a snack on the desk like the weigh-in includes a tasting.',
  ] },
]);
registerModuleVariants('wi.scaleAttitude', [
  { when: { studentId: 8, stageMax: 4 }, weight: 6, text: [
    'Maya looks at you until the scale is the only thing left to do.',
  ] },
  { when: { studentId: 0 }, weight: 6, text: [
    'Brittany treats the platform like a starting block.',
  ] },
  { when: { studentId: 15 }, weight: 6, text: [
    'Lilith regards the scale like prey that already lost.',
  ] },
]);
registerModuleVariants('wi.numberSettle', [
  { when: { studentId: 8 }, weight: 6, text: [
    'The dial holds at {subject.lbs}. Maya nods once.',
  ] },
  { when: { studentId: 2 }, weight: 6, text: [
    'The dial holds at {subject.lbs}. Kylie does not crop the number.',
  ] },
  { when: { studentId: 3 }, weight: 6, text: [
    'The dial holds at {subject.lbs}. Serena files it like a split.',
  ] },
]);

// ── leftover session notes ────────────────────────────────────
registerModuleVariants('session.campusNote', [
  { when: { studentId: 8, campusFattening: true }, weight: 6, text: [
    'Maya eats like campus already said yes. Portions keep agreeing.',
  ] },
  { when: { studentId: 10, campusFattening: true }, weight: 6, text: [
    'Reneé matches the fattening halls plate for plate. The dining hall is a peer.',
  ] },
  { when: { studentId: 2, campusFattening: true }, weight: 6, text: [
    'Kylie treats the whole campus like a buffet drop. She is the campaign.',
  ] },
]);
registerModuleVariants('session.seasonNote', [
  { when: { studentId: 8, season: ['fall'] }, weight: 6, text: [
    'Maya leans into fall food without naming it. The plate does the talking.',
  ] },
  { when: { studentId: 10, season: ['winter'] }, weight: 6, text: [
    'Reneé cooks against the cold. She eats the proof.',
  ] },
  { when: { studentId: 2, season: ['summer'] }, weight: 6, text: [
    'Kylie eats through the heat like the ring light still loves her.',
  ] },
  { when: { studentId: 1, season: ['spring'] }, weight: 6, text: [
    'Madeline proves spring is not a diet. The notes include second helpings.',
  ] },
]);
registerModuleVariants('session.relWarmth', [
  { when: { studentId: 15, relationship: [3] }, weight: 6, text: [
    'Lilith lets you stay in reach. Devotion is a perch.',
  ] },
  { when: { studentId: 11, relationship: [3] }, weight: 6, text: [
    'Kaylee feeds you care and takes it back as dinner. Mutual self-care.',
  ] },
]);

// ── leftover campus locale ────────────────────────────────────
registerModuleVariants('campus.localeIntro', [
  { when: { studentId: 8, campusLocale: 'hallway' }, weight: 6, text: [
    'The hallway goes quiet around Maya before she asks it to.',
  ] },
  { when: { studentId: 0, campusLocale: 'gym' }, weight: 6, text: [
    'The gym still looks like Brittany\'s scoreboard, even with the extra softness.',
  ] },
  { when: { studentId: 10, campusLocale: 'cafeteria' }, weight: 6, text: [
    'The dining hall smells like a kitchen that remembered Reneé\'s name.',
  ] },
  { when: { studentId: 5, campusLocale: 'dorm_room' }, weight: 6, text: [
    'Destiny\'s dorm: hoodies, empty bags, the chair already claimed.',
  ] },
  { when: { studentId: 1, campusLocale: 'lecture_hall' }, weight: 6, text: [
    'Lecture rows wait like footnotes. Madeline\'s seat already knows her hips.',
  ] },
  { when: { studentId: 15, campusLocale: 'stairwell' }, weight: 6, text: [
    'The stairwell feels like Lilith\'s hunting blind. Concrete, echo, snack potential.',
  ] },
]);

// ── leftover set feed / praise ────────────────────────────────
registerModuleVariants('set.feed.spread', [
  { when: { studentId: 8 }, weight: 6, text: [
    'You lay out the afternoon. Maya starts. No commentary. The trays shrink.',
  ] },
  { when: { studentId: 10 }, weight: 6, text: [
    'Reneé surveys the spread like a pass. Then she eats the pass.',
  ] },
  { when: { studentId: 13 }, weight: 6, text: [
    'Daisy blesses the trays before she claims them. Abundance, not apology.',
  ] },
  { when: { studentId: 15 }, weight: 6, text: [
    'Lilith starts without asking what anything is. Tribute is tribute.',
  ] },
]);
registerModuleVariants('set.socialize.praise.react', [
  { when: { studentId: 8 }, weight: 6, text: [
    'Maya takes the praise the way she takes a plate. Quiet. Kept.',
  ] },
  { when: { studentId: 0 }, weight: 6, text: [
    'Brittany files the compliment under wins. She lets you see her smile.',
  ] },
  { when: { studentId: 2 }, weight: 6, text: [
    'Kylie repeats the praise once, slower, like she might post it later.',
  ] },
  { when: { studentId: 15 }, weight: 6, text: [
    'Lilith accepts worship as weather. She does not thank you. She keeps you.',
  ] },
]);

// ── leftover stream.pre lines (Destiny/Kylie; jargon in dialogue) ─
registerModuleVariants('stream.pre.snack.heavy.line', [
  { when: { studentId: 5, stageMin: 5 }, weight: 6, text: [
    `"Pre-stream feast. Chat can watch the inventory drop."`,
  ] },
  { when: { studentId: 2, stageMin: 5 }, weight: 6, text: [
    `"Heavy snack. If the logo wrinkles, that's the bit."`,
  ] },
]);
registerModuleVariants('stream.pre.snack.light.line', [
  { when: { studentId: 5 }, weight: 6, text: [
    `"Light snack. For now. Queue is a liar."`,
  ] },
]);
registerModuleVariants('stream.pre.warmup.eat.line', [
  { when: { studentId: 5, stageMin: 5 }, weight: 6, text: [
    `"Warmup is calories. Stretching can catch up."`,
  ] },
  { when: { studentId: 2, stageMin: 5 }, weight: 6, text: [
    `"Warmup bite for the thumbnail. Then another because I wanted it."`,
  ] },
]);
registerModuleVariants('stream.pre.setup.comfort.line', [
  { when: { studentId: 5, stageMin: 6 }, weight: 6, text: [
    `"Chair first. Overlay second. Belly wherever it lands."`,
  ] },
]);
registerModuleVariants('stream.pre.setup.production.line', [
  { when: { studentId: 2, stageMin: 5 }, weight: 6, text: [
    `"Lights, logo, snack in frame. That's a show."`,
  ] },
]);

// ── leftover opposition (subject is the girl on the slide) ───
registerModuleVariants('opposition.hearing.removal.phase1', [
  { when: { studentId: 8 }, weight: 6, text: [
    `Vance taps the folder. Maya fills slide one and does not perform shame.`,
  ] },
  { when: { studentId: 0 }, weight: 6, text: [
    `Vance names Brittany's number. Brittany looks like she is still in the game.`,
  ] },
]);
registerModuleVariants('opposition.hearing.open', [
  { when: { studentId: 8 }, weight: 5, text: [
    'Toner and denial. Maya sits like the folder already lost the argument.',
  ] },
  { when: { studentId: 12 }, weight: 5, text: [
    'Nadia watches Vance watch her. The case study is the hearing.',
  ] },
]);
registerModuleVariants('opposition.agenda.wellness_seminar', [
  { when: { studentId: 16 }, weight: 6, text: [
    'Sophia sits through portion charts and takes notes she will not follow.',
  ] },
]);
registerModuleVariants('opposition.agenda.mandatory_fitness', [
  { when: { studentId: 3 }, weight: 6, text: [
    'Serena treats the tape like a rival meet. Appetite still wins the week.',
  ] },
]);
