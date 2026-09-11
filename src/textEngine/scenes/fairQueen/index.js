// State Fair Queen — fair training + Fair Day text bridge.
import { registerDimension, registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import {
  fairTrainingBody,
  fairBoostBody,
  fairStageBucket,
} from './fragments.js';
import {
  weighInOpen,
  weighInChoiceGround,
  weighInChoiceCrowd,
  weighInEndGround,
  weighInEndCrowd,
  judgingBeat,
  afterpartyOpen,
  afterpartyCollab,
  afterpartyCrowd,
  afterpartyEnd,
} from './dayFragments.js';
import { fairPhotoCaption } from './photoFragments.js';
import { fairTailBeat } from '../evolved/proseTails.js';

const INF_FROM_TAG = {
  None: 'None',
  Britt: 'Brittany',
  Kyli: 'Kylie',
  Sere: 'Serena',
  Rene: 'Renee',
  Dais: 'Daisy',
  Lili: 'Lilith',
};

registerDimension('fairCollab', (ctx) => ctx.globals?.fairCollab ?? 'Brittany');
registerDimension('mjStageBucket', (ctx) => ctx.globals?.mjStageBucket ?? fairStageBucket(ctx.d?.stage ?? 5));
registerDimension('cStageBucket', (ctx) => ctx.globals?.cStageBucket ?? 'mid');
registerDimension('lilithCohort', (ctx) => ctx.globals?.lilithCohort ?? 'Mid');
registerDimension('fairStageIdx', (ctx) => ctx.globals?.fairStageIdx ?? 0);
registerDimension('fairInfluence', (ctx) => ctx.globals?.fairInfluence ?? 'None');
registerDimension('fairBoostTier', (ctx) => ctx.globals?.fairBoostTier ?? 'Mid');

const collabs = ['Brittany', 'Kylie', 'Serena', 'Renee', 'Daisy', 'Lilith'];
const buckets = ['lean', 'mid', 'heavy'];
const tiers = ['Low', 'Mid', 'High'];

for (const c of collabs) {
  const entries = [];
  if (c === 'Lilith') {
    for (const cohort of ['Early', 'Mid', 'Late']) {
      for (const mj of buckets) {
        entries.push({
          when: { fairCollab: ['Lilith'], lilithCohort: [cohort], mjStageBucket: [mj] },
          weight: 2,
          text: [(ctx) => fairTrainingBody('Lilith', ctx)],
        });
      }
    }
  } else {
    for (const mj of buckets) {
      for (const cb of buckets) {
        entries.push({
          when: { fairCollab: [c], mjStageBucket: [mj], cStageBucket: [cb] },
          weight: 2,
          text: [(ctx) => fairTrainingBody(c, ctx)],
        });
      }
    }
  }
  entries.push({
    when: { fairCollab: [c] },
    text: [(ctx) => fairTrainingBody(c, ctx)],
  });
  const trainBody = (ctx) => fairTrainingBody(c, ctx);
  entries.push({
    when: {},
    text: [
      trainBody,
      fairTailBeat(`fair:train:${c}`, 0),
      fairTailBeat(`fair:train:${c}`, 1),
    ],
  });
  registerPool(`fair.training.${c}`, entries);
}

for (const c of collabs) {
  registerPool(`fair.boost.${c}`, [
    ...tiers.map((tier) => ({
      when: { fairBoostTier: [tier] },
      text: [
        (ctx) => fairBoostBody(c, tier, ctx),
        fairTailBeat(`fair:boost:${c}:${tier}`, 0),
        (ctx) => {
          const base = fairBoostBody(c, tier, ctx);
          return base ? `${base} Pride climbs with every session.` : base;
        },
      ],
    })),
    {
      when: {},
      text: [
        (ctx) => fairBoostBody(c, 'Mid', ctx),
        fairTailBeat(`fair:boost:${c}`, 1),
        (ctx) => fairBoostBody(c, 'Low', ctx),
      ],
    },
  ]);
}

const triple = (fn, seed) => ({
  when: {},
  text: [fn, fairTailBeat(`fair:day:${seed}`, 0), fairTailBeat(`fair:day:${seed}`, 1)],
});
registerPool('fair.day.weighIn.open', [triple(weighInOpen, 'wi-open')]);
registerPool('fair.day.weighIn.choice1', [triple(weighInChoiceGround, 'wi-c1')]);
registerPool('fair.day.weighIn.choice2', [triple(weighInChoiceCrowd, 'wi-c2')]);
registerPool('fair.day.weighIn.endingA', [triple(weighInEndGround, 'wi-ea')]);
registerPool('fair.day.weighIn.endingB', [triple(weighInEndCrowd, 'wi-eb')]);
registerPool('fair.day.judging', [triple(judgingBeat, 'ju')]);
registerPool('fair.day.afterparty.open', [triple(afterpartyOpen, 'ap-open')]);
registerPool('fair.day.afterparty.choice1', [triple(afterpartyCollab, 'ap-c1')]);
registerPool('fair.day.afterparty.choice2', [triple(afterpartyCrowd, 'ap-c2')]);
registerPool('fair.day.afterparty.ending', [triple(afterpartyEnd, 'ap-end')]);

for (const c of collabs) {
  const photoEntries = buckets.map((b) => ({
    when: { fairCollab: [c], mjStageBucket: [b] },
    weight: 2,
    text: [fairPhotoCaption],
  }));
  photoEntries.push({
    when: {},
    text: [
      fairPhotoCaption,
      fairTailBeat(`fair:photo:${c}`, 0),
      (ctx) => {
        const cap = fairPhotoCaption(ctx);
        return cap ? `${cap} Pinned to the Trophy Wall with a bent gold tack.` : cap;
      },
    ],
  });
  registerPool(`fair.photo.${c}`, photoEntries);
}

export function buildFairCtx(mjStudent, week, globals = {}) {
  return buildTextContext({
    subject: mjStudent,
    week,
    globals: { featureId: 'state_fair_queen', ...globals },
  });
}

function renderPoolKey(poolKey, ctx, chance = 0.28) {
  if (!poolKey) return '';
  try {
    const line = render(`{${poolKey}}`, ctx)?.trim();
    if (!line || line.includes('{unresolved}')) return '';
    return appendV2Depth(line, 'fairQueen', ctx, chance);
  } catch {
    return '';
  }
}

/** Parse legacy bracket tags from evolvedForms placeholders. */
export function parseFairTag(tag) {
  const raw = (tag || '').trim().replace(/^\[|\]$/g, '');
  if (!raw) return null;

  let m = raw.match(/^FT_(Lil)_MJ(\d+)_L(\d+)_(Early|Mid|Late)$/);
  if (m) {
    return {
      kind: 'training',
      collab: 'Lilith',
      mjStage: Number(m[2]),
      cStage: Number(m[3]),
      lilithCohort: m[4],
    };
  }
  m = raw.match(/^FT_(\w+)_MJ(\d+)_C(\d+)$/);
  if (m) {
    return {
      kind: 'training',
      collab: m[1],
      mjStage: Number(m[2]),
      cStage: Number(m[3]),
    };
  }
  m = raw.match(/^FBS_(\w+)_(Low|Mid|High)$/);
  if (m) return { kind: 'boost', collab: m[1], tier: m[2] };

  m = raw.match(/^FTP_Lil_MJ(\d+)_L(\d+)$/);
  if (m) {
    return { kind: 'photo', collab: 'Lilith', mjStage: Number(m[1]), cStage: Number(m[2]) };
  }
  m = raw.match(/^FTP_(\w+)_MJ(\d+)_C(\d+)$/);
  if (m) {
    return { kind: 'photo', collab: m[1], mjStage: Number(m[2]), cStage: Number(m[3]) };
  }

  m = raw.match(/^FD_WI_(\d+)_(\w+)_(Open|C1|C2|EndA|EndB)$/);
  if (m) {
    const part = m[3];
    const pool =
      part === 'Open'
        ? 'fair.day.weighIn.open'
        : part === 'C1'
          ? 'fair.day.weighIn.choice1'
          : part === 'C2'
            ? 'fair.day.weighIn.choice2'
            : part === 'EndA'
              ? 'fair.day.weighIn.endingA'
              : 'fair.day.weighIn.endingB';
    return {
      kind: 'day',
      pool,
      fairStageIdx: Number(m[1]),
      fairInfluence: INF_FROM_TAG[m[2]] || 'None',
    };
  }
  m = raw.match(/^FD_JU_(\d+)_(\w+)$/);
  if (m) {
    return {
      kind: 'day',
      pool: 'fair.day.judging',
      fairStageIdx: Number(m[1]),
      fairInfluence: INF_FROM_TAG[m[2]] || 'None',
    };
  }
  m = raw.match(/^FD_AP_(\d+)_(\w+)_(Open|C1|C2|End)$/);
  if (m) {
    const part = m[3];
    const pool =
      part === 'Open'
        ? 'fair.day.afterparty.open'
        : part === 'C1'
          ? 'fair.day.afterparty.choice1'
          : part === 'C2'
            ? 'fair.day.afterparty.choice2'
            : 'fair.day.afterparty.ending';
    return {
      kind: 'day',
      pool,
      fairStageIdx: Number(m[1]),
      fairInfluence: INF_FROM_TAG[m[2]] || 'None',
    };
  }
  return null;
}

export function resolveFairPlaceholder(tagOrText, mjStudent, week = 1, extraGlobals = {}) {
  const s = (tagOrText || '').trim();
  if (!s || !mjStudent) return s;
  if (!s.startsWith('[')) {
    const ctx = buildFairCtx(mjStudent, week, extraGlobals);
    return appendV2Depth(s, 'fairQueen', ctx, 0.24);
  }
  const parsed = parseFairTag(s);
  if (!parsed) return s;

  if (parsed.kind === 'training') {
    const ctx = buildFairCtx(mjStudent, week, {
      fairCollab: parsed.collab,
      mjStage: parsed.mjStage,
      cStage: parsed.cStage,
      mjStageBucket: fairStageBucket(parsed.mjStage),
      cStageBucket: fairStageBucket(parsed.cStage),
      lilithCohort: parsed.lilithCohort,
      partnerName: extraGlobals.partnerName,
      ...extraGlobals,
    });
    const line = renderPoolKey(`fair.training.${parsed.collab}`, ctx, 0.3);
    return line || s;
  }
  if (parsed.kind === 'boost') {
    const ctx = buildFairCtx(mjStudent, week, {
      fairCollab: parsed.collab,
      fairBoostTier: parsed.tier,
      ...extraGlobals,
    });
    const line = renderPoolKey(`fair.boost.${parsed.collab}`, ctx, 0.22);
    return line || s;
  }
  if (parsed.kind === 'photo') {
    const ctx = buildFairCtx(mjStudent, week, {
      fairCollab: parsed.collab,
      mjStage: parsed.mjStage,
      cStage: parsed.cStage,
      mjStageBucket: fairStageBucket(parsed.mjStage),
      partnerName: extraGlobals.partnerName || parsed.collab,
      ...extraGlobals,
    });
    const line = renderPoolKey(`fair.photo.${parsed.collab}`, ctx, 0.18);
    return line || s;
  }
  const ctx = buildFairCtx(mjStudent, week, {
    fairStageIdx: parsed.fairStageIdx,
    fairInfluence: parsed.fairInfluence,
    ...extraGlobals,
  });
  const line = renderPoolKey(parsed.pool, ctx, 0.28);
  return line || s;
}

/** Pride boost summary line (replaces raw `[FBS_*]` tag). */
export function renderFairBoostSummary(collabKey, tier, mjStudent, week = 1, extraGlobals = {}) {
  const collab = collabKey || 'Brittany';
  const t = tier || 'Mid';
  return resolveFairPlaceholder(`[FBS_${collab}_${t}]`, mjStudent, week, extraGlobals);
}

/** Multi-line fair day result (choice + ending tags joined). */
export function resolveFairDayBlock(text, mjStudent, week, extraGlobals = {}) {
  if (!text?.trim()) return '';
  return text
    .split('\n\n')
    .map((chunk) => resolveFairPlaceholder(chunk.trim(), mjStudent, week, extraGlobals))
    .filter(Boolean)
    .join('\n\n');
}
