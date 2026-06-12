// ═══════════════════════════════════════════════════════════════
// DIALOGUE LAB — dev tool for tuning the modular text system.
// Roll batches of 5 random renders across dialogue sections with
// lockable state parameters. Flagging a sample shows a checkbox per
// dialogue node (engine trace provenance: module key + text); check
// a node, say what's wrong with it, save. Done → review all flags →
// copy-all payload (state + text + per-node problems) for pasting
// into a tuning session. Flags live in component state only —
// closing the lab wipes the collection.
// ═══════════════════════════════════════════════════════════════
import { useState } from 'react';
import { C } from '../styles.js';
import { INIT_STUDENTS } from '../gameData/students.js';
import { WEIGHT_STAGES, getStage } from '../gameData/stages.js';
import { getCorruptionTier } from '../gameData/corruption.js';
import { createContext, render, pick } from '../textEngine/engine.js';
import {
  renderWeighInIntro, renderWeighInReaction,
  renderWeighInBreak, renderWeighInSwap, renderWeighInPurchase,
} from '../textEngine/scenes/weighIn/index.js';
import { renderDeviceTickLine } from '../textEngine/scenes/deviceTick/index.js';
import { renderSuddenGrowthLine } from '../textEngine/scenes/suddenGrowth/index.js';
import { resolveGrowthZone } from '../textEngine/growthLexicon.js';
import { renderCampusDeviceEncounter, renderCampusDeviceResult } from '../textEngine/scenes/campusDevice/index.js';
import { renderHungerInterrupt, renderHungerOutcome } from '../textEngine/scenes/hungerInterrupt.js';
import { renderAttitude } from '../textEngine/scenes/attitude.js';
import { renderHiveIntake } from '../textEngine/scenes/hiveIntake.js';
import { DEVICES } from '../gameData/devices.js';
import { LILITH_ID } from '../gameData/lilith.js';
import '../textEngine/scenes/talkEncourage.js';
import '../textEngine/scenes/talkCodas.js';
import '../textEngine/scenes/campusSoftening.js';
import '../textEngine/scenes/hungerLexicon.js';
import '../textEngine/scenes/deviceBody.js';
import '../textEngine/scenes/campusDevice/fragments.js';

const MOODS = ["happy", "focused", "excited", "content", "tired", "stressed", "warm", "observant", "cheerful", "bemused", "curious", "nervous"];
const COR_POINTS = { 0: 10, 1: 50, 2: 90 };
const RANDOM = "random";
const DEVICE_IDS = Object.keys(DEVICES).filter(id => DEVICES[id].form === 'worn' || DEVICES[id].form === 'campus_tool');
const GROWTH_ZONES = ['belly', 'lower_body', 'curves', 'full', 'bust'];

const MOCK_EXPLORATION = { week: 6, campusTier: 1 };
const MOCK_ENCOUNTER = {
  target: { name: 'Maya', type: 'student', archetype: 'athletic', lbs: 220, studentId: 3 },
};

