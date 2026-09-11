// ═══════════════════════════════════════════════════════════════
// HALL LOUNGE VIEW — building blueprint. Click a labeled room to
// buy lounge upgrades; resident wing opens per-door fit-outs.
// Night Rounds starts from the plan itself.
// ═══════════════════════════════════════════════════════════════
import { useMemo, useState } from 'react';
import { C } from '../styles.js';
import { SKILL_CATEGORIES } from '../gameData/skills.js';
import {
  computeHallLoungeSkillCurrency,
  computeHallLoungeSkillTotal,
  computeHallLoungeSkillSpent,
  canBuyHallLoungeSkill,
} from '../gameData/hallLoungeSkills.js';
import {
  BLUEPRINT_ROOMS,
  ROOM_FITS,
  skillsForRoom,
  roomCompletion,
  canBuyRoomFit,
  nightRoundVisitCap,
  canStartNightRound,
  blueprintStudentDoors,
  fitCount,
} from '../gameData/dormBlueprint.js';
import { REFIT_OPTIONS, needsRefit, worstFitState } from '../gameData/outfits.js';

function RoomTile({ room, selected, ownedRatio, onSelect, nightMode, dimmed }) {
  const complete = ownedRatio >= 1 && room.category !== 'resident';
  return (
    <button
      type="button"
      className="dorm-bp-room"
      data-room={room.id}
      data-selected={selected ? 'true' : 'false'}
      data-complete={complete ? 'true' : 'false'}
      data-night={nightMode ? 'true' : 'false'}
      aria-pressed={selected}
      aria-label={`${room.label}${complete ? ', fully upgraded' : ''}`}
      disabled={dimmed}
      onClick={() => onSelect(room.id)}
      style={{
        gridColumn: `${room.col} / span ${room.w}`,
        gridRow: `${room.row} / span ${room.h}`,
      }}
    >
      <span className="dorm-bp-room-label">{room.short}</span>
      <span className="dorm-bp-room-name">{room.label}</span>
      {room.category !== 'resident' && (
        <span className="dorm-bp-room-meter" aria-hidden="true">
          <span style={{ width: `${Math.round(ownedRatio * 100)}%` }} />
        </span>
      )}
    </button>
  );
}

