// The Squad — Lead: A2 Psych | Support: A5 Editor, A6 Slender
// Wife Lessons 1-on-1 wrap — leftover/night kitchen scene after unique voice.
import { registerDimension, registerPool } from '../../engine.js';

registerDimension('wlPerson', (ctx) => ctx.globals?.wlPerson ?? '');

// Shape: FULL SENTENCE. Kitchen leftover heat around the talk.
registerPool('wifeLessons.talk.wrap.kitchen', [
  { when: { leftoverFed: true, wlPerson: 'Wanda' }, weight: 4, text: [
    'Wanda is already tasting leftover galley like it belongs in this kitchen too.',
    'Foil heat plus Wanda\'s spoon. She talks around both.',
  ] },
  { when: { leftoverFed: true, wlPerson: 'Darlene' }, weight: 4, text: [
    'Darlene folds leftover heat into the prayer-hands, then unfolds them toward the platter.',
  ] },
  { when: { leftoverFed: true, wlPerson: 'Patrice' }, weight: 4, text: [
    'Patrice watches leftover sauce reduce. Her patience does the same, hungrier.',
  ] },
  { when: { leftoverFed: true, wlPerson: 'Chloe' }, weight: 4, text: [
    'Chloe pretends leftover is still technique. The plate from last night disagrees first.',
  ] },
  { when: { leftoverFed: true, wlPerson: 'Emma' }, weight: 4, text: [
    'Emma files leftover as hospitality. Her waistband files the second sitting.',
  ] },
  { when: { leftoverFed: true, wlPerson: 'Kezia' }, weight: 4, text: [
    'Kezia clocks leftover heat and reaches anyway, like the recipe asked twice.',
  ] },
  { when: { leftoverFed: true, wlPerson: 'Lila' }, weight: 4, text: [
    'Lila keeps leftover quiet in her lap. The greeting still runs long.',
  ] },
  { when: { leftoverFed: true, stageMax: 4 }, weight: 3, text: [
    'Galley foil still on Mary Jane\'s fingers. She talks like the next rise already started.',
    'Last night\'s tray sits in her middle. She treats this greeting like a second proof.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'Galley leftover still working in her. The talk table smells like both kitchens.',
    'She keeps a hand on last night\'s tray as if the recipe asked a follow-up.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'After-hours knock still in the doorframe. She talks the way the latch never caught.',
    'Night-round warmth in her clothes. The greeting uses the same heat.',
  ] },
  { when: { wlPerson: 'Wanda' }, weight: 2, text: [
    'Wanda is already tasting from a spoon she did not ask permission to hold.',
    'Wanda\'s laugh arrives before the greeting finishes. So does a second bite.',
  ] },
  { when: { wlPerson: 'Darlene' }, weight: 2, text: [
    'Darlene folds her hands, then unfolds them toward the platter like a prayer that got hungry.',
    'Darlene talks daughters. The kitchen talks seconds. Both keep going.',
  ] },
  { when: { wlPerson: 'Patrice' }, weight: 2, text: [
    'Patrice watches the sauce reduce and her own patience do the same.',
    'Patrice takes the corner chair that reports her. She lets it.',
  ] },
  { when: { wlPerson: 'Chloe' }, weight: 2, text: [
    'Chloe pretends she is only here for technique. The plate disagrees first.',
    'Chloe leans on the island like it is a dare. The island holds.',
  ] },
  { when: { wlPerson: 'Emma' }, weight: 2, text: [
    'Emma smiles at the extra and files it as hospitality. Her waistband files it too.',
    'Emma keeps her voice polite. Her appetite does not bother.',
  ] },
  { when: {}, text: [
    'Gingham, warm steam, a talk that started at the stove.',
    'MJ keeps the kettle going so nobody has an excuse to leave hungry.',
    'Butter on the island. Appetite on the greeting. Both run long.',
  ] },
]);

// Shape: FULL SENTENCE. Growth-as-event during talk.
registerPool('wifeLessons.talk.wrap.growth', [
  { when: { leftoverFed: true, stageMax: 4 }, weight: 3, text: [
    'Last night\'s tray plus this conversation. She notices the shirt before she names it.',
    'Leftover heat under an apron string. She does not retie it tighter.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'Galley leftover lands easier than the first plate. The chair reports it.',
    'Kitchen leftover plus talk butter. Middles do the rest without a lesson plan.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'The knock taught her body to stay open. Daylight talk uses the same permission.',
    'After-hours warmth still arriving. She sits like the night never closed.',
  ] },
  { when: { stageMin: 6 }, weight: 2, text: [
    'Softness takes leftover heat home in the clothes. Mary Jane keeps the rest.',
    'The table is wreckage. Softness is what leaves with the gossip.',
  ] },
  { when: { stageMax: 4 }, weight: 2, text: [
    'Clothes still argue. The body is already answering. Shared bites do the convincing.',
    'She checks the microwave door for a curve she did not schedule. She lets it stay.',
  ] },
  { when: {}, text: [
    'Growth happens in the seconds. She finishes what the talk put in front of her.',
    'The work leaves her heavier than it found her. The greeting required it.',
    'She keeps a hand on the new weight like a tool she intends to use again.',
  ] },
]);

// Shape: DIALOGUE BEAT.
registerPool('wifeLessons.talk.wrap.line', [
  { when: { leftoverFed: true }, weight: 3, text: [
    '"Still hungry," someone says, which MJ files as correct.',
    'MJ tastes the sauce again. "The leftover made this kinder," she says, and means the middles.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    '"You were up late," MJ says, fond, already plating.',
    '"The door stayed open," she says. "So did we."',
  ] },
  { when: { wlPerson: 'Wanda' }, weight: 2, text: [
    '"I\'m hungry," Wanda says, and names the lesson by chewing.',
    'Wanda talks with her mouth full and does not apologize for either.',
  ] },
  { when: {}, text: [
    '"Soft means the house has a center," MJ says, and refills before anyone admits they wanted it.',
    'MJ asks who needs more and fills the plate before the answer arrives.',
    'MJ wipes the counter and keeps a hand on her middle like a grade.',
  ] },
]);

registerPool('wifeLessons.talk.scene', [
  { when: {}, text: [
    '{wifeLessons.talk.wrap.kitchen} {wifeLessons.talk.wrap.growth} {wifeLessons.talk.wrap.line}',
    '{wifeLessons.talk.wrap.kitchen} {wifeLessons.talk.wrap.line} {wifeLessons.talk.wrap.growth}',
    '{wifeLessons.talk.wrap.growth} {wifeLessons.talk.wrap.kitchen} {wifeLessons.talk.wrap.line}',
  ] },
]);
