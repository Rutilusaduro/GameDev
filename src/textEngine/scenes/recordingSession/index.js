// The Squad — Lead: A4 Architect | Support: A2 Psych
// Recording session — engine bridge for feedee_creator filming mini-game.
import { registerPool, registerDimension, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import '../proseOverhaulPass3.js';
import { renderRecordingOpeningBeat, renderRecordingTakeBeat, renderRecordingDirectBeat } from './recordingBeats.js';
import {
  RECORDING_OPENING_TEXT,
  RECORDING_TAKE_INTRO_TEXT,
  RECORDING_DIRECTION_POPUPS,
  RECORDING_TAKE_RESULT,
  RECORDING_PERFECT_TAKE,
  RECORDING_ONE_MORE_TAKE,
  RECORDING_WRAP_ENDINGS,
  RECORDING_PAYOFF_TEXT,
} from '../../../gameData/miniGames.js';

registerDimension('recordingStage', (ctx) => ctx.globals?.recordingStage ?? 0);
registerDimension('takeQuality', (ctx) => ctx.globals?.takeQuality ?? 'okay');

for (let si = 0; si < RECORDING_ONE_MORE_TAKE.length; si++) {
  const fn = RECORDING_ONE_MORE_TAKE[si];
  if (typeof fn === 'function') {
    registerPool(`recording.oneMore.s${si}`, [{ when: {}, text: [fn] }]);
  }
}

function resolveLegacy(fn, lbs) {
  if (!fn) return '';
  return typeof fn === 'function' ? fn(lbs) : String(fn || '');
}

export function buildRecordingCtx(student, week, stageIdx = 0, opts = {}) {
  return buildTextContext({
    subject: student,
    week,
    globals: {
      featureId: 'recording_session',
      recordingStage: stageIdx,
      ...(opts.globals || {}),
    },
    ...opts,
  });
}

export function renderRecordingLegacy(text, student, week, stageIdx = 0, opts = {}) {
  const line = typeof text === 'string' ? text.trim() : '';
  if (!line || !student) return line;
  const ctx = buildRecordingCtx(student, week, stageIdx, opts);
  return appendV2Depth(line, 'recordingSession', ctx, opts.v2DepthChance ?? 0.28);
}

export function renderRecordingOpening(stageIdx, student, week) {
  const beat = renderRecordingOpeningBeat(student, week, stageIdx);
  if (beat) {
    const ctx = buildRecordingCtx(student, week, stageIdx);
    return appendV2Depth(beat, 'recordingSession', ctx, 0.3);
  }
  const raw = resolveLegacy(RECORDING_OPENING_TEXT[stageIdx], student.lbs);
  return renderRecordingLegacy(raw, student, week, stageIdx, { v2DepthChance: 0.3 });
}

export function renderRecordingTakeIntro(stageIdx, student, week) {
  const beat = renderRecordingTakeBeat(student, week, stageIdx, 'okay');
  if (beat) {
    const ctx = buildRecordingCtx(student, week, stageIdx, { globals: { takeQuality: 'okay' } });
    return appendV2Depth(beat, 'recordingSession', ctx, 0.22);
  }
  const raw = resolveLegacy(RECORDING_TAKE_INTRO_TEXT[stageIdx], student.lbs);
  return renderRecordingLegacy(raw, student, week, stageIdx, { v2DepthChance: 0.22 });
}

export function renderRecordingDirectionPopup(choiceId, stageIdx, student, week) {
  const ctx = buildRecordingCtx(student, week, stageIdx, { globals: { recDirect: choiceId } });
  const beat = renderRecordingDirectBeat(student, week, stageIdx, choiceId);
  const glow = render('{recording.afterglow}', ctx)?.trim() || '';
  if (beat) {
    return appendV2Depth([beat, glow].filter(Boolean).join('\n\n'), 'recordingSession', ctx, 0.26);
  }
  const arr = RECORDING_DIRECTION_POPUPS[choiceId];
  const raw = resolveLegacy(arr?.[stageIdx], student.lbs);
  const body = renderRecordingLegacy(raw, student, week, stageIdx, { v2DepthChance: 0.26 });
  return [body, glow].filter(Boolean).join('\n\n');
}

export function renderRecordingTakeResult(quality, stageIdx, postGainLbs, student, week) {
  const isPerfect = quality === 'perfect';
  const beat = renderRecordingTakeBeat(student, week, stageIdx, quality);
  if (beat) {
    const ctx = buildRecordingCtx(student, week, stageIdx, { globals: { takeQuality: quality } });
    return appendV2Depth(beat, 'recordingSession', ctx, isPerfect ? 0.34 : 0.28);
  }
  const fn = isPerfect
    ? RECORDING_PERFECT_TAKE[stageIdx]
    : (RECORDING_TAKE_RESULT[quality] || [])[stageIdx];
  const raw = resolveLegacy(fn, postGainLbs);
  return renderRecordingLegacy(raw, student, week, stageIdx, {
    globals: { takeQuality: quality },
    v2DepthChance: isPerfect ? 0.34 : 0.28,
  });
}

export function renderRecordingOneMoreTake(stageIdx, student, week) {
  const ctx = buildRecordingCtx(student, week, stageIdx);
  const si = Math.min(Math.max(0, stageIdx), RECORDING_ONE_MORE_TAKE.length - 1);
  const fromPool = render(`{recording.oneMore.s${si}}`, ctx)?.trim();
  if (fromPool) {
    return appendV2Depth(fromPool, 'recordingSession', ctx, 0.24);
  }
  const raw = resolveLegacy(RECORDING_ONE_MORE_TAKE[stageIdx], student.lbs);
  return renderRecordingLegacy(raw || 'She nods. One more.', student, week, stageIdx);
}

export function renderRecordingWrapEnding(bestClip, stageIdx, student, week) {
  const ctx = buildRecordingCtx(student, week, stageIdx, {
    globals: { takeQuality: bestClip },
  });
  const clip = ['good', 'great', 'perfect'].includes(bestClip) ? bestClip : 'good';
  const fromPool = render(`{recording.wrap.${clip}}`, ctx)?.trim();
  const glow = render('{recording.afterglow}', ctx)?.trim() || '';
  if (fromPool) {
    return appendV2Depth([fromPool, glow].filter(Boolean).join('\n\n'), 'recordingSession', ctx, 0.3);
  }
  const endArr = RECORDING_WRAP_ENDINGS[bestClip] || RECORDING_WRAP_ENDINGS.good;
  const endFn = endArr[stageIdx] || endArr[0];
  const raw = resolveLegacy(endFn, student.lbs);
  return renderRecordingLegacy(raw, student, week, stageIdx, {
    globals: { takeQuality: bestClip },
    v2DepthChance: 0.3,
  });
}

export function renderRecordingPayoff(stageIdx, student, week) {
  const ctx = buildRecordingCtx(student, week, stageIdx);
  const fromPool = render('{recording.payoff}', ctx)?.trim();
  const glow = render('{recording.afterglow}', ctx)?.trim() || '';
  if (fromPool) {
    return appendV2Depth([fromPool, glow].filter(Boolean).join('\n\n'), 'recordingSession', ctx, 0.32);
  }
  const raw = resolveLegacy(RECORDING_PAYOFF_TEXT[stageIdx], student.lbs);
  return renderRecordingLegacy(raw, student, week, stageIdx, { v2DepthChance: 0.32 });
}

export function renderRecordingWrapText(bestClip, stageIdx, student, week) {
  const end = renderRecordingWrapEnding(bestClip, stageIdx, student, week);
  const pay = renderRecordingPayoff(stageIdx, student, week);
  return [end, pay].filter(Boolean).join('\n\n');
}
