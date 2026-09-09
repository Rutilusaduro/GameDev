import { useEffect } from 'react';
import { C } from '../styles.js';
import { playHallPassSound } from '../gameData/hallPassAudio.js';
import { EVOLVED_ACTIVITY_META } from '../gameData/evolvedForms.js';
import { ModalOverlay } from './ModalOverlay.jsx';

export function EvolvedActivityModal({ modal, onClose, soundEnabled = true }) {
  useEffect(() => {
    playHallPassSound('session', soundEnabled);
  }, [soundEnabled, modal?.student?.id, modal?.student?.evolvedForm]);

  if (!modal) return null;
  const meta = EVOLVED_ACTIVITY_META[modal.student?.evolvedForm] || {};
  const label = meta.label || 'Activity';

  const dismiss = () => { playHallPassSound('click', soundEnabled); onClose?.(); };
  return (
    <ModalOverlay onClose={dismiss} soundEnabled={soundEnabled}>
      <div
        className="hall-pass-modal-in evolved-activity-modal"
        style={{
          ...C.modal,
          maxWidth: 540,
          background: 'linear-gradient(160deg,#08041a,#140830,#08041a)',
          border: '1px solid #5020a060',
        }}
      >
        <div style={{ fontSize: 9, letterSpacing: 4, color: '#7030c0', marginBottom: 6 }}>
          ✦ {label}
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#c080ff', marginBottom: 10 }}>
          {modal.student?.name}
        </div>
        <div style={{ fontSize: 12, color: '#c0b0e0', lineHeight: 1.9, marginBottom: 16, fontStyle: 'italic' }}>
          {modal.text}
        </div>
        <button
          type="button"
          className="evolved-activity-choice-row"
          style={{ ...C.btn('#301060'), width: '100%' }}
          onClick={dismiss}
        >
          Continue
        </button>
      </div>
    </ModalOverlay>
  );
}
