// The Squad — Lead: A4 Architect | Support: A2 Psych, A7 Artisan
// Device catalog + sensation/psych flavor — DEPTH_PLAN §9d device track.
import { registerPool, render, createContext, hasModule } from '../engine.js';
import { DEVICES } from '../../gameData/devices.js';

/** Plain catalog blurbs (search + registration source). Migrated from devices.js desc. */
export const DEVICE_CATALOG_BLURBS = {
  feeding_mask: 'A lab-mounted intake rig with locking harness and calibrated pump — deliberate, mechanical stage advancement.',
  auto_feeder_arm: 'A servo-driven arm that delivers food at a steady mechanical rhythm — feeding without consent or effort.',
  obedience_belt: 'A waist harness wired to compliance cues — shame and dependence climb whenever she hesitates to obey.',
  auto_bloating_belt: 'A reinforced waist harness that slowly but relentlessly bloats the wearer — constant pressure and visible swelling.',
  living_furniture_rig: 'Restraints and reshaping frames that turn a person into functional furniture — fed to stay comfortable.',
  reinforced_legs: 'Braced leg supports that bear furniture-weight loads — keeps a harnessed girl stable while she swells.',
  growth_accelerator_chamber: 'A sealed chamber session that accelerates soft-tissue deposition — warm, pleasurable, and never quite unpredictable.',
  growth_serum_injector: 'One-shot volatile formula delivery — rapid, dramatic, never fully predictable localized growth.',
  endless_hunger_engine: 'A handheld ray that suppresses satiety at range — hunger becomes obsession until she feeds.',
};

const SENSATION = {
  feeding_mask: ['mechanical rhythm at the jaw', 'pump pressure, swallow reflex overridden', 'calibrated intake, harness locked'],
  auto_feeder_arm: ['automated portions arriving on schedule', 'arm cycling, tray after tray', 'set-and-forget fullness building'],
  obedience_belt: ['belt pressure, shame-pleasure dial', 'submission hardware, belly cinched', 'weight belt counting every pound'],
  auto_bloating_belt: ['pressure in, volume out', 'belt cycles, middle swelling', 'inflation rhythm, skin drum-tight'],
  living_furniture_rig: ['furniture-comfort harness', 'immobility as feature, belly presented', 'rig braces and cushions'],
  reinforced_legs: ['braced thighs bearing the load', 'stabilizers creaking under added mass', 'leverage where softness needs support'],
  growth_accelerator_chamber: ['burst magnitude, instability tickling the nerves', 'chamber warmth, scale climbing fast', 'growth surge, breath shallow with change'],
  growth_serum_injector: ['serum heat spreading outward', 'injection site warm, curves answering', 'chemical generosity under the skin'],
  endless_hunger_engine: ['hunger rising like weather', 'appetite friction, distress and want', 'engine hum, stomach insisting'],
};

const CATALOG_MOOD = {
  warm: 'She settles in faster than the manual implies.',
  stressed: 'No polite way to defer once it is active.',
  curious: 'You want to know how far the settings go.',
};

const CATALOG_SEASON = {
  winter: 'Runs warm against winter chill.',
  summer: 'Clings and heats in summer air.',
};

function deviceGlobals(def, extra = {}) {
  const gp = def?.growthProfile || {};
  return {
    deviceId: def.id,
    deviceLabel: def.label,
    growthZone: gp.zoneBias || 'bodyType',
    growthMethod: gp.growthMethod || 'feed',
    deviceSensation: gp.sensation || 'fullness',
    featureId: 'device',
    ...extra,
  };
}

function defaultSubject(name = 'the wearer') {
  return { id: 0, name, first: name.split(' ')[0] || name };
}

