// ═══════════════════════════════════════════════════════════════
// WEIGH-IN BREAK SCENE — the analog scale cracks under her.
// wi.breakBeat  — physical aftermath (stage/corruption keyed)
// wi.breakLine  — her reaction (per-girl + corruption in breakPersonas.js)
// wi.breakBellyTouch — size-keyed belly gesture for tier-2 beats
// wi.swap / wi.purchase — professor-voice beats for scale logistics.
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../../engine.js';
import './fragments.js';

// ── wi.breakBeat ──────────────────────────────────────────────
// Shape: FULL SENTENCE — what the broken scale looks/sounds like.
registerPool("wi.breakBeat", [
  { when: {}, text: [
    "The dial window spiders with cracks; the needle dies mid-climb.",
    "Something under the platform gives with a flat, final crack.",
    "The scale makes one last sound — half creak, half surrender — and the glass fractures.",
    "The platform sinks a half-inch and stays there. The dial face is a web of cracks.",
  ]},
  { when: { corruption: [0] }, text: [
    "The crack is the loudest thing either of you has heard all week. She freezes mid-step, like stillness might undo it.",
    "Glass splinters under the dial face. Her hands fly up — an apology already forming.",
  ]},
  { when: { corruption: [1] }, text: [
    "The dial dies mid-climb. She watches it go with something between guilt and pride.",
    "The platform gives with a flat crack. She exhales — less startled than she expected to be.",
  ]},
  { when: { corruption: [2] }, text: [
    "The crack of the dial glass sounds almost ceremonial. She does not flinch.",
    "The scale breaks under her like a record being set.",
    "Glass splinters, and she stays on the platform a moment longer — letting the wreckage make her point for her.",
  ]},
  { when: { stageMin: 8 }, weight: 2, text: [
    "The scale does not so much break as concede — platform bowing, glass going white with fractures.",
    "There is a crunch, then quiet. The scale has filed its resignation.",
  ]},
]);

// ── wi.breakBellyTouch ────────────────────────────────────────
// Shape: PARTICIPLE CLAUSE — mid-sentence gesture after a comma.
// Stage bands so tier-2 break lines don't describe a blob belly
// at stage 2, and heavy girls get a deliberate heft at high weight.
registerPool("wi.breakBellyTouch", [
  { when: {}, text: ["", ""] },
  { when: { stageMin: 2, stageMax: 4 }, text: [
    "smoothing her top over the soft curve of her belly",
    "pressing a palm to the warmth gathering at her middle",
  ]},
  { when: { stageMin: 5, stageMax: 7 }, weight: 2, text: [
    "running both hands over the heavy round of her belly",
    "cupping the low swell of her belly and letting it settle in her palms",
  ]},
  { when: { stageMin: 8, stageMax: 9 }, weight: 2, text: [
    "spreading both palms over the vast warm weight of her belly",
    "lifting the heavy overflow of her belly and letting it drop back with a slow, satisfied sway",
  ]},
  { when: { stageMin: 10 }, weight: 3, text: [
    "hefting the enormous mass of her belly up in both hands and letting it settle back slow, flesh rippling",
    "gathering the heavy weight of her belly in her palms and holding it there a moment, giving you time to look",
    "lifting the warm overflow of her belly with both hands and swaying it once, deliberate, eyes on yours",
  ]},
]);

// ── wi.breakLine ──────────────────────────────────────────────
// Shape: DIALOGUE BEAT — her verdict on the wreckage.
// Per-girl corruption-tiered voice lives in breakPersonas.js.
registerPool("wi.breakLine", [
  // Corruption-keyed generics — pool alongside persona lines.
  { when: { corruption: [0] }, weight: 2, text: [
    `{subject.name} steps off fast, cheeks burning. "That was already cracked. Right? Tell me that was already cracked."`,
    `{subject.name} stares at the wreckage, mortified. "I'll pay for it," she says, in the voice of someone doing math she can't afford.`,
  ]},
  { when: { corruption: [1] }, weight: 2, text: [
    `{subject.name} looks at the dead scale for a moment. "Huh," she says. "Guess we graduated."`,
    `{subject.name} prods the cracked glass with her toe. "In my defense," she says, "I gave it plenty of warning."`,
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    `{subject.name} smiles down at the wreckage like it flattered her. "Get a bigger one. I'll break that too."`,
    `{subject.name} steps off, unhurried{wi.breakBellyTouch|prefix:, }, and pats the dead dial. "It did its best. I'm just more than it was built to believe."`,
  ]},
  // Generic fallbacks so the pool never goes silent.
  { when: {}, text: [
    `{subject.name} steps off and looks down at the fractured dial, then at you. "You're going to need a bigger scale."`,
    `{subject.name} considers the wreckage for a moment. "Well," she says. "That settles that."`,
    `{subject.name} looks from the cracked glass to you and back. "I'd say sorry, but we both saw this coming."`,
  ]},
]);

// ── wi.swap — professor swaps in the industrial scale ─────────
// Shape: FULL SENTENCE skeleton, professor voice.
registerPool("wi.swap", [
  { when: {}, text: [
    "{wi.swapWave} {wi.swapPlatform}",
  ]},
]);

// Shape: FULL SENTENCE — waving her off the wreckage.
registerPool("wi.swapWave", [
  { when: {}, text: [
    `"Hey — it's fine." You wave {subject.first} off the cracked white scale. "I figured this would happen again. Got us a proper one after the first time."`,
    `"Don't worry about it." You nudge the wreckage aside with your foot. "I came prepared this time."`,
    `You motion {subject.first} aside. "Round two. This one's rated for ambition."`,
  ]},
]);

// Shape: FULL SENTENCE — producing the industrial platform.
registerPool("wi.swapPlatform", [
  { when: {}, text: [
    "You drag the heavy industrial platform out from beside the desk and thump it down.",
    "The industrial platform lands with a thud that means business.",
    "You haul the steel platform into place; it does not care what it is asked to weigh.",
  ]},
]);

// ── wi.purchase — professor notes the need for a bigger scale ─
// Shape: FULL SENTENCE block, professor voice.
registerPool("wi.purchase", [
  { when: {}, text: [
    `You stare at the cracked dial for a second, then exhale a laugh. "Okay. That's on me, not on {subject.first}." You make a real note to order a proper heavy-duty scale before the next check-in.`,
    `You look at the wreckage, then at {subject.first}, then back at the wreckage. "Noted," you say, and add 'industrial scale' to the top of the procurement list.`,
    `"Well." You tap the dead dial once. "It had a good run." The order for a heavy-duty platform goes in tonight.`,
  ]},
]);
