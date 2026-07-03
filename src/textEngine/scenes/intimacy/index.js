// The Squad — Lead: A2 Psych | Support: A4 Architect
// Intimacy scene render helpers — prose pools in ./scenes.js
import { render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import './fragments.js';
import './skeletons.js';
import './depth.js';
import './selectors.js';
import './personas.js';
import './immobileOverrides.js';

function composeOverlay(main, overlay) {
  const a = main?.trim() || '';
  const b = overlay?.trim() || '';
  if (a && b) return `${a} ${b}`;
  return a || b;
}

function renderIntimacyOverlay(ctx, opts = {}) {
  const overlay = render('{intimacy.selectorOverlay}', ctx, { trace: opts.trace || null })?.trim() || '';
  return overlay;
}

export function buildIntimacyContext(student, history, relTier, week = 1, opts = {}) {
  const globals = { relTier, ...(opts.globals || {}) };
  for (const flag of history || []) globals[flag] = true;
  return buildTextContext({ subject: student, week, globals, ...opts });
}

export function renderIntimacyPhase(sceneId, phaseIdx, student, history, relTier, week = 1, opts = {}) {
  if (!student || !sceneId) return '';
  const ctx = buildIntimacyContext(student, history, relTier, week, opts);
  const depth = phaseIdx === 0 ? render('{intimacy.depth}', ctx, { trace: opts.trace || null })?.trim() : '';
  const main = render(`{intimacy.${sceneId}.p${phaseIdx}}`, ctx, { trace: opts.trace || null })?.trim() || '';
  const overlay = renderIntimacyOverlay(ctx, opts);
  const body = [depth, main].filter(Boolean).join(' ');
  return composeOverlay(body, overlay);
}

/** Depth overlay only — approach/bodyFeel/resistance/psychVoice/climax. */
export function renderIntimacyDepth(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  return render('{intimacy.depth}', ctx, { trace: opts.trace || null })?.trim() || '';
}

export function renderIntimacyChoice(sceneId, choiceId, student, week = 1, opts = {}) {
  if (!student || !sceneId || !choiceId) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  const main = render(`{intimacy.${sceneId}.ch.${choiceId}}`, ctx, { trace: opts.trace || null })?.trim() || '';
  return composeOverlay(main, renderIntimacyOverlay(ctx, opts));
}

/** The pin blackout — she pinned the player and he passed out; the week ends. */
export function renderIntimacyPassout(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  return render('{intimacy.blackout}', ctx, { trace: opts.trace || null })?.trim() || '';
}

export function renderIntimacyEnding(sceneId, endingIdx, student, week = 1, opts = {}) {
  if (!student || !sceneId) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  const main = render(`{intimacy.${sceneId}.end${endingIdx}}`, ctx, { trace: opts.trace || null })?.trim() || '';
  return composeOverlay(main, renderIntimacyOverlay(ctx, opts));
}
