// wi.* settle / greeting beats after physical arrival
import { registerPool } from '../../engine.js';

registerPool('wi.greeting', [
  { when: { corruption: [0], stageMax: 2 }, text: [
    'She says hello and checks the time.',
    '"Hi," she says, a beat too bright.',
    'She folds her hands in her lap and waits.',
    'There is a composed stillness to her.',
  ] },
  { when: { corruption: [1], stageMax: 4 }, text: [
    '"All right," she says, and that is all.',
    'She nods once. No face at the scale. That is progress.',
    '"Another week," she says. Flat. Familiar.',
    'She exhales once through her nose.',
  ] },
  { when: { corruption: [2] }, text: [
    '"Ready when you are," she says, and she means the scale.',
    '"Let\'s see it," she says, already halfway there.',
    'No preamble. She wants the number.',
    '"Been looking forward to this one," she says warmly.',
  ] },
  { when: { stageMin: 6, corruption: [0] }, text: [
    'She says hello quietly. The office feels smaller.',
    'She sets her bag down and stares at the wall behind you.',
    'She waits by the door a moment, gathering herself.',
  ] },
  { when: { stageMin: 6, corruption: [1, 2] }, text: [
    '"Okay," she says, looking at the scale.',
    'She moves with unhurried certainty.',
    '"Good morning," she says. "Let\'s see where I\'m at."',
  ] },
  { when: {}, text: [
    'She sets her things down and waits for you to begin.',
    'She takes up her usual corner and glances at the scale once.',
    'She drops her bag and looks at the scale.',
  ] },
]);

registerPool('wi.settleAction', [
  { when: { corruption: [2], stageMin: 3 }, text: [
    'She drops her bag and starts toward the scale.',
    'She is already oriented toward the scale before she finishes saying hello.',
    'She pats her middle once, affectionately, on the way.',
  ] },
  { when: { corruption: [0], stageMin: 4 }, text: [
    'She tugs at her hem before she sits.',
    'She picks at a loose thread on her sleeve.',
    'She sits carefully, thighs pressing together.',
  ] },
  { when: {}, text: [
    'She sets her bag beside the desk.',
    'She slips into her usual chair.',
    'She smooths her top over her middle and waits.',
  ] },
]);

registerPool('wi.scaleAttitude', [
  { when: { corruption: [0], stageMax: 3 }, text: [
    'The scale is not the first thing on her mind.',
    'She glances at the scale and then away.',
    'She pretends this is routine.',
  ] },
  { when: { corruption: [1] }, text: [
    'She looks at the scale without flinching. That is new.',
    'She waits, past the stage of making a face at it.',
    'Familiar now — not loved, but known.',
  ] },
  { when: { corruption: [2] }, text: [
    'She looks at the scale like it is the most interesting thing in the room.',
    'She wants the number.',
    'She smiles at the scale like an old friend.',
  ] },
  { when: {}, text: [
    'She waits for you to indicate where to stand.',
    'Her eyes drift to the platform.',
    'The appointment is on her calendar and in the back of her mind.',
  ] },
]);

registerPool('wi.settle', [
  { when: { corruption: [2] }, text: ['{wi.greeting} {wi.scaleAttitude}', '{wi.settleAction} {wi.scaleAttitude}'] },
  { when: {}, text: ['{wi.settleAction} {wi.scaleAttitude}', '{wi.greeting} {wi.scaleAttitude}'] },
]);
