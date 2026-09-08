// Campus secret discovery prose
import { render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';

export function renderSecretDiscover(secret, student, week = 1, opts = {}) {
  if (!secret?.discover) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { secretId: secret.id, nodeId: secret.nodeId, ...(opts.globals || {}) },
    ...opts,
  });
  const base = secret.discover.trim();
  return appendV2Depth(base, 'campusSecret', ctx, opts.v2DepthChance ?? 0.35);
}

export function formatSecretDiscoverLine(secret, student, week = 1, opts = {}) {
  const prose = renderSecretDiscover(secret, student, week, opts);
  return prose ? `🔓 ${prose}` : '';
}
