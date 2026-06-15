import { useState } from 'react';
import { C } from '../styles.js';
import { LILITH_ID } from '../gameData/lilith.js';
import { render, createContext, getSeason, relSize, _registryEntries } from '../textEngine/engine.js';
import { renderHiveIntake } from '../textEngine/scenes/hiveIntake.js';
import { DialogueLab } from './DialogueLab.jsx';
import { BugReportModal } from './BugReportModal.jsx';
import { buildGameSnapshot, serializeBugReport } from '../gameData/bugReport.js';
import { defaultOppositionState } from '../gameData/opposition.js';

if (typeof window !== 'undefined' && import.meta.env.DEV) {
  window.__textEngine = { render, createContext, getSeason, relSize };
}

function sampleTextEngine() {
  const out = [];
  const combos = [
    { lilithLbs: 110, victimLbs: 380, corruption: 0, week: 6, label: 'tiny Lilith / huge victims / winter' },
    { lilithLbs: 820, victimLbs: 150, corruption: 90, week: 14, label: 'colossal Lilith / thin victims / summer' },
    { lilithLbs: 200, victimLbs: 210, corruption: 40, week: 2, label: 'average Lilith / similar victims / fall' },
    { lilithLbs: 340, victimLbs: 340, corruption: 90, week: 10, label: 'heavy Lilith / heavy victims / spring' },
    { lilithLbs: 140, victimLbs: 90, corruption: 0, week: 7, label: 'small Lilith / tiny victims / winter' },
    { lilithLbs: 520, victimLbs: 600, corruption: 40, week: 15, label: 'massive both / summer' },
  ];
  for (const c of combos) {
    const lilith = { name: 'Lilith', lbs: c.lilithLbs, corruption: c.corruption, bodyType: 'hourglass', relationship: 50 };
    const victims = [
      { name: 'a dorm resident', lbs: c.victimLbs, bodyType: 'pear', corruption: 0, relationship: 0 },
      { name: 'a dorm resident', lbs: c.victimLbs, bodyType: 'apple', corruption: 0, relationship: 0 },
    ];
    out.push(`── ${c.label} (season: ${getSeason(c.week)}) ──\n${renderHiveIntake(lilith, victims, c.week)}`);
  }
  return out.join('\n\n');
}

const TABS = ['state', 'opposition', 'notes'];

