// ═══════════════════════════════════════════════════════════════
// GROWTH EVENT — fragment pools (slot-composed)
// Grammar shapes declared per-pool banner.
// Per-girl voice lives in ./personas.js.
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../../engine.js';
import '../../modules.js';

// FULL SENTENCE — onset beat skeletons
registerPool('ge.onset', [
  { when: { isMalfunction: true }, text: [
    '{ge.causeAction}{ge.causeAnchor} — {ge.firstSensation}, then something goes wrong.',
    'It starts as planned{ge.causeAnchor}: {ge.firstSensation}, until the rig stutters.',
  ] },
  { when: { featureId: 'digest_stageup' }, weight: 4, text: [
    '{subject.name} {ge.digestOnsetLine}.',
  ] },
  { when: {}, text: [
    '{ge.causeAction}{ge.causeAnchor} — {ge.firstSensation}.',
    'The change begins{ge.causeAnchor}: {ge.firstSensation}.',
  ] },
]);

// VERB PHRASE — what triggers the growth
registerPool('ge.causeAction', [
  { when: { deviceId: 'growth_accelerator_chamber' }, text: [
    'the chamber seals and the radiation field ramps up',
    'the acceleration field floods her from every panel',
    'the chamber begins its cycle, warm and relentless',
  ] },
  { when: { deviceId: 'growth_serum_injector' }, text: [
    'the injector plunges its volatile dose home',
    'the formula shot hits her bloodstream fast',
    'growth compound races through her before the ache fades',
  ] },
  { when: { deviceId: 'endless_hunger_engine' }, text: [
    'the Hunger Ray tags her with engineered craving',
    'satiety suppression lands — the hollow returns fast',
    'the ray rewires hunger until eating is the only relief',
  ] },
  { when: { deviceId: 'auto_bloating_belt' }, text: [
    'the belt inflates around her waist',
    'the Weight Belt clamps her midsection in automatic pressure',
    'bloat pressure cycles through the waist harness on schedule',
  ] },
  { when: { deviceId: 'auto_feeder_arm' }, text: [
    'the feeder arm swings to her mouth on schedule',
    'another measured portion arrives by servo-guided arm',
    'the Auto-Feed Arm holds position and pushes food through',
  ] },
  { when: { deviceId: 'feeding_mask' }, text: [
    'the Force Feeder locks and forces another quota through the tube',
    'the mask holds fast and keeps feeding',
    'straps cinch while paste keeps landing past sealed lips',
  ] },
  { when: { deviceId: 'obedience_belt' }, text: [
    'the Obedience Belt tightens its compliance loop',
    'shame cues and feeding prompts stack from the waist harness',
    'the belt hums whenever she hesitates — obedience and appetite braided',
  ] },
  { when: { deviceId: 'reinforced_legs' }, text: [
    'the leg braces bear new load as her lower body thickens',
    'reinforced supports adjust while furniture-weight settles through her thighs',
    'servos in the braces compensate as mass stacks lower on her frame',
  ] },
  { when: { deviceId: 'living_furniture_rig' }, text: [
    'the Furniture Harness feeds her to hold the shape',
    'restraint tubes maintain the furniture form with steady calories',
    'the rig swells its cushion while calories keep the form usable',
  ] },
  // growthMethod fallbacks — device-driven feeding only (not organic digest stage-ups)
  { when: { growthMethod: 'feed', causeType: ['device_use', 'weekly_tick', 'device_malfunction'] }, text: [
    'more food arrives, mechanical and certain',
    'the feeding mechanism delivers another round',
    'calories land on schedule, portion after portion',
  ] },
  { when: { growthMethod: 'digest' }, text: [
    'the week\'s calories finally settle into stored mass',
    'accumulated eating crosses from fullness into permanence',
    'digestion catches up with everything she consumed',
  ] },
  { when: { growthMethod: 'bloat' }, text: [
    'the bloating pressure builds from the inside out',
    'the bloat compound takes its toll',
    'pressure swells through her midsection in measured waves',
  ] },
  { when: { growthMethod: 'serum' }, text: [
    'the growth formula takes hold in her bloodstream',
    'the serum cascade begins',
    'volatile compound converts faster than comfort allows',
  ] },
  { when: { growthMethod: 'radiation' }, text: [
    'the radiation field builds toward critical density',
    'the field concentrates on her adipose',
    'warm deposition multiplies under the sealed field',
  ] },
  { when: { growthMethod: 'hunger' }, text: [
    'craving outruns whatever she just ate',
    'satiety fails to catch up with appetite',
    'hunger rewrites the week before fullness can argue back',
  ] },
  // featureId cells
  { when: { featureId: 'stream' }, text: [
    'the audience\'s attention fuels something physical',
    'the stream goes live and the exposure does its work',
  ] },
  { when: { featureId: 'compound' }, text: [
    'the pharmacist\'s compound takes full effect',
    'the week\'s dose accumulates into visible change',
  ] },
  { when: { featureId: 'cultivator' }, text: [
    'the cultivator delivers its scheduled dose',
    'her tended plant delivers the week\'s compound',
  ] },
  { when: { featureId: 'contest' }, text: [
    'the contest session triggers the expected change',
    'competitive conditions accelerate the process',
  ] },
  { when: { featureId: 'digest_stageup' }, weight: 4, text: [
    'her body quietly tips over its own threshold',
    'accumulated mass crosses into a new register',
  ] },
  // generic wildcard
  { when: {}, text: ['the growth takes hold', 'her body answers the stimulus', 'the change arrives on schedule'] },
]);

