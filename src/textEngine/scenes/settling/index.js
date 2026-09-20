// The Squad — Lead: A3 Immobility | Support: A7 Artisan, A5 Editor
// Settling scene barrel + render entrypoint for the 3-tree endgame loop.
// Socialize / Feed / Care subs render through here; comfort + refit + visit
// subs reuse the existing immob.* pools via their sceneKey.
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import './care.js';
import './socialize.js';
import './feed.js';
import './gather.js';
import './weigh.js';
import './enormity.js';
import './settlingSceneDepth.js';
import './settlingFragmentDepth.js';
import './settlingFeedFragmentDepth.js';
import './settlingMonolithFragmentDepth.js';

registerPool('set.linger', [
  { when: { leftoverFed: true, stageMin: 10 }, weight: 3, text: [
    'Foil warmth still occupies her when they gather. She does not hide it.',
    'The sitting from the kitchen plus this court. She presides from both.',
  ] },
  { when: { nightVisit: true, stageMin: 10 }, weight: 3, text: [
    'The late knock still lives in the doorframe. Court uses that opening.',
  ] },
  { when: { stageMin: 11 }, weight: 2, text: [
    'They leave slower than they arrived. Heat keeps the room after the hour.',
  ] },
  { when: {}, text: [
    'The room keeps her heat after they go.',
    'Someone leaves a plate. The plate does not last.',
    'She settles deeper. The gathering was extra proof.',
  ] },
]);

/**
 * Render a settling action scene.
 * @param {string} sceneKey  pool key from SETTLING_ACTIONS (e.g. 'set.feed.spread', 'immob.refit')
 * @param {object} student   the immobile subject
 * @param {object} opts      { week, ref, globals, trace, ... }
 */
export function renderSettlingScene(sceneKey, student, opts = {}) {
  if (!sceneKey || !student) return '';
  const { week = 1, ref = null, globals = {}, trace = null, ...rest } = opts;
  const ctx = buildTextContext({
    subject: student,
    ref,
    week,
    globals: {
      courtPreference: student.courtPreference,
      ...globals,
    },
    ...rest,
  });
  const base = render(`{${sceneKey}}`, ctx, { trace })?.trim() || '';
  const linger = render('{set.linger}', ctx, { trace })?.trim() || '';
  return appendV2Depth([base, linger].filter(Boolean).join('\n\n'), 'settling', ctx, opts.v2DepthChance ?? 0.28);
}
