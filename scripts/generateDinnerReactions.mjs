// One-time generator: legacy dinner reaction functions → text-engine pools.
// Run: node scripts/generateDinnerReactions.mjs
import { writeFileSync } from 'fs';
import {
  THIN_JEALOUSY, FAT_ENCOURAGE, FAT_RETORT, THIN_CONTEXTUAL,
  getJealousyLine, UNBUTTON_LINES,
} from './legacyDinnerReactions.snapshot.js';
import { INIT_STUDENTS } from '../src/gameData/students.js';
import { resetFragCounter, decomposeVariants, emitFragmentPools } from './poolTextSplit.mjs';

const SUBJ = { name: '{subject.name}' };
const REF = { name: '{ref.name}' };

function esc(s) {
  return JSON.stringify(s);
}

function variantsFromLevelMap(map, fnOrder = 'subjectRef') {
  const variants = [
    { when: {}, text: [fnOrder === 'refSubject'
      ? `{ref.name} looks at {subject.name} with warm understanding.`
      : `{subject.name} watches {ref.name}'s plate with quiet attention.`] },
  ];
  for (const [archetype, fns] of Object.entries(map)) {
    if (!Array.isArray(fns)) continue;
    fns.forEach((fn, level) => {
      const text = fnOrder === 'refSubject' ? fn(REF, SUBJ) : fn(SUBJ, REF);
      const when = { archetype, reactionLevel: level };
      variants.push({ when, text: [text] });
    });
  }
  return variants;
}

function variantsFromRetortMap(map) {
  return variantsFromLevelMap(map, 'refSubject').map((v) => {
    if (v.when.archetype) {
      return { ...v, when: { refArchetype: v.when.archetype, reactionLevel: v.when.reactionLevel } };
    }
    return v;
  });
}

function variantsFromContextual(map) {
  const variants = [
    { when: {}, text: [`{subject.name} watches {ref.name} eat with quiet fascination.`] },
  ];
  for (const [archetype, fn] of Object.entries(map)) {
    const text = fn(SUBJ, REF);
    variants.push({ when: { refArchetype: archetype, reactionLevel: 2 }, text: [text] });
    variants.push({ when: { refArchetype: archetype, reactionLevel: 3 }, text: [text] });
  }
  return variants;
}

const jealousyVariants = [
  { when: {}, text: [`{subject.name} looks meaningfully at {ref.name}'s food and then at her own empty place setting.`] },
];
for (const arch of [...new Set(INIT_STUDENTS.map((s) => s.archetype))]) {
  const line = getJealousyLine({ ...SUBJ, archetype: arch }, REF);
  jealousyVariants.push({ when: { archetype: arch }, text: [line] });
}

const unbutton = UNBUTTON_LINES.map((fn) => fn(SUBJ));

function emitPool(key, variants) {
  const { variants: decomposed, fragmentPools } = decomposeVariants(key, variants);
  const lines = decomposed.map((v) => {
    const when = esc(v.when);
    const text = esc(v.text);
    const weight = v.weight != null ? `, weight: ${v.weight}` : '';
    return `  { when: ${when}${weight}, text: ${text} }`;
  });
  const frags = emitFragmentPools(fragmentPools, esc);
  const body = `registerPool('${key}', [\n${lines.join(',\n')},\n]);`;
  return frags.length ? `${frags.join('\n\n')}\n\n${body}` : body;
}

resetFragCounter();

const out = [
  '// The Squad — Lead: A1 Mobile | Support: A4 Architect',
  '// Group dinner table reactions — migrated from sessions.js (Phase C.2).',
  '// Regenerate: node scripts/generateDinnerReactions.mjs',
  "import { registerPool } from '../../engine.js';",
  '',
  emitPool('dinner.reaction.thinJealousy', variantsFromLevelMap(THIN_JEALOUSY, 'subjectRef')),
  '',
  emitPool('dinner.reaction.fatEncourage', variantsFromLevelMap(FAT_ENCOURAGE, 'subjectRef')),
  '',
  emitPool('dinner.reaction.fatRetort', variantsFromRetortMap(FAT_RETORT)),
  '',
  emitPool('dinner.reaction.thinContextual', variantsFromContextual(THIN_CONTEXTUAL)),
  '',
  emitPool('dinner.reaction.jealousyDefault', jealousyVariants),
  '',
  emitPool('dinner.reaction.unbutton', [{ when: {}, text: unbutton }]),
  '',
];

writeFileSync('src/textEngine/scenes/dinner/reactions.js', `${out.join('\n')}\n`);
console.log('generateDinnerReactions: wrote src/textEngine/scenes/dinner/reactions.js');
