// ═══════════════════════════════════════════════════════════════
// HALL BLUEPRINT — click a labeled room → install prestige upgrades
// ═══════════════════════════════════════════════════════════════
import { useMemo, useState } from 'react';
import { C } from '../styles.js';
import { render } from '../textEngine/engine.js';
import { buildTextContext } from '../gameData/textContext.js';
import { SKILL_TREE } from '../gameData/skills.js';
import {
  HALL_BLUEPRINT_ROOMS,
  getRoomDisplayMeta,
  getActiveBlueprintSynergies,
  WEAVE_CONFIG,
} from '../gameData/hallBlueprint.js';
import {
  computeHallLoungeSkillCurrency,
  computeHallLoungeSkillSpent,
  computeHallLoungeSkillTotal,
  canBuyHallLoungeSkill,
} from '../gameData/hallLoungeSkills.js';

const PLAN_STROKE = '#3a6a8a';
const PLAN_GLOW = 'rgba(80,180,220,0.35)';
const ROOM_FILL = 'rgba(12,28,42,0.85)';

function SynergyStrip({ synergies }) {
  if (!synergies.length) {
    return (
      <div style={{ fontSize: 10, color: '#507080', fontStyle: 'italic', marginBottom: 10 }}>
        Link upgrades across adjacent rooms to weave atmosphere — synergies stack quietly.
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
      {synergies.map((s) => (
        <span key={s.id} style={{ ...C.tag('rgba(40,80,100,0.5)', '#8ad0e8'), fontSize: 9 }}>
          ⟡ {s.label}
        </span>
      ))}
    </div>
  );
}

function WeaveMeter({ charge = 0 }) {
  const pct = Math.min(100, Math.max(0, charge));
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#6a90a8', letterSpacing: 1.2, marginBottom: 4 }}>
        <span>ATMOSPHERE WEAVE</span>
        <span>{pct}/{WEAVE_CONFIG.maxCharge}</span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: '#0a1820', border: `1px solid ${PLAN_STROKE}` }}>
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            borderRadius: 2,
            background: `linear-gradient(90deg, #2a6080, ${PLAN_GLOW})`,
            boxShadow: pct >= WEAVE_CONFIG.maxCharge ? `0 0 12px ${PLAN_GLOW}` : 'none',
            transition: 'width 0.35s ease-out',
          }}
        />
      </div>
      <div style={{ fontSize: 9, color: '#508090', marginTop: 4, lineHeight: 1.45 }}>
        Purchases and new synergies charge the weave. At full charge, next week pulses — stuffed residents digest deeper.
      </div>
    </div>
  );
}

