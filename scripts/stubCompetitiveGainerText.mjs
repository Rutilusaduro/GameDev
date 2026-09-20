#!/usr/bin/env node
/** MIGRATION step 6 — CG scene monolith in competitiveGainerText.js → bridge stubs. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  CG_FILLED_CORKBOARD_SCENES,
  CG_FILLED_BINGE_SCENES,
  CG_FILLED_SELF_REVIEW,
  CG_FILLED_MEASUREMENT_REACTIONS,
  CG_FILLED_DIARY,
  CG_FILLED_REACTIONS,
  CG_FILLED_OUTFITS,
} from '../src/gameData/competitiveGainerText.js';

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/gameData/competitiveGainerText.js');
const raw = fs.readFileSync(OUT, 'utf8');
const chatStart = raw.indexOf('const chat = {');
const reactStart = raw.indexOf('const makeReactionText = {');
if (chatStart < 0) throw new Error('const chat block not found');
if (reactStart < 0) throw new Error('const makeReactionText block not found');
if (reactStart <= chatStart) throw new Error('expected makeReactionText after chat block');

/** chat → RA reply exports; measurement reactions appended after. */
const tail = raw.slice(chatStart, reactStart);

const MAX = 200;
const MEASUREMENT_STUB = 'Priya records {targetName} on the board — measurement bridge; cg.scene @ week 20+.';

function stubCorkboard(src) {
  return Object.fromEntries(
    Object.entries(src).map(([tier, scenes]) => [
      tier,
      scenes.map((_, i) => `Corkboard ${tier} beat ${i} — Priya updates pins; cg.scene modular voice @ week 20+.`),
    ]),
  );
}

function stubBinge(src) {
  return Object.fromEntries(
    Object.entries(src).map(([stage, tiers]) => [
      stage,
      Object.fromEntries(
        Object.entries(tiers).map(([t]) => [t, `Binge ${stage}/${t} bridge — containers emptied; modular cg.scene carries detail.`]),
      ),
    ]),
  );
}

function stubSelfReview(src) {
  return Object.fromEntries(
    Object.entries(src).map(([stage, tiers]) => [
      stage,
      Object.fromEntries(
        Object.entries(tiers).map(([t, row]) => [
          t,
          { focus: row.focus || 'waist', text: `Self-review ${stage}/${t} — tape reads {measurement}; modular overlay @ week 20+.` },
        ]),
      ),
    ]),
  );
}

function stubReactions(src) {
  const walk = (node) => {
    if (typeof node === 'string') {
      return node.length > MAX ? MEASUREMENT_STUB : node;
    }
    if (node && typeof node === 'object' && !Array.isArray(node)) {
      return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, walk(v)]));
    }
    return node;
  };
  return walk(src);
}

const diary = CG_FILLED_DIARY.map((_, i) => (i === 1
  ? 'Diary: I have added five more residents to the board. Late-semester voice lives in modular cg.scene slots.'
  : `Diary entry ${i + 1} — corkboard obsession bridge; cg.scene @ week 20+.`));

const reactions = CG_FILLED_REACTIONS.map((_, i) => `Competitive reaction ${i} bridge — modular cg.scene overlay.`);
const outfits = CG_FILLED_OUTFITS.map((_, i) => `Outfit stage ${i} bridge — tailored pieces strain; modular voice late game.`);

const prelude = `import { depthCgDriveGain } from './mechanicsDepthLayer.js';

/** Depth-scaled competitive drive roll bounds (HallPass CG handlers). */
export function scaleCgDriveRange(range = [0, 0]) {
  const lo = range[0] ?? 0;
  const hi = range[1] ?? lo;
  return [depthCgDriveGain(lo), depthCgDriveGain(Math.max(lo, hi))];
}

export const CG_STAGE_KEYS = ["Heavy","Fat","VeryFat","Enormous","Colossal","Blob"];

// CG scene stub migration (step 6 pilot) — bridge cells; cgSceneFragments @ week 20+.

`;

const body = `${prelude}export const CG_FILLED_REACTIONS = ${JSON.stringify(reactions, null, 2)};

export const CG_FILLED_DIARY = ${JSON.stringify(diary, null, 2)};

export const CG_FILLED_OUTFITS = ${JSON.stringify(outfits, null, 2)};

export const CG_FILLED_CORKBOARD_SCENES = ${JSON.stringify(stubCorkboard(CG_FILLED_CORKBOARD_SCENES), null, 2)};

export const CG_FILLED_SELF_REVIEW = ${JSON.stringify(stubSelfReview(CG_FILLED_SELF_REVIEW), null, 2)};

export const CG_FILLED_BINGE_SCENES = ${JSON.stringify(stubBinge(CG_FILLED_BINGE_SCENES), null, 2)};

`;

const reactionsBlock = `const makeReactionText = ${JSON.stringify(stubReactions(CG_FILLED_MEASUREMENT_REACTIONS), null, 2)};

export const CG_FILLED_MEASUREMENT_REACTIONS = makeReactionText;
`;

fs.writeFileSync(OUT, body + tail + reactionsBlock);
console.log(`stubCompetitiveGainerText: wrote ${OUT} (${fs.statSync(OUT).size} bytes)`);
