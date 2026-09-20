// ═══════════════════════════════════════════════════════════════
// DEVICE TUNING MODAL — magnitude vs stability (chamber / serum)
// ═══════════════════════════════════════════════════════════════
import { useEffect, useState } from 'react';
import { C } from '../styles.js';
import { playHallPassSound } from '../gameData/hallPassAudio.js';
import { createTuningSession, rollTuningAttempt } from '../gameData/deviceUsageEvents.js';
import { ModalOverlay } from './ModalOverlay.jsx';

export function DeviceTuningModal({
  deviceDefId,
  deviceLabel,
  studentName,
  onComplete,
  onClose,
  soundEnabled = true,
}) {
  const [session, setSession] = useState(() => createTuningSession(deviceDefId, 0.55));
  const [result, setResult] = useState(null);
  useEffect(() => { playHallPassSound('session', soundEnabled); }, [soundEnabled, deviceDefId, !!result]);

  const runAttempt = () => {
    const next = rollTuningAttempt(session);
    setSession(next);
    setResult(next);
    onComplete?.({
      performanceTier: next.resultQuality,
      magnitude: session.magnitude,
      stability: session.stability,
    });
  };

  const dismiss = () => { playHallPassSound('click', soundEnabled); onClose(); };
  return (
    <ModalOverlay onClose={dismiss} soundEnabled={soundEnabled} style={{ zIndex: 1250 }}>
      <div className="hall-pass-modal-in device-modal" style={{ ...C.modal, maxWidth: 440, width: '95%' }}>
        <div style={{ fontSize: 9, letterSpacing: 2, color: '#a08050', marginBottom: 6 }}>FIELD TUNING</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#e8d0a8', marginBottom: 4 }}>{deviceLabel}</div>
        <div style={{ fontSize: 11, color: '#908070', marginBottom: 14 }}>Target: {studentName}</div>
        {!result ? (
          <>
            <div style={{ fontSize: 11, color: '#c0a890', lineHeight: 1.6, marginBottom: 12 }}>
              Push magnitude for bigger gains — stability drops as you push harder. Malfunctions spike when stability is low.
            </div>
            <label style={{ display: 'block', fontSize: 10, color: '#806050', marginBottom: 6 }}>
              Magnitude: {Math.round(session.magnitude * 100)}%
              <input
                type="range"
                min={20}
                max={95}
                value={Math.round(session.magnitude * 100)}
                style={{ width: '100%', marginTop: 6 }}
                onChange={(e) => {
                  const m = Number(e.target.value) / 100;
                  setSession((prev) => ({
                    ...prev,
                    magnitude: m,
                    stability: Math.max(0.15, 1 - m * 0.72),
                  }));
                }}
              />
            </label>
            <div style={{ fontSize: 10, color: '#706050', marginBottom: 14 }}>
              Stability: {Math.round(session.stability * 100)}%
            </div>
            <button type="button" className="device-choice-row" style={{ ...C.btn('#a07030'), width: '100%', marginBottom: 8 }} onClick={() => { playHallPassSound('confirm', soundEnabled); runAttempt(); }}>
              Commit tuning run
            </button>
          </>
        ) : (
          <div style={{ fontSize: 12, color: '#d8c8a8', lineHeight: 1.7, marginBottom: 12 }}>
            Result: <strong style={{ color: result.resultQuality === 'perfect' ? '#4a9a5a' : result.resultQuality === 'failure' ? '#c05050' : '#c0a060' }}>{result.resultQuality}</strong>
            {' '}at {Math.round(session.magnitude * 100)}% magnitude.
          </div>
        )}
        <button type="button" className="device-choice-row" style={{ ...C.btn('#302030'), width: '100%' }} onClick={dismiss}>Close</button>
      </div>
    </ModalOverlay>
  );
}

export function DeviceRouteModal({
  deviceLabel,
  studentName,
  onComplete,
  onClose,
  soundEnabled = true,
}) {
  const [alloc, setAlloc] = useState({ belly: 40, campus: 35, reserve: 25 });
  useEffect(() => { playHallPassSound('session', soundEnabled); }, [soundEnabled, deviceLabel]);

  const total = alloc.belly + alloc.campus + alloc.reserve;
  const normalized = total === 100 ? alloc : {
    belly: Math.round((alloc.belly / total) * 100),
    campus: Math.round((alloc.campus / total) * 100),
    reserve: 100 - Math.round((alloc.belly / total) * 100) - Math.round((alloc.campus / total) * 100),
  };

  const commit = () => {
    onComplete?.({ allocations: normalized });
    onClose?.();
  };

  const setVal = (key, v) => setAlloc((prev) => ({ ...prev, [key]: Number(v) }));

  const dismiss = () => { playHallPassSound('click', soundEnabled); onClose(); };
  return (
    <ModalOverlay onClose={dismiss} soundEnabled={soundEnabled} style={{ zIndex: 1250 }}>
      <div className="hall-pass-modal-in device-modal" style={{ ...C.modal, maxWidth: 440, width: '95%' }}>
        <div style={{ fontSize: 9, letterSpacing: 2, color: '#5080a0', marginBottom: 6 }}>ROUTE BUDGET</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#d0e0f0', marginBottom: 4 }}>{deviceLabel}</div>
        <div style={{ fontSize: 11, color: '#8090b0', marginBottom: 14 }}>Target: {studentName}</div>
        <div style={{ fontSize: 11, color: '#90a8c0', lineHeight: 1.55, marginBottom: 12 }}>
          Belly load grows her. Campus exposure risks discovery. Aftercare reserve lowers that risk and still counts a little toward the run.
        </div>
        {[
          { key: 'belly', label: 'Belly load' },
          { key: 'campus', label: 'Campus exposure' },
          { key: 'reserve', label: 'Aftercare reserve' },
        ].map(({ key, label }) => (
          <label key={key} style={{ display: 'block', fontSize: 10, color: '#7090b0', marginBottom: 10 }}>
            {label}: {alloc[key]}%
            <input type="range" min={0} max={100} value={alloc[key]} style={{ width: '100%', marginTop: 4 }} onChange={(e) => setVal(key, e.target.value)} aria-label={label} />
          </label>
        ))}
        <button type="button" className="device-choice-row" style={{ ...C.btn('#406080'), width: '100%', marginBottom: 8 }} onClick={() => { playHallPassSound('confirm', soundEnabled); commit(); }}>Deploy route</button>
        <button type="button" className="device-choice-row" style={{ ...C.btn('#302030'), width: '100%' }} onClick={dismiss}>Cancel</button>
      </div>
    </ModalOverlay>
  );
}
