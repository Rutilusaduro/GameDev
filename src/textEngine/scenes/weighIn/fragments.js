// ═══════════════════════════════════════════════════════════════
// WEIGH-IN FRAGMENTS — shared wi.* pools (see ../../AUTHORING.md)
// Beat modules (wi.arrival, wi.settle, …) are pools of SKELETONS —
// short templates whose slots are filled by the fragment pools
// below. Every pool declares ONE grammar shape in its banner.
// Per-girl voice lives in ./personas.js (registerModuleVariants).
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../../engine.js';
import '../../modules.js'; // subject.* helpers

// ╔══════════════════════════════════════════════════════════════
// ║ BEAT: wi.arrival — she enters the office
// ╚══════════════════════════════════════════════════════════════
// Shape: FULL SENTENCE skeletons.
registerPool("wi.arrival", [
  { when: {}, text: [
    "{subject.name} {wi.pace}{wi.moveVerb} {wi.doorway}{join:wi.bodyClause,wi.faceClause|prefix:, }.",
    "{subject.name} {wi.moveVerb} {wi.doorway}{join:wi.bodyClause,wi.soundClause|prefix:, }.",
    "{subject.name} {wi.moveVerb} {wi.doorway} — {wi.bodyClause|suffix:.}",
    "{subject.name} {wi.pace}{wi.moveVerb} {wi.doorway} for her weekly check-in{wi.faceClause|prefix:, }.",
  ]},
  // Stage 8-9: the doorway is a negotiation; sentence shape acknowledges it
  { when: { stageMin: 8, stageMax: 9 }, weight: 2, text: [
    "{subject.name} fills the doorway before she finishes entering{join:wi.bodyClause,wi.soundClause|prefix:, }.",
    "{subject.name} {wi.moveVerb} {wi.doorway}{wi.bodyClause|prefix:, } — the office rearranges itself around her without discussion.",
    "The hall announces {subject.name} before the door does{wi.faceClause|prefix:, }.",
  ]},
  // Stage 10-11: immobility changes the sentence itself
  { when: { stageMin: 10 }, weight: 4, text: [
    "{subject.name}'s {wi.massNoun} arrives before the rest of her{join:wi.soundClause,wi.faceClause|prefix:, }.",
    "{subject.name} settles into the doorway{join:wi.bodyClause,wi.soundClause|prefix:, } — movement more shift than step.",
    "{subject.name} enters as warm, immobile abundance{wi.faceClause|prefix:, }; the room organizes itself around her.",
    "{subject.name}'s {wi.massNoun} fills the frame{wi.bodyClause|prefix:, }, and the office becomes hers.",
  ]},
]);

// ── wi.pace ───────────────────────────────────────────────────
// Shape: ADVERBIAL, pre-verb, lowercase, TRAILING SPACE INCLUDED
// (so an empty pick leaves no double space). Mostly empty on purpose.
registerPool("wi.pace", [
  { when: {}, text: ["", "", "", "quietly ", "briskly "] },
  { when: { mood: ["happy", "cheerful", "excited"] }, text: ["brightly ", "cheerfully "] },
  { when: { mood: ["tired", "stressed"] }, text: ["slowly ", "wearily "] },
  { when: { hungerTierMin: 3 }, weight: 2, text: ["urgently ", "single-mindedly "] },
  { when: { stageMin: 5, stageMax: 9 }, text: ["ponderously ", "deliberately ", "unhurriedly "] },
]);

// ── wi.moveVerb ───────────────────────────────────────────────
// Shape: VERB PHRASE, bare present-tense verb, lowercase, no object.
registerPool("wi.moveVerb", [
  { when: {}, text: ["comes", "walks", "steps"] },
  // pace-neutral only — "breezes"/"strides" contradict weary/slow adverbs
  { when: { stageMax: 1 }, text: ["slips"] },
  { when: { stageMin: 2, stageMax: 4 }, text: ["moves", "eases"] },
  { when: { stageMin: 5, stageMax: 7 }, weight: 2, text: ["waddles", "rolls", "eases"] },
  { when: { stageMin: 6, stageMax: 9, bodyType: ["pear", "hourglass", "fertility_goddess"] }, text: ["angles"] },
  { when: { stageMin: 8 }, weight: 2, text: ["shuffles", "labors"] },
]);

// ── wi.doorway ────────────────────────────────────────────────
// Shape: locale phrase, lowercase, follows a movement verb.
registerPool("wi.doorway", [
  { when: {}, text: ["in", "into the office", "through the door"] },
  { when: { stageMin: 6, stageMax: 9 }, text: ["through a doorway that fits less of her each month", "sideways through the door"] },
  { when: { stageMin: 8 }, weight: 2, text: ["through a doorway that has become a negotiation"] },
]);

// ── wi.massNoun ───────────────────────────────────────────────
// Shape: noun phrase, lowercase (used as "{subject.name}'s {wi.massNoun}").
registerPool("wi.massNoun", [
  { when: {}, text: ["warmth", "soft bulk", "presence"] },
  { when: { bodyType: ["pear", "fertility_goddess"] }, text: ["lower body", "hips"] },
  { when: { bodyType: ["apple", "rotund"] }, text: ["belly"] },
  { when: { bodyType: ["topHeavy", "voluptuous"] }, text: ["bust", "upper body"] },
]);

