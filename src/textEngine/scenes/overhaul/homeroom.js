// The Squad — Lead: A5 Editor | Support: A2 Psych, A6 Slender
// Slot-composed hall kitchen queen conference / activity display.
import { registerPool, registerDimension } from '../../engine.js';

registerDimension('homeroomKey', (ctx) => ctx.globals?.homeroomKey ?? '');
registerDimension('homeroomAct', (ctx) => ctx.globals?.homeroomAct ?? '');
registerDimension('homeroomChoice', (ctx) => ctx.globals?.homeroomChoice ?? '');

registerPool('homeroom.conference.scene', [
  { when: {}, text: [
    '{homeroom.conference.setup} {homeroom.conference.body}',
    '{homeroom.conference.body} {homeroom.conference.setup}',
    '{homeroom.conference.setup}\n\n{homeroom.conference.body}',
  ]},
]);

registerPool('homeroom.conference.setup', [
  { when: {}, text: [
    'Hall kitchen. Notebook open. The drawer already knows this meeting.',
    'Daisy keeps the container in reach. Conferences go better when they do.',
    'Warm light, a chair that has learned the extra of Tuesday.',
  ]},
  { when: { homeroomKey: 'Kayla' }, weight: 4, text: [
    'Kayla sits like the room stopped being official months ago. She is waiting on the real subject.',
  ]},
  { when: { homeroomKey: 'Bri' }, weight: 4, text: [
    'Bri sits. Her eyes go to the desk first. Practical. Hungry in a tidy way.',
  ]},
  { when: { homeroomKey: 'Sofia' }, weight: 4, text: [
    'Sofia fills the chair before she has finished sitting. Soft, wide, already in.',
  ]},
  { when: { homeroomKey: 'Mrs_Calloway' }, weight: 4, text: [
    'Mrs. Calloway keeps her jacket buttoned. She came about Tuesdays. Kayla talks about them constantly.',
  ]},
  { when: { homeroomKey: 'Mrs_Reyes' }, weight: 4, text: [
    'Mrs. Reyes brought coffee for both of you. She sits before the greeting is done.',
  ]},
  { when: { homeroomKey: 'Mrs_Monroe' }, weight: 4, text: [
    'Mrs. Monroe does not knock. The good chair is already hers. "What is on the menu?"',
  ]},
]);

registerPool('homeroom.conference.body', [
  { when: {}, text: [
    '{word.size} of the room waits on Daisy. Soft heat. The notebook will tell the truth later.',
    'The container on the corner is not a rumor. Everyone in this chair has noticed it.',
    'Tuesday lives in the kitchen even on a conference day. She can smell it.',
  ]},
  { when: { stageMin: 6 }, weight: 2, text: [
    'At this size the chair answers first. Daisy lets it. The meeting follows.',
  ]},
]);

registerPool('homeroom.activity.scene', [
  { when: {}, text: [
    '{homeroom.activity.setup} {homeroom.activity.body}',
    '{homeroom.activity.body} {homeroom.activity.setup}',
    '{homeroom.activity.setup}\n\n{homeroom.activity.body}',
  ]},
]);

registerPool('homeroom.activity.setup', [
  { when: {}, text: [
    'Group session. The kitchen holds more chairs than the agenda admits.',
    'Daisy stands with the notepad. The room has its own list.',
    'Warm pans, a scale in the corner, bodies that already know why they came.',
  ]},
  { when: { homeroomAct: 'parent_meeting' }, weight: 4, text: [
    'All three moms. Mrs. Monroe claimed the window chair. Mrs. Calloway still has her jacket.',
  ]},
  { when: { homeroomAct: 'health_unit' }, weight: 4, text: [
    'Scale at the front. Measuring tape on the desk. Sofia is already standing near it.',
  ]},
]);

registerPool('homeroom.activity.body', [
  { when: {}, text: [
    'The enrichment note says wellness. The extra in the room says otherwise, fondly.',
    '{word.size} settles into the seating. Heat. The next hour has food in it.',
    'Daisy writes a heading. The kitchen writes the rest.',
  ]},
]);

registerPool('homeroom.result.scene', [
  { when: {}, text: [
    '{homeroom.result.setup} {homeroom.result.body}',
    '{homeroom.result.body} {homeroom.result.setup}',
    '{homeroom.result.setup}',
  ]},
]);

registerPool('homeroom.result.setup', [
  { when: {}, text: [
    'The choice lands. Daisy writes it. The container comes out like punctuation.',
    'Notebook, then food. The meeting was always going to end this way.',
    'She keeps the tone warm. The kitchen does the rest of the work.',
  ]},
  { when: { homeroomChoice: 'tuesday' }, weight: 4, text: [
    'Kayla does not need to think. Cinnamon rolls. Second recipe upgrade. Daisy writes it down.',
  ]},
  { when: { homeroomChoice: 'progress_review' }, weight: 4, text: [
    'Engagement scores up every week. Kayla blinks, then looks at the container. Daisy slides it over.',
  ]},
  { when: { homeroomChoice: 'brought_something' }, weight: 4, text: [
    'Bottom drawer. There is always a container. Bri eats while Daisy talks progress.',
  ]},
  { when: { homeroomChoice: 'next_tuesday' }, weight: 4, text: [
    'Sofia ranks the cakes. Cardamom honey with extra cream. Peach as backup. Non-negotiable.',
  ]},
  { when: { homeroomChoice: 'offer_tasting' }, weight: 4, text: [
    'A wrapped slice for the drive. Mrs. Calloway takes it. Daisy watches from the window.',
  ]},
  { when: { homeroomChoice: 'taste_now' }, weight: 4, text: [
    'Mrs. Monroe has the good container open before Daisy sits. This is why she comes.',
  ]},
  { when: { homeroomChoice: 'refreshments_first' }, weight: 4, text: [
    'The big container hits the table. The agenda waits. Mrs. Calloway is on her third piece.',
  ]},
  { when: { homeroomChoice: 'personal' }, weight: 4, text: [
    'Numbers go in the apron notebook, not the wellness file. Daisy smiles when she closes it.',
  ]},
  { when: { homeroomChoice: 'weigh_moms' }, weight: 4, text: [
    'Mrs. Monroe first, easy. Mrs. Reyes already knew. Mrs. Calloway laughs and says not to tell Kayla.',
  ]},
]);

registerPool('homeroom.result.body', [
  { when: {}, text: [
    '{word.size} of the room leaves heavier. Soft heat. Tuesday already booked itself.',
    'The leftover container is lighter. The chairs remember. Daisy underlines the date.',
    'She lets them go with food still in their mouths. The floor did its job.',
  ]},
]);
