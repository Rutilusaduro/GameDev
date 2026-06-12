// ═══════════════════════════════════════════════════════════════
// DESTINY SPEND SHOP — her 50% stream revenue
// ═══════════════════════════════════════════════════════════════
import { C } from '../styles.js';
import { BRANDS, DESTINY_SPEND_ITEMS, getStreamVoiceLabel } from '../gameData/streaming.js';
import { formatMoney } from '../gameData/wallet.js';

const RED = '#e74c3c';

export function DestinySpendModal({
  student,
  onPurchase,
  onClose,
  onGiftFromPlayer,
  playerMoney,
}) {
  if (!student) return null;
  const bal = student.destinyMoney || 0;
  const purchases = student.destinyPurchases || {};
  const voice = student.streamVoice || 'default';

  return (
    <div style={C.overlay}>
      <div style={{
        ...C.modal, maxWidth: 520,
        background: 'linear-gradient(160deg,#120408,#1a0810,#120408)',
        border: `1px solid ${RED}50`,
        maxHeight: '88vh', overflowY: 'auto',
      }}>
        <div style={{ fontSize: 9, letterSpacing: 4, color: RED, marginBottom: 4 }}>
          DESTINY&apos;S FUNDS
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#ff90a0', marginBottom: 4 }}>
          {student.name}
        </div>
        <div style={{ fontSize: 12, color: '#c0a0a8', marginBottom: 6 }}>
          Balance: <span style={{ color: '#ffe080', fontWeight: 700 }}>{formatMoney(bal)}</span>
          {student.brand && (
            <span style={{ color: '#a06070' }}> · {BRANDS[student.brand]?.name}</span>
          )}
        </div>
        {voice !== 'default' && (
          <div style={{
            fontSize: 10, color: '#ff8090', marginBottom: 12, padding: '6px 10px',
            background: 'rgba(80,10,20,0.35)', borderRadius: 6,
          }}>
            🎭 Voice drift: {getStreamVoiceLabel(voice)}
            {student.personaDrift?.[student.brand] != null && (
              <span style={{ color: '#a06070' }}> · drift {Math.round(student.personaDrift[student.brand])}%</span>
            )}
          </div>
        )}

        <div style={{ fontSize: 9, letterSpacing: 2, color: '#806060', marginBottom: 8 }}>
          STREAM UPGRADES — persists across streams
        </div>
        {DESTINY_SPEND_ITEMS.map((item) => {
          const owned = purchases[item.id] || 0;
          const maxed = item.max != null && owned >= item.max;
          const locked = item.requiresBrand && !student.brand;
          const canBuy = !maxed && !locked && bal >= item.cost;
          return (
            <div key={item.id} style={{
              background: 'rgba(20,5,10,0.6)', border: `1px solid ${RED}25`,
              borderRadius: 8, padding: '10px 12px', marginBottom: 8,
              opacity: locked ? 0.45 : 1,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#ffb0b8' }}>
                    {item.emoji} {item.label}
                    {owned > 0 && (
                      <span style={{ fontSize: 10, color: '#a08080', fontWeight: 400 }}>
                        {item.stackable ? ` ×${owned}` : ' ✓'}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 10, color: '#a09090', lineHeight: 1.5, marginTop: 4 }}>
                    {item.desc}
                  </div>
                  {locked && (
                    <div style={{ fontSize: 9, color: '#e08060', marginTop: 4 }}>Requires sponsor contract</div>
                  )}
                </div>
                <button
                  style={{ ...C.smBtn, opacity: canBuy ? 1 : 0.35, whiteSpace: 'nowrap', background: RED }}
                  disabled={!canBuy}
                  onClick={() => canBuy && onPurchase(item.id)}
                >
                  {maxed ? 'Max' : formatMoney(item.cost)}
                </button>
              </div>
            </div>
          );
        })}

        {onGiftFromPlayer && (
          <>
            <div style={{ fontSize: 9, letterSpacing: 2, color: '#806060', margin: '14px 0 8px' }}>
              YOUR WALLET → DESTINY
            </div>
            <button
              style={{ ...C.btn('#3040a0'), width: '100%', marginBottom: 6, opacity: (playerMoney || 0) >= 50 ? 1 : 0.4 }}
              disabled={(playerMoney || 0) < 50}
              onClick={() => onGiftFromPlayer(50)}
            >
              Gift {formatMoney(50)} to Destiny
            </button>
            <button
              style={{ ...C.btn('#3040a0'), width: '100%', marginBottom: 12, opacity: (playerMoney || 0) >= 150 ? 1 : 0.4 }}
              disabled={(playerMoney || 0) < 150}
              onClick={() => onGiftFromPlayer(150)}
            >
              Gift {formatMoney(150)} to Destiny
            </button>
          </>
        )}

        <button style={{ ...C.btn('#200810'), width: '100%' }} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
