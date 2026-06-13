// ═══════════════════════════════════════════════════════════════
// DEVICE WEEKLY TICK — fragment pools (slot-composed)
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../../engine.js';
import '../../modules.js';

// FULL SENTENCE — what the device does this tick (device-named, girl-named)
registerPool('device.tick.action', [
  { when: { deviceId: 'auto_feeder_arm', hasAttachment: 'liquid_fat_infuser' }, text: [
    'the {device.label} tracks {subject.name} and pumps fattening slurry past her teeth on schedule',
    'warm infused slurry lands from the {device.label} — servo rhythm, no pause for consent',
    'the {device.label} floods {subject.name} with dense infused formula, jaw held open by the rig',
  ] },
  { when: { deviceId: 'auto_feeder_arm', hasAttachment: 'calorie_paste_printer' }, text: [
    'the {device.label} prints calorie paste straight to {subject.name}\'s lips in measured stripes',
    'optimized paste extrudes from the {device.label} while {subject.name} swallows on reflex',
    'the {device.label} layers dense paste against {subject.name}\'s tongue, cycle after cycle',
  ] },
  { when: { deviceId: 'auto_feeder_arm' }, text: [
    'the {device.label} swings to {subject.name}\'s mouth and delivers another quota by mechanical arm',
    'servo-guided bites from the {device.label} land whether {subject.name} is ready or not',
    'the {device.label} holds {subject.name} in feeding position and pushes another portion through',
  ] },
  { when: { deviceId: 'auto_bloating_belt' }, text: [
    'the {device.label} clamps {subject.name}\'s waist and cycles pressure in slow, insistent pulses',
    'the {device.label} inflates against {subject.name}\'s midsection, venting bloat gas on schedule',
    'pressurized bloat from the {device.label} drums {subject.name}\'s belly tighter with each weekly pass',
  ] },
  { when: { deviceId: 'sleep_feeding_system', hasAttachment: 'liquid_fat_infuser' }, text: [
    'the {device.label} drips infused slurry through {subject.name}\'s sealed mask all night',
    'overnight fattening runs through the {device.label} while {subject.name} sleeps helpless underneath',
    'the {device.label} keeps {subject.name} fed with warm infused formula through every hour of rest',
  ] },
  { when: { deviceId: 'sleep_feeding_system' }, text: [
    'the {device.label} maintains its overnight calorie drip against {subject.name}\'s lips',
    'sensors on the {device.label} keep {subject.name}\'s overnight feeding perfectly steady',
    'the {device.label} feeds {subject.name} through the mask while she dozes, tube never quite empty',
  ] },
  { when: { deviceId: 'feeding_mask', hasAttachment: 'liquid_fat_infuser' }, text: [
    'the {device.label} locks over {subject.name}\'s face and floods her with warm infused formula',
    'the {device.label} pumps heavy slurry past {subject.name}\'s sealed lips on a timer',
    'locked straps on the {device.label} hold while infused slurry keeps {subject.name} drinking',
  ] },
  { when: { deviceId: 'feeding_mask' }, text: [
    'the {device.label} forces another feeding quota through the tube into {subject.name}',
    'the {device.label} keeps {subject.name} sealed and fed, straps cinched, tube pulsing',
    'the {device.label} delivers measured calories past {subject.name}\'s lips whether she cooperates or not',
  ] },
  { when: { deviceId: 'weight_redistribution_rig' }, text: [
    'the {device.label} vibrates against {subject.name}, coaxing fat toward new zones on its sculpt cycle',
    'pressure nodes on the {device.label} knead {subject.name}\'s silhouette on a timed redistribution program',
    'the {device.label} works {subject.name}\'s adipose like clay, redistributing weight on a timed program',
  ] },
  { when: { deviceId: 'living_furniture_rig', furnitureComfortLow: true }, text: [
    'the {device.label} groans under {subject.name} — comfort is running low and the harness demands feeding',
    'the {device.label} trembles around {subject.name}; she needs calories before the furniture form stabilizes',
    'the {device.label} creaks warnings through its straps — {subject.name} must be fed to stay usable',
  ] },
  { when: { deviceId: 'living_furniture_rig' }, text: [
    'the myriad straps of the {device.label} keep {subject.name} restrained and fed on schedule',
    'tubes and restraints on the {device.label} maintain {subject.name} as living furniture, calories flowing steady',
    'the {device.label} swells its cushion around {subject.name}, feeding her to preserve the form',
  ] },
  { when: { deviceId: 'growth_accelerator_chamber' }, text: [
    'the {device.label} hums to life around {subject.name}, sealed air turning faintly electric',
    'the {device.label} seals and floods {subject.name} with radiation through a full acceleration cycle on her adipose tissue',
    'inside the {device.label}, {subject.name} stands under a silent field that multiplies her adipose tissue',
  ] },
  { when: { deviceId: 'growth_serum_sprayer' }, text: [
    'the {device.label} mists fattening serum across {subject.name}\'s skin in controlled bursts',
    'aerosol from the {device.label} settles over {subject.name} and soaks through for the week',
    'the {device.label} fills the space around {subject.name} with compound that clings and converts',
  ] },
  { when: { deviceId: 'bloating_gas_canister' }, text: [
    'the {device.label} vents a measured bloat dose around {subject.name}',
    'pressurized compound from the {device.label} floods the space, slow and inevitable against {subject.name}',
    'the {device.label} hisses and releases; bloat gas takes {subject.name}\'s midsection without asking',
  ] },
  { when: { deviceId: 'erogenous_growth_stimulator' }, text: [
    'the {device.label} pulses at {subject.name}\'s neck through its weekly arousal-growth cycle',
    'pleasure-linked stimulus from the {device.label} runs its program on {subject.name}, steady and obscene',
    'the {device.label} hums against {subject.name}\'s throat, tying sensation to deposition',
  ] },
  { when: { deviceId: 'growth_limit_remover' }, text: [
    'the {device.label} keeps dissolving whatever capped {subject.name}\'s growth — another fraction gone this week',
    'limit-removal compound from the {device.label} works through {subject.name}\'s bloodstream in silence',
    'the {device.label} erodes {subject.name}\'s remaining ceiling, deposition finding fewer objections',
  ] },
  { when: { deviceId: 'endless_hunger_engine' }, text: [
    'the {device.label} on {subject.name}\'s arms suppresses satiety through another weekly cycle',
    'the {device.label} keeps hunger gnawing under every meal {subject.name} manages to finish',
    'the {device.label} rewires {subject.name}\'s appetite — full never lasts, empty always returns',
  ] },
  { when: { deviceId: 'rapid_mutation_chamber' }, text: [
    'the {device.label} seals around {subject.name} and runs another chaotic evolution cycle',
    'catalyst flood in the {device.label} forces dramatic tissue reconstruction on {subject.name}',
    'inside the {device.label}, {subject.name}\'s body is rewritten faster than it can stabilize',
  ] },
  { when: { deviceId: 'regression_ray' }, text: [
    'residual regression from the {device.label} leaves {subject.name} impulsive and needy',
    'the {device.label}\'s mental regression still echoes through {subject.name}\'s week — filters thin, wants loud',
    'after the {device.label}, {subject.name} acts younger than she looks, appetite louder than shame',
  ] },
  { when: { deviceId: 'remote_feeding_system' }, text: [
    'the {device.label} delivers another calibrated portion to {subject.name} from across campus',
    'a hidden rig from the {device.label} feeds {subject.name} without warning, remote and precise',
    'the {device.label} reaches {subject.name} wherever she is and adds another quota to the tally',
  ] },
  { when: { deviceId: 'growth_serum_injector' }, text: [
    'the {device.label} drives another volatile serum dose into {subject.name}',
    'the {device.label} plunges its payload home; serum hits {subject.name}\'s bloodstream fast',
    'a shot from the {device.label} sends fattening compound racing through {subject.name}',
  ] },
  { when: {}, text: [
    'the {device.label} works through another week on {subject.name}',
    '{subject.name} spends the week under the {device.label}\'s steady output',
    'the {device.label} keeps {subject.name} on its schedule for another cycle',
  ] },
]);

