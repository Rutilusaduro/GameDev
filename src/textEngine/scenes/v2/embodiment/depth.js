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

registerPool('emb.action.mirror_confession.depth', [
  { when: { stageMin: 5 }, text: [
    'She tells the mirror what she will not tell anyone else — that she likes the softness, wants the next pound, craves being seen.',
  ]},
  { when: {}, text: [
    'Glass holds her reflection and her honesty. Appetite spoken aloud becomes permission.',
    'The confession lands in the quiet bathroom. She believes herself for once.',
  ]},
]);

registerPool('emb.action.text_ra.depth', [
  { when: {}, text: [
    'The message sends before pride can edit it. Hunger typed in plain language — warm, needy, impossible to misread.',
    'Her thumbs hover after send. The spirit purrs. She is already waiting for your answer.',
    '"Hungry again." Three words. No takebacks.',
  ]},
]);

registerPool('emb.action.roommate_tempt.depth', [
  { when: {}, text: [
    'Evidence on the counter — wrappers, crumbs, containers for two. Let someone else notice what she is becoming.',
    'She eats enough for two and leaves the proof where it will be found.',
    'Delivery bags staged like an accusation she does not deny.',
  ]},
]);

registerPool('emb.action.auto_surrender.depth', [
  { when: { stageMin: 6 }, text: [
    'No negotiation. Delivery after delivery until the bags are empty and her belly is a settled landscape of warmth.',
    'Apps open and stay open. Hunger outsourced, then welcomed home.',
  ]},
  { when: {}, text: [
    'She surrenders to hunger the way you surrender to gravity — completely, without drama.',
    'Resistance was performance. Fullness is the honest ending.',
  ]},
]);

registerPool('emb.action.public_eating.depth', [
  { when: { stageMin: 5 }, text: [
    'Campus eyes find her and stay. She eats without apology — every bite proof that appetite can be public.',
    'Quad, bench, open air — she feeds herself while the world watches and does not stop.',
  ]},
  { when: {}, text: [
    'Public plate, public want. She eats like visibility is the point.',
  ]},
]);

registerPool('emb.action.midnight_snack.depth', [
  { when: {}, text: [
    'Fridge light on her face. She eats standing in the dark — a secret between her and the hunger.',
    'The house sleeps. Fullness gathers in the quiet like something sacred.',
    '2 AM appetite needs no witness. She feeds it anyway.',
  ]},
]);

registerPool('emb.action.vending_splurge.depth', [
  { when: {}, text: [
    'Coins in, buttons pressed, armful of snacks. She eats walking back — crumbs, wrappers, no regrets.',
    'The machine empties into her arms. She eats before she reaches her door.',
    'Sweet and salty in rotation until her hands are empty and her belly is not.',
  ]},
]);

registerPool('emb.action.dessert_first.depth', [
  { when: {}, text: [
    'Cake first. Always cake first. Dinner becomes dessert\'s supporting act and she still finishes both.',
    'Fork into frosting before anything else. Hunger has learned its priorities.',
    'She opens with sweetness and does not apologize for the order.',
  ]},
]);

registerPool('emb.action.body_exploration.depth', [
  { when: { stageMin: 6 }, text: [
    'Her hands map belly, thighs, the soft weight of her chest — curiosity without shame, warmth answered with warmth.',
    'She learns the new geography from the inside and likes what she finds.',
  ]},
  { when: {}, text: [
    'She learns the new geography of herself from the inside and likes what she finds.',
    'Fingers press into give. The spirit hums through her ribs.',
  ]},
]);

registerPool('emb.action.hunger_spiral.depth', [
  { when: { stageMin: 5 }, text: [
    'Want compounds on itself — bite, want, bite. Fullness arrives and appetite ignores it.',
    'The spiral tightens. She eats because she is eating and does not want to stop.',
  ]},
  { when: {}, text: [
    'The spiral tightens. She eats because she is eating and does not want to stop.',
    'Hunger feeds hunger. She rides it down into warmth.',
  ]},
]);

registerPool('emb.enter.depth', [
  { when: { stageMin: 8 }, text: [
    'You pour into her the way water fills a basin — slow, total, inevitable. Her vast body receives you without surprise. She has been waiting in the language of appetite.',
    'Immensity opens. You settle in like heat finding its room.',
  ]},
  { when: {}, text: [
    'The spirit nests behind her eyes. Her next thought is yours. Her next hunger is yours. She will call it a craving. She will be right.',
    'You slip inside. Her pulse answers. Hunger thinks it belongs to her.',
  ]},
]);
