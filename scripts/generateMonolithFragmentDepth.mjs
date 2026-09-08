// Generate monolith fragment depth — pad anonymous _N.fM pools to ≥3 texts.
// Run: node scripts/generateMonolithFragmentDepth.mjs
import { writeFileSync } from 'fs';

// Load full registry (side-effect registration).
await import('../src/textEngine/scenes/index.js');
const { _registryEntries } = await import('../src/textEngine/engine.js');

const FRAG_MAX = 200;

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pick2(bank, seed) {
  const n = bank.length;
  if (n < 2) return [bank[0], bank[0]];
  const i0 = seed % n;
  let i1 = (seed * 7 + 3) % n;
  if (i1 === i0) i1 = (i0 + 1) % n;
  return [bank[i0], bank[i1]];
}

function esc(s) {
  return JSON.stringify(s);
}

function getTexts(variants) {
  const out = [];
  for (const v of variants) {
    const arr = Array.isArray(v.text) ? v.text : [v.text];
    for (const s of arr) if (typeof s === 'string') out.push(s);
  }
  return out;
}

const entries = [..._registryEntries()];

// Map fragment -> parent pool keys.
const parentMap = new Map();
for (const [pkey, variants] of entries) {
  for (const v of variants) {
    const arr = Array.isArray(v.text) ? v.text : [v.text];
    for (const s of arr) {
      if (typeof s !== 'string') continue;
      for (const m of s.matchAll(/\{_(\d+)\.f(\d+)\}/g)) {
        const fk = `_${m[1]}.f${m[2]}`;
        if (!parentMap.has(fk)) parentMap.set(fk, new Set());
        parentMap.get(fk).add(pkey);
      }
    }
  }
}

function primaryParent(fragKey) {
  const parents = [...(parentMap.get(fragKey) || [])];
  if (!parents.length) return '';
  parents.sort((a, b) => a.length - b.length);
  return parents[0];
}

function fragRole(fragKey) {
  const m = fragKey.match(/^_\d+\.f(\d+)$/);
  const idx = m ? Number(m[1]) : 0;
  const base = fragKey.replace(/\.f\d+$/, '');
  let max = idx;
  for (const [k] of entries) {
    if (k.startsWith(`${base}.f`)) {
      const fm = k.match(/\.f(\d+)$/);
      if (fm) max = Math.max(max, Number(fm[1]));
    }
  }
  if (max === 0) return 'only';
  if (idx === 0) return 'open';
  if (idx === max) return 'close';
  if (idx <= max / 2) return 'mid';
  return 'late';
}

