// ═══════════════════════════════════════════════════════════════
// SCENE: DEVICE MALFUNCTION — tiered failure beats
// ═══════════════════════════════════════════════════════════════
import { registerPool, render } from '../../engine.js';
import { buildDeviceSceneContext } from '../device/context.js';
import './fragments.js';
import '../../modules.js';

registerPool('device.malf.beat', [
  { when: { malfunctionTier: 'critical' }, priority: 1, text: [
    '⚠️ {device.malf.open} {device.malf.consequence|cap}.',
  ] },
  { when: { malfunctionTier: 'major' }, priority: 1, text: [
    '⚠️ {device.malf.open} — {device.malf.consequence|cap}.',
  ] },
  { when: {}, text: [
    '⚠️ {device.malf.open}; {device.malf.consequence|cap}.',
    '⚠️ {device.malf.open} — {device.malf.sensation|cap}.',
    '⚠️ {device.malf.open}. {device.malf.risk|cap}.',
  ] },
]);

export function renderDeviceMalfunctionLine({ student, deviceId, deviceLabel, malfunctionTier, week = 1, dependenceLevel = 0, trace = null }) {
  const ctx = buildDeviceSceneContext(student, {
    deviceId, deviceLabel, malfunctionTier, week, dependenceLevel, isMalfunction: true,
  });
  return render('{device.malf.beat}', ctx, { trace });
}