function SkillRow({ sk, purchased, check, onPurchase }) {
  const affordable = check?.ok;
  return (
    <div className={`dorm-bp-upgrade${purchased ? ' is-owned' : ''}`}>
      <div className="dorm-bp-upgrade-copy">
        <div className="dorm-bp-upgrade-title">{sk.label}</div>
        <div className="dorm-bp-upgrade-desc">{sk.effect || sk.desc}</div>
      </div>
      {purchased ? (
        <span className="dorm-bp-owned">Installed</span>
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
  );
}

function ResidentDoorList({ students, dormState, selectedDoorId, onSelectDoor, nightMode }) {
  const doors = blueprintStudentDoors(students);
  if (!doors.length) {
    return <div className="dorm-bp-empty">No open doors on the roster yet.</div>;
  }
  return (
    <div className="dorm-bp-doors">
      {doors.map((s) => {
        const n = fitCount(dormState, s.id);
        const habit = dormState?.nightRounds?.habits?.[s.id];
        return (
          <button
            key={s.id}
            type="button"
            className="dorm-bp-door"
            data-selected={selectedDoorId === s.id ? 'true' : 'false'}
            onClick={() => onSelectDoor(s.id)}
          >
            <span className="dorm-bp-door-name">{s.name}</span>
            <span className="dorm-bp-door-meta">
              Room {String(100 + s.id)}
              {n ? ` · ${n} fit-out${n === 1 ? '' : 's'}` : ''}
              {habit ? ' · habit known' : ''}
              {nightMode ? ' · knock' : ''}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function FitOutList({ student, dormState, students, ownedHallSkills, onBuyFit, onRefitWardrobe, currency }) {
  if (!student) {
    return <div className="dorm-bp-empty">Pick a door on the wing.</div>;
  }
  return (
    <div>
      <div className="dorm-bp-inspector-kicker">Room {String(100 + student.id)} · {student.name}</div>
      {ROOM_FITS.map((fit) => {
        const owned = !!dormState?.roomFits?.[student.id]?.[fit.id];
        const check = owned ? null : canBuyRoomFit(fit.id, student, dormState, students, ownedHallSkills);
        return (
          <div key={fit.id} className={`dorm-bp-upgrade${owned ? ' is-owned' : ''}`}>
            <div className="dorm-bp-upgrade-copy">
              <div className="dorm-bp-upgrade-title">{fit.label}</div>
              <div className="dorm-bp-upgrade-desc">{fit.effect}</div>
            </div>
            {owned ? (
              <span className="dorm-bp-owned">Installed</span>
            ) : (
              <button
                type="button"
                style={{ ...C.smBtn, flexShrink: 0, opacity: check?.ok ? 1 : 0.45 }}
                disabled={!check?.ok}
                onClick={() => onBuyFit?.(fit.id, student.id)}
                title={check?.reason}
              >
                {fit.cost} lbs
              </button>
            )}
          </div>
        );
      })}
      {student && (
        <div className="dorm-bp-upgrade">
          <div className="dorm-bp-upgrade-copy">
            <div className="dorm-bp-upgrade-title">Wardrobe {needsRefit(student) ? '· straining' : '· holding'}</div>
            <div className="dorm-bp-upgrade-desc">
              {worstFitState(student)
                ? `Clothes ${worstFitState(student)}. Let them out or cut a new set with prestige.`
                : 'No garments logged yet. First refit writes her current measurements.'}
            </div>
          </div>
        </div>
      )}
      {student && REFIT_OPTIONS.map((opt) => {
        const affordable = currency >= opt.cost;
        return (
          <div key={opt.id} className="dorm-bp-upgrade">
            <div className="dorm-bp-upgrade-copy">
              <div className="dorm-bp-upgrade-title">{opt.label}</div>
              <div className="dorm-bp-upgrade-desc">{opt.desc}</div>
            </div>
            <button
              type="button"
              style={{ ...C.smBtn, flexShrink: 0, opacity: affordable ? 1 : 0.45 }}
              disabled={!affordable}
              onClick={() => onRefitWardrobe?.(opt.id, student.id)}
              title={affordable ? undefined : `Need ${opt.cost} lbs prestige`}
              aria-label={`${opt.label} for ${student.name}, ${opt.cost} lbs prestige`}
            >
              {opt.cost} lbs
            </button>
          </div>
        );
      })}
    </div>
  );
}

export function HallLoungeView({
  students,
  ownedHallSkills,
  dormState,
  ap,
  week,
  onPurchaseHallLoungeSkill,
  onPurchaseRoomFit,
  onStartNightRound,
  nightMode = false,
  nightTargetId = null,
  onNightKnock,
  onRefitWardrobe,
}) {
  const owned = ownedHallSkills || {};
  const total = computeHallLoungeSkillTotal(students);
  const spent = computeHallLoungeSkillSpent(owned);
  const currency = computeHallLoungeSkillCurrency(students, owned);
  const [selectedRoom, setSelectedRoom] = useState('lounge');
  const [selectedDoorId, setSelectedDoorId] = useState(null);
  const room = BLUEPRINT_ROOMS.find((r) => r.id === selectedRoom) || BLUEPRINT_ROOMS[1];
  const skills = useMemo(() => skillsForRoom(room.id), [room.id]);
  const doorStudent = students.find((s) => s.id === selectedDoorId) || null;
  const roundCheck = canStartNightRound(ap, week, dormState, owned);
  const cap = nightRoundVisitCap(owned);
  const remaining = roundCheck.remaining ?? 0;

  const handleSelectRoom = (id) => {
    setSelectedRoom(id);
    if (id !== 'corridor') setSelectedDoorId(null);
  };

  return (
    <div className="dorm-bp">
      <p style={C.secT}>Hall Blueprint</p>
      <div className="dorm-bp-head">
        <div>
          <div className="dorm-bp-kicker">Floor plan · prestige {currency} lbs</div>
          <p className="dorm-bp-lede">
            Click a labeled room. Install upgrades where they live. After hours, knock the wing.
          </p>
        </div>
        <div className="dorm-bp-stats">
          <span>{spent} spent of {total}</span>
          <button
            type="button"
            className="dorm-bp-night-btn"
            disabled={nightMode ? remaining <= 0 : !roundCheck.ok}
            onClick={() => { if (!nightMode) onStartNightRound?.(); }}
            title={nightMode ? `${remaining} knocks left` : roundCheck.reason}
          >
            {nightMode ? `Night rounds · ${remaining}/${cap} knocks` : 'Start night rounds · 1 AP'}
          </button>
        </div>
      </div>

      <div className="dorm-bp-layout">
        <div className="dorm-bp-sheet" data-night={nightMode ? 'true' : 'false'}>
          <div className="dorm-bp-compass" aria-hidden="true">N</div>
          <div className="dorm-bp-sheet-title">Second floor</div>
          <div className="dorm-bp-grid" role="group" aria-label="Second floor rooms">
            {BLUEPRINT_ROOMS.filter((r) => r.floor === 2).map((r) => (
              <RoomTile
                key={r.id}
                room={r}
                selected={selectedRoom === r.id}
                ownedRatio={roomCompletion(r.id, owned).ratio}
                onSelect={handleSelectRoom}
                nightMode={nightMode}
                dimmed={nightMode && r.id !== 'corridor'}
              />
            ))}
          </div>
          <div className="dorm-bp-stairs" aria-hidden="true">stairwell</div>
          <div className="dorm-bp-sheet-title">First floor</div>
          <div className="dorm-bp-grid" role="group" aria-label="First floor rooms">
            {BLUEPRINT_ROOMS.filter((r) => r.floor === 1).map((r) => (
              <RoomTile
                key={r.id}
                room={r}
                selected={selectedRoom === r.id}
                ownedRatio={roomCompletion(r.id, owned).ratio}
                onSelect={handleSelectRoom}
                nightMode={nightMode}
                dimmed={nightMode && r.id !== 'corridor'}
              />
            ))}
          </div>
        </div>

        <aside className="dorm-bp-inspector" aria-live="polite" aria-labelledby="dorm-bp-inspector-title">
          <div className="dorm-bp-inspector-kicker">
            {SKILL_CATEGORIES[room.category]?.label || 'Resident wing'}
          </div>
          <h2 id="dorm-bp-inspector-title" className="dorm-bp-inspector-title">{room.label}</h2>
          <p className="dorm-bp-inspector-blurb">{room.blurb}</p>

          {nightMode && room.id === 'corridor' && (
            <div className="dorm-bp-night-hint">Pick a door. She will answer how the week actually went.</div>
          )}

          {room.id === 'corridor' ? (
            <>
              <ResidentDoorList
                students={students}
                dormState={dormState}
                selectedDoorId={nightMode ? nightTargetId : selectedDoorId}
                onSelectDoor={(id) => {
                  if (nightMode) onNightKnock?.(id);
                  else setSelectedDoorId(id);
                }}
                nightMode={nightMode}
              />
              {!nightMode && (
                <FitOutList
                  student={doorStudent}
                  dormState={dormState}
                  students={students}
                  ownedHallSkills={owned}
                  onBuyFit={onPurchaseRoomFit}
                  onRefitWardrobe={onRefitWardrobe}
                  currency={currency}
                />
              )}
            </>
          ) : nightMode ? (
            <div className="dorm-bp-empty">Night rounds stay on the resident wing. Common rooms are locked after hours.</div>
          ) : (
            <div className="dorm-bp-upgrade-list">
              {skills.map((sk) => {
                const purchased = !!owned[sk.id];
                const check = purchased ? null : canBuyHallLoungeSkill(sk.id, owned, students);
                if (!purchased && !check?.ok && sk.tier > 2) {
                  const missing = (sk.requires || []).some((r) => !owned[r]);
                  if (missing) return null;
                }
                return (
                  <SkillRow
                    key={sk.id}
                    sk={sk}
                    purchased={purchased}
                    check={check}
                    onPurchase={onPurchaseHallLoungeSkill}
                  />
                );
              })}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
