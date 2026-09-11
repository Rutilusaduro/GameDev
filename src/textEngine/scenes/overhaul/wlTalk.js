// The Squad — Lead: A5 Editor | Support: A2 Psych
// Slot-composed wife-lesson 1-on-1 display. Prefer over leftover WL_DIALOGUES lines.
import { registerPool } from '../../engine.js';

registerPool('wl.talk.greeting', [
  { when: {}, text: [
    '{wl.talk.setup} {wl.talk.greetLine}',
    '{wl.talk.greetLine} {wl.talk.setup}',
    '{wl.talk.setup}\n\n{wl.talk.greetLine}',
  ]},
]);

registerPool('wl.talk.reply', [
  { when: {}, text: [
    '{wl.talk.setup} {wl.talk.replyLine}',
    '{wl.talk.replyLine} {wl.talk.setup}',
    '{wl.talk.setup}\n\n{wl.talk.replyLine}',
  ]},
]);

registerPool('wl.talk.setup', [
  { when: {}, text: [
    'Kitchen warm. Table set. The lesson is already in the bread basket.',
    'Gingham, butter, a chair that has learned the extra of the week.',
    'Mary Jane\'s table holds the conversation the way a warm room holds a body.',
  ]},
  { when: { wlPerson: 'Darlene' }, weight: 4, text: [
    'Darlene drove over hungry. Emma and Chloe compare plates at home. She pretends not to referee.',
  ]},
  { when: { wlPerson: 'Wanda' }, weight: 4, text: [
    'Wanda is already in the bread basket. She came for the food and the company and stayed for both.',
  ]},
  { when: { wlPerson: 'Patrice' }, weight: 4, text: [
    'Patrice sits a little sideways, hips claiming the chair. She brought her own container home last week.',
  ]},
  { when: { wlPerson: 'Emma' }, weight: 4, text: [
    'Emma takes a second helping before anyone asks. The kitchen is her argument with Chloe.',
  ]},
  { when: { wlPerson: 'Chloe' }, weight: 4, text: [
    'Chloe smiles like she already passed someone. The plate in front of her is not a rumor.',
  ]},
  { when: { wlPerson: 'Kezia' }, weight: 4, text: [
    'Kezia eats the way Wanda taught her: cream in everything, pride in the leftover heat.',
  ]},
  { when: { wlPerson: 'Lila' }, weight: 4, text: [
    'Lila keeps her voice soft and her plate honest. The extra of her arrived before the greeting.',
  ]},
  { when: { stageMin: 6 }, weight: 2, text: [
    'The chair answers when she sits. She notices. She sits anyway.',
  ]},
]);

registerPool('wl.talk.greetLine', [
  { when: {}, text: [
    '"We drove over hungry. That should tell you how the week went."',
    '"Mary Jane\'s table feels like the warmest room on the floor right now."',
    '"Hello again. We asked on Monday what we were making this week."',
  ]},
  { when: { wlPerson: 'Wanda' }, weight: 4, text: [
    '"Sit. There is butter on everything and I am not sorry about it."',
  ]},
  { when: { wlPerson: 'Emma' }, weight: 4, text: [
    '"If Chloe thinks she is catching up, she can watch me finish this."',
  ]},
]);

registerPool('wl.talk.replyLine', [
  { when: {}, text: [
    '"I\'ll tell them you said so. They\'ll glow."',
    '"Honest answer: we are grateful to belong here."',
    '"Full plates. We came for the extra and we are keeping it."',
  ]},
  { when: { wlPerson: 'Darlene' }, weight: 4, text: [
    '"Emma and Chloe compare plates at home. I pretend not to referee."',
  ]},
  { when: { wlPerson: 'Wanda' }, weight: 4, text: [
    '"Kezia finally got her appetite. I have been waiting years to hear that sentence."',
  ]},
  { when: { wlPerson: 'Patrice' }, weight: 4, text: [
    '"I stopped layering. The clothes that fit are the ones I wear now."',
  ]},
]);