const BANKS = {
  cult_harvest_planned: {
    open: [
      'You watch from the doorway as {subject.name} arrives for the scheduled tasting.',
      'The apartment is warm when {subject.name} steps inside for the planned session.',
      '{subject.name} arrives on schedule — soft, fattened, expecting another tasting.',
    ],
    mid: [
      'Reneé greets her with clinical precision from reinforced seating.',
      'Reneé moves with deliberate care, guiding events toward their planned end.',
      'No extra preparation required — months of feeding were the only recipe.',
    ],
    late: [
      'Reneé consumes the softened tester with methodical focus.',
      'She takes every cultivated pound with satisfied precision.',
      'The harvest proceeds exactly as logged in advance.',
    ],
    close: [
      'Reneé sits fuller afterward, logging the transfer with flour-dusted hands.',
      '{subject.name} is gone. Reneé records the yield, belly heavier, expression calm.',
      'The kitchen feels slightly more crowded around her expanded middle.',
    ],
  },
  cult_harvest_emergency: {
    open: [
      'Mid-session suspicion spikes — {subject.name} bolts for the door.',
      'During the tasting {subject.name} panics and lunges toward the exit.',
      'Halfway through feeding, alarm hits and {subject.name} tries to flee.',
    ],
    mid: [
      'Reneé blocks the exit and pulls her back — irritation sharpening her focus.',
      'Reneé corners the tester with her bulk and pins her in place.',
      'The scramble is brief; resistance fades into stillness.',
    ],
    late: [
      'She devours the yield with hurried but competent bites.',
      'Emergency consumption: messy timing, complete integration.',
      'Reneé finishes the harvest despite the lost control.',
    ],
    close: [
      'Reneé sits heavier, logging the suboptimal timing without sentiment.',
      'The kitchen shows small signs of disruption. Data recorded anyway.',
      'Irritation visible beneath satisfaction — yield secured, schedule ruined.',
    ],
  },
  cult_digest: {
    open: [
      'Shortly after devouring {subject.name}, Reneé rests in her apartment.',
      'The feast complete, Reneé processes the integration with clinical calm.',
      'Warm kitchen holds her as the new mass begins to settle.',
    ],
    mid: [
      'Her belly hangs fuller; hips widen as pounds distribute evenly.',
      'Furniture groans softly while she breathes through the addition.',
      'Hands rest on her middle — metabolic work, unhurried and precise.',
    ],
    late: [
      'She logs observations with slightly altered handwriting.',
      'The apartment feels smaller around her rounder frame.',
      'Everything integrates as it should; the data pleases her.',
    ],
    close: [
      'Calm satisfaction: the cycle performed correctly.',
      'She offers brief notes on mass distribution without emotion.',
      'Processing continues — warm, heavy, entirely expected.',
    ],
  },
  cult_growth: {
    open: [
      'Reneé feels the new weight settle immediately after harvest.',
      'The addition lands in waves across belly, hips, and thighs.',
      'She pauses to register how much larger she has become.',
    ],
    mid: [
      'Reinforced furniture groans as mass redistributes.',
      'She reaches for her notebook with clinical detachment.',
      'Movement costs more attention now; the data is still correct.',
    ],
    late: [
      'The kitchen feels narrower around her softer hips.',
      'She tests range of motion and finds it acceptable for the scale.',
      'Hands trace expanded curves — professional interest, quiet approval.',
    ],
    close: [
      'This is correct data. Professional satisfaction intact.',
      'The cycle ran as designed; she is pleased with the result.',
      'Everything feels metabolically right.',
    ],
  },
  cult_stageup: [
    '{subject.name} arrives wearing different clothes — old ones failed around the middle.',
    'She mentions the weight like logistics, not confession. Appetite improved.',
    'More of her to settle into chairs now. She eats without being asked.',
  ],
  cult_recruitment: [
    'Reneé reads appetite the way others read tells — return visits, empty dishes, hesitant seconds.',
    'She keeps a short list of names. Someone on it is ready to be chosen.',
    'The ones who say "I probably shouldn\'t" and then do anyway interest her most.',
  ],
  settle_care: [
    'Cool cloth along a warm fold. She exhales into the tending.',
    'Pillow shifted beneath heavy hip — small correction, large relief.',
    'You map the geography of maintaining her at this scale.',
  ],
  settle_feed: [
    'She opens toward each piece with unhurried, present appetite.',
    'Food disappears steadily — patient pleasure, no reason to rush.',
    'The spread yields piece by piece to comfortable hunger at scale.',
  ],
  settle_gossip: [
    'You bring the week; she sorts it from the warm center of the room.',
    'Campus news delivered like tribute. She weighs each piece patiently.',
    'Distance clarifies everything. Her verdict becomes the answer.',
  ],
  settle_confide: [
    'You tell her something real. She receives it without rushing to fix.',
    'Stillness makes confession easier — fixed point, calm immensity.',
    'Whatever you bring stays in this room. She holds it carefully.',
  ],
  opp_hearing: [
    'Vance opens with documentation — abundance framed as institutional concern.',
    'Photos fill the screen. {subject.name} stays seated, warm and unapologetic.',
    'The Board performs worry while your girl performs hunger.',
  ],
  wi: [
    'The scale groans softly as weight settles across the platform.',
    'Numbers climb; fabric strains where softness insists.',
    'She breathes through the reading — pleased, present, unashamed.',
  ],
  talk: [
    'She takes the words in without deflecting a single one.',
    'Something settles when truth is finally said aloud.',
    'Her expression shifts — small, real, impossible to perform.',
  ],
  generic: [
    'Warmth and weight settle between you — unhurried, present, real.',
    'The moment deepens; neither of you suggests stopping.',
    'Soft flesh yields; she exhales, pleased and patient.',
    'Contact sharpens by degrees until want is the only language left.',
    'She stays where she is — vast, warm, willing to be felt.',
  ],
};

