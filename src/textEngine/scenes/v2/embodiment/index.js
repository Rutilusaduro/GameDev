// The Squad — Lead: A2 Psych | Support: A1 Mobile, A5 Editor
// V2.0 Spirit Embodiment prose
import { registerPool, createContext, render } from '../../../engine.js';
import './depth.js';

// ── emb.enter — slipping inside ───────────────────────────────
// Shape: FULL SENTENCE
registerPool('emb.enter', [
  { when: { stageMin: 7 }, weight: 2, text: [
    'The spirit slides through her like warm honey — vast, slow, already hungry. Her body receives you the way a room receives heat.',
    'You settle into the weight of her without resistance. She has been making room for this longer than she knows.',
  ]},
  { when: { stageMin: 4 }, weight: 2, text: [
    'You slip behind her eyes. Her hands twitch. Her stomach answers before her mind does.',
    'The boundary between you thins. You feel her fullness from the inside — soft, present, negotiable.',
  ]},
  { when: { corruptionMin: 40 }, weight: 2, text: [
    'She does not fight the descent. You ride her want like a current she has stopped pretending to swim against.',
    'The spirit nests in her appetite. She exhales. Something in her unclenches.',
  ]},
  { when: {}, text: [
    'You leave the professor\'s skin and pour into hers — a quiet theft of agency she will explain away later.',
    'Her pulse quickens as you arrive. Hunger stirs. She thinks it is hers.',
    'The spirit takes the wheel behind her ribs. Her next breath tastes like permission.',
    'You slip inside like warmth finding a home. She exhales. Something unclenches.',
  ]},
]);

// ── emb.release — returning ───────────────────────────────────
registerPool('emb.release', [
  { when: { stageMin: 6 }, text: [
    'You peel free of her vast warmth and leave an echo behind — appetite still ringing in her flesh.',
    'The body keeps moving without you. She will find crumbs and call it a mystery.',
  ]},
  { when: {}, text: [
    'You withdraw. She blinks, full in a way she cannot quite account for.',
    'The spirit lifts out. Hunger remains — a gift she will not trace to you.',
  ]},
]);

// ── emb.action — per-action beats (skeleton) ──────────────────
registerPool('emb.action.raid_pantry', [
  { when: {}, text: [
    '{emb.action.raid_pantry.beat} {emb.action.raid_pantry.after}',
  ]},
]);
registerPool('emb.action.raid_pantry.beat', [
  { when: { stageMin: 5 }, text: [
    'Her thighs press the cabinet open. She eats standing — cold pasta, cheese torn from the block, something sweet she does not name.',
  ]},
  { when: {}, text: [
    'Hands move on autopilot. Cartons, leftovers, the thing in the back she forgot she bought.',
  ]},
]);
registerPool('emb.action.raid_pantry.after', [
  { when: {}, text: [
    'She wipes her mouth and tells herself it was just a snack.',
    'Crumbs on her shirt. She will not mention this.',
  ]},
]);

registerPool('emb.action.secret_binge', [
  { when: {}, text: [
    '{emb.action.secret_binge.beat} {emb.action.secret_binge.after}',
  ]},
]);
registerPool('emb.action.secret_binge.beat', [
  { when: { corruptionMin: 50 }, text: [
    'Door locked. Phone face-down. She eats like someone who has decided not to be witnessed — and does not want to stop.',
  ]},
  { when: {}, text: [
    'She eats fast, then slower, then until the containers are empty and her belly is a warm, heavy fact.',
  ]},
]);
registerPool('emb.action.secret_binge.after', [
  { when: {}, text: [
    'The shame arrives late. The fullness arrived on time.',
  ]},
]);

registerPool('emb.action.seduce_appetite', [
  { when: {}, text: [
    'You whisper want into the places she keeps polite. Hunger stops being embarrassment and becomes appetite — hers, finally, without apology.',
  ]},
]);

registerPool('emb.action.mirror_confession', [
  { when: {}, text: [
    'She stands before the glass and tells the truth her friends never hear: she likes this. She wants more. The reflection agrees.',
  ]},
]);

