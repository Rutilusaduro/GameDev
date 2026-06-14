// ═══════════════════════════════════════════════════════════════
// CORE LEXICON — word-level descriptor dictionaries
// Registered as built-in `word.*` modules at import time.
// All accept `:ref` to retarget onto the reference character,
// e.g. {word.size:ref} describes ctx.ref instead of ctx.subject.
//
// Stage keys match WEIGHT_STAGES ids in stages.js — one bucket per stage:
// slight(0) slim(1) soft(2) chubby(3) plump(4) heavy(5) fat(6)
// veryFat(7) enormous(8) colossal(9) blob(10) leviathan(11)
// ═══════════════════════════════════════════════════════════════
import { registerModule, stageBucket, pick } from './engine.js';

// ── size adjectives — canonical Slight→Blob ladder ───────────

export const SIZE_WORDS = {
  slight:   ["slight", "angular", "underweight", "wispy", "bird-boned", "narrow through the hips", "barely there"],
  slim:     ["slim", "slender", "lean", "narrow", "willowy", "light on her feet", "trim"],
  soft:     ["soft", "softened", "rounded", "filled-out", "gently padded", "yielding at the edges", "taking on curves"],
  chubby:   ["chubby", "thickening", "padded", "rounded", "pleasantly plump", "soft in the middle", "noticeably fuller"],
  plump:    ["plump", "thick", "heavyset", "well-padded", "substantially soft", "carrying extra weight", "full-figured"],
  heavy:    ["heavy", "broad", "ponderous", "weighty", "substantial", "dense with softness", "carrying real mass"],
  fat:      ["fat", "very fat", "rolling", "waddling", "abundant", "overflowing at the seams", "generously proportioned"],
  veryFat:  ["very fat", "vast", "immense", "overflowing", "enormous", "barely contained", "spilling past every edge"],
  enormous: ["enormous", "staggering", "room-filling", "mountainous", "colossal in scale", "immense by any measure", "overwhelmingly large"],
  colossal: ["monumental", "barely mobile", "overwhelming", "spreadingly vast", "architectural in scale", "immobile with mass", "beyond ordinary furniture"],
  blob:     ["immobile", "mountainous", "room-filling", "warmly spreading", "a landscape of flesh", "settled into sheer bulk", "motionless abundance"],
  leviathan: ["impossibly vast", "overwhelming", "warm and endless", "barely mobile", "a weather system of softness", "beyond measurement", "the room bends around her"],
};

// ── body phrases — bodyType × stage ───────────────────────────
// Keep a `default` row so unknown body types never break.

function bodyRow(slight, slim, soft, chubby, plump, heavy, fat, veryFat, enormous, colossal, blob) {
  return { slight, slim, soft, chubby, plump, heavy, fat, veryFat, enormous, colossal, blob };
}

