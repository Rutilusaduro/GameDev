// Phase D — missing evolved diaries + lint-safe decomposition.
// Run: node scripts/generatePhaseD.mjs
import { writeFileSync } from 'fs';
import { EVOLVED_DIARY } from './legacy/evolvedDiarySource.js';
import { EVOLVED_REACTIONS, EVOLVED_ACTIVITY_TEXT } from '../src/gameData/evolvedForms.js';
import { CG_FILLED_DIARY } from '../src/gameData/competitiveGainerText.js';
import { buildBodyPool, emitFragmentPools } from './poolTextSplit.mjs';

const MARKER = '__SUBJECT_NAME__';
const STAGE_LBS = [258, 320, 400, 480, 560, 680];

function esc(s) {
  return JSON.stringify(s);
}

function convertText(text) {
  return String(text)
    .replaceAll(MARKER, '{subject.name}')
    .replace(/\$\{s\.name\}/g, '{subject.name}')
    .replace(/\$\{Math\.round\(s\.lbs\)\}/g, '{subject.lbs}')
    .replace(/\$\{Math\.round\(ctx\.subject\.lbs\)\}/g, '{subject.lbs}');
}

function emitStagePool(formId, stage, text, fragmentPools, counter) {
  const poolKey = `diary.${formId}.s${stage}`;
  const converted = convertText(text).trim();
  const before = fragmentPools.length;
  const { mainSkeleton, subPools } = buildBodyPool(poolKey, converted, fragmentPools, counter);
  const fragsOut = emitFragmentPools(fragmentPools.slice(before), esc);
  const subOut = subPools.map(
    (sp) => `registerPool('${sp.key}', [\n  { when: {}, text: ${esc([sp.skeleton])} },\n]);`,
  );
  const body = `registerPool('${poolKey}', [\n  { when: {}, text: ${esc([mainSkeleton])} },\n]);`;
  return [...fragsOut, ...subOut, body].filter(Boolean).join('\n\n');
}

function emitDiaryForm(formId, entries) {
  const fragmentPools = [];
  const counter = { n: 1 };
  const stageBlocks = [];
  const selectorLines = [];

  entries.slice(0, 6).forEach((raw, idx) => {
    const stage = idx + 5;
    const text = typeof raw === 'function' ? raw({ name: MARKER, lbs: STAGE_LBS[idx] || 300 }) : raw;
    stageBlocks.push(emitStagePool(formId, stage, text, fragmentPools, counter));
    selectorLines.push(`  { when: { stage: [${stage}] }, text: ['{diary.${formId}.s${stage}}'] }`);
  });

  const main = [
    ...stageBlocks,
    `registerPool('diary.${formId}', [\n${selectorLines.join(',\n')},\n  { when: {}, text: ['{diary.${formId}.s5}'] }\n]);`,
  ];
  return main.join('\n\n');
}

const PHARMACIST_DIARY = [
  `First synthesis at home. The kitchen smells like a lab now — beakers on the drying rack, labels in my handwriting, appetite stimulant batch one cooling on the counter. I tasted the dose myself. Professional responsibility. The warmth in my stomach was immediate and I logged it as expected variance.`,
  `Campus softening is measurable. I walk to class and notice how portions look larger, how conversations around food sound less apologetic. My compounds are in three dining venues. I am heavier than when I started and the scale curve matches the deployment curve.`,
  `The cult phase arrived without ceremony. Devoted users, stronger formulas, loyalty enhancers that make feeding feel like belonging. I eat with them sometimes — methodology, I tell the IRB in my head. My body keeps excellent records.`,
  `Mass transformation is no longer hypothetical. Campus-wide passive gain, testers at every stage, my own waistline a proof of concept. I stopped pretending the work is separate from the appetite. The appetite is the work.`,
  `Ascension protocol unlocked. I synthesize at a scale that would have ended my corporate career and I have never felt more precise. My belly rests on the bench when I lean in to measure. The lab hums. So do I.`,
  `Endgame note: goddess of excess is an accurate title. Compounds, cult, campus saturation — I built a system that feeds itself and I am inside it, larger every week, exactly where the math said I would be.`,
];

const forms = {
  competitive_gainer: CG_FILLED_DIARY,
  machine_goddess: EVOLVED_DIARY.machine_goddess,
  salon_appetit: EVOLVED_ACTIVITY_TEXT.salon_appetit || EVOLVED_REACTIONS.salon_appetit,
  artisan_gallery: EVOLVED_ACTIVITY_TEXT.artisan_gallery || EVOLVED_REACTIONS.artisan_gallery,
  pharmacist: PHARMACIST_DIARY,
};

const sections = [
  '// The Squad — Lead: A2 Psych | Support: A4 Architect',
  '// Phase D evolved diaries — competitive_gainer, salon, gallery, pharmacist, machine_goddess.',
  '// Regenerate: node scripts/generatePhaseD.mjs',
  "import { registerPool } from '../engine.js';",
  '',
];

for (const [formId, entries] of Object.entries(forms)) {
  if (!entries?.length) continue;
  sections.push(`// ── ${formId} ─────────────────────────────────────────────`);
  sections.push(emitDiaryForm(formId, entries));
  sections.push('');
}

writeFileSync('src/textEngine/scenes/diaryPhaseD.js', sections.join('\n'));
console.log('Wrote src/textEngine/scenes/diaryPhaseD.js');
