// Branching evolved events — EVOLVED_EVENTS phase + choice pools.
import { registerPool } from '../../engine.js';
import { EVOLVED_EVENTS } from '../../../gameData/evolvedForms.js';

function resolvePhaseText(phase, ctx) {
  const h = ctx.globals?.history || [];
  const subj = ctx.subject;
  const ref = ctx.ref ?? ctx.globals?.eventRef ?? null;
  if (typeof phase.text !== 'function') return (phase.text || '').trim();
  if (ref != null) {
    try {
      const out = phase.text(h, subj, ref);
      if (out) return String(out).trim();
    } catch {
      /* 2-arg fallback */
    }
  }
  return String(phase.text(h, subj)).trim();
}

function resolveChoiceResult(choice, ctx) {
  const subj = ctx.subject;
  if (typeof choice.result === 'function') return String(choice.result(subj)).trim();
  return (choice.result || '').trim();
}

for (const [formId, stages] of Object.entries(EVOLVED_EVENTS)) {
  if (!Array.isArray(stages)) continue;
  stages.forEach((evDef, stageIdx) => {
    if (!evDef?.phases) return;
    evDef.phases.forEach((phase, phaseIdx) => {
      const intro = (ctx) => resolvePhaseText(phase, ctx);
      registerPool(`evolved.event.${formId}.s${stageIdx}.p${phaseIdx}`, [
        {
          when: {},
          text: [intro, intro, (ctx) => `${intro(ctx)}\n\nThe moment holds — appetite, choice, consequence.`],
        },
      ]);
      for (const ch of phase.choices || []) {
        if (!ch?.id) continue;
        const res = (ctx) => resolveChoiceResult(ch, ctx);
        registerPool(`evolved.event.${formId}.s${stageIdx}.p${phaseIdx}.${ch.id}`, [
          { when: {}, text: [res, res, res] },
        ]);
      }
    });
    (evDef.endings || []).forEach((ending, endingIdx) => {
      const endFn = (ctx) => {
        const h = ctx.globals?.history || [];
        const subj = ctx.subject;
        const g = ctx.globals?.totalGain ?? ctx.globals?.gainAccum ?? 0;
        if (typeof ending.text === 'function') return String(ending.text(h, subj, g)).trim();
        return (ending.text || '').trim();
      };
      registerPool(`evolved.event.${formId}.s${stageIdx}.end${endingIdx}`, [
        { when: {}, text: [endFn, endFn, endFn] },
      ]);
    });
  });
}
