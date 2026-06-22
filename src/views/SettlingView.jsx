// ═══════════════════════════════════════════════════════════════
// THE SETTLING — endgame area for immobile girls (stage 10+).
// They leave the class roster and live here. No "talk", no dinner,
// no mobile-only singles. Three robust trees: Socialize / Feed / Care,
// each a 2-click flow (pick tree → pick action).
// ═══════════════════════════════════════════════════════════════
import { useState } from 'react';
import { C } from '../styles.js';
import { getStage } from '../gameData/stages.js';
import { getTier } from '../gameData/sessions.js';
import { GAIN_CONFIG } from '../gameData/gainSystem.js';
import { getBodyDesc } from '../utils/gameHelpers.js';
import { getAvailableDeviceActions, getBodyOverrideBadge } from '../gameData/deviceActions.js';
import { Bar, StageTag, MoodBadge } from '../components/ui.jsx';
import {
  SETTLING_ACTIONS, getAvailableCareSubs, getImmobilityTier,
  getSettleDominant, getFinalForm, FINAL_FORMS,
  GATHERING, getAttendees, getFinalFormFx,
} from '../gameData/immobilityArrival.js';

// The Settling reads in warm amber/gold against the class roster's cold violet —
// these girls have arrived; the palette says so.
const GOLD = '#d8a850';
const GOLD_DIM = '#9a7838';
const BRANCH_TINT = { socialize: '#c878d8', feed: '#e08850', care: '#70b8a0' };

// ── Destiny bar — which final form she's drifting toward ──────────
function DestinyBar({ student }) {
  const counts = student.settleCounts || { socialize: 0, feed: 0, care: 0 };
  const total = (counts.socialize || 0) + (counts.feed || 0) + (counts.care || 0);
  const dominant = getSettleDominant(student);
  const form = getFinalForm(student);
  if (form) {
    const fx = getFinalFormFx(student);
    return (
      <div style={{ marginTop: 6 }}>
        <span style={{ ...C.tag(`${GOLD}22`, GOLD), fontSize: 9 }}>✦ {form.label}</span>
        <div style={{ fontSize: 9.5, color: GOLD_DIM, marginTop: 3, fontStyle: 'italic' }}>{form.desc}</div>
        {fx && <div style={{ fontSize: 9, color: GOLD, marginTop: 2 }}>⟡ {fx.perk}</div>}
      </div>
    );
  }
  if (total === 0) {
    return <div style={{ fontSize: 9.5, color: '#6a5a40', marginTop: 6, fontStyle: 'italic' }}>Her settling has no shape yet.</div>;
  }
  return (
    <div style={{ marginTop: 6 }}>
      <div style={{ fontSize: 8.5, letterSpacing: 2, color: GOLD_DIM, marginBottom: 3 }}>
        SETTLING TOWARD {dominant ? <b style={{ color: BRANCH_TINT[dominant] }}>{FINAL_FORMS[dominant].label}</b> : <span style={{ opacity: 0.7 }}>— still split</span>}
      </div>
      <div style={{ display: 'flex', gap: 4 }}>
        {['socialize', 'feed', 'care'].map((b) => (
          <div key={b} style={{ flex: counts[b] || 0.0001, height: 5, borderRadius: 3, background: BRANCH_TINT[b], opacity: counts[b] ? 1 : 0.12 }} title={`${b}: ${counts[b] || 0}`} />
        ))}
      </div>
    </div>
  );
}

