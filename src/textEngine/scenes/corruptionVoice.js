// ═══════════════════════════════════════════════════════════════
// SCENE: CORRUPTION VOICE — inner monologue during feeds
// Expanded pool keyed on corruption tier + hunger tier.
// ═══════════════════════════════════════════════════════════════
import { registerModule } from '../engine.js';

registerModule('corruption.voice', [
  {
    when: { corruption: [0], hungerTier: [0, 1] },
    text: [
      (ctx) => `${ctx.subject.name}, quietly: "I… I don't know if I should be eating this much…"`,
      (ctx) => `${ctx.subject.name} glances down mid-bite and goes pink. She keeps eating, slower.`,
      (ctx) => `${ctx.subject.name}: "This is the last one. I mean it this time."`,
    ],
  },
  {
    when: { corruption: [0], hungerTier: [2, 3, 4] },
    text: [
      (ctx) => `${ctx.subject.name} eats before you finish setting the plate down. "Sorry — I was hungry."`,
      (ctx) => `Hunger wins before shame can: ${ctx.subject.name} is already reaching for seconds.`,
    ],
  },
  {
    when: { corruption: [1], relationship: [3, 4] },
    text: [
      (ctx) => `${ctx.subject.name} presses closer after the meal. "You know what I want before I ask. That's why I stay."`,
      (ctx) => `"Feed me like that every week," ${ctx.subject.name} whispers, "and I'll never pretend I'm not yours."`,
    ],
  },
  {
    when: { corruption: [1] },
    text: [
      (ctx) => `${ctx.subject.name}, softer than she intends: "It feels kind of good when you make me eat like this."`,
      (ctx) => `${ctx.subject.name} catches herself reaching for more without being asked, and decides not to stop.`,
      (ctx) => `${ctx.subject.name}: "I thought about this all day. The food. Is that weird?"`,
      (ctx) => `${ctx.subject.name} presses a hand to her belly — not in dismay. Checking. Appreciating.`,
      (ctx) => `"I know I shouldn't want this," ${ctx.subject.name} admits, "but my body disagrees louder every week."`,
    ],
  },
  {
    when: { corruption: [2], hungerTier: [0, 1, 2] },
    text: [
      (ctx) => `${ctx.subject.name}, grinning around a mouthful: "I'm such a greedy pig now… and I don't even want to stop."`,
      (ctx) => `${ctx.subject.name} finishes the plate and slides it back toward you. "More." It isn't a question.`,
      (ctx) => `${ctx.subject.name}: "Look what you did to me." She says it like a thank-you.`,
      (ctx) => `${ctx.subject.name} pats the deep curve of her belly with open pride. "We can do better than this. Feed me."`,
    ],
  },
  {
    when: { corruption: [2], hungerTier: [3, 4] },
    text: [
      (ctx) => `${ctx.subject.name} doesn't wait for permission anymore. "You taught me this hunger. Now satisfy it."`,
      (ctx) => `Starving and shameless: ${ctx.subject.name} pulls the dish toward herself before you sit down.`,
      (ctx) => `${ctx.subject.name} moans through the first bite. "Finally. I've been thinking about your hands on the serving spoon all day."`,
    ],
  },
  {
    when: { addictionLevel: [2, 3] },
    text: [
      (ctx) => `${ctx.subject.name}'s hands shake slightly until the food arrives — then go steady around the fork.`,
      (ctx) => `"Don't make me wait," ${ctx.subject.name} breathes. "You know what withdrawal does to me."`,
    ],
  },
  {
    when: {},
    text: [
      (ctx) => `${ctx.subject.name} eats with the careful attention of someone being watched — and liking it.`,
    ],
  },
]);
