// Recording session — register legacy miniGames prose into stage-keyed pools.
import { registerPool } from '../../engine.js';
import { legacyBridgeWhen, lintWildcardVariant } from '../legacyPoolPolicy.js';

const RECORDING_LINT = lintWildcardVariant('{recording.scene.ringLight|prefix:} {recording.scene.takeYield|prefix: }');
import {
  RECORDING_OPENING_TEXT,
  RECORDING_TAKE_INTRO_TEXT,
  RECORDING_DIRECTION_POPUPS,
  RECORDING_TAKE_RESULT,
  RECORDING_PERFECT_TAKE,
} from '../../../gameData/miniGames.js';

function lbsFromCtx(ctx) {
  return Math.round(ctx.subject?.lbs ?? ctx.d?.lbs ?? 0);
}

function registerStageFnPool(poolId, fn) {
  if (typeof fn !== 'function') return;
  const core = (ctx) => fn(lbsFromCtx(ctx));
  registerPool(poolId, [
    { when: legacyBridgeWhen(), text: [core] },
    { when: legacyBridgeWhen(), text: [(ctx) => `${core(ctx)}\n\nThe ring light hums. The take keeps rolling.`] },
    { when: legacyBridgeWhen(), text: [(ctx) => `On camera:\n\n${core(ctx)}`] },
    RECORDING_LINT,
  ]);
}

for (let si = 0; si < RECORDING_OPENING_TEXT.length; si++) {
  registerStageFnPool(`recording.opening.s${si}`, RECORDING_OPENING_TEXT[si]);
}

for (let si = 0; si < RECORDING_TAKE_INTRO_TEXT.length; si++) {
  registerStageFnPool(`recording.takeIntro.s${si}`, RECORDING_TAKE_INTRO_TEXT[si]);
}

for (const choiceId of Object.keys(RECORDING_DIRECTION_POPUPS)) {
  const arr = RECORDING_DIRECTION_POPUPS[choiceId];
  for (let si = 0; si < arr.length; si++) {
    registerStageFnPool(`recording.direction.${choiceId}.s${si}`, arr[si]);
  }
}

for (const quality of Object.keys(RECORDING_TAKE_RESULT)) {
  const arr = RECORDING_TAKE_RESULT[quality];
  for (let si = 0; si < arr.length; si++) {
    registerStageFnPool(`recording.takeResult.${quality}.s${si}`, arr[si]);
  }
}

for (let si = 0; si < RECORDING_PERFECT_TAKE.length; si++) {
  registerStageFnPool(`recording.takeResult.perfect.s${si}`, RECORDING_PERFECT_TAKE[si]);
}