export const BODY_WORDS = {
  pear: bodyRow(
    ["narrow waist over slim hips", "slim hips on a slight frame", "a pear shape barely visible yet"],
    ["slender hips flaring gently from a narrow waist", "a slim lower curve just starting to show"],
    ["hips just starting to widen", "a soft lower curve settling in", "thighs beginning to brush at the top"],
    ["hips visibly wider", "thighs pressing together from mid-thigh", "a pear-soft spread below the waist"],
    ["heavy hips and thickening thighs", "thighs rubbing together with every step", "a lower body leading the way"],
    ["broad, heavy hips that lead the way", "thighs that crowd each other constantly", "a pear shape grown dramatic"],
    ["enormous hips and thunder thighs", "a lower half overwhelming the upper body", "thighs displacing each other with every step"],
    ["hips that require wide doorways", "thighs of extraordinary circumference", "a vast pear silhouette from waist down"],
    ["hips wider than a doorway", "an avalanche of hip and thigh", "a lower body that fills hallways"],
    ["a pear shape scaled past ordinary measure", "thighs individually enormous", "hips that dominate any room"],
    ["a lower body that fills the room", "pear curves merged into immobile mass", "hips and thighs the room organizes around"],
  ),
  apple: bodyRow(
    ["a trim, straight middle", "a flat torso with the faintest forward tendency", "a slim frame, belly not yet visible"],
    ["a slender middle with a gentle forward suggestion", "a trim torso, apple shape structurally present"],
    ["a gentle rounding at the belly", "a waistline going quietly soft", "a small belly pooching forward"],
    ["a round belly pushing at waistbands", "a forward middle straining shirts", "an apple-full torso noticeably rounder"],
    ["a round, forward belly", "an apple-full middle straining her waistband", "a real belly rounding outward"],
    ["a deep, heavy belly that arrives first", "a gut that rests on her lap when she sits", "a belly hanging forward prominently"],
    ["a heavy belly past the hips", "a gut that dominates her silhouette", "a forward mass she balances with each step"],
    ["a belly cascading toward her knees", "a vast forward apron she cannot see past", "a torso defined by its hanging middle"],
    ["a belly like a rising tide", "a stomach that needs its own accommodations", "a forward mass that fills a couch"],
    ["a belly extending far in front of her", "a gut vast enough to be the primary fact of the room"],
    ["a belly that is most of the room", "forward mass merged into immobile abundance", "an apple shape become architectural"],
  ),
  hourglass: bodyRow(
    ["a balanced, light figure", "a slim hourglass line just visible", "curves present but still slight"],
    ["a neat hourglass on a slender frame", "waist nipping in cleanly from gentle curves"],
    ["curves deepening evenly, top and bottom", "an hourglass starting to pour fuller", "bust and hips both quietly swelling"],
    ["dramatic curves thickening", "waist softening as bust and hips grow", "an hourglass grown noticeably plush"],
    ["dramatic curves grown heavy", "a figure that swells generously in both directions", "bust and hips both commanding"],
    ["an hourglass scaled up past its mold", "deep, rolling curves above and below", "curves enormous in both directions"],
    ["curves stacked and heavy", "bust resting on a round belly, hips vast below", "an hourglass amplified to extreme scale"],
    ["curves vast enough to need custom clothes", "bust and hips both overwhelming", "waist a soft memory between enormous curves"],
    ["curves stacked on curves, all of them enormous", "an hourglass shape overwhelming in every dimension"],
    ["curves grown impossibly vast", "bust, belly, and hips a continuous landscape"],
    ["an hourglass shape remembered only in outline", "curves merged into immobile abundance", "a figure beyond ordinary proportion"],
  ),
  athletic: bodyRow(
    ["a tight, trained frame", "a lean athletic build, muscle visible", "a compact powerful frame still very lean"],
    ["a lean athletic build", "muscle definition clear through a slim frame"],
    ["muscle going quietly soft underneath", "a once-hard frame picking up padding", "athletic lines softened at the edges"],
    ["power still visible under new softness", "muscle buried under a layer of padding", "a trained frame visibly rounding"],
    ["power buried under comfortable thickness", "a strong build wrapped in new weight", "bulk layered over old muscle"],
    ["a big, heavy body that still moves like it trained once", "muscle softened but shoulders still broad", "athletic frame carrying substantial weight"],
    ["sheer mass where the athlete used to be", "power entombed in comfortable thickness", "a former athlete grown vast"],
    ["strength buried under immensity", "a trained frame scaled up past competition weight", "muscle a memory under heavy flesh"],
    ["sheer mass where the athlete used to be", "bulk that fills doorways", "an athlete's posture in an enormous body"],
    ["strength entombed in immensity", "a vast athletic frame barely mobile"],
    ["strength entombed in immobility", "athletic breadth become permanent mass", "power remembered in stillness"],
  ),
  straight: bodyRow(
    ["a narrow, straight frame", "a lean even figure", "a slim columnar shape"],
    ["a straight slender figure", "even thickness still minimal"],
    ["a straight figure softening at the edges", "uniform gentle rounding everywhere", "even softness settling in"],
    ["even thickness across the whole body", "a straight figure visibly rounder all over", "weight distributed uniformly"],
    ["even thickness settling everywhere at once", "a columnar figure grown plump", "round all over, no single feature leading"],
    ["a heavy, columnar body, weight carried all over", "uniform heaviness from shoulder to knee", "a straight figure grown heavy evenly"],
    ["a vast even roundness", "weight everywhere at significant scale", "a columnar body grown fat uniformly"],
    ["uniform enormity from shoulder to knee", "a straight figure scaled past ordinary furniture", "even mass overwhelming in every direction"],
    ["uniform enormity from shoulder to knee", "a body round and vast in every measurement"],
    ["a single continuous expanse of body", "even mass grown overwhelming", "uniform abundance beyond standard scale"],
    ["a single continuous expanse of body", "even mass become immobile warmth", "a straight figure amplified past ordinary scale"],
  ),
  rotund: bodyRow(
    ["a trim frame with a hint of roundness", "slight roundness at the edges", "a slim figure with soft potential"],
    ["a slender frame rounding evenly", "gentle spherical tendency showing"],
    ["a soft, doughy middle starting to show", "a figure rounding out evenly", "plumpness settling all over"],
    ["a rotund shape forming from every angle", "a doughy middle pushing forward", "even roundness straining clothes"],
    ["a plump, rotund shape from every angle", "a body gone soft and spherical", "round belly and soft flanks"],
    ["a heavy, round body that rolls when she moves", "a gut and hips merged into one curve", "rotund thickness with a slight waddle"],
    ["a vast round body, belly leading", "soft spherical mass in motion", "roundness overwhelming her silhouette"],
    ["a ballooning roundness", "a body mostly belly and soft flank", "rotund mass needing wide paths"],
    ["a vast, ballooning roundness", "a body that has become mostly belly and soft flank"],
    ["overwhelming roundness", "a spherical abundance of soft flesh"],
    ["a vast round mass, shape remembered only as a circle", "rotund immensity filling the room"],
  ),
  voluptuous: bodyRow(
    ["curves already present, even when slim", "a voluptuous line on a slight frame", "breasts and hips hinted even now"],
    ["curves present on a slender frame", "a voluptuous figure still mobile and light"],
    ["breasts and hips deepening together", "a voluptuous figure quietly swelling", "curves growing plush at bust and hip"],
    ["heavy curves straining seams", "breasts fuller, hips wider, both swelling", "a voluptuous figure grown noticeably plush"],
    ["heavy breasts and wide hips grown plush", "curves stacked and straining at every seam", "voluptuous abundance in motion"],
    ["enormous breasts resting on a soft belly", "a voluptuous body that fills every chair", "curves heavy and commanding"],
    ["breasts and belly grown vast", "a voluptuous body overwhelming furniture", "curves leading every movement"],
    ["breasts and belly grown past any ordinary scale", "curves so heavy they dominate her silhouette"],
    ["voluptuous excess at staggering scale", "breasts, belly, and hips all enormous"],
    ["voluptuous abundance grown overwhelming", "curves beyond ordinary description"],
    ["voluptuous excess become immobile abundance", "curves merged into warm immobile mass"],
  ),
  mom_bod: bodyRow(
    ["a practical, straight figure with room to soften", "a slim frame with maternal potential", "a slight figure, soft edges not yet arrived"],
    ["a slim practical figure", "a straight build with room to grow comfortable"],
    ["a gentle mom-soft middle settling in", "hips and waist going comfortably lived-in", "nurturing softness at the middle"],
    ["a soft mom-bod forming", "warm thickness at waist and hip", "a lived-in figure going comfortably round"],
    ["a soft mom-bod spread, warm at the middle", "a nurturing thickness around waist and hip", "maternal curves grown plump"],
    ["a heavy, maternal softness from chest to thigh", "a body built for comfort and second helpings", "mom-bod heaviness with a slight waddle"],
    ["a vast maternal softness", "a mom-bod grown fat and pillowy", "warm abundance from chest to thigh"],
    ["a pillowy mom-bod dominating furniture", "maternal softness scaled up past ordinary chairs"],
    ["a vast, pillowy mom-bod that dominates the couch", "soft abundance in every familiar place"],
    ["maternal softness grown overwhelming", "a mom-bod that fills and overflows seating"],
    ["maternal softness scaled up past any couch", "warm immobile abundance", "a mom-bod the room organizes around"],
  ),
  fertility_goddess: bodyRow(
    ["wide hips on a still-slender frame", "fertile curves barely visible yet", "a goddess line on a slight body"],
    ["wide hips on a slim frame", "breasts and hips ripening subtly"],
    ["breasts and hips ripening together", "a fertile curve starting to show", "goddess-softness settling in"],
    ["heavy breasts and widening hips", "a fertile figure grown noticeably plush", "abundance ripening at bust and thigh"],
    ["heavy breasts and thunder thighs grown plush", "a goddess-soft body swelling with abundance", "fertile curves commanding"],
    ["breasts and hips grown heavy and commanding", "a fertile, overflowing figure", "goddess abundance with a rolling gait"],
    ["breasts, belly, and hips grown vast", "a fertility goddess scaled up dramatically", "ripe curves overwhelming"],
    ["breasts, belly, and hips grown impossibly vast", "a fertile body needing wide doorways"],
    ["fertility made flesh at enormous scale", "breasts and hips grown staggering"],
    ["a fertile body grown overwhelming", "abundance beyond ordinary measure"],
    ["fertility made flesh, immobile and vast", "goddess curves become permanent warmth"],
  ),
  topHeavy: bodyRow(
    ["a narrow lower half under a fuller chest", "breasts slightly ahead of the rest", "top-heavy tendency on a slight frame"],
    ["breasts growing ahead of everything else", "a top-heavy softness settling in", "a fuller bust on a still-slim lower half"],
    ["breasts fuller, hips playing catch-up", "a chest grown ahead of her middle", "top-heavy softness becoming obvious"],
    ["heavy breasts on a still-narrower lower half", "a chest straining shirts while hips stay modest", "top-heavy contrast grown clear"],
    ["heavy breasts leading a still-narrower lower half", "a chest grown plush while hips play catch-up", "top-heavy abundance tipping her forward"],
    ["enormous breasts resting on a softer middle", "a top-heavy body that tips forward when she leans", "chest dominating a still-smaller lower half"],
    ["breasts vast and heavy on a softer torso", "top-heavy mass she balances carefully", "chest overwhelming the rest of her frame"],
    ["breasts so heavy they dominate her silhouette", "a vast upper body outgrowing everything below"],
    ["an enormous chest on an enormous body", "top-heavy excess at staggering scale"],
    ["a vast upper body", "breasts and belly heavy above narrower hips"],
    ["a vast upper body that has outgrown the rest", "chest merged into immobile abundance"],
  ),
  default: bodyRow(
    ["a slim figure", "a slight angular frame", "a narrow body"],
    ["a slender figure", "a lean easy frame"],
    ["a figure going gently soft", "softness settling evenly"],
    ["a chubby, rounded figure", "clothes fitting noticeably tighter"],
    ["a thick, well-fed figure", "a plump body grown unmistakable"],
    ["a heavy, abundant body", "weight carried with a slower gait"],
    ["a fat, soft body", "abundance in every direction"],
    ["a very fat, vast body", "mass needing space and care"],
    ["a body of staggering size", "enormity in every measurement"],
    ["an overwhelming body", "size beyond ordinary furniture"],
    ["a body beyond ordinary scale", "immobile warm abundance", "a presence the room organizes around"],
  ),
};

