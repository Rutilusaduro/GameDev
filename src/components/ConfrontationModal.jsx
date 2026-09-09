// ═══════════════════════════════════════════════════════════════
// CONFRONTATION MODAL — she stops you and draws a line.
// ═══════════════════════════════════════════════════════════════
import { useEffect } from 'react';
import { C } from '../styles.js';
import { GIFT_COST } from '../gameData/discontent.js';
import { playHallPassSound } from '../gameData/hallPassAudio.js';
import { SceneStage } from './SceneStage.jsx';

const ACCENT = '#c05038';

export function ConfrontationModal({
  confrontation,
  money,
  onApologize,
  onGift,
  onStandFirm,
  onLeave,
  onPinBeat,
  scrollback,
  onScrollbackPush,
  instantText,
  week = 1,
  soundEnabled = true,
}) {
  useEffect(() => {
    if (!confrontation) return;
    playHallPassSound(confrontation.winBack ? 'confirm' : 'alert', soundEnabled);
  }, [soundEnabled, confrontation?.studentId, confrontation?.winBack]);
  if (!confrontation) return null;
  const { name, prose, winBack, withdrawn, studentId, lbs } = confrontation;
  const canGift = money >= GIFT_COST;
  const student = { id: studentId, name, lbs: lbs ?? 130 };

  return (
    <div style={C.overlay}>
      <div className="hall-pass-modal-in" style={{ ...C.modal, maxWidth: 540, border: `1px solid ${ACCENT}` }}>
        <div style={{ fontSize: 9, letterSpacing: 3, color: ACCENT, marginBottom: 6 }}>
          {winBack ? '🕊 MAKING AMENDS' : '🔥 SHE’S HAD ENOUGH'}
        </div>
        <div style={{ fontSize: 17, fontWeight: 700, color: '#e8a890', marginBottom: 10 }}>{name}</div>
        <SceneStage
          prose={prose}
          student={student}
          week={week}
          locale={{ glyph: winBack ? '🕊' : '🔥', label: winBack ? 'Amends' : 'Confrontation' }}
          section="confront"
          accentColor={ACCENT}
          onPinBeat={onPinBeat}
          scrollback={scrollback}
          onScrollbackPush={onScrollbackPush}
          instantText={instantText}
          choices={[
            { id: 'apologize', label: 'Apologize sincerely — hear her out', intent: 'comfort', onClick: onApologize },
            {
              id: 'gift',
              label: `Make a peace offering ($${GIFT_COST})${!canGift ? ' — not enough money' : ''}`,
              intent: 'comfort',
              disabled: !canGift,
              onClick: onGift,
            },
            winBack
              ? { id: 'leave', label: 'Leave her be for now', intent: 'wait', onClick: onLeave }
              : {
                id: 'stand',
                label: `Stand firm — ${withdrawn ? 'let her go' : 'she walks off your hall'}`,
                intent: 'press',
                onClick: onStandFirm,
              },
          ]}
        />
      </div>
    </div>
  );
}
