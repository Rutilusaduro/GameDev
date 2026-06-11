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
    ] },
  // No register unlocked — emit nothing
  { when: {}, text: "" },
]);