// ── movement verbs by stage ───────────────────────────────────

export const MOVEMENT_WORDS = {
  slight:   ["strides", "moves lightly", "slips along", "takes quick easy steps", "crosses the room without effort", "drifts through space"],
  slim:     ["walks easily", "moves with natural ease", "glides through the room", "steps without hurry", "moves like she still owns the floor"],
  soft:     ["walks with a new sway", "moves with a soft bounce", "steps with a gentle heaviness settling in", "carries a little more rhythm in her hips", "sways when she turns"],
  chubby:   ["walks with a thickened gait", "moves with a soft bounce", "sways slightly with new weight", "steps with thighs beginning to brush", "rocks a little with each stride"],
  plump:    ["sways", "moves with deliberate, rolling steps", "walks with thighs brushing together", "carries her weight with a settled rhythm", "moves like the room should make room"],
  heavy:    ["waddles slightly", "moves with slow, weighty purpose", "rocks side to side as she goes", "advances with audible breath", "shifts her mass before each step"],
  fat:      ["waddles", "moves with a rolling gait", "rocks side to side with each deliberate step", "labors pleasantly forward", "lets momentum do half the work"],
  veryFat:  ["waddles slowly", "moves with great deliberation", "advances one careful step at a time", "pauses to settle between steps", "rolls forward by inches"],
  enormous: ["lumbers", "advances like weather", "moves one ponderous step at a time", "crosses space in slow surges", "makes the floor answer"],
  colossal: ["shuffles", "moves inches at a time", "shifts her mass with audible effort", "barely crosses the threshold", "repositions rather than walks"],
  blob:     ["barely moves", "shifts like a slow tide", "settles rather than walks", "ripples when she tries", "exists in place with effort"],
  leviathan: ["barely shifts", "settles rather than walks", "exists more than arrives", "moves like geography rearranging", "arrives by accumulation not stride"],
};

