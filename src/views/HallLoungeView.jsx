// ═══════════════════════════════════════════════════════════════
// HALL LOUNGE VIEW — blueprint map + prestige upgrades (lbs-cost)
// ═══════════════════════════════════════════════════════════════
import { useState } from 'react';
import { C } from '../styles.js';
import { SKILL_TREE } from '../gameData/skills.js';
import {
  computeHallLoungeSkillCurrency,
  computeHallLoungeSkillTotal,
  computeHallLoungeSkillSpent,
  canBuyHallLoungeSkill,
} from '../gameData/hallLoungeSkills.js';
import { skillsForHallRoom, getHallRoom } from '../gameData/hallBlueprint.js';
import { HallBlueprint } from '../components/HallBlueprint.jsx';
import { renderHallRoomBlurb } from '../textEngine/scenes/hallBlueprint/index.js';

const TIER_LABELS = ['I', 'II', 'III', 'IV', 'V', 'VI'];

function HallLoungeSkillsPanel({ students, ownedHallSkills, onPurchase, roomFilterId = null, week = 1 }) {
  const owned = ownedHallSkills || {};
  const total = computeHallLoungeSkillTotal(students);
  const spent = computeHallLoungeSkillSpent(owned);
  const currency = computeHallLoungeSkillCurrency(students, owned);
  const tiers = [1, 2, 3, 4, 5, 6];
  const roomSkills = roomFilterId ? skillsForHallRoom(roomFilterId) : null;
  const roomSkillIds = roomSkills ? new Set(roomSkills.map((s) => s.id)) : null;
  const room = roomFilterId ? getHallRoom(roomFilterId) : null;

  return (
    <div style={{ ...C.card, borderColor: '#2a1840', marginBottom: 14, padding: '12px 14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
        <div style={{ fontSize: 10, color: '#c080a0', letterSpacing: 1.5 }}>
          {room ? `${room.emoji} ${room.label.toUpperCase()} UPGRADES` : 'HALL LOUNGE PRESTIGE'}
        </div>
        <div style={{ fontSize: 11, color: '#e0c0d0' }}>{currency} lbs available · {spent} spent of {total}</div>
      </div>
      <div style={{ fontSize: 10, color: '#806070', marginBottom: 10, lineHeight: 1.5 }}>
        {room
          ? renderHallRoomBlurb(roomFilterId, week)
          : 'Spend cumulative hall weight gain on permanent lounge upgrades. Institutional Cover unlocks AIB counter paths.'}
      </div>
      {tiers.map((tier) => {
        const skills = SKILL_TREE.filter((sk) => sk.tier === tier && (!roomSkillIds || roomSkillIds.has(sk.id)));
        if (!skills.length) return null;
        return (
          <div key={tier} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 9, color: '#7060a0', letterSpacing: 1, marginBottom: 6 }}>TIER {TIER_LABELS[tier - 1]}</div>
            <div style={{ display: 'grid', gap: 6 }}>
              {skills.map((sk) => {
                const purchased = !!owned[sk.id];
                const check = purchased ? null : canBuyHallLoungeSkill(sk.id, owned, students);
                const affordable = check?.ok;
                if (!purchased && !affordable) return null;
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

export function HallLoungeView({ students, ownedHallSkills, onPurchaseHallLoungeSkill, week = 1 }) {
  const [selectedRoom, setSelectedRoom] = useState('common_lounge');

  return (
    <div>
      <p style={C.secT}>🏠 Hall Lounge</p>
      {onPurchaseHallLoungeSkill ? (
        <>
          <HallBlueprint
            ownedHallSkills={ownedHallSkills}
            selectedRoomId={selectedRoom}
            onSelectRoom={setSelectedRoom}
            week={week}
          />
          <HallLoungeSkillsPanel
            students={students}
            ownedHallSkills={ownedHallSkills}
            onPurchase={onPurchaseHallLoungeSkill}
            roomFilterId={selectedRoom}
            week={week}
          />
        </>
      ) : (
        <div style={{ fontSize: 11, color: '#706080', fontStyle: 'italic' }}>
          Hall lounge upgrades unlock as your floor fills out.
        </div>
      )}
    </div>
  );
}
