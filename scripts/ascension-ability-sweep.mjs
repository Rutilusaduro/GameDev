#!/usr/bin/env node
// Static gate for Step 5 ability data. Runtime hook effects live in
// ProfessorSim; this sweep proves the data table obeys the design contract.

import { ASCENSION_ABILITIES, ASCENSION_ABILITY_HOOKS } from '../src/gameData/ascension/abilities.js';
import { ASCENSION_FORM_ROSTER } from '../src/gameData/ascension/forms.js';

const failures = [];
const byForm = new Map();
const hookCounts = Object.fromEntries(ASCENSION_ABILITY_HOOKS.map((hook) => [hook, 0]));
const seenIds = new Set();

for (const ability of ASCENSION_ABILITIES) {
  if (seenIds.has(ability.id)) failures.push(`duplicate ability id: ${ability.id}`);
  seenIds.add(ability.id);
  if (!ASCENSION_ABILITY_HOOKS.includes(ability.hook)) {
    failures.push(`${ability.id}: illegal hook ${ability.hook}`);
  } else {
    hookCounts[ability.hook] += 1;
  }
  if (!ability.formId || ability.studentId == null) failures.push(`${ability.id}: missing form/student binding`);
  if (!ability.name || !ability.desc) failures.push(`${ability.id}: missing name/desc`);
  if (!ability.essenceCost || ability.essenceCost < 1) failures.push(`${ability.id}: bad essenceCost`);
  if (!ability.cooldownWeeks || ability.cooldownWeeks < 1) failures.push(`${ability.id}: bad cooldownWeeks`);
  byForm.set(ability.formId, [...(byForm.get(ability.formId) || []), ability]);
}

for (const form of ASCENSION_FORM_ROSTER) {
  const rows = byForm.get(form.formId) || [];
  if (rows.length !== 3) failures.push(`${form.formId}: expected 3 abilities, got ${rows.length}`);
  const hooks = new Set(rows.map((row) => row.hook));
  if (hooks.size !== rows.length) failures.push(`${form.formId}: duplicate hook in ability set`);
}

for (const [hook, count] of Object.entries(hookCounts)) {
  if (count < 5) failures.push(`${hook}: expected at least 5 abilities, got ${count}`);
}

console.log(`Ascension ability sweep: ${ASCENSION_ABILITIES.length} abilities.`);
console.log(`Hook coverage: ${Object.entries(hookCounts).map(([hook, count]) => `${hook}=${count}`).join(', ')}`);

if (failures.length) {
  console.error('Failures:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
}
