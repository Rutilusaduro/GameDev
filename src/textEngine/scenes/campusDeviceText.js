// ═══════════════════════════════════════════════════════════════
// SCENE: CAMPUS DEVICE ENCOUNTERS — modular prose
// ═══════════════════════════════════════════════════════════════
import { registerModule, createContext, render } from '../engine.js';
import { getStage } from '../../gameData/stages.js';
import '../modules.js';

registerModule('campus.deviceEncounter', [
  { when: { targetType: 'student', archetype: 'cheerleader' }, priority: 4,
    text: [
      '{subject.name} stretches on a bench between drills — unaware anything could reach her from the shadows.',
      'You spot {subject.name} laughing with the squad. Her guard is down; your devices are not.',
    ] },
  { when: { targetType: 'student', archetype: 'bookworm' }, priority: 4,
    text: [
      '{subject.name} reads in plain sight, highlighter in hand, mouth slightly open — an easy target for a tube or drone.',
      '{subject.name} dozes over a textbook. Perfect timing for remote feeding.',
    ] },
  { when: { targetType: 'student' }, priority: 2,
    text: [
      '{subject.name} crosses your line of sight — within range of Talia\'s campus network.',
      'A clear shot on {subject.name}. Your inventory hums with possibility.',
    ] },
  { when: { targetType: 'npc', role: 'faculty' }, priority: 5,
    text: [
      '{subject.name} hurries past with a stack of papers — faculty, off-guard, capturable if you are bold enough.',
      '{subject.name} pauses at a vending machine. A risky, delicious opportunity.',
    ] },
  { when: { targetType: 'npc', role: 'staff' }, priority: 4,
    text: [
      '{subject.name} wipes down a counter, humming. Staff nobody will miss for five minutes of feeding.',
      '{subject.name} takes a break on a loading crate — unaware of your devices.',
    ] },
  { when: { targetType: 'npc' }, priority: 2,
    text: [
      '{subject.name} wanders through — not on your roster, but absolutely within feeding range.',
      'A stranger: {subject.name}. The Predator Mask was built for moments like this.',
    ] },
  { when: {}, priority: 1,
    text: ['{subject.name} is in range — your devices could reach them from here.'] },
]);

registerModule('campus.deviceResult', [
  { when: { deviceId: 'remote_feeding_system', modeId: 'stealth' }, priority: 5,
    text: [
      'A hidden tube kisses {subject.name}\'s lips — slow, warm calories she never asked for. She blinks, swallows, keeps walking.',
      'The remote feeder drips in silence. {subject.name} touches her mouth, confused, already fuller.',
    ] },
  { when: { deviceId: 'remote_feeding_system', modeId: 'force' }, priority: 5,
    text: [
      'Your controller spikes a heavy pulse — {subject.name} doubles over mid-step, belly surging while she fights not to gag in public.',
      'Force mode hits like a fist of cream. {subject.name} clamps a hand to her stomach and pretends it was a cramp.',
    ] },
  { when: { deviceId: 'remote_feeding_system' }, priority: 2,
    text: [
      'The remote feeding network delivers on command — {subject.name} takes the calories whether she notices or not.',
    ] },
  { when: { deviceId: 'feeding_mask', modeId: 'capture' }, priority: 5,
    text: [
      'The Predator Mask launches, straps bite down, sedative hisses — {subject.name} sags as paste floods the locked tube.',
      'Capture mode is merciless: mask, lock, feed. {subject.name} muffles a protest that becomes a swallow.',
    ] },
  { when: { deviceId: 'feeding_mask' }, priority: 3,
    text: [
      'The feeding mask seals and pumps — {subject.name} has no choice but to take every calorie you send.',
    ] },
  { when: { deviceId: 'liquid_fat_infuser', modeId: 'water_aggressive' }, priority: 5,
    text: [
      'Water fattening mode turns a harmless drink into slurry — {subject.name}\'s belly bloats visibly within minutes.',
      'Infused liquid slides down warm and heavy. {subject.name} groans; the gain is already showing.',
    ] },
  { when: { deviceId: 'liquid_fat_infuser' }, priority: 2,
    text: [
      'The infuser does its clinical work — {subject.name} drinks growth disguised as ordinary thirst.',
    ] },
  { when: {}, priority: 1,
    text: ['Your device finds its mark on {subject.name}.'],
  },
]);

function encounterContext(target, nodeId, explorationCtx) {
  const stageId = target.lbs ? getStage(target.lbs).id : 3;
  const bands = { lean: [0, 2], mid: [3, 5], heavy: [6, 8], extreme: [9, 11] };
  let weightBand = 'lean';
  for (const [band, [lo, hi]] of Object.entries(bands)) {
    if (stageId >= lo && stageId <= hi) { weightBand = band; break; }
  }
  return createContext({
    subject: { name: target.name, archetype: target.archetype, lbs: target.lbs, id: target.studentId },
    week: explorationCtx.week ?? 1,
    globals: {
      targetType: target.type,
      role: target.role || 'student',
      nodeId,
      weightBand,
    },
  });
}

function resultContext(encounter, deviceId, modeId, result, nodeId) {
  return createContext({
    subject: { name: encounter.target.name, archetype: encounter.target.archetype, lbs: encounter.target.lbs },
    week: 1,
    globals: {
      deviceId,
      modeId: modeId || result.modeId || 'default',
      targetType: encounter.target.type,
      nodeId,
      discovered: !!result.discovered,
      npcGain: result.npcGain ?? null,
    },
  });
}

export function renderCampusDeviceEncounter(target, nodeId, explorationCtx) {
  return render('{campus.deviceEncounter}', encounterContext(target, nodeId, explorationCtx));
}

export function renderCampusDeviceResult(encounter, deviceId, modeId, result, nodeId) {
  return render('{campus.deviceResult}', resultContext(encounter, deviceId, modeId, result, nodeId));
}
