#!/usr/bin/env node
/** Requirement checklist gate — proves RA dorm pivot objective items in repo. */
import assert from 'assert';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { DORMS, DORM_LIST, dormUnlocksForWeek, STUDENT_HOME_DORM } from '../src/gameData/dorms.js';
import { INIT_STUDENTS } from '../src/gameData/students.js';
import { RA_RANKS } from '../src/gameData/content.js';

const root = join(import.meta.dirname, '..');
const read = (rel) => readFileSync(join(root, rel), 'utf8');

function walkSrcFiles(dir = join(root, 'src')) {
  const out = [];
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walkSrcFiles(p));
    else if (/\.(jsx|js)$/.test(ent.name)) out.push(p);
  }
  return out;
}

const checks = [];

function check(id, fn) {
  try {
    fn();
    checks.push({ id, ok: true });
  } catch (err) {
    checks.push({ id, ok: false, err: err.message });
  }
}

// ── RA player identity ─────────────────────────────────────────
check('ra-setup-wizard', () => {
  assert.ok(existsSync(join(root, 'src/components/RaSetupWizard.jsx')));
  const src = read('src/components/RaSetupWizard.jsx');
  assert.match(src, /Red hair/i, 'RA intro must mention red hair');
  assert.match(src, /curves/i, 'RA intro must mention curvy build');
  assert.match(src, /RESIDENCE LIFE SIMULATOR/i);
});

check('ra-profile-appearance', () => {
  const src = read('src/HallPass.jsx');
  assert.match(src, /appearance:\s*\{\s*hair:\s*'red',\s*build:\s*'curvy'\s*\}/);
  assert.match(src, /role:\s*"ra"/);
});

check('hall-pass-title', () => {
  const html = read('index.html');
  assert.match(html, /<title>Hall Pass<\/title>/);
  assert.doesNotMatch(html, /Professor Sim/i);
});

// ── Four dorms, ~5 residents each ──────────────────────────────
check('four-dorms', () => {
  assert.equal(DORM_LIST.length, 4);
  const ids = new Set(DORM_LIST.map((d) => d.id));
  assert.deepEqual([...ids].sort(), ['nerdy', 'socialite', 'sporty', 'weirdos']);
});

check('dorm-resident-counts', () => {
  const counts = Object.fromEntries(DORM_LIST.map((d) => [d.id, d.studentIds.length]));
  assert.equal(counts.sporty, 5, 'Victory Hall should have 5 home residents');
  assert.equal(counts.socialite, 5, 'Rosewood should have 5 home residents');
  assert.ok(counts.nerdy >= 4 && counts.nerdy <= 5, `Scholar's Rest resident count: ${counts.nerdy}`);
  assert.ok(counts.weirdos >= 4 && counts.weirdos <= 5, `Annex resident count: ${counts.weirdos}`);
});

check('unlock-schedule', () => {
  assert.deepEqual(dormUnlocksForWeek(8, 'sporty'), ['nerdy']);
  assert.deepEqual(dormUnlocksForWeek(12, 'sporty'), ['nerdy', 'socialite']);
  assert.deepEqual(dormUnlocksForWeek(16, 'sporty'), ['nerdy', 'socialite', 'weirdos']);
  for (const start of ['nerdy', 'socialite', 'weirdos']) {
    const at16 = [...dormUnlocksForWeek(16, start), start].sort();
    assert.deepEqual(at16, ['nerdy', 'socialite', 'sporty', 'weirdos'].sort(), `wk16 all halls for ${start} start`);
  }
});

// ── Cassidy replaces Madeline ──────────────────────────────────
check('cassidy-swimmer', () => {
  const cassidy = INIT_STUDENTS.find((s) => s.id === 1);
  assert.ok(cassidy, 'student id 1 must exist');
  assert.equal(cassidy.name, 'Cassidy');
  assert.equal(cassidy.archetype, 'swimmer');
  assert.equal(STUDENT_HOME_DORM[1], 'sporty');
  assert.ok(!INIT_STUDENTS.some((s) => /madeline/i.test(s.name)), 'no Madeline in roster');
});

