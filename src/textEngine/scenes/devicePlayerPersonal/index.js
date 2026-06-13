// ═══════════════════════════════════════════════════════════════
// SCENE: DEVICE PLAYER PERSONAL — Professor self-equipped rigs
// ═══════════════════════════════════════════════════════════════
import { registerPool, render } from '../../engine.js';
import { buildDeviceSceneContext } from '../device/context.js';
import './fragments.js';
import '../../modules.js';

registerPool('device.player.beat', [
  { when: { targetType: 'self' }, text: [
    '{device.player.wear} {device.player.sensation|cap}.',
    '{device.player.wear} — {device.player.risk|cap}.',
    '{device.player.wear}. {device.player.context|cap}.',
  ] },
  { when: {}, text: [
    '{device.player.wear} {device.player.context|cap}.',
    '{device.player.wear} — {device.player.sensation|cap}.',
    '{device.player.wear}. {device.player.risk|cap}.',
  ] },
]);

export function renderDevicePlayerSelf({ student, deviceId, deviceLabel, week = 1, trace = null }) {
  const ctx = buildDeviceSceneContext(student, { deviceId, deviceLabel, week, targetType: 'self' });
  return render('{device.player.beat}', ctx, { trace });
}
