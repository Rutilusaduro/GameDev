// ═══════════════════════════════════════════════════════════════
// SCENE: DEVICE CAMPUS USE — remote / NPC / group targeting
// ═══════════════════════════════════════════════════════════════
import { registerPool, render } from '../../engine.js';
import { buildDeviceSceneContext } from '../device/context.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import './fragments.js';
import '../../modules.js';

registerPool('device.campus.beat', [
  { when: { targetType: 'npc_random' }, text: [
    '{device.campus.remote} {device.campus.discovery|cap}.',
    '{device.campus.remote} — {device.campus.risk|cap}.',
  ] },
  { when: { targetType: 'group_hall' }, text: [
    '{device.campus.hall} {device.campus.discovery|cap}.',
    '{device.campus.hall}. {device.campus.risk|cap}.',
  ] },
  { when: {}, text: [
    '{device.campus.remote} {device.campus.risk|cap}.',
    '{device.campus.remote} — {device.campus.discovery|cap}.',
    '{device.campus.remote}. {device.campus.context|cap}.',
  ] },
]);

export function renderDeviceCampusUseLine({ student, deviceId, deviceLabel, targetType = 'student', week = 1, trace = null }) {
  const ctx = buildDeviceSceneContext(student, { deviceId, deviceLabel, targetType, week });
  const base = render('{device.campus.beat}', ctx, { trace });
  return appendV2Depth(base, 'device', ctx, 0.3);
}
