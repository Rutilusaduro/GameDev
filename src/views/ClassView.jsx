// ═══════════════════════════════════════════════════════════════
// ROSTER VIEW — resident roster
// ═══════════════════════════════════════════════════════════════
import { useMemo } from 'react';
import { C } from '../styles.js';
import { DORM_LIST, getDorm, getStudentHomeDorm } from '../gameData/dorms.js';
import {
  ROSTER_TRUST_GATE, getRosterSlotCount, countOpenPoolStudents,
} from '../gameData/rosterUnlock.js';
import { getStage } from '../gameData/stages.js';
import { getTier } from '../gameData/sessions.js';
import { EVOLVED_FORM_META } from '../gameData/evolvedForms.js';
import { getAscensionFormForStudent } from '../gameData/ascension/forms.js';
import { renderRosterTell } from '../textEngine/scenes/rosterTell/index.js';
import { renderMemorySelf } from '../textEngine/scenes/memory/index.js';
import { pickStudentMemory } from '../gameData/memory.js';
import { getDiscontentTier } from '../gameData/discontent.js';
import { addictionTint } from '../gameData/hungerAddiction.js';
import { Bar, StageTag, MoodBadge } from '../components/ui.jsx';
import { StudentPortrait } from '../components/StudentPortrait.jsx';

// One roster tile. Extracted so the at-a-glance "tell" can be memoized —
// it only re-rolls when her meaningful state (size/psyche/appetite/week)
// changes, so it doesn't flicker on every parent re-render.
function RosterTile({ s, week, onOpen, onAmends, classmateWithdrawn }) {
  const st = getStage(s.lbs);
  const evMeta = s.evolvedForm ? EVOLVED_FORM_META[s.evolvedForm] : null;
  const ascForm = getAscensionFormForStudent(s);
  const cardBorder = s.withdrawn ? '1px solid #c05038' : evMeta ? `1px solid ${evMeta.color}80` : '1px solid #180830';
  const cardBg = addictionTint(s) || '';
  const nameColor = evMeta ? evMeta.color : '#d8a8ff';
  // Mostly a steady-state vibe; occasionally she's caught remembering a
  // recent milestone. Memoized (incl. memory count) so it stays stable
  // until her state actually changes, rather than flickering per render.
  const tell = useMemo(
    () => {
      const discTier = getDiscontentTier(s).id;
      // An unhappy girl's tell is about that (the scene priority-gates it),
      // and we don't drown it in a memory callback.
      if (discTier === 0) {
        const mem = pickStudentMemory(s, week);
        if (mem && Math.random() < 0.45) {
          const m = renderMemorySelf(s, week, mem);
          if (m) return m;
        }
      }
      return renderRosterTell(s, week, { globals: { discontentTier: discTier, classmateWithdrawn: !!classmateWithdrawn } });
    },
    [s.id, st.id, s.corruption, s.hungerTier, s.addictionLevel, s.discontent, classmateWithdrawn, (s.memories || []).length, week],
  );
  return (
    <div
      className="roster-tile"
      style={{ ...C.card, border: cardBorder, background: cardBg || C.card.background, position: 'relative', overflow: 'hidden' }}
      onClick={onOpen}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <StudentPortrait student={s} size={44} showLabel={false} />
          <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 700, fontSize: 15, color: nameColor }}>{s.name}</span>
          {(() => { const tier = getTier(s.relationship); return tier.id > 0 ? <span style={{ fontSize: 12, opacity: 0.9 }}>{tier.emoji}</span> : null; })()}
          {evMeta && <span style={{ fontSize: 10, color: evMeta.color, fontWeight: 600 }}>✦ {evMeta.title}</span>}
          {s.ascension && ascForm && <span style={{ fontSize: 10, color: '#80e8ff', fontWeight: 600 }}>✦ {ascForm.label}</span>}
        </div>
          </div>
        </div>
        <StageTag stage={st} />
      </div>
      <div style={{ fontSize: 10, color: '#70508a', marginBottom: 3 }}>{s.role || s.archetype} · {s.bodyType} · {s.age}y · <MoodBadge mood={s.mood} /></div>
      <Bar val={s.lbs} max={1100} color={st.color} />
      <div style={{ fontSize: 11, color: '#a88050', margin: '2px 0' }}>
        {s.lbs.toLocaleString()} lbs  (+{s.lbs - s.startLbs}) · ❤ {s.relationship}%
      </div>
      <div style={{ fontSize: 10.5, color: s.withdrawn ? '#c87858' : '#6a5078', fontStyle: 'italic', lineHeight: 1.4, marginTop: 3 }}>
        {s.withdrawn ? 'has moved off your hall' : tell}
      </div>
      {s.withdrawn && onAmends && (
        <button
          onClick={(e) => { e.stopPropagation(); onAmends(s.id); }}
          style={{ ...C.btn('#c05038'), width: '100%', marginTop: 6, fontSize: 11 }}
        >
          🕊 Make amends
        </button>
      )}
    </div>
  );
}

