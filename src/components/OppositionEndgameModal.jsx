import { useEffect } from 'react';
import { C } from '../styles.js';
import { playHallPassSound } from '../gameData/hallPassAudio.js';
import { renderOppositionEndgame } from '../textEngine/scenes/opposition/index.js';
import { ModalOverlay } from './ModalOverlay.jsx';
import { SceneBackdrop } from './v2/SceneBackdrop.jsx';

const BEAT_META = {
  synthesis_ally: { label: 'SYNTHESIS', emoji: '✨', color: '#6090c0', slot: 'opposition.endgame.synthesis' },
  institutional_capture: { label: 'FULL CAPTURE', emoji: '🏛️', color: '#8a6a40', slot: 'opposition.endgame.capture' },
  scarcity_banished: { label: 'SCARCITY BANISHED', emoji: '🕯️', color: '#508060', slot: 'opposition.endgame.banished' },
  all_thin_ascended: { label: 'ALL THIN', emoji: '🌫️', color: '#7080a0', slot: 'opposition.endgame.allThin' },
  vance_compromised: { label: 'CHAIR FOLDS', emoji: '👁', color: '#a05060', slot: 'opposition.endgame.vance' },
};

export function OppositionEndgameModal({ beat, leftoverKitchen = false, nightRound = false, onDismiss, soundEnabled = true }) {
  useEffect(() => { playHallPassSound('unlock', soundEnabled); }, [soundEnabled, beat?.id]);
  if (!beat?.id) return null;
  const meta = BEAT_META[beat.id] || { label: 'ENDGAME', emoji: '✦', color: '#8060a0', slot: null };
  const body = meta.slot
    ? renderOppositionEndgame(meta.slot, beat.week ?? 1, { globals: { leftoverFed: leftoverKitchen, nightVisit: nightRound } })
    : beat.fallback || 'Something fundamental shifts in the opposition.';

  const dismiss = () => { playHallPassSound('confirm', soundEnabled); onDismiss(); };
  return (
    <ModalOverlay onClose={dismiss} soundEnabled={soundEnabled} style={{ zIndex: 8600 }}>
      <div className="hall-pass-modal-in opposition-endgame-modal" style={{ ...C.modal, maxWidth: 520, border: `1px solid ${meta.color}60`, background: 'linear-gradient(160deg,#080810,#101828,#080810)' }}>
        <SceneBackdrop variant="opposition" />
        <div style={{ fontSize: 10, letterSpacing: 4, color: meta.color, marginBottom: 8 }}>
          {meta.emoji} {meta.label}
        </div>
        <div style={{ fontSize: 13, color: '#d8dce8', lineHeight: 1.85, fontStyle: 'italic', marginBottom: 16 }}>
          {body}
        </div>
        {beat.detail && (
          <div style={{ fontSize: 11, color: '#90a0b8', marginBottom: 14, lineHeight: 1.6 }}>
            {beat.detail}
          </div>
        )}
        <button type="button" className="opposition-endgame-choice-row" style={{ ...C.btn(meta.color), width: '100%' }} onClick={dismiss}>
          Continue →
        </button>
      </div>
    </ModalOverlay>
  );
}
