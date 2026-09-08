// ═══════════════════════════════════════════════════════════════
// DEVICE WEEKLY TICK — fragment pools (nine approved inventions)
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../../engine.js';
import '../../modules.js';

// VERB PHRASE — what the device does this tick (device voice, no name)
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
    'the {device.label} maintains {subject.name} in furniture posture — fed, cushioned, slowly swelling',
    'the {device.label} keeps {subject.name} upholstered through another weekly maintenance cycle',
    'the {device.label} works {subject.name}\'s restrained form — comfort calories on schedule',
  ] },
  { when: { deviceId: 'growth_accelerator_chamber' }, text: [
    'the {device.label} bathes {subject.name} in warm radiation — soft flesh answering faster',
    'the {device.label} seals around {subject.name} and drives another growth field session',
    'the {device.label} hums through {subject.name}\'s tissues — warmth, swell, pleasure in sequence',
  ] },
  { when: { deviceId: 'sleep_feeding_system' }, text: [
    'the {device.label} drips formula into {subject.name} while she sleeps — unconscious calories on schedule',
    'the {device.label} feeds {subject.name} through the night without waking her',
    'the {device.label} completes another sleep-feed cycle on {subject.first}\'s slack features',
  ] },
  { when: { deviceId: 'weight_redistribution_rig' }, text: [
    'the {device.label} maps fat across {subject.name}\'s frame — redistribution on mechanical schedule',
    'the {device.label} pulls and settles weight through {subject.first}\'s body in programmed passes',
    'the {device.label} reshapes {subject.name}\'s silhouette — curves guided, not chosen',
  ] },
  { when: { deviceId: 'feeding_mask', hasAttachment: 'liquid_fat_infuser' }, text: [
    'the locked mask floods warm infused formula',
    'the mask pumps heavy slurry past sealed lips',
    'the infuser attachment drives dense calories through the seal',
  ] },
  { when: { deviceId: 'feeding_mask' }, text: [
    'the feeding mask forces another quota through the tube',
    'locked straps hold while the mask feeds on schedule',
    'the mask completes another forced-feeding cycle',
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
  { when: {}, text: [
    'the device completes its weekly cycle',
    'the rig runs another maintenance feeding',
    'mechanical patience delivers another quota',
  ] },
]);

// PREPOSITIONAL ANCHOR — ties action to {subject.name}'s body (always uses name slots)
registerPool('device.tick.anchor', [
  { when: { deviceId: 'feeding_mask' }, text: [
    ' on {subject.name}\'s face',
    ' sealed over {subject.first}\'s mouth',
    ' locked against {subject.name}\'s lips',
    ' strapped to {subject.first}\'s jaw',
  ] },
  { when: { deviceId: 'sleep_feeding_system' }, text: [
    ' while {subject.name} sleeps',
    ' over {subject.first}\'s slack features',
    ' against {subject.name}\'s unconscious mouth',
  ] },
  { when: { deviceId: 'auto_feeder_arm' }, text: [
    ' at {subject.name}\'s lips',
    ' into {subject.first}\'s waiting mouth',
  ] },
  { when: { deviceId: 'auto_bloating_belt' }, text: [
    ' around {subject.name}\'s waist',
    ' cinched over {subject.first}\'s middle',
  ] },
  { when: { deviceId: 'living_furniture_rig' }, text: [
    ' through {subject.name}\'s restrained form',
    ' into {subject.first}\'s cushioned body',
  ] },
  { when: { deviceId: 'weight_redistribution_rig' }, text: [
    ' across {subject.name}\'s frame',
    ' mapping {subject.first}\'s fat in real time',
  ] },
  { when: {}, text: [
    ' on {subject.name}',
    ' while {subject.first} wears it',
    '',
  ] },
]);

// DEPENDENCE REACTION — keyed on per-device dependence tier
registerPool('device.tick.dependence', [
  { when: { deviceId: 'feeding_mask', deviceDependenceTierMin: 3 }, text: [
    '{subject.first} leans into the tube before the pump starts',
    'she swallows eagerly the moment paste arrives',
    'anticipation makes her hips twitch when the mask pressurizes',
    'she moans around the seal — wanting the next serving already',
  ] },
  { when: { deviceId: 'feeding_mask', deviceDependenceTierMin: 2 }, text: [
    'she stopped fighting the straps weeks ago',
    'her throat works automatically when the cycle begins',
    'resistance has thinned into hungry compliance',
  ] },
  { when: { deviceId: 'feeding_mask', deviceDependenceTierMin: 1 }, text: [
    'she tenses, then yields when the tube floods warm',
    'familiar dread mixes with a growing appetite for the seal',
  ] },
  { when: { deviceId: 'feeding_mask', deviceDependenceTier: 0 }, text: [
    'she jerks against the straps at first',
    'fear flickers behind the visor before the pump wins',
    '',
  ] },
  { when: { deviceId: 'sleep_feeding_system', deviceDependenceTierMin: 2 }, text: [
    '{subject.name} swallows in her sleep without waking',
    'her body welcomes the drip before consciousness returns',
  ] },
  { when: { deviceId: 'auto_bloating_belt', deviceDependenceTierMin: 2 }, text: [
    'she breathes into the pressure instead of fighting it',
    'her hands rest on her swelling middle like it belongs there',
  ] },
  { when: {}, text: ['', '', ''] },
]);

