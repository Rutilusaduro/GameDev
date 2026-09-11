// Dinner immobile redirect — IMMOBILE_REDIRECT bridge.
import { registerPool, render } from '../../engine.js';
import { registerDecomposedPool } from '../decomposePools.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { IMMOBILE_REDIRECT } from '../../../gameData/students.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import { privateSessionV2DepthChance } from '../../../gameData/sessionTextDepth.js';
import { immobileRedirectTailBeat } from '../evolved/proseTails.js';

function registerRedirect(poolKey, prose, seed = poolKey) {
  const text = (prose || '').trim();
  if (!text) return;
  const bodyKey = `${poolKey}.legacyBody`;
  registerDecomposedPool(bodyKey, text);
  const slot = (ctx) => {
    const line = render(`{${bodyKey}}`, ctx)?.trim();
    return line && !line.includes('{unresolved}') ? line : text;
  };
  registerPool(poolKey, [
    {
      when: {},
      weight: 3,
      text: [
        slot,
        immobileRedirectTailBeat(seed, 0),
        immobileRedirectTailBeat(seed, 1),
        immobileRedirectTailBeat(seed, 2),
      ],
    },
  ]);
}

for (const [studentId, tiers] of Object.entries(IMMOBILE_REDIRECT)) {
  if (!tiers || typeof tiers !== 'object') continue;
  for (const [tier, prose] of Object.entries(tiers)) {
    registerRedirect(`session.immobile.s${studentId}.${tier}`, prose, `${studentId}:${tier}`);
  }
}

export function renderImmobileRedirect(student, tier = 'blob', week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { featureId: 'immobile_redirect', immobileTier: tier, ...(opts.globals || {}) },
    ...opts,
  });
  const entry = IMMOBILE_REDIRECT[student.id];
  const poolKey = entry?.[tier] ? `session.immobile.s${student.id}.${tier}` : '';
  let line = '';
  if (poolKey) {
    try {
      line = render(`{${poolKey}}`, ctx)?.trim();
    } catch {
      line = '';
    }
  }
  if (!line || line.includes('{unresolved}')) {
    line = entry?.[tier] || '';
  }
  if (!line) {
    return `${student.name} can't go anywhere anymore. You'll have to bring the food to her.`;
  }
  return appendV2Depth(line, 'immobileRedirect', ctx, privateSessionV2DepthChance(0.22));
}
