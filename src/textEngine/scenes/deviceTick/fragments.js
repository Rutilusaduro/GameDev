// ═══════════════════════════════════════════════════════════════
// DEVICE WEEKLY TICK — fragment pools (slot-composed)
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../../engine.js';
import '../../modules.js';

// VERB PHRASE — what the device does this tick
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
    'the locked mask floods her with warm infused formula',
    'the mask pumps heavy slurry past her sealed lips',
  ] },
  { when: { deviceId: 'feeding_mask' }, text: [
    'the feeding mask forces another quota through the tube',
    'locked straps hold while the mask feeds on schedule',
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
  { when: {}, text: ['the device completes its weekly cycle'] },
]);

// PARTICIPLE CLAUSE — how it lands on her body
registerPool('device.tick.sensation', [
  { when: { weightBand: 'lean' }, text: [
    'her stomach takes the gain faster than she expects',
    'the new softness shows almost immediately',
  ] },
  { when: { weightBand: 'mid' }, text: [
    'her middle softens around the mechanical insistence',
    'fullness settles into curves that will not hide',
  ] },
  { when: { weightBand: 'heavy' }, text: [
    'her heavy body absorbs every calorie without resistance',
    'rolls and swell accept the device like they were waiting',
  ] },
  { when: { weightBand: 'extreme' }, text: [
    'her vast body swells further — the device barely slows',
    'every pound lands on an already monumental frame',
  ] },
  { when: { bodyState: 'bloated' }, text: [
    'her belly drums tight with artificial fullness',
    'bloat makes the gain visible before the scale does',
  ] },
  { when: { bodyState: 'furniture' }, text: [
    'the furniture form creaks softer with each feeding',
    'cushioned flesh yields under the rig\'s maintenance',
  ] },
  { when: {}, text: [
    'she feels the week\'s device work in her body',
    'the mechanical rhythm leaves its mark on her',
    'warmth and pressure settle where the rig worked',
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
  { when: {}, text: ['', ''] },
]);

// Gain tag — short factual tail
registerPool('device.tick.gainTag', [
  { when: { gainLbsMin: 6 }, text: ['(heavy week — significant gain)'] },
  { when: { gainLbsMin: 3 }, text: ['(steady device gain)'] },
  { when: { gainLbsMin: 1 }, text: ['(modest tick)'] },
  { when: {}, text: [''] },
]);
