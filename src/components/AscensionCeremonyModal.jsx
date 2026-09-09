import { useEffect } from 'react';
import { C } from '../styles.js';
import { playHallPassSound } from '../gameData/hallPassAudio.js';
import { TextFlagToolbar } from './TextFlagToolbar.jsx';
import { buildStateLine } from '../textEngine/textFlagFormat.js';
import { getAscensionFormForStudent } from '../gameData/ascension/forms.js';
import { SceneStage } from './SceneStage.jsx';
import { ModalOverlay } from './ModalOverlay.jsx';

const ACCENT = '#40b8d8';

export function AscensionCeremonyModal({
  student,
  prose,
  traceNodes = [],
  week = 1,
  onAccept,
  onDecline,
  onClose,
  onPinBeat,
  scrollback,
  onScrollbackPush,
  instantText,
  soundEnabled = true,
}) {
  useEffect(() => { playHallPassSound('unlock', soundEnabled); }, [soundEnabled, student?.id]);
  if (!student) return null;
  const form = getAscensionFormForStudent(student);
  const stateLine = buildStateLine(
    { id: student.id, name: student.name, lbs: student.lbs },
    { week, formId: form?.formId || student.ascensionPending?.formId || 'unknown' },
  );

  const dismiss = onClose || (() => { playHallPassSound('click', soundEnabled); onDecline?.(); });
  return (
    <ModalOverlay onClose={dismiss} soundEnabled={soundEnabled} style={{ zIndex: 450 }}>
      <div
        className="hall-pass-modal-in ascension-ceremony-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ascension-title"
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
        <SceneStage
          prose={prose}
          traceNodes={traceNodes}
          student={student}
          week={week}
          locale={{ glyph: '✦', label: 'Threshold' }}
          section="asc.ceremony"
          stateLine={stateLine}
          accentColor={ACCENT}
          onPinBeat={onPinBeat}
          scrollback={scrollback}
          onScrollbackPush={onScrollbackPush}
          instantText={instantText}
          choices={[
            { id: 'accept', label: 'See it through', intent: 'press', onClick: onAccept },
            { id: 'decline', label: 'Not yet', intent: 'wait', onClick: onDecline },
          ]}
          footer={onClose ? (
            <button type="button" className="ascension-ceremony-choice-row" style={{ ...C.btn('#222'), width: '100%', marginTop: 8, minHeight: 40 }} onClick={onClose}>
              Close
            </button>
          ) : null}
        />
      </div>
    </ModalOverlay>
  );
}
