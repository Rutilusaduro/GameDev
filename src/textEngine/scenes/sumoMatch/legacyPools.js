// Sumo match — legacy miniGames prose into stage-keyed pools.
import { registerPool } from '../../engine.js';
import {
  SUMO_RIVAL_NAME,
  SUMO_EXCHANGE_LINES,
  SUMO_BOUT_WON,
  SUMO_BOUT_LOST,
  SUMO_FILL_RING_TEXT,
  SUMO_CORNER_FEED,
  SUMO_MATCH_AFTERMATH,
  SUMO_PAYOFF_TEXT,
} from '../../../gameData/miniGames.js';

function registerLinePool(poolId, line) {
  const text = typeof line === 'string' ? line.trim() : '';
  if (!text) return;
  registerPool(poolId, [
    { when: {}, text: [(ctx) => text] },
    { when: {}, text: [(ctx) => `${text}\n\nThe dohyo holds your weight.`] },
    { when: {}, text: [(ctx) => `Exchange:\n\n${text}`] },
  ]);
}

for (const bucket of Object.keys(SUMO_EXCHANGE_LINES)) {
  const arr = SUMO_EXCHANGE_LINES[bucket];
  for (let si = 0; si < arr.length; si += 1) {
    registerLinePool(`sumo.exchange.${bucket}.s${si}`, arr[si]);
  }
}

for (let si = 0; si < SUMO_BOUT_WON.length; si += 1) {
  registerLinePool(`sumo.boutWon.s${si}`, SUMO_BOUT_WON[si]);
}
for (let si = 0; si < SUMO_BOUT_LOST.length; si += 1) {
  registerLinePool(`sumo.boutLost.s${si}`, SUMO_BOUT_LOST[si]);
}
for (let si = 0; si < SUMO_FILL_RING_TEXT.length; si += 1) {
  registerLinePool(`sumo.fillRing.s${si}`, SUMO_FILL_RING_TEXT[si]);
}

for (let si = 0; si < SUMO_CORNER_FEED.length; si += 1) {
  const feed = SUMO_CORNER_FEED[si];
  if (feed?.text) registerLinePool(`sumo.cornerFeed.s${si}`, feed.text);
}

for (let si = 0; si < SUMO_MATCH_AFTERMATH.length; si += 1) {
  const fn = SUMO_MATCH_AFTERMATH[si];
  if (typeof fn !== 'function') continue;
  const core = (ctx) => fn(
    ctx.subject,
    ctx.globals?.gainAccum ?? 0,
    ctx.globals?.matchWon ?? false,
    ctx.globals?.oppLbs ?? 340,
  );
  registerPool(`sumo.aftermath.s${si}`, [
    { when: {}, text: [core] },
    { when: {}, text: [(ctx) => `${core(ctx)}\n\nThe crowd exhales.`] },
    { when: {}, text: [(ctx) => `Aftermath:\n\n${core(ctx)}`] },
  ]);
}

for (let si = 0; si < SUMO_PAYOFF_TEXT.length; si += 1) {
  const fn = SUMO_PAYOFF_TEXT[si];
  if (typeof fn !== 'function') continue;
  const core = (ctx) => fn(ctx.globals?.gainAccum ?? 0);
  registerPool(`sumo.payoff.legacy.s${si}`, [
    { when: {}, text: [core] },
    { when: {}, text: [(ctx) => `${core(ctx)}\n\nMore.`] },
    { when: {}, text: [(ctx) => `Match done.\n\n${core(ctx)}`] },
  ]);
}

registerPool('sumo.opening.compose', [
  { when: {}, text: [
    `The first tachi-ai. You square up against ${SUMO_RIVAL_NAME} — {oppLbs} pounds of veteran across the line. The crowd settles. Choose your opening.`,
    `Center ring. {oppLbs} pounds of ${SUMO_RIVAL_NAME} opposite you. Breath, belt, hunger — choose.`,
    `Tachi-ai. ${SUMO_RIVAL_NAME} at {oppLbs} lbs sets her feet. The dohyo waits for your move.`,
  ]},
]);
