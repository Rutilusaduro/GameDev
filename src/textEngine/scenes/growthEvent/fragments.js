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
  { when: {}, text: [
    '{ge.causeAction}{ge.causeAnchor} — {ge.firstSensation}.',
    'The change begins{ge.causeAnchor}: {ge.firstSensation}.',
    '{subject.name} {ge.firstSensation}{ge.causeAnchor} as {ge.causeAction}.',
  ] },
]);

// VERB PHRASE — what triggers the growth
registerPool('ge.causeAction', [
  // per-device cells
  { when: { deviceId: 'growth_accelerator_chamber' }, text: [
    'the chamber seals and the radiation field ramps up',
    'the acceleration field floods her from every panel',
    'the chamber begins its cycle, warm and relentless',
  ] },
  { when: { deviceId: 'growth_serum_sprayer' }, text: [
    'the aerosol cloud settles over her skin',
    'serum mist hangs in the air and soaks in',
    'the sprayer fills the room with fattening compound',
  ] },
  { when: { deviceId: 'bloating_gas_canister' }, text: [
    'the canister vents its payload in a rush',
    'pressurized bloat gas floods the space around her',
    'the canister releases with a hiss and the gas takes over',
  ] },
  { when: { deviceId: 'erogenous_growth_stimulator' }, text: [
    'the stimulator pulses at her neck in slow waves',
    'the pleasure-linked growth stimulus cycles on',
    'the neck device hums and links pleasure to growth',
  ] },
  { when: { deviceId: 'growth_limit_remover' }, text: [
    'the limiter dissolves in her bloodstream',
    'the compound tears away whatever kept her body in check',
    'the limit-removal dose does exactly what the name implies',
  ] },
  { when: { deviceId: 'auto_bloating_belt' }, text: [
    'the belt inflates around her waist',
    'the bloating belt clamps her midsection in automatic pressure',
  ] },
  { when: { deviceId: 'auto_feeder_arm', hasAttachment: 'liquid_fat_infuser' }, text: [
    'the arm delivers infused slurry at mechanical pace',
    'fattening slurry lands by servo rhythm',
  ] },
  { when: { deviceId: 'auto_feeder_arm' }, text: [
    'the feeder arm swings to her mouth on schedule',
    'another measured portion arrives by servo-guided arm',
  ] },
  { when: { deviceId: 'growth_serum_injector' }, text: [
    'the injector plunges its volatile dose home',
    'the serum shot hits her bloodstream fast',
  ] },
  { when: { deviceId: 'weight_redistribution_rig' }, text: [
    'the redistribution rig engages, vibrating fat toward new zones',
    'pressure nodes cycle through her body on schedule',
  ] },
  { when: { deviceId: 'remote_feeding_system' }, text: [
    'a hidden drone delivers another calibrated portion',
    'the remote system feeds her from across campus without warning',
  ] },
  { when: { deviceId: 'sleep_feeding_system', hasAttachment: 'liquid_fat_infuser' }, text: [
    'the sleep mask floods her with infused slurry through the night',
    'overnight infusion runs while she is helpless',
  ] },
  { when: { deviceId: 'sleep_feeding_system' }, text: [
    'the sleep mask continues its overnight drip',
    'sensors hold the overnight calorie flow perfectly steady',
  ] },
  { when: { deviceId: 'feeding_mask', hasAttachment: 'liquid_fat_infuser' }, text: [
    'the locked mask pumps warm infused formula past her lips',
    'the mask floods her with fattening compound on a timer',
  ] },
  { when: { deviceId: 'feeding_mask' }, text: [
    'the locked mask forces another quota through the tube',
    'the mask holds fast and keeps feeding',
  ] },
  { when: { deviceId: 'liquid_fat_infuser' }, text: [
    'warm fattening slurry flows from the infuser',
    'dense infused liquid hits her bloodstream in heavy waves',
  ] },
  { when: { deviceId: 'living_furniture_rig' }, text: [
    'the furniture rig feeds her to hold the shape',
    'restraint tubes maintain the furniture form with steady calories',
  ] },
  { when: { deviceId: 'calorie_paste_printer' }, text: [
    'dense paste extrudes from the feeder on cue',
    'optimized calorie paste lands on her tongue by mechanical routine',
  ] },
  // growthMethod fallbacks
  { when: { growthMethod: 'feed' }, text: [
    'more food arrives, mechanical and certain',
    'the feeding mechanism delivers another round',
  ] },
  { when: { growthMethod: 'bloat' }, text: [
    'the bloating pressure builds from the inside out',
    'the bloat compound takes its toll',
  ] },
  { when: { growthMethod: 'serum' }, text: [
    'the growth serum takes hold in her bloodstream',
    'the serum cascade begins',
  ] },
  { when: { growthMethod: 'gas' }, text: [
    'the gas hangs and soaks in, doing its work',
    'the compound gas works through her skin',
  ] },
  { when: { growthMethod: 'radiation' }, text: [
    'the radiation field builds toward critical density',
    'the field concentrates on her adipose',
  ] },
  { when: { growthMethod: 'stimulate' }, text: [
    'the stimulation cycles up, linking pleasure to growth',
    'the pleasure-growth feedback loop activates',
  ] },
  { when: { growthMethod: 'sculpt' }, text: [
    'the rig sculpts with precise pressure and vibration',
    'fat migrates at the rig\'s direction',
  ] },
  { when: { growthMethod: 'infuse' }, text: [
    'the infusion compound spreads through her system',
    'fat-dense fluid infuses directly',
  ] },
  { when: { growthMethod: 'limit_break' }, text: [
    'the limit-removal compound floods her bloodstream',
    'whatever biological ceiling she had comes down',
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
  { when: { featureId: 'digest_stageup' }, text: [
    'her body quietly tips over its own threshold',
    'accumulated mass crosses into a new register',
  ] },
  // generic wildcard
  { when: {}, text: ['the growth takes hold', 'her body answers the stimulus', 'the change arrives on schedule'] },
]);

// PREP ANCHOR — contextualizes where/how the cause acts; '' is valid
registerPool('ge.causeAnchor', [
  { when: { deviceId: 'growth_accelerator_chamber' }, text: [' inside the chamber', ' in the sealed radiation field', ''] },
  { when: { deviceId: 'growth_serum_sprayer' }, text: [' under the mist cloud', ''] },
  { when: { deviceId: 'bloating_gas_canister' }, text: [' with gas filling the room', ' in the pressurized cloud', ''] },
  { when: { deviceId: 'erogenous_growth_stimulator' }, text: [' at the stimulator\'s pulse', ''] },
  { when: { deviceId: 'growth_limit_remover' }, text: [' as the limiter fails', ''] },
  { when: { deviceId: 'auto_bloating_belt' }, text: [' around her waist', ' against her midsection', ''] },
  { when: { deviceId: 'auto_feeder_arm' }, text: [' from the feeder arm', ''] },
  { when: { deviceId: 'sleep_feeding_system' }, text: [' through the night', ' while she slept', ''] },
  { when: { deviceId: 'feeding_mask' }, text: [' behind the locked mask', ''] },
  { when: { deviceId: 'living_furniture_rig' }, text: [' in the furniture harness', ''] },
  { when: { locale: 'lab' }, text: [' in the lab', ''] },
  { when: {}, text: ['', ' in the lab', ' on campus'] },
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
  { when: {}, text: ['feeling the first swell', 'registering weight before the scale does'] },
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
  { when: { growthMethod: 'gas' }, text: [
    'the bloat converting to something more permanent',
    'gas converting to mass faster than she can deflate',
  ] },
  { when: { growthMethod: 'stimulate' }, text: [
    'pleasure-fed adipose multiplication, slow but inevitable',
    'each pulse adding wherever the feeling settles',
  ] },
  { when: { growthMethod: 'limit_break' }, text: [
    'the limiter gone — her body with nothing left to argue with',
    'runaway deposition finding no ceiling',
  ] },
  { when: { growthMethod: 'bloat' }, text: [
    'bloat converting to real mass beneath the pressure',
    'the belt\'s work showing up as permanent curve',
  ] },
  { when: { growthMethod: 'sculpt' }, text: [
    'fat settling into its new address with mechanical efficiency',
    'redistribution completing its final geometry',
  ] },
  { when: { growthMethod: 'infuse' }, text: [
    'the infusion binding to adipose like it was always meant to',
    'dense compound converting straight to stored fat',
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
  { when: {}, text: ['her clothes', 'what she was wearing'] },
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
  { when: { growthMethod: 'limit_break' }, text: [
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
  { when: { deviceId: 'growth_serum_sprayer' }, text: [
    'the mist deposited and metabolized',
    'the serum absorbed, its work done',
  ] },
  { when: { deviceId: 'bloating_gas_canister' }, text: [
    'the gas converted to something she cannot undo',
    'residual pressure still settling into permanent mass',
  ] },
  { when: { deviceId: 'erogenous_growth_stimulator' }, text: [
    'the pleasure-gain loop quieting into warmth',
    'the stimulator\'s feedback fading but the gain staying',
  ] },
  { when: { deviceId: 'growth_limit_remover' }, text: [
    'the limiter architecture dissolved — that chapter closed',
    'nothing left to cap the curve',
  ] },
  { when: { growthIntensity: 'violent' }, text: ['leaving damage and delight tangled together'] },
  { when: {}, text: ['', 'leaving her flushed and fuller'] },
]);

// FULL SENTENCE — permanent note tail (used via join, so Capitalized)
registerPool('ge.permanentNote', [
  { when: { deviceId: 'growth_limit_remover' }, text: [
    'Whatever her body remembered as "enough" has been surgically removed.',
  ] },
  { when: { growthMethod: 'radiation' }, text: [
    'Radiation-induced adipose is permanent by design.',
  ] },
  { when: { growthMethod: 'serum', isPermanent: true }, text: [
    'The serum batch was not reversible.',
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
  { when: { deviceId: 'growth_serum_sprayer', locale: 'lab' }, text: [
    '"Aerosol deposition is patchy," Talia says. "But the numbers work."',
    'Talia fans residual mist from her clipboard. "Skin absorption rate. Useful data."',
  ] },
  { when: { deviceId: 'bloating_gas_canister', locale: 'lab' }, text: [
    'Talia fans the residual gas away from her clipboard. "Volume: consistent."',
    '"Gas-to-mass conversion is running at 94%," Talia says. "Healthy."',
  ] },
  { when: { deviceId: 'erogenous_growth_stimulator', locale: 'lab' }, text: [
    'Talia adjusts the stimulator collar. "Feedback loop nominal," she says, not looking up.',
    '"Pleasure-correlated gain is my favorite data type," Talia says, and seems to mean it.',
  ] },
  { when: { deviceId: 'growth_limit_remover', locale: 'lab' }, text: [
    '"There it is," Talia says, putting down her pen. "No going back. Data\'s clean."',
    'Talia looks at the readout a long moment. "Limiter dissolved. New baseline unlocked."',
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
  { when: { deviceId: 'growth_serum_sprayer' }, text: [
    'the mist thinning to nothing, but the work already done',
    'the sprayer running dry with a quiet hiss',
  ] },
  { when: { deviceId: 'bloating_gas_canister' }, text: [
    'the canister running empty as the gas clears',
    'the hiss of the last gas dying away',
  ] },
  { when: { deviceId: 'erogenous_growth_stimulator' }, text: [
    'the stimulator humming down to idle, leaving lingering warmth',
    'pulse frequency dropping to rest as the cycle closes',
  ] },
  { when: { deviceId: 'growth_limit_remover' }, text: [
    'nothing left to power down — the work is structural',
    'silence where the limiter used to be',
  ] },
  { when: { deviceId: 'auto_bloating_belt' }, text: ['the belt deflating slowly back to baseline', ''] },
  { when: { deviceId: 'living_furniture_rig' }, text: ['the rig settling into passive mode around her', ''] },
  { when: {}, text: ['', ''] },
]);

registerPool('grow.crossingDialogue', [
  { when: {}, text: ['', '"So that\'s where I am now."'] },
]);