check('community-researcher-cassidy', () => {
  const src = read('src/gameData/communityResearcher.js');
  assert.match(src, /Cassidy \(id:1\)/);
  assert.doesNotMatch(src, /\bMadeline\b/);
});

// ── RA-framed ranks ────────────────────────────────────────────
check('ra-rank-labels', () => {
  const labels = RA_RANKS.map((r) => r.label).join(' ');
  assert.match(labels, /New RA/);
  assert.doesNotMatch(labels, /Professor/i);
});

// ── Verification gates wired ─────────────────────────────────────
const REQUIRED_SCRIPTS = [
  'test:ra-theme',
  'test:dorm-unlock',
  'test:dorm-unlock-ui',
  'test:playthrough',
  'test:semester-audit',
  'test:prose-coherence',
  'test:no-placeholders',
  'test:ui-strings',
  'test:e2e',
  'test:smoke',
  'test:completion-audit',
  'text:lint',
];

check('npm-scripts', () => {
  const pkg = JSON.parse(read('package.json'));
  for (const script of REQUIRED_SCRIPTS) {
    assert.ok(pkg.scripts[script], `missing npm script: ${script}`);
  }
});

check('smoke-wires-completion-audit', () => {
  const smoke = read('scripts/test-smoke.mjs');
  assert.match(smoke, /test:completion-audit/);
  assert.match(smoke, /test:no-placeholders/);
  assert.match(smoke, /test:semester-audit/);
});

const REQUIRED_E2E = [
  'e2e/setup-wizard.spec.js',
  'e2e/semester-wk4.spec.js',
  'e2e/semester-wk8-all-halls.spec.js',
  'e2e/semester-wk16-all-halls.spec.js',
  'e2e/semester-wk16-clickthrough.spec.js',
  'e2e/dorm-unlock.spec.js',
  'e2e/dorm-unlock-wk16.spec.js',
];

check('e2e-coverage', () => {
  for (const spec of REQUIRED_E2E) {
    assert.ok(existsSync(join(root, spec)), `missing e2e spec: ${spec}`);
  }
});

// ── UI polish hooks ────────────────────────────────────────────
check('ui-polish-css', () => {
  const css = read('src/index.css');
  const styles = read('src/styles.js');
  assert.match(styles, /backdropFilter/i, 'modal overlay must use backdrop blur');
  for (const cls of [
    'hall-pass-view-in', 'ra-wizard-card', 'hall-pass-modal-in', 'hall-unlock-new', 'ra-desk-header',
    'roster-tile-in', 'week-recap-card-in', 'hall-roadmap-card', 'ra-desk-action-btn',
    'ra-desk-week-tick', 'scene-beat-advance', 'scene-choice-btn',
    'hall-unlock-cta', 'week-recap-cta', 'hall-log-achievement', 'hall-log-unlock',
    'floor-checkin-choice', 'week-recap-week-badge',
    'milestone-ceremony-modal', 'milestone-resident-header', 'tier-up-cta', 'hunger-interrupt-modal', 'floor-checkin-modal', 'embodiment-modal',
    'talk-modal', 'weigh-in-modal', 'opposition-hearing-modal', 'week-recap-modal', 'confrontation-modal', 'hall-unlock-modal', 'tier-up-modal', 'competitive-gainer-modal', 'private-session-modal',
    'feast-ritual-modal', 'dream-modal', 'echo-modal', 'week-planner-modal', 'maya-hive-modal',
    'origin-pick-modal', 'community-researcher-modal', 'compound-feed-modal', 'cultivator-modal',
    'evolution-offer-modal', 'session-result-modal', 'tap-out-modal', 'homeroom-queen-modal', 'fair-modal',
    'opposition-endgame-modal', 'refeed-surge-modal', 'eating-contest-modal', 'sumo-match-modal',
    'salon-modal', 'stream-session-modal', 'recording-session-modal', 'collab-stream-modal',
    'lilith-modal', 'pharmacist-chem-modal', 'pharmacist-cult-modal', 'wife-lessons-modal',
    'chapter-hostess-modal', 'supernatural-ascension-modal', 'ascension-ceremony-modal', 'picker-modal',
  ]) {
    assert.match(css, new RegExp(`\\.${cls}`), `missing CSS class .${cls}`);
  }
});

