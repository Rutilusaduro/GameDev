// ═══════════════════════════════════════════════════════════════
// DOSSIER — per-girl living journal assembled from weekly snapshots.
// Engine-free read model: snapshots append on week advance; UI assembles.
// ═══════════════════════════════════════════════════════════════
import { getCorruptionTier } from './corruption.js';
import { getDiscontentTier } from './discontent.js';
import { GATEWAY_MOMENTS } from './gatewayMoments.js';
import { NARRATIVE_EVENTS } from './weeklyEventDefs.js';
import {
  FIT_STATES,
  garmentFitState,
  outfitFor,
  worstFitState,
} from './outfits.js';
import {
  getDependenceTier,
  getFixationTier,
  getObsessionTier,
  getShameTier,
  PSYCH_TIERS,
} from './psychState.js';
import { getTier } from './sessions.js';
import { WEIGHT_STAGES, getStage } from './stages.js';

export const DOSSIER_SNAPSHOT_CAP = 60;
export const DOSSIER_PIN_CAP = 16;

const PSYCH_KEYS = ['fixation', 'obsession', 'dependence', 'shame'];

const MEMORY_PIN_KINDS = {
  stageUp: 'stageUp',
  scaleBreak: 'scaleBreak',
  bondShift: 'bondShift',
  stuffed: 'stuffed',
  feast: 'feast',
  forced: 'forced',
  ascended: 'ascended',
  ascensionDeclined: 'ascensionDeclined',
};

function psychTierIds(psych = {}) {
  return {
    fixation: getFixationTier(psych.fixation ?? 0).id,
    obsession: getObsessionTier(psych.obsession ?? 0).id,
    dependence: getDependenceTier(psych.dependence ?? 0).id,
    shame: getShameTier(psych.shame ?? 0).id,
  };
}

export function ensureDossierFields(student) {
  if (!student) return student;
  return {
    ...student,
    dossierSnapshots: Array.isArray(student.dossierSnapshots) ? student.dossierSnapshots : [],
    pinnedMoments: Array.isArray(student.pinnedMoments) ? student.pinnedMoments : [],
    wardrobeMorgue: Array.isArray(student.wardrobeMorgue) ? student.wardrobeMorgue : [],
  };
}

export function momentId(week, kind, ref = '') {
  return `${week}-${kind}-${ref}`;
}

function priorSnapshot(student) {
  const snaps = student?.dossierSnapshots || [];
  return snaps.length ? snaps[snaps.length - 1] : null;
}

function deriveWeeklyFlags(student, week, opts = {}) {
  const flags = [];
  const mems = (student.memories || []).filter((m) => m.w === week);
  for (const m of mems) {
    if (MEMORY_PIN_KINDS[m.t]) {
      flags.push(m.v != null ? `${m.t}:${m.v}` : m.t);
    }
  }
  const prevTriggered = opts.prevTriggeredEvents || [];
  const triggered = student.triggeredEvents || [];
  for (const evId of triggered) {
    if (!prevTriggered.includes(evId)) flags.push(`narrative:${evId}`);
  }
  for (const g of GATEWAY_MOMENTS) {
    if (g.studentId !== student.id) continue;
    if (student[g.flag] && !opts.prevGateway?.[g.flag]) flags.push(`gateway:${g.flag}`);
  }
  const worst = worstFitState(student);
  if (worst === 'burst' || worst === 'failing') flags.push(`garment:${worst}`);
  if (student.ascension?.formId && mems.some((m) => m.t === 'ascended')) {
    flags.push(`ascended:${student.ascension.formId}`);
  }
  return flags;
}

function closestGarmentStrain(student) {
  const outfit = outfitFor(student);
  const lbs = student?.lbs ?? 0;
  let best = null;
  for (const slot of ['waist', 'bottom', 'top']) {
    const garment = outfit[slot];
    if (!garment) continue;
    const state = garmentFitState(garment, lbs);
    if (!state) continue;
    const idx = FIT_STATES.indexOf(state);
    const pct = Math.round((idx / (FIT_STATES.length - 1)) * 100);
    if (!best || pct > best.pct) {
      best = { slot, name: garment.name, state, pct, fitLbs: garment.fitLbs };
    }
  }
  return best;
}

function psychNearShift(student) {
  const psych = student?.psych || {};
  let nearest = null;
  for (const key of PSYCH_KEYS) {
    const val = psych[key] ?? 0;
    const tier = PSYCH_TIERS.slice().reverse().find((t) => val >= t.min) || PSYCH_TIERS[0];
    const next = PSYCH_TIERS.find((t) => t.id === tier.id + 1);
    if (!next) continue;
    const gap = next.min - val;
    if (!nearest || gap < nearest.gap) {
      nearest = { axis: key, gap, nextTier: next, currentTier: tier, value: val };
    }
  }
  return nearest;
}