// ── wi.bodyClause — THE showcase pool ─────────────────────────
// Shape: PARTICIPLE CLAUSE, lowercase, no trailing period.
// bodyType × stage band. Mined from the legacy arrival grid.
registerPool("wi.bodyClause", [
  { when: {}, text: ["", "", "her steps unhurried", "bag over one shoulder"] },
  // pear / lower-half led
  { when: { bodyType: "pear", stageMin: 2, stageMax: 3 }, text: [
    "a new sway at her hips, softness settling low",
    "her thighs beginning to brush at the top",
    "her hips starting to lead the way",
  ]},
  { when: { bodyType: "pear", stageMin: 4, stageMax: 5 }, text: [
    "her thighs brushing together with each step — you can hear it from the desk",
    "the lower half of her silhouette now the main event",
    "her heavy hips rolling through the doorway with unhurried weight",
  ]},
  { when: { bodyType: "pear", stageMin: 6 }, weight: 2, text: [
    "her wide hips catching briefly in the door",
    "her lower body filling the frame before her face does",
    "the soft mass of thigh and hip shifting with each step",
  ]},
  // apple / belly-forward
  { when: { bodyType: "apple", stageMin: 2, stageMax: 3 }, text: [
    "a gentle rounding at the belly visible through her shirt",
    "one hand resting on her middle reflexively",
    "her waistline gone quietly round",
  ]},
  { when: { bodyType: "apple", stageMin: 4, stageMax: 5 }, text: [
    "her belly leading, round and forward",
    "her middle straining at her waistband — she exhales once, then commits",
    "her belly swaying with the effort of walking",
  ]},
  { when: { bodyType: "apple", stageMin: 6 }, weight: 2, text: [
    "her gut arriving long before she finishes coming through",
    "her belly swaying on its own momentum, flesh lagging behind each step",
    "a forward lean to balance the belly",
  ]},
  // hourglass / curves both directions
  { when: { bodyType: "hourglass", stageMin: 2, stageMax: 3 }, text: [
    "her curves deepening evenly, top and bottom",
    "bust and hips both quietly swelling",
    "her waist softened, hourglass pouring fuller",
  ]},
  { when: { bodyType: "hourglass", stageMin: 4, stageMax: 5 }, text: [
    "every curve thickened, chest and hips both fuller",
    "a rolling sway, figure plush in both directions",
    "her curves commanding the room from both directions",
  ]},
  { when: { bodyType: "hourglass", stageMin: 6 }, weight: 2, text: [
    "her hourglass grown past its original mold — vast curves above and below",
    "bust and hip each needing their own share of the doorway",
    "curves stacked on curves",
  ]},
  // athletic / muscle going under
  { when: { bodyType: "athletic", stageMin: 2, stageMax: 3 }, text: [
    "her athletic lines softened at the edges",
    "her thighs brushing together in a way they didn't used to",
    "her trained frame visibly rounding",
  ]},
  { when: { bodyType: "athletic", stageMin: 4, stageMax: 5 }, text: [
    "power buried under comfortable thickness",
    "her strong frame gone plush",
    "sheer mass replacing the sprint",
  ]},
  { when: { bodyType: "athletic", stageMin: 6 }, weight: 2, text: [
    "an athlete's posture in an enormous body",
    "strength entombed in comfortable thickness",
    "trained breadth gone vast",
  ]},
  // straight / even all over
  { when: { bodyType: "straight", stageMin: 2, stageMax: 3 }, text: [
    "softness settling evenly at the edges",
    "her clothes fitting a little closer everywhere",
    "evenly padded, face rounder",
  ]},
  { when: { bodyType: "straight", stageMin: 4, stageMax: 5 }, text: [
    "even thickness settling everywhere at once",
    "her old shape rounding out in every direction",
    "weight carried uniformly, shoulder to knee",
  ]},
  { when: { bodyType: "straight", stageMin: 6 }, weight: 2, text: [
    "a single continuous expanse of soft body",
    "uniform heaviness from shoulder to knee",
    "even mass overwhelming in every direction",
  ]},
  // rotund / spherical
  { when: { bodyType: "rotund", stageMin: 2, stageMax: 3 }, text: [
    "a soft doughy middle that bounces once when she stops",
    "rounder than she was — proofing like bread",
    "jiggling once as she sets her bag down",
  ]},
  { when: { bodyType: "rotund", stageMin: 4, stageMax: 5 }, text: [
    "her middle a soft dome",
    "gut and hips one continuous curve",
    "round belly straining her shirt",
  ]},
  { when: { bodyType: "rotund", stageMin: 6 }, weight: 2, text: [
    "a heavy round mass shifting with each step",
    "rotund abundance in motion",
    "her own gravity arriving with her",
  ]},
  // voluptuous / curves stacked
  { when: { bodyType: "voluptuous", stageMin: 2, stageMax: 3 }, text: [
    "her curves quietly swelling, seams sitting closer",
    "bust fuller and hips wider",
    "adjusting a strap once on the way in",
  ]},
  { when: { bodyType: "voluptuous", stageMin: 4, stageMax: 5 }, text: [
    "heavy breasts and wide hips grown plush",
    "her chest bouncing once, thighs rubbing",
    "curves leading every movement",
  ]},
  { when: { bodyType: "voluptuous", stageMin: 6 }, weight: 2, text: [
    "breasts and belly grown vast",
    "voluptuous excess in motion",
    "curves past any ordinary scale",
  ]},
  // mom_bod / lived-in warmth
  { when: { bodyType: "mom_bod", stageMin: 2, stageMax: 3 }, text: [
    "gentle softness at the waist, lived-in and warm",
    "warm thickness at hip and thigh",
    "her waistband working harder than last month",
  ]},
  { when: { bodyType: "mom_bod", stageMin: 4, stageMax: 5 }, text: [
    "a soft mom-bod spread, warm at the middle",
    "built for second helpings",
    "maternal softness from chest to thigh",
  ]},
  { when: { bodyType: "mom_bod", stageMin: 6 }, weight: 2, text: [
    "a vast pillowy softness in motion",
    "maternal mass needing space",
    "soft abundance everywhere familiar",
  ]},
  // fertility_goddess / abundance
  { when: { bodyType: "fertility_goddess", stageMin: 2, stageMax: 3 }, text: [
    "breasts and hips ripening together",
    "goddess-softness settling in",
    "her thighs starting to brush",
  ]},
  { when: { bodyType: "fertility_goddess", stageMin: 4, stageMax: 5 }, text: [
    "heavy breasts and thunder thighs grown plush",
    "her hips brushing the doorframe without apology",
    "curves overflowing in every direction",
  ]},
  { when: { bodyType: "fertility_goddess", stageMin: 6 }, weight: 2, text: [
    "fertility made flesh at vast scale",
    "curves overwhelming in proportion",
    "warmth arriving a step ahead of her",
  ]},
  // topHeavy / chest-led
  { when: { bodyType: "topHeavy", stageMin: 2, stageMax: 3 }, text: [
    "her bust growing ahead of everything else",
    "leaning back slightly to balance",
    "her chest drawing the eye first",
  ]},
  { when: { bodyType: "topHeavy", stageMin: 4, stageMax: 5 }, text: [
    "heavy breasts leading a still-narrower lower half",
    "her chest leading every step",
    "tipping forward slightly to balance",
  ]},
  { when: { bodyType: "topHeavy", stageMin: 6 }, weight: 2, text: [
    "her enormous bust nearly clipping the doorframe as she turns",
    "her top half dominating the silhouette",
    "balancing an enormous chest with practiced care",
  ]},
]);

