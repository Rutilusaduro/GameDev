// ═══════════════════════════════════════════════════════════════
// SCENE: JEALOUSY REACTION — roster favoritism lines
// ═══════════════════════════════════════════════════════════════
import { registerPool, render, createContext } from '../engine.js';

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
      (ctx) => `${ctx.subject.name} shifts her weight — a slow, deliberate reminder of how much body you're ignoring. "Plenty of me still hungry, Professor."`,
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
    ],
  },
]);

export function renderJealousyReaction(student, favoritismFlag, week = 1) {
  if (!student || !favoritismFlag) return null;
  try {
    const line = render('{jealousy.reaction}', createContext({
      student,
      subject: student,
      week,
      favoritism: favoritismFlag,
    }), { noSmooth: true });
    if (!line || line.includes('{unresolved}')) return null;
    return line;
  } catch {
    return null;
  }
}
