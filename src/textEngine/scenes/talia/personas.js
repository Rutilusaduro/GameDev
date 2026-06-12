// Talia Vale (studentId 18) — clinical / obsessive voice
import { registerModuleVariants } from '../../engine.js';
import './fragments.js';

const W = 4;
const ID = 18;

registerModuleVariants('wi.replyDialogue', [
  { when: { studentId: ID, corruption: [0], stageMax: 3 }, weight: W, text: [
    (ctx) => `"${Math.round(ctx.subject.lbs)} pounds. Acceptable baseline variance," Talia says, tapping her tablet. "I've been logging intake against output. The slope is promising."`,
    '"Scale reading confirmed," she says without looking up from her notes. "I can work with this dataset."',
  ]},
  { when: { studentId: ID, corruption: [0], stageMin: 4, stageMax: 6 }, weight: W, text: [
    (ctx) => `"${Math.round(ctx.subject.lbs)} pounds." She exhales through her nose — not disappointment, calibration. "Mass accumulation is tracking ahead of projection. Good."`,
    (ctx) => `"That's a ${Math.round(ctx.subject.lbs)} pound system," she says, clinical and pleased. "I want to see what happens when we remove manual bottlenecks."`,
  ]},
  { when: { studentId: ID, corruption: [1], stageMax: 6 }, weight: W, text: [
    (ctx) => `"${Math.round(ctx.subject.lbs)} pounds." Her voice dips. "I keep telling myself it's just instrumentation. The instrumentation disagrees."`,
    (ctx) => `"Logged: ${Math.round(ctx.subject.lbs)}." She presses a hand to her own waist, distracted. "Sorry — parallel experiment."`,
  ]},
  { when: { studentId: ID, corruption: [2], stageMax: 6 }, weight: W, text: [
    (ctx) => `"${Math.round(ctx.subject.lbs)} pounds and climbing," she says, almost reverent. "I don't build devices for where bodies are. I build them for where they're going."`,
  ]},
  { when: { studentId: ID, corruption: [0], stageMin: 7 }, weight: W, text: [
    (ctx) => `"${Math.round(ctx.subject.lbs)} pounds." She smiles — thin, bright. "At this mass I can spend fat to build fat. Ambiguous. Efficient."`,
  ]},
  { when: { studentId: ID, equippedWaist: 'auto_bloating_belt' }, weight: W + 1, text: [
    (ctx) => `"${Math.round(ctx.subject.lbs)} pounds with active bloat assist," she reads off a wrist display. "Beautiful noise in the data."`,
  ]},
  { when: { studentId: ID, dependenceTierMin: 2 }, weight: W, text: [
    (ctx) => `"${Math.round(ctx.subject.lbs)} pounds." She doesn't blink. "Machine dependence index elevated. Expected. Healthy, even."`,
  ]},
]);

registerModuleVariants('enc.owned', [
  { when: { studentId: ID }, weight: W, text: [
    `"Positive reinforcement improves compliance metrics," Talia says, sliding food forward like a lab sample. "Let's generate better data."`,
  ]},
]);

registerModuleVariants('enc.accept', [
  { when: { studentId: ID }, weight: W, text: [
    `"Hypothesis accepted," Talia says. "I'll note willingness as a controlled variable." She opens the next container without ceremony.`,
  ]},
]);

registerModuleVariants('enc.deflect', [
  { when: { studentId: ID }, weight: W, text: [
    `"Sample size insufficient," Talia says flatly, already recalculating portions. "We're extending the trial."`,
  ]},
]);

registerModuleVariants('enc.reach', [
  { when: { studentId: ID, corruption: [1] }, weight: W, text: [
    `She reaches before you finish speaking — not hungry, precise. "If we're measuring appetite, we should measure maximum."`,
  ]},
]);

registerModuleVariants('enc.giveIn', [
  { when: { studentId: ID, corruption: [2] }, weight: W, text: [
    `"Fine," Talia breathes, cheeks flushed in a way she refuses to categorize. "Log it as voluntary excess. I don't care anymore."`,
  ]},
]);