// ── List view — the roster of the settled ────────────────────────
function SettlingTile({ s, week, onOpen }) {
  const st = getStage(s.lbs);
  const tier = getImmobilityTier(s);
  return (
    <div
      style={{ ...C.card, border: `1px solid ${GOLD}40`, background: 'linear-gradient(160deg, rgba(40,28,12,0.5), rgba(20,12,28,0.35))', position: 'relative', overflow: 'hidden' }}
      onClick={onOpen}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 700, fontSize: 15, color: GOLD }}>{s.name}</span>
          {(() => { const t = getTier(s.relationship); return t.id > 0 ? <span style={{ fontSize: 12, opacity: 0.9 }}>{t.emoji}</span> : null; })()}
          <span style={{ ...C.tag('#2a1a0a', GOLD_DIM), fontSize: 8 }}>{tier >= 2 ? 'LEVIATHAN' : 'SETTLED'}</span>
        </div>
        <StageTag stage={st} />
      </div>
      <div style={{ fontSize: 10, color: '#806040', marginBottom: 3 }}>{s.role || s.archetype} · {s.bodyType} · <MoodBadge mood={s.mood} /></div>
      <Bar val={s.lbs} max={1100} color={st.color} />
      <div style={{ fontSize: 11, color: '#b08840', margin: '2px 0' }}>
        {s.lbs.toLocaleString()} lbs  (+{(s.lbs - s.startLbs).toLocaleString()}) · ❤ {s.relationship}%
      </div>
      <DestinyBar student={s} />
    </div>
  );
}

