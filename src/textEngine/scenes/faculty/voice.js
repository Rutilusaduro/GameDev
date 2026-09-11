// The Squad — Lead: A2 Psych | Support: A5 Editor
// Staff lounge voice keyed on teacher. Unique trees stay as fallback.
import { registerDimension, registerPool } from '../../engine.js';

registerDimension('facultyId', (ctx) => ctx.globals?.facultyId ?? '');

// Shape: FULL SENTENCE. Who is talking.
registerPool('faculty.voice', [
  { when: { facultyId: 'hartley' }, weight: 4, text: [
    'Hartley marks her page with one finger and does not pretend the pastry plate is scholarship. It is.',
    'Classics, tweed, marzipan she has stopped rationing. She looks at you like a source.',
    'Roman hours. She says it like a citation. The crumbs agree.',
  ] },
  { when: { facultyId: 'brooks' }, weight: 4, text: [
    'Brooks has a Goliath in hand and a grin like a stadium light. She assesses your lunch.',
    'Athletics, protein, a waistband losing a long argument. She wants you to eat anyway.',
    'Coach voice, juice-bar loyalty. Mass moves mass, she likes to say, and then she drinks.',
  ] },
  { when: { facultyId: 'mori' }, weight: 4, text: [
    'Mori has identical custards and a pen. Everything in the room is data, including you.',
    'Food science, soft voice, second samples. Satiety arriving late is her favorite problem.',
    'She slides a fork before you sit. Trial numbers. She is already writing.',
  ] },
  { when: { facultyId: 'abara' }, weight: 4, text: [
    'Abara watches you cross the lounge like a chess knight. Two coffees if she likes you.',
    'Psychology, pleasant, statistically hungry. She calls you a vector and means it fondly.',
    'She stirs. Shame metrics collapsing happily, she says. The pastry is the rest of the paper.',
  ] },
  { when: { facultyId: 'delgado' }, weight: 4, text: [
    'Rosa points a wooden spoon before you finish entering. Sit. Eat. She takes underfed personally.',
    'Culinary, brown-butter hugs, plates in waves. Nobody leaves her kitchen hungry.',
    'Tasting day, always, according to her. She has already plated you something illegal with plantains.',
  ] },
  { when: { facultyId: 'lockwood' }, weight: 4, text: [
    'Penny has spreadsheets and a danish. Door closes, crumbs stay secret. House rules.',
    'Registrar, pastry, gossip as sacred as enrollment. She files both with sugar on the keys.',
    'The good chair appears when she likes you. Éclair box. Fresh intel. Usual arrangement.',
  ] },
  { when: { leftoverFed: true, facultyId: 'hartley' }, weight: 4, text: [
    'Hartley smells your galley on you. She marks the page anyway and pulls the pastry closer.',
    'Marzipan first, citation second. She treats leftover trays as primary sources.',
  ] },
  { when: { leftoverFed: true, facultyId: 'brooks' }, weight: 4, text: [
    'Brooks clocks leftover heat on your residents. She toasts it with the Goliath and tells you to keep feeding them.',
    'Stadium grin for a tray that never quite emptied. She drinks anyway.',
  ] },
  { when: { leftoverFed: true, facultyId: 'mori' }, weight: 4, text: [
    'Mori already labeled your leftover as a delayed-satiety trial. The custard is sample two.',
    'Twin puddings, a pen tapping because your kitchen ran overnight data.',
  ] },
  { when: { leftoverFed: true, facultyId: 'abara' }, weight: 4, text: [
    'Abara treats leftover trays as a vector. Two coffees if she likes you, pastry if the floor already ate.',
    'Coffee cup circling. She calls your galley a successful intervention. Fond. Hungry.',
  ] },
  { when: { leftoverFed: true, facultyId: 'delgado' }, weight: 4, text: [
    'Rosa heard the foil. Sit. Eat. She takes an unfinished tray personally even when it was yours.',
    'Plantains already plated. She knows your kitchen started them before you walked in.',
  ] },
  { when: { leftoverFed: true, facultyId: 'lockwood' }, weight: 4, text: [
    'Penny files your leftover night next to enrollment. Danish first. Gossip second. Same folder.',
    'Door closed on crumbs. She wants the names of who finished the tray.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'Your kitchen still scents the lounge. She treats that as a briefing.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'After-hours corridor light reached this table. She orders like it is still on.',
  ] },
  { when: {}, text: [
    'Staff lounge light, crumbs on notes, a plate that talks first.',
    'She has already decided you will sit. The pastry plate voted.',
    'The meeting has a fork in it. Nobody objects.',
  ] },
]);