function lockedSceneHint(student) {
  const stageId = getStage(student?.lbs ?? 0).id;
  const triggered = student?.triggeredEvents || [];
  const archetype = student?.archetype;
  const candidates = NARRATIVE_EVENTS.filter((ev) => {
    if (triggered.includes(ev.id)) return false;
    if (ev.archetype && ev.archetype !== archetype) return false;
    return ev.stageMin > stageId || (ev.stageMin <= stageId && !ev.archetype);
  }).sort((a, b) => a.stageMin - b.stageMin);
  const next = candidates[0];
  if (!next) return null;
  const stage = WEIGHT_STAGES[next.stageMin];
  return {
    eventId: next.id,
    title: next.title,
    stageMin: next.stageMin,
    stageLabel: stage?.label || `stage ${next.stageMin}`,
    hint: next.stageMin > stageId
      ? `She isn't ready for "${next.title}" yet — that beat wants ${stage?.label || 'more size'}.`
      : `"${next.title}" hasn't happened yet — the campus may still surprise you.`,
  };
}

export function computeNextThreshold(student) {
  const stage = getStage(student?.lbs ?? 0);
  const nextStage = WEIGHT_STAGES.find((ws) => ws.id === stage.id + 1);
  const lbsToNextRung = nextStage ? Math.max(0, Math.round(nextStage.min - (student?.lbs ?? 0))) : 0;
  const garment = closestGarmentStrain(student);
  const psych = psychNearShift(student);
  const lockedScene = lockedSceneHint(student);
  const peakLbs = student?.ascension?.peakLbs ?? student?.peakLbs ?? null;
  return {
    stageLabel: stage.label,
    lbsToNextRung,
    nextStageLabel: nextStage?.label || null,
    garment,
    psych,
    lockedScene,
    peakLbs,
  };
}

export function buildDossierSnapshot(student, week, opts = {}) {
  const prev = priorSnapshot(student);
  const lbs = Math.round(student?.lbs ?? 0);
  const lbsDelta = prev ? lbs - prev.lbs : Math.max(0, lbs - (student?.weekStartLbs ?? lbs));
  const stageId = getStage(lbs).id;
  return {
    week,
    lbs,
    lbsDelta,
    stageId,
    psychTiers: psychTierIds(student?.psych),
    relTier: getTier(student?.relationship ?? 0).id,
    corruptionTier: getCorruptionTier(student?.corruption ?? 0).id,
    discontentTier: getDiscontentTier(student).id,
    garmentWorst: worstFitState(student),
    peakLbs: student?.ascension?.peakLbs ?? student?.peakLbs ?? null,
    flags: deriveWeeklyFlags(student, week, opts),
  };
}

export function pinLabel(kind, week, ref, student) {
  switch (kind) {
    case 'stageUp': {
      const stage = WEIGHT_STAGES[Number(ref)] || null;
      return `${stage?.label || 'New stage'} — week ${week}`;
    }
    case 'scaleBreak':
      return `Scale gave way — week ${week}`;
    case 'bondShift':
      return `Trust shifted (${ref || 'closer'}) — week ${week}`;
    case 'stuffed':
      return `Stuffed all week — week ${week}`;
    case 'feast':
      return `Feast — week ${week}`;
    case 'forced':
      return `Pushed past comfort — week ${week}`;
    case 'ascended':
      return `Ascended — week ${week}`;
    case 'ascensionDeclined':
      return `Declined the threshold — week ${week}`;
    case 'gateway':
      return `Signature threshold — week ${week}`;
    case 'narrative':
      return `${NARRATIVE_EVENTS.find((e) => e.id === ref)?.title || ref} — week ${week}`;
    case 'garment':
      return `${ref || 'Garment'} failure — week ${week}`;
    default:
      return `${student?.name || 'She'} — week ${week}`;
  }
}

function maybeArchiveBurstGarments(student, week) {
  const outfit = outfitFor(student);
  const morgue = [...(student.wardrobeMorgue || [])];
  const archivedIds = new Set(morgue.map((g) => g.id));
  for (const slot of ['waist', 'bottom', 'top']) {
    const garment = outfit[slot];
    if (!garment) continue;
    const state = garmentFitState(garment, student?.lbs ?? 0);
    if (state !== 'burst' && state !== 'failing') continue;
    const id = `${week}-${slot}-${garment.id}`;
    if (archivedIds.has(id)) continue;
    morgue.push({
      id,
      week,
      slot,
      name: garment.name,
      fitLbs: garment.fitLbs,
      cause: state,
      label: `${garment.name}, week ${week}, ${state === 'burst' ? 'gave out' : 'honorable strain'}`,
    });
  }
  return morgue.slice(-12);
}

