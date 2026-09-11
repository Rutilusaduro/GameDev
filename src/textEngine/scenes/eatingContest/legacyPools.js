// Eating contest — legacy miniGames prose into stage-keyed pools.
import { registerPool } from '../../engine.js';
import { legacyBridgeWhen, lintWildcardVariant } from '../legacyPoolPolicy.js';

const CONTEST_LINT = lintWildcardVariant('{contest.scene.crowdHeat|prefix:} {contest.scene.tableStakes|prefix: }');
import {
  CONTEST_FOOD_POPUPS,
  CONTEST_ACTION_POPUPS,
  CONTEST_DEVOUR_POPUPS,
  CONTEST_WEIGH_IN_2_TEXT,
  CONTEST_PAYOFF_TEXT,
} from '../../../gameData/miniGames.js';

function registerLinePool(poolId, line) {
  const text = typeof line === 'string' ? line.trim() : '';
  if (!text) return;
  registerPool(poolId, [
    { when: legacyBridgeWhen(), text: [(ctx) => text] },
    { when: legacyBridgeWhen(), text: [(ctx) => `${text}\n\nThe crowd leans in — appetite as sport.`] },
    { when: legacyBridgeWhen(), text: [(ctx) => `On the table:\n\n${text}`] },
    CONTEST_LINT,
  ]);
}

for (const foodId of Object.keys(CONTEST_FOOD_POPUPS)) {
  const arr = CONTEST_FOOD_POPUPS[foodId];
  for (let si = 0; si < arr.length; si += 1) {
    registerLinePool(`contest.food.${foodId}.s${si}`, arr[si]);
  }
}

for (const actionKey of Object.keys(CONTEST_ACTION_POPUPS)) {
  const arr = CONTEST_ACTION_POPUPS[actionKey];
  for (let si = 0; si < arr.length; si += 1) {
    registerLinePool(`contest.action.${actionKey}.s${si}`, arr[si]);
  }
}

for (let si = 0; si < CONTEST_DEVOUR_POPUPS.length; si += 1) {
  registerLinePool(`contest.devour.s${si}`, CONTEST_DEVOUR_POPUPS[si]);
}

for (let si = 0; si < CONTEST_WEIGH_IN_2_TEXT.length; si += 1) {
  const fn = CONTEST_WEIGH_IN_2_TEXT[si];
  if (typeof fn !== 'function') continue;
  const core = (ctx) => fn(
    ctx.subject,
    ctx.globals?.yourGain ?? 0,
    ctx.globals?.mayaGain ?? 0,
    ctx.globals?.mayaLbs ?? 330,
  );
  registerPool(`contest.weighIn.s${si}`, [
    { when: legacyBridgeWhen(), text: [core] },
    { when: legacyBridgeWhen(), text: [(ctx) => `${core(ctx)}\n\nThe scale does not argue.`] },
    { when: legacyBridgeWhen(), text: [(ctx) => `Weigh-in:\n\n${core(ctx)}`] },
    CONTEST_LINT,
  ]);
}

for (let si = 0; si < CONTEST_PAYOFF_TEXT.length; si += 1) {
  const fn = CONTEST_PAYOFF_TEXT[si];
  if (typeof fn !== 'function') continue;
  const core = (ctx) => fn(ctx.globals?.yourGain ?? 0);
  registerPool(`contest.payoff.legacy.s${si}`, [
    { when: legacyBridgeWhen(), text: [core] },
    { when: legacyBridgeWhen(), text: [(ctx) => `${core(ctx)}\n\nYou are heavier than when you walked in.`] },
    { when: legacyBridgeWhen(), text: [(ctx) => `Contest over.\n\n${core(ctx)}`] },
    CONTEST_LINT,
  ]);
}
