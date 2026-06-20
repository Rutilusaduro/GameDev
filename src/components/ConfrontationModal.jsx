// ═══════════════════════════════════════════════════════════════
// CONFRONTATION MODAL — she stops you and draws a line, or you reach
// out to win her back. Three responses: apologize (free, cools her),
// a peace offering (costs money, goes further), or stand firm (she
// withdraws from the class). Win-back framing replaces "stand firm"
// with simply leaving.
// ═══════════════════════════════════════════════════════════════
import { C } from '../styles.js';
import { GIFT_COST } from '../gameData/discontent.js';

const ACCENT = '#c05038';

export function ConfrontationModal({ confrontation, money, onApologize, onGift, onStandFirm, onLeave }) {
  if (!confrontation) return null;
  const { name, prose, winBack, withdrawn } = confrontation;
  const canGift = money >= GIFT_COST;
  return (
    <div style={C.overlay}>
      <div style={{ ...C.modal, maxWidth: 540, border: `1px solid ${ACCENT}` }}>
        <div style={{ fontSize: 9, letterSpacing: 3, color: ACCENT, marginBottom: 6 }}>
          {winBack ? '🕊 MAKING AMENDS' : '🔥 SHE’S HAD ENOUGH'}
        </div>
        <div style={{ fontSize: 17, fontWeight: 700, color: '#e8a890', marginBottom: 10 }}>{name}</div>
        <div style={{ fontSize: 13, color: '#e8d0c4', lineHeight: 1.8, marginBottom: 16, whiteSpace: 'pre-line' }}>
          {prose}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button style={{ ...C.btn(ACCENT), width: '100%' }} onClick={onApologize}>
            Apologize sincerely — hear her out
          </button>
          <button
            style={{ ...C.btn(canGift ? '#3a6a4a' : '#2a2a2a'), width: '100%', opacity: canGift ? 1 : 0.5 }}
            disabled={!canGift}
            onClick={onGift}
          >
            Make a peace offering (${GIFT_COST}){!canGift && ' — not enough money'}
          </button>
          {winBack ? (
            <button style={{ ...C.btn('#333'), width: '100%' }} onClick={onLeave}>
              Leave her be for now
            </button>
          ) : (
            <button style={{ ...C.btn('#5a2020'), width: '100%' }} onClick={onStandFirm}>
              Stand firm — {withdrawn ? 'let her go' : 'she walks out of your class'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
