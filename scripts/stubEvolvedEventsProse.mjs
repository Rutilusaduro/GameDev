#!/usr/bin/env node
/** MIGRATION step 6 — EVOLVED_EVENTS phase/choice/ending prose → bridge stubs. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { EVOLVED_EVENTS } from '../src/gameData/evolvedEvents.js';

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/gameData/evolvedEvents.js');
const SKIP_FORMS = new Set(['salon_appetit', 'artisan_gallery']);

function stubPhase(formId, stageIdx, phaseIdx) {
  return `(h,s)=>\`${formId} s${stageIdx}p${phaseIdx} bridge — \${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.\``;
}

function stubChoiceResult(formId, choiceId) {
  return `Choice ${choiceId} (${formId}) — flag logged; evolved.choice slots own the beat @ week 20+.`;
}

function stubEndingText(formId, endingIdx) {
  return `(h,s,gain)=>\`${formId} ending ${endingIdx} bridge — stream continues; modular evolved.ending @ week 20+.\``;
}

function emitChoice(ch, formId) {
  const parts = [
    `id:"${ch.id}"`,
    `label:${JSON.stringify(ch.label)}`,
    `result:${JSON.stringify(stubChoiceResult(formId, ch.id))}`,
  ];
  for (const key of ['lbs', 'rel', 'flag', 'drive', 'corruption', 'startsStream']) {
    if (ch[key] != null) parts.push(`${key}:${typeof ch[key] === 'string' ? JSON.stringify(ch[key]) : ch[key]}`);
  }
  return `{${parts.join(',')}}`;
}

function emitEnding(end, formId, endingIdx) {
  const parts = [`condition:${end.condition.toString()}`, `text:${stubEndingText(formId, endingIdx)}`];
  for (const key of ['gainBonus', 'relBonus', 'startsStream', 'driveBonus']) {
    if (end[key] != null) parts.push(`${key}:${end[key]}`);
  }
  return `{${parts.join(',')}}`;
}

function emitStage(formId, stageIdx, evDef) {
  const phases = (evDef.phases || []).map((phase, phaseIdx) => {
    const choices = (phase.choices || []).map((ch) => emitChoice(ch, formId)).join(',\n            ');
    return `        {
          text:${stubPhase(formId, stageIdx, phaseIdx)},
          choices:[
            ${choices}
          ]
        }`;
  }).join(',\n');
  const endings = (evDef.endings || []).map((end, ei) => emitEnding(end, formId, ei)).join(',\n        ');
  return `    {
      title:${JSON.stringify(evDef.title)},
      phases:[
${phases}
      ],
      endings:[
        ${endings}
      ]
    }`;
}

const formBlocks = [];
for (const [formId, stages] of Object.entries(EVOLVED_EVENTS)) {
  if (SKIP_FORMS.has(formId)) continue;
  if (!Array.isArray(stages)) continue;
  const stageBlocks = stages.map((evDef, si) => emitStage(formId, si, evDef)).join(',\n');
  formBlocks.push(`  ${formId}:[\n${stageBlocks}\n  ]`);
}

const header = `// Branching evolved-form events — MIGRATION.md extract (engine: scenes/evolved/).
// Evolved prose stub migration (step 6) — bridge cells; evolved.scene fragments @ week 20+.
import { SALON_EVOLVED_EVENTS } from './chloeSalon.js';
import { GALLERY_EVOLVED_EVENTS } from './fionaGallery.js';

export const EVOLVED_EVENTS = {
`;

const footer = `
  salon_appetit: SALON_EVOLVED_EVENTS,
  artisan_gallery: GALLERY_EVOLVED_EVENTS,
};
`;

fs.writeFileSync(OUT, `${header + formBlocks.join(',\n\n')},\n${footer}`);
console.log(`stubEvolvedEventsProse: wrote ${OUT} (${fs.statSync(OUT).size} bytes)`);