registerPool('emb.action.text_professor', [
  { when: {}, text: [
    'Her thumbs move before pride can intervene. "I\'m hungry again." Sent. She watches the screen like it might judge her.',
  ]},
]);

registerPool('emb.action.roommate_tempt', [
  { when: {}, text: [
    'Order for two. Eat for one and a half. Evidence left on the counter. Let someone else notice what she is becoming.',
  ]},
]);

registerPool('emb.action.auto_surrender', [
  { when: { stageMin: 6 }, text: [
    'No negotiation. The delivery app opens and does not close until every bag is empty and her belly is a settled landscape of warmth.',
  ]},
  { when: {}, text: [
    'She surrenders to hunger the way you surrender to gravity — completely, without drama.',
  ]},
]);

registerPool('emb.action.public_eating', [
  { when: {}, text: [
    'Campus quad. She eats without apology. People look. She does not stop. The spirit hums approval through her ribs.',
  ]},
]);

registerPool('emb.action.immobile_feast', [
  { when: {}, text: [
    'She cannot stand. The world brings food to her — platters, containers, warmth delivered like tribute. Every bite is a landslide of softness from the inside.',
    'Immobile and hungry, she feasts from within. The spirit drinks every swallowed warmth.',
    'Food arrives in waves. She takes it all — vast, warm, grateful in the way only a body this size can be.',
  ]},
]);

registerPool('emb.action.midnight_snack', [
  { when: {}, text: [
    '2 AM. Fridge light on her face. She eats standing in the dark — a secret between her and the hunger.',
    'The house sleeps. She does not. Cartons open, spoons scrape, fullness gathers in the quiet.',
    'Midnight hunger needs no permission. She feeds it in the blue glow of the refrigerator.',
  ]},
]);

registerPool('emb.action.vending_splurge', [
  { when: {}, text: [
    'Coins in. Buttons pressed. Armful of snacks. She eats walking back, crumbs on her shirt, no regrets.',
    'The vending machine empties into her arms. She eats before she reaches her door.',
    'Crinkling wrappers, sweet and salty, one after another until her hands are empty and her belly is not.',
  ]},
]);

registerPool('emb.action.dessert_first', [
  { when: {}, text: [
    'Cake first. Always cake first. The main course is an afterthought she still polishes off.',
    'She opens with sweetness and does not apologize. Dinner becomes dessert\'s supporting act.',
    'Fork into frosting before anything else. Hunger has learned its priorities.',
  ]},
]);

registerPool('emb.action.body_exploration', [
  { when: { stageMin: 6 }, text: [
    'Her hands map the new geography — belly, thighs, the soft weight of her chest. She likes what she finds.',
    'She touches herself with curiosity, not shame. The spirit hums approval through her ribs.',
  ]},
  { when: {}, text: [
    'Softness under her palms. She explores the body she is becoming and does not look away.',
    'Fingers press into warmth. She learns her own curves and leans into them.',
  ]},
]);

registerPool('emb.action.hunger_spiral', [
  { when: {}, text: [
    'Want compounds. She eats because she is eating and does not want to stop.',
    'The spiral tightens — bite, want, bite. Fullness arrives and appetite ignores it.',
    'Hunger feeds on itself. She rides the spiral down into warmth and more warmth.',
  ]},
]);

// ── render helpers ────────────────────────────────────────────
export function renderEmbodimentEnter(ctx) {
  return render('{emb.enter}', ctx);
}

export function renderEmbodimentRelease(ctx) {
  return render('{emb.release}', ctx);
}

export function renderEmbodimentAction(actionId, ctx) {
  const key = `emb.action.${actionId}`;
  const out = render(`{${key}}`, ctx);
  if (out?.trim()) return out;
  const depth = render(`{emb.action.${actionId}.depth}`, ctx);
  return depth?.trim() || render('{emb.action.generic}', ctx);
}

registerPool('emb.action.generic', [
  { when: {}, text: [
    'You move her hands toward food. She follows. The spirit smiles without a face.',
  ]},
]);
