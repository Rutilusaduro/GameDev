// The Squad — Lead: A2 Psych | Support: A1 Mobile, A6 Slender, A5 Editor
// Pass 19 — leftover force-feeder setup/close, session notes,
// leftover set-feed/praise, leftover stream.pre lines, leftover opposition.
import { registerModuleVariants } from '../engine.js';

// ── leftover force-feeder (A1/A2; no health-consequence) ──────
registerModuleVariants('ff.setup', [
  { when: { studentId: 18 }, weight: 6, text: [
    'She checks the harness like a protocol she wrote. Pink already. Ready.',
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    'She sits. Straps wait. She looks at you once. The look is the yes.',
  ] },
  { when: { studentId: 5 }, weight: 6, text: [
    'She drops into the chair like a raid seat. "Queue me."',
  ] },
]);
registerModuleVariants('ff.closeDialogue', [
  { when: { studentId: 18 }, weight: 6, text: [
    `"Exceeds the model." Palm on the new swell. "Again. Soon."`,
  ] },
  { when: { studentId: 8 }, weight: 6, text: [
    `"More." One-word review. The chair already agrees.`,
  ] },
  { when: { studentId: 5 }, weight: 6, text: [
    `"Buff applied. I'm logging this chair as home spawn."`,
  ] },
]);

// ── leftover session notes ────────────────────────────────────
registerModuleVariants('session.campusNote', [
  { when: { studentId: 8, campusFattening: true }, weight: 6, text: [
    'She eats like campus already said yes. Portions keep agreeing.',
  ] },
  { when: { studentId: 10, campusFattening: true }, weight: 6, text: [
    'She matches the fattening halls plate for plate. The dining hall is a peer.',
  ] },
  { when: { studentId: 2, campusFattening: true }, weight: 6, text: [
    'She treats the whole campus like a buffet drop. She is the campaign.',
  ] },
]);
registerModuleVariants('session.seasonNote', [
  { when: { studentId: 8, season: ['fall'] }, weight: 6, text: [
    'She leans into fall food without naming it. The plate does the talking.',
  ] },
  { when: { studentId: 10, season: ['winter'] }, weight: 6, text: [
    'She cooks against the cold. She eats the proof.',
  ] },
  { when: { studentId: 2, season: ['summer'] }, weight: 6, text: [
    'She eats through the heat like the ring light still loves her.',
  ] },
  { when: { studentId: 1, season: ['spring'] }, weight: 6, text: [
    'She proves spring is not a diet. The notes include second helpings.',
  ] },
]);
registerModuleVariants('session.relWarmth', [
  { when: { studentId: 15, relationship: [3] }, weight: 6, text: [
    'She lets you stay in reach. Devotion is a perch.',
  ] },
  { when: { studentId: 11, relationship: [3] }, weight: 6, text: [
    'She feeds you care and takes it back as dinner. Mutual self-care.',
  ] },
]);

// ── leftover set feed / praise ────────────────────────────────
registerModuleVariants('set.feed.spread', [
  { when: { studentId: 8 }, weight: 6, text: [
    'You lay out the afternoon. She starts. No commentary. The trays shrink.',
  ] },
  { when: { studentId: 10 }, weight: 6, text: [
    'She surveys the spread like a pass. Then she eats the pass.',
  ] },
  { when: { studentId: 13 }, weight: 6, text: [
    'She blesses the trays before she claims them. Abundance, not apology.',
  ] },
  { when: { studentId: 15 }, weight: 6, text: [
    'She starts without asking what anything is. Tribute is tribute.',
  ] },
]);
registerModuleVariants('set.socialize.praise.react', [
  { when: { studentId: 8 }, weight: 6, text: [
    'She takes the praise the way she takes a plate. Quiet. Kept.',
  ] },
  { when: { studentId: 0 }, weight: 6, text: [
    'She files the compliment under wins. She lets you see her smile.',
  ] },
  { when: { studentId: 2 }, weight: 6, text: [
    'She repeats the praise once, slower, like she might post it later.',
  ] },
  { when: { studentId: 15 }, weight: 6, text: [
    'She accepts worship as weather. She does not thank you. She keeps you.',
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
    `Vance taps the folder. She fills slide one and does not perform shame.`,
  ] },
  { when: { studentId: 0 }, weight: 6, text: [
    `Vance names the number. She looks like she is still in the game.`,
  ] },
]);
registerModuleVariants('opposition.hearing.open', [
  { when: { studentId: 8 }, weight: 5, text: [
    'Toner and denial. She sits like the folder already lost the argument.',
  ] },
  { when: { studentId: 12 }, weight: 5, text: [
    'She watches Vance watch her. The case study is the hearing.',
  ] },
]);
registerModuleVariants('opposition.agenda.wellness_seminar', [
  { when: { studentId: 16 }, weight: 6, text: [
    'She sits through portion charts and takes notes she will not follow.',
  ] },
]);
registerModuleVariants('opposition.agenda.mandatory_fitness', [
  { when: { studentId: 3 }, weight: 6, text: [
    'She treats the tape like a rival meet. Appetite still wins the week.',
  ] },
]);