// PREP ANCHOR — contextualizes where/how the cause acts; '' is valid
registerPool('ge.causeAnchor', [
  { when: { deviceId: 'growth_accelerator_chamber' }, text: [' inside the chamber', ' in the sealed radiation field', ''] },
  { when: { deviceId: 'growth_serum_injector' }, text: [' as the injector hisses shut', ' with formula still burning through her veins', ''] },
  { when: { deviceId: 'endless_hunger_engine' }, text: [' with hunger gnawing underneath', ' while satiety never quite lands', ' at range'] },
  { when: { deviceId: 'auto_bloating_belt' }, text: [' around her waist', ' against her midsection', ''] },
  { when: { deviceId: 'auto_feeder_arm' }, text: [' from the feeder arm', ' under mechanical feeding', ''] },
  { when: { deviceId: 'feeding_mask' }, text: [' behind the locked mask', ' through the sealed tube', ''] },
  { when: { deviceId: 'obedience_belt' }, text: [' under the compliance harness', ' at the waist', ''] },
  { when: { deviceId: 'reinforced_legs' }, text: [' through the braced supports', ' as the leg rig takes load', ''] },
  { when: { deviceId: 'living_furniture_rig' }, text: [' in the furniture harness', ' inside the restraint frame', ''] },
  { when: { locale: 'lab' }, text: [
    ' with {subject.name} in the lab',
    ' as {subject.name} stands in Talia\'s lab',
    ' while {subject.name} waits inside the lab',
  ] },
  { when: { featureId: 'digest_stageup' }, weight: 4, text: [
    '',
    ' after a week of steady eating',
    ' without fanfare',
  ] },
  { when: {}, text: ['', ' with {subject.name} on campus', ' on campus'] },
]);

// VERB PHRASE — digest onset line (subject.name + this slot = full sentence)
registerPool('ge.digestOnsetLine', [
  { when: { featureId: 'digest_stageup' }, text: [
    'wakes on Sunday and feels the difference before she reaches the mirror',
    'notices getting into her bra takes an extra tug at the clasp',
    'finds last week\'s jeans reluctant at the waist',
    'feels the week\'s meals finally becoming visible curve',
    'registers weight the scale has been hinting at all week',
    'feels her body quietly tip past a familiar line',
  ] },
  { when: {}, text: ['feels the weight settle in'] },
]);

