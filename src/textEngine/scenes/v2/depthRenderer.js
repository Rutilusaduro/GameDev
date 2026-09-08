// V2.0 — optional depth layer appended to high-traffic scene renders
import { render } from '../../engine.js';

const POOLS = {
  feed: 'feed.v2.depth',
  talk: 'talk.v2.depth',
  wi: 'wi.v2.depth',
  dinner: 'dinner.v2.depth',
  session: 'session.v2.depth',
  body: 'body.v2.sensory',
  weekRecap: 'weekRecap.v2.depth',
};

/** Append a V2 depth beat when pool resolves and chance hits. */
export function appendV2Depth(baseText, kind, ctx, chance = 0.38) {
  const pool = POOLS[kind];
  if (!pool || !baseText?.trim() || Math.random() > chance) return baseText;
  const depth = render(`{${pool}}`, ctx)?.trim();
  return depth ? `${baseText}\n\n${depth}` : baseText;
}
