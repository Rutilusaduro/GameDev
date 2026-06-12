import { C } from '../styles.js';

const TIER_COLORS = {
  minor: '#8a8a7a',
  moderate: '#c8860a',
  major: '#c05030',
  critical: '#a02050',
};

export function MalfunctionPopup({ malfunctionPopup, setMalfunctionPopup }) {
  if (!malfunctionPopup) return null;
  const { studentName, tier, text, deviceLabel } = malfunctionPopup;
  const color = TIER_COLORS[tier] || '#c8860a';
  return (
    <div style={C.overlay}>
      <div style={{ ...C.modal, maxWidth: 440, border: `1px solid ${color}` }}>
        <div style={{ fontSize: 9, letterSpacing: 3, color, marginBottom: 6 }}>⚠️ DEVICE MALFUNCTION</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#e0c0a0', marginBottom: 6 }}>
          {deviceLabel || 'Device'} — {tier}
        </div>
        {studentName && (
          <div style={{ fontSize: 10, color: '#908070', marginBottom: 8 }}>Subject: {studentName}</div>
        )}
        <div style={{ fontSize: 12, color: '#d0b8a0', lineHeight: 1.7, fontStyle: 'italic', marginBottom: 14 }}>{text}</div>
        <button style={{ ...C.btn(color), width: '100%' }} onClick={() => setMalfunctionPopup(null)}>Acknowledge</button>
      </div>
    </div>
  );
}
