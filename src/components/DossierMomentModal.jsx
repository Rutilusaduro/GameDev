// ═══════════════════════════════════════════════════════════════
// DOSSIER MOMENT — replay a pinned threshold beat
// ═══════════════════════════════════════════════════════════════
import { useMemo } from 'react';
import { C } from '../styles.js';
import { WEIGHT_STAGES } from '../gameData/stages.js';
import { resolvePinExcerpt } from '../gameData/dossierReplay.js';

export function DossierMomentModal({ pin, student, week = 1, onClose }) {
  const prose = useMemo(
    () => (pin && student ? resolvePinExcerpt(student, pin, week) : ''),
    [pin, student, week],
  );

  if (!pin) return null;
  const stageRef = pin.kind === 'stageUp' ? WEIGHT_STAGES[Number(pin.ref)] : null;

  return (
    <div style={C.overlay} onClick={onClose}>
      <div
        style={{ ...C.modal, maxWidth: 520, border: '1px solid #50a080' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontSize: 9, letterSpacing: 3, color: '#50a080', marginBottom: 6 }}>PINNED MOMENT</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#c0e0c0', marginBottom: 4 }}>{pin.label}</div>
        <div style={{ fontSize: 11, color: '#709070', marginBottom: 12 }}>
          {student?.name} · week {pin.week}
          {stageRef && <span> · {stageRef.label}</span>}
        </div>
        {prose ? (
          <div style={{ fontSize: 13, color: '#e0e8d8', lineHeight: 1.8, whiteSpace: 'pre-line', marginBottom: 12 }}>
            {prose}
          </div>
        ) : (
          <div style={{ fontSize: 12, color: '#90a890', fontStyle: 'italic', lineHeight: 1.7, marginBottom: 12 }}>
            This beat was logged, but no replay text is available for it yet.
          </div>
        )}
        <button type="button" style={{ ...C.btn('#307050'), width: '100%' }} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
