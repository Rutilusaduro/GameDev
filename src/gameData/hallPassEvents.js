// ═══════════════════════════════════════════════════════════════
// HALL PASS — browser custom events (shift log, etc.)
// ═══════════════════════════════════════════════════════════════

export const EVENT_OPEN_FIELD_NOTES = 'hallPass:openFieldNotes';
/** @deprecated listen via EVENT_OPEN_FIELD_NOTES */
export const LEGACY_EVENT_OPEN_FIELD_NOTES = 'profSim:openFieldNotes';

export function dispatchOpenFieldNotes(detail = {}) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(EVENT_OPEN_FIELD_NOTES, { detail }));
  window.dispatchEvent(new CustomEvent(LEGACY_EVENT_OPEN_FIELD_NOTES, { detail }));
}

export function subscribeOpenFieldNotes(handler) {
  if (typeof window === 'undefined') return () => {};
  const wrapped = (ev) => handler(ev);
  window.addEventListener(EVENT_OPEN_FIELD_NOTES, wrapped);
  window.addEventListener(LEGACY_EVENT_OPEN_FIELD_NOTES, wrapped);
  return () => {
    window.removeEventListener(EVENT_OPEN_FIELD_NOTES, wrapped);
    window.removeEventListener(LEGACY_EVENT_OPEN_FIELD_NOTES, wrapped);
  };
}
