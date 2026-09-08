// Opposition endgame render API
import { render, createContext } from '../../engine.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import './endgameBeat.js';
import './depth.js';
import './agendaFire.js';
import './weighInMandatory.js';
import './aibHearing.js';
import './counterOutcome.js';

export function renderOppositionEndgame(slot, week = 1, opts = {}) {
  if (!slot) return '';
  const ctx = createContext({ week, globals: { ...(opts.globals || {}) }, ...opts });
  const base = render(`{${slot}}`, ctx)?.trim() || '';
  return appendV2Depth(base, 'opposition', ctx, opts.v2DepthChance ?? 0.4);
}
