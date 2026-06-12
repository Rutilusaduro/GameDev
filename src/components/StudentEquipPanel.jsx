import { C } from '../styles.js';
import { DEVICE_SLOTS } from '../gameData/devices.js';
import { getDevice } from '../gameData/devices.js';
import { furnitureComfortLabel } from '../gameData/deviceEffects.js';

const SLOT_LAYOUT = [
  { slot: 'head', label: 'Head', row: 0, col: 1 },
  { slot: 'neck', label: 'Neck', row: 1, col: 1 },
  { slot: 'back', label: 'Back', row: 2, col: 1 },
  { slot: 'arms', label: 'Arms', row: 3, col: 0 },
  { slot: 'waist', label: 'Waist', row: 3, col: 1 },
  { slot: 'legs', label: 'Legs', row: 4, col: 1 },
  { slot: 'fullBody', label: 'Full body', row: 5, col: 1 },
];

function SlotCard({ slotMeta, entry, onUnequip, studentId }) {
  const def = entry ? getDevice(entry.defId) : null;
  const attachments = entry?.attachments ? Object.entries(entry.attachments).filter(([, a]) => a?.defId) : [];
  const occupied = !!entry;

  return (
    <div
      style={{
        gridRow: slotMeta.row + 1,
        gridColumn: slotMeta.col + 1,
        ...C.card,
        padding: '8px 10px',
        minHeight: 72,
        borderColor: occupied ? '#4a6080' : '#2a3040',
        background: occupied ? 'rgba(30,45,65,0.55)' : 'rgba(12,16,24,0.4)',
        opacity: occupied ? 1 : 0.75,
      }}
    >
      <div style={{ fontSize: 8, letterSpacing: 1.5, color: '#506070', marginBottom: 4, textTransform: 'uppercase' }}>
        {slotMeta.label}
      </div>
      {!occupied && (
        <div style={{ fontSize: 10, color: '#404850', fontStyle: 'italic' }}>empty</div>
      )}
      {occupied && (
        <>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#90a8c8', marginBottom: 2 }}>
            {def?.icon} {def?.label || entry.defId}
          </div>
          {attachments.length > 0 && (
            <div style={{ marginTop: 4, marginBottom: 4 }}>
              {attachments.map(([attachSlot, attachEntry]) => {
                const attachDef = getDevice(attachEntry.defId);
                return (
                  <div key={attachSlot} style={{ fontSize: 9, color: '#70a0c0', marginBottom: 2 }}>
                    ↳ {attachDef?.icon} {attachDef?.label || attachEntry.defId}
                  </div>
                );
              })}
            </div>
          )}
          <button
            style={{ ...C.smBtn, fontSize: 8, padding: '2px 6px', marginTop: 4 }}
            onClick={() => onUnequip(studentId, slotMeta.slot)}
          >
            Unequip
          </button>
        </>
      )}
    </div>
  );
}

export function StudentEquipPanel({ student, onUnequip }) {
  if (!student) return null;
  const equip = student.equip || {};
  const equippedCount = DEVICE_SLOTS.filter(s => equip[s]).length;
  const comfort = equip?.fullBody?.defId === 'living_furniture_rig'
    ? furnitureComfortLabel(student)
    : null;

  return (
    <div style={C.infoBox('rgba(20,28,40,0.5)')}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ fontSize: 9, color: '#6080a0', letterSpacing: 2 }}>EQUIPPED DEVICES</div>
        <span style={{ fontSize: 9, color: '#506070' }}>{equippedCount} active</span>
      </div>
      {comfort && (
        <div style={{ fontSize: 10, color: comfort.color, marginBottom: 8 }}>
          🪑 {comfort.label}
          {student.deviceState?.furnitureComfort != null && ` (${student.deviceState.furnitureComfort}/100)`}
        </div>
      )}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr 1fr',
          gap: 8,
          maxWidth: 420,
        }}
      >
        {SLOT_LAYOUT.map(slotMeta => (
          <SlotCard
            key={slotMeta.slot}
            slotMeta={slotMeta}
            entry={equip[slotMeta.slot]}
            onUnequip={onUnequip}
            studentId={student.id}
          />
        ))}
      </div>
    </div>
  );
}