function syncAutoPinnedMoments(student, week, opts = {}) {
  const pins = [...(student.pinnedMoments || [])];
  const seen = new Set(pins.map((p) => p.id));
  const addPin = (kind, ref, excerpt = null) => {
    const id = momentId(week, kind, ref);
    if (seen.has(id)) return;
    seen.add(id);
    pins.push({
      id,
      week,
      kind,
      ref,
      label: pinLabel(kind, week, ref, student),
      excerpt,
      seed: null,
    });
  };

  const mems = (student.memories || []).filter((m) => m.w === week);
  for (const m of mems) {
    if (!MEMORY_PIN_KINDS[m.t]) continue;
    let excerpt = null;
    if (m.t === 'stageUp' && opts.milestoneByStudent?.[student.id]) {
      excerpt = opts.milestoneByStudent[student.id].prose || null;
    }
    addPin(m.t, m.v ?? m.t, excerpt);
  }

  const prevTriggered = opts.prevTriggeredEvents || [];
  for (const evId of student.triggeredEvents || []) {
    if (!prevTriggered.includes(evId)) addPin('narrative', evId);
  }

  for (const g of GATEWAY_MOMENTS) {
    if (g.studentId !== student.id) continue;
    if (student[g.flag] && !opts.prevGateway?.[g.flag]) addPin('gateway', g.flag);
  }

  const worst = worstFitState(student);
  if (worst === 'burst') addPin('garment', worst);

  return pins.slice(-DOSSIER_PIN_CAP);
}

/** Player-chosen pin from SceneStage long-press (B2). */
export function pinPlayerMoment(student, { week, excerpt, sceneId, beatIndex }) {
  const base = ensureDossierFields(student);
  const id = momentId(week, 'player', `${sceneId || 'scene'}:${beatIndex ?? 0}`);
  const pins = [...(base.pinnedMoments || [])];
  if (pins.some((p) => p.id === id)) return base;
  pins.push({
    id,
    week,
    kind: 'player',
    ref: sceneId || 'scene',
    label: `Your moment — week ${week}`,
    excerpt: excerpt?.slice(0, 600) || null,
    seed: beatIndex ?? null,
  });
  return { ...base, pinnedMoments: pins.slice(-DOSSIER_PIN_CAP) };
}

export function appendDossierSnapshot(student, week, opts = {}) {
  const base = ensureDossierFields(student);
  const snapshot = buildDossierSnapshot(base, week, opts);
  const prevSnaps = base.dossierSnapshots || [];
  const filtered = prevSnaps.filter((s) => s.week !== week);
  const dossierSnapshots = [...filtered, snapshot].slice(-DOSSIER_SNAPSHOT_CAP);
  const wardrobeMorgue = maybeArchiveBurstGarments(base, week);
  const pinnedMoments = syncAutoPinnedMoments(
    { ...base, dossierSnapshots, wardrobeMorgue },
    week,
    opts,
  );
  return { ...base, dossierSnapshots, pinnedMoments, wardrobeMorgue };
}

export function backfillDossierIfEmpty(student, week) {
  const base = ensureDossierFields(student);
  if (base.dossierSnapshots.length > 0) return base;
  return appendDossierSnapshot(base, week, { backfill: true });
}

export function assembleDossier(student, week) {
  const s = backfillDossierIfEmpty(student, week);
  const snapshots = s.dossierSnapshots || [];
  const last = snapshots[snapshots.length - 1] || null;
  const wowDelta = last?.lbsDelta ?? Math.max(0, Math.round((s.lbs ?? 0) - (s.weekStartLbs ?? s.lbs ?? 0)));
  const stageCrossings = snapshots.filter((snap, idx) => {
    if (idx === 0) return false;
    return snap.stageId > snapshots[idx - 1].stageId;
  });
  const garmentFailures = snapshots.filter((snap) => snap.flags?.some((f) => f.startsWith('garment:')));
  const pins = [...(s.pinnedMoments || [])].sort((a, b) => b.week - a.week);
  return {
    header: {
      name: s.name,
      stageId: getStage(s.lbs ?? 0).id,
      stageLabel: getStage(s.lbs ?? 0).label,
      wowDelta,
      lbs: Math.round(s.lbs ?? 0),
    },
    weightLine: {
      snapshots,
      stageCrossings,
      garmentFailures,
      peakLbs: s.ascension?.peakLbs ?? s.peakLbs ?? null,
      startLbs: s.startLbs ?? s.lbs,
    },
    psychBands: snapshots.map((snap) => ({ week: snap.week, tiers: snap.psychTiers })),
    pinnedMoments: pins,
    wardrobeMorgue: s.wardrobeMorgue || [],
    nextThreshold: computeNextThreshold(s),
  };
}
