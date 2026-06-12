// ═══════════════════════════════════════════════════════════════
// DEVICE WEEKLY TICK — fragment pools (slot-composed)
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../../engine.js';
import '../../modules.js';

// VERB PHRASE — what the device does this tick (device voice, no name)
registerPool('device.tick.action', [
  { when: { deviceId: 'auto_feeder_arm', hasAttachment: 'liquid_fat_infuser' }, text: [
    'the feeder arm pumps fattening slurry on schedule',
    'the arm delivers heavy infused paste in mechanical rhythm',
  ] },
  { when: { deviceId: 'auto_feeder_arm', hasAttachment: 'calorie_paste_printer' }, text: [
    'the feeder arm prints dense calorie paste to her lips',
    'optimized paste cycles from the arm without pause',
  ] },
  { when: { deviceId: 'auto_feeder_arm' }, text: [
    'the auto-feeder arm delivers another measured portion',
    'servo-fed bites land whether she is ready or not',
  ] },
  { when: { deviceId: 'auto_bloating_belt' }, text: [
    'the bloating belt cycles pressure against her waist',
    'the belt inflates her midsection in slow pulses',
  ] },
  { when: { deviceId: 'sleep_feeding_system', hasAttachment: 'liquid_fat_infuser' }, text: [
    'the sleep mask drips infused slurry through the night',
    'overnight water-fattening runs while she is helpless',
  ] },
  { when: { deviceId: 'sleep_feeding_system' }, text: [
    'the sleep-feeding mask drips calories through rest',
    'sensors keep the overnight drip perfectly steady',
  ] },
  { when: { deviceId: 'feeding_mask', hasAttachment: 'liquid_fat_infuser' }, text: [
    'the locked mask floods warm infused formula',
    'the mask pumps heavy slurry past sealed lips',
  ] },
  { when: { deviceId: 'feeding_mask' }, text: [
    'the feeding mask forces another quota through the tube',
    'locked straps hold while the mask feeds on schedule',
    'the mask completes another forced-feeding cycle',
  ] },
  { when: { deviceId: 'weight_redistribution_rig' }, text: [
    'the redistribution rig vibrates fat toward new zones',
    'pressure nodes sculpt her shape on a timed cycle',
  ] },
  { when: { deviceId: 'living_furniture_rig', furnitureComfortLow: true }, text: [
    'the furniture rig groans — comfort is running low',
    'the rig trembles; she needs feeding to stay stable',
  ] },
  { when: { deviceId: 'living_furniture_rig' }, text: [
    'the living furniture rig passively swells its cushion',
    'restraints and tubes keep the furniture form fed',
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
    'immobile abundance thickens in quiet, visible surges',
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

// Malfunction clause
registerPool('device.tick.malfClause', [
  { when: { malfunctionTier: 'minor' }, text: [
    'then hiccups — a minor glitch in the cycle',
    'stutters once, then keeps going',
  ] },
  { when: { malfunctionTier: 'moderate' }, text: [
    'then surges too hard — a messy overfeed',
    'spikes past the safe rhythm',
  ] },
  { when: { malfunctionTier: 'major' }, text: [
    'then locks in a dangerous overrun',
    'refuses to stop at the planned limit',
  ] },
  { when: { malfunctionTier: 'critical' }, text: [
    'then fails catastrophically — nothing looks the same after',
    'breaks safe parameters entirely',
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
  { when: { equippedHead: 'feeding_mask', deviceId: 'auto_bloating_belt' }, text: [
    'Mask and belt stack pressure — face fed while her middle swells.',
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