// ── wi.faceClause ─────────────────────────────────────────────
// Shape: PARTICIPLE CLAUSE / noun-phrase clause, lowercase.
// Mood × corruption × hunger. Often empty by design.
registerPool("wi.faceClause", [
  { when: {}, text: ["", "", ""] },
  { when: { mood: ["happy", "cheerful"] }, text: [
    "a smile already in place",
    "good humor arriving with her",
  ]},
  { when: { mood: ["excited"] }, text: [
    "energy crackling off her",
    "clearly eager to see the number",
  ]},
  { when: { mood: ["tired"] }, text: [
    "a yawn half-hidden behind her hand",
    "a blank, tired expression on her face",
  ]},
  { when: { mood: ["stressed", "nervous"] }, text: [
    "a tight, distracted look on her face",
    "shoulders carrying the week",
  ]},
  { when: { mood: ["focused", "observant"] }, text: [
    "her eyes already measuring the room",
    "attention sharp and quiet",
  ]},
  { when: { mood: ["content", "warm", "bemused"] }, text: [
    "an unhurried ease about her",
    "quiet amusement at the corner of her mouth",
  ]},
  { when: { hungerTierMin: 3 }, weight: 3, text: [
    "a crazed, ravenous look in her eye",
    "her attention snagging on the snack drawer before it finds you",
  ]},
  { when: { inWithdrawal: true }, weight: 3, text: [
    "her hands not quite steady",
    "a thin, strung-out edge to her expression",
  ]},
  { when: { corruption: [2] }, text: [
    "her eyes going straight to the scale, fond as a greeting",
    "open appetite in the way she scans the room",
  ]},
]);

// ── wi.soundClause ────────────────────────────────────────────
// Shape: PARTICIPLE CLAUSE (absolute), lowercase.
registerPool("wi.soundClause", [
  { when: {}, text: ["", ""] },
  { when: { stageMin: 4, stageMax: 5 }, text: [
    "the floorboards noting her arrival",
    "a chair creaking as she passes",
  ]},
  { when: { stageMin: 6, stageMax: 9 }, weight: 2, text: [
    "the floorboards registering her",
    "the furniture bracing in advance",
    "her breathing audible from the hall",
  ]},
  { when: { stageMin: 10 }, weight: 2, text: [
    "the floor registering every inch",
    "the room going quiet around her weight",
  ]},
]);

// ╔══════════════════════════════════════════════════════════════
// ║ BEAT: wi.settle — emotional beat before the scale
// ╚══════════════════════════════════════════════════════════════
// Shape: FULL SENTENCE skeletons (two sentences).
registerPool("wi.settle", [
  { when: {}, text: [
    "{wi.settleAction} {wi.scaleAttitude}",
    "{wi.greeting} {wi.scaleAttitude}",
  ]},
  { when: { corruption: [2] }, text: [
    "{wi.greeting}",
    "{wi.settleAction} {wi.greeting}",
  ]},
]);

