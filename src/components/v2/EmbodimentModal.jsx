// ═══════════════════════════════════════════════════════════════
// EMBODIMENT MODAL — spirit possession UI
// ═══════════════════════════════════════════════════════════════
import { useState } from 'react';
import { C } from '../../styles.js';
import { getAvailableEmbodimentActions } from '../../gameData/v2/spiritEmbodiment.js';
import { createContext, render } from '../../textEngine/engine.js';
import { renderEmbodimentEnter, renderEmbodimentAction, renderEmbodimentRelease } from '../../textEngine/scenes/v2/embodiment/index.js';
import '../../textEngine/scenes/v2/embodiment/depth.js';
import { StudentPortrait } from '../StudentPortrait.jsx';
import { SceneBackdrop } from './SceneBackdrop.jsx';
import { FlaggedProse } from '../TextFlagToolbar.jsx';

export function EmbodimentModal({
  student,
  ownedSkills,
  ownedClassSkills,
  embodimentState,
  onStart,
  onAction,
  onRelease,
  onClose,
}) {
  const [log, setLog] = useState([]);
  const [traceNodes, setTraceNodes] = useState([]);
  const active = embodimentState?.activeStudentId === student?.id;
  const actions = getAvailableEmbodimentActions(student, ownedSkills, ownedClassSkills || {});

  const ctx = createContext({ subject: student, globals: { embodiment: true } });

  const handleStart = () => {
    const text = renderEmbodimentEnter(ctx);
    setLog([text]);
    onStart?.(student.id);
  };

  const handleAction = (act) => {
    const trace = [];
    const text = renderEmbodimentAction(act.id, ctx);
    setLog((prev) => [...prev, `\n\n— ${act.label} —\n\n${text}`]);
    onAction?.(act, student);
  };

  const handleRelease = () => {
    const text = renderEmbodimentRelease(ctx);
    setLog((prev) => [...prev, `\n\n${text}`]);
    onRelease?.();
  };

  return (
    <div style={C.modalOverlay}>
      <div style={{ ...C.modal, maxWidth: 520, borderColor: '#8a4be080' }}>
        <SceneBackdrop variant="embodiment" />
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
          <StudentPortrait student={student} size={72} />
          <div>
            <p style={{ ...C.secT, margin: 0, color: '#c8a0e8' }}>Spirit Embodiment</p>
            <p style={{ fontSize: 11, color: '#9080a8', margin: '4px 0 0' }}>
              {active ? `Riding inside ${student.name}` : `Inhabit ${student.name}'s body`}
            </p>
          </div>
        </div>

        {log.length > 0 && (
          <div style={{ ...C.card, marginBottom: 12, maxHeight: 200, overflowY: 'auto' }}>
            <FlaggedProse text={log.join('')} traceNodes={traceNodes} section="embodiment" />
          </div>
        )}

        {!active ? (
          <button type="button" style={{ ...C.btn('#6a30a0'), width: '100%', marginBottom: 8 }} onClick={handleStart}>
            Slip Inside
          </button>
        ) : (
          <>
            <p style={{ fontSize: 10, color: '#8090a0', marginBottom: 8 }}>EMBODIMENT ACTIONS</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
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
            <button type="button" style={{ ...C.btn('#283848'), width: '100%' }} onClick={handleRelease}>
              Release — Return to Professor
            </button>
          </>
        )}

        <button type="button" style={{ ...C.smBtn, width: '100%', marginTop: 8 }} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
