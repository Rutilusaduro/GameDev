// ═══════════════════════════════════════════════════════════════
// SCENE: JEALOUSY REACTION — roster favoritism lines
// ═══════════════════════════════════════════════════════════════
import { registerModule } from '../engine.js';

registerModule('jealousy.reaction', [
  {
    when: { favoritism: ['neglected'] },
    priority: 2,
    text: [
      (ctx) => `${ctx.subject.name} watches you feed someone else and goes very still. "I noticed where your attention went this week."`,
      (ctx) => `"You always find time for her," ${ctx.subject.name} says, not quite looking at you. "I'm still here too."`,
      (ctx) => `${ctx.subject.name} picks at her napkin. "I guess I'm not the one you're pushing right now."`,
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