export function DebugPanel({
  adminScrutiny,
  ap,
  debugApply,
  debugInputs,
  setAdminScrutiny,
  setAp,
  setDebugInputs,
  setDebugOpen,
  setLilithUnlocked,
  setStudents,
  students,
  opposition,
  setOpposition,
  setHearingState,
  week,
  money,
  view,
  log,
  lastPlayerAction,
  getSnapshotContext,
  getSaveContext,
  campusState,
  pharmacistState,
  eventQueueLen,
}) {
  const [textSample, setTextSample] = useState(null);
  const [labOpen, setLabOpen] = useState(false);
  const [tab, setTab] = useState('state');
  const [notesPreview, setNotesPreview] = useState(null);
  const [fieldNotesOpen, setFieldNotesOpen] = useState(false);
  const [scandalInput, setScandalInput] = useState(opposition?.aib?.scandalMeter ?? 0);
  const [hearingStudentId, setHearingStudentId] = useState(students.find((s) => !s.hidden)?.id ?? 1);

  const patchOpposition = (fn) => {
    setOpposition((prev) => fn(prev || defaultOppositionState()));
  };

  return (
    <div style={{ ...C.overlay, alignItems: 'flex-start', paddingTop: 16, overflowY: 'auto', zIndex: 390 }}>
      <div style={{ ...C.modal, maxWidth: 720, width: '95%', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: '#60b060' }}>🐛 DEBUG CONSOLE</div>
          <button type="button" style={C.btn('#333')} onClick={() => setDebugOpen(false)}>✕ Close</button>
        </div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              style={{ ...C.smBtn, background: tab === t ? 'rgba(60,100,60,0.5)' : 'rgba(40,40,40,0.4)', fontSize: 10 }}
              onClick={() => setTab(t)}
            >
              {t === 'state' ? 'State' : t === 'opposition' ? 'Opposition' : 'Field Notes'}
            </button>
          ))}
        </div>

        {tab === 'state' && (
          <>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14, padding: 10, background: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>
              <div style={{ fontSize: 10, color: '#888', width: '100%', marginBottom: 4 }}>GLOBAL · Week {week}</div>
              <label style={{ fontSize: 11, color: '#aaa', display: 'flex', gap: 6, alignItems: 'center' }}>
                AP:
                <input type="number" defaultValue={ap} min={0} max={999} step={5}
                  style={{ width: 60, background: '#181820', color: '#e0e0e0', border: '1px solid #444', borderRadius: 4, padding: '2px 4px', fontSize: 11 }}
                  onChange={(e) => setAp(parseInt(e.target.value, 10) || 0)} />
              </label>
              <label style={{ fontSize: 11, color: '#aaa', display: 'flex', gap: 6, alignItems: 'center' }}>
                Scrutiny:
                <input type="number" defaultValue={adminScrutiny} min={0} max={100} step={5}
                  style={{ width: 55, background: '#181820', color: '#e0e0e0', border: '1px solid #444', borderRadius: 4, padding: '2px 4px', fontSize: 11 }}
                  onChange={(e) => setAdminScrutiny(parseInt(e.target.value, 10) || 0)} />
              </label>
              <button type="button" style={{ ...C.smBtn, background: 'rgba(60,100,60,0.4)' }}
                onClick={() => setStudents((prev) => prev.map((s) => ({ ...s, relationship: 100 })))}>Max All Rel</button>
              <button type="button" style={{ ...C.smBtn, background: 'rgba(80,0,100,0.4)' }}
                onClick={() => setLilithUnlocked(true)}>🌑 Unlock Lilith</button>
              <button type="button" style={{ ...C.smBtn, background: 'rgba(60,30,0,0.5)' }}
                onClick={() => setStudents((prev) => prev.map((s) => (s.id === LILITH_ID ? s : { ...s, lbs: 300 })))}>⚖️ All 300 lbs</button>
            </div>
            <div style={{ marginBottom: 14, padding: 10, background: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>
              <div style={{ fontSize: 10, color: '#888', marginBottom: 6 }}>TEXT ENGINE — {_registryEntries().length} modules</div>
              <button type="button" style={{ ...C.smBtn, background: 'rgba(100,60,140,0.4)' }}
                onClick={() => setTextSample(sampleTextEngine())}>📜 Sample hive intake</button>
              <button type="button" style={{ ...C.smBtn, background: 'rgba(60,100,140,0.4)', marginLeft: 6 }}
                onClick={() => setLabOpen(true)}>🎲 Dialogue Lab</button>
              {labOpen && <DialogueLab onClose={() => setLabOpen(false)} />}
              {textSample && (
                <pre style={{ fontSize: 10, color: '#c8b8e0', whiteSpace: 'pre-wrap', lineHeight: 1.6, marginTop: 8, maxHeight: 240, overflowY: 'auto', background: 'rgba(0,0,0,0.3)', padding: 8, borderRadius: 6 }}>
                  {textSample}
                </pre>
              )}
            </div>
            <div style={{ fontSize: 10, color: '#888', marginBottom: 6 }}>STUDENTS</div>
            {students.map((s) => {
              const inp = debugInputs[s.id] || { lbs: String(Math.round(s.lbs)), rel: s.relationship };
              const set = (k, v) => setDebugInputs((prev) => ({ ...prev, [s.id]: { ...inp, [k]: v } }));
              return (
                <div key={s.id} style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap', padding: '7px 8px', borderRadius: 6, marginBottom: 4, background: 'rgba(255,255,255,0.03)' }}>
                  <div style={{ fontSize: 11, color: '#c0a0e0', minWidth: 90, fontWeight: 700 }}>{s.name}</div>
                  <label style={{ fontSize: 10, color: '#888', display: 'flex', gap: 4, alignItems: 'center' }}>
                    lbs:
                    <input type="number" value={inp.lbs} min={80} step={100}
                      style={{ width: 70, background: '#181820', color: '#e0e0e0', border: '1px solid #444', borderRadius: 4, padding: '2px 4px', fontSize: 10 }}
                      onChange={(e) => set('lbs', e.target.value)} />
                  </label>
                  <label style={{ fontSize: 10, color: '#888', display: 'flex', gap: 4, alignItems: 'center' }}>
                    rel:
                    <input type="number" value={inp.rel} min={0} max={100} step={10}
                      style={{ width: 48, background: '#181820', color: '#e0e0e0', border: '1px solid #444', borderRadius: 4, padding: '2px 4px', fontSize: 10 }}
                      onChange={(e) => set('rel', e.target.value)} />
                  </label>
                  <button type="button" style={{ ...C.smBtn, background: 'rgba(40,80,40,0.5)', fontSize: 10 }} onClick={() => debugApply(s.id)}>Apply ✓</button>
                </div>
              );
            })}
          </>
        )}

        {tab === 'opposition' && (
          <div style={{ padding: 10, background: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>
            <div style={{ fontSize: 10, color: '#c88', marginBottom: 10 }}>OPPOSITION LAB (§36)</div>
            <div style={{ fontSize: 11, color: '#aaa', marginBottom: 8 }}>
              AIB {opposition?.aib?.unlocked ? 'unlocked' : 'locked'} · Scandal {opposition?.aib?.scandalMeter ?? 0} · Scarcity {opposition?.supernatural?.scarcityPressure ?? 0}
            </div>
            <label style={{ fontSize: 11, color: '#aaa', display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
              Scandal meter:
              <input type="range" min={0} max={100} value={scandalInput}
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10);
                  setScandalInput(v);
                  patchOpposition((o) => ({ ...o, aib: { ...o.aib, scandalMeter: v } }));
                }} />
              {scandalInput}
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
              <button type="button" style={{ ...C.smBtn, background: 'rgba(80,40,40,0.5)' }}
                onClick={() => patchOpposition((o) => ({ ...o, aib: { ...o.aib, unlocked: true } }))}>Unlock AIB</button>
              <button type="button" style={{ ...C.smBtn, background: 'rgba(80,40,40,0.5)' }}
                onClick={() => setAdminScrutiny((s) => Math.min(100, s + 10))}>+10 Scrutiny</button>
              <button type="button" style={{ ...C.smBtn, background: 'rgba(80,40,40,0.5)' }}
                onClick={() => patchOpposition((o) => ({ ...o, aib: { ...o.aib, agendaQueue: [] } }))}>Clear agenda</button>
              <button type="button" style={{ ...C.smBtn, background: 'rgba(100,60,80,0.5)' }}
                onClick={() => {
                  if (!window.confirm('Fire Supernatural Act? Irreversible for this save.')) return;
                  patchOpposition((o) => ({
                    ...o,
                    supernatural: { ...o.supernatural, actTriggered: true, actWeek: week, scarcityPressure: 25, ascensionOffered: false },
                  }));
                }}>Fire Supernatural Act</button>
            </div>
            <div style={{ fontSize: 10, color: '#888', marginBottom: 6 }}>Queue removal hearing</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
              <select value={hearingStudentId} onChange={(e) => setHearingStudentId(parseInt(e.target.value, 10))}
                style={{ background: '#181820', color: '#ddd', border: '1px solid #444', borderRadius: 4, fontSize: 11 }}>
                {students.filter((s) => !s.hidden).map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
              <button type="button" style={{ ...C.smBtn, background: 'rgba(80,50,30,0.5)' }}
                onClick={() => patchOpposition((o) => ({
                  ...o,
                  aib: { ...o.aib, pendingHearing: { studentId: hearingStudentId, resolvesWeek: null } },
                }))}>Queue hearing</button>
              <button type="button" style={{ ...C.smBtn, background: 'rgba(80,50,30,0.5)' }}
                onClick={() => setHearingState?.({
                  type: 'emergency', studentId: null, phaseIdx: 0, history: [], log: [], done: false,
                })}>Open emergency hearing</button>
            </div>
            <div style={{ fontSize: 10, color: '#888', marginBottom: 6 }}>Compromise member</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {(opposition?.aib?.members || []).map((m) => (
                <button key={m.id} type="button" style={{ ...C.smBtn, fontSize: 9, background: 'rgba(60,40,60,0.5)' }}
                  onClick={() => patchOpposition((o) => ({
                    ...o,
                    aib: {
                      ...o.aib,
                      members: o.aib.members.map((x) => (x.id === m.id ? { ...x, stance: 'compromised', corruption: 60 } : x)),
                    },
                  }))}>{m.name.split(' ').pop()}</button>
              ))}
            </div>
          </div>
        )}

        {tab === 'notes' && (
          <div style={{ padding: 10, background: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>
            <div style={{ fontSize: 10, color: '#c9a060', marginBottom: 8 }}>FIELD NOTES PREVIEW</div>
            <div style={{ fontSize: 10, color: '#888', marginBottom: 8 }}>Last action: {lastPlayerAction || '—'}</div>
            <button type="button" style={{ ...C.smBtn, background: 'rgba(90,70,40,0.5)', marginRight: 6 }}
              onClick={() => setNotesPreview(serializeBugReport(buildGameSnapshot(getSnapshotContext?.() || {}, { category: 'dev', steps: 'debug preview' })))}>
              Preview snapshot JSON
            </button>
            <button type="button" style={{ ...C.smBtn, background: 'rgba(90,70,40,0.5)' }}
              onClick={() => setFieldNotesOpen(true)}>Open Field Notes modal</button>
            {notesPreview && (
              <pre style={{ fontSize: 9, color: '#a09080', marginTop: 10, maxHeight: 320, overflow: 'auto', background: '#0a0808', padding: 8, borderRadius: 6 }}>
                {notesPreview.slice(0, 8000)}{notesPreview.length > 8000 ? '\n…' : ''}
              </pre>
            )}
            {fieldNotesOpen && (
              <BugReportModal getSnapshotContext={getSnapshotContext} getSaveContext={getSaveContext} onClose={() => setFieldNotesOpen(false)} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
