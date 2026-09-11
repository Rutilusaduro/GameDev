// The Squad — Lead: A3 Immobility | Support: A5 Editor
// leftoverFed extras after registerPool in fragments/visits.
// leftoverFed+stageMin:10 weight 3 so studentId+stage personas (weight 4, two keys) still win.
import { registerPool, registerModuleVariants } from '../../engine.js';

registerPool('immob.linger', [
  { when: { leftoverFed: true, stageMin: 10 }, weight: 3, text: [
    'Galley leftover already in her. Dinner coming to the room is just the second sitting.',
    'Last night\'s tray still warm in the mass you would have walked to a restaurant.',
    'She is where the kitchen left her. You bring the bag. She does not stand.',
  ] },
  { when: { nightVisit: true, stageMin: 10 }, weight: 3, text: [
    'You knocked after hours. She is still where you left her, hungrier and more sure.',
    'Night-round heat in the doorway. The restaurant was never going to happen.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'Leftover heat. You bring dinner to the body that already started.',
  ] },
  { when: {}, text: [
    'You bring the food to where she already is.',
    'Transit cancelled. Appetite still on the clock.',
    'The room holds her. You hold the bag.',
  ] },
]);

registerModuleVariants('immob.settledState', [
  { when: { leftoverFed: true, stageMin: 10, stageMax: 10 }, weight: 3, text: [
    '{subject.name} has settled around last night\'s tray — vast, warm, going nowhere, still a little hungry.',
    'Galley leftover lives in the mass she has become. The room holds both.',
    'She rests on leftover heat. Movement was already optional. Dinner made it a joke.',
  ] },
  { when: { leftoverFed: true, stageMin: 11 }, weight: 3, text: [
    'Leftover warmth is architecture now — {subject.name} the room\'s center, the tray already part of her.',
    'She is the furniture last night\'s kitchen filled. Stillness with an appetite.',
    'Second sitting arrives where she is. She has not moved. She does not need to.',
  ] },
]);

registerModuleVariants('immob.environmental', [
  { when: { leftoverFed: true, stageMin: 10 }, weight: 3, text: [
    'Foil-crinkle memory in the air. The floor already knows the extra weight.',
    'Warmth from leftover and from her, the same slow temperature.',
    'The room smells like a second sitting that never left.',
  ] },
]);

registerModuleVariants('immob.register', [
  { when: { leftoverFed: true, stageMin: 10 }, weight: 3, text: [
    `"Bring it here," she says. "I already ate. I can eat again."`,
    `"The kitchen found me first," she murmurs. "You're just catching up."`,
    `"Leave the bag where I can reach. I'm not performing a commute."`,
  ] },
]);

// leftoverFed one key, weight 2 so refArchetype visits still pool.
registerModuleVariants('immob.visit', [
  { when: { leftoverFed: true }, weight: 2, text: [
    `{ref.name} arrives to a room that already smells like a second sitting. {subject.name} receives the visit and the next plate with the same unhurried hand.`,
    `Court and leftover share the afternoon. {ref.name} talks. {subject.name} eats. Neither of them stands.`,
    `{ref.name} finds {subject.name} still working last night's tray. Gossip lands between bites.`,
  ] },
]);