// Each section declares which state params actually influence its text
const STATE_PARAMS = ["girl", "stage", "corruption", "mood", "hunger", "addiction", "withdrawal"];
const SECTIONS = {
  "weighIn.intro": { params: STATE_PARAMS,
    fn: (s, opts) => renderWeighInIntro(s, 6, false, opts) },
  "weighIn.introBig": { params: STATE_PARAMS, stageMin: 7,
    fn: (s, opts) => renderWeighInIntro(s, 6, true, opts) },
  "weighIn.reaction": { params: [...STATE_PARAMS, "campus"],
    fn: (s, opts) => renderWeighInReaction(s, 6, { ...opts, bigScale: getStage(s.lbs).id >= 7 }) },
  "weighIn.break": { params: ["girl", "stage", "corruption"],
    fn: (s, opts) => renderWeighInBreak(s, 6, opts) },
  "weighIn.swap": { params: ["girl"],
    fn: (s, opts) => renderWeighInSwap(s, 6, opts) },
  "weighIn.purchase": { params: ["girl"],
    fn: (s, opts) => renderWeighInPurchase(s, 6, opts) },
  "talk.encourage": { params: STATE_PARAMS,
    fn: (s, opts) => render("{talk.encourage}", createContext({
      subject: s, week: 6,
      globals: { campusFattening: (opts.campusTier || 0) > 0, campusTier: opts.campusTier || 0 },
    }), { trace: opts.trace }) },
  "talk.coda": { params: [...STATE_PARAMS, "campus"],
    fn: (s, opts) => render("{talk.coda}", createContext({
      subject: s, week: 6,
      globals: { campusFattening: (opts.campusTier || 0) > 0, campusTier: opts.campusTier || 0 },
    }), { trace: opts.trace }) },
  "grow.sudden": { params: [...STATE_PARAMS, "growthZone"],
    fn: (s, opts) => {
      const zone = opts.growthZone && opts.growthZone !== 'random'
        ? opts.growthZone
        : resolveGrowthZone(s);
      return renderSuddenGrowthLine(s, { gainLbs: 6, growthZone: zone, week: 6 });
    } },
  "device.tick": { params: [...STATE_PARAMS, "device", "deviceDep"],
    fn: (s, opts) => {
      const deviceId = opts.device || 'auto_feeder_arm';
      const def = DEVICES[deviceId] || DEVICES.auto_feeder_arm;
      const dep = Number(opts.deviceDep || 0);
      const mockStudent = {
        ...s,
        deviceDependence: { ...s.deviceDependence, [def.id]: dep },
      };
      return renderDeviceTickLine({
        student: mockStudent,
        deviceId: def.id,
        deviceLabel: def.label,
        slot: def.slot || 'waist',
        gainLbs: 4,
        week: 6,
        attachmentIds: [],
        isMalfunction: false,
      });
    } },
  "campus.deviceEncounter": { params: ["girl", "stage"],
    fn: (s) => renderCampusDeviceEncounter(
      { name: s.name, type: 'student', archetype: s.archetype, lbs: s.lbs, studentId: s.id },
      'quad',
      MOCK_EXPLORATION,
    ) },
  "campus.deviceResult": { params: ["girl", "stage"],
    fn: (s) => renderCampusDeviceResult(
      { ...MOCK_ENCOUNTER, target: { ...MOCK_ENCOUNTER.target, name: s.name, lbs: s.lbs } },
      'remote_feeding_system',
      'stealth',
      { discovered: false, modeId: 'stealth' },
      'quad',
    ) },
  "hunger.interrupt": { params: STATE_PARAMS,
    fn: (s) => renderHungerInterrupt(s, 6) },
  "hunger.outcome.feed": { params: STATE_PARAMS,
    fn: (s) => renderHungerOutcome(s, 'feed', 6) },
  "hunger.outcome.deny": { params: STATE_PARAMS,
    fn: (s) => renderHungerOutcome(s, 'deny', 6) },
  "attitude.line": { params: STATE_PARAMS,
    fn: (s, opts) => renderAttitude(s, 6, opts) },
  "hive.intake": { params: ["girl", "stage", "corruption"],
    fn: (s) => {
      const lilith = INIT_STUDENTS.find(st => st.id === LILITH_ID) || { name: 'Lilith', lbs: 520, corruption: 90, bodyType: 'hourglass', relationship: 50 };
      const victims = [{ name: s.name, lbs: s.lbs, bodyType: s.bodyType, corruption: s.corruption, relationship: 0 }];
      return renderHiveIntake(lilith, victims, 6);
    } },
};
const SECTION_KEYS = Object.keys(SECTIONS);

const PARAM_DEFS = [
  { key: "section", label: "Section", options: SECTION_KEYS },
  { key: "girl", label: "Girl", options: INIT_STUDENTS.map((s) => String(s.id)), optionLabel: (v) => INIT_STUDENTS.find((s) => String(s.id) === v)?.name || v },
  { key: "stage", label: "Stage", options: WEIGHT_STAGES.map((w) => String(w.id)), optionLabel: (v) => `${v} · ${WEIGHT_STAGES[Number(v)].label}` },
  { key: "corruption", label: "Corruption", options: ["0", "1", "2"], optionLabel: (v) => ({ 0: "0 · Hesitant", 1: "1 · Conflicted", 2: "2 · Broken In" })[v] },
  { key: "mood", label: "Mood", options: MOODS },
  { key: "hunger", label: "Hunger", options: ["0", "1", "2", "3", "4"] },
  { key: "addiction", label: "Addiction", options: ["0", "1", "2", "3", "4"] },
  { key: "withdrawal", label: "Withdrawal", options: ["no", "yes"] },
  { key: "campus", label: "Campus tier", options: ["0", "1", "2", "3"] },
  { key: "device", label: "Device", options: DEVICE_IDS, optionLabel: (v) => DEVICES[v]?.label || v },
  { key: "deviceDep", label: "Device dep", options: ["0", "15", "30", "55", "80"], optionLabel: (v) => `${v} (${({ 0: 'Low', 15: 'Low+', 30: 'Elevated', 55: 'High', 80: 'Extreme' })[v]})` },
  { key: "growthZone", label: "Growth zone", options: [...GROWTH_ZONES, "random"], optionLabel: (v) => v === 'random' ? 'auto (body type)' : v },
];

