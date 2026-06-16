// The Squad — Lead: A1 Mobile | Support: A2 Psych
// §9c selector overlays — mood/season/relationship inflection for session beats.
import { registerPool } from '../../engine.js';

registerPool('session.moodTone', [
  { when: { mood: ['happy', 'excited', 'cheerful'] }, weight: 2, text: [
    'She hums between bites — pleasure audible.',
    'Good mood makes her eat faster, looser, happier.',
    'Laughter punctuates the meal; appetite follows.',
  ] },
  { when: { mood: ['content', 'warm'] }, weight: 2, text: [
    'Contentment pools with fullness — she looks at ease.',
    'Warm and unhurried; every bite feels like belonging.',
  ] },
  { when: { mood: ['stressed', 'nervous'] }, weight: 2, text: [
    'Stress melts into appetite — food as comfort, not apology.',
    'She eats through the week she is carrying; fork steady.',
  ] },
  { when: { mood: ['tired'] }, text: [
    'Tired but eating anyway — hunger outlasts fatigue.',
    'She yawns between bites and does not stop.',
  ] },
  { when: {}, text: [''] },
]);

registerPool('session.seasonNote', [
  { when: { season: ['winter'] }, weight: 2, text: [
    'Winter cold outside makes the warm kitchen feel like sanctuary.',
    'She gravitates toward rich food — season and appetite agree.',
  ] },
  { when: { season: ['summer'] }, weight: 2, text: [
    'Summer heat slows her; cold drinks and heavy plates anyway.',
    'Long daylight; she eats like the evening will not end.',
  ] },
  { when: { season: ['fall'] }, text: [
    'Fall comfort food — she leans into every calorie.',
  ] },
  { when: { season: ['spring'] }, text: [
    'Spring renewal does not mean restraint — she proves it forkful by forkful.',
  ] },
  { when: {}, text: [''] },
]);

registerPool('session.relWarmth', [
  { when: { relationship: [4] }, weight: 3, text: [
    'She eats for you as much as for herself — devotion in every swallow.',
    'Trust shows in how she lets you keep serving.',
  ] },
  { when: { relationship: [3] }, weight: 2, text: [
    'Affection threads through the meal — glances, soft sounds, surrender.',
    'She looks to you between bites, checking that you are pleased.',
  ] },
  { when: { relationship: [1, 2] }, text: [
    'Still finding the rhythm — but appetite bridges hesitation.',
    'Comfort grows with fullness; walls come down plate by plate.',
  ] },
  { when: {}, text: [''] },
]);

registerPool('session.selectorOverlay', [
  { when: { relationship: [3, 4], fullnessMin: 0.7 }, weight: 3, text: [
    '{session.relWarmth} {session.moodTone}',
  ] },
  { when: { season: ['winter', 'summer'] }, weight: 2, text: [
    '{session.seasonNote} {session.moodTone}',
  ] },
  { when: {}, text: [
    '{session.moodTone}',
    '{session.seasonNote}',
    '{session.relWarmth}',
    '',
  ] },
]);
