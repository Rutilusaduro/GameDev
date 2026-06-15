// ═══════════════════════════════════════════════════════════════
// CLASS VIEW — class roster + classroom prestige upgrades
// ═══════════════════════════════════════════════════════════════
import { C } from '../styles.js';
import { getStage } from '../gameData/stages.js';
import { getTier } from '../gameData/sessions.js';
import { EVOLVED_FORM_META } from '../gameData/evolvedForms.js';
import { SKILL_TREE } from '../gameData/skills.js';
import { getAttitude, pharmacistTextOpts } from '../utils/gameHelpers.js';
import { addictionTint } from '../gameData/hungerAddiction.js';
import { computeClassSkillCurrency, computeClassSkillTotal, computeClassSkillSpent, canBuyClassSkill } from '../gameData/classroomSkills.js';
import { Bar, StageTag, MoodBadge } from '../components/ui.jsx';

const TIER_LABELS = ['I', 'II', 'III', 'IV', 'V', 'VI'];

function ClassroomSkillsPanel({ students, ownedClassSkills, onPurchase }) {
  const owned = ownedClassSkills || {};
  const total = computeClassSkillTotal(students);
  const spent = computeClassSkillSpent(owned);
  const currency = computeClassSkillCurrency(students, owned);
  const tiers = [1, 2, 3, 4, 5, 6];

  return (
    <div style={{ ...C.card, borderColor: '#2a1840', marginBottom: 14, padding: '12px 14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
        <div style={{ fontSize: 10, color: '#a080d0', letterSpacing: 1.5 }}>CLASSROOM PRESTIGE</div>
        <div style={{ fontSize: 11, color: '#c0a0e0' }}>{currency} lbs available · {spent} spent of {total}</div>
      </div>
      <div style={{ fontSize: 10, color: '#605080', marginBottom: 10, lineHeight: 1.5 }}>
        Spend cumulative class weight gain on permanent room upgrades. Institutional Cover unlocks AIB counter paths.
      </div>
      {tiers.map((tier) => {
        const skills = SKILL_TREE.filter((sk) => sk.tier === tier);
        if (!skills.length) return null;
        return (
          <div key={tier} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 9, color: '#7060a0', letterSpacing: 1, marginBottom: 6 }}>TIER {TIER_LABELS[tier - 1]}</div>
            <div style={{ display: 'grid', gap: 6 }}>
              {skills.map((sk) => {
                const purchased = !!owned[sk.id];
                const check = purchased ? null : canBuyClassSkill(sk.id, owned, students);
                const affordable = check?.ok;
                return (
                  <div
                    key={sk.id}
                    style={{
                      ...C.card,
                      padding: '8px 10px',
                      borderColor: purchased ? '#3a2848' : affordable ? '#4a3060' : '#281830',
                      opacity: purchased ? 0.72 : 1,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'flex-start' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, color: purchased ? '#9080a8' : '#d8c0f0', fontWeight: 600 }}>{sk.label}</div>
                        <div style={{ fontSize: 10, color: '#706080', marginTop: 3, lineHeight: 1.45 }}>{sk.effect || sk.desc}</div>
                      </div>
                      {purchased ? (
                        <span style={{ fontSize: 10, color: '#608060', flexShrink: 0 }}>Owned</span>
                      ) : (
                        <button
                          type="button"
                          style={{ ...C.smBtn, flexShrink: 0, opacity: affordable ? 1 : 0.45 }}
                          disabled={!affordable}
                          onClick={() => onPurchase?.(sk.id)}
                          title={check?.reason}
                        >
                          {sk.cost} lbs
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

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
  ownedClassSkills,
  onPurchaseClassSkill,
}) {
  const textOpts = pharmacistTextOpts(pharmacistState, week);
  const rosterVisible = (s) => !s.hidden || (s.id === 15 && lilithUnlocked) || (s.id === 17 && elaraDiscovered);
  return (
    <>
      {view === 'class' && (
        <div>
          {onPurchaseClassSkill && (
            <ClassroomSkillsPanel
              students={students}
              ownedClassSkills={ownedClassSkills}
              onPurchase={onPurchaseClassSkill}
            />
          )}
          <p style={C.secT}>Students — {students.filter(rosterVisible).length} enrolled · avg {avgLbs} lbs</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(195px,1fr))', gridAutoRows: 'minmax(140px,auto)', gap: 8 }}>
            {[...students].filter(rosterVisible).sort((a, b) => a.id - b.id).map((s) => {
              const st = getStage(s.lbs);
              const evMeta = s.evolvedForm ? EVOLVED_FORM_META[s.evolvedForm] : null;
              const cardBorder = evMeta ? `1px solid ${evMeta.color}80` : '1px solid #180830';
              const cardBg = addictionTint(s) || '';
              const nameColor = evMeta ? evMeta.color : '#d8a8ff';
              const barColor = st.color;
              const barMax = 1100;
              return (
                <div
                  key={s.id}
                  style={{ ...C.card, border: cardBorder, background: cardBg || C.card.background, position: 'relative', overflow: 'hidden' }}
                  onClick={() => { setSelectedId(s.id); setView('student'); }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 700, fontSize: 15, color: nameColor }}>{s.name}</span>
                      {(() => { const tier = getTier(s.relationship); return tier.id > 0 ? <span style={{ fontSize: 12, opacity: 0.9 }}>{tier.emoji}</span> : null; })()}
                      {evMeta && <span style={{ fontSize: 10, color: evMeta.color, fontWeight: 600 }}>✦ {evMeta.title}</span>}
                    </div>
                    <StageTag stage={st} />
                  </div>
                  <div style={{ fontSize: 10, color: '#70508a', marginBottom: 3 }}>{s.role || s.archetype} · {s.bodyType} · {s.age}y · <MoodBadge mood={s.mood} /></div>
                  <Bar val={s.lbs} max={barMax} color={barColor} />
                  <div style={{ fontSize: 11, color: '#a88050', margin: '2px 0' }}>
                    {s.lbs.toLocaleString()} lbs  (+{s.lbs - s.startLbs}) · ❤ {s.relationship}%
                  </div>
                  <div style={{ fontSize: 10, color: '#504060', fontStyle: 'italic', lineHeight: 1.4, marginTop: 3 }}>
                    {getAttitude(s, week, textOpts).slice(0, 62)}…
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
