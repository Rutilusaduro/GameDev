// ═══════════════════════════════════════════════════════════════
// SCENE: DEVICE UNIQUE INTERACTION — combo / mod flavor beats
// ═══════════════════════════════════════════════════════════════
import { registerPool, render } from '../../engine.js';
import { buildDeviceSceneContext } from '../device/context.js';
import './fragments.js';
import '../../modules.js';

registerPool('device.unique.beat', [
  { when: {}, text: [
    '{device.unique.open} {device.unique.synergy|cap}.',
    '{device.unique.open} — {device.unique.sensation|cap}.',
    '{device.unique.open}. {device.unique.context|cap}.',
  ] },
]);

export function renderDeviceUniqueInteraction({ student, deviceId, deviceLabel, uniqueTag, week = 1, trace = null }) {
  const ctx = buildDeviceSceneContext(student, { deviceId, deviceLabel, uniqueTag, week });
  return render('{device.unique.beat}', ctx, { trace });
}
