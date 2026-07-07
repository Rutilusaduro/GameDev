// ═══════════════════════════════════════════════════════════════
// MILESTONE CEREMONY — the stage-crossing set-piece popup.
// ═══════════════════════════════════════════════════════════════
import { C } from '../styles.js';
import { buildStateLine } from '../textEngine/textFlagFormat.js';
import { SceneStage } from './SceneStage.jsx';

const ACCENT = '#d8a030';

export function MilestoneCeremonyModal({
  queue,
  onAdvance,
  onDismissAll,
  onPinBeat,
  scrollback,
  onScrollbackPush,
  instantText,
  week = 1,
}) {
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
  const student = { id: ev.id, name: ev.name, lbs: ev.endLbs ?? 0 };

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
        <SceneStage
          prose={ev.prose}
          traceNodes={ev.traceNodes}
          student={student}
          week={week}
          locale={{ glyph: '⚖', label: 'Milestone' }}
          section="milestone"
          stateLine={flagState}
          accentColor={ACCENT}
          onPinBeat={onPinBeat}
          scrollback={scrollback}
          onScrollbackPush={onScrollbackPush}
          instantText={instantText}
          choices={[
            {
              id: 'next',
              label: last ? 'Take her in' : 'Next →',
              intent: 'press',
              onClick: () => (last ? onDismissAll() : onAdvance()),
            },
            ...(events.length > 1
              ? [{ id: 'skip', label: 'Skip remaining', intent: 'wait', onClick: onDismissAll }]
              : []),
          ]}
        />
      </div>
    </div>
  );
}
