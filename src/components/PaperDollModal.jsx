// ═══════════════════════════════════════════════════════════════
// PAPER DOLL — device equip modal (student)
// ═══════════════════════════════════════════════════════════════
import { useMemo, useState } from 'react';
import { C } from '../styles.js';
import { getDevice } from '../gameData/devices.js';
import { equipDevice, unequipDevice } from '../gameData/deviceEffects.js';
import { devicesCompatibleWithSlot, summarizeDeviceEffect } from '../gameData/deviceQuery.js';

const ACCENT = '#4a6080';

const SLOT_DISPLAY = [
  { key: 'head', label: 'Head', row: 0, col: 1, engineSlot: 'head' },
  { key: 'neck', label: 'Neck', row: 1, col: 1, engineSlot: 'neck' },
  { key: 'torso', label: 'Torso', row: 2, col: 1, engineSlot: 'back' },
  { key: 'arms', label: 'Arms', row: 3, col: 0, engineSlot: 'arms' },
  { key: 'waist', label: 'Waist', row: 3, col: 1, engineSlot: 'waist' },
  { key: 'legs', label: 'Legs', row: 4, col: 1, engineSlot: 'legs' },
  { key: 'fullBody', label: 'Full Body', row: 5, col: 1, engineSlot: 'fullBody' },
];

const MODAL_TABS = [
  { id: 'devices', label: 'Devices', active: true },
  { id: 'clothing', label: 'Clothing', active: false },
  { id: 'relics', label: 'Relics', active: false },
];

