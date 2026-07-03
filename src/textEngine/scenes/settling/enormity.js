// The Squad — Lead: A3 Immobility | Support: A7 Artisan, A5 Editor
// set.enorm — the enormity overlay. Optional scale beats woven into the
// physical-proximity settling flows (weigh, tend) so her size registers on
// the senses the dialogue skips: the heat she throws, the sound of moving
// her, the floor's opinion, how long a motion takes to cross her, the
// furniture she has annexed. Woven as {set.enorm|prefix: } so it slots in
// cleanly after the main beat.
import { registerPool } from '../../engine.js';

// Shape: FULL SENTENCE. One scale observation. Stage-banded (this only fires
// in the settled flows, so stage 10 and 11 plus a safe generic fallback).
registerPool('set.enorm', [
  { when: {}, text: [
    `The warmth of her reaches you before you've fully crossed the room.`,
    `She takes up more of the space than the furniture does.`,
  ]},
  { when: { stageMin: 10, stageMax: 10 }, weight: 2, text: [
    `Heat rolls off her in a slow tide; you feel it from the doorway, before you're anywhere near her.`,
    `When she shifts, the motion takes a moment to finish — a slow swell that starts at one side of her and arrives at the other.`,
    `The floor complains quietly under the load of her, a low creak that's become the room's baseline sound.`,
    `She's annexed the furniture — the bed, the two chairs shoved alongside, the low table that now just holds whatever she wants in reach.`,
  ]},
  { when: { stageMin: 11 }, weight: 3, text: [
    `The heat of her fills the room like weather; you're warm the moment you step in, three feet of air still between you and her.`,
    `A shiver takes its time crossing her — it starts near her shoulder and is still traveling when it reaches her hip.`,
    `When you move an arm of hers, it arrives in sound: a soft, heavy shift you hear as much as feel.`,
    `The floor joists have learned her. There's a permanent low note under the room, the building holding her up.`,
    `She's most of the room now; the walls arrange what's left around her.`,
  ]},
]);