// ── clothing fit — season × stage ─────────────────────────────

const seasonRow = (slight, slim, soft, chubby, plump, heavy, fat, veryFat, enormous, colossal, blob, leviathan) =>
  ({ slight, slim, soft, chubby, plump, heavy, fat, veryFat, enormous, colossal, blob, leviathan: leviathan || blob });

export const CLOTHING_FIT = {
  fall: seasonRow(
    ["a light jacket hanging loose on her angular frame", "clothes hanging off a slight frame", "layers with room to spare"],
    ["a jacket hanging loosely", "fall layers falling straight on a slim frame", "clothes still easy on her"],
    ["a cardigan that sits a little closer than last month", "a sweater beginning to hug new softness", "fabric settling closer at the middle"],
    ["a cardigan straining at the buttons", "clothes noticeably tighter across bust and belly", "waistbands working harder than they used to"],
    ["a sweater filled out completely, stretched soft at the seams", "shirts riding up at the hem", "a plump figure testing every seam"],
    ["layers that have given up disguising anything", "a coat worn open over a heavy middle", "fabric pulled drum-tight"],
    ["clothes at war with her body", "buttons under permanent strain", "layers that stopped pretending to fit"],
    ["garments remade once and outgrown again", "custom sizing still losing the fight", "fabric surrendering at every edge"],
    ["a custom wrap of fabric more tarp than outfit", "clothing more suggestion than coverage", "panels joined where buttons used to be"],
    ["fabric panels joined by hope", "draped layers over mass no rack was built for", "clothes in name only"],
    ["draped cloth that covers what clothing no longer can", "fabric organized around her rather than on her", "blankets and drape where outfits failed"],
    ["no garment made for this — warmth arranged around her like landscape", "draped cloth that is more architecture than outfit", "the room provides what clothing cannot"],
  ),
  winter: seasonRow(
    ["a winter coat swallowing her whole", "thick layers hanging off narrow shoulders", "a coat with room enough for two of her"],
    ["a winter coat hanging loose", "layers still falling straight", "cold-weather clothes with space to spare"],
    ["a coat that finally fits the way it was cut to", "winter layers sitting closer at the middle", "a sweater hugging new softness"],
    ["a winter coat snug across the bust and belly", "layers tight at waist and hip", "buttons starting to complain"],
    ["a winter coat that won't zip past her middle", "thick layers stretched tight across softened curves", "a plump figure testing every zipper"],
    ["a parka worn open because closed stopped being an option", "winter layers strained to a standstill", "a heavy body outgrowing off-the-rack cold weather"],
    ["two layers worn like one, neither closing", "a coat that gave up at the waist", "winter clothes stretched past their purpose"],
    ["custom winter wear still too small", "layers that cannot meet in front", "fabric thick but insufficient"],
    ["two coats worn like one, neither closing", "winter gear remade and failing again", "outerwear more tarp than coat"],
    ["blankets layered where coats failed", "winter fabric organized around her mass", "draped warmth because zippers are history"],
    ["blankets, because no coat was ever made for this", "warmth by arrangement not tailoring", "the room provides what clothing cannot"],
    ["winter warmth arranged around impossible mass — fabric as draped heat", "no coat; only blankets and endless soft bulk", "clothing surrendered entirely to her size"],
  ),
  spring: seasonRow(
    ["light spring clothes fluttering on a slight frame", "a spring dress hanging straight", "layers light enough to forget she's wearing them"],
    ["spring clothes falling easily", "a dress with room to move", "light fabric on a slim frame"],
    ["a spring dress that clings where it used to fall straight", "fabric honest about new curves", "a blouse closer at the middle"],
    ["a spring outfit tighter at bust and belly", "a dress that clings without permission", "waistbands leaving marks"],
    ["a sundress working hard across new width", "spring fabric pulled across a plump middle", "a dress that remembers when she was smaller"],
    ["spring fabric pulled drum-tight", "gaps blooming between buttons", "a dress remade once already"],
    ["a dress remade and straining again", "spring clothes losing at every hem", "fabric at open war with her body"],
    ["garments that cannot contain her", "spring wear more hope than fit", "panels and pins holding things together"],
    ["a dress remade twice and outgrown twice", "spring fabric organized around abundance", "clothing more architecture than outfit"],
    ["fabric panels joined by hope", "a spring wrap more banner than dress", "clothes that exist beside her body"],
    ["fabric panels joined by hope", "draped spring cloth", "the concept of a dress, applied loosely"],
    ["spring fabric cannot — only draped abundance and warm endless folds", "clothes beside her rather than on her", "the concept of an outfit long abandoned"],
  ),
  summer: seasonRow(
    ["summer clothes hanging loosely on her narrow frame", "a tank top with room to spare", "light clothes on a slight body"],
    ["summer clothes hanging loosely", "a tank falling straight", "light fabric, easy fit"],
    ["a tank top that's begun to fit very honestly", "summer fabric clinging at the middle", "shorts tighter than last year"],
    ["summer clothes noticeably tighter", "a tank straining across the bust", "shorts digging at the waist"],
    ["light summer clothes stretched tight across softening curves", "a sundress working hard", "summer wear honest about her plumpness"],
    ["a summer outfit at war with itself", "skin winning at every hem", "straps doing more than they were designed for"],
    ["summer clothes in name only", "straps, panels, and surrender", "fabric giving up at the thighs"],
    ["custom summer wear still too small", "panels where coverage used to be", "an outfit more suggestion than garment"],
    ["summer clothes in name only — straps, panels, and surrender", "fabric that lost every negotiation"],
    ["draped summer cloth", "a wrap more flag than outfit", "clothing beside her rather than on her"],
    ["the concept of an outfit, applied loosely", "draped cloth and shade", "summer by arrangement not tailoring"],
    ["summer by arrangement only — endless warmth, no garment sufficient", "draped shade over endless soft bulk", "fabric organized around her like weather"],
  ),
};

