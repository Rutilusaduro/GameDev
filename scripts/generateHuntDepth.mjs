// Generate hunt/depth.js — pad hunt.node + hunt.man wildcard pools to ≥3 texts.
// Run: node scripts/generateHuntDepth.mjs
// Note: hunt.feast.* monoliths intentionally single-text (author-approved).
import { writeFileSync } from 'fs';
import { HUNT_NODES, HUNT_MEN } from '../src/gameData/lilith.js';

const NODE_ALT = {
  dorm: [
    'Incense threads the narrow hall outside her door — private, shadowed, the safest hunting ground she keeps.',
    'Her dorm corridor smells of smoke and secrets; footsteps echo soft against closed doors.',
  ],
  quad: [
    'The quad spreads open under sky and gossip — diagonal paths, distracted students, easy cover.',
    'Grass and crossing paths; everyone moving through without really seeing each other.',
  ],
  dining_hall: [
    'Institutional light, tray clatter, garlic bread in the air — hunger everywhere, attention elsewhere.',
    'The dining hall hums with distraction; plates and chatter make approach easy.',
  ],
  dorm_row: [
    'Residence halls in a long row — propped doors, hallway music, boys drifting in and out.',
    'Dorm row smells like laundry and ambition; traffic steady, witnesses scarce.',
  ],
  crossroads: [
    'The crossroads bench holds indecision — bikes, split paths, people pausing before they choose.',
    'Where paths fork: a bench, a rack, the charged stillness of someone deciding where next.',
  ],
  gym: [
    'Glass walls, exertion, vanity on display — men already performing before she arrives.',
    'The gym smells of effort; mirrors everywhere, confidence ripe for redirecting.',
  ],
  library: [
    'Quiet stacks, focused faces — the ones who look up are already halfway hers.',
    'Library hush broken only by page turns; attention is a gift she knows how to take.',
  ],
  frat_row: [
    'Music from two houses, favorable ratios, the brittle confidence of boys who never doubt.',
    'Frat row at night — bass through walls, laughter, prey dressed as hosts.',
  ],
  coffee_shop: [
    'Exposed brick, loud playlists, men performing interest over lukewarm drinks.',
    'The café thrums with performed charm; almost-interesting targets abound.',
  ],
  campus_park: [
    'A pond loop, runners and readers — solitude that is only ever partial.',
    'Campus park pretends at peace; solitary figures are never as alone as they think.',
  ],
  admin: [
    'Hushed admin corridors — ties, ambition, the fragility of men who need to seem important.',
    'Institutional carpet and quiet authority; prey dressed in professionalism.',
  ],
};

const MAN_EARLY = {
  'Frat Bro': [
    'Polo half-tucked, easy grin — confidence of someone who has never had to earn attention.',
    'Frat-row polish and automatic charm; he thinks he is choosing.',
  ],
  'Gym Bro': [
    'Post-workout flush, shaker in hand — vanity bright and useful.',
    'He checks the mirror mid-rep; ego makes the approach simple.',
  ],
  'Coffee Regular': [
    'Three semesters of café eye contact — he finally thinks he qualifies.',
    'Latte, laptop, performed depth; interest without imagination.',
  ],
  'Campus Runner': [
    'Earbuds in, stride locked — you will have to pull him out of his head.',
    'He runs to outrun thought; distraction is the opening.',
  ],
  'Dining Regular': [
    'Mid-bite, mid-laugh with friends — social friction to overcome, not impossible.',
    'Table full of noise; holding his gaze past the group takes work.',
  ],
  'The Quiet One': [
    'Two doors down — shy eyes that always looked away until they did not.',
    'He freezes in hallways; shyness opens inward if you push right.',
  ],
  'Study Nerd': [
    'Pen hovering, second glance hidden — the look he did not want you to see.',
    'Library focus broken by curiosity he will not admit.',
  ],
  'Graduate TA': [
    'Badge lanyard, practiced authority — control worth taking from someone.',
    'Professional veneer over nerves; interesting when it cracks.',
  ],
  'Frat President': [
    'Used to being the most confident in any room — brittle at the edges.',
    'Presidential ease that stutters when he sees her properly.',
  ],
  'Campus Security': [
    'Uniform, routine patrol — authority that imagines itself untouchable.',
    'He clocks her approach with procedural suspicion already fading.',
  ],
};

const MAN_LATE = [
  'He felt her before he saw her — something in the air changed when she entered.',
  'His confidence falters mid-sentence; her scale rewrites the room.',
  'He stopped pretending not to watch; it is too late to look away.',
  'Nervous system already decided; he just has not admitted it yet.',
];

function esc(s) {
  return JSON.stringify(s);
}

const lines = [
  '// The Squad — Lead: A2 Psych | Support: A4 Architect',
  '// Auto-generated — run: node scripts/generateHuntDepth.mjs',
  '// Wildcard depth for hunt.node + hunt.man pools (Pass 30).',
  "import { registerModuleVariants } from '../../engine.js';",
  '',
];

for (const [nodeId, node] of Object.entries(HUNT_NODES)) {
  const alts = NODE_ALT[nodeId] || [
    `${node.label} — ${node.desc.split('.')[0]}.`,
    `At ${node.label.toLowerCase()}, the hunt feels inevitable.`,
  ];
  lines.push(`registerModuleVariants('hunt.node.${nodeId}', [{ when: {}, text: [${alts.map(esc).join(', ')}] }]);`);
}

for (const man of HUNT_MEN) {
  const bank = MAN_EARLY[man.tag] || MAN_LATE;
  const [a, b] = bank.length >= 2 ? bank : [bank[0], MAN_LATE[0]];
  lines.push(`registerModuleVariants('hunt.man.${man.id}', [{ when: {}, text: [${esc(a)}, ${esc(b)}] }]);`);
}

writeFileSync('src/textEngine/scenes/hunt/depth.js', `${lines.join('\n')}\n`);
console.log(`generateHuntDepth: ${Object.keys(HUNT_NODES).length} nodes, ${HUNT_MEN.length} men → src/textEngine/scenes/hunt/depth.js`);