// Resolve one sample's state: locked params stay, Random rolls fresh.
function rollSample(params) {
  const v = {};
  // Section first — its constraints shape the other rolls. A random
  // section respects a locked stage (no introBig for a small girl).
  if (params.section === RANDOM) {
    const eligible = SECTION_KEYS.filter((k) => {
      const min = SECTIONS[k].stageMin;
      return !(min && params.stage !== RANDOM && Number(params.stage) < min);
    });
    v.section = pick(eligible);
  } else {
    v.section = params.section;
  }
  const stageMin = SECTIONS[v.section].stageMin || 0;
  for (const def of PARAM_DEFS) {
    if (def.key === "section") continue;
    let options = def.options;
    if (def.key === "stage" && stageMin) options = options.filter((o) => Number(o) >= stageMin);
    v[def.key] = params[def.key] === RANDOM ? pick(options) : params[def.key];
  }
  const base = INIT_STUDENTS.find((s) => String(s.id) === v.girl);
  const stage = Number(v.stage);
  let addiction = Number(v.addiction);
  let hunger = Number(v.hunger);
  // mirror game rules: hunger 3+ needs addiction 2+; withdrawal needs addiction 2+
  if (hunger >= 3 && addiction < 2) addiction = 2;
  if (v.withdrawal === "yes" && addiction < 2) addiction = 2;
  const student = {
    ...base,
    lbs: WEIGHT_STAGES[stage].min + 10,
    corruption: COR_POINTS[v.corruption],
    mood: v.mood,
    hungerTier: hunger,
    addictionLevel: addiction,
    weeksWithoutPlayerFeed: v.withdrawal === "yes" ? 3 : 0,
    fullness: 10,
    stomachCapacity: 100,
  };
  const campusTier = Number(v.campus);
  const trace = [];
  const opts = {
    campusFattening: campusTier > 0,
    campusTier,
    trace,
    device: v.device,
    deviceDep: v.deviceDep,
    growthZone: v.growthZone,
  };
  const text = SECTIONS[v.section].fn(student, opts);
  // annotation units: leaf fragments, minus bare identity helpers
  const nodes = trace.filter((t) => t.leaf && t.text.trim() && !t.key.startsWith("subject."));
  const stateLine =
    `${base.name} (id ${base.id}) · ${Math.round(student.lbs)} lbs (stage ${stage} ${WEIGHT_STAGES[stage].label})` +
    ` · corruption ${student.corruption} (tier ${getCorruptionTier(student.corruption).id})` +
    ` · mood ${v.mood} · hunger ${hunger} · addiction ${addiction}` +
    ` · withdrawal ${v.withdrawal} · campus ${campusTier}`;
  return { section: v.section, stateLine, text, nodes, id: `${Date.now()}_${Math.random()}` };
}

function formatFlagged(flagged) {
  return flagged.map((f, i) => {
    const problems = f.problems.length
      ? `\n--- problems ---\n${f.problems.map((p) => `[${p.key}] "${p.text}" → ${p.note || "(flagged, no note)"}`).join("\n")}`
      : "";
    return `=== FLAGGED ${i + 1}/${flagged.length} ===\nsection: ${f.section}\nstate: ${f.stateLine}\n---\n${f.text}${problems}`;
  }).join("\n\n");
}

const selStyle = { background: "#181820", color: "#e0e0e0", border: "1px solid #444", borderRadius: 4, padding: "3px 4px", fontSize: 11, maxWidth: 150 };
const inputStyle = { background: "#181820", color: "#e0e0e0", border: "1px solid #555", borderRadius: 4, padding: "4px 6px", fontSize: 11, flex: 1 };

