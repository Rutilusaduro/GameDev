// The Squad — Lead: A5 Editor | Support: A2 Psych
// Slot-composed ranked-session delivery NPC (Rae). Prefer over SESSION_NPC_LINES.
import { registerPool, registerDimension, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';

registerDimension('sessionStage', (ctx) => ctx.globals?.sessionStage ?? 0);
registerDimension('endReason', (ctx) => ctx.globals?.endReason ?? '');

registerPool('session.npc.arrival', [
  { when: {}, text: [
    '{session.npc.arrival.setup} {session.npc.arrival.body}',
    '{session.npc.arrival.body} {session.npc.arrival.setup}',
    '{session.npc.arrival.setup}',
  ]},
]);

registerPool('session.npc.arrival.setup', [
  { when: {}, text: [
    'Knock. Bags. Rae in the doorway like the queue already knew this room.',
    'Delivery. She does not wait for the order to finish typing.',
    'Lobby code still works. She is already inside the habit of this floor.',
  ]},
  { when: { sessionStage: [0] }, weight: 4, text: [
    'New driver. Professional, quick, by the book. The bags hit the desk and she is gone.',
  ]},
  { when: { sessionStage: [1] }, weight: 4, text: [
    'She counted wrong last time, she says. The extras are on her. They are not a mistake.',
  ]},
  { when: { sessionStage: [2] }, weight: 4, text: [
    'You were about to order. She was already heading over. The snacks are pre-staged.',
  ]},
  { when: { sessionStage: [3] }, weight: 4, text: [
    'Hey. Lobby code still works. She did not ask for it. The bags are correct.',
  ]},
  { when: { sessionStage: [4] }, weight: 4, text: [
    'Had a feeling you would want this tonight. The exact order, still warm.',
  ]},
  { when: { sessionStage: [5] }, weight: 4, text: [
    'Hey. She is just here now. Sometimes with food. Always correct.',
  ]},
]);

registerPool('session.npc.arrival.body', [
  { when: {}, text: [
    'The ranked table is already set. She leaves the bags where the session can reach them.',
    '{word.size} of her sits waiting on the chair. The delivery is how the session starts.',
    'Heat from the bags. A chair already claimed. The queue did its job.',
  ]},
]);

registerPool('session.npc.extra', [
  { when: {}, text: [
    '{session.npc.extra.setup} {session.npc.extra.body}',
    '{session.npc.extra.body} {session.npc.extra.setup}',
    '{session.npc.extra.setup}',
  ]},
]);

registerPool('session.npc.extra.setup', [
  { when: {}, text: [
    'She leaves something extra. Unprompted. The session was going to need it.',
    'A dessert item. A second bag. She pretends it was inventory.',
    'Another carton on the desk. She does not wait to be thanked.',
  ]},
  { when: { sessionStage: [1] }, weight: 3, text: [
    'Dessert on the house. She calls it a counting error. It is a schedule.',
  ]},
  { when: { sessionStage: [2] }, weight: 3, text: [
    'The right snacks were already in the bag. She knew the queue.',
  ]},
  { when: { sessionStage: [4] }, weight: 3, text: [
    'She has the exact order Destiny was going to place. The car still has more.',
  ]},
  { when: { sessionStage: [5] }, weight: 3, text: [
    'She rearranges the desk slightly. Better now. The bags land in the new order.',
  ]},
]);

registerPool('session.npc.extra.body', [
  { when: {}, text: [
    'Focus recovers a little. Fullness will not. The bags already knew.',
    'The ranked bar ticks. She is gone before the wrapper opens.',
    'More food than the order asked. The chair was ready for it.',
  ]},
]);

registerPool('session.npc.exit', [
  { when: {}, text: [
    'She leaves the bags and the heat. Have a good session.',
    'Good luck with the game. She will be back when the queue runs.',
    'I\'m around. The door stays a rumor she already solved.',
  ]},
]);

function prefer(poolKey, ctx) {
  const line = render(`{${poolKey}}`, ctx)?.trim();
  if (line && !line.includes('{unresolved}')) return line;
  return '';
}

export function renderSessionNpc(beat, student, week = 1, sessionStage = 0) {
  const key = beat === 'extra' ? 'session.npc.extra'
    : beat === 'exit' ? 'session.npc.exit'
    : 'session.npc.arrival';
  const ctx = buildTextContext({
    subject: student || { name: 'Destiny', lbs: 200, startLbs: 155 },
    week,
    globals: { featureId: 'ranked_feedee', sessionStage },
  });
  return prefer(key, ctx);
}

registerPool('session.payoff.scene', [
  { when: {}, text: [
    '{session.payoff.setup} {session.payoff.body}',
    '{session.payoff.body} {session.payoff.setup}',
    '{session.payoff.setup}',
  ]},
]);

registerPool('session.payoff.setup', [
  { when: {}, text: [
    'Session log closed. The ranked table is a rumor. The chair kept score.',
    'Game over. The bags are empty. She is not.',
    'Rae is already resetting the desk. The extra of her is the receipt.',
  ]},
  { when: { endReason: 'food_coma' }, weight: 4, text: [
    'Food coma. Full stop. She cannot argue with a middle that won the session.',
  ]},
  { when: { endReason: 'focus_out' }, weight: 4, text: [
    'Focus out. The food was still going. She kept chewing until the bar went dark.',
  ]},
  { when: { endReason: 'quit' }, weight: 3, text: [
    'Session ended early. The gain still landed. Rae does not look surprised.',
  ]},
]);

registerPool('session.payoff.body', [
  { when: {}, text: [
    '{word.size} of her sits in the chair like the rank was a meal. Soft mass, heat, done for now.',
    'She is heavier than the first bag. She wants the next queue. You already know.',
    'The Rae receipt is still on the desk. You are ordering from that place again.',
  ]},
]);

export function renderSessionPayoff(student, week = 1, sessionStage = 0, endReason = 'food_coma') {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { featureId: 'ranked_feedee', sessionStage, endReason },
  });
  return prefer('session.payoff.scene', ctx);
}