for (const [deviceId, def] of Object.entries(DEVICES)) {
  const catalogBase = DEVICE_CATALOG_BLURBS[deviceId] || '';
  const catalogVariants = [{ when: {}, text: [catalogBase] }];

  if (def.form === 'worn' || def.form === 'installed') {
    catalogVariants.push({
      when: { mood: ['warm', 'content'] },
      weight: 2,
      text: [`${catalogBase} ${CATALOG_MOOD.warm}`],
    });
    catalogVariants.push({
      when: { season: ['winter'] },
      weight: 2,
      text: [`${catalogBase} ${CATALOG_SEASON.winter}`],
    });
    catalogVariants.push({
      when: { season: ['summer'] },
      weight: 2,
      text: [`${catalogBase} ${CATALOG_SEASON.summer}`],
    });
  }
  if (def.form === 'campus_tool') {
    catalogVariants.push({
      when: { campusFattening: true },
      weight: 3,
      text: [`${catalogBase} Campus saturation makes hiding the effect harder.`],
    });
  }
  registerPool(`device.catalog.${deviceId}`, catalogVariants);

  const sensationLines = SENSATION[deviceId] || ['device warmth, pressure, fullness building'];
  registerPool(`device.sensation.${deviceId}`, [
    { when: { growthMethod: 'bloat' }, weight: 2, text: sensationLines.map((l) => `${l} — middle volume climbing.`) },
    { when: { growthMethod: 'radiation' }, weight: 2, text: sensationLines.map((l) => `${l} — heat blooming through soft flesh.`) },
    { when: { growthMethod: 'serum' }, weight: 2, text: sensationLines.map((l) => `${l} — chemical generosity under the skin.`) },
    { when: { growthMethod: 'hunger' }, weight: 2, text: sensationLines.map((l) => `${l} — appetite overriding satiety.`) },
    { when: { stageMin: 7 }, weight: 2, text: sensationLines.map((l) => `${l} — mass answering at scale.`) },
    { when: {}, text: sensationLines },
  ]);

  registerPool(`device.psych.${deviceId}`, [
    { when: { corruption: [0], mood: ['nervous', 'stressed'] }, weight: 3, text: [
      'She stiffens — novelty and nerves, then curious compliance anyway.',
      'Uncertainty flickers; the device does not wait for her courage.',
    ] },
    { when: { corruption: [0] }, text: [
      'She stiffens at first — novelty, nerves, then curious compliance.',
      'Uncertainty flickers; the device keeps working anyway.',
    ] },
    { when: { corruption: [1], mood: ['warm', 'content'] }, weight: 3, text: [
      'Familiar appetite meets hardware — she breathes around the rhythm, almost grateful.',
      'Compliance settles in; the sensation feels earned, not imposed.',
    ] },
    { when: { corruption: [1] }, text: [
      'Familiar appetite meets hardware — she stops fighting the rhythm.',
      'Compliance settles in; she breathes around the sensation.',
    ] },
    { when: { corruption: [2] }, text: [
      'She welcomes the cycle — proud, open, hungry for more.',
      'Shame optional; want is not.',
    ] },
    { when: { mood: ['focused', 'excited'] }, weight: 2, text: [
      'She tracks the sensation clinically — body learning the machine on purpose.',
    ] },
    { when: {}, text: ['She adjusts to the sensation — body learning the machine.'] },
  ]);
}

/** Catalog blurb for blueprints/inventory (no student required). */
export function renderDeviceCatalogDesc(deviceId, student = null, week = 1, opts = {}) {
  const id = deviceId && DEVICES[deviceId] ? deviceId : 'feeding_mask';
  const key = `device.catalog.${id}`;
  if (!hasModule(key)) return DEVICE_CATALOG_BLURBS[id] || '';
  const def = DEVICES[id];
  const ctx = createContext({
    subject: student || defaultSubject(),
    week,
    globals: deviceGlobals(def, opts.globals),
    ...opts,
  });
  return render(`{${key}}`, ctx, { trace: opts.trace || null })?.trim() || DEVICE_CATALOG_BLURBS[id] || '';
}

/** Runtime sensation + psych beat when a device is active on a student. */
export function renderDeviceFlavor(deviceId, student, week = 1, opts = {}) {
  if (!student) return renderDeviceCatalogDesc(deviceId, null, week, opts);
  const id = deviceId && DEVICES[deviceId] ? deviceId : 'feeding_mask';
  const def = DEVICES[id];
  const ctx = createContext({
    subject: student,
    week,
    globals: deviceGlobals(def, opts.globals),
    ...opts,
  });
  const line = render(`{device.sensation.${id}} {device.psych.${id}}`, ctx, { trace: opts.trace || null });
  return line?.trim() || '';
}

/** Search helper — stable catalog text for deviceQuery filters. */
export function getDeviceCatalogSearchText(deviceId) {
  return DEVICE_CATALOG_BLURBS[deviceId] || DEVICES[deviceId]?.label || deviceId || '';
}
