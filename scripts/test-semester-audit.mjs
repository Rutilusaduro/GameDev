#!/usr/bin/env node
/** Simulated wk1–16 semester per start hall — unlock reach, trust drip, milestone prose. */
import assert from 'assert';
import { INIT_STUDENTS } from '../src/gameData/students.js';
import {
  DORMS, STUDENT_HOME_DORM, dormUnlocksForWeek, UNLOCK_POOL_IDS,
} from '../src/gameData/dorms.js';
import {
  applyWeeklyTrustDrip, pickRipeUnlock, getRosterSlotCount, ROSTER_TRUST_GATE,
} from '../src/gameData/rosterUnlock.js';
import { UNLOCK_SCENES } from '../src/gameData/unlockScenes.js';
import { NARRATIVE_EVENTS } from '../src/gameData/weeklyEventDefs.js';
import { CLASS_SCENES } from '../src/gameData/classEvents.js';
import { renderWeeklyEvent } from '../src/textEngine/scenes/weeklyEvent/index.js';
import { renderClassSceneText } from '../src/textEngine/scenes/campusEvent/classIntegration.js';
import { renderHearingPhase } from '../src/textEngine/scenes/opposition/index.js';
import '../src/textEngine/scenes/opposition/agendaCards.js';
import '../src/textEngine/scenes/opposition/oppositionSceneDepth.js';
import '../src/textEngine/scenes/diary.js';
import { renderDiary } from '../src/textEngine/scenes/diary.js';

const BANNED = [
  /\bProfessor Sim\b/i,
  /\bMadeline\b/,
  /spirit-possessed/i,
  /\bSpirit Hub\b/i,
  /\bthe class\b/i,
  /\bclassmates\b/i,
  /\byour students\b/i,
  /\bstudent body\b/i,
  /\bstudent union\b/i,
  /\boffice hours\b/i,
  /\bprofessor\b/i,
  /\bstudent removal\b/i,
  /\bbirthday student\b/i,
  /\bexchange student\b/i,
];

function assertClean(text, label) {
  if (!text || typeof text !== 'string') return;
  for (const re of BANNED) {
    assert(!re.test(text), `${label} must not match ${re}: ${text.slice(0, 100)}`);
  }
}

function cumulativeUnlocked(startDorm, week) {
  const open = new Set([startDorm]);
  for (let w = 1; w <= week; w += 1) {
    for (const id of dormUnlocksForWeek(w, startDorm)) open.add(id);
  }
  return [...open];
}

function buildRoster(startDorm) {
  const startIds = new Set(DORMS[startDorm].studentIds);
  return UNLOCK_POOL_IDS.map((id) => {
    const base = INIT_STUDENTS.find((s) => s.id === id) || INIT_STUDENTS[0];
    return {
      ...base,
      id,
      homeDorm: STUDENT_HOME_DORM[id],
      lockState: startIds.has(id) ? 'open' : 'locked',
      passiveTrust: 0,
    };
  });
}

const MILESTONE_WEEKS = [4, 8, 12, 16];
const START_DORMS = ['sporty', 'nerdy', 'socialite', 'weirdos'];

for (const startDorm of START_DORMS) {
  let roster = buildRoster(startDorm);
  const spiritLevel = 3;
  const homeCount = DORMS[startDorm].studentIds.length;

  for (let week = 1; week <= 16; week += 1) {
    const unlockedDorms = cumulativeUnlocked(startDorm, week);

    for (let drip = 0; drip < 12; drip += 1) {
      roster = applyWeeklyTrustDrip(roster, {
        spiritLevel, week, unlockedDorms, rng: () => 0.99,
      });
    }

    let ripe = pickRipeUnlock(roster, spiritLevel, unlockedDorms);
    while (ripe) {
      roster = roster.map((s) => (s.id === ripe.id ? { ...s, lockState: 'open' } : s));
      ripe = pickRipeUnlock(roster, spiritLevel, unlockedDorms);
    }

    if (MILESTONE_WEEKS.includes(week)) {
      const floorScene = CLASS_SCENES.find((s) => s.id === 'class_potluck');
      const homeResident = roster.find((s) => s.homeDorm === startDorm && s.lockState === 'open');
      assert(homeResident, `${startDorm} needs open home resident at wk${week}`);
      const floorText = renderClassSceneText(floorScene, homeResident, week);
      assertClean(floorText, `${startDorm} wk${week} floor check-in`);

      for (const s of roster.filter((r) => r.lockState === 'open').slice(0, 6)) {
        const diary = renderDiary({ ...s, lbs: (s.startLbs || 120) + week * 6 }, week);
        if (diary) assertClean(diary, `${startDorm} wk${week} diary ${s.name}`);
      }

      const cassidy = roster.find((s) => s.id === 1);
      if (cassidy && week >= 6) {
        const beat = renderWeeklyEvent('season_plan_rewrite', cassidy, { week });
        if (beat) assertClean(beat, `${startDorm} wk${week} Cassidy season plan`);
      }

      if (week >= 10) {
        const hearing = renderHearingPhase('removal', 0, homeResident, week);
        if (hearing) assertClean(hearing, `${startDorm} wk${week} removal hearing`);
      }
    }

    if (week === 16) {
      assert.equal(unlockedDorms.length, 4, `${startDorm} must unlock all halls by wk16`);
      const openCount = roster.filter((s) => s.lockState === 'open').length;
      assert.ok(
        openCount >= getRosterSlotCount(spiritLevel),
        `${startDorm} wk16 should fill ${getRosterSlotCount(spiritLevel)} roster slots, got ${openCount}`,
      );
      assert.ok(openCount > homeCount, `${startDorm} wk16 should unlock residents beyond home hall`);
    }
  }
}

for (const [id, prose] of Object.entries(UNLOCK_SCENES)) {
  assertClean(prose, `unlock scene ${id}`);
}

for (const ev of NARRATIVE_EVENTS) {
  const subject = INIT_STUDENTS.find((s) => s.archetype === ev.archetype) || INIT_STUDENTS[0];
  for (const week of [6, 10, 14]) {
    const beat = renderWeeklyEvent(ev.id, subject, { week });
    if (beat) assertClean(beat, `narrative ${ev.id} wk${week}`);
  }
}

assert(ROSTER_TRUST_GATE >= 60, 'trust gate should require meaningful investment');

console.log('semester-audit: wk1-16 sim per start hall, milestone prose, unlock scenes, narrative sweeps OK');
