import { C } from '../styles.js';

const TIER_COLORS = {
  minor: '#8a8a7a',
  moderate: '#c8860a',
  major: '#c05030',
  critical: '#a02050',
};

export function DeviceTickPopup({ queue, onAdvance, onDismissAll }) {
  if (!queue?.events?.length) return null;
  const { events, index } = queue;
  const event = events[index];
  if (!event) return null;

  const isMalf = event.isMalfunction;
  const tierColor = isMalf ? (TIER_COLORS[event.malfunction?.tier] || '#c8860a') : '#4a8090';
  const progress = `${index + 1} / ${events.length}`;

  return (
    <div style={C.overlay}>
      <div style={{ ...C.modal, maxWidth: 480, border: `1px solid ${tierColor}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ fontSize: 9, letterSpacing: 3, color: tierColor }}>
            {isMalf ? '⚠️ DEVICE MALFUNCTION' : '⚙️ DEVICE TICK'}
          </div>
          <div style={{ fontSize: 10, color: '#708090', fontWeight: 600 }}>{progress}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <span style={{ fontSize: 28 }}>{event.deviceIcon}</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#a0c0e0' }}>{event.deviceLabel}</div>
            <div style={{ fontSize: 10, color: '#708090' }}>
              {event.studentName} · {event.slot}
              {event.gainLbs > 0 && <span style={{ color: '#60a060' }}> · +{event.gainLbs} lbs</span>}
            </div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: '#c8d4e0', lineHeight: 1.75, fontStyle: 'italic', marginBottom: 14, minHeight: 48 }}>
          {event.prose}
        </div>
        {event.malfunction?.text && isMalf && (
          <div style={{ fontSize: 11, color: tierColor, marginBottom: 12, lineHeight: 1.6 }}>
            {event.malfunction.text}
          </div>
        )}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            style={{ ...C.btn(tierColor), flex: 1 }}
            onClick={() => (index + 1 < events.length ? onAdvance() : onDismissAll())}
          >
            {index + 1 < events.length ? 'Next device →' : 'Done'}
          </button>
          {events.length > 1 && (
            <button style={{ ...C.btn('#333'), flex: 0 }} onClick={onDismissAll}>
              Skip all
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
