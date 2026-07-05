#!/usr/bin/env node
// Render existing scene families against synthetic ascended students. This is
// the Step 2 safety net: state plumbing must not require new prose to survive.

import '../src/textEngine/scenes/index.js';
import { renderCampusScene } from '../src/textEngine/scenes/campus/index.js';
import { renderClothScene } from '../src/textEngine/scenes/clothing/index.js';
import { renderEatScene } from '../src/textEngine/scenes/eating/index.js';
import { renderWeighInIntro, renderWeighInReaction } from '../src/textEngine/scenes/weighIn/index.js';
import { initGainStats } from '../src/gameData/gainSystem.js';
import { ASCENSION_FORM_ROSTER } from '../src/gameData/ascension/forms.js';
import { applyAscensionRebirth } from '../src/gameData/ascension/state.js';
import { WEIGHT_STAGES } from '../src/gameData/stages.js';
import { INIT_STUDENTS, initDeviceState, initPsychState } from '../src/gameData/students.js';

const WEEK = 24;
const STAGE_IDS = [0, 1, 2, 3, 4, 5, 6];
const ARTIFACT_RE = /\bundefined\b|\bnull\b|\{[^}]+\}/i;

const SCENES = [
  ['wi.intro', (student) => renderWeighInIntro(student, WEEK)],
  ['wi.reply', (student) => renderWeighInReaction(student, WEEK)],
  ['eat.scene', (student) => renderEatScene(student, WEEK, { locale: 'cafeteria' })],
  ['cloth.scene', (student) => renderClothScene(student, WEEK)],
  ['campus.scene', (student) => renderCampusScene(student, WEEK, { locale: 'hallway' })],
];

function runtimeStudent(seed) {
  return {
    ...seed,
    ...initGainStats(seed),
    ...initDeviceState(),
    psych: initPsychState(),
    corruption: 100,
    relationship: 100,
    ascension: null,
    weekStartLbs: seed.lbs,
  };
}

function lbsForStage(stageId) {
  if (stageId === 0) return 100;
  return WEIGHT_STAGES[stageId]?.min ?? 100;
}

function syntheticAscendedStudent(form, stageId) {
  const seed = INIT_STUDENTS.find((student) => student.id === form.studentId);
  if (!seed) throw new Error(`Missing seed student ${form.studentId} for ${form.formId}`);
  const base = runtimeStudent({
    ...seed,
    lbs: 1000,
    weekStartLbs: 1000,
    peakLbs: 1000,
  });
  const reborn = applyAscensionRebirth(base, { week: WEEK, formId: form.formId });
  const lbs = lbsForStage(stageId);
  return {
    ...reborn,
    lbs,
    weekStartLbs: lbs,
    corruption: 100,
    relationship: 100,
  };
}

const failures = [];
const samples = [];
let renderCount = 0;

for (const form of ASCENSION_FORM_ROSTER) {
  for (const stageId of STAGE_IDS) {
    const student = syntheticAscendedStudent(form, stageId);
    for (const [sceneId, renderScene] of SCENES) {
      renderCount += 1;
      let text = '';
      try {
        text = String(renderScene(student) || '').trim();
      } catch (error) {
        failures.push({
          formId: form.formId,
          stageId,
          sceneId,
          error: error?.message || String(error),
        });
        continue;
      }

      if (!text) {
        failures.push({ formId: form.formId, stageId, sceneId, error: 'empty render' });
        continue;
      }
      if (ARTIFACT_RE.test(text)) {
        failures.push({ formId: form.formId, stageId, sceneId, error: 'render artifact', text });
        continue;
      }
      if (samples.length < 12) {
        samples.push({ formId: form.formId, stageId, sceneId, text });
      }
    }
  }
}

console.log(`Ascension baseline probe: ${renderCount} renders, ${failures.length} failures.`);
for (const sample of samples) {
  console.log(`\n[${sample.formId} stage ${sample.stageId} ${sample.sceneId}]\n${sample.text}`);
}

if (failures.length) {
  console.error('\nFailures:');
  for (const failure of failures.slice(0, 20)) {
    console.error(JSON.stringify(failure, null, 2));
  }
  if (failures.length > 20) console.error(`... ${failures.length - 20} more`);
  process.exitCode = 1;
}
