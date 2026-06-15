// ═══════════════════════════════════════════════════════════════
// DIALOGUE FLAG LOG — persistent list for Dialogue Lab + popup flags
// ═══════════════════════════════════════════════════════════════
import { formatTextFlagExport } from '../textEngine/textFlagFormat.js';

const STORAGE_KEY = 'ps_dialogue_flag_log';
const CHANGED_EVENT = 'ps-text-flags-changed';

function notify() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(CHANGED_EVENT));
  }
}

export function loadTextFlags() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addTextFlag(entry) {
  const item = {
    id: entry.id || `flag_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    section: entry.section || 'unknown',
    stateLine: entry.stateLine || '—',
    text: entry.text || '',
    problems: entry.problems || [],
    savedAt: Date.now(),
  };
  const list = [...loadTextFlags(), item];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  notify();
  return item;
}

export function clearTextFlags() {
  localStorage.removeItem(STORAGE_KEY);
  notify();
}

export function formatTextFlagsForExport(flags = loadTextFlags()) {
  return formatTextFlagExport(flags);
}

export function downloadTextFlagsTxt({ week, filename } = {}) {
  const flags = loadTextFlags();
  if (!flags.length) return false;
  const body = formatTextFlagsForExport(flags);
  const header = `Dialogue flag log · ${flags.length} entr${flags.length === 1 ? 'y' : 'ies'} · exported ${new Date().toLocaleString()}\n${'='.repeat(60)}\n\n`;
  const blob = new Blob([header + body], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || `dialogue-flags-week-${week ?? 'x'}-${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  return true;
}

export function subscribeTextFlags(callback) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(CHANGED_EVENT, callback);
  return () => window.removeEventListener(CHANGED_EVENT, callback);
}
