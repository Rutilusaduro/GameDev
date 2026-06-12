import { C } from '../styles.js';
import { slotFor, findAttachmentHostSlot } from '../gameData/deviceEffects.js';
import { DEVICES, getDevice } from '../gameData/devices.js';

export function EquipPicker({ equipPicker, setEquipPicker, students, lilithUnlocked, equipDeviceOn }) {
  const { def } = equipPicker;
  const slot = slotFor(def);
  return (
    <div style={C.overlay}>
      <div style={{ ...C.modal, maxWidth: 460 }}>
        <div style={{ fontSize: 9, letterSpacing: 3, color: '#6080a0', marginBottom: 6 }}>EQUIP DEVICE</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#90b0d0', marginBottom: 4 }}>{def.icon} {def.label}</div>
        <div style={{ fontSize: 11, color: '#5a6080', marginBottom: 12 }}>
          Slot: <strong>{slot}</strong> — choose a student
        </div>
        <div style={{ maxHeight: 320, overflowY: 'auto', marginBottom: 10 }}>
          {students.filter(s => !s.hidden || lilithUnlocked).map(s => {
            const occupied = s.equip?.[slot];
            const occupant = occupied ? getDevice(occupied.defId) : null;
            return (
              <button
                key={s.id}
                style={{ ...C.smBtn, display: 'flex', width: '100%', justifyContent: 'space-between', marginBottom: 3, padding: '7px 10px', opacity: occupied ? 0.7 : 1 }}
                onClick={() => equipDeviceOn(def, s.id, slot)}
              >
                <span>{s.name}</span>
                <span style={{ fontSize: 10, color: occupied ? '#c8860a' : '#60a060' }}>
                  {occupied ? `${occupant?.label || 'occupied'} — replace?` : 'slot free'}
                </span>
              </button>
            );
          })}
        </div>
        <button style={{ ...C.btn('#333'), width: '100%' }} onClick={() => setEquipPicker(null)}>Cancel</button>
      </div>
    </div>
  );
}

export function AttachPicker({ attachPicker, setAttachPicker, students, lilithUnlocked, attachDeviceOn }) {
  const { def } = attachPicker;
  return (
    <div style={C.overlay}>
      <div style={{ ...C.modal, maxWidth: 460 }}>
        <div style={{ fontSize: 9, letterSpacing: 3, color: '#6080a0', marginBottom: 6 }}>ATTACH MODULE</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#90b0d0', marginBottom: 4 }}>{def.icon} {def.label}</div>
        <div style={{ fontSize: 11, color: '#5a6080', marginBottom: 12 }}>
          Requires a compatible host with an open {def.attachSlot} slot
        </div>
        <div style={{ maxHeight: 320, overflowY: 'auto', marginBottom: 10 }}>
          {students.filter(s => !s.hidden || lilithUnlocked).map(s => {
            const hostSlot = findAttachmentHostSlot(s, def.id);
            const host = hostSlot ? s.equip?.[hostSlot] : null;
            const hostDef = host ? DEVICES[host.defId] : null;
            const canAttach = !!hostSlot;
            return (
              <button
                key={s.id}
                style={{ ...C.smBtn, display: 'flex', width: '100%', justifyContent: 'space-between', marginBottom: 3, padding: '7px 10px', opacity: canAttach ? 1 : 0.4 }}
                disabled={!canAttach}
                onClick={() => attachDeviceOn(def, s.id)}
              >
                <span>{s.name}</span>
                <span style={{ fontSize: 10, color: canAttach ? '#60a060' : '#888' }}>
                  {canAttach ? `${hostDef?.label || 'host'} (${hostSlot})` : 'no host'}
                </span>
              </button>
            );
          })}
        </div>
        <button style={{ ...C.btn('#333'), width: '100%' }} onClick={() => setAttachPicker(null)}>Cancel</button>
      </div>
    </div>
  );
}
