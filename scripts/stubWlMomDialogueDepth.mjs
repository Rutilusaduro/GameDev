#!/usr/bin/env node
/** MIGRATION step 6 — WL_MOM_DIALOGUE_DEPTH → bridge stubs (week ≤19 overlay only). */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { WL_MOM_DIALOGUE_DEPTH } from '../src/gameData/wlMomDialogueDepth.js';

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/gameData/wlMomDialogueDepth.js');

const ANCHOR = {
  'Darlene:4:greeting': `"Hello, RA. Wednesday night has become the thing we plan the week around — my daughters ask on Monday what's on the menu."`,
  'Darlene:5:greeting': `"My enormously soft daughters in the kitchen tonight — both of them glowing, both of them hungry."`,
};

function stubLine(person, stageIdx, slot, label = '') {
  const key = `${person}:${stageIdx}:${slot}`;
  if (ANCHOR[key]) return ANCHOR[key];
  const hint = label ? ` (${label.slice(0, 30)})` : '';
  return `"${person} depth overlay stage ${stageIdx + 1}${hint} — both daughters still growing; modular wl.talk owns late voice."`;
}

function processOverlay(entry, person, stageIdx) {
  const out = { ...entry };
  for (const k of ['greeting', 'cappedGreeting', 'overtookGreeting']) {
    if (out[k]) out[k] = stubLine(person, stageIdx, k);
  }
  if (Array.isArray(out.options)) {
    out.options = out.options.map((opt, oi) => ({
      ...opt,
      text: stubLine(person, stageIdx, `opt${oi}`, opt.text?.slice(1, 40)),
      subs: (opt.subs || []).map((sub, si) => ({
        ...sub,
        text: stubLine(person, stageIdx, `sub${oi}_${si}`, sub.text?.slice(1, 30)),
      })),
    }));
  }
  return out;
}

const stubbed = {};
for (const [person, byStage] of Object.entries(WL_MOM_DIALOGUE_DEPTH)) {
  stubbed[person] = {};
  for (const [stageIdx, entry] of Object.entries(byStage)) {
    stubbed[person][stageIdx] = processOverlay(entry, person, Number(stageIdx));
  }
}

const header = `// Wife Lessons — mom dialogue depth overlays (stages 5–8 priority).
// WL depth stub migration (step 6 pilot) — bridge overlays; talkFragments @ week 20+.
// Merged onto WL_DIALOGUES at conversation start; labels/outcomes stay on base.

/** @param {object} base @param {object|null} overlay */
export function mergeWlDialogueEntry(base, overlay) {
  if (!overlay || !base) return base;
  const merged = { ...base };
  for (const key of ['greeting', 'cappedGreeting', 'overtookGreeting']) {
    if (overlay[key]) merged[key] = overlay[key];
  }
  if (overlay.options?.length) {
    merged.options = base.options.map((opt, i) => {
      const o = overlay.options[i];
      if (!o) return opt;
      return {
        ...opt,
        ...(o.text ? { text: o.text } : {}),
        subs: opt.subs.map((sub, j) => ({
          ...sub,
          ...(o.subs?.[j]?.text ? { text: o.subs[j].text } : {}),
        })),
      };
    });
  }
  return merged;
}

/** stageIdx is 0-based (stage 5 → index 4). */
export function getWlMomDialogueDepth(personKey, stageIdx) {
  const byPerson = WL_MOM_DIALOGUE_DEPTH[personKey];
  if (!byPerson) return null;
  return byPerson[stageIdx] ?? null;
}

export const WL_MOM_DIALOGUE_DEPTH = ${JSON.stringify(stubbed)};
`;

fs.writeFileSync(OUT, header);
console.log(`stubWlMomDialogueDepth: wrote ${OUT}`);
