#!/usr/bin/env node
/** MIGRATION step 6 — homeroom conference/activity prose → bridge stubs. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  BATCH_BAKER_NPCS,
  HOMEROOM_SUSPICION_DELTAS,
  HOMEROOM_THRESHOLDS,
  HOMEROOM_CONFERENCE_EVENTS,
  HOMEROOM_GROUP_ACTIVITIES,
} from '../src/gameData/homeroomEvents.js';

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/gameData/homeroomEvents.js');

function stubIntro(npc) {
  return `${npc} conference bridge — kitchen queen check-in. Modular homeroom.scene slots own late-semester voice.`;
}

function stubResult(npc, choiceId) {
  return `Outcome beat (${npc}/${choiceId}) — warmth, portions, notebook logged. Fragments carry detail @ week 20+.`;
}

function stubActivity(label, phaseIdx = 0) {
  return `${label} phase ${phaseIdx + 1} — group activity stub. Oven heat and floor ritual live in modular slots.`;
}

const conferences = {};
for (const [key, ev] of Object.entries(HOMEROOM_CONFERENCE_EVENTS)) {
  conferences[key] = {
    text: stubIntro(key),
    choices: (ev.choices || []).map((ch) => ({
      ...ch,
      result: stubResult(key, ch.id),
    })),
  };
}

const activities = {};
for (const [key, act] of Object.entries(HOMEROOM_GROUP_ACTIVITIES)) {
  if (act.phases?.length) {
    activities[key] = {
      ...act,
      phases: act.phases.map((ph, pi) => ({
        ...ph,
        text: stubActivity(act.label || key, pi),
        choices: (ph.choices || []).map((ch) => ({
          ...ch,
          result: stubResult(key, ch.id),
        })),
      })),
    };
  } else {
    activities[key] = {
      ...act,
      text: stubActivity(act.label || key, 0),
      choices: (act.choices || []).map((ch) => ({
        ...ch,
        result: stubResult(key, ch.id),
      })),
    };
  }
}

const lines = [
  '// Hall kitchen queen — NPC blurbs, conferences, group activities (MIGRATION.md extract).',
  '// Homeroom prose stub migration (step 6 pilot) — bridge cells; homeroom fragments @ week 20+.',
  '// ── HALL KITCHEN QUEEN: NPC stage descriptions ───────────────────────────────',
  `export const BATCH_BAKER_NPCS = ${JSON.stringify(BATCH_BAKER_NPCS, null, 2)};`,
  '',
  `export const HOMEROOM_SUSPICION_DELTAS = ${JSON.stringify(HOMEROOM_SUSPICION_DELTAS, null, 2)};`,
  '',
  `export const HOMEROOM_THRESHOLDS = ${JSON.stringify(HOMEROOM_THRESHOLDS, null, 2)};`,
  '',
  '// ── HALL KITCHEN QUEEN: Individual Conference Events ───────────────────────',
  `export const HOMEROOM_CONFERENCE_EVENTS = ${JSON.stringify(conferences, null, 2)};`,
  '',
  '// ── HALL KITCHEN QUEEN: Group Activity Events ────────────────────────────────',
  `export const HOMEROOM_GROUP_ACTIVITIES = ${JSON.stringify(activities, null, 2)};`,
  '',
];

fs.writeFileSync(OUT, lines.join('\n'));
console.log(`stubHomeroomEventsProse: wrote ${OUT}`);