function sceneKey(parent) {
  if (parent.startsWith('cultivator.harvest.planned')) return 'cult_harvest_planned';
  if (parent.startsWith('cultivator.harvest.emergency')) return 'cult_harvest_emergency';
  if (parent.startsWith('cultivator.digest')) return 'cult_digest';
  if (parent.startsWith('cultivator.growth')) return 'cult_growth';
  if (parent.startsWith('cultivator.stageUp')) return 'cult_stageup';
  if (parent === 'cultivator.recruitment') return 'cult_recruitment';
  if (parent.startsWith('set.care.tend')) return 'settle_care';
  if (parent.startsWith('set.feed.')) return 'settle_feed';
  if (parent.startsWith('set.socialize.gossip')) return 'settle_gossip';
  if (parent.startsWith('set.socialize.confide')) return 'settle_confide';
  if (parent.startsWith('opposition.hearing')) return 'opp_hearing';
  if (parent.startsWith('wi.') || parent.includes('weigh')) return 'wi';
  if (parent.startsWith('talk.')) return 'talk';
  return 'generic';
}

function outputFile(parent) {
  if (parent.startsWith('cultivator.')) return 'cultivator';
  if (parent.startsWith('set.')) return 'settling';
  if (parent.startsWith('opposition.')) return 'opposition';
  return 'global';
}

function altsFor(fragKey, existing) {
  const parent = primaryParent(fragKey);
  const sk = sceneKey(parent);
  const role = fragRole(fragKey);
  const seed = hash(`${fragKey}:${existing.slice(0, 80)}`);

  let bank;
  const sceneBank = BANKS[sk];
  if (Array.isArray(sceneBank)) bank = sceneBank;
  else if (sceneBank?.[role]) bank = sceneBank[role];
  else if (sceneBank?.mid) bank = sceneBank.mid;
  else bank = BANKS.generic;

  const [a, b] = pick2(bank, seed);
  const alts = [];
  for (const line of [a, b]) {
    if (line !== existing && line.length <= FRAG_MAX && !alts.includes(line)) alts.push(line);
  }
  if (alts.length < 2) {
    const [c, d] = pick2(BANKS.generic, seed + 1);
    for (const line of [c, d]) {
      if (line !== existing && line.length <= FRAG_MAX && !alts.includes(line)) alts.push(line);
    }
  }
  return alts.slice(0, 2);
}

const thin = entries.filter(([key, variants]) => {
  if (!/^_\d+\.f\d+$/.test(key)) return false;
  return getTexts(variants).length < 3;
});

const byFile = { cultivator: [], settling: [], opposition: [], global: [] };

for (const [key, variants] of thin) {
  const existing = getTexts(variants)[0] || '';
  const extras = altsFor(key, existing);
  if (!extras.length) continue;
  const parent = primaryParent(key);
  const bucket = outputFile(parent);
  byFile[bucket].push({ key, extras });
}

const header = [
  '// The Squad — Lead: A4 Architect | Support: A5 Editor',
  '// Auto-generated — run: node scripts/generateMonolithFragmentDepth.mjs',
  '// Wildcard depth for anonymous decomposed monolith _N.fM fragment pools.',
];

function writeOut(relPath, pools, passLabel, importPath) {
  if (!pools.length) return 0;
  const lines = [
    ...header.slice(0, 3),
    `// ${passLabel}`,
    `import { registerModuleVariants } from '${importPath}';`,
    '',
  ];
  for (const { key, extras } of pools) {
    const textList = extras.map((t) => esc(t)).join(', ');
    lines.push(`registerModuleVariants(${esc(key)}, [{ when: {}, weight: 3, text: [${textList}] }]);`);
  }
  writeFileSync(relPath, `${lines.join('\n')}\n`);
  return pools.length;
}

const counts = {
  cultivator: writeOut(
    'src/textEngine/scenes/cultivator/monolithFragmentDepth.js',
    byFile.cultivator,
    'Cultivator harvest/digest/growth fragments.',
    '../../engine.js',
  ),
  settling: writeOut(
    'src/textEngine/scenes/settling/settlingMonolithFragmentDepth.js',
    byFile.settling,
    'Settling care/feed/socialize fragments.',
    '../../engine.js',
  ),
  opposition: writeOut(
    'src/textEngine/scenes/opposition/oppositionMonolithFragmentDepth.js',
    byFile.opposition,
    'Opposition hearing fragments.',
    '../../engine.js',
  ),
  global: writeOut(
    'src/textEngine/scenes/monolithFragmentDepth.js',
    byFile.global,
    'Remaining monolith fragments.',
    '../engine.js',
  ),
};

console.log('generateMonolithFragmentDepth:', counts, 'total', thin.length);
