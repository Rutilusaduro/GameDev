// ═══════════════════════════════════════════════════════════════
// SCENE: JEALOUSY REACTION — roster favoritism lines
// ═══════════════════════════════════════════════════════════════
import { registerPool, registerModuleVariants, render, createContext } from '../engine.js';
import '../../gameData/textContext.js';

registerPool('jealousy.reaction', [
  {
    when: { favoritism: ['neglected'], relationship: [3, 4] },
    priority: 3,
    text: [
      (ctx) => `${ctx.subject.name} doesn't raise her voice. She doesn't have to. "I thought I was yours to feed."`,
      (ctx) => `${ctx.subject.name} watches you from across the room, belly soft, eyes sharper than last week. "She ate well. I noticed."`,
    ],
  },
  {
    when: { favoritism: ['neglected'], stageMin: 6 },
    priority: 2,
    text: [
      (ctx) => `${ctx.subject.name} shifts her weight — a slow, deliberate reminder of how much body you're ignoring. "Plenty of me still hungry, RA."`,
      (ctx) => `At ${Math.round(ctx.subject.lbs)} lbs, ${ctx.subject.name} should be impossible to overlook. You managed anyway.`,
    ],
  },
  {
    when: { favoritism: ['neglected'] },
    priority: 2,
    text: [
      (ctx) => `${ctx.subject.name} watches you feed someone else and goes very still. "I noticed where your attention went this week."`,
      (ctx) => `"You always find time for her," ${ctx.subject.name} says, not quite looking at you. "I'm still here too."`,
      (ctx) => `${ctx.subject.name} picks at her napkin. "I guess I'm not the one you're pushing right now."`,
      (ctx) => `${ctx.subject.name} tries to smile. It doesn't reach her eyes. "Should I wait my turn again?"`,
      (ctx) => `${ctx.subject.name} watches quietly — {word.jealousyReaction}.`,
    ],
  },
  {
    when: { favoritism: ['favored'], relationship: [3, 4] },
    priority: 2,
    text: [
      (ctx) => `${ctx.subject.name} leans into your attention like warmth. "Good. I was starting to worry you'd forget who needs you most."`,
      (ctx) => `"Keep choosing me," ${ctx.subject.name} murmurs, pleased and heavy with it. "I'll make it worth your while."`,
    ],
  },
  {
    when: { favoritism: ['favored'] },
    priority: 1,
    text: [
      (ctx) => `${ctx.subject.name} catches your eye and smiles — the easy confidence of someone who knows she's your priority.`,
      (ctx) => `"You came back to me," ${ctx.subject.name} murmurs, pleased. "Good. I noticed."`,
    ],
  },
  {
    when: {},
    text: [
      (ctx) => `${ctx.subject.name} glances at the table, measuring who got the bigger portion.`,
      (ctx) => `${ctx.subject.name} notes the portions without commenting. Yet.`,
      (ctx) => `${ctx.subject.name} watches the table the way she watches a ranking.`,
    ],
  },
]);

registerModuleVariants('jealousy.reaction', [
  { when: { leftoverFed: true, favoritism: ['neglected'], relationship: [3, 4] }, priority: 3, weight: 4, text: [
    (ctx) => `${ctx.subject.name} doesn't raise her voice. Extra help still in her from last night. "I thought I was yours to feed."`,
    (ctx) => `${ctx.subject.name} watches you from across the room. Seconds still rounding her. "She ate well. I noticed. Kitchen leftover isn't you."`,
  ]},
  { when: { leftoverFed: true, favoritism: ['neglected'], stageMin: 6 }, priority: 2, weight: 4, text: [
    (ctx) => `${ctx.subject.name} shifts already-fed weight — a slow reminder. "Plenty of me still hungry, RA."`,
  ]},
  { when: { leftoverFed: true, favoritism: ['neglected'] }, priority: 2, weight: 4, text: [
    (ctx) => `${ctx.subject.name} watches you feed someone else. Extra help didn't feel like attention. "I noticed where your attention went."`,
    (ctx) => `"You always find time for her," ${ctx.subject.name} says. Last sitting was food. It wasn't you.`,
  ]},
  { when: { leftoverFed: true, favoritism: ['favored'], relationship: [3, 4] }, priority: 2, weight: 4, text: [
    (ctx) => `${ctx.subject.name} leans into leftover heat and your attention. "Good. Extra help, then you. Keep choosing me."`,
  ]},
  { when: { leftoverFed: true, favoritism: ['favored'] }, priority: 1, weight: 4, text: [
    (ctx) => `${ctx.subject.name} catches your eye, extra help still showing, and smiles like the priority is correct.`,
    (ctx) => `"You came back to me," ${ctx.subject.name} murmurs. Last sitting, then this. "Good. I noticed."`,
  ]},
]);

export function renderJealousyReaction(student, favoritismFlag, week = 1) {
  if (!student || !favoritismFlag) return null;
  try {
    const line = render('{jealousy.reaction}', createContext({
      subject: student,
      week,
      globals: { favoritism: favoritismFlag },
    }), { noSmooth: true });
    if (!line || line.includes('{unresolved}')) return null;
    return line;
  } catch {
    return null;
  }
}