// PARTICIPLE CLAUSE — first sensation keyed on sensation × growthIntensity
registerPool('ge.firstSensation', [
  { when: { sensation: 'warmth', growthIntensity: 'violent' }, text: [
    'scorching warmth radiating from the inside out',
    'heat slamming through her body without warning',
  ] },
  { when: { sensation: 'warmth', growthIntensity: 'rapid' }, text: [
    'heat flooding her body faster than she can breathe through',
    'warmth spiking through her skin all at once',
  ] },
  { when: { sensation: 'warmth', growthIntensity: 'gradual' }, text: [
    'a slow warmth building from somewhere deep',
    'gentle heat gathering under the skin',
  ] },
  { when: { sensation: 'warmth' }, text: ['warming from the inside out', 'heat pooling under her skin'] },
  { when: { sensation: 'pressure', growthIntensity: 'violent' }, text: [
    'pressure slamming her midsection without warning',
    'the sudden impact of bloat stopping her breath',
  ] },
  { when: { sensation: 'pressure', growthIntensity: 'rapid' }, text: [
    'pressure spiking against her waist in seconds',
    'rapid tightening that leaves no time to brace',
  ] },
  { when: { sensation: 'pressure' }, text: ['tightening under sudden pressure', 'stretching against invisible force'] },
  { when: { sensation: 'stretch', growthIntensity: 'violent' }, text: [
    'a violent stretch pulling every inch outward',
    'skin and muscle wrenched wide all at once',
  ] },
  { when: { sensation: 'stretch', growthIntensity: 'rapid' }, text: [
    'a rapid inescapable stretch across every zone',
    'stretch coming faster than she can track',
  ] },
  { when: { sensation: 'stretch' }, text: ['an aching outward stretch', 'her skin registering the change before her mind does'] },
  { when: { sensation: 'pleasure', growthIntensity: 'rapid' }, text: [
    'pleasure cascading faster than she can process',
    'a rush of feeling she didn\'t ask for',
  ] },
  { when: { sensation: 'pleasure' }, text: ['shivering with involuntary pleasure', 'softening into the pulse'] },
  { when: { sensation: 'fullness', growthIntensity: 'violent' }, text: [
    'her stomach slamming full in a single moment',
    'fullness arriving all at once, too fast to argue with',
  ] },
  { when: { sensation: 'fullness', growthIntensity: 'rapid' }, text: [
    'fullness climbing before she can resist it',
    'her middle filling up fast',
  ] },
  { when: { sensation: 'fullness', growthIntensity: 'gradual' }, weight: 2, text: [
    'a slow fullness spreading into permanence',
    'gentle heaviness gathering under the skin',
  ] },
  { when: { sensation: 'fullness', growthIntensity: 'steady' }, weight: 2, text: [
    'fullness settling into something that will not pass',
    'the steady weight of a week\'s eating catching up',
  ] },
  { when: { featureId: 'digest_stageup' }, weight: 4, text: [
    'feeling the week\'s meals finally become visible curve',
    'registering weight the scale has been hinting at all week',
    'body quietly tipping past a familiar line',
  ] },
  { when: { sensation: 'craving' }, text: [
    'gnawing emptiness under every swallow',
    'hunger blooming faster than fullness can answer',
  ] },
  { when: { deviceId: 'auto_feeder_arm' }, text: [
    'feeling the next portion arrive on schedule',
    'fullness stacking under mechanical feeding',
  ] },
  { when: {}, text: ['registering the change before her mind catches up', 'body answering before thought does'] },
]);

// FULL SENTENCE — surge beat skeletons
registerPool('ge.surge', [
  { when: { stagesJumpedMin: 2 }, text: [
    '{grow.sudden} {ge.surgeDetail}.',
    'The swell hits hard — {grow.sudden} {ge.surgeDetail}.',
  ] },
  { when: {}, text: [
    '{grow.sudden}{join:ge.surgeDetail|prefix: — }.',
    'Pounds land fast: {grow.sudden}.',
  ] },
]);

