// ═══════════════════════════════════════════════════════════════
// DIALOGUE LAB — dev tool for tuning the modular text system.
// Roll batches of 5 random renders across dialogue sections with
// lockable state parameters, flag the ones that read wrong, then
// copy the flagged set (text + exact generating state) to paste
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
import '../textEngine/scenes/talkEncourage.js';
import '../textEngine/scenes/talkCodas.js';
import '../textEngine/scenes/campusSoftening.js';
import '../textEngine/scenes/hungerLexicon.js';

const MOODS = ["happy", "focused", "excited", "content", "tired", "stressed", "warm", "observant", "cheerful", "bemused", "curious", "nervous"];
const COR_POINTS = { 0: 10, 1: 50, 2: 90 };
const RANDOM = "random";

const SECTIONS = {
  "weighIn.intro": (s, opts) => renderWeighInIntro(s, 6, false, opts),
  "weighIn.introBig": (s, opts) => renderWeighInIntro(s, 6, true, opts),
  "weighIn.reaction": (s, opts) => renderWeighInReaction(s, 6, { ...opts, bigScale: getStage(s.lbs).id >= 7 }),
  "weighIn.break": (s, opts) => renderWeighInBreak(s, 6, opts),
  "weighIn.swap": (s, opts) => renderWeighInSwap(s, 6, opts),
  "weighIn.purchase": (s, opts) => renderWeighInPurchase(s, 6, opts),
  "talk.encourage": (s, opts) => render("{talk.encourage}", createContext({
    subject: s, week: 6,
    globals: { campusFattening: (opts.campusTier || 0) > 0, campusTier: opts.campusTier || 0 },
  })),
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
];

// Resolve one sample's state: locked params stay, Random rolls fresh.
function rollSample(params) {
  const v = {};
  for (const def of PARAM_DEFS) {
    v[def.key] = params[def.key] === RANDOM ? pick(def.options) : params[def.key];
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
  const opts = { campusFattening: campusTier > 0, campusTier };
  const text = SECTIONS[v.section](student, opts);
  const stateLine =
    `${base.name} (id ${base.id}) · ${Math.round(student.lbs)} lbs (stage ${stage} ${WEIGHT_STAGES[stage].label})` +
    ` · corruption ${student.corruption} (tier ${getCorruptionTier(student.corruption).id})` +
    ` · mood ${v.mood} · hunger ${hunger} · addiction ${addiction}` +
    ` · withdrawal ${v.withdrawal} · campus ${campusTier}`;
  return { section: v.section, stateLine, text, id: `${Date.now()}_${Math.random()}` };
}

function formatFlagged(flagged) {
  return flagged.map((f, i) =>
    `=== FLAGGED ${i + 1}/${flagged.length} ===\nsection: ${f.section}\nstate: ${f.stateLine}\n---\n${f.text}`
  ).join("\n\n");
}

const selStyle = { background: "#181820", color: "#e0e0e0", border: "1px solid #444", borderRadius: 4, padding: "3px 4px", fontSize: 11, maxWidth: 150 };

export function DialogueLab({ onClose }) {
  const [params, setParams] = useState(() => Object.fromEntries(PARAM_DEFS.map((d) => [d.key, RANDOM])));
  const [samples, setSamples] = useState([]);
  const [flagged, setFlagged] = useState([]);
  const [phase, setPhase] = useState("lab");
  const [copied, setCopied] = useState(false);

  const roll = () => setSamples(Array.from({ length: 5 }, () => rollSample(params)));
  const flag = (sample) => setFlagged((prev) => prev.some((f) => f.id === sample.id) ? prev : [...prev, sample]);
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
              {PARAM_DEFS.map((def) => (
                <label key={def.key} style={{ fontSize: 10, color: "#aaa", display: "flex", flexDirection: "column", gap: 2 }}>
                  {def.label}
                  <select style={selStyle} value={params[def.key]} onChange={(e) => setParams((p) => ({ ...p, [def.key]: e.target.value }))}>
                    <option value={RANDOM}>🎲 Random</option>
                    {def.options.map((o) => (
                      <option key={o} value={o}>{def.optionLabel ? def.optionLabel(o) : o}</option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
            <button style={{ ...C.btn("#1a5878"), width: "100%", marginBottom: 12 }} onClick={roll}>
              🎲 Roll 5 {samples.length ? "again " : ""}(locked params stay, Random re-rolls per sample)
            </button>
            {samples.map((s) => (
              <div key={s.id} style={{ marginBottom: 10, padding: 10, background: "rgba(255,255,255,0.03)", borderRadius: 8, border: isFlagged(s) ? "1px solid #e0a05060" : "1px solid transparent" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "flex-start", marginBottom: 6 }}>
                  <div style={{ fontSize: 9.5, color: "#8aa", lineHeight: 1.5 }}>[{s.section}] {s.stateLine}</div>
                  <button
                    style={{ ...C.smBtn, background: isFlagged(s) ? "rgba(120,80,20,0.6)" : "rgba(120,40,40,0.4)", flexShrink: 0 }}
                    onClick={() => flag(s)} disabled={isFlagged(s)}>
                    {isFlagged(s) ? "🚩 Flagged" : "🚩 Flag"}
                  </button>
                </div>
                <div style={{ fontSize: 12, color: "#e0d0b0", lineHeight: 1.7, fontStyle: "italic", whiteSpace: "pre-wrap" }}>{s.text}</div>
              </div>
            ))}
          </>
        )}

        {phase === "review" && (
          <>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <button style={C.btn("#1a5878")} onClick={() => setPhase("lab")}>← Back to lab</button>
              <button style={{ ...C.btn(copied ? "#206030" : "#5a4010"), flex: 1 }} onClick={copyAll}>
                {copied ? "✓ Copied!" : `📋 Copy all ${flagged.length} (text + state)`}
              </button>
            </div>
            {flagged.map((f, i) => (
              <div key={f.id} style={{ marginBottom: 10, padding: 10, background: "rgba(120,80,20,0.08)", borderRadius: 8, border: "1px solid #e0a05030" }}>
                <div style={{ fontSize: 9.5, color: "#c0a070", marginBottom: 6 }}>#{i + 1} · [{f.section}] {f.stateLine}</div>
                <div style={{ fontSize: 12, color: "#e0d0b0", lineHeight: 1.7, fontStyle: "italic", whiteSpace: "pre-wrap" }}>{f.text}</div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