check('ra-portrait-chip', () => {
  assert.ok(existsSync(join(root, 'src/components/RaPortraitChip.jsx')));
  const desk = read('src/HallPass.jsx');
  assert.match(desk, /RaPortraitChip/);
});

check('floor-checkin-state', () => {
  const desk = read('src/HallPass.jsx');
  assert.match(desk, /\[floorCheckIn,setFloorCheckIn\]/);
  assert.doesNotMatch(desk, /\bclassSession\b/);
  assert.doesNotMatch(desk, /\bstartClass\b/);
});

check('hall-lounge-view', () => {
  assert.ok(existsSync(join(root, 'src/views/HallLoungeView.jsx')));
  const desk = read('src/HallPass.jsx');
  assert.match(desk, /HallLoungeView/);
  assert.doesNotMatch(desk, /\bprofessorProfile\b/);
  assert.doesNotMatch(desk, /\bClassroomView\b/);
});

check('reach-level-naming', () => {
  const desk = read('src/HallPass.jsx');
  assert.match(desk, /\breachLevel\b/);
  assert.doesNotMatch(desk, /\bspiritLevel\b/);
});

check('influence-view-routes', () => {
  assert.ok(existsSync(join(root, 'src/views/InfluenceView.jsx')));
  const desk = read('src/HallPass.jsx');
  assert.match(desk, /InfluenceView/);
  assert.match(desk, /\["roster","📋 Roster"\]/);
  assert.match(desk, /\["hall-lounge","🏠 Hall Lounge"\]/);
  assert.match(desk, /\["influence","✨ Influence"\]/);
  assert.doesNotMatch(desk, /SpiritHubView/);
  assert.doesNotMatch(desk, /view==="class"/);
  assert.doesNotMatch(desk, /view==="spirit-hub"/);
});

check('resident-ride-skill', () => {
  const skills = read('src/gameData/skillTrees.js');
  assert.match(skills, /id:"resident_ride"/);
  assert.doesNotMatch(skills, /id:"spirit_ride"/);
  assert.match(skills, /migrateOwnedSkills/);
});

check('resident-embodiment-module', () => {
  assert.ok(existsSync(join(root, 'src/gameData/v2/residentEmbodiment.js')));
  assert.ok(!existsSync(join(root, 'src/gameData/v2/spiritEmbodiment.js')));
  const handlers = read('src/gameData/v2/handlers.js');
  assert.match(handlers, /residentEmbodiment\.js/);
  assert.doesNotMatch(handlers, /spiritEmbodiment/);
});

check('embodiment-modal-polish', () => {
  const css = read('src/index.css');
  assert.match(css, /\.embodiment-modal/);
  const modal = read('src/components/v2/EmbodimentModal.jsx');
  assert.match(modal, /embodiment-modal/);
  const backdrop = read('src/components/v2/SceneBackdrop.jsx');
  assert.match(backdrop, /variant = 'embodiment'/);
  assert.doesNotMatch(backdrop, /VARIANTS\.spirit/);
});

check('core-modal-polish', () => {
  const css = read('src/index.css');
  for (const cls of ['talk-modal', 'weigh-in-modal', 'opposition-hearing-modal']) {
    assert.match(css, new RegExp(`\\.${cls}`), `missing CSS class .${cls}`);
  }
  assert.match(read('src/components/TalkModal.jsx'), /talk-modal/);
  assert.match(read('src/components/WeighInModal.jsx'), /weigh-in-modal/);
  assert.match(read('src/components/OppositionHearingModal.jsx'), /opposition-hearing-modal/);
  assert.match(read('src/components/WeekRecapModal.jsx'), /week-recap-modal/);
  assert.match(read('src/components/ConfrontationModal.jsx'), /confrontation-modal/);
});

check('embodiment-depth-framing', () => {
  const depth = read('src/textEngine/scenes/v2/studentArchetypeDepth.js');
  assert.match(depth, /embodimentByStudent/);
  assert.doesNotMatch(depth, /spiritByStudent/);
  assert.doesNotMatch(depth, /possession performs/);
  assert.doesNotMatch(depth, /possession is silence/);
  assert.doesNotMatch(depth, /possession predatory/);
});

