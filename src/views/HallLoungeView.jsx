// ═══════════════════════════════════════════════════════════════
// HALL LOUNGE — floor blueprint. Click a room, buy its upgrades.
// Pin rooms, walk After-Hours Rounds.
// ═══════════════════════════════════════════════════════════════
import { useMemo, useState } from 'react';
import { C } from '../styles.js';
import {
  FLOOR_ROOMS,
  CIRCUIT_MAX_ROOMS,
  getRoom,
  skillsForRoom,
  roomFill,
  roomOwnedCount,
  roomsAreAdjacent,
  circuitApCost,
  canWalkCircuit,
  completedRoomCount,
} from '../gameData/floorBlueprint.js';
import {
  computeHallLoungeSkillCurrency,
  computeHallLoungeSkillTotal,
  computeHallLoungeSkillSpent,
  canBuyHallLoungeSkill,
} from '../gameData/hallLoungeSkills.js';

const INK = '#0b1220';
const LINE = 'rgba(120, 210, 230, 0.45)';
const LINE_DIM = 'rgba(120, 210, 230, 0.18)';
const AMBER = '#d4a574';
const CREAM = '#e8dcc8';

function fillColor(fill, selected) {
  if (selected) return 'rgba(212, 165, 116, 0.28)';
  if (fill >= 1) return 'rgba(80, 180, 140, 0.28)';
  if (fill > 0) return 'rgba(120, 210, 230, 0.16)';
  return 'rgba(8, 14, 28, 0.72)';
}

