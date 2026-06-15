// ═══════════════════════════════════════════════════════════════
// SCENE: DINNER ENDING — composed end-of-evening reflection
// ═══════════════════════════════════════════════════════════════
import { registerPool, render, createContext } from '../../engine.js';
import { getStage } from '../../../gameData/stages.js';
import { getDinnerFullnessGroup } from '../../../gameData/feedingSession.js';
import { DINNER_ENDING_TEXT } from '../../../gameData/sessions.js';
import { DINNER_END_OPEN, DINNER_END_CLOSE } from './dinnerEndingData.js';

function bandVariants(chunks) {
  const variants = chunks.flatMap((c) => {
    const when = { stageMin: c.stageMin, stageMax: c.stageMax };
    if (c.fullnessMax != null) when.fullnessMax = c.fullnessMax;
    if (c.fullnessMin != null) when.fullnessMin = c.fullnessMin;
    return { when, weight: 3, text: c.texts };
  });
  variants.push({
    when: {},
    text: [
      '{subject.name} settles back as the evening ends — full, warm, pleased.',
      'The plates are cleared. {subject.name} looks satisfied in the way only a good dinner produces.',
    ],
  });
  return variants;
}

registerPool('dinner.endOpen', bandVariants(DINNER_END_OPEN));
registerPool('dinner.endClose', bandVariants(DINNER_END_CLOSE));

registerPool('dinner.ending', [
  { when: {}, text: ['{dinner.endOpen} {dinner.endClose}'] },
]);

/** Render dinner closing narrative via text engine; falls back to legacy grid. */
export function renderDinnerEnding(student, finalFullness, cap, week = 1) {
  if (!student) return '';
  const proxy = { ...student, fullness: finalFullness, stomachCapacity: cap || student.stomachCapacity || 1 };
  try {
    const line = render('{dinner.ending}', createContext({ subject: proxy, week }));
    if (line && !line.includes('{unresolved') && line.trim().length > 40) return line;
  } catch {
    /* fall through */
  }
  const stId = getStage(student.lbs).id;
  const stGrp = stId <= 2 ? 0 : stId <= 5 ? 1 : stId <= 7 ? 2 : 3;
  const fullGrp = getDinnerFullnessGroup(finalFullness, cap);
  const fn = DINNER_ENDING_TEXT[stGrp]?.[fullGrp];
  return fn ? fn(student) : `${student.name} finishes the evening full and content.`;
}
