// The Squad — Lead: A2 Psych | Support: A4 Architect
// Lilith hunt location + target flavor — from gameData/lilith.js (DEPTH_PLAN §9d).
import { registerPool, render, createContext } from '../../engine.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import { HUNT_NODES, HUNT_MEN } from '../../../gameData/lilith.js';
import './feastStageUp.js';
import '../proseOverhaulPass2.js';
import '../proseOverhaulPass3.js';

export { renderLilithFeast, renderLilithDeliveryIntro } from './feastStageUp.js';

const NODE_EXTRA = {
  dorm: [
    'Incense in the corridor. Her door stays a little open. The hunt starts at home.',
    'Quiet floor, closed doors, one hallway that already knows her step.',
  ],
  quad: [
    'Open grass. Nobody looks up. Cover lives in the looking-away.',
    'Diagonal paths, gossip, cover. She crosses like weather.',
  ],
  dining_hall: [
    'Tray clatter covers approach. Garlic bread covers everything else.',
    'They eat and do not watch. She watches and does eat.',
  ],
  dorm_row: [
    'Propped doors. Music. Boys drifting in like they own the hour.',
    'Laundry smell, hallway traffic, witnesses who will not stay.',
  ],
  crossroads: [
    'A bench and a choice. People pause. She does not.',
    'Forked paths. She waits where indecision sits down.',
  ],
  gym: [
    'Glass, sweat, mirrors. Vanity is already looking for her.',
    'Effort on display. She gives it a better audience.',
  ],
  library: [
    'Page-turns. Focused faces. The ones who look up are already hers.',
    'Quiet floors. Curiosity is louder than the hush.',
  ],
  frat_row: [
    'Bass through two houses. Favorable numbers. Brittle confidence.',
    'Night on the row. Hosts dressed as prey and they do not know it.',
  ],
  coffee_shop: [
    'Exposed brick, loud playlist, lukewarm charm.',
    'Laptops as shields. She walks past the shield.',
  ],
  campus_park: [
    'Pond loop. Runners. Readers who think solitude is real.',
    'Partial peace. She finishes the solitude for them.',
  ],
  admin: [
    'Ties, carpet, the need to seem important.',
    'Hushed ambition. Fragility in professional clothes.',
  ],
};

const MAN_EXTRA = {
  chad_w: [
    'Polo half-tucked. Easy grin. He thinks he chose this.',
    'Frat polish. Automatic charm. The charm has no plan.',
  ],
  tyler_b: [
    'Shaker in hand. Mirror mid-rep. Ego already working for her.',
    'Post-workout flush. Vanity bright enough to follow.',
  ],
  zack_m: [
    'Three semesters of café eyes. He finally thinks he qualifies.',
    'Latte, laptop, performed depth. Interest without imagination.',
  ],
  marcus_w: [
    'Earbuds in. Stride locked. She will have to pull him out.',
    'He runs to outrun thought. Distraction is the opening.',
  ],
  derek_o: [
    'Mid-bite with friends. Social noise, not a wall.',
    'Table full of laugh. Holding his gaze past the group takes work.',
  ],
  noah_k: [
    'Two doors down. Shy eyes that stopped looking away.',
    'He freezes in hallways. Shyness opens inward if she waits.',
  ],
  jason_p: [
    'Pen hovering. Second glance hidden and not hidden enough.',
    'Library focus broken by a look he will not admit.',
  ],
  ryan_w: [
    'Badge lanyard. Practiced authority. Control worth taking.',
    'Professional veneer over nerves. Interesting when it cracks.',
  ],
  connor_b: [
    'Used to being the most confident in any room. Edges already thin.',
    'Presidential ease that stutters when he sees her properly.',
  ],
  ethan_c: [
    'Uniform. Routine patrol. Authority that imagines itself untouchable.',
    'He clocks her approach. Suspicion fades before the sentence ends.',
  ],
  brendan_m: [
    'He felt her before he saw her. The air changed first.',
    'Confidence falters mid-sentence. Her scale rewrites the room.',
  ],
  prof_hayes: [
    'Office hours. A closed door. Curiosity dressed as concern.',
    'He meant to ask a question. Appetite answered first.',
  ],
  danny_d: [
    'Delivery bag still warm. He kept the extra tray.',
    'Doorway, receipt, a boy who did not leave fast enough.',
  ],
  owen_k: [
    'Closing-shift apron. Leftover tray still warm.',
    'Night cook, scraping nothing. The tray was already spoken for.',
  ],
};

for (const [nodeId, node] of Object.entries(HUNT_NODES)) {
  const extra = NODE_EXTRA[nodeId] || ['The hunt waits here.', 'She chooses her ground.'];
  registerPool(`hunt.node.${nodeId}`, [
    { when: { stageMin: 7 }, weight: 2, text: [node.desc, extra[0]] },
    { when: {}, text: [node.desc, extra[0], extra[1]] },
  ]);
}

for (const man of HUNT_MEN) {
  const stages = [3, 5, 7, 9];
  const extras = MAN_EXTRA[man.id] || ['He looks up too late.', 'She already decided.'];
  const variants = stages.map((stage) => {
    const text = typeof man.desc === 'function' ? man.desc(stage) : man.desc;
    return { when: { stageMin: stage, stageMax: stage + 1 }, text: [text] };
  });
  const base = typeof man.desc === 'function' ? man.desc(3) : man.desc;
  variants.push({ when: {}, text: [base, extras[0], extras[1]] });
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
