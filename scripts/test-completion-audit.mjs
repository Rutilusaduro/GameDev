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
  assert.doesNotMatch(cassidy.desc, /\bspreadsheet\b/i, 'Cassidy roster desc still bookworm');
  assert.match(cassidy.desc, /training log/i, 'Cassidy roster desc must use athletic voice');
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
    'hall-pass-view-in', 'ra-wizard-card', 'hall-pass-modal-in', 'hall-unlock-new', 'ra-desk-header', 'hall-pass-nav', 'hall-pass-body',
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
  assert.match(css, /\.embodiment-primary-btn:focus-visible/);
  assert.match(css, /\.embodiment-action-btn:focus-visible/);
  const modal = read('src/components/v2/EmbodimentModal.jsx');
  assert.match(modal, /embodiment-modal/);
  assert.match(modal, /className="embodiment-primary-btn"/);
  assert.match(modal, /className="embodiment-action-btn"/);
  const backdrop = read('src/components/v2/SceneBackdrop.jsx');
  assert.match(backdrop, /variant = 'embodiment'/);
  assert.doesNotMatch(backdrop, /VARIANTS\.spirit/);
});

check('embodiment-campus-framing', () => {
  const walk = read('src/textEngine/scenes/v2/embodiment/campusWalk.js');
  assert.match(walk, /a resident whose body has outpaced/);
  assert.match(walk, /a resident in a doorway/);
  assert.match(walk, /one resident, groceries/);
  assert.doesNotMatch(walk, /a girl whose body|a girl in a doorway|one girl, groceries/i);
  const depth = read('src/textEngine/scenes/v2/embodiment/embodiedCampusDepth.js');
  assert.match(depth, /"Sisters," she trills/);
  assert.doesNotMatch(depth, /"Girls," she trills/i);
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
  assert.match(desk, /CG_CHAT_TEMPLATES\.residents/);
  assert.doesNotMatch(desk, /CG_CHAT_TEMPLATES\.girls/);
  assert.match(read('src/gameData/competitiveGainerState.js'), /cgIsRaMessage/);
  const evolved = read('src/gameData/evolvedForms.js');
  assert.match(evolved, /residents:\{/);
  assert.match(evolved, /per category where any resident is ahead/);
  assert.doesNotMatch(evolved, /CG_CHAT_TEMPLATES\.girls|Per-girl reply templates|any girl is ahead/i);
  const cgText = read('src/gameData/competitiveGainerText.js');
  assert.match(cgText, /\{residentName\}/);
  assert.doesNotMatch(cgText, /\{girlName\}/);
  const dossier = read('src/components/DossierPanel.jsx');
  assert.match(dossier, /per-resident living journal/);
  assert.doesNotMatch(dossier, /per-girl living journal/i);
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

check('hall-pass-audio-nav', () => {
  const audio = read('src/gameData/hallPassAudio.js');
  const desk = read('src/HallPass.jsx');
  assert.match(audio, /kind === 'nav'/);
  assert.match(desk, /playHallPassSound\('nav'/);
});

check('roster-tile-a11y', () => {
  const roster = read('src/views/RosterView.jsx');
  const css = read('src/index.css');
  assert.match(roster, /tabIndex=\{0\}/);
  assert.match(roster, /role="button"/);
  assert.match(css, /\.roster-tile:focus-visible/);
});

check('desk-nav-polish', () => {
  const css = read('src/index.css');
  const desk = read('src/HallPass.jsx');
  assert.match(css, /\.hall-pass-nav/);
  assert.match(css, /\.hall-pass-body/);
  assert.match(css, /\.hall-pass-nav-btn:focus-visible/);
  assert.match(css, /\.ra-desk-action-btn:focus-visible/);
  assert.match(desk, /className="hall-pass-nav"/);
  assert.match(desk, /className="hall-pass-body"/);
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

check('chapter-hostess-resident-framing', () => {
  const evolved = read('src/gameData/evolvedForms.js');
  assert.match(evolved, /Your hall residents are here/);
  assert.doesNotMatch(evolved, /sorority students|Your sorority students/i);
});

check('scrutiny-resident-framing', () => {
  const scrutiny = read('src/textEngine/scenes/scrutiny/index.js');
  assert.match(scrutiny, /residents on your floor|residents in your hall/);
  assert.doesNotMatch(scrutiny, /enrolled cohort|students in your section|your section/i);
});

check('staff-lounge-resident-framing', () => {
  const faculty = read('src/gameData/faculty.js');
  assert.match(faculty, /Ask about her workshop/);
  assert.match(faculty, /Ask about her kitchen crew/);
  assert.match(faculty, /My kitchen crew cooks/);
  assert.doesNotMatch(faculty, /Ask about her students|My students cook/i);
  const cult = read('src/gameData/pharmacistCult.js');
  assert.match(cult, /half your floor/);
  assert.doesNotMatch(cult, /half your section|Random students start sampling/i);
});

check('opposition-resident-framing', () => {
  const agenda = read('src/textEngine/scenes/opposition/agendaCards.js');
  assert.match(agenda, /Your residents feel the chill/);
  assert.match(agenda, /Your residents may speak/);
  assert.match(agenda, /resident\\?'s place on your floor becomes the week/);
  assert.doesNotMatch(agenda, /Your girls feel|Your girls may speak|One girl's enrollment/i);
  const endgame = read('src/textEngine/scenes/opposition/endgameBeat.js');
  assert.match(endgame, /every evolved resident ascended/);
  assert.doesNotMatch(endgame, /every evolved girl ascended/i);
  const v2 = read('src/textEngine/scenes/v2/v2ProseExpansion.js');
  assert.match(v2, /Somewhere a resident is already eating/);
  assert.doesNotMatch(v2, /Somewhere a girl is already eating/i);
});

check('wife-lessons-talk-framing', () => {
  const talk = read('src/textEngine/scenes/wifeLessons/talkDepth.js');
  assert.match(talk, /The daughters eat/);
  assert.doesNotMatch(talk, /The girls eat|The girls asked|Both girls reached/i);
  const weighIn = read('src/textEngine/scenes/weighIn/personas.js');
  assert.match(weighIn, /Everyone's literally asking/);
  assert.doesNotMatch(weighIn, /The girls are literally asking/i);
  const growth = read('src/textEngine/scenes/growthEvent/personas.js');
  assert.match(growth, /The chapter's going to lose their minds/);
  assert.doesNotMatch(growth, /The girls are going to lose their minds/i);
});

check('wife-lessons-depth-framing', () => {
  const depth = read('src/gameData/wlMomDialogueDepth.js');
  assert.match(depth, /my daughters ask on Monday/);
  assert.match(depth, /both daughters/);
  assert.match(depth, /enormously soft daughters in the kitchen/);
  assert.doesNotMatch(depth, /my girls ask|both girls|the girls running|enormously soft girls|well-fed girl can be/i);
  const items = read('src/gameData/items.js');
  assert.match(items, /usable on residents/);
  assert.doesNotMatch(items, /one very committed girl/i);
  const pharmacist = read('src/gameData/pharmacistIngredients.js');
  assert.match(pharmacist, /meets the residents who meet everyone else/);
  assert.doesNotMatch(pharmacist, /meets the girls who meet/i);
});

check('talk-lilith-origin-framing', () => {
  const talk = read('src/gameData/talkSystem.js');
  assert.match(talk, /I mean it/);
  assert.doesNotMatch(talk, /Your greedy girl appreciates/i);
  const journal = read('src/textEngine/scenes/researchJournal/depth.js');
  assert.match(journal, /Keep me soft, full, and kept/);
  assert.doesNotMatch(journal, /Feed your good girl/i);
  const lilith = read('src/gameData/lilith.js');
  assert.match(lilith, /interesting-looking people in this café/);
  assert.doesNotMatch(lilith, /interesting-looking girls in this café/i);
  const origins = read('src/gameData/origins/index.js');
  assert.match(origins, /Perfect chapter faces smile through brunch/);
  assert.match(origins, /Ribbon winners smile first/);
  assert.doesNotMatch(origins, /Perfect girls smile through brunch|Ribbon girls smile first/i);
  const originBeat = read('src/textEngine/scenes/origin/index.js');
  assert.match(originBeat, /Crown hopefuls count everything/);
  assert.doesNotMatch(originBeat, /Crown girls count everything/i);
});

check('dev-comment-resident-framing', () => {
  const memory = read('src/textEngine/scenes/memory/index.js');
  assert.match(memory, /another resident/);
  assert.match(memory, /this resident's own recent history/);
  assert.doesNotMatch(memory, /another girl|this girl's/i);
  const weekRecap = read('src/textEngine/scenes/weekRecap/index.js');
  assert.match(weekRecap, /single resident's weekly recap/);
  assert.doesNotMatch(weekRecap, /single girl's/i);
  const feedReaction = read('src/textEngine/scenes/feedReaction/index.js');
  assert.match(feedReaction, /dominate for that resident/);
  assert.doesNotMatch(feedReaction, /for that girl/i);
  const hunger = read('src/gameData/hungerAddiction.js');
  assert.match(hunger, /devoted residents bond/);
  assert.doesNotMatch(hunger, /devoted girls/i);
  const discontent = read('src/gameData/discontent.js');
  assert.match(discontent, /Should this resident confront/);
  const device = read('src/gameData/deviceDependence.js');
  assert.match(device, /hooked residents/);
  assert.doesNotMatch(device, /hooked girls/i);
  const catalysts = read('src/gameData/ascension/catalysts.js');
  assert.match(catalysts, /that resident's ascension/);
  const ecology = read('src/gameData/relationshipEcology.js');
  assert.match(ecology, /neglected residents surface/);
  const hallPass = read('src/HallPass.jsx');
  assert.match(hallPass, /Hall cred meter/);
  assert.match(hallPass, /HALL KITCHEN QUEEN MINI-INTERFACE/);
  assert.doesNotMatch(hallPass, /Spirit Favor meter|CLASSROOM MINI-INTERFACE/i);
  const lounge = read('src/views/HallLoungeView.jsx');
  assert.match(lounge, /HallLoungeSkillsPanel/);
  assert.doesNotMatch(lounge, /ClassroomSkillsPanel/);
  const gain = read('src/gameData/gainSystem.js');
  assert.match(gain, /Reach level helps/);
  assert.doesNotMatch(gain, /Spirit influence/i);
});

check('hall-system-resident-framing', () => {
  const skills = read('src/gameData/skills.js');
  assert.match(skills, /2 residents simultaneously/);
  assert.match(skills, /3 residents, evening-long/);
  assert.doesNotMatch(skills, /2 girls simultaneously|3 girls, evening-long/i);
  const planner = read('src/gameData/weekPlanner.js');
  assert.match(planner, /Three residents at/);
  assert.doesNotMatch(planner, /Three girls at/i);
  const salon = read('src/gameData/chloeSalon.js');
  assert.match(salon, /Chloé's dinners/);
  assert.doesNotMatch(salon, /French girl's dinners/i);
  const secrets = read('src/gameData/campusSecrets.js');
  assert.match(secrets, /a resident with a headlamp/);
  assert.doesNotMatch(secrets, /a girl with a headlamp/i);
  const resonance = read('src/gameData/v2/cravingResonance.js');
  assert.match(resonance, /One resident eats; they all feel it/);
  assert.doesNotMatch(resonance, /One girl eats/i);
  const pharmacist = read('src/gameData/pharmacistCampus.js');
  assert.match(pharmacist, /Two residents you don't recognize/);
  assert.doesNotMatch(pharmacist, /Two girls you don't recognize/i);
  const researcher = read('src/gameData/communityResearcher.js');
  assert.match(researcher, /Sharp read/);
  assert.doesNotMatch(researcher, /Smart girl/i);
  const weigh = read('src/textEngine/scenes/settling/weigh.js');
  assert.match(weigh, /That's the number/);
  assert.doesNotMatch(weigh, /That's my girl," she says about the number/i);
  const codas = read('src/textEngine/scenes/talkCodas.js');
  assert.match(codas, /I mean it/);
  assert.doesNotMatch(codas, /Your greedy girl appreciates/i);
});

check('dorm-diary-stream-resident-framing', () => {
  const dorms = read('src/gameData/dorms.js');
  assert.match(dorms, /The residents here treat appetite like training/);
  assert.match(dorms, /residents who treat the dorm kitchen/);
  assert.doesNotMatch(dorms, /The girls here treat appetite|girls who treat the dorm kitchen/i);
  const diary = read('src/textEngine/scenes/diaryPhaseD.js');
  assert.match(diary, /Chloé's dinners/);
  assert.doesNotMatch(diary, /French girl's dinners/i);
  const evolved = read('src/gameData/evolvedForms.js');
  assert.match(evolved, /Chloé's dinners/);
  assert.doesNotMatch(evolved, /French girl's dinners/i);
  const feast = read('src/textEngine/scenes/hunt/feastStageUp.js');
  assert.match(feast, /emaciated goth wraith/);
  assert.doesNotMatch(feast, /emaciated goth girl/i);
  const faculty = read('src/gameData/faculty.js');
  assert.match(faculty, /fighting residents about food/);
  assert.doesNotMatch(faculty, /fighting girls about food/i);
  const stream = read('src/textEngine/scenes/streamExtended.js');
  assert.match(stream, /poster feedee/);
  assert.match(stream, /sponsor\\'s favorite/);
  assert.doesNotMatch(stream, /poster girl and I\\'m falling|sponsor\\'s favorite girl/i);
});

check('settling-devour-resident-framing', () => {
  const devour = read('src/gameData/devourScene.js');
  assert.match(devour, /a resident from the dining hall/);
  assert.match(devour, /calls her in/);
  assert.doesNotMatch(devour, /\ba girl from the (dining hall|library)\b/i);
  assert.doesNotMatch(devour, /calls the girl in|The girl screams|When the girl is gone/i);
  const immobility = read('src/gameData/immobilityArrival.js');
  assert.match(immobility, /Other residents seek her warmth/);
  assert.match(immobility, /every other resident sheds/);
  assert.match(immobility, /every other resident warms/);
  assert.doesNotMatch(immobility, /Other girls seek her warmth|every other girl sheds|every other girl warms/i);
  const unlock = read('src/gameData/unlockScenes.js');
  assert.match(unlock, /The resident who tends the room/);
  assert.doesNotMatch(unlock, /The girl who tends the room/i);
  const campus = read('src/gameData/campus.js');
  assert.match(campus, /Two residents share a bench/);
  assert.doesNotMatch(campus, /Two girls share a bench|A girl at the registrar|Three girls walk the track/i);
  const mini = read('src/gameData/miniGames.js');
  assert.match(mini, /The resident from State/);
  assert.doesNotMatch(mini, /The girl from State|Feed your enormous girl/i);
  const cultivator = read('src/textEngine/scenes/cultivator/vignettes.js');
  assert.match(cultivator, /fattened tester/);
  assert.doesNotMatch(cultivator, /fattened girl/i);
});

check('nadia-journal-framing', () => {
  const nadia = read('src/gameData/nadiaSubjectJournals.js');
  assert.match(nadia, /picking a resident like her/);
  assert.match(nadia, /strong, athletic resident/);
  assert.match(nadia, /sorority resident/);
  assert.match(nadia, /ultimate gamer resident/);
  assert.match(nadia, /country-resident type/);
  assert.match(nadia, /nurturing resident grow heavy/);
  assert.doesNotMatch(nadia, /\bpicking a girl like her\b/i);
  assert.doesNotMatch(nadia, /\bsorority girl\b/i);
  assert.doesNotMatch(nadia, /\bgamer girl\b/i);
  assert.doesNotMatch(nadia, /\bfarm-girl type\b/i);
  assert.doesNotMatch(nadia, /\bnurturing girl\b/i);
  assert.doesNotMatch(nadia, /\b(girl|girls)\b/i);
});

check('wife-lessons-hunt-framing', () => {
  const evolved = read('src/gameData/evolvedForms.js');
  assert.match(evolved, /as the daughters led the lesson/);
  assert.match(evolved, /their daughters proudly serving/);
  assert.match(evolved, /my daughters seemed to enjoy/);
  assert.match(evolved, /finally grew a stomach worth feeding/);
  assert.doesNotMatch(evolved, /as the girls led the lesson|the girls proudly serving|like a real girl|the girls seemed to enjoy them/i);
  assert.doesNotMatch(evolved, /Both girls have reached|Both girls hit|Both girls have hit/i);
  const feast = read('src/textEngine/scenes/hunt/feastStageUp.js');
  assert.match(feast, /delivery driver/);
  assert.match(feast, /deliciously fat Mia/);
  assert.doesNotMatch(feast, /delivery girl|deliciously fat girl/i);
  const feastDepth = read('src/textEngine/scenes/hunt/feastDepth.js');
  assert.match(feastDepth, /Mia kneads vast curves/);
  assert.doesNotMatch(feastDepth, /Delivery girl kneads/i);
});

check('content-stage-journal-framing', () => {
  const content = read('src/gameData/content.js');
  assert.match(content, /skinny for someone who grew up on sweet potato pie/);
  assert.match(content, /the resident with jam for every mood/);
  assert.match(content, /intervention sisters came to help/);
  assert.match(content, /the fastest on this track/);
  assert.match(content, /wider than some teammates' whole bodies/);
  assert.doesNotMatch(content, /skinny for a girl who grew up|the girl with jam for every mood|intervention girls came|the fastest girl on this track|the fastest girl on the track|wider than some girls' whole bodies/);
  const journals = read('src/gameData/evolvedForms.js');
  assert.match(journals, /ultimate hall appetite case study/);
  assert.match(journals, /letting the RA stuff me like this/);
  assert.doesNotMatch(journals, /appetite psychology|letting a resident stuff me like this/);
});

check('early-portrait-journal-framing', () => {
  const early = read('src/textEngine/scenes/earlyGain/fragments.js');
  assert.match(early, /still mostly who she was at move-in/);
  assert.match(early, /fit her old jeans again/);
  assert.doesNotMatch(early, /still mostly the girl she was|the girl who still fits her old jeans/);
  const portrait = read('src/textEngine/scenes/body/portraitDepth.js');
  assert.match(portrait, /her angular frame is becoming someone warmer/);
  assert.doesNotMatch(portrait, /the angular girl is becoming/);
  const dreams = read('src/textEngine/scenes/v2/dreams/depth.js');
  assert.match(dreams, /feeds her reflection in the glass/);
  assert.doesNotMatch(dreams, /feeds the girl in the glass/);
  const journals = read('src/gameData/evolvedForms.js');
  assert.match(journals, /floor program sounded harmless/);
  assert.match(journals, /hall meal season/);
  assert.match(journals, /Straight-bodied frames like mine adapt quickly/);
  assert.match(journals, /Every time the RA feeds me/);
  assert.doesNotMatch(journals, /The psychology study sounded harmless|psychology project|the other girl brings food|Straight-bodied girls like me adapt|Every time Nadia feeds me/);
});

check('campus-system-resident-framing', () => {
  const campus = read('src/textEngine/scenes/campusExplorationText.js');
  assert.match(campus, /A resident thanks/);
  assert.doesNotMatch(campus, /A girl thanks/);
  const hunger = read('src/textEngine/scenes/hungerInterrupt/index.js');
  assert.match(hunger, /just a resident clearly past polite hunger/);
  assert.doesNotMatch(hunger, /just a girl clearly past polite hunger/);
  const settling = read('src/textEngine/scenes/settling/settlingSceneDepth.js');
  assert.match(settling, /residents settle near her heat/);
  assert.doesNotMatch(settling, /girls settle near her heat/);
  const device = read('src/textEngine/scenes/campusDevice/fragments.js');
  assert.match(device, /a resident patting her belly/);
  const opp = read('src/textEngine/scenes/opposition/oppositionMonolithFragmentDepth.js');
  assert.match(opp, /your resident performs hunger/);
  assert.doesNotMatch(opp, /your girl performs hunger/);
  const evolved = read('src/gameData/evolvedForms.js');
  assert.match(evolved, /competitor from State/);
  assert.match(evolved, /Two squadmates cried/);
  assert.doesNotMatch(evolved, /The girl from State|Two girls cried\. One said she'd been waiting years/i);
});

check('diary-roster-resident-framing', () => {
  const diary = read('src/textEngine/scenes/diary.js');
  assert.match(diary, /competitor from State/);
  assert.match(diary, /two squadmates cried/);
  assert.match(diary, /Campus myth: resident who never stops eating/);
  assert.doesNotMatch(diary, /the girl from State|two girls cried|Campus myth: girl who never stops eating/i);
  const diaryBase = read('src/textEngine/scenes/diaryBase.js');
  assert.match(diaryBase, /Twenty-three residents/);
  assert.doesNotMatch(diaryBase, /Twenty-three girls/);
  const diaryPhaseD = read('src/textEngine/scenes/diaryPhaseD.js');
  assert.match(diaryPhaseD, /five more residents to the board/);
  assert.doesNotMatch(diaryPhaseD, /five more girls to the board/);
  const rosterTell = read('src/textEngine/scenes/rosterTell/index.js');
  assert.match(rosterTell, /For a resident still finding her footing/);
  assert.doesNotMatch(rosterTell, /For a girl still finding her footing/);
  const growth = read('src/textEngine/scenes/growthEvent/personas.js');
  assert.match(growth, /That's a lot of woman/);
  assert.doesNotMatch(growth, /That's a lot of girl/);
  const cgText = read('src/gameData/competitiveGainerText.js');
  assert.match(cgText, /five more residents to the board/);
  assert.doesNotMatch(cgText, /five more girls to the board/);
});

check('gossip-dinner-resident-framing', () => {
  const gossip = read('src/textEngine/scenes/gossip/index.js');
  assert.match(gossip, /resident-to-resident awareness/);
  assert.match(gossip, /the other resident moves|the other resident's new shape|the other resident the way/);
  assert.doesNotMatch(gossip, /the other girl moves|That girl is a project|that girl could make/i);
  const dinner = read('src/textEngine/scenes/dinner/reactions.js');
  assert.match(dinner, /phrase for residents who committed/);
  assert.match(dinner, /lot of mass to get airborne/);
  assert.doesNotMatch(dinner, /phrase for girls who committed|lot of girl to get airborne/i);
  const content = read('src/gameData/content.js');
  assert.match(content, /hope everyone on that squad/);
  assert.doesNotMatch(content, /hope every girl on that squad/i);
});

check('memory-gossip-resident-framing', () => {
  const memory = read('src/textEngine/scenes/memory/index.js');
  assert.match(memory, /The residents keep a quiet eye/);
  assert.doesNotMatch(memory, /The girls keep a quiet eye/i);
  const gossip = read('src/textEngine/scenes/gossip/index.js');
  assert.match(gossip, /The residents have their own accounting/);
  assert.doesNotMatch(gossip, /The girls have their own accounting/i);
  const desk = read('src/HallPass.jsx');
  assert.match(desk, /ascended residents wear their thin skins/);
  assert.doesNotMatch(desk, /ascended students wear their thin skins/i);
});

check('homeroom-resident-framing', () => {
  const activity = read('src/textEngine/scenes/homeroom/homeroomActivityDepth.js');
  assert.match(activity, /the residents have been waiting/);
  assert.doesNotMatch(activity, /the girls have been waiting/i);
  const homeroom = read('src/gameData/evolvedForms.js');
  assert.match(homeroom, /The residents know what this is/);
  assert.match(homeroom, /Keep it to the residents/);
  assert.match(homeroom, /wellness-program aligned/);
  assert.match(homeroom, /wellness notes/);
  assert.doesNotMatch(homeroom, /The girls know what this is|Keep it to the students — stay professional|curriculum-aligned|curriculum notes/i);
  const diary = read('src/textEngine/scenes/diary.js');
  assert.match(diary, /Hall kitchen royalty includes royal appetite/);
  assert.doesNotMatch(diary, /Homeroom royalty/i);
  const modal = read('src/components/HomeroomQueenModal.jsx');
  assert.match(modal, /FLOOR RESIDENTS · tap to conference/);
  assert.doesNotMatch(modal, /STUDENTS · tap to conference/i);
  assert.match(homeroom, /Wide Tables/);
  assert.match(homeroom, /Residence life loaned wider lounge tables/);
  assert.match(homeroom, /hall lounge tee/);
  assert.match(homeroom, /Brings wine to floor events/);
  assert.match(homeroom, /hall kitchen sessions have been going/);
  assert.doesNotMatch(homeroom, /Wide Desks|science room|Brings wine to school events|Bri's uniform doesn't quite tuck|kitchen club has been going/i);
  assert.match(diary, /taste-test more on the floor than I do at home/);
  assert.doesNotMatch(diary, /happy at school/i);
  const campus = read('src/textEngine/scenes/campusSoftening.js');
  assert.match(campus, /whole campus feels hungrier/);
  assert.doesNotMatch(campus, /whole school feels hungrier/i);
});

check('cassidy-swimmer-voice', () => {
  const authoring = read('src/textEngine/AUTHORING.md');
  assert.match(authoring, /\| 1 \| Cassidy \| swimmer \|/);
  assert.doesNotMatch(authoring, /\| 1 \| Madeline \| bookworm \|/);

  const npc = read('src/textEngine/scenes/npcReactions.js');
  assert.match(npc, /registerPool\('ra\.observation'/);
  assert.doesNotMatch(npc, /prof\.observation/);

  const CASSIDY_VOICE_FILES = [
    'src/textEngine/scenes/weighIn/personas.js',
    'src/textEngine/scenes/psychShift/personas.js',
    'src/textEngine/scenes/interior/personas.js',
    'src/textEngine/scenes/earlyGain/personas.js',
    'src/textEngine/scenes/eating/personas.js',
    'src/textEngine/scenes/growthEvent/personas.js',
    'src/textEngine/scenes/growthEvent/garments.js',
    'src/textEngine/scenes/immobility/personas.js',
    'src/textEngine/scenes/weekRecap/index.js',
    'src/textEngine/scenes/milestone/index.js',
    'src/textEngine/scenes/diary.js',
    'src/textEngine/scenes/clothing/personas.js',
    'src/textEngine/scenes/campus/campusSceneDepth.js',
    'src/textEngine/scenes/talkCodas.js',
    'src/textEngine/scenes/attitude.js',
    'src/textEngine/scenes/diaryBase.js',
  ];

  const BANNED_IN_CASSIDY = [
    /\bhypothesis\b/i,
    /\bdataset\b/i,
    /\bpeer review\b/i,
    /\bpublishable\b/i,
    /\bcontrol group\b/i,
    /\bp-value\b/i,
    /\bfootnote\b/i,
    /\badjusting her glasses\b/i,
    /\bspreadsheet\b/i,
    /\bmethodology\b/i,
    /\bmethodologically\b/i,
    /\bsample size\b/i,
    /\btaxonomy\b/i,
    /\bcardigan and blouse\b/i,
    /\bstatistically\b/i,
    /\bliterature review\b/i,
    /\bpanel-reviewed\b/i,
    /\bfield note\b/i,
    /\bdata set\b/i,
    /\bfrom her book\b/i,
  ];

  const blockRe = /\{[^{}]*when:\s*\{[^{}]*studentId:\s*(?:1(?!\d)|\[1\])[^{}]*\}[^{}]*text:\s*\[[\s\S]*?\]\s*,?\s*\}/g;

  for (const file of CASSIDY_VOICE_FILES) {
    const src = read(file);
    const blocks = src.match(blockRe) ?? [];
    assert.ok(blocks.length > 0, `${file} must contain Cassidy (studentId 1) persona blocks`);
    const cassidyText = blocks.join('\n');
    for (const re of BANNED_IN_CASSIDY) {
      assert.doesNotMatch(cassidyText, re, `${file}: Cassidy voice still has ${re}`);
    }
  }

  const intimacy = read('src/textEngine/scenes/intimacy/personas.js');
  const intimacyCassidyRe = /\{[^{}]*when:\s*\{[^{}]*"studentId":\[1\][^{}]*\}[^{}]*text:\s*\[[\s\S]*?\]\s*,?\s*\}/g;
  const intimacyCassidyBlocks = intimacy.match(intimacyCassidyRe) ?? [];
  assert.ok(intimacyCassidyBlocks.length >= 4, 'intimacy/personas.js must contain Cassidy (studentId [1]) blocks');
  const intimacyCassidyText = intimacyCassidyBlocks.join('\n');
  assert.doesNotMatch(intimacyCassidyText, /\bglasses\b/i, 'intimacy Cassidy still bookworm');
  assert.doesNotMatch(intimacyCassidyText, /\bphysics\b/i, 'intimacy Cassidy still bookworm');
  assert.match(intimacyCassidyText, /lane|log|split|pressure/i, 'intimacy Cassidy must use swimmer voice');
  for (const re of BANNED_IN_CASSIDY) {
    assert.doesNotMatch(intimacyCassidyText, re, `intimacy/personas.js Cassidy blocks still has ${re}`);
  }
  const intimacySwimmerRe = /\{[^{}]*when:\s*\{[^{}]*"archetype":\["swimmer"\][^{}]*\}[^{}]*text:\s*\[[\s\S]*?\]\s*,?\s*\}/g;
  const intimacySwimmerBlocks = intimacy.match(intimacySwimmerRe) ?? [];
  assert.ok(intimacySwimmerBlocks.length >= 4, 'intimacy/personas.js must contain archetype swimmer blocks');
  const intimacySwimmerText = intimacySwimmerBlocks.join('\n');
  assert.doesNotMatch(intimacySwimmerText, /\bglasses\b/i, 'intimacy swimmer blocks still bookworm');
  assert.match(intimacySwimmerText, /lane|pool|split|recovery|dryland|logged/i, 'intimacy swimmer must use athletic voice');
  for (const re of BANNED_IN_CASSIDY) {
    assert.doesNotMatch(intimacySwimmerText, re, `intimacy/personas.js swimmer blocks still has ${re}`);
  }

  const hungerArchetype = read('src/textEngine/scenes/hungerArchetypeBehavior.js');
  assert.match(hungerArchetype, /swimmer:\s*\[/);
  const swimmerHunger = hungerArchetype.match(/swimmer:[\s\S]*?(?=\n  \w+:|^};)/m)?.[0] ?? '';
  assert.doesNotMatch(swimmerHunger, /\bhypothesis\b|\bglasses\b/i, 'hunger swimmer still bookworm');
  assert.match(swimmerHunger, /training|team gear|meal plan|carb|coach/i, 'hunger swimmer must use athletic voice');

  const CASSIDY_NAMED_FILES = [
    'src/textEngine/scenes/v2/studentArchetypeDepth.js',
    'src/textEngine/scenes/evolved/evolvedSceneDepth.js',
    'src/textEngine/scenes/settling/settlingSceneDepth.js',
    'src/textEngine/scenes/talkEncourage.js',
    'src/textEngine/scenes/talkCheckIn.js',
    'src/textEngine/scenes/talkCommandFinishDepth.js',
    'src/textEngine/scenes/talkCompliment.js',
    'src/textEngine/scenes/v2/echo/echoSceneDepth.js',
    'src/textEngine/scenes/recordingSession/recordingSessionWrapDepth.js',
    'src/gameData/skills.js',
    'src/gameData/evolvedForms.js',
  ];

  for (const file of CASSIDY_NAMED_FILES) {
    const src = read(file);
    const lines = src.match(/[^\n]*Cassidy[^\n]*/g) ?? [];
    assert.ok(lines.length > 0, `${file} must mention Cassidy`);
    for (const line of lines) {
      for (const re of BANNED_IN_CASSIDY) {
        assert.doesNotMatch(line, re, `${file}: Cassidy line still has ${re}: ${line.slice(0, 80)}`);
      }
    }
  }

  const skills = read('src/gameData/skills.js');
  assert.doesNotMatch(skills, /Cassidy doesn't look up from her book/i);
  assert.match(skills, /Cassidy doesn't look up from her training log/i);

  // Lane Captain arc — full prose file (ids/comments stripped)
  const laneCaptainSrc = read('src/gameData/communityResearcher.js')
    .replace(/^\/\/.*$/gm, '')
    .replace(/community_researcher/g, 'lane_captain');
  for (const re of BANNED_IN_CASSIDY) {
    assert.doesNotMatch(laneCaptainSrc, re, `communityResearcher.js still has ${re}`);
  }

  const LANE_CAPTAIN_UI_FILES = [
    'src/textEngine/scenes/opposition/oppositionSceneDepth.js',
    'src/textEngine/scenes/opposition/counterOutcome.js',
    'src/gameData/oppositionIntegration.js',
    'src/components/CommunityResearcherModal.jsx',
  ];
  for (const file of LANE_CAPTAIN_UI_FILES) {
    const src = read(file);
    const lines = src.match(/[^\n]*Cassidy[^\n]*/g) ?? [];
    for (const line of lines) {
      for (const re of BANNED_IN_CASSIDY) {
        assert.doesNotMatch(line, re, `${file}: Cassidy line still has ${re}: ${line.slice(0, 80)}`);
      }
    }
  }

  const evolvedSrc = read('src/gameData/evolvedForms.js');
  const crJournal = evolvedSrc.match(/community_researcher:\[\s*\n\s*"First floor session[\s\S]*?\],\s*\n\};/);
  assert.ok(crJournal, 'evolvedForms.js must contain community_researcher journal block');
  const crEvents = evolvedSrc.match(/community_researcher:\[\s*\n\s*\/\/ stageIdx 0[\s\S]*?\n  \],\n\n  \/\/ ── QUIET/);
  assert.ok(crEvents, 'evolvedForms.js must contain community_researcher EVOLVED_EVENTS block');
  const crOutfits = evolvedSrc.match(/community_researcher:\[\s*\n\s*"Team jacket[\s\S]*?\],\s*\n\};/);
  assert.ok(crOutfits, 'evolvedForms.js must contain community_researcher outfit block');
  for (const block of [crJournal[0], crEvents[0], crOutfits[0]]) {
    for (const re of BANNED_IN_CASSIDY) {
      assert.doesNotMatch(block, re, `evolvedForms community_researcher block still has ${re}`);
    }
  }

  const diary = read('src/textEngine/scenes/diary.js');
  const crDiary = diary.match(/registerPool\('diary\.community_researcher[\s\S]*?registerPool\('diary\.innerBeat/);
  assert.ok(crDiary, 'diary.js must contain diary.community_researcher pools');
  assert.match(crDiary[0], /Training log and training meals both extensive/);
  assert.doesNotMatch(crDiary[0], /Field notes and field meals|methodology|cardigans|footnotes|observer positionality|sociology of that/i);
  for (const re of BANNED_IN_CASSIDY) {
    assert.doesNotMatch(crDiary[0], re, `diary.community_researcher still has ${re}`);
  }

  const diaryDepth = read('src/textEngine/scenes/diaryEvolvedSceneDepth.js');
  const crDepth = diaryDepth.match(/community_researcher:\s*\[[\s\S]*?\],/);
  assert.ok(crDepth, 'diaryEvolvedSceneDepth must contain community_researcher beats');
  assert.match(crDepth[0], /Floor sessions from this chair/);
  assert.doesNotMatch(crDepth[0], /Field site|Observation stationary/i);

  const attitude = read('src/textEngine/scenes/attitude.js');
  const swimmerBlocks = attitude.match(/\{ when: \{ archetype: ['"]swimmer['"][\s\S]*?text: \[[\s\S]*?\]\s*,?\s*\}/g) ?? [];
  assert.ok(swimmerBlocks.length >= 2, 'attitude.js must contain archetype swimmer blocks');
  const swimmerText = swimmerBlocks.join('\n');
  assert.doesNotMatch(swimmerText, /\bhypothesis\b/i, 'attitude swimmer blocks still bookworm');
  assert.doesNotMatch(swimmerText, /\bdocumented my willingness\b/i, 'attitude swimmer blocks still bookworm');
  assert.match(swimmerText, /training|season|lane|pool|split|logged|captain/i, 'attitude swimmer must use athletic voice');
  for (const re of BANNED_IN_CASSIDY) {
    assert.doesNotMatch(swimmerText, re, `attitude.js swimmer blocks still has ${re}`);
  }

  const dinnerReactions = read('src/textEngine/scenes/dinner/reactions.js');
  const dinnerSwimmerPools = dinnerReactions.match(/registerPool\('dinner\.reaction\.(?:thinJealousy|fatEncourage)\.sw[^']*'[\s\S]*?\]\);/g) ?? [];
  assert.ok(dinnerSwimmerPools.length >= 15, 'dinner/reactions.js must contain swimmer reaction pools');
  const dinnerSwimmerPoolText = dinnerSwimmerPools.join('\n');
  assert.doesNotMatch(dinnerSwimmerPoolText, /\bliterature\b|\bdataset\b|\bmethodology\b|\bhypothesis\b/i, 'dinner swimmer pools still bookworm');
  assert.match(dinnerSwimmerPoolText, /training log|lane|season|meal plan|split|coach/i, 'dinner swimmer pools must use athletic voice');
  for (const re of BANNED_IN_CASSIDY) {
    assert.doesNotMatch(dinnerSwimmerPoolText, re, `dinner/reactions.js swimmer pools still has ${re}`);
  }
  const dinnerSwimmerArchetype = dinnerReactions.split('\n').filter((line) => line.includes('"archetype":"swimmer"'));
  assert.ok(dinnerSwimmerArchetype.length >= 8, 'dinner/reactions.js must contain archetype swimmer reaction entries');
  const dinnerSwimmerArchetypeText = dinnerSwimmerArchetype.join('\n');
  assert.doesNotMatch(dinnerSwimmerArchetypeText, /_f49|_f50|_f51|_f52|_f53|_f54|_f55|_f108|_f109|_f110|_f111|_f112|_f113|_f114|_f115/, 'dinner swimmer entries still point at bookworm fragments');
  assert.match(dinnerSwimmerArchetypeText, /thinJealousy\.sw\d|fatEncourage\.swf\d/, 'dinner swimmer entries must use swimmer fragment pools');
  assert.match(dinnerSwimmerArchetypeText, /training log|fuel data/i, 'dinner swimmer level-0 must use athletic inline voice');
  const jealousySwimmer = dinnerReactions.split('\n').find((line) => /"archetype":"swimmer"/.test(line) && !line.includes('reactionLevel')) ?? '';
  assert.ok(jealousySwimmer, 'dinner/reactions.js jealousyDefault must contain swimmer entry');
  assert.doesNotMatch(jealousySwimmer, /\bdataset\b/i, 'jealousyDefault swimmer still bookworm');
  assert.match(jealousySwimmer, /training log|filling another page/i, 'jealousyDefault swimmer must use athletic voice');

  const dinnerRefSwimmer = dinnerReactions.split('\n').filter((line) => line.includes('"refArchetype":"swimmer"'));
  assert.ok(dinnerRefSwimmer.length >= 5, 'dinner/reactions.js must contain refArchetype swimmer entries');
  const dinnerRefSwimmerText = dinnerRefSwimmer.join('\n');
  assert.match(dinnerRefSwimmerText, /fatRetort\.swr|thinContextual\.swt|splits are outdated|training logs|lane assignments/i, 'dinner refArchetype swimmer must use athletic voice');
  assert.doesNotMatch(dinnerRefSwimmerText, /\bpanel-reviewed\b|\bhypothesis\b|\bdataset\b/i, 'dinner refArchetype swimmer still bookworm');
  const dinnerRefSwimmerPools = dinnerReactions.match(/registerPool\('dinner\.reaction\.(?:fatRetort\.swr|thinContextual\.swt)[^']*'[\s\S]*?\]\);/g) ?? [];
  assert.ok(dinnerRefSwimmerPools.length >= 6, 'dinner/reactions.js must contain refArchetype swimmer pools');
  const dinnerRefSwimmerPoolText = dinnerRefSwimmerPools.join('\n');
  assert.match(dinnerRefSwimmerPoolText, /training log|season plan|lane|split|coach|fuel/i, 'dinner refArchetype swimmer pools must use athletic voice');
  for (const re of BANNED_IN_CASSIDY) {
    assert.doesNotMatch(dinnerRefSwimmerPoolText, re, `dinner/reactions.js refArchetype swimmer pools still has ${re}`);
  }

  const students = read('src/gameData/students.js');
  const tap250Block = students.match(/export const TAP_OUT_250 = \{[\s\S]*?\n\};/)?.[0] ?? '';
  const cassidyTap250 = tap250Block.match(/\n  1:\s*\(s\)\s*=>\s*`[\s\S]*?`/)?.[0] ?? '';
  assert.ok(cassidyTap250, 'students.js must contain Cassidy TAP_OUT_250 line');
  assert.doesNotMatch(cassidyTap250, /\blab result\b|\bmechanisms of this\b/i, 'Cassidy TAP_OUT_250 still bookworm');
  assert.match(cassidyTap250, /split|logging|training/i, 'Cassidy TAP_OUT_250 must use athletic voice');
  const blobBlock = students.match(/export const BLOB_PRIVATE_INTRO = \{[\s\S]*?\n\};/)?.[0] ?? '';
  const cassidyBlobIntro = blobBlock.match(/\n  1:\s*\(s\)\s*=>\s*`[\s\S]*?`/)?.[0] ?? '';
  assert.ok(cassidyBlobIntro, 'students.js must contain Cassidy BLOB_PRIVATE_INTRO line');
  assert.match(cassidyBlobIntro, /training block/i, 'Cassidy BLOB_PRIVATE_INTRO must use athletic voice');

  const gossip = read('src/textEngine/scenes/gossip/index.js');
  const gossipSwimmer = gossip.match(/\{ when: \{ archetype: 'swimmer'[\s\S]*?\]\s*\},/g) ?? [];
  assert.ok(gossipSwimmer.length >= 2, 'gossip/index.js must contain archetype swimmer blocks');
  const gossipSwimmerText = gossipSwimmer.join('\n');
  assert.doesNotMatch(gossipSwimmerText, /pen hasn't moved|measurable\. She measured/i, 'gossip swimmer blocks still bookworm');
  assert.match(gossipSwimmerText, /training log|logged|natatorium|weigh-in/i, 'gossip swimmer must use athletic voice');

  const campusDevice = read('src/textEngine/scenes/campusDevice/fragments.js');
  const deviceSwimmer = campusDevice.match(/\{ when: \{ archetype: 'swimmer' \}, text: \[[\s\S]*?\] \},/)?.[0] ?? '';
  assert.ok(deviceSwimmer, 'campusDevice/fragments.js must contain archetype swimmer block');
  assert.doesNotMatch(deviceSwimmer, /textbook|highlighting a passage/i, 'campusDevice swimmer still bookworm');
  assert.match(deviceSwimmer, /training log|splits|sets/i, 'campusDevice swimmer must use athletic voice');

  const campusSoft = read('src/textEngine/scenes/campusSoftening.js');
  const talkCodaSection = campusSoft.match(/registerPool\("talk\.campusCoda"[\s\S]*?\]\);/)?.[0] ?? '';
  const codaSwimmer = talkCodaSection.match(/\{ when: \{ campusFattening: true, archetype: "swimmer" \}[\s\S]*?\]\s*\},/)?.[0] ?? '';
  assert.ok(codaSwimmer, 'campusSoftening talk.campusCoda must contain swimmer block');
  assert.doesNotMatch(codaSwimmer, /ambient caloric environment|appendix|hypothesis/i, 'talk.campusCoda swimmer still bookworm');
  assert.match(codaSwimmer, /training log|lane group|splits|natatorium|carb load/i, 'talk.campusCoda swimmer must use athletic voice');
  const weighInSection = campusSoft.match(/registerPool\("weighIn\.campus"[\s\S]*?\]\);/)?.[0] ?? '';
  const weighSwimmer = weighInSection.match(/\{ when: \{ campusFattening: true, archetype: "swimmer" \}[\s\S]*?\]\s*\},/)?.[0] ?? '';
  assert.ok(weighSwimmer, 'campusSoftening weighIn.campus must contain swimmer block');
  assert.doesNotMatch(weighSwimmer, /appendix|hypothesis|dataset/i, 'weighIn.campus swimmer still bookworm');
  assert.match(weighSwimmer, /training log|team gained|natatorium|carb load|waistbands/i, 'weighIn.campus swimmer must use athletic voice');
  for (const block of [codaSwimmer, weighSwimmer]) {
    for (const re of BANNED_IN_CASSIDY) {
      assert.doesNotMatch(block, re, `campusSoftening swimmer block still has ${re}`);
    }
  }
});

check('embodied-resident-sighting', () => {
  const embodied = read('src/gameData/v2/embodiedCampus.js');
  assert.match(embodied, /resident_sighting:/);
  assert.match(embodied, /id: 'resident_sighting'/);
  assert.match(embodied, /classmate_sighting: 'resident_sighting'/);
  assert.doesNotMatch(embodied, /classmate_sighting:\s*\{/);
  const walk = read('src/textEngine/scenes/v2/embodiment/campusWalk.js');
  assert.match(walk, /emb\.event\.resident_sighting/);
  assert.doesNotMatch(walk, /emb\.event\.classmate_sighting/);
  const state = read('src/gameData/v2/state.js');
  assert.match(state, /normalizeV2State/);
  assert.match(state, /migrateEmbodimentState/);
});

check('campus-softening-resident-framing', () => {
  const campus = read('src/textEngine/scenes/campusSoftening.js');
  assert.match(campus, /Residents on my floor have that same post-table warmth/);
  assert.match(campus, /Even staff in the hall look well-fed/);
  assert.doesNotMatch(campus, /Girls on my floor|Even teachers in the hall|classmates are eating|class is full of subjects|\bmy section\b/i);
  const diarySection = campus.match(/registerPool\("diary\.campus"[\s\S]*?\]\);/)?.[0] ?? '';
  const campusSwimmerDiary = diarySection.match(/\{ when: \{ campusFattening: true, archetype: 'swimmer' \}[\s\S]*?\]\s*\},/)?.[0] ?? '';
  assert.ok(campusSwimmerDiary, 'campusSoftening diary.campus must contain campusFattening swimmer block');
  assert.doesNotMatch(campusSwimmerDiary, /ambient caloric environment|Reference trail/i, 'campusSoftening diary swimmer still bookworm');
  assert.match(campusSwimmerDiary, /pool deck|training log|natatorium|splits|teammates/i, 'campusSoftening diary swimmer must use athletic voice');
  const attitudeSection = campus.match(/registerPool\("attitude\.campus"[\s\S]*?\]\);/)?.[0] ?? '';
  const campusSwimmerAttitude = attitudeSection.match(/\{ when: \{ campusFattening: true, archetype: "swimmer" \}[\s\S]*?\]\s*\},/)?.[0] ?? '';
  assert.ok(campusSwimmerAttitude, 'campusSoftening attitude.campus must contain swimmer block');
  assert.doesNotMatch(campusSwimmerAttitude, /hypothesis|dataset|methodology/i, 'campusSoftening attitude swimmer still bookworm');
  assert.match(campusSwimmerAttitude, /lane group|training log|natatorium|carb load|meal plan/i, 'campusSoftening attitude swimmer must use athletic voice');
  const roster = read('src/views/RosterView.jsx');
  assert.match(roster, /residentWithdrawn/);
  assert.doesNotMatch(roster, /classmateWithdrawn/i);
  const discontent = read('src/textEngine/scenes/discontent/index.js');
  assert.match(discontent, /residentWithdrawn: true/);
  assert.doesNotMatch(discontent, /classmateWithdrawn/i);
});

check('hall-kitchen-curriculum-framing', () => {
  const v2 = read('src/textEngine/scenes/v2/v2ProseExpansion.js');
  assert.match(v2, /hall kitchen queen holds court/);
  assert.doesNotMatch(v2, /homeroom queen holds court|cookies, curriculum/i);
  const salon = read('src/textEngine/scenes/salonGallerySceneDepth.js');
  assert.match(salon, /Hall kitchen queen evolution/);
  assert.doesNotMatch(salon, /Homeroom queen evolution|appetite as curriculum/i);
  const thin = read('src/textEngine/scenes/supernatural/thinVoice.js');
  assert.match(thin, /wellness unit asks restraint/);
  assert.doesNotMatch(thin, /homeroom asks restraint/i);
  const depth = read('src/textEngine/scenes/supernatural/depth.js');
  assert.match(depth, /Wellness briefings preach moderation/);
  assert.doesNotMatch(depth, /Homeroom preaches|Spirit fingers without flesh/i);
  const hearing = read('src/gameData/oppositionHearings.js');
  assert.match(hearing, /abundance is the hall program/);
  assert.doesNotMatch(hearing, /abundance is the curriculum/i);
});

check('desk-utility-polish', () => {
  const css = read('src/index.css');
  assert.match(css, /\.ra-desk-utility-btn:focus-visible/);
  assert.match(css, /\.hall-log-tab:focus-visible/);
  const desk = read('src/HallPass.jsx');
  assert.match(desk, /className="ra-desk-utility-btn"/);
  assert.match(desk, /feed a resident/);
});

check('narrative-roster-framing', () => {
  const v2 = read('src/textEngine/scenes/v2/v2ProseExpansion.js');
  assert.match(v2, /every resident on your roster/);
  assert.doesNotMatch(v2, /every girl on your roster|linked girls eat|one girl's enrollment/i);
  const resIdx = read('src/textEngine/scenes/v2/resonance/index.js');
  const resDepth = read('src/textEngine/scenes/v2/resonance/depth.js');
  assert.doesNotMatch(resIdx, /linked girls|no single girl/i);
  assert.doesNotMatch(resDepth, /linked girls|no single girl/i);
  assert.match(resDepth, /linked residents/);
});

check('ra-setup-wizard-polish', () => {
  const css = read('src/index.css');
  assert.match(css, /\.ra-setup-shell/);
  assert.match(css, /\.ra-setup-primary-btn:focus-visible/);
  const wizard = read('src/components/RaSetupWizard.jsx');
  assert.match(wizard, /className="ra-setup-panel"/);
  assert.match(wizard, /className="ra-setup-primary-btn"/);
});

check('resident-framing-ui', () => {
  const desk = read('src/HallPass.jsx');
  assert.match(desk, /SELECT RESIDENTS/);
  assert.match(desk, /residents for dinner/);
  assert.match(desk, /resident bristles|residents bristle/);
  assert.match(desk, /Something wrong\? Shift Log/);
  assert.doesNotMatch(desk, /SELECT GIRLS|girls to take to dinner|girl bristles|girls bristle|Field Notes/i);
  const trees = read('src/gameData/skillTrees.js');
  assert.match(trees, /for all residents/);
  assert.doesNotMatch(trees, /\b(girl|girls)\b/);
  const setup = read('src/components/RaSetupWizard.jsx');
  assert.match(setup, /build the resident who/);
  const bugReport = read('src/components/BugReportModal.jsx');
  assert.match(bugReport, /SHIFT LOG/);
  assert.match(bugReport, /SHIFT_LOG_CATEGORIES/);
  assert.doesNotMatch(bugReport, /FIELD NOTES|Field Note downloaded/i);
  const bugReportData = read('src/gameData/bugReport.js');
  assert.match(bugReportData, /shift-log-week-/);
  assert.doesNotMatch(bugReportData, /field-note-week-/i);
  assert.match(bugReportData, /SHIFT LOG/);
  const campus = read('src/textEngine/scenes/campusSoftening.js');
  assert.match(campus, /Hall log: residents across campus trending heavier/);
  assert.doesNotMatch(campus, /Field notes: subjects across campus/i);
  const content = read('src/gameData/content.js');
  assert.match(content, /published hall log, a defended season report chapter/);
  assert.doesNotMatch(content, /published field notes, a defended season report/i);
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
