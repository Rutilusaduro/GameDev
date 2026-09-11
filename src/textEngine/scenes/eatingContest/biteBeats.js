// The Squad — Lead: A1 Mobile | Support: A5 Editor
// Contest bites — slot skeleton replacing CONTEST_FOOD_POPUPS as player-facing.
import { registerDimension, registerPool } from '../../engine.js';

registerDimension('contestFood', (ctx) => ctx.globals?.contestFood ?? '');

// Shape: FULL SENTENCE. The plate / take.
registerPool('contest.bite.take', [
  { when: { contestFood: 'hotdogs' }, weight: 4, text: [
    'Warm salt, no ceremony. Three gone before the crowd settles. Belly already asking.',
    'Hot dogs vanish like crackers. She is saving herself and still eating.',
  ] },
  { when: { contestFood: 'wings' }, weight: 4, text: [
    'Sauce everywhere. Bones stacking. She does not look at Maya\'s side.',
    'Seventeen in the time most people eat five. The table never had enough wings.',
  ] },
  { when: { contestFood: 'burger' }, weight: 4, text: [
    'Dense landing. Waistband complains. She loosens her breath and keeps going.',
    'One burger is a brick. She is still building.',
  ] },
  { when: { contestFood: 'pizza' }, weight: 4, text: [
    'Slice by slice, grease on fingers. Competition top rides up. She leaves it.',
    'Pizza fills in layers. She shifts, pushes the table an inch, continues.',
  ] },
  { when: { contestFood: 'ribs' }, weight: 4, text: [
    'Heavy rack. Two hands. Each bone a visible forward press.',
    'Dense fuel. The furnace answers. She eats another rib anyway.',
  ] },
  { when: { contestFood: 'pasta' }, weight: 4, text: [
    'Volume food. She eats aware, not slow. The bowl still empties.',
    'Fabric across the middle tightens. Someone in the cheap seats comments. Last bite anyway.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'Galley leftover still working. The contest plate sits on a warm middle.',
    'Kitchen tray from earlier. Heat food on top. Capacity already argued once.',
  ] },
  { when: {}, text: [
    'The plate goes. Warmth spreads. She is already reaching.',
    'Crowd noise is furniture. The bite is the work.',
    'Maya\'s side stays a rumor. This side is honest emptying.',
  ] },
]);

// Shape: FULL SENTENCE. Growth-as-event at the table.
registerPool('contest.bite.growth', [
  { when: { contestStage: [0, 1] }, weight: 3, text: [
    'First-circuit heat. Belly warm and wanting. The bib still pretends to fit.',
    'Softness arrives in the warmup. She treats it like a ranking she intends to keep.',
  ] },
  { when: { contestStage: [2, 3] }, weight: 3, text: [
    'The table edge learns her. Fullness is a score she can feel.',
    'Chair reports the new weight. She files another swallow.',
  ] },
  { when: { contestStage: [4, 5] }, weight: 3, text: [
    'Architectural belly. The lane belongs to it. Food is only more of the same arrival.',
    'Getting her sat was the opening. Standing can wait until the board.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'Leftover heat stacked. Softness arrives faster than the clock.',
  ] },
  { when: {}, text: [
    'Heat after the swallow. Hips, belly, breath. She catalogs and continues.',
    'The food is gone. The softness is not. Palms stay on the new weight.',
    'Growth happens between plates. She keeps a hand on it like a medal.',
  ] },
]);

// Shape: DIALOGUE BEAT / close.
registerPool('contest.bite.line', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Maya glances once. "You came in already fed," the glance says. She eats the glance.',
  ] },
  { when: {}, text: [
    'Sauce on a wrist. She licks it like it counts. It does.',
    'Maya writes a number. She writes a swallow.',
    'A small sound of satisfaction. The table heard it too.',
  ] },
]);

registerPool('contest.bite.scene', [
  { when: {}, text: [
    '{contest.bite.take} {contest.bite.growth} {contest.bite.line}',
    '{contest.bite.take} {contest.bite.line} {contest.bite.growth}',
    '{contest.bite.growth} {contest.bite.take} {contest.bite.line}',
  ] },
]);