// PREP ANCHOR — optional atmospheric tail (merged into action in most beats)
registerPool('device.tick.anchor', [
  { when: { deviceId: 'growth_accelerator_chamber' }, text: ['', ' under the radiation field', ' as the chamber seals'] },
  { when: { deviceId: 'rapid_mutation_chamber' }, text: ['', ' under unstable catalysts'] },
  { when: { deviceId: 'growth_serum_sprayer' }, text: ['', ' under the aerosol cloud'] },
  { when: { deviceId: 'bloating_gas_canister' }, text: ['', ' in the pressurized cloud'] },
  { when: {}, text: ['', ''] },
]);

// PARTICIPLE CLAUSE / SECOND SENTENCE — how it lands on her body (device-keyed)
registerPool('device.tick.sensation', [
  // ── feeders + high hunger/addiction ──
  { when: { deviceId: 'auto_feeder_arm', hungerTierMin: 3 }, text: [
    'her rolls swell hungrily to accept every calorie the arm pushes in',
    'she swallows desperate and eager, belly answering before her pride can',
  ] },
  { when: { deviceId: 'auto_feeder_arm', addictionLevelMin: 3 }, text: [
    'her body takes the feeding like relief — addicted flesh welcoming every mouthful',
    'each portion lands where craving already lives; she barely registers shame anymore',
  ] },
  { when: { deviceId: 'auto_feeder_arm' }, text: [
    'fullness stacks in her middle where the arm keeps landing portions',
    'her stomach yields to mechanical feeding, softness showing by the end of the week',
  ] },
  { when: { deviceId: 'feeding_mask', hungerTierMin: 3 }, text: [
    'her rolls swell hungrily around the mask, accepting paste like she was starving for it',
    'sealed lips still part for the tube — hunger wins before the mask releases her',
  ] },
  { when: { deviceId: 'feeding_mask', addictionLevelMin: 3 }, text: [
    'she drinks on reflex, addicted to the mask\'s steady calorie flood',
    'warm paste disappears into her; dependence makes the feeding feel like mercy',
  ] },
  { when: { deviceId: 'feeding_mask' }, text: [
    'paste and calories vanish into her; the mask leaves her softer by the week\'s end',
    'her cheeks flush around the tube while measured portions keep stacking inside',
  ] },
  { when: { deviceId: 'sleep_feeding_system', hungerTierMin: 3 }, text: [
    'she sleeps through feeding her body craved — rolls swelling readily around the drip',
    'overnight calories soak in while hunger finally, briefly, quiets',
  ] },
  { when: { deviceId: 'sleep_feeding_system' }, text: [
    'she wakes heavier, the drip having worked through every hour she was under',
    'overnight calories settle into softness she discovers only in the mirror',
  ] },
  { when: { deviceId: 'remote_feeding_system', hungerTierMin: 3 }, text: [
    'the hidden portion vanishes into hungry flesh before she finishes chewing',
    'her body grabs the calories like it was waiting — appetite outrunning surprise',
  ] },
  { when: { deviceId: 'remote_feeding_system' }, text: [
    'the portion lands and stays — remote feeding leaves her subtly fuller by week\'s end',
    'she never quite catches the rig in the act; the gain still shows',
  ] },
  // ── furniture rig ──
  { when: { deviceId: 'living_furniture_rig' }, text: [
    'with each mouthful the harness feeds her, her body swelling softer — more upholstered, more furniture',
    'cushioned flesh yields under the rig\'s maintenance; she grows into a heavier, roomier piece',
    'calories stack until the furniture form creaks content — {subject.name} softer, larger, more useful',
  ] },
  // ── redistribution (sculpt, not feed) — describe HOW the shape changed ──
  { when: { deviceId: 'weight_redistribution_rig', growthZone: 'lower_body' }, text: [
    'her waist cinches while hips and thighs swell — belly fat migrating south into lower curves',
    'weight drains from her middle and pools in her hips and thighs, her silhouette pear-heavier',
    'her belly softens flatter as lower-body curves deepen, thighs pressing together with new insistence',
  ] },
  { when: { deviceId: 'weight_redistribution_rig', growthZone: 'hips' }, text: [
    'her hips widen visibly, upper body drawing narrower by comparison',
    'fat migrates to her hips until her waist looks pinched between new lower curves',
    'her lower half claims the week\'s sculpt — hips spreading, ass rounding behind them',
  ] },
  { when: { deviceId: 'weight_redistribution_rig', growthZone: 'belly' }, text: [
    'her belly rounds forward while hips and thighs trim slightly — mass climbing toward her midsection',
    'softness concentrates in her gut, lower curves easing back to feed the new belly',
    'her middle swells assertive and forward; the rig pulled weight up from her hips',
  ] },
  { when: { deviceId: 'weight_redistribution_rig', growthZone: 'thighs' }, text: [
    'inner thighs swell and press together harder; softness migrating down her legs',
    'her thighs thicken in one visible pass, hips following a beat behind',
    'leg fat stacks heavy and close; walking brings thighs together with new friction',
  ] },
  { when: { deviceId: 'weight_redistribution_rig', growthZone: 'ass' }, text: [
    'her backside fills out while her waist holds — weight settling behind her',
    'ass and hips round together, belly easing back to make room astern',
    'the sculpt lands rear-heavy; she feels the new shelf before she sees it',
  ] },
  { when: { deviceId: 'weight_redistribution_rig', growthZone: 'chest' }, text: [
    'fullness migrates to her chest; bust swelling while her waist draws in',
    'her top heavies forward, lower curves slimming to pay for the new balance',
    'breasts swell fuller and softer; the rig narrowed everything below to emphasize them',
  ] },
  { when: { deviceId: 'weight_redistribution_rig', growthZone: 'full' }, text: [
    'her frame softens evenly — curves deepening everywhere at once in the rig\'s proportions',
    'fat redistributes in a full pass, no zone left untouched by the sculpt',
    'every major curve swells in concert; the rig rebuilt her silhouette wholesale',
  ] },
  { when: { deviceId: 'weight_redistribution_rig', weightBand: 'heavy' }, text: [
    'her heavy rolls shift and settle — belly easing as hips and thighs claim the week\'s gain',
    'adipose redistributes under the vibration, old zones thinning as new ones swell',
  ] },
  { when: { deviceId: 'weight_redistribution_rig' }, text: [
    'fat settles into the rig\'s planned shape, old zones thinning as new ones swell',
    'her silhouette changes without a scale tick — redistribution doing its quiet work',
  ] },
  // ── growth chamber (radiation) ──
  { when: { deviceId: 'growth_accelerator_chamber', weightBand: 'lean' }, text: [
    'radiation swells her waist and hips before she has words for it — soft tissue appearing where angles used to be',
    'her slight frame picks up padding fast; belly and thighs soften in the mirror by week\'s end',
    'fat cells multiply under the field — new curve at her hips, new give in her middle',
  ] },
  { when: { deviceId: 'growth_accelerator_chamber', weightBand: 'extreme' }, text: [
    'radiation-fed adipose tissue multiplies across her monumental frame without resistance',
    'every deposited pound lands on flesh already vast — the chamber barely slows for her size',
  ] },
  { when: { deviceId: 'growth_accelerator_chamber' }, text: [
    'her adipose tissue absorbs the field\'s work — deposition layering faster than comfort allows',
    'radiation leaves her heavier in the places the chamber favors, tissue swelling in silence',
    'the sealed field works her fat cells; she steps out softer, denser, unmistakably larger',
  ] },
  // ── mutation chamber ──
  { when: { deviceId: 'rapid_mutation_chamber' }, text: [
    'tissue rewrites itself under the catalyst flood — growth chaotic but undeniable',
    'her body absorbs the mutation cycle\'s output, curves arriving from impossible directions',
    'mutations settle into new softness — hips rounding, belly deepening, flesh unfamiliar under her hands',
  ] },
  // ── bloat devices ──
  { when: { deviceId: 'auto_bloating_belt', bodyState: 'bloated' }, text: [
    'her belly drums tight with artificial fullness before the gain turns permanent',
    'bloat makes the belt\'s work visible long before the scale agrees',
  ] },
  { when: { deviceId: 'auto_bloating_belt' }, text: [
    'pressure blooms through her waist, bloat converting to real mass beneath the strap',
    'her midsection swells against the belt until the week\'s gain is impossible to hide',
  ] },
  { when: { deviceId: 'bloating_gas_canister' }, text: [
    'gas works through her middle, bloat settling into heavier permanence',
    'her stomach distends in the cloud, the week\'s gain written in stretched skin',
  ] },
  // ── serum / stim / limit ──
  { when: { deviceId: 'growth_serum_sprayer' }, text: [
    'serum soaks through skin and converts — softness appearing wherever the mist lingered',
    'compound settles into her tissue, curves deepening where the aerosol touched longest',
  ] },
  { when: { deviceId: 'erogenous_growth_stimulator' }, text: [
    'pleasure-linked deposition leaves her flushed and fuller, growth tied to every pulse',
    'each stimulator cycle adds where sensation pooled — obscene and effective',
  ] },
  { when: { deviceId: 'growth_limit_remover' }, text: [
    'with less limiter in the way, new weight finds room her body used to refuse',
    'deposition accelerates wherever the compound cleared a path',
  ] },
  { when: { deviceId: 'endless_hunger_engine' }, text: [
    'hunger outruns every meal — the engine makes sure satiety never quite wins',
    'she eats more because the hollow always returns; the gain follows appetite',
  ] },
  { when: { deviceId: 'regression_ray' }, text: [
    'regressed impulse meets adult appetite — she eats like she forgot how to refuse',
    'wants land louder than shame; the week\'s gain follows every needy decision',
  ] },
  // ── weight-band fallbacks (only when device-specific cells miss) ──
  { when: { weightBand: 'lean' }, text: [
    'the new softness shows almost immediately on {subject.name}\'s still-small frame',
    'padding appears where bone and muscle used to define her outline',
    'curves arrive fast on a frame that had almost none to hide them',
  ] },
  { when: { weightBand: 'mid' }, text: [
    'fullness settles into curves on {subject.name} that will not hide',
    'her middle softens where the rig keeps adding mass',
  ] },
  { when: { weightBand: 'heavy', hungerTierMin: 3 }, text: [
    'her heavy rolls swell hungrily to accept what the rig delivers',
    'flesh that was already ample takes more without protest — appetite making room',
  ] },
  { when: { weightBand: 'heavy' }, text: [
    'her heavy body takes the week\'s deposition without argument',
    'rolls deepen and spread; the gain settles where gravity already favored her',
  ] },
  { when: { weightBand: 'extreme' }, text: [
    'her vast frame swells further — another week of mass layered onto mass',
    'monumental flesh absorbs the output; every new pound finds existing curve to thicken',
  ] },
  { when: { bodyState: 'furniture' }, text: [
    'the furniture form creaks softer with each feeding',
    'cushioned flesh yields under the rig\'s maintenance',
  ] },
  { when: {}, text: [
    'the gain settles into {subject.name}\'s body with mechanical certainty',
    '{subject.name}\'s flesh takes the output without argument',
    'the gain shows on {subject.name} by the week\'s end — subtle but real',
  ] },
]);

