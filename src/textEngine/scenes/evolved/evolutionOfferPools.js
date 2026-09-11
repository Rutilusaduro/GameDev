// Evolution path offer intros — EVOLUTION_OFFER bridge.
import { registerPool, render } from '../../engine.js';
import { registerDecomposedPool } from '../decomposePools.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { EVOLUTION_OFFER } from '../../../gameData/evolutionUiData.js';
import { INIT_STUDENTS } from '../../../gameData/students.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import { depthNarrativeAppendChance } from '../../../gameData/mechanicsDepthLayer.js';
import { evolutionTailBeat } from './proseTails.js';

function sampleForArchetype(archetype) {
  const row = INIT_STUDENTS.find((s) => s.archetype === archetype);
  return row ? { ...row, lbs: 220, relationship: 65 } : { id: 0, name: 'Resident', archetype, lbs: 220, relationship: 65 };
}

function registerOfferIntro(archetype, prose) {
  const text = (prose || '').trim();
  if (!text) return;
  const poolKey = `evolution.offer.${archetype}.intro`;
  const bodyKey = `${poolKey}.legacyBody`;
  registerDecomposedPool(bodyKey, text);
  const slot = (ctx) => {
    const line = render(`{${bodyKey}}`, ctx)?.trim();
    return line && !line.includes('{unresolved}') ? line : text;
  };
  const seed = archetype;
  registerPool(poolKey, [
    {
      when: { archetype: [archetype] },
      weight: 2,
      priority: 2,
      text: [slot, evolutionTailBeat(seed, 0), evolutionTailBeat(seed, 1)],
    },
    {
      when: {},
      text: [slot, evolutionTailBeat(seed, 0), evolutionTailBeat(seed, 1), evolutionTailBeat(seed, 2)],
    },
  ]);
}

for (const [archetype, offer] of Object.entries(EVOLUTION_OFFER)) {
  if (typeof offer?.intro !== 'function') continue;
  const prose = offer.intro(sampleForArchetype(archetype));
  registerOfferIntro(archetype, prose);
}

export function renderEvolutionOfferIntro(student, week = 1, opts = {}) {
  if (!student?.archetype) return '';
  const offer = EVOLUTION_OFFER[student.archetype];
  if (!offer?.intro) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { featureId: 'evolution_offer', ...(opts.globals || {}) },
    ...opts,
  });
  const poolKey = `evolution.offer.${student.archetype}.intro`;
  let line = '';
  try {
    line = render(`{${poolKey}}`, ctx)?.trim();
  } catch {
    line = '';
  }
  if (!line || line.includes('{unresolved}')) {
    line = String(offer.intro(student)).trim();
  }
  if (!line) return '';
  return appendV2Depth(line, 'evolutionOffer', ctx, opts.v2DepthChance ?? depthNarrativeAppendChance(0.28));
}
