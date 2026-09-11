// The Squad — Lead: A2 Psych | Support: A1 Mobile, A5 Editor
// NPC reaction pools — campus observers and RA voice.
import { registerPool } from '../engine.js';

registerPool('npc.bystander', [
  { when: {}, text: [
    'Someone glances, looks away, glances again.',
    'A passing resident registers her size and recalibrates their path.',
  ] },
  { when: { leftoverFed: true, stageMin: 6 }, weight: 3, text: [
    'Someone clocks the leftover-soft middle and pretends they were looking at a poster.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'A passerby notes she is still eating last night in public.',
    'Someone glances at the leftover roundness and keeps walking too carefully.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'Hall gossip already has the knock. Daylight just confirms the outline.',
  ] },
  { when: { stageMin: 6, campusLocale: 'hallway' }, text: [
    'Foot traffic parts — not unkindly, simply spatially.',
    'A whispered comment she pretends not to hear.',
  ] },
  { when: { stageMin: 8 }, text: [
    'The hallway goes quieter as she passes. Sound precedes her.',
    'Bystanders make room the way you make room for weather.',
  ] },
  { when: { stageMin: 10 }, text: [
    'People stop pretending not to look. At this scale, looking is honesty.',
    'The corridor reorganizes around her passage.',
  ] },
]);

registerPool('npc.peer', [
  { when: {}, text: [
    'A resident nods — familiar, noncommittal.',
    'Someone she knows offers a smile that does not quite reach their eyes.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'A floor-mate clocks leftover roundness and pretends the greeting is about class.',
    '"You look... fed," someone says, then laughs like it was a joke.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'Someone who heard the knock last night looks at her middle first.',
  ] },
  { when: { relationship: [2, 3], stageMin: 5 }, text: [
    'A friend squeezes her arm — affectionate, unsurprised by the size of it.',
    '"You\'re looking well," someone says, and means it.',
  ] },
  { when: { stageMin: 7 }, text: [
    '"Girl," a teammate says, "you are not the same person from September."',
    'A peer stares openly. She stares back. That ends it.',
  ] },
]);

registerPool('npc.coach', [
  { when: {}, text: [''] },
  { when: { stageMin: 4, archetype: 'athlete' }, text: [
    `"Coach would lose his mind," she says — but she does not sound worried.`,
  ] },
  { when: { stageMin: 6, corruption: [2] }, text: [
    `"I'm off the team," she says. "Best thing that happened to me."`,
  ] },
]);

registerPool('npc.staff', [
  { when: {}, text: [''] },
  { when: { campusLocale: 'cafeteria', stageMin: 5 }, text: [
    'The cafeteria worker loads her tray without comment. They have seen this before.',
    'Staff refills her plate before she asks. Habit, not judgment.',
  ] },
  { when: { stageMin: 8 }, text: [
    'Campus staff have learned her — which doors, which portions, which chairs.',
  ] },
]);

registerPool('ra.observation', [
  { when: {}, text: [
    'You note the change without saying it aloud.',
    'The numbers tell one story. Her presence tells another.',
  ] },
  { when: { relationship: [0, 1], stageMin: 5 }, text: [
    'You observe clinically — data accumulating, relationship still formal.',
    'Detached assessment: she is larger than last month. The trend continues.',
  ] },
  { when: { relationship: [2, 3], stageMin: 5 }, text: [
    'You watch her with the fondness of someone who has been waiting for this.',
    'Confirmation, not surprise — she is becoming what you hoped.',
  ] },
  { when: { corruption: [2], stageMin: 6 }, text: [
    'She wants this. You can see it in how she moves, how she eats, how she waits for the number.',
    'The project is succeeding. She is succeeding.',
  ] },
  { when: { stageMin: 10 }, text: [
    'At this scale, observation is architectural. She is the room\'s primary feature.',
    'Immobility is not failure. It is arrival.',
  ] },
]);
