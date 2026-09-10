import { C } from '../styles.js';
import { ModalOverlay } from './ModalOverlay.jsx';
import { getDorm } from '../gameData/dorms.js';
import { playHallPassSound } from '../gameData/hallPassAudio.js';

export function FloorBriefingModal({ raProfile, onContinue, soundEnabled = true }) {
  const hall = getDorm(raProfile?.dormId || raProfile?.subject);
  const name = raProfile?.displayName?.trim() || 'RA';

  return (
    <ModalOverlay onClose={() => { playHallPassSound('click', soundEnabled); onContinue?.(); }} soundEnabled={soundEnabled}>
      <div className="hall-pass-modal-in floor-briefing-modal" style={{ ...C.modal, maxWidth: 520, borderColor: hall?.color || '#4a2870' }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: hall?.color || '#9070b8', marginBottom: 8 }}>FIRST NIGHT ON FLOOR</div>
        <h2 style={{ margin: '0 0 12px', color: '#f0e8ff', fontSize: 20 }}>{hall?.label || 'Your hall'}</h2>
        <div style={{ fontSize: 13, color: '#c8b8d8', lineHeight: 1.75, marginBottom: 18 }}>
          <p style={{ margin: 0 }}>
            Keys are yours, {name}. Housing wants every resident to know who&apos;s on duty before the week gets loud.
          </p>
          <p style={{ margin: '14px 0 0' }}>
            Walk the hallway from your desk — knock on each door, introduce yourself, and get a read on who lives behind the nameplates.
            When someone grows into a new size, their room will have something new to show you.
          </p>
        </div>
        <button
          type="button"
          className="ra-setup-primary-btn"
          style={{ ...C.btn(hall?.color || '#5020a0'), width: '100%', fontSize: 14 }}
          onClick={() => { playHallPassSound('confirm', soundEnabled); onContinue?.(); }}
        >
          Walk the hall →
        </button>
      </div>
    </ModalOverlay>
  );
}
