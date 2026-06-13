// ═══════════════════════════════════════════════════════════════
// PAPER DOLL — device equip modal (student or Professor)
// ═══════════════════════════════════════════════════════════════
import { useMemo, useState } from 'react';
import { C } from '../styles.js';
import { getDevice } from '../gameData/devices.js';
import { equipDevice, unequipDevice, slotFor } from '../gameData/deviceEffects.js';
import { devicesCompatibleWithSlot, summarizeDeviceEffect } from '../gameData/deviceQuery.js';
import { equipPlayerDevice, unequipPlayerDevice } from '../gameData/playerDevices.js';

const ACCENT = '#4a6080';

const SLOT_DISPLAY = [
  { key: 'head', label: 'Head', row: 0, col: 1, engineSlot: 'head' },
  { key: 'neck', label: 'Neck', row: 1, col: 1, engineSlot: 'neck' },
  { key: 'torso', label: 'Torso', row: 2, col: 1, engineSlot: 'back' },
  { key: 'arms', label: 'Arms', row: 3, col: 0, engineSlot: 'arms' },
  { key: 'waist', label: 'Waist', row: 3, col: 1, engineSlot: 'waist' },
  { key: 'legs', label: 'Legs', row: 4, col: 1, engineSlot: 'legs' },
  { key: 'fullBody', label: 'Full Body', row: 5, col: 1, engineSlot: 'fullBody' },
  { key: 'special', label: 'Special', row: 6, col: 1, engineSlot: null, placeholder: true },
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
  player,
  setPlayer,
  deviceInventory,
  setDeviceInventory,
  week,
  setAttachPicker,
  pushLog,
  preselectDef,
}) {
  const [modalTab, setModalTab] = useState('devices');
  const [selectedSlot, setSelectedSlot] = useState('waist');
  const [professorMode, setProfessorMode] = useState(
    () => paperDoll?.target === 'professor',
  );

  const student = useMemo(() => {
    if (professorMode || paperDoll?.target === 'professor') return null;
    const id = paperDoll?.studentId ?? students[0]?.id;
    return students.find((s) => s.id === id) ?? null;
  }, [paperDoll, students, professorMode]);

  const resolvedPreselect = preselectDef || paperDoll?.def || null;

  if (!paperDoll) return null;

  const slotMeta = SLOT_DISPLAY.find((s) => s.key === selectedSlot) || SLOT_DISPLAY[0];
  const engineSlot = slotMeta.engineSlot;

  const currentEntry = professorMode
    ? player?.equip?.[selectedSlot === 'torso' ? 'torso' : selectedSlot]
    : (engineSlot ? student?.equip?.[engineSlot] : null);

  const currentDef = currentEntry ? getDevice(currentEntry.defId) : null;

  const compatible = slotMeta.placeholder
    ? []
    : devicesCompatibleWithSlot(deviceInventory, selectedSlot, { playerMode: professorMode });

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

  const handleEquipProfessor = (defId) => {
    const result = equipPlayerDevice(player, defId, selectedSlot === 'torso' ? 'torso' : selectedSlot);
    if (!result.ok) {
      pushLog?.('⚠️ Could not equip personal device.');
      return;
    }
    setPlayer(result.player);
    setDeviceInventory((prev) => {
      const q = (prev[defId] || 0) - 1;
      const next = { ...prev };
      if (q <= 0) delete next[defId];
      else next[defId] = q;
      return next;
    });
    pushLog?.(`🛠 Equipped ${getDevice(defId)?.label} on yourself.`);
  };

  const handleUnequip = () => {
    if (professorMode) {
      const slotKey = selectedSlot === 'torso' ? 'torso' : selectedSlot;
      setPlayer(unequipPlayerDevice(player, slotKey).player);
      return;
    }
    if (!student || !engineSlot) return;
    const result = unequipDevice(student, engineSlot);
    if (result.cleared) {
      setStudents((prev) => prev.map((st) => (st.id === student.id ? result.student : st)));
    }
  };

  const handlePickDevice = (def) => {
    if (professorMode) handleEquipProfessor(def.id);
    else handleEquipStudent(def.id);
  };

  return (
    <div style={{ ...C.overlay, zIndex: 7500 }}>
      <div style={{ ...C.modal, maxWidth: 720, maxHeight: '90vh', overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ fontSize: 9, letterSpacing: 3, color: ACCENT }}>PAPER DOLL — DEVICES</div>
          <button style={C.smBtn} onClick={close}>✕</button>
        </div>

        <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
          {MODAL_TABS.map((t) => (
            <button
              key={t.id}
              style={{ ...C.navB(modalTab === t.id), opacity: t.active ? 1 : 0.45 }}
              disabled={!t.active}
              onClick={() => t.active && setModalTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
          <button
            style={C.navB(!professorMode)}
            onClick={() => setProfessorMode(false)}
          >
            Student
          </button>
          <button
            style={C.navB(professorMode)}
            onClick={() => setProfessorMode(true)}
          >
            Professor
          </button>
          {!professorMode && (
            <select
              value={student?.id ?? ''}
              onChange={(e) => setPaperDoll({ studentId: Number(e.target.value) })}
              style={{ ...C.btn('#1a2030'), fontSize: 10, flex: 1 }}
            >
              {students.filter((s) => !s.hidden).map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          )}
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
                const equipped = professorMode
                  ? !!player?.equip?.[slot.key]
                  : (slot.engineSlot && !!student?.equip?.[slot.engineSlot]);
                return (
                  <button
                    key={slot.key}
                    disabled={slot.placeholder}
                    onClick={() => !slot.placeholder && setSelectedSlot(slot.key)}
                    style={{
                      ...C.btn(active ? ACCENT : '#1a2030'),
                      opacity: slot.placeholder ? 0.4 : 1,
                      fontSize: 9,
                      padding: '8px 4px',
                      border: equipped ? '1px solid #4a9a5a' : undefined,
                    }}
                  >
                    {slot.label}
                    {slot.placeholder && <div style={{ fontSize: 7, color: '#606878' }}>soon</div>}
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
                  <button style={{ ...C.smBtn, marginTop: 8, fontSize: 9 }} onClick={handleUnequip}>Unequip</button>
                  {!professorMode && currentEntry?.attachments && (
                    <button
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
            {slotMeta.placeholder && (
              <div style={{ fontSize: 11, color: '#5a3888', fontStyle: 'italic' }}>
                Special slot reserved for future content.
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 280, overflow: 'auto' }}>
              {compatible.map((def) => (
                <button
                  key={def.id}
                  style={{ ...C.btn(), textAlign: 'left', padding: '8px 10px' }}
                  onClick={() => handlePickDevice(def)}
                >
                  <div style={{ fontWeight: 700, fontSize: 11 }}>{def.icon} {def.label}</div>
                  <div style={{ fontSize: 9, color: '#607080' }}>{summarizeDeviceEffect(def)}</div>
                </button>
              ))}
              {!slotMeta.placeholder && compatible.length === 0 && (
                <div style={{ fontSize: 10, color: '#5a3888', fontStyle: 'italic' }}>
                  No owned devices fit this slot.
                </div>
              )}
              {resolvedPreselect && compatible.some((d) => d.id === resolvedPreselect.id) && (
                <button
                  style={{ ...C.btn(ACCENT), marginTop: 4 }}
                  onClick={() => handlePickDevice(resolvedPreselect)}
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