// ── wi.settleAction ───────────────────────────────────────────
// Shape: FULL SENTENCE. What she does with her things/body on arrival.
registerPool("wi.settleAction", [
  { when: {}, text: [
    "She sets her bag beside the desk.",
    "She sets her things down and rolls her shoulders once.",
    "She takes up her usual corner.",
  ]},
  { when: { corruption: [0], stageMin: 2, stageMax: 5 }, text: [
    "She tugs at her hem before she sits.",
    "She smooths her top over her middle without looking at it.",
    "She tugs at her waistband once before she sits. Reflex.",
  ]},
  { when: { corruption: [0], stageMin: 6 }, text: [
    "She waits by the door a moment, gathering herself.",
    "She sets her bag down and stares at the wall behind you.",
    "She leans against the doorframe, catching her breath from the hall.",
  ]},
  { when: { corruption: [1, 2] }, text: [
    "She tosses her bag on the chair without breaking stride.",
    "She drops her bag and is already oriented toward the scale.",
  ]},
  { when: { corruption: [2], stageMin: 3 }, text: [
    "She pats her middle once, affectionately, on the way in.",
  ]},
  { when: { stageMin: 10 }, weight: 3, text: [
    "Settling takes time; she gives it the time it takes.",
    "She does not hurry. Hurrying is not the vocabulary anymore.",
  ]},
]);

// ── wi.greeting ───────────────────────────────────────────────
// Shape: DIALOGUE BEAT. Persona overrides in personas.js.
registerPool("wi.greeting", [
  { when: {}, text: [
    `"Hi," she says, settling in.`,
    "She says hello and waits for you to begin.",
  ]},
  { when: { corruption: [0], stageMin: 2, stageMax: 5 }, text: [
    `"Hi," she says, a beat too bright.`,
    `"Ready," she says, a little too quickly.`,
  ]},
  { when: { corruption: [0], stageMin: 6 }, text: [
    "She says hello quietly. The office feels smaller.",
  ]},
  { when: { corruption: [1] }, text: [
    `"Another week," she says. Flat. Familiar.`,
    `"Let's do it," she says, like clocking in.`,
  ]},
  { when: { corruption: [2] }, text: [
    `"Ready when you are," she says, eyes already on the scale.`,
    `"Let's see it," she says, already moving toward the scale.`,
    `"Been thinking about this all week," she says, warm and easy.`,
    `"Good morning. Let's see where I'm at."`,
  ]},
  { when: { corruption: [2], stageMin: 10 }, text: [
    `"Let's see how vast I've become," she says, and means it.`,
  ]},
]);

// ── wi.scaleAttitude ──────────────────────────────────────────
// Shape: FULL SENTENCE. How she relates to the scale itself.
registerPool("wi.scaleAttitude", [
  { when: {}, text: [
    "She glances at the scale only once.",
    "She makes small talk that neither of you is really listening to.",
    "She checks the time like this is just another appointment.",
  ]},
  { when: { corruption: [0], stageMin: 3, stageMax: 7 }, text: [
    "She glances at the scale and then away, like it might be rude to stare.",
    "She looks away from the scale first.",
    "She pretends this is routine.",
  ]},
  { when: { corruption: [0], stageMax: 2 }, text: [
    "She treats the scale as a formality, nothing more.",
    "There is a composed stillness to her — someone who has rehearsed being fine about this.",
  ]},
  { when: { corruption: [1] }, text: [
    "She looks at the scale without flinching — a month ago she couldn't.",
    "She's stopped making a face at the scale somewhere along the way.",
    "She does not apologize for the space she takes up. She does not celebrate it either.",
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    "She looks at the scale like it is the most interesting thing in the room.",
    "She smiles at the scale like an old friend.",
    "No preamble. She wants the number.",
  ]},
  { when: { stageMin: 10 }, text: [
    "She regards the scale with the practicality of someone who knows what it will say.",
    "The scale can wait. It has learned patience too.",
  ]},
]);

// ╔══════════════════════════════════════════════════════════════
// ║ BEAT: wi.scaleApproach — the old analog scale
// ╚══════════════════════════════════════════════════════════════
// Shape: FULL SENTENCE skeletons.
registerPool("wi.scaleApproach", [
  { when: {}, text: [
    "She steps onto the old analog scale{join:wi.mountStyle,wi.platformReact|prefix:, }. {wi.needleReact}",
    "She steps up{join:wi.mountStyle,wi.platformReact|prefix:, }. {wi.needleReact}",
    "She mounts the scale{wi.platformReact|prefix:, }. {wi.needleReact}",
  ]},
  { when: { stageMin: 10 }, weight: 4, text: [
    "She shifts onto the scale — soft mass settling{wi.platformReact|prefix:, }. {wi.needleReact}",
    "Plush flesh yields onto the platform{wi.platformReact|prefix:, }. {wi.needleReact}",
    "The scale was not built for this. It tries anyway. {wi.needleReact}",
  ]},
]);

