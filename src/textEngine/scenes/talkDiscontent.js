// The Squad — Lead: A2 Psych | Support: A7 Artisan, A5 Editor
// ═══════════════════════════════════════════════════════════════
// talk.discontentCoda — a cold shade appended to ANY conversation when
// she's unhappy with you. Mirrors the hungryCoda pattern: priority-gated
// by tier, silent ({ when:{} }, '') when she's content. Reads her mood
// through behavior, never a number.
//   selector: discontentTier (global) ∈ 1 | 2 | 3
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../engine.js';

registerPool('talk.discontentCoda', [
  { when: { discontentTier: 3 }, priority: 3, text: [
    ` Every answer lands flat and final; she's barely in the room with you, and you both know why.`,
    ` She gives you the bare minimum and nothing past it — jaw set, gaze somewhere over your shoulder.`,
    ` Conversation ends before you finish the thought. She is already elsewhere.`,
  ]},
  { when: { discontentTier: 2 }, priority: 2, text: [
    ` Her replies come clipped, eyes sliding off yours; whatever you did is still sitting in the room between you.`,
    ` She answers in the shortest sentences possible — warmth withheld, distance deliberate.`,
  ]},
  { when: { discontentTier: 1 }, priority: 1, text: [
    ` There's a cool edge under the courtesy now — a half-beat of distance she didn't used to keep.`,
    ` Politeness intact. Warmth missing. You feel the gap like a draft.`,
  ]},
  { when: {}, text: ['', '', ''] },
]);
