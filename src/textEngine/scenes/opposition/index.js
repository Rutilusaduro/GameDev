// Opposition endgame render API
import { render, createContext } from '../../engine.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import './endgameBeat.js';
import './depth.js';
import './oppositionSceneDepth.js';
import './oppositionHearingSceneDepth.js';
import './agendaFire.js';
import './agendaCards.js';
import './weighInMandatory.js';
import './aibHearing.js';
import './oppositionHearingFragmentDepth.js';
import './oppositionMonolithFragmentDepth.js';
import './counterOutcome.js';
import './hearingBridge.js';
import '../proseOverhaul.js';
import '../proseOverhaulPass2.js';

export function renderOppositionEndgame(slot, week = 1, opts = {}) {
  if (!slot) return '';
  const ctx = createContext({ week, globals: { ...(opts.globals || {}) }, ...opts });
  const base = render(`{${slot}}`, ctx)?.trim() || '';
  const glow = render('{opposition.afterglow}', ctx)?.trim() || '';
  return appendV2Depth([base, glow].filter(Boolean).join('\n\n'), 'opposition', ctx, opts.v2DepthChance ?? 0.4);
}

export {
  renderHearingPhase,
  renderHearingChoiceResult,
  renderHearingEnding,
} from './hearingBridge.js';