// ── wi.mountStyle ─────────────────────────────────────────────
// Shape: PARTICIPLE CLAUSE, lowercase. BodyType flavor at Plump+.
registerPool("wi.mountStyle", [
  { when: {}, text: ["", "", "without ceremony"] },
  { when: { bodyType: ["pear", "fertility_goddess"], stageMin: 4 }, text: [
    "her hips settling wide",
    "rocking her weight hip-to-hip before the needle finds its direction",
  ]},
  { when: { bodyType: ["apple", "rotund"], stageMin: 4 }, text: [
    "belly-first",
    "resting her hands on her middle to steady herself",
  ]},
  { when: { bodyType: "athletic", stageMin: 4 }, text: [
    "with an athlete's balance",
    "like a podium — old habit",
  ]},
  { when: { bodyType: ["voluptuous", "topHeavy"], stageMin: 4 }, text: [
    "her curves settling heavily",
    "adjusting her balance, top-heavy",
  ]},
]);

// ── wi.platformReact ──────────────────────────────────────────
// Shape: PARTICIPLE CLAUSE (absolute), lowercase. Graded by stage.
registerPool("wi.platformReact", [
  { when: {}, text: ["", "the platform steady beneath her"] },
  { when: { stageMin: 2, stageMax: 3 }, text: [
    "the platform taking the weight with only a small creak",
    "the platform settling a little more than it used to",
  ]},
  { when: { stageMin: 4, stageMax: 5 }, weight: 2, text: [
    "the platform groaning once in recognition",
    "the platform dipping under real weight",
    "the old white scale protesting, platform flexing",
  ]},
  { when: { stageMin: 6, stageMax: 7 }, weight: 2, text: [
    "the platform settling with a deep, announcing creak",
    "the old platform flexing beneath her",
    "the scale making a sound you have started to recognize",
  ]},
  { when: { stageMin: 8 }, weight: 3, text: [
    "the platform protesting immediately — a sharp creak, then a low, loaded groan",
    "the platform visibly flexing under overwhelming weight",
    "the platform groaning like something remembering its limits",
  ]},
]);

// ── wi.needleReact ────────────────────────────────────────────
// Shape: FULL SENTENCE. What the needle does.
registerPool("wi.needleReact", [
  { when: { stageMax: 1 }, text: [
    "The needle swings out, slow and quiet.",
    "The red needle drifts to its answer like it has all day.",
    "The needle barely moves before it finds its answer.",
  ]},
  { when: { stageMin: 2, stageMax: 3 }, text: [
    "The red needle swings wide and begins to hunt.",
    "The needle swings out with more authority than last month. She watches it go.",
    "The dial shudders before climbing.",
  ]},
  { when: { stageMin: 4, stageMax: 5 }, text: [
    "The needle climbs like it is late for something.",
    "The needle runs for the high numbers without hesitation.",
    "The dial lurches, then commits to its long climb.",
  ]},
  { when: { stageMin: 6, stageMax: 7 }, text: [
    "The needle slams toward the far end of its range.",
    "The scale takes a breath, holds it, and the needle keeps going.",
    "The needle doesn't hesitate — it runs for numbers the dial was not built to show this quickly.",
  ]},
  { when: { stageMin: 8 }, weight: 2, text: [
    "The needle slams toward the end of its travel and keeps trying.",
    "The needle pins itself to the far edge. The dial has run out of numbers.",
    "The dial gives up pretending.",
  ]},
  { when: {}, text: ["The red needle begins to spin."] },
]);

// ╔══════════════════════════════════════════════════════════════
// ║ BEAT: wi.bigScaleApproach — the heavy-duty industrial scale
// ╚══════════════════════════════════════════════════════════════
// Shape: FULL SENTENCE skeletons.
registerPool("wi.bigScaleApproach", [
  { when: {}, text: [
    "She goes straight to the heavy-duty platform — she knows the routine by now. {wi.lcdReact}",
    "She crosses to the industrial scale without being asked{wi.mountStyle|prefix:, }. {wi.lcdReact}",
    "She steps onto the steel platform; it does not shift. {wi.lcdReact}",
  ]},
  { when: { stageMin: 10 }, weight: 3, text: [
    "She settles onto the industrial platform — the only scale that still pretends to understand her. {wi.lcdReact}",
    "Impossible weight on steel that does not flinch. {wi.lcdReact}",
    "She knows where to stand. The platform takes her mass without comment. {wi.lcdReact}",
  ]},
]);

// ── wi.lcdReact ───────────────────────────────────────────────
// Shape: FULL SENTENCE. The display building the number.
registerPool("wi.lcdReact", [
  { when: {}, text: [
    "The LCD wakes and begins its long, patient climb.",
    "The green numbers rise one digit at a time.",
    "The display hums and starts building the number, unhurried.",
    "The display blinks awake and starts counting.",
  ]},
  { when: { stageMin: 10 }, text: [
    "The display builds the number digit by digit, as unhurried as she is.",
    "Time is not the constraint. Weight is. The display climbs.",
  ]},
]);

