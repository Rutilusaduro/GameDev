import { C } from '../styles.js';
export function MysteryTrustPulse({ pulse }) {
  if (!pulse) return null;

  const pct = Math.round(pulse.progress * 100);
  const hallLine = pulse.hallFlavor === 'cross-hall'
    ? 'Several halls'
    : pulse.hallFlavor
      ? `${pulse.hallFlavor} hall`
      : 'Another hall';

  return (
    <div
      className="mystery-trust-pulse"
      style={{
        marginBottom: 16,
        padding: '12px 14px',
        borderRadius: 10,
        border: '1px solid #3a2858',
        background: 'linear-gradient(135deg,rgba(20,12,36,0.95),rgba(10,6,20,0.98))',
      }}
    >
      <div style={{ fontSize: 10, letterSpacing: 2, color: '#9080b0', marginBottom: 6, fontWeight: 600 }}>
        CAMPUS WHISPER — OFF-FLOOR TRUST
      </div>
      <div style={{ fontSize: 12, color: '#c8b8d8', lineHeight: 1.55, marginBottom: 10 }}>
        {pulse.hint}
      </div>
      {!pulse.slotsFull && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#6a5888', marginBottom: 4 }}>
            <span>{hallLine}</span>
            <span>{pulse.nearlyReady ? 'A door may open soon' : `${pct}% toward next resident`}</span>
          </div>
          <div style={{ height: 4, background: '#1a0e30', borderRadius: 2, overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${pct}%`,
                background: pulse.nearlyReady ? '#c0a060' : '#6a48a0',
                transition: 'width 0.35s',
              }}
            />
          </div>
        </>
      )}
      {pulse.slotsFull && (
        <div style={{ fontSize: 10, color: '#806070', fontStyle: 'italic' }}>{pulse.hint}</div>
      )}
    </div>
  );
}
