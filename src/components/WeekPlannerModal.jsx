// B3 — week planner slot board (preview before commit).
import { useEffect, useMemo, useState } from 'react';
import { C } from '../styles.js';
import { playHallPassSound } from '../gameData/hallPassAudio.js';
import {
  PLANNER_VENUES,
  WEEK_PLAN_SLOT_COUNT,
  emptyWeekPlan,
  mealCostPreview,
  planConflicts,
  previewPlannedSlot,
  defaultSlotLabel,
} from '../gameData/weekPlanner.js';
import { getStage } from '../gameData/stages.js';

export function WeekPlannerModal({ students, week, initialPlan, onCommit, onClose, soundEnabled = true }) {
  useEffect(() => { playHallPassSound('click', soundEnabled); }, [soundEnabled, week]);
  const visible = useMemo(
    () => (students || []).filter((s) => !s.hidden && s.lockState !== 'locked'),
    [students],
  );
  const [plan, setPlan] = useState(() => initialPlan || emptyWeekPlan());
  const [pickStudent, setPickStudent] = useState(null);
  const conflicts = useMemo(() => planConflicts(plan, students), [plan, students]);

  const assignSlot = (slotIndex, studentId) => {
    setPlan((prev) => {
      const slots = prev.slots.map((s, i) => (i === slotIndex ? { ...s, studentId } : s));
      return { ...prev, slots };
    });
  };

  return (
    <div style={C.overlay}>
      <div className="hall-pass-modal-in" style={{ ...C.modal, maxWidth: 560 }}>
        <div style={{ fontSize: 9, letterSpacing: 3, color: '#9050c8', marginBottom: 4 }}>WEEK PLANNER</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#c090e8', marginBottom: 4 }}>Week {week} — place your attention</div>
        <div style={{ fontSize: 11, color: '#5a3888', marginBottom: 12 }}>
          Each slot previews cost and interrupt risk. Unfilled slots show what you skip.
        </div>

        {conflicts.length > 0 && (
          <div style={{ ...C.infoBox('rgba(80,30,20,0.25)'), marginBottom: 10 }}>
            {conflicts.map((c) => (
              <div key={c} style={{ fontSize: 11, color: '#e0a080' }}>⚠ {c}</div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12, maxHeight: '42vh', overflowY: 'auto' }}>
          {plan.slots.map((slot, i) => {
            const student = slot.studentId != null ? students.find((s) => s.id === slot.studentId) : null;
            const venue = PLANNER_VENUES.find((v) => v.id === slot.venueId) || PLANNER_VENUES[0];
            const preview = previewPlannedSlot(student, { ...slot, slotIndex: i }, week);
            return (
              <div key={i} style={{ ...C.card, cursor: 'default', marginBottom: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ fontWeight: 700, color: '#c090e8' }}>
                    Slot {i + 1} · {venue.glyph} {venue.label}
                  </div>
                  <button type="button" style={{ ...C.smBtn, margin: 0, fontSize: 9 }} onClick={() => assignSlot(i, null)}>
                    Clear
                  </button>
                </div>
                {student ? (
                  <>
                    <div style={{ fontSize: 12, color: '#d8c0ff', marginBottom: 4 }}>
                      {student.name} · {getStage(student.lbs).label}
                    </div>
                    <div style={{ fontSize: 11, color: '#9080b0' }}>{preview.cost?.label}</div>
                    {preview.interrupt && <div style={{ fontSize: 10, color: '#c08060', marginTop: 4 }}>{preview.interrupt}</div>}
                    {preview.hint && <div style={{ fontSize: 10, color: '#80a0c0', marginTop: 4, fontStyle: 'italic' }}>{preview.hint}</div>}
                  </>
                ) : (
                  <div style={{ fontSize: 11, color: '#706090', fontStyle: 'italic' }}>{defaultSlotLabel(i)}</div>
                )}
                <button
                  type="button"
                  style={{ ...C.smBtn, marginTop: 6, width: '100%' }}
                  onClick={() => {
                    if (pickStudent != null) assignSlot(i, pickStudent);
                    else if (student) assignSlot(i, null);
                  }}
                >
                  {pickStudent != null ? 'Place selected resident here' : student ? 'Remove' : 'Select a resident below, then tap here'}
                </button>
              </div>
            );
          })}
        </div>

        <div style={{ fontSize: 9, color: '#6040a0', letterSpacing: 2, marginBottom: 6 }}>ROSTER</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
          {visible.map((s) => {
            const cost = mealCostPreview(s, week);
            const selected = pickStudent === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setPickStudent(selected ? null : s.id)}
                style={{
                  ...C.smBtn,
                  margin: 0,
                  background: selected ? 'rgba(120,60,200,0.45)' : undefined,
                  borderColor: selected ? '#a060e0' : undefined,
                }}
              >
                {s.name} · ~${cost.cost}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" style={{ ...C.btn(), flex: 1 }} onClick={() => onCommit?.(plan)}>
            Lock plan
          </button>
          <button type="button" style={{ ...C.btn('#333'), flex: 0 }} onClick={() => { playHallPassSound('click', soundEnabled); onClose?.(); }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
