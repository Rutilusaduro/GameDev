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
  milestone: 'milestone.v2.depth',
  campus: 'campus.v2.depth',
  device: 'device.v2.depth',
  intimacy: 'intimacy.v2.depth',
  hunger: 'hunger.v2.depth',
  growth: 'growth.v2.depth',
  immobility: 'immobility.v2.depth',
  weekly: 'weekly.v2.depth',
  confront: 'confront.v2.depth',
  psych: 'psych.v2.depth',
  eating: 'eating.v2.depth',
  clothing: 'clothing.v2.depth',
  memory: 'memory.v2.depth',
  settling: 'settling.v2.depth',
  origin: 'origin.v2.depth',
  ascension: 'ascension.v2.depth',
  lab: 'lab.v2.depth',
  forceFeed: 'forceFeed.v2.depth',
  feedVoice: 'feedVoice.v2.depth',
  cultivator: 'cultivator.v2.depth',
  hunt: 'hunt.v2.depth',
  roster: 'roster.v2.depth',
  scrutiny: 'scrutiny.v2.depth',
  discontent: 'discontent.v2.depth',
  campusNav: 'campusNav.v2.depth',
  earlyGain: 'earlyGain.v2.depth',
  evolved: 'evolved.v2.depth',
  spirit: 'spirit.v2.depth',
  ritual: 'ritual.v2.depth',
  dream: 'dream.v2.depth',
  gossip: 'gossip.v2.depth',
  resonance: 'resonance.v2.depth',
  campusDevice: 'campusDevice.v2.depth',
  opposition: 'opposition.v2.depth',
  campusSecret: 'campusSecret.v2.depth',
  journal: 'journal.v2.depth',
  streamPre: 'streamPre.v2.depth',
  wifeLessons: 'wifeLessons.v2.depth',
  wifeLessonsTalk: 'wifeLessonsTalk.v2.depth',
};

/** Append a V2 depth beat when pool resolves and chance hits. */
export function appendV2Depth(baseText, kind, ctx, chance = 0.38) {
  const pool = POOLS[kind];
  if (!pool || !baseText?.trim() || Math.random() > chance) return baseText;
  const depth = render(`{${pool}}`, ctx)?.trim();
  return depth ? `${baseText}\n\n${depth}` : baseText;
}
