// The Squad — Lead: A5 Editor | Support: A2 Psych
// Slot-composed pharmacist acquisition flavor. Prefer over leftover action.flavor.
import { registerPool, registerDimension, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';

registerDimension('acquireAction', (ctx) => ctx.globals?.acquireAction ?? '');

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
