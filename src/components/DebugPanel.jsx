import { useState } from 'react';
import { C } from '../styles.js';
import { LILITH_ID } from '../gameData/lilith.js';
import { render, createContext, getSeason, relSize, _registryEntries } from '../textEngine/engine.js';
import { renderHiveIntake } from '../textEngine/scenes/hiveIntake.js';
import { DialogueLab } from './DialogueLab.jsx';
import { BugReportModal } from './BugReportModal.jsx';
import { useTextFlags } from '../contexts/TextFlagContext.jsx';
import { useTextFlagLog } from '../hooks/useTextFlagLog.js';
import { clearTextFlags, downloadTextFlagsTxt } from '../gameData/textFlagStore.js';
import { buildGameSnapshot, serializeBugReport } from '../gameData/bugReport.js';
import { defaultOppositionState } from '../gameData/opposition.js';
import { dormUnlocksForWeek } from '../gameData/dorms.js';
import { defaultSalonState } from '../gameData/chloeSalon.js';
import { defaultGalleryState } from '../gameData/fionaGallery.js';
import { SISTER_INITIAL_STATE, CAMILLE_INITIAL_LBS } from '../gameData/chapterHostess.js';
import { TESTER_START_LBS } from '../gameData/cultivator.js';
import { defaultPharmacistState } from '../gameData/pharmacist.js';
import { createInitialHiveState } from '../gameData/mayaHive.js';
import { defaultLabState, defaultDeviceInventory } from '../gameData/talia.js';
import { ensureStreamFields } from '../gameData/streaming.js';
import { toggleInstantText, toggleSound } from '../gameData/playerPrefs.js';
import { INNER_CIRCLE_TIERS, TIER_SCENES } from '../gameData/sessions.js';
import { EVOLUTION_OFFER } from '../gameData/evolvedForms.js';
import { ModalOverlay } from './ModalOverlay.jsx';

if (typeof window !== 'undefined' && import.meta.env.DEV) {
  window.__textEngine = { render, createContext, getSeason, relSize };
}

function sampleTextEngine() {
  const out = [];
  const combos = [
    { lilithLbs: 110, victimLbs: 380, corruption: 0, week: 6, label: 'tiny Lilith / huge victims / winter' },
    { lilithLbs: 820, victimLbs: 150, corruption: 90, week: 14, label: 'colossal Lilith / thin victims / summer' },
    { lilithLbs: 200, victimLbs: 210, corruption: 40, week: 2, label: 'average Lilith / similar victims / fall' },
    { lilithLbs: 340, victimLbs: 340, corruption: 90, week: 10, label: 'heavy Lilith / heavy victims / spring' },
    { lilithLbs: 140, victimLbs: 90, corruption: 0, week: 7, label: 'small Lilith / tiny victims / winter' },
    { lilithLbs: 520, victimLbs: 600, corruption: 40, week: 15, label: 'massive both / summer' },
  ];
  for (const c of combos) {
    const lilith = { name: 'Lilith', lbs: c.lilithLbs, corruption: c.corruption, bodyType: 'hourglass', relationship: 50 };
    const victims = [
      { name: 'a dorm resident', lbs: c.victimLbs, bodyType: 'pear', corruption: 0, relationship: 0 },
      { name: 'a dorm resident', lbs: c.victimLbs, bodyType: 'apple', corruption: 0, relationship: 0 },
    ];
    out.push(`── ${c.label} (season: ${getSeason(c.week)}) ──\n${renderHiveIntake(lilith, victims, c.week)}`);
  }
  return out.join('\n\n');
}

const TABS = ['state', 'opposition', 'notes'];

