// The Squad — Lead: A1 Mobile | Support: A5 Editor
// V2.0 embodiment depth layer
import { registerPool } from '../../../engine.js';

registerPool('emb.action.raid_pantry.depth', [
  { when: { stageMin: 8 }, text: [
    'The pantry is a country she maps with her hands — every shelf a province of want. She eats until the cold air on her skin feels like a lie and her belly is the only honest thing in the room.',
  ]},
  { when: { stageMin: 4 }, text: [
    'Standing at the counter, she eats with the focus of someone who has stopped pretending this is accidental. Crumbs gather on the swell of her chest. Her breathing deepens. The spirit drinks the moment.',
  ]},
  { when: {}, text: [
    'Cartons opened with her teeth. Leftovers reheated in her mouth. She eats like a thief in her own kitchen — fast, guilty, already planning the next bite.',
  ]},
]);

registerPool('emb.action.secret_binge.depth', [
  { when: { stageMin: 6 }, text: [
    'The door is locked. The lights are low. She eats with both hands.',
    'Pizza cools on her thighs. Sauce on her fingers. Her belly rises warm in her lap.',
    'She does not look at the clock. She looks at what is left.',
  ]},
  { when: {}, text: [
    'Alone with the delivery bags, she eats until shame arrives too late.',
    'Fullness spreads through her like a tide she stopped fighting weeks ago.',
    'The binge finishes in silence. The warmth does not.',
  ]},
]);

registerPool('emb.action.immobile_feast.depth', [
  { when: { stageMin: 9 }, text: [
    'She is a landscape and you are the weather.',
    'Food arrives in waves — carried, spooned, pressed to her lips.',
    'Her belly rises and spreads. She takes every offering with slow gratitude.',
  ]},
  { when: {}, text: [
    'Immobile, she feasts from within.',
    'Every bite lands like a stone in still water.',
    'Ripples of fullness spread through flesh that stopped pretending to be small.',
  ]},
]);

registerPool('emb.action.seduce_appetite.depth', [
  { when: { corruptionMin: 60 }, text: [
    'You pour desire into the hollow behind her ribs. She moans — quiet, involuntary — and reaches for more.',
    'Want moves through her like warm water. Appetite is no longer a guest.',
  ]},
  { when: {}, text: [
    'She touches her own belly and does not flinch. The spirit whispers: more. She listens.',
    'Want arrives before reason. Her hands follow.',
  ]},
]);

registerPool('emb.enter.depth', [
  { when: { stageMin: 8 }, text: [
    'You pour into her the way water fills a basin — slow, total, inevitable. Her vast body receives you without surprise. She has been waiting in the language of appetite.',
  ]},
  { when: {}, text: [
    'The spirit nests behind her eyes. Her next thought is yours. Her next hunger is yours. She will call it a craving. She will be right.',
  ]},
]);