check('opposition-counter-normalize', () => {
  const integration = read('src/gameData/oppositionIntegration.js');
  assert.match(integration, /normalizeCounterId/);
  assert.match(integration, /spirit_pressure: 'floor_pressure'/);
  const opposition = read('src/gameData/opposition.js');
  assert.match(opposition, /normalizeCounterId\(counterId\)/);
});

check('hive-floor-resonance', () => {
  const hive = read('src/gameData/mayaHive.js');
  assert.match(hive, /floorResonance/);
  assert.match(hive, /migrateHiveState/);
  assert.match(hive, /getHiveFloorResonance/);
  assert.match(hive, /floorResonance:8/);
  const desk = read('src/HallPass.jsx');
  assert.doesNotMatch(desk, /spiritResonance/);
  assert.doesNotMatch(desk, /spiritId:apDef/);
});

check('ra-profile-approach-id', () => {
  const approaches = read('src/gameData/raApproaches.js');
  assert.match(approaches, /getProfileApproachId/);
  assert.match(approaches, /getApproachLabel/);
  assert.match(approaches, /migrateRaProfile/);
  const desk = read('src/HallPass.jsx');
  assert.match(desk, /getProfileApproachId/);
  assert.match(desk, /getApproachLabel/);
  assert.match(desk, /migrateRaProfile/);
  assert.doesNotMatch(desk, /const SPIRITS =/);
  assert.doesNotMatch(desk, /const SUBJECTS =/);
});

check('no-spirits-shim', () => {
  assert.ok(!existsSync(join(root, 'src/gameData/spirits.js')));
  for (const rel of ['src/HallPass.jsx', 'src/gameData/campusExploration.js']) {
    assert.doesNotMatch(read(rel), /spirits\.js/);
  }
});

check('cg-chat-ra-framing', () => {
  const desk = read('src/HallPass.jsx');
  assert.match(desk, /isRa:false/);
  assert.match(desk, /isRa:true/);
  assert.doesNotMatch(desk, /isProf:/);
  assert.match(read('src/gameData/competitiveGainerState.js'), /cgIsRaMessage/);
});

check('competitive-gainer-modal-polish', () => {
  assert.match(read('src/index.css'), /\.competitive-gainer-modal/);
  assert.match(read('src/components/CompetitiveGainerModals.jsx'), /competitive-gainer-modal/);
});

check('private-session-modal-polish', () => {
  assert.match(read('src/index.css'), /\.private-session-modal/);
  assert.match(read('src/components/PrivateSessionModal.jsx'), /private-session-modal/);
});

check('v2-modal-polish', () => {
  const css = read('src/index.css');
  const v2 = read('src/components/v2/V2Modals.jsx');
  assert.match(css, /\.feast-ritual-modal/);
  assert.match(css, /\.dream-modal/);
  assert.match(css, /\.echo-modal/);
  assert.match(v2, /feast-ritual-modal/);
  assert.match(v2, /dream-modal/);
  assert.match(v2, /echo-modal/);
});

check('week-planner-modal-polish', () => {
  assert.match(read('src/index.css'), /\.week-planner-modal/);
  assert.match(read('src/components/WeekPlannerModal.jsx'), /week-planner-modal/);
});

check('maya-hive-modal-polish', () => {
  assert.match(read('src/index.css'), /\.maya-hive-modal/);
  assert.match(read('src/components/MayaHiveModal.jsx'), /maya-hive-modal/);
});

check('player-prefs-hall-pass-key', () => {
  const prefs = read('src/gameData/playerPrefs.js');
  assert.match(prefs, /hallPass\.prefs/);
  assert.match(prefs, /removeItem\(LEGACY_KEY\)/);
});

check('lane-modal-polish', () => {
  const css = read('src/index.css');
  for (const [cls, file] of [
    ['origin-pick-modal', 'src/components/OriginPickModal.jsx'],
    ['community-researcher-modal', 'src/components/CommunityResearcherModal.jsx'],
    ['compound-feed-modal', 'src/components/CompoundFeedModal.jsx'],
    ['cultivator-modal', 'src/components/CultivatorModal.jsx'],
  ]) {
    assert.match(css, new RegExp(`\\.${cls}`), `missing CSS .${cls}`);
    assert.match(read(file), new RegExp(cls));
  }
});

