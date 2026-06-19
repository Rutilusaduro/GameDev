import { C, LUXE } from '../styles.js';
import { getStage } from '../gameData/stages.js';
import { getTier } from '../gameData/sessions.js';
import { EVOLVED_FORM_META } from '../gameData/evolvedForms.js';
import { getAttitude, pharmacistTextOpts } from '../utils/gameHelpers.js';
import { addictionTint } from '../gameData/hungerAddiction.js';
import { Bar, StageTag, MoodBadge } from '../components/ui.jsx';
import { MotionCard } from '../components/Luxe.jsx';

export function ClassView({
  view,
  students,
  lilithUnlocked,
  elaraDiscovered = false,
  avgLbs,
  setSelectedId,
  setView,
  week = 1,
  pharmacistState = null,
}) {
  const textOpts = pharmacistTextOpts(pharmacistState, week);
  const rosterVisible = (s) => !s.hidden || (s.id === 15 && lilithUnlocked) || (s.id === 17 && elaraDiscovered);
  const visibleStudents = students.filter(rosterVisible);

  return (
    <>
      {view === 'class' && (
        <div>
          <div
            style={{
              ...C.card,
              cursor: 'default',
              marginBottom: 14,
              padding: '14px 16px',
              background: 'linear-gradient(135deg, rgba(92,23,49,0.72), rgba(27,8,16,0.84))',
              borderColor: 'rgba(232,178,96,0.28)',
            }}
          >
            <p style={{ ...C.secT, marginBottom: 6 }}>Students - {visibleStudents.length} enrolled</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'baseline' }}>
              <div style={{ fontSize: 24, color: LUXE.cream, fontWeight: 700 }}>{avgLbs} lbs</div>
              <div style={{ fontSize: 12, color: '#c8a078' }}>class average</div>
              <div style={{ fontSize: 12, color: '#e2b764' }}>Week {week}</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(215px,1fr))', gridAutoRows: 'minmax(154px,auto)', gap: 10 }}>
            {[...visibleStudents].sort((a, b) => a.id - b.id).map((s) => {
              const st = getStage(s.lbs);
              const evMeta = s.evolvedForm ? EVOLVED_FORM_META[s.evolvedForm] : null;
              const cardBorder = evMeta ? `1px solid ${evMeta.color}80` : C.card.border;
              const cardBg = addictionTint(s) || '';
              const nameColor = evMeta ? evMeta.color : LUXE.cream;
              const barColor = st.color;
              const barMax = 1100;
              return (
                <MotionCard
                  key={s.id}
                  style={{
                    ...C.card,
                    border: cardBorder,
                    background: cardBg || C.card.background,
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: 154,
                  }}
                  onClick={() => { setSelectedId(s.id); setView('student'); }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: `radial-gradient(circle at 86% 10%, ${barColor}24, transparent 48%)`,
                      pointerEvents: 'none',
                    }}
                  />
                  <div style={{ position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5, gap: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', minWidth: 0 }}>
                        <span style={{ fontWeight: 700, fontSize: 16, color: nameColor }}>{s.name}</span>
                        {(() => {
                          const tier = getTier(s.relationship);
                          return tier.id > 0 ? <span style={{ fontSize: 12, opacity: 0.95 }}>{tier.emoji}</span> : null;
                        })()}
                        {evMeta && <span style={{ fontSize: 10, color: evMeta.color, fontWeight: 700 }}>✦ {evMeta.title}</span>}
                      </div>
                      <StageTag stage={st} />
                    </div>
                    <div style={{ fontSize: 10, color: '#b48a9a', marginBottom: 5 }}>
                      {s.role || s.archetype} · {s.bodyType} · {s.age}y · <MoodBadge mood={s.mood} />
                    </div>
                    <Bar val={s.lbs} max={barMax} color={barColor} />
                    <div style={{ fontSize: 11, color: '#e0b66f', margin: '4px 0' }}>
                      {s.lbs.toLocaleString()} lbs (+{s.lbs - s.startLbs}) · ♥ {s.relationship}%
                    </div>
                    <div style={{ fontSize: 11, color: '#b49a87', fontStyle: 'italic', lineHeight: 1.45, marginTop: 5 }}>
                      {getAttitude(s, week, textOpts).slice(0, 74)}...
                    </div>
                  </div>
                </MotionCard>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