// GROWTH CLAUSE — how her body changes this tick (PARTICIPLE CLAUSE)
registerPool('device.tick.growth', [
  { when: { bodyType: 'pear', weightBand: 'lean', gainLbsMin: 2 }, text: [
    'her hips widen first — soft weight ringing her waist before the scale admits it',
    'new flesh settles low on {subject.first}\'s frame in a curve she can feel forming',
  ] },
  { when: { bodyType: 'pear', weightBand: 'mid' }, text: [
    'her thighs thicken until they brush with every step she takes',
    'weight pools under {subject.name}\'s waist in a pear-soft spread',
  ] },
  { when: { bodyType: 'pear', weightBand: 'heavy' }, text: [
    'her lower body swells outward — hips and thighs claiming another inch',
    'pear curves deepen as fat deposits stack on {subject.first}\'s hips',
  ] },
  { when: { bodyType: 'apple', weightBand: 'lean', gainLbsMin: 2 }, text: [
    'a gentle forward roundness pushes at her shirts',
    'her belly pooching softens the line of {subject.name}\'s waist',
  ] },
  { when: { bodyType: 'apple', weightBand: 'mid' }, text: [
    'her middle rounds forward — an apple-full swell straining waistbands',
    'fat gathers on {subject.first}\'s stomach in a visible arc',
  ] },
  { when: { bodyType: 'apple', weightBand: 'heavy' }, text: [
    'her belly hangs heavier — forward mass {subject.name} balances with each step',
    'apple weight stacks on her gut until it rests on her lap when she sits',
  ] },
  { when: { bodyType: 'hourglass', weightBand: 'mid' }, text: [
    'bust and hips swell together while her waist softens between them',
    '{subject.first}\'s curves deepen evenly — an hourglass pouring fuller',
  ] },
  { when: { bodyType: 'topHeavy', weightBand: 'mid' }, text: [
    'her chest grows heavier first — upper softness arriving before the rest',
    'weight stacks on {subject.name}\'s bust until straps dig in',
  ] },
  { when: { bodyType: 'athletic', weightBand: 'mid' }, text: [
    'muscle softens under new padding — power buried in comfortable thickness',
    'her trained frame rounds at the edges where the device insists',
  ] },
  { when: { weightBand: 'lean', gainLbsMin: 1 }, text: [
    'the new softness shows almost before {subject.first} believes it',
    'subtle thickening accumulates where the rig keeps feeding',
    'her clothes pull differently by the end of the week',
  ] },
  { when: { weightBand: 'mid', gainLbsMin: 2 }, text: [
    'fullness settles into curves that will not hide on {subject.name}',
    'her middle softens around the mechanical insistence',
    'another layer deposits itself across her hips and waist',
  ] },
  { when: { weightBand: 'heavy', gainLbsMin: 3 }, text: [
    'rolls and swell accept the device on {subject.first}\'s heavy frame',
    'her body absorbs every calorie without resistance',
    'existing softness deepens — gain stacking on gain',
  ] },
  { when: { weightBand: 'extreme', gainLbsMin: 1 }, text: [
    'every pound lands on {subject.name}\'s already monumental frame',
    'her vast body swells further — the device barely slows',
    'immobile softness thickens in quiet, visible surges',
  ] },
  { when: { gainLbsMin: 8 }, text: [
    'this week\'s surge is unmistakable — {subject.first} feels it in every mirror',
    'her body answers the machine with a brutal, uneven swell',
    'the gain stacks hard enough to change how she fits through doors',
  ] },
  { when: { gainLbsMin: 4 }, text: [
    'steady device gain reshapes her silhouette over seven days',
    '{subject.name} carries the week\'s swell in her stride and her seams',
    'softness accumulates in obvious inches she cannot deny',
  ] },
  { when: { gainLbsMin: 1 }, text: [
    'incremental softness deposits itself on schedule',
    'her body grows quietly around the machine\'s rhythm',
    'another modest layer settles where the rig worked hardest',
  ] },
  { when: { bodyState: 'bloated' }, text: [
    'bloat makes the gain visible on {subject.first} before the scale does',
    'her belly drums tight with artificial fullness swelling further',
  ] },
  { when: { bodyState: 'furniture' }, text: [
    'cushioned flesh yields and thickens under the rig\'s maintenance',
    'the furniture form grows softer — {subject.name}\'s bulk deepening',
  ] },
  { when: {}, text: [
    'her body grows incrementally around the machine\'s schedule',
    'softness accumulates in quiet, visible inches on {subject.name}',
    'the gain shows in how her clothes pull and her steps shorten',
    'another week of mechanical feeding leaves her unmistakably fuller',
  ] },
]);