// ADVERBIAL — how the surge unfolds (keyed on growthMethod, malfunctionTier, intensity)
registerPool('ge.surgeDetail', [
  { when: { growthMethod: 'radiation' }, text: [
    'the field still pushing after the dose should have ended',
    'radiation-fed deposition, layer on layer',
  ] },
  { when: { growthMethod: 'serum' }, text: [
    'the serum working faster than the label ever suggested',
    'compound accelerating every fat cell at once',
  ] },
  { when: { growthMethod: 'hunger' }, text: [
    'appetite outrunning whatever she just ate',
    'satiety failing to catch up with the swell',
    'craving stacking faster than fullness can answer',
  ] },
  { when: { growthMethod: 'bloat' }, text: [
    'bloat converting to real mass beneath the pressure',
    'the belt\'s work showing up as permanent curve',
    'pressure settling into softness that will not deflate',
  ] },
  { when: { growthMethod: 'feed', causeType: ['device_use', 'weekly_tick', 'device_malfunction'] }, text: [
    'calories landing faster than shame can organize',
    'another round of feeding converting straight to stored mass',
    'fullness compounding into visible curve',
  ] },
  { when: { growthMethod: 'digest' }, text: [
    'the week\'s intake converting into stored curve',
    'digestion depositing what eating promised all week',
  ] },
  { when: { malfunctionTier: 'critical' }, text: [
    'with catastrophic disregard for limits',
    'past every safety threshold',
  ] },
  { when: { malfunctionTier: 'major' }, text: [
    'well outside spec, unstoppable on its own momentum',
    'far past the planned limit',
  ] },
  { when: { malfunctionTier: 'moderate' }, text: ['harder than intended, less controlled', 'messy, overshooting the target'] },
  { when: { gainLbsMin: 10 }, text: [
    'double-digit gain settling all at once',
    'a significant deposit, unavoidable and permanent',
  ] },
  { when: { stagesJumpedMin: 2 }, text: [
    'crossing two thresholds in a single session',
    'the body jumping ahead of every prediction',
  ] },
  { when: { growthIntensity: 'violent' }, text: ['violently, without mercy', 'in a brutal rush'] },
  { when: { growthIntensity: 'rapid' }, text: ['faster than she can track', 'in minutes that feel like seconds'] },
  { when: {}, text: ['', 'steadily, insistently'] },
]);

// VERB PHRASE — zone × bodyType surge description
registerPool('grow.sudden', [
  { when: { growthZone: 'belly', bodyType: 'apple' }, text: [
    'her gut surges outward all at once, round and assertive',
    'her belly expands forward with sudden authority',
  ] },
  { when: { growthZone: 'belly', bodyType: 'rotund' }, text: [
    'her belly billows larger, doughy and sudden',
    'her round middle surges out another size',
  ] },
  { when: { growthZone: 'belly' }, text: ['her belly surges outward', 'her midsection balloons'] },
  { when: { growthZone: 'hips', bodyType: 'pear' }, text: [
    'her hips swell wide in one unbroken motion',
    'lower-body weight deposits fast and unmistakably',
  ] },
  { when: { growthZone: 'hips', bodyType: 'hourglass' }, text: [
    'her already-wide hips claim more space, unhurried',
    'curves stacking wider without asking permission',
  ] },
  { when: { growthZone: 'hips' }, text: ['her hips widen in a single swell', 'her lower body thickens'] },
  { when: { growthZone: 'thighs', bodyType: 'pear' }, text: [
    'her thighs thicken and press together harder',
    'inner thighs find each other with new insistence',
  ] },
  { when: { growthZone: 'thighs' }, text: ['her thighs thicken all at once', 'inner thigh softness appears fast'] },
  { when: { growthZone: 'ass' }, text: ['her ass fills out in a single visible surge', 'her backside swells heavier and rounder'] },
  { when: { growthZone: 'chest', bodyType: 'topHeavy' }, text: [
    'her chest swells forward, heavy and undeniable',
    'her already-heavy bust grows heavier still',
  ] },
  { when: { growthZone: 'chest', bodyType: 'voluptuous' }, text: [
    'her bust grows larger, every curve amplified',
    'fullness arrives in her chest first, then everywhere',
  ] },
  { when: { growthZone: 'chest' }, text: ['her chest swells forward', 'her bust fills out all at once'] },
  { when: { growthZone: 'full', bodyType: 'rotund' }, text: [
    'she rounds in every direction at once',
    'every zone softens simultaneously, no exception',
  ] },
  { when: { growthZone: 'full' }, text: ['her whole frame softens and spreads', 'weight deposits everywhere at once'] },
  { when: { growthZone: 'lower_body' }, text: [
    'everything from the waist down softens and spreads',
    'hips, thighs, and ass all claim their share at once',
  ] },
  { when: {}, text: ['she swells visibly', 'new softness appears all at once'] },
]);

