// Private session tap-out lines — bridge from students.js TAP_OUT_* monolith.
import { registerPool, render } from '../../engine.js';
import { registerDecomposedPool } from '../decomposePools.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { TAP_OUT_DIALOGUE, TAP_OUT_250, INIT_STUDENTS } from '../../../gameData/students.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import { privateSessionV2DepthChance } from '../../../gameData/sessionTextDepth.js';

function sampleStudent(studentId) {
  const id = Number(studentId);
  const row = INIT_STUDENTS.find((s) => s.id === id);
  return row ? { ...row, lbs: 220, fullness: 0.9 } : { id, name: 'Resident', lbs: 220 };
}

function registerTapOutBeat(poolKey, prose) {
  const text = (prose || '').trim();
  if (!text) return;
  const bodyKey = `${poolKey}.legacyBody`;
  registerDecomposedPool(bodyKey, text);
  const slot = (ctx) => {
    const line = render(`{${bodyKey}}`, ctx)?.trim();
    return line && !line.includes('{unresolved}') ? line : text;
  };
  registerPool(poolKey, [
    { when: {}, weight: 3, text: [slot, slot, slot] },
  ]);
}

for (const [studentId, stages] of Object.entries(TAP_OUT_DIALOGUE)) {
  if (!Array.isArray(stages)) continue;
  const sample = sampleStudent(studentId);
  stages.forEach((fn, stageIdx) => {
    if (typeof fn !== 'function') return;
    const prose = fn(sample);
    registerTapOutBeat(`session.tapOut.s${studentId}.st${stageIdx}`, prose);
  });
}

for (const [studentId, entry] of Object.entries(TAP_OUT_250)) {
  const sample = sampleStudent(studentId === 'default' ? 0 : studentId);
  const prose = typeof entry === 'function' ? entry(sample) : entry;
  const key = studentId === 'default' ? 'default' : `s${studentId}`;
  registerTapOutBeat(`session.tapOut.extreme.${key}`, prose);
}

function tapStageFromLbs(lbs = 0) {
  if (lbs < 160) return 0;
  if (lbs < 240) return 1;
  if (lbs < 320) return 2;
  return 3;
}

export function renderTapOutLine(student, fPct, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: {
      featureId: 'session_tap_out',
      tapOutFullnessPct: fPct,
      tapOutStage: tapStageFromLbs(student.lbs),
      ...(opts.globals || {}),
    },
    ...opts,
  });
  let poolKey = '';
  if (fPct >= 250) {
    poolKey = TAP_OUT_250[student.id]
      ? `session.tapOut.extreme.s${student.id}`
      : 'session.tapOut.extreme.default';
  } else {
    const st = tapStageFromLbs(student.lbs);
    poolKey = TAP_OUT_DIALOGUE[student.id]
      ? `session.tapOut.s${student.id}.st${st}`
      : `session.tapOut.sdefault.st${st}`;
  }
  if (!poolKey) return '';
  let line = '';
  try {
    line = render(`{${poolKey}}`, ctx)?.trim();
  } catch {
    line = '';
  }
  if (!line || line.includes('{unresolved}')) {
    if (fPct >= 250) {
      const entry = TAP_OUT_250[student.id] || TAP_OUT_250.default;
      line = typeof entry === 'function' ? entry(student) : entry;
    } else {
      const st = tapStageFromLbs(student.lbs);
      const dialogueSet = TAP_OUT_DIALOGUE[student.id] || TAP_OUT_DIALOGUE.default;
      const fn = dialogueSet[st];
      line = typeof fn === 'function' ? fn(student) : '';
    }
  }
  if (!line) return '';
  return appendV2Depth(line, 'sessionTapOut', ctx, privateSessionV2DepthChance(0.24));
}
