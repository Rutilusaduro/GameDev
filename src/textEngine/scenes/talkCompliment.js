// ═══════════════════════════════════════════════════════════════
// SCENE: TALK — "Compliment her figure", fully slot-composed.
// Replaces the compliment pool in gameData/talkDialogue.js (mined
// here — quotes verbatim where noted). Root module talk.compliment
// is invoked by TalkModal via engineTemplate; corruption-tier
// skeletons compose comp.* fragments. Reuses talk.moodOpener from
// talkEncourage.js; fig.bodyGesture from figureGestures.js.
// Per-girl voice: talkComplimentPersonas.js (load after this file).
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../engine.js';
import '../modules.js';
import './figureGestures.js';
import './talkEncourage.js'; // talk.moodOpener

// ╔══════════════════════════════════════════════════════════════
// ║ ROOT: talk.compliment — paragraph skeletons by corruption tier
// ╚══════════════════════════════════════════════════════════════
registerPool("talk.compliment", [
  // Tier 0 — flustered, guarded, praise still dangerous
  { when: { corruption: [0] }, priority: 1, text: [
    "{talk.moodOpener|suffix:\n\n}{comp.line0} {comp.shield|prefix: }\n\n{comp.hang|prefix: }{join:comp.bodyAsideLbs,comp.bodyAsideChange|prefix:\n\n}",
    "{talk.moodOpener|suffix:\n\n}{comp.line0}\n\n{comp.shield}\n\n{comp.hang}{join:comp.bodyAsideLbs,comp.bodyAsideChange|prefix:\n\n}",
  ]},
  // Tier 1 — practicing confidence, wants to hear more
  { when: { corruption: [1] }, priority: 1, text: [
    "{talk.moodOpener|suffix:\n\n}{comp.line1}\n\n{comp.react1}{fig.bodyGesture|prefix:, } {comp.invite|prefix: }\n\n{comp.bodyAside|prefix: }",
    "{talk.moodOpener|suffix:\n\n}{comp.line1} {comp.invite|prefix: }\n\n{comp.react1}{fig.bodyGesture|prefix:, }\n\n{comp.bodyAside|prefix: }",
  ]},
  // Tier 2 — owns it, displays, demands the words again
  { when: { corruption: [2] }, priority: 1, text: [
    "{talk.moodOpener|suffix:\n\n}{comp.line2}\n\n{comp.showcase}{fig.bodyGesture|prefix:, }\n\n{comp.closer2}",
    "{talk.moodOpener|suffix:\n\n}{comp.line2}{fig.bodyGesture|prefix:, }\n\n{comp.showcase}\n\n{comp.closer2}",
  ]},
  { when: {}, text: [
    "{talk.moodOpener|suffix:\n\n}{comp.line0}\n\n{comp.bodyAside}",
  ]},
]);

// ── Tier 0 — primary dialogue (personas in talkComplimentPersonas.js) ─
// Shape: DIALOGUE BEAT
registerPool("comp.line0", [
  { when: {}, text: [
    `{subject.name} flushes scarlet. "I— you noticed? I mean. Of course you noticed. It's… a lot to notice."`,
    `"You can't just say that," {subject.name} mutters, but she doesn't move away.`,
    `"Nobody's ever said it like they meant it before," {subject.name} says, voice gone careful.`,
  ]},
]);

// Shape: FULL SENTENCE — arms-up shield, can't hide the smile
registerPool("comp.shield", [
  { when: {}, text: [
    "She hugs her arms over her middle and fails to hide either the soft curve she's grown or the smile pulling at her mouth.",
    "Her hands hover at her waist, fingers pressing into the new softness there.",
    "Her fingers press into the new softness at her sides — checking, confirming, not pulling away.",
    "",
  ]},
]);

// Shape: FULL SENTENCE — the compliment landing
registerPool("comp.hang", [
  { when: {}, text: [
    "The compliment sits in the air between you. Her breathing changes — slower, deeper, belly rising against her top. She looks at you like she's waiting for the other shoe. It doesn't drop.",
    `"People aren't supposed to—" She stops. Swallows. The silence that follows is warmer than embarrassment.`,
    "She doesn't look away. The praise lands somewhere she's still deciding whether to keep.",
  ]},
]);

