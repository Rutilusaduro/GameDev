import { C } from '../styles.js';
import { TextFlagToolbar } from './TextFlagToolbar.jsx';
import { buildStateLine } from '../textEngine/textFlagFormat.js';
import { getAscensionFormForStudent } from '../gameData/ascension/forms.js';

const ACCENT = '#40b8d8';

export function AscensionCeremonyModal({
  student,
  prose,
  traceNodes = [],
  week = 1,
  onAccept,
  onDecline,
  onClose,
}) {
  if (!student) return null;
  const form = getAscensionFormForStudent(student);
  const stateLine = buildStateLine(
    { id: student.id, name: student.name, lbs: student.lbs },
    { week, formId: form?.formId || student.ascensionPending?.formId || 'unknown' },
  );

  return (
    <div style={{ ...C.overlay, zIndex: 450 }} role="dialog" aria-modal="true" aria-labelledby="ascension-title">
      <div
        style={{
          ...C.modal,
          maxWidth: 620,
          background: 'linear-gradient(160deg,#031016,#082433,#031016)',
          border: `1px solid ${ACCENT}70`,
          maxHeight: '88vh',
          overflowY: 'auto',
        }}
      >
        <div style={{ fontSize: 9, letterSpacing: 4, color: ACCENT, marginBottom: 4 }}>✦ ASCENSION THRESHOLD</div>
        <h2 id="ascension-title" style={{ margin: '0 0 8px', color: '#b8f0ff', fontSize: 20 }}>
          {student.name}{form ? ` — ${form.label}` : ''}
        </h2>
        <div style={{ fontSize: 11, color: '#80a8b8', lineHeight: 1.6, marginBottom: 12 }}>
          Peak archived at {Math.round(student.lbs)} lbs. Rebirth returns her to 100 lbs with memory intact.
        </div>
        <div style={{ fontSize: 13, color: '#e0f4f8', lineHeight: 1.9, marginBottom: 12, whiteSpace: 'pre-line' }}>
          {prose}
        </div>
        <TextFlagToolbar section="asc.ceremony" stateLine={stateLine} text={prose} nodes={traceNodes} />
        <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
          <button type="button" style={{ ...C.btn(ACCENT), flex: 1, minHeight: 44 }} onClick={onAccept}>
            See it through
          </button>
          <button type="button" style={{ ...C.btn('#304050'), flex: 1, minHeight: 44 }} onClick={onDecline}>
            Not yet
          </button>
          {onClose && (
            <button type="button" style={{ ...C.btn('#222'), minHeight: 44 }} onClick={onClose}>
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
