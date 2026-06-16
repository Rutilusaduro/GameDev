// The Squad — Lead: A4 Architect | Support: A2 Psych
// Device catalog sensation/psych flavor — supplements devices.js descs (DEPTH_PLAN §9d).
import { registerPool, render, createContext } from '../engine.js';
import { DEVICES } from '../../gameData/devices.js';

const SENSATION = {
  feeding_mask: ['mechanical rhythm at the jaw', 'pump pressure, swallow reflex overridden', 'calibrated intake, harness locked'],
  auto_feeder_arm: ['automated portions arriving on schedule', 'arm cycling, tray after tray', 'set-and-forget fullness building'],
  living_furniture_rig: ['furniture-comfort harness', 'immobility as feature, belly presented', 'rig braces and cushions'],
  growth_accelerator_chamber: ['burst magnitude, instability tickling the nerves', 'chamber warmth, scale climbing fast', 'growth surge, breath shallow with change'],
  growth_serum_injector: ['serum heat spreading outward', 'injection site warm, curves answering', 'chemical generosity under the skin'],
  endless_hunger_engine: ['hunger rising like weather', 'appetite friction, distress and want', 'engine hum, stomach insisting'],
  obedience_weight_belt: ['belt pressure, shame-pleasure dial', 'submission hardware, belly cinched', 'weight belt counting every pound'],
  bloating_belt: ['pressure in, volume out', 'belt cycles, middle swelling', 'inflation rhythm, skin drum-tight'],
  paste_printer: ['paste warmth, obscene calorie density', 'printer whir, nozzle feeding', 'synthetic richness on the tongue'],
  redistribution_rig: ['silhouette sculpted, center of gravity shifting', 'curves reassigned, body learning new balance', 'rig calibration, pear or hourglass chosen'],
};

for (const [deviceId, def] of Object.entries(DEVICES)) {
  const lines = SENSATION[deviceId] || [def.desc || 'device sensation, warmth, fullness'];
  registerPool(`device.sensation.${deviceId}`, [
    { when: { stageMin: 7 }, weight: 2, text: lines.map((l) => `${l} — mass answering at scale.`) },
    { when: {}, text: lines },
  ]);
  registerPool(`device.psych.${deviceId}`, [
    { when: { corruption: [0] }, text: [
      'She stiffens at first — novelty, nerves, then curious compliance.',
      'Uncertainty flickers; the device keeps working anyway.',
    ] },
    { when: { corruption: [1] }, text: [
      'Familiar appetite meets hardware — she stops fighting the rhythm.',
      'Compliance settles in; she breathes around the sensation.',
    ] },
    { when: { corruption: [2] }, text: [
      'She welcomes the cycle — proud, open, hungry for more.',
      'Shame optional; want is not.',
    ] },
    { when: {}, text: ['She adjusts to the sensation — body learning the machine.'] },
  ]);
}

/** Render device sensation + psych beat for a device id. */
export function renderDeviceFlavor(deviceId, student, week = 1, opts = {}) {
  if (!student) return '';
  const id = deviceId && DEVICES[deviceId] ? deviceId : 'feeding_mask';
  const line = render(`{device.sensation.${id}} {device.psych.${id}}`, createContext({ subject: student, week, ...opts }));
  return line?.trim() || '';
}
