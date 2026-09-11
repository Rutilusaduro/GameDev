// The Squad — Lead: A2 Psych | Support: A7 Artisan, A5 Editor
// ═══════════════════════════════════════════════════════════════
// CONFRONTATION — when discontent boils over, she stops you and says
// it to your face. Names the grievance (from the memory store) and
// draws a line. Reused for the win-back, framed as you reaching out.
//   globals: grievanceType ∈ betrayed | creeped | exposed ; winBack:bool
// ═══════════════════════════════════════════════════════════════
import { registerPool, registerModuleVariants, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import '../proseOverhaulPass2.js';
import '../proseOverhaulPass4.js';

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

registerModuleVariants('confront.open', [
  { when: { leftoverFed: true, winBack: true }, priority: 1, weight: 4, text: [
    `You find {subject.name} keeping distance. Leftover heat did not soften the line.`,
    `She lets you speak. The leftover sitting stays in the room between you.`,
  ]},
  { when: { leftoverFed: true }, weight: 3, text: [
    `{subject.name} stops you. The leftover sitting is in how she stands.`,
    `She blocks the path with a middle the kitchen already filled.`,
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
  { when: { leftoverFed: true, grievanceType: 'creeped' }, weight: 4, text: [
    `"You comment on my body like it's yours," she says. "The leftover sitting made it worse to hear."`,
    `"You keep looking," she says. "Last night's tray is still on me and you still look."`,
  ]},
  { when: { leftoverFed: true, grievanceType: 'betrayed' }, weight: 4, text: [
    `"You pushed food when I said no," she says. "Then the kitchen sent more. I remember both."`,
    `"You didn't listen," she says. "Leftover sitting is not consent. Stop treating it like it is."`,
  ]},
  { when: { leftoverFed: true, grievanceType: 'exposed' }, weight: 4, text: [
    `"You keep putting me on display," she says. "Everyone can see last night's sitting too."`,
    `"The hall watched me eat," she says. "The leftover heat made it public again this morning."`,
  ]},
  { when: { studentId: 3, grievanceType: 'betrayed' }, weight: 5, text: [
    `"I told you I was full. You did it anyway," Serena says. "I don't get pushed around. Not by anyone."`,
  ]},
]);

registerModuleVariants('confront.demand', [
  { when: { leftoverFed: true, winBack: true }, priority: 1, weight: 4, text: [
    `She waits. "Convince me. Last night's tray is not the argument."`,
    `"I'm listening," she says. "Leftover heat does not count as making it right."`,
  ]},
  { when: { leftoverFed: true }, weight: 3, text: [
    `"Something changes," she says. "The leftover sitting does not get a vote."`,
    `"Your call," she says. "Kitchen heat is not an apology."`,
  ]},
]);

// ── confront.memoryCallback ───────────────────────────────────
// Shape: SHORT SENTENCE — she names a specific past incident from
// the memory store. Fires as a second beat after confront.grievance
// when memType is in scope, giving the confrontation a concrete anchor.
// globals: memType ∈ forced | feast | stageUp | stuffed ; memWeeksAgo
registerPool('confront.memoryCallback', [
  // Mandatory fallback — no memory in scope, no callback fires.
  { when: {}, text: [''] },

  // betrayed grievance + forced memory — she recalls the specific feed.
  { when: { grievanceType: 'betrayed', memType: 'forced' }, weight: 4, text: [
    (ctx) => `"${ctx.globals?.memWeeksAgo === 1 ? 'Last week' : `${ctx.globals?.memWeeksAgo ?? 'A few weeks'} weeks ago`} — I told you I was full and you kept going. That's the one I keep thinking about."`,
    `"I remember exactly which time. I said stop. You heard me."`,
  ]},

  // betrayed grievance + feast memory — the big meal she didn't choose.
  { when: { grievanceType: 'betrayed', memType: 'feast' }, weight: 3, text: [
    `"That big meal — the one you arranged without asking. That was the moment I realized I don't actually get a vote here."`,
  ]},

  // creeped grievance + stageUp memory — she noticed you noticed her change.
  { when: { grievanceType: 'creeped', memType: 'stageUp' }, weight: 4, text: [
    `"When I changed — when my body started really changing — the way you looked at me? I saw it. I've been seeing it."`,
    `"You started paying a different kind of attention right around when the numbers went up. Don't pretend you didn't."`,
  ]},

  // creeped grievance + forced memory — a forced feed that read as predatory.
  { when: { grievanceType: 'creeped', memType: 'forced' }, weight: 3, text: [
    `"There was a specific moment where I thought — he's enjoying this. Not in a normal way. And I didn't know what to do with that."`,
  ]},

  // exposed grievance + feast memory — a public feed she hadn't consented to.
  { when: { grievanceType: 'exposed', memType: 'feast' }, weight: 4, text: [
    `"That dinner — in front of everyone. You sat there and watched them watch me eat and you never once asked if that was okay."`,
    `"I know exactly which time. Everyone at the table could see how much I ate. And you let them."`,
  ]},

  // exposed grievance + stageUp memory — her changing body, watched publicly.
  { when: { grievanceType: 'exposed', memType: 'stageUp' }, weight: 3, text: [
    `"When I was getting bigger — visibly bigger — you didn't protect me from anyone's attention. You made it into a performance."`,
  ]},

  // stuffed memory, any grievance type — the over-full incident.
  { when: { memType: 'stuffed' }, weight: 2, text: [
    `"You kept feeding me until I couldn't move and then you just — watched. Like it was fine. Like I was fine."`,
  ]},
]);

// ── confront.withMemory — skeleton that weaves in the callback ─
// Shape: FULL SCENE — open + grievance + optional memory anchor + demand.
registerPool('confront.withMemory', [
  { when: {}, text: [
    '{confront.open} {confront.grievance}{confront.memoryCallback|prefix: } {confront.demand}',
  ]},
]);

export function renderConfront(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, globals: { ...opts } });
  const scene = render('{confront}', ctx, { trace: opts.trace || null })?.trim() || '';
  const glow = render('{confront.afterglow}', ctx, { trace: opts.trace || null })?.trim() || '';
  const linger = render('{confront.linger}', ctx, { trace: opts.trace || null })?.trim() || '';
  const base = [scene, glow, linger].filter(Boolean).join('\n\n');
  return appendV2Depth(base, 'confront', ctx, opts.v2DepthChance ?? 0.28);
}

/** Render confrontation with a memory-anchored grievance callback.
 *  Pass memType + memWeeksAgo from pickStudentMemory() in opts.globals. */
export function renderConfrontWithMemory(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, globals: { ...opts } });
  const scene = render('{confront.withMemory}', ctx, { trace: opts.trace || null })?.trim() || '';
  const glow = render('{confront.afterglow}', ctx, { trace: opts.trace || null })?.trim() || '';
  const linger = render('{confront.linger}', ctx, { trace: opts.trace || null })?.trim() || '';
  const base = [scene, glow, linger].filter(Boolean).join('\n\n');
  return appendV2Depth(base, 'confront', ctx, opts.v2DepthChance ?? 0.3);
}
