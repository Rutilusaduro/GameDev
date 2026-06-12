// ═══════════════════════════════════════════════════════════════
// WEIGH-IN BREAK SCENE — the analog scale cracks under her.
// wi.breakBeat  — physical aftermath (stage/corruption keyed)
// wi.breakLine  — her reaction (per-girl + corruption in breakPersonas.js)
// wi.breakBodyGesture — body-type + stage keyed touch (belly/butt/breast)
// wi.breakThighGesture — athletic thigh beat (flex → jiggle by stage)
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

// ── wi.breakBodyGesture ───────────────────────────────────────
// Shape: PARTICIPLE CLAUSE — one mid-sentence gesture after a comma.
// Body-type routing (pool picks among ALL matching variants):
//   hourglass → breast + butt · apple/rotund → belly · mom_bod → belly + butt
//   pear/fertility_goddess → butt · voluptuous → belly + butt + breast
//   straight/athletic → light middle/thigh fallback
registerPool("wi.breakBodyGesture", [
  { when: {}, text: ["", "", ""] },

  // ── pear — lower-body weight, hip-centric ───────────────────
  { when: { bodyType: "pear", stageMin: 2, stageMax: 4 }, text: [
    "shifting her weight so her widened hips sway once, self-conscious",
    "pressing her palms to the flare of her hips and exhaling slow",
  ]},
  { when: { bodyType: "pear", stageMin: 5, stageMax: 7 }, weight: 2, text: [
    "cupping the plush swell of her ass and letting her fingers sink in",
    "rolling her hips once so her heavy backside settles with a soft jiggle",
  ]},
  { when: { bodyType: "pear", stageMin: 8, stageMax: 9 }, weight: 2, text: [
    "squeezing both cheeks of her ass together and swaying her hips once, deliberate",
    "cupping the heavy swell of her backside in both hands and giving it a slow squeeze",
  ]},
  { when: { bodyType: "pear", stageMin: 10 }, weight: 3, text: [
    "palming the vast round of her ass and squeezing until soft flesh spills between her fingers",
    "squeezing both heavy cheeks of her backside together and letting them bounce once, eyes on yours",
    "cupping her wide backside in both hands and giving it a slow, shameless squeeze",
  ]},

  // ── hourglass — bust and hips, no belly pool ────────────────
  { when: { bodyType: "hourglass", stageMin: 2, stageMax: 4 }, text: [
    "adjusting her top over the curve of her chest",
    "pressing her palms to the flare of her hips",
    "smoothing her hands down her waist to where her hips begin to swell",
  ]},
  { when: { bodyType: "hourglass", stageMin: 5, stageMax: 7 }, weight: 2, text: [
    "cupping the heavy swell of her breasts through her top and letting them settle",
    "rolling her hips once so her backside and chest sway in opposite rhythm",
    "tracing the pinch of her waist with both hands before sliding them outward over her curves",
  ]},
  { when: { bodyType: "hourglass", stageMin: 8, stageMax: 9 }, weight: 2, text: [
    "lifting the warm weight of her chest in both hands and releasing it slow",
    "squeezing her plush backside together and swaying once, deliberate",
    "running her palms from bust to hip in one slow, showcasing stroke",
  ]},
  { when: { bodyType: "hourglass", stageMin: 10 }, weight: 3, text: [
    "hefting her heavy breasts up in both palms and letting them settle back with a soft, visible bounce",
    "gathering the vast weight of her hips in her hands and swaying them once, eyes on yours",
    "cupping bust and hip in turn — a slow inventory of everything the scale couldn't measure",
  ]},

  // ── apple — belly-forward, unique round-high gestures ───────
  { when: { bodyType: "apple", stageMin: 2, stageMax: 4 }, text: [
    "patting the firm forward round of her belly like a satisfied verdict",
    "spreading one palm over the tight apple-curve riding high at her middle",
    "smoothing her shirt over the outward push of her stomach",
  ]},
  { when: { bodyType: "apple", stageMin: 5, stageMax: 7 }, weight: 2, text: [
    "bracing both palms under the heavy forward swell of her belly and lifting slightly",
    "running her hands over the round, high dome of her stomach",
    "pressing her belly forward into her own palms with a quiet, pleased exhale",
  ]},
  { when: { bodyType: "apple", stageMin: 8, stageMax: 9 }, weight: 2, text: [
    "spreading both arms around the vast forward weight of her belly and hugging it once",
    "lifting the heavy apple-round of her stomach and letting it drop back with a slow sway",
  ]},
  { when: { bodyType: "apple", stageMin: 10 }, weight: 3, text: [
    "hefting the enormous forward mass of her belly in both arms and settling it against herself, flesh rippling",
    "gathering the vast apple-weight of her middle in both palms and holding it there, giving you time to look",
  ]},

  // ── mom_bod — soft belly and wide hip warmth ──────────────────
  { when: { bodyType: "mom_bod", stageMin: 2, stageMax: 4 }, text: [
    "smoothing her top over the soft curve of her belly",
    "pressing her palms to the warm width of her hips",
    "settling her hands on the gentle swell at her middle",
  ]},
  { when: { bodyType: "mom_bod", stageMin: 5, stageMax: 7 }, weight: 2, text: [
    "cupping the low soft round of her belly and patting it once, maternal and pleased",
    "squeezing the plush swell of her backside and letting it jiggle soft",
    "running both hands over belly and hip in one warm, unhurried stroke",
  ]},
  { when: { bodyType: "mom_bod", stageMin: 8, stageMax: 9 }, weight: 2, text: [
    "spreading her palms over the vast warm weight of her belly",
    "hefting one generous hip and releasing it slow, soft flesh settling",
  ]},
  { when: { bodyType: "mom_bod", stageMin: 10 }, weight: 3, text: [
    "gathering the heavy softness of her belly in both arms and hugging it once against herself",
    "lifting the warm overflow of her hips in both hands and swaying them once, eyes on yours",
  ]},

  // ── voluptuous — belly, butt, and breast all eligible ─────────
  { when: { bodyType: "voluptuous", stageMin: 2, stageMax: 4 }, text: [
    "smoothing her top over the soft curve of her belly",
    "pressing her palms to the heavy swell of her chest",
    "shifting her weight so her full hips sway once, unhurried",
  ]},
  { when: { bodyType: "voluptuous", stageMin: 5, stageMax: 7 }, weight: 2, text: [
    "cupping the low swell of her belly and letting it settle in her palms",
    "lifting the warm weight of her breasts and releasing them slow",
    "squeezing the plush curve of her ass and letting her fingers sink in",
  ]},
  { when: { bodyType: "voluptuous", stageMin: 8, stageMax: 9 }, weight: 2, text: [
    "spreading both palms over the vast warm weight of her belly",
    "hefting her heavy breasts up in both hands and letting them settle with a soft bounce",
    "rolling her hips once so her backside sways with deliberate, heavy grace",
  ]},
  { when: { bodyType: "voluptuous", stageMin: 10 }, weight: 3, text: [
    "gathering the enormous mass of her belly in both arms and holding it there a moment",
    "cupping bust and hip in turn — a slow, shameless inventory",
    "hefting the vast weight of her backside in both palms and swaying it once, eyes on yours",
  ]},

  // ── rotund — belly-forward (kitchen-round cousin to apple) ───
  { when: { bodyType: "rotund", stageMin: 2, stageMax: 4 }, text: [
    "patting the soft round of her belly with chef's satisfaction",
    "spreading her palms over the warm, even swell of her middle",
  ]},
  { when: { bodyType: "rotund", stageMin: 5, stageMax: 7 }, weight: 2, text: [
    "cupping the heavy round of her belly and giving it a slow, appreciative squeeze",
    "running both hands over the vast soft dome of her stomach",
  ]},
  { when: { bodyType: "rotund", stageMin: 8 }, weight: 2, text: [
    "lifting the heavy warm weight of her belly and letting it settle back slow, flesh rippling",
    "spreading both arms around her vast middle and hugging the round of herself once",
  ]},

  // ── fertility_goddess — pear-cousin hips, nurturing warmth ─────
  { when: { bodyType: "fertility_goddess", stageMin: 2, stageMax: 4 }, text: [
    "settling her hands on the wide, warm flare of her hips",
    "pressing her palms to the soft curve where her hips meet her thighs",
  ]},
  { when: { bodyType: "fertility_goddess", stageMin: 5, stageMax: 7 }, weight: 2, text: [
    "cupping the plush swell of her backside with both hands, gentle and sure",
    "rolling her hips once so her lower body settles with a soft, maternal jiggle",
  ]},
  { when: { bodyType: "fertility_goddess", stageMin: 8 }, weight: 2, text: [
    "hefting the generous weight of her hips in both palms and releasing slow",
    "squeezing her vast backside together and swaying once, warm and unhurried",
  ]},

  // ── athletic — thighs and compact power ───────────────────────
  { when: { bodyType: "athletic", stageMin: 2, stageMax: 4 }, text: [
    "flexing one thick thigh and letting it settle",
    "pressing a palm to the firm swell of her hip",
  ]},
  { when: { bodyType: "athletic", stageMin: 5, stageMax: 7 }, weight: 2, text: [
    "squeezing the thickening flesh of her thigh and releasing slow",
    "running her palm along a leg that's gone noticeably softer",
  ]},
  { when: { bodyType: "athletic", stageMin: 8 }, weight: 2, text: [
    "giving her heavy thigh a shake and watching it jiggle",
    "slapping her thick thigh once — soft flesh rippling where muscle used to be",
    "cupping the plush weight of her thigh and letting it settle slow in her palm",
  ]},

  // ── straight — light middle fallback ──────────────────────────
  { when: { bodyType: "straight", stageMin: 2, stageMax: 4 }, text: [
    "pressing a palm to the warmth gathering at her middle",
    "smoothing her top over the soft new curve at her waist",
  ]},
  { when: { bodyType: "straight", stageMin: 5, stageMax: 7 }, weight: 2, text: [
    "running one hand over the heavy round of her belly",
    "cupping the low swell at her middle and letting it settle in her palm",
  ]},
  { when: { bodyType: "straight", stageMin: 8 }, weight: 2, text: [
    "spreading both palms over the vast warm weight of her belly",
    "lifting the heavy overflow of her middle and letting it drop back with a slow sway",
  ]},
]);

