import { useMemo } from 'react';
import { C } from '../styles.js';
import { renderHungerInterrupt, renderHungerOutcome } from '../textEngine/scenes/hungerInterrupt.js';
import { TextFlagToolbar } from './TextFlagToolbar.jsx';
import { buildStateLine, traceToFlagNodes } from '../textEngine/textFlagFormat.js';
import { getStage } from '../gameData/stages.js';

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
}) {
  const s = student;
  const interruptCopy = useMemo(() => {
    const trace = [];
    const text = renderHungerInterrupt(s, week, { trace });
    return { text, traceNodes: traceToFlagNodes(trace) };
  }, [s?.id, s?.lbs, week]);
  const hasCompounds = (pharmacistState?.unlockedCompounds || []).some(
    id => (pharmacistState?.compoundInventory?.[id] ?? 0) > 0
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.72)", zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ ...C.modal, maxWidth: 520, width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ fontSize: 10, color: "#a05050", letterSpacing: 2, marginBottom: 8 }}>INTERRUPTION</div>
        <div style={{ fontSize: 14, color: "#e8d8c8", lineHeight: 1.85, fontStyle: "italic", marginBottom: 8 }}>
          {interruptCopy.text}
        </div>
        <TextFlagToolbar
          section="hunger.interrupt"
          stateLine={buildStateLine(s, { week, stageLabel: getStage(s?.lbs ?? 130).label })}
          text={interruptCopy.text}
          nodes={interruptCopy.traceNodes}
        />
        <div style={{ display: "grid", gap: 8 }}>
          <button type="button" style={{ ...C.btn("#5818a8"), width: "100%" }} onClick={onFeed}>Feed her</button>
          {hasCompounds && (
            <button type="button" style={{ ...C.btn("#2a5070"), width: "100%" }} onClick={onCompound}>Give her a compound (in food)</button>
          )}
          <button type="button" style={{ ...C.btn("#3a3060"), width: "100%" }} onClick={onTalk}>Talk to her / calm her down</button>
          {echoedWillAvailable && onEchoedWill && (
            <button type="button" style={{ ...C.btn("#2a4060"), width: "100%" }} onClick={onEchoedWill}>
              🔁 Echoed Will — reverse hunger curse (backlash scrutiny)
            </button>
          )}
          <button type="button" style={{ ...C.btn("#502030"), width: "100%" }} onClick={onDeny}>Turn her away</button>
        </div>
      </div>
    </div>
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
