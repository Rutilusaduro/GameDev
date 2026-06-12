// ═══════════════════════════════════════════════════════════════
// WEIGH-IN BREAK SCENE — the analog scale cracks under her.
// wi.breakBeat  — physical aftermath (stage/corruption keyed)
// wi.breakLine  — her reaction (per-girl, mined from the retired
//                 BREAK_SCENES in WeighInModal.jsx — quotes verbatim)
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

// ── wi.breakLine ──────────────────────────────────────────────
// Shape: DIALOGUE BEAT — her verdict on the wreckage. Per-girl.
registerPool("wi.breakLine", [
  { when: { studentId: 0 }, weight: 4, text: [
    `Brittany hops off like she's dismounting a routine, hands on her hips, completely unbothered. "Okay, that one is on the scale, not me."`,
  ]},
  { when: { studentId: 1 }, weight: 4, text: [
    `Madeline tilts her head at the fractured window with quiet, academic interest. "Material failure under sustained load. Predictable, actually."`,
  ]},
  { when: { studentId: 2 }, weight: 4, text: [
    `Kylie is already filming. "Babe, look at this. The scale literally couldn't."`,
  ]},
  { when: { studentId: 3 }, weight: 4, text: [
    `Serena steps off and laughs once, sharp and pleased. "Yeah, I felt that one go. Get one that can keep up."`,
  ]},
  { when: { studentId: 4 }, weight: 4, text: [
    `Fiona studies the crack pattern. "It's actually beautiful, the way it spidered out."`,
  ]},
  { when: { studentId: 5 }, weight: 4, text: [
    `Destiny sighs through her nose. "Low durability item. Should've upgraded ages ago."`,
  ]},
  { when: { studentId: 6 }, weight: 4, text: [
    `Tiffany shrieks with delight. "GIRLS. I broke the scale. No, like, broke broke."`,
  ]},
  { when: { studentId: 7 }, weight: 4, text: [
    `Priya is already pulling up procurement options. "Industrial-rated, weight-rated to four-fifty minimum, ideally five."`,
  ]},
  { when: { studentId: 8 }, weight: 4, text: [
    `Maya steps off without a word, looks at the cracks, then looks at you. She nods once.`,
  ]},
  { when: { studentId: 9 }, weight: 4, text: [
    `Chloe lets out a dry laugh. "Right. So your American scales are exactly as overbuilt as your portions, then."`,
  ]},
  { when: { studentId: 10 }, weight: 4, text: [
    `Reneé claps once, delighted. "That is the best review my cooking has ever gotten."`,
  ]},
  { when: { studentId: 11 }, weight: 4, text: [
    `Kaylee covers her mouth. "Oh no, professor, I am so sorry. We'll get you something sturdier."`,
  ]},
  { when: { studentId: 12 }, weight: 4, text: [
    `Nadia watches your reaction more than the scale. "Interesting. You looked at the scale first, then at me."`,
  ]},
  { when: { studentId: 13 }, weight: 4, text: [
    `Daisy laughs warmly. "Bless its little heart. You go on and get a bigger one, sugar."`,
  ]},
  { when: { studentId: 14 }, weight: 4, text: [
    `Mary Jane bursts out laughing. "Back home we'd've put me on the hay scale weeks ago."`,
  ]},
  { when: { studentId: 15 }, weight: 4, text: [
    `Lilith regards the cracked dial with quiet amusement. "Fragile little thing."`,
  ]},
  { when: { studentId: 16 }, weight: 4, text: [
    `Sophia stares at the cracks, mentally recalculating load tolerances. "That was rated equipment," she says faintly. "I exceeded rated equipment."`,
  ]},
  { when: { studentId: 17 }, weight: 4, text: [
    `Indiana Bones surveys the wreckage like a dig site. "Structural collapse. Classic. Usually I'm running OUT of the temple when this happens."`,
  ]},
  // Corruption-keyed generics — pool alongside the persona lines so the
  // break reaction tracks her psychology, not just her identity.
  { when: { corruption: [0] }, weight: 2, text: [
    `{subject.name} steps off fast, cheeks burning. "That was already cracked. Right? Tell me that was already cracked."`,
    `{subject.name} stares at the wreckage, mortified. "I'll pay for it," she says, in the voice of someone doing math she can't afford.`,
  ]},
  { when: { corruption: [1] }, weight: 2, text: [
    `{subject.name} looks at the dead scale for a moment. "Huh," she says. "Guess we graduated."`,
    `{subject.name} prods the cracked glass with her toe. "In its defense," she says, "I gave it plenty of warning."`,
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    `{subject.name} smiles down at the wreckage like it flattered her. "Get a bigger one. I'll break that too."`,
    `{subject.name} steps off, unhurried, and pats the dead dial. "It did its best. I'm just more than it was built to believe."`,
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
