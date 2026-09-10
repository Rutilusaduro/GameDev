// ═══════════════════════════════════════════════════════════════
// ROSTER VIEW — resident roster
// ═══════════════════════════════════════════════════════════════
import { useMemo, useEffect, useRef } from 'react';
import { C } from '../styles.js';
import { DORM_LIST, dormUnlocksForWeek } from '../gameData/dorms.js';
import { isRosterNew } from '../gameData/rosterUnlock.js';
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
import { playHallPassSound } from '../gameData/hallPassAudio.js';
import { FloorHallway } from '../components/FloorHallway.jsx';
import { MysteryTrustPulse } from '../components/MysteryTrustPulse.jsx';
import { getMysteryTrustPulse } from '../gameData/mysteryTrust.js';

// One roster tile. Extracted so the at-a-glance "tell" can be memoized —
// it only re-rolls when her meaningful state (size/psyche/appetite/week)
// changes, so it doesn't flicker on every parent re-render.
function RosterTile({ s, week, onOpen, onAmends, residentWithdrawn, soundEnabled = true, tileIndex = 0 }) {
  const st = getStage(s.lbs);
  const evMeta = s.evolvedForm ? EVOLVED_FORM_META[s.evolvedForm] : null;
  const ascForm = getAscensionFormForStudent(s);
  const cardBorder = s.withdrawn ? '1px solid #c05038' : evMeta ? `1px solid ${evMeta.color}80` : '1px solid #180830';
  const cardBg = addictionTint(s) || '';
  const nameColor = evMeta ? evMeta.color : '#d8a8ff';
  // Mostly a steady-state vibe; occasionally she's caught remembering a
  // recent milestone. Memoized (incl. memory count) so it stays stable
  // until her state actually changes, rather than flickering per render.
  const showNew = isRosterNew(s, week);
  const tell = useMemo(
    () => {
      const discTier = getDiscontentTier(s).id;
      // An unhappy resident's tell is about that (the scene priority-gates it),
      // and we don't drown it in a memory callback.
      if (discTier === 0) {
        const mem = pickStudentMemory(s, week);
        if (mem && Math.random() < 0.45) {
          const m = renderMemorySelf(s, week, mem);
          if (m) return m;
        }
      }
      return renderRosterTell(s, week, { globals: { discontentTier: discTier, residentWithdrawn: !!residentWithdrawn } });
    },
    [s.id, st.id, s.corruption, s.hungerTier, s.addictionLevel, s.discontent, residentWithdrawn, (s.memories || []).length, week],
  );
  return (
    <div
      role="button"
      tabIndex={0}
      className={`roster-tile roster-tile-in${showNew ? ' roster-tile-new' : ''}`}
      style={{
        ...C.card,
        border: cardBorder,
        background: cardBg || C.card.background,
        position: 'relative',
        overflow: 'hidden',
        animationDelay: `${Math.min(tileIndex, 12) * 45}ms`,
      }}
      onClick={() => { playHallPassSound('click', soundEnabled); onOpen(); }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          playHallPassSound('click', soundEnabled);
          onOpen();
        }
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <StudentPortrait student={s} size={44} showLabel={false} />
          <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 700, fontSize: 15, color: nameColor }}>{s.name}</span>
          {showNew && (
            <span className="roster-new-pill" style={{ fontSize: 8, color: '#ffe8a0', letterSpacing: 1, fontWeight: 700 }}>NEW</span>
          )}
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
      <div
        style={{ fontSize: 11, color: '#a88050', margin: '2px 0' }}
        title={`${s.lbs.toLocaleString()} lbs · +${s.lbs - s.startLbs} since semester start · ${s.relationship}% trust`}
      >
        {s.lbs.toLocaleString()} lbs (+{s.lbs - s.startLbs}) · ❤ {s.relationship}%
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

function DormUnlockBanner({ unlockedDorms = [], startDormId, week = 1 }) {
  const open = new Set(unlockedDorms || []);
  if (startDormId) open.add(startDormId);
  const unlockedThisWeek = new Set(dormUnlocksForWeek(week, startDormId));
  const justUnlocked = DORM_LIST.filter((d) => open.has(d.id) && unlockedThisWeek.has(d.id));
  if (!justUnlocked.length) return null;
  return (
    <div style={{ marginBottom: 16, padding: '12px 14px', background: 'linear-gradient(135deg,rgba(28,12,52,0.92),rgba(14,8,28,0.95))', border: '1px solid #4a2870', borderRadius: 10, boxShadow: '0 8px 28px rgba(0,0,0,0.35)' }}>
      <div style={{ fontSize: 12, color: '#ffe8c8', lineHeight: 1.5, padding: '8px 10px', background: 'rgba(255,200,120,0.08)', borderRadius: 6, border: '1px solid rgba(255,200,120,0.2)' }}>
        🔓 <strong>{justUnlocked.map((d) => d.label).join(' · ')}</strong> unlocked — new residents may appear on your floor when they trust the hall.
      </div>
    </div>
  );
}

export function RosterView({
  view,
  students,
  lilithUnlocked,
  elaraDiscovered = false,
  reachLevel = 1,
  avgLbs,
  setSelectedId,
  setView,
  week = 1,
  unlockedDorms = [],
  startDormId = null,
  onAmends,
  onOpenStudent,
  onVisitRoom,
  soundEnabled = true,
}) {
  const isLocked = (s) => s.lockState === 'locked';
  const rosterVisible = (s) => (!s.hidden || (s.id === 15 && lilithUnlocked) || (s.id === 17 && elaraDiscovered)) && !isLocked(s);
  const residentWithdrawn = students.some((s) => s.withdrawn && rosterVisible(s));
  const hasNewResidents = useMemo(
    () => students.some((s) => rosterVisible(s) && isRosterNew(s, week)),
    [students, week, lilithUnlocked, elaraDiscovered],
  );
  const newChimeRef = useRef(0);
  useEffect(() => {
    if (view !== 'roster' || !hasNewResidents) return;
    if (newChimeRef.current === week) return;
    newChimeRef.current = week;
    playHallPassSound('nav', soundEnabled);
  }, [view, hasNewResidents, soundEnabled, week]);
  const visibleResidents = students.filter(rosterVisible);
  const mysteryPulse = useMemo(
    () => getMysteryTrustPulse(students, { unlockedDorms, reachLevel, week }),
    [students, unlockedDorms, reachLevel, week],
  );
  return (
    <>
      {view === 'roster' && (
        <div>
          <DormUnlockBanner unlockedDorms={unlockedDorms} startDormId={startDormId} week={week} />
          <MysteryTrustPulse pulse={mysteryPulse} />
          <FloorHallway students={visibleResidents} onVisitRoom={onVisitRoom} soundEnabled={soundEnabled} />
          <p style={C.secT}>Residents — {visibleResidents.length} on your floor · avg {avgLbs} lbs</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(195px,1fr))', gridAutoRows: 'minmax(140px,auto)', gap: 8 }}>
            {visibleResidents.sort((a, b) => a.id - b.id).map((s, tileIndex) => (
              <RosterTile key={s.id} s={s} week={week} tileIndex={tileIndex} soundEnabled={soundEnabled} onOpen={() => (onOpenStudent ? onOpenStudent(s.id) : (setSelectedId(s.id), setView('student')))} onAmends={onAmends} residentWithdrawn={residentWithdrawn && !s.withdrawn} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
