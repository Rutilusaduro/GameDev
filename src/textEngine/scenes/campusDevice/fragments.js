// ═══════════════════════════════════════════════════════════════
// CAMPUS DEVICE — fragment pools (slot-composed)
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../../engine.js';
import '../../modules.js';

// ADVERBIAL / clause fragments for encounter skeletons
registerPool('campus.dev.vulnerability', [
  { when: { archetype: 'cheerleader' }, text: [
    'stretching between drills with her guard down',
    'laughing with the squad, unaware of the shadows',
  ] },
  { when: { archetype: 'bookworm' }, text: [
    'reading in plain sight, mouth slightly open',
    'dozing over a textbook at the wrong moment',
  ] },
  { when: { archetype: 'influencer' }, text: [
    'filming B-roll without checking behind her',
    'adjusting angles while her back stays turned',
  ] },
  { when: { archetype: 'athlete' }, text: [
    'recovering on a bench, breathing hard',
    'chugging a shake with both hands occupied',
  ] },
  { when: { targetType: 'npc', role: 'faculty' }, text: [
    'hurrying past with a stack of papers',
    'paused at a vending machine, off-guard',
  ] },
  { when: { targetType: 'npc', role: 'staff' }, text: [
    'wiping a counter, humming to herself',
    'on break against a loading crate',
  ] },
  { when: { targetType: 'npc' }, text: [
    'wandering through without roster protection',
    'within range of Talia\'s predator tools',
  ] },
  { when: {}, text: [
    'crossing your line of sight',
    'close enough for the mesh to reach',
    '',
  ] },
]);

registerPool('campus.dev.rangeNote', [
  { when: { targetType: 'student' }, text: [
    'Your inventory hums with possibility.',
    'The campus network marks her as in range.',
    'Signal strong — delivery window open.',
    '',
  ] },
  { when: { targetType: 'npc' }, text: [
    'Not on the roster — still absolutely feedable.',
    'A stranger the mask was built for.',
  ] },
  { when: {}, text: [''] },
]);

// Result fragments
registerPool('campus.dev.delivery', [
  { when: { deviceId: 'remote_feeding_system', modeId: 'stealth' }, text: [
    'a hidden tube kisses her lips — slow, warm calories she never asked for',
    'the remote feeder drips in silence while she keeps walking',
  ] },
  { when: { deviceId: 'remote_feeding_system', modeId: 'force' }, text: [
    'your controller spikes a heavy pulse through the mesh',
    'force mode hits like a fist of cream mid-step',
  ] },
  { when: { deviceId: 'remote_feeding_system' }, text: [
    'the remote feeding network delivers on command',
  ] },
  { when: { deviceId: 'feeding_mask', modeId: 'capture' }, text: [
    'the Predator Mask launches — straps bite, sedative hisses, paste floods the tube',
    'capture mode is merciless: mask, lock, feed',
  ] },
  { when: { deviceId: 'feeding_mask' }, text: [
    'the feeding mask seals and pumps without mercy',
  ] },
  { when: { deviceId: 'liquid_fat_infuser', modeId: 'water_aggressive' }, text: [
    'water fattening turns a drink into heavy slurry',
    'infused liquid slides warm while her belly swells',
  ] },
  { when: { deviceId: 'liquid_fat_infuser' }, text: [
    'the infuser does its clinical work through ordinary thirst',
  ] },
  { when: {}, text: [
    'your device finds its mark',
    'the mesh delivers on schedule',
    'calories land before she can object',
  ] },
]);

registerPool('campus.dev.reaction', [
  { when: { modeId: 'stealth' }, text: [
    'She blinks, swallows, and pretends nothing happened.',
    'She touches her mouth, confused, already fuller.',
  ] },
  { when: { modeId: 'force' }, text: [
    'She doubles over, belly surging, fighting not to gag in public.',
    'She clamps a hand to her stomach and calls it a cramp.',
  ] },
  { when: { deviceId: 'feeding_mask', modeId: 'capture' }, text: [
    'A muffled protest becomes another swallow.',
    'She sags as the locked tube keeps pumping.',
  ] },
  { when: { deviceId: 'feeding_mask', deviceDependenceTierMin: 2 }, text: [
    'She leans into the seal before the paste arrives.',
    'Eagerness shows — she wants the mask more than she admits.',
    'Her throat works automatically when the pump engages.',
  ] },
  { when: { deviceId: 'feeding_mask', deviceDependenceTierMin: 1 }, text: [
    'Resistance thins into hungry compliance.',
    'She stops fighting once the tube warms.',
  ] },
  { when: { modeId: 'capture' }, text: [
    'A muffled protest becomes another swallow.',
    'She sags as the locked tube keeps pumping.',
  ] },
  { when: { discovered: true }, text: [
    'Someone nearby definitely noticed.',
    'Whispers may follow.',
  ] },
  { when: {}, text: [
    'The gain is already showing.',
    'She touches her middle like something changed.',
    'Fullness settles in before she names it.',
    '',
  ] },
]);

// Ambient flavor when exploring with lab active
registerPool('campus.deviceFlavor', [
  { when: { flavorDevice: 'sleep_feeding_system' }, text: [
    'You pass a dorm window — someone sleeps hooked to a soft mask and slow drip, belly rising in the dark.',
    'A bedside drip clicks in rhythm behind thin curtains.',
  ] },
  { when: { flavorDevice: 'living_furniture_rig' }, text: [
    'A common-room couch sighs when someone sits. You pretend not to hear the muffled moan inside.',
    'Furniture in the lounge shifts like it is breathing.',
  ] },
  { when: { flavorDevice: 'liquid_fat_infuser' }, text: [
    'A water cooler hums wrong — warm, heavy, faintly sweet. Talia would know that sound.',
    'A shared bottle sweats with something thicker than water.',
  ] },
  { when: { flavorDevice: 'remote_feeding_system' }, text: [
    'A tiny drone retreats behind a vent, tube still glistening.',
    'Someone nearby pats their mouth, confused, already fuller.',
  ] },
  { when: { flavorDevice: 'feeding_mask' }, text: [
    'A discarded mask shell sits in a planter — straps locked, tube clogged with dried paste.',
    'Scuffed mask padding lies in the grass like shed skin.',
  ] },
  { when: {}, text: [
    'The campus hums with machine activity you cannot quite see.',
    'Somewhere nearby, a rig ticks through its cycle.',
    'You catch the faint smell of warm paste on the air.',
    '',
  ] },
]);