// Stage 11 body phrases (appended — impossibly vast, center of gravity, endless rolls)
const LEVIATHAN_BODY = {
  pear: ["hips so heavy they anchor the room", "lower-body warmth spreading in endless soft rolls", "pear curves that make the floorboards register"],
  apple: ["a belly that is the room's warm center of gravity", "forward mass immobile, plush, and impossibly heavy", "gut cascading in heavy yielding folds"],
  hourglass: ["curves stacked impossibly high and soft", "bust and hips merged into one warm endless landscape", "abundance above and below, barely mobile"],
  athletic: ["power remembered under endless warm softness", "athletic breadth buried in heavy yielding flesh", "strength entombed in plush immobile mass"],
  straight: ["even abundance in every direction, impossibly vast", "uniform softness spreading warm and heavy", "columnar mass that fills the room's attention"],
  rotund: ["spherical warmth at a scale beyond furniture", "roundness so soft the room holds still around her", "a vast soft globe of yielding flesh"],
  voluptuous: ["curves endless, warm, and pressing outward", "breasts and belly merged into one plush landscape", "voluptuous excess that jiggles when she breathes"],
  mom_bod: ["maternal softness — the room's warm center", "pillowy abundance spilling in heavy rolls", "warm hips and belly past any ordinary chair"],
  fertility_goddess: ["ripe curves vast, warm, and barely mobile", "breasts, belly, and hips in endless soft abundance", "fertility made flesh — heavy, spreading, indulgent"],
  topHeavy: ["an upper body that outgrows everything below", "vast chest merged into endless soft warmth", "top-heavy plushness that tips her forward when she shifts"],
  default: ["a body warm, endless, and impossibly heavy", "flesh at a scale that reorganizes the room", "immobile abundance — soft rolls, deep warmth, total presence"],
};
for (const [key, phrases] of Object.entries(LEVIATHAN_BODY)) {
  if (BODY_WORDS[key]) BODY_WORDS[key].leviathan = phrases;
}