// ── Tier 1 ────────────────────────────────────────────────────
registerPool("comp.line1", [
  { when: {}, text: [
    `{subject.name} does a slow half-turn, letting you appreciate the work in progress. "It's coming along," she says, mock-modest. "I've been diligent."`,
    `"Say it again," {subject.name} murmurs, and this time she means it.`,
    `"Keep talking," she says, settling into the chair. The chair groans. She doesn't care. "No, really. Keep talking."`,
  ]},
]);

registerPool("comp.react1", [
  { when: {}, text: [
    "She isn't performing confidence. She's practicing it. Her smile is warm and a little surprised at herself.",
    "She runs both palms down the great curve of herself, feeling the weight settle.",
    "Her body moves differently when she shifts — softer, heavier, unapologetic.",
  ]},
]);

registerPool("comp.invite", [
  { when: {}, text: [
    `"You see it," she says. Not a question. "All of it."`,
    `"I used to want to be invisible. Now I want—" She exhales. "This. I want this."`,
    `"Don't stop," she murmurs. "I like how it sounds when you mean it."`,
  ]},
]);

// ── Tier 2 ────────────────────────────────────────────────────
registerPool("comp.line2", [
  { when: {}, text: [
    `{subject.name} takes the compliment the way she takes everything now — as her due. "I know," she says warmly. "And there's more of me every week. You're welcome."`,
    `"Again," {subject.name} says, eyes never leaving yours.`,
    `"Say it again," she says. "Slower. I like hearing you mean it."`,
  ]},
]);

registerPool("comp.showcase", [
  { when: {}, text: [
    "She smooths both hands down the vast soft geography of herself — slow, savoring, showing you without shame.",
    "Her enormous soft body fills the office with heat and presence — flesh pressing at every seam, jiggling when she shifts.",
    "She makes sure you're watching before she settles back — your attention is half the compliment.",
  ]},
]);

registerPool("comp.closer2", [
  { when: {}, text: [
    `"You wanted this," she murmurs. "So did I. Look what we made."`,
    `She takes your hand and places it on the warm crest of her belly. "Feel that? Still growing. Still yours to watch."`,
    `"More every week," she says simply. "Keep noticing."`,
  ]},
]);

// ── Shared body footnote ────────────────────────────────────────
// Shape: FULL SENTENCE with {subject.lbs}
registerPool("comp.bodyAsideLbs", [
  { when: {}, text: ["", ""] },
  { when: { stageMin: 2, stageMax: 5, corruption: [0] }, weight: 2, text: [
    "At {subject.lbs} lbs she's still new enough to this that praise feels dangerous — like admitting something out loud makes it real.",
  ]},
  { when: { stageMin: 2, stageMax: 5, corruption: [1] }, weight: 2, text: [
    "At {subject.lbs} lbs her body moves differently — belly swaying, hips rolling, ass and thighs plush with each step.",
  ]},
  { when: { stageMin: 6 }, weight: 2, text: [
    "At {subject.lbs} lbs she is abundant and warm and completely at home in the body you've helped her build.",
    "At {subject.lbs} lbs she is past the point of pretending — belly soft and heavy, flesh vast and unapologetic.",
  ]},
]);

registerPool("comp.bodyAsideChange", [
  { when: {}, text: ["", ""] },
  { when: { stageMin: 2, stageMax: 5, corruption: [0] }, weight: 2, text: [
    "Her hips are wider. Her thighs press together when she walks. Her face is fuller. She doesn't sound entirely unhappy about any of it.",
  ]},
]);

// Legacy slot name — tier 1/2 skeletons still use comp.bodyAside shorthand
registerPool("comp.bodyAside", [
  { when: {}, text: ["", ""] },
  { when: { stageMin: 2, stageMax: 5, corruption: [1] }, weight: 2, text: [
    "At {subject.lbs} lbs her body moves differently — belly swaying, hips rolling, ass and thighs plush with each step.",
  ]},
  { when: { stageMin: 6 }, weight: 2, text: [
    "At {subject.lbs} lbs she is abundant and warm and completely at home in the body you've helped her build.",
    "At {subject.lbs} lbs she is past the point of pretending — belly soft and heavy, flesh vast and unapologetic.",
  ]},
]);
