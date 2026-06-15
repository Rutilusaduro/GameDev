// ═══════════════════════════════════════════════════════════════
// TEXT LINT META — registry fingerprint for DEV snapshots (§38)
// ═══════════════════════════════════════════════════════════════

import { _registryEntries } from '../textEngine/engine.js';

export function computeTextLintFingerprint() {
  const entries = _registryEntries();
  const keys = entries.map(([k]) => k).sort();
  let hash = 0;
  const joined = keys.join('|');
  for (let i = 0; i < joined.length; i++) {
    hash = ((hash << 5) - hash + joined.charCodeAt(i)) | 0;
  }
  return {
    moduleCount: keys.length,
    hash: `tl-${(hash >>> 0).toString(16)}`,
    sampleKeys: keys.slice(0, 8),
  };
}
