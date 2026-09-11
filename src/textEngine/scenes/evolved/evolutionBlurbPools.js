// Evolution button blurb (roster card) — EVOLUTION_BUTTON_BLURB bridge.
import { registerPool, render } from '../../engine.js';
import { registerDecomposedPool } from '../decomposePools.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { EVOLUTION_BUTTON_BLURB } from '../../../gameData/evolvedForms.js';
import { INIT_STUDENTS } from '../../../gameData/students.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import { depthNarrativeAppendChance } from '../../../gameData/mechanicsDepthLayer.js';

function sampleForArchetype(archetype) {
  const row = INIT_STUDENTS.find((s) => s.archetype === archetype);
  return row ? { ...row, lbs: 240, relationship: 62 } : { id: 0, name: 'Resident', archetype, lbs: 240, relationship: 62 };
}

function registerBlurb(archetype, prose) {
  const text = (prose || '').trim();
  if (!text) return;
  const poolKey = `evolution.blurb.${archetype}`;
  const bodyKey = `${poolKey}.legacyBody`;
  registerDecomposedPool(bodyKey, text);
  const slot = (ctx) => {
    const line = render(`{${bodyKey}}`, ctx)?.trim();
    return line && !line.includes('{unresolved}') ? line : text;
  };
  registerPool(poolKey, [
    { when: { archetype: [archetype] }, weight: 2, priority: 2, text: [slot, slot] },
    { when: {}, text: [slot, slot, slot] },
  ]);
}

for (const [archetype, fn] of Object.entries(EVOLUTION_BUTTON_BLURB)) {
  if (typeof fn !== 'function') continue;
  registerBlurb(archetype, fn(sampleForArchetype(archetype)));
}

export function renderEvolutionButtonBlurb(student, week = 1, opts = {}) {
  if (!student?.archetype) return '';
  const fn = EVOLUTION_BUTTON_BLURB[student.archetype];
  if (!fn) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { featureId: 'evolution_blurb', ...(opts.globals || {}) },
    ...opts,
  });
  const poolKey = `evolution.blurb.${student.archetype}`;
  let line = '';
  try {
    line = render(`{${poolKey}}`, ctx)?.trim();
  } catch {
    line = '';
  }
  if (!line || line.includes('{unresolved}')) {
    line = String(fn(student)).trim();
  }
  if (!line) return '';
  return appendV2Depth(line, 'evolutionBlurb', ctx, opts.v2DepthChance ?? depthNarrativeAppendChance(0.24));
}