// ╔══════════════════════════════════════════════════════════════
// ║ BEAT: wi.stepOff — leaving the platform, number settled
// ╚══════════════════════════════════════════════════════════════
// Shape: FULL SENTENCE skeletons.
registerPool("wi.stepOff", [
  { when: {}, text: [
    "{wi.numberSettle} {subject.name} {wi.dismount}{join:wi.dismountBody,wi.platformAfter|prefix:, }.",
    "{wi.numberSettle} {subject.name} {wi.dismount}{wi.dismountBody|prefix:, }.",
  ]},
  { when: { stageMin: 9 }, weight: 4, text: [
    "{wi.numberSettle} {subject.name} does not so much step off as redistribute — vast soft mass shifting off the platform{wi.platformAfter|prefix:, }.",
    "{wi.numberSettle} Leaving the platform takes time: warm weight transferring off the metal by degrees{wi.platformAfter|prefix:, }.",
  ]},
]);

// ── wi.numberSettle ───────────────────────────────────────────
// Shape: FULL SENTENCE with the number.
registerPool("wi.numberSettle", [
  { when: {}, text: [
    "The dial holds at {subject.lbs}.",
    "The needle settles on {subject.lbs}.",
    "The reading locks in: {subject.lbs} lbs.",
  ]},
  { when: { bigScale: true }, weight: 4, text: [
    "The display stabilizes at {subject.lbs}.",
    "The green numbers stop at {subject.lbs}.",
    "The LCD settles: {subject.lbs} lbs.",
  ]},
]);

// ── wi.dismount ───────────────────────────────────────────────
// Shape: VERB PHRASE, lowercase, follows the subject's name.
registerPool("wi.dismount", [
  { when: { stageMax: 1 }, text: [
    "steps off lightly — one foot, then the other",
    "hops down",
    "steps off without hurry",
  ]},
  { when: { stageMin: 2, stageMax: 3 }, text: [
    "steps off carefully",
    "steps down, steadying herself with a hand on your desk",
  ]},
  { when: { stageMin: 4, stageMax: 5 }, text: [
    "steps off slowly",
    "eases herself down",
  ]},
  { when: { stageMin: 6, stageMax: 8 }, weight: 2, text: [
    "steps off in stages — one foot, then the other",
    "eases herself off the platform",
    "steps down carefully, breathing through her nose",
  ]},
  { when: {}, text: ["steps off the platform"] },
]);

// ── wi.dismountBody ───────────────────────────────────────────
// Shape: PARTICIPLE CLAUSE, lowercase. The flesh's opinion of dismounting.
registerPool("wi.dismountBody", [
  { when: {}, text: ["", ""] },
  { when: { stageMin: 2, stageMax: 3 }, text: [
    "her softened thighs brushing together",
    "her belly giving a little as she shifts her weight",
  ]},
  { when: { stageMin: 4, stageMax: 5 }, weight: 2, text: [
    "her thick belly swinging forward with the motion",
    "a soft jiggle running through her middle and hips",
    "flesh wobbling, settling, finding its new resting place",
  ]},
  { when: { stageMin: 6, stageMax: 8 }, weight: 2, text: [
    "her belly hanging heavy and swaying",
    "the motion sending slow ripples through her body",
    "her belly lagging behind her turn and settling with a soft, audible exhale",
  ]},
  { when: { bodyType: ["pear", "fertility_goddess"], stageMin: 4 }, text: [
    "her hips swaying with the motion",
  ]},
  { when: { bodyType: ["topHeavy", "voluptuous"], stageMin: 4 }, text: [
    "her chest settling a beat after the rest of her",
  ]},
]);

// ── wi.platformAfter ──────────────────────────────────────────
// Shape: PARTICIPLE CLAUSE (absolute), lowercase.
registerPool("wi.platformAfter", [
  { when: {}, text: ["", "the platform rocking once before going still"] },
  { when: { stageMin: 4, stageMax: 7 }, text: [
    "the platform groaning before going still",
    "the scale rocking twice before stilling",
  ]},
  { when: { stageMin: 8 }, weight: 2, text: [
    "the scale trembling and stilling beneath what remains",
    "the office seeming to exhale around her as the scale recovers",
  ]},
]);

// ╔══════════════════════════════════════════════════════════════
// ║ BEAT: wi.reply — her personal reaction to the number
// ╚══════════════════════════════════════════════════════════════
// Shape: FULL SENTENCE skeletons. This replaces the old per-student
// monolith builders; the girl's voice lives in {wi.replyDialogue}
// (persona variants in ./personas.js).
registerPool("wi.reply", [
  { when: {}, text: [
    "{wi.numberLine} {wi.replyBody} {wi.replyDialogue}{wi.moodTag|prefix: }",
    "{wi.replyDialogue} {wi.replyBody}{wi.moodTag|prefix: }",
    "{wi.numberLine} {wi.replyDialogue}{wi.moodTag|prefix: }",
  ]},
  { when: { corruption: [2] }, text: [
    "{wi.numberLine} {wi.replyBody} {wi.replyDialogue}{wi.moodTag|prefix: }",
    "{wi.replyDialogue} {wi.replyBody} {wi.numberLine}",
  ]},
]);

