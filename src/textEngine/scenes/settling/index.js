// The Squad — Lead: A3 Immobility | Support: A7 Artisan, A5 Editor
// Settling scene barrel + render entrypoint for the 3-tree endgame loop.
// Socialize / Feed / Care subs render through here; comfort + refit + visit
// subs reuse the existing immob.* pools via their sceneKey.
import { render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import './care.js';
import './socialize.js';
import './feed.js';
import './gather.js';
import './weigh.js';

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
  return render(`{${sceneKey}}`, ctx, { trace })?.trim() || '';
}
