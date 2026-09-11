// Ranked feedee session — Rae NPC + payoff (legacy evolvedForms → pools).
import { registerPool, render } from '../../engine.js';
import { SESSION_NPC_LINES, SESSION_PAYOFF_TEXT } from '../../../gameData/rankedSessionData.js';
import { registerDecomposedPool } from '../decomposePools.js';
import { rankedSessionTailBeat } from '../evolved/proseTails.js';
import { legacyBridgeWhen, lintWildcardVariant } from '../legacyPoolPolicy.js';

function registerRaeLine(poolKey, line, seed) {
  const text = typeof line === 'string' ? line.trim() : '';
  if (!text) return;
  const bodyKey = `${poolKey}.legacyBody`;
  registerDecomposedPool(bodyKey, text);
  const slot = (ctx) => {
    const rendered = render(`{${bodyKey}}`, ctx)?.trim();
    return rendered && !rendered.includes('{unresolved}') ? rendered : text;
  };
  registerPool(poolKey, [
    {
      when: legacyBridgeWhen(),
      text: [
        slot,
        rankedSessionTailBeat(seed, 0),
        rankedSessionTailBeat(seed, 1),
        rankedSessionTailBeat(seed, 2),
      ],
    },
    lintWildcardVariant('{session.scene.deliveryAir|prefix:} {session.scene.raePresence|prefix: }'),
  ]);
}

for (let si = 0; si <= 5; si += 1) {
  const row = SESSION_NPC_LINES[si];
  if (!row) continue;
  registerRaeLine(`session.rae.arrival.s${si}`, row.arrival, `arrival:${si}`);
  registerRaeLine(`session.rae.exit.s${si}`, row.exit, `exit:${si}`);
  if (row.extra) registerRaeLine(`session.rae.extra.s${si}`, row.extra, `extra:${si}`);
}

for (let si = 0; si < SESSION_PAYOFF_TEXT.length; si += 1) {
  const fn = SESSION_PAYOFF_TEXT[si];
  if (typeof fn !== 'function') continue;
  const core = (ctx) => fn(
    ctx.globals?.sessionGain ?? 0,
    ctx.globals?.sessionEndReason ?? 'focus_out',
  );
  registerPool(`session.payoff.legacy.s${si}`, [
    {
      when: legacyBridgeWhen(),
      text: [
        core,
        (ctx) => {
          const base = core(ctx);
          return base ? `${base}\n\nRae already texted about next time.` : base;
        },
        rankedSessionTailBeat(`payoff:${si}`, 0),
        rankedSessionTailBeat(`payoff:${si}`, 1),
      ],
    },
    lintWildcardVariant('{session.payoff.raeWrap|prefix:} {session.payoff.scaleEcho|prefix: }'),
  ]);
}