check('minigame-modal-polish', () => {
  const css = read('src/index.css');
  for (const [cls, file] of [
    ['evolution-offer-modal', 'src/components/MiscModals.jsx'],
    ['session-result-modal', 'src/components/MiscModals.jsx'],
    ['tap-out-modal', 'src/components/MiscModals.jsx'],
    ['homeroom-queen-modal', 'src/components/HomeroomQueenModal.jsx'],
    ['fair-modal', 'src/components/FairModals.jsx'],
    ['opposition-endgame-modal', 'src/components/OppositionEndgameModal.jsx'],
    ['refeed-surge-modal', 'src/components/RefeedSurgeModal.jsx'],
    ['eating-contest-modal', 'src/components/EatingContestModal.jsx'],
    ['sumo-match-modal', 'src/components/SumoMatchModal.jsx'],
  ]) {
    assert.match(css, new RegExp(`\\.${cls}`), `missing CSS .${cls}`);
    assert.match(read(file), new RegExp(cls));
  }
});

check('owned-hall-local-var', () => {
  const desk = read('src/HallPass.jsx');
  assert.match(desk, /const ownedHall=ownedHallSkills/);
  assert.doesNotMatch(desk, /const ownedClass=/);
});

check('arc-modal-polish', () => {
  const css = read('src/index.css');
  for (const [cls, file] of [
    ['salon-modal', 'src/components/SalonAppetitModal.jsx'],
    ['stream-session-modal', 'src/components/StreamSessionModal.jsx'],
    ['recording-session-modal', 'src/components/RecordingSessionModal.jsx'],
    ['collab-stream-modal', 'src/components/CollabStreamModal.jsx'],
    ['lilith-modal', 'src/components/LilithModals.jsx'],
    ['pharmacist-chem-modal', 'src/components/PharmacistChemModal.jsx'],
    ['pharmacist-cult-modal', 'src/components/PharmacistCultModal.jsx'],
    ['wife-lessons-modal', 'src/components/WifeLessonsModal.jsx'],
    ['chapter-hostess-modal', 'src/components/ChapterHostessModals.jsx'],
    ['supernatural-ascension-modal', 'src/components/SupernaturalAscensionModal.jsx'],
    ['ascension-ceremony-modal', 'src/components/AscensionCeremonyModal.jsx'],
    ['picker-modal', 'src/components/PickerModals.jsx'],
  ]) {
    assert.match(css, new RegExp(`\\.${cls}`), `missing CSS .${cls}`);
    assert.match(read(file), new RegExp(cls));
  }
});

check('niche-modal-polish', () => {
  const css = read('src/index.css');
  for (const [cls, file] of [
    ['device-modal', 'src/components/DeviceTuningModal.jsx'],
    ['equip-picker-modal', 'src/components/EquipPicker.jsx'],
    ['student-equip-modal', 'src/components/StudentEquipModal.jsx'],
    ['bug-report-modal', 'src/components/BugReportModal.jsx'],
    ['lab-build-modal', 'src/components/LabBuildModal.jsx'],
    ['stream-brand-modal', 'src/components/StreamBrandSelectModal.jsx'],
    ['destiny-spend-modal', 'src/components/DestinySpendModal.jsx'],
    ['evolved-activity-modal', 'src/components/EvolvedActivityModal.jsx'],
    ['force-feeder-modal', 'src/components/ForceFeederModal.jsx'],
    ['artisan-gallery-modal', 'src/components/ArtisanGalleryModal.jsx'],
    ['dossier-moment-modal', 'src/components/DossierMomentModal.jsx'],
    ['evolved-event-modal', 'src/components/EvolvedEventModal.jsx'],
    ['item-target-picker-modal', 'src/views/InventoryView.jsx'],
    ['skill-purchase-modal', 'src/HallPass.jsx'],
    ['dinner-out-modal', 'src/HallPass.jsx'],
    ['group-dinner-modal', 'src/HallPass.jsx'],
    ['ranked-session-modal', 'src/HallPass.jsx'],
  ]) {
    assert.match(css, new RegExp(`\\.${cls}`), `missing CSS .${cls}`);
    assert.match(read(file), new RegExp(cls));
  }
});

