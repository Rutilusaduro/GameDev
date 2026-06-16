// The Squad — Lead: A2 Psych | Support: A4 Architect
// Intimacy scene render helpers — prose pools in ./scenes.js
import { render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import './scenes.js';
import './depth.js';

export function buildIntimacyContext(student, history, relTier, week = 1, opts = {}) {
  const globals = { relTier, ...(opts.globals || {}) };
  for (const flag of history || []) globals[flag] = true;
  return buildTextContext({ subject: student, week, globals, ...opts });
}

export function renderIntimacyPhase(sceneId, phaseIdx, student, history, relTier, week = 1, opts = {}) {
  if (!student || !sceneId) return '';
  const ctx = buildIntimacyContext(student, history, relTier, week, opts);
  const depth = phaseIdx === 0 ? render('{intimacy.depth}', ctx, { trace: opts.trace || null })?.trim() : '';
  const line = render(`{intimacy.${sceneId}.p${phaseIdx}}`, ctx, { trace: opts.trace || null });
  const main = line?.trim() || '';
  if (depth && main) return `${depth} ${main}`;
  return depth || main;
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
  const line = render(`{intimacy.${sceneId}.ch.${choiceId}}`, ctx, { trace: opts.trace || null });
  return line?.trim() || '';
}

export function renderIntimacyEnding(sceneId, endingIdx, student, week = 1, opts = {}) {
  if (!student || !sceneId) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  const line = render(`{intimacy.${sceneId}.end${endingIdx}}`, ctx, { trace: opts.trace || null });
  return line?.trim() || '';
}
