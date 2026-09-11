// The Squad — Lead: A2 Psych | Support: A4 Architect
// Third variants on decomposed opposition hearing fragment pools (_d*).
// Loads after aibHearing.js auto-decompose registration.
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('opposition.hearing.removal.phase0._d0', [
  { when: {}, weight: 3, text: [
    `Vance calls the hearing to order. {subject.name} at {studentLbs} pounds fills slide one — abundance dressed as liability while she stays calm beside you.`,
    `Documentation first: meal timestamps, concern in bullet points. {subject.name} sits warm at your shoulder, {studentLbs} lbs and visibly hungry for lunch.`,
    `The projector shows {subject.name} eating — framed as scandal, not appetite. She remains seated, {studentLbs} pounds of proof beside your chair.`,
  ]},
]);

registerModuleVariants('opposition.hearing.removal.result.night_log', [
  { when: {}, text: [
    'Night-round signatures sit on the table. Community hours, leftover trays, doors answered.',
    'You recast after-hours traffic as care. Vance reads slower. The Board hears chewing in the timestamps.',
    '{subject.name} nods at the log. She was one of the lights left on.',
  ]},
]);

registerModuleVariants('opposition.hearing.emergency.result.night_hours', [
  { when: {}, text: [
    'Wellness programming, you call it. The observer writes "after hours" and then "fed."',
    'You walk the Board through quiet-hour snacks as retention. The pen hesitates.',
    'Night rounds become a program on paper. Appetite keeps the receipts.',
  ]},
]);

registerModuleVariants('opposition.hearing.removal.phase1', [
  { when: {}, text: [
    'Vance wants restraint in writing. {subject.name} answers with how she sits.',
    'The second motion smells like leftover trays. Someone in the room is still hungry.',
    'Conditional enrollment is a smaller story. The chair under {subject.name} refuses it.',
  ]},
]);

registerModuleVariants('opposition.hearing.emergency.phase1', [
  { when: {}, text: [
    'The observer writes faster. Appetite does not. {subject.name} stays the exhibit.',
    'Second round of crisis language. The Board is still chewing the first.',
    'Vance offers costs. You offer a hall that eats on schedule.',
  ]},
]);
