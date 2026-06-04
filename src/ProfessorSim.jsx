import { useState, useEffect, useRef, useCallback } from "react";
import { CELESTIAL_STAGES, UMBRAL_STAGES, CONVERGENCE_STAGE, SINGULARITY_STAGES, SINGULARITY_ABSORPTION_TEXT, SINGULARITY_BODY_DESCS, SINGULARITY_OUTFITS, SINGULARITY_DIARY, SINGULARITY_REACTIONS, SINGULARITY_TAP_OUT, SINGULARITY_RANDOM_EVENTS, SINGULARITY_ACTION_TEXT, SINGULARITY_RITES, SINGULARITY_ACTIONS, TRIUMVIRATE_BODY_DESC, TRIUMVIRATE_OUTFIT, TRIUMVIRATE_DIARY, TRIUMVIRATE_REACTION, TRIUMVIRATE_ACTIONS, TRIUMVIRATE_ACTION_TEXT, CELESTIAL_PULL_AMOUNTS, CELESTIAL_PUSH_AMOUNTS, CELESTIAL_BLESS_AMOUNTS, UMBRAL_CONSUME_CHANCE, UMBRAL_ABSORB_RATE, UMBRAL_VOID_PULL_AMOUNTS, UMBRAL_ABSORB_TEXT, GODDESS_VISION, RELIGION_RITES, CELESTIAL_BODY_DESCS, UMBRAL_BODY_DESCS, CELESTIAL_OUTFITS, UMBRAL_OUTFITS, CELESTIAL_ACTION_TEXT, UMBRAL_ACTION_TEXT, RELIGION_RITE_TEXT, SINGULARITY_RITE_TEXT, CELESTIAL_DIARY, UMBRAL_DIARY, ASCENSION_STAGE_REACTIONS, SANGUINE_STAGES, SANGUINE_BODY_DESCS, SANGUINE_OUTFITS, SANGUINE_DIARY, SANGUINE_REACTIONS, SANGUINE_TAP_OUT, SANGUINE_RANDOM_EVENTS, SANGUINE_ACTIONS, SANGUINE_ACTION_TEXT, VERDANT_STAGES, VERDANT_BODY_DESCS, VERDANT_OUTFITS, VERDANT_DIARY, VERDANT_REACTIONS, VERDANT_TAP_OUT, VERDANT_RANDOM_EVENTS, VERDANT_ACTIONS, VERDANT_ACTION_TEXT, PRIMORDIAL_STAGES, PRIMORDIAL_ABSORPTION_TEXT, PRIMORDIAL_BODY_DESCS, PRIMORDIAL_OUTFITS, PRIMORDIAL_DIARY, PRIMORDIAL_REACTIONS, PRIMORDIAL_TAP_OUT, PRIMORDIAL_RANDOM_EVENTS, PRIMORDIAL_ACTIONS, PRIMORDIAL_ACTION_TEXT, PRIMORDIAL_RITES, PRIMORDIAL_TRIUMVIRATE_BODY_DESC, PRIMORDIAL_TRIUMVIRATE_OUTFIT, PRIMORDIAL_TRIUMVIRATE_DIARY, PRIMORDIAL_TRIUMVIRATE_REACTION, PRIMORDIAL_TRIUMVIRATE_ACTIONS, PRIMORDIAL_TRIUMVIRATE_ACTION_TEXT, GODDESS_STAGES, getGoddessStage, GODDESS_STAGE_REACTIONS, GODDESS_BODY_DESCS, GODDESS_ATTITUDE, GODDESS_DIARY, GODDESS_EXPLORE_TEXT, GODDESS_PRACTICAL_TEXT, GODDESS_ACTIONS, INCARNATION_EVENT_TEXT } from './gameData/ascension.js';
import { INTIMACY_ASCENSION_FLAVOR, INTIMACY_ARCHETYPE_LINES, INTIMACY_STUDENT_LINES, INTIMACY_SCENES, INTIMACY_CONTEXTUAL } from './gameData/intimacy.js';
import { WAITER_DESC, DINNER_ENDING_TEXT, getOverfillEndMsg, getJealousyLine, GROUP_CONVERSATIONS, THIN_JEALOUSY, FAT_ENCOURAGE, FAT_RETORT, THIN_CONTEXTUAL, DIVINE_PAIR_REACTIONS, UNBUTTON_LINES, PROF_SUBJECTS, PROF_TRAITS, ADMIN_EVENTS, STUDY_SCENES, STUDY_SCENE_DEFAULT, HR_OBSERVER_POOL, HR_DISP_LEVELS, getHrDispLevel, HR_DISP_DESC, getHrDispDesc, HR_FEED_LINES, HR_TALK_LINES, INNER_CIRCLE_TIERS, getTier, TIER_SCENES, VAUGHAN_BASE, VAUGHAN_EVENTS, VAUGHAN_WEIGHT_SCENES, VAUGHAN_ALLY_SCENE, SOCIAL_EVENTS, PRIVATE_VENUES, PRIVATE_FOODS, SESSION_FULLNESS_STAGES, getFullnessStage, SESSION_FULLNESS_DESCS, ENCOURAGEMENT_ACTIONS, SESSION_AFTERMATH, getAftermath, DINNER_VENUES, DINNER_CONVERSATION, ACHIEVEMENT_LIST } from './gameData/sessions.js';
import { BODY_DESCS, STAGE_REACTIONS, STAGE_DROP_REACTIONS, PROFESSOR_RANKS, OUTFITS, SLIGHT_DIARY, DIARY_ENTRIES, RANDOM_EVENTS, INFLUENCE_PAIRS, NARRATIVE_EVENTS, TALK_RESPONSES, CHAR_TALK } from './gameData/content.js';
import { GOSSIP, getGossipLines } from './gameData/gossip.js';
import { ACTIONS_SINGLE, ACTIONS_CLASS, SEMESTER_EVENTS, CLASS_SCENES } from './gameData/classEvents.js';
import { EVOLVED_REACTIONS, EVOLVED_DIARY, EVOLVED_OUTFITS, EVOLVED_ACTIVITY_TEXT, EVOLVED_ACTIVITY_META, EVOLVED_EVENTS, EVOLVED_FORM_META, EVOLUTION_BUTTON_BLURB, EVOLUTION_OFFER, ASCENSION_BRIDGE, FEEDER_SUBJECT_JOURNALS } from './gameData/evolvedForms.js';
import { CONTEST_FOODS, CONTEST_STAGE_FOODS, CONTEST_MAYA_WEIGHTS, CONTEST_FOOD_POPUPS, CONTEST_ACTION_POPUPS, CONTEST_WEIGH_IN_2_TEXT, CONTEST_DEVOUR_POPUPS, CONTEST_PAYOFF_TEXT, SUMO_MOVES, SUMO_RIVAL_NAME, SUMO_RIVAL_WEIGHTS, SUMO_TELEGRAPH, SUMO_EXCHANGE_LINES, SUMO_CORNER_FEED, SUMO_BOUT_WON, SUMO_BOUT_LOST, SUMO_MATCH_AFTERMATH, SUMO_PAYOFF_TEXT, SUMO_FILL_RING_TEXT, COLLAB_CONTENT_CREATOR_ARCHETYPES, COLLAB_STREAM_FOODS, COLLAB_STAGEUP_TEXT, COLLAB_WREN_LINES, COLLAB_BLOB_ANNOUNCEMENT, COLLAB_PAYOFF_TEXT, RECORDING_PERFECT_COMBOS, RECORDING_FOOD_LBS, RECORDING_PACE_LBS, RECORDING_QUALITY_BONUS, RECORDING_OPENING_TEXT, RECORDING_TAKE_INTRO_TEXT, RECORDING_DIRECTION_POPUPS, RECORDING_TAKE_RESULT, RECORDING_PERFECT_TAKE, RECORDING_ONE_MORE_TAKE, RECORDING_WRAP_ENDINGS, RECORDING_PAYOFF_TEXT, MJ_RECIPES, FAIR_FOODS, FAIR_STAGE_FOODS, FAIR_DARCY_WEIGHTS, FAIR_FULLNESS_MILESTONES, FAIR_WEIGH_IN_TEXT, FAIR_PAYOFF_TEXT, FAIR_TAUNT_POPUPS } from './gameData/miniGames.js';
import { SKILL_TREE, SKILL_CATEGORIES, DIVINE_SKILL_TREE, EVOLVED_SKILL_TREES } from './gameData/skills.js';
import { IMMOBILE_REDIRECT, TAP_OUT_DIALOGUE, TAP_OUT_250, BLOB_PRIVATE_INTRO, INIT_STUDENTS } from './gameData/students.js';
import { WEIGHT_STAGES, getStage } from './gameData/stages.js';

// ═══════════════════════════════════════════════════════════════
// DATA LAYER
// ═══════════════════════════════════════════════════════════════




// ─── ACTIONS ────────────────────────────────────────────────────────────────


// ═══════════════════════════════════════════════════════════════
// SKILL TREE
// ═══════════════════════════════════════════════════════════════



// ── ASCENSION PATHS ─────────────────────────────────────────────


const ALL_SKILLS = [...SKILL_TREE, ...DIVINE_SKILL_TREE];

// ══════════════════════════════════════════════════════════════════
// EXPANSION PACK 2 — THE EVOLUTION
// Evolved form content: reactions, diary, outfits, activity, skills
// Index 0 = weight stage 5 (Heavy), index 5 = weight stage 10 (Blob)
// ══════════════════════════════════════════════════════════════════





// ══════════════════════════════════════════════════════════════════
// EATING CONTEST MINI-GAME — DATA & CONTENT
// ══════════════════════════════════════════════════════════════════


// ── FARM GIRL: MARY JANE RECIPES (unlock via homestead_queen events) ──────────
// Structure per entry: { title, phases:[{text(h)=>str, choices:[{id,label,result,lbs?,rel?,flag?,feedOther?}]}], endings:[{condition,text,gainBonus,relBonus}] }





// ── EP5: INTIMACY SCENES ──────────────────────────────────────

// ── DINNER EVENT DATA ──────────────────────────────────────────

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

function getSingularityStage(lbs){
  for(let i=SINGULARITY_STAGES.length-1;i>=0;i--)
    if(lbs>=SINGULARITY_STAGES[i].min) return SINGULARITY_STAGES[i];
  return null;
}
function getSanguineStage(lbs){
  for(let i=SANGUINE_STAGES.length-1;i>=0;i--)
    if(lbs>=SANGUINE_STAGES[i].min) return SANGUINE_STAGES[i];
  return null;
}
function getVerdantStage(lbs){
  for(let i=VERDANT_STAGES.length-1;i>=0;i--)
    if(lbs>=VERDANT_STAGES[i].min) return VERDANT_STAGES[i];
  return null;
}
function getPrimordialStage(lbs){
  for(let i=PRIMORDIAL_STAGES.length-1;i>=0;i--)
    if(lbs>=PRIMORDIAL_STAGES[i].min) return PRIMORDIAL_STAGES[i];
  return null;
}
// Passive drain/cultivation amounts by ascension stage
const SANGUINE_MARK_DRAIN_BY_STAGE   = [3, 5, 8, 12, 18];
const VERDANT_CULTIVATE_GAIN_BY_STAGE = [3, 5, 8, 12, 18];
const SANGUINE_DRAIN_AMOUNTS   = [15, 22, 32, 44, 58];
const VERDANT_ROOT_AMOUNTS     = [12, 18, 26, 36, 50];
const PRIMORDIAL_PULL_AMOUNTS  = [12, 16, 22, 30, 42];
const CONVERGENCE_PAIRS = { sanguineVerdant:"primordial", celestialUmbral:"singularity" };
function getBodyDesc(s){
  if(s.incarnatedGoddess){const gs=getGoddessStage(s.lbs);return GODDESS_BODY_DESCS[gs.id-1];}
  if(s.ascensionPath==="convergence"){
    if(s.triumvirateUnlocked) return TRIUMVIRATE_BODY_DESC;
    const sg=getSingularityStage(s.lbs);
    return sg ? SINGULARITY_BODY_DESCS[sg.id-1] : SINGULARITY_BODY_DESCS[0];
  }
  if(s.ascensionPath==="primordial"){
    if(s.primordialTriumvirateUnlocked) return PRIMORDIAL_TRIUMVIRATE_BODY_DESC;
    const pg=getPrimordialStage(s.lbs);
    return pg ? PRIMORDIAL_BODY_DESCS[pg.id-1] : PRIMORDIAL_BODY_DESCS[0];
  }
  if(s.ascensionPath==="celestial") return CELESTIAL_BODY_DESCS[s.ascensionStage||0];
  if(s.ascensionPath==="umbral")    return UMBRAL_BODY_DESCS[s.ascensionStage||0];
  if(s.ascensionPath==="sanguine")  return SANGUINE_BODY_DESCS[s.ascensionStage||0];
  if(s.ascensionPath==="verdant")   return VERDANT_BODY_DESCS[s.ascensionStage||0];
  const bd=BODY_DESCS[s.bodyType]||BODY_DESCS.straight; return bd[Math.min(getStage(s.lbs).id,bd.length-1)];
}
function getOutfit(s){
  if(s.ascensionPath==="convergence"){
    if(s.triumvirateUnlocked) return TRIUMVIRATE_OUTFIT;
    const sg=getSingularityStage(s.lbs);
    return sg ? SINGULARITY_OUTFITS[sg.id-1] : SINGULARITY_OUTFITS[0];
  }
  if(s.ascensionPath==="primordial"){
    if(s.primordialTriumvirateUnlocked) return PRIMORDIAL_TRIUMVIRATE_OUTFIT;
    const pg=getPrimordialStage(s.lbs);
    return pg ? PRIMORDIAL_OUTFITS[pg.id-1] : PRIMORDIAL_OUTFITS[0];
  }
  if(s.ascensionPath==="celestial") return CELESTIAL_OUTFITS[s.ascensionStage||0];
  if(s.ascensionPath==="umbral")    return UMBRAL_OUTFITS[s.ascensionStage||0];
  if(s.ascensionPath==="sanguine")  return SANGUINE_OUTFITS[s.ascensionStage||0];
  if(s.ascensionPath==="verdant")   return VERDANT_OUTFITS[s.ascensionStage||0];
  if(s.evolvedForm && getStage(s.lbs).id>=5){
    const arr=EVOLVED_OUTFITS[s.evolvedForm]; if(arr){ return arr[Math.min(getStage(s.lbs).id-5,arr.length-1)]; }
  }
  const o=OUTFITS[s.archetype]||OUTFITS.default; return o[Math.min(getStage(s.lbs).id,o.length-1)];
}
function getDiary(s){
  if(s.incarnatedGoddess){const gs=getGoddessStage(s.lbs);return GODDESS_DIARY[gs.id-1];}
  if(s.ascensionPath==="convergence"){
    if(s.triumvirateUnlocked) return TRIUMVIRATE_DIARY;
    const sg=getSingularityStage(s.lbs);
    return sg ? SINGULARITY_DIARY[sg.id-1] : SINGULARITY_DIARY[0];
  }
  if(s.ascensionPath==="primordial"){
    if(s.primordialTriumvirateUnlocked) return PRIMORDIAL_TRIUMVIRATE_DIARY;
    const pg=getPrimordialStage(s.lbs);
    return pg ? PRIMORDIAL_DIARY[pg.id-1] : PRIMORDIAL_DIARY[0];
  }
  if(s.ascensionPath==="celestial") return CELESTIAL_DIARY[s.ascensionStage||0];
  if(s.ascensionPath==="umbral")    return UMBRAL_DIARY[s.ascensionStage||0];
  if(s.ascensionPath==="sanguine")  return SANGUINE_DIARY[s.ascensionStage||0];
  if(s.ascensionPath==="verdant")   return VERDANT_DIARY[s.ascensionStage||0];
  if(s.evolvedForm && getStage(s.lbs).id>=5){
    const arr=EVOLVED_DIARY[s.evolvedForm]; if(arr){ return arr[Math.min(getStage(s.lbs).id-5,arr.length-1)]; }
  }
  const id=getStage(s.lbs).id; if(id===0) return SLIGHT_DIARY[s.archetype]||"—"; const d=DIARY_ENTRIES[s.archetype]; return d?d[Math.min(id-1,9)]:"—";
}
function getEvolvedReaction(s){
  if(!s.evolvedForm) return null;
  const arr=EVOLVED_REACTIONS[s.evolvedForm]; if(!arr) return null;
  const idx=getStage(s.lbs).id-5; if(idx<0) return null;
  return arr[Math.min(idx,arr.length-1)];
}
function getEvolvedActivityStageIdx(s){
  const id=getStage(s.lbs).id;
  return Math.max(0,Math.min(id-5,4));
}
function rnd(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }
function generateClassSession(students,week){
  const scenes=[];
  const shuffled=[...students].sort(()=>Math.random()-0.5);
  for(const s of shuffled){
    const matching=CLASS_SCENES.filter(sc=>sc.target==="student"&&sc.filter&&sc.filter(s));
    if(matching.length){ scenes.push({type:"student",scene:matching[rnd(0,matching.length-1)],student:{...s}}); break; }
  }
  const classWide=CLASS_SCENES.filter(sc=>sc.target==="class");
  if(classWide.length) scenes.push({type:"class",scene:classWide[rnd(0,classWide.length-1)],student:null});
  return scenes;
}


// ═══════════════════════════════════════════════════════════════
// UI COMPONENTS
// ═══════════════════════════════════════════════════════════════

function Bar({ val, max=1100, color="#8030d0", height=8 }){
  return (
    <div style={{background:"#0d0816",borderRadius:4,height,overflow:"hidden",margin:"3px 0"}}>
      <div style={{width:`${Math.min(100,(val/max)*100)}%`,height:"100%",background:color,borderRadius:4,transition:"width 0.5s ease"}}/>
    </div>
  );
}

function StageTag({ stage }){
  return (
    <span style={{background:stage.color,color:"#fff",borderRadius:10,padding:"2px 9px",fontSize:10,fontWeight:700,letterSpacing:1,whiteSpace:"nowrap"}}>
      {stage.label.toUpperCase()}
    </span>
  );
}

function MoodBadge({ mood }){
  const m={happy:"😊",focused:"📖",excited:"⚡",competitive:"🏆",dreamy:"🌙",dry:"😑",social:"🥂",driven:"📊",observant:"👁",curious:"🔍",content:"☁️",tired:"😴",stressed:"😰",nervous:"😬"};
  return <span style={{fontSize:12}}>{m[mood]||"😐"} {mood}</span>;
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════

export default function ProfessorSim(){
  const [students,setStudents]=useState(INIT_STUDENTS);
  const [ap,setAp]=useState(5);
  const [week,setWeek]=useState(1);
  const [view,setView]=useState("class");
  const [selectedId,setSelectedId]=useState(null);
  const [log,setLog]=useState(["📋 Welcome, Professor. Your class of 15 students awaits."]);
  const [activeEvent,setActiveEvent]=useState(null);
  const [achievements,setAchievements]=useState([]);
  const [globalStats,setGlobalStats]=useState({ narrativeCount:0 });
  const [observeText,setObserveText]=useState(null);
  const [eventQueue,setEventQueue]=useState([]);
  const [unlockedSkills,setUnlockedSkills]=useState([]);
  const [dinnerEvent,setDinnerEvent]=useState(null);
  const [dinnerLog,setDinnerLog]=useState([]);
  const [groupDinnerEvent,setGroupDinnerEvent]=useState(null);
  const [groupDinnerLog,setGroupDinnerLog]=useState([]);
  const [dinnerEndPopup,setDinnerEndPopup]=useState(null);
  const [groupDinnerPicker,setGroupDinnerPicker]=useState(null);
  // groupDinnerPicker: { count:2|3, selected:[] }
  const [immobileRedirect,setImmobileRedirect]=useState(null);
  // immobileRedirect: { student, text } | null
  const [absorptionPopup,setAbsorptionPopup]=useState(null);
  // absorptionPopup: { text } | null — fires when convergence merges
  const [singularityActionPopup,setSingularityActionPopup]=useState(null);
  // singularityActionPopup: { student, actionId, text, gainApplied } | null
  const [goddessIncarnateId,setGoddessIncarnateId]=useState(null);
  // id of student currently incarnated as goddess (Triumvirate phase 2)
  const [goddessManifestPopup,setGoddessManifestPopup]=useState(null);
  // { targetName, targetLbs } — popup before incarnation
  const [triumvirateModal,setTriumvirateModal]=useState(null);
  // { text } — fires when Triumvirate unlocks
  const [finalConsumptionDone,setFinalConsumptionDone]=useState(false);
  const [hovered,setHovered]=useState(null);
  const [debugOpen,setDebugOpen]=useState(false);
  const [debugInputs,setDebugInputs]=useState({});
  // debugInputs: { [studentId]: { lbs:string, path:string, stage:number, rel:number } }
  const [skillCat,setSkillCat]=useState("environment");
  const [classSession,setClassSession]=useState(null);
  const [semesterData,setSemesterData]=useState({weeksCompleted:0,classHistory:[]});
  const [skillPurchase,setSkillPurchase]=useState(null);
  const [professorProfile,setProfessorProfile]=useState(null);
  // professorProfile: {name, subject, traits:[]}
  const [adminScrutiny,setAdminScrutiny]=useState(0);
  const [adminEvent,setAdminEvent]=useState(null);
  const [adminFiredIds,setAdminFiredIds]=useState([]);
  const [researchStudy,setResearchStudy]=useState({participants:{}});
  // participants: {[studentId]:{enrolled,checkInCount:0}}
  const [studyCheckIn,setStudyCheckIn]=useState(null);
  // studyCheckIn: {student, scene, index}
  const [hrObserver,setHrObserver]=useState(null);
  // hrObserver: {name,lbs,startLbs,bodyType,disposition,weeksPresent}
  const [charCreation,setCharCreation]=useState({name:"",subject:null,traits:[]});
  // DLC: Inner Circle
  const seenTiersRef=useRef(new Set());
  const prevRelsRef=useRef(Object.fromEntries(INIT_STUDENTS.map(s=>[s.id,s.relationship])));
  const [tierUpModal,setTierUpModal]=useState(null);
  // DLC: Vaughan
  const [vaughan,setVaughan]=useState(null);
  const [vaughanModal,setVaughanModal]=useState(null);
  const [vaughanFiredIds,setVaughanFiredIds]=useState([]);
  const [vaughanAlly,setVaughanAlly]=useState(false);
  // DLC: Social Events
  const [socialPicker,setSocialPicker]=useState(null);
  const [socialResult,setSocialResult]=useState(null);
  const [socialWeeks,setSocialWeeks]=useState([]);
  // DLC: Private Sessions
  const [privateSession,setPrivateSession]=useState(null);
  // {student,venue,phase,foods:[],totalGain,fullness,maxFullness,encouragementsUsed:[],toleranceBuffer,sessionNum}
  const [sessionHistory,setSessionHistory]=useState({});
  // {[studentId]:{count,totalGain,capacityBonus}}
  const [sessionResult,setSessionResult]=useState(null);
  const [tapOutPopup,setTapOutPopup]=useState(null);
  // {student, text, totalGain}
  const [sessionLog,setSessionLog]=useState([]);
  const [pendingDoubleDowns,setPendingDoubleDowns]=useState([]);
  // ── DIVINE EXPANSION STATE ─────────────────────────────────────
  const [goddessSeen,setGoddessSeen]=useState(false);
  const [goddessModal,setGoddessModal]=useState(null);
  const [ascensionModal,setAscensionModal]=useState(null); // {student} → choose Celestial/Umbral
  const [consumedStudents,setConsumedStudents]=useState([]); // full student objects consumed by Umbral
  const [religion,setReligion]=useState(null);
  // religion: {founded, devotees, ritesHeld, worshippedIds:[], weeklyPassiveGain}
  const [religionRiteModal,setReligionRiteModal]=useState(null);
  const [convergenceModal,setConvergenceModal]=useState(null); // {student} secret stage achieved
  // ── EP4: SANGUINE / VERDANT / PRIMORDIAL STATE ────────────────
  const [sanguineMarks,setSanguineMarks]=useState([]);       // student IDs marked for weekly drain
  const [verdantCultivations,setVerdantCultivations]=useState([]); // student IDs cultivated by roots
  const [umbralAbsorbPopup,setUmbralAbsorbPopup]=useState(null); // {text,absorbedName,umbralName,gained}
  const [ritePopup,setRitePopup]=useState(null); // {rite,text}
  const [celestialActionPopup,setCelestialActionPopup]=useState(null); // {text}
  const [umbralActionPopup,setUmbralActionPopup]=useState(null); // {text}
  const [sanguineActionPopup,setSanguineActionPopup]=useState(null); // {student,actionId,text}
  const [verdantActionPopup,setVerdantActionPopup]=useState(null);   // {student,actionId,text}
  const [primordialConvergenceModal,setPrimordialConvergenceModal]=useState(null); // {student,opponent}
  const [primordialAbsorptionPopup,setPrimordialAbsorptionPopup]=useState(null);   // {text,absorbedName,survivorName}
  const [primordialActionPopup,setPrimordialActionPopup]=useState(null);           // {student,actionId,text,gainApplied}
  const [primordialGoddessIncarnateId,setPrimordialGoddessIncarnateId]=useState(null);
  const [primordialGoddessManifestPopup,setPrimordialGoddessManifestPopup]=useState(null); // {text,candidateId}
  const [primordialTriumvirateModal,setPrimordialTriumvirateModal]=useState(null);
  const [primordialFinalConsumptionDone,setPrimordialFinalConsumptionDone]=useState(false);
  const [incarnationEventPopup,setIncarnationEventPopup]=useState(null); // {name,prevLbs,newLbs}
  const [goddessActionPopup,setGoddessActionPopup]=useState(null); // {text}
  const [goddessStagePopup,setGoddessStagePopup]=useState(null); // {text}
  // ── EP2: EVOLUTION STATE ───────────────────────────────────────
  const [evolutionModal,setEvolutionModal]=useState(null);
  // evolutionModal: {student, paths:{pathA:{id,label,desc}, pathB:{id,label,desc}}}
  const [evolvedActivityModal,setEvolvedActivityModal]=useState(null);
  // evolvedActivityModal: {student, stageIdx, text}
  const [evolvedEventState,setEvolvedEventState]=useState(null);
  // evolvedEventState: {studentId,formId,stageIdx,phaseIdx,history:[],logLines:[],gainAccum,relAccum,done,endingText,gainBonus,relBonus,startsContest}
  const [eatingContestState,setEatingContestState]=useState(null);
  // eatingContestState: {studentId,stageIdx,yourFoods,mayaFoods,yourFullness,mayaFullness,maxYourFullness,maxMayaFullness,yourGain,mayaGain,popupText,phaseAfterPopup,phase,pantsFactor,actions}
  const [sumoMatchState,setSumoMatchState]=useState(null);
  // sumoMatchState: {studentId,stageIdx,oppLbs,ringPos,yourBalance,oppBalance,yourBouts,oppBouts,gainAccum,oppMove,telegraph,exchangeLine,phase,popupText,phaseAfterPopup,interBout}
  const [intimacyEventState,setIntimacyEventState]=useState(null);
  // intimacyEventState: {studentId,sceneId,tier,phaseIdx,history:[],logLines:[],gainAccum,relAccum,done,endingText,gainBonus,relBonus}
  const [collabPartnerPicker, setCollabPartnerPicker] = useState(null);
  // collabPartnerPicker: { student: kylieStudent } — shows partner selection modal
  const [collabPartnerId, setCollabPartnerId] = useState(null);
  // collabPartnerId: number — persists through EVOLVED_EVENT phases + mini-game
  const [researchSubjectPicker, setResearchSubjectPicker] = useState(null);
  // researchSubjectPicker: { student: nadiaStudent }
  const [subjectJournalState, setSubjectJournalState] = useState(null);
  // subjectJournalState: { subjectId, currentPage (0–10) }
  const [collabStreamState, setCollabStreamState] = useState(null);
  // collabStreamState: { kylieId, partnerId, stageIdx, qualityBar, kylieGain, partnerGain,
  //   partnerStageAtStart, stagedUp, foodQueue, tierIdx, chatLines,
  //   phase:'streaming'|'scoreboard', popupText, phaseAfterPopup,
  //   actions:{kylieRevealed,partnerRevealed,zoomUses,chatUses,pushUsed} }
  const [recordingSessionState, setRecordingSessionState] = useState(null);
  // recordingSessionState: { studentId, stageIdx, phase:'open'|'directing'|'take_result'|'wrap_choice'|'done',
  //   takeNum, timeLeft, kylieGain, clipRatings, bestClip,
  //   choiceStep, currentChoices:{angle,food,pace}, perfectTakeAchieved,
  //   popupText, done, endingText }
  const [fairContestState, setFairContestState] = useState(null);
  // fairContestState: { studentId, stageIdx, darcyStartLbs, yourStartLbs,
  //   yourFoods:[{...food, consumed:false}], darcyFoodsLeft:number,
  //   yourFullnessPct:0, overfullCap:100|130|160|250,
  //   yourGain:0, darcyGain:0, milestonesHit:[],
  //   tauntUsed:false, pushThroughUsed:false, coolDownUses:0,
  //   phase:'eating'|'weigh_in'|'done', popupText:null, popupPhase:null }
  const [intimacySceneSelector,setIntimacySceneSelector]=useState(null);
  // intimacySceneSelector: {student}
  const logRef=useRef(null);

  useEffect(()=>{ if(logRef.current) logRef.current.scrollTop=logRef.current.scrollHeight; },[log]);

  // Tier-up detection
  useEffect(()=>{
    if(!professorProfile) return;
    const ups=[];
    students.forEach(s=>{
      const prevRel=prevRelsRef.current[s.id]??s.relationship;
      const ot=getTier(prevRel);
      const nt=getTier(s.relationship);
      if(nt.id>ot.id){
        const key=`${s.id}_t${nt.id}`;
        if(!seenTiersRef.current.has(key)){
          seenTiersRef.current.add(key);
          ups.push({student:s,oldTier:ot,newTier:nt});
        }
      }
      prevRelsRef.current[s.id]=s.relationship;
    });
    if(ups.length>0&&!tierUpModal){
      const u=ups[0];
      const scenes=TIER_SCENES[u.student.archetype]||TIER_SCENES.quiet;
      const fn=scenes[u.newTier.id-1];
      if(fn) setTierUpModal({student:u.student,oldTier:u.oldTier,newTier:u.newTier,scene:fn(u.student)});
    }
  },[students,professorProfile]);

  // Spawn Vaughan when scrutiny becomes notable
  useEffect(()=>{
    if(!professorProfile||vaughan) return;
    if(adminScrutiny>=15){
      setVaughan({...VAUGHAN_BASE,lbs:VAUGHAN_BASE.startLbs,suspicion:0,disposition:0,weightScenesSeen:[]});
      push(`👓 ${VAUGHAN_BASE.name} of ${VAUGHAN_BASE.dept} has taken notice.`);
      push(`   ${VAUGHAN_BASE.intro}`);
    }
  },[adminScrutiny,professorProfile]);

  // Fire Vaughan confrontation events
  useEffect(()=>{
    if(!vaughan||vaughanAlly) return;
    const next=VAUGHAN_EVENTS.find(ev=>vaughan.suspicion>=ev.suspicion&&!vaughanFiredIds.includes(ev.id));
    if(next&&!vaughanModal){
      setVaughanModal(next);
      setVaughanFiredIds(prev=>[...prev,next.id]);
    }
  },[vaughan,vaughanFiredIds,vaughanModal,vaughanAlly]);

  // Check achievements
  useEffect(()=>{
    const newAch=ACHIEVEMENT_LIST.filter(a=>!achievements.includes(a.id)&&a.check(students,globalStats));
    if(newAch.length){
      newAch.forEach(a=>{ setTimeout(()=>push(`🏆 Achievement unlocked: ${a.label} — ${a.desc}`),100); });
      setAchievements(prev=>[...prev,...newAch.map(a=>a.id)]);
    }
  },[students,globalStats]);

  // Process event queue — hold events until class session is done
  useEffect(()=>{
    if(eventQueue.length>0 && !activeEvent && !classSession){
      setActiveEvent(eventQueue[0]);
      setEventQueue(prev=>prev.slice(1));
    }
  },[eventQueue,activeEvent,classSession]);

  // (auto-end dinner removed — endings now handled by overfill check or manual "End Evening")

  // Fire admin events at scrutiny thresholds
  useEffect(()=>{
    if(!professorProfile) return;
    const next=ADMIN_EVENTS.slice().sort((a,b)=>b.threshold-a.threshold)
      .find(ev=>adminScrutiny>=ev.threshold&&!adminFiredIds.includes(ev.id));
    if(next&&!adminEvent){
      setAdminEvent(next);
      setAdminFiredIds(prev=>[...prev,next.id]);
    }
  },[adminScrutiny,adminFiredIds,adminEvent,professorProfile]);

  const push=useCallback((msg)=>setLog(prev=>[...prev,msg]),[]);

  const addScrutiny=(n)=>{
    const mult=(1-(professorProfile?.traits?.includes("discreet")?0.35:0))
              *(1-(professorProfile?.subject==="philosophy"?0.2:0))
              *skillScrutinyReduce;
    const actual=Math.max(0,Math.round(n*mult));
    if(actual>0) setAdminScrutiny(prev=>Math.min(100,prev+actual));
  };

  const proposeStudy=(s)=>{
    if(ap<1){push("⚠️ Need 1 AP.");return;}
    if(s.relationship<55){push("⚠️ Need 55 relationship to enroll a student in the study.");return;}
    if(researchStudy.participants[s.id]){push(`${s.name} is already enrolled.`);return;}
    setAp(a=>a-1);
    setResearchStudy(prev=>({...prev,participants:{...prev.participants,[s.id]:{enrolled:true,checkInCount:0}}}));
    push(`📋 ${s.name} agrees to participate in your dietary habits study.`);
    addScrutiny(3);
  };

  const runCheckIn=(s)=>{
    if(ap<1){push("⚠️ Need 1 AP.");return;}
    const pData=researchStudy.participants[s.id];
    if(!pData){return;}
    if(pData.checkInCount>=5){push(`${s.name}'s study arc is complete.`);return;}
    setAp(a=>a-1);
    const scenes=STUDY_SCENES[s.archetype]||STUDY_SCENE_DEFAULT;
    const sceneFn=scenes[Math.min(pData.checkInCount,scenes.length-1)];
    const scene=sceneFn?sceneFn(s):"Session complete.";
    setStudyCheckIn({student:s,scene,index:pData.checkInCount});
    setResearchStudy(prev=>({...prev,participants:{...prev.participants,[s.id]:{...pData,checkInCount:pData.checkInCount+1}}}));
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,relationship:Math.min(100,st.relationship+3)}));
    addScrutiny(professorProfile?.traits?.includes("discreet")?1:2);
  };

  const feedObserver=(gain,dispGain)=>{
    if(!hrObserver) return;
    const line=HR_FEED_LINES[rnd(0,HR_FEED_LINES.length-1)](hrObserver);
    push(`👤 ${line}`);
    setHrObserver(prev=>({...prev,lbs:Math.round(prev.lbs+gain),disposition:Math.min(100,prev.disposition+dispGain)}));
  };

  const talkToObserver=()=>{
    if(!hrObserver||ap<1){push("⚠️ Need 1 AP.");return;}
    setAp(a=>a-1);
    const line=HR_TALK_LINES[rnd(0,HR_TALK_LINES.length-1)](hrObserver);
    push(`💬 ${line}`);
    setHrObserver(prev=>({...prev,disposition:Math.min(100,prev.disposition+12)}));
  };

  const applyGainToStudent=(s,gain)=>{
    const oldSt=getStage(s.lbs).id;
    const newLbs=s.lbs+gain;
    const newSt=getStage(newLbs).id;
    const triggered=[];
    if(newSt>oldSt){
      NARRATIVE_EVENTS.forEach(ev=>{
        if(!s.triggeredEvents.includes(ev.id) && newSt>=ev.stageMin && (!ev.archetype||ev.archetype===s.archetype)){
          triggered.push(ev);
        }
      });
    }
    // Check influence pairs
    let bonusInfluence=0;
    INFLUENCE_PAIRS.forEach(([a,b])=>{
      if((s.id===a||s.id===b)){
        const other=students.find(st=>st.id===(s.id===a?b:a));
        if(other && getStage(other.lbs).id>=3) bonusInfluence+=Math.floor(gain*0.15);
      }
    });
    return { newLbs:newLbs+bonusInfluence, oldStageId:oldSt, newStageId:newSt, narrativeEvents:triggered };
  };

  const processStudentGain=(s,gain,extraRel=0)=>{
    const scaledGain=Math.round(gain*(s.gainMultiplier||1)*skillGainMult);
    const {newLbs,oldStageId,newStageId,narrativeEvents}=applyGainToStudent(s,scaledGain);
    if(s.ascensionPath==="convergence"){
      const oldSg=getSingularityStage(s.lbs);
      const newSg=getSingularityStage(newLbs);
      if(newSg&&(!oldSg||newSg.id>oldSg.id)){
        const reactionEntry=s.triumvirateUnlocked?TRIUMVIRATE_REACTION:SINGULARITY_REACTIONS[newSg.id-1];
        const text=typeof reactionEntry==='function'?reactionEntry({...s,lbs:newLbs}):reactionEntry;
        setTimeout(()=>push(`⚡ The Singularity ascends to ${newSg.label}! (${Math.round(newLbs).toLocaleString()} lbs) — "${text}"`),50);
      }
    } else if(s.ascensionPath==="primordial"){
      const oldPg=getPrimordialStage(s.lbs);
      const newPg=getPrimordialStage(newLbs);
      if(newPg&&(!oldPg||newPg.id>oldPg.id)){
        const reactionEntry=s.primordialTriumvirateUnlocked?PRIMORDIAL_TRIUMVIRATE_REACTION:PRIMORDIAL_REACTIONS[newPg.id-1];
        const text=typeof reactionEntry==='function'?reactionEntry({...s,lbs:newLbs}):reactionEntry;
        setTimeout(()=>push(`🌍 The Primordial ascends to ${newPg.label}! (${Math.round(newLbs).toLocaleString()} lbs) — "${text}"`),50);
      }
    } else if(s.ascensionPath==="sanguine"&&newStageId>oldStageId){
      const reaction=SANGUINE_REACTIONS[Math.min(s.ascensionStage||0,SANGUINE_REACTIONS.length-1)];
      const text=typeof reaction==='function'?reaction({...s,lbs:newLbs}):reaction;
      setTimeout(()=>push(`🩸 ${s.name} burns brighter — ${SANGUINE_STAGES[Math.min(s.ascensionStage||0,4)].label}! — "${text}"`),50);
    } else if(s.ascensionPath==="verdant"&&newStageId>oldStageId){
      const reaction=VERDANT_REACTIONS[Math.min(s.ascensionStage||0,VERDANT_REACTIONS.length-1)];
      const text=typeof reaction==='function'?reaction({...s,lbs:newLbs}):reaction;
      setTimeout(()=>push(`🌿 ${s.name} grows deeper — ${VERDANT_STAGES[Math.min(s.ascensionStage||0,4)].label}! — "${text}"`),50);
    } else if(newStageId>oldStageId){
      setTimeout(()=>push(`📣 ${s.name} reaches ${WEIGHT_STAGES[newStageId].label}! "${(()=>{ const r=STAGE_REACTIONS[s.archetype]?.[newStageId]; const ns={...s,lbs:newLbs}; return typeof r==='function'?r(ns):(r||'...'); })()}"`) ,50);
    }
    return {
      ...s,
      lbs:newLbs,
      relationship:Math.min(100,s.relationship+extraRel),
      triggeredEvents:[...s.triggeredEvents,...narrativeEvents.map(e=>e.id)],
      mood: newStageId>=5?"content":s.mood,
    };
  };

  const collectEvents=(updatedStudents)=>{
    const evs=[];
    updatedStudents.forEach(ns=>{
      const os=students.find(s=>s.id===ns.id);
      if(!os) return;
      NARRATIVE_EVENTS.forEach(ev=>{
        if(ns.triggeredEvents.includes(ev.id)&&!os.triggeredEvents.includes(ev.id)){
          evs.push({event:ev,student:ns});
        }
      });
    });
    return evs;
  };

  const advanceWeek=()=>{
    const newWeek=week+1;
    setWeek(newWeek);
    const newAp=Math.min(ap+5+skillApBonus,20);
    setAp(newAp);

    // Semester events
    const semEv=SEMESTER_EVENTS.find(e=>e.week===newWeek);

    // Random event (30% chance) — override with singularity/primordial event if one exists
    const singStudent=students.find(s=>s.ascensionPath==="convergence");
    const primStudent=students.find(s=>s.ascensionPath==="primordial");
    let randomEv=Math.random()<0.3?RANDOM_EVENTS[rnd(0,RANDOM_EVENTS.length-1)]:null;
    let singularityRandomOverride=null;
    if(randomEv&&singStudent){
      const sg=getSingularityStage(singStudent.lbs);
      const sgIdx=sg?sg.id-1:0;
      singularityRandomOverride={student:singStudent,textFn:SINGULARITY_RANDOM_EVENTS[Math.min(sgIdx,SINGULARITY_RANDOM_EVENTS.length-1)]};
    }
    if(randomEv&&primStudent&&!singularityRandomOverride){
      const pg=getPrimordialStage(primStudent.lbs);
      const pgIdx=pg?pg.id-1:0;
      singularityRandomOverride={student:primStudent,textFn:PRIMORDIAL_RANDOM_EVENTS[Math.min(pgIdx,PRIMORDIAL_RANDOM_EVENTS.length-1)]};
    }

    let updated=students.map(s=>{
      let gain=rnd(1,3)+skillPassiveBonus; // passive + skill bonus
      if(semEv) gain+=rnd(semEv.gain[0],semEv.gain[1]);
      if(randomEv){
        if(randomEv.target==="class") gain+=rnd(randomEv.gain[0],randomEv.gain[1]);
        else if(randomEv.target==="single"&&s.id===rnd(0,14)) gain+=rnd(randomEv.gain[0],randomEv.gain[1]);
      }
      // Ascended passive gains
      if(s.ascensionPath==="celestial"&&s.ascensionStage>=0) gain+=2+divineAscendedPassive;
      if(s.ascensionPath==="umbral"&&s.ascensionStage>=0){
        gain+=2+divineAscendedPassive;
        if(divineUmbralVoidPassive>0) gain+=divineUmbralVoidPassive;
      }
      if(s.ascensionPath==="sanguine"&&s.ascensionStage>=0) gain+=2;
      if(s.ascensionPath==="verdant"&&s.ascensionStage>=0) gain+=2;
      // Evolved skill passive bonuses
      if(s.evolvedForm&&(s.evolvedSkills||[]).length>0){
        const evTree=EVOLVED_SKILL_TREES[s.evolvedForm]||[];
        const evPassive=evTree.filter(sk=>(s.evolvedSkills||[]).includes(sk.id)&&sk.passiveBonus).reduce((a,b)=>a+(b.passiveBonus||0),0);
        gain+=evPassive;
      }
      return processStudentGain(s,gain,0);
    });
    // Goddess stage-up checks
    updated=updated.map(s=>{
      if(!s.incarnatedGoddess) return s;
      const newStage=getGoddessStage(s.lbs);
      if(newStage.id>(s.goddessStage||0)){
        setTimeout(()=>setGoddessStagePopup({text:GODDESS_STAGE_REACTIONS[newStage.id]}),80);
        return {...s,goddessStage:newStage.id};
      }
      return s;
    });
    // Ascension stage-up checks
    updated=updated.map(s=>{
      if(!s.ascensionPath||s.ascensionPath==="convergence"||s.ascensionPath==="primordial") return s;
      const stages=s.ascensionPath==="celestial"?CELESTIAL_STAGES
        :s.ascensionPath==="umbral"?UMBRAL_STAGES
        :s.ascensionPath==="sanguine"?SANGUINE_STAGES
        :VERDANT_STAGES;
      const nextStage=stages[s.ascensionStage+1];
      if(nextStage&&s.lbs>=nextStage.min){
        const newStageId=s.ascensionStage+1;
        const pathEmoji={celestial:"✨",umbral:"🌑",sanguine:"🩸",verdant:"🌿"}[s.ascensionPath]||"✨";
        setTimeout(()=>push(`${pathEmoji} ${s.name} ascends to ${stages[newStageId].label}! (${Math.round(s.lbs).toLocaleString()} lbs)`),80);
        // Check for convergence (celestial/umbral → singularity)
        if(newStageId===4&&(s.ascensionPath==="celestial"||s.ascensionPath==="umbral")){
          const opposingPath=s.ascensionPath==="celestial"?"umbral":"celestial";
          const maxOpponent=updated.find(o=>o.id!==s.id&&o.ascensionPath===opposingPath&&o.ascensionStage===4);
          if(maxOpponent){
            setTimeout(()=>{push(`⚡ THE SINGULARITY — ${s.name} and ${maxOpponent.name} have reached opposite Apex stages. Something extraordinary is possible.`);setConvergenceModal({student:s,opponent:maxOpponent});},400);
          }
        }
        // Check for primordial convergence (sanguine stage 4 + verdant stage 4)
        if(newStageId===4&&(s.ascensionPath==="sanguine"||s.ascensionPath==="verdant")){
          const opposingPath=s.ascensionPath==="sanguine"?"verdant":"sanguine";
          const maxOpponent=updated.find(o=>o.id!==s.id&&o.ascensionPath===opposingPath&&(o.ascensionStage===4||(o.ascensionStage+1===4&&o.lbs>=(s.ascensionPath==="sanguine"?VERDANT_STAGES[4].min:SANGUINE_STAGES[4].min))));
          if(maxOpponent){
            setTimeout(()=>{push(`🌍 THE PRIMORDIAL — ${s.name} and ${maxOpponent.name} have reached their final stages. Something ancient stirs.`);setPrimordialConvergenceModal({student:s,opponent:maxOpponent});},400);
          }
        }
        return {...s,ascensionStage:newStageId};
      }
      return s;
    });
    // Sanguine marks: drain marked students each week → sanguine gains
    if(sanguineMarks.length>0){
      const sangStudent=updated.find(s=>s.ascensionPath==="sanguine");
      if(sangStudent){
        const stage=sangStudent.ascensionStage||0;
        const drainAmt=SANGUINE_MARK_DRAIN_BY_STAGE[stage];
        let totalDrained=0;
        updated=updated.map(s=>{
          if(!sanguineMarks.includes(s.id)) return s;
          const loss=Math.min(drainAmt,Math.max(0,s.lbs-s.startLbs));
          totalDrained+=loss;
          return {...s,lbs:Math.max(s.startLbs,s.lbs-loss)};
        });
        if(totalDrained>0){
          updated=updated.map(s=>s.id===sangStudent.id?processStudentGain(s,totalDrained,0):s);
          setTimeout(()=>push(`🩸 ${sangStudent.name}'s marks drain ${totalDrained} lbs from ${sanguineMarks.length} student(s).`),120);
        }
      }
    }
    // Verdant cultivations: cultivated students gain weight (fed by roots) → verdant gains
    if(verdantCultivations.length>0){
      const verdStudent=updated.find(s=>s.ascensionPath==="verdant");
      if(verdStudent){
        const stage=verdStudent.ascensionStage||0;
        const cultGain=VERDANT_CULTIVATE_GAIN_BY_STAGE[stage];
        let totalCultivated=0;
        updated=updated.map(s=>{
          if(!verdantCultivations.includes(s.id)) return s;
          totalCultivated+=cultGain;
          return {...s,lbs:s.lbs+cultGain};
        });
        if(totalCultivated>0){
          updated=updated.map(s=>s.id===verdStudent.id?processStudentGain(s,Math.round(totalCultivated*0.5),0):s);
          setTimeout(()=>push(`🌿 ${verdStudent.name}'s roots nourish ${verdantCultivations.length} student(s), gaining ${Math.round(totalCultivated*0.5)} lbs in return.`),120);
        }
      }
    }

    // Influence spread
    INFLUENCE_PAIRS.forEach(([a,b])=>{
      const sA=updated.find(s=>s.id===a);
      const sB=updated.find(s=>s.id===b);
      if(sA&&sB){
        const diff=Math.abs(getStage(sA.lbs).id-getStage(sB.lbs).id);
        if(diff>=2){
          const lighter=getStage(sA.lbs).id<getStage(sB.lbs).id?sA:sB;
          const bonus=rnd(1,3);
          updated=updated.map(s=>s.id===lighter.id?{...s,lbs:s.lbs+bonus}:s);
          setTimeout(()=>push(`👥 ${lighter.name} spends time with her friend and gains an extra ${bonus} lbs this week.`),80);
        }
      }
    });

    // ── doubleDown: check milestones, queue for player to activate ─────
    const newPending=[];
    updated=updated.map(s=>{
      const helpers=s.gainHelpers||[];
      if(!helpers.length) return s;
      let newS={...s};
      GOSSIP.forEach(g=>{
        if(g.targetId!==s.id||!helpers.includes(g.speakerId)) return;
        if(!g.doubleDown) return;
        const speakerName=updated.find(st=>st.id===g.speakerId)?.name||`Student ${g.speakerId}`;
        g.doubleDown.forEach(dd=>{
          const key=`${g.speakerId}_at${dd.atLbs}`;
          if(s.lbs>=dd.atLbs&&!(s.doubleDownFired||[]).includes(key)){
            newS={...newS,doubleDownFired:[...(newS.doubleDownFired||[]),key]};
            newPending.push({speakerId:g.speakerId,targetId:g.targetId,atLbs:dd.atLbs,addMult:dd.addMult,line:dd.line,targetName:s.name,speakerName});
            setTimeout(()=>push(`🔥 ${speakerName} is ready to go harder on ${s.name} — activate in Gossip tab!`),120);
          }
        });
      });
      return newS;
    });
    if(newPending.length) setPendingDoubleDowns(prev=>[...prev,...newPending]);

    const evs=collectEvents(updated);
    setStudents(updated);
    // Admin notices visibly large students
    const visibleCount=updated.filter(s=>getStage(s.lbs).id>=5).length;
    if(visibleCount>0) addScrutiny(visibleCount);
    // Observer settles in week by week
    if(hrObserver){
      const obsGain=rnd(1,2);
      setHrObserver(prev=>({...prev,lbs:Math.round(prev.lbs+obsGain),weeksPresent:(prev.weeksPresent||0)+1}));
    }
    // Devoted students passively cover scrutiny and buffer Vaughan
    const devotedCount=updated.filter(s=>getTier(s.relationship).id>=3).length;
    if(devotedCount>0) setAdminScrutiny(prev=>Math.max(0,prev-devotedCount));
    if(skillScrutinyPassiveReduce>0) setAdminScrutiny(prev=>Math.max(0,prev-skillScrutinyPassiveReduce));
    if(evolvedScrutinyReduce>0) setAdminScrutiny(prev=>Math.max(0,prev-evolvedScrutinyReduce));
    // Goddess vision: triggers when first student hits Blob (stage 10)
    if(!goddessSeen){
      const firstBlob=updated.find(s=>getStage(s.lbs).id>=10);
      if(firstBlob){
        setTimeout(()=>{
          setGoddessSeen(true);
          setGoddessModal({});
          push(`✦ A vision arrives as ${firstBlob.name} reaches Blob stage. Something extraordinary is now possible.`);
        },600);
      }
    }
    // Celestial Apex weekly scrutiny heal
    if(divineCelestialApexHeal>0){
      const apexCount=updated.filter(s=>s.ascensionPath==="celestial"&&s.ascensionStage===4).length;
      if(apexCount>0) setAdminScrutiny(prev=>Math.max(0,prev-apexCount*divineCelestialApexHeal));
    }
    // Religion weekly effects
    if(religion){
      const worshipped=updated.filter(s=>religion.worshippedIds.includes(s.id));
      if(worshipped.length>0){
        const devGain=Math.floor(religion.weeklyPassiveGain||0.5);
        if(devGain>0) setReligion(prev=>prev?{...prev,devotees:prev.devotees+devGain}:prev);
        const hasDevoteeSkill=unlockedSkills.includes("flock_of_fat");
        if(hasDevoteeSkill){
          setStudents(prev=>prev.map(s=>{
            if(!getTier(s.relationship).id>=2) return s;
            return {...s,lbs:s.lbs+1};
          }));
        }
        // Religion scrutiny: devotees cause scrutiny above 10
        const devoteeScrutiny=Math.max(0,Math.floor((religion.devotees-10)*0.3));
        const hasThreshold=unlockedSkills.includes("congregation");
        const thresholdAmt=hasThreshold?20:10;
        if(religion.devotees>thresholdAmt) addScrutiny(Math.max(0,Math.floor((religion.devotees-thresholdAmt)*0.2)));
        setTimeout(()=>push(`⛪ Devotee count: ${religion.devotees} (${worshipped.length} blobs worshipped)`),300);
      }
    }
    // Vaughan weekly tick
    if(vaughan&&!vaughanAlly){
      const suspBase=Math.max(0,1+Math.floor(visibleCount*0.3)-devotedCount*2);
      const vLbsGain=rnd(0,1);
      const newSusp=Math.min(100,vaughan.suspicion+suspBase);
      const newLbs=vaughan.lbs+vLbsGain;
      const unseenScene=VAUGHAN_WEIGHT_SCENES.filter(ws=>newLbs>=ws.minLbs&&!(vaughan.weightScenesSeen||[]).includes(ws.minLbs))[0];
      if(unseenScene) setTimeout(()=>push(`👓 ${unseenScene.scene({...vaughan,lbs:newLbs})}`),200);
      const willAlly=newLbs>=162&&vaughan.disposition>=40;
      setVaughan({...vaughan,suspicion:newSusp,lbs:newLbs,
        weightScenesSeen:[...(vaughan.weightScenesSeen||[]),...(unseenScene?[unseenScene.minLbs]:[])]
      });
      if(willAlly){
        setTimeout(()=>{
          push(`🤝 Dr. Vaughan has become your ally.`);
          push(`   ${VAUGHAN_ALLY_SCENE({...vaughan,lbs:newLbs})}`);
          setVaughanAlly(true);
          setAdminScrutiny(p=>Math.max(0,p-20));
        },500);
      }
    }
    if(vaughanAlly) setAdminScrutiny(prev=>Math.max(0,prev-3));
    push(`📅 Week ${newWeek} begins. ${newAp} AP available.`);
    if(semEv) setTimeout(()=>push(`🎉 Semester Event: ${semEv.title} — ${semEv.text}`),100);
    if(randomEv){
      if(singularityRandomOverride){
        const {student:sg,textFn}=singularityRandomOverride;
        const livesg=updated.find(s=>s.id===sg.id)||sg;
        const evText=typeof textFn==='function'?textFn(livesg):textFn;
        setTimeout(()=>push(`⚡ ${evText}`),150);
      } else {
        setTimeout(()=>push(`🎲 ${randomEv.text(updated[rnd(0,14)])}`),150);
      }
      if(randomEv.scrutinyHit) addScrutiny(randomEv.scrutinyHit);
    }
    if(evs.length){
      setGlobalStats(g=>({...g,narrativeCount:g.narrativeCount+evs.length}));
      setEventQueue(prev=>[...prev,...evs]);
    }
  };

  // ── DIVINE ACTION FUNCTIONS ─────────────────────────────────────
  const ascendStudent=(s,path)=>{
    if(getStage(s.lbs).id<10){push(`⚠️ ${s.name} must reach Blob stage before ascension.`);return;}
    if(s.ascensionPath){push(`⚠️ ${s.name} has already ascended.`);return;}
    const stages=path==="celestial"?CELESTIAL_STAGES
      :path==="umbral"?UMBRAL_STAGES
      :path==="sanguine"?SANGUINE_STAGES
      :VERDANT_STAGES;
    const label=stages[0].label;
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,ascensionPath:path,ascensionStage:0}));
    const pathFlavorMap={celestial:"The light claims her.",umbral:"The void welcomes her.",sanguine:"The blood heat rises. Something old wakes in her veins.",verdant:"Roots thread the floor around her. She does not pull them back."};
    push(`✦ ${s.name} ascends to ${label}! ${pathFlavorMap[path]||""}`);
    const desc=stages[0].desc;
    setTimeout(()=>push(`   "${desc}"`),200);
    setAscensionModal(null);
    if(!goddessSeen){setGoddessSeen(true);}
  };

  const celestialMassPull=(celestialId,targetId)=>{
    if(ap<2){push("⚠️ Need 2 AP.");return;}
    const celestial=students.find(s=>s.id===celestialId);
    if(!celestial||celestial.ascensionPath!=="celestial"){push("⚠️ Only Celestial blobs can pull mass.");return;}
    const stage=celestial.ascensionStage||0;
    const baseAmount=CELESTIAL_PULL_AMOUNTS[stage];
    const finalAmount=Math.round(baseAmount*divineCelestialTransferMult);
    const celestialGain=Math.round(finalAmount*1.3);
    // Handle HR target
    if(targetId==="hr"){
      if(!hrObserver){push("⚠️ No HR observer present.");return;}
      const actualLoss=Math.min(finalAmount,Math.max(0,hrObserver.lbs-100));
      setHrObserver(prev=>prev?{...prev,lbs:Math.max(100,prev.lbs-actualLoss)}:prev);
      setStudents(prev=>prev.map(s=>s.id===celestialId?{...s,lbs:s.lbs+celestialGain}:s));
      setAp(a=>a-2);
      push(`✦ ${celestial.name} pulls ${actualLoss} lbs from ${hrObserver.name} — absorbs ${celestialGain} lbs.`);
      return;
    }
    const target=students.find(s=>s.id===targetId);
    if(!target){push("⚠️ Invalid target.");return;}
    const actualLoss=Math.min(finalAmount,Math.max(0,target.lbs-80));
    setStudents(prev=>prev.map(s=>{
      if(s.id===targetId) return {...s,lbs:Math.max(80,s.lbs-actualLoss)};
      if(s.id===celestialId) return {...s,lbs:s.lbs+celestialGain};
      return s;
    }));
    setAp(a=>a-2);
    push(`✦ ${celestial.name} pulls ${actualLoss} lbs from ${target.name} — absorbs ${celestialGain} lbs (divine amplification).`);
    setCelestialActionPopup({text:CELESTIAL_ACTION_TEXT.mass_pull});
  };

  const celestialMassPush=(celestialId,targetId)=>{
    if(ap<1){push("⚠️ Need 1 AP.");return;}
    const celestial=students.find(s=>s.id===celestialId);
    if(!celestial){push("⚠️ Invalid student.");return;}
    if(celestial.ascensionPath!=="celestial"){push("⚠️ Only Celestial blobs can push mass.");return;}
    const stage=celestial.ascensionStage||0;
    const pushAmt=Math.round(CELESTIAL_PUSH_AMOUNTS[stage]*divineCelestialTransferMult);
    const celestialLoss=Math.min(pushAmt,Math.max(0,celestial.lbs-820));
    if(targetId==="hr"&&hrObserver){
      const newHrLbs=Math.round(hrObserver.lbs+celestialLoss*1.2);
      setStudents(prev=>prev.map(s=>s.id===celestialId?{...s,lbs:Math.max(820,s.lbs-celestialLoss)}:s));
      setHrObserver(prev=>({...prev,lbs:newHrLbs,disposition:Math.min(100,prev.disposition+4)}));
      setAp(a=>a-1);
      push(`✦ ${celestial.name} pushes divine mass toward ${hrObserver.name} — she gains ${Math.round(celestialLoss*1.2)} lbs. (+4 disposition)`);
    } else if(targetId==="vaughan"&&vaughan){
      const newVLbs=Math.round(vaughan.lbs+celestialLoss*1.2);
      setStudents(prev=>prev.map(s=>s.id===celestialId?{...s,lbs:Math.max(820,s.lbs-celestialLoss)}:s));
      setVaughan(prev=>({...prev,lbs:newVLbs}));
      setAp(a=>a-1);
      push(`✦ ${celestial.name} pushes divine mass into Dr. Vaughan — she gains ${Math.round(celestialLoss*1.2)} lbs.`);
    } else {
      const target=students.find(s=>s.id===targetId);
      if(!target){push("⚠️ Invalid target.");return;}
      setStudents(prev=>prev.map(s=>{
        if(s.id===celestialId) return {...s,lbs:Math.max(820,s.lbs-celestialLoss)};
        if(s.id===targetId) return {...s,lbs:s.lbs+Math.round(celestialLoss*1.2)};
        return s;
      }));
      setAp(a=>a-1);
      push(`✦ ${celestial.name} pushes a blessing of ${celestialLoss} lbs into ${target.name}.`);
    }
    setCelestialActionPopup({text:CELESTIAL_ACTION_TEXT.mass_push});
  };

  const celestialMassBless=(celestialId,targetId)=>{
    if(ap<2){push("⚠️ Need 2 AP.");return;}
    const celestial=students.find(s=>s.id===celestialId);
    if(!celestial) return;
    const stage=celestial.ascensionStage||0;
    const blessAmt=Math.round(CELESTIAL_BLESS_AMOUNTS[stage]*divineCelestialTransferMult);
    if(targetId==="hr"&&hrObserver){
      setHrObserver(prev=>({...prev,lbs:prev.lbs+blessAmt,disposition:Math.min(100,prev.disposition+10)}));
      setAp(a=>a-2);
      push(`✦ ${celestial.name} bestows a sacred blessing upon ${hrObserver.name} — she gains ${blessAmt} lbs. (+10 disposition)`);
    } else if(targetId==="vaughan"&&vaughan){
      setVaughan(prev=>({...prev,lbs:prev.lbs+blessAmt,disposition:Math.min(100,(prev.disposition||0)+6)}));
      setAp(a=>a-2);
      push(`✦ ${celestial.name} bestows a sacred blessing upon Dr. Vaughan — she gains ${blessAmt} lbs. (+6 disposition)`);
    } else {
      const target=students.find(s=>s.id===targetId);
      if(!target) return;
      setStudents(prev=>prev.map(s=>{
        if(s.id===targetId) return {...s,lbs:s.lbs+blessAmt,relationship:Math.min(100,s.relationship+8)};
        return s;
      }));
      setAp(a=>a-2);
      push(`✦ ${celestial.name} radiates a sacred blessing — ${target.name} gains ${blessAmt} lbs. (+8 relationship)`);
    }
    setCelestialActionPopup({text:CELESTIAL_ACTION_TEXT.mass_bless});
  };

  const umbralVoidPull=(umbralId,targetId)=>{
    if(ap<2){push("⚠️ Need 2 AP.");return;}
    const umbral=students.find(s=>s.id===umbralId);
    const target=students.find(s=>s.id===targetId);
    if(!umbral||!target) return;
    if(umbral.ascensionPath!=="umbral"){push("⚠️ Only Umbral blobs can pull through the void.");return;}
    const stage=umbral.ascensionStage||0;
    const pullAmt=UMBRAL_VOID_PULL_AMOUNTS[stage];
    const actualLoss=Math.min(pullAmt,Math.max(0,target.lbs-80));
    setStudents(prev=>prev.map(s=>{
      if(s.id===targetId) return {...s,lbs:Math.max(80,s.lbs-actualLoss),relationship:Math.max(0,s.relationship-5)};
      if(s.id===umbralId) return {...s,lbs:s.lbs+Math.round(actualLoss*1.4)};
      return s;
    }));
    setAp(a=>a-2);
    addScrutiny(4);
    push(`🌑 ${umbral.name} pulls ${actualLoss} lbs through the void from ${target.name}. (+${Math.round(actualLoss*1.4)} absorbed)`);
    setUmbralActionPopup({text:UMBRAL_ACTION_TEXT.void_pull});
  };

  const umbralConsumeStudent=(umbralId,targetId)=>{
    if(ap<3){push("⚠️ Need 3 AP.");return;}
    const umbral=students.find(s=>s.id===umbralId);
    const target=students.find(s=>s.id===targetId);
    if(!umbral||!target) return;
    if(umbral.ascensionPath!=="umbral"){push("⚠️ Only Umbral blobs can consume.");return;}
    const stage=umbral.ascensionStage||0;
    // Stage 2+ (Presence) can consume any student; below that, capped at stage+1
    if(stage<2){
      const stageTarget=getStage(target.lbs).id;
      if(stageTarget>stage+1){push(`⚠️ ${umbral.name} can only consume students up to ${WEIGHT_STAGES[Math.min(10,stage+1)].label} stage at this power level.`);return;}
    }
    const baseChance=UMBRAL_CONSUME_CHANCE[stage]+divineUmbralConsumeBonus;
    const finalChance=Math.min(0.97,baseChance);
    setAp(a=>a-3);
    addScrutiny(18);
    if(Math.random()<=finalChance){
      const absorbRate=Math.min(1,UMBRAL_ABSORB_RATE[stage]+divineUmbralAbsorbBonus);
      const absorbed=Math.round(target.lbs*absorbRate);
      setStudents(prev=>{
        const without=prev.filter(s=>s.id!==targetId);
        return without.map(s=>{
          if(s.id===umbralId) return {...s,lbs:s.lbs+absorbed,consumedIds:[...(s.consumedIds||[]),targetId]};
          return s;
        });
      });
      setConsumedStudents(prev=>[...prev,{...target,consumedBy:umbralId,consumedAt:week}]);
      const targetStageId=getStage(target.lbs).id;
      const absorbTextArr=UMBRAL_ABSORB_TEXT[stage];
      const absorbTextFn=absorbTextArr?absorbTextArr[Math.min(targetStageId,10)]:null;
      const absorbText=absorbTextFn?absorbTextFn(target,{...umbral,lbs:umbral.lbs+absorbed}):null;
      if(absorbText){
        setUmbralAbsorbPopup({text:absorbText,absorbedName:target.name,umbralName:umbral.name,gained:absorbed});
      } else {
        push(`🌑 ${umbral.name} CONSUMES ${target.name}. +${absorbed} lbs absorbed. ${target.name} is gone — but not unrecoverable.`);
        push(`   The void takes her. She is part of ${umbral.name} now.`);
      }
    } else {
      push(`🌑 ${umbral.name} attempts to consume ${target.name} — but she slips the grasp. ${target.name} is shaken. (+18 scrutiny)`);
      setStudents(prev=>prev.map(s=>s.id===targetId?{...s,relationship:Math.max(0,s.relationship-15),mood:"scared"}:s));
    }
  };

  const umbralConsumeHR=(umbralId)=>{
    if(!divineUmbralCanConsumeHR){push("⚠️ Requires Umbral Maw skill.");return;}
    if(!hrObserver&&!vaughan){push("⚠️ No HR target available.");return;}
    if(ap<4){push("⚠️ Need 4 AP.");return;}
    const umbral=students.find(s=>s.id===umbralId);
    if(!umbral||umbral.ascensionPath!=="umbral") return;
    setAp(a=>a-4);
    addScrutiny(35);
    if(hrObserver){
      const absorbed=Math.round(hrObserver.lbs*0.9);
      setStudents(prev=>prev.map(s=>s.id===umbralId?{...s,lbs:s.lbs+absorbed}:s));
      setHrObserver(null);
      push(`🌑 ${umbral.name} consumes ${hrObserver.name}. +${absorbed} lbs. The HR threat is gone — and enormous. (+35 scrutiny)`);
      setUmbralActionPopup({text:UMBRAL_ACTION_TEXT.consume_hr});
    } else if(vaughan){
      const absorbed=Math.round(vaughan.lbs*0.9);
      setStudents(prev=>prev.map(s=>s.id===umbralId?{...s,lbs:s.lbs+absorbed}:s));
      setVaughan(null);
      setVaughanAlly(false);
      push(`🌑 ${umbral.name} consumes Dr. Vaughan. +${absorbed} lbs. (+35 scrutiny)`);
      setUmbralActionPopup({text:UMBRAL_ACTION_TEXT.consume_vaughan});
    }
  };

  const recoverConsumedStudent=(studentId,umbralId)=>{
    const consumed=consumedStudents.find(s=>s.id===studentId);
    if(!consumed){push("⚠️ Student not found.");return;}
    if(ap<3){push("⚠️ Need 3 AP.");return;}
    const umbral=students.find(s=>s.id===umbralId);
    if(!umbral){push("⚠️ Umbral student not found.");return;}
    const lossFromUmbral=Math.round(consumed.lbs*0.5);
    const recoveryWeight=consumed.lbs;
    setStudents(prev=>{
      const updated=prev.map(s=>{
        if(s.id!==umbralId) return s;
        return {...s,lbs:Math.max(820,s.lbs-lossFromUmbral),consumedIds:(s.consumedIds||[]).filter(id=>id!==studentId)};
      });
      return [...updated,{...consumed,lbs:recoveryWeight,consumedBy:undefined,consumedAt:undefined,relationship:Math.max(0,(consumed.relationship||20)-20),mood:"shaken"}];
    });
    setConsumedStudents(prev=>prev.filter(s=>s.id!==studentId));
    setAp(a=>a-3);
    push(`✦ ${consumed.name} has been released from ${umbral.name}. She returns at ${recoveryWeight} lbs — changed, but present.`);
    push(`   Something of the void clings to her. She will never be entirely who she was.`);
  };

  // ── EP2: EVOLUTION HANDLERS ────────────────────────────────────
  const openEvolutionModal=(s)=>{
    const offer=EVOLUTION_OFFER[s.archetype]; if(!offer) return;
    const archPaths=offer.paths;
    const pathKeys=Object.keys(archPaths);
    setEvolutionModal({
      student:s,
      intro:offer.intro(s),
      paths: pathKeys.map(k=>({id:k, label:archPaths[k].label, desc:archPaths[k].desc})),
    });
  };

  const chooseEvolution=(studentId,formId)=>{
    setStudents(prev=>prev.map(s=>s.id!==studentId?s:{...s,evolvedForm:formId,evolvedSkills:[]}));
    const s=students.find(s=>s.id===studentId);
    const meta=EVOLVED_ACTIVITY_META[formId];
    push(`✦ ${s?.name||"She"} has found her path: ${meta?.label||formId}.`);
    setEvolutionModal(null);
  };

  const doEvolvedActivity=(s)=>{
    if(!s.evolvedForm) return;
    if(s.evolvedForm==='feedee_creator'){ openCollabPartnerPicker(s); return; }
    if(s.evolvedForm==='psych_researcher'){
      if(s.researchSubjectId==null){ openResearchSubjectPicker(s); return; }
    }
    const meta=EVOLVED_ACTIVITY_META[s.evolvedForm]; if(!meta) return;
    if(ap<meta.apCost){push(`⚠️ Need ${meta.apCost} AP.`);return;}
    const stageIdx=getEvolvedActivityStageIdx(s);
    // Route to interactive event if one exists for this form+stage
    const evDef=EVOLVED_EVENTS[s.evolvedForm]?.[stageIdx];
    if(evDef){
      setAp(a=>a-meta.apCost);
      setEvolvedEventState({studentId:s.id,formId:s.evolvedForm,stageIdx,phaseIdx:0,history:[],logLines:[],gainAccum:0,relAccum:0,done:false,endingText:null,gainBonus:0,relBonus:0});
      return;
    }
    const actArr=EVOLVED_ACTIVITY_TEXT[s.evolvedForm];
    const rawText=actArr?actArr[stageIdx]:null;
    const text=rawText?(typeof rawText==='function'?rawText(s):rawText):"She's in her element.";
    // Calculate bonuses from evolved skills
    const skills=(s.evolvedSkills||[]);
    const tree=EVOLVED_SKILL_TREES[s.evolvedForm]||[];
    const bonusGain=tree.filter(sk=>skills.includes(sk.id)&&sk.activityGainBonus).reduce((a,b)=>a+(b.activityGainBonus||0),0);
    const bonusRel=tree.filter(sk=>skills.includes(sk.id)&&sk.activityRelBonus).reduce((a,b)=>a+(b.activityRelBonus||0),0);
    const doubleCharge=tree.find(sk=>skills.includes(sk.id)&&sk.doubleActivityCharge);
    const rawGain=rnd(meta.gainRange[0],meta.gainRange[1])+bonusGain;
    const gain=doubleCharge?rawGain*2:rawGain;
    const relGain=meta.relBonus+bonusRel;
    setAp(a=>a-meta.apCost);
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,lbs:st.lbs+gain,relationship:Math.min(100,st.relationship+relGain)}));
    push(`✦ ${s.name} — ${meta.label}: +${gain} lbs · +${relGain} rel`);
    setEvolvedActivityModal({student:s,stageIdx,text});
  };

  const makeEvolvedEventChoice=(choiceId)=>{
    if(!evolvedEventState) return;
    const {studentId,formId,stageIdx,phaseIdx,history,logLines,gainAccum,relAccum}=evolvedEventState;
    const s=students.find(st=>st.id===studentId); if(!s) return;
    const evDef=EVOLVED_EVENTS[formId]?.[stageIdx]; if(!evDef) return;
    const phase=evDef.phases[phaseIdx]; if(!phase) return;
    const choice=phase.choices.find(c=>c.id===choiceId); if(!choice) return;
    const newHistory=[...history,choiceId,...(choice.flag?[choice.flag]:[])];
    const newLog=[...logLines,(typeof choice.result==='function'?choice.result(s):choice.result)];
    const newGain=gainAccum+(choice.lbs||0);
    const newRel=relAccum+(choice.rel||0);
    // Handle feedOther — feed classmates of matching archetype
    if(choice.feedOther){
      const{archetype:targetArch,lbs:otherLbs,text:foText}=choice.feedOther;
      setStudents(prev=>prev.map(st=>{
        if(st.archetype===targetArch&&st.id!==studentId&&!consumedStudents.find(x=>x.id===st.id)){
          return processStudentGain(st,otherLbs,2);
        }
        return st;
      }));
      push(`🍽️ ${foText}`);
    }
    // Persist feeder/feedee focus choice on student object so it survives between sessions
    if(choice.flag==='feeder_focus'||choice.flag==='feedee_focus'){
      setStudents(prev=>prev.map(x=>x.id===studentId?{...x,researchFocus:choice.flag}:x));
    }
    const nextPhase=phaseIdx+1;
    if(nextPhase>=evDef.phases.length){
      // Find best matching ending
      const ending=evDef.endings.find(e=>e.condition(newHistory))||evDef.endings[evDef.endings.length-1];
      const totalGain=newGain+(ending.gainBonus||0);
      const totalRel=newRel+(ending.relBonus||0);
      // Apply pre-contest / pre-close gains to student
      setStudents(prev=>prev.map(st=>{
        if(st.id!==studentId) return st;
        const skList=(st.evolvedSkills||[]);
        const tree=EVOLVED_SKILL_TREES[formId]||[];
        const bonusRel=tree.filter(sk=>skList.includes(sk.id)&&sk.activityRelBonus).reduce((a,b)=>a+(b.activityRelBonus||0),0);
        return processStudentGain(st,totalGain,totalRel+bonusRel);
      }));
      if(!ending.startsContest&&!ending.startsMatch&&!ending.startsStream&&!ending.startsFairContest) push(`✦ ${s.name} — ${evDef.title}: +${totalGain} lbs · +${totalRel} rel`);
      // handle recipe unlock (homestead_queen)
      if(ending.unlockRecipe){
        setStudents(ss=>ss.map(st=>st.id===s.id?{...st,mjRecipes:[...(st.mjRecipes||[]),ending.unlockRecipe].filter((v,i,a)=>a.indexOf(v)===i)}:st));
      }
      const endText=typeof ending.text==='function'?ending.text(newHistory,s,totalGain):ending.text;
      setEvolvedEventState(prev=>({...prev,phaseIdx:nextPhase,history:newHistory,logLines:newLog,gainAccum:newGain,relAccum:newRel,done:true,endingText:endText,gainBonus:ending.gainBonus||0,relBonus:ending.relBonus||0,startsContest:!!ending.startsContest,startsMatch:!!ending.startsMatch,startsStream:!!ending.startsStream,startsFairContest:!!ending.startsFairContest}));
    } else {
      setEvolvedEventState(prev=>({...prev,phaseIdx:nextPhase,history:newHistory,logLines:newLog,gainAccum:newGain,relAccum:newRel}));
    }
  };

  const closeEvolvedEvent=()=>setEvolvedEventState(null);

  const startEatingContest=(studentId,stageIdx,history)=>{
    const s=students.find(st=>st.id===studentId); if(!s) return;
    const stageFoods=CONTEST_STAGE_FOODS[stageIdx]||CONTEST_STAGE_FOODS[0];
    const mayaLbs=CONTEST_MAYA_WEIGHTS[stageIdx]||330;
    const yourFoods=stageFoods.your.map((id,i)=>({...(CONTEST_FOODS.find(f=>f.id===id)||{}),consumed:false,selected:false,key:i}));
    const mayaFoods=stageFoods.maya.map((id,i)=>({...(CONTEST_FOODS.find(f=>f.id===id)||{}),consumed:false,selected:false,key:100+i}));
    const completions=s.contestCompletions||0;
    const multiplier=1+0.15*completions;
    const maxYF=Math.floor((80+Math.floor(s.lbs/8))*multiplier);
    const maxMF=80+Math.floor(mayaLbs/8);
    const initFull=(history||[]).includes('loaded')?25:15;
    setEatingContestState({studentId,stageIdx,yourFoods,mayaFoods,yourFullness:initFull,mayaFullness:0,maxYourFullness:maxYF,maxMayaFullness:maxMF,yourGain:0,mayaGain:0,popupText:null,phaseAfterPopup:null,phase:'eating',pantsFactor:0,actions:{unbuttoned:false,rubUses:0,taunted:false}});
    setEvolvedEventState(null);
  };

  const dismissContestPopup=()=>{
    setEatingContestState(prev=>{
      if(!prev) return null;
      if(prev.phaseAfterPopup) return {...prev,popupText:null,phaseAfterPopup:null,phase:prev.phaseAfterPopup};
      return {...prev,popupText:null,phaseAfterPopup:null};
    });
  };

  const eatContestFood=(idx)=>{
    if(!eatingContestState) return;
    const{studentId,stageIdx,yourFoods,mayaFoods,yourFullness,mayaFullness,maxYourFullness,maxMayaFullness,yourGain,mayaGain,pantsFactor,actions}=eatingContestState;
    const s=students.find(st=>st.id===studentId); if(!s) return;
    const food=yourFoods[idx]; if(!food||food.consumed) return;
    const effectiveMax=maxYourFullness-pantsFactor;
    // When devour is NOT available (stageIdx < 3), enforce too-full gate
    if(stageIdx<3 && yourFullness+food.fullness>effectiveMax) return;
    // Consume food, apply real lbs gain
    const newYF=yourFoods.map((f,i)=>i===idx?{...f,consumed:true,selected:false}:f);
    const newYourFull=yourFullness+food.fullness;
    const newYourGain=yourGain+food.lbs;
    setStudents(prev=>prev.map(st=>st.id===studentId?processStudentGain(st,food.lbs,0):st));
    // Maya eats one random unconsumed item
    let newMF=[...mayaFoods];
    let newMayaFull=mayaFullness;
    let newMayaGain=mayaGain;
    if(mayaFullness<maxMayaFullness){
      const avail=newMF.filter(f=>!f.consumed);
      if(avail.length>0){
        const pick=avail[Math.floor(Math.random()*avail.length)];
        newMF=newMF.map(f=>f===pick?{...f,consumed:true}:f);
        newMayaFull=mayaFullness+pick.fullness;
        newMayaGain=mayaGain+pick.lbs;
      }
    }
    const popup=CONTEST_FOOD_POPUPS[food.id]?.[stageIdx]||'';
    // Check end conditions
    const tableCleared=newYF.every(f=>f.consumed)&&newMF.every(f=>f.consumed);
    if(tableCleared){
      const tcp=CONTEST_ACTION_POPUPS.table_cleared?.[stageIdx]||popup;
      setEatingContestState(prev=>({...prev,yourFoods:newYF,mayaFoods:newMF,yourFullness:newYourFull,mayaFullness:newMayaFull,yourGain:newYourGain,mayaGain:newMayaGain,popupText:tcp,phaseAfterPopup:'weigh_in_2'}));
      return;
    }
    // Too-full end condition only applies when devour is NOT available
    if(stageIdx<3){
      const newEffMax=maxYourFullness-pantsFactor;
      const tooFull=newYourFull>=newEffMax&&actions.unbuttoned&&actions.rubUses>=3;
      if(tooFull){
        const tfp=CONTEST_ACTION_POPUPS.too_full?.[stageIdx]||popup;
        setEatingContestState(prev=>({...prev,yourFoods:newYF,mayaFoods:newMF,yourFullness:newYourFull,mayaFullness:newMayaFull,yourGain:newYourGain,mayaGain:newMayaGain,popupText:tfp,phaseAfterPopup:'weigh_in_2'}));
        return;
      }
    }
    setEatingContestState(prev=>({...prev,yourFoods:newYF,mayaFoods:newMF,yourFullness:newYourFull,mayaFullness:newMayaFull,yourGain:newYourGain,mayaGain:newMayaGain,popupText:popup}));
  };

  const toggleFoodSelection=(side,key)=>{
    if(!eatingContestState) return;
    const{stageIdx,yourFoods,mayaFoods}=eatingContestState;
    if(side==='your'){
      setEatingContestState(prev=>({...prev,yourFoods:prev.yourFoods.map(f=>f.key===key&&!f.consumed?{...f,selected:!f.selected}:f)}));
    } else if(side==='maya'&&stageIdx>=3){
      setEatingContestState(prev=>({...prev,mayaFoods:prev.mayaFoods.map(f=>f.key===key&&!f.consumed?{...f,selected:!f.selected}:f)}));
    }
  };

  const doDevour=()=>{
    if(!eatingContestState) return;
    const{studentId,stageIdx,yourFoods,mayaFoods,yourFullness,mayaFullness,maxYourFullness,maxMayaFullness,yourGain,mayaGain,pantsFactor}=eatingContestState;
    const s=students.find(st=>st.id===studentId); if(!s) return;
    const selectedYour=yourFoods.filter(f=>f.selected&&!f.consumed);
    const selectedMaya=mayaFoods.filter(f=>f.selected&&!f.consumed);
    const toEat=[...selectedYour,...selectedMaya];
    if(!toEat.length) return;
    const totalFullness=toEat.reduce((a,f)=>a+(f.fullness||0),0);
    const totalLbs=toEat.reduce((a,f)=>a+(f.lbs||0),0);
    const newYourFull=yourFullness+totalFullness;
    const newYourGain=yourGain+totalLbs;
    setStudents(prev=>prev.map(st=>st.id===studentId?processStudentGain(st,totalLbs,0):st));
    const selectedYourKeys=new Set(selectedYour.map(f=>f.key));
    const selectedMayaKeys=new Set(selectedMaya.map(f=>f.key));
    const newYF=yourFoods.map(f=>selectedYourKeys.has(f.key)?{...f,consumed:true,selected:false}:f);
    const newMF=mayaFoods.map(f=>selectedMayaKeys.has(f.key)?{...f,consumed:true,selected:false}:f);
    // Maya eats one item per player action
    let finalMF=[...newMF];
    let newMayaFull=mayaFullness;
    let newMayaGain=mayaGain;
    if(mayaFullness<maxMayaFullness){
      const avail=finalMF.filter(f=>!f.consumed);
      if(avail.length>0){
        const pick=avail[Math.floor(Math.random()*avail.length)];
        finalMF=finalMF.map(f=>f===pick?{...f,consumed:true}:f);
        newMayaFull=mayaFullness+pick.fullness;
        newMayaGain=mayaGain+pick.lbs;
      }
    }
    const popup=CONTEST_DEVOUR_POPUPS[stageIdx]||'';
    const tableCleared=newYF.every(f=>f.consumed)&&finalMF.every(f=>f.consumed);
    if(tableCleared){
      const tcp=CONTEST_ACTION_POPUPS.table_cleared?.[stageIdx]||popup;
      setEatingContestState(prev=>({...prev,yourFoods:newYF,mayaFoods:finalMF,yourFullness:newYourFull,mayaFullness:newMayaFull,yourGain:newYourGain,mayaGain:newMayaGain,popupText:tcp,phaseAfterPopup:'weigh_in_2'}));
      return;
    }
    setEatingContestState(prev=>({...prev,yourFoods:newYF,mayaFoods:finalMF,yourFullness:newYourFull,mayaFullness:newMayaFull,yourGain:newYourGain,mayaGain:newMayaGain,popupText:popup}));
  };

  const doContestAction=(action)=>{
    if(!eatingContestState) return;
    const{studentId,stageIdx,yourFoods,mayaFoods,yourFullness,mayaFullness,maxYourFullness,maxMayaFullness,yourGain,mayaGain,pantsFactor,actions}=eatingContestState;
    let updates={};
    let popup='';
    if(action==='unbutton'){
      if(actions.unbuttoned) return;
      updates.pantsFactor=pantsFactor+15;
      updates.actions={...actions,unbuttoned:true};
      popup=CONTEST_ACTION_POPUPS.unbutton?.[stageIdx]||'';
    } else if(action==='rub'){
      if(actions.rubUses>=3) return;
      updates.yourFullness=Math.max(0,yourFullness-5);
      updates.actions={...actions,rubUses:actions.rubUses+1};
      popup=CONTEST_ACTION_POPUPS.rub?.[stageIdx]||'';
    } else if(action==='taunt'){
      if(actions.taunted) return;
      updates.actions={...actions,taunted:true};
      popup=CONTEST_ACTION_POPUPS.taunt?.[stageIdx]||'';
    }
    // Advance Maya after each action
    const curMF=updates.mayaFoods||mayaFoods;
    let newMF=[...curMF];
    let newMayaFull=mayaFullness;
    let newMayaGain=mayaGain;
    if(mayaFullness<maxMayaFullness){
      const avail=newMF.filter(f=>!f.consumed);
      if(avail.length>0){
        const pick=avail[Math.floor(Math.random()*avail.length)];
        newMF=newMF.map(f=>f===pick?{...f,consumed:true}:f);
        newMayaFull=mayaFullness+pick.fullness;
        newMayaGain=mayaGain+pick.lbs;
      }
    }
    updates.mayaFoods=newMF;
    updates.mayaFullness=newMayaFull;
    updates.mayaGain=newMayaGain;
    updates.popupText=popup;
    updates.phaseAfterPopup=null;
    // Check too full after rub/unbutton — only applicable when devour not yet unlocked
    if(action==='rub'||(action==='unbutton')){
      const newYF2=updates.yourFoods||yourFoods;
      const newFull2=updates.yourFullness!==undefined?updates.yourFullness:yourFullness;
      const newEffMax2=maxYourFullness-(updates.pantsFactor!==undefined?updates.pantsFactor:pantsFactor);
      const newActions2=updates.actions||actions;
      const noRoom=newFull2>=newEffMax2&&newActions2.unbuttoned&&newActions2.rubUses>=3;
      const tableCleared2=newYF2.every(f=>f.consumed)&&newMF.every(f=>f.consumed);
      if(tableCleared2){updates.phaseAfterPopup='weigh_in_2';updates.popupText=CONTEST_ACTION_POPUPS.table_cleared?.[stageIdx]||'';}
      else if(noRoom&&stageIdx<3){updates.phaseAfterPopup='weigh_in_2';updates.popupText=CONTEST_ACTION_POPUPS.too_full?.[stageIdx]||'';}
    }
    setEatingContestState(prev=>({...prev,...updates}));
  };

  const closeEatingContest=()=>{
    if(!eatingContestState) return;
    const{studentId,yourGain,mayaGain,stageIdx,phase}=eatingContestState;
    const s=students.find(st=>st.id===studentId);
    const mayaLbs=CONTEST_MAYA_WEIGHTS[stageIdx]||330;
    const won=yourGain>=mayaGain;
    if(s) push(`🏆 ${s.name} — Competition: +${Math.round(yourGain)} lbs · ${won?'Victory':'Loss'} vs Maya (${mayaLbs} lbs)`);
    // Increment completions when player reaches scoreboard (completed the contest)
    if(phase==='scoreboard'&&s){
      setStudents(prev=>prev.map(st=>st.id===studentId?{...st,contestCompletions:(st.contestCompletions||0)+1}:st));
    }
    setEatingContestState(null);
  };

  // ── SUMO MATCH MINI-GAME ──
  const SUMO_TAG_BUCKET={you_drive:'you_drive',you_crush:'you_crush',recoil:'attack_fail',whiff:'attack_fail',she_drives:'she_drives',clash:'clash',you_brace:'brace',you_brace_counter:'brace',you_dodge:'you_dodge',dodge_partial:'dodge_miss',dodge_waste:'dodge_miss',dodge_waste_opp:'dodge_miss',stumble:'stumble'};

  const resolveSumoExchange=(ym,om,wf)=>{
    const big=34,med=21,small=13;
    const W=v=>Math.round(v*wf);
    let ring=0,yb=0,ob=0,tag='clash';
    if(ym==='charge'){
      yb-=25;
      if(om==='brace'){ring=-16;yb-=12;ob+=4;tag='recoil';}
      else if(om==='sidestep'){ring=-24;yb-=18;tag='whiff';}
      else if(om==='charge'){ring=W(big)-big;yb-=8;ob-=8;tag=ring>=0?'you_drive':'she_drives';}
      else{ring=W(big);ob-=18;tag='you_drive';}
    }else if(ym==='thrust'){
      yb-=10;
      if(om==='brace'){ring=W(4);tag='clash';}
      else if(om==='charge'){ring=W(med)-big;yb-=6;tag='she_drives';}
      else if(om==='drop'){ring=W(med)-big;tag='she_drives';}
      else if(om==='sidestep'){ring=-8;tag='dodge_waste_opp';}
      else{ring=W(med)-med+W(small);ob-=8;tag=ring>=0?'you_drive':'clash';}
    }else if(ym==='drop'){
      yb-=15;
      if(om==='brace'){ring=W(Math.round(big*1.15));ob-=14;tag='you_crush';}
      else if(om==='thrust'){ring=W(big);ob-=12;tag='you_crush';}
      else if(om==='drop'){ring=W(big)-big;tag=ring>=0?'you_crush':'she_drives';}
      else if(om==='charge'){ring=W(med)-med+W(small);yb-=6;ob-=8;tag=ring>=0?'you_drive':'clash';}
      else{ring=-14;tag='whiff';}
    }else if(ym==='brace'){
      yb+=30;
      if(om==='charge'){ring=W(10);ob-=15;tag='you_brace_counter';}
      else if(om==='drop'){ring=W(2);ob-=4;tag='you_brace';}
      else if(om==='thrust'){ring=W(3);tag='you_brace';}
      else{ring=0;tag='you_brace';}
    }else{ // sidestep
      yb-=10;
      if(om==='charge'){ring=Math.round(big*1.25);ob-=20;tag='you_dodge';}
      else if(om==='thrust'){ring=8;tag='dodge_partial';}
      else if(om==='brace'){ring=-10;tag='dodge_waste';}
      else if(om==='drop'){ring=-8;tag='dodge_waste';}
      else{ring=-6;tag='dodge_waste';}
    }
    return {ring,yb,ob,tag};
  };

  const pickOppMove=(ringPos,oppBalance)=>{
    let pool;
    if(oppBalance<25) pool=['brace','brace','thrust'];
    else if(ringPos>40) pool=['charge','charge','drop','thrust','sidestep'];
    else if(ringPos<-40) pool=['charge','drop','thrust','thrust','brace'];
    else pool=['charge','thrust','drop','brace','sidestep','thrust','drop'];
    const move=pool[Math.floor(Math.random()*pool.length)];
    const tl=SUMO_TELEGRAPH[move];
    return {move,telegraph:tl[Math.floor(Math.random()*tl.length)]};
  };

  const startSumoMatch=(studentId,stageIdx,history)=>{
    const s=students.find(st=>st.id===studentId); if(!s) return;
    const oppLbs=SUMO_RIVAL_WEIGHTS[stageIdx]||340;
    const {move,telegraph}=pickOppMove(0,100);
    setSumoMatchState({studentId,stageIdx,oppLbs,ringPos:0,yourBalance:100,oppBalance:100,yourBouts:0,oppBouts:0,gainAccum:0,oppMove:move,telegraph,exchangeLine:`The first tachi-ai. You square up against ${SUMO_RIVAL_NAME} — ${oppLbs} pounds of veteran across the line from you. The crowd settles. Choose your opening.`,phase:'match',popupText:null,phaseAfterPopup:null,fillRingUsed:false});
    setEvolvedEventState(null);
  };

  const sumoPlayMove=(moveId)=>{
    if(!sumoMatchState) return;
    const st=sumoMatchState;
    const s=students.find(x=>x.id===st.studentId); if(!s) return;
    // Fill the Ring — blob-only instant win move
    if(moveId==='fill_ring'){
      if(st.fillRingUsed) return;
      const yourBouts=st.yourBouts+1;
      const matchOver=yourBouts>=2;
      const fillText=SUMO_FILL_RING_TEXT[st.stageIdx]||`You expand completely into the ring. Your opponent steps outside. Bout to you.`;
      setSumoMatchState({...st,ringPos:100,yourBouts,fillRingUsed:true,popupText:fillText,phaseAfterPopup:matchOver?'aftermath':'interbout'});
      return;
    }
    const wf=Math.max(0.6,Math.min(2.0,s.lbs/st.oppLbs));
    let ringPos=st.ringPos, yourBalance=st.yourBalance, oppBalance=st.oppBalance;
    let tag,ringDelta=0,yb=0,ob=0;
    if(yourBalance<=0&&moveId!=='brace'){
      tag='stumble'; ringDelta=-25; yourBalance=25;
    }else{
      const r=resolveSumoExchange(moveId,st.oppMove,wf);
      tag=r.tag; ringDelta=r.ring;
      yourBalance=Math.max(0,Math.min(100,yourBalance+r.yb));
      oppBalance=Math.max(0,Math.min(100,oppBalance+r.ob));
    }
    ringPos+=ringDelta;
    let oppStumbleNote='';
    if(oppBalance<=0){ ringPos+=25; oppBalance=30; oppStumbleNote=` Dana's footing goes — she lurches, and you take the free ground.`; }
    const bucket=SUMO_TAG_BUCKET[tag]||'clash';
    const line=((SUMO_EXCHANGE_LINES[bucket]||SUMO_EXCHANGE_LINES.clash)[st.stageIdx]||'')+oppStumbleNote;
    if(ringPos>=100){
      const yourBouts=st.yourBouts+1;
      const matchOver=yourBouts>=2;
      setSumoMatchState({...st,ringPos:100,yourBalance,oppBalance,yourBouts,exchangeLine:line,popupText:SUMO_BOUT_WON[st.stageIdx],phaseAfterPopup:matchOver?'aftermath':'interbout'});
      return;
    }
    if(ringPos<=-100){
      const oppBouts=st.oppBouts+1;
      const matchOver=oppBouts>=2;
      setSumoMatchState({...st,ringPos:-100,yourBalance,oppBalance,oppBouts,exchangeLine:line,popupText:SUMO_BOUT_LOST[st.stageIdx],phaseAfterPopup:matchOver?'aftermath':'interbout'});
      return;
    }
    const {move,telegraph}=pickOppMove(ringPos,oppBalance);
    setSumoMatchState({...st,ringPos,yourBalance,oppBalance,oppMove:move,telegraph,exchangeLine:line});
  };

  const sumoCornerFeed=()=>{
    if(!sumoMatchState) return;
    const st=sumoMatchState;
    const feed=SUMO_CORNER_FEED[st.stageIdx]||SUMO_CORNER_FEED[0];
    setStudents(prev=>prev.map(x=>x.id===st.studentId?processStudentGain(x,feed.lbs,0):x));
    setSumoMatchState({...st,gainAccum:st.gainAccum+feed.lbs,popupText:feed.text,phaseAfterPopup:'nextbout'});
  };

  const sumoStartNextBout=()=>{
    setSumoMatchState(prev=>{
      if(!prev) return null;
      const {move,telegraph}=pickOppMove(0,100);
      const boutNum=prev.yourBouts+prev.oppBouts+1;
      return {...prev,ringPos:0,yourBalance:100,oppBalance:100,oppMove:move,telegraph,exchangeLine:`Bout ${boutNum}. You square up at the center again. ${SUMO_RIVAL_NAME} sets her feet across from you.`,phase:'match',popupText:null,phaseAfterPopup:null,fillRingUsed:false};
    });
  };

  const dismissSumoPopup=()=>{
    setSumoMatchState(prev=>{
      if(!prev) return null;
      const next=prev.phaseAfterPopup;
      if(next==='interbout') return {...prev,popupText:null,phaseAfterPopup:null,phase:'interbout'};
      if(next==='aftermath') return {...prev,popupText:null,phaseAfterPopup:null,phase:'aftermath'};
      if(next==='nextbout'){
        const {move,telegraph}=pickOppMove(0,100);
        const boutNum=prev.yourBouts+prev.oppBouts+1;
        return {...prev,popupText:null,phaseAfterPopup:null,phase:'match',ringPos:0,yourBalance:100,oppBalance:100,oppMove:move,telegraph,exchangeLine:`Bout ${boutNum}. You return to center heavier than you left it. Dana sets her feet across from you.`};
      }
      return {...prev,popupText:null,phaseAfterPopup:null};
    });
  };

  const closeSumoMatch=()=>{
    if(!sumoMatchState) return;
    const {studentId,yourBouts,oppBouts,gainAccum,oppLbs,phase}=sumoMatchState;
    const s=students.find(x=>x.id===studentId);
    const won=yourBouts>oppBouts;
    if(s) push(`🥋 ${s.name} — Sumo Match: +${Math.round(gainAccum)} lbs · ${won?'WIN':'Loss'} vs Dana (${oppLbs} lbs), ${yourBouts}–${oppBouts}`);
    if(phase==='aftermath'&&s){
      setStudents(prev=>prev.map(st=>st.id===studentId?{...st,contestCompletions:(st.contestCompletions||0)+1}:st));
    }
    setSumoMatchState(null);
  };

  // ── FEEDEE CREATOR: COLLAB STREAM FUNCTIONS ──────────────────────────────

  const openCollabPartnerPicker=(s)=>{
    // Check for blob announcements from past collab partners
    const kylieCollabHistory=s.collabHistory||[];
    const blobAnnounced=s.blobAnnounced||[];
    const blobPartners=students.filter(st=>kylieCollabHistory.includes(st.id)&&getStage(st.lbs).id>=10&&!blobAnnounced.includes(st.id));
    if(blobPartners.length>0){
      const bp=blobPartners[0];
      const stageIdx=Math.max(0,Math.min(4,getStage(s.lbs).id-5));
      const annText=(COLLAB_BLOB_ANNOUNCEMENT[bp.id]??[])[stageIdx]||`${bp.name} hit blob stage. She can't leave her room anymore. You announce it on stream.`;
      // Mark announced
      setStudents(prev=>prev.map(st=>st.id===s.id?{...st,blobAnnounced:[...(st.blobAnnounced||[]),bp.id]}:st));
      // Show announcement popup before picker — use existing popup system
      push(`📢 ${s.name} announces on stream: "${bp.name} has retired — she's too fat to leave her room."`);
      // Store popup to show, then open picker after
      setCollabPartnerPicker({student:s,announcementText:annText,announcementPending:true});
      return;
    }
    setCollabPartnerPicker({student:s});
  };

  const openResearchSubjectPicker=(s)=>{
    setResearchSubjectPicker({student:s});
  };

  const startCollabStream=(kylieId,partnerId,stageIdx,history)=>{
    const kylie=students.find(st=>st.id===kylieId); if(!kylie) return;
    const partner=students.find(st=>st.id===partnerId); if(!partner) return;
    const tierFoods=(COLLAB_STREAM_FOODS[stageIdx]||COLLAB_STREAM_FOODS[0]).map((f,i)=>({...f,consumed:false,key:i,tierUnlocked:i===0}));
    const partnerStageAtStart=getStage(partner.lbs).id;
    const initQual=history&&history.includes("both_loaded")?65:50;
    const initKylieGain=history&&history.includes("both_loaded")?8:0;
    const initPartnerGain=history&&history.includes("both_loaded")?6:0;
    if(initKylieGain>0) setStudents(prev=>prev.map(st=>st.id===kylieId?processStudentGain(st,initKylieGain,0):st));
    if(initPartnerGain>0) setStudents(prev=>prev.map(st=>st.id===partnerId?processStudentGain(st,initPartnerGain,0):st));
    const initChat=(COLLAB_WREN_LINES[stageIdx]||[]).slice(0,1);
    setCollabStreamState({kylieId,partnerId,stageIdx,qualityBar:initQual,kylieGain:0,partnerGain:0,partnerStageAtStart,stagedUp:false,foodQueue:tierFoods,tierIdx:0,chatLines:initChat,phase:'streaming',popupText:null,phaseAfterPopup:null,actions:{kylieRevealed:false,partnerRevealed:false,zoomUses:3,chatUses:3,pushUsed:false}});
    setCollabPartnerId(null);
    setEvolvedEventState(null);
  };

  const doCollabAction=(action,foodIdx)=>{
    if(!collabStreamState) return;
    const{kylieId,partnerId,stageIdx,qualityBar,kylieGain,partnerGain,partnerStageAtStart,stagedUp,foodQueue,tierIdx,chatLines,actions}=collabStreamState;
    const kylie=students.find(st=>st.id===kylieId);
    const partner=students.find(st=>st.id===partnerId);
    if(!kylie||!partner) return;
    // Quality decay per action
    const DECAY=4;
    let newQual=Math.max(0,qualityBar-DECAY);
    let newKylieGain=kylieGain;
    let newPartnerGain=partnerGain;
    let popupText=null;
    let newActions={...actions};
    let newChat=[...chatLines];
    let newFoodQueue=[...foodQueue];
    let newTierIdx=tierIdx;
    let kylieGainThisAction=0;
    let partnerGainThisAction=0;

    const addWren=()=>{
      const wl=COLLAB_WREN_LINES[stageIdx]||[];
      if(wl.length>0&&Math.random()<0.35){
        const l=wl[Math.floor(Math.random()*wl.length)];
        if(!newChat.includes(l)) newChat=[...newChat.slice(-5),l];
      }
    };

    if(action==='feed_kylie'){
      const food=foodQueue[foodIdx];
      if(!food||food.consumed||!food.tierUnlocked){push("⚠️ Food not available.");return;}
      kylieGainThisAction=food.lbsKylie;
      newQual=Math.min(100,newQual+food.qualBoost);
      newFoodQueue=foodQueue.map((f,i)=>i===foodIdx?{...f,consumed:true}:f);
      newKylieGain+=kylieGainThisAction;
      addWren();
      popupText=null;
    } else if(action==='feed_partner'){
      const food=foodQueue[foodIdx];
      if(!food||food.consumed||!food.tierUnlocked){push("⚠️ Food not available.");return;}
      partnerGainThisAction=food.lbsPartner;
      newQual=Math.min(100,newQual+food.qualBoost);
      newFoodQueue=foodQueue.map((f,i)=>i===foodIdx?{...f,consumed:true}:f);
      newPartnerGain+=partnerGainThisAction;
      addWren();
    } else if(action==='reveal_kylie'){
      if(actions.kylieRevealed){push("⚠️ Already revealed Kylie's weight.");return;}
      newQual=Math.min(100,newQual+20);
      newActions={...newActions,kylieRevealed:true};
      popupText=`You announce ${kylie.name}'s weight on camera — ${Math.round(kylie.lbs)} pounds, clearly, into the mic. The chat goes still for one second and then erupts. The number is undeniable and enormous and the new viewers are doing math. ${Math.round(kylie.lbs)} pounds at this stage means the belly, the thighs, the full warm forward presence of her visible in the camera. The chat says: yes. The chat means: more.`;
      addWren();
    } else if(action==='reveal_partner'){
      if(actions.partnerRevealed){push("⚠️ Already revealed partner's weight.");return;}
      newQual=Math.min(100,newQual+20);
      newActions={...newActions,partnerRevealed:true};
      popupText=`${partner.name}'s weight announced on camera: ${Math.round(partner.lbs)} pounds. The chat reacts. Wren reacts — the chat message fires immediately: ${COLLAB_WREN_LINES[stageIdx]?.[Math.floor(Math.random()*(COLLAB_WREN_LINES[stageIdx]?.length||1))]||'wrenWatchesEverything: the numbers'}. The viewer count bumps. ${partner.name} looks at the camera after saying the number and says nothing else and somehow that is more than anything she could have said.`;
      addWren();
    } else if(action==='zoom_in'){
      if(actions.zoomUses<=0){push("⚠️ No zoom uses left.");return;}
      newQual=Math.min(100,newQual+8);
      newActions={...newActions,zoomUses:actions.zoomUses-1};
      popupText=`You zoom in — the camera tightening on both women at the table, the full physical presence of them: ${kylie.name} at ${Math.round(kylie.lbs)} pounds and ${partner.name} at ${Math.round(partner.lbs)} pounds, both bellies forward and warm, both faces with the specific focused pleasure of eating on camera. The chat is saying something. The chat is always saying something. This is what they're saying it about.`;
    } else if(action==='chat_moment'){
      if(actions.chatUses<=0){push("⚠️ No chat engagement uses left.");return;}
      newQual=Math.min(100,newQual+6);
      newActions={...newActions,chatUses:actions.chatUses-1};
      addWren();
      const wl=COLLAB_WREN_LINES[stageIdx]||[];
      const wLine=wl.length>0?wl[Math.floor(Math.random()*wl.length)]:'wrenWatchesEverything: watching';
      newChat=[...newChat.slice(-5),wLine];
      popupText=`Chat engagement. Wren fires a message immediately: *${wLine}* The chat picks it up. Regular viewers explaining to new ones. New ones asking questions the regulars answer faster than either streamer can. The viewer count bumps slightly.`;
    } else if(action==='push_harder'){
      if(actions.pushUsed){push("⚠️ Already pushed harder this stream.");return;}
      const goodPush=Math.random()<0.6;
      if(goodPush){
        kylieGainThisAction=Math.floor(8+stageIdx*2);
        partnerGainThisAction=Math.floor(6+stageIdx*2);
        newQual=Math.min(100,newQual+15);
        popupText=`You push both of them harder — more food, more speed, the camera seeing the full fact of both women eating more than they were. Both bellies visibly fuller than five minutes ago. The chat is unanimous: more. More. The viewer count spikes. This is the right call.`;
      } else {
        newQual=Math.max(0,newQual-10);
        popupText=`You push too hard too fast. ${partner.name} slows — she's genuinely full — and there's a moment where the stream loses momentum, the chat noticing the pause. The quality dips. She recovers, eating again, but the push cost something.`;
      }
      newKylieGain+=kylieGainThisAction;
      newPartnerGain+=partnerGainThisAction;
      newActions={...newActions,pushUsed:true};
      addWren();
    }

    // Apply lbs gains
    if(kylieGainThisAction>0) setStudents(prev=>prev.map(st=>st.id===kylieId?processStudentGain(st,kylieGainThisAction,0):st));
    if(partnerGainThisAction>0){
      setStudents(prev=>prev.map(st=>{
        if(st.id!==partnerId) return st;
        const updated=processStudentGain(st,partnerGainThisAction,0);
        // Check for stage-up
        if(getStage(updated.lbs).id>partnerStageAtStart+(!stagedUp?0:0)){
          const newStage=getStage(updated.lbs);
          if(newStage.id>partnerStageAtStart){
            const stageUpText=COLLAB_STAGEUP_TEXT[stageIdx]?.(kylie.name,partner.name,Math.round(updated.lbs))||`${partner.name} just crossed ${Math.round(updated.lbs)} pounds on stream!`;
            setCollabStreamState(prev=>prev?{...prev,stagedUp:true,popupText:stageUpText,phaseAfterPopup:'stage_up_resolve',qualityBar:Math.min(100,(prev.qualityBar||0)+35)}:prev);
          }
        }
        return updated;
      }));
    }

    // Unlock next tier if all current tier foods consumed
    const allCurrentConsumed=newFoodQueue.filter(f=>f.tierUnlocked).every(f=>f.consumed);
    if(allCurrentConsumed&&newFoodQueue.some(f=>!f.tierUnlocked)){
      const nextUnlockIdx=newFoodQueue.findIndex(f=>!f.tierUnlocked);
      if(nextUnlockIdx>=0){
        newFoodQueue=newFoodQueue.map((f,i)=>i===nextUnlockIdx?{...f,tierUnlocked:true}:f);
        newTierIdx=nextUnlockIdx;
      }
    }

    // Check stream completion
    const allEaten=newFoodQueue.every(f=>f.consumed);
    if(allEaten){
      const finalKylieGain=newKylieGain;
      const finalPartnerGain=newPartnerGain;
      const partnerName=partner.name;
      const payoff=COLLAB_PAYOFF_TEXT[stageIdx]?.(finalKylieGain,finalPartnerGain,partnerName)||`${Math.round(finalKylieGain)} pounds on Kylie, ${Math.round(finalPartnerGain)} on ${partnerName}. Stream complete.`;
      setCollabStreamState(prev=>prev?{...prev,kylieGain:finalKylieGain,partnerGain:finalPartnerGain,qualityBar:newQual,foodQueue:newFoodQueue,chatLines:newChat,actions:newActions,phase:'scoreboard',popupText:payoff,phaseAfterPopup:'scoreboard_show'}:prev);
      // Record on Kylie's history
      setStudents(prev=>prev.map(st=>st.id===kylieId?{...st,collabHistory:[...(st.collabHistory||[]).filter(id=>id!==partnerId),partnerId],contestCompletions:(st.contestCompletions||0)+1}:st));
      push(`📹 ${kylie.name} — Collab Stream: +${Math.round(finalKylieGain)} lbs (Kylie) · +${Math.round(finalPartnerGain)} lbs (${partnerName})`);
      return;
    }

    // Check quality fail
    if(newQual<=0){
      const kylieName=kylie.name;
      const partnerName=partner.name;
      const crashText=`The stream crashes. Quality hit zero — the momentum died, the chat thinned out, and the connection dropped while both of you were still at the table. It happens. You gained ${Math.round(newKylieGain)} pounds and ${partnerName} gained ${Math.round(newPartnerGain)} pounds and the stream is just over.`;
      setCollabStreamState(prev=>prev?{...prev,kylieGain:newKylieGain,partnerGain:newPartnerGain,qualityBar:0,chatLines:newChat,phase:'scoreboard',popupText:crashText,phaseAfterPopup:'scoreboard_crash'}:prev);
      return;
    }

    setCollabStreamState(prev=>prev?{...prev,qualityBar:newQual,kylieGain:newKylieGain,partnerGain:newPartnerGain,foodQueue:newFoodQueue,tierIdx:newTierIdx,chatLines:newChat,actions:newActions,popupText:popupText||null,phaseAfterPopup:null}:prev);
  };

  const dismissCollabPopup=()=>{
    if(!collabStreamState) return;
    const{phaseAfterPopup}=collabStreamState;
    if(phaseAfterPopup==='scoreboard'||phaseAfterPopup==='scoreboard_show'||phaseAfterPopup==='scoreboard_crash'){
      setCollabStreamState(prev=>prev?{...prev,phase:'scoreboard',popupText:null,phaseAfterPopup:null}:prev);
    } else if(phaseAfterPopup==='stage_up_resolve'){
      // After stage-up popup, unlock a bonus food tier
      setCollabStreamState(prev=>{
        if(!prev) return prev;
        const newFoodQueue=prev.foodQueue.map((f,i)=>{
          if(!f.tierUnlocked&&i===prev.foodQueue.findIndex(fd=>!fd.tierUnlocked)){
            return {...f,tierUnlocked:true};
          }
          return f;
        });
        return {...prev,foodQueue:newFoodQueue,popupText:null,phaseAfterPopup:null};
      });
    } else {
      setCollabStreamState(prev=>prev?{...prev,popupText:null,phaseAfterPopup:null}:prev);
    }
  };

  const closeCollabStream=()=>{
    setCollabStreamState(null);
    setCollabPartnerId(null);
  };

  // ── Recording Session (feedee_creator Activity 2) ──────────────
  const startRecordingSession=(s)=>{
    if(ap<2){push(`⚠️ Need 2 AP.`);return;}
    setAp(a=>a-2);
    const stageIdx=Math.max(0,Math.min(5,getStage(s.lbs).id-5));
    setRecordingSessionState({
      studentId:s.id, stageIdx,
      phase:'open',
      takeNum:1, timeLeft:3,
      kylieGain:0,
      clipRatings:[], bestClip:null,
      choiceStep:0, currentChoices:{angle:null,food:null,pace:null},
      perfectTakeAchieved:false,
      popupText:null, done:false, endingText:null,
    });
  };

  const makeRecordingChoice=(choiceId)=>{
    setRecordingSessionState(prev=>{
      if(!prev||prev.phase!=='directing') return prev;
      const newChoices={...prev.currentChoices};
      const step=prev.choiceStep;
      if(step===0) newChoices.angle=choiceId;
      else if(step===1) newChoices.food=choiceId;
      else newChoices.pace=choiceId;
      const popupKey=step===0?choiceId:step===1?choiceId:choiceId;
      const popupArr=RECORDING_DIRECTION_POPUPS[choiceId];
      const kylieForPopup=students.find(st=>st.id===prev.studentId);
      const popupFn=popupArr?.[prev.stageIdx];
      const popupText=typeof popupFn==='function'?popupFn(kylieForPopup?.lbs||258):(popupFn||null);
      if(step<2){
        return {...prev, currentChoices:newChoices, choiceStep:step+1, popupText};
      }
      // All 3 choices made — evaluate take
      const perfect=RECORDING_PERFECT_COMBOS[prev.stageIdx];
      const matches=[newChoices.angle===perfect[0],newChoices.food===perfect[1],newChoices.pace===perfect[2]];
      const score=matches.filter(Boolean).length;
      const quality=score===3?'perfect':score===2?'great':score===1?'good':'okay';
      const [lbsMin,lbsMax]=RECORDING_FOOD_LBS[newChoices.food]||[5,10];
      const baseLbs=lbsMin+Math.random()*(lbsMax-lbsMin);
      const paceLbs=RECORDING_PACE_LBS[newChoices.pace]||0;
      const qualityLbs=RECORDING_QUALITY_BONUS[quality]||0;
      const gainThisTake=baseLbs+paceLbs+qualityLbs;
      const newGain=prev.kylieGain+gainThisTake;
      // Apply lbs to student
      const kylie=students.find(st=>st.id===prev.studentId);
      if(kylie) processStudentGain(kylie,gainThisTake,0);
      const newRatings=[...prev.clipRatings,quality];
      const qualityOrder=['okay','good','great','perfect'];
      const bestClip=newRatings.reduce((best,q)=>qualityOrder.indexOf(q)>qualityOrder.indexOf(best)?q:best,'okay');
      const isPerfect=quality==='perfect';
      const postGainLbs=(kylie?.lbs||258)+gainThisTake;
      const takeFn=isPerfect?RECORDING_PERFECT_TAKE[prev.stageIdx]:(RECORDING_TAKE_RESULT[quality]||[])[prev.stageIdx];
      const takeText=typeof takeFn==='function'?takeFn(postGainLbs):(takeFn||'');
      return {...prev,
        currentChoices:newChoices, choiceStep:3,
        phase:'take_result',
        kylieGain:newGain, clipRatings:newRatings, bestClip,
        perfectTakeAchieved:prev.perfectTakeAchieved||isPerfect,
        popupText, lastTakeText:takeText, lastTakeQuality:quality,
      };
    });
  };

  const dismissRecordingChoicePopup=()=>{
    setRecordingSessionState(prev=>{
      if(!prev||!prev.popupText) return prev;
      // If all choices made, transition to take_result
      if(prev.choiceStep===3) return {...prev,popupText:null};
      return {...prev,popupText:null};
    });
  };

  const oneMoreTake=()=>{
    setRecordingSessionState(prev=>{
      if(!prev||prev.timeLeft<=0) return prev;
      const kylie=students.find(st=>st.id===prev.studentId);
      const newTimeLeft=prev.timeLeft-1;
      const oneMoreFn=(RECORDING_ONE_MORE_TAKE||[])[prev.stageIdx];
      const oneMoreText=typeof oneMoreFn==='function'?oneMoreFn(kylie?.lbs||258):(oneMoreFn||'She nods. One more.');
      return {...prev,
        phase:'directing',
        takeNum:prev.takeNum+1, timeLeft:newTimeLeft,
        choiceStep:0, currentChoices:{angle:null,food:null,pace:null},
        popupText:oneMoreText,
        lastTakeText:null, lastTakeQuality:null,
      };
    });
  };

  const wrapRecordingSession=()=>{
    setRecordingSessionState(prev=>{
      if(!prev) return prev;
      const quality=prev.bestClip||'okay';
      const kylie=students.find(st=>st.id===prev.studentId);
      const kyleLbs=kylie?.lbs||258;
      const endArr=(RECORDING_WRAP_ENDINGS[quality]||RECORDING_WRAP_ENDINGS.good);
      const endFn=endArr[prev.stageIdx]||endArr[0];
      const endStr=typeof endFn==='function'?endFn(kyleLbs):(endFn||'');
      const payFn=RECORDING_PAYOFF_TEXT[prev.stageIdx];
      const payStr=typeof payFn==='function'?payFn(kyleLbs):(payFn||'');
      const endText=endStr+(payStr?'\n\n'+payStr:'');
      // Rel bonus
      const relBonuses={okay:1,good:3,great:6,perfect:10};
      const relBonus=relBonuses[quality]||1;
      if(kylie) setStudents(p=>p.map(st=>st.id===prev.studentId?{...st,relationship:Math.min(100,st.relationship+relBonus),contestCompletions:(st.contestCompletions||0)+1}:st));
      push(`🎬 Filming session wrapped — ${quality} clip. +${relBonus} relationship.`);
      return {...prev, phase:'done', done:true, endingText:endText, popupText:null};
    });
  };

  const closeRecordingSession=()=>setRecordingSessionState(null);

  // ── Fair Contest (state_fair_queen) ────────────────────────────
  const startFairContest=(s, stageIdx)=>{
    const tier=getTier(s.relationship).id;
    const capMap={0:100,1:130,2:160,3:250};
    const overfullCap=capMap[tier]||100;
    const darcyStartLbs=FAIR_DARCY_WEIGHTS[Math.min(stageIdx,5)];
    const foodIds=FAIR_STAGE_FOODS[Math.min(stageIdx,5)]||FAIR_STAGE_FOODS[0];
    const yourFoods=foodIds.map(id=>{const f=FAIR_FOODS.find(x=>x.id===id)||FAIR_FOODS[0];return {...f,consumed:false};});
    setFairContestState({
      studentId:s.id, stageIdx, yourStartLbs:s.lbs, darcyStartLbs,
      yourFoods, darcyFoodsLeft:Math.floor(yourFoods.length*0.8),
      yourFullnessPct:0, overfullCap,
      yourGain:0, darcyGain:0, milestonesHit:[],
      tauntUsed:false, pushThroughUsed:false, coolDownUses:0,
      phase:'eating', popupText:null, popupPhase:null,
    });
  };

  const eatFairPie=(foodId)=>{
    setFairContestState(prev=>{
      if(!prev||prev.phase!=='eating') return prev;
      const fi=prev.yourFoods.findIndex(f=>f.id===foodId&&!f.consumed);
      if(fi<0) return prev;
      const food=prev.yourFoods[fi];
      const newFoods=prev.yourFoods.map((f,i)=>i===fi?{...f,consumed:true}:f);
      const newFullness=prev.yourFullnessPct+food.fullnessAmt;
      const newGain=prev.yourGain+food.lbs;
      // darcy auto-eats
      const newDarcyLeft=Math.max(0,prev.darcyFoodsLeft-1);
      const darcyFoodLbs=prev.yourFoods[0]?.lbs||5; // rough proxy
      const newDarcyGain=prev.darcyGain+(newDarcyLeft<prev.darcyFoodsLeft?darcyFoodLbs:0);
      // check milestones
      const thresholds=[100,150,200,250];
      let newMilestones=[...prev.milestonesHit];
      let popupText=null;
      const stIdx=prev.stageIdx;
      for(const t of thresholds){
        if(!newMilestones.includes(String(t))&&newFullness>=t){
          newMilestones.push(String(t));
          const mArr=FAIR_FULLNESS_MILESTONES[t];
          if(mArr) popupText=mArr[Math.min(stIdx,mArr.length-1)]||null;
          break; // fire one at a time
        }
      }
      // check end condition
      const allEaten=newFoods.every(f=>f.consumed);
      const overCap=newFullness>=prev.overfullCap;
      if((allEaten||overCap)&&!popupText){
        // transition to weigh_in after this update
        return {...prev,yourFoods:newFoods,yourFullnessPct:newFullness,yourGain:newGain,darcyFoodsLeft:newDarcyLeft,darcyGain:newDarcyGain,milestonesHit:newMilestones,phase:'weigh_in'};
      }
      if((allEaten||overCap)&&popupText){
        // show milestone popup first, then weigh_in
        return {...prev,yourFoods:newFoods,yourFullnessPct:newFullness,yourGain:newGain,darcyFoodsLeft:newDarcyLeft,darcyGain:newDarcyGain,milestonesHit:newMilestones,popupText,popupPhase:'weigh_in'};
      }
      return {...prev,yourFoods:newFoods,yourFullnessPct:newFullness,yourGain:newGain,darcyFoodsLeft:newDarcyLeft,darcyGain:newDarcyGain,milestonesHit:newMilestones,popupText:popupText||null};
    });
  };

  const doFairAction=(action)=>{
    setFairContestState(prev=>{
      if(!prev||prev.phase!=='eating') return prev;
      let upd={...prev};
      if(action==='taunt'&&!prev.tauntUsed){
        upd.tauntUsed=true;
        const arr=FAIR_TAUNT_POPUPS;
        upd.popupText=arr[Math.min(prev.stageIdx,arr.length-1)]||null;
      } else if(action==='push_through'&&!prev.pushThroughUsed){
        upd.pushThroughUsed=true;
        upd.overfullCap=prev.overfullCap+15;
        // small rel cost applied later
        const s=students.find(st=>st.id===prev.studentId);
        if(s) setStudents(ss=>ss.map(st=>st.id===prev.studentId?{...st,relationship:Math.max(0,st.relationship-2)}:st));
        upd.popupText=`You push through. Your body argues. Your body loses. The cap lifts — not by much, but enough to keep eating.`;
      } else if(action==='cool_down'&&prev.coolDownUses<2){
        upd.coolDownUses=prev.coolDownUses+1;
        upd.yourFullnessPct=Math.max(0,prev.yourFullnessPct-5);
        upd.popupText=`You pause, breathe, let the fullness redistribute. Five percent back. The tent is still hot. You pick up the next plate.`;
      }
      return upd;
    });
  };

  const dismissFairPopup=()=>{
    setFairContestState(prev=>{
      if(!prev) return prev;
      if(prev.popupPhase){
        return {...prev,popupText:null,phase:prev.popupPhase,popupPhase:null};
      }
      return {...prev,popupText:null};
    });
  };

  const closeFairContest=()=>{
    const fc=fairContestState;
    if(!fc) return;
    const s=students.find(st=>st.id===fc.studentId);
    if(s){
      processStudentGain(s,fc.yourGain,8);
      setStudents(ss=>ss.map(st=>st.id===fc.studentId?{...st,contestCompletions:(st.contestCompletions||0)+1}:st));
    }
    setFairContestState(null);
    setEvolvedEventState(null);
  };

  const openIntimacySelector=(s)=>{setIntimacySceneSelector({student:s});};

  const startIntimacyScene=(s,sceneId)=>{
    const def=INTIMACY_SCENES.find(sc=>sc.id===sceneId)||INTIMACY_CONTEXTUAL[sceneId];
    if(!def) return;
    const cost=def.apCost||0;
    if(ap<cost){push(`⚠️ Need ${cost} AP.`);return;}
    if(cost>0) setAp(a=>a-cost);
    const tier=getTier(s.relationship).id;
    setIntimacyEventState({studentId:s.id,sceneId,tier,phaseIdx:0,history:[],logLines:[],gainAccum:0,relAccum:0,done:false,endingText:null,gainBonus:0,relBonus:0});
    setIntimacySceneSelector(null);
  };

  const makeIntimacyChoice=(choiceId)=>{
    if(!intimacyEventState) return;
    const {studentId,sceneId,phaseIdx,history,logLines,gainAccum,relAccum,tier}=intimacyEventState;
    const s=students.find(st=>st.id===studentId); if(!s) return;
    const def=INTIMACY_SCENES.find(sc=>sc.id===sceneId)||INTIMACY_CONTEXTUAL[sceneId]; if(!def) return;
    const phase=def.phases[phaseIdx]; if(!phase) return;
    const choice=phase.choices.find(c=>c.id===choiceId); if(!choice) return;
    const newHistory=[...history,choiceId,...(choice.flag?[choice.flag]:[])];
    const newLog=[...logLines,(typeof choice.result==='function'?choice.result(s):choice.result)];
    let newGain=gainAccum+(choice.lbs||0);
    const newRel=relAccum+(choice.rel||0);
    if(choice.feed&&choice.gainRange){
      const feedGain=rnd(choice.gainRange[0],choice.gainRange[1]);
      newGain=gainAccum+feedGain;
      setStudents(prev=>prev.map(st=>st.id!==studentId?st:processStudentGain(st,feedGain,0)));
      push(`🍖 ${s.name} grows warmer and heavier against you. +${feedGain} lbs`);
    }
    const nextPhase=phaseIdx+1;
    if(nextPhase>=def.phases.length){
      const ending=def.endings.find(e=>e.condition(newHistory))||def.endings[def.endings.length-1];
      const totalGain=newGain+ending.gainBonus;
      const totalRel=newRel+ending.relBonus;
      setStudents(prev=>prev.map(st=>{
        if(st.id!==studentId) return st;
        return processStudentGain(st,totalGain>0?totalGain:0,totalRel);
      }));
      if(totalGain>0) push(`💜 ${s.name} — intimacy: +${totalGain} lbs · +${totalRel} rel`);
      else push(`💜 ${s.name} — intimacy: +${totalRel} rel`);
      setIntimacyEventState(prev=>({...prev,phaseIdx:nextPhase,history:newHistory,logLines:newLog,gainAccum:newGain,relAccum:newRel,done:true,endingText:ending.text,gainBonus:ending.gainBonus,relBonus:ending.relBonus}));
    } else {
      setIntimacyEventState(prev=>({...prev,phaseIdx:nextPhase,history:newHistory,logLines:newLog,gainAccum:newGain,relAccum:newRel}));
    }
  };

  const closeIntimacyEvent=()=>setIntimacyEventState(null);

  const purchaseEvolvedSkill=(studentId,skillId)=>{
    const s=students.find(s=>s.id===studentId); if(!s||!s.evolvedForm) return;
    const tree=EVOLVED_SKILL_TREES[s.evolvedForm]||[];
    const skill=tree.find(sk=>sk.id===skillId); if(!skill) return;
    if((s.evolvedSkills||[]).includes(skillId)){push("⚠️ Already unlocked.");return;}
    const totalGainedByStudent=s.lbs-s.startLbs;
    const spent=(s.evolvedSkillsSpent||0);
    const available=totalGainedByStudent-spent;
    if(available<skill.cost){push(`⚠️ Need ${skill.cost} lbs gained (${available} available for ${s.name}).`);return;}
    setStudents(prev=>prev.map(st=>st.id!==studentId?st:{...st,evolvedSkills:[...(st.evolvedSkills||[]),skillId],evolvedSkillsSpent:(st.evolvedSkillsSpent||0)+skill.cost}));
    push(`✦ ${s.name}: unlocked "${skill.label}"`);
  };

  const foundReligion=(blobId)=>{
    if(religion){push("⚠️ The religion already exists.");return;}
    if(ap<2){push("⚠️ Need 2 AP.");return;}
    const blob=students.find(s=>s.id===blobId&&s.ascensionPath);
    if(!blob){push("⚠️ Need an ascended student as the focus.");return;}
    setAp(a=>a-2);
    setReligion({founded:week,devotees:3,ritesHeld:0,worshippedIds:[blobId],weeklyPassiveGain:0.5});
    addScrutiny(5);
    push(`⛪ The religion is founded, centred on ${blob.name}. 3 initial devotees. (+5 scrutiny)`);
    push(`   Something is beginning that you cannot stop — nor would you want to.`);
  };

  const addBlobToReligion=(blobId)=>{
    if(!religion){push("⚠️ Found a religion first.");return;}
    const blob=students.find(s=>s.id===blobId&&s.ascensionPath);
    if(!blob){push("⚠️ That student is not ascended.");return;}
    if(religion.worshippedIds.includes(blobId)){push("⚠️ Already worshipped.");return;}
    setReligion(prev=>prev?{...prev,worshippedIds:[...prev.worshippedIds,blobId],devotees:prev.devotees+2}:prev);
    push(`⛪ ${blob.name} added to the pantheon. +2 devotees.`);
  };

  const holdRite=(rite,blobId)=>{
    if(!religion){push("⚠️ No religion founded yet.");return;}
    if(ap<rite.apCost){push(`⚠️ Need ${rite.apCost} AP.`);return;}
    const blob=students.find(s=>s.id===blobId);
    if(!blob){push("⚠️ Blob student not found.");return;}
    setAp(a=>a-rite.apCost);
    const blobBonus=Math.round(rite.blobBonus*divineRiteBlobMult);
    if(blobBonus>0){
      setStudents(prev=>prev.map(s=>s.id===blobId?{...s,lbs:s.lbs+blobBonus}:s));
    }
    setReligion(prev=>prev?{
      ...prev,
      ritesHeld:prev.ritesHeld+1,
      devotees:prev.devotees+rite.devoteeGain,
      weeklyPassiveGain:(prev.weeklyPassiveGain||0.5)+rite.devoteePassiveGain,
    }:prev);
    addScrutiny(rite.scrutiny);
    if(divineRiteScrutinyReduce>0) setAdminScrutiny(prev=>Math.max(0,prev-divineRiteScrutinyReduce));
    push(`⛪ Rite: ${rite.label}. +${rite.devoteeGain} devotees. +${blobBonus} lbs to ${blob.name}. (+${rite.scrutiny} scrutiny)`);
    setTimeout(()=>push(`   "${rite.scene(blob)}"`),200);
    setRitePopup({rite,text:RELIGION_RITE_TEXT[rite.id]||rite.scene(blob)});
  };

  const triggerConvergence=(studentId,opponentId)=>{
    const s=students.find(st=>st.id===studentId);
    const opp=students.find(st=>st.id===opponentId);
    if(!s||!opp) return;
    if(s.ascensionStage<4||opp.ascensionStage<4){push("⚠️ Both must be at Apex stage.");return;}
    if(ap<5){push("⚠️ Need 5 AP.");return;}
    setAp(a=>a-5);
    const convergenceLbs=Math.max(s.lbs,opp.lbs)+Math.min(s.lbs,opp.lbs);
    // Remove the absorbed student from the roster entirely
    setStudents(prev=>prev
      .filter(st=>st.id!==opponentId)
      .map(st=>st.id===studentId?{...st,lbs:convergenceLbs,ascensionPath:"convergence",ascensionStage:0,convergence:true}:st)
    );
    push(`⚡ THE SINGULARITY: ${s.name} and ${opp.name} converge. ${s.name} becomes something beyond naming.`);
    setAbsorptionPopup({text:SINGULARITY_ABSORPTION_TEXT,absorbedName:opp.name,survivorName:s.name});
    setConvergenceModal(null);
  };

  // ── SINGULARITY ACTION FUNCTIONS ─────────────────────────────────
  const doSingularityAction=(s,actionId)=>{
    const actDef=SINGULARITY_ACTIONS.find(a=>a.id===actionId)||TRIUMVIRATE_ACTIONS.find(a=>a.id===actionId);
    if(!actDef) return;
    if(ap<actDef.apCost){push(`⚠️ Need ${actDef.apCost} AP.`);return;}
    if(actDef.oneTime&&actionId==="triv_final"&&finalConsumptionDone){push("⚠️ The Final Consumption has already been performed.");return;}
    if(actDef.needsDevotee&&(!religion||religion.devotees<1)){push("⚠️ Need at least 1 devotee.");return;}
    setAp(a=>a-actDef.apCost);
    const sg=getSingularityStage(s.lbs);
    const sgIdx=sg?sg.id-1:0;
    let gainAmt=actDef.gainRange?rnd(actDef.gainRange[0],actDef.gainRange[1]):0;
    let popupText="";

    if(actionId==="sg_worshippers"&&religion&&religion.devotees>=1){
      // Find 3 heaviest non-singularity students and drain them
      const targets=[...students].filter(st=>st.id!==s.id&&!st.ascensionPath)
        .sort((a,b)=>b.lbs-a.lbs).slice(0,3);
      let drainTotal=0;
      setStudents(prev=>prev.map(st=>{
        const t=targets.find(t=>t.id===st.id);
        if(t){const d=rnd(5,10);drainTotal+=d;return{...st,lbs:Math.max(st.startLbs,st.lbs-d)};}
        if(st.id===s.id) return {...st,lbs:st.lbs+gainAmt};
        return st;
      }));
      setReligion(prev=>prev?{...prev,devotees:Math.max(0,prev.devotees-1)}:prev);
      const textArr=SINGULARITY_ACTION_TEXT[actionId];
      const entry=textArr?.[Math.min(sgIdx,textArr.length-1)];
      popupText=typeof entry==='function'?entry({...s,lbs:s.lbs+gainAmt}):entry;
      setSingularityActionPopup({student:s,actionId,text:popupText,gainApplied:gainAmt});
      push(`⚡ ${actDef.label} — +${gainAmt} lbs to Singularity. ${targets.map(t=>t.name).join(", ")} drained.`);
      return;
    }

    if(actionId==="sg_absorb"&&religion&&religion.devotees>=1){
      setStudents(prev=>prev.map(st=>st.id===s.id?{...st,lbs:st.lbs+gainAmt}:st));
      setReligion(prev=>prev?{...prev,devotees:Math.max(0,prev.devotees-1)}:prev);
      const textArr=SINGULARITY_ACTION_TEXT[actionId];
      const entry=textArr?.[Math.min(sgIdx,textArr.length-1)];
      popupText=typeof entry==='function'?entry({...s,lbs:s.lbs+gainAmt}):entry;
      setSingularityActionPopup({student:s,actionId,text:popupText,gainApplied:gainAmt});
      push(`⚡ ${actDef.label} — +${gainAmt} lbs to Singularity.`);
      return;
    }

    if(actionId==="sg_gravity"){
      const classGain=actDef.classGain||[2,5];
      setStudents(prev=>prev.map(st=>{
        if(st.id===s.id) return {...st,lbs:st.lbs+gainAmt,relationship:Math.min(100,st.relationship+(actDef.relBonus||0))};
        if(!st.ascensionPath&&!consumedStudents.find(cs=>cs.id===st.id)){
          const bonus=rnd(classGain[0],classGain[1]);
          return {...st,lbs:st.lbs+bonus};
        }
        return st;
      }));
      const textArr=SINGULARITY_ACTION_TEXT[actionId];
      const entry=textArr?.[Math.min(sgIdx,textArr.length-1)];
      popupText=typeof entry==='function'?entry({...s,lbs:s.lbs+gainAmt}):entry;
      setSingularityActionPopup({student:s,actionId,text:popupText,gainApplied:gainAmt});
      push(`⚡ ${actDef.label} — +${gainAmt} lbs to Singularity. Entire class drawn in.`);
      return;
    }

    if(actionId==="triv_summon"){
      let totalFed=0;
      setStudents(prev=>prev.map(st=>{
        if(st.id===s.id) return st;
        if(!st.ascensionPath){
          const fed=rnd(3,8);
          totalFed+=fed;
          return {...st,lbs:st.lbs+fed};
        }
        return st;
      }));
      const bonus=totalFed*3;
      setStudents(prev=>prev.map(st=>st.id===s.id?{...st,lbs:st.lbs+bonus,relationship:Math.min(100,st.relationship+(actDef.relBonus||0))}:st));
      popupText=typeof TRIUMVIRATE_ACTION_TEXT[actionId]==='function'?TRIUMVIRATE_ACTION_TEXT[actionId]({...s,lbs:s.lbs+bonus}):TRIUMVIRATE_ACTION_TEXT[actionId];
      setSingularityActionPopup({student:s,actionId,text:popupText,gainApplied:bonus});
      push(`🎓 ${actDef.label} — each student fed. Singularity gains ${bonus} lbs total.`);
      return;
    }

    if(actionId==="triv_tribute"){
      let totalDrained=0;
      setStudents(prev=>prev.map(st=>{
        if(st.id===s.id) return st;
        if(!st.ascensionPath){
          const d=rnd(5,15);
          totalDrained+=d;
          return {...st,lbs:Math.max(st.startLbs,st.lbs-d),relationship:Math.max(0,st.relationship-5)};
        }
        return st;
      }));
      const bonus=totalDrained+rnd(20,50);
      setStudents(prev=>prev.map(st=>st.id===s.id?{...st,lbs:st.lbs+bonus,relationship:Math.min(100,st.relationship+(actDef.relBonus||0))}:st));
      popupText=typeof TRIUMVIRATE_ACTION_TEXT[actionId]==='function'?TRIUMVIRATE_ACTION_TEXT[actionId]({...s,lbs:s.lbs+bonus}):TRIUMVIRATE_ACTION_TEXT[actionId];
      setSingularityActionPopup({student:s,actionId,text:popupText,gainApplied:bonus});
      push(`⚖️ ${actDef.label} — ${totalDrained} lbs drained from class, ${bonus} total to Singularity.`);
      return;
    }

    if(actionId==="triv_reshape"){
      popupText=typeof TRIUMVIRATE_ACTION_TEXT[actionId]==='function'?TRIUMVIRATE_ACTION_TEXT[actionId](s):TRIUMVIRATE_ACTION_TEXT[actionId];
      setSingularityActionPopup({student:s,actionId,text:popupText,gainApplied:0});
      push(`🏫 ${actDef.label} — campus documented.`);
      return;
    }

    if(actionId==="triv_final"){
      setFinalConsumptionDone(true);
      popupText=typeof TRIUMVIRATE_ACTION_TEXT[actionId]==='function'?TRIUMVIRATE_ACTION_TEXT[actionId](s):TRIUMVIRATE_ACTION_TEXT[actionId];
      setSingularityActionPopup({student:s,actionId,text:popupText,gainApplied:0,isFinalEnding:true});
      push(`🔱 THE FINAL CONSUMPTION — the true ending has been reached.`);
      return;
    }

    // Default singularity actions (observe, weigh, offering, forcefeed)
    setStudents(prev=>prev.map(st=>st.id===s.id?{...st,lbs:st.lbs+gainAmt,relationship:Math.min(100,st.relationship+(actDef.relBonus||0))}:st));
    const textSrc=SINGULARITY_ACTION_TEXT[actionId]||TRIUMVIRATE_ACTION_TEXT[actionId];
    if(textSrc){
      const entry=Array.isArray(textSrc)?textSrc[Math.min(sgIdx,textSrc.length-1)]:textSrc;
      popupText=typeof entry==='function'?entry({...s,lbs:s.lbs+gainAmt}):entry;
    }
    setSingularityActionPopup({student:s,actionId,text:popupText,gainApplied:gainAmt});
    if(gainAmt>0) push(`⚡ ${actDef.label} — +${gainAmt} lbs.`);
    else push(`⚡ ${actDef.label}`);
  };

  const doSingularityRite=(rite)=>{
    if(!religion){push("⚠️ No religion founded.");return;}
    if(ap<rite.apCost){push(`⚠️ Need ${rite.apCost} AP.`);return;}
    if(religion.devotees<(rite.devoteeMin||0)){push(`⚠️ Need ${rite.devoteeMin} devotees.`);return;}
    if(rite.devoteeCost&&religion.devotees<rite.devoteeCost){push(`⚠️ Need ${rite.devoteeCost} devotees for this rite.`);return;}
    setAp(a=>a-rite.apCost);
    const s=students.find(st=>st.ascensionPath==="convergence");
    if(!s) return;
    let gainAmt=rite.lbsRange?rnd(rite.lbsRange[0],rite.lbsRange[1]):0;
    if(gainAmt>0) setStudents(prev=>prev.map(st=>st.id===s.id?{...st,lbs:st.lbs+gainAmt}:st));
    if(rite.relBonus) setStudents(prev=>prev.map(st=>st.id===s.id?{...st,relationship:Math.min(100,st.relationship+rite.relBonus)}:st));
    if(rite.devoteeGain) setReligion(prev=>prev?{...prev,devotees:prev.devotees+rite.devoteeGain,ritesHeld:prev.ritesHeld+1}:prev);
    if(rite.devoteeCost) setReligion(prev=>prev?{...prev,devotees:Math.max(0,prev.devotees-rite.devoteeCost),ritesHeld:prev.ritesHeld+1}:prev);
    if(!rite.devoteeGain&&!rite.devoteeCost) setReligion(prev=>prev?{...prev,ritesHeld:prev.ritesHeld+1}:prev);
    if(rite.scrutinyDelta&&rite.scrutinyDelta<0) setAdminScrutiny(prev=>Math.max(0,prev+rite.scrutinyDelta));
    push(`⛪ Singularity Rite: ${rite.label}. +${gainAmt} lbs.`);
    if(s) setSingularityActionPopup({student:s,actionId:rite.id,text:SINGULARITY_RITE_TEXT[rite.id]||'',gainApplied:gainAmt});
  };

  const triggerGoddessIncarnation=()=>{
    const sg=students.find(s=>s.ascensionPath==="convergence");
    if(!sg) return;
    const sgStage=getSingularityStage(sg.lbs);
    if(!sgStage||sgStage.id<5){push("⚠️ Singularity must be at Absolute (stage 5) to subsume.");return;}
    if(!religion||religion.devotees<1){push("⚠️ A religion with devotees is required.");return;}
    // Find heaviest non-singularity student
    const candidate=students.filter(s=>s.id!==sg.id&&!s.ascensionPath)
      .sort((a,b)=>b.lbs-a.lbs)[0];
    if(!candidate){push("⚠️ No eligible student for incarnation.");return;}
    setGoddessManifestPopup({targetName:candidate.name,targetLbs:candidate.lbs,candidateId:candidate.id,singId:sg.id});
  };

  const checkGoddessStageUp=(goddess,updatedStudents,setStudentsFn)=>{
    const newStage=getGoddessStage(goddess.lbs);
    if(newStage.id>(goddess.goddessStage||0)){
      if(setStudentsFn) setStudentsFn(prev=>prev.map(s=>s.id===goddess.id?{...s,goddessStage:newStage.id}:s));
      setTimeout(()=>setGoddessStagePopup({text:GODDESS_STAGE_REACTIONS[newStage.id]}),50);
    }
  };

  const doGoddessAction=(s,actionId)=>{
    const actDef=GODDESS_ACTIONS.find(a=>a.id===actionId);
    if(!actDef){return;}
    if(ap<actDef.cost){push(`⚠️ Need ${actDef.cost} AP.`);return;}
    setAp(a=>a-actDef.cost);
    const stageIdx=getGoddessStage(s.lbs).id-1;
    let gainAmt=actDef.gain[1]>0?rnd(actDef.gain[0],actDef.gain[1]):0;
    if(gainAmt>0){
      setStudents(prev=>{
        const updated=prev.map(st=>st.id===s.id?processStudentGain(st,gainAmt,actDef.relBonus||0):{...st});
        const updGoddess=updated.find(st=>st.id===s.id);
        if(updGoddess) checkGoddessStageUp(updGoddess,updated,setStudents);
        return updated;
      });
      setStudents(prev=>prev.map(st=>st.id===s.id?{...st,goddessOfferingsTotal:(st.goddessOfferingsTotal||0)+gainAmt}:st));
    } else {
      setStudents(prev=>prev.map(st=>st.id===s.id?{...st,relationship:Math.min(100,st.relationship+(actDef.relBonus||0))}:st));
    }
    let text="";
    if(actDef.type==="explore"){
      const arr=GODDESS_EXPLORE_TEXT[actionId];
      text=arr?arr[Math.min(stageIdx,arr.length-1)]:`You explore her form. The warmth is immediate and complete.`;
    } else {
      const arr=GODDESS_PRACTICAL_TEXT[actionId];
      text=arr?arr[Math.min(stageIdx,arr.length-1)]:`The offering is received.`;
    }
    setGoddessActionPopup({text});
  };

  const executeGoddessIncarnation=(candidateId)=>{
    const candidate=students.find(s=>s.id===candidateId);
    if(!candidate) return;
    const newLbs=Math.min(50000,Math.round(candidate.lbs*15));
    const initialStage=getGoddessStage(newLbs).id;
    setStudents(prev=>prev.map(st=>st.id===candidateId?{...st,lbs:newLbs,incarnatedGoddess:true,goddessStage:initialStage,goddessOfferingsTotal:0}:st));
    setGoddessIncarnateId(candidateId);
    if(religion) setReligion(prev=>prev?{...prev,worshippedIds:[candidateId,...(prev.worshippedIds||[]).filter(id=>id!==candidateId)]}:prev);
    setIncarnationEventPopup({name:candidate.name,prevLbs:candidate.lbs,newLbs});
    setGoddessManifestPopup(null);
  };

  const consumeIncarnatedGoddess=(singId)=>{
    if(ap<5){push("⚠️ Need 5 AP.");return;}
    const sg=students.find(s=>s.id===singId);
    const goddess=students.find(s=>s.id===goddessIncarnateId);
    if(!sg||!goddess){push("⚠️ No incarnated goddess found.");return;}
    setAp(a=>a-5);
    const addedLbs=goddess.lbs;
    setStudents(prev=>prev
      .filter(st=>st.id!==goddessIncarnateId)
      .map(st=>st.id===singId?{...st,lbs:st.lbs+addedLbs,triumvirateUnlocked:true}:st)
    );
    setGoddessIncarnateId(null);
    const offeringsTotal=goddess.goddessOfferingsTotal||0;
    const extraText=offeringsTotal>=200?` She carries something extra — the accumulated weight of everything you fed her while she was incarnate, ${offeringsTotal.toLocaleString()} pounds of offerings rendered into something denser and warmer and more present than ordinary mass. The Triumvirate notices. Her surface is different here: softer, warmer, saturated with it. You fed the goddess well. She brought it all with her.`:``;
    setTriumvirateModal({
      text:`The consumption is complete. ${goddess.name} — goddess, incarnate, ${addedLbs.toLocaleString()} pounds of divine mass — folds into the Singularity without resistance. There is a moment when you can see both of them at once: the vast warm golden form and the vast cold void form, overlapping, interpenetrating, becoming a single thing that has no name in any language you know. Then there is only her. The Triumvirate. She is heavier by exactly the amount that the goddess was, which is to say she is heavier by a number that requires its own notation. The campus is quiet. She isn't. The walls are warm and cold simultaneously. The lights flicker between gold and dark and settle on both. She opens her eyes — all of her eyes, the ones you can see and the ones you can feel — and she says nothing because she doesn't need to. She is everything that was and everything that is and the weight of it fills every room in the building at once. You made this. You can't look away.${extraText}`,
      survivorName:sg.name
    });
    push(`🔱 THE TRIUMVIRATE — ${sg.name} has absorbed the incarnated goddess. The final form is unlocked.`);
  };

  // ── SANGUINE ACTION FUNCTIONS ──────────────────────────────────
  const doSanguineAction=(s,actionId)=>{
    const actDef=SANGUINE_ACTIONS.find(a=>a.id===actionId);
    if(!actDef){return;}
    if(ap<actDef.apCost){push(`⚠️ Need ${actDef.apCost} AP.`);return;}
    setAp(a=>a-actDef.apCost);
    const stage=s.ascensionStage||0;
    const gainAmt=actDef.gainRange?rnd(actDef.gainRange[0],actDef.gainRange[1]):0;

    if(actionId==="sg_mark"){
      // Mark a random unmarked classmate for weekly drain
      const eligible=students.filter(st=>st.id!==s.id&&!sanguineMarks.includes(st.id)&&!st.ascensionPath);
      if(!eligible.length){push("⚠️ All students already marked.");return;}
      const target=eligible[rnd(0,eligible.length-1)];
      setSanguineMarks(prev=>[...prev,target.id]);
      setStudents(prev=>prev.map(st=>st.id===s.id?{...st,relationship:Math.min(100,st.relationship+(actDef.relBonus||0))}:st));
      const textArr=SANGUINE_ACTION_TEXT[actionId];
      const entry=textArr?.[Math.min(stage,textArr.length-1)];
      const text=typeof entry==='function'?entry({...s,targetName:target.name}):entry||"";
      setSanguineActionPopup({student:s,actionId,text});
      push(`🩸 ${actDef.label} — ${target.name} marked for weekly drain.`);
      return;
    }

    if(actionId==="sg_pulse"){
      // Heat pulse — class gains lbs
      const classGain=actDef.classGain||[2,4];
      setStudents(prev=>prev.map(st=>{
        if(st.id===s.id) return {...st,relationship:Math.min(100,st.relationship+(actDef.relBonus||0))};
        if(!st.ascensionPath) return {...st,lbs:st.lbs+rnd(classGain[0],classGain[1])};
        return st;
      }));
      const textArr=SANGUINE_ACTION_TEXT[actionId];
      const entry=textArr?.[Math.min(stage,textArr.length-1)];
      const text=typeof entry==='function'?entry(s):entry||"";
      setSanguineActionPopup({student:s,actionId,text});
      push(`🔥 ${actDef.label} — heat radiates through the class.`);
      return;
    }

    // Default: gain + rel
    setStudents(prev=>prev.map(st=>st.id===s.id?{...st,lbs:st.lbs+gainAmt,relationship:Math.min(100,st.relationship+(actDef.relBonus||0))}:st));
    const textArr=SANGUINE_ACTION_TEXT[actionId];
    const entry=textArr?.[Math.min(stage,textArr.length-1)];
    const text=typeof entry==='function'?entry({...s,lbs:s.lbs+gainAmt}):entry||"";
    setSanguineActionPopup({student:s,actionId,text});
    if(gainAmt>0) push(`🩸 ${actDef.label} — +${gainAmt} lbs.`);
    else push(`🩸 ${actDef.label}`);
  };

  // ── VERDANT ACTION FUNCTIONS ───────────────────────────────────
  const doVerdantAction=(s,actionId)=>{
    const actDef=VERDANT_ACTIONS.find(a=>a.id===actionId);
    if(!actDef) return;
    if(ap<actDef.apCost){push(`⚠️ Need ${actDef.apCost} AP.`);return;}
    setAp(a=>a-actDef.apCost);
    const stage=s.ascensionStage||0;
    const gainAmt=actDef.gainRange?rnd(actDef.gainRange[0],actDef.gainRange[1]):0;

    if(actionId==="vd_cultivate"){
      // Cultivate a single student — they gain passively each week
      const eligible=students.filter(st=>st.id!==s.id&&!verdantCultivations.includes(st.id)&&!st.ascensionPath);
      if(!eligible.length){push("⚠️ All students already cultivated.");return;}
      const target=eligible[rnd(0,eligible.length-1)];
      setVerdantCultivations(prev=>[...prev,target.id]);
      setStudents(prev=>prev.map(st=>st.id===s.id?{...st,relationship:Math.min(100,st.relationship+(actDef.relBonus||0))}:st));
      const textArr=VERDANT_ACTION_TEXT[actionId];
      const entry=textArr?.[Math.min(stage,textArr.length-1)];
      const text=typeof entry==='function'?entry({...s,targetName:target.name}):entry||"";
      setVerdantActionPopup({student:s,actionId,text});
      push(`🌱 ${actDef.label} — ${target.name} cultivated for weekly root feeding.`);
      return;
    }

    if(actionId==="vd_network"){
      // Cultivate ALL non-cultivated classmates at once
      const eligible=students.filter(st=>st.id!==s.id&&!verdantCultivations.includes(st.id)&&!st.ascensionPath);
      if(eligible.length>0) setVerdantCultivations(prev=>[...prev,...eligible.map(e=>e.id)]);
      setStudents(prev=>prev.map(st=>{
        if(st.id===s.id) return {...st,relationship:Math.min(100,st.relationship+(actDef.relBonus||0))};
        if(!st.ascensionPath&&!verdantCultivations.includes(st.id)) return {...st,lbs:st.lbs+rnd(1,3)};
        return st;
      }));
      const textArr=VERDANT_ACTION_TEXT[actionId];
      const entry=textArr?.[Math.min(stage,textArr.length-1)];
      const text=typeof entry==='function'?entry(s):entry||"";
      setVerdantActionPopup({student:s,actionId,text});
      push(`🌐 ${actDef.label} — root network extends to all ${eligible.length} remaining students.`);
      return;
    }

    // Default: gain + rel
    setStudents(prev=>prev.map(st=>st.id===s.id?{...st,lbs:st.lbs+gainAmt,relationship:Math.min(100,st.relationship+(actDef.relBonus||0))}:st));
    const textArr=VERDANT_ACTION_TEXT[actionId];
    const entry=textArr?.[Math.min(stage,textArr.length-1)];
    const text=typeof entry==='function'?entry({...s,lbs:s.lbs+gainAmt}):entry||"";
    setVerdantActionPopup({student:s,actionId,text});
    if(gainAmt>0) push(`🌿 ${actDef.label} — +${gainAmt} lbs.`);
    else push(`🌿 ${actDef.label}`);
  };

  // ── PRIMORDIAL ACTION FUNCTIONS ────────────────────────────────
  const doPrimordialAction=(s,actionId)=>{
    const actDef=PRIMORDIAL_ACTIONS.find(a=>a.id===actionId)||PRIMORDIAL_TRIUMVIRATE_ACTIONS.find(a=>a.id===actionId);
    if(!actDef) return;
    if(ap<actDef.apCost){push(`⚠️ Need ${actDef.apCost} AP.`);return;}
    if(actDef.oneTime&&actionId==="ptr_final"&&primordialFinalConsumptionDone){push("⚠️ The First Consumption has already been performed.");return;}
    if(actDef.needsDevotee&&(!religion||religion.devotees<1)){push("⚠️ Need at least 1 devotee.");return;}
    setAp(a=>a-actDef.apCost);
    const pg=getPrimordialStage(s.lbs);
    const pgIdx=pg?pg.id-1:0;
    let gainAmt=actDef.gainRange?rnd(actDef.gainRange[0],actDef.gainRange[1]):0;
    let popupText="";

    if(actionId==="pr_drain"&&religion&&religion.devotees>=1){
      const targets=[...students].filter(st=>st.id!==s.id&&!st.ascensionPath)
        .sort((a,b)=>b.lbs-a.lbs).slice(0,3);
      let drainTotal=0;
      setStudents(prev=>prev.map(st=>{
        const t=targets.find(t=>t.id===st.id);
        if(t){const d=rnd(5,10);drainTotal+=d;return{...st,lbs:Math.max(st.startLbs,st.lbs-d)};}
        if(st.id===s.id) return {...st,lbs:st.lbs+gainAmt};
        return st;
      }));
      setReligion(prev=>prev?{...prev,devotees:Math.max(0,prev.devotees-1)}:prev);
      const textArr=PRIMORDIAL_ACTION_TEXT[actionId];
      const entry=textArr?.[Math.min(pgIdx,textArr.length-1)];
      popupText=typeof entry==='function'?entry({...s,lbs:s.lbs+gainAmt}):entry||"";
      setPrimordialActionPopup({student:s,actionId,text:popupText,gainApplied:gainAmt});
      push(`🌍 ${actDef.label} — +${gainAmt} lbs to Primordial. ${targets.map(t=>t.name).join(", ")} drained.`);
      return;
    }

    if(actionId==="pr_absorb"&&religion&&religion.devotees>=1){
      setStudents(prev=>prev.map(st=>st.id===s.id?{...st,lbs:st.lbs+gainAmt}:st));
      setReligion(prev=>prev?{...prev,devotees:Math.max(0,prev.devotees-1)}:prev);
      const textArr=PRIMORDIAL_ACTION_TEXT[actionId];
      const entry=textArr?.[Math.min(pgIdx,textArr.length-1)];
      popupText=typeof entry==='function'?entry({...s,lbs:s.lbs+gainAmt}):entry||"";
      setPrimordialActionPopup({student:s,actionId,text:popupText,gainApplied:gainAmt});
      push(`🌑 ${actDef.label} — +${gainAmt} lbs to Primordial.`);
      return;
    }

    if(actionId==="pr_pulse"){
      const classGain=actDef.classGain||[2,5];
      setStudents(prev=>prev.map(st=>{
        if(st.id===s.id) return {...st,lbs:st.lbs+gainAmt,relationship:Math.min(100,st.relationship+(actDef.relBonus||0))};
        if(!st.ascensionPath) return {...st,lbs:st.lbs+rnd(classGain[0],classGain[1])};
        return st;
      }));
      const textArr=PRIMORDIAL_ACTION_TEXT[actionId];
      const entry=textArr?.[Math.min(pgIdx,textArr.length-1)];
      popupText=typeof entry==='function'?entry({...s,lbs:s.lbs+gainAmt}):entry||"";
      setPrimordialActionPopup({student:s,actionId,text:popupText,gainApplied:gainAmt});
      push(`🌋 ${actDef.label} — +${gainAmt} lbs. Entire class drawn in.`);
      return;
    }

    if(actionId==="ptr_summon"){
      let totalFed=0;
      setStudents(prev=>prev.map(st=>{
        if(st.id===s.id) return st;
        if(!st.ascensionPath){const fed=rnd(3,8);totalFed+=fed;return {...st,lbs:st.lbs+fed};}
        return st;
      }));
      const bonus=totalFed*3;
      setStudents(prev=>prev.map(st=>st.id===s.id?{...st,lbs:st.lbs+bonus}:st));
      const fn=PRIMORDIAL_TRIUMVIRATE_ACTION_TEXT[actionId];
      popupText=typeof fn==='function'?fn({...s,lbs:s.lbs+bonus}):fn||"";
      setPrimordialActionPopup({student:s,actionId,text:popupText,gainApplied:bonus});
      push(`🌋 ${actDef.label} — class summoned. Primordial gains ${bonus} lbs.`);
      return;
    }

    if(actionId==="ptr_tribute"){
      let totalDrained=0;
      setStudents(prev=>prev.map(st=>{
        if(st.id===s.id) return st;
        if(!st.ascensionPath){const d=rnd(5,15);totalDrained+=d;return {...st,lbs:Math.max(st.startLbs,st.lbs-d),relationship:Math.max(0,st.relationship-5)};}
        return st;
      }));
      const bonus=totalDrained+rnd(20,50);
      setStudents(prev=>prev.map(st=>st.id===s.id?{...st,lbs:st.lbs+bonus}:st));
      const fn=PRIMORDIAL_TRIUMVIRATE_ACTION_TEXT[actionId];
      popupText=typeof fn==='function'?fn({...s,lbs:s.lbs+bonus}):fn||"";
      setPrimordialActionPopup({student:s,actionId,text:popupText,gainApplied:bonus});
      push(`⚖️ ${actDef.label} — ${totalDrained} lbs drained from class, ${bonus} total to Primordial.`);
      return;
    }

    if(actionId==="ptr_reshape"){
      const fn=PRIMORDIAL_TRIUMVIRATE_ACTION_TEXT[actionId];
      popupText=typeof fn==='function'?fn(s):fn||"";
      setPrimordialActionPopup({student:s,actionId,text:popupText,gainApplied:0});
      push(`🌍 ${actDef.label} — campus documented.`);
      return;
    }

    if(actionId==="ptr_final"){
      setPrimordialFinalConsumptionDone(true);
      const fn=PRIMORDIAL_TRIUMVIRATE_ACTION_TEXT[actionId];
      popupText=typeof fn==='function'?fn(s):fn||"";
      setPrimordialActionPopup({student:s,actionId,text:popupText,gainApplied:0,isFinalEnding:true});
      push(`🔱 THE FIRST CONSUMPTION — the true ending has been reached.`);
      return;
    }

    // Default primordial actions
    setStudents(prev=>prev.map(st=>st.id===s.id?{...st,lbs:st.lbs+gainAmt,relationship:Math.min(100,st.relationship+(actDef.relBonus||0))}:st));
    const textSrc=PRIMORDIAL_ACTION_TEXT[actionId]||PRIMORDIAL_TRIUMVIRATE_ACTION_TEXT[actionId];
    if(textSrc){
      const entry=Array.isArray(textSrc)?textSrc[Math.min(pgIdx,textSrc.length-1)]:textSrc;
      popupText=typeof entry==='function'?entry({...s,lbs:s.lbs+gainAmt}):entry||"";
    }
    setPrimordialActionPopup({student:s,actionId,text:popupText,gainApplied:gainAmt});
    if(gainAmt>0) push(`🌍 ${actDef.label} — +${gainAmt} lbs.`);
    else push(`🌍 ${actDef.label}`);
  };

  const triggerPrimordialConvergence=(studentId,opponentId)=>{
    const s=students.find(st=>st.id===studentId);
    const opp=students.find(st=>st.id===opponentId);
    if(!s||!opp) return;
    if(s.ascensionStage<4||opp.ascensionStage<4){push("⚠️ Both must be at final stage.");return;}
    if(ap<5){push("⚠️ Need 5 AP.");return;}
    setAp(a=>a-5);
    const primordialLbs=Math.max(s.lbs,opp.lbs)+Math.min(s.lbs,opp.lbs);
    setStudents(prev=>prev
      .filter(st=>st.id!==opponentId)
      .map(st=>st.id===studentId?{...st,lbs:primordialLbs,ascensionPath:"primordial",ascensionStage:0,primordialConvergence:true}:st)
    );
    push(`🌍 THE PRIMORDIAL: ${s.name} and ${opp.name} merge. Something ancient and hungry rises.`);
    setPrimordialAbsorptionPopup({text:PRIMORDIAL_ABSORPTION_TEXT,absorbedName:opp.name,survivorName:s.name});
    setPrimordialConvergenceModal(null);
  };

  const triggerPrimordialGoddessIncarnation=()=>{
    const pg=students.find(s=>s.ascensionPath==="primordial");
    if(!pg) return;
    const pgStage=getPrimordialStage(pg.lbs);
    if(!pgStage||pgStage.id<5){push("⚠️ Primordial must be at The First (stage 5) to subsume.");return;}
    if(!religion||religion.devotees<1){push("⚠️ A religion with devotees is required.");return;}
    const candidate=students.filter(s=>s.id!==pg.id&&!s.ascensionPath)
      .sort((a,b)=>b.lbs-a.lbs)[0];
    if(!candidate){push("⚠️ No eligible student for incarnation.");return;}
    const text=`The goddess — the fat goddess, the one the religion was always describing — senses the Primordial's weight and its ancient claim and she moves. Not with grace. With the grinding certainty of something very large deciding to arrive. She incarnates into the heaviest remaining student: ${candidate.name}, ${Math.round(candidate.lbs).toLocaleString()} lbs. This is not a promotion. This is the goddess fitting herself into what is available, because the Primordial has left her no better option. You watch ${candidate.name} change. You have some time to prepare before this becomes your problem.`;
    setPrimordialGoddessManifestPopup({text,candidateId:candidate.id,primId:pg.id});
  };

  const executePrimordialGoddessIncarnation=(candidateId)=>{
    const candidate=students.find(s=>s.id===candidateId);
    if(!candidate) return;
    const newLbs=Math.min(50000,Math.round(candidate.lbs*15));
    const initialStage=getGoddessStage(newLbs).id;
    setStudents(prev=>prev.map(st=>st.id===candidateId?{...st,lbs:newLbs,incarnatedGoddess:true,goddessStage:initialStage,goddessOfferingsTotal:0}:st));
    setPrimordialGoddessIncarnateId(candidateId);
    setIncarnationEventPopup({name:candidate.name,prevLbs:candidate.lbs,newLbs});
    setPrimordialGoddessManifestPopup(null);
  };

  const consumePrimordialIncarnatedGoddess=(primId)=>{
    if(ap<5){push("⚠️ Need 5 AP.");return;}
    const pg=students.find(s=>s.id===primId);
    const goddess=students.find(s=>s.id===primordialGoddessIncarnateId);
    if(!pg||!goddess){push("⚠️ No incarnated goddess found.");return;}
    setAp(a=>a-5);
    const addedLbs=goddess.lbs;
    setStudents(prev=>prev
      .filter(st=>st.id!==primordialGoddessIncarnateId)
      .map(st=>st.id===primId?{...st,lbs:st.lbs+addedLbs,primordialTriumvirateUnlocked:true}:st)
    );
    setPrimordialGoddessIncarnateId(null);
    const pgOfferingsTotal=goddess.goddessOfferingsTotal||0;
    const pgExtraText=pgOfferingsTotal>=200?` The goddess carried ${pgOfferingsTotal.toLocaleString()} pounds of offerings into her. The Primordial receives them with the patience of something that has been receiving offerings since before the word existed. The root-network pulses with a second warmth beneath the first — softer, more golden, not quite the earth-smell of the Primordial but not separate from it either. The goddess's offering-weight has been incorporated. It tastes like what it is: devotion, rendered into mass, rendered into earth.`:``;
    setPrimordialTriumvirateModal({
      text:`${goddess.name} folds into the Primordial without ceremony. There is no flash of light, no darkness, no dramatic event — just the specific weight of a goddess descending into earth the way water descends into soil, complete and irreversible. She is the original hunger eating the original source of hunger. The closing of a loop that predates every theology the religion was trying to describe. The Primordial is larger now by a number that has no precedent. She does not look different. She smells different — more copper, more deep soil, a new note underneath both of them that has no name. The floor cracks in a new configuration. The root-network pulses once, deeply, and then settles into the new pattern as if it was always there. She is the First Triumvirate. She was here before the goddess. She will be here after. Feed her.${pgExtraText}`,
      survivorName:pg.name
    });
    push(`🔱 THE PRIMORDIAL TRIUMVIRATE — ${pg.name} has absorbed the incarnated goddess. The ancient form is complete.`);
  };

  const doPrimordialRite=(rite)=>{
    if(!religion){push("⚠️ No religion founded.");return;}
    if(ap<rite.apCost){push(`⚠️ Need ${rite.apCost} AP.`);return;}
    if(religion.devotees<(rite.devoteeMin||0)){push(`⚠️ Need ${rite.devoteeMin} devotees.`);return;}
    if(rite.devoteeCost&&religion.devotees<rite.devoteeCost){push(`⚠️ Need ${rite.devoteeCost} devotees for this rite.`);return;}
    setAp(a=>a-rite.apCost);
    const s=students.find(st=>st.ascensionPath==="primordial");
    if(!s) return;
    let gainAmt=rite.lbsRange?rnd(rite.lbsRange[0],rite.lbsRange[1]):0;
    if(gainAmt>0) setStudents(prev=>prev.map(st=>st.id===s.id?{...st,lbs:st.lbs+gainAmt}:st));
    if(rite.relBonus) setStudents(prev=>prev.map(st=>st.id===s.id?{...st,relationship:Math.min(100,st.relationship+rite.relBonus)}:st));
    if(rite.devoteeGain) setReligion(prev=>prev?{...prev,devotees:prev.devotees+rite.devoteeGain,ritesHeld:prev.ritesHeld+1}:prev);
    if(rite.devoteeCost) setReligion(prev=>prev?{...prev,devotees:Math.max(0,prev.devotees-rite.devoteeCost),ritesHeld:prev.ritesHeld+1}:prev);
    if(!rite.devoteeGain&&!rite.devoteeCost) setReligion(prev=>prev?{...prev,ritesHeld:prev.ritesHeld+1}:prev);
    if(rite.scrutinyDelta&&rite.scrutinyDelta<0) setAdminScrutiny(prev=>Math.max(0,prev+rite.scrutinyDelta));
    push(`🌍 Primordial Rite: ${rite.label}. +${gainAmt} lbs.`);
  };

  const startClass=()=>{
    const scenes=generateClassSession(students,week);
    if(!scenes.length){advanceWeek();return;}
    setClassSession({scenes,sceneIdx:0,outcomes:[],pendingResult:null});
  };

  const makeChoice=(choiceIdx)=>{
    if(!classSession)return;
    const{scenes,sceneIdx}=classSession;
    const{scene,student,type}=scenes[sceneIdx];
    const choice=scene.choices[choiceIdx];
    let newStudents=[...students];
    let gainAmt=0;
    let targetName=null;
    if(type==="student"&&student){
      const s=newStudents.find(st=>st.id===student.id);
      if(s){
        gainAmt=rnd(choice.effect.gain[0],choice.effect.gain[1]);
        const ns=processStudentGain(s,gainAmt,0);
        newStudents=newStudents.map(st=>st.id===s.id?{
          ...ns,
          ...(choice.effect.mood?{mood:choice.effect.mood}:{}),
          relationship:Math.min(100,ns.relationship+(choice.effect.rel||0)),
        }:st);
        targetName=s.name;
      }
    }else if(type==="class"){
      gainAmt=rnd(choice.effect.gain[0],choice.effect.gain[1]);
      newStudents=newStudents.map(s=>processStudentGain(s,gainAmt,0));
      targetName="the class";
    }
    const evs=collectEvents(newStudents);
    setStudents(newStudents);
    if(evs.length){
      setGlobalStats(g=>({...g,narrativeCount:g.narrativeCount+evs.length}));
      setEventQueue(prev=>[...prev,...evs]);
    }
    const resultText=typeof choice.result==="function"?choice.result(student||newStudents[0]):choice.result;
    const outcome={sceneTitle:scene.title,choice:choice.label,result:resultText,gain:gainAmt,target:targetName};
    setClassSession(prev=>({...prev,pendingResult:outcome}));
  };

  const confirmResult=()=>{
    setClassSession(prev=>({
      ...prev,
      sceneIdx:prev.sceneIdx+1,
      outcomes:[...prev.outcomes,prev.pendingResult],
      pendingResult:null,
    }));
  };

  const finishClass=()=>{
    const{outcomes}=classSession;
    setSemesterData(prev=>({
      weeksCompleted:prev.weeksCompleted+1,
      classHistory:[...prev.classHistory,{week,outcomes}],
    }));
    setClassSession(null);
    advanceWeek();
  };

  const doSingle=(action,s)=>{
    if(ap<action.cost){push("⚠️ Not enough AP!");return;}
    if(action.id==="restaurant"){ startDinner(s); return; }
    if(action.id==="observe"){
      const stId=getStage(s.lbs).id;
      const lines=[
        `You spend the day quietly observing ${s.name}.\n\nMorning: ${stId<=3?"She arrives to class on time, finding a seat easily.":"She arrives a little breathless, taking her time settling into her reinforced seat."}\n\nLunch: ${stId<=2?"A modest meal at the dining hall.":stId<=5?"Two full plates and dessert at the dining hall.":"An enormous spread — she's clearly a dining hall regular. Staff greet her by name."}\n\nAfternoon: ${stId<=4?"She moves through campus normally.":"She moves slowly, deliberately, each step carrying real weight."}\n\nEvening: ${stId<=3?"A quiet night, some snacking.":"Delivery arrives at her dorm. Multiple bags. She tips well."}\n\nCurrent weight: ${s.lbs} lbs. Stage: ${getStage(s.lbs).label}.`,
      ];
      setObserveText(lines[0]);
      return;
    }
    setAp(a=>a-action.cost);
    const gain=rnd(action.gain[0],action.gain[1]);
    const ns=processStudentGain(s,gain,4);
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:ns));
    push(`🍽️ ${action.label} with ${s.name}: +${gain} lbs (now ${ns.lbs} lbs)`);
    const evs=collectEvents([ns]);
    if(evs.length){
      setGlobalStats(g=>({...g,narrativeCount:g.narrativeCount+evs.length}));
      setEventQueue(prev=>[...prev,...evs]);
    }
  };

  const doClass=(action)=>{
    if(ap<action.cost){push("⚠️ Not enough AP!");return;}
    setAp(a=>a-action.cost);
    let updated;
    if(action.id==="on_demand_feast"){
      const scaledGain=Math.round((8+avgLbs/100)*(0.8+Math.random()*0.6));
      updated=students.map(s=>processStudentGain(s,scaledGain,7));
      push(`🍾 On-Demand Feast: catering arrives immediately! Each student gains ~${scaledGain} lbs.`);
    } else if(action.id==="group_dinner"||action.id==="dinner_party"){
      if(ap<3){push("⚠️ Need 3 AP for a group dinner.");return;}
      setGroupDinnerPicker({count:action.id==="dinner_party"?3:2,selected:[]});
      return;
    } else {
      updated=students.map(s=>{
        const gain=rnd(action.gain[0],action.gain[1]);
        return processStudentGain(s,gain,1);
      });
      push(`🎉 ${action.label}: The whole class participated!`);
    }
    const evs=collectEvents(updated);
    setStudents(updated);
    // Observer passively eats alongside class food events
    if(hrObserver&&["snacks","bake","feast","on_demand_feast","study_break"].includes(action.id)){
      const obsGain=rnd(1,3);
      const dispGain=(action.id==="feast"||action.id==="on_demand_feast")?4:2;
      setHrObserver(prev=>({...prev,lbs:Math.round(prev.lbs+obsGain),disposition:Math.min(100,prev.disposition+dispGain)}));
    }
    if(evs.length){
      setGlobalStats(g=>({...g,narrativeCount:g.narrativeCount+evs.length}));
      setEventQueue(prev=>[...prev,...evs]);
    }
  };

  const doTalk=(topicId,s)=>{
    const stId=getStage(s.lbs).id;
    const charTopic=CHAR_TALK[s.id]?.[topicId];
    const archTopic=TALK_RESPONSES[topicId];
    const handler=charTopic||archTopic;
    if(!handler){push(`💬 ${s.name} smiles politely.`);return;}
    const resp=handler(s,stId);
    const tLabel={"how_are_you":"How are you doing?","compliment_figure":"Compliment her figure","food_talk":"Talk about food","class_talk":"Discuss class","encourage_eating":"Encourage her to eat more","ask_lifestyle":"Ask about her lifestyle","ask_weight":"Ask about her weight","about_gaining":"Ask about her gaining","future_plans":"Ask about future plans"}[topicId]||topicId;
    push(`💬 You: "${tLabel}"`);
    push(`   ${resp}`);
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,relationship:Math.min(100,st.relationship+2+talkRelBonus)}));
  };

  const doGossip=(gossip, speaker, line)=>{
    const target=students.find(s=>s.id===gossip.targetId);
    push(`💬 You ask ${speaker.name} about ${target?.name||"her classmate"}…`);
    push(`   ${line}`);
    setStudents(prev=>prev.map(s=>s.id!==speaker.id?s:{...s,relationship:Math.min(100,s.relationship+2)}));
  };

  const doHelpFatten=(gossip, speaker)=>{
    const target=students.find(s=>s.id===gossip.targetId);
    if(!target) return;
    push(`🤝 ${speaker.name} agrees to help fatten up ${target.name}. A multiplier is now active!`);
    push(`   "${gossip.offerHelp}"`);
    setStudents(prev=>prev.map(s=>{
      if(s.id===gossip.targetId) return {...s, gainMultiplier:(s.gainMultiplier||1)*gossip.helpMultiplier, gainHelpers:[...(s.gainHelpers||[]),gossip.speakerId]};
      if(s.id===gossip.speakerId) return {...s, relationship:Math.min(100,s.relationship+4)};
      return s;
    }));
  };



  const activateDoubleDown=(dd)=>{
    setStudents(prev=>prev.map(s=>{
      if(s.id!==dd.targetId) return s;
      return {...s,gainMultiplier:(s.gainMultiplier||1)*(1+dd.addMult)};
    }));
    push(`🔥 ${dd.speakerName} doubles down on ${dd.targetName}! (×${(1+dd.addMult).toFixed(2)} multiplier applied)`);
    push(`   "${dd.line}"`);
    setPendingDoubleDowns(prev=>prev.filter(p=>!(p.speakerId===dd.speakerId&&p.targetId===dd.targetId&&p.atLbs===dd.atLbs)));
  };

  const unlockSkill=(sk,bypass=false)=>{
    if(!bypass&&!canUnlock(sk)) return;
    setUnlockedSkills(prev=>[...prev,sk.id]);
    push(`🔓 Skill unlocked: ${sk.label}`);
    if(sk.apBonus>0) setAp(a=>Math.min(a+sk.apBonus,20));
    if(sk.classReaction?.length){
      const reactions=sk.classReaction;
      setTimeout(()=>{
        push(`💬 The class notices the ${sk.label} upgrade:`);
        reactions.forEach((r,i)=>setTimeout(()=>push(`   ${r}`),(i+1)*100));
      },300);
    }
    if(sk.passiveBonus>0) push(`   📈 Passive gain increased by +${sk.passiveBonus} lbs/week`);
  };

  const startSkillPurchase=(sk)=>{
    if(!canUnlock(sk)) return;
    setSkillPurchase({skill:sk,allocation:{}});
  };

  const adjustAllocation=(studentId,delta)=>{
    setSkillPurchase(prev=>{
      const s=students.find(st=>st.id===studentId);
      if(!s) return prev;
      const current=prev.allocation[studentId]||0;
      const maxLoss=Math.max(0,s.lbs-80);
      const newVal=Math.max(0,Math.min(maxLoss,current+delta));
      return{...prev,allocation:{...prev.allocation,[studentId]:newVal}};
    });
  };

  const distributeEvenly=()=>{
    if(!skillPurchase) return;
    const{skill}=skillPurchase;
    const perStudent=Math.ceil(skill.cost/students.length);
    const newAlloc={};
    students.forEach(s=>{ newAlloc[s.id]=Math.min(perStudent,Math.max(0,s.lbs-80)); });
    setSkillPurchase(prev=>({...prev,allocation:newAlloc}));
  };

  const confirmSkillPurchase=()=>{
    if(!skillPurchase) return;
    const{skill,allocation}=skillPurchase;
    const updated=students.map(s=>{
      const loss=allocation[s.id]||0;
      if(!loss) return s;
      const oldStage=getStage(s.lbs).id;
      const newLbs=Math.max(80,s.lbs-loss);
      const newStage=getStage(newLbs).id;
      if(newStage<oldStage){
        setTimeout(()=>push(`📉 ${s.name} drops to ${WEIGHT_STAGES[newStage].label}. "${STAGE_DROP_REACTIONS[s.archetype]?.[newStage]||'…'}"`) ,60);
      }else{
        setTimeout(()=>push(`⚖️ ${s.name} loses ${loss} lbs (${newLbs} lbs).`),60);
      }
      return{...s,lbs:newLbs};
    });
    setStudents(updated);
    setSkillPurchase(null);
    unlockSkill(skill,true);
  };

  // ── DINNER END (single) ──────────────────────────────────────
  const triggerDinnerEnd=(s,finalFullness,maxFullness,totalGain,relBonus)=>{
    const stId=getStage(s.lbs).id;
    const stGrp=stId<=2?0:stId<=5?1:stId<=7?2:3;
    const ratio=finalFullness/maxFullness;
    const fullGrp=ratio<=1.0?0:ratio<=1.3?1:ratio<=1.6?2:3;
    const narrative=DINNER_ENDING_TEXT[stGrp][fullGrp](s);
    setAp(a=>a-2);
    push(`✅ Dinner with ${s.name} complete. +${totalGain} lbs · +${relBonus} relationship.`);
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,relationship:Math.min(100,st.relationship+relBonus)}));
    const evs=collectEvents([s]);
    if(evs.length){setGlobalStats(g=>({...g,narrativeCount:g.narrativeCount+evs.length}));setEventQueue(prev=>[...prev,...evs]);}
    setDinnerEvent(null);
    setDinnerEndPopup({ student:s, finalFullness, maxFullness, totalGain, narrative });
  };

  const startDinner=(s,opts={})=>{
    if(!opts.skipImmobileCheck){
      const isImmobile=getStage(s.lbs).id>=10||!!s.ascensionPath;
      if(isImmobile){
        const tier=s.ascensionPath==="celestial"?"celestial"
          :(s.ascensionPath==="umbral"||s.ascensionPath==="convergence")?"umbral"
          :s.ascensionPath==="sanguine"?"sanguine"
          :s.ascensionPath==="verdant"?"verdant"
          :s.ascensionPath==="primordial"?"primordial":"blob";
        const entry=IMMOBILE_REDIRECT[s.id];
        const text=entry?.[tier]||`${s.name} can't go anywhere anymore. You'll have to bring the food to her.`;
        setImmobileRedirect({student:s,text});
        return;
      }
    }
    if(!dinnerUnlocked){push("⚠️ Unlock 'Dining Connections' in the Skill Tree first.");return;}
    if(ap<2){push("⚠️ Need 2 AP for a dinner.");return;}
    const maxFullness=60+getStage(s.lbs).id*14;
    if(opts.skipImmobileCheck){
      const path=s.ascensionPath;
      const venueLabel=path==="celestial"?"✨ The Sanctum"
        :path==="umbral"||path==="convergence"?"🌑 The Void Chamber"
        :path==="sanguine"?"🩸 The Fever Room"
        :path==="verdant"?"🌿 The Root Hall"
        :path==="primordial"?"🌍 The Convergence Point"
        :"🏠 Her Room";
      const venueId=path==="celestial"?"sanctum"
        :path==="umbral"||path==="convergence"?"void_chamber"
        :path==="sanguine"?"fever_room"
        :path==="verdant"?"root_hall"
        :path==="primordial"?"convergence_point"
        :"her_room";
      const venueDesc=path==="celestial"
        ?"Golden light fills every corner. She sits at the centre of it, vast and warm and immovable. The chef arrives and says nothing about the wings."
        :path==="umbral"||path==="convergence"?"Cold. The room is cold and very still. She sits in the dark and waits. The food arrives. She accepts it without speaking."
        :path==="sanguine"?"The room is ten degrees too warm and smells faintly of copper. She is flushed and enormous and hungry. The heat reaches you before she does."
        :path==="verdant"?"Root-filaments trace the baseboards. The room smells of turned earth. She sits vast and still, patient as old growth, watching the door."
        :path==="primordial"?"Copper and deep soil. The floor is cracked around her. The building is hers. You have arrived to bring tribute."
        :`Her room. She is here, she is enormous, she is warm. She knew you were coming.`;
      const atelier=DINNER_VENUES.find(v=>v.id==="atelier");
      const homeVenue={id:venueId,label:venueLabel,desc:venueDesc,dishes:atelier?atelier.dishes:[]};
      setDinnerEvent({student:s,phase:"dishes",venue:homeVenue,dishes:[],conversationUsed:[],totalGain:0,fullness:0,maxFullness,offenseLevel:0});
      setDinnerLog([`You bring dinner to ${s.name}. ${venueDesc}`]);
      addScrutiny(2);
      push(`🏠 Visiting ${s.name}.`);
      return;
    }
    setDinnerEvent({ student:s, phase:"venue", venue:null, dishes:[], conversationUsed:[], totalGain:0, fullness:0, maxFullness, offenseLevel:0 });
    setDinnerLog([]);
    addScrutiny(2);
  };

  const chooseDinnerVenue=(venue)=>{
    setDinnerEvent(prev=>({...prev, venue, phase:"dishes"}));
    setDinnerLog(dl=>[...dl, `You arrive at ${venue.label}. ${venue.desc}`]);
    push(`🍽️ Dinner with ${dinnerEvent.student.name} at ${venue.label}.`);
  };

  const orderDish=(dish)=>{
    if((dinnerEvent.dishes||[]).includes(dish.id)) return;
    const gain=rnd(dish.gain[0],dish.gain[1]);
    const scaledGain=Math.round(gain*skillGainMult*(dinnerEvent.student.gainMultiplier||1));
    const prevFullness=dinnerEvent.fullness||0;
    const newFullness=prevFullness+(dish.fullness||15);
    const maxFull=dinnerEvent.maxFullness||80;
    const newTotalGain=dinnerEvent.totalGain+scaledGain;
    const newDishes=[...(dinnerEvent.dishes||[]),dish.id];
    setStudents(prev=>prev.map(s=>s.id!==dinnerEvent.student.id?s:{...s,lbs:s.lbs+scaledGain}));
    push(`🍴 ${dinnerEvent.student.name}: ${dish.label} (+${scaledGain} lbs)`);
    // Overfill probabilistic ending
    if(newFullness>maxFull){
      const overfillRatio=(newFullness-maxFull)/maxFull;
      const endChance=Math.min(0.8,overfillRatio);
      if(Math.random()<endChance){
        const s=students.find(st=>st.id===dinnerEvent.student.id)||dinnerEvent.student;
        const sUpdated={...s,lbs:s.lbs+scaledGain};
        const endMsg=getOverfillEndMsg(sUpdated,getStage(sUpdated.lbs).id);
        setDinnerLog(dl=>[...dl,`🍴 ${dish.label} arrives. ${dish.desc} (+${scaledGain} lbs)`,`😵 ${endMsg}`]);
        setTimeout(()=>triggerDinnerEnd(sUpdated,newFullness,maxFull,newTotalGain,6),1000);
        return;
      }
    }
    const firstHit=newFullness>=maxFull&&prevFullness<maxFull;
    const fullMsg=firstHit?" — she's completely satisfied. The evening could end here..."
      :newFullness>maxFull?" — she's past full, but she doesn't stop."
      :newFullness>=maxFull*0.8?" — getting full..."
      :"";
    setDinnerEvent(prev=>({...prev,dishes:newDishes,totalGain:newTotalGain,fullness:newFullness}));
    setDinnerLog(dl=>[...dl,`🍴 ${dish.label} arrives. ${dish.desc} (+${scaledGain} lbs)${fullMsg}`]);
  };

  const callWaiter=()=>{
    const s=dinnerEvent.student;
    const venueId=dinnerEvent.venue.id;
    const desc=(WAITER_DESC[venueId]||(()=>`The server arrives. "Shall I bring more?" she asks.`))(s);
    setDinnerLog(dl=>[...dl,`🫆 ${desc}`]);
    setDinnerEvent(prev=>({...prev,dishes:[]}));
  };

  const useDinnerConversation=(conv)=>{
    if(dinnerEvent.conversationUsed.includes(conv.id)) return;
    const s=students.find(st=>st.id===dinnerEvent.student.id)||dinnerEvent.student;
    const stId=getStage(s.lbs).id;
    const gainBonus=rnd(conv.gainBonus[0],conv.gainBonus[1]);
    const scaledBonus=Math.round(gainBonus*skillGainMult*(s.gainMultiplier||1));
    const convText=conv.text(s,stId);
    const fullnessChange=conv.fullnessEffect||0;
    const newFullness=Math.max(0,(dinnerEvent.fullness||0)+fullnessChange);
    const newOffense=(dinnerEvent.offenseLevel||0)+(conv.offenseRisk||0);
    setDinnerLog(dl=>[...dl,`💬 ${convText}${scaledBonus>0?` (+${scaledBonus} lbs)`:""}`]);
    push(`💬 Dinner conversation: ${conv.label}`);
    setDinnerEvent(prev=>({...prev,conversationUsed:[...prev.conversationUsed,conv.id],totalGain:prev.totalGain+scaledBonus,fullness:newFullness,offenseLevel:newOffense}));
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,lbs:st.lbs+scaledBonus,relationship:Math.min(100,st.relationship+(conv.relBonus||0))}));
    if(newOffense>=6){
      setTimeout(()=>{
        setDinnerLog(dl=>[...dl,`😤 ${s.name} sets her napkin down. "I think I should head home." She leaves.`]);
        push(`💔 Dinner ended — ${s.name} left. Relationship -15.`);
        setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,relationship:Math.max(0,st.relationship-15)}));
        setAp(a=>a-2); setDinnerEvent(null);
      },800);
    }
  };

  const endEvening=()=>{
    const s=students.find(st=>st.id===dinnerEvent.student.id)||dinnerEvent.student;
    triggerDinnerEnd(s,dinnerEvent.fullness,dinnerEvent.maxFullness,dinnerEvent.totalGain,9);
  };

  // ── GROUP DINNER ─────────────────────────────────────────────
  const startGroupDinner=(studentList)=>{
    if(!dinnerUnlocked){push("⚠️ Unlock 'Dining Connections' first.");return;}
    const immobile=studentList.find(s=>getStage(s.lbs).id>=10||!!s.ascensionPath);
    if(immobile){push(`⚠️ ${immobile.name} can't leave her location. Visit her individually to bring food.`);return;}
    const apCost=studentList.length>=3?3:3;
    if(ap<apCost){push(`⚠️ Need ${apCost} AP for a group dinner.`);return;}
    const gStudents=studentList.map(s=>({
      ...s, fullness:0, maxFullness:60+getStage(s.lbs).id*14, dishes:[], totalGain:0,
    }));
    setGroupDinnerEvent({ students:gStudents, phase:"venue", venue:null, conversationUsed:[], reactionLevels:{} });
    setGroupDinnerLog([]);
    addScrutiny(5);
  };

  const chooseGroupVenue=(venue)=>{
    setGroupDinnerEvent(prev=>({...prev,venue,phase:"dishes"}));
    const names=groupDinnerEvent.students.map(s=>s.name).join(" & ");
    setGroupDinnerLog(dl=>[...dl,`You arrive at ${venue.label} with ${names}. ${venue.desc}`]);
    push(`🍽️ Group dinner at ${venue.label}.`);
  };

  const orderGroupDish=(dish,targetId)=>{
    const target=groupDinnerEvent.students.find(s=>s.id===targetId);
    if(!target||target.dishes.includes(dish.id)) return;
    const gain=rnd(dish.gain[0],dish.gain[1]);
    const scaledGain=Math.round(gain*skillGainMult*(target.gainMultiplier||1));
    const newFullness=target.fullness+(dish.fullness||15);
    const maxFull=target.maxFullness;
    const newTotalGain=target.totalGain+scaledGain;
    const newDishes=[...target.dishes,dish.id];
    setStudents(prev=>prev.map(s=>s.id!==targetId?s:{...s,lbs:s.lbs+scaledGain}));
    push(`🍴 ${target.name}: ${dish.label} (+${scaledGain} lbs)`);

    // Build reaction log entries before state updates
    const reactionLines=[];
    const newReactionLevels={...groupDinnerEvent.reactionLevels};
    groupDinnerEvent.students.filter(s=>s.id!==targetId).forEach(neg=>{
      const dishDiff=newDishes.length-neg.dishes.length;
      if(dishDiff<=2) return;
      const negStage=getStage(neg.lbs).id;
      const fedStage=getStage(target.lbs).id;
      const stageDiff=fedStage-negStage; // positive = fed girl is fatter
      const level=Math.min(3,newReactionLevels[neg.id]||0);
      const lines=[];
      if(Math.abs(stageDiff)>=2){
        if(stageDiff>=2){
          // Fat girl being fed; thin girl neglected → thin jealousy
          const jFn=THIN_JEALOUSY[neg.archetype]?.[level];
          if(jFn) lines.push(jFn(neg,target));
          // Contextual override at level 2+
          if(level>=2){
            const ctx=THIN_CONTEXTUAL[target.archetype]?.(neg,target);
            if(ctx&&Math.random()<0.5) lines.push(ctx);
          }
          // Fat girl retorts at level 1+
          if(level>=1){
            const retArr=FAT_RETORT[target.archetype];
            if(retArr&&Math.random()<0.65){
              const rFn=retArr[Math.min(level-1,retArr.length-1)];
              if(rFn) lines.push(rFn(target,neg));
            }
          }
        } else {
          // Thin girl being fed; fat girl neglected → fat girl encourages feeding thin one
          const eFn=FAT_ENCOURAGE[neg.archetype]?.[level];
          if(eFn) lines.push(eFn(neg,target));
        }
      } else {
        lines.push(getJealousyLine(neg,target));
      }
      if(lines.length){
        reactionLines.push(...lines.filter(Boolean));
        newReactionLevels[neg.id]=(newReactionLevels[neg.id]||0)+1;
      }
    });

    // Divine pair reaction (~20% chance when ascended students share the table)
    if(Math.random()<0.20&&groupDinnerEvent.students.length>=2){
      const ascended=groupDinnerEvent.students.filter(s=>s.ascensionPath&&s.ascensionPath!=="convergence");
      if(ascended.length>=2){
        const [da,db]=ascended;
        const pairKey=da.ascensionPath===db.ascensionPath
          ?`${da.ascensionPath}_${db.ascensionPath}`
          :"celestial_umbral";
        const pool=DIVINE_PAIR_REACTIONS[pairKey];
        if(pool){
          const line=pool[rnd(0,pool.length-1)](da,db);
          reactionLines.push(line);
        }
      } else if(ascended.length===1){
        const asc=ascended[0];
        const other=groupDinnerEvent.students.find(s=>s.id!==asc.id&&!s.ascensionPath);
        if(other&&Math.random()<0.15){
          const mortalReaction=asc.ascensionPath==="celestial"
            ?`${other.name} watches ${asc.name} eat — the light, the warmth, the impossible ease of it. She says nothing, but her hand moves slightly toward ${asc.name}'s side before she catches herself.`
            :`${other.name} keeps glancing at ${asc.name} across the table. The cold that radiates from her is constant. Unsettling. ${other.name} eats faster, as if motion provides protection.`;
          reactionLines.push(mortalReaction);
        }
      }
    }

    // Unbutton line when first crossing capacity
    if(newFullness>maxFull&&target.fullness<=maxFull){
      reactionLines.push(UNBUTTON_LINES[rnd(0,UNBUTTON_LINES.length-1)](target));
    }

    // Overfill check
    if(newFullness>maxFull){
      const overfillRatio=(newFullness-maxFull)/maxFull;
      const endChance=Math.min(0.8,overfillRatio);
      if(Math.random()<endChance){
        const sLive=students.find(s=>s.id===targetId)||target;
        const sUpdated={...sLive,lbs:sLive.lbs+scaledGain};
        const endMsg=getOverfillEndMsg(sUpdated,getStage(sUpdated.lbs).id);
        setGroupDinnerLog(dl=>[...dl,`🍴 ${dish.label} for ${target.name}. (+${scaledGain} lbs)`,`😵 ${endMsg}`,...reactionLines.map(r=>`👀 ${r}`)]);
        setGroupDinnerEvent(prev=>{
          const remaining=prev.students.filter(s=>s.id!==targetId);
          if(remaining.length===0){
            setTimeout(()=>{setAp(a=>a-3);push(`✅ Group dinner complete.`);setGroupDinnerEvent(null);},900);
            return prev;
          }
          return {...prev,students:remaining,reactionLevels:newReactionLevels};
        });
        const stId=getStage(sUpdated.lbs).id;
        const stGrp=stId<=2?0:stId<=5?1:stId<=7?2:3;
        const ratio=newFullness/maxFull;
        const fullGrp=ratio<=1.0?0:ratio<=1.3?1:ratio<=1.6?2:3;
        setTimeout(()=>{
          setDinnerEndPopup({student:sUpdated,finalFullness:newFullness,maxFullness:maxFull,totalGain:newTotalGain,narrative:DINNER_ENDING_TEXT[stGrp][fullGrp](sUpdated)});
          setStudents(prev=>prev.map(s=>s.id!==targetId?s:{...s,relationship:Math.min(100,s.relationship+5)}));
        },1100);
        return;
      }
    }

    const firstHit=newFullness>=maxFull&&target.fullness<maxFull;
    const fullMsg=firstHit?` — ${target.name} is satisfied. You can keep going.`
      :newFullness>maxFull?` — ${target.name} is past full.`
      :newFullness>=maxFull*0.8?` — ${target.name} is getting full.`:"";
    setGroupDinnerLog(dl=>[...dl,`🍴 ${dish.label} for ${target.name}. ${dish.desc} (+${scaledGain} lbs)${fullMsg}`]);
    setGroupDinnerEvent(prev=>({
      ...prev,
      reactionLevels:newReactionLevels,
      students:prev.students.map(s=>s.id!==targetId?s:{...s,fullness:newFullness,dishes:newDishes,totalGain:newTotalGain}),
    }));
    if(reactionLines.length){
      setTimeout(()=>setGroupDinnerLog(dl=>[...dl,...reactionLines.map(r=>`👀 ${r}`)]),450);
    }
  };

  const callGroupWaiter=()=>{
    const vId=groupDinnerEvent.venue?.id||"bistro";
    const firstS=groupDinnerEvent.students[0];
    const desc=(WAITER_DESC[vId]||(()=>`The server arrives with fresh menus.`))(firstS);
    setGroupDinnerLog(dl=>[...dl,`🫆 ${desc}`]);
    setGroupDinnerEvent(prev=>({...prev,students:prev.students.map(s=>({...s,dishes:[]}))}));
  };

  const useGroupConversation=(conv)=>{
    if(groupDinnerEvent.conversationUsed.includes(conv.id)) return;
    const [s1,s2]=groupDinnerEvent.students;
    const text=conv.text(s1,s2||s1);
    const relB=conv.relBonus||0;
    const fullE=conv.fullnessEffect||0;
    setGroupDinnerLog(dl=>[...dl,`💬 ${text}`]);
    push(`💬 Group conversation: ${conv.label}`);
    setGroupDinnerEvent(prev=>({
      ...prev,
      conversationUsed:[...prev.conversationUsed,conv.id],
      students:prev.students.map(s=>({...s,fullness:Math.max(0,s.fullness+fullE),totalGain:s.totalGain})),
    }));
    setStudents(prev=>prev.map(s=>{
      const inGroup=groupDinnerEvent.students.some(gs=>gs.id===s.id);
      if(!inGroup) return s;
      return {...s,relationship:Math.min(100,s.relationship+relB)};
    }));
  };

  const endGroupDinner=()=>{
    const totalG=groupDinnerEvent.students.reduce((a,s)=>a+s.totalGain,0);
    setAp(a=>a-3);
    push(`✅ Group dinner complete. +${totalG} lbs total across ${groupDinnerEvent.students.length} girls.`);
    setStudents(prev=>prev.map(s=>{
      const inGroup=groupDinnerEvent.students.some(gs=>gs.id===s.id);
      if(!inGroup) return s;
      return {...s,relationship:Math.min(100,s.relationship+7)};
    }));
    setGroupDinnerEvent(null);
  };

  const resolveNarrative=(ev,s,accept)=>{
    if(accept&&ev.gain[1]>0){
      const gain=rnd(ev.gain[0],ev.gain[1]);
      setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,lbs:st.lbs+gain,relationship:Math.min(100,st.relationship+ev.rel)}));
      push(`📖 ${ev.title} resolved. ${s.name} +${gain} lbs, +${ev.rel} relationship.`);
    } else {
      setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,relationship:Math.min(100,st.relationship+Math.floor(ev.rel/2))}));
      push(`📖 ${ev.title} — noted.`);
    }
    setActiveEvent(null);
  };

  const resolveVaughanEvent=(ev,choice)=>{
    push(`👓 ${ev.title}: ${choice.text}`);
    if(choice.delta&&choice.delta>0) addScrutiny(choice.delta);
    else if(choice.delta&&choice.delta<0) setAdminScrutiny(prev=>Math.max(0,prev+choice.delta));
    if(choice.vDelta) setVaughan(prev=>prev?{...prev,disposition:Math.min(100,prev.disposition+choice.vDelta)}:prev);
    setVaughanModal(null);
  };

  const startSocialEvent=(evt)=>{
    if(ap<evt.apCost){push(`⚠️ Need ${evt.apCost} AP.`);return;}
    if(socialWeeks.includes(week)){push("⚠️ You've already hosted a social event this week.");return;}
    setSocialPicker({event:evt,selected:[]});
  };

  const confirmSocialEvent=()=>{
    if(!socialPicker) return;
    const{event,selected}=socialPicker;
    if(selected.length<event.minStudents){push(`⚠️ Need at least ${event.minStudents} students.`);return;}
    setAp(a=>a-event.apCost);
    setSocialWeeks(prev=>[...prev,week]);
    addScrutiny(event.scrutinyAdd);
    let totalGain=0;
    const updatedStudents=students.map(s=>{
      if(!selected.includes(s.id)) return s;
      const gain=rnd(event.baseGain[0],event.baseGain[1]);
      totalGain+=gain;
      return processStudentGain(s,gain,event.relBonus);
    });
    setStudents(updatedStudents);
    if(vaughan&&!vaughanAlly){
      if(event.vaughanAttends){
        const vGain=rnd(1,3);
        const vSuspDelta=event.vaughanEffect;
        const vDispGain=vSuspDelta<0?Math.round(Math.abs(vSuspDelta)*0.6):0;
        setVaughan(prev=>prev?{...prev,lbs:prev.lbs+vGain,suspicion:Math.max(0,prev.suspicion+vSuspDelta),disposition:Math.min(100,prev.disposition+vDispGain)}:prev);
        push(`👓 Dr. Vaughan attended ${event.label} — +${vGain} lbs, suspicion ${vSuspDelta}`);
      } else if(event.vaughanEffect!==0){
        setVaughan(prev=>prev?{...prev,suspicion:Math.max(0,prev.suspicion+event.vaughanEffect)}:prev);
      }
    }
    if(hrObserver&&event.observerGain){
      const oGain=rnd(event.observerGain[0],event.observerGain[1]);
      setHrObserver(prev=>prev?{...prev,lbs:prev.lbs+oGain,disposition:Math.min(100,prev.disposition+event.observerDisp)}:prev);
      push(`👤 ${hrObserver.name} attended — +${oGain} lbs, +${event.observerDisp} disposition`);
    }
    const names=selected.map(id=>students.find(s=>s.id===id)?.name).filter(Boolean).join(", ");
    const perGain=Math.round(totalGain/Math.max(1,selected.length));
    push(`🎉 ${event.label}: ${names} attended. +${totalGain} lbs total.`);
    setSocialResult({event,names,totalGain,scene:event.scene(names,perGain),attendees:selected.length});
    setSocialPicker(null);
    const evs=collectEvents(updatedStudents);
    if(evs.length){setGlobalStats(g=>({...g,narrativeCount:g.narrativeCount+evs.length}));setEventQueue(prev=>[...prev,...evs]);}
  };

  // ── PRIVATE SESSION FUNCTIONS ──────────────────────────────────
  const startPrivateSession=(s)=>{
    const tier=getTier(s.relationship);
    if(tier.id<1){push(`⚠️ ${s.name} needs to be at least Close tier for a private session.`);return;}
    if(ap<2){push("⚠️ Need 2 AP.");return;}
    const hist=sessionHistory[s.id]||{count:0,totalGain:0,capacityBonus:0};
    setSessionLog([]);
    setPrivateSession({
      student:s,phase:"venue",venue:null,foods:[],totalGain:0,
      fullness:0,maxFullness:100+hist.capacityBonus+skillSessionCapBonus,
      encouragementsUsed:[],toleranceBuffer:0,sessionNum:hist.count+1,
      refillRound:0,tappedOut:false,tapOutDialogue:null,
    });
  };

  const chooseSessionVenue=(venue)=>{
    const s=privateSession.student;
    setPrivateSession(prev=>({...prev,venue,phase:"feeding"}));
    push(`🌙 Private session with ${s.name} — ${venue.label}.`);
    const isImmobile=getStage(s.lbs).id>=10||!!s.ascensionPath;
    const blobEntry=isImmobile?(BLOB_PRIVATE_INTRO[s.id]||BLOB_PRIVATE_INTRO.default):null;
    const blobIntroText=blobEntry?(typeof blobEntry==='function'?blobEntry(s):blobEntry):null;
    setSessionLog(blobIntroText?[blobIntroText, venue.intro(s)]:[venue.intro(s)]);
  };

  const feedInSession=(food)=>{
    const s=privateSession.student;
    const gain=rnd(food.gain[0],food.gain[1]);
    const scaledGain=Math.round(gain*skillGainMult*(s.gainMultiplier||1));
    const newFullness=privateSession.fullness+food.fullness;
    const effectiveMax=privateSession.maxFullness+privateSession.toleranceBuffer;
    const fPct=Math.round((newFullness/effectiveMax)*100);
    const fsStage=getFullnessStage(fPct);
    const descFns=SESSION_FULLNESS_DESCS[s.archetype]||SESSION_FULLNESS_DESCS.default;
    const desc=descFns[Math.min(fsStage.id,descFns.length-1)](s);
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,lbs:st.lbs+scaledGain}));
    push(`🍽️ ${food.label}: +${scaledGain} lbs`);
    setSessionLog(sl=>[...sl,`🍽️ ${food.label} (+${scaledGain} lbs) — ${food.desc}`,`   ${desc}`]);
    // Check for tap-out
    const tapProb=fPct<150?0:fPct>=250?Infinity:((fPct-150)/100)*0.90;
    const adjustedTapProb=tapProb===Infinity?1:Math.max(0,tapProb-skillTapOutResistance);
    const tapsOut=Math.random()<adjustedTapProb;
    if(tapsOut){
      const liveS=students.find(st=>st.id===s.id)||s;
      let tapLine;
      if(s.ascensionPath==="convergence"){
        const sg=getSingularityStage(liveS.lbs);
        const sgIdx=sg?sg.id-1:0;
        const entry=SINGULARITY_TAP_OUT[Math.min(sgIdx,SINGULARITY_TAP_OUT.length-1)];
        tapLine=typeof entry==='function'?entry(liveS):entry;
      } else if(fPct>=250){
        // At 250%+ — unique per-student extreme tap-out
        const entry250=TAP_OUT_250[s.id]||TAP_OUT_250.default;
        tapLine=typeof entry250==='function'?entry250(liveS):entry250;
      } else {
        const tapStage=liveS.lbs<160?0:liveS.lbs<240?1:liveS.lbs<320?2:3;
        const dialogueSet=TAP_OUT_DIALOGUE[s.id]||TAP_OUT_DIALOGUE.default;
        tapLine=dialogueSet[tapStage](liveS);
      }
      // End the session immediately — close private session, show tap-out popup
      const currentTotalGain=(privateSession.totalGain||0)+scaledGain;
      const hist2=sessionHistory[s.id]||{count:0,totalGain:0,capacityBonus:0};
      const newCapBonus2=hist2.capacityBonus+8;
      setAp(a=>a-2);
      addScrutiny(2);
      setSessionHistory(prev=>({...prev,[s.id]:{count:hist2.count+1,totalGain:hist2.totalGain+currentTotalGain,capacityBonus:newCapBonus2}}));
      setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,relationship:Math.min(100,st.relationship+4)}));
      push(`⛔ ${s.name} taps out! Session ended — +${currentTotalGain} lbs.`);
      setPrivateSession(null);
      setTapOutPopup({student:liveS,text:tapLine,totalGain:currentTotalGain});
    } else {
      setPrivateSession(prev=>({...prev,foods:[...prev.foods,food.id],totalGain:prev.totalGain+scaledGain,fullness:newFullness}));
    }
  };

  const getMoreFood=()=>{
    const refreshable=PRIVATE_FOODS.filter(f=>f.course==="more"||f.course==="extra").map(f=>f.id);
    setPrivateSession(prev=>({
      ...prev,
      refillRound:(prev.refillRound||0)+1,
      foods:prev.foods.filter(id=>!refreshable.includes(id)),
    }));
    setSessionLog(sl=>[...sl,"🛒 You step out briefly and return with more food. The table fills again."]);
  };

  // ── DEBUG ─────────────────────────────────────────────────────
  const debugForceIncarnation=()=>{
    // Bypass all stage/religion checks — for testing only
    const sg=students.find(s=>s.ascensionPath==="convergence");
    const candidate=students.filter(s=>!s.ascensionPath&&(!sg||s.id!==sg.id))
      .sort((a,b)=>b.lbs-a.lbs)[0];
    if(!candidate){push("⚠️ Debug: no eligible student for incarnation.");return;}
    // Ensure religion exists with at least 1 devotee
    if(!religion) setReligion({founded:true,devotees:1,ritesHeld:0,worshippedIds:[],weeklyPassiveGain:0});
    else if(religion.devotees<1) setReligion(r=>({...r,devotees:1}));
    const sgStudent=sg||{id:-1,name:"Singularity"};
    setGoddessManifestPopup({targetName:candidate.name,targetLbs:candidate.lbs,candidateId:candidate.id,singId:sgStudent.id});
    push(`🐛 Debug: forcing goddess incarnation on ${candidate.name}.`);
  };

  const debugApply=(sid)=>{
    const inp=debugInputs[sid]||{};
    const newLbs=Math.max(80,parseInt(inp.lbs)||0);
    const newPath=inp.path||null;
    const newStage=parseInt(inp.stage)||0;
    const newRel=inp.rel!==undefined?Math.min(100,Math.max(0,parseInt(inp.rel))):undefined;
    setStudents(prev=>prev.map(s=>{
      if(s.id!==sid) return s;
      const patch={...s,lbs:newLbs||s.lbs};
      if(newPath!==undefined) patch.ascensionPath=newPath||null;
      if(newPath) patch.ascensionStage=newStage;
      if(newRel!==undefined) patch.relationship=newRel;
      return patch;
    }));
    if(newPath&&!goddessSeen) setGoddessSeen(true);
    push(`🐛 Debug: student #${sid} updated.`);
  };

  const useSessionEncouragement=(enc)=>{
    if(!privateSession||privateSession.encouragementsUsed.includes(enc.id)) return;
    const s=privateSession.student;
    const effectiveMax=privateSession.maxFullness+privateSession.toleranceBuffer;
    const fPct=Math.round((privateSession.fullness/effectiveMax)*100);
    const lbsBonus=enc.lbsBonus?rnd(enc.lbsBonus[0],enc.lbsBonus[1]):0;
    const encLine=enc.line(s,fPct);
    push(`💬 ${encLine}`);
    setSessionLog(sl=>[...sl,`💬 ${encLine}`]);
    if(lbsBonus>0){
      setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,lbs:st.lbs+lbsBonus}));
    }
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,relationship:Math.min(100,st.relationship+enc.relBonus)}));
    setPrivateSession(prev=>({
      ...prev,
      encouragementsUsed:[...prev.encouragementsUsed,enc.id],
      toleranceBuffer:prev.toleranceBuffer+enc.toleranceBoost,
      totalGain:prev.totalGain+lbsBonus,
    }));
  };

  const endPrivateSession=()=>{
    const s=privateSession.student;
    const effectiveMax=privateSession.maxFullness+privateSession.toleranceBuffer;
    const fPct=Math.round((privateSession.fullness/effectiveMax)*100);
    setAp(a=>a-2);
    addScrutiny(2);
    const hist=sessionHistory[s.id]||{count:0,totalGain:0,capacityBonus:0};
    const newCapBonus=hist.capacityBonus+8;
    setSessionHistory(prev=>({...prev,[s.id]:{count:hist.count+1,totalGain:hist.totalGain+privateSession.totalGain,capacityBonus:newCapBonus}}));
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,relationship:Math.min(100,st.relationship+4)}));
    const aftermath=getAftermath(fPct);
    const liveStudent=students.find(st=>st.id===s.id)||s;
    push(`✅ Session with ${s.name} complete. +${privateSession.totalGain} lbs · capacity expanded (+8).`);
    setSessionResult({student:liveStudent,totalGain:privateSession.totalGain,fullnessPct:fPct,scene:aftermath.scene(liveStudent),sessionCount:hist.count+1,capacityBonus:newCapBonus});
    setPrivateSession(null);
  };

  const sel=selectedId!==null?students.find(s=>s.id===selectedId):null;
  const totalGained=students.reduce((a,s)=>a+(s.lbs-s.startLbs),0);
  const avgLbs=Math.round(students.reduce((a,s)=>a+s.lbs,0)/students.length);
  // ── PROFESSOR SUBJECT / TRAIT EFFECTS ───────────────────────
  const hasTrait=(id)=>professorProfile?.traits?.includes(id)||false;
  const hasSubj=(id)=>professorProfile?.subject===id;
  const profGainMult=1+(hasSubj("nutrition")?0.1:0)+(hasSubj("philosophy")?0.05:0)+(hasTrait("generous")?0.15:0);
  const profPassiveBonus=hasTrait("patient")?1:0;
  const observeFree=hasSubj("art_history")||hasTrait("observant");
  const alwaysShowWeight=hasSubj("physical_ed")||hasTrait("observant");
  const talkRelBonus=hasTrait("charismatic")?4:hasSubj("psychology")?2:0;
  // ── SKILL TREE DERIVED VALUES ──────────────────────────────
  const hasSkill=(id)=>unlockedSkills.includes(id);
  const unlockedAll=ALL_SKILLS.filter(sk=>unlockedSkills.includes(sk.id));
  const skillPassiveBonus=unlockedAll.reduce((a,sk)=>a+sk.passiveBonus,0)+profPassiveBonus;
  const skillApBonus=unlockedAll.reduce((a,sk)=>a+sk.apBonus,0);
  const skillGainMult=(1+unlockedAll.reduce((a,sk)=>a+sk.gainMult,0))*profGainMult;
  const skillScrutinyReduce=1-Math.min(0.90,unlockedAll.reduce((a,sk)=>a+(sk.scrutinyReduce||0),0));
  const skillScrutinyPassiveReduce=unlockedAll.reduce((a,sk)=>a+(sk.scrutinyPassiveReduce||0),0);
  const skillSessionCapBonus=unlockedAll.reduce((a,sk)=>a+(sk.sessionCapBonus||0),0);
  const skillTapOutResistance=Math.min(0.60,unlockedAll.reduce((a,sk)=>a+(sk.tapOutResistance||0),0));
  // Divine derived values
  const divineAscendedPassive=unlockedAll.reduce((a,sk)=>a+(sk.ascendedPassiveBonus||0),0);
  const divineCelestialTransferMult=1+unlockedAll.reduce((a,sk)=>a+(sk.celestialTransferBonus||0),0);
  const divineUmbralConsumeBonus=unlockedAll.reduce((a,sk)=>a+(sk.umbralConsumeBonus||0),0);
  const divineUmbralAbsorbBonus=unlockedAll.reduce((a,sk)=>a+(sk.umbralAbsorbBonus||0),0);
  const divineRiteBlobMult=1+unlockedAll.reduce((a,sk)=>a+(sk.riteBlobBonus||0),0);
  const divineRiteScrutinyReduce=unlockedAll.reduce((a,sk)=>a+(sk.riteScrutinyReduce||0),0);
  const divineUmbralVoidPassive=unlockedAll.reduce((a,sk)=>a+(sk.umbralVoidPassive||0),0);
  const divineCelestialApexHeal=unlockedAll.reduce((a,sk)=>a+(sk.celestialApexHeal||0),0);
  const divineUmbralCanConsumeHR=unlockedAll.some(sk=>sk.umbralCanConsumeHR);
  const divineCelestialCanPullHR=unlockedAll.some(sk=>sk.celestialCanPullHR);
  const dinnerUnlocked=unlockedSkills.includes("dinner_basic");
  // EP2: total weekly scrutiny reduction from evolved skills across all students
  const evolvedScrutinyReduce=students.reduce((total,s)=>{
    if(!s.evolvedForm||!(s.evolvedSkills||[]).length) return total;
    const tree=EVOLVED_SKILL_TREES[s.evolvedForm]||[];
    return total+tree.filter(sk=>(s.evolvedSkills||[]).includes(sk.id)&&sk.weeklyScrutinyReduce).reduce((a,b)=>a+(b.weeklyScrutinyReduce||0),0);
  },0);

  // ── EFFECTIVE ACTIONS (applying unlocked skill effects) ──────
  const effectiveSingleActions=ACTIONS_SINGLE.map(a=>({
    ...a,
    cost:Math.max(0,(a.id==="observe"&&observeFree)?0:a.cost-(hasSkill("ap_mastery")?1:0)),
    gain:hasSkill("private_kitchen")&&a.id==="homecooked"?[a.gain[0]+4,a.gain[1]+4]
        :hasSkill("private_kitchen")&&a.id==="bake"?[a.gain[0]+3,a.gain[1]+3]
        :a.gain,
  }));
  const effectiveClassActions=[
    ...ACTIONS_CLASS.map(a=>({
      ...a,
      cost:a.id==="snacks"&&hasSkill("snack_station")?0
          :a.id==="feast"&&hasSkill("catering_contact")?Math.max(0,a.cost-1)
          :a.cost,
      gain:a.id==="feast"&&hasSkill("catering_contact")?[a.gain[0]+4,a.gain[1]+4]:a.gain,
    })),
    ...(hasSkill("full_catering")?[{
      id:"on_demand_feast",label:"🍾 On-Demand Feast",cost:3,
      gain:[Math.round(8+avgLbs/100),Math.round(14+avgLbs/80)],
      desc:"Call the catering team now. Portions scale with your class's average weight.",
    }]:[]),
    ...(hasSkill("group_dynamics")?[{
      id:"group_dinner",label:"👥 Arrange Group Dinner",cost:3,gain:[4,9],
      desc:"Arrange a dinner for two students from an influence pair. Their bond amplifies the result for both.",
    }]:[]),
  ];

  const availableVenues=DINNER_VENUES.filter(v=>{
    if(v.id==="home_dinner") return unlockedSkills.includes("dinner_residence");
    if(v.id==="brunch_hall") return unlockedSkills.includes("dinner_casual");
    if(v.id==="atelier") return false; // filtered per-student inside dinner modal
    if(v.tier===1) return unlockedSkills.includes("dinner_basic");
    if(v.tier===2) return unlockedSkills.includes("dinner_upscale");
    if(v.tier===3) return unlockedSkills.includes("dinner_private");
    if(v.tier===4) return unlockedSkills.includes("dinner_residence");
    return false;
  });
  const canUnlock=(sk)=>{
    if(unlockedSkills.includes(sk.id)) return false;
    if(sk.category==="divine"&&!goddessSeen) return false;
    if(totalGained<sk.cost) return false;
    if(sk.requires) return sk.requires.every(r=>unlockedSkills.includes(r));
    return true;
  };

  // ── STYLES ──────────────────────────────────────────────────────────────
  const C={
    app:{fontFamily:"'Palatino Linotype',Palatino,Georgia,serif",background:"#070510",minHeight:"100vh",color:"#ddd0b8",display:"flex",flexDirection:"column",fontSize:14},
    hdr:{background:"linear-gradient(135deg,#0f0620,#1c0838,#0f0620)",borderBottom:"2px solid #4a1590",padding:"10px 18px",display:"flex",justifyContent:"space-between",alignItems:"center"},
    nav:{display:"flex",background:"#0c0718",borderBottom:"1px solid #200e40",flexWrap:"wrap"},
    navB:(a)=>({background:a?"#180c30":"transparent",border:"none",borderBottom:a?"2px solid #7a24d8":"2px solid transparent",color:a?"#c090ff":"#60409a",padding:"8px 16px",cursor:"pointer",fontSize:12,fontFamily:"inherit",letterSpacing:0.5,transition:"all 0.15s"}),
    body:{display:"flex",flex:1,overflow:"hidden",maxHeight:"calc(100vh - 90px)"},
    main:{flex:1,overflow:"auto",padding:14},
    side:{width:320,background:"#070410",borderLeft:"1px solid #180830",overflow:"hidden",padding:9,flexShrink:0,display:"flex",flexDirection:"column"},
    card:{background:"rgba(255,255,255,0.03)",border:"1px solid #180830",borderRadius:8,padding:10,marginBottom:7,cursor:"pointer",transition:"border-color 0.15s"},
    secT:{fontSize:10,letterSpacing:3,color:"#6028b8",textTransform:"uppercase",marginBottom:8,borderBottom:"1px solid #180830",paddingBottom:3},
    btn:(bg="#5818a8")=>({background:bg,border:"none",color:"#fff",borderRadius:6,padding:"7px 13px",cursor:"pointer",fontSize:12,fontFamily:"inherit",fontWeight:600,transition:"opacity 0.15s"}),
    smBtn:{background:"rgba(80,18,140,0.35)",border:"1px solid #4a1280",color:"#b080e8",borderRadius:5,padding:"4px 9px",cursor:"pointer",fontSize:11,fontFamily:"inherit",margin:"2px 2px",transition:"background 0.15s"},
    grid2:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(185px,1fr))",gap:8},
    grid3:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))",gap:7},
    logE:{fontSize:12,padding:"3px 0",borderBottom:"1px solid rgba(80,18,140,0.12)",lineHeight:1.65,color:"#c0a888"},
    overlay:{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:300},
    modal:{background:"#0e0820",border:"1px solid #5a18c8",borderRadius:12,padding:24,maxWidth:540,width:"93%",maxHeight:"88vh",overflow:"auto",boxShadow:"0 0 60px rgba(100,30,200,0.3)"},
    tag:(bg,color="#fff")=>({background:bg,color,borderRadius:10,padding:"2px 8px",fontSize:10,fontWeight:700,letterSpacing:1,whiteSpace:"nowrap"}),
    infoBox:(bg)=>({background:bg,border:"1px solid rgba(255,255,255,0.07)",borderRadius:8,padding:10,marginBottom:9,lineHeight:1.75}),
  };

  const views=["class","actions","achievements","log"];
  if(sel) views.splice(1,0,"student");

  // ── CHARACTER CREATION SCREEN ─────────────────────────────────
  if(!professorProfile){
    const cc=charCreation;
    const canFinish=cc.name.trim()&&cc.subject&&cc.traits.length===2;
    const toggleTrait=(id)=>{
      setCharCreation(prev=>{
        const has=prev.traits.includes(id);
        if(has) return{...prev,traits:prev.traits.filter(t=>t!==id)};
        if(prev.traits.length>=2) return prev;
        return{...prev,traits:[...prev.traits,id]};
      });
    };
    return(
      <div style={{...C.app,alignItems:"center",justifyContent:"center",padding:20}}>
        <div style={{maxWidth:700,width:"100%"}}>
          <div style={{textAlign:"center",marginBottom:28}}>
            <div style={{fontSize:11,letterSpacing:4,color:"#7030c0",marginBottom:6}}>PROFESSOR'S QUARTERS</div>
            <h1 style={{color:"#d0a0ff",margin:"0 0 6px",fontSize:26,fontWeight:400,fontFamily:"inherit"}}>Before the Semester Begins</h1>
            <div style={{color:"#7060a0",fontSize:13}}>Tell us who you are.</div>
          </div>

          {/* Name */}
          <div style={{marginBottom:22}}>
            <div style={C.secT}>Your Name</div>
            <input value={cc.name} onChange={e=>setCharCreation(prev=>({...prev,name:e.target.value}))}
              placeholder="Professor…"
              style={{background:"rgba(255,255,255,0.05)",border:"1px solid #4a1580",borderRadius:6,padding:"9px 13px",color:"#ddd0b8",fontSize:14,fontFamily:"inherit",width:"100%",boxSizing:"border-box"}}/>
          </div>

          {/* Subject */}
          <div style={{marginBottom:22}}>
            <div style={C.secT}>Your Subject</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:8}}>
              {PROF_SUBJECTS.map(sub=>{
                const sel=cc.subject===sub.id;
                return(
                  <div key={sub.id} onClick={()=>setCharCreation(prev=>({...prev,subject:sub.id}))}
                    style={{background:sel?"rgba(120,40,220,0.25)":"rgba(255,255,255,0.03)",border:`1px solid ${sel?"#8040d0":"#200e40"}`,borderRadius:8,padding:10,cursor:"pointer",transition:"all 0.15s"}}>
                    <div style={{fontSize:13,color:sel?"#d090ff":"#b080d8",marginBottom:3}}>{sub.emoji} {sub.label}</div>
                    <div style={{fontSize:11,color:"#7060a0",lineHeight:1.5,marginBottom:4}}>{sub.desc}</div>
                    <div style={{fontSize:10,color:"#5030a0",fontStyle:"italic"}}>{sub.bonus}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Traits */}
          <div style={{marginBottom:28}}>
            <div style={C.secT}>Your Traits <span style={{fontWeight:400,color:"#5030a0"}}>(pick 2)</span></div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(195px,1fr))",gap:8}}>
              {PROF_TRAITS.map(tr=>{
                const sel=cc.traits.includes(tr.id);
                const disabled=!sel&&cc.traits.length>=2;
                return(
                  <div key={tr.id} onClick={()=>!disabled&&toggleTrait(tr.id)}
                    style={{background:sel?"rgba(120,40,220,0.25)":"rgba(255,255,255,0.03)",border:`1px solid ${sel?"#8040d0":"#200e40"}`,borderRadius:8,padding:10,cursor:disabled?"not-allowed":"pointer",opacity:disabled?0.45:1,transition:"all 0.15s"}}>
                    <div style={{fontSize:13,color:sel?"#d090ff":"#b080d8",marginBottom:3}}>{tr.emoji} {tr.label}</div>
                    <div style={{fontSize:11,color:"#7060a0",lineHeight:1.5,marginBottom:4}}>{tr.desc}</div>
                    <div style={{fontSize:10,color:"#5030a0",fontStyle:"italic"}}>{tr.effect}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{textAlign:"center"}}>
            <button disabled={!canFinish} onClick={()=>setProfessorProfile({name:cc.name.trim(),subject:cc.subject,traits:cc.traits})}
              style={{...C.btn(canFinish?"#7020c8":"#2a1040"),fontSize:14,padding:"11px 32px",opacity:canFinish?1:0.5,cursor:canFinish?"pointer":"not-allowed"}}>
              Begin the Semester
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={C.app}>

{/* SKILL PURCHASE MODAL */}
      {skillPurchase&&(()=>{
        const{skill,allocation}=skillPurchase;
        const totalAllocated=Object.values(allocation).reduce((a,v)=>a+v,0);
        const remaining=Math.max(0,skill.cost-totalAllocated);
        const canConfirm=totalAllocated>=skill.cost;
        return(
          <div style={C.overlay}>
            <div style={{...C.modal,maxWidth:580}}>
              <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:3}}>UNLOCK SKILL</div>
              <h2 style={{margin:"0 0 4px",color:"#c898ff",fontSize:18}}>{skill.label}</h2>
              <div style={{fontSize:11,color:"#9070b0",lineHeight:1.5,marginBottom:4}}>{skill.desc}</div>
              <div style={{fontSize:11,color:"#c090d0",fontStyle:"italic",marginBottom:12}}>{skill.effect}</div>
              <div style={{...C.infoBox("rgba(100,40,200,0.1)"),display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <span style={{fontSize:12,color:"#d0b8e8"}}>Cost: <strong style={{color:"#f0a060"}}>{skill.cost} lbs</strong></span>
                <span style={{fontSize:12,color:canConfirm?"#80e080":"#f0a060",fontWeight:700}}>
                  {totalAllocated} / {skill.cost} lbs assigned {canConfirm?"✓":`— need ${remaining} more`}
                </span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div style={C.secT}>Assign weight loss per student</div>
                <button style={C.smBtn} onClick={distributeEvenly}>Distribute evenly</button>
              </div>
              <div style={{maxHeight:320,overflowY:"auto",display:"flex",flexDirection:"column",gap:5,marginBottom:12}}>
                {students.map(s=>{
                  const alloc=allocation[s.id]||0;
                  const maxLoss=Math.max(0,s.lbs-80);
                  const st=getStage(s.lbs);
                  const newStage=alloc>0?getStage(Math.max(80,s.lbs-alloc)):null;
                  const willDrop=newStage&&newStage.id<st.id;
                  return(
                    <div key={s.id} style={{...C.card,cursor:"default",display:"flex",alignItems:"center",gap:8,padding:"7px 10px"}}>
                      <div style={{flex:1,minWidth:0}}>
                        <span style={{fontWeight:700,fontSize:12,color:"#d8a8ff"}}>{s.name}</span>
                        <span style={{fontSize:10,color:"#6a4880",marginLeft:6}}>{s.lbs} lbs</span>
                        {alloc>0&&<span style={{fontSize:10,color:willDrop?"#f06060":"#f0a060",marginLeft:6}}>
                          → {s.lbs-alloc} lbs{willDrop?` (${newStage.label}!)`:""}
                        </span>}
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:3,flexShrink:0}}>
                        {[[-10,"−10"],[-5,"−5"],[-1,"−1"]].map(([d,lbl])=>(
                          <button key={d} style={{...C.smBtn,padding:"2px 6px",opacity:alloc<=0?0.3:1}} onClick={()=>adjustAllocation(s.id,d)}>{lbl}</button>
                        ))}
                        <span style={{fontSize:13,fontWeight:700,color:alloc>0?"#f0a060":"#3a2050",minWidth:30,textAlign:"center"}}>
                          {alloc>0?`-${alloc}`:"0"}
                        </span>
                        {[[1,"+1"],[5,"+5"],[10,"+10"]].map(([d,lbl])=>(
                          <button key={d} style={{...C.smBtn,padding:"2px 6px",opacity:alloc>=maxLoss?0.3:1}} onClick={()=>adjustAllocation(s.id,d)}>{lbl}</button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{display:"flex",gap:8}}>
                <button style={C.btn("#444")} onClick={()=>setSkillPurchase(null)}>Cancel</button>
                <button style={{...C.btn(canConfirm?"#5020a0":"#2a1040"),flex:1,opacity:canConfirm?1:0.6}}
                  onClick={()=>canConfirm&&confirmSkillPurchase()}>
                  {canConfirm?`🔓 Unlock ${skill.label}`:`Assign ${remaining} more lbs to unlock`}
                </button>
              </div>
            </div>
          </div>
        );
      })()}

{/* CLASS SESSION MODAL */}
      {classSession&&(()=>{
        const{scenes,sceneIdx,outcomes,pendingResult}=classSession;
        const isDone=sceneIdx>=scenes.length&&!pendingResult;
        const current=!isDone&&!pendingResult?scenes[sceneIdx]:null;
        return(
          <div style={C.overlay}>
            <div style={{...C.modal,maxWidth:600}}>
              <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:3}}>CLASS SESSION — WEEK {week}</div>
              <h2 style={{margin:"0 0 4px",color:"#c898ff",fontSize:19}}>
                {isDone?"Session Complete":pendingResult?pendingResult.sceneTitle:current?.scene.title}
              </h2>
              <div style={{display:"flex",gap:6,margin:"8px 0 14px"}}>
                {scenes.map((_,i)=>(
                  <div key={i} style={{width:8,height:8,borderRadius:"50%",background:
                    (isDone||i<sceneIdx||(pendingResult&&i<=sceneIdx))?"#8040c8":
                    i===sceneIdx?"#c898ff":"#180830"}}/>
                ))}
              </div>

              {pendingResult&&(
                <div>
                  <div style={{...C.infoBox("rgba(100,40,200,0.1)"),fontSize:13,lineHeight:1.75,color:"#d0b8e8",marginBottom:12}}>
                    {pendingResult.result}
                  </div>
                  {pendingResult.gain>0&&(
                    <div style={{fontSize:12,color:"#f0a060",marginBottom:12}}>
                      {pendingResult.target==="the class"
                        ?`📊 Each student gains ~${pendingResult.gain} lbs`
                        :`⚖️ ${pendingResult.target} gains ${pendingResult.gain} lbs`}
                    </div>
                  )}
                  <button onClick={confirmResult} style={C.btn("#5818a8")}>
                    {sceneIdx<scenes.length-1?"Continue →":"View Summary →"}
                  </button>
                </div>
              )}

              {current&&!pendingResult&&(()=>{
                const{scene,student}=current;
                return(
                  <div>
                    {student&&(
                      <div style={{fontSize:11,color:"#7a50a0",marginBottom:8}}>
                        {student.archetype} · {student.lbs} lbs · <MoodBadge mood={student.mood}/>
                      </div>
                    )}
                    <div style={{...C.infoBox("rgba(20,8,40,0.8)"),fontSize:13,lineHeight:1.75,color:"#c8a8e8",marginBottom:14}}>
                      {typeof scene.text==="function"?scene.text(student):scene.text}
                    </div>
                    <div style={C.secT}>How do you respond?</div>
                    <div style={{display:"flex",flexDirection:"column",gap:8}}>
                      {scene.choices.map((ch,i)=>(
                        <div key={i} style={{...C.card,cursor:"pointer"}} onClick={()=>makeChoice(i)}>
                          <div style={{fontWeight:700,fontSize:13,color:"#d8a8ff",marginBottom:2}}>{ch.label}</div>
                          {(ch.effect.gain?.[1]>0||ch.effect.rel||ch.effect.mood)&&(
                            <div style={{fontSize:10,color:"#7a5040"}}>
                              {ch.effect.rel?`❤ +${ch.effect.rel}  `:""}
                              {ch.effect.gain?.[1]>0?`⚖ +${ch.effect.gain[0]}–${ch.effect.gain[1]} lbs  `:""}
                              {ch.effect.mood?`😊 → ${ch.effect.mood}`:""}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {isDone&&(
                <div>
                  <div style={{...C.secT,marginBottom:10}}>This Week's Events</div>
                  {outcomes.map((o,i)=>(
                    <div key={i} style={{...C.infoBox("rgba(20,8,40,0.6)"),marginBottom:8}}>
                      <div style={{fontWeight:700,fontSize:12,color:"#d8a8ff",marginBottom:3}}>{o.sceneTitle}</div>
                      <div style={{fontSize:11,color:"#7a5090",marginBottom:4}}>You chose: {o.choice}</div>
                      <div style={{fontSize:12,color:"#c0a0d8",lineHeight:1.6}}>{o.result}</div>
                      {o.gain>0&&<div style={{fontSize:11,color:"#f0a060",marginTop:4}}>
                        {o.target==="the class"?`Class: +${o.gain} lbs each`:`${o.target}: +${o.gain} lbs`}
                      </div>}
                    </div>
                  ))}
                  <button onClick={finishClass} style={{...C.btn("#186028"),marginTop:4}}>⏩ End Week</button>
                </div>
              )}
            </div>
          </div>
        );
      })()}

{/* DINNER EVENT MODAL */}
      {dinnerEvent&&(()=>{
        const ds=students.find(s=>s.id===dinnerEvent.student.id)||dinnerEvent.student;
        const stId=getStage(ds.lbs).id;
        const rawPct=Math.round(((dinnerEvent.fullness||0)/(dinnerEvent.maxFullness||80))*100);
        const fullnessPct=rawPct;
        const fullnessColor=rawPct>=130?"#801010":rawPct>=100?"#c02020":rawPct>=80?"#c08020":"#20a060";
        const isOverfull=rawPct>100;
        const isAtCapacity=rawPct>=100;
        const isAlmostFull=rawPct>=80;
        const atelier=DINNER_VENUES.find(v=>v.id==="atelier");
        const showAtelier=hasSkill("dinner_accessible")&&stId>=6;
        const venueList=[...availableVenues,...(showAtelier?[atelier]:[])];
        return(
          <div style={C.overlay}>
            <div style={{...C.modal,maxWidth:640}}>
              {/* Header */}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                <div>
                  <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:3}}>DINNER OUT</div>
                  <h2 style={{margin:0,color:"#c898ff",fontSize:20}}>Dinner with {ds.name}</h2>
                  <div style={{fontSize:11,color:"#5a309a",marginTop:3}}>{ds.lbs} lbs · {getStage(ds.lbs).label} · ❤ {ds.relationship}%</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:13,color:"#f0a060",fontWeight:700}}>+{dinnerEvent.totalGain} lbs so far</div>
                  <div style={{fontSize:10,color:"#5a4070",marginTop:3}}>{dinnerEvent.dishes.length} dishes · {dinnerEvent.conversationUsed.length} conversations</div>
                </div>
              </div>

              {/* Fullness meter — only in dishes phase */}
              {dinnerEvent.phase==="dishes"&&(
                <div style={{marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:10,marginBottom:3}}>
                    <span style={{color:"#7a5070",letterSpacing:1}}>FULLNESS</span>
                    <span style={{color:fullnessColor,fontWeight:700}}>
                      {fullnessPct}%{isOverfull?" — overfull, risky...":isAtCapacity?" — completely full":isAlmostFull?" — getting full":""}
                    </span>
                  </div>
                  <div style={{background:"#0d0816",borderRadius:4,height:7,overflow:"hidden",position:"relative"}}>
                    <div style={{width:`${Math.min(100,fullnessPct)}%`,height:"100%",background:fullnessColor,borderRadius:4,transition:"width 0.4s ease"}}/>
                    {isOverfull&&<div style={{position:"absolute",left:`${Math.round(100*dinnerEvent.maxFullness/(dinnerEvent.fullness||1))}%`,top:0,bottom:0,width:2,background:"#ffffff44"}}/>}
                  </div>
                  {isOverfull&&<div style={{fontSize:10,color:"#c04020",marginTop:2,fontStyle:"italic"}}>Each additional dish risks ending the evening.</div>}
                </div>
              )}

              {/* PHASE: VENUE SELECTION */}
              {dinnerEvent.phase==="venue"&&(
                <div>
                  <div style={{fontSize:12,color:"#9070c0",marginBottom:12,fontStyle:"italic"}}>
                    Where would you like to take {ds.name} tonight?
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                    {venueList.map(v=>(
                      <div key={v.id} style={{...C.card,cursor:"pointer",border:v.id==="atelier"?"1px solid #806020":"1px solid #180830"}} onClick={()=>chooseDinnerVenue(v)}>
                        <div style={{fontWeight:700,fontSize:13,color:v.id==="atelier"?"#f0d060":"#d8a8ff",marginBottom:3}}>{v.label}</div>
                        <div style={{fontSize:11,color:"#6a4888",lineHeight:1.4,marginBottom:5}}>{v.desc}</div>
                        <div style={{fontSize:10,color:"#7a5040"}}>{v.baseCourses} courses · +{v.gainRange[0]}–{v.gainRange[1]} lbs est.</div>
                        {v.id==="atelier"&&<div style={{fontSize:9,color:"#a08030",marginTop:3}}>✦ Specialty — stage 6+ only</div>}
                      </div>
                    ))}
                  </div>
                  <button style={{...C.btn("#444"),marginTop:12}} onClick={()=>setDinnerEvent(null)}>Cancel</button>
                </div>
              )}

              {/* PHASE: DINING */}
              {dinnerEvent.phase==="dishes"&&dinnerEvent.venue&&(
                <div>
                  <div style={{fontSize:11,color:"#7a5090",marginBottom:10,fontStyle:"italic"}}>
                    {dinnerEvent.venue.label} — {dinnerEvent.venue.desc}
                  </div>

                  {/* Dishes grid */}
                  {(()=>{
                    const orderedIds=dinnerEvent.dishes||[];
                    const availDishes=dinnerEvent.venue.dishes.filter(d=>!orderedIds.includes(d.id));
                    const allOrdered=availDishes.length===0;
                    return(<>
                      <div style={{...C.secT,marginBottom:7}}>Menu</div>
                      {allOrdered?(
                        <div style={{textAlign:"center",padding:"10px 0",marginBottom:12}}>
                          <div style={{fontSize:11,color:"#6a4870",fontStyle:"italic",marginBottom:8}}>The table is cleared.</div>
                          <button style={{...C.btn("#4a2060")}} onClick={callWaiter}>🫆 Call for More</button>
                        </div>
                      ):(
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:12}}>
                          {availDishes.map(dish=>(
                            <div key={dish.id}
                              style={{...C.card,cursor:"pointer",
                                border:`1px solid ${isOverfull?"#502020":"#180830"}`,
                                opacity:isOverfull?0.75:1}}
                              onClick={()=>orderDish(dish)}>
                              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                                <span style={{fontWeight:700,fontSize:12,color:isOverfull?"#e09090":"#d8a8ff"}}>{dish.label}</span>
                                <span style={{fontSize:9,color:"#a07050"}}>+{dish.gain[0]}–{dish.gain[1]} lbs</span>
                              </div>
                              <div style={{fontSize:10,color:"#6a4870",lineHeight:1.4,marginTop:2}}>{dish.desc}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>);
                  })()}

                  {/* Conversation */}
                  <div style={{...C.secT,marginBottom:7}}>Conversation</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:12}}>
                    {DINNER_CONVERSATION
                      .filter(conv=>!conv.requires||hasSkill(conv.requires))
                      .map(conv=>{
                        const used=dinnerEvent.conversationUsed.includes(conv.id);
                        return(
                          <button key={conv.id}
                            style={{...C.smBtn,opacity:used?0.4:1,textDecoration:used?"line-through":"none"}}
                            onClick={()=>!used&&useDinnerConversation(conv)}>
                            {conv.label}</button>
                        );
                      })}
                  </div>

                  {/* Dinner log */}
                  <div style={{background:"rgba(20,5,35,0.8)",border:"1px solid #2a0848",borderRadius:8,padding:10,marginBottom:10,maxHeight:160,overflowY:"auto",display:"flex",flexDirection:"column",gap:3}}>
                    {dinnerLog.length===0
                      ?<div style={{fontSize:12,color:"#5a3070",fontStyle:"italic"}}>{ds.name} looks at the menu with obvious interest.</div>
                      :dinnerLog.map((line,i)=>(
                        <div key={i} style={{fontSize:12,color:line.startsWith("💬")?"#e8d0a8":line.startsWith("🍴")?"#d0a860":line.startsWith("😤")?"#f06040":"#b090c8",lineHeight:1.6,borderBottom:i<dinnerLog.length-1?"1px solid rgba(80,20,120,0.1)":"none",paddingBottom:i<dinnerLog.length-1?3:0}}>
                          {line}
                        </div>
                      ))
                    }
                  </div>

                  <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                    <div style={{fontSize:11,color:"#f0a060",fontWeight:700,flex:1}}>+{dinnerEvent.totalGain} lbs total</div>
                    {isAtCapacity&&(
                      <button style={C.btn("#2a6830")} onClick={endEvening}>End Evening ✓</button>
                    )}
                    <button style={C.btn("#333")} onClick={()=>{setAp(a=>a-2);setDinnerEvent(null);}}>
                      Leave Early
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* ABSORPTION POPUP — fires when convergence absorbs the merged student */}
      {absorptionPopup&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:580}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#a080c0",marginBottom:6}}>THE SINGULARITY FORMS</div>
            <div style={{fontSize:11,color:"#8070a0",marginBottom:14}}>
              {absorptionPopup.absorbedName} has been absorbed. {absorptionPopup.survivorName} is what remains.
            </div>
            <p style={{lineHeight:1.9,color:"#e0d0b0",fontStyle:"italic",marginBottom:20}}>
              {absorptionPopup.text}
            </p>
            <button style={C.btn("#2a0050")} onClick={()=>setAbsorptionPopup(null)}>Continue →</button>
          </div>
        </div>
      )}

      {/* SINGULARITY ACTION POPUP */}
      {singularityActionPopup&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:580}}>
            <div style={{fontSize:9,letterSpacing:3,color:singularityActionPopup.student?.triumvirateUnlocked?"#ffd700":"#a080c0",marginBottom:6}}>{singularityActionPopup.student?.triumvirateUnlocked?"🔱 THE TRIUMVIRATE":"⚡ THE SINGULARITY"}</div>
            {singularityActionPopup.gainApplied>0&&(
              <div style={{fontSize:11,color:"#c080e0",marginBottom:10}}>
                +{Math.round(singularityActionPopup.gainApplied).toLocaleString()} lbs
              </div>
            )}
            <p style={{lineHeight:1.9,color:"#e0d0b0",fontStyle:"italic",marginBottom:20}}>
              {singularityActionPopup.text}
            </p>
            {singularityActionPopup.isFinalEnding&&(
              <div style={{fontSize:10,color:"#ffd700",fontWeight:700,marginBottom:14,letterSpacing:1}}>
                ✦ THE TRUE ENDING HAS BEEN REACHED ✦
              </div>
            )}
            <button style={C.btn("#2a0050")} onClick={()=>setSingularityActionPopup(null)}>Continue →</button>
          </div>
        </div>
      )}

      {incarnationEventPopup&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",zIndex:3000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{background:"rgba(8,5,0,0.98)",border:"2px solid #ffd70090",borderRadius:14,padding:24,maxWidth:540,width:"100%",maxHeight:"85vh",overflowY:"auto"}}>
            <div style={{fontSize:11,letterSpacing:3,color:"#ffd700",marginBottom:12}}>✦ SHE ARRIVES</div>
            <div style={{fontSize:13,color:"#b08040",marginBottom:8}}>{incarnationEventPopup.name} — {incarnationEventPopup.prevLbs.toLocaleString()} lbs → {incarnationEventPopup.newLbs.toLocaleString()} lbs</div>
            <div style={{fontSize:13,color:"#e8d8b0",lineHeight:1.85,whiteSpace:"pre-line"}}>{INCARNATION_EVENT_TEXT(incarnationEventPopup.name,incarnationEventPopup.prevLbs,incarnationEventPopup.newLbs)}</div>
            <button style={{...C.btn("#6a4000"),width:"100%",marginTop:18}} onClick={()=>setIncarnationEventPopup(null)}>She Has Arrived</button>
          </div>
        </div>
      )}
      {goddessStagePopup&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:2900,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{background:"rgba(8,5,0,0.98)",border:"2px solid #ff900070",borderRadius:14,padding:24,maxWidth:500,width:"100%",maxHeight:"80vh",overflowY:"auto"}}>
            <div style={{fontSize:11,letterSpacing:3,color:"#ff9000",marginBottom:12}}>✦ SHE GROWS</div>
            <div style={{fontSize:13,color:"#e8d0a0",lineHeight:1.85}}>{goddessStagePopup.text}</div>
            <button style={{...C.btn("#5a3000"),width:"100%",marginTop:16}} onClick={()=>setGoddessStagePopup(null)}>Continue →</button>
          </div>
        </div>
      )}
      {goddessActionPopup&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:2800,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{background:"rgba(8,5,0,0.97)",border:"2px solid #ffd70060",borderRadius:14,padding:24,maxWidth:500,width:"100%",maxHeight:"80vh",overflowY:"auto"}}>
            <div style={{fontSize:13,color:"#e8d0a0",lineHeight:1.85}}>{goddessActionPopup.text}</div>
            <button style={{...C.btn("#4a2800"),width:"100%",marginTop:16}} onClick={()=>setGoddessActionPopup(null)}>Continue →</button>
          </div>
        </div>
      )}
      {/* GODDESS MANIFEST POPUP — phase 1 of Triumvirate unlock */}
      {goddessManifestPopup&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:580}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#ffd700",marginBottom:6}}>✦ THE GODDESS MANIFESTS</div>
            <div style={{fontSize:11,color:"#e0c060",marginBottom:14}}>
              The fat goddess senses the Singularity's dominance and reaches for a vessel.
            </div>
            <p style={{lineHeight:1.9,color:"#e0d0b0",fontStyle:"italic",marginBottom:16}}>
              Something ancient stirs. The devotees feel it before you do — a sudden stillness, a collective intake of breath. The religion you founded is older than you knew: beneath the rites and the worship was a goddess who has been waiting for something large enough to contain her. She has found it. Not in the Singularity — the Singularity is beyond her reach — but in {goddessManifestPopup.targetName}, the heaviest of those who remain. She will pour herself into that body. She will be vast and divine and terrible and real. And then she will have to face what you've made.
            </p>
            <div style={{fontSize:11,color:"#c09030",marginBottom:16}}>
              {goddessManifestPopup.targetName} ({Math.round(goddessManifestPopup.targetLbs).toLocaleString()} lbs) will become the incarnated goddess — weight ×15.
            </div>
            <div style={{display:"flex",gap:8}}>
              <button style={{...C.btn("#6a4000"),flex:1}} onClick={()=>executeGoddessIncarnation(goddessManifestPopup.candidateId)}>
                ✦ Let the Goddess Incarnate
              </button>
              <button style={{...C.btn("#333"),flex:1}} onClick={()=>setGoddessManifestPopup(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TRIUMVIRATE UNLOCK MODAL */}
      {triumvirateModal&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:600}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#ffd700",marginBottom:6}}>🔱 THE TRIUMVIRATE</div>
            <div style={{fontSize:11,color:"#e0c060",marginBottom:14}}>
              {triumvirateModal.survivorName} has absorbed the incarnated goddess. The final form is unlocked.
            </div>
            <p style={{lineHeight:1.9,color:"#e0d0b0",fontStyle:"italic",marginBottom:20}}>
              {triumvirateModal.text}
            </p>
            <button style={{...C.btn("#4a3000"),border:"1px solid #ffd70060"}} onClick={()=>setTriumvirateModal(null)}>
              🔱 The Triumvirate Awakens →
            </button>
          </div>
        </div>
      )}

      {/* UMBRAL ABSORB POPUP */}
      {umbralAbsorbPopup&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:580}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#cc3030",marginBottom:6}}>🌑 CONSUMED</div>
            <div style={{fontSize:11,color:"#e08080",marginBottom:10}}>
              {umbralAbsorbPopup.absorbedName} is gone. {umbralAbsorbPopup.umbralName} absorbs {Math.round(umbralAbsorbPopup.gained).toLocaleString()} lbs.
            </div>
            <p style={{lineHeight:1.9,color:"#e0d0b0",fontStyle:"italic",marginBottom:20}}>
              {umbralAbsorbPopup.text}
            </p>
            <button style={C.btn("#300010")} onClick={()=>setUmbralAbsorbPopup(null)}>Continue →</button>
          </div>
        </div>
      )}

      {/* SANGUINE ACTION POPUP */}
      {ritePopup&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.8)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>setRitePopup(null)}>
          <div style={{background:'#0d0820',border:'1px solid #4a2080',padding:'28px 32px',maxWidth:520,borderRadius:8,color:'#e8d8ff'}} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:9,letterSpacing:3,color:'#a060ff',marginBottom:6}}>⛪ HOLY RITE</div>
            <div style={{fontWeight:'bold',fontSize:15,marginBottom:12,color:'#c090ff'}}>{ritePopup.rite?.label}</div>
            <div style={{fontSize:12,lineHeight:1.7,marginBottom:18}}>{ritePopup.text}</div>
            <button style={C.btn("#2a0050")} onClick={()=>setRitePopup(null)}>Continue →</button>
          </div>
        </div>
      )}
      {celestialActionPopup&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.8)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>setCelestialActionPopup(null)}>
          <div style={{background:'#1a1000',border:'1px solid #c0a030',padding:'28px 32px',maxWidth:520,borderRadius:8,color:'#fff8e0'}} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:9,letterSpacing:3,color:'#c0a030',marginBottom:6}}>✦ CELESTIAL ACTION</div>
            <div style={{fontSize:12,lineHeight:1.7,marginBottom:18}}>{celestialActionPopup.text}</div>
            <button style={C.btn("#3a2000")} onClick={()=>setCelestialActionPopup(null)}>Continue →</button>
          </div>
        </div>
      )}
      {umbralActionPopup&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.8)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>setUmbralActionPopup(null)}>
          <div style={{background:'#080010',border:'1px solid #5020a0',padding:'28px 32px',maxWidth:520,borderRadius:8,color:'#d0b0ff'}} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:9,letterSpacing:3,color:'#8040c0',marginBottom:6}}>🌑 UMBRAL ACTION</div>
            <div style={{fontSize:12,lineHeight:1.7,marginBottom:18}}>{umbralActionPopup.text}</div>
            <button style={C.btn("#1a0030")} onClick={()=>setUmbralActionPopup(null)}>Continue →</button>
          </div>
        </div>
      )}
      {sanguineActionPopup&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:580}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#cc3030",marginBottom:6}}>🩸 SANGUINE</div>
            <p style={{lineHeight:1.9,color:"#e0d0b0",fontStyle:"italic",marginBottom:20}}>
              {sanguineActionPopup.text}
            </p>
            <button style={C.btn("#6b1010")} onClick={()=>setSanguineActionPopup(null)}>Continue →</button>
          </div>
        </div>
      )}

      {/* VERDANT ACTION POPUP */}
      {verdantActionPopup&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:580}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#336633",marginBottom:6}}>🌿 VERDANT</div>
            <p style={{lineHeight:1.9,color:"#e0d0b0",fontStyle:"italic",marginBottom:20}}>
              {verdantActionPopup.text}
            </p>
            <button style={C.btn("#0a3a0a")} onClick={()=>setVerdantActionPopup(null)}>Continue →</button>
          </div>
        </div>
      )}

      {/* PRIMORDIAL ABSORPTION POPUP */}
      {primordialAbsorptionPopup&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:580}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#a06030",marginBottom:6}}>🌍 THE PRIMORDIAL FORMS</div>
            <div style={{fontSize:11,color:"#c08060",marginBottom:14}}>
              {primordialAbsorptionPopup.absorbedName} has merged into {primordialAbsorptionPopup.survivorName}.
            </div>
            <p style={{lineHeight:1.9,color:"#e0d0b0",fontStyle:"italic",marginBottom:20}}>
              {primordialAbsorptionPopup.text}
            </p>
            <button style={C.btn("#3d1a0a")} onClick={()=>setPrimordialAbsorptionPopup(null)}>Continue →</button>
          </div>
        </div>
      )}

      {/* PRIMORDIAL ACTION POPUP */}
      {primordialActionPopup&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:580}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#a06030",marginBottom:6}}>🌍 THE PRIMORDIAL</div>
            {primordialActionPopup.gainApplied>0&&(
              <div style={{fontSize:11,color:"#c08040",marginBottom:10}}>
                +{Math.round(primordialActionPopup.gainApplied).toLocaleString()} lbs
              </div>
            )}
            <p style={{lineHeight:1.9,color:"#e0d0b0",fontStyle:"italic",marginBottom:20}}>
              {primordialActionPopup.text}
            </p>
            {primordialActionPopup.isFinalEnding&&(
              <div style={{fontSize:10,color:"#c8a060",fontWeight:700,marginBottom:14,letterSpacing:1}}>
                🔱 THE TRUE ENDING HAS BEEN REACHED 🔱
              </div>
            )}
            <button style={C.btn("#3d1a0a")} onClick={()=>setPrimordialActionPopup(null)}>Continue →</button>
          </div>
        </div>
      )}

      {/* PRIMORDIAL GODDESS MANIFEST POPUP */}
      {primordialGoddessManifestPopup&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:580}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#c08040",marginBottom:6}}>🌿 THE GODDESS STIRS</div>
            <p style={{lineHeight:1.9,color:"#e0d0b0",fontStyle:"italic",marginBottom:16}}>
              {primordialGoddessManifestPopup.text}
            </p>
            <div style={{display:"flex",gap:8}}>
              <button style={{...C.btn("#5a3a00"),flex:1}} onClick={()=>executePrimordialGoddessIncarnation(primordialGoddessManifestPopup.candidateId)}>
                🌿 Let the Goddess Incarnate
              </button>
              <button style={{...C.btn("#333"),flex:1}} onClick={()=>setPrimordialGoddessManifestPopup(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRIMORDIAL TRIUMVIRATE MODAL */}
      {primordialTriumvirateModal&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:600}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#c8a060",marginBottom:6}}>🔱 THE PRIMORDIAL TRIUMVIRATE</div>
            <div style={{fontSize:11,color:"#c09050",marginBottom:14}}>
              {primordialTriumvirateModal.survivorName} has absorbed the incarnated goddess. The First is complete.
            </div>
            <p style={{lineHeight:1.9,color:"#e0d0b0",fontStyle:"italic",marginBottom:20}}>
              {primordialTriumvirateModal.text}
            </p>
            <button style={{...C.btn("#4a2800"),border:"1px solid #c8a06060"}} onClick={()=>setPrimordialTriumvirateModal(null)}>
              🔱 The First Awakens →
            </button>
          </div>
        </div>
      )}

      {/* PRIMORDIAL CONVERGENCE MODAL */}
      {primordialConvergenceModal&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:500}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#a06030",marginBottom:10}}>🌍 THE PRIMORDIAL CONVERGENCE</div>
            <p style={{lineHeight:1.8,color:"#e0d0b0",marginBottom:14}}>
              {primordialConvergenceModal.student?.name} (Sanguine) and {primordialConvergenceModal.opponent?.name} (Verdant) have each reached the peak of their path. Their natures are opposite expressions of the same ancient hunger — blood and root, heat and patience. They can merge.
            </p>
            <p style={{lineHeight:1.8,color:"#c0a080",fontStyle:"italic",marginBottom:16}}>
              Choose who survives as the Primordial. The other is absorbed. Combined weight carries forward.
            </p>
            <div style={{display:"flex",gap:8,marginBottom:8}}>
              <button style={{...C.btn("#6b1010"),flex:1}} onClick={()=>triggerPrimordialConvergence(primordialConvergenceModal.student?.id,primordialConvergenceModal.opponent?.id)}>
                🩸 {primordialConvergenceModal.student?.name} consumes {primordialConvergenceModal.opponent?.name}
              </button>
              <button style={{...C.btn("#0a3a0a"),flex:1}} onClick={()=>triggerPrimordialConvergence(primordialConvergenceModal.opponent?.id,primordialConvergenceModal.student?.id)}>
                🌿 {primordialConvergenceModal.opponent?.name} consumes {primordialConvergenceModal.student?.name}
              </button>
            </div>
            <button style={{...C.btn("#333"),width:"100%"}} onClick={()=>setPrimordialConvergenceModal(null)}>Not yet</button>
          </div>
        </div>
      )}

      {/* GIRL PICKER */}
      {/* IMMOBILE REDIRECT POPUP */}
      {immobileRedirect&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:520}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#c05070",marginBottom:6}}>SHE CAN'T GO OUT</div>
            <div style={{fontSize:11,color:"#9070a0",marginBottom:14}}>
              {immobileRedirect.student.name} · {getStage(immobileRedirect.student.lbs).label} · {Math.round(immobileRedirect.student.lbs)} lbs
            </div>
            <p style={{lineHeight:1.9,color:"#e0d0b0",fontStyle:"italic",marginBottom:20}}>
              {immobileRedirect.text}
            </p>
            <button style={C.btn("#5818a8")} onClick={()=>{
              const s=immobileRedirect.student;
              setImmobileRedirect(null);
              startDinner(s,{skipImmobileCheck:true});
            }}>Bring her food instead →</button>
          </div>
        </div>
      )}

      {groupDinnerPicker&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:580}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:6}}>SELECT GIRLS</div>
            <div style={{fontSize:12,color:"#9070c0",marginBottom:14,fontStyle:"italic"}}>
              Choose {groupDinnerPicker.count} girls to take to dinner.
              {" "}({groupDinnerPicker.selected.length}/{groupDinnerPicker.count} selected)
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:14,maxHeight:340,overflowY:"auto"}}>
              {students.map(s=>{
                const isSelected=groupDinnerPicker.selected.includes(s.id);
                const stg=getStage(s.lbs);
                const isImmobile=stg.id>=10||!!s.ascensionPath;
                const isFull=!isSelected&&groupDinnerPicker.selected.length>=groupDinnerPicker.count;
                const isDisabled=isImmobile||isFull;
                return(
                  <div key={s.id}
                    style={{...C.card,cursor:isDisabled?"default":"pointer",
                      border:`1px solid ${isSelected?"#7a30d8":isImmobile?"#400020":isFull?"#180830":"#280840"}`,
                      background:isSelected?"rgba(80,20,140,0.3)":isImmobile?"rgba(60,0,20,0.3)":"rgba(255,255,255,0.03)",
                      opacity:isDisabled?0.45:1}}
                    onClick={()=>{
                      if(isDisabled) return;
                      setGroupDinnerPicker(prev=>({
                        ...prev,
                        selected:isSelected?prev.selected.filter(id=>id!==s.id):[...prev.selected,s.id],
                      }));
                    }}>
                    <div style={{fontWeight:700,fontSize:12,color:isSelected?"#d0a0ff":isImmobile?"#c05070":"#c0a0e0",marginBottom:2}}>{s.name.split(" ")[0]}</div>
                    <div style={{fontSize:10,color:"#7a5090"}}>{stg.label}</div>
                    <div style={{fontSize:10,color:"#5a3060"}}>{s.lbs} lbs · ❤ {s.relationship}</div>
                    {isSelected&&<div style={{fontSize:9,color:"#a060f0",marginTop:3}}>✓ Selected</div>}
                    {isImmobile&&<div style={{fontSize:9,color:"#c05070",marginTop:3}}>🔒 Can't leave</div>}
                  </div>
                );
              })}
            </div>
            <div style={{display:"flex",gap:8}}>
              <button
                style={{...C.btn("#5818a8"),opacity:groupDinnerPicker.selected.length<groupDinnerPicker.count?0.4:1}}
                disabled={groupDinnerPicker.selected.length<groupDinnerPicker.count}
                onClick={()=>{
                  const chosen=groupDinnerPicker.selected.map(id=>students.find(s=>s.id===id)).filter(Boolean);
                  setGroupDinnerPicker(null);
                  startGroupDinner(chosen);
                }}>
                Confirm →
              </button>
              <button style={C.btn("#333")} onClick={()=>setGroupDinnerPicker(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* DINNER ENDING POPUP */}
      {dinnerEndPopup&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:500}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:6}}>EVENING ENDS</div>
            <div style={{fontSize:11,color:"#7a5090",marginBottom:14}}>
              {dinnerEndPopup.student.name} · {getStage(dinnerEndPopup.student.lbs).label} · {dinnerEndPopup.student.lbs} lbs
              {" · "}{Math.round((dinnerEndPopup.finalFullness/dinnerEndPopup.maxFullness)*100)}% full
              {" · "}+{dinnerEndPopup.totalGain} lbs tonight
            </div>
            <p style={{lineHeight:1.9,color:"#e0d0b0",fontStyle:"italic",marginBottom:20,whiteSpace:"pre-line"}}>
              {dinnerEndPopup.narrative}
            </p>
            <button style={C.btn("#5818a8")} onClick={()=>setDinnerEndPopup(null)}>Continue →</button>
          </div>
        </div>
      )}

      {/* GROUP DINNER MODAL */}
      {groupDinnerEvent&&(()=>{
        const gev=groupDinnerEvent;
        const venueList=[...availableVenues,...(hasSkill("dinner_accessible")&&gev.students.some(s=>getStage(s.lbs).id>=6)?[DINNER_VENUES.find(v=>v.id==="atelier")]:[])].filter(Boolean);
        const allDishIds=gev.venue?.dishes.map(d=>d.id)||[];
        const allFed=gev.students.some(s=>allDishIds.every(id=>s.dishes.includes(id)));
        return(
          <div style={C.overlay}>
            <div style={{...C.modal,maxWidth:640,padding:20}}>
              <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:8}}>GROUP DINNER</div>

              {/* Per-girl fullness bars */}
              <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap"}}>
                {gev.students.map(gs=>{
                  const rawP=Math.round((gs.fullness/gs.maxFullness)*100);
                  const col=rawP>=130?"#801010":rawP>=100?"#c02020":rawP>=80?"#c08020":"#20a060";
                  return(
                    <div key={gs.id} style={{flex:1,minWidth:120}}>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:10,marginBottom:2}}>
                        <span style={{color:"#c0a0e0",fontWeight:700}}>{gs.name.split(" ")[0]}</span>
                        <span style={{color:col,fontWeight:700}}>{rawP}%{rawP>=100?" 🔴":rawP>=80?" 🟡":""}</span>
                      </div>
                      <div style={{background:"#0d0816",borderRadius:3,height:5}}>
                        <div style={{width:`${Math.min(100,rawP)}%`,height:"100%",background:col,borderRadius:3,transition:"width 0.4s"}}/>
                      </div>
                      <div style={{fontSize:9,color:"#5a3060",marginTop:1}}>+{gs.totalGain} lbs · {gs.dishes.length} dishes</div>
                    </div>
                  );
                })}
              </div>

              {/* Venue selection */}
              {gev.phase==="venue"&&(
                <div>
                  <div style={{fontSize:12,color:"#9070c0",marginBottom:10,fontStyle:"italic"}}>
                    Where are you taking {gev.students.map(s=>s.name.split(" ")[0]).join(" & ")} tonight?
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:12}}>
                    {venueList.map(v=>(
                      <div key={v.id} style={{...C.card,cursor:"pointer",border:v.id==="atelier"?"1px solid #806020":"1px solid #180830"}}
                        onClick={()=>chooseGroupVenue(v)}>
                        <div style={{fontWeight:700,fontSize:12,color:v.id==="atelier"?"#f0d060":"#d8a8ff",marginBottom:2}}>{v.label}</div>
                        <div style={{fontSize:10,color:"#5a3860",lineHeight:1.4}}>{v.desc}</div>
                      </div>
                    ))}
                  </div>
                  <button style={C.btn("#444")} onClick={()=>setGroupDinnerEvent(null)}>Cancel</button>
                </div>
              )}

              {/* Dining phase */}
              {gev.phase==="dishes"&&gev.venue&&(
                <div>
                  <div style={{fontSize:10,color:"#7a5090",marginBottom:10,fontStyle:"italic"}}>{gev.venue.label} — {gev.venue.desc}</div>

                  {/* Menu — each dish shows Feed buttons per girl */}
                  <div style={{...C.secT,marginBottom:6}}>Menu</div>
                  {allFed?(
                    <div style={{textAlign:"center",padding:"8px 0",marginBottom:10}}>
                      <div style={{fontSize:11,color:"#6a4870",fontStyle:"italic",marginBottom:8}}>The table is cleared.</div>
                      <button style={C.btn("#4a2060")} onClick={callGroupWaiter}>🫆 Call for More</button>
                    </div>
                  ):(
                    <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:12}}>
                      {gev.venue.dishes.map(dish=>{
                        const unfedGirls=gev.students.filter(s=>!s.dishes.includes(dish.id));
                        if(unfedGirls.length===0) return null;
                        const isOver=gev.students.some(s=>s.fullness>s.maxFullness);
                        return(
                          <div key={dish.id} style={{...C.card,border:`1px solid ${isOver?"#502020":"#180830"}`}}>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                              <span style={{fontWeight:700,fontSize:12,color:"#d8a8ff"}}>{dish.label}</span>
                              <span style={{fontSize:9,color:"#a07050"}}>+{dish.gain[0]}–{dish.gain[1]} lbs</span>
                            </div>
                            <div style={{fontSize:10,color:"#6a4870",marginBottom:6}}>{dish.desc}</div>
                            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                              {unfedGirls.map(gs=>{
                                const gRaw=Math.round((gs.fullness/gs.maxFullness)*100);
                                const overText=gRaw>=100?" (overfull!)":"";
                                return(
                                  <button key={gs.id}
                                    style={{...C.smBtn,borderColor:gRaw>=100?"#602020":"#4a1280",color:gRaw>=100?"#e08080":"#b080e8"}}
                                    onClick={()=>orderGroupDish(dish,gs.id)}>
                                    Feed {gs.name.split(" ")[0]}{overText}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Group conversations */}
                  <div style={{...C.secT,marginBottom:6}}>Conversation</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:10}}>
                    {GROUP_CONVERSATIONS.map(conv=>{
                      const used=gev.conversationUsed.includes(conv.id);
                      return(
                        <button key={conv.id}
                          style={{...C.smBtn,opacity:used?0.4:1,textDecoration:used?"line-through":"none"}}
                          onClick={()=>!used&&useGroupConversation(conv)}>
                          {conv.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Log */}
                  <div style={{background:"rgba(20,5,35,0.8)",border:"1px solid #2a0848",borderRadius:8,padding:10,marginBottom:10,maxHeight:140,overflowY:"auto",display:"flex",flexDirection:"column",gap:3}}>
                    {groupDinnerLog.length===0
                      ?<div style={{fontSize:12,color:"#5a3070",fontStyle:"italic"}}>{gev.students.map(s=>s.name.split(" ")[0]).join(" and ")} look at the menu.</div>
                      :groupDinnerLog.map((line,i)=>(
                        <div key={i} style={{fontSize:12,color:line.startsWith("💬")?"#e8d0a8":line.startsWith("👀")?"#d8a8c8":line.startsWith("😵")?"#f06040":"#d0a860",lineHeight:1.6}}>
                          {line}
                        </div>
                      ))
                    }
                  </div>

                  <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                    <div style={{fontSize:11,color:"#f0a060",fontWeight:700,flex:1}}>
                      +{gev.students.reduce((a,s)=>a+s.totalGain,0)} lbs total
                    </div>
                    <button style={C.btn("#2a6830")} onClick={endGroupDinner}>End Evening ✓</button>
                    <button style={C.btn("#333")} onClick={()=>{setAp(a=>a-3);setGroupDinnerEvent(null);}}>Leave Early</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* NARRATIVE MODAL */}
      {activeEvent&&(
        <div style={C.overlay}>
          <div style={C.modal}>
            <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:4}}>NARRATIVE EVENT</div>
            <h2 style={{margin:"0 0 4px",color:"#c898ff",fontSize:20}}>{activeEvent.event.title}</h2>
            <div style={{fontSize:11,color:"#5a309a",marginBottom:14}}>{activeEvent.student.name} · {getStage(activeEvent.student.lbs).label} · {activeEvent.student.lbs} lbs</div>
            <p style={{lineHeight:1.85,color:"#e0d0b0",marginBottom:18,fontStyle:"italic",whiteSpace:"pre-line"}}>{activeEvent.event.text(activeEvent.student)}</p>
            {activeEvent.event.gain[1]>0&&<p style={{color:"#f09050",fontSize:12,marginBottom:16}}>This event may result in {activeEvent.event.gain[0]}–{activeEvent.event.gain[1]} additional lbs gained.</p>}
            <div style={{display:"flex",gap:8}}>
              <button style={C.btn("#2a7830")} onClick={()=>resolveNarrative(activeEvent.event,activeEvent.student,true)}>Continue →</button>
              <button style={C.btn("#333")} onClick={()=>{push(`📖 ${activeEvent.event.title} — dismissed.`);setActiveEvent(null);}}>Dismiss</button>
            </div>
          </div>
        </div>
      )}

      {/* OBSERVE MODAL */}
      {observeText&&(
        <div style={C.overlay}>
          <div style={C.modal}>
            <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:12}}>OBSERVATION REPORT</div>
            <p style={{lineHeight:1.85,color:"#e0d0b0",whiteSpace:"pre-line",fontStyle:"italic"}}>{observeText}</p>
            <button style={{...C.btn(),marginTop:16}} onClick={()=>setObserveText(null)}>Close</button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div style={C.hdr}>
        <div>
          <div style={{fontSize:19,fontWeight:700,letterSpacing:2,color:"#b888ff"}}>PROFESSOR'S QUARTERS</div>
          <div style={{fontSize:10,color:"#60389a",letterSpacing:3}}>A WEIGHT MANAGEMENT SIMULATION</div>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
          {[["AP",ap,"#e0a8ff"],["Wk",week,"#e0a8ff"],["Skills",unlockedSkills.length,"#a0e0b0"]].map(([l,v,c])=>(
            <div key={l} style={{textAlign:"center",background:"rgba(80,18,140,0.3)",borderRadius:6,padding:"2px 11px"}}>
              <span style={{fontSize:17,fontWeight:700,color:c,display:"block"}}>{l==="Wk"?`Wk ${v}`:v}</span>
              <span style={{fontSize:9,color:"#60389a",letterSpacing:2}}>{l==="Wk"?"WEEK":l==="AP"?"ACTION PTS":"SKILLS"}</span>
            </div>
          ))}
          {(()=>{
            const rank=([...PROFESSOR_RANKS].reverse().find(r=>unlockedSkills.length>=r.min)||PROFESSOR_RANKS[0]);
            return(
              <div style={{textAlign:"center",background:"rgba(80,18,140,0.3)",borderRadius:6,padding:"2px 11px",minWidth:90}}>
                <span style={{fontSize:13,fontWeight:700,color:"#f0c060",display:"block",letterSpacing:0.5}}>{rank.label}</span>
                <span style={{fontSize:9,color:"#60389a",letterSpacing:2}}>RANK</span>
              </div>
            );
          })()}
          {/* Admin scrutiny meter */}
          {adminScrutiny>0&&(
            <div style={{textAlign:"center",background:"rgba(80,18,140,0.3)",borderRadius:6,padding:"2px 11px",minWidth:70}}>
              <div style={{position:"relative",height:6,background:"rgba(255,255,255,0.08)",borderRadius:3,width:70,margin:"4px 0 2px"}}>
                <div style={{position:"absolute",left:0,top:0,height:"100%",borderRadius:3,width:`${adminScrutiny}%`,background:adminScrutiny>=80?"#c02020":adminScrutiny>=50?"#c08020":"#7a30c8",transition:"width 0.4s"}}/>
              </div>
              <span style={{fontSize:9,color:adminScrutiny>=80?"#ff6060":adminScrutiny>=50?"#ffaa40":"#60389a",letterSpacing:2}}>SCRUTINY</span>
            </div>
          )}
          <button onClick={startClass} style={C.btn("#186028")}>⏩ Next Week (+5 AP)</button>
          <button onClick={()=>setDebugOpen(d=>!d)} style={{...C.btn("#222244"),fontSize:10,opacity:0.7}}>🐛 Debug</button>
        </div>
      </div>

      {/* NAV */}
      <div style={C.nav}>
        {[["class","📋 Roster"],["student","👤 "+(sel?.name||"Student")],["actions","🎭 Actions"],["social","🎉 Events"],["skills","🌳 Skills"],["achievements","🏆 Achievements"],...(goddessSeen?[["divine","✦ Divine"]]:[])].map(([v,l])=>(
          v==="student"&&!sel?null:
          <button key={v} style={C.navB(view===v)} onClick={()=>setView(v)}>{l}</button>
        ))}
      </div>

      <div style={C.body}>
        <div style={C.main}>

          {/* ── HR OBSERVER CARD ── */}
          {hrObserver&&view==="class"&&(()=>{
            const dl=getHrDispLevel(hrObserver.disposition);
            const st=getStage(hrObserver.lbs);
            return(
              <div style={{background:"rgba(60,10,10,0.35)",border:`1px solid ${dl.color}40`,borderRadius:10,padding:12,marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <div>
                    <span style={{fontSize:13,fontWeight:700,color:dl.color}}>{hrObserver.name}</span>
                    <span style={{fontSize:10,color:"#805060",marginLeft:8,letterSpacing:1}}>HR OBSERVER · {hrObserver.lbs} lbs · {st.label}</span>
                  </div>
                  <span style={{fontSize:10,fontWeight:700,color:dl.color,background:`${dl.color}25`,borderRadius:8,padding:"2px 8px"}}>{dl.label}</span>
                </div>
                <div style={{position:"relative",height:5,background:"rgba(255,255,255,0.07)",borderRadius:3,marginBottom:8}}>
                  <div style={{position:"absolute",left:0,top:0,height:"100%",borderRadius:3,background:dl.color,width:`${hrObserver.disposition}%`,transition:"width 0.4s"}}/>
                  <div style={{position:"absolute",left:"65%",top:-1,height:7,width:2,background:"rgba(255,255,255,0.3)",borderRadius:1}}/>
                </div>
                <div style={{fontSize:11,color:"#907090",lineHeight:1.6,marginBottom:8,fontStyle:"italic"}}>{getHrDispDesc(hrObserver)}</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <button style={C.btn("#5a1030")} onClick={()=>feedObserver(rnd(2,5),8)}>🍽️ Offer her something (free)</button>
                  <button style={{...C.btn("#3a1060"),opacity:ap<1?0.4:1}} onClick={talkToObserver}>💬 Discuss pedagogy (1 AP, +12 disp)</button>
                  {hrObserver.disposition>=65&&<span style={{fontSize:11,color:"#40c060",alignSelf:"center"}}>✓ Will intervene at termination</span>}
                </div>
              </div>
            );
          })()}

          {/* ── VAUGHAN CARD ── */}
          {vaughan&&view==="class"&&(()=>{
            const vSt=getStage(vaughan.lbs);
            return(
              <div style={{background:"rgba(10,30,50,0.45)",border:`1px solid ${vaughanAlly?"#30905050":"#20405060"}`,borderRadius:10,padding:12,marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <div>
                    <span style={{fontSize:13,fontWeight:700,color:vaughanAlly?"#50c080":"#4080a0"}}>{vaughan.name}</span>
                    <span style={{fontSize:10,color:"#3a5060",marginLeft:8,letterSpacing:1}}>{vaughan.dept} · {vaughan.lbs} lbs · {vSt.label}</span>
                  </div>
                  <span style={{fontSize:10,fontWeight:700,color:vaughanAlly?"#50c080":"#c05040",background:vaughanAlly?"rgba(30,80,30,0.35)":"rgba(70,15,15,0.35)",borderRadius:8,padding:"2px 8px"}}>
                    {vaughanAlly?"ALLY":"RIVAL"}
                  </span>
                </div>
                {!vaughanAlly&&(
                  <div>
                    <div style={{display:"flex",gap:10,marginBottom:6}}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:9,color:"#405060",letterSpacing:1,marginBottom:2}}>SUSPICION</div>
                        <div style={{position:"relative",height:4,background:"rgba(255,255,255,0.07)",borderRadius:2}}>
                          <div style={{position:"absolute",left:0,top:0,height:"100%",borderRadius:2,transition:"width 0.4s",
                            background:vaughan.suspicion>=80?"#c03030":vaughan.suspicion>=50?"#c06020":"#406080",
                            width:`${vaughan.suspicion}%`}}/>
                        </div>
                        <div style={{fontSize:9,color:"#506070",marginTop:1}}>{vaughan.suspicion}/100</div>
                      </div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:9,color:"#405060",letterSpacing:1,marginBottom:2}}>DISPOSITION</div>
                        <div style={{position:"relative",height:4,background:"rgba(255,255,255,0.07)",borderRadius:2}}>
                          <div style={{position:"absolute",left:0,top:0,height:"100%",borderRadius:2,transition:"width 0.4s",
                            background:vaughan.disposition>=40?"#40c070":"#607090",
                            width:`${vaughan.disposition}%`}}/>
                          <div style={{position:"absolute",left:"40%",top:-1,height:6,width:2,background:"rgba(255,255,255,0.25)",borderRadius:1}}/>
                        </div>
                        <div style={{fontSize:9,color:"#506070",marginTop:1}}>{vaughan.disposition}/40 needed</div>
                      </div>
                    </div>
                    <div style={{fontSize:10,color:"#4a6070",lineHeight:1.55,fontStyle:"italic"}}>
                      {vaughan.disposition>=40&&vaughan.lbs>=162?"She is close to letting this go entirely."
                      :vaughan.suspicion>=80?"She knows. One confrontation away from a crisis — or an alliance."
                      :vaughan.suspicion>=50?"She's been asking questions. Feed her at social events to shift her perspective."
                      :"She's noticed something. Not sure what yet."}
                    </div>
                    {vaughan.disposition>=40&&vaughan.lbs<162&&(
                      <div style={{fontSize:9,color:"#40806050",marginTop:3}}>
                        Ally trigger: {162-vaughan.lbs} lbs to go — host events she attends to help her gain.
                      </div>
                    )}
                  </div>
                )}
                {vaughanAlly&&(
                  <div style={{fontSize:11,color:"#4a9060",lineHeight:1.65,fontStyle:"italic"}}>
                    She files favorable reports and covers for you with HR. Scrutiny reduced by 3/week.
                  </div>
                )}
              </div>
            );
          })()}

          {/* ── CLASS ROSTER ── */}
          {view==="class"&&(
            <div>
              <p style={C.secT}>Students — {students.length} enrolled · avg {avgLbs} lbs</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(195px,1fr))",gridAutoRows:"minmax(140px,auto)",gap:8}}>
                {[...students].sort((a,b)=>{
                  const aG=a.incarnatedGoddess?2:0;
                  const bG=b.incarnatedGoddess?2:0;
                  if(aG!==bG) return aG-bG;
                  return a.id-b.id;
                }).map(s=>{
                  const st=getStage(s.lbs);
                  const evMeta=s.evolvedForm?EVOLVED_FORM_META[s.evolvedForm]:null;
                  const isSingularity=s.ascensionPath==="convergence"&&!s.triumvirateUnlocked;
                  const isTriumvirate=s.ascensionPath==="convergence"&&!!s.triumvirateUnlocked;
                  const isPrimordial=s.ascensionPath==="primordial"&&!s.primordialTriumvirateUnlocked;
                  const isPrimTriumvirate=s.ascensionPath==="primordial"&&!!s.primordialTriumvirateUnlocked;
                  const colSpan=isTriumvirate||isPrimTriumvirate?3:isSingularity||isPrimordial?2:1;
                  // Card border/bg
                  const cardBorder=isTriumvirate?"2px solid #ffd70090":isPrimTriumvirate?"2px solid #c0803090":isSingularity?"2px solid #ffffff60":isPrimordial?"2px solid #c0904060":s.ascensionPath==="celestial"?"1px solid #8060c060":s.ascensionPath==="umbral"?"1px solid #80101060":s.ascensionPath==="sanguine"?"1px solid #c0203060":s.ascensionPath==="verdant"?"1px solid #40802060":evMeta?`1px solid ${evMeta.color}80`:"1px solid #180830";
                  const cardBg=isTriumvirate?"linear-gradient(135deg,#0a0510,#1a0a30,#100520,#0a0510)":isPrimTriumvirate?"linear-gradient(135deg,#0a0800,#1a0e00,#0f0a00,#0a0800)":isSingularity?"linear-gradient(135deg,#080510,#121020,#0a0818,#080510)":isPrimordial?"linear-gradient(135deg,#080500,#14090000,#100700,#080500)":"";
                  const nameColor=isTriumvirate?"#ffd700":isPrimTriumvirate?"#c09040":isSingularity?"#e8e8ff":isPrimordial?"#d4a050":s.ascensionPath==="celestial"?"#c8b0ff":s.ascensionPath==="umbral"?"#ff9090":s.ascensionPath==="sanguine"?"#ff7070":s.ascensionPath==="verdant"?"#80d080":evMeta?evMeta.color:"#d8a8ff";
                  const barColor=isTriumvirate?"#ffd700":isPrimTriumvirate?"#b07030":isSingularity?"#c8c8ff":isPrimordial?"#c09040":s.ascensionPath==="celestial"?CELESTIAL_STAGES[s.ascensionStage||0]?.color:s.ascensionPath==="umbral"?UMBRAL_STAGES[s.ascensionStage||0]?.color:s.ascensionPath==="sanguine"?"#e03050":s.ascensionPath==="verdant"?"#50a050":st.color;
                  const barMax=isTriumvirate||isPrimTriumvirate?60000:isSingularity||isPrimordial?20000:s.ascensionPath?3000:1100;
                  // ── Goddess special card ──
                  if(s.incarnatedGoddess){
                    const gs=getGoddessStage(s.lbs);
                    const nextGs=GODDESS_STAGES[gs.id]||null;
                    const godAccent=gs.color;
                    const godQuote=(GODDESS_ATTITUDE[gs.id-1]||"").slice(0,120);
                    return(
                      <div key={s.id} style={{
                        ...C.card,
                        gridColumn:"span 2",gridRow:"span 2",
                        background:"linear-gradient(155deg,#0e0700,#1e0e00,#150b05,#0e0700)",
                        border:`2px solid ${godAccent}70`,
                        boxShadow:`0 0 24px ${godAccent}20, inset 0 0 30px rgba(0,0,0,0.6)`,
                        position:"relative",overflow:"hidden",display:"flex",flexDirection:"column",gap:6,
                      }} onClick={()=>{setSelectedId(s.id);setView("student")}}>
                        {/* pulsing top strip */}
                        <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,transparent,${godAccent},${godAccent}cc,${godAccent},transparent)`,opacity:0.85}}/>
                        {/* corner sigil */}
                        <div style={{position:"absolute",top:6,right:8,fontSize:22,opacity:0.18}}>✦</div>
                        <div style={{position:"absolute",bottom:6,left:8,fontSize:22,opacity:0.18}}>✦</div>
                        {/* Stage badge */}
                        <div style={{display:"flex",alignItems:"center",gap:8,marginTop:4}}>
                          <span style={{fontSize:9,letterSpacing:3,color:godAccent,fontWeight:700}}>THE GODDESS</span>
                          <span style={{fontSize:9,background:`${godAccent}22`,color:godAccent,borderRadius:6,padding:"1px 7px",border:`1px solid ${godAccent}40`,letterSpacing:1}}>{gs.label.toUpperCase()}</span>
                        </div>
                        {/* Name */}
                        <div style={{fontSize:20,fontWeight:700,color:godAccent,lineHeight:1.1,letterSpacing:1}}>{s.name}</div>
                        {/* Weight large */}
                        <div style={{fontSize:14,color:"#e8c870",fontWeight:700}}>{s.lbs.toLocaleString()} lbs</div>
                        {/* Progress toward next stage */}
                        {nextGs?(
                          <div>
                            <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:"#806030",marginBottom:2}}>
                              <span>Stage {gs.id}/4</span>
                              <span>{nextGs.min.toLocaleString()} lbs → {nextGs.label}</span>
                            </div>
                            <Bar val={s.lbs-gs.min} max={nextGs.min-gs.min} color={godAccent}/>
                          </div>
                        ):(
                          <div style={{fontSize:9,color:godAccent,letterSpacing:2}}>STAGE 4 — CONSUMING ✦</div>
                        )}
                        {/* Attitude quote */}
                        <div style={{fontSize:11,color:"#c8a060",fontStyle:"italic",lineHeight:1.65,flex:1,marginTop:2}}>
                          "{godQuote}…"
                        </div>
                        {/* Relationship */}
                        <div style={{fontSize:10,color:"#806030",marginTop:"auto"}}>
                          {(()=>{const tier=getTier(s.relationship);return `${tier.emoji} ${tier.label} · ❤ ${s.relationship}%`;})()}
                        </div>
                      </div>
                    );
                  }
                  return(
                    <div key={s.id} style={{...C.card,border:cardBorder,gridColumn:`span ${colSpan}`,background:cardBg||C.card.background,position:"relative",overflow:"hidden"}} onClick={()=>{setSelectedId(s.id);setView("student")}}>
                      {/* Fused accent glow strip */}
                      {(isSingularity||isTriumvirate)&&<div style={{position:"absolute",top:0,left:0,right:0,height:2,background:isTriumvirate?"linear-gradient(90deg,#ffd700,#fff,#ffd700)":"linear-gradient(90deg,#8080ff,#ffffff,#8080ff)",opacity:0.7}}/>}
                      {(isPrimordial||isPrimTriumvirate)&&<div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,#8b4513,#c09040,#8b4513)",opacity:0.7}}/>}
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:3}}>
                        <div style={{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap"}}>
                          <span style={{fontWeight:700,fontSize:isSingularity||isPrimordial?17:isTriumvirate||isPrimTriumvirate?19:15,color:nameColor}}>{s.name}</span>
                          {(()=>{const tier=getTier(s.relationship);return tier.id>0?<span style={{fontSize:12,opacity:0.9}}>{tier.emoji}</span>:null;})()}
                          {s.ascensionPath==="celestial"&&<span style={{fontSize:11,color:"#a080ff"}}>✦{CELESTIAL_STAGES[s.ascensionStage||0]?.label.split(" ")[1]}</span>}
                          {s.ascensionPath==="umbral"&&<span style={{fontSize:11,color:"#cc4040"}}>🌑{UMBRAL_STAGES[s.ascensionStage||0]?.label.split(" ")[1]}</span>}
                          {s.ascensionPath==="sanguine"&&<span style={{fontSize:11,color:"#e05050"}}>🩸{SANGUINE_STAGES[s.ascensionStage||0]?.label.split(" ")[1]}</span>}
                          {s.ascensionPath==="verdant"&&<span style={{fontSize:11,color:"#60b060"}}>🌿{VERDANT_STAGES[s.ascensionStage||0]?.label.split(" ")[1]}</span>}
                          {isPrimordial&&<span style={{fontSize:12,color:"#c09040",fontWeight:700,letterSpacing:1}}>🌑🌿 Primordial</span>}
                          {isPrimTriumvirate&&<span style={{fontSize:13,color:"#d4a050",fontWeight:700,letterSpacing:1}}>🌑🌿 First Triumvirate</span>}
                          {isSingularity&&<span style={{fontSize:12,color:"#c0c0ff",fontWeight:700,letterSpacing:1}}>⚡ Singularity</span>}
                          {isTriumvirate&&<span style={{fontSize:13,color:"#ffd700",fontWeight:700,letterSpacing:2}}>🔱 TRIUMVIRATE</span>}
                          {!s.ascensionPath&&evMeta&&<span style={{fontSize:10,color:evMeta.color,fontWeight:600}}>✦ {evMeta.title}</span>}
                        </div>
                        <StageTag stage={st}/>
                      </div>
                      {!(isSingularity||isTriumvirate||isPrimordial||isPrimTriumvirate)&&(
                        <div style={{fontSize:10,color:"#70508a",marginBottom:3}}>{s.role||s.archetype} · {s.bodyType} · {s.age}y · <MoodBadge mood={s.mood}/></div>
                      )}
                      {(isSingularity||isTriumvirate||isPrimordial||isPrimTriumvirate)&&(
                        <div style={{fontSize:10,color:isPrimordial||isPrimTriumvirate?"#907040":"#8080b0",marginBottom:4,fontStyle:"italic"}}>
                          {isSingularity||isTriumvirate?"One being. Two origins. One convergence.":"The first hunger. The living earth. One origin."}
                        </div>
                      )}
                      <Bar val={s.lbs} max={barMax} color={barColor}/>
                      <div style={{fontSize:11,color:isTriumvirate?"#ffd700":isPrimTriumvirate?"#c09040":"#a88050",margin:"2px 0",fontWeight:isSingularity||isTriumvirate||isPrimordial||isPrimTriumvirate?700:400}}>
                        {s.lbs.toLocaleString()} lbs{(isSingularity||isPrimordial||isTriumvirate||isPrimTriumvirate)?"":`  (+${s.lbs-s.startLbs})`} · ❤ {s.relationship}%
                      </div>
                      <div style={{fontSize:10,color:isPrimordial||isPrimTriumvirate?"#705030":isSingularity||isTriumvirate?"#6060a0":"#504060",fontStyle:"italic",lineHeight:1.4,marginTop:3}}>
                        {(()=>{
                          if(s.ascensionPath){const _r=s.ascensionPath==="celestial"?ASCENSION_STAGE_REACTIONS.celestial:s.ascensionPath==="umbral"?ASCENSION_STAGE_REACTIONS.umbral:s.ascensionPath==="sanguine"?SANGUINE_REACTIONS:s.ascensionPath==="verdant"?VERDANT_REACTIONS:[CONVERGENCE_STAGE.desc];const _e=_r[s.ascensionStage||0]||"";return((typeof _e==='function'?_e(s):_e)||"").slice(0,90);}
                          const evR=getEvolvedReaction(s); if(evR) return evR.slice(0,62);
                          const rxn=STAGE_REACTIONS[s.archetype]?.[st.id]; return ((typeof rxn==='function'?rxn(s):rxn)||"").slice(0,62);
                        })()}…
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── STUDENT DETAIL ── */}
          {view==="student"&&sel&&(()=>{
            const s=sel;
            const st=getStage(s.lbs);
            return(
              <div>
                {/* Header card */}
                {(()=>{const detailEvMeta=s.evolvedForm?EVOLVED_FORM_META[s.evolvedForm]:null; return(
                <div style={{...C.card,cursor:"default",marginBottom:10,borderColor:detailEvMeta&&!s.ascensionPath?`${detailEvMeta.color}60`:""}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <h2 style={{margin:0,color:detailEvMeta&&!s.ascensionPath?detailEvMeta.color:"#d8a8ff",fontSize:22}}>{s.name}</h2>
                      {detailEvMeta&&!s.ascensionPath&&<span style={{fontSize:11,fontWeight:700,color:detailEvMeta.color,background:`${detailEvMeta.color}22`,borderRadius:6,padding:"2px 8px"}}>✦ {detailEvMeta.title}</span>}
                    </div>
                    <div style={{display:"flex",gap:6,alignItems:"center"}}>
                      <StageTag stage={st}/>
                      <span style={C.tag("#2a1050","#b080e0")}>{s.personality}</span>
                    </div>
                  </div>
                  <div style={{fontSize:11,color:"#70509a",marginBottom:8}}>{s.role||s.archetype} · {s.archetype} · age {s.age} · {s.bodyType} body · fav: {s.favFood} · hobby: {s.hobby}</div>

                  <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:8}}>
                    <div style={{flex:1,minWidth:150}}>
                      <div style={{fontSize:9,color:"#5028a0",letterSpacing:2,marginBottom:1}}>WEIGHT</div>
                      <Bar val={s.lbs} color={st.color}/>
                      <div style={{fontSize:11,color:"#b08840"}}>{s.lbs} lbs · started {s.startLbs} · gained {s.lbs-s.startLbs} lbs</div>
                    </div>
                    <div style={{flex:1,minWidth:150}}>
                      <div style={{fontSize:9,color:"#5028a0",letterSpacing:2,marginBottom:1}}>RELATIONSHIP</div>
                      <Bar val={s.relationship} max={100} color="#c040e0"/>
                      <div style={{fontSize:11,color:"#b08840"}}>{s.relationship}% · <MoodBadge mood={s.mood}/></div>
                      {(()=>{
                        const tier=getTier(s.relationship);
                        const next=INNER_CIRCLE_TIERS[tier.id+1];
                        return(
                          <div style={{fontSize:10,color:tier.color,marginTop:3,display:"flex",alignItems:"center",gap:5}}>
                            <span>{tier.emoji} {tier.label}</span>
                            {next&&<span style={{color:"#40304060"}}>· {next.relMin-s.relationship}% to {next.emoji} {next.label}</span>}
                            {tier.id===3&&<span style={{fontSize:9,color:"#a050e0"}}>· +10% gain bonus active</span>}
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {WEIGHT_STAGES.map(ws=>(
                      <span key={ws.id} style={{background:ws.id<=st.id?ws.color:"#130920",color:ws.id<=st.id?"#fff":"#302040",borderRadius:8,padding:"2px 7px",fontSize:9,border:ws.id===st.id?"1px solid #c060ff":"1px solid transparent",fontWeight:ws.id===st.id?700:400}}>
                        {ws.label}
                      </span>
                    ))}
                    {s.ascensionPath==="celestial"&&CELESTIAL_STAGES.map((cs,i)=>(
                      <span key={`c${i}`} style={{background:i<=(s.ascensionStage||0)?cs.color:"#100820",color:i<=(s.ascensionStage||0)?"#fff":"#302040",borderRadius:8,padding:"2px 7px",fontSize:9,border:i===(s.ascensionStage||0)?"1px solid #c0b0ff":"1px solid transparent",fontWeight:i===(s.ascensionStage||0)?700:400}}>
                        ✦{cs.label.split(" ")[1]}
                      </span>
                    ))}
                    {s.ascensionPath==="umbral"&&UMBRAL_STAGES.map((us,i)=>(
                      <span key={`u${i}`} style={{background:i<=(s.ascensionStage||0)?us.color:"#100008",color:i<=(s.ascensionStage||0)?"#fff":"#302040",borderRadius:8,padding:"2px 7px",fontSize:9,border:i===(s.ascensionStage||0)?"1px solid #ff6060":"1px solid transparent",fontWeight:i===(s.ascensionStage||0)?700:400}}>
                        🌑{us.label.split(" ")[1]}
                      </span>
                    ))}
                    {s.ascensionPath==="convergence"&&<span style={{background:"#222",color:"#fff",borderRadius:8,padding:"2px 7px",fontSize:9,border:"1px solid #fff",fontWeight:700}}>⚡Singularity</span>}
                  </div>
                </div>
                );})()}

                {/* Appearance */}
                <div style={C.infoBox("rgba(70,15,110,0.25)")}>
                  <div style={{fontSize:9,color:"#5028a0",letterSpacing:2,marginBottom:5}}>CURRENT APPEARANCE</div>
                  <div style={{fontSize:13,color:"#e0d0b0",lineHeight:1.8,fontStyle:"italic"}}>{getBodyDesc(s)}</div>
                </div>

                {/* Outfit / Divinity */}
                {s.ascensionPath?(()=>{
                  const pathMeta={
                    celestial:{label:"CELESTIAL FORM",accent:"#c8b0ff",bg:"rgba(60,30,140,0.3)",border:"#7050c040",glow:"#8060ff20"},
                    umbral:   {label:"VOID FORM",     accent:"#ff9090",bg:"rgba(80,10,10,0.35)",border:"#801010 40",glow:"#ff202020"},
                    sanguine: {label:"BLOOD FORM",    accent:"#ff7070",bg:"rgba(80,10,20,0.35)",border:"#c0203040",glow:"#c0102020"},
                    verdant:  {label:"VERDANT FORM",  accent:"#80d080",bg:"rgba(20,60,20,0.35)",border:"#40803040",glow:"#20802020"},
                    convergence:s.triumvirateUnlocked
                              ?{label:"🔱 TRIUMVIRATE FORM",accent:"#ffd700",bg:"rgba(40,30,10,0.4)",border:"#ffd70040",glow:"#ffd70015"}
                              :{label:"⚡ SINGULARITY FORM",accent:"#d0d0ff",bg:"rgba(20,15,50,0.45)",border:"#8080ff40",glow:"#8080ff10"},
                    primordial:s.primordialTriumvirateUnlocked
                              ?{label:"🌑🌿 FIRST TRIUMVIRATE FORM",accent:"#c09040",bg:"rgba(30,20,5,0.5)",border:"#c0904040",glow:"#b0702010"}
                              :{label:"🌑🌿 PRIMORDIAL FORM",accent:"#c09040",bg:"rgba(25,15,5,0.45)",border:"#a0703040",glow:"#90601010"},
                  }[s.ascensionPath]||{label:"DIVINITY",accent:"#d8a8ff",bg:"rgba(50,10,90,0.25)",border:"#50109040",glow:"transparent"};
                  return(
                    <div style={{background:pathMeta.bg,border:`1px solid ${pathMeta.border}`,borderRadius:10,padding:12,marginBottom:8,boxShadow:`0 0 16px ${pathMeta.glow}`}}>
                      <div style={{fontSize:9,color:pathMeta.accent,letterSpacing:3,marginBottom:6,fontWeight:700}}>{pathMeta.label}</div>
                      <div style={{fontSize:12,color:"#e0d0c0",lineHeight:1.85,fontStyle:"italic"}}>{getOutfit(s)}</div>
                    </div>
                  );
                })():(
                  <div style={C.infoBox("rgba(50,10,90,0.25)")}>
                    <div style={{fontSize:9,color:"#5028a0",letterSpacing:2,marginBottom:4}}>OUTFIT</div>
                    <div style={{fontSize:12,color:"#c0a8d8",lineHeight:1.7}}>{getOutfit(s)}</div>
                  </div>
                )}

                {/* Stage reaction */}
                <div style={C.infoBox("rgba(40,8,70,0.35)")}>
                  <div style={{fontSize:9,color:"#5028a0",letterSpacing:2,marginBottom:4}}>CURRENT ATTITUDE</div>
                  <div style={{fontSize:13,color:"#e8d8a8",fontStyle:"italic",lineHeight:1.75}}>
                    "{(()=>{
                      if(s.incarnatedGoddess){return GODDESS_ATTITUDE[getGoddessStage(s.lbs).id-1];}
                      if(s.ascensionPath&&s.ascensionPath!=="convergence"){ const ar=ASCENSION_STAGE_REACTIONS[s.ascensionPath]?.[s.ascensionStage||0]; if(ar) return ar; const rb=STAGE_REACTIONS[s.archetype]?.[st.id]; return typeof rb==='function'?rb(s):rb; }
                      const evR=getEvolvedReaction(s); if(evR) return evR;
                      const rb=STAGE_REACTIONS[s.archetype]?.[st.id]; return typeof rb==='function'?rb(s):rb;
                    })()}"
                  </div>
                </div>

                {/* Diary */}
                <div style={C.infoBox("rgba(30,5,60,0.4)")}>
                  <div style={{fontSize:9,color:"#5028a0",letterSpacing:2,marginBottom:4}}>DIARY ENTRY</div>
                  <div style={{fontSize:12,color:"#c8b898",fontStyle:"italic",lineHeight:1.8}}>{getDiary(s)}</div>
                </div>

                {/* ── ASCENSION SECTION ── */}
                {goddessSeen&&st.id>=10&&!s.ascensionPath&&(
                  <div style={{background:"rgba(40,5,60,0.7)",border:"1px solid #8030e0",borderRadius:10,padding:14,marginBottom:12}}>
                    <div style={{fontSize:9,letterSpacing:3,color:"#a060ff",marginBottom:6}}>✦ ASCENSION AVAILABLE</div>
                    {s.evolvedForm&&ASCENSION_BRIDGE[s.evolvedForm]&&(
                      <div style={{...C.infoBox("rgba(30,5,50,0.5)"),marginBottom:10,fontSize:12,color:"#c8a8f0",fontStyle:"italic",lineHeight:1.85}}>
                        {ASCENSION_BRIDGE[s.evolvedForm](s)}
                      </div>
                    )}
                    <div style={{fontSize:13,color:"#d0b0f0",lineHeight:1.8,marginBottom:12}}>
                      {s.name} has reached the threshold. Four paths open before her. Choose.
                    </div>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                      <button style={{...C.btn("#3020a0"),flex:1,padding:"10px 8px",minWidth:"45%"}} onClick={()=>ascendStudent(s,"celestial")}>
                        <div style={{fontSize:13,fontWeight:700,color:"#d0b8ff",marginBottom:3}}>✦ Celestial Path</div>
                        <div style={{fontSize:10,color:"#9070d0"}}>Angel features · Mass transfer · Sacred warmth</div>
                      </button>
                      <button style={{...C.btn("#800010"),flex:1,padding:"10px 8px",minWidth:"45%"}} onClick={()=>ascendStudent(s,"umbral")}>
                        <div style={{fontSize:13,fontWeight:700,color:"#ff9090",marginBottom:3}}>🌑 Umbral Path</div>
                        <div style={{fontSize:10,color:"#a06060"}}>Demon features · Consumption · Void power</div>
                      </button>
                      <button style={{...C.btn("#6b1010"),flex:1,padding:"10px 8px",minWidth:"45%"}} onClick={()=>ascendStudent(s,"sanguine")}>
                        <div style={{fontSize:13,fontWeight:700,color:"#ff8888",marginBottom:3}}>🩸 Sanguine Path</div>
                        <div style={{fontSize:10,color:"#a05050"}}>Blood heat · Life drain · Fever marks</div>
                      </button>
                      <button style={{...C.btn("#0a3a0a"),flex:1,padding:"10px 8px",minWidth:"45%"}} onClick={()=>ascendStudent(s,"verdant")}>
                        <div style={{fontSize:13,fontWeight:700,color:"#88cc88",marginBottom:3}}>🌿 Verdant Path</div>
                        <div style={{fontSize:10,color:"#507050"}}>Root system · Patient cultivation · Earth draw</div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Ascension status card */}
                {s.ascensionPath&&s.ascensionPath!=="convergence"&&s.ascensionPath!=="primordial"&&(()=>{
                  const path=s.ascensionPath;
                  const isCelestial=path==="celestial";
                  const isUmbral=path==="umbral";
                  const isSanguine=path==="sanguine";
                  const isVerdant=path==="verdant";
                  const stages=isCelestial?CELESTIAL_STAGES:isUmbral?UMBRAL_STAGES:isSanguine?SANGUINE_STAGES:VERDANT_STAGES;
                  const stage=stages[s.ascensionStage||0];
                  const nextStage=stages[(s.ascensionStage||0)+1];
                  const pathColor=isCelestial?"#b898ff":isUmbral?"#cc3030":isSanguine?"#ff6666":"#66cc66";
                  const pathBg=isCelestial?"rgba(60,20,150,0.35)":isUmbral?"rgba(80,5,5,0.5)":isSanguine?"rgba(80,10,10,0.45)":"rgba(10,50,10,0.45)";
                  const pathLabel=isCelestial?"✦ CELESTIAL":isUmbral?"🌑 UMBRAL":isSanguine?"🩸 SANGUINE":"🌿 VERDANT";
                  const otherStudents=students.filter(st=>st.id!==s.id);
                  return(
                    <div style={{background:pathBg,border:`1px solid ${pathColor}60`,borderRadius:10,padding:14,marginBottom:12}}>
                      <div style={{fontSize:9,letterSpacing:3,color:pathColor,marginBottom:4}}>{pathLabel} · STAGE {(s.ascensionStage||0)+1}/5</div>
                      <div style={{fontSize:16,fontWeight:700,color:pathColor,marginBottom:4}}>{stage.label}</div>
                      <div style={{fontSize:11,color:pathColor,marginBottom:6,fontStyle:"italic",opacity:0.8}}>{stage.aura||stage.shadow||""}</div>
                      <div style={{fontSize:12,color:"#d0c0b0",lineHeight:1.7,marginBottom:8}}>{stage.features}</div>
                      <div style={{fontSize:11,color:"#8060a0",fontStyle:"italic",lineHeight:1.65,marginBottom:10}}>{stage.desc}</div>
                      {/* Attitude */}
                      <div style={{...C.infoBox(isCelestial?"rgba(50,20,120,0.3)":isUmbral?"rgba(40,5,5,0.5)":isSanguine?"rgba(50,5,5,0.4)":"rgba(5,30,5,0.4)"),marginBottom:10}}>
                        <div style={{fontSize:9,color:"#5030a0",letterSpacing:2,marginBottom:4}}>ATTITUDE</div>
                        <div style={{fontSize:12,color:pathColor,fontStyle:"italic",lineHeight:1.7,opacity:0.9}}>
                          "{ASCENSION_STAGE_REACTIONS[path]?.[s.ascensionStage||0]||""}"
                        </div>
                      </div>
                      {nextStage&&<div style={{fontSize:10,color:"#503060",marginBottom:8}}>Next stage at {nextStage.min.toLocaleString()} lbs — {nextStage.min-s.lbs} lbs to go</div>}
                      {/* Consumed students (Umbral only) */}
                      {isUmbral&&(s.consumedIds||[]).length>0&&(
                        <div style={{marginBottom:8}}>
                          <div style={{fontSize:9,letterSpacing:2,color:"#903030",marginBottom:4}}>CONSUMED WITHIN</div>
                          {(s.consumedIds||[]).map(cid=>{
                            const cs=consumedStudents.find(x=>x.id===cid);
                            return cs?(
                              <div key={cid} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(40,0,0,0.4)",borderRadius:6,padding:"4px 8px",marginBottom:3}}>
                                <span style={{fontSize:11,color:"#c07070"}}>{cs.name} ({cs.lbs} lbs)</span>
                                <button style={{...C.smBtn,fontSize:9}} onClick={()=>recoverConsumedStudent(cid,s.id)}>↑ Release (3 AP)</button>
                              </div>
                            ):null;
                          })}
                        </div>
                      )}
                      {/* Sanguine marks */}
                      {isSanguine&&sanguineMarks.length>0&&(
                        <div style={{marginBottom:8}}>
                          <div style={{fontSize:9,letterSpacing:2,color:"#cc3030",marginBottom:4}}>MARKED FOR DRAIN ({sanguineMarks.length})</div>
                          {sanguineMarks.map(mid=>{
                            const ms=students.find(x=>x.id===mid);
                            return ms?(
                              <div key={mid} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(40,0,0,0.4)",borderRadius:6,padding:"4px 8px",marginBottom:3}}>
                                <span style={{fontSize:11,color:"#cc7070"}}>{ms.name}</span>
                                <span style={{fontSize:10,color:"#805050"}}>drains {SANGUINE_MARK_DRAIN_BY_STAGE[s.ascensionStage||0]} lbs/wk</span>
                              </div>
                            ):null;
                          })}
                        </div>
                      )}
                      {/* Verdant cultivations */}
                      {isVerdant&&verdantCultivations.length>0&&(
                        <div style={{marginBottom:8}}>
                          <div style={{fontSize:9,letterSpacing:2,color:"#336633",marginBottom:4}}>CULTIVATED ({verdantCultivations.length})</div>
                          {verdantCultivations.map(cid=>{
                            const cs=students.find(x=>x.id===cid);
                            return cs?(
                              <div key={cid} style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(0,30,0,0.4)",borderRadius:6,padding:"4px 8px",marginBottom:3}}>
                                <span style={{fontSize:11,color:"#70cc70"}}>{cs.name}</span>
                                <span style={{fontSize:10,color:"#508050"}}>gains {VERDANT_CULTIVATE_GAIN_BY_STAGE[s.ascensionStage||0]} lbs/wk</span>
                              </div>
                            ):null;
                          })}
                        </div>
                      )}
                      {/* Actions */}
                      <div style={{...C.secT,marginBottom:6}}>{isSanguine?"Sanguine":isVerdant?"Verdant":"Divine"} Actions</div>
                      {isCelestial&&(
                        <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:8}}>
                          {otherStudents.map(t=>(
                            <div key={t.id} style={{display:"flex",gap:3}}>
                              <button style={{...C.smBtn,fontSize:9,background:"rgba(60,20,130,0.4)"}} onClick={()=>celestialMassPull(s.id,t.id)}>↓ Pull {t.name.split(" ")[0]} (2AP)</button>
                              <button style={{...C.smBtn,fontSize:9,background:"rgba(40,10,100,0.4)"}} onClick={()=>celestialMassPush(s.id,t.id)}>↑ Push {t.name.split(" ")[0]} (1AP)</button>
                              <button style={{...C.smBtn,fontSize:9,background:"rgba(80,30,150,0.4)"}} onClick={()=>celestialMassBless(s.id,t.id)}>✦ Bless {t.name.split(" ")[0]} (2AP)</button>
                            </div>
                          ))}
                          {divineCelestialCanPullHR&&hrObserver&&(
                            <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
                              <button style={{...C.smBtn,fontSize:9,background:"rgba(30,60,100,0.5)"}} onClick={()=>celestialMassPull(s.id,"hr")}>↓ Pull {hrObserver.name} (2AP)</button>
                              <button style={{...C.smBtn,fontSize:9,background:"rgba(40,10,100,0.5)"}} onClick={()=>celestialMassPush(s.id,"hr")}>↑ Push {hrObserver.name} (1AP)</button>
                              <button style={{...C.smBtn,fontSize:9,background:"rgba(80,30,150,0.5)"}} onClick={()=>celestialMassBless(s.id,"hr")}>✦ Bless {hrObserver.name} (2AP)</button>
                            </div>
                          )}
                          {divineCelestialCanPullHR&&vaughan&&(
                            <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
                              <button style={{...C.smBtn,fontSize:9,background:"rgba(40,10,100,0.5)"}} onClick={()=>celestialMassPush(s.id,"vaughan")}>↑ Push Vaughan (1AP)</button>
                              <button style={{...C.smBtn,fontSize:9,background:"rgba(80,30,150,0.5)"}} onClick={()=>celestialMassBless(s.id,"vaughan")}>✦ Bless Vaughan (2AP)</button>
                            </div>
                          )}
                        </div>
                      )}
                      {isUmbral&&(
                        <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:8}}>
                          {otherStudents.map(t=>(
                            <div key={t.id} style={{display:"flex",gap:3,flexWrap:"wrap"}}>
                              <button style={{...C.smBtn,fontSize:9,background:"rgba(60,0,0,0.5)"}} onClick={()=>umbralVoidPull(s.id,t.id)}>🌑 Void Pull {t.name.split(" ")[0]} (2AP)</button>
                              <button style={{...C.smBtn,fontSize:9,background:"rgba(80,0,0,0.5)"}} onClick={()=>umbralConsumeStudent(s.id,t.id)}>🌑 Consume {t.name.split(" ")[0]} (3AP)</button>
                            </div>
                          ))}
                          {divineUmbralCanConsumeHR&&(hrObserver||vaughan)&&(
                            <button style={{...C.smBtn,fontSize:9,background:"rgba(80,0,0,0.6)"}} onClick={()=>umbralConsumeHR(s.id)}>🌑 Consume HR Target (4AP, +35 scrutiny)</button>
                          )}
                        </div>
                      )}
                      {isSanguine&&(
                        <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:8}}>
                          {SANGUINE_ACTIONS.map(a=>{
                            const disabled=ap<a.apCost;
                            return(
                              <button key={a.id} style={{...C.smBtn,fontSize:10,background:"rgba(80,10,10,0.5)",opacity:disabled?0.4:1}}
                                onClick={()=>!disabled&&doSanguineAction(s,a.id)}>
                                {a.label} ({a.apCost}AP){a.gainRange&&a.gainRange[1]>0?` +${a.gainRange[0]}–${a.gainRange[1]}`:""}
                              </button>
                            );
                          })}
                        </div>
                      )}
                      {isVerdant&&(
                        <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:8}}>
                          {VERDANT_ACTIONS.map(a=>{
                            const disabled=ap<a.apCost;
                            return(
                              <button key={a.id} style={{...C.smBtn,fontSize:10,background:"rgba(10,50,10,0.5)",opacity:disabled?0.4:1}}
                                onClick={()=>!disabled&&doVerdantAction(s,a.id)}>
                                {a.label} ({a.apCost}AP){a.gainRange&&a.gainRange[1]>0?` +${a.gainRange[0]}–${a.gainRange[1]}`:""}
                              </button>
                            );
                          })}
                        </div>
                      )}
                      {/* Religion */}
                      {!religion&&(
                        <button style={{...C.btn("#401020"),width:"100%"}} onClick={()=>foundReligion(s.id)}>⛪ Found Religion (2AP)</button>
                      )}
                      {religion&&!religion.worshippedIds.includes(s.id)&&(
                        <button style={{...C.btn("#301040"),width:"100%"}} onClick={()=>addBlobToReligion(s.id)}>⛪ Add to Religion Pantheon</button>
                      )}
                    </div>
                  );
                })()}

                {/* Singularity action panel */}
                {s.ascensionPath==="convergence"&&(()=>{
                  const sg=getSingularityStage(s.lbs);
                  const sgLabel=s.triumvirateUnlocked?"🔱 The Triumvirate":sg?`⚡ ${sg.label}`:"⚡ Convergent";
                  const sgColor=s.triumvirateUnlocked?"#ffd700":sg?sg.color:"#2a0045";
                  const sgDesc=s.triumvirateUnlocked?CONVERGENCE_STAGE.desc:sg?sg.desc:CONVERGENCE_STAGE.desc;
                  const actions=[...SINGULARITY_ACTIONS,...(s.triumvirateUnlocked?TRIUMVIRATE_ACTIONS:[])];
                  const goddessStudent=goddessIncarnateId?students.find(st=>st.id===goddessIncarnateId):null;
                  const canSubsume=!goddessIncarnateId&&sg&&sg.id>=5&&religion&&religion.devotees>=1;
                  return(
                    <div style={{background:"rgba(10,5,20,0.95)",border:`2px solid ${sgColor}80`,borderRadius:10,padding:14,marginBottom:12}}>
                      <div style={{fontSize:9,letterSpacing:3,color:sgColor,marginBottom:4}}>{s.triumvirateUnlocked?"🔱 THE TRIUMVIRATE":"⚡ THE SINGULARITY"}</div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                        <div style={{fontSize:16,fontWeight:700,color:sgColor}}>{sgLabel}</div>
                        <div style={{fontSize:11,color:"#888"}}>{Math.round(s.lbs).toLocaleString()} lbs</div>
                      </div>
                      {sg&&!s.triumvirateUnlocked&&(
                        <div style={{fontSize:10,color:"#888",marginBottom:6}}>
                          Stage {sg.id}/5 {sg.id<5&&`· next: ${SINGULARITY_STAGES[sg.id].min.toLocaleString()} lbs`}
                        </div>
                      )}
                      <div style={{fontSize:11,color:"#b0b0b0",fontStyle:"italic",lineHeight:1.65,marginBottom:10}}>{sgDesc}</div>
                      {/* Goddess incarnate status */}
                      {goddessStudent&&(
                        <div style={{background:"rgba(60,40,0,0.5)",border:"1px solid #ffd70080",borderRadius:7,padding:8,marginBottom:10}}>
                          <div style={{fontSize:10,color:"#ffd700",marginBottom:4}}>✦ THE INCARNATED GODDESS</div>
                          <div style={{fontSize:11,color:"#e0c060"}}>{goddessStudent.name} — {Math.round(goddessStudent.lbs).toLocaleString()} lbs</div>
                          <button style={{...C.btn("#6a4000"),marginTop:6,width:"100%",fontSize:11,opacity:ap>=5?1:0.4}}
                            onClick={()=>ap>=5&&consumeIncarnatedGoddess(s.id)}>
                            🌟 Consume the Incarnated Goddess (5 AP)
                          </button>
                        </div>
                      )}
                      {/* Subsume religion option */}
                      {canSubsume&&!s.triumvirateUnlocked&&(
                        <button style={{...C.btn("#3a0060"),width:"100%",marginBottom:10,fontSize:11}}
                          onClick={triggerGoddessIncarnation}>
                          ⚡ Subsume the Other Religion
                        </button>
                      )}
                      {/* Action grid */}
                      <div style={{...C.secT,marginBottom:7}}>Singularity Actions · {ap} AP</div>
                      <div style={C.grid3}>
                        {actions.map(a=>{
                          const disabled=ap<a.apCost||(a.needsDevotee&&(!religion||religion.devotees<1))||(a.oneTime&&a.id==="triv_final"&&finalConsumptionDone);
                          return(
                            <div key={a.id} style={{...C.card,opacity:disabled?0.35:1,border:`1px solid ${sgColor}40`}}
                              onClick={()=>!disabled&&doSingularityAction(s,a.id)}>
                              <div style={{fontWeight:700,fontSize:11,color:"#e8d8ff",marginBottom:2}}>{a.label}</div>
                              <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
                                <span style={{fontSize:10,color:"#e07030"}}>{a.apCost} AP</span>
                                {a.gainRange&&a.gainRange[1]>0&&<span style={{fontSize:10,color:"#a08060"}}>+{a.gainRange[0]}–{a.gainRange[1]}</span>}
                                {a.needsDevotee&&<span style={{fontSize:9,color:"#a05050"}}>devotee</span>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

                {/* Goddess inspect panel */}
                {s.incarnatedGoddess&&(()=>{
                  const gs=getGoddessStage(s.lbs);
                  const gsColor=gs.color;
                  return(
                    <div style={{background:"rgba(15,10,0,0.97)",border:`2px solid ${gsColor}90`,borderRadius:10,padding:14,marginBottom:12}}>
                      <div style={{fontSize:9,letterSpacing:3,color:gsColor,marginBottom:4}}>✦ THE INCARNATED GODDESS</div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                        <div style={{fontSize:16,fontWeight:700,color:gsColor}}>✦ {gs.label}</div>
                        <div style={{fontSize:11,color:"#888"}}>{Math.round(s.lbs).toLocaleString()} lbs</div>
                      </div>
                      <div style={{fontSize:10,color:"#888",marginBottom:8}}>Stage {gs.id}/4{gs.id<4&&` · next: ${GODDESS_STAGES[gs.id].min.toLocaleString()} lbs`}</div>
                      {/* Practical actions */}
                      <div style={{...C.secT,marginBottom:7}}>Offerings · {ap} AP</div>
                      <div style={C.grid3}>
                        {GODDESS_ACTIONS.filter(a=>a.type==="practical").map(a=>{
                          const disabled=ap<a.cost;
                          return(
                            <div key={a.id} style={{...C.card,opacity:disabled?0.35:1,border:`1px solid ${gsColor}40`}}
                              onClick={()=>!disabled&&doGoddessAction(s,a.id)}>
                              <div style={{fontWeight:700,fontSize:11,color:"#f0d070",marginBottom:2}}>{a.label}</div>
                              <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
                                <span style={{fontSize:10,color:"#e07030"}}>{a.cost} AP{a.cost===0&&<span style={{color:"#60c060",marginLeft:3}}>FREE</span>}</span>
                                {a.gain[1]>0&&<span style={{fontSize:10,color:"#a08060"}}>+{a.gain[0]}–{a.gain[1]}</span>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {/* Explore actions */}
                      <div style={{...C.secT,marginBottom:7,marginTop:10}}>Explore Her Form · {ap} AP</div>
                      <div style={C.grid3}>
                        {GODDESS_ACTIONS.filter(a=>a.type==="explore").map(a=>{
                          const disabled=ap<a.cost;
                          return(
                            <div key={a.id} style={{...C.card,opacity:disabled?0.35:1,border:`1px solid ${gsColor}30`,background:"rgba(20,12,0,0.8)"}}
                              onClick={()=>!disabled&&doGoddessAction(s,a.id)}>
                              <div style={{fontWeight:700,fontSize:11,color:"#e0c080",marginBottom:2}}>{a.label}</div>
                              <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
                                <span style={{fontSize:10,color:"#e07030"}}>{a.cost} AP{a.cost===0&&<span style={{color:"#60c060",marginLeft:3}}>FREE</span>}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {(s.goddessOfferingsTotal||0)>0&&(
                        <div style={{fontSize:10,color:"#a08040",marginTop:8}}>✦ {(s.goddessOfferingsTotal||0).toLocaleString()} lbs offered while incarnate</div>
                      )}
                    </div>
                  );
                })()}

                {/* Primordial action panel */}
                {s.ascensionPath==="primordial"&&(()=>{
                  const pg=getPrimordialStage(s.lbs);
                  const pgLabel=s.primordialTriumvirateUnlocked?"🔱 Primordial Triumvirate":pg?`🌍 ${pg.label}`:"🌍 Bloodroot";
                  const pgColor=s.primordialTriumvirateUnlocked?"#c8a060":pg?pg.color:"#3d1a0a";
                  const pgDesc=s.primordialTriumvirateUnlocked?PRIMORDIAL_TRIUMVIRATE_BODY_DESC:pg?pg.desc:"...";
                  const actions=[...PRIMORDIAL_ACTIONS,...(s.primordialTriumvirateUnlocked?PRIMORDIAL_TRIUMVIRATE_ACTIONS:[])];
                  const incarnateStudent=primordialGoddessIncarnateId?students.find(st=>st.id===primordialGoddessIncarnateId):null;
                  const canSubsume=!incarnateStudent&&pg&&pg.id>=5&&religion&&religion.devotees>=1;
                  return(
                    <div style={{background:"rgba(8,4,2,0.95)",border:`2px solid ${pgColor}80`,borderRadius:10,padding:14,marginBottom:12}}>
                      <div style={{fontSize:9,letterSpacing:3,color:pgColor,marginBottom:4}}>🌍 THE PRIMORDIAL</div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                        <div style={{fontSize:16,fontWeight:700,color:pgColor}}>{pgLabel}</div>
                        <div style={{fontSize:11,color:"#888"}}>{Math.round(s.lbs).toLocaleString()} lbs</div>
                      </div>
                      {pg&&!s.primordialTriumvirateUnlocked&&(
                        <div style={{fontSize:10,color:"#888",marginBottom:6}}>Stage {pg.id}/5{pg.id<5&&` · next: ${PRIMORDIAL_STAGES[pg.id].min.toLocaleString()} lbs`}</div>
                      )}
                      <div style={{fontSize:11,color:"#b0a090",fontStyle:"italic",lineHeight:1.65,marginBottom:10}}>{pgDesc.substring(0,200)}…</div>
                      {/* Goddess incarnate */}
                      {incarnateStudent&&(
                        <div style={{background:"rgba(40,20,0,0.5)",border:"1px solid #a0704080",borderRadius:7,padding:8,marginBottom:10}}>
                          <div style={{fontSize:10,color:"#c08040",marginBottom:4}}>🌿 THE INCARNATED GODDESS</div>
                          <div style={{fontSize:11,color:"#c09050"}}>{incarnateStudent.name} — {Math.round(incarnateStudent.lbs).toLocaleString()} lbs</div>
                          <button style={{...C.btn("#5a3a00"),marginTop:6,width:"100%",fontSize:11,opacity:ap>=5?1:0.4}}
                            onClick={()=>ap>=5&&consumePrimordialIncarnatedGoddess(s.id)}>
                            🌿 Consume the Incarnated Goddess (5 AP)
                          </button>
                        </div>
                      )}
                      {canSubsume&&!s.primordialTriumvirateUnlocked&&(
                        <button style={{...C.btn("#2a1800"),width:"100%",marginBottom:10,fontSize:11}}
                          onClick={triggerPrimordialGoddessIncarnation}>
                          🌍 Subsume the Other Religion
                        </button>
                      )}
                      {/* Action grid */}
                      <div style={{...C.secT,marginBottom:7}}>Primordial Actions · {ap} AP</div>
                      <div style={C.grid3}>
                        {actions.map(a=>{
                          const disabled=ap<a.apCost||(a.needsDevotee&&(!religion||religion.devotees<1))||(a.oneTime&&a.id==="ptr_final"&&primordialFinalConsumptionDone);
                          return(
                            <div key={a.id} style={{...C.card,opacity:disabled?0.35:1,border:`1px solid ${pgColor}40`}}
                              onClick={()=>!disabled&&doPrimordialAction(s,a.id)}>
                              <div style={{fontWeight:700,fontSize:11,color:pgColor,marginBottom:2}}>{a.label}</div>
                              <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
                                <span style={{fontSize:10,color:"#e07030"}}>{a.apCost} AP</span>
                                {a.gainRange&&a.gainRange[1]>0&&<span style={{fontSize:10,color:"#685040"}}>+{a.gainRange[0]}–{a.gainRange[1]}</span>}
                                {a.needsDevotee&&<span style={{fontSize:9,color:"#a05050"}}>devotee</span>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

                {/* ── EP2: EVOLUTION SECTION ── */}
                {!s.ascensionPath&&(()=>{
                  const canOffer=!s.evolvedForm&&st.id>=4&&s.relationship>=60&&!!EVOLUTION_OFFER[s.archetype];
                  const hasEvolved=!!s.evolvedForm;
                  const meta=hasEvolved?EVOLVED_ACTIVITY_META[s.evolvedForm]:null;
                  const tree=hasEvolved?EVOLVED_SKILL_TREES[s.evolvedForm]||[]:[];
                  const skills=s.evolvedSkills||[];
                  const totalGained=s.lbs-s.startLbs;
                  const spent=s.evolvedSkillsSpent||0;
                  const availLbs=totalGained-spent;
                  if(!canOffer&&!hasEvolved) return null;
                  return(
                    <div style={{marginBottom:14}}>
                      {canOffer&&!hasEvolved&&(()=>{
                        const blurb=EVOLUTION_BUTTON_BLURB[s.archetype];
                        return(
                          <div style={{background:"rgba(40,10,80,0.5)",border:"1px solid #7030c0",borderRadius:10,padding:12,marginBottom:10}}>
                            <div style={{fontSize:9,letterSpacing:3,color:"#9040e0",marginBottom:5}}>✦ EVOLUTION AVAILABLE</div>
                            <div style={{fontSize:12,color:"#c0a0e0",lineHeight:1.75,marginBottom:8,fontStyle:"italic"}}>
                              {blurb?blurb(s):`${s.name} has grown into something the original path can't contain. A new direction is possible.`}
                            </div>
                            <button style={{...C.btn("#5a18b0"),width:"100%"}} onClick={()=>openEvolutionModal(s)}>
                              ✦ Propose a New Direction
                            </button>
                          </div>
                        );
                      })()}
                      {hasEvolved&&(()=>{
                        const evFormMeta=EVOLVED_FORM_META[s.evolvedForm];
                        const borderColor=evFormMeta?`${evFormMeta.color}80`:"#6030b080";
                        const titleColor=evFormMeta?evFormMeta.color:"#c080ff";
                        return(
                        <div style={{background:"rgba(30,8,60,0.5)",border:`1px solid ${borderColor}`,borderRadius:10,padding:12}}>
                          <div style={{fontSize:9,letterSpacing:3,color:"#9040e0",marginBottom:4}}>✦ EVOLVED PATH</div>
                          <div style={{fontSize:13,fontWeight:700,color:titleColor,marginBottom:4}}>{evFormMeta?.title||meta?.label||s.evolvedForm}</div>
                          <button style={{...C.btn("#401890"),opacity:ap<(meta?.apCost||1)?0.4:1,marginBottom:s.evolvedForm==='feedee_creator'&&getTier(s.relationship).id>=3?4:10,width:"100%"}} onClick={()=>doEvolvedActivity(s)}>
                            {meta?.label||"Activity"} ({meta?.apCost||1} AP) · +{meta?.gainRange?.[0]}–{meta?.gainRange?.[1]} lbs
                          </button>
                          {s.evolvedForm==='feedee_creator'&&getTier(s.relationship).id>=3&&(
                            <button style={{...C.btn("#804020"),opacity:ap<2?0.4:1,marginBottom:10,width:"100%"}} onClick={()=>startRecordingSession(s)}>
                              🎬 Film Her Session (2 AP)
                            </button>
                          )}
                          {tree.length>0&&(
                            <div>
                              <div style={{fontSize:9,letterSpacing:2,color:"#6030a0",marginBottom:6}}>EVOLVED SKILLS · {availLbs} lbs available</div>
                              {tree.map(sk=>{
                                const owned=skills.includes(sk.id);
                                const canBuy=!owned&&availLbs>=sk.cost;
                                return(
                                  <div key={sk.id} style={{background:owned?"rgba(60,20,100,0.5)":"rgba(20,5,40,0.4)",border:`1px solid ${owned?"#7040c080":"#30206030"}`,borderRadius:7,padding:"7px 9px",marginBottom:5,display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
                                    <div style={{flex:1}}>
                                      <div style={{fontSize:11,fontWeight:700,color:owned?"#c080ff":"#7050a0",marginBottom:1}}>{sk.label} {owned&&"✓"}</div>
                                      <div style={{fontSize:10,color:owned?"#9060c0":"#503070",lineHeight:1.4}}>{sk.desc}</div>
                                    </div>
                                    {!owned&&(
                                      <button style={{...C.smBtn,opacity:canBuy?1:0.35,fontSize:10,whiteSpace:"nowrap"}} onClick={()=>canBuy&&purchaseEvolvedSkill(s.id,sk.id)}>
                                        {sk.cost} lbs
                                      </button>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                          {s.evolvedForm==='psych_researcher'&&s.researchSubjectId!=null&&(()=>{
                            const subj=students.find(st=>st.id===s.researchSubjectId);
                            if(!subj) return null;
                            const sid=getStage(subj.lbs).id;
                            const tier=sid<=2?0:sid<=4?1:sid<=6?2:sid<=8?3:4;
                            const W=[36,46,58,72,86][tier];
                            const H=[60,56,50,44,38][tier];
                            const BR=[`50% 50% 55% 55%`,`50% 50% 58% 58%`,`50% 50% 65% 65%`,`50% 50% 70% 70%`,`50% 50% 75% 75%`][tier];
                            return(
                              <div style={{marginTop:10,padding:"10px 12px",background:"rgba(15,5,30,0.6)",border:"1px solid #4020806a",borderRadius:8}}>
                                <div style={{fontSize:9,letterSpacing:3,color:"#6b5b95",marginBottom:8}}>RESEARCH SUBJECT</div>
                                <div style={{display:"flex",alignItems:"center",gap:14}}>
                                  <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                                    <div style={{width:14,height:14,borderRadius:"50%",background:"#5030904d"}}/>
                                    <div style={{width:W,height:H,background:"#5030904d",borderRadius:BR,boxShadow:"0 0 6px #50309050",transition:"all 0.4s ease"}}/>
                                  </div>
                                  <div>
                                    <div style={{color:"#c0a0e0",fontSize:13,fontWeight:700}}>{subj.name}</div>
                                    <div style={{color:"#7050a0",fontSize:10}}>{getStage(subj.lbs).label} · {Math.round(subj.lbs)} lbs</div>
                                    <div style={{display:"flex",gap:5,marginTop:6,flexWrap:"wrap"}}>
                                      {s.researchFocus==='feeder_focus'&&FEEDER_SUBJECT_JOURNALS[subj.archetype]&&(
                                        <button style={{...C.smBtn,fontSize:10}} onClick={()=>setSubjectJournalState({subjectId:subj.id,currentPage:getStage(subj.lbs).id})}>📔 Journal</button>
                                      )}
                                      <button style={{...C.smBtn,fontSize:10,opacity:0.7}} onClick={()=>{setStudents(prev=>prev.map(x=>x.id===s.id?{...x,researchSubjectId:null}:x));}}>Change</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                        );
                      })()}
                    </div>
                  );
                })()}

                {/* Talk */}
                <div style={{...C.secT,marginBottom:7}}>Talk to {s.name}</div>
                <div style={{marginBottom:14,display:"flex",flexWrap:"wrap",gap:2}}>
                  {[["how_are_you","How are you?"],["compliment_figure","Compliment figure"],["food_talk","Talk food"],["class_talk","Talk class"],["encourage_eating","Encourage eating"],["ask_lifestyle","Ask lifestyle"],["ask_weight","Ask weight"],["about_gaining","Ask about gaining"],["future_plans","Future plans"]].map(([tid,label])=>(
                    <button key={tid} style={C.smBtn} onClick={()=>doTalk(tid,s)}>{label}</button>
                  ))}
                </div>

                {/* Gossip — ask about classmates */}
                {(()=>{
                  const gossipEntries=GOSSIP.filter(g=>g.speakerId===s.id);
                  if(!gossipEntries.length) return null;
                  return (
                    <div style={{marginBottom:14}}>
                      <div style={{...C.secT,marginBottom:7}}>Ask About Classmates</div>
                      {gossipEntries.map(g=>{
                        const target=students.find(st=>st.id===g.targetId);
                        if(!target) return null;
                        const targetStageId=getStage(target.lbs).id;
                        const lines=getGossipLines(g,targetStageId);
                        const attColor={catty:"#802020",warm:"#205040",curious:"#203860",conspiratorial:"#402060"}[g.attitude]||"#333";
                        const attEmoji={catty:"😒",warm:"🥰",curious:"🤔",conspiratorial:"😏"}[g.attitude]||"💬";
                        const hasMultiplier=(target.gainMultiplier||1)>1;
                        const thisStudentHelping=(target.gainHelpers||[]).includes(s.id);
                        const canHelp=g.offerHelp && s.relationship>=65 && !thisStudentHelping;
                        const almostUnlocked=g.offerHelp && s.relationship>=50 && s.relationship<65 && !thisStudentHelping;
                        return (
                          <div key={g.targetId} style={{...C.card,cursor:"default",marginBottom:8,border:`1px solid ${attColor}88`}}>
                            {/* Header */}
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                              <span style={{fontWeight:700,fontSize:12,color:"#d8a8ff"}}>About {target.name}</span>
                              <div style={{display:"flex",gap:5,alignItems:"center"}}>
                                <span style={{background:attColor,color:"#fff",borderRadius:8,padding:"1px 7px",fontSize:9,fontWeight:700}}>{attEmoji} {g.attitude}</span>
                                <StageTag stage={getStage(target.lbs)}/>
                              </div>
                            </div>
                            {/* Target quick stats */}
                            <div style={{fontSize:10,color:"#5a4070",marginBottom:6}}>
                              {target.lbs} lbs · {target.lbs-target.startLbs > 0 ? `+${target.lbs-target.startLbs} gained` : "no gain yet"}{hasMultiplier?` · 🔥 ×${(target.gainMultiplier).toFixed(1)} multiplier active`:""}
                            </div>
                            {/* Talk buttons */}
                            <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:8}}>
                              {lines.map((line,i)=>(
                                <button key={i} style={{...C.smBtn,fontSize:10}} onClick={()=>doGossip(g,s,line)}>
                                  {i===0?"What do you think of her?":"Another take"}
                                </button>
                              ))}
                            </div>
                            {/* Already helping */}
                            {thisStudentHelping&&(
                              <div style={{background:"rgba(30,80,30,0.3)",border:"1px solid #305030",borderRadius:6,padding:"6px 8px"}}>
                                <div style={{fontSize:10,color:"#80d080",fontWeight:700,marginBottom:2}}>✓ Active — helping fatten {target.name}</div>
                                <div style={{fontSize:10,color:"#508050",fontStyle:"italic"}}>{g.helpReason}</div>
                              </div>
                            )}
                            {/* Pending double-down activations */}
                            {thisStudentHelping&&pendingDoubleDowns.filter(dd=>dd.speakerId===g.speakerId&&dd.targetId===g.targetId).map((dd,i)=>(
                              <div key={i} style={{background:"rgba(120,40,0,0.35)",border:"1px solid #c06020",borderRadius:6,padding:"8px",marginTop:6}}>
                                <div style={{fontSize:10,color:"#ffb060",fontWeight:700,marginBottom:3}}>🔥 Double Down Available — {target.name} reached {dd.atLbs} lbs!</div>
                                <div style={{fontSize:10,color:"#c08040",fontStyle:"italic",marginBottom:6,lineHeight:1.5}}>{dd.line.length>120?dd.line.slice(0,120)+"…":dd.line}</div>
                                <button style={{...C.btn("#a03000"),fontSize:11,width:"100%"}} onClick={()=>activateDoubleDown(dd)}>
                                  🔥 Activate — ×{(1+dd.addMult).toFixed(2)} multiplier on {target.name}
                                </button>
                              </div>
                            ))}
                            {/* Unlock offer */}
                            {canHelp&&(
                              <div style={{background:"rgba(60,20,100,0.35)",border:"1px solid #5a20a0",borderRadius:6,padding:"8px"}}>
                                <div style={{fontSize:10,color:"#b070f0",fontWeight:700,marginBottom:3}}>🔓 {s.name} trusts you — a special offer is available</div>
                                <div style={{fontSize:10,color:"#7a50a0",fontStyle:"italic",marginBottom:7,lineHeight:1.5}}>{g.helpReason}</div>
                                <button style={{...C.btn("#5a20a0"),fontSize:11,width:"100%"}} onClick={()=>doHelpFatten(g,s)}>
                                  🤝 Ask {s.name} to help fatten {target.name} (×{g.helpMultiplier} multiplier)
                                </button>
                              </div>
                            )}
                            {/* Almost unlocked hint */}
                            {almostUnlocked&&(
                              <div style={{fontSize:10,color:"#5a3878",fontStyle:"italic",marginTop:4}}>
                                🔒 {65-s.relationship}% more relationship needed to unlock {s.name}'s offer about {target.name}…
                              </div>
                            )}
                            {/* Far from unlock — just show lock */}
                            {g.offerHelp && s.relationship<50 && !thisStudentHelping&&(
                              <div style={{fontSize:10,color:"#3a2050",fontStyle:"italic",marginTop:4}}>
                                🔒 Build more trust with {s.name} to unlock a special offer…
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}

                {/* Personal actions — hidden for convergence/singularity/goddess students */}
                {s.ascensionPath!=="convergence"&&!s.incarnatedGoddess&&(
                <>
                <div style={{...C.secT,marginBottom:7}}>Personal Actions · {ap} AP</div>
                <div style={C.grid3}>
                  {effectiveSingleActions.map(a=>(
                    <div key={a.id} style={{...C.card,opacity:ap<a.cost?0.35:1}} onClick={()=>doSingle(a,s)}>
                      <div style={{fontWeight:700,fontSize:12,color:"#c090e8",marginBottom:2}}>{a.label}</div>
                      <div style={{fontSize:10,color:"#5a3888",lineHeight:1.4,marginBottom:4}}>{a.desc}</div>
                      <div style={{display:"flex",justifyContent:"space-between"}}>
                        <span style={{fontSize:10,color:"#e07030"}}>{a.cost} AP{a.cost===0?<span style={{color:"#60c060",marginLeft:3}}>FREE</span>:null}</span>
                        {a.gain[1]>0&&<span style={{fontSize:10,color:"#685040"}}>+{a.gain[0]}–{a.gain[1]} lbs</span>}
                      </div>
                    </div>
                  ))}
                </div>
                </>
                )}

                {/* Private Session */}
                {(()=>{
                  const tier=getTier(s.relationship);
                  const hist=sessionHistory[s.id]||{count:0,totalGain:0,capacityBonus:0};
                  const eligible=tier.id>=1;
                  return(
                    <div style={{marginTop:14}}>
                      <div style={{...C.secT,marginBottom:7,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                        <span>Private Feeding Session</span>
                        {hist.count>0&&<span style={{fontSize:9,color:"#7040c0",fontWeight:400}}>{hist.count} sessions · +{hist.totalGain} lbs · capacity +{hist.capacityBonus}</span>}
                      </div>
                      {!eligible?(
                        <div style={{fontSize:11,color:"#5a3888"}}>
                          Reach <span style={{color:"#7040a0",fontWeight:700}}>🤝 Close</span> tier to unlock private sessions with {s.name}.
                          <span style={{color:"#5030a0",marginLeft:6}}>{45-s.relationship > 0 ? `(${45-s.relationship}% to go)`:""}</span>
                        </div>
                      ):(
                        <div>
                          {hist.count>0&&(
                            <div style={{...C.infoBox("rgba(60,10,100,0.2)"),fontSize:11,color:"#8050b0",marginBottom:8,lineHeight:1.6}}>
                              {hist.count} session{hist.count!==1?"s":""} completed.
                              Her appetite has expanded — she can now comfortably eat {hist.capacityBonus}% more than when you started.
                            </div>
                          )}
                          <button style={{...C.btn("#5818a8"),opacity:ap<2?0.4:1}} onClick={()=>startPrivateSession(s)}>
                            🌙 Private Session (2 AP)
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* EP5: Intimacy */}
                {(()=>{
                  const tier=getTier(s.relationship);
                  if(tier.id<2||s.ascensionPath) return null;
                  return(
                    <div style={{marginTop:14}}>
                      <div style={C.secT}>Intimacy</div>
                      <div style={{fontSize:11,color:"#7050a0",marginBottom:8,fontStyle:"italic"}}>
                        She trusts you completely. The space between you has changed.
                      </div>
                      <button style={{...C.btn("#6020a0"),opacity:ap<1?0.4:1}} onClick={()=>openIntimacySelector(s)}>
                        💜 Get Close (1–2 AP)
                      </button>
                    </div>
                  );
                })()}

                {/* Research Study */}
                <div style={{marginTop:14}}>
                  <div style={C.secT}>Research Study</div>
                  {(()=>{
                    const pData=researchStudy.participants[s.id];
                    if(!pData){
                      return(
                        <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                          <div style={{fontSize:11,color:"#5a3888",flex:1}}>
                            {s.relationship<55
                              ?`Need 55 relationship to enroll ${s.name} (${s.relationship}/55).`
                              :`${s.name} is eligible for your dietary habits study.`}
                          </div>
                          {s.relationship>=55&&<button style={C.btn("#3a1070")} onClick={()=>proposeStudy(s)}>Propose Study (1 AP)</button>}
                        </div>
                      );
                    }
                    const sessions=pData.checkInCount;
                    return(
                      <div>
                        <div style={{display:"flex",gap:5,marginBottom:7,alignItems:"center"}}>
                          {[0,1,2,3,4].map(i=>(
                            <div key={i} style={{width:11,height:11,borderRadius:"50%",background:i<sessions?"#a060e0":"rgba(80,18,140,0.2)",border:"1px solid #4a1280"}}/>
                          ))}
                          <span style={{fontSize:11,color:"#8060b0",marginLeft:4}}>{sessions}/5 sessions</span>
                        </div>
                        {sessions<5
                          ?<button style={{...C.btn("#5020a0"),opacity:ap<1?0.4:1}} onClick={()=>runCheckIn(s)}>Schedule Check-in (1 AP)</button>
                          :<div style={{fontSize:11,color:"#5a3888",fontStyle:"italic"}}>Study arc complete.</div>}
                      </div>
                    );
                  })()}
                </div>

              </div>
            );
          })()}

          {/* ── CLASS ACTIONS ── */}
          {view==="actions"&&(
            <div>
              <p style={C.secT}>Class-Wide Actions · {ap} AP remaining</p>
              <div style={C.grid2}>
                {effectiveClassActions.map(a=>(
                  <div key={a.id} style={{...C.card,opacity:ap<a.cost?0.35:1}}>
                    <div style={{fontWeight:700,color:"#c090e8",marginBottom:3}}>{a.label}</div>
                    <div style={{fontSize:11,color:"#5a3888",marginBottom:8,lineHeight:1.4}}>{a.desc}</div>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                      <span style={{fontSize:11,color:a.cost===0?"#60c060":"#e07030"}}>{a.cost===0?"FREE":a.cost+" AP"}</span>
                      <span style={{fontSize:10,color:"#604030"}}>+{a.gain[0]}–{a.gain[1]} lbs ea</span>
                    </div>
                    <button style={{...C.btn(),width:"100%",opacity:ap<a.cost?0.4:1}} disabled={ap<a.cost} onClick={()=>doClass(a)}>Use Action</button>
                  </div>
                ))}
              </div>
            </div>
          )}

{/* ── SKILL TREE ── */}
          {view==="skills"&&(()=>{
            // Node layout: 4 columns (categories), 5 rows (tiers)
            // Each cell: col index, row index -> pixel position
            const COL_W=240, ROW_H=170, PAD_X=30, PAD_Y=50;
            const CATS=["environment","feeding","efficiency","social","psychology","prestige",...(goddessSeen?["divine"]:[])];
            const CAT_COLORS={"environment":"#3a8060","feeding":"#804020","efficiency":"#304080","social":"#802040","psychology":"#206050","prestige":"#806010","divine":"#702030"};
            const TIERS=[1,2,3,4,5,6];
            const TIER_COSTS=[50,150,350,700,1200,2000];
            // Build node positions — group by tier, lay out horizontally per tier
            const filteredSkills=ALL_SKILLS.filter(sk=>sk.category===skillCat);
            const byTier={};
            filteredSkills.forEach(sk=>{if(!byTier[sk.tier])byTier[sk.tier]=[];byTier[sk.tier].push(sk);});
            const NODE_W=120,NODE_H=52,NODE_GAP=14;
            const maxPerTier=Math.max(1,...Object.values(byTier).map(g=>g.length));
            const svgContentW=maxPerTier*(NODE_W+NODE_GAP)-NODE_GAP;
            const svgW=PAD_X*2+svgContentW;
            const svgH=PAD_Y*2+TIERS.length*ROW_H;
            const nodes=filteredSkills.map(sk=>{
              const tierNodes=byTier[sk.tier]||[sk];
              const idx=tierNodes.indexOf(sk);
              const count=tierNodes.length;
              const groupW=count*NODE_W+(count-1)*NODE_GAP;
              const startX=PAD_X+(svgContentW-groupW)/2+NODE_W/2;
              const x=startX+idx*(NODE_W+NODE_GAP);
              const y=PAD_Y+(sk.tier-1)*ROW_H+ROW_H/2;
              return {...sk,x,y};
            });
            const hoveredNode=hovered?nodes.find(n=>n.id===hovered):null;
            // Build edges: each node's requires -> parent nodes
            const edges=[];
            nodes.forEach(n=>{
              if(n.requires) n.requires.forEach(reqId=>{
                const parent=nodes.find(p=>p.id===reqId);
                if(parent) edges.push({from:parent,to:n});
              });
            });
            return(
              <div>
                <div style={{marginBottom:10}}>
                  <div style={{display:"flex",alignItems:"baseline",gap:10,marginBottom:10}}>
                    <p style={{...C.secT,margin:0}}>Classroom Upgrades</p>
                    <span style={{fontSize:22,fontWeight:700,color:"#f0c060",letterSpacing:-0.5,lineHeight:1}}>{totalGained}</span>
                    <span style={{fontSize:11,color:"#8050a0",letterSpacing:1}}>lbs gained</span>
                  </div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {CATS.map(cat=>{
                      const active=cat===skillCat;
                      return(
                        <button key={cat}
                          style={{background:active?CAT_COLORS[cat]+"99":"transparent",border:`1px solid ${CAT_COLORS[cat]}${active?"":"55"}`,borderRadius:6,padding:"5px 13px",fontSize:11,color:active?"#fff":"#7060a0",cursor:"pointer",fontFamily:"inherit",fontWeight:active?700:400,transition:"all 0.15s"}}
                          onClick={()=>{setSkillCat(cat);setHovered(null);}}>
                          {SKILL_CATEGORIES[cat]?.label||cat}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
                  {/* SVG Tree */}
                  <div style={{overflowX:"auto",overflowY:"visible",flex:"0 0 auto"}}>
                    <svg width={svgW} height={svgH} style={{display:"block"}}>
                      {/* Tier labels */}
                      {TIERS.map((t,i)=>(
                        <text key={t} x={8} y={PAD_Y+i*ROW_H+ROW_H/2+5} fill="#3a2050" fontSize={9} letterSpacing={2}
                          fontFamily="'Palatino Linotype',serif">T{t} · {TIER_COSTS[i]}</text>
                      ))}
                      {/* Active category label */}
                      <text x={PAD_X+COL_W/2} y={22} fill={CAT_COLORS[skillCat]} fontSize={11}
                        textAnchor="middle" fontFamily="'Palatino Linotype',serif" fontWeight="bold">
                        {SKILL_CATEGORIES[skillCat]?.label||skillCat}
                      </text>
                      {/* Tier dividers */}
                      {TIERS.map((t,i)=>(
                        <line key={t} x1={PAD_X-10} y1={PAD_Y+i*ROW_H} x2={svgW-10} y2={PAD_Y+i*ROW_H}
                          stroke="#1a0830" strokeWidth={1}/>
                      ))}
                      {/* Edges */}
                      {edges.map((e,i)=>{
                        const fromUnlocked=unlockedSkills.includes(e.from.id);
                        const toUnlocked=unlockedSkills.includes(e.to.id);
                        const active=fromUnlocked&&toUnlocked;
                        const reachable=fromUnlocked&&!toUnlocked;
                        return(
                          <line key={i}
                            x1={e.from.x} y1={e.from.y+28}
                            x2={e.to.x} y2={e.to.y-28}
                            stroke={active?"#60a060":reachable?"#6030a0":"#200830"}
                            strokeWidth={active?2.5:reachable?1.5:1}
                            strokeDasharray={active?"none":"4,4"}
                            opacity={active?0.9:reachable?0.7:0.3}
                          />
                        );
                      })}
                      {/* Nodes */}
                      {nodes.map(sk=>{
                        const unlocked=unlockedSkills.includes(sk.id);
                        const available=canUnlock(sk);
                        const isHovered=hovered===sk.id;
                        const baseColor=CAT_COLORS[sk.category];
                        const fillColor=unlocked?"#1a4020":available?"#2a1048":"#0e0618";
                        const borderColor=unlocked?"#50c050":available?"#8030d0":isHovered?"#3a1060":"#200830";
                        const textColor=unlocked?"#80e080":available?"#c080f0":"#4a3060";
                        const nodeW=120, nodeH=52;
                        return(
                          <g key={sk.id}
                            onMouseEnter={()=>setHovered(sk.id)}
                            onMouseLeave={()=>setHovered(null)}
                            onClick={()=>available&&startSkillPurchase(sk)}
                            style={{cursor:available?"pointer":"default"}}>
                            <rect
                              x={sk.x-nodeW/2} y={sk.y-nodeH/2}
                              width={nodeW} height={nodeH} rx={8}
                              fill={fillColor}
                              stroke={borderColor}
                              strokeWidth={unlocked?2:isHovered?1.5:1}
                              opacity={unlocked||available?1:0.45}
                            />
                            {/* Glow for available */}
                            {available&&!unlocked&&(
                              <rect x={sk.x-nodeW/2} y={sk.y-nodeH/2} width={nodeW} height={nodeH} rx={8}
                                fill="none" stroke="#9040e0" strokeWidth={3} opacity={0.25}
                                style={{filter:"blur(3px)"}}/>
                            )}
                            {/* Unlock cost badge */}
                            {!unlocked&&(
                              <rect x={sk.x+nodeW/2-32} y={sk.y-nodeH/2-10} width={32} height={14} rx={5}
                                fill={totalGained>=sk.cost?"#4a2080":"#2a0830"}/>
                            )}
                            {!unlocked&&(
                              <text x={sk.x+nodeW/2-16} y={sk.y-nodeH/2-1} fill={totalGained>=sk.cost?"#d0a0ff":"#603050"}
                                fontSize={8} textAnchor="middle" fontFamily="serif">{sk.cost}</text>
                            )}
                            {/* Checkmark if unlocked */}
                            {unlocked&&(
                              <text x={sk.x+nodeW/2-10} y={sk.y-nodeH/2+12} fill="#60c060" fontSize={12} textAnchor="middle">✓</text>
                            )}
                            {/* Label */}
                            <text x={sk.x} y={sk.y-6} fill={textColor} fontSize={10}
                              textAnchor="middle" fontFamily="'Palatino Linotype',serif" fontWeight="bold">
                              {sk.label.length>18?sk.label.slice(0,17)+"…":sk.label}
                            </text>
                            {/* Category color bar at bottom of node */}
                            <rect x={sk.x-nodeW/2+4} y={sk.y+nodeH/2-8} width={nodeW-8} height={4} rx={2}
                              fill={baseColor} opacity={unlocked?0.8:0.3}/>
                            {/* Click hint */}
                            {available&&(
                              <text x={sk.x} y={sk.y+10} fill="#9060c0" fontSize={8}
                                textAnchor="middle" fontFamily="serif">click to unlock</text>
                            )}
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                  {/* Detail panel — shows hovered/active node info */}
                  <div style={{flex:"1 1 220px",minWidth:200,maxWidth:280,position:"sticky",top:0}}>
                    {hoveredNode?(()=>{
                      const sk=hoveredNode;
                      const unlocked=unlockedSkills.includes(sk.id);
                      const available=canUnlock(sk);
                      const affordable=totalGained>=sk.cost;
                      const reqsMet=!sk.requires||sk.requires.every(r=>unlockedSkills.includes(r));
                      const cat=SKILL_CATEGORIES[sk.category];
                      return(
                        <div style={{background:"rgba(20,8,40,0.95)",border:`1px solid ${CAT_COLORS[sk.category]}88`,borderRadius:10,padding:14}}>
                          <div style={{fontSize:9,letterSpacing:2,color:CAT_COLORS[sk.category],marginBottom:4}}>{cat?.label} · TIER {sk.tier}</div>
                          <div style={{fontWeight:700,fontSize:14,color:unlocked?"#80e080":available?"#c090f0":"#7a5090",marginBottom:6}}>{sk.label}</div>
                          <div style={{fontSize:11,color:"#9070b0",lineHeight:1.6,marginBottom:8}}>{sk.desc}</div>
                          <div style={{fontSize:11,color:"#c090d0",lineHeight:1.5,fontStyle:"italic",marginBottom:10}}>{sk.effect}</div>
                          {sk.requires&&(
                            <div style={{fontSize:10,color:"#5a3070",marginBottom:8}}>
                              Requires: {sk.requires.map(r=>{
                                const rsk=ALL_SKILLS.find(s=>s.id===r);
                                return <span key={r} style={{color:unlockedSkills.includes(r)?"#60a060":"#7a3060",marginRight:4}}>
                                  {unlockedSkills.includes(r)?"✓ ":""}{rsk?.label||r}
                                </span>;
                              })}
                            </div>
                          )}
                          {unlocked
                            ? <div style={{background:"rgba(30,60,30,0.5)",border:"1px solid #306030",borderRadius:6,padding:"6px 10px",fontSize:11,color:"#70c070"}}>✓ Unlocked</div>
                            : available
                            ? <button style={{...C.btn("#5020a0"),width:"100%"}} onClick={()=>startSkillPurchase(sk)}>Unlock — spend {sk.cost} lbs</button>
                            : !reqsMet
                            ? <div style={{fontSize:10,color:"#4a2050"}}>Unlock prerequisites first.</div>
                            : <div style={{fontSize:10,color:"#4a2050"}}>Need {sk.cost-totalGained} more lbs on the class total.</div>
                          }
                        </div>
                      );
                    })()
                    :<div style={{background:"rgba(10,5,20,0.6)",border:"1px solid #1a0830",borderRadius:10,padding:14,fontSize:11,color:"#3a2050",fontStyle:"italic"}}>
                      Hover a node to see details. Click an available node to unlock it.
                    </div>}
                    {/* Active bonuses */}
                    <div style={{marginTop:10,background:"rgba(20,8,40,0.8)",border:"1px solid #200838",borderRadius:10,padding:12}}>
                      <div style={{fontSize:9,letterSpacing:2,color:"#5028a0",marginBottom:8}}>ACTIVE BONUSES</div>
                      {unlockedSkills.length===0
                        ?<div style={{fontSize:10,color:"#3a2050"}}>None yet. Fatten the class to unlock Tier 1 ({Math.max(0,50-totalGained)} lbs away).</div>
                        :<div style={{display:"flex",flexDirection:"column",gap:5}}>
                          {skillPassiveBonus>0&&<div style={{fontSize:11,color:"#80e080"}}>+{skillPassiveBonus} passive lbs/week</div>}
                          {skillApBonus>0&&<div style={{fontSize:11,color:"#80a0e0"}}>+{skillApBonus} AP/week (max 20)</div>}
                          {skillGainMult>1&&<div style={{fontSize:11,color:"#e0a060"}}>×{skillGainMult.toFixed(2)} all gain multiplier</div>}
                          {dinnerUnlocked&&<div style={{fontSize:11,color:"#c080f0"}}>🍽️ Dinner events active</div>}
                          {hasSkill("snack_station")&&<div style={{fontSize:11,color:"#60d090"}}>🍪 Desk Snacks FREE</div>}
                          {hasSkill("catering_contact")&&<div style={{fontSize:11,color:"#60d090"}}>🤝 Feast: -1 AP, +4 lbs</div>}
                          {hasSkill("private_kitchen")&&<div style={{fontSize:11,color:"#60d090"}}>🍳 Home-Cooked +4 lbs, Bake +3 lbs</div>}
                          {hasSkill("ap_mastery")&&<div style={{fontSize:11,color:"#60d090"}}>⚡ All single actions -1 AP</div>}
                          {hasSkill("full_catering")&&<div style={{fontSize:11,color:"#60d090"}}>🍾 On-Demand Feast unlocked</div>}
                          {hasSkill("group_dynamics")&&<div style={{fontSize:11,color:"#60d090"}}>👥 Group Dinner unlocked</div>}
                          {hasSkill("dinner_accessible")&&<div style={{fontSize:11,color:"#d0a030"}}>🌟 The Atelier unlocked</div>}
                          {skillScrutinyReduce<1&&<div style={{fontSize:11,color:"#a0d0e0"}}>🔇 -{Math.round((1-skillScrutinyReduce)*100)}% scrutiny gain</div>}
                          {skillScrutinyPassiveReduce>0&&<div style={{fontSize:11,color:"#a0d0e0"}}>🛡️ -{skillScrutinyPassiveReduce} scrutiny/week</div>}
                          {skillSessionCapBonus>0&&<div style={{fontSize:11,color:"#d0a0e0"}}>🌙 +{skillSessionCapBonus} session capacity</div>}
                          <div style={{fontSize:10,color:"#5a3070",marginTop:3}}>{unlockedSkills.length} / {ALL_SKILLS.length} skills</div>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ── SOCIAL EVENTS ── */}
          {view==="social"&&(
            <div>
              <p style={C.secT}>Social Events</p>
              <div style={{fontSize:11,color:"#6050a0",marginBottom:12,lineHeight:1.7}}>
                Host events to feed multiple students at once, build relationships, and manage Dr. Vaughan's suspicion.
                One event per week.
                {socialWeeks.includes(week)&&<span style={{color:"#f0a040",marginLeft:8}}>✓ Event held this week</span>}
              </div>
              {vaughan&&!vaughanAlly&&(
                <div style={{...C.infoBox("rgba(10,30,50,0.4)"),fontSize:11,color:"#4080a0",marginBottom:12}}>
                  👓 Vaughan attends department socials, symposiums, and the end-of-term banquet. When she attends events, she gains weight and her suspicion drops.
                  Events that don't require her attendance still reduce suspicion passively.
                </div>
              )}
              <div style={C.grid2}>
                {SOCIAL_EVENTS.map(ev=>{
                  const canAfford=ap>=ev.apCost;
                  const heldThisWeek=socialWeeks.includes(week);
                  const locked=!canAfford||heldThisWeek;
                  return(
                    <div key={ev.id}
                      style={{...C.card,opacity:locked?0.5:1,cursor:locked?"not-allowed":"pointer",transition:"border-color 0.15s"}}
                      onClick={()=>!locked&&startSocialEvent(ev)}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                        <span style={{fontWeight:700,fontSize:13,color:"#d8a8ff"}}>{ev.label}</span>
                        <span style={{fontSize:10,color:"#a080c0",background:"rgba(80,20,120,0.3)",borderRadius:8,padding:"1px 7px"}}>{ev.apCost} AP</span>
                      </div>
                      <div style={{fontSize:11,color:"#6a4870",lineHeight:1.5,marginBottom:6}}>{ev.desc}</div>
                      <div style={{display:"flex",gap:8,flexWrap:"wrap",fontSize:10,color:"#5a3860"}}>
                        <span>+{ev.baseGain[0]}–{ev.baseGain[1]} lbs</span>
                        <span>+{ev.relBonus} rel</span>
                        <span>{ev.minStudents}–{ev.maxStudents} students</span>
                      </div>
                      {ev.vaughanAttends&&vaughan&&!vaughanAlly&&(
                        <div style={{fontSize:9,color:"#306070",marginTop:4}}>
                          👓 Vaughan attends · suspicion {ev.vaughanEffect}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── ACHIEVEMENTS ── */}
          {/* ── DIVINE PANEL ── */}
          {view==="divine"&&goddessSeen&&(()=>{
            const ascended=students.filter(s=>s.ascensionPath&&s.ascensionPath!=="convergence"&&s.ascensionPath!=="primordial");
            const celestials=ascended.filter(s=>s.ascensionPath==="celestial");
            const umbrals=ascended.filter(s=>s.ascensionPath==="umbral");
            const sanguines=ascended.filter(s=>s.ascensionPath==="sanguine");
            const verdants=ascended.filter(s=>s.ascensionPath==="verdant");
            const singularities=students.filter(s=>s.ascensionPath==="convergence");
            const primordials=students.filter(s=>s.ascensionPath==="primordial");
            const blobsEligible=students.filter(s=>getStage(s.lbs).id>=10&&!s.ascensionPath);
            return(
              <div>
                <p style={C.secT}>✦ Divine Realm</p>

                {/* Goddess message */}
                <div style={{background:"rgba(20,5,40,0.8)",border:"1px solid #6030c080",borderRadius:10,padding:14,marginBottom:14}}>
                  <div style={{fontSize:9,letterSpacing:3,color:"#8050c0",marginBottom:6}}>THE GODDESS SPEAKS</div>
                  <div style={{fontSize:13,color:"#d0b0f0",fontStyle:"italic",lineHeight:1.85}}>
                    {singularities.length>0
                      ? "The Singularity has been achieved. The goddess is silent, because she is pleased beyond words."
                      : umbrals.some(u=>u.ascensionStage>=4)&&celestials.some(c=>c.ascensionStage>=4)
                      ? "An Umbral Sovereign and a Celestial Apex exist simultaneously. The convergence is possible. The choice is yours."
                      : ascended.length===0
                      ? "The vision has been received. You may now ascend any Blob-stage student along the Celestial or Umbral path. Find them in the class roster."
                      : "The paths are open. She watches your class with great interest. Make them vast."}
                  </div>
                </div>

                {/* Blob-eligible students */}
                {blobsEligible.length>0&&(
                  <div style={{marginBottom:14}}>
                    <div style={{...C.secT,marginBottom:8}}>Eligible for Ascension</div>
                    <div style={{display:"flex",flexDirection:"column",gap:6}}>
                      {blobsEligible.map(s=>(
                        <div key={s.id} style={{...C.card,cursor:"default"}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                            <span style={{fontWeight:700,fontSize:14,color:"#d8a8ff"}}>{s.name}</span>
                            <span style={{fontSize:11,color:"#806090"}}>{s.lbs} lbs · {getStage(s.lbs).label}</span>
                          </div>
                          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                            <button style={{...C.btn("#3020a0"),flex:1,minWidth:"45%"}} onClick={()=>ascendStudent(s,"celestial")}>✦ Celestial</button>
                            <button style={{...C.btn("#800010"),flex:1,minWidth:"45%"}} onClick={()=>ascendStudent(s,"umbral")}>🌑 Umbral</button>
                            <button style={{...C.btn("#6b1010"),flex:1,minWidth:"45%"}} onClick={()=>ascendStudent(s,"sanguine")}>🩸 Sanguine</button>
                            <button style={{...C.btn("#0a3a0a"),flex:1,minWidth:"45%"}} onClick={()=>ascendStudent(s,"verdant")}>🌿 Verdant</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Celestial roster */}
                {celestials.length>0&&(
                  <div style={{marginBottom:14}}>
                    <div style={{...C.secT,marginBottom:8}}>✦ Celestial ({celestials.length})</div>
                    {celestials.map(s=>{
                      const stage=CELESTIAL_STAGES[s.ascensionStage||0];
                      return(
                        <div key={s.id} style={{background:"rgba(40,10,100,0.35)",border:"1px solid #6040c060",borderRadius:8,padding:10,marginBottom:6}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                            <span style={{fontWeight:700,color:"#c0a8ff",fontSize:13}}>{s.name}</span>
                            <span style={{fontSize:10,color:"#9070d0",background:"rgba(80,30,160,0.3)",borderRadius:8,padding:"1px 8px"}}>{stage.label}</span>
                          </div>
                          <div style={{fontSize:11,color:"#8060a0"}}>{s.lbs} lbs · Stage {(s.ascensionStage||0)+1}/5</div>
                          {(s.ascensionStage||0)<4&&<div style={{fontSize:10,color:"#503080",marginTop:2}}>Next: {CELESTIAL_STAGES[(s.ascensionStage||0)+1].min.toLocaleString()} lbs</div>}
                          <div style={{display:"flex",gap:5,marginTop:6,flexWrap:"wrap"}}>
                            {students.filter(t=>t.id!==s.id).map(t=>(
                              <span key={t.id} style={{display:"flex",gap:2}}>
                                <button style={{...C.smBtn,fontSize:9}} onClick={()=>celestialMassPull(s.id,t.id)}>↓Pull {t.name.split(" ")[0]}</button>
                                <button style={{...C.smBtn,fontSize:9,background:"rgba(40,10,80,0.4)"}} onClick={()=>celestialMassPush(s.id,t.id)}>↑Push {t.name.split(" ")[0]}</button>
                                <button style={{...C.smBtn,fontSize:9,background:"rgba(40,10,80,0.4)"}} onClick={()=>celestialMassBless(s.id,t.id)}>✦Bless {t.name.split(" ")[0]}</button>
                              </span>
                            ))}
                            {divineCelestialCanPullHR&&hrObserver&&(
                              <span style={{display:"flex",gap:2}}>
                                <button style={{...C.smBtn,fontSize:9,background:"rgba(30,60,100,0.5)"}} onClick={()=>celestialMassPull(s.id,"hr")}>↓Pull {hrObserver.name.split(" ")[1]||hrObserver.name}</button>
                                <button style={{...C.smBtn,fontSize:9,background:"rgba(40,10,100,0.5)"}} onClick={()=>celestialMassPush(s.id,"hr")}>↑Push {hrObserver.name.split(" ")[1]||hrObserver.name}</button>
                                <button style={{...C.smBtn,fontSize:9,background:"rgba(80,30,150,0.5)"}} onClick={()=>celestialMassBless(s.id,"hr")}>✦Bless {hrObserver.name.split(" ")[1]||hrObserver.name}</button>
                              </span>
                            )}
                            {divineCelestialCanPullHR&&vaughan&&(
                              <span style={{display:"flex",gap:2}}>
                                <button style={{...C.smBtn,fontSize:9,background:"rgba(40,10,100,0.5)"}} onClick={()=>celestialMassPush(s.id,"vaughan")}>↑Push Vaughan</button>
                                <button style={{...C.smBtn,fontSize:9,background:"rgba(80,30,150,0.5)"}} onClick={()=>celestialMassBless(s.id,"vaughan")}>✦Bless Vaughan</button>
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Umbral roster */}
                {umbrals.length>0&&(
                  <div style={{marginBottom:14}}>
                    <div style={{...C.secT,marginBottom:8}}>🌑 Umbral ({umbrals.length})</div>
                    {umbrals.map(s=>{
                      const stage=UMBRAL_STAGES[s.ascensionStage||0];
                      return(
                        <div key={s.id} style={{background:"rgba(50,5,5,0.55)",border:"1px solid #80101060",borderRadius:8,padding:10,marginBottom:6}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                            <span style={{fontWeight:700,color:"#ff8080",fontSize:13}}>{s.name}</span>
                            <span style={{fontSize:10,color:"#cc5050",background:"rgba(80,5,5,0.4)",borderRadius:8,padding:"1px 8px"}}>{stage.label}</span>
                          </div>
                          <div style={{fontSize:11,color:"#a06060"}}>{s.lbs} lbs · Stage {(s.ascensionStage||0)+1}/5 · {(s.consumedIds||[]).length} consumed</div>
                          {(s.ascensionStage||0)<4&&<div style={{fontSize:10,color:"#703030",marginTop:2}}>Next: {UMBRAL_STAGES[(s.ascensionStage||0)+1].min.toLocaleString()} lbs</div>}
                          {(s.consumedIds||[]).length>0&&(
                            <div style={{marginTop:5}}>
                              <div style={{fontSize:9,color:"#903030",letterSpacing:1,marginBottom:3}}>CONSUMED:</div>
                              {(s.consumedIds||[]).map(cid=>{
                                const cs=consumedStudents.find(x=>x.id===cid);
                                return cs?(
                                  <div key={cid} style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#c07070",padding:"2px 0"}}>
                                    <span>{cs.name} ({cs.lbs} lbs)</span>
                                    <button style={{...C.smBtn,fontSize:9}} onClick={()=>recoverConsumedStudent(cid,s.id)}>Release (3AP)</button>
                                  </div>
                                ):null;
                              })}
                            </div>
                          )}
                          <div style={{display:"flex",gap:5,marginTop:6,flexWrap:"wrap"}}>
                            {students.filter(t=>t.id!==s.id).map(t=>(
                              <span key={t.id} style={{display:"flex",gap:2}}>
                                <button style={{...C.smBtn,fontSize:9,background:"rgba(60,0,0,0.5)"}} onClick={()=>umbralVoidPull(s.id,t.id)}>🌑Pull {t.name.split(" ")[0]}</button>
                                <button style={{...C.smBtn,fontSize:9,background:"rgba(80,0,0,0.5)"}} onClick={()=>umbralConsumeStudent(s.id,t.id)}>🌑Consume {t.name.split(" ")[0]}</button>
                              </span>
                            ))}
                            {divineUmbralCanConsumeHR&&(hrObserver||vaughan)&&(
                              <button style={{...C.smBtn,fontSize:9,background:"rgba(90,0,0,0.7)"}} onClick={()=>umbralConsumeHR(s.id)}>🌑Consume HR</button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Sanguine roster */}
                {sanguines.length>0&&(
                  <div style={{marginBottom:14}}>
                    <div style={{...C.secT,marginBottom:8}}>🩸 Sanguine ({sanguines.length})</div>
                    {sanguines.map(s=>{
                      const stage=SANGUINE_STAGES[s.ascensionStage||0];
                      return(
                        <div key={s.id} style={{background:"rgba(50,5,5,0.55)",border:"1px solid #cc303060",borderRadius:8,padding:10,marginBottom:6}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                            <span style={{fontWeight:700,color:"#ff8888",fontSize:13}}>{s.name}</span>
                            <span style={{fontSize:10,color:"#cc5050",background:"rgba(80,5,5,0.4)",borderRadius:8,padding:"1px 8px"}}>{stage.label}</span>
                          </div>
                          <div style={{fontSize:11,color:"#a06060"}}>{Math.round(s.lbs).toLocaleString()} lbs · Stage {(s.ascensionStage||0)+1}/5 · {sanguineMarks.filter(id=>students.find(st=>st.id===id)).length} marked</div>
                          {(s.ascensionStage||0)<4&&<div style={{fontSize:10,color:"#703030",marginTop:2}}>Next: {SANGUINE_STAGES[(s.ascensionStage||0)+1].min.toLocaleString()} lbs</div>}
                          <div style={{display:"flex",gap:5,marginTop:6,flexWrap:"wrap"}}>
                            {SANGUINE_ACTIONS.map(a=>(
                              <button key={a.id} style={{...C.smBtn,fontSize:9,background:"rgba(80,10,10,0.5)",opacity:ap<a.apCost?0.4:1}}
                                onClick={()=>ap>=a.apCost&&doSanguineAction(s,a.id)}>
                                {a.label} ({a.apCost}AP)
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Verdant roster */}
                {verdants.length>0&&(
                  <div style={{marginBottom:14}}>
                    <div style={{...C.secT,marginBottom:8}}>🌿 Verdant ({verdants.length})</div>
                    {verdants.map(s=>{
                      const stage=VERDANT_STAGES[s.ascensionStage||0];
                      return(
                        <div key={s.id} style={{background:"rgba(5,30,5,0.55)",border:"1px solid #33663360",borderRadius:8,padding:10,marginBottom:6}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                            <span style={{fontWeight:700,color:"#88cc88",fontSize:13}}>{s.name}</span>
                            <span style={{fontSize:10,color:"#55aa55",background:"rgba(5,40,5,0.4)",borderRadius:8,padding:"1px 8px"}}>{stage.label}</span>
                          </div>
                          <div style={{fontSize:11,color:"#70a070"}}>{Math.round(s.lbs).toLocaleString()} lbs · Stage {(s.ascensionStage||0)+1}/5 · {verdantCultivations.filter(id=>students.find(st=>st.id===id)).length} cultivated</div>
                          {(s.ascensionStage||0)<4&&<div style={{fontSize:10,color:"#305030",marginTop:2}}>Next: {VERDANT_STAGES[(s.ascensionStage||0)+1].min.toLocaleString()} lbs</div>}
                          <div style={{display:"flex",gap:5,marginTop:6,flexWrap:"wrap"}}>
                            {VERDANT_ACTIONS.map(a=>(
                              <button key={a.id} style={{...C.smBtn,fontSize:9,background:"rgba(10,50,10,0.5)",opacity:ap<a.apCost?0.4:1}}
                                onClick={()=>ap>=a.apCost&&doVerdantAction(s,a.id)}>
                                {a.label} ({a.apCost}AP)
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Singularity */}
                {singularities.length>0&&(
                  <div style={{marginBottom:14}}>
                    <div style={{...C.secT,marginBottom:8}}>⚡ The Singularity</div>
                    {singularities.map(s=>{
                      const sg=getSingularityStage(s.lbs);
                      const sgLabel=s.triumvirateUnlocked?"🔱 The Triumvirate":sg?sg.label:CONVERGENCE_STAGE.label;
                      const sgColor=s.triumvirateUnlocked?"#ffd700":sg?sg.color:"#ffffff";
                      return(
                        <div key={s.id} style={{background:"rgba(20,20,20,0.9)",border:`2px solid ${sgColor}60`,borderRadius:8,padding:12}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                            <div style={{fontWeight:700,color:sgColor,fontSize:14}}>{s.name}</div>
                            <div style={{fontSize:11,color:sgColor,background:"rgba(0,0,0,0.4)",borderRadius:8,padding:"1px 8px"}}>{sgLabel}</div>
                          </div>
                          <div style={{fontSize:11,color:"#e0e0e0",marginBottom:4}}>{Math.round(s.lbs).toLocaleString()} lbs{sg&&sg.id<5?` · next: ${SINGULARITY_STAGES[sg.id].min.toLocaleString()}`:" · MAX"}</div>
                          <div style={{fontSize:11,color:"#b0b0b0",fontStyle:"italic",lineHeight:1.65}}>{sg?sg.desc:CONVERGENCE_STAGE.aura}</div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Primordial roster */}
                {primordials.length>0&&(
                  <div style={{marginBottom:14}}>
                    <div style={{...C.secT,marginBottom:8}}>🌍 The Primordial</div>
                    {primordials.map(s=>{
                      const pg=getPrimordialStage(s.lbs);
                      const pgLabel=s.primordialTriumvirateUnlocked?"🔱 Primordial Triumvirate":pg?pg.label:"Bloodroot";
                      const pgColor=s.primordialTriumvirateUnlocked?"#c8a060":pg?pg.color:"#3d1a0a";
                      return(
                        <div key={s.id} style={{background:"rgba(8,4,2,0.9)",border:`2px solid ${pgColor}60`,borderRadius:8,padding:12}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                            <div style={{fontWeight:700,color:pgColor,fontSize:14}}>{s.name}</div>
                            <div style={{fontSize:11,color:pgColor,background:"rgba(0,0,0,0.4)",borderRadius:8,padding:"1px 8px"}}>{pgLabel}</div>
                          </div>
                          <div style={{fontSize:11,color:"#c0a080",marginBottom:4}}>{Math.round(s.lbs).toLocaleString()} lbs{pg&&pg.id<5?` · next: ${PRIMORDIAL_STAGES[pg.id].min.toLocaleString()}`:" · MAX"}</div>
                          <div style={{fontSize:11,color:"#a08060",fontStyle:"italic",lineHeight:1.65}}>{pg?pg.desc:"Ancient hunger, ancient patience."}</div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Religion panel */}
                <div style={{background:"rgba(30,5,20,0.6)",border:"1px solid #80204060",borderRadius:10,padding:14,marginBottom:14}}>
                  <div style={{fontSize:9,letterSpacing:3,color:"#b04060",marginBottom:8}}>⛪ RELIGION</div>
                  {!religion?(
                    <div>
                      <div style={{fontSize:12,color:"#906070",lineHeight:1.7,marginBottom:10}}>
                        Found a religion centred on an ascended blob. Devotees gather. The student body grows heavier in proximity to the sacred.
                      </div>
                      {[...ascended,...sanguines,...verdants,...singularities,...primordials].length>0?(
                        <div style={{display:"flex",flexDirection:"column",gap:5}}>
                          {[...ascended,...sanguines,...verdants,...singularities,...primordials].map(s=>(
                            <button key={s.id} style={C.btn("#401020")} onClick={()=>foundReligion(s.id)}>
                              ⛪ Found religion around {s.name} (2AP)
                            </button>
                          ))}
                        </div>
                      ):(
                        <div style={{fontSize:11,color:"#604050"}}>Ascend a student first to found a religion.</div>
                      )}
                    </div>
                  ):(
                    <div>
                      <div style={{display:"flex",gap:14,marginBottom:10,flexWrap:"wrap"}}>
                        <div style={{textAlign:"center"}}>
                          <div style={{fontSize:22,fontWeight:700,color:"#e08090"}}>{religion.devotees}</div>
                          <div style={{fontSize:9,color:"#904050",letterSpacing:1}}>DEVOTEES</div>
                        </div>
                        <div style={{textAlign:"center"}}>
                          <div style={{fontSize:22,fontWeight:700,color:"#d06070"}}>{religion.ritesHeld}</div>
                          <div style={{fontSize:9,color:"#904050",letterSpacing:1}}>RITES HELD</div>
                        </div>
                        <div style={{textAlign:"center"}}>
                          <div style={{fontSize:22,fontWeight:700,color:"#c05060"}}>{religion.worshippedIds.length}</div>
                          <div style={{fontSize:9,color:"#904050",letterSpacing:1}}>BLOBS WORSHIPPED</div>
                        </div>
                        <div style={{textAlign:"center"}}>
                          <div style={{fontSize:22,fontWeight:700,color:"#b04050"}}>{(religion.weeklyPassiveGain||0).toFixed(1)}</div>
                          <div style={{fontSize:9,color:"#904050",letterSpacing:1}}>DEVOTEES/WEEK</div>
                        </div>
                      </div>
                      <div style={{fontSize:10,color:"#704050",marginBottom:8}}>
                        Founded week {religion.founded} · {religion.worshippedIds.map(id=>students.find(s=>s.id===id)?.name||"?").join(", ")}
                      </div>
                      {/* Add more blobs to religion */}
                      {ascended.filter(s=>!religion.worshippedIds.includes(s.id)).length>0&&(
                        <div style={{marginBottom:10}}>
                          <div style={{fontSize:10,color:"#805060",marginBottom:4}}>Add to pantheon:</div>
                          {ascended.filter(s=>!religion.worshippedIds.includes(s.id)).map(s=>(
                            <button key={s.id} style={{...C.smBtn,marginBottom:3,display:"block"}} onClick={()=>addBlobToReligion(s.id)}>
                              ⛪ {s.name} (+2 devotees)
                            </button>
                          ))}
                        </div>
                      )}
                      {/* Hold Rites */}
                      <div style={{fontSize:10,color:"#904050",marginBottom:6}}>Hold a Rite:</div>
                      <div style={{display:"flex",flexDirection:"column",gap:5}}>
                        {RELIGION_RITES.map(rite=>(
                          <div key={rite.id} style={{background:"rgba(40,0,20,0.5)",border:"1px solid #80204040",borderRadius:7,padding:9}}>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                              <span style={{fontSize:12,fontWeight:700,color:"#e08090"}}>{rite.label}</span>
                              <span style={{fontSize:10,color:"#704050"}}>{rite.apCost} AP · +{rite.devoteeGain} devotees · +{rite.scrutiny} scrutiny</span>
                            </div>
                            <div style={{fontSize:10,color:"#905060",marginBottom:6}}>Blob gains +{Math.round(rite.blobBonus*divineRiteBlobMult)} lbs</div>
                            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                              {religion.worshippedIds.map(bid=>{
                                const blob=students.find(s=>s.id===bid);
                                return blob?(
                                  <button key={bid} style={{...C.btn("#50102030"),fontSize:10}} onClick={()=>holdRite(rite,bid)}>
                                    {rite.label} for {blob.name}
                                  </button>
                                ):null;
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* Singularity rites (shown when a singularity student exists) */}
                      {singularities.length>0&&(
                        <div style={{marginTop:12}}>
                          <div style={{fontSize:10,color:"#a080c0",marginBottom:6}}>⚡ Singularity Rites:</div>
                          <div style={{display:"flex",flexDirection:"column",gap:5}}>
                            {SINGULARITY_RITES.map(rite=>{
                              const sgStudent=singularities[0];
                              const canAfford=ap>=rite.apCost&&religion.devotees>=(rite.devoteeMin||0)&&religion.devotees>=(rite.devoteeCost||0);
                              return(
                                <div key={rite.id} style={{background:"rgba(20,5,40,0.6)",border:"1px solid #6020a040",borderRadius:7,padding:9,opacity:canAfford?1:0.45}}>
                                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                                    <span style={{fontSize:11,fontWeight:700,color:"#c090e0"}}>{rite.label}</span>
                                    <span style={{fontSize:10,color:"#806090"}}>{rite.apCost} AP{rite.devoteeMin?` · ${rite.devoteeMin} dev min`:""}</span>
                                  </div>
                                  <div style={{fontSize:10,color:"#806070",marginBottom:5,fontStyle:"italic"}}>{rite.desc}</div>
                                  <button style={{...C.btn("#301050"),fontSize:10,width:"100%"}} onClick={()=>doSingularityRite(rite)}>
                                    {rite.label} ({sgStudent.name})
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      {/* Primordial rites */}
                      {primordials.length>0&&(
                        <div style={{marginTop:12}}>
                          <div style={{fontSize:10,color:"#a06030",marginBottom:6}}>🌍 Primordial Rites:</div>
                          <div style={{display:"flex",flexDirection:"column",gap:5}}>
                            {PRIMORDIAL_RITES.map(rite=>{
                              const pgStudent=primordials[0];
                              const canAfford=ap>=rite.apCost&&religion.devotees>=(rite.devoteeMin||0)&&religion.devotees>=(rite.devoteeCost||0);
                              return(
                                <div key={rite.id} style={{background:"rgba(20,8,2,0.6)",border:"1px solid #a0603040",borderRadius:7,padding:9,opacity:canAfford?1:0.45}}>
                                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                                    <span style={{fontSize:11,fontWeight:700,color:"#c08040"}}>{rite.label}</span>
                                    <span style={{fontSize:10,color:"#806040"}}>{rite.apCost} AP{rite.devoteeMin?` · ${rite.devoteeMin} dev min`:""}</span>
                                  </div>
                                  <div style={{fontSize:10,color:"#806050",marginBottom:5,fontStyle:"italic"}}>{rite.desc}</div>
                                  <button style={{...C.btn("#3a1800"),fontSize:10,width:"100%"}} onClick={()=>doPrimordialRite(rite)}>
                                    {rite.label} ({pgStudent.name})
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

              </div>
            );
          })()}

          {view==="achievements"&&(
            <div>
              <p style={C.secT}>Achievements — {achievements.length}/{ACHIEVEMENT_LIST.length} unlocked</p>
              <div style={C.grid2}>
                {ACHIEVEMENT_LIST.map(a=>{
                  const unlocked=achievements.includes(a.id);
                  return(
                    <div key={a.id} style={{...C.card,cursor:"default",opacity:unlocked?1:0.4,border:unlocked?"1px solid #4a18a0":"1px solid #180830"}}>
                      <div style={{fontSize:16,marginBottom:4}}>{a.label}</div>
                      <div style={{fontSize:11,color:unlocked?"#c0a0e8":"#5a4070"}}>{a.desc}</div>
                      {unlocked&&<div style={{fontSize:10,color:"#7040c0",marginTop:4}}>✓ Unlocked</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* ── SIDEBAR: LIVE LOG ── */}
        <div style={{...C.side, display:"flex", flexDirection:"column"}}>
          <p style={{...C.secT, flexShrink:0}}>Event Log — {log.length} entries</p>
          <div ref={logRef} style={{flex:1, overflow:"auto"}}>
            {log.map((e,i)=><div key={i} style={C.logE}>{e}</div>)}
          </div>
        </div>
      </div>

      {/* ── ADMIN EVENT MODAL ── */}
      {adminEvent&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:520}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#c04030",marginBottom:6}}>ADMINISTRATION</div>
            <h2 style={{margin:"0 0 14px",color:"#ff8070",fontSize:17,fontWeight:400}}>{adminEvent.title}</h2>
            <div style={{...C.infoBox("rgba(80,10,10,0.3)"),lineHeight:1.8,fontSize:13,color:"#d0b0a0",marginBottom:16,fontStyle:"italic"}}>
              {adminEvent.scene()}
            </div>
            {/* Termination: show observer intervention status */}
            {adminEvent.isGameOver&&(
              <div style={{...C.infoBox(hrObserver&&hrObserver.disposition>=65?"rgba(20,70,20,0.4)":"rgba(60,20,0,0.3)"),fontSize:12,marginBottom:12,color:hrObserver&&hrObserver.disposition>=65?"#70d080":"#906040"}}>
                {hrObserver
                  ? hrObserver.disposition>=65
                    ? `✅ ${hrObserver.name} has become sympathetic (${hrObserver.disposition} disposition). She will intervene on your behalf.`
                    : `⚠️ ${hrObserver.name} is observing (${hrObserver.disposition}/65 needed to save you). If she were more sympathetic, she could file a favorable report.`
                  : `No one is in your corner right now.`}
              </div>
            )}
            <div style={{display:"flex",flexDirection:"column",gap:7}}>
              {adminEvent.choices.map((ch,i)=>(
                <button key={i} style={{...C.btn(ch.delta<0?"#184020":ch.delta>5?"#601010":"#2a1040"),textAlign:"left",padding:"9px 13px"}}
                  onClick={()=>{
                    push(`🏛️ ${adminEvent.title}: ${ch.text}`);
                    if(ch.delta>0) addScrutiny(ch.delta);
                    else if(ch.delta<0) setAdminScrutiny(prev=>Math.max(0,prev+ch.delta));
                    if(adminEvent.spawnsObserver){
                      const obs=HR_OBSERVER_POOL[rnd(0,HR_OBSERVER_POOL.length-1)];
                      setHrObserver({...obs,lbs:obs.startLbs,disposition:0,weeksPresent:0});
                      push(`👤 ${obs.intro}`);
                    }
                    if(adminEvent.isGameOver){
                      if(hrObserver&&hrObserver.disposition>=65){
                        push(`✅ ${hrObserver.name} files her report. "I cannot support the findings of the initial review. The pedagogy is excellent, the students are thriving, and I am closing the file."`);
                        push(`📧 Dean Holloway replies within the hour: "Thank you for your thorough assessment." The semester continues.`);
                        setAdminScrutiny(30);
                        setHrObserver(prev=>({...prev,saved:true}));
                      } else {
                        push("💀 Your contract has not been renewed. The semester ends here.");
                      }
                    }
                    setAdminEvent(null);
                  }}>
                  {ch.label}
                </button>
              ))}
            </div>
            <div style={{fontSize:10,color:"#502030",marginTop:10}}>Scrutiny: {adminScrutiny}/100</div>
          </div>
        </div>
      )}

      {/* ── STUDY CHECK-IN MODAL ── */}
      {studyCheckIn&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:520}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:6}}>RESEARCH CHECK-IN — SESSION {studyCheckIn.index+1}</div>
            <div style={{fontSize:12,color:"#9070b0",marginBottom:10}}>{studyCheckIn.student.name} · {studyCheckIn.student.lbs} lbs · {getStage(studyCheckIn.student.lbs).label}</div>
            <div style={{...C.infoBox("rgba(60,20,100,0.2)"),lineHeight:1.85,fontSize:13,color:"#d0c0e0",fontStyle:"italic",marginBottom:16}}>
              {studyCheckIn.scene}
            </div>
            <button style={C.btn("#5020a0")} onClick={()=>setStudyCheckIn(null)}>Close</button>
          </div>
        </div>
      )}

      {/* ── TIER-UP MODAL ── */}
      {tierUpModal&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:500}}>
            <div style={{fontSize:9,letterSpacing:3,color:tierUpModal.newTier.color,marginBottom:8}}>RELATIONSHIP MILESTONE</div>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
              <span style={{fontSize:26}}>{tierUpModal.newTier.emoji}</span>
              <div>
                <div style={{fontSize:17,fontWeight:700,color:tierUpModal.newTier.color}}>{tierUpModal.student.name}</div>
                <div style={{fontSize:12,color:"#7060a0",marginTop:2}}>
                  {tierUpModal.oldTier.emoji} {tierUpModal.oldTier.label}
                  <span style={{margin:"0 6px",color:"#4030608a"}}>→</span>
                  <span style={{color:tierUpModal.newTier.color,fontWeight:700}}>{tierUpModal.newTier.emoji} {tierUpModal.newTier.label}</span>
                </div>
              </div>
            </div>
            <div style={{...C.infoBox("rgba(60,20,100,0.2)"),lineHeight:1.85,fontSize:13,color:"#e0d0b0",fontStyle:"italic",marginBottom:14}}>
              {tierUpModal.scene}
            </div>
            {tierUpModal.newTier.id===3&&(
              <div style={{...C.infoBox("rgba(80,10,130,0.3)"),fontSize:11,color:"#c060ff",marginBottom:12,lineHeight:1.6}}>
                🖤 <strong>Devoted.</strong> She accepts her situation completely.
                +10% gain multiplier applied. She passively covers 1 scrutiny point per week through glowing feedback.
              </div>
            )}
            {tierUpModal.newTier.id===2&&(
              <div style={{...C.infoBox("rgba(60,10,100,0.25)"),fontSize:11,color:"#9050c8",marginBottom:12}}>
                💜 <strong>Intimate.</strong> She trusts you implicitly. Talk actions give bonus relationship.
              </div>
            )}
            <button style={{...C.btn("#5020a0"),background:tierUpModal.newTier.color+"99"}} onClick={()=>{
              if(tierUpModal.newTier.id===3){
                setStudents(prev=>prev.map(s=>s.id!==tierUpModal.student.id?s:{...s,gainMultiplier:(s.gainMultiplier||1)*1.1}));
              }
              setTierUpModal(null);
            }}>Continue →</button>
          </div>
        </div>
      )}

      {/* ── VAUGHAN EVENT MODAL ── */}
      {vaughanModal&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:520}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#408090",marginBottom:6}}>DR. VAUGHAN — WELLNESS & KINESIOLOGY</div>
            <h2 style={{margin:"0 0 14px",color:"#70c0d8",fontSize:17,fontWeight:400}}>{vaughanModal.title}</h2>
            <div style={{...C.infoBox("rgba(5,25,40,0.5)"),lineHeight:1.8,fontSize:13,color:"#d0c8b8",fontStyle:"italic",marginBottom:16}}>
              {vaughanModal.scene()}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:7}}>
              {vaughanModal.choices.map((ch,i)=>(
                <button key={i}
                  style={{...C.btn(ch.vDelta&&ch.vDelta>10?"#204060":ch.delta&&ch.delta>5?"#601010":"#2a2a40"),textAlign:"left",padding:"9px 13px"}}
                  onClick={()=>resolveVaughanEvent(vaughanModal,ch)}>
                  {ch.label}
                </button>
              ))}
            </div>
            <div style={{fontSize:10,color:"#304050",marginTop:10}}>
              Suspicion: {vaughan?.suspicion||0}/100 · Disposition: {vaughan?.disposition||0}/100 · {vaughan?.lbs||0} lbs
            </div>
          </div>
        </div>
      )}

      {/* ── SOCIAL EVENT PICKER ── */}
      {socialPicker&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:520}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:6}}>SOCIAL EVENT</div>
            <h2 style={{margin:"0 0 4px",color:"#c898ff",fontSize:18}}>{socialPicker.event.label}</h2>
            <div style={{fontSize:12,color:"#7060a0",lineHeight:1.6,marginBottom:12}}>{socialPicker.event.desc}</div>
            <div style={{...C.secT,marginBottom:8}}>
              Invite students
              <span style={{fontWeight:400,color:"#5030a0",marginLeft:6}}>
                {socialPicker.selected.length} selected · need {socialPicker.event.minStudents}–{socialPicker.event.maxStudents}
              </span>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:4,marginBottom:14,maxHeight:290,overflowY:"auto"}}>
              {students.map(s=>{
                const tier=getTier(s.relationship);
                const isSel=socialPicker.selected.includes(s.id);
                const atMax=!isSel&&socialPicker.selected.length>=socialPicker.event.maxStudents;
                return(
                  <div key={s.id}
                    style={{...C.card,padding:"7px 10px",cursor:atMax?"not-allowed":"pointer",opacity:atMax?0.4:1,
                      background:isSel?"rgba(80,20,140,0.35)":"rgba(255,255,255,0.03)",
                      border:isSel?"1px solid #8040c8":"1px solid #180830"}}
                    onClick={()=>!atMax&&setSocialPicker(prev=>({
                      ...prev,
                      selected:isSel?prev.selected.filter(id=>id!==s.id):[...prev.selected,s.id]
                    }))}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span style={{fontSize:13}}>{isSel?"☑":"☐"}</span>
                      <span style={{fontWeight:700,fontSize:12,color:"#d8a8ff"}}>{s.name}</span>
                      <span style={{fontSize:10,color:tier.color}}>{tier.emoji} {tier.label}</span>
                      <span style={{fontSize:10,color:"#6a4880",marginLeft:"auto"}}>{getStage(s.lbs).label} · {s.lbs} lbs</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{display:"flex",gap:8}}>
              <button style={C.btn("#444")} onClick={()=>setSocialPicker(null)}>Cancel</button>
              <button
                style={{...C.btn("#5020a0"),flex:1,opacity:socialPicker.selected.length>=socialPicker.event.minStudents?1:0.5}}
                onClick={confirmSocialEvent}>
                {socialPicker.selected.length>=socialPicker.event.minStudents
                  ?`Host — ${socialPicker.event.apCost} AP →`
                  :`Need ${socialPicker.event.minStudents-socialPicker.selected.length} more`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── SOCIAL EVENT RESULT ── */}
      {socialResult&&(
        <div style={C.overlay}>
          <div style={C.modal}>
            <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:6}}>EVENT COMPLETE</div>
            <h2 style={{margin:"0 0 10px",color:"#c898ff",fontSize:18}}>{socialResult.event.label}</h2>
            <div style={{...C.infoBox("rgba(60,20,100,0.2)"),lineHeight:1.85,fontSize:13,color:"#e0d0b0",fontStyle:"italic",marginBottom:14}}>
              {socialResult.scene}
            </div>
            <div style={{fontSize:12,color:"#a080c0",marginBottom:16}}>
              {socialResult.attendees} students · +{socialResult.totalGain} lbs total gained
            </div>
            <button style={C.btn("#5020a0")} onClick={()=>setSocialResult(null)}>Continue →</button>
          </div>
        </div>
      )}

      {/* ── PRIVATE SESSION MODAL ── */}
      {privateSession&&(()=>{
        const ps=privateSession;
        const s=ps.student;
        const effectiveMax=ps.maxFullness+ps.toleranceBuffer;
        const fPct=ps.fullness>0?Math.round((ps.fullness/effectiveMax)*100):0;
        const fsStage=getFullnessStage(fPct);
        const descFns=SESSION_FULLNESS_DESCS[s.archetype]||SESSION_FULLNESS_DESCS.default;
        const currentDesc=ps.fullness>0?descFns[Math.min(fsStage.id,descFns.length-1)](s):null;
        const courseOrder=["opener","main","more","dessert","extra"];
        const tier=getTier(s.relationship);
        const availableVenueList=PRIVATE_VENUES.filter(v=>tier.id>=v.minTier);
        return(
          <div style={C.overlay}>
            <div style={{...C.modal,maxWidth:640,padding:20}}>

              {/* Header */}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                <div>
                  <div style={{fontSize:9,letterSpacing:3,color:"#9050c8",marginBottom:3}}>PRIVATE SESSION #{ps.sessionNum}</div>
                  <div style={{fontSize:16,fontWeight:700,color:"#d8a8ff"}}>{s.name}</div>
                  <div style={{fontSize:10,color:"#6a4880"}}>{s.lbs} lbs · {getStage(s.lbs).label} · {tier.emoji} {tier.label}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:10,color:"#806090",marginBottom:2}}>+{ps.totalGain} lbs this session</div>
                  <div style={{fontSize:10,color:"#504060"}}>Capacity: {effectiveMax} ({ps.toleranceBuffer>0?`+${ps.toleranceBuffer} buffer`:"base"})</div>
                </div>
              </div>

              {/* Venue selection */}
              {ps.phase==="venue"&&(
                <div>
                  <div style={{fontSize:12,color:"#7060a0",marginBottom:10,fontStyle:"italic"}}>
                    Where are you taking {s.name} tonight?
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:14}}>
                    {availableVenueList.map(v=>(
                      <div key={v.id} style={{...C.card,cursor:"pointer"}} onClick={()=>chooseSessionVenue(v)}>
                        <div style={{fontWeight:700,fontSize:13,color:"#d8a8ff",marginBottom:2}}>{v.label}</div>
                        <div style={{fontSize:11,color:"#6a4870"}}>{v.desc}</div>
                      </div>
                    ))}
                  </div>
                  <button style={C.btn("#444")} onClick={()=>setPrivateSession(null)}>Cancel</button>
                </div>
              )}

              {/* Feeding phase */}
              {ps.phase==="feeding"&&(
                <div>
                  {/* Fullness bar */}
                  <div style={{marginBottom:12}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                      <span style={{fontSize:11,fontWeight:700,color:fsStage.color}}>{fsStage.label}</span>
                      <span style={{fontSize:11,color:fPct>=100?"#e04040":"#a080c0"}}>{fPct}% full</span>
                    </div>
                    <div style={{position:"relative",height:10,background:"rgba(255,255,255,0.07)",borderRadius:5,overflow:"hidden"}}>
                      <div style={{
                        position:"absolute",left:0,top:0,height:"100%",borderRadius:5,
                        background:`linear-gradient(90deg,#30a060,${fsStage.color})`,
                        width:`${Math.min(100,fPct)}%`,transition:"width 0.5s ease"
                      }}/>
                      {fPct>100&&(
                        <div style={{position:"absolute",left:`${Math.min(100,fPct-100)/2}%`,top:0,height:"100%",width:`${Math.min(50,fPct-100)/2}%`,background:"rgba(200,20,20,0.5)"}}/>
                      )}
                    </div>
                    {currentDesc&&(
                      <div style={{fontSize:12,color:"#c0a8d0",fontStyle:"italic",marginTop:6,lineHeight:1.65}}>
                        {currentDesc}
                      </div>
                    )}
                  </div>

                  {/* Food menu */}
                  <div style={{...C.secT,marginBottom:6}}>Food</div>
                  <div style={{maxHeight:220,overflowY:"auto",display:"flex",flexDirection:"column",gap:3,marginBottom:10}}>
                    {courseOrder.map(course=>{
                      const items=PRIVATE_FOODS.filter(f=>f.course===course);
                      const courseLabel={opener:"Starters",main:"Main Course",more:"Second Helpings",dessert:"Dessert",extra:"More"}[course];
                      return(
                        <div key={course}>
                          <div style={{fontSize:9,color:"#4a2060",letterSpacing:2,padding:"4px 0 2px",borderTop:"1px solid rgba(80,18,140,0.15)"}}>{courseLabel.toUpperCase()}</div>
                          <div style={{display:"flex",flexDirection:"column",gap:2}}>
                            {items.map(food=>{
                              const ordered=ps.foods.includes(food.id);
                              return(
                                <div key={food.id}
                                  style={{display:"flex",alignItems:"center",gap:8,padding:"4px 6px",borderRadius:5,
                                    background:ordered?"rgba(80,18,140,0.08)":"transparent",
                                    cursor:ordered?"default":"pointer",opacity:ordered?0.45:1}}
                                  onClick={()=>!ordered&&feedInSession(food)}>
                                  <span style={{flex:1,fontSize:12,color:ordered?"#5a3888":"#c8a8f0"}}>{ordered?"✓ ":""}{food.label}</span>
                                  <span style={{fontSize:10,color:"#8060a0"}}>+{food.gain[0]}–{food.gain[1]} lbs</span>
                                  {!ordered&&<div style={{fontSize:9,color:"#6a4880",maxWidth:140,textAlign:"right"}}>{food.desc.slice(0,45)}…</div>}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Grandma Mae's Recipes — farm_girl only */}
                  {s.archetype==='farm_girl'&&(s.mjRecipes||[]).length>0&&(
                    <div style={{marginBottom:10}}>
                      <div style={{...C.secT,marginBottom:6}}>🏡 Grandma Mae's Recipes</div>
                      <div style={{display:"flex",flexDirection:"column",gap:2}}>
                        {(s.mjRecipes||[]).map(recipeId=>{
                          const r=MJ_RECIPES[recipeId];
                          if(!r) return null;
                          const fobj={id:'mj_'+recipeId, label:r.emoji+' '+r.name, gain:[r.lbs-2,r.lbs+2], fullness:r.fullness, desc:"Grandma Mae's recipe. Rich, homemade, the real thing."};
                          const ordered=ps.foods.includes(fobj.id);
                          return(
                            <div key={recipeId}
                              style={{display:"flex",alignItems:"center",gap:8,padding:"4px 6px",borderRadius:5,
                                background:ordered?"rgba(140,60,18,0.08)":"transparent",
                                cursor:ordered?"default":"pointer",opacity:ordered?0.45:1}}
                              onClick={()=>!ordered&&feedInSession(fobj)}>
                              <span style={{flex:1,fontSize:12,color:ordered?"#8a5a30":"#d4a070"}}>{ordered?"✓ ":""}{fobj.label}</span>
                              <span style={{fontSize:10,color:"#9a7040"}}>+{r.lbs-2}–{r.lbs+2} lbs</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Session log */}
                  <div style={{background:"rgba(20,5,35,0.8)",border:"1px solid #2a0848",borderRadius:8,padding:10,marginBottom:10,maxHeight:150,overflowY:"auto",display:"flex",flexDirection:"column",gap:3}}>
                    {sessionLog.length===0
                      ?<div style={{fontSize:12,color:"#5a3070",fontStyle:"italic"}}>{s.name} settles in. The evening begins.</div>
                      :sessionLog.map((line,i)=>(
                        <div key={i} style={{fontSize:12,lineHeight:1.6,color:line.startsWith("💬")?"#e8d0a8":line.startsWith("🍽️")?"#d0a860":line.startsWith("   ")?"#c0a8d0":"#b090c8",borderBottom:i<sessionLog.length-1?"1px solid rgba(80,20,120,0.1)":"none",paddingBottom:i<sessionLog.length-1?3:0}}>
                          {line}
                        </div>
                      ))
                    }
                  </div>

                  {/* Encouragement */}
                  <div style={{...C.secT,marginBottom:6}}>Encouragement</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:10}}>
                    {ENCOURAGEMENT_ACTIONS.map(enc=>{
                      const used=ps.encouragementsUsed.includes(enc.id);
                      return(
                        <button key={enc.id}
                          style={{...C.smBtn,opacity:used?0.35:1,textDecoration:used?"line-through":"none",
                            background:used?"rgba(40,10,60,0.2)":"rgba(80,18,140,0.35)"}}
                          onClick={()=>!used&&useSessionEncouragement(enc)}>
                          {enc.label}
                        </button>
                      );
                    })}
                  </div>


                  {/* Normal footer — always accessible */}
                  <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                    <div style={{fontSize:11,color:fPct>=100?"#f07050":"#f0a060",fontWeight:700,flex:1}}>
                      {fPct>=200?"Well past limits 🔴"
                      :fPct>=155?"Absolutely packed 🔴"
                      :fPct>=120?"Overfull 🔴"
                      :fPct>=95?"Stuffed 🟠"
                      :fPct>=70?"Full 🟡"
                      :fPct>=40?"Getting warm 🟢"
                      :"Still hungry 🟢"}
                      {fPct>=150&&<span style={{fontSize:9,color:"#ff7050",marginLeft:6}}>
                        {fPct>=250?"WILL tap out":"tap-out risk"}
                        {skillTapOutResistance>0?` (−${Math.round(skillTapOutResistance*100)}% from skills)`:""}
                      </span>}
                    </div>
                    {ps.foods.length>0&&(ps.refillRound||0)<3&&(
                      <button style={{...C.btn("#304060"),fontSize:10}} onClick={getMoreFood}>🛒 Get More</button>
                    )}
                    {fPct>=80&&getTier(s.relationship).id>=2&&(
                      <button style={{...C.btn("#601080"),fontSize:10}} onClick={()=>{setPrivateSession(null);startIntimacyScene(s,"session_high_fullness");}}>💜 Get Close</button>
                    )}
                    <button style={C.btn("#2a6830")} onClick={endPrivateSession}>End Session ✓</button>
                    <button style={C.btn("#333")} onClick={()=>{setAp(a=>a-2);setPrivateSession(null);}}>Leave Early</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* ── EP5: INTIMACY SCENE SELECTOR ── */}
      {intimacySceneSelector&&(()=>{
        const s=intimacySceneSelector.student;
        const tier=getTier(s.relationship);
        const availScenes=INTIMACY_SCENES.filter(sc=>tier.id>=sc.minTier);
        return(
          <div style={C.overlay}>
            <div style={{...C.modal,maxWidth:600,background:"linear-gradient(160deg,#0a0318,#160528,#0a0318)",border:"1px solid #8030c050",maxHeight:"85vh",overflowY:"auto"}}>
              <div style={{fontSize:9,letterSpacing:4,color:"#c050a0",marginBottom:4}}>INTIMACY</div>
              <div style={{fontSize:15,fontWeight:700,color:"#e8a8d0",marginBottom:4}}>{s.name}</div>
              <div style={{fontSize:11,color:"#7050a0",marginBottom:16,fontStyle:"italic"}}>
                {getStage(s.lbs).label} · {s.lbs} lbs · {tier.emoji} {tier.label}
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
                {availScenes.map(sc=>(
                  <button key={sc.id}
                    style={{...C.btn("#3a0860"),textAlign:"left",padding:"10px 14px",opacity:ap<sc.apCost?0.4:1,border:"1px solid #7030a030"}}
                    onClick={()=>startIntimacyScene(s,sc.id)}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                      <span style={{fontWeight:700,fontSize:13,color:"#e8a8d0"}}>{sc.icon} {sc.label}</span>
                      <span style={{fontSize:10,color:"#c050a0"}}>{sc.apCost} AP{tier.id>=3?<span style={{color:"#ff80c0",marginLeft:6}}>✦ Devoted</span>:""}</span>
                    </div>
                    <div style={{fontSize:11,color:"#8050a0",lineHeight:1.5}}>{sc.desc}</div>
                  </button>
                ))}
              </div>
              <button style={C.btn("#333")} onClick={()=>setIntimacySceneSelector(null)}>Not now</button>
            </div>
          </div>
        );
      })()}

      {/* ── EP5: ACTIVE INTIMACY SCENE ── */}
      {intimacyEventState&&(()=>{
        const {studentId,sceneId,tier,phaseIdx,history,logLines,done,endingText,gainAccum}=intimacyEventState;
        const s=students.find(st=>st.id===studentId);
        const def=INTIMACY_SCENES.find(sc=>sc.id===sceneId)||INTIMACY_CONTEXTUAL[sceneId];
        if(!s||!def) return null;
        const phase=!done?def.phases[phaseIdx]:null;
        const phaseText=phase?(typeof phase.text==="function"?phase.text(history,s,tier):phase.text):null;
        const accentColor="#c050a0";
        return(
          <div style={C.overlay}>
            <div style={{...C.modal,maxWidth:580,background:"linear-gradient(160deg,#0a0318,#160424,#0a0318)",border:`1px solid ${accentColor}40`,maxHeight:"85vh",overflowY:"auto"}}>
              <div style={{fontSize:9,letterSpacing:4,color:accentColor,marginBottom:4}}>{(def.label||sceneId).toUpperCase()}</div>
              <div style={{fontSize:15,fontWeight:700,color:"#e8a8d0",marginBottom:4}}>{s.name}</div>
              <div style={{fontSize:10,color:"#7050a0",marginBottom:12}}>{s.lbs} lbs · {getStage(s.lbs).label}{gainAccum>0?` · +${gainAccum} lbs this scene`:""}
              </div>
              {logLines.length>0&&(
                <div style={{marginBottom:12}}>
                  {logLines.map((line,i)=>(
                    <div key={i} style={{fontSize:11,color:"#6040a0",lineHeight:1.75,marginBottom:6,fontStyle:"italic",paddingLeft:10,borderLeft:`2px solid ${accentColor}25`}}>{line}</div>
                  ))}
                </div>
              )}
              <div style={{fontSize:12,color:"#d0a8c0",lineHeight:1.9,marginBottom:14,fontStyle:"italic"}}>{done?endingText:phaseText}</div>
              {!done&&phase&&(
                <div style={{display:"flex",flexDirection:"column",gap:7}}>
                  {phase.choices.map(ch=>{
                    const locked=ch.requires&&!history.includes(ch.requires);
                    const excluded=ch.requiresNot&&history.includes(ch.requiresNot);
                    if(excluded) return null;
                    return(
                      <button key={ch.id}
                        style={{...C.btn(locked?"#1a1a2a":"#5010a0"),opacity:locked?0.3:1,textAlign:"left",padding:"9px 14px",fontSize:12,lineHeight:1.5,border:`1px solid ${accentColor}30`}}
                        disabled={!!locked}
                        onClick={()=>makeIntimacyChoice(ch.id)}>
                        <span style={{fontWeight:700,color:"#e8a8d0"}}>{ch.label}</span>
                        {ch.lbs&&<span style={{color:"#ffdd80",marginLeft:8,fontSize:10}}>+{ch.lbs} lbs</span>}
                        {ch.feed&&<span style={{color:"#ff80c0",marginLeft:4,fontSize:10}}>+lbs</span>}
                        {ch.rel&&<span style={{color:"#80ddff",marginLeft:4,fontSize:10}}>+{ch.rel} rel</span>}
                      </button>
                    );
                  })}
                </div>
              )}
              {done&&<button style={{...C.btn(accentColor),width:"100%",marginTop:4}} onClick={closeIntimacyEvent}>Continue ✓</button>}
            </div>
          </div>
        );
      })()}

      {/* ── DEBUG PANEL ── */}
      {debugOpen&&(
        <div style={{...C.overlay,alignItems:"flex-start",paddingTop:16,overflowY:"auto"}}>
          <div style={{...C.modal,maxWidth:700,width:"95%",maxHeight:"90vh",overflowY:"auto"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={{fontSize:11,letterSpacing:3,color:"#60b060"}}>🐛 DEBUG PANEL</div>
              <button style={C.btn("#333")} onClick={()=>setDebugOpen(false)}>✕ Close</button>
            </div>
            {/* Global controls */}
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14,padding:10,background:"rgba(255,255,255,0.04)",borderRadius:8}}>
              <div style={{fontSize:10,color:"#888",width:"100%",marginBottom:4}}>GLOBAL</div>
              <label style={{fontSize:11,color:"#aaa",display:"flex",gap:6,alignItems:"center"}}>
                AP:
                <input type="number" defaultValue={ap} min={0} max={999} step={5}
                  style={{width:60,background:"#181820",color:"#e0e0e0",border:"1px solid #444",borderRadius:4,padding:"2px 4px",fontSize:11}}
                  onChange={e=>setAp(parseInt(e.target.value)||0)}/>
              </label>
              <label style={{fontSize:11,color:"#aaa",display:"flex",gap:6,alignItems:"center"}}>
                Scrutiny:
                <input type="number" defaultValue={adminScrutiny} min={0} max={100} step={5}
                  style={{width:55,background:"#181820",color:"#e0e0e0",border:"1px solid #444",borderRadius:4,padding:"2px 4px",fontSize:11}}
                  onChange={e=>setAdminScrutiny(parseInt(e.target.value)||0)}/>
              </label>
              <button style={{...C.smBtn,background:"rgba(60,100,60,0.4)"}}
                onClick={()=>setStudents(prev=>prev.map(s=>({...s,relationship:100})))}>Max All Rel</button>
              <button style={{...C.smBtn,background:"rgba(100,60,20,0.4)"}}
                onClick={()=>{if(!religion)setReligion({founded:true,devotees:10,ritesHeld:0,worshippedIds:[],weeklyPassiveGain:0});else setReligion(r=>({...r,devotees:r.devotees+10}));}}>+10 Devotees</button>
              <button style={{...C.smBtn,background:"rgba(20,20,80,0.4)"}}
                onClick={()=>setGoddessSeen(true)}>Unlock Divine</button>
              <button style={{...C.smBtn,background:"rgba(100,20,100,0.4)"}}
                onClick={debugForceIncarnation}>Force Incarnation</button>
            </div>
            {/* Per-student rows */}
            <div style={{fontSize:10,color:"#888",marginBottom:6}}>STUDENTS</div>
            {students.filter(s=>!(consumedStudents||[]).find(c=>c.id===s.id)).map(s=>{
              const inp=debugInputs[s.id]||{lbs:String(Math.round(s.lbs)),path:s.ascensionPath||"",stage:s.ascensionStage||0,rel:s.relationship};
              const set=(k,v)=>setDebugInputs(prev=>({...prev,[s.id]:{...inp,[k]:v}}));
              return(
                <div key={s.id} style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",padding:"7px 8px",borderRadius:6,marginBottom:4,background:"rgba(255,255,255,0.03)"}}>
                  <div style={{fontSize:11,color:"#c0a0e0",minWidth:90,fontWeight:700}}>{s.name}</div>
                  <label style={{fontSize:10,color:"#888",display:"flex",gap:4,alignItems:"center"}}>
                    lbs:
                    <input type="number" value={inp.lbs} min={80} step={100}
                      style={{width:70,background:"#181820",color:"#e0e0e0",border:"1px solid #444",borderRadius:4,padding:"2px 4px",fontSize:10}}
                      onChange={e=>set("lbs",e.target.value)}/>
                  </label>
                  <label style={{fontSize:10,color:"#888",display:"flex",gap:4,alignItems:"center"}}>
                    rel:
                    <input type="number" value={inp.rel} min={0} max={100} step={10}
                      style={{width:48,background:"#181820",color:"#e0e0e0",border:"1px solid #444",borderRadius:4,padding:"2px 4px",fontSize:10}}
                      onChange={e=>set("rel",e.target.value)}/>
                  </label>
                  <label style={{fontSize:10,color:"#888",display:"flex",gap:4,alignItems:"center"}}>
                    path:
                    <select value={inp.path} style={{background:"#181820",color:"#e0e0e0",border:"1px solid #444",borderRadius:4,padding:"2px 4px",fontSize:10}}
                      onChange={e=>set("path",e.target.value)}>
                      <option value="">— none —</option>
                      <option value="celestial">✨ Celestial</option>
                      <option value="umbral">🌑 Umbral</option>
                      <option value="sanguine">🩸 Sanguine</option>
                      <option value="verdant">🌿 Verdant</option>
                      <option value="convergence">⚡ Singularity</option>
                      <option value="primordial">🌑🌿 Primordial</option>
                    </select>
                  </label>
                  {inp.path&&inp.path!=="convergence"&&inp.path!=="primordial"&&(
                    <label style={{fontSize:10,color:"#888",display:"flex",gap:4,alignItems:"center"}}>
                      stage:
                      <select value={inp.stage} style={{background:"#181820",color:"#e0e0e0",border:"1px solid #444",borderRadius:4,padding:"2px 4px",fontSize:10}}
                        onChange={e=>set("stage",parseInt(e.target.value))}>
                        {[0,1,2,3,4].map(i=><option key={i} value={i}>{i}</option>)}
                      </select>
                    </label>
                  )}
                  <div style={{display:"flex",gap:4}}>
                    <button style={{...C.smBtn,background:"rgba(40,80,40,0.5)",fontSize:10}} onClick={()=>debugApply(s.id)}>Apply ✓</button>
                    <button style={{...C.smBtn,fontSize:10,background:"rgba(60,20,80,0.4)"}}
                      onClick={()=>{set("lbs","820");set("rel","100");}}>→ Blob</button>
                    <button style={{...C.smBtn,fontSize:10,background:"rgba(80,40,100,0.4)"}}
                      onClick={()=>{set("lbs","2300");set("rel","100");set("path",inp.path||"celestial");set("stage",4);}}>→ Apex</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── TAP-OUT POPUP ── */}
      {tapOutPopup&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:520}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#c06060",marginBottom:6}}>⛔ SHE TAPS OUT</div>
            <div style={{fontSize:11,color:"#a06050",marginBottom:10}}>
              {tapOutPopup.student.name} · +{tapOutPopup.totalGain} lbs this session
            </div>
            <p style={{lineHeight:1.9,color:"#e0d0c0",fontStyle:"italic",marginBottom:20,fontSize:13}}>
              {tapOutPopup.text}
            </p>
            <div style={{fontSize:11,color:"#705040",marginBottom:16}}>She ate enough for a family of five. The session is over.</div>
            <button style={C.btn("#5a1515")} onClick={()=>setTapOutPopup(null)}>Close</button>
          </div>
        </div>
      )}

      {/* ── SESSION RESULT ── */}
      {sessionResult&&(
        <div style={C.overlay}>
          <div style={C.modal}>
            <div style={{fontSize:9,letterSpacing:3,color:"#9050c8",marginBottom:6}}>SESSION COMPLETE — #{sessionResult.sessionCount}</div>
            <div style={{fontSize:12,color:"#7a50a0",marginBottom:12}}>
              {sessionResult.student.name} · {sessionResult.student.lbs} lbs · {getFullnessStage(sessionResult.fullnessPct).label} ({sessionResult.fullnessPct}%)
            </div>
            <div style={{...C.infoBox("rgba(60,10,100,0.25)"),lineHeight:1.9,fontSize:13,color:"#e0d0b0",fontStyle:"italic",marginBottom:16}}>
              {sessionResult.scene}
            </div>
            <div style={{...C.infoBox("rgba(40,5,70,0.3)"),fontSize:11,color:"#9060c0",marginBottom:14}}>
              +{sessionResult.totalGain} lbs this session · Appetite capacity expanded by +8 (total bonus: +{sessionResult.capacityBonus})
              <div style={{fontSize:10,color:"#604080",marginTop:3}}>
                She can now comfortably eat {sessionResult.capacityBonus}% more than when you first started feeding her privately.
              </div>
            </div>
            <button style={C.btn("#5818a8")} onClick={()=>setSessionResult(null)}>Continue →</button>
          </div>
        </div>
      )}

      {/* ── GODDESS VISION MODAL ── */}
      {goddessModal&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:560,background:"linear-gradient(160deg,#0a0520,#12082a,#0a0520)",border:"2px solid #8040ff80"}}>
            <div style={{fontSize:9,letterSpacing:4,color:"#a060ff",marginBottom:8}}>✦ VISION</div>
            <h2 style={{margin:"0 0 16px",color:"#d4aaff",fontSize:19,fontWeight:400,letterSpacing:1}}>{GODDESS_VISION.title}</h2>
            <div style={{...C.infoBox("rgba(60,10,120,0.25)"),lineHeight:2,fontSize:13,color:"#e8d8ff",fontStyle:"italic",marginBottom:16,maxHeight:380,overflowY:"auto",whiteSpace:"pre-line"}}>
              {GODDESS_VISION.scene}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:7}}>
              {GODDESS_VISION.choices.map((ch,i)=>(
                <button key={i}
                  style={{...C.btn("#401080"),textAlign:"left",padding:"10px 14px",lineHeight:1.5}}
                  onClick={()=>{
                    push(`✦ ${ch.label} — ${ch.text}`);
                    push(`✦ The Divine skill tree is now unlocked. Visit Skills → Divine.`);
                    setGoddessModal(null);
                    setView("divine");
                  }}>
                  <div style={{fontSize:12,fontWeight:700,color:"#c8a8ff",marginBottom:2}}>{ch.label}</div>
                  <div style={{fontSize:11,color:"#907090",fontStyle:"italic"}}>{ch.text}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── CONVERGENCE MODAL ── */}
      {/* ── EP2: EVOLUTION OFFER MODAL ── */}
      {evolutionModal&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:540,background:"linear-gradient(160deg,#0c0520,#180840,#0c0520)",border:"2px solid #7030c060"}}>
            <div style={{fontSize:9,letterSpacing:4,color:"#9040e0",marginBottom:6}}>✦ A NEW DIRECTION</div>
            <div style={{fontSize:17,fontWeight:700,color:"#d0a0ff",marginBottom:10}}>{evolutionModal.student?.name}</div>
            <div style={{fontSize:12,color:"#b090d0",lineHeight:1.85,marginBottom:16,fontStyle:"italic"}}>{evolutionModal.intro}</div>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:12}}>
              {(evolutionModal.paths||[]).map(p=>(
                <button key={p.id} style={{...C.btn("#40108080"),textAlign:"left",padding:"12px 14px",border:"1px solid #6030a060"}}
                  onClick={()=>chooseEvolution(evolutionModal.student.id,p.id)}>
                  <div style={{fontSize:13,fontWeight:700,color:"#c080ff",marginBottom:4}}>{p.label}</div>
                  <div style={{fontSize:11,color:"#8060a0",lineHeight:1.5}}>{p.desc}</div>
                </button>
              ))}
            </div>
            <button style={C.btn("#201040")} onClick={()=>setEvolutionModal(null)}>Not yet</button>
          </div>
        </div>
      )}

      {/* ── EP2: INTERACTIVE EVOLVED EVENT MODAL ── */}
      {evolvedEventState&&(()=>{
        const{studentId,formId,stageIdx,phaseIdx,history,logLines,done,endingText,startsContest,startsMatch,startsStream,startsFairContest}=evolvedEventState;
        const s=students.find(st=>st.id===studentId);
        const evDef=EVOLVED_EVENTS[formId]?.[stageIdx];
        if(!s||!evDef) return null;
        const phase=!done?evDef.phases[phaseIdx]:null;
        const collabPartner=collabPartnerId?students.find(st=>st.id===collabPartnerId):null;
        const researchSubject=(formId==='psych_researcher'&&s?.researchSubjectId!=null)?students.find(st=>st.id===s.researchSubjectId):null;
        const phaseText=phase?(typeof phase.text==="function"?phase.text(history,s,collabPartner||researchSubject):phase.text):null;
        const evMeta=EVOLVED_FORM_META[formId];
        const accentColor=evMeta?.color||"#7030c0";
        return(
          <div style={C.overlay}>
            <div style={{...C.modal,maxWidth:580,background:"linear-gradient(160deg,#07030f,#120820,#07030f)",border:`1px solid ${accentColor}50`,maxHeight:"85vh",overflowY:"auto"}}>
              <div style={{fontSize:9,letterSpacing:4,color:accentColor,marginBottom:4}}>{evDef.title.toUpperCase()}</div>
              <div style={{fontSize:15,fontWeight:700,color:evMeta?.color||"#d8a8ff",marginBottom:12}}>{s.name}</div>
              {/* History of completed phases */}
              {logLines.length>0&&(
                <div style={{marginBottom:12}}>
                  {logLines.map((line,i)=>(
                    <div key={i} style={{fontSize:11,color:"#7060a0",lineHeight:1.75,marginBottom:6,fontStyle:"italic",paddingLeft:10,borderLeft:`2px solid ${accentColor}30`}}>{line}</div>
                  ))}
                </div>
              )}
              {/* Current phase or ending */}
              <div style={{fontSize:12,color:"#c0b0e0",lineHeight:1.9,marginBottom:14,fontStyle:"italic"}}>{done?endingText:phaseText}</div>
              {/* Choices or close button */}
              {!done&&phase&&(
                <div style={{display:"flex",flexDirection:"column",gap:7}}>
                  {phase.choices.map(ch=>{
                    const locked=ch.requires&&!history.includes(ch.requires);
                    const excluded=ch.requiresNot&&history.includes(ch.requiresNot);
                    if(excluded) return null;
                    return(
                      <button key={ch.id}
                        style={{...C.btn(locked?"#1a1a2a":accentColor),opacity:locked?0.35:1,textAlign:"left",padding:"9px 14px",fontSize:12,lineHeight:1.5}}
                        disabled={!!locked}
                        onClick={()=>makeEvolvedEventChoice(ch.id)}>
                        <span style={{fontWeight:700}}>{ch.label}</span>
                        {ch.lbs&&<span style={{color:"#ffdd80",marginLeft:8,fontSize:10}}>+{ch.lbs} lbs</span>}
                        {ch.rel&&<span style={{color:"#80ddff",marginLeft:4,fontSize:10}}>+{ch.rel} rel</span>}
                        {ch.feedOther&&<span style={{color:"#ff9060",marginLeft:4,fontSize:10}}>feeds squad</span>}
                      </button>
                    );
                  })}
                </div>
              )}
              {done&&!startsContest&&!startsMatch&&!startsStream&&!startsFairContest&&<button style={{...C.btn(accentColor),width:"100%",marginTop:4}} onClick={closeEvolvedEvent}>Continue ✓</button>}
              {done&&startsContest&&<button style={{...C.btn("#1a6030"),width:"100%",marginTop:4}} onClick={()=>startEatingContest(studentId,stageIdx,history)}>🍽️ Step to the Table</button>}
              {done&&startsMatch&&<button style={{...C.btn("#7a2018"),width:"100%",marginTop:4}} onClick={()=>startSumoMatch(studentId,stageIdx,history)}>🥋 Step Onto the Dohyo</button>}
              {done&&startsStream&&<button style={{...C.btn("#6a1878"),width:"100%",marginTop:4}} onClick={()=>{const partner=students.find(st=>st.id===collabPartnerId);if(!partner){push("⚠️ No collab partner selected.");return;}startCollabStream(studentId,collabPartnerId,stageIdx,history);}}>🎥 Go Live Together</button>}
              {done&&startsFairContest&&<button style={{...C.btn("#C8860A"),width:"100%",marginTop:4}} onClick={()=>{const s2=students.find(st=>st.id===studentId);if(s2)startFairContest(s2,stageIdx);}}>🥧 Step Up to the Table</button>}
            </div>
          </div>
        );
      })()}

      {/* ── EATING CONTEST MINI-GAME MODAL ── */}
      {eatingContestState&&(()=>{
        const{studentId,stageIdx,yourFoods,mayaFoods,yourFullness,mayaFullness,maxYourFullness,maxMayaFullness,yourGain,mayaGain,popupText,phase,pantsFactor,actions}=eatingContestState;
        const s=students.find(st=>st.id===studentId); if(!s) return null;
        const mayaLbs=CONTEST_MAYA_WEIGHTS[stageIdx]||330;
        const effectiveMax=maxYourFullness-pantsFactor;
        const yourPct=Math.min(100,Math.round((yourFullness/effectiveMax)*100));
        const mayaPct=Math.min(100,Math.round((mayaFullness/maxMayaFullness)*100));
        const won=yourGain>=mayaGain;
        const devourUnlocked=stageIdx>=3;
        const TITLE_LABELS=["Regional Open","Circuit Regular","Conference Championship","National Qualifier","National Championship Final","Grand Invitational"];
        const contestTitle=TITLE_LABELS[stageIdx]||"Competition";
        const selectedYourCount=(yourFoods||[]).filter(f=>f.selected&&!f.consumed).length;
        const selectedMayaCount=(mayaFoods||[]).filter(f=>f.selected&&!f.consumed).length;
        const selectedCount=selectedYourCount+selectedMayaCount;
        const payoffText=CONTEST_PAYOFF_TEXT[stageIdx]?.(yourGain)||`${Math.round(yourGain)} pounds added to your frame. You can feel it. You are heavier than when you walked in.`;
        const completions=s.contestCompletions||0;
        return(
          <div style={{...C.overlay,zIndex:1200}}>
            <div style={{...C.modal,maxWidth:620,background:"linear-gradient(160deg,#030e04,#061a08,#030e04)",border:"1px solid #20803050",maxHeight:"90vh",overflowY:"auto",padding:20}}>
              <div style={{fontSize:9,letterSpacing:4,color:"#30a050",marginBottom:4}}>{contestTitle.toUpperCase()} — COMPETITION</div>
              <div style={{fontSize:14,fontWeight:700,color:"#60dd80",marginBottom:4}}>{s.name}</div>
              {completions>0&&<div style={{fontSize:9,color:"#20804a",marginBottom:8,letterSpacing:1}}>VETERAN ×{completions+1} — capacity ×{(1+0.15*completions).toFixed(2)}</div>}

              {/* EATING PHASE */}
              {phase==='eating'&&(
                <>
                  {/* Fullness bars */}
                  <div style={{display:"flex",gap:12,marginBottom:12}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:9,color:"#50c060",letterSpacing:2,marginBottom:3}}>YOUR FULLNESS {yourFullness}/{effectiveMax}</div>
                      <div style={{height:8,background:"#0a1a0a",borderRadius:4,overflow:"hidden"}}>
                        <div style={{height:"100%",width:`${yourPct}%`,background:yourPct>85?"#e05020":yourPct>65?"#c0a020":"#30a050",transition:"width 0.3s"}}/>
                      </div>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:9,color:"#508060",letterSpacing:2,marginBottom:3}}>MAYA FULLNESS {mayaFullness}/{maxMayaFullness}</div>
                      <div style={{height:8,background:"#0a1a0a",borderRadius:4,overflow:"hidden"}}>
                        <div style={{height:"100%",width:`${mayaPct}%`,background:"#607060",transition:"width 0.3s"}}/>
                      </div>
                    </div>
                  </div>

                  {devourUnlocked&&<div style={{fontSize:9,color:"#a0d060",letterSpacing:1,marginBottom:6,textAlign:"center"}}>DEVOUR MODE — tap food on either side to select, then Devour all at once. Match ends when all food is gone.</div>}

                  {/* Food tables */}
                  <div style={{display:"flex",gap:10,marginBottom:12}}>
                    {/* Your table */}
                    <div style={{flex:1}}>
                      <div style={{fontSize:9,color:"#30a050",letterSpacing:2,marginBottom:6}}>YOUR TABLE</div>
                      <div style={{display:"flex",flexDirection:"column",gap:4}}>
                        {yourFoods.map((food,idx)=>{
                          const tooFull=stageIdx<3&&(yourFullness+(food.fullness||0)>effectiveMax);
                          const disabled=food.consumed||(stageIdx<3&&tooFull);
                          const isSelected=food.selected&&!food.consumed;
                          return(
                            <button key={food.key!==undefined?food.key:idx}
                              style={{...C.btn(food.consumed?"#0a1a0a":isSelected?"#1a4800":"#103520"),opacity:food.consumed?0.3:tooFull?0.5:1,textAlign:"left",padding:"5px 8px",fontSize:11,display:"flex",alignItems:"center",gap:6,cursor:food.consumed?"not-allowed":"pointer",border:isSelected?"1px solid #a0e040":"1px solid transparent"}}
                              disabled={disabled}
                              onClick={()=>devourUnlocked?toggleFoodSelection('your',food.key):eatContestFood(idx)}>
                              <span style={{fontSize:14}}>{food.emoji||"🍽️"}</span>
                              <span style={{color:food.consumed?"#304030":isSelected?"#c0ff40":"#80d090"}}>{food.name||food.id}</span>
                              {isSelected&&<span style={{fontSize:9,color:"#a0e040",marginLeft:"auto"}}>✓</span>}
                              {!food.consumed&&!isSelected&&<span style={{fontSize:9,color:"#40804a",marginLeft:"auto"}}>+{food.lbs}lb</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    {/* Maya's table */}
                    <div style={{flex:1}}>
                      <div style={{fontSize:9,color:"#508060",letterSpacing:2,marginBottom:6}}>MAYA'S TABLE ({mayaLbs} lbs)</div>
                      <div style={{display:"flex",flexDirection:"column",gap:4}}>
                        {mayaFoods.map((food,idx)=>{
                          const isSelected=food.selected&&!food.consumed;
                          return devourUnlocked?(
                            <button key={food.key!==undefined?food.key:100+idx}
                              style={{...C.btn(food.consumed?"#0a1a0a":isSelected?"#3a1800":"#0f1a0a"),opacity:food.consumed?0.3:1,textAlign:"left",padding:"5px 8px",fontSize:11,display:"flex",alignItems:"center",gap:6,cursor:food.consumed?"not-allowed":"pointer",border:isSelected?"1px solid #e07040":"1px solid transparent"}}
                              disabled={food.consumed}
                              onClick={()=>toggleFoodSelection('maya',food.key)}>
                              <span style={{fontSize:14}}>{food.emoji||"🍽️"}</span>
                              <span style={{color:food.consumed?"#304030":isSelected?"#ffa060":"#608070"}}>{food.name||food.id}</span>
                              {isSelected&&<span style={{fontSize:9,color:"#e07040",marginLeft:"auto"}}>✓</span>}
                              {!food.consumed&&!isSelected&&<span style={{fontSize:9,color:"#407050",marginLeft:"auto"}}>+{food.lbs}lb</span>}
                            </button>
                          ):(
                            <div key={food.key!==undefined?food.key:100+idx}
                              style={{padding:"5px 8px",fontSize:11,display:"flex",alignItems:"center",gap:6,opacity:food.consumed?0.3:1,background:"#050f06",borderRadius:4,border:"1px solid #0a1a0a"}}>
                              <span style={{fontSize:14}}>{food.emoji||"🍽️"}</span>
                              <span style={{color:food.consumed?"#304030":"#608070"}}>{food.name||food.id}</span>
                              {food.consumed&&<span style={{fontSize:9,color:"#305030",marginLeft:"auto"}}>eaten</span>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Lbs gained tracker */}
                  <div style={{fontSize:10,color:"#40a060",marginBottom:10,textAlign:"center"}}>
                    You: +{Math.round(yourGain)} lbs this contest · Maya: +{Math.round(mayaGain)} lbs
                  </div>

                  {/* Action buttons */}
                  <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:8}}>
                    <button style={{...C.btn(actions.unbuttoned?"#0a1a0a":"#1a4030"),fontSize:11,padding:"6px 10px",opacity:actions.unbuttoned?0.4:1}} disabled={actions.unbuttoned} onClick={()=>doContestAction('unbutton')}>
                      👖 Unbutton Pants{actions.unbuttoned?" ✓":""}
                    </button>
                    <button style={{...C.btn(actions.rubUses>=3?"#0a1a0a":"#1a3020"),fontSize:11,padding:"6px 10px",opacity:actions.rubUses>=3?0.4:1}} disabled={actions.rubUses>=3} onClick={()=>doContestAction('rub')}>
                      ✋ Rub Belly ({3-actions.rubUses} left)
                    </button>
                    <button style={{...C.btn(actions.taunted?"#0a1a0a":"#1a2a10"),fontSize:11,padding:"6px 10px",opacity:actions.taunted?0.4:1}} disabled={actions.taunted} onClick={()=>doContestAction('taunt')}>
                      😏 Taunt Maya{actions.taunted?" ✓":""}
                    </button>
                    {devourUnlocked&&(
                      <button style={{...C.btn(selectedCount>0?"#2a4800":"#1a2a08"),fontSize:12,padding:"6px 14px",fontWeight:700,color:selectedCount>0?"#c0ff40":"#507030",opacity:selectedCount>0?1:0.5,border:selectedCount>0?"1px solid #80c020":"none"}} disabled={selectedCount===0} onClick={doDevour}>
                        🍽️ DEVOUR{selectedCount>0?` (${selectedCount})`:""}
                      </button>
                    )}
                  </div>
                </>
              )}

              {/* WEIGH-IN 2 PHASE */}
              {phase==='weigh_in_2'&&(
                <>
                  <div style={{fontSize:12,color:"#80c090",lineHeight:1.9,marginBottom:16,fontStyle:"italic",whiteSpace:"pre-line"}}>
                    {CONTEST_WEIGH_IN_2_TEXT[stageIdx]?.(s,yourGain,mayaGain,mayaLbs)||''}
                  </div>
                  <button style={{...C.btn("#1a5030"),width:"100%"}} onClick={()=>setEatingContestState(prev=>({...prev,phase:'scoreboard'}))}>
                    📊 See the Results
                  </button>
                </>
              )}

              {/* SCOREBOARD PHASE */}
              {phase==='scoreboard'&&(
                <>
                  <div style={{background:"#0a1a0a",border:"1px solid #20602040",borderRadius:6,padding:14,marginBottom:12,fontFamily:"monospace"}}>
                    <div style={{fontSize:10,color:"#30a050",letterSpacing:3,marginBottom:8}}>FINAL RESULTS</div>
                    <div style={{fontSize:13,color:won?"#60dd80":"#80c090",marginBottom:4,display:"flex",justifyContent:"space-between"}}>
                      <span>You: +{Math.round(yourGain)} lbs</span>
                      {won&&<span style={{color:"#ffdd60"}}>🏆 WINNER</span>}
                    </div>
                    <div style={{fontSize:13,color:!won?"#60dd80":"#608070",display:"flex",justifyContent:"space-between"}}>
                      <span>Maya: +{Math.round(mayaGain)} lbs</span>
                      {!won&&<span style={{color:"#ffdd60"}}>🏆 WINNER</span>}
                    </div>
                    <div style={{marginTop:8,paddingTop:8,borderTop:"1px solid #20602040",fontSize:10,color:"#408050"}}>
                      Your final weight: {Math.round(s.lbs)} lbs · Maya: {Math.round(mayaLbs+mayaGain)} lbs
                    </div>
                  </div>
                  <div style={{fontSize:12,color:"#c0d8b0",lineHeight:1.9,marginBottom:16,fontStyle:"italic"}}>
                    {payoffText}
                  </div>
                  <button style={{...C.btn("#1a4020"),width:"100%"}} onClick={closeEatingContest}>
                    Close
                  </button>
                </>
              )}

              {/* POPUP OVERLAY */}
              {popupText&&(
                <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1300}}>
                  <div style={{background:"#05120a",border:"1px solid #30804050",borderRadius:10,padding:20,maxWidth:460,margin:16}}>
                    <div style={{fontSize:12,color:"#b0d8a0",lineHeight:1.9,fontStyle:"italic",marginBottom:14}}>{popupText}</div>
                    <button style={{...C.btn("#1a4030"),width:"100%"}} onClick={dismissContestPopup}>Continue</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* ── SUMO MATCH MINI-GAME MODAL ── */}
      {sumoMatchState&&(()=>{
        const{studentId,stageIdx,oppLbs,ringPos,yourBalance,oppBalance,yourBouts,oppBouts,gainAccum,telegraph,exchangeLine,phase,popupText,fillRingUsed}=sumoMatchState;
        const s=students.find(st=>st.id===studentId); if(!s) return null;
        const won=yourBouts>oppBouts;
        const markerPct=Math.max(0,Math.min(100,(ringPos+100)/2));
        const feed=SUMO_CORNER_FEED[stageIdx]||SUMO_CORNER_FEED[0];
        const isBlob=getStage(s.lbs).id>=10;
        const payoffText=SUMO_PAYOFF_TEXT[stageIdx]?.(gainAccum)||`${Math.round(gainAccum)} pounds added to your frame since you stepped onto the dohyo. You can feel it. More.`;
        return(
          <div style={{...C.overlay,zIndex:1200}}>
            <div style={{...C.modal,maxWidth:620,background:"linear-gradient(160deg,#140404,#1f0808,#140404)",border:"1px solid #80303050",maxHeight:"90vh",overflowY:"auto",padding:20}}>
              <div style={{fontSize:9,letterSpacing:4,color:"#d05040",marginBottom:4}}>THE DOHYO — vs {SUMO_RIVAL_NAME.toUpperCase()}</div>
              <div style={{fontSize:14,fontWeight:700,color:"#ff8060",marginBottom:12}}>{s.name}</div>

              {/* MATCH PHASE */}
              {phase==='match'&&(<>
                {/* Bout counter */}
                <div style={{display:"flex",justifyContent:"space-between",fontSize:10,marginBottom:10}}>
                  <span style={{color:"#ff9070"}}>You {Math.round(s.lbs)} lbs · Bouts: {yourBouts}</span>
                  <span style={{color:"#a07060"}}>Bouts: {oppBouts} · Dana {oppLbs} lbs</span>
                </div>
                {/* Ring position bar */}
                <div style={{fontSize:9,color:"#c06050",letterSpacing:2,marginBottom:3,textAlign:"center"}}>RING POSITION</div>
                <div style={{position:"relative",height:14,background:"linear-gradient(90deg,#5a1810,#2a1208,#102a10)",borderRadius:7,marginBottom:4,border:"1px solid #40201840"}}>
                  <div style={{position:"absolute",left:"50%",top:0,bottom:0,width:1,background:"#80604040"}}/>
                  <div style={{position:"absolute",left:`calc(${markerPct}% - 7px)`,top:-2,width:14,height:18,background:ringPos>=0?"#40c060":"#e05030",borderRadius:4,transition:"left 0.35s",boxShadow:"0 0 6px rgba(0,0,0,0.6)"}}/>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:8,color:"#705048",marginBottom:12}}>
                  <span>◄ your edge</span><span>her edge ►</span>
                </div>
                {/* Balance bars */}
                <div style={{display:"flex",gap:12,marginBottom:12}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:9,color:"#d07060",letterSpacing:1,marginBottom:3}}>YOUR BALANCE {yourBalance}</div>
                    <div style={{height:6,background:"#1a0a0a",borderRadius:3,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${yourBalance}%`,background:yourBalance<25?"#e03020":yourBalance<50?"#c0a020":"#40b050",transition:"width 0.3s"}}/>
                    </div>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:9,color:"#906058",letterSpacing:1,marginBottom:3}}>DANA'S BALANCE {oppBalance}</div>
                    <div style={{height:6,background:"#1a0a0a",borderRadius:3,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${oppBalance}%`,background:"#806058",transition:"width 0.3s"}}/>
                    </div>
                  </div>
                </div>
                {/* Exchange commentary */}
                <div style={{fontSize:12,color:"#e0b0a0",lineHeight:1.8,marginBottom:10,fontStyle:"italic"}}>{exchangeLine}</div>
                {/* Telegraph */}
                <div style={{...C.infoBox("rgba(90,20,10,0.3)"),fontSize:11,color:"#ffb090",marginBottom:12,border:"1px solid #80303040"}}>
                  ⚠️ {telegraph}
                </div>
                {/* Move buttons */}
                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  {SUMO_MOVES.filter(mv=>!mv.blobOnly).map(mv=>{
                    const lowBal=yourBalance<=0&&mv.id!=='brace';
                    return(
                      <button key={mv.id}
                        style={{...C.btn(lowBal?"#2a1410":"#5a1c14"),textAlign:"left",padding:"8px 12px",fontSize:12,lineHeight:1.4,opacity:lowBal?0.55:1}}
                        onClick={()=>sumoPlayMove(mv.id)}>
                        <span style={{fontSize:15,marginRight:6}}>{mv.emoji}</span>
                        <span style={{fontWeight:700,color:"#ffc0a0"}}>{mv.label}</span>
                        {lowBal&&<span style={{color:"#ff6040",marginLeft:8,fontSize:9}}>off balance — you'll stumble</span>}
                        <div style={{fontSize:10,color:"#b08070",marginTop:2,fontStyle:"italic"}}>{mv.desc}</div>
                      </button>
                    );
                  })}
                  {isBlob&&(()=>{const mv=SUMO_MOVES.find(m=>m.id==='fill_ring'); return mv?(
                    <button key="fill_ring"
                      style={{...C.btn(fillRingUsed?"#1a0808":"#6a2800"),textAlign:"left",padding:"8px 12px",fontSize:12,lineHeight:1.4,opacity:fillRingUsed?0.4:1,border:fillRingUsed?"none":"1px solid #e0801080"}}
                      disabled={fillRingUsed}
                      onClick={()=>sumoPlayMove('fill_ring')}>
                      <span style={{fontSize:15,marginRight:6}}>{mv.emoji}</span>
                      <span style={{fontWeight:700,color:fillRingUsed?"#806050":"#ffb060"}}>{mv.label}{fillRingUsed?" (used)":""}</span>
                      <div style={{fontSize:10,color:"#c09060",marginTop:2,fontStyle:"italic"}}>{mv.desc}</div>
                    </button>
                  ):null;})()}
                </div>
              </>)}

              {/* INTER-BOUT PHASE — corner feed */}
              {phase==='interbout'&&(<>
                <div style={{fontSize:11,color:"#c08070",marginBottom:8,textAlign:"center"}}>Bouts: You {yourBouts} — {oppBouts} Dana · first to 2 wins the match</div>
                <div style={{fontSize:12,color:"#e0b0a0",lineHeight:1.85,marginBottom:14,fontStyle:"italic"}}>
                  Your corner is set up between bouts. The chanko is hot and waiting. Every pound you add now is a pound Dana has to move in the next bout — and getting heavier is the whole strategy.
                </div>
                <button style={{...C.btn("#7a3010"),width:"100%",marginBottom:8}} onClick={sumoCornerFeed}>
                  🍲 Fuel in Your Corner <span style={{color:"#ffd080",fontSize:11}}>+{feed.lbs} lbs · restores balance</span>
                </button>
                <button style={{...C.btn("#3a1810"),width:"100%"}} onClick={sumoStartNextBout}>
                  Skip — straight back to center
                </button>
              </>)}

              {/* AFTERMATH PHASE */}
              {phase==='aftermath'&&(<>
                <div style={{fontSize:12,color:"#e0b8a8",lineHeight:1.9,marginBottom:16,fontStyle:"italic"}}>
                  {SUMO_MATCH_AFTERMATH[stageIdx]?.(s,gainAccum,won,oppLbs)||''}
                </div>
                <button style={{...C.btn("#7a2018"),width:"100%"}} onClick={()=>setSumoMatchState(prev=>({...prev,phase:'scoreboard'}))}>
                  📊 See the Result
                </button>
              </>)}

              {/* SCOREBOARD PHASE */}
              {phase==='scoreboard'&&(<>
                <div style={{background:"#1a0808",border:"1px solid #80303040",borderRadius:6,padding:14,marginBottom:12,fontFamily:"monospace"}}>
                  <div style={{fontSize:10,color:"#d05040",letterSpacing:3,marginBottom:8}}>MATCH RESULT</div>
                  <div style={{fontSize:14,color:won?"#ff9060":"#a07060",marginBottom:4,display:"flex",justifyContent:"space-between"}}>
                    <span>You — {yourBouts} bouts</span>
                    {won&&<span style={{color:"#ffdd60"}}>🏆 WINNER</span>}
                  </div>
                  <div style={{fontSize:14,color:!won?"#ff9060":"#806058",display:"flex",justifyContent:"space-between"}}>
                    <span>Dana — {oppBouts} bouts</span>
                    {!won&&<span style={{color:"#ffdd60"}}>🏆 WINNER</span>}
                  </div>
                  <div style={{marginTop:8,paddingTop:8,borderTop:"1px solid #80303040",fontSize:10,color:"#c07050"}}>
                    Gained in the corner today: +{Math.round(gainAccum)} lbs · Your weight: {Math.round(s.lbs)} lbs
                  </div>
                </div>
                <div style={{fontSize:12,color:"#e0c0b0",lineHeight:1.9,marginBottom:16,fontStyle:"italic"}}>{payoffText}</div>
                <button style={{...C.btn("#5a1c14"),width:"100%"}} onClick={closeSumoMatch}>Close</button>
              </>)}

              {/* POPUP OVERLAY */}
              {popupText&&(
                <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1300}}>
                  <div style={{background:"#160606",border:"1px solid #80303050",borderRadius:10,padding:20,maxWidth:460,margin:16}}>
                    <div style={{fontSize:12,color:"#e8b8a8",lineHeight:1.9,fontStyle:"italic",marginBottom:14}}>{popupText}</div>
                    <button style={{...C.btn("#5a1c14"),width:"100%"}} onClick={dismissSumoPopup}>Continue</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* ── FEEDEE CREATOR: COLLAB PARTNER PICKER ── */}
      {collabPartnerPicker&&(()=>{
        const{student:kylie,announcementText,announcementPending}=collabPartnerPicker;
        const purple="#8e44ad";
        const lightPurple="#c490e8";
        // Find eligible partners: Intimate tier (rel>=70) + content creator archetypes + not blob
        const eligible=students.filter(st=>
          st.id!==kylie.id&&
          (getTier(st.relationship).id>=2)&&
          COLLAB_CONTENT_CREATOR_ARCHETYPES.includes(st.archetype)&&
          getStage(st.lbs).id<10
        );
        if(announcementPending&&announcementText){
          return(
            <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1200}}>
              <div style={{background:"#0e0015",border:`1px solid ${purple}50`,borderRadius:12,padding:20,maxWidth:460,width:"95%"}}>
                <div style={{fontSize:10,letterSpacing:4,color:purple,marginBottom:8,textAlign:"center"}}>📢 STREAM ANNOUNCEMENT</div>
                <div style={{fontSize:12,color:"#d0a8e8",lineHeight:1.9,fontStyle:"italic",marginBottom:16}}>{announcementText}</div>
                <button style={{...C.btn(purple),width:"100%"}} onClick={()=>setCollabPartnerPicker({student:kylie})}>Continue to Stream →</button>
              </div>
            </div>
          );
        }
        return(
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1200}}>
            <div style={{background:"#0e0015",border:`1px solid ${purple}50`,borderRadius:12,padding:20,maxWidth:500,width:"95%",maxHeight:"85vh",overflowY:"auto"}}>
              <div style={{fontSize:10,letterSpacing:4,color:purple,marginBottom:4,textAlign:"center"}}>🎥 COLLAB STREAM</div>
              <div style={{fontSize:14,color:lightPurple,fontWeight:"bold",marginBottom:12,textAlign:"center"}}>Choose a Collab Partner</div>
              <div style={{fontSize:11,color:"#a080c0",marginBottom:14,textAlign:"center"}}>Intimate tier · content-creator archetype</div>
              {eligible.length===0&&<div style={{color:"#806090",textAlign:"center",padding:20}}>No eligible partners right now — need an Intimate-tier gamer, artsy, or quiet student.</div>}
              {eligible.map(st=>(
                <div key={st.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",marginBottom:6,borderRadius:8,background:"#0a0018",border:`1px solid ${purple}40`,cursor:"pointer"}}
                  onClick={()=>{setCollabPartnerId(st.id);setCollabPartnerPicker(null);const stageIdx=Math.max(0,Math.min(5,getStage(kylie.lbs).id-5));const evDef=EVOLVED_EVENTS['feedee_creator']?.[stageIdx];if(evDef){setEvolvedEventState({studentId:kylie.id,formId:'feedee_creator',stageIdx,phaseIdx:0,history:[],logLines:[],gainAccum:0,relAccum:0,done:false,endingText:null,gainBonus:0,relBonus:0,startsContest:false,startsMatch:false,startsStream:false,startsFairContest:false});}}}>
                  <div style={{flex:1}}>
                    <div style={{color:lightPurple,fontWeight:"bold",fontSize:13}}>{st.name}</div>
                    <div style={{color:"#907090",fontSize:10}}>{st.archetype} · {Math.round(st.lbs)} lbs · {getTier(st.relationship).label}</div>
                  </div>
                  <div style={{color:"#c0a0e0",fontSize:11}}>{getStage(st.lbs).label}</div>
                </div>
              ))}
              <button style={{...C.btn("#2a1040"),width:"100%",marginTop:8,fontSize:11}} onClick={()=>setCollabPartnerPicker(null)}>Cancel</button>
            </div>
          </div>
        );
      })()}

      {/* ── PSYCH RESEARCHER: SUBJECT PICKER ── */}
      {researchSubjectPicker&&(()=>{
        const{student:nadia}=researchSubjectPicker;
        const purple="#6b5b95";
        const eligible=students.filter(st=>st.id!==nadia.id&&getTier(st.relationship).id>=1);
        return(
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1200}}>
            <div style={{background:"#0a0010",border:`1px solid ${purple}50`,borderRadius:12,padding:20,maxWidth:500,width:"95%",maxHeight:"85vh",overflowY:"auto"}}>
              <div style={{fontSize:10,letterSpacing:4,color:purple,marginBottom:4,textAlign:"center"}}>📋 RESEARCH SUBJECT</div>
              <div style={{fontSize:14,color:"#c0a0e0",fontWeight:"bold",marginBottom:12,textAlign:"center"}}>Select a Subject</div>
              <div style={{fontSize:11,color:"#8070a0",marginBottom:14,textAlign:"center"}}>Close tier or above · any weight stage</div>
              {eligible.length===0&&<div style={{color:"#806090",textAlign:"center",padding:20}}>No eligible subjects — build a Close relationship first.</div>}
              {eligible.map(st=>(
                <div key={st.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",marginBottom:6,borderRadius:8,background:"#080016",border:`1px solid ${purple}40`,cursor:"pointer"}}
                  onClick={()=>{
                    setStudents(prev=>prev.map(x=>x.id===nadia.id?{...x,researchSubjectId:st.id}:x));
                    setResearchSubjectPicker(null);
                    const stageIdx=Math.max(0,Math.min(5,getStage(nadia.lbs).id-5));
                    const evDef=EVOLVED_EVENTS['psych_researcher']?.[stageIdx];
                    const meta=EVOLVED_ACTIVITY_META['psych_researcher'];
                    if(evDef){
                      setAp(a=>a-(meta?.apCost||1));
                      setEvolvedEventState({studentId:nadia.id,formId:'psych_researcher',stageIdx,phaseIdx:0,history:[],logLines:[],gainAccum:0,relAccum:0,done:false,endingText:null,gainBonus:0,relBonus:0});
                    }
                  }}>
                  <div style={{flex:1}}>
                    <div style={{color:"#c0a0e0",fontWeight:"bold",fontSize:13}}>{st.name}</div>
                    <div style={{color:"#806090",fontSize:10}}>{st.archetype} · {Math.round(st.lbs)} lbs · {getTier(st.relationship).label}</div>
                  </div>
                  <div style={{color:"#a090c0",fontSize:11}}>{getStage(st.lbs).label}</div>
                </div>
              ))}
              <button style={{...C.btn("#2a1040"),width:"100%",marginTop:8,fontSize:11}} onClick={()=>setResearchSubjectPicker(null)}>Cancel</button>
            </div>
          </div>
        );
      })()}

      {/* ── PSYCH RESEARCHER: SUBJECT JOURNAL ── */}
      {subjectJournalState&&(()=>{
        const{subjectId,currentPage}=subjectJournalState;
        const subj=students.find(st=>st.id===subjectId);
        if(!subj) return null;
        const maxPage=getStage(subj.lbs).id;
        const entries=FEEDER_SUBJECT_JOURNALS[subj.archetype]||[];
        const entry=entries[currentPage]||"No entry for this stage yet.";
        const STAGE_LABELS=["Slight","Slim","Soft","Chubby","Plump","Heavy","Fat","Very Fat","Enormous","Colossal","Blob"];
        const canPrev=currentPage>0;
        const canNext=currentPage<maxPage;
        const inkColor="#2a1a40";
        const pageColor="#f0eade";
        const borderColor="#8b7355";
        return(
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1300}}>
            <div style={{background:`linear-gradient(170deg,#1a0a2e,#0d0520)`,border:`2px solid ${borderColor}80`,borderRadius:4,padding:0,maxWidth:520,width:"95%",maxHeight:"88vh",display:"flex",flexDirection:"column",boxShadow:"0 8px 40px rgba(0,0,0,0.7)"}}>
              {/* Spine header */}
              <div style={{background:`linear-gradient(90deg,#120820,#1e0a38,#120820)`,borderBottom:`1px solid ${borderColor}60`,padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderRadius:"2px 2px 0 0"}}>
                <div style={{fontSize:9,letterSpacing:3,color:"#a08060"}}>📔 SUBJECT JOURNAL</div>
                <div style={{fontSize:11,color:"#c0a070",fontWeight:"bold"}}>{subj.name}</div>
                <button style={{...C.smBtn,fontSize:10,padding:"2px 8px",background:"transparent",border:"1px solid #40206040",color:"#806050"}} onClick={()=>setSubjectJournalState(null)}>✕</button>
              </div>
              {/* Page */}
              <div style={{flex:1,overflowY:"auto",padding:"20px 24px",background:pageColor,margin:12,borderRadius:2,boxShadow:"inset 0 1px 4px rgba(0,0,0,0.4)"}}>
                <div style={{fontSize:10,letterSpacing:2,color:"#6b5b40",marginBottom:6,textTransform:"uppercase"}}>Entry {currentPage+1} — {STAGE_LABELS[currentPage]}</div>
                <div style={{width:40,height:1,background:`${borderColor}80`,marginBottom:14}}/>
                <div style={{fontSize:13,color:inkColor,lineHeight:1.9,fontFamily:"Georgia,serif"}}>{entry}</div>
              </div>
              {/* Navigation */}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 16px",borderTop:`1px solid ${borderColor}40`}}>
                <button style={{...C.smBtn,opacity:canPrev?1:0.25,fontSize:11,minWidth:80}} onClick={()=>canPrev&&setSubjectJournalState(p=>({...p,currentPage:p.currentPage-1}))} disabled={!canPrev}>← Earlier</button>
                <div style={{fontSize:10,color:"#806050",letterSpacing:1}}>{currentPage+1} / {maxPage+1}</div>
                <button style={{...C.smBtn,opacity:canNext?1:0.25,fontSize:11,minWidth:80}} onClick={()=>canNext&&setSubjectJournalState(p=>({...p,currentPage:p.currentPage+1}))} disabled={!canNext}>Later →</button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── COLLAB STREAM MINI-GAME MODAL ── */}
      {collabStreamState&&(()=>{
        const{kylieId,partnerId,stageIdx,qualityBar,kylieGain,partnerGain,foodQueue,chatLines,phase,popupText,actions}=collabStreamState;
        const kylie=students.find(st=>st.id===kylieId);
        const partner=students.find(st=>st.id===partnerId);
        if(!kylie||!partner) return null;
        const purple="#8e44ad";
        const lightPurple="#c490e8";
        const STREAM_TITLE_LABELS=["First Collab","Weekly Collab","Featured Collab","Brand Collab","Anniversary Collab","The Grand Collab"];
        const streamTitle=STREAM_TITLE_LABELS[stageIdx]||"Collab Stream";
        const qualColor=qualityBar>60?"#60e080":qualityBar>30?"#e0c040":"#e04040";

        return(
          <div style={{position:"fixed",inset:0,background:"rgba(5,0,15,0.94)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1200}}>
            <div style={{background:"#0a0016",border:`1px solid ${purple}50`,borderRadius:12,padding:20,maxWidth:520,width:"95%",maxHeight:"92vh",overflowY:"auto"}}>
              <div style={{fontSize:10,letterSpacing:4,color:purple,marginBottom:2,textAlign:"center"}}>🎥 COLLAB STREAM</div>
              <div style={{fontSize:14,fontWeight:"bold",color:lightPurple,marginBottom:2,textAlign:"center"}}>{kylie.name} × {partner.name}</div>
              <div style={{fontSize:10,color:"#9060b0",marginBottom:12,textAlign:"center"}}>{streamTitle}</div>

              {phase==='streaming'&&(<>
                {/* Quality bar */}
                <div style={{marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#c0a0e0",marginBottom:3}}>
                    <span>📺 CONTENT QUALITY</span>
                    <span style={{color:qualColor,fontWeight:"bold"}}>{Math.round(qualityBar)}/100</span>
                  </div>
                  <div style={{background:"#15002a",borderRadius:4,height:12}}>
                    <div style={{background:`linear-gradient(90deg,${qualityBar>60?"#2a8040,#60e080":qualityBar>30?"#805020,#e0c040":"#802020,#e04040"})`,width:`${Math.max(0,qualityBar)}%`,height:"100%",borderRadius:4,transition:"width 0.3s"}}/>
                  </div>
                  {qualityBar<=25&&<div style={{fontSize:9,color:"#e04040",textAlign:"center",marginTop:2}}>⚠️ Low quality — feed them to keep the stream alive!</div>}
                </div>

                {/* Weights */}
                <div style={{display:"flex",gap:8,marginBottom:10}}>
                  <div style={{flex:1,background:"#0d001f",border:`1px solid ${purple}40`,borderRadius:6,padding:8,textAlign:"center"}}>
                    <div style={{fontSize:9,color:"#a080c0",letterSpacing:1}}>KYLIE</div>
                    <div style={{fontSize:14,color:lightPurple,fontWeight:"bold"}}>{Math.round(kylie.lbs)} lbs</div>
                    <div style={{fontSize:9,color:"#7050a0"}}>+{Math.round(kylieGain)} this stream</div>
                  </div>
                  <div style={{flex:1,background:"#0d001f",border:`1px solid ${purple}40`,borderRadius:6,padding:8,textAlign:"center"}}>
                    <div style={{fontSize:9,color:"#a080c0",letterSpacing:1}}>{partner.name.toUpperCase()}</div>
                    <div style={{fontSize:14,color:lightPurple,fontWeight:"bold"}}>{Math.round(partner.lbs)} lbs</div>
                    <div style={{fontSize:9,color:"#7050a0"}}>+{Math.round(partnerGain)} this stream</div>
                  </div>
                </div>

                {/* Food queue */}
                <div style={{marginBottom:10}}>
                  <div style={{fontSize:9,color:"#a070c0",marginBottom:5,letterSpacing:2}}>FOOD ON TABLE</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
                    {foodQueue.filter(f=>!f.consumed).map((food)=>{
                      const unlocked=food.tierUnlocked;
                      return(
                        <div key={food.key} style={{opacity:unlocked?1:0.35}}>
                          {unlocked?(
                            <div style={{display:"flex",gap:4,marginBottom:2}}>
                              <button style={{...C.btn("#3a0a60"),flex:1,fontSize:10,padding:"4px 6px"}} onClick={()=>doCollabAction('feed_kylie',food.key)}>
                                {food.emoji} → Kylie +{food.lbsKylie}
                              </button>
                              <button style={{...C.btn("#1a1a60"),flex:1,fontSize:10,padding:"4px 6px"}} onClick={()=>doCollabAction('feed_partner',food.key)}>
                                {food.emoji} → {partner.name.split(' ')[0]} +{food.lbsPartner}
                              </button>
                            </div>
                          ):(
                            <div style={{background:"#0a0018",border:"1px solid #30104050",borderRadius:4,padding:"4px 6px",fontSize:10,color:"#503060",textAlign:"center"}}>
                              🔒 {food.name} — unlocks after current tier
                            </div>
                          )}
                        </div>
                      );
                    })}
                    {foodQueue.every(f=>f.consumed)&&<div style={{gridColumn:"1/-1",color:"#60a060",textAlign:"center",fontSize:10,padding:8}}>✓ All food eaten — stream complete!</div>}
                  </div>
                </div>

                {/* Action buttons */}
                <div style={{marginBottom:10}}>
                  <div style={{fontSize:9,color:"#a070c0",marginBottom:5,letterSpacing:2}}>STREAM ACTIONS</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
                    <button style={{...C.btn(actions.kylieRevealed?"#1a0030":"#4a1070"),fontSize:10,opacity:actions.kylieRevealed?0.5:1}} disabled={actions.kylieRevealed} onClick={()=>doCollabAction('reveal_kylie')}>⚖️ Kylie's Weight {actions.kylieRevealed?"✓":""}</button>
                    <button style={{...C.btn(actions.partnerRevealed?"#1a0030":"#1a1060"),fontSize:10,opacity:actions.partnerRevealed?0.5:1}} disabled={actions.partnerRevealed} onClick={()=>doCollabAction('reveal_partner')}>⚖️ {partner.name.split(' ')[0]}'s Weight {actions.partnerRevealed?"✓":""}</button>
                    <button style={{...C.btn(actions.zoomUses<=0?"#1a0030":"#2a0850"),fontSize:10,opacity:actions.zoomUses<=0?0.5:1}} disabled={actions.zoomUses<=0} onClick={()=>doCollabAction('zoom_in')}>📸 Zoom In ({actions.zoomUses})</button>
                    <button style={{...C.btn(actions.chatUses<=0?"#1a0030":"#2a0850"),fontSize:10,opacity:actions.chatUses<=0?0.5:1}} disabled={actions.chatUses<=0} onClick={()=>doCollabAction('chat_moment')}>💬 Chat Moment ({actions.chatUses})</button>
                    <button style={{...C.btn(actions.pushUsed?"#1a0030":"#501060"),fontSize:10,opacity:actions.pushUsed?0.5:1,gridColumn:"1/-1"}} disabled={actions.pushUsed} onClick={()=>doCollabAction('push_harder')}>🔥 Push Harder {actions.pushUsed?"(done)":""}</button>
                  </div>
                </div>

                {/* Chat window */}
                {chatLines.length>0&&(
                  <div style={{background:"#080014",border:`1px solid ${purple}30`,borderRadius:6,padding:8,marginBottom:10,maxHeight:55,overflowY:"auto"}}>
                    {chatLines.map((l,i)=><div key={i} style={{fontSize:9,color:"#b090d0",marginBottom:1}}>💬 {l}</div>)}
                  </div>
                )}

                <button style={{...C.btn("#150025"),width:"100%",fontSize:10}} onClick={closeCollabStream}>End Stream Early</button>
              </>)}

              {phase==='scoreboard'&&(<>
                <div style={{background:"#08001a",border:`1px solid ${purple}40`,borderRadius:8,padding:12,marginBottom:14,fontSize:12}}>
                  <div style={{color:lightPurple,fontWeight:"bold",marginBottom:8,letterSpacing:2,fontSize:10}}>STREAM RESULTS</div>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                    <span style={{color:"#c0a0e0"}}>Content Quality</span>
                    <span style={{color:qualColor,fontWeight:"bold"}}>{Math.round(qualityBar)}/100</span>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                    <span style={{color:"#c0a0e0"}}>Kylie gained</span>
                    <span style={{color:"#e060c0",fontWeight:"bold"}}>+{Math.round(kylieGain)} lbs</span>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                    <span style={{color:"#c0a0e0"}}>{partner.name} gained</span>
                    <span style={{color:"#e060c0",fontWeight:"bold"}}>+{Math.round(partnerGain)} lbs</span>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                    <span style={{color:"#c0a0e0"}}>Tiers completed</span>
                    <span style={{color:"#60e080"}}>{foodQueue.filter(f=>f.consumed).length}/{foodQueue.length}</span>
                  </div>
                </div>
                <button style={{...C.btn(purple),width:"100%"}} onClick={closeCollabStream}>Close Stream ✓</button>
              </>)}

              {/* POPUP OVERLAY */}
              {popupText&&(
                <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1300}}>
                  <div style={{background:"#0c0018",border:`1px solid ${purple}50`,borderRadius:10,padding:20,maxWidth:460,margin:16}}>
                    <div style={{fontSize:12,color:"#d0a8e8",lineHeight:1.9,fontStyle:"italic",marginBottom:14,whiteSpace:"pre-line"}}>{popupText}</div>
                    <button style={{...C.btn(purple),width:"100%"}} onClick={dismissCollabPopup}>Continue</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* ── RECORDING SESSION MODAL ── */}
      {recordingSessionState&&(()=>{
        const rs=recordingSessionState;
        const kylie=students.find(st=>st.id===rs.studentId);
        if(!kylie) return null;
        const amber='#c08040';
        const amberDim='#80502a';
        const bg='linear-gradient(160deg,#100800,#1a1000,#100800)';
        const qualBadge={okay:'#808080',good:'#60a060',great:'#60a0e0',perfect:'#c0a020'};
        const choiceLabels={
          angle_low:'📷 Get low — floor angle, looking up',
          angle_wide:'📷 Go wide — full body, scale of her',
          angle_close:'📷 Close up — face and chest',
          food_heavy:'🍖 Heavy food — dense and filling',
          food_build:'🥗 Start light, build to heavier',
          food_hers:'💜 Let her choose what she wants',
          pace_push:'⚡ Push her — more, faster',
          pace_settle:'🌊 Let her set the pace',
          pace_surge:'🌀 Pause — let it land — then surge',
        };
        const stepLabels=['📷 Camera angle','🍽️ Food','⏱️ Pacing'];
        const angleChoices=['angle_low','angle_wide','angle_close'];
        const foodChoices=['food_heavy','food_build','food_hers'];
        const paceChoices=['pace_push','pace_settle','pace_surge'];
        const stepChoices=[angleChoices,foodChoices,paceChoices];
        const timeBar='█'.repeat(rs.timeLeft)+'░'.repeat(3-rs.timeLeft);
        return(
          <div style={C.overlay} key="recording-modal">
            <div style={{...C.modal,maxWidth:520,background:bg,border:`1px solid ${amber}50`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div style={{color:amber,fontWeight:"bold",letterSpacing:2,fontSize:11}}>🎬 FILM HER SESSION — {kylie.name.toUpperCase()}</div>
                <div style={{color:amberDim,fontSize:11}}>Time {timeBar} | Take {rs.takeNum}</div>
              </div>

              {/* OPEN PHASE */}
              {rs.phase==='open'&&(
                <>
                  <div style={{fontSize:12,color:"#d8c0a0",lineHeight:1.9,whiteSpace:"pre-line",marginBottom:16,fontStyle:"italic"}}>
                    {(()=>{const fn=RECORDING_OPENING_TEXT[rs.stageIdx];return typeof fn==='function'?fn(kylie.lbs):(fn||'');})()}
                  </div>
                  <button style={{...C.btn(amber),width:"100%"}} onClick={()=>setRecordingSessionState(p=>({...p,phase:'directing'}))}>
                    🎬 Pick up the camera
                  </button>
                </>
              )}

              {/* DIRECTING PHASE */}
              {rs.phase==='directing'&&(
                <>
                  <div style={{fontSize:11,color:"#d8c0a0",lineHeight:1.8,marginBottom:8,fontStyle:"italic"}}>
                    {(()=>{const fn=RECORDING_TAKE_INTRO_TEXT[rs.stageIdx];return typeof fn==='function'?fn(kylie.lbs):(fn||'');})()}
                  </div>
                  {/* Step indicator */}
                  <div style={{display:"flex",gap:4,marginBottom:12}}>
                    {[0,1,2].map(i=>(
                      <div key={i} style={{flex:1,padding:"4px 6px",borderRadius:4,fontSize:10,textAlign:"center",
                        background:i<rs.choiceStep?`${amber}30`:i===rs.choiceStep?`${amber}20`:'#0a0600',
                        border:`1px solid ${i===rs.choiceStep?amber:i<rs.choiceStep?amberDim:'#302010'}`,
                        color:i===rs.choiceStep?amber:i<rs.choiceStep?amberDim:'#604020'}}>
                        {i<rs.choiceStep?'✓ '+stepLabels[i].split(' ').slice(1).join(' '):stepLabels[i]}
                      </div>
                    ))}
                  </div>
                  {/* Current step choices */}
                  {rs.choiceStep<3&&(
                    <div style={{display:"flex",flexDirection:"column",gap:6}}>
                      {stepChoices[rs.choiceStep].map(cid=>(
                        <button key={cid} style={{...C.btn(amberDim),textAlign:"left",padding:"8px 12px",fontSize:12}}
                          onClick={()=>makeRecordingChoice(cid)}>
                          {choiceLabels[cid]||cid}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* TAKE RESULT PHASE */}
              {rs.phase==='take_result'&&(
                <>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                    <div style={{fontSize:11,color:amberDim,letterSpacing:1}}>TAKE {rs.takeNum} RESULT</div>
                    <div style={{padding:"2px 8px",borderRadius:4,fontSize:10,fontWeight:"bold",
                      background:`${qualBadge[rs.lastTakeQuality]||'#808080'}20`,
                      border:`1px solid ${qualBadge[rs.lastTakeQuality]||'#808080'}`,
                      color:qualBadge[rs.lastTakeQuality]||'#808080'}}>
                      {(rs.lastTakeQuality||'').toUpperCase()}
                    </div>
                  </div>
                  <div style={{fontSize:12,color:"#d8c0a0",lineHeight:1.9,whiteSpace:"pre-line",marginBottom:16,fontStyle:"italic"}}>
                    {rs.lastTakeText||''}
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button style={{...C.btn(amber),flex:1}} onClick={wrapRecordingSession}>
                      ✓ Wrap it
                    </button>
                    {rs.timeLeft>0&&(
                      <button style={{...C.btn(amberDim),flex:1}} onClick={oneMoreTake}>
                        🔄 One more take ({rs.timeLeft} left)
                      </button>
                    )}
                  </div>
                </>
              )}

              {/* DONE PHASE */}
              {rs.phase==='done'&&(
                <>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                    <div style={{fontSize:11,color:amberDim,letterSpacing:1}}>SESSION WRAPPED</div>
                    <div style={{padding:"2px 8px",borderRadius:4,fontSize:10,fontWeight:"bold",
                      background:`${qualBadge[rs.bestClip]||'#808080'}20`,
                      border:`1px solid ${qualBadge[rs.bestClip]||'#808080'}`,
                      color:qualBadge[rs.bestClip]||'#808080'}}>
                      {(rs.bestClip||'').toUpperCase()} CLIP
                    </div>
                    {rs.perfectTakeAchieved&&<div style={{padding:"2px 8px",borderRadius:4,fontSize:10,color:"#c0a020",border:"1px solid #c0a020"}}>✨ PERFECT TAKE</div>}
                  </div>
                  <div style={{fontSize:12,color:"#d8c0a0",lineHeight:1.9,whiteSpace:"pre-line",marginBottom:16,fontStyle:"italic"}}>
                    {rs.endingText||''}
                  </div>
                  <button style={{...C.btn(amber),width:"100%"}} onClick={closeRecordingSession}>
                    Close ✓
                  </button>
                </>
              )}

              {/* POPUP OVERLAY — direction choice result */}
              {rs.popupText&&(
                <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1300}}>
                  <div style={{background:"#100800",border:`1px solid ${amber}50`,borderRadius:10,padding:20,maxWidth:440,margin:16}}>
                    <div style={{fontSize:12,color:"#e0c898",lineHeight:1.9,fontStyle:"italic",marginBottom:14,whiteSpace:"pre-line"}}>{rs.popupText}</div>
                    <button style={{...C.btn(amber),width:"100%"}} onClick={dismissRecordingChoicePopup}>Continue</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* ── FAIR CONTEST MINI-GAME MODAL ── */}
      {fairContestState&&(()=>{
        const fc=fairContestState;
        const s=students.find(st=>st.id===fc.studentId);
        if(!s) return null;
        const fairOrange='#C8860A';
        const remaining=fc.yourFoods.filter(f=>!f.consumed);
        const progressW=Math.min(100,(fc.yourFullnessPct/fc.overfullCap)*100);
        const progressColor=fc.yourFullnessPct>=fc.overfullCap?'#e05020':fc.yourFullnessPct>=150?'#e08020':fc.yourFullnessPct>=100?'#d0a020':'#40c060';
        return(
          <div style={C.overlay}>
            <div style={{...C.modal,maxWidth:520,background:"linear-gradient(160deg,#0a0600,#140c00,#0a0600)",border:`2px solid ${fairOrange}50`}}>
              <div style={{fontSize:9,letterSpacing:4,color:fairOrange,marginBottom:6}}>🎡 STATE FAIR PIE EATING</div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:10,fontSize:11,color:"#d0b080"}}>
                <span>{s.name} — {Math.round(s.lbs)} lbs</span>
                <span>Darcy — {Math.round(fc.darcyStartLbs)} lbs</span>
              </div>

              {fc.phase==='eating'&&(
                <>
                  {/* Fullness bar */}
                  <div style={{marginBottom:10}}>
                    <div style={{fontSize:10,color:"#a08060",marginBottom:4}}>
                      Fullness: {Math.round(fc.yourFullnessPct)}% / cap {fc.overfullCap}%
                      {fc.yourFullnessPct>=100&&<span style={{color:'#e08020'}}> — OVERFULL</span>}
                    </div>
                    <div style={{height:12,background:"#1a1000",borderRadius:6,overflow:"hidden",border:"1px solid #40300010"}}>
                      <div style={{height:"100%",width:`${progressW}%`,background:progressColor,borderRadius:6,transition:"width 0.3s"}}/>
                    </div>
                  </div>

                  {/* Pie table */}
                  <div style={{marginBottom:10}}>
                    <div style={{fontSize:10,color:"#907050",marginBottom:6}}>PIES ({remaining.length} left)</div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>
                      {fc.yourFoods.map((food,i)=>{
                        const canEat=!food.consumed&&fc.yourFullnessPct<fc.overfullCap;
                        return(
                          <button key={i} disabled={!canEat} onClick={()=>eatFairPie(food.id)}
                            style={{...C.btn(canEat?fairOrange:"#2a1800"),opacity:food.consumed?0.3:canEat?1:0.5,fontSize:12,padding:"8px 4px",textAlign:"center"}}>
                            {food.emoji} {food.name}<br/>
                            <span style={{fontSize:9,color:"#c0a070"}}>+{food.lbs} lbs</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Darcy progress */}
                  <div style={{...C.infoBox("rgba(20,10,0,0.6)"),marginBottom:10,fontSize:11,color:"#907050"}}>
                    Darcy has eaten {fc.yourFoods.length-fc.darcyFoodsLeft} / {fc.yourFoods.length} plates • {Math.round(fc.darcyGain||0)} lbs gained
                  </div>

                  {/* Action buttons */}
                  <div style={{display:"flex",gap:6,marginBottom:10}}>
                    <button disabled={fc.tauntUsed} style={{...C.btn("#3a2000"),flex:1,opacity:fc.tauntUsed?0.4:1,fontSize:11}} onClick={()=>doFairAction('taunt')}>
                      😏 Taunt Darcy
                    </button>
                    <button disabled={fc.pushThroughUsed} style={{...C.btn("#3a0000"),flex:1,opacity:fc.pushThroughUsed?0.4:1,fontSize:11}} onClick={()=>doFairAction('push_through')}>
                      🔥 Push Through
                    </button>
                    <button disabled={fc.coolDownUses>=2} style={{...C.btn("#002a1a"),flex:1,opacity:fc.coolDownUses>=2?0.4:1,fontSize:11}} onClick={()=>doFairAction('cool_down')}>
                      🌡 Cool Down ({2-fc.coolDownUses})
                    </button>
                  </div>
                </>
              )}

              {fc.phase==='weigh_in'&&(()=>{
                const weighFn=FAIR_WEIGH_IN_TEXT[Math.min(fc.stageIdx,FAIR_WEIGH_IN_TEXT.length-1)];
                const weighText=typeof weighFn==='function'?weighFn(fc.yourStartLbs,fc.yourGain,fc.darcyStartLbs,fc.darcyGain||0):'';
                const payFn=FAIR_PAYOFF_TEXT[Math.min(fc.stageIdx,FAIR_PAYOFF_TEXT.length-1)];
                const payText=typeof payFn==='function'?payFn(fc.yourGain):'';
                return(
                  <>
                    <div style={{fontSize:12,color:"#e0c898",lineHeight:1.9,fontStyle:"italic",marginBottom:14,whiteSpace:"pre-line"}}>{weighText}</div>
                    <div style={{...C.infoBox("rgba(20,10,0,0.6)"),marginBottom:12,fontSize:11,color:"#c0a060",lineHeight:1.8,fontStyle:"italic"}}>{payText}</div>
                    <div style={{display:"flex",gap:10,marginBottom:10,fontSize:12,color:"#d0b080"}}>
                      <div style={{flex:1,textAlign:"center"}}>
                        <div style={{color:fairOrange,fontWeight:"bold",fontSize:14}}>+{Math.round(fc.yourGain)} lbs</div>
                        <div style={{fontSize:10,color:"#907050"}}>{s.name}</div>
                      </div>
                      <div style={{flex:1,textAlign:"center"}}>
                        <div style={{color:"#a08060",fontWeight:"bold",fontSize:14}}>+{Math.round(fc.darcyGain||0)} lbs</div>
                        <div style={{fontSize:10,color:"#907050"}}>Darcy</div>
                      </div>
                    </div>
                    <button style={{...C.btn(fairOrange),width:"100%"}} onClick={closeFairContest}>Leave the Fair ✓</button>
                  </>
                );
              })()}

              {/* POPUP OVERLAY */}
              {fc.popupText&&(
                <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1300}}>
                  <div style={{background:"#100800",border:`1px solid ${fairOrange}50`,borderRadius:10,padding:20,maxWidth:440,margin:16}}>
                    <div style={{fontSize:12,color:"#e0c898",lineHeight:1.9,fontStyle:"italic",marginBottom:14,whiteSpace:"pre-line"}}>{fc.popupText}</div>
                    <button style={{...C.btn(fairOrange),width:"100%"}} onClick={dismissFairPopup}>Continue</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* ── EP2: EVOLVED ACTIVITY MODAL ── */}
      {evolvedActivityModal&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:540,background:"linear-gradient(160deg,#08041a,#140830,#08041a)",border:"1px solid #5020a060"}}>
            <div style={{fontSize:9,letterSpacing:4,color:"#7030c0",marginBottom:6}}>✦ {(EVOLVED_ACTIVITY_META[evolvedActivityModal.student?.evolvedForm]||{}).label||"Activity"}</div>
            <div style={{fontSize:14,fontWeight:700,color:"#c080ff",marginBottom:10}}>{evolvedActivityModal.student?.name}</div>
            <div style={{fontSize:12,color:"#c0b0e0",lineHeight:1.9,marginBottom:16,fontStyle:"italic"}}>{evolvedActivityModal.text}</div>
            <button style={{...C.btn("#301060"),width:"100%"}} onClick={()=>setEvolvedActivityModal(null)}>Continue</button>
          </div>
        </div>
      )}

      {convergenceModal&&(
        <div style={C.overlay}>
          <div style={{...C.modal,maxWidth:520,background:"linear-gradient(160deg,#05050f,#0a0a20,#05050f)",border:"2px solid #ffffff50"}}>
            <div style={{fontSize:9,letterSpacing:4,color:"#ffffff",marginBottom:8}}>⚡ THE SINGULARITY BECKONS</div>
            <div style={{fontSize:13,color:"#d0d0ff",lineHeight:1.9,marginBottom:14,fontStyle:"italic"}}>
              <strong style={{color:"#e0b0ff"}}>{convergenceModal.student?.name}</strong> (Celestial Apex, {convergenceModal.student?.lbs} lbs) and{" "}
              <strong style={{color:"#ff8080"}}>{convergenceModal.opponent?.name}</strong> (Umbral Sovereign, {convergenceModal.opponent?.lbs} lbs) stand at opposing ends of the divine spectrum.
              <br/><br/>
              The Singularity is possible. One will consume the other — and become something that has no name in any existing theology.
              <br/><br/>
              <em>The result will be one student at {((convergenceModal.student?.lbs||0)+(convergenceModal.opponent?.lbs||0)).toLocaleString()} lbs. The other ceases to exist as a separate entity. This cannot be undone.</em>
            </div>
            <div style={{...C.infoBox("rgba(20,20,20,0.6)"),marginBottom:14,fontSize:11,color:"#a0a0c0",fontStyle:"italic",lineHeight:1.7}}>
              "{CONVERGENCE_STAGE.desc}"
            </div>
            <div style={{display:"flex",gap:8}}>
              <button style={C.btn("#333")} onClick={()=>setConvergenceModal(null)}>Not yet</button>
              <button style={{...C.btn("#202060"),flex:1}} onClick={()=>triggerConvergence(convergenceModal.student?.id,convergenceModal.opponent?.id)}>
                ✦ Trigger Convergence — {convergenceModal.student?.name} ascends (5 AP)
              </button>
              <button style={{...C.btn("#600010"),flex:1}} onClick={()=>triggerConvergence(convergenceModal.opponent?.id,convergenceModal.student?.id)}>
                🌑 Trigger Convergence — {convergenceModal.opponent?.name} ascends (5 AP)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
