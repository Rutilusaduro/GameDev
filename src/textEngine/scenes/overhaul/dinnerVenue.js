// The Squad — Lead: A5 Editor | Support: A1 Mobile, A6 Slender
// Slot-composed dinner venue arrive. Prefer over leftover DINNER_VENUES.desc.
import { registerPool, registerDimension, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';

registerDimension('venueId', (ctx) => ctx.globals?.venueId ?? '');

registerPool('dinner.arrive.scene', [
  { when: {}, text: [
    '{dinner.arrive.setup} {dinner.arrive.body}',
    '{dinner.arrive.body} {dinner.arrive.setup}',
    '{dinner.arrive.setup}',
  ]},
]);

registerPool('dinner.arrive.setup', [
  { when: {}, text: [
    'The host seats you. Bread already on the table. {subject.name} notices first.',
    'Warm light, a menu that assumes hunger. {subject.name} sits like the chair expected her.',
    'You arrive. Plates wait. {subject.name} unwraps her appetite with her coat.',
  ]},
  { when: { venueId: 'bistro' }, weight: 5, text: [
    'Campus bistro. Close tables, good portions, a booth that remembers last week.',
  ]},
  { when: { venueId: 'italian' }, weight: 5, text: [
    'Rosetti\'s. Courses keep coming. {subject.name} already knows she will not say stop.',
  ]},
  { when: { venueId: 'steakhouse' }, weight: 5, text: [
    'The Grill Room. Portions arrive like architecture. {subject.name} looks pleased.',
  ]},
  { when: { venueId: 'french' }, weight: 5, text: [
    'Maison Laurent. Multiple courses, chef\'s feelings involved. {subject.name} settles in.',
  ]},
  { when: { venueId: 'omakase' }, weight: 5, text: [
    'Nakamura. The chef decides. Many courses. All of them large.',
  ]},
  { when: { venueId: 'private_club' }, weight: 5, text: [
    'The Meridian. Member dining. Generous here means extraordinary.',
  ]},
  { when: { venueId: 'chefs_table' }, weight: 5, text: [
    'Chef\'s table. Cooked for her specifically. Already excessive.',
  ]},
  { when: { venueId: 'home_dinner' }, weight: 5, text: [
    'Your kitchen. No limit on how much you make. {subject.name} knows it.',
  ]},
  { when: { venueId: 'brunch_hall' }, weight: 5, text: [
    'Brunch Palace. Bottomless plates. No concept of portion control.',
  ]},
  { when: { venueId: 'atelier' }, weight: 5, text: [
    'The Atelier. Custom seating. The chef comes to her.',
  ]},
  { when: { venueId: 'her_room' }, weight: 5, text: [
    'Her room. She is here, warm, waiting. She knew you were coming.',
  ]},
  { when: { venueId: 'sanctum' }, weight: 5, text: [
    'Golden light. She sits at the centre of it, vast and immovable.',
  ]},
  { when: { venueId: 'void_chamber' }, weight: 5, text: [
    'Cold and still. She waits in the dark. Food arrives. She accepts it.',
  ]},
  { when: { venueId: 'fever_room' }, weight: 5, text: [
    'The room runs hot. She is flushed and hungry. Heat reaches you first.',
  ]},
  { when: { venueId: 'root_hall' }, weight: 5, text: [
    'Turned earth. She sits vast and still, watching the door.',
  ]},
  { when: { venueId: 'convergence_point' }, weight: 5, text: [
    'Copper and deep soil. The floor is cracked around her. Tribute time.',
  ]},
]);

registerPool('dinner.arrive.body', [
  { when: {}, text: [
    '{word.size} of her takes the booth first. Soft heat. Appetite wearing a dining face.',
    'She reads the menu like a dare she already won.',
    'The extra of her finds the chair. The kitchen will have to keep up.',
  ]},
  { when: { stageMin: 6 }, weight: 2, text: [
    'She chose the wider seat without asking. Experience, not vanity.',
  ]},
]);

function prefer(poolKey, ctx) {
  const line = render(`{${poolKey}}`, ctx)?.trim();
  if (line && !line.includes('{unresolved}')) return line;
  return '';
}

export function renderDinnerArrive(venue, student, week = 1) {
  const venueId = typeof venue === 'string' ? venue : (venue?.id || 'bistro');
  const subject = student || { id: 0, name: 'She', lbs: 140, startLbs: 118 };
  return prefer('dinner.arrive.scene', buildTextContext({
    subject,
    week,
    globals: { featureId: 'dinner', venueId },
  }));
}