// FULL SENTENCE — zone summary
registerPool('ge.zoneFocus', [
  { when: { growthZone: 'belly' }, text: [
    'The belly takes the bulk of it, round and heavy.',
    'The gain pools at the midsection, undeniable.',
  ] },
  { when: { growthZone: 'hips' }, text: [
    'Her hips claim the gain, wider with each moment.',
    'The weight settles low and wide, hip-led.',
  ] },
  { when: { growthZone: 'thighs' }, text: [
    'Inner thighs soften into each other.',
    'Thigh mass deposits evenly and fast.',
  ] },
  { when: { growthZone: 'ass' }, text: [
    'Her backside rounds out, heavy and prominent.',
    'The ass takes the majority, reshaping from behind.',
  ] },
  { when: { growthZone: 'chest' }, text: [
    'Her chest fills, lifting and softening.',
    'Bust expansion claims the gain first.',
  ] },
  { when: { growthZone: 'full' }, text: [
    'The gain distributes everywhere at once, no zone spared.',
    'Nothing is exempt — the whole frame claims its share.',
  ] },
  { when: { growthZone: 'lower_body' }, text: [
    'Lower body — hips, thighs, ass — absorbs it together.',
    'The gain goes south, all of it.',
  ] },
  { when: {}, text: ['The gain settles where the stimulus aimed.', 'Fat finds its appointed place.'] },
]);

// NOUN PHRASE — archetype garment; outfitHint overrides at weight 4
registerPool('ge.garment', [
  { when: { outfitHint: 'stream' }, weight: 4, text: ['her stream outfit', 'the look she wore for the stream'] },
  { when: { outfitHint: 'contest' }, weight: 4, text: ['her contest look', 'the outfit she chose for the event'] },
  { when: { archetype: 'cheerleader', stageMin: 6 }, text: ['whatever still fits of the uniform', 'the uniform, strained'] },
  { when: { archetype: 'cheerleader', stageMin: 3, stageMax: 5 }, text: ['her cheer uniform', 'the fitted top and skirt'] },
  { when: { archetype: 'bookworm', stageMin: 6 }, text: ['the cardigan, buttons working hard', 'whatever layers still button'] },
  { when: { archetype: 'bookworm', stageMin: 3, stageMax: 5 }, text: ['her cardigan', 'the button-front she favors'] },
  { when: { archetype: 'influencer', stageMin: 6 }, text: ['the once-fitted content look', 'whatever still reads camera-ready'] },
  { when: { archetype: 'influencer', stageMin: 3, stageMax: 5 }, text: ['the fitted content-day set', 'her crop top and high-waist combo'] },
  { when: { archetype: 'athlete', stageMin: 6 }, text: ['the stretched compression fabric', 'athletic wear fighting new proportions'] },
  { when: { archetype: 'athlete', stageMin: 3, stageMax: 5 }, text: ['her compression gear', 'the athletic set she trained in'] },
  { when: { archetype: 'artsy', stageMin: 3, stageMax: 5 }, text: ['her oversized studio top', 'the layered artsy look'] },
  { when: { archetype: 'gamer', stageMin: 3, stageMax: 5 }, text: ['her gaming hoodie', 'the oversized tee'] },
  { when: { archetype: 'sorority', stageMin: 6 }, text: ['the fitted chapter top, well past fitted', 'her chapter look, resized'] },
  { when: { archetype: 'sorority', stageMin: 3, stageMax: 5 }, text: ['the chapter fitted top', 'her sorority event look'] },
  { when: { archetype: 'culinary', stageMin: 6 }, text: ['her apron, straining over kitchen blacks', 'chef\'s whites fighting new curves'] },
  { when: { archetype: 'culinary', stageMin: 3, stageMax: 5 }, text: ['her flour-dusted apron', 'her chef\'s whites and checked pants'] },
  { when: { archetype: 'nursing', stageMin: 6 }, text: ['her scrubs, stretched at every seam', 'soft knit layers pulled tight'] },
  { when: { archetype: 'nursing', stageMin: 3, stageMax: 5 }, text: ['her cardigan and scrub pants', 'her nursing-student layers'] },
  { when: { archetype: 'predator', stageMin: 3 }, text: ['her black fitted dress', 'the dark clothes she wears like camouflage'] },
  { when: { archetype: 'eced', stageMin: 3 }, text: ['her soft southern blouse', 'her stretch jeans and floral top'] },
  { when: { archetype: 'farm_girl', stageMin: 3 }, text: ['her worn flannel', 'her farm jeans and western belt'] },
  { when: { archetype: 'pharmacy_grad', stageMin: 3 }, text: ['her pressed lab coat', 'her clinical blouse and slacks'] },
  { when: { archetype: 'explorer', stageMin: 3 }, text: ['her field jacket', 'her cargo pants and expedition tee'] },
  { when: { archetype: 'inventor', stageMin: 3 }, text: ['her grease-stained lab coat', 'her hoodie under engineering layers'] },
  { when: { archetype: 'quiet', stageMin: 3 }, text: ['her loose sweater', 'her soft hoodie and jeans'] },
  { when: { archetype: 'transfer', stageMin: 3 }, text: ['her fitted tee and jeans', 'the casual she brought from home'] },
  { when: { archetype: 'overachiever', stageMin: 3 }, text: ['her pressed blouse and skirt', 'her structured campus set'] },
  { when: {}, text: ['her clothes', 'the outfit she chose this morning', 'the layers she wore in'] },
]);