export function DebugPanel({
  adminScrutiny,
  ap,
  debugApply,
  debugInputs,
  setAdminScrutiny,
  setAp,
  setOwnedSkills,
  setOwnedHallSkills,
  setSalonState,
  setGalleryState,
  setCompetitiveGainerState,
  setChapterHostessState,
  setCommunityResearcherState,
  setCultivatorState,
  setPharmacistState,
  setMayaHiveState,
  setLabState,
  setDeviceInventory,
  setMilestoneQueue,
  setWeekRecap,
  setPresentationState,
  setTierUpModal,
  setHungerInterrupt,
  setAscensionCeremony,
  setEvolutionModal,
  setSelectedId,
  setDebugInputs,
  setDebugOpen,
  setLilithUnlocked,
  setStudents,
  students,
  opposition,
  setOpposition,
  setHearingState,
  week,
  setWeek,
  startDormId,
  unlockedDorms,
  setUnlockedDorms,
  money,
  view,
  setView,
  log,
  lastPlayerAction,
  getSnapshotContext,
  getSaveContext,
  campusState,
  pharmacistState,
  eventQueueLen,
  instantText = false,
  onInstantTextChange,
  soundEnabled = true,
  onSoundEnabledChange,
}) {
  const { enabled: textFlagsOn, setEnabled: setTextFlagsOn } = useTextFlags();
  const savedFlags = useTextFlagLog();
  const [textSample, setTextSample] = useState(null);
  const [labOpen, setLabOpen] = useState(false);
  const [flagExportMsg, setFlagExportMsg] = useState('');
  const [tab, setTab] = useState('state');
  const [notesPreview, setNotesPreview] = useState(null);
  const [fieldNotesOpen, setFieldNotesOpen] = useState(false);
  const [scandalInput, setScandalInput] = useState(opposition?.aib?.scandalMeter ?? 0);
  const [hearingStudentId, setHearingStudentId] = useState(students.find((s) => !s.hidden)?.id ?? 1);

  const patchOpposition = (fn) => {
    setOpposition((prev) => fn(prev || defaultOppositionState()));
  };

  const syncDormUnlocks = (targetWeek = week) => {
    if (!startDormId || !setUnlockedDorms) return;
    const open = new Set(unlockedDorms || []);
    open.add(startDormId);
    for (const id of dormUnlocksForWeek(targetWeek, startDormId)) open.add(id);
    setUnlockedDorms([...open]);
  };

  return (
    <ModalOverlay onClose={() => setDebugOpen(false)} soundEnabled={soundEnabled} style={{ alignItems: 'flex-start', paddingTop: 16, overflowY: 'auto', zIndex: 390 }}>
      <div style={{ ...C.modal, maxWidth: 720, width: '95%', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: '#60b060' }}>🐛 DEBUG CONSOLE</div>
          <button type="button" style={C.btn('#333')} onClick={() => setDebugOpen(false)}>✕ Close</button>
        </div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              style={{ ...C.smBtn, background: tab === t ? 'rgba(60,100,60,0.5)' : 'rgba(40,40,40,0.4)', fontSize: 10 }}
              onClick={() => setTab(t)}
            >
              {t === 'state' ? 'State' : t === 'opposition' ? 'Opposition' : 'Shift Log'}
            </button>
          ))}
        </div>

        {tab === 'state' && (
          <>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14, padding: 10, background: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>
              <div style={{ fontSize: 10, color: '#888', width: '100%', marginBottom: 4 }}>GLOBAL · Week {week}</div>
              {setWeek && (
                <label style={{ fontSize: 11, color: '#aaa', display: 'flex', gap: 6, alignItems: 'center' }}>
                  Week:
                  <input type="number" defaultValue={week} min={1} max={52} step={1}
                    style={{ width: 48, background: '#181820', color: '#e0e0e0', border: '1px solid #444', borderRadius: 4, padding: '2px 4px', fontSize: 11 }}
                    onChange={(e) => setWeek(Math.max(1, parseInt(e.target.value, 10) || 1))} />
                </label>
              )}
              {setWeek && (
                <>
                  {[8, 12, 16].map((w) => (
                    <button key={w} type="button" style={{ ...C.smBtn, background: 'rgba(74,122,232,0.35)', fontSize: 10 }}
                      onClick={() => { setWeek(w); syncDormUnlocks(w); }}>
                      Jump wk {w}
                    </button>
                  ))}
                  {setUnlockedDorms && startDormId && (
                    <button type="button" style={{ ...C.smBtn, background: 'rgba(232,93,74,0.35)', fontSize: 10 }}
                      onClick={() => syncDormUnlocks()}>
                      Sync hall unlocks
                    </button>
                  )}
                </>
              )}
              <label style={{ fontSize: 11, color: '#aaa', display: 'flex', gap: 6, alignItems: 'center' }}>
                AP:
                <input type="number" defaultValue={ap} min={0} max={999} step={5}
                  style={{ width: 60, background: '#181820', color: '#e0e0e0', border: '1px solid #444', borderRadius: 4, padding: '2px 4px', fontSize: 11 }}
                  onChange={(e) => setAp(parseInt(e.target.value, 10) || 0)} />
              </label>
              <label style={{ fontSize: 11, color: '#aaa', display: 'flex', gap: 6, alignItems: 'center' }}>
                Scrutiny:
                <input type="number" defaultValue={adminScrutiny} min={0} max={100} step={5}
                  style={{ width: 55, background: '#181820', color: '#e0e0e0', border: '1px solid #444', borderRadius: 4, padding: '2px 4px', fontSize: 11 }}
                  onChange={(e) => setAdminScrutiny(parseInt(e.target.value, 10) || 0)} />
              </label>
              <button type="button" style={{ ...C.smBtn, background: 'rgba(60,100,60,0.4)' }}
                onClick={() => setStudents((prev) => prev.map((s) => ({ ...s, relationship: 100 })))}>Max All Rel</button>
              <button type="button" style={{ ...C.smBtn, background: 'rgba(80,0,100,0.4)' }}
                onClick={() => setLilithUnlocked(true)}>🌑 Unlock Lilith</button>
              {setOwnedSkills && (
                <button type="button" style={{ ...C.smBtn, background: 'rgba(90,50,140,0.55)' }}
                  onClick={() => {
                    setOwnedSkills((prev) => ({ ...prev, resident_ride: 1, deep_ride: 1 }));
                    setAp((a) => Math.max(a, 20));
                    setView('influence');
                  }}>
                  🌒 Floor Influence QA
                </button>
              )}
              {setOwnedHallSkills && (
                <button type="button" style={{ ...C.smBtn, background: 'rgba(120,70,30,0.55)' }}
                  onClick={() => {
                    setOwnedHallSkills((prev) => ({
                      ...prev,
                      dinner_basic: true,
                      relationship_class: true,
                      group_dynamics: true,
                    }));
                    setAp((a) => Math.max(a, 20));
                    setView('actions');
                  }}>
                  🍽️ Dinner QA
                </button>
              )}
              {setMilestoneQueue && (
                <button type="button" style={{ ...C.smBtn, background: 'rgba(120,90,20,0.55)' }}
                  onClick={() => {
                    setMilestoneQueue({
                      events: [{
                        id: 1,
                        name: 'Cassidy',
                        stageLabel: 'Heavy',
                        gainLbs: 42,
                        endLbs: 240,
                        prose: 'The threshold shows in how she fills a desk chair now — heavier, softer, unmistakably past the line she crossed this week on your floor.',
                        traceNodes: [],
                      }],
                      index: 0,
                    });
                    setDebugOpen(false);
                  }}>
                  ⚖️ Milestone QA
                </button>
              )}
              {setWeekRecap && (
                <button type="button" style={{ ...C.smBtn, background: 'rgba(80,40,120,0.55)' }}
                  onClick={() => {
                    setWeekRecap({
                      week: 3,
                      movers: [{
                        id: 1,
                        name: 'Cassidy',
                        lbsGained: 12,
                        stagedUp: true,
                        stuffed: false,
                        prose: 'Cassidy crossed into Heavy this week — the hall felt it before the scale confirmed.',
                        totalGained: 24,
                        journeyStages: 1,
                        startStageLabel: 'Plump',
                        stageLabel: 'Heavy',
                      }],
                      extras: [],
                    });
                    setDebugOpen(false);
                  }}>
                  📅 Week Recap QA
                </button>
              )}
              {setPresentationState && setSelectedId && (
                <button type="button" style={{ ...C.smBtn, background: 'rgba(30,60,100,0.55)' }}
                  onClick={() => {
                    setStudents((prev) => prev.map((s) => (
                      s.id === 1
                        ? { ...s, evolvedForm: 'community_researcher', lbs: 200, relationship: 50, mood: 'focused' }
                        : s
                    )));
                    setPresentationState({ studentId: 1, stageIdx: 0 });
                    setDebugOpen(false);
                  }}>
                  📊 Presentation QA
                </button>
              )}
              {setEvolutionModal && (
                <button type="button" style={{ ...C.smBtn, background: 'rgba(50,20,90,0.55)' }}
                  onClick={() => {
                    const subject = students.find((s) => s.id === 1) || { id: 1, name: 'Cassidy', archetype: 'swimmer', lbs: 220, relationship: 65, startLbs: 130 };
                    const offer = EVOLUTION_OFFER[subject.archetype] || EVOLUTION_OFFER.swimmer;
                    const archPaths = offer.paths;
                    setEvolutionModal({
                      student: subject,
                      intro: offer.intro(subject),
                      paths: Object.keys(archPaths).map((k) => ({
                        id: k,
                        label: archPaths[k].label,
                        desc: archPaths[k].desc,
                      })),
                    });
                    setDebugOpen(false);
                  }}>
                  ✦ Evolution QA
                </button>
              )}
              {setTierUpModal && (
                <button type="button" style={{ ...C.smBtn, background: 'rgba(70,30,110,0.55)' }}
                  onClick={() => {
                    const subject = students.find((s) => s.id === 1) || { id: 1, name: 'Cassidy', archetype: 'swimmer', lbs: 200, relationship: 72 };
                    const scenes = TIER_SCENES[subject.archetype] || TIER_SCENES.quiet;
                    const sceneFn = scenes[1];
                    setTierUpModal({
                      student: subject,
                      oldTier: INNER_CIRCLE_TIERS[1],
                      newTier: INNER_CIRCLE_TIERS[2],
                      scene: sceneFn ? sceneFn(subject) : `${subject.name} crosses into Intimate tier on your floor.`,
                    });
                    setDebugOpen(false);
                  }}>
                  💜 Tier-Up QA
                </button>
              )}
              {setHungerInterrupt && (
                <button type="button" style={{ ...C.smBtn, background: 'rgba(110,30,50,0.55)' }}
                  onClick={() => {
                    setStudents((prev) => prev.map((s) => (
                      s.id === 1 ? { ...s, hungerTier: 3, addictionLevel: 2, lbs: 200 } : s
                    )));
                    setHungerInterrupt({ studentId: 1, after: 'resume' });
                    setDebugOpen(false);
                  }}>
                  🍽️ Hunger Interrupt QA
                </button>
              )}
              {setAscensionCeremony && (
                <button type="button" style={{ ...C.smBtn, background: 'rgba(20,70,90,0.55)' }}
                  onClick={() => {
                    setStudents((prev) => prev.map((s) => (
                      s.id === 1
                        ? {
                          ...s,
                          lbs: 850,
                          ascensionPending: { formId: 'sphinx', stirringWeeks: 2, ceremonyReady: true, declinedWeek: null },
                        }
                        : s
                    )));
                    setAscensionCeremony({
                      studentId: 1,
                      prose: 'The threshold is not a number anymore. Cassidy has become the kind of weight that rewrites a floor\'s gravity — and she is asking you to witness what comes next.',
                      traceNodes: [],
                    });
                    setDebugOpen(false);
                  }}>
                  ✦ Ascension QA
                </button>
              )}
              {setSelectedId && (
                <>
                  <button type="button" style={{ ...C.smBtn, background: 'rgba(140,30,30,0.55)' }}
                    onClick={() => {
                      setStudents((prev) => prev.map((s) => (
                        s.id === 1
                          ? { ...s, evolvedForm: 'sumo', lbs: 260, relationship: 60, mood: 'focused' }
                          : s
                      )));
                      setAp((a) => Math.max(a, 20));
                      setSelectedId(1);
                      setView('student');
                    }}>
                    🥋 Sumo Arc QA
                  </button>
                  <button type="button" style={{ ...C.smBtn, background: 'rgba(160,20,40,0.55)' }}
                    onClick={() => {
                      setStudents((prev) => prev.map((s) => (
                        s.id === 5
                          ? {
                            ...ensureStreamFields(s),
                            evolvedForm: 'eating_streamer',
                            brand: 'crunchforge',
                            lbs: 258,
                            relationship: 60,
                            mood: 'tired',
                          }
                          : s
                      )));
                      setAp((a) => Math.max(a, 20));
                      setSelectedId(5);
                      setView('student');
                    }}>
                    📡 Stream Arc QA
                  </button>
                  <button type="button" style={{ ...C.smBtn, background: 'rgba(100,20,50,0.55)' }}
                    onClick={() => {
                      setStudents((prev) => prev.map((s) => (
                        s.id === 9
                          ? { ...s, evolvedForm: 'salon_appetit', lbs: 200, relationship: 60, mood: 'bemused' }
                          : s
                      )));
                      setSalonState?.(defaultSalonState(9));
                      setAp((a) => Math.max(a, 20));
                      setSelectedId(9);
                      setView('student');
                    }}>
                    🥂 Salon Arc QA
                  </button>
                  <button type="button" style={{ ...C.smBtn, background: 'rgba(120,60,20,0.55)' }}
                    onClick={() => {
                      setStudents((prev) => prev.map((s) => (
                        s.id === 4
                          ? { ...s, evolvedForm: 'artisan_gallery', lbs: 200, relationship: 60, mood: 'content' }
                          : s
                      )));
                      setGalleryState?.(defaultGalleryState(4));
                      setAp((a) => Math.max(a, 20));
                      setSelectedId(4);
                      setView('student');
                    }}>
                    🖼 Gallery Arc QA
                  </button>
                  <button type="button" style={{ ...C.smBtn, background: 'rgba(180,20,50,0.55)' }}
                    onClick={() => {
                      setStudents((prev) => prev.map((s) => (
                        s.id === 7
                          ? { ...s, evolvedForm: 'competitive_gainer', lbs: 200, relationship: 60, mood: 'stressed' }
                          : s
                      )));
                      setCompetitiveGainerState?.({
                        priyaStudentId: 7,
                        drive: 0,
                        chatLog: [],
                        measuredStudentIds: [],
                        measuredComparisons: {},
                        lastChatWeek: week,
                        corkboardVisitCount: 0,
                      });
                      setAp((a) => Math.max(a, 20));
                      setSelectedId(7);
                      setView('student');
                    }}>
                    📊 CG Arc QA
                  </button>
                  <button type="button" style={{ ...C.smBtn, background: 'rgba(140,80,30,0.55)' }}
                    onClick={() => {
                      setStudents((prev) => prev.map((s) => (
                        s.id === 13
                          ? { ...s, evolvedForm: 'homeroom_queen', lbs: 200, relationship: 60, mood: 'warm' }
                          : s
                      )));
                      setAp((a) => Math.max(a, 20));
                      setSelectedId(13);
                      setView('student');
                    }}>
                    🍪 Hall Kitchen Arc QA
                  </button>
                  <button type="button" style={{ ...C.smBtn, background: 'rgba(80,30,120,0.55)' }}
                    onClick={() => {
                      setStudents((prev) => prev.map((s) => (
                        s.id === 6
                          ? { ...s, evolvedForm: 'chapter_hostess', lbs: 200, relationship: 60, mood: 'happy' }
                          : s
                      )));
                      setChapterHostessState?.({
                        stageIdx: 0,
                        prepDaysLeft: 3,
                        menuUnlocks: 0,
                        atmosphereUnlocks: 0,
                        guestUnlocks: 0,
                        sisters: SISTER_INITIAL_STATE.map((x) => ({ ...x })),
                        camille: { lbs: CAMILLE_INITIAL_LBS },
                        hangoutOpen: false,
                        hangoutStudentId: null,
                        hangoutPhaseIdx: 0,
                        hangoutHistory: [],
                        feastPrepOpen: false,
                        feastLogOpen: false,
                        feastLog: [],
                        feastGainTotal: 0,
                        feastRelTotal: 0,
                        feastDone: false,
                      });
                      setAp((a) => Math.max(a, 20));
                      setSelectedId(6);
                      setView('student');
                    }}>
                    ✦ Hostess Arc QA
                  </button>
                  <button type="button" style={{ ...C.smBtn, background: 'rgba(50,80,140,0.55)' }}
                    onClick={() => {
                      setStudents((prev) => prev.map((s) => (
                        s.id === 1
                          ? { ...s, evolvedForm: 'community_researcher', lbs: 200, relationship: 60, mood: 'focused' }
                          : s
                      )));
                      setCommunityResearcherState?.({
                        thesisComplete: false,
                        boardPhase: 0,
                        caseStudyStage: 0,
                        lastPairId: null,
                        pairsUsed: [],
                        modalPhase: null,
                        activePairId: null,
                        eventText: null,
                        totalSuspicion: 0,
                        boardReactionPairId: null,
                        chatMemberIdx: 0,
                        chatPhaseIdx: 0,
                        chatHistory: [],
                        chatWon: [],
                        thesisApproved: false,
                        thesisRejected: false,
                        finalReviewText: null,
                      });
                      setAp((a) => Math.max(a, 20));
                      setSelectedId(1);
                      setView('student');
                    }}>
                    🏊 Lane Captain Arc QA
                  </button>
                  <button type="button" style={{ ...C.smBtn, background: 'rgba(100,50,20,0.55)' }}
                    onClick={() => {
                      setStudents((prev) => prev.map((s) => (
                        s.id === 10
                          ? { ...s, evolvedForm: 'cultivator', lbs: 200, relationship: 60, mood: 'focused' }
                          : s
                      )));
                      setCultivatorState?.({
                        testerName: null,
                        testerStageId: 6,
                        testerLbs: TESTER_START_LBS,
                        fatBar: 0,
                        suspicion: 0,
                        harvestsCompleted: 0,
                        usedNames: [],
                        modalPhase: null,
                        session: null,
                        pendingStageUp: false,
                        harvestType: null,
                        harvestVignetteText: null,
                        growthGain: 0,
                        growthVignetteText: null,
                        digestWeeksLeft: 0,
                        digestTotalWeeks: 0,
                      });
                      setAp((a) => Math.max(a, 20));
                      setSelectedId(10);
                      setView('student');
                    }}>
                    🍰 Cultivator Arc QA
                  </button>
                  <button type="button" style={{ ...C.smBtn, background: 'rgba(30,90,70,0.55)' }}
                    onClick={() => {
                      setStudents((prev) => prev.map((s) => (
                        s.id === 16
                          ? { ...s, evolvedForm: 'pharmacist', lbs: 200, relationship: 60, mood: 'stressed' }
                          : s
                      )));
                      setPharmacistState?.(defaultPharmacistState());
                      setAp((a) => Math.max(a, 20));
                      setSelectedId(16);
                      setView('student');
                    }}>
                    🧪 Pharmacist Arc QA
                  </button>
                  <button type="button" style={{ ...C.smBtn, background: 'rgba(90,40,120,0.55)' }}
                    onClick={() => {
                      setStudents((prev) => prev.map((s) => (
                        s.id === 8
                          ? { ...s, evolvedForm: 'delivery_hive', lbs: 200, relationship: 60, mood: 'content' }
                          : s
                      )));
                      setMayaHiveState?.(createInitialHiveState(8));
                      setAp((a) => Math.max(a, 20));
                      setSelectedId(8);
                      setView('student');
                    }}>
                    🕸️ Hive Arc QA
                  </button>
                  <button type="button" style={{ ...C.smBtn, background: 'rgba(100,20,50,0.55)' }}
                    onClick={() => {
                      setStudents((prev) => prev.map((s) => (
                        s.id === 14
                          ? { ...s, evolvedForm: 'wife_lessons', lbs: 200, relationship: 60, mood: 'cheerful' }
                          : s
                      )));
                      setAp((a) => Math.max(a, 20));
                      setSelectedId(14);
                      setView('student');
                    }}>
                    🍷 Wife Lessons Arc QA
                  </button>
                  <button type="button" style={{ ...C.smBtn, background: 'rgba(30,50,80,0.55)' }}
                    onClick={() => {
                      setStudents((prev) => prev.map((s) => (
                        s.id === 18
                          ? { ...s, evolvedForm: 'machine_goddess', lbs: 200, relationship: 60, mood: 'focused' }
                          : s
                      )));
                      setLabState?.(defaultLabState());
                      setDeviceInventory?.(defaultDeviceInventory());
                      setAp((a) => Math.max(a, 20));
                      setSelectedId(18);
                      setView('student');
                    }}>
                    🔧 Machine Goddess Arc QA
                  </button>
                  <button type="button" style={{ ...C.smBtn, background: 'rgba(120,80,20,0.55)' }}
                    onClick={() => {
                      setStudents((prev) => prev.map((s) => (
                        s.id === 14
                          ? { ...s, evolvedForm: 'state_fair_queen', lbs: 200, relationship: 60, mood: 'cheerful' }
                          : s
                      )));
                      setAp((a) => Math.max(a, 20));
                      setSelectedId(14);
                      setView('student');
                    }}>
                    🎡 State Fair Arc QA
                  </button>
                  <button type="button" style={{ ...C.smBtn, background: 'rgba(60,40,90,0.55)' }}
                    onClick={() => {
                      setStudents((prev) => prev.map((s) => {
                        if (s.id === 12) {
                          return { ...s, evolvedForm: 'psych_researcher', lbs: 200, relationship: 60, mood: 'observant', researchSubjectId: 1 };
                        }
                        if (s.id === 1) return { ...s, relationship: 60 };
                        return s;
                      }));
                      setAp((a) => Math.max(a, 20));
                      setSelectedId(12);
                      setView('student');
                    }}>
                    📋 Psych Researcher Arc QA
                  </button>
                  <button type="button" style={{ ...C.smBtn, background: 'rgba(80,30,100,0.55)' }}
                    onClick={() => {
                      setStudents((prev) => prev.map((s) => {
                        if (s.id === 2) {
                          return { ...s, evolvedForm: 'feedee_creator', lbs: 200, relationship: 60, mood: 'excited' };
                        }
                        if (s.id === 5) return { ...s, relationship: 80 };
                        return s;
                      }));
                      setAp((a) => Math.max(a, 20));
                      setSelectedId(2);
                      setView('student');
                    }}>
                    📸 Feedee Creator Arc QA
                  </button>
                  <button type="button" style={{ ...C.smBtn, background: 'rgba(20,50,90,0.55)' }}
                    onClick={() => {
                      setStudents((prev) => prev.map((s) => (
                        s.id === 5
                          ? { ...s, evolvedForm: 'ranked_feedee', lbs: 200, relationship: 60, mood: 'tired' }
                          : s
                      )));
                      setAp((a) => Math.max(a, 20));
                      setSelectedId(5);
                      setView('student');
                    }}>
                    🎮 Ranked Feedee Arc QA
                  </button>
                  <button type="button" style={{ ...C.smBtn, background: 'rgba(40,70,40,0.55)' }}
                    onClick={() => {
                      setStudents((prev) => prev.map((s) => (
                        s.id === 8
                          ? { ...s, evolvedForm: 'home_nest', lbs: 200, relationship: 60, mood: 'content' }
                          : s
                      )));
                      setAp((a) => Math.max(a, 20));
                      setSelectedId(8);
                      setView('student');
                    }}>
                    🍜 Home Nest Arc QA
                  </button>
                  <button type="button" style={{ ...C.smBtn, background: 'rgba(90,70,20,0.55)' }}
                    onClick={() => {
                      setStudents((prev) => prev.map((s) => (
                        s.id === 9
                          ? { ...s, evolvedForm: 'campus_legend', lbs: 200, relationship: 60, mood: 'bemused' }
                          : s
                      )));
                      setAp((a) => Math.max(a, 20));
                      setSelectedId(9);
                      setView('student');
                    }}>
                    🍺 Campus Legend Arc QA
                  </button>
                  <button type="button" style={{ ...C.smBtn, background: 'rgba(30,60,120,0.55)' }}
                    onClick={() => {
                      setStudents((prev) => prev.map((s) => (
                        s.id === 0
                          ? { ...s, evolvedForm: 'eating_captain', lbs: 200, relationship: 60, mood: 'happy' }
                          : s
                      )));
                      setAp((a) => Math.max(a, 20));
                      setSelectedId(0);
                      setView('student');
                    }}>
                    🏆 Eating Captain Arc QA
                  </button>
                  <button type="button" style={{ ...C.smBtn, background: 'rgba(80,50,30,0.55)' }}
                    onClick={() => {
                      setStudents((prev) => prev.map((s) => (
                        s.id === 14
                          ? { ...s, evolvedForm: 'homestead_queen', lbs: 200, relationship: 60, mood: 'cheerful' }
                          : s
                      )));
                      setAp((a) => Math.max(a, 20));
                      setSelectedId(14);
                      setView('student');
                    }}>
                    🏡 Homestead Queen Arc QA
                  </button>
                </>
              )}
              <button type="button" style={{ ...C.smBtn, background: 'rgba(60,30,0,0.5)' }}
                onClick={() => setStudents((prev) => prev.map((s) => (s.id === LILITH_ID ? s : { ...s, lbs: 300 })))}>⚖️ All 300 lbs</button>
            </div>
            <div style={{ marginBottom: 14, padding: 10, background: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>
              <div style={{ fontSize: 10, color: '#888', marginBottom: 6 }}>TEXT ENGINE — {_registryEntries().length} modules</div>
              <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 11, color: '#b0a890', marginBottom: 8, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={textFlagsOn}
                  onChange={(e) => setTextFlagsOn(e.target.checked)}
                />
                🚩 Text flags on popups (growth, narrative, talk, weigh-in…)
              </label>
              <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 11, color: '#b0a890', marginBottom: 8, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={!!instantText}
                  onChange={() => onInstantTextChange?.(toggleInstantText().instantText)}
                />
                ⚡ Instant scene text (skip beat reveal)
              </label>
              <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 11, color: '#b0a890', marginBottom: 8, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={soundEnabled !== false}
                  onChange={() => onSoundEnabledChange?.(toggleSound().soundEnabled)}
                />
                🔊 Hall unlock chime (Web Audio)
              </label>
              <button type="button" style={{ ...C.smBtn, background: 'rgba(100,60,140,0.4)' }}
                onClick={() => setTextSample(sampleTextEngine())}>📜 Sample hive intake</button>
              <button type="button" style={{ ...C.smBtn, background: 'rgba(60,100,140,0.4)', marginLeft: 6 }}
                onClick={() => setLabOpen(true)}>🎲 Dialogue Lab</button>
              <button type="button" style={{ ...C.smBtn, background: 'rgba(100,140,60,0.4)', marginLeft: 6 }}
                onClick={() => { setDebugOpen(false); setView('sprite-test'); }}>🎨 Sprite Test</button>
              <div style={{ marginTop: 10, paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: 10, color: '#888', marginBottom: 6 }}>
                  DIALOGUE FLAG LOG · {savedFlags.length} saved entr{savedFlags.length === 1 ? 'y' : 'ies'}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
                  <button
                    type="button"
                    style={{ ...C.smBtn, background: savedFlags.length ? 'rgba(90,70,40,0.55)' : 'rgba(40,40,40,0.4)' }}
                    disabled={!savedFlags.length}
                    onClick={() => {
                      const ok = downloadTextFlagsTxt({ week });
                      setFlagExportMsg(ok ? 'Downloaded dialogue-flags .txt' : 'No saved flags to export');
                      setTimeout(() => setFlagExportMsg(''), 2500);
                    }}
                  >
                    ⬇ Download flag log (.txt)
                  </button>
                  <button
                    type="button"
                    style={{ ...C.smBtn, background: 'rgba(80,40,40,0.35)' }}
                    disabled={!savedFlags.length}
                    onClick={() => {
                      if (!window.confirm(`Clear all ${savedFlags.length} saved dialogue flags?`)) return;
                      clearTextFlags();
                      setFlagExportMsg('Flag log cleared');
                      setTimeout(() => setFlagExportMsg(''), 2500);
                    }}
                  >
                    Clear log
                  </button>
                  {flagExportMsg && (
                    <span style={{ fontSize: 10, color: '#c9a060' }}>{flagExportMsg}</span>
                  )}
                </div>
                <div style={{ fontSize: 9, color: '#666', marginTop: 6, lineHeight: 1.45 }}>
                  Popup 🚩 saves and Dialogue Lab 💾 Save flag append here (persists across sessions). Export when ready for tuning.
                </div>
              </div>
              {labOpen && <DialogueLab onClose={() => setLabOpen(false)} />}
              {textSample && (
                <pre style={{ fontSize: 10, color: '#c8b8e0', whiteSpace: 'pre-wrap', lineHeight: 1.6, marginTop: 8, maxHeight: 240, overflowY: 'auto', background: 'rgba(0,0,0,0.3)', padding: 8, borderRadius: 6 }}>
                  {textSample}
                </pre>
              )}
            </div>
            <div style={{ fontSize: 10, color: '#888', marginBottom: 6 }}>STUDENTS</div>
            {students.map((s) => {
              const inp = debugInputs[s.id] || { lbs: String(Math.round(s.lbs)), rel: s.relationship };
              const set = (k, v) => setDebugInputs((prev) => ({ ...prev, [s.id]: { ...inp, [k]: v } }));
              return (
                <div key={s.id} style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap', padding: '7px 8px', borderRadius: 6, marginBottom: 4, background: 'rgba(255,255,255,0.03)' }}>
                  <div style={{ fontSize: 11, color: '#c0a0e0', minWidth: 90, fontWeight: 700 }}>{s.name}</div>
                  <label style={{ fontSize: 10, color: '#888', display: 'flex', gap: 4, alignItems: 'center' }}>
                    lbs:
                    <input type="number" value={inp.lbs} min={80} step={100}
                      style={{ width: 70, background: '#181820', color: '#e0e0e0', border: '1px solid #444', borderRadius: 4, padding: '2px 4px', fontSize: 10 }}
                      onChange={(e) => set('lbs', e.target.value)} />
                  </label>
                  <label style={{ fontSize: 10, color: '#888', display: 'flex', gap: 4, alignItems: 'center' }}>
                    rel:
                    <input type="number" value={inp.rel} min={0} max={100} step={10}
                      style={{ width: 48, background: '#181820', color: '#e0e0e0', border: '1px solid #444', borderRadius: 4, padding: '2px 4px', fontSize: 10 }}
                      onChange={(e) => set('rel', e.target.value)} />
                  </label>
                  <button type="button" style={{ ...C.smBtn, background: 'rgba(40,80,40,0.5)', fontSize: 10 }} onClick={() => debugApply(s.id)}>Apply ✓</button>
                </div>
              );
            })}
          </>
        )}

        {tab === 'opposition' && (
          <div style={{ padding: 10, background: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>
            <div style={{ fontSize: 10, color: '#c88', marginBottom: 10 }}>OPPOSITION LAB (§36)</div>
            <div style={{ fontSize: 11, color: '#aaa', marginBottom: 8 }}>
              AIB {opposition?.aib?.unlocked ? 'unlocked' : 'locked'} · Scandal {opposition?.aib?.scandalMeter ?? 0} · Scarcity {opposition?.supernatural?.scarcityPressure ?? 0}
            </div>
            <label style={{ fontSize: 11, color: '#aaa', display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
              Scandal meter:
              <input type="range" min={0} max={100} value={scandalInput}
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10);
                  setScandalInput(v);
                  patchOpposition((o) => ({ ...o, aib: { ...o.aib, scandalMeter: v } }));
                }} />
              {scandalInput}
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
              <button type="button" style={{ ...C.smBtn, background: 'rgba(80,40,40,0.5)' }}
                onClick={() => patchOpposition((o) => ({ ...o, aib: { ...o.aib, unlocked: true } }))}>Unlock AIB</button>
              <button type="button" style={{ ...C.smBtn, background: 'rgba(80,40,40,0.5)' }}
                onClick={() => setAdminScrutiny((s) => Math.min(100, s + 10))}>+10 Scrutiny</button>
              <button type="button" style={{ ...C.smBtn, background: 'rgba(80,40,40,0.5)' }}
                onClick={() => patchOpposition((o) => ({ ...o, aib: { ...o.aib, agendaQueue: [] } }))}>Clear agenda</button>
              <button type="button" style={{ ...C.smBtn, background: 'rgba(100,60,80,0.5)' }}
                onClick={() => {
                  if (!window.confirm('Fire Supernatural Act? Irreversible for this save.')) return;
                  patchOpposition((o) => ({
                    ...o,
                    supernatural: { ...o.supernatural, actTriggered: true, actWeek: week, scarcityPressure: 25, ascensionOffered: false },
                  }));
                }}>Fire Supernatural Act</button>
            </div>
            <div style={{ fontSize: 10, color: '#888', marginBottom: 6 }}>Queue removal hearing</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
              <select value={hearingStudentId} onChange={(e) => setHearingStudentId(parseInt(e.target.value, 10))}
                style={{ background: '#181820', color: '#ddd', border: '1px solid #444', borderRadius: 4, fontSize: 11 }}>
                {students.filter((s) => !s.hidden).map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
              <button type="button" style={{ ...C.smBtn, background: 'rgba(80,50,30,0.5)' }}
                onClick={() => patchOpposition((o) => ({
                  ...o,
                  aib: { ...o.aib, pendingHearing: { studentId: hearingStudentId, resolvesWeek: null } },
                }))}>Queue hearing</button>
              <button type="button" style={{ ...C.smBtn, background: 'rgba(80,50,30,0.5)' }}
                onClick={() => setHearingState?.({
                  type: 'emergency', studentId: null, phaseIdx: 0, history: [], log: [], done: false,
                })}>Open emergency hearing</button>
            </div>
            <div style={{ fontSize: 10, color: '#888', marginBottom: 6 }}>Compromise member</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {(opposition?.aib?.members || []).map((m) => (
                <button key={m.id} type="button" style={{ ...C.smBtn, fontSize: 9, background: 'rgba(60,40,60,0.5)' }}
                  onClick={() => patchOpposition((o) => ({
                    ...o,
                    aib: {
                      ...o.aib,
                      members: o.aib.members.map((x) => (x.id === m.id ? { ...x, stance: 'compromised', corruption: 60 } : x)),
                    },
                  }))}>{m.name.split(' ').pop()}</button>
              ))}
            </div>
          </div>
        )}

        {tab === 'notes' && (
          <div style={{ padding: 10, background: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>
            <div style={{ fontSize: 10, color: '#c9a060', marginBottom: 8 }}>SHIFT LOG PREVIEW</div>
            <div style={{ fontSize: 10, color: '#888', marginBottom: 8 }}>Last action: {lastPlayerAction || '—'}</div>
            <button type="button" style={{ ...C.smBtn, background: 'rgba(90,70,40,0.5)', marginRight: 6 }}
              onClick={() => setNotesPreview(serializeBugReport(buildGameSnapshot(getSnapshotContext?.() || {}, { category: 'dev', steps: 'debug preview' })))}>
              Preview snapshot JSON
            </button>
            <button type="button" style={{ ...C.smBtn, background: 'rgba(90,70,40,0.5)' }}
              onClick={() => setFieldNotesOpen(true)}>Open Shift Log modal</button>
            {notesPreview && (
              <pre style={{ fontSize: 9, color: '#a09080', marginTop: 10, maxHeight: 320, overflow: 'auto', background: '#0a0808', padding: 8, borderRadius: 6 }}>
                {notesPreview.slice(0, 8000)}{notesPreview.length > 8000 ? '\n…' : ''}
              </pre>
            )}
            {fieldNotesOpen && (
              <BugReportModal getSnapshotContext={getSnapshotContext} getSaveContext={getSaveContext} onClose={() => setFieldNotesOpen(false)} />
            )}
          </div>
        )}
      </div>
    </ModalOverlay>
  );
}
