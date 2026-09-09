// ═══════════════════════════════════════════════════════════════
// EMBODIMENT MODAL — resident ride + embodied campus pilot
// ═══════════════════════════════════════════════════════════════
import { useEffect, useMemo, useState } from 'react';
import { C } from '../../styles.js';
import { playHallPassSound } from '../../gameData/hallPassAudio.js';
import { getAvailableEmbodimentActions } from '../../gameData/v2/residentEmbodiment.js';
import { isEmbodiedImmobile } from '../../gameData/v2/embodiedCampus.js';
import { CAMPUS_NODES } from '../../gameData/campus.js';
import { createContext } from '../../textEngine/engine.js';
import {
  renderEmbodimentEnter,
  renderEmbodimentAction,
  renderEmbodimentRelease,
} from '../../textEngine/scenes/v2/embodiment/index.js';
import {
  renderEmbodiedArrive,
  renderEmbodiedMove,
  renderEmbodiedEvent,
} from '../../textEngine/scenes/v2/embodiment/campusWalk.js';
import '../../textEngine/scenes/v2/embodiment/depth.js';
import { StudentPortrait } from '../StudentPortrait.jsx';
import { SceneBackdrop } from './SceneBackdrop.jsx';
import { CampusMap } from '../../views/CampusView.jsx';

function logColor(line) {
  if (line.startsWith('🌒')) return '#c8a0e8';
  if (line.startsWith('→')) return '#8ab878';
  if (line.startsWith('⚡')) return '#e0c070';
  if (line.startsWith('⚠️')) return '#e08060';
  if (line.startsWith('👀') || line.startsWith('🚪')) return '#d0a890';
  return '#b0a8c0';
}