// FULL SENTENCE — strain beat skeletons
registerPool('ge.strain', [
  { when: { endStageMin: 4 }, text: [
    '{ge.garment} {ge.clothingStrain}{join:ge.clothingFail|prefix: — }.',
    'Fabric protests — {ge.garment} {word.clothingFit}{join:ge.clothingFail|prefix:; }.',
  ] },
  { when: {}, text: ['{ge.garment} pulls tighter across her changing body.'] },
]);

// VERB PHRASE — how the garment strains; follows the garment noun phrase
registerPool('ge.clothingStrain', [
  { when: { outfitHint: 'stream' }, text: ['fights the stream camera angles', 'does its best for the audience'] },
  { when: { outfitHint: 'contest' }, text: ['protests against the contest parameters', 'tries to hold through the event'] },
  { when: { stagesJumpedMin: 2 }, text: ['loses the battle decisively', 'gives up pretending in several places at once'] },
  { when: {}, text: ['strains at every seam', 'rides up and digs in'] },
]);

// FULL SENTENCE — clothing failure (optional; empty wildcard suppresses it by default)
registerPool('ge.clothingFail', [
  { when: { outfitHint: 'stream', stagesJumpedMin: 1 }, text: [
    'Something pops off on camera. She keeps going.',
    'A seam gives on the stream. The chat erupts.',
  ] },
  { when: { outfitHint: 'contest', stagesJumpedMin: 1 }, text: [
    'A seam gives way during the event.',
    'The outfit loses a battle mid-contest.',
  ] },
  { when: { stagesJumpedMin: 2, endStageMin: 4 }, text: [
    'Two seams surrender at once.',
    'The fabric gives up comprehensively.',
    'A button gives somewhere she cannot reach.',
  ] },
  { when: { stagesJumpedMin: 1, endStageMin: 4 }, text: [
    'A button gives somewhere she cannot reach.',
    'A seam surrenders with a soft rip.',
  ] },
  { when: {}, text: ['', ''] },
]);

// FULL SENTENCE — reaction beat skeleton
registerPool('ge.reaction', [
  { when: {}, text: [
    '{ge.reactionBody}{join:ge.reactionDialogue|prefix: — }.',
    'She steadies herself{join:ge.reactionDialogue|prefix: — }.',
  ] },
]);

// PARTICIPLE CLAUSE — body during the reaction; corruption × sensation gates
registerPool('ge.reactionBody', [
  { when: { sensation: 'pleasure', corruption: [2] }, text: [
    'hands trailing over the change with open interest',
    'eyes half-closed, face unguarded',
  ] },
  { when: { sensation: 'pleasure', corruption: [0] }, text: [
    'flushed, confused by the warmth spreading through her',
    'trembling, not entirely sure it\'s bad',
  ] },
  { when: { sensation: 'pleasure' }, text: ['trembling, flushed, not entirely unhappy'] },
  { when: { growthIntensity: 'violent', corruption: [0] }, text: [
    'winded by the sudden change, hands braced',
    'shaking slightly, needing a moment',
  ] },
  { when: { corruption: [0], shameTierMin: 2 }, text: ['mortified, hands hovering over the new weight'] },
  { when: { corruption: [2] }, text: [
    'hands settling over the new weight with familiar ease',
    'her expression warm and satisfied',
  ] },
  { when: { addictionLevelMin: 3 }, text: [
    'fingers tracing the swell, not entirely voluntarily',
    'body already cataloguing the gain as expected',
  ] },
  { when: { deviceDependenceTierMin: 2 }, text: [
    'leaning into the rig\'s aftermath with familiar ease',
    'accepting the change the way she accepts the device now',
  ] },
  { when: {}, text: ['breathless, feeling the change settle'] },
]);

