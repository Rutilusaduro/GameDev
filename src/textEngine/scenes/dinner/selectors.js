// The Squad — Lead: A1 Mobile | Support: A2 Psych
// §9c selector overlays — mood/season/relationship inflection for dinner surfaces.
import { registerPool } from '../../engine.js';

// Shape: CLAUSE — mood-colored table atmosphere.
registerPool('dinner.moodTone', [
  { when: { mood: ['happy', 'excited', 'cheerful'] }, weight: 2, text: [
    'Laughter comes easy between courses.',
    'Good humor seasons every plate.',
    'She glows in the candlelight — appetite and mood aligned.',
  ] },
  { when: { mood: ['content', 'warm', 'bemused'] }, weight: 2, text: [
    'The evening unhurried, comfortable.',
    'Quiet pleasure sits at the table with you.',
    'Warmth in her voice matches the room.',
  ] },
  { when: { mood: ['stressed', 'nervous'] }, weight: 2, text: [
    'She picks at garnish first, then surrenders to hunger.',
    'Tension eases with the second glass — food helps.',
    'Nervous energy melts into appetite by dessert.',
  ] },
  { when: { mood: ['tired'] }, text: [
    'She eats slowly, grateful for the chair.',
    'Fatigue makes every bite feel earned.',
  ] },
  { when: {}, text: [''] },
]);

// Shape: CLAUSE — seasonal ambience.
registerPool('dinner.seasonAmbience', [
  { when: { season: ['winter'] }, weight: 2, text: [
    'Cold outside; the restaurant feels like shelter.',
    'Winter air sharp through the door — inside, warmth and butter.',
    'She sheds her coat and stays close to the heat.',
  ] },
  { when: { season: ['summer'] }, weight: 2, text: [
    'Evening light lingers; the patio hums with summer appetite.',
    'Heat outside, cool wine inside — she drinks and eats with abandon.',
    'Summer makes every course taste like vacation.',
  ] },
  { when: { season: ['spring'] }, weight: 2, text: [
    'Spring air through cracked windows; appetite feels renewed.',
    'Something light in the season — she orders generously anyway.',
  ] },
  { when: { season: ['fall'] }, weight: 2, text: [
    'Fall settles into the room — rich sauces, heavier plates, no regrets.',
    'Leaves turn outside; inside, she leans into comfort food.',
  ] },
  { when: {}, text: [''] },
]);

// Shape: CLAUSE — relationship warmth at the table.
registerPool('dinner.relWarmth', [
  { when: { relationship: [4] }, weight: 3, text: [
    'Her hand finds yours between courses — familiar, claiming.',
    'She eats like someone who trusts you to keep feeding her.',
    'Devotion shows in how she lets you order for her.',
  ] },
  { when: { relationship: [3] }, weight: 2, text: [
    'Eye contact holds longer than the menu requires.',
    'She leans in when you speak — already yours in small ways.',
  ] },
  { when: { relationship: [1] }, weight: 2, text: [
    'Polite distance still — but appetite bridges the gap.',
    'First-date nerves soften as the bread basket empties.',
  ] },
  { when: { relationship: [2] }, text: [
    'Comfortable enough to eat without performing restraint.',
    'Familiar rhythm — you know what she likes; she lets you choose.',
  ] },
  { when: {}, text: [''] },
]);

registerPool('dinner.leftoverHeat', [
  { when: { leftoverFed: true, stageMax: 4 }, weight: 3, text: [
    'Galley leftover still in her. This sitting is the dressed-up second.',
    'Foil from earlier, then a menu. She treats both as one appetite.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'Last night\'s tray is still warm under the restaurant butter.',
    'Kitchen heat plus this table. She orders like the hall already started her.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'You walked her floor after hours. Dinner is that knock in nicer clothes.',
  ] },
  { when: {}, text: [
    'The table holds more of her than the menu admits.',
    'She orders like the evening is a continuation.',
    'Appetite arrives before the first course.',
  ] },
]);

registerPool('dinner.selectorOverlay', [
  { when: { leftoverFed: true }, priority: 4, weight: 3, text: [
    '{dinner.leftoverHeat} {dinner.moodTone}',
    '{dinner.leftoverHeat} {dinner.relWarmth}',
    '{dinner.leftoverHeat}',
  ] },
  { when: { relationship: [3, 4], mood: ['happy', 'warm', 'content'] }, weight: 3, text: [
    '{dinner.relWarmth} {dinner.moodTone}',
    '{dinner.moodTone} {dinner.relWarmth}',
  ] },
  { when: { season: ['winter', 'summer'] }, weight: 2, text: [
    '{dinner.seasonAmbience} {dinner.moodTone}',
    '{dinner.seasonAmbience}',
  ] },
  { when: { campusFattening: true }, weight: 2, text: [
    '{dinner.campusNote} {dinner.moodTone}',
    '{dinner.campusNote}',
  ] },
  { when: {}, text: [
    '{dinner.moodTone}',
    '{dinner.seasonAmbience}',
    '{dinner.relWarmth}',
    '{dinner.campusNote}',
    '',
  ] },
]);

// Shape: CLAUSE — campus saturation softens restraint at the table.
registerPool('dinner.campusNote', [
  { when: { campusFattening: true }, weight: 3, text: [
    'The campus runs indulgent lately — portions feel larger, excuses thinner.',
    'Everyone eats more openly now; {subject.first} follows the current without shame.',
    'Something in the air encourages appetite; dinner feels like permission.',
  ] },
  { when: {}, text: [''] },
]);

// Shape: CLAUSE — size contrast when a reference character is present.
registerPool('dinner.relSizeNote', [
  { when: { relSize: ['muchLarger', 'larger'] }, weight: 2, text: [
    'She watches how much more room you take at the table — and eats accordingly.',
    'Your size sets the tone; she matches your appetite without comment.',
  ] },
  { when: { relSize: ['smaller', 'muchSmaller'] }, weight: 2, text: [
    'She fills more of the booth than you do tonight — a fact neither of you ignores.',
    'Her body claims the space; you keep the courses coming.',
  ] },
  { when: {}, text: [''] },
]);

// Shape: CLAUSE — hall-skill flavor at feeding sessions.
registerPool('dinner.skillNote', [
  { when: { skill: ['growth_hunger', 'endless_hunger'] }, weight: 3, text: [
    'Your influence hums under the meal — appetite answers before she thinks.',
    'Hunger feels directed tonight, as if the room itself encourages another bite.',
  ] },
  { when: { skill: ['mesmerizing_aura'] }, weight: 2, text: [
    'She follows your lead at the table — eyes on you, fork moving when you suggest it.',
  ] },
  { when: {}, text: [''] },
]);
