// Roster unlock — modular bridge for UNLOCK_SCENES monolith lines.
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { UNLOCK_SCENES, getUnlockScene, unlockSceneModularDepthChance } from '../../../gameData/unlockScenes.js';
import { registerDecomposedPool } from '../decomposePools.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import { rosterUnlockTailBeat } from '../evolved/proseTails.js';

for (const [studentId, prose] of Object.entries(UNLOCK_SCENES)) {
  if (!prose?.trim()) continue;
  const key = `roster.unlock.s${studentId}`;
  const seed = `unlock:${studentId}`;
  registerDecomposedPool(`${key}.legacyBody`, prose);
  const bodySlot = (ctx) => {
    const line = render(`{${key}.legacyBody}`, ctx)?.trim();
    return line && !line.includes('{unresolved}') ? line : prose.trim();
  };
  const variantRow = {
    weight: 3,
    text: [
      bodySlot,
      rosterUnlockTailBeat(seed, 0),
      rosterUnlockTailBeat(seed, 1),
      rosterUnlockTailBeat(seed, 2),
    ],
  };
  registerPool(key, [
    { when: { studentId: [Number(studentId)] }, priority: 2, ...variantRow },
    { when: {}, ...variantRow },
  ]);
}

export function renderRosterUnlockScene(student, week = 1) {
  if (!student) return '';
  const legacy = getUnlockScene(student.id);
  const key = `roster.unlock.s${student.id}`;
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { featureId: 'roster_unlock', unlockStudentId: student.id },
  });
  let line = '';
  try {
    line = render(`{${key}}`, ctx)?.trim();
  } catch {
    line = '';
  }
  if (!line || line.includes('{unresolved}')) line = legacy || '';
  if (!line) return '';
  return appendV2Depth(line, 'roster', ctx, unlockSceneModularDepthChance());
}
