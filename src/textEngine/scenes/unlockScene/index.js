// Roster unlock — modular bridge for UNLOCK_SCENES monolith lines.
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { UNLOCK_SCENES, getUnlockScene, unlockSceneModularDepthChance } from '../../../gameData/unlockScenes.js';
import { registerDecomposedPool } from '../decomposePools.js';
import { appendV2Depth } from '../v2/depthRenderer.js';

for (const [studentId, prose] of Object.entries(UNLOCK_SCENES)) {
  if (!prose?.trim()) continue;
  const key = `roster.unlock.s${studentId}`;
  registerDecomposedPool(`${key}.legacyBody`, prose);
  registerPool(key, [
    {
      when: { studentId: [Number(studentId)] },
      priority: 2,
      weight: 3,
      text: [
        prose,
        (ctx) => render(`{${key}.legacyBody}`, ctx)?.trim() || prose,
      ],
    },
    {
      when: {},
      text: [prose],
    },
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
