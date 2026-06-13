// ═══════════════════════════════════════════════════════════════
// DEVICE WEEKLY TICK — fragment pools (nine approved inventions)
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../../engine.js';
import '../../modules.js';

// FULL SENTENCE — what the device does this tick
registerPool('device.tick.action', [
  { when: { deviceId: 'auto_feeder_arm' }, text: [
    'the {device.label} swings to {subject.name}\'s mouth and delivers another quota by mechanical arm',
    'servo-guided bites from the {device.label} land whether {subject.name} is ready or not',
    'the {device.label} holds {subject.name} in feeding position and pushes another portion through',
  ] },
  { when: { deviceId: 'obedience_belt' }, text: [
    'the {device.label} tightens its compliance loop around {subject.name}\'s waist each time she hesitates',
    'the {device.label} hums through {subject.name}\'s week — shame cues and feeding prompts stacked in sequence',
    'the {device.label} keeps {subject.name} on script, waist harness punishing every flicker of resistance',
  ] },
  { when: { deviceId: 'auto_bloating_belt' }, text: [
    'the {device.label} clamps {subject.name}\'s waist and cycles pressure in slow, insistent pulses',
    'the {device.label} inflates against {subject.name}\'s midsection, venting bloat gas on schedule',
    'pressurized bloat from the {device.label} drums {subject.name}\'s belly tighter with each weekly pass',
  ] },
  { when: { deviceId: 'reinforced_legs' }, text: [
    'the {device.label} braces {subject.name}\'s thighs while furniture-weight loads settle through her frame',
    'load-bearing supports from the {device.label} keep {subject.name} upright as harness strain increases',
    'the {device.label} creaks steady under {subject.name}\'s weight, servos adjusting as she swells',
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
    'the {device.label} seals and floods {subject.name} with radiation through a full acceleration cycle',
    'inside the {device.label}, {subject.name} stands under a silent field that multiplies adipose tissue',
  ] },
  { when: { deviceId: 'growth_serum_injector' }, text: [
    'the {device.label} drives another volatile formula dose into {subject.name}',
    'the {device.label} plunges its payload home; serum hits {subject.name}\'s bloodstream fast',
    'a shot from the {device.label} sends growth compound racing through {subject.name}',
  ] },
  { when: { deviceId: 'endless_hunger_engine' }, text: [
    'the {device.label} suppresses satiety in {subject.name} through another exposure cycle',
    'the {device.label} keeps hunger gnawing under every meal {subject.name} manages to finish',
    'the {device.label} rewires {subject.name}\'s appetite — full never lasts, empty always returns',
  ] },
  { when: {}, text: [
    'the {device.label} works through another week on {subject.name}',
    '{subject.name} spends the week under the {device.label}\'s steady output',
    'the {device.label} keeps {subject.name} on its schedule for another cycle',
  ] },
]);

// PREP ANCHOR — optional atmospheric tail
registerPool('device.tick.anchor', [
  { when: { deviceId: 'growth_accelerator_chamber' }, text: ['', ' under the radiation field', ' as the chamber seals'] },
  { when: { deviceId: 'growth_serum_injector' }, text: ['', ' as the injector hisses shut'] },
  { when: { deviceId: 'endless_hunger_engine' }, text: ['', ' at range', ' while the ray warms her skin'] },
  { when: {}, text: ['', ''] },
]);

