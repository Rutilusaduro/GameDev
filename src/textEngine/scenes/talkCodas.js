// ═══════════════════════════════════════════════════════════════
// SCENE: TALK CODAS — register suffixes appended to talk responses
// Selector-driven replacement for the hardcoded coda chain in
// TalkModal (content migrated from talkSystem REGISTER_CODAS).
// The broken register wins over submissive at corruption tier 2
// via priority — the old if/else got this backwards.
// ═══════════════════════════════════════════════════════════════
import { registerModule } from '../engine.js';

registerModule("talk.coda", [
  // Broken register — corruption tier 2 + brokenMind skill
  { when: { corruption: [2], skill: "brokenMind" }, priority: 1,
    text: [
      (ctx) => `${ctx.subject.name}'s eyes have gone soft and depthless. "Whatever you want," she murmurs. "I stopped keeping track of where I end and your wanting begins."`,
      (ctx) => `"I used to have other plans," ${ctx.subject.name} says dreamily, patting herself. "Isn't that funny? I genuinely can't remember what they were."`,
    ] },
  // Submissive register — corruption tier 1+ + internalizedRole skill
  { when: { corruption: [1, 2], skill: "internalizedRole" },
    text: [
      (ctx) => `"...thank you for taking care of me, Professor," ${ctx.subject.name} adds, quieter. "Your greedy girl appreciates it."`,
      (ctx) => `${ctx.subject.name} adds, almost to herself: "I'm getting so big for you." She doesn't seem to notice she said 'for you.'`,
      (ctx) => `"You know exactly what I need," ${ctx.subject.name} says, voice low. "You always do."`,
      (ctx) => `${ctx.subject.name} leans into the attention like warmth. "Keep going. I'm yours to feed."`,
    ] },
  // High relationship — devoted register
  { when: { relationship: [3, 4] },
    text: [
      (ctx) => `${ctx.subject.name} catches your eye afterward, smiling like this was the best part of her week.`,
      (ctx) => `"I trust you," ${ctx.subject.name} says simply. "Even when you're pushing."`,
      (ctx) => `${ctx.subject.name} exhales, soft and full. "You always know how to reach me."`,
    ] },
  // Hunger-forward codas
  { when: { hungerTier: [3, 4], corruption: [1, 2] },
    text: [
      (ctx) => `${ctx.subject.name} licks her lips. "Don't stop talking. I'm still hungry."`,
      (ctx) => `The conversation trails off — ${ctx.subject.name} is already looking at the pantry.`,
    ] },
  // Per-student corruption[2] codas — personality-specific end beats
  { when: { studentId: 5, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} pulls the hoodie tighter. "Don't go," she says to the doorway after you leave. The stream is still running.`,
      (ctx) => `"Hold on." ${ctx.subject.name} puts the controller down. "You don't have to go yet." She doesn't reach for it again.`,
    ] },
  { when: { studentId: 10, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} slides something across the table toward you. "I made extra," she says. "I always make extra now."`,
      (ctx) => `"You're the only person I cook for at this hour," ${ctx.subject.name} says. The pot is already on the stove. It was already on the stove.`,
    ] },
  { when: { studentId: 16, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} looks at you with something that isn't anxiety anymore. "Optimal outcome," she says. "I wrote it in the notes."`,
      (ctx) => `"The case study is ongoing," ${ctx.subject.name} adds quietly. "I don't want to conclude it." A pause. "I won't."`,
    ] },
  // No register unlocked — emit nothing
  { when: {}, text: "" },
]);