export function PaperDollModal({
  paperDoll,
  setPaperDoll,
  students,
  setStudents,
  deviceInventory,
  setDeviceInventory,
  week,
  setAttachPicker,
  pushLog,
  preselectDef,
}) {
  const [modalTab, setModalTab] = useState('devices');
  const [selectedSlot, setSelectedSlot] = useState('waist');

  const student = useMemo(() => {
    const id = paperDoll?.studentId ?? students[0]?.id;
    return students.find((s) => s.id === id) ?? null;
  }, [paperDoll, students]);

  const resolvedPreselect = preselectDef || paperDoll?.def || null;

  if (!paperDoll) return null;

  const slotMeta = SLOT_DISPLAY.find((s) => s.key === selectedSlot) || SLOT_DISPLAY[0];
  const engineSlot = slotMeta.engineSlot;

  const currentEntry = engineSlot ? student?.equip?.[engineSlot] : null;
  const currentDef = currentEntry ? getDevice(currentEntry.defId) : null;

  const compatible = devicesCompatibleWithSlot(deviceInventory, selectedSlot);

  const close = () => setPaperDoll(null);

  const handleEquipStudent = (defId) => {
    if (!student || !engineSlot) return;
    const result = equipDevice(student, defId, week);
    if (!result.ok) {
      pushLog?.('⚠️ Could not equip device.');
      return;
    }
    setStudents((prev) => prev.map((st) => (st.id === student.id ? result.student : st)));
    setDeviceInventory((prev) => {
      const q = (prev[defId] || 0) - 1;
      const next = { ...prev };
      if (q <= 0) delete next[defId];
      else next[defId] = q;
      return next;
    });
    pushLog?.(`🛠 Equipped ${getDevice(defId)?.label} on ${student.name}.`);
  };

  const handleUnequip = () => {
    if (!student || !engineSlot) return;
    const result = unequipDevice(student, engineSlot);
    if (result.cleared) {
      setStudents((prev) => prev.map((st) => (st.id === student.id ? result.student : st)));
    }
  };

  return (
    <div style={{ ...C.overlay, zIndex: 7500 }}>
      <div className="hall-pass-modal-in paper-doll-modal" style={{ ...C.modal, maxWidth: 720, maxHeight: '90vh', overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ fontSize: 9, letterSpacing: 3, color: ACCENT }}>PAPER DOLL — DEVICES</div>
          <button type="button" className="paper-doll-choice-row" style={C.smBtn} onClick={close}>✕</button>
        </div>

        <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
          {MODAL_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className="paper-doll-choice-row"
              style={{ ...C.navB(modalTab === t.id), opacity: t.active ? 1 : 0.45 }}
              disabled={!t.active}
              onClick={() => t.active && setModalTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
          <select
            value={student?.id ?? ''}
            onChange={(e) => setPaperDoll({ studentId: Number(e.target.value) })}
            style={{ ...C.btn('#1a2030'), fontSize: 10, flex: 1 }}
          >
            {students.filter((s) => !s.hidden).map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 12 }}>
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 6,
              marginBottom: 8,
            }}>
              {SLOT_DISPLAY.map((slot) => {
                const active = selectedSlot === slot.key;
                const equipped = slot.engineSlot && !!student?.equip?.[slot.engineSlot];
                return (
                  <button
                    key={slot.key}
                    type="button"
                    className="paper-doll-choice-row"
                    onClick={() => setSelectedSlot(slot.key)}
                    style={{
                      ...C.btn(active ? ACCENT : '#1a2030'),
                      fontSize: 9,
                      padding: '8px 4px',
                      border: equipped ? '1px solid #4a9a5a' : undefined,
                    }}
                  >
                    {slot.label}
                  </button>
                );
              })}
            </div>
            <div style={C.infoBox('rgba(20,28,40,0.5)')}>
              <div style={{ fontSize: 9, color: '#6080a0', letterSpacing: 2, marginBottom: 4 }}>
                {slotMeta.label.toUpperCase()} SLOT
              </div>
              {currentDef ? (
                <>
                  <div style={{ fontWeight: 700, color: '#90b0d0' }}>{currentDef.icon} {currentDef.label}</div>
                  <div style={{ fontSize: 10, color: '#607080', marginTop: 4 }}>{summarizeDeviceEffect(currentDef)}</div>
                  <button type="button" className="paper-doll-choice-row" style={{ ...C.smBtn, marginTop: 8, fontSize: 9 }} onClick={handleUnequip}>Unequip</button>
                  {currentEntry?.attachments && (
                    <button
                      type="button"
                      className="paper-doll-choice-row"
                      style={{ ...C.smBtn, marginTop: 6, marginLeft: 6, fontSize: 9 }}
                      onClick={() => setAttachPicker?.({ studentId: student.id, hostSlot: engineSlot })}
                    >
                      Attach…
                    </button>
                  )}
                </>
              ) : (
                <div style={{ fontSize: 10, color: '#404850', fontStyle: 'italic' }}>Empty</div>
              )}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 9, color: ACCENT, letterSpacing: 2, marginBottom: 6 }}>
              COMPATIBLE DEVICES
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 280, overflow: 'auto' }}>
              {compatible.map((def) => (
                <button
                  key={def.id}
                  type="button"
                  className="paper-doll-choice-row"
                  style={{ ...C.btn(), textAlign: 'left', padding: '8px 10px' }}
                  onClick={() => handleEquipStudent(def.id)}
                >
                  <div style={{ fontWeight: 700, fontSize: 11 }}>{def.icon} {def.label}</div>
                  <div style={{ fontSize: 9, color: '#607080' }}>{summarizeDeviceEffect(def)}</div>
                </button>
              ))}
              {compatible.length === 0 && (
                <div style={{ fontSize: 10, color: '#5a3888', fontStyle: 'italic' }}>
                  No owned devices fit this slot.
                </div>
              )}
              {resolvedPreselect && compatible.some((d) => d.id === resolvedPreselect.id) && (
                <button
                  type="button"
                  className="paper-doll-choice-row"
                  style={{ ...C.btn(ACCENT), marginTop: 4 }}
                  onClick={() => handleEquipStudent(resolvedPreselect.id)}
                >
                  Equip selected: {resolvedPreselect.label}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