// PARTICIPLE CLAUSE / SECOND SENTENCE — how it lands on her body
registerPool('device.tick.sensation', [
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
  { when: { deviceId: 'obedience_belt', dependenceLevelMin: 2 }, text: [
    'shame and compliance stack in her middle — she eats faster when the belt hums approval',
    'each cue from the harness makes refusal feel heavier than another swallow',
  ] },
  { when: { deviceId: 'obedience_belt' }, text: [
    'the belt\'s pressure maps onto her appetite; obedience and fullness arrive together',
    'her waist stays cinched while portions keep landing — compliance written in soft flesh',
  ] },
  { when: { deviceId: 'auto_bloating_belt', bodyState: 'bloated' }, text: [
    'her belly drums tight with artificial fullness before the gain turns permanent',
    'bloat makes the belt\'s work visible long before the scale agrees',
  ] },
  { when: { deviceId: 'auto_bloating_belt' }, text: [
    'pressure blooms through her waist, bloat converting to real mass beneath the strap',
    'her midsection swells against the belt until the week\'s gain is impossible to hide',
  ] },
  { when: { deviceId: 'reinforced_legs' }, text: [
    'braced thighs bear the load while her lower body thickens under the furniture harness',
    'the supports keep her stable as weight stacks into hips and legs',
    'each adjustment from the braces leaves her steadier and visibly heavier below the waist',
  ] },
  { when: { deviceId: 'living_furniture_rig' }, text: [
    'with each mouthful the harness feeds her, her body swelling softer — more upholstered, more furniture',
    'cushioned flesh yields under the rig\'s maintenance; she grows into a heavier, roomier piece',
    'calories stack until the furniture form creaks content — {subject.name} softer, larger, more useful',
  ] },
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
  { when: { deviceId: 'growth_serum_injector' }, text: [
    'serum converts fast — softness appearing wherever the formula pooled first',
    'volatile compound races through her tissue, curves deepening before the ache fades',
    'the injection site swells warm; the rest of her follows on a delay she can feel coming',
  ] },
  { when: { deviceId: 'endless_hunger_engine' }, text: [
    'hunger outruns every meal — the ray makes sure satiety never quite wins',
    'she eats more because the hollow always returns; the gain follows appetite',
    'craving rewrites her week; every snack feels like it was always inevitable',
  ] },
  { when: { weightBand: 'lean' }, text: [
    'the new softness shows almost immediately on {subject.name}\'s still-small frame',
    'padding appears where bone and muscle used to define her outline',
    'curves arrive fast on a frame that had almost none to hide them',
  ] },
  { when: { weightBand: 'mid' }, text: [
    'fullness settles into curves on {subject.name} that will not hide',
    'her middle softens where the rig keeps adding mass',
    'new give appears at her waist and hips by the week\'s end',
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

// Malfunction clause — device-keyed
registerPool('device.tick.malfClause', [
  { when: { deviceId: 'auto_feeder_arm', malfunctionTier: 'moderate' }, text: [
    'then overfeeds past the safe quota — portions stacking faster than she can finish',
    'then dumps an oversized portion before the arm resets',
  ] },
  { when: { deviceId: 'obedience_belt', malfunctionTier: 'moderate' }, text: [
    'then punishes hesitation with a hum she feels in her bones',
    'then stacks compliance cues until shame outruns her ability to refuse food',
  ] },
  { when: { deviceId: 'auto_bloating_belt', malfunctionTier: 'moderate' }, text: [
    'then overpressurizes past the planned bloat limit',
    'then surges until her waist balloons harder than the belt should allow',
  ] },
  { when: { deviceId: 'reinforced_legs', malfunctionTier: 'minor' }, text: [
    'then a brace pinches — she shifts, and the harness creaks louder',
    'then a support servo stutters under the added load',
  ] },
  { when: { deviceId: 'living_furniture_rig', malfunctionTier: 'moderate' }, text: [
    'then overfeeds the furniture form past its comfort threshold',
    'then surges calories until the harness groans in protest',
  ] },
  { when: { deviceId: 'growth_accelerator_chamber', malfunctionTier: 'moderate' }, text: [
    'then spikes past the safe radiation ceiling',
    'then overdrives the field until deposition runs well outside spec',
  ] },
  { when: { deviceId: 'growth_accelerator_chamber', malfunctionTier: 'major' }, text: [
    'then locks the radiation field in a dangerous overrun',
    'then refuses to power down at the planned limit',
  ] },
  { when: { deviceId: 'growth_serum_injector', malfunctionTier: 'moderate' }, text: [
    'then plunges a dose well above the safe serum load',
    'then overdrives the injection until compound floods her bloodstream at once',
  ] },
  { when: { deviceId: 'growth_serum_injector', malfunctionTier: 'major' }, text: [
    'then keeps working after it should have stopped — chaotic cascade through her tissue',
    'then converts mass faster than her frame can redistribute it',
  ] },
  { when: { deviceId: 'endless_hunger_engine', malfunctionTier: 'moderate' }, text: [
    'then suppresses satiety past safe levels — hunger rewriting her whole week',
    'then locks craving high until she eats through every reserve she had',
  ] },
  { when: { malfunctionTier: 'minor' }, text: [
    'then hiccups with a minor glitch in the cycle',
    'then stutters once before continuing',
    'then clicks and resumes on the next beat',
  ] },
  { when: { malfunctionTier: 'moderate' }, text: [
    'then spikes past the safe rhythm',
    'then surges harder than the cycle was rated for',
    'then overruns the planned dosage for the week',
  ] },
  { when: { malfunctionTier: 'major' }, text: [
    'then locks in a dangerous overrun',
    'then refuses to stop at the planned limit',
    'then keeps running until someone intervenes',
  ] },
  { when: { malfunctionTier: 'critical' }, text: [
    'then fails catastrophically — nothing looks the same after',
    'then breaks safe parameters entirely',
    'then leaves her swollen past every comfort threshold',
  ] },
  { when: {}, text: [''] },
]);

// Synergy when multiple devices equipped
registerPool('device.tick.synergy', [
  { when: { equippedCountMin: 3 }, text: [
    'Other rigs hum in concert around her.',
    'The full harness of devices leaves no hour untouched.',
    'Multiple inventions stack their output without pause.',
  ] },
  { when: { equippedWaist: 'auto_bloating_belt', deviceId: 'auto_feeder_arm' }, text: [
    'The belt bloats her while the arm keeps feeding into it.',
    'Bloat and mechanical feeding stack in the same weekly pass.',
  ] },
  { when: { equippedWaist: 'obedience_belt', deviceId: 'auto_feeder_arm' }, text: [
    'Compliance cues and feeding land together — shame and fullness in one rhythm.',
  ] },
  { when: { deviceId: 'living_furniture_rig', equippedWaist: 'auto_bloating_belt' }, text: [
    'Furniture form and waist bloat deepen together — upholstery and pressure both rising.',
  ] },
  { when: {}, text: ['', '', ''] },
]);

// Gain tag — short factual tail
registerPool('device.tick.gainTag', [
  { when: { gainLbsMin: 6 }, text: ['(heavy week — significant gain)'] },
  { when: { gainLbsMin: 3 }, text: ['(steady device gain)'] },
  { when: { gainLbsMin: 1 }, text: ['(modest tick)'] },
  { when: {}, text: [''] },
]);
