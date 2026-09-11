// Branching evolved events — EVOLVED_EVENTS phase + choice pools.
import { registerPool } from '../../engine.js';
import { EVOLVED_EVENTS } from '../../../gameData/evolvedForms.js';
import { registerDecomposedPool } from '../decomposePools.js';
import { atmosphereBeat, choiceEchoBeat, endingEchoBeat } from './proseTails.js';

const SAMPLE_EVOLVED_SUBJECT = { id: 'mj', name: 'MJ', lbs: 240, archetype: 'cheerleader' };

function samplePhaseProse(phase, history = []) {
  if (typeof phase.text === 'string') return (phase.text || '').trim();
  if (typeof phase.text === 'function') {
    try {
      return String(phase.text(history, SAMPLE_EVOLVED_SUBJECT)).trim();
    } catch {
      return '';
    }
  }
  return '';
}

function sampleChoiceProse(choice, history = []) {
  if (typeof choice.result === 'string') return (choice.result || '').trim();
  if (typeof choice.result === 'function') {
    const attempts = [
      () => choice.result(SAMPLE_EVOLVED_SUBJECT, history),
      () => choice.result(history, SAMPLE_EVOLVED_SUBJECT),
      () => choice.result(SAMPLE_EVOLVED_SUBJECT),
      () => choice.result(history),
      () => choice.result(),
    ];
    for (const fn of attempts) {
      try {
        const out = fn();
        if (out) return String(out).trim();
      } catch {
        /* try next signature */
      }
    }
  }
  return '';
}

function sampleEndingProse(ending, history = [], totalGain = 0) {
  if (typeof ending.text === 'string') return (ending.text || '').trim();
  if (typeof ending.text === 'function') {
    try {
      return String(ending.text(history, SAMPLE_EVOLVED_SUBJECT, totalGain)).trim();
    } catch {
      return '';
    }
  }
  return '';
}

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
      const poolKey = `evolved.event.${formId}.s${stageIdx}.p${phaseIdx}`;
      const legacyBody = samplePhaseProse(phase);
      if (legacyBody) registerDecomposedPool(`${poolKey}.legacyBody`, legacyBody);
      registerPool(poolKey, [
        {
          when: {},
          text: [
            intro,
            atmosphereBeat(formId, phaseIdx, 0),
            atmosphereBeat(formId, phaseIdx, 1),
          ],
        },
      ]);
      for (const ch of phase.choices || []) {
        if (!ch?.id) continue;
        const res = (ctx) => resolveChoiceResult(ch, ctx);
        const choiceKey = `evolved.event.${formId}.s${stageIdx}.p${phaseIdx}.${ch.id}`;
        const choiceBody = sampleChoiceProse(ch);
        if (choiceBody) registerDecomposedPool(`${choiceKey}.legacyBody`, choiceBody);
        registerPool(choiceKey, [
          {
            when: {},
            text: [
              res,
              choiceEchoBeat(formId, ch.id, 0),
              choiceEchoBeat(formId, ch.id, 1),
            ],
          },
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
      const endKey = `evolved.event.${formId}.s${stageIdx}.end${endingIdx}`;
      const endBody = sampleEndingProse(ending);
      if (endBody) registerDecomposedPool(`${endKey}.legacyBody`, endBody);
      registerPool(endKey, [
        {
          when: {},
          text: [
            endFn,
            endingEchoBeat(formId, stageIdx, endingIdx, 0),
            endingEchoBeat(formId, stageIdx, endingIdx, 1),
          ],
        },
      ]);
    });
  });
}
