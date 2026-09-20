/** Late-game text overhaul — raw legacyBody slots stop competing at week 20+. */
export const LEGACY_BRIDGE_WEEK_MAX = 19;

export function legacyBridgeWhen(extra = {}) {
  return { weekMax: LEGACY_BRIDGE_WEEK_MAX, ...extra };
}

/** text:lint requires a `{ when: {} }` row; keep priority below modular overlays. */
export function lintWildcardVariant(text) {
  const row = Array.isArray(text) ? text : [text];
  return { when: {}, weight: 1, priority: -1, text: row };
}
