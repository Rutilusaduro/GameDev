import { useMemo, useState } from 'react';
import { C } from '../styles.js';
import { ModalOverlay } from './ModalOverlay.jsx';
import { FlaggedProse } from './TextFlagToolbar.jsx';
import { playHallPassSound } from '../gameData/hallPassAudio.js';
import { nightEncounterKind, nightEncounterChoices } from '../gameData/dormBlueprint.js';
import { createContext, render } from '../textEngine/engine.js';
import { traceToFlagNodes } from '../textEngine/textFlagFormat.js';
import '../textEngine/scenes/dorm/index.js';
import { getRaDisplayName } from '../gameData/raDisplay.js';

export function NightRoundModal({
  student,
  dormState,
  week,
  raProfile,
  soundEnabled = true,
  onChoose,
  onClose,
}) {
  const kind = useMemo(
    () => nightEncounterKind(student, dormState),
    [student, dormState],
  );
  const choices = nightEncounterChoices(kind);
  const [picked, setPicked] = useState(null);

  const { text, traceNodes } = useMemo(() => {
    const t = [];
    const ctx = createContext({
      subject: student,
      week,
      globals: {
        raName: getRaDisplayName(raProfile),
        nightKind: kind,
        dormRoom: 'corridor',
        habitId: dormState?.nightRounds?.habits?.[student?.id] || '',
        floorIntimacy: dormState?.nightRounds?.floorIntimacy || 0,
      },
    });
    const body = render('{night.round}', ctx, { trace: t });
    return { text: body, traceNodes: traceToFlagNodes(t) };
  }, [student, week, raProfile, kind, dormState]);

  if (!student) return null;

  return (
    <ModalOverlay onClose={onClose}>
      <div style={{ ...C.modal, maxWidth: 560 }} role="dialog" aria-labelledby="night-round-title">
        <div style={{ fontSize: 10, letterSpacing: 2, color: '#8a70b8', marginBottom: 6 }}>NIGHT ROUNDS</div>
        <h2 id="night-round-title" style={{ margin: '0 0 8px', fontSize: 18, color: '#e8d8c0' }}>
          Room {String(100 + student.id)} · {student.name}
        </h2>
        <FlaggedProse
          section="night.round"
          text={text}
          student={student}
          week={week}
          traceNodes={traceNodes}
          style={{
            fontSize: 13,
            lineHeight: 1.8,
            color: '#ddd0b8',
            fontStyle: 'italic',
            marginBottom: 14,
            whiteSpace: 'pre-wrap',
          }}
        />
        {!picked ? (
          <div style={{ display: 'grid', gap: 8 }}>
            {choices.map((c) => (
              <button
                key={c.id}
                type="button"
                data-testid="night-round-choice"
                style={{ ...C.btn('#3a1868'), textAlign: 'left', fontWeight: 600 }}
                onClick={() => {
                  playHallPassSound('click', soundEnabled);
                  setPicked(c.id);
                  onChoose?.(c, kind);
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        ) : (
          <button type="button" style={C.btn('#1a0830')} onClick={onClose}>
            Back to the plan
          </button>
        )}
      </div>
    </ModalOverlay>
  );
}
