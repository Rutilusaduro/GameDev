// The Squad — Lead: A5 Editor | Support: A2 Psych
// Slot-composed wife-lesson 1-on-1 display. Prefer over leftover WL_DIALOGUES lines.
import { registerPool, registerDimension } from '../../engine.js';

registerDimension('wlPerson', (ctx) => ctx.globals?.wlPerson ?? '');
registerDimension('wlStage', (ctx) => ctx.globals?.wlStage ?? 0);
registerDimension('lessonId', (ctx) => ctx.globals?.lessonId ?? '');

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

registerPool('wl.lesson.scene', [
  { when: {}, text: [
    '{wl.lesson.setup} {wl.lesson.body}',
    '{wl.lesson.body} {wl.lesson.setup}',
    '{wl.lesson.setup}\n\n{wl.lesson.body}',
  ]},
]);

registerPool('wl.lesson.setup', [
  { when: {}, text: [
    'Gingham apron. Warm pans. Mary Jane already has butter on her hands.',
    'The kitchen fills with yeast and cream. The lesson is the extra on the plate.',
    'Table set. Daughters and moms crowding the heat. You watch from the side.',
  ]},
  { when: { lessonId: 'honey_butter' }, weight: 4, text: [
    'Honey Butter Rolls. MJ works pats of butter into the flour and calls it home.',
  ]},
  { when: { lessonId: 'cream_biscuits' }, weight: 4, text: [
    'Cream Drop Biscuits. Heavy cream, no fuss. Wanda reaches for a second before they cool.',
  ]},
  { when: { lessonId: 'mac_cheese' }, weight: 4, text: [
    'Four-Cheese Mac. The room goes quiet. Spoons keep moving.',
  ]},
  { when: { lessonId: 'feast_spread' }, weight: 4, text: [
    'The feast spread covers the table with every earlier recipe. Nobody leaves hungry.',
  ]},
  { when: { lessonId: 'final_spread' }, weight: 4, text: [
    'The final spread. Every favorite dish. They eat slowly, like the kitchen is the point.',
  ]},
  { when: { lessonId: 'handoff' }, weight: 4, text: [
    'The daughters cook for the moms now. MJ watches from the chair and lets them.',
  ]},
  { when: { wlStage: [1, 2] }, weight: 2, text: [
    'Early lessons. The moms still pretend they came for the recipes.',
  ]},
  { when: { wlStage: [6, 7, 8] }, weight: 2, text: [
    'The daughters take the table. MJ sits. The extra of the week is already seated.',
  ]},
]);

registerPool('wl.lesson.body', [
  { when: {}, text: [
    '{word.size} of Mary Jane holds the kitchen first. Soft heat. Shared bites until the pan is a rumor.',
    'Warm pieces, sticky fingers, quiet approval. The chairs answer when they sit back down.',
    'She serves generous. They take generous. You stay until the glaze is gone.',
  ]},
  { when: { stageMin: 6 }, weight: 2, text: [
    'At this size the kitchen is a geography. MJ does not rush. The food comes to the table.',
  ]},
]);
