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
    'close enough for a handheld invention to reach',
  ] },
  { when: {}, text: [
    'crossing your line of sight',
    'close enough for Talia\'s tools to reach',
    'paused where a device could find her',
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
    'Off-roster, but well within device range.',
  ] },
  { when: {}, text: [
    'Within range of your inventions.',
    'Close enough to deploy.',
    'A viable target for the lab\'s portable gear.',
    'Talia\'s field kit hums — signal clean, window open.',
  ] },
]);

// Result fragments — device-keyed delivery
registerPool('campus.dev.delivery', [
  { when: { deviceId: 'endless_hunger_engine', modeId: 'pulse' }, text: [
    'the Hunger Ray fires a short pulse — satiety drops before she notices why she is starving',
    'a hunger pulse ripples through her midsection, appetite spiking mid-step',
    'the ray tags her with craving; her next meal will not feel optional',
  ] },
  { when: { deviceId: 'endless_hunger_engine', modeId: 'sustain' }, text: [
    'sustained craving mode locks in — she will not feel full for days',
    'the ray holds hunger high, every snack feeling like the first of many',
    'craving sustains across the afternoon; her belly never quite believes it ate enough',
  ] },
  { when: { deviceId: 'endless_hunger_engine' }, text: [
    'the Hunger Ray finds her and strips satiety down to nothing useful',
    'a beam of engineered craving lands — hunger becomes obsession on contact',
    'the ray does its clinical work; appetite rewrites itself before she can object',
  ] },
  { when: { deviceId: 'feeding_mask', modeId: 'capture' }, text: [
    'the Force Feeder launches — straps bite, tube locks, calories flood past sealed lips',
    'capture mode is merciless: mask, lock, feed',
    'the mask seals before she finishes protesting; paste keeps coming',
  ] },
  { when: { deviceId: 'feeding_mask' }, text: [
    'the Force Feeder seals and pumps without mercy',
    'the mask locks over her face and delivers another measured quota',
    'straps cinch, tube pulses — the feeding continues until the cycle ends',
  ] },
  { when: {}, text: [
    'your device finds its mark',
    'the invention lands exactly where Talia designed it to',
    'calibrated output hits before she can get clear',
  ] },
  { when: {}, text: [
    'your device finds its mark',
    'the mesh delivers on schedule',
    'calories land before she can object',
  ] },
]);

registerPool('campus.dev.reaction', [
  { when: { deviceId: 'endless_hunger_engine', modeId: 'sustain' }, text: [
    'She clutches her stomach and starts hunting food with single-minded focus.',
    'Her eyes go distant — hunger rewriting every other priority.',
  ] },
  { when: { deviceId: 'endless_hunger_engine' }, text: [
    'She blinks, suddenly ravenous, already scanning for something to eat.',
    'Her hand drifts to her belly; the hollow feels wrong and urgent.',
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
    'Resistance lasts seconds; fullness lasts much longer.',
  ] },
  { when: { discovered: true }, text: [
    'Someone nearby definitely noticed.',
    'Whispers may follow.',
    'A witness will remember the sound of the straps locking.',
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
  { when: { flavorDevice: 'living_furniture_rig' }, text: [
    'A common-room couch sighs when someone sits. You pretend not to hear the muffled moan inside.',
    'Furniture in the lounge shifts like it is breathing.',
    'A padded ottoman creaks under a guest — straps hidden under upholstery, tubes tucked neat.',
    'Someone jokes about the new lounge bench being "too comfortable." Talia would smirk.',
  ] },
  { when: { flavorDevice: 'feeding_mask' }, text: [
    'A discarded mask shell sits in a planter — straps locked, tube clogged with dried paste.',
    'Scuffed mask padding lies in the grass like shed skin.',
    'Someone wipes paste from their chin and cannot explain how it got there.',
    'A locker room trash can holds a crumpled face rig still warm to the touch.',
  ] },
  { when: { flavorDevice: 'endless_hunger_engine' }, text: [
    'A vending machine empties faster than usual — someone ate like the hollow would not close.',
    'You catch a faint ozone smell and a girl patting her belly, confused and still hungry.',
    'A snack wrapper trail leads to a bench where someone keeps eating without looking satisfied.',
    'Talia\'s ray leaves no obvious mark — only appetite that outlasts the meal.',
  ] },
  { when: { flavorDevice: 'growth_accelerator_chamber' }, text: [
    'Warm light spills under a lab-side door — sealed air, faint hum, someone heavier when they emerge.',
    'A transport cart rattles past with chamber panels still radiating heat.',
    'The walkway near the engineering annex smells like warm polymer and post-session sweat.',
    'Someone crosses the quad slower than they did yesterday, curves catching the light differently.',
  ] },
  { when: {}, text: [
    'The campus hums with machine activity you cannot quite see.',
    'Somewhere nearby, a rig ticks through its cycle.',
    'You catch the faint smell of warm paste on the air.',
    '',
  ] },
]);