export function SettlingListView({ students, week, setSelectedId, setView }) {
  const settled = [...students].filter((s) => getImmobilityTier(s) >= 1).sort((a, b) => b.lbs - a.lbs);
  return (
    <div>
      <p style={{ ...C.secT, color: GOLD_DIM, borderColor: `${GOLD}30` }}>The Settling — {settled.length} arrived</p>
      {settled.length === 0 ? (
        <div style={{ ...C.infoBox('rgba(40,28,12,0.3)'), color: '#8a7040', fontStyle: 'italic', textAlign: 'center', padding: 24 }}>
          No one has settled yet. When a girl grows past mobility, she leaves the class and arrives here — to be kept.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(210px,1fr))', gridAutoRows: 'minmax(150px,auto)', gap: 8 }}>
          {settled.map((s) => (
            <SettlingTile key={s.id} s={s} week={week} onOpen={() => { setSelectedId(s.id); setView('settling-detail'); }} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Detail view — the 3-tree, 2-click interface ──────────────────

// Resolve whether a sub is currently takeable; returns { ok, reason }.
function gateSub(sub, s, students) {
  switch (sub.gate) {
    case 'hasVisitor': {
      const mobile = students.filter((st) => st.id !== s.id && getImmobilityTier(st) < 1);
      return mobile.length ? { ok: true } : { ok: false, reason: 'no one free to call on her' };
    }
    case 'hasPreference':
      return s.courtPreference ? { ok: true } : { ok: false, reason: 'her taste is not known yet' };
    case 'relTier1':
      return getTier(s.relationship).id >= 1 ? { ok: true } : { ok: false, reason: 'grow closer first' };
    case 'relTier2':
      return getTier(s.relationship).id >= 2 ? { ok: true } : { ok: false, reason: 'she must hold you dear first' };
    default:
      return { ok: true };
  }
}

function SubButton({ sub, s, students, ap, onRun }) {
  const gate = gateSub(sub, s, students);
  const afford = ap >= sub.apCost;
  const disabled = !gate.ok || !afford;
  const cost = `${sub.apCost} AP`;
  const meta = [];
  if (sub.effects?.gain) meta.push(`+${sub.effects.gain[0]}–${sub.effects.gain[1]} lbs`);
  if (sub.effects?.rel) meta.push(`❤ +${sub.effects.rel}`);
  if (sub.effects?.capacity) meta.push(`stretch +${sub.effects.capacity}`);
  return (
    <button
      disabled={disabled}
      onClick={() => onRun(sub)}
      style={{
        textAlign: 'left', width: '100%', background: 'rgba(40,26,10,0.4)',
        border: `1px solid ${disabled ? '#3a2a18' : `${GOLD}55`}`, borderRadius: 8, padding: '8px 11px',
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1,
        fontFamily: 'inherit', transition: 'border-color 0.15s, transform 0.1s',
      }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = 'scale(0.985)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: disabled ? '#8a7448' : GOLD }}>{sub.label}</span>
        <span style={{ fontSize: 9.5, color: GOLD_DIM, whiteSpace: 'nowrap' }}>{cost}</span>
      </div>
      {meta.length > 0 && <div style={{ fontSize: 10, color: '#a08850', marginTop: 2 }}>{meta.join(' · ')}</div>}
      {!gate.ok && <div style={{ fontSize: 9.5, color: '#9a6048', marginTop: 2, fontStyle: 'italic' }}>🔒 {gate.reason}</div>}
      {gate.ok && !afford && <div style={{ fontSize: 9.5, color: '#9a6048', marginTop: 2, fontStyle: 'italic' }}>not enough AP</div>}
    </button>
  );
}

function TreeCard({ branch, def, s, students, ap, open, onToggle, onRun }) {
  const subs = branch === 'care' ? getAvailableCareSubs(s) : def.subs;
  const tint = BRANCH_TINT[branch];
  // Live build readout — mirrors the bonuses runSettlingAction applies, so the
  // player can see the throughline growing (Ever-Expanding / The Adored).
  let buildNote = '';
  if (branch === 'feed') {
    const capBonus = Math.floor(((s.stomachCapacity || GAIN_CONFIG.baseCapacity) - GAIN_CONFIG.baseCapacity) / 8);
    if (capBonus > 0) buildNote = `capacity built · +${capBonus} lbs/feed`;
  } else if (branch === 'socialize') {
    const standing = s.settleCounts?.socialize ?? 0;
    const relBonus = Math.floor(standing / 4);
    if (relBonus > 0) buildNote = `standing ${standing} · ❤ +${relBonus}/act`;
  }
  return (
    <div style={{ marginBottom: 8 }}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        style={{
          width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10,
          background: open ? `${tint}1a` : 'rgba(255,255,255,0.025)',
          border: `1px solid ${open ? `${tint}80` : '#241830'}`, borderRadius: 10, padding: '11px 13px',
          cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.15s, border-color 0.15s',
        }}
      >
        <span style={{ fontSize: 20 }} aria-hidden="true">{def.icon}</span>
        <span style={{ flex: 1 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: tint }}>{def.label}</span>
          <span style={{ display: 'block', fontSize: 10.5, color: '#80708a', marginTop: 1, lineHeight: 1.4 }}>{def.desc}</span>
          {buildNote && <span style={{ display: 'block', fontSize: 9.5, color: tint, marginTop: 2, fontWeight: 600, letterSpacing: 0.2 }}>✦ {buildNote}</span>}
        </span>
        <span style={{ fontSize: 12, color: tint, transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 0.18s' }} aria-hidden="true">▸</span>
      </button>
      {open && (
        <div style={{ display: 'grid', gap: 6, padding: '8px 4px 2px 4px' }}>
          {subs.map((sub) => (
            <SubButton key={sub.id} sub={sub} s={s} students={students} ap={ap} onRun={() => onRun(branch, sub)} />
          ))}
        </div>
      )}
    </div>
  );
}

export function SettlingDetailView({
  sel, students, ap, week, setView,
  openWeighIn, runDeviceAction, deviceInventory, player,
  runSettlingAction, runBrokeredVisit, runGathering, chooseLeviathanForm,
}) {
  const s = sel;
  const [openBranch, setOpenBranch] = useState('feed');
  const [visitorPick, setVisitorPick] = useState(false);
  if (!s) return null;
  const st = getStage(s.lbs);
  const tier = getImmobilityTier(s);
  const form = getFinalForm(s);

  // Route a chosen sub: special actions defer to existing handlers; the rest
  // run through the unified settling handler.
  const onRun = (branch, sub) => {
    if (sub.sceneKey === 'immob.visit') { setVisitorPick(true); return; }
    runSettlingAction(s, branch, sub);
  };

  const mobile = students.filter((st2) => st2.id !== s.id && getImmobilityTier(st2) < 1);

  return (
    <div>
      <button onClick={() => setView('settling')} style={{ ...C.smBtn, marginBottom: 8 }}>‹ The Settling</button>

      {/* Header */}
      <div style={{ ...C.card, cursor: 'default', marginBottom: 10, border: `1px solid ${GOLD}50`, background: 'linear-gradient(160deg, rgba(44,30,12,0.5), rgba(22,12,30,0.4))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <h2 style={{ margin: 0, color: GOLD, fontSize: 22, textWrap: 'balance' }}>{s.name}</h2>
            <span style={{ ...C.tag(`${GOLD}22`, GOLD), fontSize: 9 }}>{tier >= 2 ? '✦ LEVIATHAN' : '✦ SETTLED'}</span>
            {form && <span style={{ ...C.tag(`${GOLD}33`, GOLD), fontSize: 9 }}>{form.label}</span>}
          </div>
          <StageTag stage={st} />
        </div>
        <div style={{ fontSize: 11, color: '#80608a', marginBottom: 8 }}>{s.role || s.archetype} · age {s.age} · {s.bodyType} body · <MoodBadge mood={s.mood} /></div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 150 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 1 }}>
              <div style={{ fontSize: 9, color: GOLD_DIM, letterSpacing: 2 }}>WEIGHT</div>
              <button style={{ ...C.smBtn, fontSize: 9, padding: '2px 7px', margin: 0 }} onClick={() => openWeighIn && openWeighIn(s)}>⚖ Weigh In</button>
            </div>
            <Bar val={s.lbs} color={st.color} />
            <div style={{ fontSize: 11, color: '#b08840', fontVariantNumeric: 'tabular-nums' }}>{s.lbs.toLocaleString()} lbs · started {s.startLbs.toLocaleString()} · gained {(s.lbs - s.startLbs).toLocaleString()}</div>
            {(() => {
              const cap = s.stomachCapacity || 100; const full = s.fullness || 0; const stuffed = full > cap;
              return (
                <div style={{ marginTop: 6 }}>
                  <div style={{ fontSize: 9, color: GOLD_DIM, letterSpacing: 2, marginBottom: 1 }}>STOMACH {stuffed && <span style={{ color: '#e07030' }}>· STUFFED</span>}</div>
                  <Bar val={Math.min(full, cap * 1.5)} max={cap * 1.5} color={stuffed ? '#e07030' : '#40a060'} />
                  <div style={{ fontSize: 10, color: '#907050', fontVariantNumeric: 'tabular-nums' }}>{full}/{cap} fullness{s.courtPreference && <span> · craves {s.courtPreference}</span>}</div>
                </div>
              );
            })()}
          </div>
          <div style={{ flex: 1, minWidth: 150 }}>
            <div style={{ fontSize: 9, color: GOLD_DIM, letterSpacing: 2, marginBottom: 1 }}>RELATIONSHIP</div>
            <Bar val={s.relationship} max={100} color="#c040e0" />
            <div style={{ fontSize: 11, color: '#b08840' }}>{s.relationship}% · {(() => { const t = getTier(s.relationship); return <span style={{ color: t.color }}>{t.emoji} {t.label}</span>; })()}</div>
            <DestinyBar student={s} />
          </div>
        </div>
      </div>

      {/* Tie-breaker — leviathan with no dominant branch picks her form by hand */}
      {tier >= 2 && !form && (
        <div style={{ ...C.infoBox('rgba(70,45,12,0.3)'), border: `1px solid ${GOLD}66`, marginBottom: 10 }}>
          <div style={{ fontSize: 9, letterSpacing: 3, color: GOLD, marginBottom: 4 }}>✦ HER SETTLING IS SPLIT</div>
          <div style={{ fontSize: 10.5, color: '#80708a', lineHeight: 1.4, marginBottom: 8 }}>No single way of keeping her won out. Choose the form she settles into for good.</div>
          <div style={{ display: 'grid', gap: 6 }}>
            {['feed', 'care', 'socialize'].map((b) => (
              <button
                key={b}
                onClick={() => chooseLeviathanForm(s, b)}
                style={{ textAlign: 'left', background: `${BRANCH_TINT[b]}1a`, border: `1px solid ${BRANCH_TINT[b]}66`, borderRadius: 8, padding: '7px 11px', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                <div style={{ fontSize: 12.5, fontWeight: 700, color: BRANCH_TINT[b] }}>{FINAL_FORMS[b].label}</div>
                <div style={{ fontSize: 10, color: '#a08850', marginTop: 1, lineHeight: 1.35 }}>{FINAL_FORMS[b].desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Appearance */}
      <div style={C.infoBox('rgba(70,40,15,0.22)')}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
          <div style={{ fontSize: 9, color: GOLD_DIM, letterSpacing: 2 }}>WHERE SHE RESTS</div>
          {(() => { const badge = getBodyOverrideBadge(s); return badge ? <span style={{ ...C.tag(`${badge.color}30`, badge.color), fontSize: 8 }}>{badge.label}</span> : null; })()}
        </div>
        <div style={{ fontSize: 13, color: '#e0d0b0', lineHeight: 1.8, fontStyle: 'italic', textWrap: 'pretty' }}>{getBodyDesc(s, week)}</div>
      </div>

      {/* Visitor picker (sub-flow off Socialize → Bring Visitors) */}
      {visitorPick && (
        <div style={{ ...C.infoBox('rgba(40,20,50,0.4)'), border: '1px solid #9050b080' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: '#b070c0' }}>✦ WHO CALLS ON HER?</div>
            <button style={{ ...C.smBtn, fontSize: 9, margin: 0 }} onClick={() => setVisitorPick(false)}>cancel</button>
          </div>
          {mobile.length === 0 ? (
            <div style={{ fontSize: 11, color: '#8a6a9a', fontStyle: 'italic' }}>No one is free to come sit with her.</div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {mobile.map((v) => (
                <button key={v.id} disabled={ap < 2} style={{ ...C.btn('#5a2880'), fontSize: 11, opacity: ap < 2 ? 0.4 : 1, padding: '5px 11px' }}
                  onClick={() => { runBrokeredVisit(s, v); setVisitorPick(false); }}>{v.name}</button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Device actions — kept */}
      {getAvailableDeviceActions(s, { deviceInventory, player }).length > 0 && (
        <div style={{ marginBottom: 10 }}>
          <div style={{ ...C.secT, color: GOLD_DIM, borderColor: `${GOLD}25` }}>Devices</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {getAvailableDeviceActions(s, { deviceInventory, player }).map((act) => (
              <button key={act.id} style={{ ...C.smBtn, fontSize: 10 }} onClick={() => runDeviceAction(act.id, s.id)}>{act.label}</button>
            ))}
          </div>
        </div>
      )}

      {/* Leviathan capstone — the others come to her unprompted (tier 2 only) */}
      {tier >= 2 && (() => {
        const attendees = getAttendees(s, students);
        const can = attendees.length > 0 && ap >= GATHERING.apCost;
        return (
          <div style={{ ...C.infoBox('rgba(70,45,12,0.3)'), border: `1px solid ${GOLD}55`, marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8, marginBottom: 3 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: GOLD }}>✦ {GATHERING.label}</span>
              <span style={{ fontSize: 9.5, color: GOLD_DIM, whiteSpace: 'nowrap' }}>{GATHERING.apCost} AP</span>
            </div>
            <div style={{ fontSize: 10.5, color: '#80708a', lineHeight: 1.4, marginBottom: 7 }}>{GATHERING.desc}</div>
            {attendees.length > 0 ? (
              <div style={{ fontSize: 10, color: '#a08850', marginBottom: 7 }}>
                attending: {attendees.map((a) => a.name).join(', ')} · each ❤ +{GATHERING.attendeeRel}, +{GATHERING.attendeeGain[0]}–{GATHERING.attendeeGain[1]} lbs
              </div>
            ) : (
              <div style={{ fontSize: 10, color: '#9a6048', fontStyle: 'italic', marginBottom: 7 }}>🔒 no one free to attend her</div>
            )}
            <button
              disabled={!can}
              onClick={() => runGathering(s)}
              style={{ ...C.btn(can ? '#9a6818' : '#3a2a18'), width: '100%', fontSize: 12, opacity: can ? 1 : 0.5, cursor: can ? 'pointer' : 'not-allowed' }}
            >
              Let them attend her
            </button>
          </div>
        );
      })()}

      {/* The three trees */}
      <div style={{ ...C.secT, color: GOLD_DIM, borderColor: `${GOLD}25` }}>Keep Her</div>
      {Object.entries(SETTLING_ACTIONS).map(([branch, def]) => (
        <TreeCard
          key={branch} branch={branch} def={def} s={s} students={students} ap={ap}
          open={openBranch === branch}
          onToggle={() => setOpenBranch(openBranch === branch ? null : branch)}
          onRun={onRun}
        />
      ))}
    </div>
  );
}