function BlueprintRoom({ room, owned, selected, pinnedIndex, onSelect }) {
  const fill = roomFill(room.id, owned);
  const ownedN = roomOwnedCount(room.id, owned);
  const total = room.skillIds.length;
  const decorative = !!room.decorative || total === 0;
  return (
    <button
      type="button"
      data-room-id={room.id}
      aria-pressed={selected}
      aria-label={`${room.label} ${room.code}`}
      onClick={() => onSelect(room.id)}
      style={{
        gridColumn: `${room.col} / span ${room.w}`,
        gridRow: `${room.row} / span ${room.h}`,
        background: fillColor(fill, selected),
        border: selected ? `2px solid ${AMBER}` : `1px solid ${decorative ? LINE_DIM : LINE}`,
        borderRadius: 2,
        color: CREAM,
        cursor: 'pointer',
        fontFamily: 'inherit',
        textAlign: 'left',
        padding: '8px 10px',
        minHeight: 44,
        position: 'relative',
        boxShadow: selected ? '0 0 0 1px rgba(212,165,116,0.4)' : 'inset 0 0 0 1px rgba(120,210,230,0.06)',
      }}
    >
      <div style={{ fontSize: 8, letterSpacing: 2, color: 'rgba(120,210,230,0.85)', textTransform: 'uppercase' }}>{room.code}</div>
      <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 0.4, color: selected ? AMBER : CREAM, textWrap: 'balance' }}>{room.label}</div>
      {!decorative && (
        <div style={{ fontSize: 10, color: '#8aa8b0', marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>
          {ownedN}/{total}
          {fill > 0 && fill < 1 ? ` · ${Math.round(fill * 100)}%` : fill >= 1 ? ' · complete' : ''}
        </div>
      )}
      {pinnedIndex >= 0 && (
        <span style={{
          position: 'absolute', top: 6, right: 6, width: 18, height: 18, borderRadius: 9,
          background: AMBER, color: INK, fontSize: 10, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{pinnedIndex + 1}</span>
      )}
    </button>
  );
}

function UpgradeRow({ skill, owned, students, onPurchase }) {
  const purchased = !!owned[skill.id];
  const check = purchased ? null : canBuyHallLoungeSkill(skill.id, owned, students);
  const affordable = !!check?.ok;
  return (
    <div
      style={{
        ...C.card,
        cursor: 'default',
        padding: '8px 10px',
        borderColor: purchased ? '#2a4a40' : affordable ? '#3a5a68' : '#1a2430',
        opacity: purchased ? 0.78 : 1,
        marginBottom: 6,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, color: purchased ? '#90b8a8' : '#d8c8b0', fontWeight: 600 }}>{skill.label}</div>
          <div style={{ fontSize: 10, color: '#708090', marginTop: 3, lineHeight: 1.45, textWrap: 'pretty' }}>{skill.effect || skill.desc}</div>
          {!purchased && check?.reason && !affordable && (
            <div style={{ fontSize: 10, color: '#a07070', marginTop: 4 }}>{check.reason}</div>
          )}
        </div>
        {purchased ? (
          <span style={{ fontSize: 10, color: '#70a080', flexShrink: 0 }}>Installed</span>
        ) : (
          <button
            type="button"
            style={{ ...C.smBtn, flexShrink: 0, opacity: affordable ? 1 : 0.45, minHeight: 44 }}
            disabled={!affordable}
            onClick={() => onPurchase?.(skill.id)}
            title={check?.reason}
          >
            {skill.cost} lbs
          </button>
        )}
      </div>
    </div>
  );
}

function RoomDetail({ roomId, owned, students, circuit, onPurchase, onTogglePin }) {
  const room = getRoom(roomId);
  if (!room) {
    return <div style={{ fontSize: 11, color: '#708090' }}>Select a room on the plan.</div>;
  }
  const skills = skillsForRoom(room.id);
  const pinned = (circuit?.pinned || []).indexOf(room.id);
  const canPin = !room.decorative && (room.skillIds.length > 0 || room.id === 'resident');
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'baseline', marginBottom: 6 }}>
        <div>
          <div style={{ fontSize: 8, letterSpacing: 2, color: 'rgba(120,210,230,0.85)' }}>{room.code}</div>
          <h2 style={{ margin: '2px 0 0', fontSize: 16, color: AMBER, fontWeight: 600, textWrap: 'balance' }}>{room.label}</h2>
        </div>
        {canPin && (
          <button
            type="button"
            aria-pressed={pinned >= 0}
            onClick={() => onTogglePin(room.id)}
            style={{ ...C.smBtn, minHeight: 44, borderColor: pinned >= 0 ? AMBER : '#4a1280' }}
          >
            {pinned >= 0 ? `Pinned #${pinned + 1}` : `Pin for rounds (${(circuit?.pinned || []).length}/${CIRCUIT_MAX_ROOMS})`}
          </button>
        )}
      </div>
      <p style={{ fontSize: 12, color: '#b8a898', lineHeight: 1.55, margin: '0 0 10px', textWrap: 'pretty' }}>{room.blurb}</p>
      {skills.length === 0 && (
        <div style={{ fontSize: 11, color: '#708090', fontStyle: 'italic' }}>
          {room.decorative ? 'Structural. No upgrades — the plan just needs the box.' : 'Night stop only. Pin it to include the resident wing on After-Hours Rounds.'}
        </div>
      )}
      {skills.map((sk) => (
        <UpgradeRow key={sk.id} skill={sk} owned={owned} students={students} onPurchase={onPurchase} />
      ))}
    </div>
  );
}