// ── wi.breakThighGesture ──────────────────────────────────────
// Shape: PARTICIPLE CLAUSE — athletic thigh beat for breakLine slots.
// Flex at light weight; squeeze mid; jiggle at blob. Used inline in
// Serena's tier-0/1 lines so "flexing her thigh" doesn't fire on a
// five-hundred-pound girl.
registerPool("wi.breakThighGesture", [
  { when: {}, text: [""] },
  { when: { bodyType: "athletic", stageMax: 4 }, text: [
    "flexing her thigh once, testing the muscle",
    "pressing her thumb into the firm line of her quad",
  ]},
  { when: { bodyType: "athletic", stageMin: 5, stageMax: 7 }, text: [
    "squeezing the thickening flesh of her thigh",
    "running her palm along a leg that's gone noticeably softer",
  ]},
  { when: { bodyType: "athletic", stageMin: 8 }, weight: 2, text: [
    "giving her heavy thigh a shake and watching it jiggle",
    "slapping her thick thigh once — soft flesh rippling where muscle used to be",
    "cupping the plush weight of her thigh and letting it settle slow in her palm",
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
    `{subject.name} steps off, unhurried{wi.breakBodyGesture|prefix:, }, and pats the dead dial. "It did its best. I'm just more than it was built to believe."`,
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
