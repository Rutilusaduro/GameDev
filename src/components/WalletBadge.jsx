// ═══════════════════════════════════════════════════════════════
// WALLET BADGE — top-right funds display
// ═══════════════════════════════════════════════════════════════
import { formatMoney, WALLET_CONFIG } from '../gameData/wallet.js';

export function WalletBadge({ balance }) {
  const display = formatMoney(balance);
  return (
    <div
      style={{
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(40,32,8,0.95), rgba(28,48,18,0.9))',
        border: '1px solid #8a7030',
        borderRadius: 8,
        padding: '4px 14px',
        minWidth: 88,
        boxShadow: '0 0 12px rgba(200,160,40,0.15)',
      }}
      title={`${WALLET_CONFIG.currencyName} — your available cash`}
    >
      <span style={{ fontSize: 9, color: '#a89050', letterSpacing: 2, display: 'block' }}>
        💵 {WALLET_CONFIG.currencyName.toUpperCase()}
      </span>
      <span style={{ fontSize: 18, fontWeight: 700, color: '#f0d878', display: 'block', lineHeight: 1.2 }}>
        {display}
      </span>
    </div>
  );
}
