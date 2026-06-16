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

registerPool('dinner.selectorOverlay', [
  { when: { relationship: [3, 4], mood: ['happy', 'warm', 'content'] }, weight: 3, text: [
    '{dinner.relWarmth} {dinner.moodTone}',
    '{dinner.moodTone} {dinner.relWarmth}',
  ] },
  { when: { season: ['winter', 'summer'] }, weight: 2, text: [
    '{dinner.seasonAmbience} {dinner.moodTone}',
    '{dinner.seasonAmbience}',
  ] },
  { when: {}, text: [
    '{dinner.moodTone}',
    '{dinner.seasonAmbience}',
    '{dinner.relWarmth}',
    '',
  ] },
]);