function RoomUpgradePanel({ roomId, students, ownedHallSkills, onPurchase, onClose, hallColor, week, raProfile }) {
  const meta = getRoomDisplayMeta(roomId, ownedHallSkills);
  const ownedLen = meta?.owned?.length ?? 0;

  const roomProse = useMemo(() => {
    if (!meta) return '';
    const visible = (students || []).filter((s) => !s.hidden);
    const subject = visible.length
      ? visible.reduce((a, b) => ((a.lbs || 0) >= (b.lbs || 0) ? a : b))
      : null;
    if (!subject) return '';
    const ctx = buildTextContext({ subject, week, raProfile });
    const key = ownedLen ? '{hallBlueprint.roomActive}' : '{hallBlueprint.roomEmpty}';
    return render(key, ctx)?.trim() || '';
  }, [meta, students, week, raProfile, ownedLen]);

  if (!meta) return null;
  const { room, owned, purchasable } = meta;
  const currency = computeHallLoungeSkillCurrency(students, ownedHallSkills);

  const list = useMemo(() => {
    const tiers = [1, 2, 3, 4, 5, 6];
    return tiers.flatMap((tier) => {
      const inTier = SKILL_TREE.filter(
        (sk) => sk.tier === tier && (owned.some((o) => o.id === sk.id) || purchasable.some((p) => p.id === sk.id)),
      );
      return inTier.length ? [{ tier, skills: inTier }] : [];
    });
  }, [owned, purchasable]);

  return (
    <div
      style={{
        ...C.card,
        marginTop: 12,
        borderColor: `${hallColor || '#4a8aa8'}55`,
        background: 'linear-gradient(165deg, rgba(8,20,32,0.95), rgba(4,12,20,0.98))',
        boxShadow: `0 0 24px ${PLAN_GLOW}`,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: hallColor || '#a8d8f0' }}>
            {room.emoji} {room.label}
          </div>
          <div style={{ fontSize: 10, color: '#608898', marginTop: 4, lineHeight: 1.5, maxWidth: 420 }}>{room.blurb}</div>
          {roomProse ? (
            <div style={{ fontSize: 10, color: '#88a8b8', marginTop: 8, lineHeight: 1.55, fontStyle: 'italic', maxWidth: 440 }}>
              {roomProse}
            </div>
          ) : null}
        </div>
        <button type="button" style={{ ...C.smBtn, flexShrink: 0 }} onClick={onClose}>Close</button>
      </div>
      <div style={{ fontSize: 10, color: '#90b8c8', marginBottom: 10 }}>{currency} lbs prestige available · {owned.length} installed here</div>
      {list.map(({ tier, skills }) => (
        <div key={tier} style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 8, letterSpacing: 1.5, color: '#507080', marginBottom: 6 }}>TIER {tier}</div>
          <div style={{ display: 'grid', gap: 6 }}>
            {skills.map((sk) => {
              const has = !!ownedHallSkills[sk.id];
              const check = has ? null : canBuyHallLoungeSkill(sk.id, ownedHallSkills, students);
              const show = has || check?.ok;
              if (!show) return null;
              return (
                <div key={sk.id} style={{ ...C.card, padding: '8px 10px', borderColor: has ? '#2a4050' : '#3a6078', opacity: has ? 0.75 : 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'flex-start' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: has ? '#8098a8' : '#d0e8f4' }}>{sk.label}</div>
                      <div style={{ fontSize: 10, color: '#607880', marginTop: 3, lineHeight: 1.45 }}>{sk.effect || sk.desc}</div>
                    </div>
                    {has ? (
                      <span style={{ fontSize: 10, color: '#508868' }}>Installed</span>
                    ) : (
                      <button
                        type="button"
                        style={{ ...C.smBtn, flexShrink: 0 }}
                        disabled={!check?.ok}
                        title={check?.reason}
                        onClick={() => onPurchase?.(sk.id)}
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
      ))}
    </div>
  );
}

export function HallBlueprintView({
  students,
  ownedHallSkills,
  onPurchaseHallLoungeSkill,
  atmosphereWeave,
  hallAccent = '#4a8aa8',
  week = 1,
  raProfile,
}) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const synergies = getActiveBlueprintSynergies(ownedHallSkills || {});
  const total = computeHallLoungeSkillTotal(students);
  const spent = computeHallLoungeSkillSpent(ownedHallSkills);
  const currency = computeHallLoungeSkillCurrency(students, ownedHallSkills);
  const weaveCharge = atmosphereWeave?.charge ?? 0;

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
        <div>
          <p style={{ ...C.secT, marginBottom: 4 }}>📐 Hall Blueprint</p>
          <div style={{ fontSize: 10, color: '#7090a0', lineHeight: 1.5, maxWidth: 520 }}>
            Floor plan of your hall — click a room to install permanent upgrades. Prestige spends cumulative weight gained on the roster.
          </div>
        </div>
        <div style={{ fontSize: 11, color: '#b0d0e0', alignSelf: 'flex-end' }}>
          {currency} lbs · {spent} / {total} spent
        </div>
      </div>
      <WeaveMeter charge={weaveCharge} />
      <SynergyStrip synergies={synergies} />
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 640,
          aspectRatio: '16 / 11',
          margin: '0 auto',
          background: `
            linear-gradient(rgba(60,120,160,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(60,120,160,0.06) 1px, transparent 1px),
            radial-gradient(ellipse at 50% 40%, rgba(20,50,70,0.9), rgba(6,14,22,0.98))
          `,
          backgroundSize: '24px 24px, 24px 24px, cover',
          border: `1px solid ${PLAN_STROKE}`,
          borderRadius: 8,
          boxShadow: `inset 0 0 40px rgba(0,0,0,0.5), 0 4px 24px rgba(0,0,0,0.35)`,
        }}
        role="img"
        aria-label="Hall floor blueprint — click a room to view upgrades"
      >
        <div
          style={{
            position: 'absolute',
            top: 8,
            left: 12,
            fontSize: 9,
            letterSpacing: 2,
            color: '#5a8090',
            fontFamily: 'ui-monospace, monospace',
          }}
        >
          RA HALL · REV. {Math.max(1, synergies.length + 1)}
        </div>
        {HALL_BLUEPRINT_ROOMS.map((room) => {
          const meta = getRoomDisplayMeta(room.id, ownedHallSkills);
          const count = meta?.owned?.length || 0;
          const selected = selectedRoom === room.id;
          return (
            <button
              key={room.id}
              type="button"
              aria-label={`${room.label}, ${count} upgrades installed`}
              onClick={() => setSelectedRoom(room.id)}
              style={{
                position: 'absolute',
                left: `${room.x}%`,
                top: `${room.y}%`,
                width: `${room.w}%`,
                height: `${room.h}%`,
                padding: 6,
                border: selected ? `2px solid ${hallAccent}` : `1px dashed ${PLAN_STROKE}`,
                borderRadius: 4,
                background: selected ? `linear-gradient(160deg, ${ROOM_FILL}, rgba(30,60,80,0.5))` : ROOM_FILL,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                boxShadow: selected ? `0 0 16px ${PLAN_GLOW}` : count ? `inset 0 0 0 1px rgba(120,200,220,0.15)` : 'none',
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, color: '#a8d4e8', lineHeight: 1.2 }}>
                {room.emoji} {room.short}
              </div>
              <div style={{ fontSize: 8, color: '#608898', marginTop: 4, letterSpacing: 0.5 }}>
                {count ? `${count} upgrade${count === 1 ? '' : 's'}` : 'empty shell'}
              </div>
            </button>
          );
        })}
      </div>
      {selectedRoom && onPurchaseHallLoungeSkill && (
        <RoomUpgradePanel
          roomId={selectedRoom}
          students={students}
          ownedHallSkills={ownedHallSkills}
          onPurchase={onPurchaseHallLoungeSkill}
          onClose={() => setSelectedRoom(null)}
          hallColor={hallAccent}
          week={week}
          raProfile={raProfile}
        />
      )}
      {!onPurchaseHallLoungeSkill && (
        <div style={{ fontSize: 11, color: '#706080', fontStyle: 'italic', marginTop: 12 }}>
          Complete your floor briefing to unlock blueprint purchases.
        </div>
      )}
    </div>
  );
}
