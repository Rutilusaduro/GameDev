// The Squad — Lead: A4 Architect | Support: A5 Editor
// Hall blueprint install + Atmosphere Weave pulse prose.
import { registerPool } from '../../engine.js';

registerPool('hallBlueprint.installBeat', [
  { when: {}, text: [
    'You sign the work order and the hall shifts — not dramatically, but definitely. Residents feel it before they name it.',
    'Contractors vanish by morning; what remains is warmer air, better light, and the quiet promise of more room to grow.',
    'The upgrade lands like a held breath releasing — furniture, stock, permission, all of it settling into place.',
  ]},
  { when: { corruptionMin: 1 }, weight: 2, text: [
    'The renovation finishes and appetite follows architecture — softer edges, closer chairs, fewer reasons to stop.',
    'Something in the lounge loosens; {subject.first} will not articulate it, but her body will notice tonight.',
  ]},
]);

registerPool('hallBlueprint.synergyUnlock', [
  { when: {}, text: [
    'Two rooms hum in the same register now — scent, sound, and surplus aligned down the hall.',
    'A synergy clicks: kitchen warmth meets lounge stillness, and the floor learns a new rhythm of yes.',
    'Walls do not move, but the air between rooms does — appetite travels faster when architecture agrees.',
  ]},
]);

registerPool('hallBlueprint.weavePulse', [
  { when: {}, text: [
    'The Atmosphere Weave peaks — air thick with butter, cocoa, and consent; stuffed bellies digest like slow applause.',
    'You feel the hall exhale as one body; warmth moves room to room until even restraint feels temporary.',
    'The weave releases; chairs sigh; fullness becomes a shared weather pattern for the week.',
  ]},
  { when: { stageMin: 6 }, weight: 2, text: [
    'The weave pulse rolls through heavy hips and fuller chairs — mass and mood sharing the same deep breath.',
  ]},
]);

registerPool('hallBlueprint.roomEmpty', [
  { when: {}, text: [
    'An empty shell waiting — walls, wires, and the ache of potential.',
    'Bare floor and humming lights; the room is a promise you have not spent yet.',
    'Draft and dust; the blueprint label is honest: nothing installed, everything possible.',
  ]},
]);

registerPool('hallBlueprint.roomActive', [
  { when: {}, text: [
    'Installed and lived-in — the room carries heat and habit now.',
    'Upgrades show in the details: wider chairs, fuller shelves, the air tasting like seconds.',
    'The space stops feeling institutional; it feels kept — for her, for all of them.',
  ]},
  { when: { stageMin: 5 }, weight: 2, text: [
    'The room has learned her weight — chairs remember, tables yield, warmth pooling where she sits longest.',
  ]},
]);