// DIALOGUE BEAT — her verbal reaction; corruption gates
registerPool('ge.reactionDialogue', [
  { when: { corruption: [0], stagesJumpedMin: 2 }, text: [
    '"That much?" she says, voice small.',
    '"That\'s — I didn\'t think it would be that fast."',
  ] },
  { when: { corruption: [0], growthIntensity: 'violent' }, text: [
    '"Oh god," she manages.',
    '"That was — " she doesn\'t finish.',
  ] },
  { when: { corruption: [0] }, text: ['"That\'s… a lot."', '"Oh."', ''] },
  { when: { corruption: [1] }, text: [
    '"Okay. I see it."',
    '"Every time," she says. Not a complaint.',
    '',
  ] },
  { when: { corruption: [2] }, text: [
    '"More," she says, almost to herself.',
    '"Yes," she says. Just that.',
    '"Good."',
  ] },
  { when: { sensation: 'pleasure', corruption: [2] }, text: [
    '"Keep going," she says, then stops herself. Doesn\'t apologize.',
    '"Oh, that\'s good," she says, warm and honest.',
  ] },
  { when: { limitRemoved: true }, text: [
    '"So that\'s it, then," she says. She sounds calm.',
    '"There\'s no going back now, is there."',
  ] },
  { when: {}, text: ['', '"That\'s… a lot."', '"Oh."'] },
]);

// FULL SENTENCE — settle beat skeletons
registerPool('ge.settle', [
  { when: { isPermanent: true }, text: [
    'When it ends, something has changed for good{join:ge.permanentNote|prefix: — }.',
  ] },
  { when: { isMalfunction: true }, text: [
    'The rig winds down unevenly{join:ge.settleClause|prefix: — }{join:ge.deviceWindDown|prefix:; }.',
  ] },
  { when: {}, text: [
    'The swell eases into a new baseline{join:ge.settleClause|prefix: — }.',
    'She is left heavier, softer, changed{join:ge.deviceWindDown|prefix: — }.',
  ] },
]);

// PARTICIPLE CLAUSE — how the settle lands; per-deviceId and intensity gates
registerPool('ge.settleClause', [
  { when: { deviceId: 'growth_accelerator_chamber' }, text: [
    'the radiation signature still warm on her skin',
    'the chamber log noting the deposition as nominal',
  ] },
  { when: { deviceId: 'growth_serum_injector' }, text: [
    'the formula still metabolizing in uneven waves',
    'serum absorbed, its work only partly finished',
  ] },
  { when: { deviceId: 'endless_hunger_engine' }, text: [
    'hunger already building again behind the swell',
    'the hollow feeling returning faster than it should',
  ] },
  { when: { deviceId: 'auto_bloating_belt' }, text: [
    'residual pressure still settling into permanent mass',
    'the waist harness easing while the gain stays',
  ] },
  { when: { deviceId: 'auto_feeder_arm' }, text: [
    'the arm retracting to idle with paste still on her lips',
    'servo rhythm slowing while fullness remains',
  ] },
  { when: { deviceId: 'feeding_mask' }, text: [
    'the mask unlocking with a wet click',
    'tube pressure bleeding off while calories remain',
  ] },
  { when: { deviceId: 'obedience_belt' }, text: [
    'compliance cues fading to a low hum',
    'shame and fullness braided together in the aftermath',
  ] },
  { when: { deviceId: 'reinforced_legs' }, text: [
    'braces ticking as they readjust to new load',
    'supports settling under heavier thighs',
  ] },
  { when: { deviceId: 'living_furniture_rig' }, text: [
    'the furniture form creaking content at the new weight',
    'harness straps easing while the shape holds',
  ] },
  { when: { growthIntensity: 'violent' }, text: ['leaving damage and delight tangled together'] },
  { when: {}, text: ['', 'leaving her flushed and fuller'] },
]);

// FULL SENTENCE — permanent note tail (used via join, so Capitalized)
registerPool('ge.permanentNote', [
  { when: { growthMethod: 'radiation' }, text: [
    'Radiation-induced adipose is permanent by design.',
  ] },
  { when: { growthMethod: 'serum', isPermanent: true }, text: [
    'The formula batch was not reversible.',
    'Serum deposition keeps working after it should have stopped.',
  ] },
  { when: { limitRemoved: true }, text: ['There is no going back to how her body remembered limits.'] },
  { when: { isPermanent: true }, text: ['Some of this will not unwind.'] },
  { when: {}, text: [''] },
]);

