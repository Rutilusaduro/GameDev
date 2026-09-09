import { useEffect } from 'react';
import { C } from '../styles.js';
import { playHallPassSound } from '../gameData/hallPassAudio.js';
import { LAB_ACQUISITION_OPTIONS } from '../gameData/talia.js';
import { formatPartsBag } from '../gameData/labParts.js';
import { SceneBackdrop } from './v2/SceneBackdrop.jsx';
import { renderLabSessionBeat } from '../textEngine/scenes/talia/lab.js';

const ACCENT = '#4a6080';

export function LabBuildModal({
  labSession,
  setLabSession,
  taliaStudent,
  onConfirm,
  onCancel,
  applyAcquisition,
  soundEnabled = true,
}) {
  useEffect(() => {
    playHallPassSound('session', soundEnabled);
  }, [soundEnabled, labSession?.phase, labSession?.stageId]);

  if (!labSession) return null;
  const options = LAB_ACQUISITION_OPTIONS[labSession.stageId] || LAB_ACQUISITION_OPTIONS[1];

  const wrap = children => (
    <div style={{ ...C.overlay, zIndex: 8200 }}>
      <div className="hall-pass-modal-in lab-build-modal" style={{
        ...C.modal,
        maxWidth: 500,
        background: 'linear-gradient(160deg,#060810,#0a1020,#060810)',
        border: `1px solid ${ACCENT}80`,
      }}>
        {children}
      </div>
    </div>
  );

  if (labSession.phase === 'acquire') {
    const prose = renderLabSessionBeat(taliaStudent, 1, 'acquire');
    return wrap(
      <>
        <SceneBackdrop variant="lab" />
        <div style={{ fontSize: 9, letterSpacing: 3, color: ACCENT, marginBottom: 6 }}>LAB SESSION — ACQUIRE</div>
        {prose && (
          <p style={{ fontSize: 11, color: '#a0b0c8', marginBottom: 10, lineHeight: 1.65, fontStyle: 'italic' }}>
            {prose}
          </p>
        )}
        <div style={{ fontSize: 11, color: '#8090b0', marginBottom: 12, lineHeight: 1.6 }}>
          Gather parts before you build. Talia is at {Math.round(taliaStudent?.lbs || 0)} lbs — builds spend her mass.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
          {options.map(opt => (
            <button key={opt.id} style={{ ...C.btn(ACCENT), textAlign: 'left', padding: '10px 12px' }} onClick={() => { playHallPassSound('click', soundEnabled); applyAcquisition(opt.id); }}>
              <div style={{ fontWeight: 700, fontSize: 12 }}>{opt.label}</div>
              <div style={{ fontSize: 9, color: '#8090a8', marginTop: 4 }}>{opt.grant}</div>
            </button>
          ))}
        </div>
        <button style={{ ...C.btn('#333'), width: '100%' }} onClick={() => { playHallPassSound('click', soundEnabled); onCancel(); }}>Cancel</button>
      </>,
    );
  }

  if (labSession.phase === 'build') {
    const items = formatPartsBag(labSession.pool || {});
    const prose = renderLabSessionBeat(taliaStudent, 1, 'session');
    return wrap(
      <>
        <SceneBackdrop variant="lab" />
        <div style={{ fontSize: 9, letterSpacing: 3, color: ACCENT, marginBottom: 6 }}>LAB SESSION — READY</div>
        {prose && (
          <p style={{ fontSize: 11, color: '#a0b0c8', marginBottom: 10, lineHeight: 1.65, fontStyle: 'italic' }}>
            {prose}
          </p>
        )}
        <div style={{ fontSize: 11, color: '#8090b0', marginBottom: 10 }}>
          Parts acquired. Build devices from The Lab view, or close to save parts to storage.
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
          {items.map(p => (
            <span key={p.id} style={{ ...C.tag(`${ACCENT}30`, '#a0b8d8'), fontSize: 9 }}>{p.icon} {p.label} ×{p.qty}</span>
          ))}
        </div>
        <button style={{ ...C.btn(ACCENT), width: '100%', marginBottom: 6 }} onClick={() => { playHallPassSound('confirm', soundEnabled); onConfirm(labSession); }}>Save parts to lab</button>
        <button style={{ ...C.btn('#333'), width: '100%' }} onClick={() => { playHallPassSound('click', soundEnabled); onCancel(); }}>Discard session</button>
      </>,
    );
  }

  return null;
}