// SENSATION — tactile / immediate feel (PARTICIPLE CLAUSE)
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
    'radiation-fed softness multiplies across her monumental frame without resistance',
    'every deposited pound lands on flesh already vast — the chamber barely slows for her size',
  ] },
  { when: { deviceId: 'growth_accelerator_chamber' }, text: [
    'her soft flesh absorbs the field\'s work — warmth layering faster than comfort allows',
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
    'warmth spreads through her middle faster than she expects',
    'she feels the new softness before she names it',
  ] },
  { when: { weightBand: 'mid' }, text: [
    'fullness lingers in her tissues after each cycle',
    'her skin feels taut where the gain landed',
  ] },
  { when: { weightBand: 'heavy' }, text: [
    'every roll jiggles with the aftershock of feeding',
    'heaviness settles into her bones between cycles',
  ] },
  { when: { weightBand: 'extreme' }, text: [
    'the sheer mass of her body answers each pulse slowly',
    'warmth pools in folds that barely shift when she breathes',
  ] },
  { when: { bodyState: 'bloated' }, text: [
    'artificial tightness drums across her swollen middle',
    'bloat and gain blur together under the rig',
  ] },
  { when: {}, text: [
    'she carries the week\'s work in how she moves',
    'the mechanical rhythm leaves its mark on her flesh',
    '',
  ] },
]);

// Malfunction clause — device-keyed
registerPool('device.tick.malfClause', [
  { when: { deviceId: 'auto_feeder_arm', malfunctionTier: 'moderate' }, text: [
    'then overfeeds past the safe quota — portions stacking faster than she can finish',
    'then dumps an oversized portion before the arm resets',
    'then locks greedy mode until the kill switch interrupts',
  ] },
  { when: { deviceId: 'obedience_belt', malfunctionTier: 'moderate' }, text: [
    'then punishes hesitation with a hum she feels in her bones',
    'then stacks compliance cues until shame outruns her ability to refuse food',
    'then tightens the loop until obedience and appetite blur together',
  ] },
  { when: { deviceId: 'auto_bloating_belt', malfunctionTier: 'moderate' }, text: [
    'then overpressurizes past the planned bloat limit',
    'then surges until her waist balloons harder than the belt should allow',
    'then locks the buckle through a brutal swell pulse',
  ] },
  { when: { deviceId: 'reinforced_legs', malfunctionTier: 'minor' }, text: [
    'then a brace pinches — she shifts, and the harness creaks louder',
    'then a support servo stutters under the added load',
    'then a joint complains until the braces recalibrate',
  ] },
  { when: { deviceId: 'living_furniture_rig', malfunctionTier: 'moderate' }, text: [
    'then overfeeds the furniture form past its comfort threshold',
    'then surges calories until the harness groans in protest',
    'then keeps feeding until the rig moans under her swelling weight',
  ] },
  { when: { deviceId: 'growth_accelerator_chamber', malfunctionTier: 'moderate' }, text: [
    'then spikes past the safe radiation ceiling',
    'then overdrives the field until deposition runs well outside spec',
    'then holds the warmth too long — swell arriving faster than planned',
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
    'Pressure and portions arrive together — belly tight, mouth still working.',
  ] },
  { when: { equippedWaist: 'obedience_belt', deviceId: 'auto_feeder_arm' }, text: [
    'Compliance cues and feeding land together — shame and fullness in one rhythm.',
    'The belt hums approval while the arm delivers — obedience tasted in every bite.',
  ] },
  { when: { equippedHead: 'feeding_mask', deviceId: 'auto_bloating_belt' }, text: [
    'Mask and belt stack pressure — face fed while her middle swells.',
    'Sealed lips and cinched waist — two devices, one weekly swell.',
  ] },
  { when: { equippedHead: 'feeding_mask', deviceId: 'growth_accelerator_chamber' }, text: [
    'Radiation and forced feeding overlap — growth field while the mask keeps portions coming.',
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