// ── wi.numberLine ─────────────────────────────────────────────
// Shape: FULL SENTENCE / DIALOGUE BEAT — how she receives the number.
registerPool("wi.numberLine", [
  { when: { corruption: [0] }, text: [
    `"{subject.lbs}?" — like checking your math.`,
    `She stares at {subject.lbs} for a long beat.`,
    `She reads the number twice, like she is hoping it changed. It did not.`,
    `"{subject.lbs}," she repeats, neutrally, the way you say a thing to keep it at arm's length.`,
  ]},
  { when: { corruption: [1] }, text: [
    `"{subject.lbs}." She nods like she's accepting a challenge.`,
    `She reads the number and exhales through her nose. "{subject.lbs}. Moving."`,
    `"{subject.lbs}," she says, and nods once. Informed, not surprised.`,
  ]},
  { when: { corruption: [2] }, text: [
    `"{subject.lbs}!" She grins at the number.`,
    `She looks at {subject.lbs} and smiles, slow and satisfied.`,
    `"{subject.lbs}," she reads, the way someone reads a good review.`,
  ]},
  { when: { corruption: [0], stageMin: 8 }, weight: 2, text: [
    `She stares at {subject.lbs} until the number stops being abstract.`,
    `She reads {subject.lbs} and goes very still.`,
  ]},
  { when: { corruption: [2], stageMin: 8 }, weight: 2, text: [
    `She reads {subject.lbs} and smiles like the number is an old friend.`,
  ]},
  { when: {}, text: [`The number is {subject.lbs}.`] },
]);

// ── wi.replyBody ──────────────────────────────────────────────
// Shape: FULL SENTENCE — what her body is doing while she reacts.
// Mined from the BUILDERS middles. Stage band × bodyType.
registerPool("wi.replyBody", [
  { when: {}, text: [
    "She shifts her weight from one foot to the other.",
    "She glances down at herself, taking inventory.",
    "Her hand finds her middle without being told to.",
  ]},
  { when: { stageMin: 2, stageMax: 5 }, text: [
    "Her rounded belly pushes softly at her top when she breathes.",
    "Her thighs press together when she shifts her weight.",
    "Her belly rests warm and visible above her waistband.",
    "She runs her thumb along the soft new curve at her hip — not hiding it, just accounting for it.",
  ]},
  { when: { stageMin: 6, stageMax: 8 }, weight: 2, text: [
    "Her heavy belly hangs forward, soft and warm, swaying when she shifts.",
    "Her body fills more of the office than it used to — thick arms, heavy thighs, belly resting solid against her lap.",
    "Everything jiggles and sways with the smallest movement.",
    "Her thick thighs spread wide; her belly rests heavy in her lap.",
  ]},
  { when: { stageMin: 9 }, weight: 2, text: [
    "Soft flesh pools warm wherever she settles.",
    "Her vastness presses at every edge of the room.",
    "Her belly spreads wide and heavy, one warm landscape of softness.",
  ]},
  { when: { bodyType: ["pear", "fertility_goddess"], stageMin: 3, stageMax: 8 }, text: [
    "She runs both hands down her hips, feeling the weight settle.",
    "She presses her thighs together once, testing.",
  ]},
  { when: { bodyType: ["apple", "rotund"], stageMin: 3, stageMax: 8 }, text: [
    "She rests a palm on the round swell of her stomach.",
    "Her belly leads even when she is standing still.",
  ]},
  { when: { bodyType: ["topHeavy", "voluptuous"], stageMin: 3, stageMax: 8 }, text: [
    "She presses her hands to her curves, checking the new weight with her palms.",
    "Her chest rises and settles with her breathing, heavier than the scale's needle implied.",
  ]},
]);

// ── wi.replyDialogue ──────────────────────────────────────────
// Shape: DIALOGUE BEAT — the girl's verdict on the number.
// THE per-girl voice slot: personas.js extends this pool with
// studentId-keyed variants at weight 4. These are the shared fallbacks.
registerPool("wi.replyDialogue", [
  { when: { corruption: [0] }, text: [
    `"Okay," she says. Not convinced. Not devastated. Just processing.`,
  ]},
  // Slight/Slim: nothing to explain away yet — keep it neutral
  { when: { corruption: [0], stageMax: 1 }, text: [
    `"That seems right," she says, shrugging. "Nothing to report."`,
    `"Fine," she says. She was already thinking about lunch.`,
  ]},
  // Soft+: the gain is visible; the excuses start
  { when: { corruption: [0], stageMin: 2 }, text: [
    `"It's the food here," she says, unconvincing even to herself.`,
    `"I'll cut back," she says, to herself as much as you.`,
    `"Water weight," she says. Nobody believes it.`,
  ]},
  { when: { corruption: [1] }, text: [
    `"Every week," she murmurs. "I can feel it before I see it."`,
    `"It's only going one direction," she says, with a small, settled nod.`,
    `"Fine. New baseline."`,
    `"Is it bad that I expected that?"`,
    `"Same time next week," she says, already gathering her things.`,
  ]},
  { when: { corruption: [2] }, text: [
    `"Good," she says simply, hands settling on the soft weight of herself. "More."`,
    `"That's what I wanted," she says. "More of me. Every week, more."`,
    `"I could feel it coming," she says, satisfied.`,
    `"Thank you," she says, and she is not talking to you.`,
  ]},
  { when: { corruption: [0], stageMin: 6 }, weight: 2, text: [
    `"I didn't think it was that much," she says, voice smaller than usual.`,
    `"I used to know exactly what I weighed. Now I just… feel it."`,
    `"I have to start saying no to things," she says, in the tone of someone who is not sure she will.`,
  ]},
  { when: { corruption: [1], stageMin: 6 }, weight: 2, text: [
    `"I'm not pretending anymore. This is what I am now."`,
    `"At least it's consistent," she says, and laughs once, without much humor.`,
    `"That's not stopping, is it," she says — flat, already sure of the answer.`,
  ]},
  { when: { corruption: [2], stageMin: 6 }, weight: 2, text: [
    `"Beautiful," she says, and she means herself. "I'm not done."`,
    `"Still growing," she says. Not a complaint. A status report.`,
    `"Getting there," she murmurs, like she has a specific destination in mind and she is close.`,
  ]},
  { when: { hungerTierMin: 3 }, weight: 2, text: [
    `"Are we done? I haven't eaten in an hour and it's all I can think about."`,
    `She nods at the number, but her attention has already moved to the question of lunch.`,
  ]},
  { when: { inWithdrawal: true }, weight: 2, text: [
    `"Can we hurry this up," she says, rubbing her arms, eyes flicking to the door and whatever is on the other side of it.`,
  ]},
  { when: {}, text: [`She takes in the reading and nods.`] },
]);

