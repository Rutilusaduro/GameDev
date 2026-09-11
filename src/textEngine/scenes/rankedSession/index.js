// The Squad — Lead: A1 Mobile | Support: A5 Editor
// Ranked feedee session — engine pools replacing SESSION_NPC_LINES display.
import { registerDimension, registerModule, registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import '../proseOverhaulPass3.js';
import { SESSION_NPC_LINES, SESSION_PAYOFF_TEXT } from '../../../gameData/evolvedForms.js';

registerDimension('raeStage', (ctx) => ctx.globals?.raeStage ?? 0);
registerModule('sessionGain', [{ when: {}, text: (ctx) => String(Math.round(ctx.globals?.sessionGain ?? 0)) }]);

registerPool('ranked.npc.arrival', [
  { when: { raeStage: 0 }, weight: 4, text: [
    'Delivery. New driver. She counts items twice and still leaves a napkin extra.',
    'Knock, bag, nod. Professional, quick, by the book.',
  ] },
  { when: { raeStage: 1 }, weight: 4, text: [
    `Order's here — she got the count wrong last time, so these extras are on her.`,
    'She sets the bag down heavier than the ticket. Steam still on the lid.',
  ] },
  { when: { raeStage: 2 }, weight: 4, text: [
    'You were about to order, right? She was already heading over.',
    'She has the right snacks pre-staged, still warm from the bag.',
  ] },
  { when: { raeStage: 3 }, weight: 4, text: [
    'Hey. Lobby code still works. She did not ask for it.',
    'She lets herself in like the session already started without her.',
  ] },
  { when: { raeStage: 4 }, weight: 4, text: [
    `Had a feeling you'd want this tonight. The bag matches the craving she was not told.`,
    'She arrives before the order is placed and looks unsurprised.',
  ] },
  { when: { raeStage: 5 }, weight: 4, text: [
    `Hey. She's just here now. Sometimes with food. Always correct.`,
    'She rearranges the desk slightly. Room for a second bag.',
  ] },
  { when: {}, text: [
    'Knock. Warm bag. She already knows the room.',
    'Delivery at the door like it belongs on the schedule.',
    'She sets food down and waits like the session is hers too.',
  ] },
]);

registerPool('ranked.npc.extra', [
  { when: { raeStage: 1 }, weight: 3, text: [
    'She leaves a dessert item. Unprompted. Steam still on the lid.',
  ] },
  { when: { raeStage: 2 }, weight: 3, text: [
    'She has the right snacks pre-staged, still warm from the bag.',
  ] },
  { when: { raeStage: 4 }, weight: 3, text: [
    'She packed the thing Destiny only thinks about.',
  ] },
  { when: { raeStage: 5 }, weight: 3, text: [
    'She rearranges the desk slightly. Better now. Room for a second bag.',
  ] },
  { when: {}, text: [
    'She sets the bag down like she lives here.',
    'Extra napkins. Extra heat. She already knew.',
    'The second container was never on the ticket.',
  ] },
]);

registerPool('ranked.payoff', [
  { when: { endReason: 'food_coma', raeStage: [0, 1] }, weight: 3, text: [
    'Session closed on a food coma. {sessionGain} lbs in the log. The Rae receipt is still on the desk.',
    'Full stop. {sessionGain} lbs. She left extras and they are gone.',
  ] },
  { when: { endReason: 'focus_out', raeStage: [0, 1] }, weight: 3, text: [
    'Focus ran out first. {sessionGain} lbs anyway. Rank climbed on a full stomach.',
    'Eyes gave out before the bag did. {sessionGain} lbs. She will be back.',
  ] },
  { when: { endReason: 'food_coma' }, weight: 2, text: [
    'The bag emptied before the queue did. {sessionGain} lbs. She said that tracks.',
    'Food coma. {sessionGain} lbs. Rank saved. She is already packing the next order in her head.',
  ] },
  { when: { endReason: 'focus_out' }, weight: 2, text: [
    'Focus out. {sessionGain} lbs. She texts about next time before the overlay dies.',
    'Queue still open in her blood. Focus already spent. {sessionGain} lbs logged.',
  ] },
  { when: { raeStage: [4, 5] }, weight: 3, text: [
    'She called the session. {sessionGain} lbs, rank where she wanted it, belly warm as a win screen.',
    'Grandmaster heat. {sessionGain} lbs. She ends it proud, full, already planning the rematch.',
  ] },
  { when: {}, text: [
    'Session closed with {sessionGain} lbs on the log and a bag that lost.',
    'Rank saved. Softness saved harder. {sessionGain} lbs.',
    'Headset off. Receipt on the desk. {sessionGain} lbs still arriving.',
  ] },
]);

registerPool('ranked.linger', [
  { when: { leftoverFed: true, stageMax: 3 }, weight: 3, text: [
    'Foil still on her fingers when the queue pings. She bites before she accepts.',
    'Foil still on the overlay. The bag is already empty twice.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'Kitchen leftover still in her lap. Ranked queue on top of it.',
    'Last night\'s sitting sits in her lap like a ranked perk.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'Night-round knock still in the wood. She queues from the same open door.',
  ] },
  { when: { stageMin: 8 }, weight: 2, text: [
    'Focus bar dropping. Belly still climbing. She plays seated because standing would be a load-in.',
    'The headset cable finds a new route around her. She lets it.',
  ] },
  { when: {}, text: [
    'Queue pops. She takes another bite before she accepts.',
    'Chat would have loved this. The bag is already empty.',
    'She keeps a hand on the new weight like a ranked perk.',
  ] },
]);

function rankedCtx(student, week, raeStage, opts = {}) {
  return buildTextContext({
    subject: student,
    week,
    globals: { featureId: 'ranked_session', raeStage, ...(opts.globals || {}) },
    ...opts,
  });
}

export function renderRankedNpcArrival(student, week, raeStage = 0) {
  const fallback = SESSION_NPC_LINES[raeStage]?.arrival || SESSION_NPC_LINES[0].arrival;
  if (!student) return fallback;
  const ctx = rankedCtx(student, week, raeStage);
  const line = render('{ranked.npc.arrival}', ctx)?.trim();
  const extraStages = raeStage === 1 || raeStage === 2 || raeStage === 4 || raeStage === 5;
  const extra = extraStages ? (render('{ranked.npc.extra}', ctx)?.trim() || SESSION_NPC_LINES[raeStage]?.extra) : '';
  const linger = render('{ranked.linger}', ctx)?.trim();
  const body = [line || fallback, extra].filter(Boolean).join(' ');
  return appendV2Depth([body, linger].filter(Boolean).join('\n\n'), 'rankedSession', ctx, 0.22);
}

export function renderRankedNpcDrop(student, week, raeStage = 0) {
  const fallback = SESSION_NPC_LINES[raeStage]?.extra || 'She appears with extra supplies.';
  if (!student) return `📦 RAE: ${fallback}`;
  const ctx = rankedCtx(student, week, raeStage);
  const extra = render('{ranked.npc.extra}', ctx)?.trim() || fallback;
  const linger = render('{ranked.linger}', ctx)?.trim();
  return appendV2Depth([`📦 RAE: ${extra}`, linger].filter(Boolean).join('\n\n'), 'rankedSession', ctx, 0.18);
}

export function renderRankedPayoff(student, week, raeStage = 0, gain = 0, endReason = 'food_coma') {
  const fallbackFn = SESSION_PAYOFF_TEXT[raeStage];
  const fallback = fallbackFn ? fallbackFn(gain, endReason) : `Session closed with ${Math.round(gain)} lbs gained.`;
  if (!student) return fallback;
  const ctx = rankedCtx(student, week, raeStage, { globals: { endReason, sessionGain: Math.round(gain) } });
  const line = render('{ranked.payoff}', ctx)?.trim();
  const linger = render('{ranked.linger}', ctx)?.trim();
  const body = line || fallback;
  return appendV2Depth([body, linger].filter(Boolean).join('\n\n'), 'rankedSession', ctx, 0.28);
}
