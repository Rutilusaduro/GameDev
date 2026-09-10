import { useEffect } from 'react';
import { C } from '../styles.js';
import { ModalOverlay } from './ModalOverlay.jsx';
import { playHallPassSound } from '../gameData/hallPassAudio.js';
import { getStage } from '../gameData/stages.js';
import { StudentPortrait } from './StudentPortrait.jsx';
import { FlaggedProse } from './TextFlagToolbar.jsx';
import { renderRoomVisitScene } from '../textEngine/scenes/roomVisit/index.js';
import { getRaDisplayName } from '../gameData/raDisplay.js';
import { isRoomIntroPending, roomStageBeatPending } from '../gameData/roomVisit.js';

export function RoomVisitModal({
  student,
  week,
  raProfile,
  onClose,
  onComplete,
  soundEnabled = true,
}) {
  useEffect(() => { playHallPassSound('confirm', soundEnabled); }, [soundEnabled, student?.id]);

  if (!student) return null;

  const raName = getRaDisplayName(raProfile);
  const mode = isRoomIntroPending(student)
    ? 'intro'
    : roomStageBeatPending(student)
      ? 'stage'
      : 'ambient';
  const text = renderRoomVisitScene(student, week, { mode, raProfile, raName });
  const st = getStage(student.lbs);
  const title = mode === 'intro' ? `Meeting ${student.name}` : mode === 'stage' ? `${student.name}'s room` : `Checking in`;

  const handleDone = () => {
    playHallPassSound('click', soundEnabled);
    onComplete?.(student.id, mode);
    onClose?.();
  };

  return (
    <ModalOverlay onClose={handleDone} soundEnabled={soundEnabled}>
      <div className="hall-pass-modal-in room-visit-modal" style={{ ...C.modal, maxWidth: 560, borderColor: '#4a2870' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14 }}>
          <StudentPortrait student={student} size={52} showLabel={false} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, letterSpacing: 3, color: '#9070b8', marginBottom: 4 }}>ROOM VISIT</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#e8d0ff' }}>{title}</div>
            <div style={{ fontSize: 10, color: '#6a5088', marginTop: 2 }}>{st.label} · {student.lbs.toLocaleString()} lbs</div>
          </div>
          <button type="button" style={{ ...C.btn('#1a0830'), fontSize: 11 }} onClick={handleDone}>✕</button>
        </div>
        <FlaggedProse
          section={`room.visit.${mode}`}
          text={text}
          student={student}
          week={week}
          style={{
            background: 'rgba(80,40,120,0.12)',
            border: '1px solid #4a287050',
            borderRadius: 10,
            padding: '14px 16px',
            fontSize: 13,
            color: '#ddd0b8',
            lineHeight: 1.8,
            whiteSpace: 'pre-wrap',
            marginBottom: 14,
          }}
        />
        <button type="button" className="ra-setup-primary-btn" style={{ ...C.btn(raProfile?.color || '#5020a0'), width: '100%' }} onClick={handleDone}>
          {mode === 'intro' ? 'Finish introductions' : 'Leave the room'}
        </button>
      </div>
    </ModalOverlay>
  );
}
