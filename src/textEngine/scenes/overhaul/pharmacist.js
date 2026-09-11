// The Squad — Lead: A5 Editor | Support: A2 Psych
// Slot-composed pharmacist acquisition flavor. Prefer over leftover action.flavor.
import { registerPool, registerDimension, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';

registerDimension('acquireAction', (ctx) => ctx.globals?.acquireAction ?? '');
registerDimension('compoundId', (ctx) => ctx.globals?.compoundId ?? '');
registerDimension('cultRoute', (ctx) => ctx.globals?.cultRoute ?? '');

registerPool('pharmacist.acquire.scene', [
  { when: {}, text: [
    '{pharmacist.acquire.setup} {pharmacist.acquire.body}',
    '{pharmacist.acquire.body} {pharmacist.acquire.setup}',
    '{pharmacist.acquire.setup}',
  ]},
]);

registerPool('pharmacist.acquire.setup', [
  { when: {}, text: [
    'Sophia works the stock like a second job that already won.',
    'Badge, tote, a quiet count. The floor will taste this later.',
    'She logs enough to look honest. The extra goes home with her.',
  ]},
  { when: { acquireAction: 'shift_stock' }, weight: 4, text: [
    'Minimum logged. Gloves on. Eyes down. By the book, for now.',
  ]},
  { when: { acquireAction: 'pocket_precursors' }, weight: 4, text: [
    'Two amber bottles into the tote while the shift lead is on break.',
  ]},
  { when: { acquireAction: 'kitchen_extract' }, weight: 4, text: [
    'Leftover frosting and a measuring cup. Science, she says, and means the swallow.',
  ]},
  { when: { acquireAction: 'lounge_grant' }, weight: 4, text: [
    'The receipt says lounge programming. The bag says otherwise.',
  ]},
  { when: { acquireAction: 'campus_sampling' }, weight: 4, text: [
    'Free samples at the union. Lines. Everyone leaves with appetite. She leaves with stock.',
  ]},
  { when: { acquireAction: 'mass_sampling' }, weight: 4, text: [
    'Three buildings. One weekend. Portions that do not end. She watches strangers soften.',
  ]},
]);

registerPool('pharmacist.acquire.body', [
  { when: {}, text: [
    '{word.size} of her makes the lab stool honest. Soft heat. The vials will travel.',
    'She pockets the surplus the way the floor pockets seconds. Quiet. Certain.',
    'The tote is heavier. The floor will be too. She does not write that part down.',
  ]},
]);

function prefer(poolKey, ctx) {
  const line = render(`{${poolKey}}`, ctx)?.trim();
  if (line && !line.includes('{unresolved}')) return line;
  return '';
}

export function renderPharmacistAcquire(actionId, student, week = 1) {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { featureId: 'pharmacist', acquireAction: actionId || '' },
  });
  return prefer('pharmacist.acquire.scene', ctx);
}

registerPool('pharmacist.compound.scene', [
  { when: {}, text: [
    '{pharmacist.compound.setup} {pharmacist.compound.body}',
    '{pharmacist.compound.body} {pharmacist.compound.setup}',
    '{pharmacist.compound.setup}',
  ]},
]);

