#!/usr/bin/env node
/**
 * Static + dynamic validation for the modular text engine.
 * Run: npm run text:lint
 */
import '../src/textEngine/scenes/index.js';
import { _registryEntries, createContext, render, hasModule } from '../src/textEngine/engine.js';
import { WEIGHT_STAGES } from '../src/gameData/stages.js';
import { INIT_STUDENTS } from '../src/gameData/students.js';
import {
  WI_INTRO, WI_INTRO_BIG, WI_REACTION, WI_BREAK,
} from '../src/textEngine/scenes/weighIn/index.js';

const SLOT_RE = /\{([a-zA-Z][\w.]*)/g;
const JOIN_RE = /\{join:([^|}]+)/g;

const WARNINGS = [];
const ERRORS = [];

const WILDCARD_WHITELIST = new Set([
  'talk.coda', 'talk.campusCoda', 'talk.hungryCoda',
  'diary.campus', 'attitude.campus', 'weighIn.campus',
  'destiny.offstream.talk',
  'campus.sighting', 'campus.location',
  'scene.hungerInterrupt.personal',
  'word.addictedHunger', 'word.addictedEating', 'word.withdrawal',
  'stream.chat.scenario.eating', 'stream.chat.scenario.struggling', 'stream.chat.scenario.teased',
]);

function stageMidLbs(stageId) {
  const s = WEIGHT_STAGES[stageId];
  const next = WEIGHT_STAGES[stageId + 1];
  if (!next) return s.min + 100;
  return Math.round((s.min + next.min) / 2);
}

function collectSlotRefs(text, out = new Set()) {
  JOIN_RE.lastIndex = 0;
  let jm;
  while ((jm = JOIN_RE.exec(text)) !== null) {
    jm[1].split(',').forEach((k) => out.add(k.trim()));
  }
  SLOT_RE.lastIndex = 0;
  let m;
  while ((m = SLOT_RE.exec(text)) !== null) {
    if (m[1] !== 'join') out.add(m[1]);
  }
  return out;
}

function flattenTexts(variant) {
  const t = variant.text;
  return Array.isArray(t) ? t : [t];
}

const POOL_COUNT_WHITELIST = new Set(['subject.name', 'subject.first', 'subject.lbs', 'wi.arrival', 'wi.stepOff', 'wi.breakLine', 'wi.numberLine', 'wi.scaleApproach']);

function isPoolModule(key, opts) {
  return opts?.select === 'pool' || key.startsWith('wi.') || key.startsWith('enc.') || key.startsWith('subject.');
}

// ── static checks ─────────────────────────────────────────────

for (const { key, variants, opts } of _registryEntries()) {
  const hasWildcard = variants.some((v) => !v.when || Object.keys(v.when).length === 0);
  if (!hasWildcard && !WILDCARD_WHITELIST.has(key)) {
    ERRORS.push(`[wildcard] ${key}: no empty-when fallback`);
  }

  if (isPoolModule(key, opts)) {
    const wildcard = variants.find((v) => !v.when || Object.keys(v.when).length === 0);
    if (wildcard && !POOL_COUNT_WHITELIST.has(key)) {
      const count = flattenTexts(wildcard).length;
      if (count < 3) WARNINGS.push(`[pool-count] ${key}: wildcard has ${count} text(s) (<3)`);
    }
    for (const v of variants) {
      for (const entry of flattenTexts(v)) {
        if (typeof entry !== 'string') continue;
        if (entry.length > 200) ERRORS.push(`[monolith] ${key}: entry ${entry.length} chars (>200)`);
      }
    }
  }

  for (const v of variants) {
    for (const entry of flattenTexts(v)) {
      const s = typeof entry === 'string' ? entry : '';
      if (!s.includes('{')) continue;
      for (const slot of collectSlotRefs(s)) {
        if (!hasModule(slot)) ERRORS.push(`[slot-ref] ${key} → unknown module "${slot}"`);
      }
    }
  }
}

// ── dynamic sweep ─────────────────────────────────────────────

const STUDENTS = INIT_STUDENTS.filter((s) => !s.hidden);
const STAGE_PROBES = [0, 2, 4, 6, 8, 10, 11];
const CORRUPTIONS = [0, 50, 95];

const TEMPLATES = [
  ['WI_INTRO', WI_INTRO],
  ['WI_INTRO_BIG', WI_INTRO_BIG],
  ['WI_REACTION', WI_REACTION],
  ['WI_BREAK', WI_BREAK],
  ['talk.encourage', '{talk.encourage}'],
];

let renders = 0;
const lowVariance = [];

for (const base of STUDENTS) {
  for (const stageId of STAGE_PROBES) {
    for (const corruption of CORRUPTIONS) {
      const student = {
        ...base,
        lbs: stageMidLbs(stageId),
        corruption,
        hungerTier: stageId >= 6 ? 4 : 0,
        addictionLevel: 0,
        fullness: 0,
        stomachCapacity: 100,
      };
      const ctx = createContext({
        subject: student,
        week: 8,
        globals: {
          campusFattening: stageId >= 4,
          campusTier: stageId >= 4 ? 2 : 0,
          bigScale: stageId >= 6,
        },
      });

      for (const [label, tpl] of TEMPLATES) {
        const outputs = new Set();
        for (let i = 0; i < 5; i++) {
          const out = render(tpl, ctx);
          renders++;
          if (!out || !out.trim()) ERRORS.push(`[empty] ${label} student=${base.id} stage=${stageId}`);
          if (/\{|\bundefined\b| ,"|and \.|  /.test(out)) {
            ERRORS.push(`[artifact] ${label} student=${base.id}: ${out.slice(0, 100)}`);
          }
          outputs.add(out);
        }
        if (outputs.size === 1 && stageId <= 6 && base.id <= 3) {
          lowVariance.push(`${label} student=${base.id} stage=${stageId}`);
        }
      }
    }
  }
}

for (const cell of lowVariance.slice(0, 15)) {
  WARNINGS.push(`[variance] 5 renders → 1 distinct: ${cell}`);
}

console.log(`text:lint — ${renders} renders across ${STUDENTS.length} students, ${ERRORS.length} errors, ${WARNINGS.length} warnings`);
for (const w of WARNINGS) console.warn(w);
for (const e of ERRORS) console.error(e);

process.exit(ERRORS.length ? 1 : 0);