check('all-modal-shells-polished', () => {
  for (const abs of walkSrcFiles()) {
    const rel = abs.slice(root.length + 1);
    const src = readFileSync(abs, 'utf8');
    assert.doesNotMatch(src, /className="hall-pass-modal-in"/, `${rel}: bare modal shell`);
  }
});

check('hall-unlock-modal-polish', () => {
  const css = read('src/index.css');
  assert.match(css, /\.hall-unlock-modal/);
  assert.match(read('src/components/MiscModals.jsx'), /hall-unlock-modal/);
});

check('hall-pass-events', () => {
  assert.ok(existsSync(join(root, 'src/gameData/hallPassEvents.js')));
  const events = read('src/gameData/hallPassEvents.js');
  assert.match(events, /hallPass:openFieldNotes/);
  const desk = read('src/HallPass.jsx');
  assert.match(desk, /subscribeOpenFieldNotes/);
  assert.doesNotMatch(desk, /addEventListener\('profSim:openFieldNotes'/);
  assert.match(read('src/components/GameErrorBoundary.jsx'), /dispatchOpenFieldNotes/);
});

check('competitive-gainer-state', () => {
  assert.ok(existsSync(join(root, 'src/gameData/competitiveGainerState.js')));
  const cg = read('src/gameData/competitiveGainerState.js');
  assert.match(cg, /migrateCompetitiveGainerState/);
  assert.match(cg, /cgDriveDelta/);
  const desk = read('src/HallPass.jsx');
  assert.match(desk, /migrateCompetitiveGainerState/);
  assert.doesNotMatch(desk, /cgState\?\.spirit/);
});

check('tier-up-modal-polish', () => {
  assert.match(read('src/index.css'), /\.tier-up-modal/);
  assert.match(read('src/components/MiscModals.jsx'), /tier-up-modal/);
});

check('owned-hall-skills', () => {
  const player = read('src/gameData/player.js');
  assert.match(player, /ownedHallSkills/);
  const desk = read('src/HallPass.jsx');
  assert.match(desk, /ownedHallSkills/);
  assert.doesNotMatch(desk, /ownedClassSkills/);
});

check('roster-view-floor-actions', () => {
  assert.ok(existsSync(join(root, 'src/views/RosterView.jsx')));
  const desk = read('src/HallPass.jsx');
  assert.match(desk, /RosterView/);
  assert.match(desk, /doFloorAction/);
  assert.match(desk, /generateFloorCheckIn/);
  assert.doesNotMatch(desk, /ClassView/);
  assert.doesNotMatch(desk, /\bdoClass\b/);
});

check('floor-events-module', () => {
  assert.ok(existsSync(join(root, 'src/gameData/floorEvents.js')));
  assert.ok(existsSync(join(root, 'src/textEngine/scenes/campusEvent/floorCheckInIntegration.js')));
  const desk = read('src/HallPass.jsx');
  assert.match(desk, /floorEvents\.js/);
  assert.match(desk, /renderFloorSceneText/);
  assert.doesNotMatch(desk, /classEvents\.js/);
  const events = read('src/gameData/floorEvents.js');
  assert.match(events, /export const FLOOR_SCENES/);
  assert.match(events, /id:"hall_potluck"/);
  assert.doesNotMatch(events, /id:"class_potluck"/);
  assert.doesNotMatch(events, /CLASS_SCENES/);
  for (const shim of [
    'src/gameData/classEvents.js',
    'src/gameData/classroomSkills.js',
    'src/textEngine/scenes/campusEvent/classIntegration.js',
  ]) {
    assert.ok(!existsSync(join(root, shim)), `deprecated shim still present: ${shim}`);
  }
});

// ── Report ─────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.ok);
for (const c of checks) {
  console.log(c.ok ? `  ✓ ${c.id}` : `  ✗ ${c.id}: ${c.err}`);
}

if (failed.length) {
  console.error(`\ncompletion-audit: ${failed.length}/${checks.length} failed`);
  process.exit(1);
}

console.log(`\ncompletion-audit: ${checks.length}/${checks.length} requirements verified`);
