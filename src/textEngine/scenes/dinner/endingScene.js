// ═══════════════════════════════════════════════════════════════
// SCENE: DINNER ENDING — composed end-of-evening reflection
// ═══════════════════════════════════════════════════════════════
import { registerPool, render, createContext } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { DINNER_END_OPEN, DINNER_END_CLOSE } from './dinnerEndingData.js';
import { getDinnerFullnessGroup } from '../../../gameData/feedingSession.js';
import './selectors.js';

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
  { when: {}, text: ['{dinner.endOpen} {dinner.endClose} {dinner.afterglow}'] },
]);

/** Render dinner closing narrative via text engine. */
export function renderDinnerEnding(student, finalFullness, cap, week = 1, opts = {}) {
  if (!student) return '';
  const proxy = { ...student, fullness: finalFullness, stomachCapacity: cap || student.stomachCapacity || 1 };
  const ctx = opts.trace != null || opts.globals
    ? buildTextContext({ subject: proxy, week, ...opts })
    : createContext({ subject: proxy, week });
  const line = render('{dinner.ending}', ctx, { trace: opts.trace || null })?.trim()
    || `${student.name} finishes the evening full and content.`;
  const band = getDinnerFullnessGroup(finalFullness, cap || student.stomachCapacity || 1);
  const overlay = render('{dinner.selectorOverlay}', ctx, { trace: opts.trace || null })?.trim() || '';
  const bandNote = band >= 2 ? ` She is gloriously, unmistakably full.` : '';
  if (line && overlay) return `${line}${bandNote} ${overlay}`;
  if (line) return `${line}${bandNote}`;
  return overlay;
}
