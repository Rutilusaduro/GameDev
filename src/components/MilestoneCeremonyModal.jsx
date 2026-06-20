// ═══════════════════════════════════════════════════════════════
// MILESTONE CEREMONY — the stage-crossing set-piece popup.
// Fires when a girl crosses a weight stage during digestion. Frames
// the moment with ceremony: the body she's grown into, the garment
// giving way, her reaction. Queued so multiple crossings in one week
// advance one at a time. Flaggable via the shared toolbar.
// ═══════════════════════════════════════════════════════════════
import { C } from '../styles.js';
import { TextFlagToolbar } from './TextFlagToolbar.jsx';
import { buildStateLine } from '../textEngine/textFlagFormat.js';

const ACCENT = '#d8a030';

export function MilestoneCeremonyModal({ queue, onAdvance, onDismissAll }) {
  if (!queue?.events?.length) return null;
  const { events, index } = queue;
  const ev = events[index];
  if (!ev) return null;
  const last = index + 1 >= events.length;
  const progress = `${index + 1} / ${events.length}`;
  const flagState = buildStateLine(
    { id: ev.id, name: ev.name, lbs: ev.endLbs ?? 0 },
    { stageLabel: ev.stageLabel },
  );

  return (
    <div style={C.overlay}>
      <div style={{ ...C.modal, maxWidth: 560, border: `1px solid ${ACCENT}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ fontSize: 9, letterSpacing: 3, color: ACCENT }}>✦ A THRESHOLD CROSSED</div>
          {events.length > 1 && <div style={{ fontSize: 10, color: '#9a8050', fontWeight: 600 }}>{progress}</div>}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#e8c070' }}>{ev.name}</div>
          <div style={{ fontSize: 11, color: '#9a8050' }}>
            grew into something new{ev.gainLbs > 0 && <span> · +{ev.gainLbs} lbs this week</span>}
          </div>
        </div>
        <div style={{ fontSize: 13, color: '#e8d8c0', lineHeight: 1.8, marginBottom: 12, whiteSpace: 'pre-line' }}>
          {ev.prose}
        </div>
        <TextFlagToolbar section="milestone" stateLine={flagState} text={ev.prose} nodes={ev.traceNodes} />
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          <button style={{ ...C.btn(ACCENT), flex: 1 }} onClick={() => (last ? onDismissAll() : onAdvance())}>
            {last ? 'Take her in' : 'Next →'}
          </button>
          {events.length > 1 && (
            <button style={{ ...C.btn('#333'), flex: 0 }} onClick={onDismissAll}>Skip</button>
          )}
        </div>
      </div>
    </div>
  );
}