// ── wi.foodAsk ────────────────────────────────────────────────
// Shape: FULL SENTENCE — after the number, the appetite speaks up.
// Silent (empty wildcard) unless hunger/addiction/withdrawal is
// active; keyed variants are weighted heavy so a hungry girl
// reliably asks — or demands — food before she leaves.
registerPool("wi.foodAsk", [
  { when: {}, text: [""] },
  { when: { hungerTierMin: 2, hungerTierMax: 2, corruption: [0] }, weight: 6, text: [
    `On her way out she hesitates at the door. "You don't happen to have anything to eat in here, do you? Skipped breakfast." She didn't.`,
    `"Is it lunch yet?" she asks, too casually, eyes doing a lap of the desk.`,
  ]},
  { when: { hungerTierMin: 2, hungerTierMax: 2, corruption: [1, 2] }, weight: 6, text: [
    `"Okay. Weighed, measured." She points at the snack drawer. "Now feed me. That's the arrangement, right?"`,
    `"That worked up an appetite somehow," she says, not moving toward the door.`,
  ]},
  { when: { hungerTierMin: 3 }, weight: 9, text: [
    `She doesn't leave. "Sorry — before I go. Do you have food? I'm not asking for later. I mean now."`,
    `"Great, number recorded, science done." Her stomach growls loud enough to co-sign. "Where's the food?"`,
    `Her eyes have been on the snack drawer this whole time. "I sat through the whole weigh-in," she says. "I earned something."`,
  ]},
  { when: { hungerTierMin: 3, corruption: [2] }, weight: 9, text: [
    `"You weighed me. Now you feed me." She sits back down. "That's how this works, Professor."`,
    `She pats the desk twice, like ringing a bell. "Kitchen's open. Don't make me ask twice — I will, but don't make me."`,
  ]},
  { when: { addictionLevelMin: 3 }, weight: 9, text: [
    `"I did my part," she says, and there's a thin edge under the lightness. "The part where you feed me comes next. It always comes next."`,
    `"I'll wait," she says, settling in beside the desk instead of leaving. "You always have something."`,
  ]},
  { when: { inWithdrawal: true }, weight: 12, text: [
    `She catches your sleeve before you can file the number. "Please tell me you have something. Anything. It's been a bad week."`,
    `"Whatever the scale says is fine. I don't care." Her hands aren't steady. "I need something from you. The usual something."`,
  ]},
]);

// ── wi.moodTag ────────────────────────────────────────────────
// Shape: FULL SENTENCE, often empty. Port of the legacy moodTag().
registerPool("wi.moodTag", [
  { when: {}, text: ["", "", ""] },
  { when: { mood: "happy" }, text: ["She sounds almost buoyant despite everything.", ""] },
  { when: { mood: "stressed" }, text: ["The number lands on top of everything else she is carrying this week.", ""] },
  { when: { mood: "tired" }, text: ["She says it through a yawn she does not quite hide.", ""] },
  { when: { mood: "nervous" }, text: ["Her voice pitches up half a note on the last word.", ""] },
  { when: { mood: "excited" }, text: ["There is a spark in it — like the number is another thing to win at.", ""] },
  { when: { mood: "focused" }, text: ["Clinical. Measured. Already filing it away.", ""] },
  { when: { mood: "content" }, text: ["Warm. Unhurried. Like she has made peace with the moment.", ""] },
  { when: { mood: "bemused" }, text: ["Dry amusement threads through every syllable.", ""] },
  { when: { mood: "warm" }, text: ["Soft and open, the way she is with everyone she cares for.", ""] },
  { when: { mood: "observant" }, text: ["She watches your face more than she watches the scale.", ""] },
  { when: { mood: "cheerful" }, text: ["Bright as sunlight through a kitchen window.", ""] },
  { when: { mood: "curious" }, text: ["She files the number away like a clue.", ""] },
]);
