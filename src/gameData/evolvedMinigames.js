// ═══════════════════════════════════════════════════════════════
// EVOLVED PATH MINI-GAMES — presentation, delivery, campus challenge
// ═══════════════════════════════════════════════════════════════
import { evolvedFloorBonus } from './mechanicDepth.js';

export const EVOLVED_MINIGAMES = {
  campus_challenge: {
    title: 'Food Challenge',
    tag: 'CAMPUS LEGEND',
    accent: '#7a4a1a',
    phases: [
      {
        text: (ctx) => `${ctx.studentName} steps up to the counter. The menu towers in front of her — a crowd already forming, phones out, waiting to see if she'll fold.`,
        choices: [
          { id: 'speed', label: 'Go for speed — inhale before they can blink', score: 2, log: 'She attacks the plate like a dare.' },
          { id: 'show', label: 'Play to the crowd — savor every bite on camera', score: 3, log: 'The room leans in; she makes appetite look like theater.' },
          { id: 'steady', label: 'Steady pace — let fullness build without rushing', score: 1, log: 'She eats with unnerving calm.' },
        ],
      },
      {
        text: (ctx) => `Round two. The staff swaps in a heavier tray. ${ctx.studentName}'s belt is already snug — the crowd wants a finish.`,
        choices: [
          { id: 'push', label: 'Push past comfort — one more wave of plates', score: 3, log: 'She groans, laughs, and keeps going.' },
          { id: 'coach', label: 'Let you coach her pace from the sideline', score: 2, log: 'Your voice steadies her; she trusts the rhythm.' },
          { id: 'tap', label: 'Tap out with grace — still leaves them impressed', score: 0, log: 'She stops just shy of bursting, chin high.' },
        ],
      },
    ],
  },
  delivery_order: {
    title: 'Order In',
    tag: 'HOME NEST',
    accent: '#4a6a4a',
    phases: [
      {
        text: (ctx) => `${ctx.studentName} sprawls on the couch, three delivery apps open. The apartment is quiet except for notification chimes — nowhere else to be tonight.`,
        choices: [
          { id: 'feast', label: 'Order from every app at once', score: 3, log: 'Drivers stack up at the door.' },
          { id: 'favorite', label: 'Stick to one favorite — extra sides', score: 2, log: 'She knows exactly what hits.' },
          { id: 'snack', label: 'Just a snack run — test the waters', score: 0, log: 'A modest start that never stays modest.' },
        ],
      },
      {
        text: (ctx) => `The food arrives. Steam fills the room. ${ctx.studentName} looks at you — permission and appetite in the same glance.`,
        choices: [
          { id: 'feed', label: 'Feed her while she picks the next order', score: 3, log: 'Bite, swipe, repeat — the night blurs.' },
          { id: 'solo', label: 'Let her eat solo while you watch', score: 2, log: 'She performs for an audience of one.' },
          { id: 'pause', label: 'Pause after this round — save room', score: 0, log: 'She pats her belly but the apps stay open.' },
        ],
      },
    ],
  },
  presentation_defense: {
    title: 'Panel Review',
    tag: 'HALL LOG FOCUS',
    accent: '#2c5f8a',
    phases: [
      {
        text: (ctx) => `${ctx.studentName} stands at the hall lounge mic. The review panel has questions. Her season-plan slides chart her body in ways housing pretends are neutral.`,
        choices: [
          { id: 'reframe', label: 'Reframe the data as embodied hall log', score: 3, log: 'The room shifts — curiosity replaces judgment.' },
          { id: 'deflect', label: 'Deflect to methodology — bore them precise', score: 1, log: 'Appendix notes buy time.' },
          { id: 'confess', label: 'Confess appetite as the real season plan', score: 2, log: 'Honesty lands like a thrown gauntlet.' },
        ],
      },
      {
        text: (ctx) => `Follow-up questions. Someone asks about "wellness outcomes." ${ctx.studentName}'s hands rest on her midsection without thinking.`,
        choices: [
          { id: 'hold', label: 'Hold the line — abundance is the finding', score: 3, log: 'She does not apologize for the curve.' },
          { id: 'joke', label: 'Disarm with warmth and a self-deprecating joke', score: 1, log: 'Laughter loosens the room.' },
          { id: 'evidence', label: 'Cite peer comparison data — win on numbers', score: 2, log: 'Charts do what charts do.' },
        ],
      },
    ],
  },
};

export function extraMinigameChoices(gameId, owned = {}) {
  const extras = [];
  if (owned.snack_station || owned.artisan_bakery) {
    extras.push({
      id: 'kitchen_run',
      label: 'Send a runner to the floor kitchen',
      score: 3,
      log: 'Hall leftovers arrive mid-round. She makes room without being asked.',
    });
  }
  if (owned.media_nook && gameId === 'campus_challenge') {
    extras.push({
      id: 'nook_cam',
      label: 'Film it from the media-nook angle',
      score: 2,
      log: 'The ring light finds her. The crowd follows the lens.',
    });
  }
  if (owned.dinner_basic && gameId === 'delivery_order') {
    extras.push({
      id: 'dining_nook',
      label: 'Move the feast to the dining nook',
      score: 2,
      log: 'She relocates. The table was already waiting.',
    });
  }
  if (owned.comfy_chairs && gameId === 'presentation_defense') {
    extras.push({
      id: 'lounge_seat',
      label: 'Offer the panel the new lounge chairs',
      score: 2,
      log: 'They sit. They stay. The questions get softer.',
    });
  }
  return extras.slice(0, 2);
}

export function minigameChoicesForPhase(gameId, phaseIdx, owned = {}) {
  const phase = EVOLVED_MINIGAMES[gameId]?.phases[phaseIdx];
  if (!phase) return [];
  return [...phase.choices, ...extraMinigameChoices(gameId, owned)];
}

export function computeMinigameOutcome(gameId, history, stageIdx = 0, owned = {}) {
  const def = EVOLVED_MINIGAMES[gameId];
  if (!def) return { gain: 8, rel: 8, tier: 'good' };
  const score = (history || []).reduce((sum, h) => sum + (h.score || 0), 0);
  const stageBonus = Math.floor(stageIdx / 2);
  const baseGain = gameId === 'campus_challenge' ? [8, 20] : gameId === 'delivery_order' ? [7, 17] : [6, 14];
  const baseRel = gameId === 'campus_challenge' ? 9 : gameId === 'delivery_order' ? 7 : 8;
  const gainSpan = baseGain[1] - baseGain[0];
  const floor = evolvedFloorBonus(owned);
  const gain = Math.round(baseGain[0] + gainSpan * (score / 6) + stageBonus) + (floor.gain || 0);
  const rel = baseRel + Math.floor(score / 3) + (floor.rel || 0);
  const tier = score >= 5 ? 'perfect' : score >= 3 ? 'good' : score >= 1 ? 'messy' : 'soft';
  return { gain, rel, tier, score };
}

export function minigameTierLabel(tier) {
  switch (tier) {
    case 'perfect': return '★ Perfect run';
    case 'good': return '✓ Strong showing';
    case 'messy': return '~ Messy but fed';
    default: return '· Quiet session';
  }
}
