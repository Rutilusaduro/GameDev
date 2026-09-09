// ═══════════════════════════════════════════════════════════════
// ERROR RING BUFFER — last N runtime errors for Field Notes (§36)
// ═══════════════════════════════════════════════════════════════

const MAX_ERRORS = 20;
const buffer = [];

function pushEntry(entry) {
  buffer.push({ ...entry, at: new Date().toISOString() });
  while (buffer.length > MAX_ERRORS) buffer.shift();
}

export function getErrorRingBuffer() {
  return [...buffer];
}

export function clearErrorRingBuffer() {
  buffer.length = 0;
}

export function initErrorCapture() {
  if (typeof window === 'undefined' || window.__hallPassErrorsInit || window.__profSimErrorsInit) return;
  window.__hallPassErrorsInit = true;

  window.addEventListener('error', (ev) => {
    pushEntry({
      type: 'error',
      message: ev.message || String(ev.error),
      stack: ev.error?.stack || null,
      source: ev.filename ? `${ev.filename}:${ev.lineno}` : null,
    });
  });

  window.addEventListener('unhandledrejection', (ev) => {
    const reason = ev.reason;
    pushEntry({
      type: 'unhandledrejection',
      message: reason?.message || String(reason),
      stack: reason?.stack || null,
    });
  });
}