// Per-node annotation rows shown while flagging a sample.
function NodeAnnotator({ node, idx, anno, setAnno }) {
  const checked = idx in anno.notes;
  const editing = anno.open === idx;
  const toggle = () => {
    setAnno((a) => {
      const notes = { ...a.notes };
      if (checked) { delete notes[idx]; return { ...a, notes, open: a.open === idx ? null : a.open }; }
      notes[idx] = notes[idx] || "";
      return { ...a, notes, open: idx };
    });
  };
  return (
    <div style={{ marginBottom: 4 }}>
      <label style={{ display: "flex", gap: 6, alignItems: "flex-start", fontSize: 11, color: checked ? "#e0c090" : "#b0a890", cursor: "pointer" }}>
        <input type="checkbox" checked={checked} onChange={toggle} style={{ marginTop: 2 }} />
        <span><span style={{ color: "#7aa", fontSize: 9.5 }}>[{node.key}]</span> {node.text}</span>
      </label>
      {editing && (
        <div style={{ display: "flex", gap: 6, margin: "4px 0 4px 22px" }}>
          <input
            autoFocus
            style={inputStyle}
            placeholder={`What's the problem with [${node.key}]?`}
            value={anno.notes[idx] || ""}
            onChange={(e) => setAnno((a) => ({ ...a, notes: { ...a.notes, [idx]: e.target.value } }))}
            onKeyDown={(e) => { if (e.key === "Enter") setAnno((a) => ({ ...a, open: null })); }}
          />
          <button style={C.smBtn} onClick={() => setAnno((a) => ({ ...a, open: null }))}>Okay</button>
        </div>
      )}
      {checked && !editing && anno.notes[idx] && (
        <div style={{ margin: "2px 0 2px 22px", fontSize: 10, color: "#e0a050", fontStyle: "italic" }}>→ {anno.notes[idx]}</div>
      )}
    </div>
  );
}