export function HallLoungeView({
  students,
  ownedHallSkills,
  onPurchaseHallLoungeSkill,
  floorCircuit,
  onToggleCircuitPin,
  onWalkCircuit,
  ap = 0,
  week = 1,
}) {
  const owned = ownedHallSkills || {};
  const [selected, setSelected] = useState('lounge');
  const total = computeHallLoungeSkillTotal(students);
  const spent = computeHallLoungeSkillSpent(owned);
  const currency = computeHallLoungeSkillCurrency(students, owned);
  const circuit = floorCircuit || { pinned: [] };
  const walkCheck = canWalkCircuit(owned, circuit, ap, week);
  const cost = circuitApCost(owned);
  const completed = completedRoomCount(owned);
  const pinPath = (circuit.pinned || []).map((id) => getRoom(id)?.label || id).join(' → ');
  const pinAdj = useMemo(() => {
    const p = circuit.pinned || [];
    let n = 0;
    for (let i = 1; i < p.length; i += 1) if (roomsAreAdjacent(p[i - 1], p[i])) n += 1;
    return n;
  }, [circuit.pinned]);

  return (
    <div>
      <style>{`
        [data-room-id]:focus-visible { outline: 2px solid #7ad4e6; outline-offset: 2px; }
        [data-action="walk-circuit"]:focus-visible { outline: 2px solid #c090ff; outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) {
          [data-room-id] { transition: none !important; }
        }
      `}</style>
      <p style={C.secT}>🏠 Hall Lounge — Floor Blueprint</p>
      <div style={{ ...C.card, borderColor: '#1a3040', marginBottom: 12, padding: '12px 14px', cursor: 'default' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ fontSize: 10, color: '#c080a0', letterSpacing: 1.5 }}>HALL LOUNGE PRESTIGE</div>
          <div style={{ fontSize: 11, color: '#e0c0d0', fontVariantNumeric: 'tabular-nums' }}>
            {currency} lbs available · {spent} spent of {total} · {completed} rooms complete
          </div>
        </div>
        <div style={{ fontSize: 11, color: '#806070', marginTop: 6, lineHeight: 1.5 }}>
          Click a room on the plan. Install upgrades there. Pin up to {CIRCUIT_MAX_ROOMS} rooms and walk After-Hours Rounds.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1.4fr) minmax(240px, 1fr)', gap: 12, alignItems: 'start' }}>
        <div
          role="group"
          aria-label="Dorm floor blueprint"
          style={{
            background: `repeating-linear-gradient(0deg, ${INK} 0 19px, rgba(120,210,230,0.04) 19px 20px),
                         repeating-linear-gradient(90deg, ${INK} 0 19px, rgba(120,210,230,0.04) 19px 20px)`,
            border: `1px solid ${LINE}`,
            borderRadius: 4,
            padding: 10,
            boxShadow: 'inset 0 0 40px rgba(0,20,40,0.55)',
          }}
        >
          <div style={{ fontSize: 9, letterSpacing: 2, color: 'rgba(120,210,230,0.7)', marginBottom: 8, textTransform: 'uppercase' }}>
            Floor plan · north
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
              gridTemplateRows: 'repeat(5, minmax(52px, auto))',
              gap: 6,
            }}
          >
            {FLOOR_ROOMS.map((room) => (
              <BlueprintRoom
                key={room.id}
                room={room}
                owned={owned}
                selected={selected === room.id}
                pinnedIndex={(circuit.pinned || []).indexOf(room.id)}
                onSelect={setSelected}
              />
            ))}
          </div>
        </div>

        <div style={{ ...C.card, cursor: 'default', borderColor: '#1a3040', padding: 12 }}>
          <RoomDetail
            roomId={selected}
            owned={owned}
            students={students}
            circuit={circuit}
            onPurchase={onPurchaseHallLoungeSkill}
            onTogglePin={onToggleCircuitPin}
          />
        </div>
      </div>

      <div style={{ ...C.card, cursor: 'default', borderColor: '#2a1840', marginTop: 12, padding: 12 }}>
        <div style={{ fontSize: 10, letterSpacing: 1.5, color: '#c080a0', marginBottom: 6 }}>AFTER-HOURS ROUNDS</div>
        <p style={{ fontSize: 12, color: '#b8a898', lineHeight: 1.5, margin: '0 0 8px' }}>
          {pinPath ? `Route: ${pinPath}${pinAdj ? ` · ${pinAdj} adjacent bonus${pinAdj === 1 ? '' : 'es'}` : ''}` : 'Pin rooms on the plan, then walk the floor after lights-out.'}
        </p>
        <button
          type="button"
          data-action="walk-circuit"
          disabled={!walkCheck.ok}
          onClick={() => onWalkCircuit?.()}
          title={walkCheck.reason}
          style={{ ...C.btn('#3a2060'), minHeight: 44, opacity: walkCheck.ok ? 1 : 0.45 }}
        >
          Walk After-Hours Rounds{cost === 0 ? ' (0 AP)' : ` (${cost} AP)`}
        </button>
        {!walkCheck.ok && walkCheck.reason && (
          <div style={{ fontSize: 10, color: '#a07070', marginTop: 6 }}>{walkCheck.reason}</div>
        )}
      </div>
    </div>
  );
}
