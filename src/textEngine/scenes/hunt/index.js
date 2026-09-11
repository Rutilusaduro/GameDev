// The Squad — Lead: A2 Psych | Support: A4 Architect
// Lilith hunt location + target flavor — from gameData/lilith.js (DEPTH_PLAN §9d).
import { registerPool, render, createContext } from '../../engine.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import { HUNT_NODES, HUNT_MEN } from '../../../gameData/lilith.js';
import './feastStageUp.js';
import '../proseOverhaulPass2.js';
import '../proseOverhaulPass3.js';

export { renderLilithFeast, renderLilithDeliveryIntro } from './feastStageUp.js';

for (const [nodeId, node] of Object.entries(HUNT_NODES)) {
  registerPool(`hunt.node.${nodeId}`, [
    { when: { stageMin: 7 }, weight: 2, text: [node.desc] },
    { when: {}, text: [node.desc] },
  ]);
}

for (const man of HUNT_MEN) {
  const stages = [3, 5, 7, 9];
  const variants = stages.map((stage) => {
    const text = typeof man.desc === 'function' ? man.desc(stage) : man.desc;
    return { when: { stageMin: stage, stageMax: stage + 1 }, text: [text] };
  });
  variants.push({ when: {}, text: [typeof man.desc === 'function' ? man.desc(3) : man.desc] });
  registerPool(`hunt.man.${man.id}`, variants);
}

export function renderHuntNode(nodeId, student, week = 1, opts = {}) {
  if (!nodeId || !student) return '';
  const key = HUNT_NODES[nodeId] ? `hunt.node.${nodeId}` : 'hunt.node.quad';
  const ctx = createContext({ subject: student, week, ...opts });
  const base = render(`{${key}}`, ctx)?.trim() || '';
  const glow = render('{hunt.afterglow}', ctx)?.trim() || '';
  const linger = render('{hunt.linger}', ctx)?.trim() || '';
  return appendV2Depth([base, glow, linger].filter(Boolean).join('\n\n'), 'hunt', ctx, opts.v2DepthChance ?? 0.28);
}

export function renderHuntTarget(targetId, student, week = 1, opts = {}) {
  if (!student) return '';
  const man = HUNT_MEN.find((m) => m.id === targetId);
  const key = man ? `hunt.man.${man.id}` : 'hunt.man.chad_w';
  const ctx = createContext({ subject: student, week, ...opts });
  const base = render(`{${key}}`, ctx)?.trim() || '';
  const glow = render('{hunt.afterglow}', ctx)?.trim() || '';
  const linger = render('{hunt.linger}', ctx)?.trim() || '';
  return appendV2Depth([base, glow, linger].filter(Boolean).join('\n\n'), 'hunt', ctx, opts.v2DepthChance ?? 0.28);
}

import './depth.js';
