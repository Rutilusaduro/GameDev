import { useState } from 'react';
import { C } from '../styles.js';
import { DEVICE_SLOTS } from '../gameData/devices.js';
import { getDevice } from '../gameData/devices.js';
import { slotFor } from '../gameData/deviceEffects.js';
import { furnitureComfortLabel } from '../gameData/deviceEffects.js';
import { StudentEquipPanel } from './StudentEquipPanel.jsx';

const SILVER = '#a8b0c0';
const SILVER_BORDER = '#c0c8d8';

function devicesForSlot(deviceInventory, slot, student) {
  const items = [];
  for (const [defId, qty] of Object.entries(deviceInventory || {})) {
    if (!qty || qty < 1) continue;
    const def = getDevice(defId);
    if (!def) continue;
    if (def.form === 'worn' && def.slot === slot) {
      items.push(def);
    }
  }
  const host = student?.equip?.[slot];
  if (host) {
    const hostDef = getDevice(host.defId);
    for (const [defId, qty] of Object.entries(deviceInventory || {})) {
      if (!qty || qty < 1) continue;
      const def = getDevice(defId);
      if (!def || def.form !== 'attachment') continue;
      if (!def.attachesTo?.includes(hostDef?.id)) continue;
      if (!hostDef?.attachmentSlots?.includes(def.attachSlot)) continue;
      if (host.attachments?.[def.attachSlot]) continue;
      items.push(def);
    }
  }
  return items;
}

function SlotPicker({ slot, student, deviceInventory, onEquip, onAttach, onClose }) {
  const options = devicesForSlot(deviceInventory, slot, student);
  const slotLabel = slot.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase());
  const host = student?.equip?.[slot];
  const hostDef = host ? getDevice(host.defId) : null;

  return (
    <div style={{ ...C.card, marginTop: 10, borderColor: `${SILVER}60`, background: 'rgba(12,16,24,0.85)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#90a8c8' }}>
          {hostDef ? `Replace or attach — ${slotLabel}` : `Equip — ${slotLabel}`}
        </div>
        <button style={{ ...C.smBtn, fontSize: 8, padding: '2px 6px' }} onClick={onClose}>✕</button>
      </div>
      {options.length === 0 && (
        <div style={{ fontSize: 10, color: '#606870', fontStyle: 'italic', marginBottom: 6 }}>
          No compatible devices in inventory for this slot.
        </div>
      )}
      {options.map(def => {
        const isAttach = def.form === 'attachment';
        return (
          <button
            key={def.id}
            style={{
              ...C.smBtn,
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              marginBottom: 4,
              padding: '6px 10px',
            }}
            onClick={() => (isAttach ? onAttach(def, student.id) : onEquip(def, student.id, slot))}
          >
            <span>{def.icon} {def.label}</span>
            <span style={{ fontSize: 9, color: isAttach ? '#70a0c0' : '#60a060' }}>
              {isAttach ? 'attach' : 'equip'}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function StudentEquipModal({
  student,
  deviceInventory,
  onClose,
  onUnequip,
  onEquip,
  onAttach,
}) {
  const [activeSlot, setActiveSlot] = useState(null);
  if (!student) return null;

  const equippedCount = DEVICE_SLOTS.filter(s => student.equip?.[s]).length;
  const comfort = student.equip?.fullBody?.defId === 'living_furniture_rig'
    ? furnitureComfortLabel(student)
    : null;

  return (
    <div style={C.overlay} onClick={onClose}>
      <div
        style={{ ...C.modal, maxWidth: 460, border: `1px solid ${SILVER_BORDER}` }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ fontSize: 9, letterSpacing: 3, color: SILVER }}>EQUIPMENT — {student.name}</div>
          <span style={{ fontSize: 9, color: '#708090' }}>{equippedCount} active</span>
        </div>
        {comfort && (
          <div style={{ fontSize: 10, color: comfort.color, marginBottom: 8 }}>
            🪑 {comfort.label}
            {student.deviceState?.furnitureComfort != null && ` (${student.deviceState.furnitureComfort}/100)`}
          </div>
        )}
        <StudentEquipPanel
          student={student}
          onUnequip={onUnequip}
          onSlotTap={slot => setActiveSlot(prev => (prev === slot ? null : slot))}
          activeSlot={activeSlot}
          embedded
        />
        {activeSlot && (
          <SlotPicker
            slot={activeSlot}
            student={student}
            deviceInventory={deviceInventory}
            onEquip={(def, studentId, slot) => {
              onEquip(def, studentId, slot);
              setActiveSlot(null);
            }}
            onAttach={(def, studentId) => {
              onAttach(def, studentId);
              setActiveSlot(null);
            }}
            onClose={() => setActiveSlot(null)}
          />
        )}
        <button style={{ ...C.btn('#333'), width: '100%', marginTop: 12 }} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export function EquipmentButton({ onClick }) {
  return (
    <button
      style={{
        ...C.btn(SILVER),
        width: '100%',
        background: 'linear-gradient(180deg, #b8c0d0 0%, #8890a0 100%)',
        color: '#1a2030',
        fontWeight: 700,
        fontSize: 11,
        letterSpacing: 1,
        border: `1px solid ${SILVER_BORDER}`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.35)',
        textShadow: '0 1px 0 rgba(255,255,255,0.25)',
      }}
      onClick={onClick}
    >
      🛡 Equipment
    </button>
  );
}

export function listEquippableForSlot(deviceInventory, slot) {
  return devicesForSlot(deviceInventory, slot, null).filter(d => d.form === 'worn');
}

export { slotFor };
