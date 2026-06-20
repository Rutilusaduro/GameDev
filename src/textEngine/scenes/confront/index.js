// The Squad — Lead: A2 Psych | Support: A7 Artisan, A5 Editor
// ═══════════════════════════════════════════════════════════════
// CONFRONTATION — when discontent boils over, she stops you and says
// it to your face. Names the grievance (from the memory store) and
// draws a line. Reused for the win-back, framed as you reaching out.
//   globals: grievanceType ∈ betrayed | creeped | exposed ; winBack:bool
// ═══════════════════════════════════════════════════════════════
import { registerPool, registerModuleVariants, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';

// ── confront.open ─────────────────────────────────────────────
registerPool('confront.open', [
  { when: {}, text: [
    `{subject.name} stops you before you can start. Her jaw is set, her arms crossed.`,
  ]},
  { when: { winBack: true }, priority: 1, text: [
    `You find {subject.name} where she's been keeping her distance. She doesn't soften, but she lets you speak.`,
  ]},
  { when: { studentId: 3 }, weight: 4, text: [
    `Serena plants herself in your path, squared up like she's about to lift something heavy. "We're doing this now."`,
  ]},
  { when: { studentId: 7 }, weight: 4, text: [
    `Priya closes her planner with a snap and folds her hands. "I've been keeping a list. We need to talk about it."`,
  ]},
]);

// ── confront.grievance ────────────────────────────────────────
registerPool('confront.grievance', [
  { when: {}, text: [
    `"You've been treating me like I don't get a say in any of this," she says. "I do."`,
  ]},
  { when: { grievanceType: 'creeped' }, weight: 3, text: [
    `"You comment on my body like it's yours to look at," she says. "It isn't. I hate it. Stop."`,
  ]},
  { when: { grievanceType: 'betrayed' }, weight: 3, text: [
    `"You pushed food on me when I wasn't ready — when I was telling you no," she says, voice tight. "You didn't listen."`,
  ]},
  { when: { grievanceType: 'exposed' }, weight: 3, text: [
    `"You keep putting me on display, in front of everyone, before I ever said I was okay with it," she says.`,
  ]},
]);

// ── confront.demand ───────────────────────────────────────────
registerPool('confront.demand', [
  { when: {}, text: [
    `"So something changes," she says. "Or I'm done here. Your call."`,
  ]},
  { when: { winBack: true }, priority: 1, text: [
    `She watches you, waiting. "Convince me it'll be different. I'm listening — for now."`,
  ]},
]);

// ── confront — composed skeleton ──────────────────────────────
registerPool('confront', [
  { when: {}, text: ['{confront.open} {confront.grievance} {confront.demand}'] },
]);

// Persona flavor on the grievance line for a couple of distinct voices.
registerModuleVariants('confront.grievance', [
  { when: { studentId: 3, grievanceType: 'betrayed' }, weight: 5, text: [
    `"I told you I was full. You did it anyway," Serena says. "I don't get pushed around. Not by anyone."`,
  ]},
]);

export function renderConfront(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, globals: { ...opts } });
  return render('{confront}', ctx, { trace: opts.trace || null })?.trim() || '';
}
