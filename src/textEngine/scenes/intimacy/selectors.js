// The Squad — Lead: A2 Psych | Support: A7 Artisan
// §9c selector overlays — mood/season inflection for intimacy surfaces.
import { registerPool } from '../../engine.js';

registerPool('intimacy.moodTone', [
  { when: { mood: ['happy', 'excited', 'cheerful'] }, weight: 2, text: [
    'She laughs softly against your shoulder — unguarded, warm.',
    'Good humor threads through touch; she cannot hide how pleased she is.',
    'Bright mood makes her body feel lighter even as it presses close.',
  ] },
  { when: { mood: ['content', 'warm', 'bemused'] }, weight: 2, text: [
    'Contentment hums between you — slow, sure, present.',
    'Warmth in her voice when she speaks; warmth in every point of contact.',
  ] },
  { when: { mood: ['stressed', 'nervous'] }, weight: 2, text: [
    'Nervous energy converts to heat — she trembles, then melts.',
    'Stress loosens under your hands; she breathes easier against you.',
  ] },
  { when: { mood: ['tired'] }, text: [
    'Tired but unwilling to leave — she sinks into you like rest.',
    'Fatigue makes her pliant; she lets you guide the pace.',
  ] },
  { when: {}, text: [
    '',
    'Touch speaks louder than mood tonight.',
    'The room holds its breath between you.',
  ] },
]);
registerPool('intimacy.seasonAmbience', [
  { when: { season: ['winter'] }, weight: 2, text: [
    'Winter cold outside; her body furnaces the room.',
    'She presses close for heat — skin, fabric, shared warmth.',
  ] },
  { when: { season: ['summer'] }, weight: 2, text: [
    'Summer air heavy; perspiration and skin, appetite for closeness.',
    'Heat outside mirrors heat between you — languid, unhurried.',
  ] },
  { when: { season: ['fall'] }, text: [
    'Fall darkness early; the room feels private, enclosed.',
  ] },
  { when: { season: ['spring'] }, text: [
    'Spring air through cracked windows — renewal in how she touches you.',
  ] },
  { when: {}, text: [
    '',
    'The season lingers at the edges — distant, unimportant.',
    'Weather outside; warmth between you.',
  ] },
]);
registerPool('intimacy.relOverlay', [
  { when: { relTier: [4] }, weight: 3, text: [
    'She moves like she belongs here — no performance left.',
    'Devotion in every surrender; she trusts your hands completely.',
  ] },
  { when: { relTier: [3] }, weight: 2, text: [
    'Affection open now — she meets you without holding back.',
    'The intimacy of someone who has chosen you, again and again.',
  ] },
  { when: { relTier: [1] }, weight: 2, text: [
    'Still new — curiosity and nerves braided together.',
    'She tests the water, then dives deeper than she meant to.',
  ] },
  { when: {}, text: [
    '',
    'Closeness needs no commentary tonight.',
    'She stays near — present, unhurried.',
  ] },
]);

registerPool('intimacy.selectorOverlay', [
  { when: { relTier: [3, 4], mood: ['warm', 'content', 'happy'] }, weight: 3, text: [
    '{intimacy.relOverlay} {intimacy.moodTone}',
  ] },
  { when: { season: ['winter', 'summer'] }, weight: 2, text: [
    '{intimacy.seasonAmbience} {intimacy.moodTone}',
  ] },
  { when: { campusFattening: true }, weight: 2, text: [
    '{intimacy.campusNote} {intimacy.moodTone}',
  ] },
  { when: {}, text: [
    '{intimacy.moodTone}',
    '{intimacy.seasonAmbience}',
    '{intimacy.relOverlay}',
    '{intimacy.campusNote}',
    '{intimacy.relSizeNote}',
    '',
  ] },
]);

registerPool('intimacy.campusNote', [
  { when: { campusFattening: true }, weight: 2, text: [
    'The campus feels indulgent lately — closeness comes easier, restraint thinner.',
    'Something in the air encourages appetite; she surrenders to touch and heat.',
  ] },
  { when: {}, text: [
    '',
    'Campus fades; only warmth between you matters.',
    'The world outside can wait.',
  ] },
]);

registerPool('intimacy.relSizeNote', [
  { when: { relSize: ['muchLarger', 'larger'] }, weight: 2, text: [
    'Your size frames the moment — she presses into you like shelter.',
    'She notices how much of you there is to hold onto.',
  ] },
  { when: { relSize: ['smaller', 'muchSmaller'] }, weight: 2, text: [
    'She takes up the space between you — soft, heavy, unmistakable.',
  ] },
  { when: {}, text: [
    '',
    'Size is part of the intimacy — unspoken, felt.',
    'Bodies meet at their true scale.',
  ] },
]);

registerPool('intimacy.skillNote', [
  { when: { skill: ['mesmerizing_aura'] }, weight: 2, text: [
    'She follows your lead without thinking — your suggestion becomes her want.',
  ] },
  { when: { skill: ['growth_hunger', 'endless_hunger'] }, weight: 2, text: [
    'Hunger and heat braid together under your influence.',
  ] },
  { when: {}, text: [
    '',
    'Want sharpens under your influence.',
    'Heat and appetite braid together.',
  ] },
]);
