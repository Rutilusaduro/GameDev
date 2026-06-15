// ═══════════════════════════════════════════════════════════════
// BUG REPORT / FIELD NOTES — snapshot builder (§36)
// ═══════════════════════════════════════════════════════════════

import { getErrorRingBuffer } from '../utils/errorRingBuffer.js';

export const BUG_REPORT_SCHEMA = 1;
export const GAME_VERSION = '1.0.0';

function trimStudent(s) {
  return {
    id: s.id,
    name: s.name,
    archetype: s.archetype,
    lbs: Math.round(s.lbs),
    evolvedForm: s.evolvedForm || null,
    supernaturalForm: s.supernaturalForm || null,
    hidden: !!s.hidden,
    relationship: s.relationship,
    mood: s.mood,
    aibSuspensionWeeks: s.aibSuspensionWeeks || 0,
    oppositionBlockedGain: !!s.oppositionBlockedGain,
  };
}

export function buildGameSnapshot(ctx, playerNote = null) {
  const {
    week,
    ap,
    money,
    adminScrutiny,
    students,
    opposition,
    view,
    log,
    lastPlayerAction,
    activeModals = [],
    eventQueueLen = 0,
    campusState,
    pharmacistState,
  } = ctx;

  return {
    schemaVersion: BUG_REPORT_SCHEMA,
    gameVersion: GAME_VERSION,
    exportedAt: new Date().toISOString(),
    environment: {
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
      viewport: typeof window !== 'undefined' ? { w: window.innerWidth, h: window.innerHeight } : null,
      dev: !!import.meta.env?.DEV,
    },
    session: {
      week,
      ap,
      money,
      adminScrutiny,
      view: view || null,
    },
    students: (students || []).map(trimStudent),
    opposition: opposition || null,
    campus: campusState ? {
      saturationScore: campusState.saturation?.score ?? null,
      secretsSolved: campusState.exploration?.secretsSolved?.length ?? 0,
    } : null,
    pharmacist: pharmacistState ? {
      stage: pharmacistState.stage,
      campusFattening: !!pharmacistState.campusFattening,
      exposure: pharmacistState.exposure ?? null,
    } : null,
    ui: {
      activeModals,
      eventQueueLen,
      lastPlayerAction: lastPlayerAction || null,
    },
    logTail: (log || []).slice(-40),
    errors: getErrorRingBuffer(),
    playerNote,
  };
}

export function serializeBugReport(snapshot) {
  return JSON.stringify(snapshot, null, 2);
}

export async function copyBugReport(snapshot) {
  const text = serializeBugReport(snapshot);
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }
  return false;
}

export function downloadBugReport(snapshot, filename) {
  const text = serializeBugReport(snapshot);
  const blob = new Blob([text], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || `field-note-week-${snapshot.session?.week ?? 0}-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export const FIELD_NOTE_CATEGORIES = [
  { id: 'stuck', label: 'Stuck — can\'t continue' },
  { id: 'blank', label: 'Blank or frozen screen' },
  { id: 'numbers', label: 'Numbers look wrong' },
  { id: 'story', label: 'Story or text broke' },
  { id: 'other', label: 'Something else' },
];
