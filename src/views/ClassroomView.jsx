// ═══════════════════════════════════════════════════════════════
// CLASSROOM VIEW — prestige upgrades (lbs-cost skill shop)
// ═══════════════════════════════════════════════════════════════
import { C } from '../styles.js';
import { SKILL_TREE } from '../gameData/skills.js';
import {
  computeClassSkillCurrency,
  computeClassSkillTotal,
  computeClassSkillSpent,
  canBuyClassSkill,
} from '../gameData/classroomSkills.js';

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

export function ClassroomView({ students, ownedClassSkills, onPurchaseClassSkill }) {
  return (
    <div>
      <p style={C.secT}>🏛 Classroom</p>
      {onPurchaseClassSkill ? (
        <ClassroomSkillsPanel
          students={students}
          ownedClassSkills={ownedClassSkills}
          onPurchase={onPurchaseClassSkill}
        />
      ) : (
        <div style={{ fontSize: 11, color: '#706080', fontStyle: 'italic' }}>
          Classroom upgrades unlock as your class grows.
        </div>
      )}
    </div>
  );
}