function DormUnlockProgress({ unlockedDorms = [], startDormId, week = 1 }) {
  const open = new Set(unlockedDorms || []);
  if (startDormId) open.add(startDormId);
  const allOpen = DORM_LIST.every((d) => open.has(d.id));
  if (allOpen) return null;
  const justUnlocked = DORM_LIST.filter((d) => d.unlockWeek > 0 && week === d.unlockWeek && open.has(d.id));
  return (
    <div style={{ marginBottom: 16, padding: '12px 14px', background: 'linear-gradient(135deg,rgba(28,12,52,0.92),rgba(14,8,28,0.95))', border: '1px solid #4a2870', borderRadius: 10, boxShadow: '0 8px 28px rgba(0,0,0,0.35)' }}>
      {justUnlocked.length > 0 && (
        <div style={{ fontSize: 12, color: '#ffe8c8', marginBottom: 10, lineHeight: 1.5, padding: '8px 10px', background: 'rgba(255,200,120,0.08)', borderRadius: 6, border: '1px solid rgba(255,200,120,0.2)' }}>
          🔓 <strong>{justUnlocked.map((d) => d.label).join(' · ')}</strong> unlocked — residents from {justUnlocked.map((d) => d.shortLabel).join(' and ')} hall{justUnlocked.length > 1 ? 's' : ''} can now build trust on your roster.
        </div>
      )}
      <div style={{ fontSize: 10, letterSpacing: 2, color: '#b898d8', marginBottom: 8, fontWeight: 600 }}>HALL REACH — SEMESTER UNLOCK ROADMAP</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: 8 }}>
        {DORM_LIST.map((d) => {
          const isOpen = open.has(d.id);
          const weeksLeft = Math.max(0, d.unlockWeek - week);
          const pct = d.unlockWeek <= 0 ? 100 : Math.min(100, Math.round((week / d.unlockWeek) * 100));
          return (
            <div
              key={d.id}
              className={isOpen && d.unlockWeek > 0 && week === d.unlockWeek ? 'hall-unlock-new' : undefined}
              style={{
                padding: '8px 10px',
                borderRadius: 6,
                border: `1px solid ${isOpen ? d.color + '80' : '#2a1a48'}`,
                background: isOpen ? d.accentSoft : 'rgba(12,6,24,0.4)',
                opacity: isOpen ? 1 : 0.82,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                <span style={{ fontSize: 14 }}>{d.emoji}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: isOpen ? d.color : '#6a5888' }}>{d.shortLabel}</span>
                {isOpen && d.unlockWeek > 0 && week === d.unlockWeek && (
                  <span style={{ fontSize: 8, color: '#ffe8a0', marginLeft: 4, letterSpacing: 1 }}>NEW</span>
                )}
                {isOpen && <span style={{ fontSize: 9, color: d.color, marginLeft: 'auto' }}>OPEN</span>}
                {!isOpen && d.unlockWeek > 0 && <span style={{ fontSize: 9, color: '#6a5888', marginLeft: 'auto' }}>LOCKED</span>}
              </div>
              <div style={{ fontSize: 9.5, color: '#6a5088', lineHeight: 1.35 }}>
                {isOpen
                  ? d.label
                  : (weeksLeft > 0 ? `Week ${d.unlockWeek} · ${weeksLeft} wk left` : `Unlocks week ${d.unlockWeek}`)}
              </div>
              {!isOpen && d.unlockWeek > 0 && (
                <div style={{ height: 3, background: '#1a0e30', borderRadius: 2, marginTop: 6, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: d.color, transition: 'width 0.3s' }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ClassView({
  view,
  students,
  lilithUnlocked,
  elaraDiscovered = false,
  spiritLevel = 1,
  avgLbs,
  setSelectedId,
  setView,
  week = 1,
  unlockedDorms = [],
  startDormId = null,
  onAmends,
  onOpenStudent,
}) {
  const rosterSlots = getRosterSlotCount(spiritLevel);
  const openCount = countOpenPoolStudents(students);
  const isLocked = (s) => s.lockState === 'locked';
  const rosterVisible = (s) => (!s.hidden || (s.id === 15 && lilithUnlocked) || (s.id === 17 && elaraDiscovered)) && !isLocked(s);
  const classmateWithdrawn = students.some((s) => s.withdrawn && rosterVisible(s));
  const locked = students.filter(isLocked).sort((a, b) => (b.passiveTrust || 0) - (a.passiveTrust || 0));
  const openHallSet = new Set([...(unlockedDorms || []), startDormId].filter(Boolean));
  const hallReachable = (s) => {
    const home = getStudentHomeDorm(s.id);
    return !home || openHallSet.has(home);
  };
  return (
    <>
      {view === 'class' && (
        <div>
          <DormUnlockProgress unlockedDorms={unlockedDorms} startDormId={startDormId} week={week} />
          <p style={C.secT}>Residents — {students.filter(rosterVisible).length} on your floor · avg {avgLbs} lbs</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(195px,1fr))', gridAutoRows: 'minmax(140px,auto)', gap: 8 }}>
            {[...students].filter(rosterVisible).sort((a, b) => a.id - b.id).map((s) => (
              <RosterTile key={s.id} s={s} week={week} onOpen={() => (onOpenStudent ? onOpenStudent(s.id) : (setSelectedId(s.id), setView('student')))} onAmends={onAmends} classmateWithdrawn={classmateWithdrawn && !s.withdrawn} />
            ))}
          </div>
          {locked.length > 0 && (
            <div style={{ marginTop: 18 }}>
              <p style={C.secT}>Other halls — {locked.length} residents out of reach</p>
              <div style={{ fontSize: 11, color: '#6a5088', marginBottom: 10, lineHeight: 1.55 }}>
                Hall reach grants <strong style={{ color: '#a880d0' }}>{rosterSlots}</strong> roster doors ({openCount} open).
                Each week, one locked resident with <strong style={{ color: '#a880d0' }}>{ROSTER_TRUST_GATE}+</strong> passive trust opens when a slot is free — once their hall is unlocked.
                Trust rises faster as your influence and the semester deepen — campus sightings help too.
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: 7 }}>
                {locked.map((s) => {
                  const trust = s.passiveTrust || 0;
                  const home = getStudentHomeDorm(s.id);
                  const dorm = home ? getDorm(home) : null;
                  const reachable = hallReachable(s);
                  return (
                    <div key={s.id} style={{ ...C.card, cursor: 'default', opacity: reachable ? 0.72 : 0.5, border: '1px dashed #2a1a48' }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: '#6a5a88' }}>{s.name}</div>
                      <div style={{ fontSize: 10, color: '#50406a', marginBottom: 5 }}>
                        {s.role || s.archetype}
                        {dorm && <span style={{ color: dorm.color }}> · {dorm.shortLabel}</span>}
                      </div>
                      {reachable ? (
                        <>
                          <Bar val={trust} max={ROSTER_TRUST_GATE} color="#5a3aa0" />
                          <div style={{ fontSize: 9.5, color: '#50406a', marginTop: 3, fontStyle: 'italic' }}>
                            {trust >= ROSTER_TRUST_GATE
                              ? (openCount < rosterSlots ? 'ready — waiting for a seat' : 'ready — roster full')
                              : `${trust}/${ROSTER_TRUST_GATE} trust`}
                          </div>
                        </>
                      ) : (
                        <div style={{ fontSize: 9.5, color: '#50406a', fontStyle: 'italic', lineHeight: 1.4 }}>
                          {dorm ? `${dorm.label} opens week ${dorm.unlockWeek}` : 'Hall locked'}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
