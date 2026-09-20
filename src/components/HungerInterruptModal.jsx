import { useEffect, useMemo } from 'react';
import { C } from '../styles.js';
import { playHallPassSound } from '../gameData/hallPassAudio.js';
import { renderHungerInterrupt, renderHungerOutcome } from '../textEngine/scenes/hungerInterrupt/index.js';
import { TextFlagToolbar } from './TextFlagToolbar.jsx';
import { buildStateLine, traceToFlagNodes } from '../textEngine/textFlagFormat.js';
import { getStage } from '../gameData/stages.js';
import { getInterruptDenyRelLoss } from '../gameData/hungerAddiction.js';
import { ModalOverlay } from './ModalOverlay.jsx';

export function HungerInterruptModal({
  student,
  week,
  pharmacistState,
  onFeed,
  onCompound,
  onDeny,
  onTalk,
  onEchoedWill,
  echoedWillAvailable = false,
  leftoverAvailable = false,
  onLeftover,
  soundEnabled = true,
}) {
  useEffect(() => { playHallPassSound('alert', soundEnabled); }, [soundEnabled, student?.id]);
  const s = student;
  const denyRelLoss = getInterruptDenyRelLoss(s);
  const interruptCopy = useMemo(() => {
    const trace = [];
    const text = renderHungerInterrupt(s, week, { trace });
    return { text, traceNodes: traceToFlagNodes(trace) };
  }, [s?.id, s?.lbs, week]);
  const hasCompounds = (pharmacistState?.unlockedCompounds || []).some(
    id => (pharmacistState?.compoundInventory?.[id] ?? 0) > 0
  );

  const residentName = s?.name || 'her';

  return (
    <ModalOverlay dismissible={false} soundEnabled={soundEnabled} style={{ zIndex: 9000, padding: 16 }}>
      <div
        className="hall-pass-modal-in hunger-interrupt-modal"
        style={{ ...C.modal, maxWidth: 520, width: '100%', maxHeight: '90vh', overflowY: 'auto', border: '1px solid #80305060' }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
          <div style={{ fontSize: 9, color: '#c06070', letterSpacing: 3 }}>HALL CRAVING</div>
          <div style={{ fontSize: 10, color: '#9a7080', fontWeight: 600 }}>{residentName}</div>
        </div>
        <div style={{ fontSize: 14, color: '#e8d8c8', lineHeight: 1.85, fontStyle: 'italic', marginBottom: 8 }}>
          {interruptCopy.text}
        </div>
        <TextFlagToolbar
          section="hunger.interrupt"
          stateLine={buildStateLine(s, { week, stageLabel: getStage(s?.lbs ?? 130).label })}
          text={interruptCopy.text}
          nodes={interruptCopy.traceNodes}
        />
        <div style={{ display: 'grid', gap: 8, marginTop: 4 }}>
          <button type="button" className="scene-choice-btn" style={{ ...C.btn('#5818a8'), width: '100%' }} onClick={() => { playHallPassSound('click', soundEnabled); onFeed(); }}>
            Get {residentName} fed
          </button>
          {hasCompounds && (
            <button type="button" className="scene-choice-btn" style={{ ...C.btn('#2a5070'), width: '100%' }} onClick={() => { playHallPassSound('click', soundEnabled); onCompound(); }}>
              Slip her a compound (in food)
            </button>
          )}
          <button type="button" className="scene-choice-btn" style={{ ...C.btn('#3a3060'), width: '100%' }} onClick={() => { playHallPassSound('click', soundEnabled); onTalk(); }}>
            Talk her down on the hall
          </button>
          {leftoverAvailable && onLeftover && (
            <button type="button" className="scene-choice-btn" style={{ ...C.btn('#4a3040'), width: '100%' }} onClick={() => { playHallPassSound('click', soundEnabled); onLeftover(); }}>
              Walk her to the kitchen leftovers
            </button>
          )}
          {echoedWillAvailable && onEchoedWill && (
            <button type="button" className="scene-choice-btn" style={{ ...C.btn('#2a4060'), width: '100%' }} onClick={() => { playHallPassSound('confirm', soundEnabled); onEchoedWill(); }}>
              Echoed Will — reverse hunger curse (backlash scrutiny)
            </button>
          )}
          <button type="button" className="scene-choice-btn" style={{ ...C.btn('#502030'), width: '100%' }} onClick={() => { playHallPassSound('click', soundEnabled); onDeny(); }}>
            Send her away (−{denyRelLoss} relationship)
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}

export function HungerOutcomeBanner({ student, action, week }) {
  const outcomeCopy = useMemo(() => {
    if (!action || !student) return null;
    const trace = [];
    const text = renderHungerOutcome(student, action, week, { trace });
    return { text, traceNodes: traceToFlagNodes(trace) };
  }, [student?.id, student?.lbs, action, week]);
  if (!outcomeCopy) return null;
  return (
    <div style={{ fontSize: 13, color: "#d8c8a8", fontStyle: "italic", lineHeight: 1.75, marginTop: 10 }}>
      {outcomeCopy.text}
      <TextFlagToolbar
        section={`hunger.outcome.${action}`}
        stateLine={buildStateLine(student, { week, stageLabel: getStage(student.lbs).label })}
        text={outcomeCopy.text}
        nodes={outcomeCopy.traceNodes}
      />
    </div>
  );
}
