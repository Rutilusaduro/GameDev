import { useEffect } from 'react';
import { C } from '../styles.js';
import { playHallPassSound } from '../gameData/hallPassAudio.js';

export function DeviceTargetPicker({ deviceTargetPicker, setDeviceTargetPicker, students, lilithUnlocked, useDeviceOn, soundEnabled = true }) {
  const { def } = deviceTargetPicker;
  useEffect(() => { playHallPassSound('confirm', soundEnabled); }, [soundEnabled, def?.id]);

  return (
    <div style={C.overlay}>
      <div className="hall-pass-modal-in" style={{ ...C.modal, maxWidth: 460 }}>
        <div style={{ fontSize: 9, letterSpacing: 3, color: '#6080a0', marginBottom: 6 }}>USE DEVICE</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#90b0d0', marginBottom: 4 }}>{def.icon} {def.label}</div>
        <div style={{ fontSize: 11, color: '#5a6080', marginBottom: 12 }}>One-shot — who receives the injection?</div>
        <div style={{ maxHeight: 320, overflowY: 'auto', marginBottom: 10 }}>
          {students.filter(s => !s.hidden || lilithUnlocked).map(s => (
            <button
              key={s.id}
              style={{ ...C.smBtn, display: 'flex', width: '100%', justifyContent: 'space-between', marginBottom: 3, padding: '7px 10px' }}
              onClick={() => { playHallPassSound('click', soundEnabled); useDeviceOn(def, s.id); }}
            >
              <span>{s.name}</span>
              <span style={{ fontSize: 10, color: '#60a060' }}>{Math.round(s.lbs)} lbs</span>
            </button>
          ))}
        </div>
        <button style={{ ...C.btn('#333'), width: '100%' }} onClick={() => { playHallPassSound('click', soundEnabled); setDeviceTargetPicker(null); }}>Cancel</button>
      </div>
    </div>
  );
}