// Malfunction clause — device-keyed; each line must read as a complete clause after the em dash
registerPool('device.tick.malfClause', [
  { when: { deviceId: 'weight_redistribution_rig', malfunctionTier: 'moderate' }, text: [
    'then overcorrects and fat sloshes into the wrong zones',
    'then surges past the sculpt rhythm until her silhouette turns sloppy',
  ] },
  { when: { deviceId: 'weight_redistribution_rig', malfunctionTier: 'major' }, text: [
    'then locks into a lopsided redistribution overrun',
    'then refuses to stop sculpting until her silhouette is warped',
  ] },
  { when: { deviceId: 'growth_accelerator_chamber', malfunctionTier: 'moderate' }, text: [
    'then spikes past the safe radiation ceiling',
    'then overdrives the field until deposition runs well outside spec',
  ] },
  { when: { deviceId: 'growth_accelerator_chamber', malfunctionTier: 'major' }, text: [
    'then locks the radiation field in a dangerous overrun',
    'then refuses to power down at the planned limit',
  ] },
  { when: { deviceId: 'auto_bloating_belt', malfunctionTier: 'moderate' }, text: [
    'then overpressurizes past the planned bloat limit',
    'then surges until her waist balloons harder than the belt should allow',
  ] },
  { when: { deviceId: 'bloating_gas_canister', malfunctionTier: 'moderate' }, text: [
    'then vents far past the measured dose',
    'then floods the room with more gas than the canister was rated for',
  ] },
  { when: { deviceId: 'auto_feeder_arm', malfunctionTier: 'moderate' }, text: [
    'then overfeeds past the safe quota — portions stacking faster than she can finish',
    'then dumps an oversized portion before the arm resets',
  ] },
  { when: { deviceId: 'feeding_mask', malfunctionTier: 'moderate' }, text: [
    'then floods paste faster than the tube should carry',
    'then overfeeds until mask pressure spikes past the safe rhythm',
  ] },
  { when: { deviceId: 'sleep_feeding_system', malfunctionTier: 'moderate' }, text: [
    'then overdrives the overnight drip into a calorie surplus she wakes into',
    'then keeps feeding hours past the scheduled stop',
  ] },
  { when: { deviceId: 'living_furniture_rig', malfunctionTier: 'moderate' }, text: [
    'then overfeeds the furniture form past its comfort threshold',
    'then surges calories until the harness groans in protest',
  ] },
  { when: { deviceId: 'erogenous_growth_stimulator', malfunctionTier: 'moderate' }, text: [
    'then locks the pleasure-growth loop on high — deposition racing ahead of the program',
    'then overdrives each pulse until fat stacks wherever sensation peaks',
  ] },
  { when: { deviceId: 'erogenous_growth_stimulator', malfunctionTier: 'major' }, text: [
    'then refuses to drop intensity — growth tied to arousal with no ceiling',
    'then runs the stimulator hot until her body cannot stabilize the gain',
  ] },
  { when: { deviceId: 'growth_serum_sprayer', malfunctionTier: 'moderate' }, text: [
    'then oversaturates the mist cloud — serum converting faster than planned',
    'then keeps aerosolizing past the safe exposure window',
  ] },
  { when: { deviceId: 'growth_limit_remover', malfunctionTier: 'moderate' }, text: [
    'then dissolves the limiter too fast — deposition finding no remaining cap',
    'then overdrives the compound until her body forgets where enough was',
  ] },
  { when: { deviceId: 'endless_hunger_engine', malfunctionTier: 'moderate' }, text: [
    'then suppresses satiety past safe levels — hunger rewriting her whole week',
    'then locks hunger high until she eats through every reserve she had',
  ] },
  { when: { deviceId: 'regression_ray', malfunctionTier: 'moderate' }, text: [
    'then deepens the regression haze — impulse and appetite both running hot',
    'then overdrives the beam until she acts hungry and heedless at once',
  ] },
  { when: { deviceId: 'remote_feeding_system', malfunctionTier: 'moderate' }, text: [
    'then delivers a surplus portion she never saw coming',
    'then overfeeds from concealment — calories landing before she can refuse',
  ] },
  { when: { deviceId: 'growth_serum_injector', malfunctionTier: 'moderate' }, text: [
    'then plunges a dose well above the safe serum load',
    'then overdrives the injection until compound floods her bloodstream at once',
  ] },
  { when: { deviceId: 'rapid_mutation_chamber', malfunctionTier: 'moderate' }, text: [
    'then destabilizes — mutations stacking faster than her body can reconcile',
    'then overdrives the catalyst flood into chaotic overrun',
  ] },
  { when: { deviceId: 'rapid_mutation_chamber', malfunctionTier: 'major' }, text: [
    'then locks the evolution cycle in runaway reconstruction',
    'then refuses to stabilize until her tissue stops rewriting itself',
  ] },
  { when: { malfunctionTier: 'minor' }, text: [
    'then hiccups with a minor glitch in the cycle',
    'then stutters once before continuing',
  ] },
  { when: { malfunctionTier: 'moderate' }, text: [
    'then spikes past the safe rhythm',
    'then surges harder than the cycle was rated for',
  ] },
  { when: { malfunctionTier: 'major' }, text: [
    'then locks in a dangerous overrun',
    'then refuses to stop at the planned limit',
  ] },
  { when: { malfunctionTier: 'critical' }, text: [
    'then fails catastrophically — nothing looks the same after',
    'then breaks safe parameters entirely',
  ] },
  { when: {}, text: [''] },
]);

// Synergy when multiple devices equipped
registerPool('device.tick.synergy', [
  { when: { equippedCountMin: 3 }, text: [
    'Other rigs hum in concert around her.',
    'The full harness of devices leaves no hour untouched.',
  ] },
  { when: { equippedWaist: 'auto_bloating_belt', deviceId: 'auto_feeder_arm' }, text: [
    'The belt bloats her while the arm keeps feeding into it.',
  ] },
  { when: { equippedHead: 'sleep_feeding_system', deviceId: 'auto_bloating_belt' }, text: [
    'Overnight drip and daytime bloat stack without mercy.',
  ] },
  { when: {}, text: ['', ''] },
]);

// Gain tag — short factual tail
registerPool('device.tick.gainTag', [
  { when: { gainLbsMin: 6 }, text: ['(heavy week — significant gain)'] },
  { when: { gainLbsMin: 3 }, text: ['(steady device gain)'] },
  { when: { gainLbsMin: 1 }, text: ['(modest tick)'] },
  { when: {}, text: [''] },
]);
