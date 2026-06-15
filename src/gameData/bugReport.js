// ═══════════════════════════════════════════════════════════════
// BUG REPORT / FIELD NOTES — snapshot builder (§36)
// ═══════════════════════════════════════════════════════════════

import { getErrorRingBuffer } from '../utils/errorRingBuffer.js';
import { buildGameSaveBlob, encodeSaveBlob } from './gameSave.js';
import { computeTextLintFingerprint } from './textLintMeta.js';

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

export function buildGameSnapshot(ctx, playerNote = null, options = {}) {
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
    attachSave = false,
    saveContext = null,
  } = { ...ctx, ...options };

  const dev = !!import.meta.env?.DEV;
  const textLint = dev ? computeTextLintFingerprint() : null;
  let saveBlob = null;
  if (attachSave && saveContext) {
    try {
      saveBlob = encodeSaveBlob(buildGameSaveBlob(saveContext));
    } catch {
      saveBlob = null;
    }
  }

  return {
    schemaVersion: BUG_REPORT_SCHEMA,
    gameVersion: GAME_VERSION,
    exportedAt: new Date().toISOString(),
    environment: {
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
      viewport: typeof window !== 'undefined' ? { w: window.innerWidth, h: window.innerHeight } : null,
      dev,
      textLint,
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
    saveBlob,
  };
}

const GITHUB_BUG_REPORT_BASE = 'https://github.com/Rutilusaduro/GameDev/issues/new?template=bug_report.yml';

export function buildGitHubIssueUrl(snapshot) {
  if (!snapshot) return GITHUB_BUG_REPORT_BASE;
  const params = new URLSearchParams();
  if (snapshot.playerNote?.category) {
    const catMap = {
      stuck: 'Stuck — can\'t continue',
      blank: 'Blank or frozen screen',
      numbers: 'Numbers look wrong',
      story: 'Story or text broke',
      other: 'Something else',
    };
    params.set('category', catMap[snapshot.playerNote.category] || 'Something else');
  }
  if (snapshot.playerNote?.steps) params.set('steps', snapshot.playerNote.steps);
  params.set('snapshot', serializeBugReport(snapshot).slice(0, 6000));
  if (snapshot.session?.week) params.set('week', String(snapshot.session.week));
  if (snapshot.gameVersion) params.set('version', snapshot.gameVersion);
  if (snapshot.saveBlob) params.set('save_blob', snapshot.saveBlob.slice(0, 4000));
  return `${GITHUB_BUG_REPORT_BASE}&${params.toString()}`;
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
