#!/usr/bin/env node
/** Top up thin wildcard pools for RA/hall/talk/week/hunger/opposition prefixes. */
import { writeFileSync } from 'fs';

const sceneImports = [
  './talkCheckIn.js', './talkEncourage.js', './talkCompliment.js', './talkSuggest.js',
  './weekRecap/index.js', './hungerInterrupt/index.js', './opposition/index.js',
  './hallBlueprint/index.js', './roomVisit/index.js', './raPivotMechanicsProseDepth.js',
  './scrutiny/index.js', './rosterTell/index.js', './dinner/index.js', './session/index.js',
  './eating/index.js', './weighIn/index.js', './growthEvent/index.js', './collabStream/index.js',
  './campus/index.js', './feedReaction/index.js', './intimacy/index.js',
];
for (const p of sceneImports) {
  await import(`../src/textEngine/scenes/${p}`);
}

import { _registryEntries, _moduleOpts } from '../src/textEngine/engine.js';

const RA_PREFIXES = [
  'talk.', 'weekRecap.', 'hunger.', 'opposition.', 'ra.', 'hall.', 'room.visit.',
  'scrutiny.', 'rosterTell.', 'dorm.', 'floor.', 'dinner.', 'eating.', 'wi.', 'session.', 'weighIn.',
  'growthEvent.', 'collabStream.', 'campus.', 'room.visit.', 'feedReaction.', 'intimacy.',
];

const EXTRA = {
  'talk.check_in': [
    `She sets her phone face-down when you enter — a small courtesy that feels like trust.`,
    `{subject.name} asks how the hall is doing before she asks how she is doing. You notice.`,
    `"Busy week," she says, and pats the chair like she saved it.`,
  ],
  'talk.encourage': [
    `You say it plainly. She hears the permission underneath.`,
    `Encouragement lands softer when {ra.name} says it — like policy from someone who cares.`,
    `{subject.name} exhales like a knot loosening. "Okay," she whispers. "Okay."`,
  ],
  'talk.suggest.indulgence': [
    `You phrase it like care, not command. She hears both and chooses the part she wants.`,
    `"You could," you say — and the sentence finishes itself in her appetite.`,
  ],
  'dorm.upgrade.confirm': [
    `You approve the work order and the hall exhales — warmer lights, wider doorways.`,
  ],
  'hunger.interrupt.arrival': [
    `The knock comes hungry — not angry, just certain.`,
    `She finds you because the floor trained her to.`,
  ],
  'weekRecap.summary': [
    `The numbers tell one story. The hallway tells another.`,
    `You close the week with full trays and fuller residents.`,
  ],
};

const TARGET = 3;
const SKIP_OVERWRITE = new Set(['talk.check_in', 'talk.encourage']);

const lines = [
  '// Auto-generated — node scripts/generateRaPivotBulkProse.mjs (overlay-only; does not replace base pools)',
  "import { registerModuleVariants } from '../engine.js';",
  "import { legacyBridgeWhen } from './legacyPoolPolicy.js';",
  '',
];

const entries = _registryEntries().filter(([k]) =>
  RA_PREFIXES.some((p) => k.startsWith(p)) && _moduleOpts(k).select === 'pool',
);

let added = 0;
for (const [key, variants] of entries) {
  if (SKIP_OVERWRITE.has(key)) continue;

  const preset = EXTRA[key];
  if (preset) {
    lines.push(`registerModuleVariants('${key}', [`);
    lines.push(`  { when: legacyBridgeWhen(), weight: 2, text: [${preset.map((t) => `\`${t.replace(/`/g, '\\`')}\``).join(', ')}] },`);
    lines.push(`]);`);
    lines.push('');
    added += 1;
    continue;
  }
  let wild = 0;
  for (const v of variants) {
    if (!v.when || Object.keys(v.when).length) continue;
    const t = v.text;
    const arr = typeof t === 'function' ? [] : (Array.isArray(t) ? t : [t]);
    wild += arr.filter((s) => typeof s === 'string').length;
  }
  if (wild >= TARGET) continue;
  const filler = [
    `The moment stretches — unhurried, intimate, hall-quiet.`,
    `{subject.name} meets your eyes like the rest of the floor can wait.`,
    `Warmth pools in the room the way fullness pools in her.`,
  ];
  lines.push(`registerModuleVariants('${key}', [`);
  lines.push(`  { when: legacyBridgeWhen(), weight: 1, text: [${filler.map((t) => `\`${t}\``).join(', ')}] },`);
  lines.push(`]);`);
  lines.push('');
  added += 1;
  if (added >= 48) break;
}

const out = 'src/textEngine/scenes/raPivotProseDepthPass57.js';
writeFileSync(out, lines.join('\n'));
console.log(`Wrote ${out} (${added} pool top-ups)`);
