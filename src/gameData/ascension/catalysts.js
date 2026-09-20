// The Squad — Lead: A4 Architect | Support: A2 Psych
// Single writer for Part D catalyst flags. For v1, finishing any evolved-form
// event chain grants that resident's ascension catalyst.

import { getAscensionFormForStudent } from './forms.js';
import { depthMetaProgressBonus } from '../mechanicsDepthLayer.js';

export function scaledCatalystCompletionScore(completedStageIdx = 0) {
  return depthMetaProgressBonus(completedStageIdx + 1);
}

export function maybeGrantAscensionCatalyst(student, { completedStageIdx = 0, totalStages = 0 } = {}) {
  const form = getAscensionFormForStudent(student);
  if (!student || !form?.catalystFlag || totalStages <= 0) return student;
  if (completedStageIdx < totalStages - 1) return student;
  return {
    ...student,
    ascensionCatalysts: {
      ...(student.ascensionCatalysts || {}),
      [form.catalystFlag]: true,
    },
  };
}
