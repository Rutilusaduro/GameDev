// ═══════════════════════════════════════════════════════════════
// CLASS VIEW — student roster
// ═══════════════════════════════════════════════════════════════
import { useMemo } from 'react';
import { C } from '../styles.js';
import { UNLOCK_POOL_IDS } from '../gameData/dorms.js';
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
  onAmends,
  onOpenStudent,
}) {
  const rosterSlots = getRosterSlotCount(spiritLevel);
  const openCount = countOpenPoolStudents(students);
  const isLocked = (s) => s.lockState === 'locked';
  const rosterVisible = (s) => (!s.hidden || (s.id === 15 && lilithUnlocked) || (s.id === 17 && elaraDiscovered)) && !isLocked(s);
  const classmateWithdrawn = students.some((s) => s.withdrawn && rosterVisible(s));
  const locked = students.filter(isLocked).sort((a, b) => (b.passiveTrust || 0) - (a.passiveTrust || 0));
  return (
    <>
      {view === 'class' && (
        <div>
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
                Each week, one locked resident with <strong style={{ color: '#a880d0' }}>{ROSTER_TRUST_GATE}+</strong> passive trust opens when a slot is free.
                Trust rises faster as your influence and the semester deepen — campus sightings help too.
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: 7 }}>
                {locked.map((s) => {
                  const trust = s.passiveTrust || 0;
                  const pct = Math.min(100, Math.round((trust / ROSTER_TRUST_GATE) * 100));
                  return (
                    <div key={s.id} style={{ ...C.card, cursor: 'default', opacity: 0.72, border: '1px dashed #2a1a48' }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: '#6a5a88' }}>{s.name}</div>
                      <div style={{ fontSize: 10, color: '#50406a', marginBottom: 5 }}>{s.role || s.archetype}</div>
                      <Bar val={trust} max={ROSTER_TRUST_GATE} color="#5a3aa0" />
                      <div style={{ fontSize: 9.5, color: '#50406a', marginTop: 3, fontStyle: 'italic' }}>
                        {trust >= ROSTER_TRUST_GATE
                          ? (openCount < rosterSlots ? 'ready — waiting for a seat' : 'ready — roster full')
                          : `${trust}/${ROSTER_TRUST_GATE} trust`}
                      </div>
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
