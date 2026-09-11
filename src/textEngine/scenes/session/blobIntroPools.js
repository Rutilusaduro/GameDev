// Immobile / blob private session intros — BLOB_PRIVATE_INTRO bridge.
import { registerPool, render } from '../../engine.js';
import { registerDecomposedPool } from '../decomposePools.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { BLOB_PRIVATE_INTRO, INIT_STUDENTS } from '../../../gameData/students.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import { privateSessionV2DepthChance } from '../../../gameData/sessionTextDepth.js';
import { blobIntroTailBeat } from '../evolved/proseTails.js';
import { legacyBridgeWhen, lintWildcardVariant } from '../legacyPoolPolicy.js';

function sampleStudent(studentId) {
  const id = Number(studentId);
  const row = INIT_STUDENTS.find((s) => s.id === id);
  return row ? { ...row, lbs: 900 } : { id, name: 'Resident', lbs: 900 };
}

function registerBlobIntro(poolKey, prose, seed = poolKey) {
  const text = (prose || '').trim();
  if (!text) return;
  const bodyKey = `${poolKey}.legacyBody`;
  registerDecomposedPool(bodyKey, text);
  const slot = (ctx) => {
    const line = render(`{${bodyKey}}`, ctx)?.trim();
    return line && !line.includes('{unresolved}') ? line : text;
  };
  registerPool(poolKey, [
    {
      when: legacyBridgeWhen(),
      weight: 3,
      text: [
        slot,
        blobIntroTailBeat(seed, 0),
        blobIntroTailBeat(seed, 1),
        blobIntroTailBeat(seed, 2),
      ],
    },
    lintWildcardVariant('{session.blobIntro.scale|prefix:} {session.blobIntro.mass|prefix: }'),
  ]);
}

for (const [studentId, entry] of Object.entries(BLOB_PRIVATE_INTRO)) {
  const sample = sampleStudent(studentId === 'default' ? 0 : studentId);
  const prose = typeof entry === 'function' ? entry(sample) : entry;
  const key = studentId === 'default' ? 'default' : `s${studentId}`;
  registerBlobIntro(`session.blobIntro.${key}`, prose, key);
}

export function renderBlobPrivateIntro(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { featureId: 'session_blob_intro', ...(opts.globals || {}) },
    ...opts,
  });
  const poolKey = BLOB_PRIVATE_INTRO[student.id]
    ? `session.blobIntro.s${student.id}`
    : 'session.blobIntro.default';
  let line = '';
  try {
    line = render(`{${poolKey}}`, ctx)?.trim();
  } catch {
    line = '';
  }
  if (!line || line.includes('{unresolved}')) {
    if ((week ?? 1) >= 14) {
      return line || '';
    }
    const entry = BLOB_PRIVATE_INTRO[student.id] || BLOB_PRIVATE_INTRO.default;
    line = typeof entry === 'function' ? entry(student) : entry;
  }
  if (!line) return '';
  return appendV2Depth(line, 'sessionBlobIntro', ctx, privateSessionV2DepthChance(0.26));
}