// DIALOGUE BEAT — Talia's observation; per-deviceId for chamber/sprayer/etc
registerPool('ge.taliaCameo', [
  { when: { deviceId: 'growth_accelerator_chamber', locale: 'lab' }, text: [
    '"Field\'s still warm," Talia notes, checking the chamber readout. "Interesting."',
    'Talia marks the deposition curve. "Chamber efficiency: above spec. I\'ll update the model."',
  ] },
  { when: { deviceId: 'growth_serum_injector', locale: 'lab' }, text: [
    '"Variance within parameters," Talia says, watching the readout climb. "Chaos, but useful."',
    'Talia logs the injection curve. "Formula deposition: faster than the label suggests."',
  ] },
  { when: { deviceId: 'endless_hunger_engine', locale: 'lab' }, text: [
    'Talia watches her reach for snacks mid-sentence. "Satiety suppression: nominal," she notes.',
    '"Hunger regulation is optional now," Talia says, almost kindly.',
  ] },
  { when: { deviceId: 'living_furniture_rig', locale: 'lab' }, text: [
    'Talia checks the harness tension. "Furniture form stable. Comfort acceptable."',
    '"She\'s holding the shape," Talia says, tapping a strap. "Feed her again before it creaks."',
  ] },
  { when: { deviceId: 'feeding_mask', locale: 'lab' }, text: [
    'Talia wipes paste from the mask seal. "Throughput acceptable. Subject compliant enough."',
    '"Mask pressure nominal," Talia says, already logging the next cycle.',
  ] },
  { when: { deviceId: 'auto_feeder_arm', locale: 'lab' }, text: [
    'Talia watches the arm retract. "Servo rhythm clean. Portion size: obscene, as intended."',
    '"Feeder efficiency holds," Talia says, making a note without looking up.',
  ] },
  { when: { causeType: 'device_use', locale: 'lab' }, text: [
    '"Within tolerance," Talia says, already taking notes. "Huh. That\'s new."',
    'Talia watches the readout. "Interesting deposition curve."',
  ] },
  { when: { causeType: 'device_malfunction' }, text: [
    '"That\'s outside spec," Talia murmurs, fascinated rather than alarmed.',
  ] },
  { when: {}, text: ['', '', ''] },
]);

// PARTICIPLE CLAUSE — how the device powers down; per-deviceId
registerPool('ge.deviceWindDown', [
  { when: { deviceId: 'growth_accelerator_chamber' }, text: [
    'the chamber venting with a long decompressing sigh',
    'radiation readings dropping back to safe as the panels cool',
  ] },
  { when: { deviceId: 'growth_serum_injector' }, text: [
    'the injector clicking empty, compound already in her blood',
    'the hiss of the spent cartridge dying away',
  ] },
  { when: { deviceId: 'endless_hunger_engine' }, text: [
    'the ray powering down but hunger still humming underneath',
    'suppression holding steady as the exposure ends',
  ] },
  { when: { deviceId: 'auto_bloating_belt' }, text: [
    'the belt deflating slowly back to baseline',
    'pressure bleeding off the waist harness with a soft vent',
  ] },
  { when: { deviceId: 'auto_feeder_arm' }, text: [
    'the arm folding back to its mount with a servo whine',
    'feeding cycle ending with one last mechanical click',
  ] },
  { when: { deviceId: 'feeding_mask' }, text: [
    'the mask unlocking with a wet release of pressure',
    'tube flow stopping while straps loosen one notch',
  ] },
  { when: { deviceId: 'obedience_belt' }, text: [
    'the harness humming down to standby',
    'compliance cues fading to idle',
  ] },
  { when: { deviceId: 'reinforced_legs' }, text: [
    'braces ticking as servos return to neutral',
    'supports settling after bearing the new load',
  ] },
  { when: { deviceId: 'living_furniture_rig' }, text: [
    'the rig settling into passive mode around her',
    'harness straps easing while the furniture form holds',
  ] },
  { when: {}, text: ['', ''] },
]);

registerPool('grow.crossingDialogue', [
  { when: {}, text: ['', '"So that\'s where I am now."'] },
]);