export function DialogueLab({ onClose }) {
  const [params, setParams] = useState(() => Object.fromEntries(PARAM_DEFS.map((d) => [d.key, RANDOM])));
  const [samples, setSamples] = useState([]);
  const [flagged, setFlagged] = useState([]);
  const [phase, setPhase] = useState("lab");
  const [anno, setAnno] = useState(null); // { sampleId, notes: {nodeIdx: note}, open: nodeIdx|null }
  const [copied, setCopied] = useState(false);

  const roll = () => { setSamples(Array.from({ length: 5 }, () => rollSample(params))); setAnno(null); };
  const startFlag = (sample) => setAnno({ sampleId: sample.id, notes: {}, open: null });
  const saveFlag = (sample) => {
    const problems = Object.entries(anno.notes).map(([idx, note]) => ({
      key: sample.nodes[idx].key, text: sample.nodes[idx].text, note: note.trim(),
    }));
    setFlagged((prev) => prev.some((f) => f.id === sample.id)
      ? prev.map((f) => (f.id === sample.id ? { ...f, problems } : f))
      : [...prev, { id: sample.id, section: sample.section, stateLine: sample.stateLine, text: sample.text, problems }]);
    setAnno(null);
  };
  const isFlagged = (sample) => flagged.some((f) => f.id === sample.id);
  const copyAll = () => {
    navigator.clipboard?.writeText(formatFlagged(flagged)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div style={{ ...C.overlay, alignItems: "flex-start", paddingTop: 16, overflowY: "auto", zIndex: 60 }}>
      <div style={{ ...C.modal, maxWidth: 760, width: "95%", maxHeight: "92vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: "#70c0e0" }}>🎲 DIALOGUE LAB</div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 10, color: flagged.length ? "#e0a050" : "#666" }}>🚩 {flagged.length} flagged</span>
            {phase === "lab" && <button style={C.btn("#5a4010")} onClick={() => setPhase("review")} disabled={!flagged.length}>Done →</button>}
            <button style={C.btn("#333")} onClick={onClose}>✕ Close</button>
          </div>
        </div>

        {phase === "lab" && (
          <>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10, padding: 10, background: "rgba(255,255,255,0.04)", borderRadius: 8 }}>
              {PARAM_DEFS.map((def) => {
                const lockedSection = params.section !== RANDOM ? SECTIONS[params.section] : null;
                // dither params the selected section doesn't react to
                // (everything stays live while section is Random)
                const relevant = def.key === "section" || !lockedSection || lockedSection.params.includes(def.key);
                let options = def.options;
                if (def.key === "stage" && lockedSection?.stageMin) {
                  options = options.filter((o) => Number(o) >= lockedSection.stageMin);
                }
                const onChange = (e) => setParams((p) => {
                  const next = { ...p, [def.key]: e.target.value };
                  // picking a big-scale section invalidates a small locked stage
                  if (def.key === "section") {
                    const min = SECTIONS[e.target.value]?.stageMin;
                    if (min && next.stage !== RANDOM && Number(next.stage) < min) next.stage = RANDOM;
                  }
                  return next;
                });
                return (
                  <label key={def.key} style={{ fontSize: 10, color: relevant ? "#aaa" : "#555", display: "flex", flexDirection: "column", gap: 2, opacity: relevant ? 1 : 0.35 }}>
                    {def.label}
                    <select style={selStyle} value={params[def.key]} disabled={!relevant} onChange={onChange}>
                      <option value={RANDOM}>🎲 Random</option>
                      {options.map((o) => (
                        <option key={o} value={o}>{def.optionLabel ? def.optionLabel(o) : o}</option>
                      ))}
                    </select>
                  </label>
                );
              })}
            </div>
            <button style={{ ...C.btn("#1a5878"), width: "100%", marginBottom: 12 }} onClick={roll}>
              🎲 Roll 5 {samples.length ? "again " : ""}(locked params stay, Random re-rolls per sample)
            </button>
            {samples.map((s) => {
              const annotating = anno?.sampleId === s.id;
              return (
                <div key={s.id} style={{ marginBottom: 10, padding: 10, background: "rgba(255,255,255,0.03)", borderRadius: 8, border: isFlagged(s) ? "1px solid #e0a05060" : annotating ? "1px solid #70c0e060" : "1px solid transparent" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "flex-start", marginBottom: 6 }}>
                    <div style={{ fontSize: 9.5, color: "#8aa", lineHeight: 1.5 }}>[{s.section}] {s.stateLine}</div>
                    {!annotating && (
                      <button
                        style={{ ...C.smBtn, background: isFlagged(s) ? "rgba(120,80,20,0.6)" : "rgba(120,40,40,0.4)", flexShrink: 0 }}
                        onClick={() => startFlag(s)}>
                        {isFlagged(s) ? "🚩 Re-flag" : "🚩 Flag"}
                      </button>
                    )}
                  </div>
                  {!annotating && (
                    <div style={{ fontSize: 12, color: "#e0d0b0", lineHeight: 1.7, fontStyle: "italic", whiteSpace: "pre-wrap" }}>{s.text}</div>
                  )}
                  {annotating && (
                    <>
                      <div style={{ fontSize: 10, color: "#70c0e0", marginBottom: 6 }}>Check the node(s) that are wrong, say why, then save:</div>
                      {s.nodes.map((n, idx) => (
                        <NodeAnnotator key={idx} node={n} idx={idx} anno={anno} setAnno={setAnno} />
                      ))}
                      <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                        <button style={{ ...C.btn("#5a4010"), flex: 1 }} onClick={() => saveFlag(s)}>
                          💾 Save flag ({Object.keys(anno.notes).length} problem{Object.keys(anno.notes).length === 1 ? "" : "s"})
                        </button>
                        <button style={C.btn("#333")} onClick={() => setAnno(null)}>Cancel</button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </>
        )}

        {phase === "review" && (
          <>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <button style={C.btn("#1a5878")} onClick={() => setPhase("lab")}>← Back to lab</button>
              <button style={{ ...C.btn(copied ? "#206030" : "#5a4010"), flex: 1 }} onClick={copyAll}>
                {copied ? "✓ Copied!" : `📋 Copy all ${flagged.length} (text + state + problems)`}
              </button>
            </div>
            {flagged.map((f, i) => (
              <div key={f.id} style={{ marginBottom: 10, padding: 10, background: "rgba(120,80,20,0.08)", borderRadius: 8, border: "1px solid #e0a05030" }}>
                <div style={{ fontSize: 9.5, color: "#c0a070", marginBottom: 6 }}>#{i + 1} · [{f.section}] {f.stateLine}</div>
                <div style={{ fontSize: 12, color: "#e0d0b0", lineHeight: 1.7, fontStyle: "italic", whiteSpace: "pre-wrap" }}>{f.text}</div>
                {f.problems.map((p, j) => (
                  <div key={j} style={{ fontSize: 10, color: "#e0a050", marginTop: 4 }}>
                    ⚠ <span style={{ color: "#7aa" }}>[{p.key}]</span> "{p.text}" → {p.note || "(no note)"}
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
