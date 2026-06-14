// ═══════════════════════════════════════════════════════════════
// SCENE: DEVICE MODIFICATION — upgrade moment prose
// ═══════════════════════════════════════════════════════════════
import { registerPool, render } from '../../engine.js';
import { buildDeviceSceneContext } from '../device/context.js';
import './fragments.js';
import '../../modules.js';

registerPool('device.mod.beat', [
  { when: {}, text: [
    '{device.mod.open} {device.mod.integration|cap}.',
    '{device.mod.open} — {device.mod.risk|cap}.',
    '{device.mod.open}. {device.mod.context|cap}.',
  ] },
]);

export function renderDeviceModificationApplied({ student, deviceId, deviceLabel, componentLabel, week = 1, trace = null }) {
  const ctx = buildDeviceSceneContext(student, { deviceId, deviceLabel, componentLabel, week });
  return render('{device.mod.beat}', ctx, { trace });
}