registerPool('pharmacist.compound.setup', [
  { when: {}, text: [
    'Sophia laces the meal like a second recipe. Quiet. Measured. Already working.',
    'A drop in the portion. The floor will taste it later. {subject.name} tastes it now.',
    'The vial is small. The extra it asks for is not.',
  ]},
  { when: { compoundId: 'appetite_stimulant' }, weight: 4, text: [
    'Edge off. Seconds arrive without a decision. She reaches anyway.',
  ]},
  { when: { compoundId: 'mild_pleasure' }, weight: 4, text: [
    'Warmth on the swallow. Food lands like a compliment she can eat.',
  ]},
  { when: { compoundId: 'metabolic_slowdown' }, weight: 4, text: [
    'What she eats stays. The body files it slower, thicker, on purpose.',
  ]},
  { when: { compoundId: 'weight_gain_potion' }, weight: 4, text: [
    'The scale moves on the swallow. Immediate. Visible. Stomach still catching up.',
  ]},
  { when: { compoundId: 'strong_appetite' }, weight: 4, text: [
    'Aggressive hunger. She eats well past the old stop and does not notice the stop left.',
  ]},
  { when: { compoundId: 'high_pleasure' }, weight: 4, text: [
    'Eating feels expensive in the best way. She might get desperate for that feeling.',
  ]},
  { when: { compoundId: 'digestion_supplement' }, weight: 4, text: [
    'After a big meal it goes straight to her. Fast. Almost a show.',
  ]},
  { when: { compoundId: 'craving_inducer' }, weight: 4, text: [
    'Mean. She is hungry even when the plate is gone. She looks at you for the next one.',
  ]},
  { when: { compoundId: 'sensitivity_serum' }, weight: 4, text: [
    'Touch, pressure, fullness. Everything hits harder. Overwhelming in a good way.',
  ]},
  { when: { compoundId: 'intentional_addiction' }, weight: 4, text: [
    'Made to make her need it. The food. The feeling. You.',
  ]},
  { when: { compoundId: 'loyalty_enhancer' }, weight: 4, text: [
    'Attached. Not only to food. To who is giving it.',
  ]},
  { when: { compoundId: 'rapid_expansion' }, weight: 4, text: [
    'Big gains fast. Not subtle. She watches the extra arrive in real time.',
  ]},
  { when: { compoundId: 'addiction_cure' }, weight: 4, text: [
    'Need eases to a milder hum. She can breathe. She is still a little hungry.',
  ]},
  { when: { compoundId: 'cult_appetite' }, weight: 4, text: [
    'She will eat for you until obedience feels like relief. Aggressive and attached.',
  ]},
  { when: { compoundId: 'cult_pleasure' }, weight: 4, text: [
    'Pleasure and loyalty merge. Fullness feels like belonging to the circle.',
  ]},
  { when: { compoundId: 'dependency_maintenance' }, weight: 4, text: [
    'Keeps her needy. Always a little hungry. Always thinking about your food.',
  ]},
]);

registerPool('pharmacist.compound.body', [
  { when: {}, text: [
    '{word.size} of her takes the dose like a second course. Soft heat. The extra filing itself.',
    'She swallows. The meal was already winning. This makes the win stay.',
    'The tote was heavier. Now she is. Sophia does not write that part down.',
  ]},
]);

registerPool('pharmacist.cult.scene', [
  { when: {}, text: [
    '{pharmacist.cult.setup} {pharmacist.cult.body}',
    '{pharmacist.cult.body} {pharmacist.cult.setup}',
    '{pharmacist.cult.setup}',
  ]},
]);

registerPool('pharmacist.cult.setup', [
  { when: {}, text: [
    'Sophia routes the week\'s supply like a kindness with a recipe underneath.',
    'Wellness stickers. Portions that say otherwise. The circle leaves softer.',
    'Devotees collect. She counts tubs. The floor will feel it by evening.',
  ]},
  { when: { cultRoute: 'circle_pickup' }, weight: 4, text: [
    'They collect in person. Heavier each week. Grateful. She labels tubs and looks away from the lean.',
  ]},
  { when: { cultRoute: 'dorm_captains' }, weight: 4, text: [
    'Stairwell handoff. Three residents who love the product. Crates. By evening the floor looks well-fed.',
  ]},
  { when: { cultRoute: 'union_bulk' }, weight: 4, text: [
    'Rolling cart. Unmarked tubs. A sign that says wellness samples. Twenty minutes later the union smells like vanilla.',
  ]},
  { when: { cultRoute: 'loyalty_tithe' }, weight: 4, text: [
    'Cash, chemicals, Tupperware of dinner they could not finish. She accepts all of it.',
  ]},
  { when: { cultRoute: 'floor_tasting' }, weight: 4, text: [
    'Tasting cart in the kitchen. Stickers say wellness. Residents leave softer and vague about the recipe.',
  ]},
  { when: { cultRoute: 'lounge_circle' }, weight: 4, text: [
    'Wide chairs. They do not get up. Tubs on the side table. The lounge smells like vanilla and agreement.',
  ]},
]);

registerPool('pharmacist.cult.body', [
  { when: {}, text: [
    'The area gets fatter when distribution runs. She files that as a feature.',
    'Softness stays. Appetite travels. Sophia writes thank-you notes she does not mean.',
    'Circle, supply, devotion. The extra of the floor is the receipt.',
  ]},
]);

export function renderPharmacistCompound(compoundId, student, week = 1) {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { featureId: 'pharmacist', compoundId: compoundId || '' },
  });
  return prefer('pharmacist.compound.scene', ctx);
}

export function renderPharmacistCult(routeId, student, week = 1) {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { featureId: 'pharmacist', cultRoute: routeId || '' },
  });
  return prefer('pharmacist.cult.scene', ctx);
}