export function EmbodimentModal({
  student,
  week = 1,
  ownedSkills,
  ownedHallSkills,
  embodimentState,
  walkLog = [],
  onAppendLog,
  onStart,
  onAction,
  onMove,
  onEventResolve,
  onRelease,
  onClose,
  soundEnabled = true,
}) {
  const [pendingEvent, setPendingEvent] = useState(null);
  useEffect(() => { playHallPassSound('session', soundEnabled); }, [soundEnabled, student?.id, embodimentState?.activeStudentId, embodimentState?.at]);
  const active = embodimentState?.activeStudentId === student?.id;
  const atNode = embodimentState?.at || 'dorms';
  const node = CAMPUS_NODES[atNode] || CAMPUS_NODES.dorms;
  const steps = embodimentState?.steps || 0;
  const eventsSeen = Object.keys(embodimentState?.eventsSeen || {}).length;
  const actions = getAvailableEmbodimentActions(
    student,
    ownedSkills,
    ownedHallSkills || {},
    atNode,
  );

  const ctx = useMemo(
    () => createContext({ subject: student, week, globals: { embodiment: true, campusNodeId: atNode } }),
    [student, week, atNode],
  );

  const log = walkLog;

  const handleStart = () => {
    const text = renderEmbodimentEnter(ctx);
    const arrive = renderEmbodiedArrive(student, atNode, week);
    onAppendLog?.(`🌒 ${text}`);
    onAppendLog?.(arrive);
    onStart?.(student.id);
  };

  const handleMove = (toId) => {
    if (pendingEvent) return;
    const moveLine = renderEmbodiedMove(student, atNode, toId, week);
    onAppendLog?.(moveLine);
    const result = onMove?.(toId);
    if (result?.error) {
      onAppendLog?.(`⚠️ ${result.error}`);
      return;
    }
    if (result?.event) {
      const witness = result.event.witnessStudent || null;
      const prose = renderEmbodiedEvent(result.event.id, student, toId, week, { ref: witness, witness });
      setPendingEvent({ ...result.event, prose, nodeId: toId });
      onAppendLog?.(`⚡ ${result.event.label}`);
      onAppendLog?.(prose);
    } else if (result?.arriveText) {
      onAppendLog?.(result.arriveText);
    }
  };

  const handleEventDone = () => {
    if (!pendingEvent) return;
    onEventResolve?.(pendingEvent);
    setPendingEvent(null);
  };

  const handleAction = (act) => {
    const text = renderEmbodimentAction(act.id, ctx);
    onAppendLog?.(`\n— ${act.label} —\n${text}`);
    onAction?.(act, student);
  };

  const handleRelease = () => {
    const text = renderEmbodimentRelease(ctx);
    onAppendLog?.(`🌒 ${text}`);
    onRelease?.();
  };

  return (
    <div style={C.modalOverlay}>
      <div className="hall-pass-modal-in embodiment-modal" style={{ ...C.modal, maxWidth: 560, maxHeight: '92vh', overflowY: 'auto', borderColor: '#8a4be080' }}>
        <SceneBackdrop variant="embodiment" />
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
          <StudentPortrait student={student} size={72} />
          <div style={{ flex: 1 }}>
            <p style={{ ...C.secT, margin: 0, color: '#c8a0e8' }}>Floor Influence · Campus Pilot</p>
            <p style={{ fontSize: 11, color: '#9080a8', margin: '4px 0 0' }}>
              {active
                ? `Riding ${student.name} — ${node.emoji} ${node.label}`
                : `Ride along with ${student.name} and walk the campus from inside her skin`}
            </p>
            {active && (
              <p style={{ fontSize: 9, color: '#708878', margin: '6px 0 0' }}>
                {steps} steps · {eventsSeen} event{eventsSeen === 1 ? '' : 's'} witnessed
              </p>
            )}
          </div>
        </div>

        {!active ? (
          <button type="button" style={{ ...C.btn('#6a30a0'), width: '100%', marginBottom: 8 }} onClick={() => { playHallPassSound('confirm', soundEnabled); handleStart(); }}>
            Slip Inside — Begin Campus Walk
          </button>
        ) : (
          <>
            <div style={{ marginBottom: 10 }}>
              <CampusMap at={atNode} moveTo={handleMove} showSecretMarkers={false} />
            </div>
            {isEmbodiedImmobile(student) && (
              <p style={{ fontSize: 10, color: '#c08060', margin: '0 0 8px', lineHeight: 1.5 }}>
                Too vast to walk — anchored in place. Use actions and events here.
              </p>
            )}
            <p style={{ fontSize: 10, color: '#708878', margin: '0 0 8px', lineHeight: 1.5 }}>
              {node.desc}
            </p>

            {pendingEvent && (
              <div style={{ ...C.card, marginBottom: 10, borderLeft: '3px solid #e0a040' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#e0c080', marginBottom: 6 }}>
                  {pendingEvent.icon} {pendingEvent.label}
                </div>
                <p style={{ fontSize: 10, color: '#b0a090', lineHeight: 1.55, marginBottom: 8, whiteSpace: 'pre-wrap' }}>
                  {pendingEvent.prose}
                </p>
                <button type="button" style={{ ...C.btn('#5a4020'), width: '100%', fontSize: 11 }} onClick={handleEventDone}>
                  Live through it — continue
                </button>
              </div>
            )}

            <div style={{ ...C.card, marginBottom: 10, maxHeight: 200, overflowY: 'auto' }}>
              {log.length === 0 ? (
                <div style={{ fontSize: 11, color: '#706880' }}>Tap a connected location to waddle there.</div>
              ) : (
                log.map((line, i) => (
                  <div key={i} style={{ fontSize: 11, color: logColor(line), lineHeight: 1.55, marginBottom: 6, whiteSpace: 'pre-wrap' }}>
                    {line}
                  </div>
                ))
              )}
            </div>

            {actions.length > 0 && !pendingEvent && (
              <>
                <p style={{ fontSize: 10, color: '#8090a0', marginBottom: 6 }}>ACTIONS HERE</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 10 }}>
                  {actions.map((act) => (
                    <button
                      key={act.id}
                      type="button"
                      style={{ ...C.btn('#4a2870'), textAlign: 'left', fontSize: 11 }}
                      onClick={() => handleAction(act)}
                    >
                      {act.icon} {act.label}
                      <span style={{ display: 'block', fontSize: 9, color: '#9080a8', marginTop: 2 }}>{act.desc}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            <button type="button" style={{ ...C.btn('#283848'), width: '100%' }} onClick={handleRelease}>
              Release — Return to RA Desk
            </button>
          </>
        )}

        <button type="button" style={{ ...C.smBtn, width: '100%', marginTop: 8 }} onClick={() => { playHallPassSound('click', soundEnabled); onClose(); }}>Close</button>
      </div>
    </div>
  );
}