// ── fullness phrases by fullness/capacity ratio ───────────────

export const FULLNESS_WORDS = [
  { max: 0.25, words: ["barely touched", "comfortably empty", "light", "hardly started", "still hungry", "room for much more", "hollow with appetite"] },
  { max: 0.60, words: ["pleasantly full", "satisfied", "warm and fed", "comfortably fed", "content but not done", "softly full", "fed enough to relax"] },
  { max: 0.90, words: ["very full", "heavily laden", "packed tight", "substantially full", "stuffed but still moving", "full to the brim", "swollen with food"] },
  { max: 1.10, words: ["stuffed to her limit", "achingly full", "stretched taut", "drum-tight", "painfully full", "packed past comfort", "breathing around fullness"] },
  { max: Infinity, words: ["overfilled past anything reasonable", "swollen drum-tight", "beyond capacity and still holding", "packed past what should fit", "obscenely full", "stuffed into immobility", "full past the point of pride"] },
];

// ── registration ──────────────────────────────────────────────

function bucketFallback(dict, bucket) {
  return dict[bucket] || dict.soft || dict.plump || dict.slim || Object.values(dict)[0];
}

function byBucket(dict) {
  return (ctx) => pick(bucketFallback(dict, stageBucket(ctx.d.stage ?? 0)));
}

registerModule("word.size", [{ when: {}, text: byBucket(SIZE_WORDS) }]);

registerModule("word.movement", [{ when: {}, text: byBucket(MOVEMENT_WORDS) }]);

registerModule("word.body", [{
  when: {},
  text: (ctx) => {
    const rows = BODY_WORDS[ctx.d.bodyType] || BODY_WORDS.default;
    const bucket = stageBucket(ctx.d.stage ?? 0);
    return pick(bucketFallback(rows, bucket));
  },
}]);

registerModule("word.clothingFit", [{
  when: {},
  text: (ctx) => {
    const seasonRows = CLOTHING_FIT[ctx.season] || CLOTHING_FIT.fall;
    const bucket = stageBucket(ctx.d.stage ?? 0);
    return pick(bucketFallback(seasonRows, bucket));
  },
}]);

registerModule("word.fullness", [{
  when: {},
  text: (ctx) => {
    const ratio = ctx.d.fullnessRatio ?? 0;
    const row = FULLNESS_WORDS.find((r) => ratio <= r.max) || FULLNESS_WORDS[0];
    return pick(row.words);
  },
}]);
