// The Squad — Lead: A1 Mobile | Support: A5 Editor
// Contest actions / devour / weigh-in / payoff — slot skeletons.
import { registerDimension, registerPool } from '../../engine.js';

registerDimension('contestAction', (ctx) => ctx.globals?.contestAction ?? '');

// Shape: FULL SENTENCE. Unbutton / room.
registerPool('contest.action.body', [
  { when: { contestAction: 'unbutton' }, weight: 4, text: [
    'The button gives. Belly comes forward into the table without apology. Crowd noise changes.',
    'Waistband loses. Warm round weight settles between her thighs. She breathes properly.',
  ] },
  { when: { contestAction: 'rub' }, weight: 4, text: [
    'Both palms on the tight warmth. Slow circles. Enough room to reach again.',
    'She rubs the density outward. Fullness redistributes a fraction. She looks at what is left.',
  ] },
  { when: { contestAction: 'taunt' }, weight: 4, text: [
    'Eye contact with Maya. Maya looks at the food instead. She eats anyway.',
    'She asks if Maya wants to call it. Maya says not even close. The rib still goes down.',
  ] },
  { when: { contestAction: 'steal' }, weight: 4, text: [
    'Arm across the divider. Pasta becomes hers. Maya says, "Oh. That\'s how it is."',
    'She takes the ribs. Belly presses the divider. "Mine now." Maya laughs once and keeps working.',
  ] },
  { when: { contestAction: 'table_cleared' }, weight: 4, text: [
    'Last item gone. Both sides empty. Head judge says table cleared to the room, meaning her.',
    'Maya stares at empty wood, then at her. "You ate my food." She did.',
  ] },
  { when: { contestAction: 'too_full' }, weight: 4, text: [
    'Belly says stop. Warm, tight, pressed against the table. Horn can fire whenever.',
    'She reaches and the middle refuses. Judges mark it. She sits in the refusal like a ranking.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'Galley leftover still in the middle. The table action sits on a warm start.',
  ] },
  { when: {}, text: [
    'She works the table like a body that knows this job.',
    'Crowd is furniture. The belly is the event.',
    'Maya\'s side stays a rumor. This side keeps moving.',
  ] },
]);

registerPool('contest.action.line', [
  { when: { contestAction: 'taunt' }, weight: 3, text: [
    'Maya files the look away. She files another swallow.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'Leftover heat stacked. She treats the next move like seconds.',
  ] },
  { when: {}, text: [
    'A small sound from the cheap seats. She eats the sound.',
    'Palms stay on the new weight like a medal Maya can see.',
    'She reaches again. The reaching is the rest of the argument.',
  ] },
]);

registerPool('contest.action.scene', [
  { when: {}, text: [
    '{contest.action.body} {contest.action.line} {contest.bite.growth}',
    '{contest.action.body} {contest.bite.growth} {contest.action.line}',
    '{contest.bite.growth} {contest.action.body} {contest.action.line}',
  ] },
]);

registerPool('contest.devour.body', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Leftover tray plus both selections. The sweep lands on dough that was already working.',
  ] },
  { when: { contestStage: [3, 4] }, weight: 3, text: [
    'Both sides pulled in. Continuous swallows. Belly presses forward another increment.',
    'Maya stops eating to watch. The table groaning is the scoreboard.',
  ] },
  { when: { contestStage: [5] }, weight: 3, text: [
    'Everything to her side. Item after item. Top rides up. Judges look at each other.',
    'Maya says she just ate everything. The belly agrees in public.',
  ] },
  { when: {}, text: [
    'She sweeps the claimed plates in. Fullness crests, then deepens.',
    'Continuous work. The middle takes a meaningful fraction more at once.',
    'Last piece. Visible forward press. She breathes around the new heaviness.',
  ] },
]);

registerPool('contest.devour.scene', [
  { when: {}, text: [
    '{contest.devour.body} {contest.bite.growth} {contest.action.line}',
    '{contest.devour.body} {contest.action.line} {contest.bite.growth}',
    '{contest.bite.growth} {contest.devour.body} {contest.action.line}',
  ] },
]);

registerPool('contest.weigh.body', [
  { when: {}, text: [
    (ctx) => {
      const gain = Math.round(ctx.globals?.yourGain || 0);
      const mayaG = Math.round(ctx.globals?.mayaGain || 0);
      const mayaL = Math.round((ctx.globals?.mayaLbs || 330) + mayaG);
      const you = Math.round((ctx.subject?.lbs || 0) + gain);
      return `Eating over. Scale next. Judge writes ${you}. Maya steps on. ${mayaL}.`;
    },
    (ctx) => {
      const gain = Math.round(ctx.globals?.yourGain || 0);
      return `She moves to the scale the way she moves at this weight. The number climbs ${gain} from the table.`;
    },
    'Crowd watches the catering wreckage. She takes the platform like it owes her the number.',
  ] },
]);

registerPool('contest.weigh.line', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Kitchen leftover was already in the first number. The table added the rest.',
  ] },
  { when: {}, text: [
    'Maya nods once. The nod is a ranking.',
    'She keeps a palm on the warm middle while the judge writes.',
    'The room is warm. The number is warmer.',
  ] },
]);

registerPool('contest.weigh.scene', [
  { when: {}, text: [
    '{contest.weigh.body} {contest.weigh.line} {contest.afterglow}',
    '{contest.weigh.body} {contest.afterglow} {contest.weigh.line}',
    '{contest.weigh.line} {contest.weigh.body} {contest.afterglow}',
  ] },
]);

registerPool('contest.payoff.body', [
  { when: {}, text: [
    (ctx) => {
      const g = Math.round(ctx.globals?.yourGain || 0);
      return `${g} pounds from the horn to now. Waistband, shirt, chair — all of them filing the same report.`;
    },
    (ctx) => {
      const g = Math.round(ctx.globals?.yourGain || 0);
      return `Payoff sits in the middle: ${g} pounds the table put there. She puts a hand on it.`;
    },
    'She breathes around a body larger than the walk-in. The scale was the errand.',
  ] },
]);

registerPool('contest.payoff.scene', [
  { when: {}, text: [
    '{contest.payoff.body} {contest.afterglow} {contest.linger}',
    '{contest.payoff.body} {contest.linger} {contest.afterglow}',
    '{contest.afterglow} {contest.payoff.body} {contest.linger}',
  ] },
]);
