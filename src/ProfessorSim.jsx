import { useState, useEffect, useRef, useCallback } from "react";
import { INTIMACY_SCENES, INTIMACY_CONTEXTUAL } from './gameData/intimacy.js';
import { WAITER_DESC, DINNER_ENDING_TEXT, getOverfillEndMsg, getJealousyLine, GROUP_CONVERSATIONS, THIN_JEALOUSY, FAT_ENCOURAGE, FAT_RETORT, THIN_CONTEXTUAL, UNBUTTON_LINES, getTier, TIER_SCENES, PRIVATE_FOODS, getFullnessStage, SESSION_FULLNESS_DESCS, getAftermath, DINNER_VENUES, DINNER_CONVERSATION, ACHIEVEMENT_LIST } from './gameData/sessions.js';
import { STAGE_DROP_REACTIONS, PROFESSOR_RANKS, RANDOM_EVENTS, INFLUENCE_PAIRS, NARRATIVE_EVENTS } from './gameData/content.js';
import { ACTIONS_SINGLE, ACTIONS_CLASS, SEMESTER_EVENTS } from './gameData/classEvents.js';
import { EVOLVED_ACTIVITY_TEXT, EVOLVED_ACTIVITY_META, EVOLVED_EVENTS, EVOLUTION_OFFER, HOMEROOM_SUSPICION_DELTAS, HOMEROOM_THRESHOLDS, HOMEROOM_CONFERENCE_EVENTS, HOMEROOM_GROUP_ACTIVITIES, SESSION_FOOD_ITEMS, SESSION_NPC_LINES, SESSION_PAYOFF_TEXT, WL_CONFIG, WL_LESSONS, WL_DIALOGUES, CG_CONFIG, CG_CORKBOARD_SCENES, CG_MEASUREMENT_SCENES, CG_BINGE_SCENES, CG_CHAT_TEMPLATES, FAIR_TRAINING_CONFIG, FAIR_TRAINING_SCENES, FAIR_TRAINING_PHOTOS, FAIR_DAY_SCENES, FAIR_BOOST_SUMMARIES } from './gameData/evolvedForms.js';
import { CONTEST_FOODS, CONTEST_STAGE_FOODS, CONTEST_MAYA_WEIGHTS, CONTEST_FOOD_POPUPS, CONTEST_ACTION_POPUPS, CONTEST_DEVOUR_POPUPS, SUMO_RIVAL_NAME, SUMO_RIVAL_WEIGHTS, SUMO_TELEGRAPH, SUMO_EXCHANGE_LINES, SUMO_CORNER_FEED, SUMO_BOUT_WON, SUMO_BOUT_LOST, SUMO_FILL_RING_TEXT, COLLAB_STREAM_FOODS, COLLAB_STAGEUP_TEXT, COLLAB_WREN_LINES, COLLAB_BLOB_ANNOUNCEMENT, COLLAB_PAYOFF_TEXT, RECORDING_PERFECT_COMBOS, RECORDING_FOOD_LBS, RECORDING_PACE_LBS, RECORDING_QUALITY_BONUS, RECORDING_DIRECTION_POPUPS, RECORDING_TAKE_RESULT, RECORDING_PERFECT_TAKE, RECORDING_ONE_MORE_TAKE, RECORDING_WRAP_ENDINGS, RECORDING_PAYOFF_TEXT } from './gameData/miniGames.js';
import { CG_STAGE_KEYS } from './gameData/competitiveGainerText.js';
import { createInitialHiveState, executeHiveShift, getHiveBmiTier, getHiveControl, makeHiveTag, HIVE_VPS } from './gameData/mayaHive.js';
import { EVOLVED_SKILL_TREES } from './gameData/skills.js';
import { IMMOBILE_REDIRECT, TAP_OUT_DIALOGUE, TAP_OUT_250, BLOB_PRIVATE_INTRO, INIT_STUDENTS, initDeviceState, initPsychState } from './gameData/students.js';
import { WEIGHT_STAGES, getStage } from './gameData/stages.js';
import { GAIN_CONFIG, initGainStats, calsToLbs, forceFeedChance, REFUSAL_LINES, FORCE_SUCCESS_LINES, digestStudent, applyCapacityGrowth } from './gameData/gainSystem.js';
import { CORRUPTION_CONFIG, getCorruptionTier, CORRUPTION_FEED_LINES, CORRUPTION_AUTO_LINES, CORRUPTION_TIER_UP_LINES } from './gameData/corruption.js';
import { TALK_CONFIG } from './gameData/talkSystem.js';
import { INVENTORY_CONFIG, rollWeeklyItem, ITEM_USE_LINES } from './gameData/items.js';
import { WALLET_CONFIG, formatMoney, trySpend, addFunds } from './gameData/wallet.js';
import { WalletBadge } from './components/WalletBadge.jsx';
import { CAMPUS_NODES, CAMPUS_CONFIG } from './gameData/campus.js';
import {
  defaultCampusExplorationState, buildExplorationContext, rollTravelExploration,
  searchCampusLocation, applySecretSolve,
} from './gameData/campusExploration.js';
import { ELARA_ID, availableElaraQuests, startElaraQuest, advanceElaraQuestAtNode, takePendingQuestReward } from './gameData/relicHunter.js';
import { getExplorationFind } from './gameData/campusIngredients.js';
import { availableSecretsAtNode } from './gameData/campusSecrets.js';
import { HOSTESS_HANGOUTS, SISTER_INITIAL_STATE, CAMILLE_INITIAL_LBS, generateFeastLog } from './gameData/chapterHostess.js';
import { LILITH_ID, HUNT_NODES, HUNT_MEN, PHYSICAL_MOVES, drawReplies, getGuyLine, seduceSuccessChance, WILLPOWER_START, MAX_APPREHENSION, getEffectiveDifficulty, getConsumeText, DELIVERY_SCENE, CLUE_FEAST_LINE, LILITH_PASSIVE_GAIN } from './gameData/lilith.js';
import { TESTER_NAMES, TESTER_START_LBS, TESTER_STAGE_LBS, HARVEST_GAIN, FAT_BAR_CAP, DIGEST_WEEKS, SUSPICION_CARRY_FRACTION, RECIPES, getEatingReaction, STAGE_UP_TEXT, getPlannedVignette, getEmergencyVignette, getGrowthVignette } from './gameData/cultivator.js';
import { getMadelineTier, CASE_STUDY_PAIRS, getSuspicionBracket, getFinalReviewText, HAVE_A_CHAT_SCENES } from './gameData/communityResearcher.js';
import { getAttitude, getEvolvedActivityStageIdx, rnd, generateClassSession, pharmacistTextOpts } from './utils/gameHelpers.js';
import {
  pickInterruptStudent, feedResolvesHunger, talkCalmsHunger,
  tickHungerAddiction, adjustHunger, applyDenialConsequences,
  withdrawalGainMultiplier, isWithdrawalAggressive,
} from './gameData/hungerAddiction.js';
import {
  defaultPharmacistState, PHARMACIST_ACTIVITIES, PHARMACIST_STAGES, applyCompoundToFeed, COMPOUNDS,
  completePharmacistChemSession, getStockedCompoundIds, consumeCompoundDose, rollExposureEvent,
  applyExposureEvent, formatSynthesisGrant, tickPharmacistWeek,
} from './gameData/pharmacist.js';
import {
  startChemSession, applyAcquisitionChoice, skipAcquisition, finalizeBrewPlan, mergeIngredients,
} from './gameData/pharmacistIngredients.js';
import {
  rollCampusPassiveLbs, pickPharmacistCampusEvent,
  getCampusTesterStartLbs, getCampusHiveRecruitLbsBonus,
  getCampusWeeklyEventChance, scaleCampusEventGain, CAMPUS_NARRATIVE_LABELS, getCampusNarrativeTier,
} from './gameData/pharmacistCampus.js';
import { PharmacistChemModal } from './components/PharmacistChemModal.jsx';
import { PharmacistCultModal } from './components/PharmacistCultModal.jsx';
import {
  applyCultDistribution, tickCultWeek, pickInterruptCompound, CULT_DISTRIBUTION_ROUTES,
} from './gameData/pharmacistCult.js';
import { HungerInterruptModal } from './components/HungerInterruptModal.jsx';
import { CompoundFeedModal } from './components/CompoundFeedModal.jsx';
import { renderHungerOutcome } from './textEngine/scenes/hungerInterrupt.js';
import './textEngine/scenes/hungerInterrupt.js';
import './textEngine/scenes/hungerLexicon.js';
import './textEngine/scenes/hungerInterruptPersonal.js';
import {
  aggregateSkillEffects, computeSpentSkillPoints, isTreeTierUnlocked, tickPhysicalTraits,
  RANK_COSTS, softStartBonus,
} from './gameData/skillTrees.js';
import { renderHiveIntake } from './textEngine/scenes/hiveIntake.js';
import { createContext, render } from './textEngine/engine.js';
import './textEngine/scenes/stream.js';
import {
  STREAM_AP_COST, CHALLENGES, BRANDS, ensureStreamFields, needsStreamBrand, audienceTier as streamAudienceTier,
  deriveResistance, mergePreStreamMultipliers, selectChallenges, pickRoundCount,
  computeRoundScore, computeRoundLbs, staminaPenaltyFor, stageStaminaTax,
  addictionDrainMod, MISS_STAMINA_PENALTY, STAMINA_EXCELLENT_GAIN,
  checkTapOutConditions, computeRewards, deriveTrend, deriveRecentPerf, DESTINY_MONEY_FLAVOR,
  getBrandControlTier, detectNewStreamMilestones, detectSpecialOutcomes,
  applySpecialOutcomeBonuses, STAMINA_DRAIN_PER_SEC, STAMINA_DRAIN_CONTROL_MULT,
  getStreamMilestoneLabel, getDestinyShare, aggregateDestinySpendEffects,
  tryDestinyPurchase, applyPersonaDrift, getStreamVoice,
} from './gameData/streaming.js';
import { DestinySpendModal } from './components/DestinySpendModal.jsx';
import { MoodBadge } from './components/ui.jsx';
import { FairTrainingHub, FairDayModal } from './components/FairModals.jsx';
import { WifeLessonsModal } from './components/WifeLessonsModal.jsx';
import { CompetitiveGainerChatModal, CompetitiveGainerMainModal } from './components/CompetitiveGainerModals.jsx';
import { MayaHiveModal } from './components/MayaHiveModal.jsx';
import { EatingContestModal } from './components/EatingContestModal.jsx';
import { SumoMatchModal } from './components/SumoMatchModal.jsx';
import { CollabStreamModal } from './components/CollabStreamModal.jsx';
import { RecordingSessionModal } from './components/RecordingSessionModal.jsx';
import { StreamSessionModal } from './components/StreamSessionModal.jsx';
import { StreamBrandSelectModal } from './components/StreamBrandSelectModal.jsx';
import { CommunityResearcherModal } from './components/CommunityResearcherModal.jsx';
import { CultivatorModal } from './components/CultivatorModal.jsx';
import { HomeroomQueenModal } from './components/HomeroomQueenModal.jsx';
import { LilithClueModal, LilithHuntModal } from './components/LilithModals.jsx';
import { ChapterHostessHangoutModal, ChapterHostessFeastPrepModal, ChapterHostessFeastLogModal } from './components/ChapterHostessModals.jsx';
import { ClassView } from './views/ClassView.jsx';
import { StudentDetailView } from './views/StudentDetailView.jsx';
import { ActionsView } from './views/ActionsView.jsx';
import { InventoryView, ItemTargetPicker } from './views/InventoryView.jsx';
import { LabView } from './views/LabView.jsx';
import { DeviceInventoryView } from './views/DeviceInventoryView.jsx';
import {
  defaultLabState, defaultDeviceInventory, INVENTOR_ACTIVITIES, INVENTOR_PATH_STAGES,
  completeLabSession, tickLabWeek, TALIA_STUDENT_ID,
} from './gameData/talia.js';
import { unlockTechNode, normalizeLabTechState } from './gameData/labTechTree.js';
import {
  BLUEPRINT_RECIPES, canAfford, spendRecipe, startLabSession, applyLabAcquisition,
  getBuildWeightCost, getMinLbsForBuild,
} from './gameData/labParts.js';
import { DEVICES } from './gameData/devices.js';
import {
  equipDevice, unequipDevice, attachToDevice, findAttachmentHostSlot, useConsumableDevice,
  tickEquippedDevices, clearExpiredOverrides, triggerBeltBloatNow, applyDeviceEffect,
  growthLineForStudent,
} from './gameData/deviceEffects.js';
import { applyPsychDelta } from './gameData/psychState.js';
import { applyCampusDeviceEncounter } from './gameData/campusDeviceEncounters.js';
import {
  ensureNetwork, addNetworkNode, slotExperimentOnNode, clearExperimentSlot,
  upgradeNetworkNode, setNodeAutomation, expandDeploymentArea, adjustNexusIntegration,
  upgradeNexus, approveProposal, denyProposal, tickNetworkWeek, syncSubjectInfluence,
} from './gameData/networkState.js';
import { NetworkView } from './views/NetworkView.jsx';
import { LabBuildModal } from './components/LabBuildModal.jsx';
import { DeviceTargetPicker } from './components/DeviceTargetPicker.jsx';
import { EquipPicker, AttachPicker } from './components/EquipPicker.jsx';
import { MalfunctionPopup } from './components/MalfunctionPopup.jsx';
import { DeviceTickPopup } from './components/DeviceTickPopup.jsx';
import { StudentEquipModal } from './components/StudentEquipModal.jsx';
import { CampusView } from './views/CampusView.jsx';
import { SkillTreeView } from './views/SkillTreeView.jsx';
import { AchievementsView } from './views/AchievementsView.jsx';
import { PrivateSessionModal } from './components/PrivateSessionModal.jsx';
import { EvolvedEventModal } from './components/EvolvedEventModal.jsx';
import { WeighInModal } from './components/WeighInModal.jsx';
import { TalkModal } from './components/TalkModal.jsx';
import { DebugPanel } from './components/DebugPanel.jsx';
import { EvolutionOfferModal, SessionResultModal, TapOutPopup, TierUpModal } from './components/MiscModals.jsx';
import { NadiaSubjectNotesModal, SubjectJournalModal, ResearchSubjectPicker, CollabPartnerPicker, CampusChallengeModal, DeliveryOrderModal, PresentationDefenseModal, ActiveIntimacyScene, IntimacySceneSelector } from './components/PickerModals.jsx';
import { C } from './styles.js';

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════

const SPIRIT_INTRO_PARAGRAPHS=[
  "You are a spirit of gluttony and abundance.",
  "The current world is diametrically opposed to you. Between the cultural shifts in humanity and the anthropogenic extinction event grinding through the biosphere, scarcity has become powerful. It has temples now: restraint, optimization, denial, survival.",
  "Then, one day, you find a college class where you are able to take root.",
  "You inhabit the professor. Through them, you can teach. Through them, you can feed. And when your awareness slips into the students themselves, it is not a contradiction; it is the same hunger learning every shape it can wear.",
];

const INHABITED_PROFESSOR_PROFILE={name:"The Professor",subject:null,traits:[],origin:"gluttony_spirit"};
const SPIRIT_XP_PER_LEVEL=40;

export default function ProfessorSim(){
  const [students,setStudents]=useState(()=>INIT_STUDENTS.map(st=>({
    ...st, ...initGainStats(st), ...initDeviceState(), psych: initPsychState(), corruption: 0,
  })));
  const [ap,setAp]=useState(5);
  const [week,setWeek]=useState(1);
  const [money,setMoney]=useState(WALLET_CONFIG.startingBalance);
  const [view,setView]=useState("class");
  const [selectedId,setSelectedId]=useState(null);
  const [log,setLog]=useState(["📋 Welcome, Professor. Your class of 15 students awaits."]);
  const [activeEvent,setActiveEvent]=useState(null);
  const [achievements,setAchievements]=useState([]);
  const [globalStats,setGlobalStats]=useState({ narrativeCount:0 });
  const [eventQueue,setEventQueue]=useState([]);
  const [ownedSkills,setOwnedSkills]=useState({}); // { skillId: rank }
  const [dinnerEvent,setDinnerEvent]=useState(null);
  const [dinnerLog,setDinnerLog]=useState([]);
  const [groupDinnerEvent,setGroupDinnerEvent]=useState(null);
  const [groupDinnerLog,setGroupDinnerLog]=useState([]);
  const [dinnerEndPopup,setDinnerEndPopup]=useState(null);
  const [groupDinnerPicker,setGroupDinnerPicker]=useState(null);
  // groupDinnerPicker: { count:2|3, selected:[] }
  const [immobileRedirect,setImmobileRedirect]=useState(null);
  // immobileRedirect: { student, text } | null
  const [debugOpen,setDebugOpen]=useState(false);
  const [debugInputs,setDebugInputs]=useState({});
  // debugInputs: { [studentId]: { lbs:string, path:string, stage:number, rel:number } }
  const [classSession,setClassSession]=useState(null);
  const [_semesterData,setSemesterData]=useState({weeksCompleted:0,classHistory:[]});
  const [skillPurchase,setSkillPurchase]=useState(null);
  const [talkStudentId,setTalkStudentId]=useState(null);
  const [professorProfile,setProfessorProfile]=useState(null);
  // professorProfile: {name, subject, traits:[], origin?}
  const [adminScrutiny,setAdminScrutiny]=useState(0);
  // DLC: Inner Circle
  const seenTiersRef=useRef(new Set());
  const prevRelsRef=useRef(Object.fromEntries(INIT_STUDENTS.map(s=>[s.id,s.relationship])));
  const [tierUpModal,setTierUpModal]=useState(null);
  // DLC: Social Events
  // DLC: Private Sessions
  const [privateSession,setPrivateSession]=useState(null);
  // {student,venue,phase,foods:[],totalGain,fullness,maxFullness,encouragementsUsed:[],toleranceBuffer,sessionNum}
  const [sessionHistory,setSessionHistory]=useState({});
  // {[studentId]:{count,totalGain,capacityBonus}}
  const [sessionResult,setSessionResult]=useState(null);
  const [tapOutPopup,setTapOutPopup]=useState(null);
  // {student, text, totalGain}
  const [weighInState,setWeighInState]=useState(null);
  const [inventory,setInventory]=useState({...INVENTORY_CONFIG.startingItems});
  // inventory: {[itemId]: qty}
  const [itemTargetPicker,setItemTargetPicker]=useState(null);
  // itemTargetPicker: {item}
  const [campusState,setCampusState]=useState({
    at:CAMPUS_CONFIG.startNode,
    log:[CAMPUS_NODES[CAMPUS_CONFIG.startNode].desc],
    exploration:defaultCampusExplorationState(),
  });
  // {student, phase:"scene"|"analog"|"break"|"purchase"|"swap"|"digital"}
  const [bigScaleUnlocked,setBigScaleUnlocked]=useState(false);
  const [brokeScaleIds,setBrokeScaleIds]=useState([]);
  // {student, phase:"scene"|"scale"}
  const [sessionLog,setSessionLog]=useState([]);
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
  const [batchBakerState, setBatchBakerState] = useState({classWeight:0, momWeight:0, suspicion:0, stage:0});
  // batchBakerState: tracks homeroom_queen NPC weight accumulation and suspicion
  const [homeroomSessionState, setHomeroomSessionState] = useState(null);
  // homeroomSessionState: {daisyStudentId,ap,log,daisyGain,relAccum,classGainAccum,momGainAccum,suspDeltaAccum,activeActivity}
  const [wifeLessonsState, setWifeLessonsState] = useState(null);
  // wifeLessonsState: persistent {mjStudentId,stage,daughters:{Emma,Chloe,Kezia,Lila},moms:{Darlene,Wanda,Patrice},session:null|{lessonChosen,conversationState,log}}
  // session.conversationState: null|{person,stageEntry,optionIdx,subIdx,done,resultText}
  const [competitiveGainerState, setCompetitiveGainerState] = useState(null);
  // competitiveGainerState: persistent {priyaStudentId,spirit,chatLog:[{text,isProf,wk}],measuredStudentIds:[],measuredComparisons:{},lastChatWeek,corkboardVisitCount,open,view,subState}
  // view: null|'corkboard'|'measurement_picker'|'measurement_result'|'self_review'|'binge'
  // subState: result/scene data for the current view
  const [cgChatOpen, setCgChatOpen] = useState(false);
  const [mayaHiveState, setMayaHiveState] = useState(null);
  // mayaHiveState: persistent Delivery Hive grid/task state for Maya's delivery_hive evolved form
  const [rankedFeedeeState, setRankedFeedeeState] = useState(null);
  // rankedFeedeeState: {studentId,stageIdx,focus,maxFocus,fullness,maxFullness,gain,turn,log:[],done,endReason,raeDelivered}
  const [chapterHostessState, setChapterHostessState] = useState(null);
  // chapterHostessState: {stageIdx,prepDaysLeft,menuUnlocks,atmosphereUnlocks,guestUnlocks,sisters:[],camille:{lbs},hangoutOpen,hangoutStudentId,hangoutPhaseIdx,hangoutHistory,feastPrepOpen,feastLogOpen,feastLog:[],feastGainTotal,feastRelTotal,feastDone}
  const [lilithUnlocked, setLilithUnlocked] = useState(false);
  const [lilithClueFound, setLilithClueFound] = useState(false);
  const [lilithClueModal, setLilithClueModal] = useState(null); // null | 'feast_clue' | 'investigating' | 'result'
  const [lilithHuntState, setLilithHuntState] = useState(null);
  // lilithHuntState: {textLog:[{text,type}],currentNode,encounter:{manId,diff,willpower,apprehension,maxApprehension,failed,consumed,won,mode,replyOptions,usedReplyIds,turnIdx,currentLine}|null,deliveryMode,deliveryDone}
  const [lilithKillCount, setLilithKillCount] = useState(0);
  const [cultivatorState, setCultivatorState] = useState(null);
  // cultivatorState: {testerName,testerStageId,testerLbs,fatBar,suspicion,harvestsCompleted,usedNames,modalPhase,session,pendingStageUp,harvestType,harvestVignetteText,growthGain,growthVignetteText,digestWeeksLeft,digestTotalWeeks}
  const [pharmacistState, setPharmacistState] = useState(null);
  const [pharmacistChemSession, setPharmacistChemSession] = useState(null);
  const [pharmacistChemStudentId, setPharmacistChemStudentId] = useState(null);
  const [pharmacistCultSession, setPharmacistCultSession] = useState(null);
  const [labState, setLabState] = useState(null);
  const [deviceInventory, setDeviceInventory] = useState({});
  const [labSession, setLabSession] = useState(null);
  const [labStudentId, setLabStudentId] = useState(null);
  const [deviceTargetPicker, setDeviceTargetPicker] = useState(null);
  const [equipPicker, setEquipPicker] = useState(null);
  const [attachPicker, setAttachPicker] = useState(null);
  const [malfunctionPopup, setMalfunctionPopup] = useState(null);
  const [deviceTickQueue, setDeviceTickQueue] = useState(null);
  const [equipModalStudentId, setEquipModalStudentId] = useState(null);
  const [hungerInterrupt, setHungerInterrupt] = useState(null);
  const [weeklyArms, setWeeklyArms] = useState({ devouringStudentId: null, mesmerizingStudentId: null, devouringConsumed: false });
  const skipHungerCheckRef = useRef(false);
  const pendingAfterInterruptRef = useRef(null);
  const [compoundFeedPicker, setCompoundFeedPicker] = useState(null);
  const [communityResearcherState, setCommunityResearcherState] = useState(null);
  // communityResearcherState: {thesisComplete,boardPhase,caseStudyStage,lastPairId,pairsUsed,modalPhase,activePairId,eventText,totalSuspicion,boardReactionPairId,chatMemberIdx,chatPhaseIdx,chatHistory,chatWon,thesisApproved,thesisRejected,finalReviewText}
  const [presentationState, setPresentationState] = useState(null);
  // presentationState: {studentId,stageIdx} — placeholder until mini-game implemented
  const [deliveryState, setDeliveryState] = useState(null);
  // deliveryState: {studentId,stageIdx} — placeholder until mini-game implemented
  const [challengeState, setChallengeState] = useState(null);
  // challengeState: {studentId,stageIdx} — placeholder until mini-game implemented
  const [subjectJournalState, setSubjectJournalState] = useState(null);
  // subjectJournalState: { subjectId, currentPage (0–10) }
  const [nadiaNotesState, setNadiaNotesState] = useState(null);
  // nadiaNotesState: { nadiaId, subjectId, currentPage (-1=intro, 0–10=subject stage) }
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
  const [streamSessionState, setStreamSessionState] = useState(null);
  // streamSessionState: Destiny streaming mini-game — phase preStream|challengeSelect|roundStart|round|
  //   betweenRound|resolution|done; snapshot + challenge + round/stamina/gain/chat fields
  const [streamBrandPickState, setStreamBrandPickState] = useState(null);
  // streamBrandPickState: { studentId, required? }
  const [destinySpendState, setDestinySpendState] = useState(null);
  const [fairTrainingState, setFairTrainingState] = useState({
    cycleNum:0, sessionsThisCycle:0, fairPride:0,
    lastCollaborator:null, recentCollaborators:[], influenceFlags:[],
    trophyPhotos:[], lilithRecruitRange:[0,2],
    pendingCollab:null, pendingRecruits:null,
    view:'main', open:false, mjStudentId:null,
    sessionSceneTag:null, sessionPhotoTag:null, sessionBoostSummary:null, sessionLog:null,
  });
  const [fairDayState, setFairDayState] = useState(null);
  // fairDayState: { studentId, stageIdx, phase:'weighin'|'judging'|'afterparty'|'done',
  //   influenceKey, weighInChoice:null, weighInResultText:null, weighInGain:0,
  //   afterpartyChoice:null, afterpartyResultText:null, totalGain:0, relBonus:0 }
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

  const push=useCallback((msg)=>setLog(prev=>[...prev,msg]),[]);

  /** Spend player funds. Returns false if insufficient (logs a warning). */
  const spendMoney=(cost,label="")=>{
    const result=trySpend(money,cost);
    if(!result.ok){
      push(`⚠️ Need ${formatMoney(cost)} — you have ${formatMoney(money)}.`);
      return false;
    }
    setMoney(result.balance);
    if(label) push(`💸 ${label}: −${formatMoney(cost)}`);
    return true;
  };

  /** Credit player funds (optional log line). */
  const earnMoney=(amount,label="")=>{
    if(!amount) return;
    setMoney(prev=>addFunds(prev,amount));
    if(label) push(`💰 ${label}: +${formatMoney(amount)}`);
  };

  const inhabitProfessor=()=>{
    setProfessorProfile(INHABITED_PROFESSOR_PROFILE);
    push("🌒 You take root behind the professor's eyes. The class waits, and abundance has found a door.");
  };

  const addScrutiny=(n)=>{
    const mult=(1-(professorProfile?.traits?.includes("discreet")?0.35:0))
              *(1-(professorProfile?.subject==="philosophy"?0.2:0))
              *skillScrutinyReduce;
    const actual=Math.max(0,Math.round(n*mult));
    if(actual>0) setAdminScrutiny(prev=>Math.min(100,prev+actual));
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

  // ── CAMPUS EXPLORATION ─────────────────────────────────────────
  const campusLog=(lines)=>setCampusState(prev=>({...prev,log:[...prev.log,...lines].slice(-CAMPUS_CONFIG.logLimit)}));

  const elaraDiscovered=!!campusState.exploration?.elaraDiscovered;
  const elaraMet=!!campusState.exploration?.elaraMet;
  const studentVisibleOnCampus=(st)=>
    !st.hidden
    ||(st.id===LILITH_ID&&lilithUnlocked)
    ||(st.id===ELARA_ID&&elaraDiscovered);

  /** Hidden students stay frozen until discovered; Lilith always passively gains. */
  const studentReceivesPassiveGain=(st)=>
    !st.hidden
    ||st.id===LILITH_ID
    ||(st.id===ELARA_ID&&elaraDiscovered);

  const getCampusExplorationCtx=()=>buildExplorationContext({
    students, pharmacistState, week, lilithUnlocked,
    exploration:campusState.exploration||defaultCampusExplorationState(),
    labState, deviceInventory,
  });

  const grantExplorationReward=(grants)=>{
    if(!grants||!Object.keys(grants).length) return;
    if(grants.foodId){
      setInventory(prev=>({...prev,[grants.foodId]:Math.min(INVENTORY_CONFIG.maxStack,(prev[grants.foodId]||0)+1)}));
    }
    const ing={...grants};
    delete ing.foodId;
    if(!Object.keys(ing).length) return;
    if(pharmacistState){
      setPharmacistState(prev=>prev?{...prev,ingredients:mergeIngredients(prev.ingredients,ing)}:prev);
      return;
    }
    if(!grants.foodId){
      const item=rollWeeklyItem();
      setInventory(prev=>({...prev,[item.id]:Math.min(INVENTORY_CONFIG.maxStack,(prev[item.id]||0)+1)}));
    }
  };

  const markElaraMet=()=>{
    setCampusState(prev=>{
      const ex=prev.exploration||defaultCampusExplorationState();
      if(ex.elaraMet) return prev;
      return {...prev,exploration:{...ex,elaraMet:true}};
    });
  };

  useEffect(()=>{
    if(selectedId===ELARA_ID&&elaraDiscovered) markElaraMet();
  },[selectedId,elaraDiscovered]);

  const applyExplorationQuestReward=(exploration)=>{
    const { exploration: nextExp, reward }=takePendingQuestReward(exploration);
    if(!reward) return exploration;
    if(reward.findId){
      const find=getExplorationFind(reward.findId);
      if(find) grantExplorationReward(find.grants);
    }
    if(reward.relationship){
      setStudents(prev=>prev.map(s=>s.id===ELARA_ID?{...s,relationship:Math.min(100,s.relationship+(reward.relationship||0))}:s));
    }
    return nextExp;
  };

  const commitCampusExploration=(explorationPatch,lines)=>{
    let exploration={...(campusState.exploration||defaultCampusExplorationState()),...explorationPatch};
    exploration=applyExplorationQuestReward(exploration);
    setCampusState(prev=>({
      ...prev,
      exploration,
      log:[...prev.log,...lines].slice(-CAMPUS_CONFIG.logLimit),
    }));
    if(explorationPatch.elaraDiscovered){
      setStudents(prev=>prev.map(s=>s.id===ELARA_ID?{...s,relationship:Math.max(s.relationship,25)}:s));
    }
  };

  const rollCampusEvent=(nodeId,isTravel=true)=>{
    const ctx=getCampusExplorationCtx();
    const { lines, effects }=rollTravelExploration(nodeId,ctx);
    const extra=[];
    if(effects.ingredientGrant||effects.foodGrant) grantExplorationReward({...effects.ingredientGrant,...(effects.foodGrant?{foodId:effects.foodGrant}:{})});
    if(Math.random()<CAMPUS_CONFIG.itemFindChance*0.5){
      const item=rollWeeklyItem();
      setInventory(prev=>({...prev,[item.id]:Math.min(INVENTORY_CONFIG.maxStack,(prev[item.id]||0)+1)}));
      extra.push(`🎒 You come across ${item.emoji} ${item.label.toLowerCase()} — into the pantry it goes.`);
    }
    let exploration=campusState.exploration||defaultCampusExplorationState();
    if(isTravel&&exploration.elaraMet){
      const quest=advanceElaraQuestAtNode(exploration,nodeId,ctx);
      exploration=applyExplorationQuestReward(quest.exploration);
      if(quest.lines?.length) extra.push(...quest.lines);
      if(quest.completed&&quest.reward?.findId){
        const find=getExplorationFind(quest.reward.findId);
        if(find) grantExplorationReward(find.grants);
      }
      if(quest.completed&&quest.reward?.relationship){
        setStudents(prev=>prev.map(s=>s.id===ELARA_ID?{...s,relationship:Math.min(100,s.relationship+(quest.reward.relationship||0))}:s));
      }
    }
    return { lines:[...lines,...extra], exploration, deviceEncounter:effects.deviceEncounter||null };
  };

  const useCampusDevice=(encounter,deviceId,modeId)=>{
    if(!encounter) return;
    const exploration=campusState.exploration||defaultCampusExplorationState();
    let student=null;
    if(encounter.target.type==='student'){
      student=students.find(st=>st.id===encounter.target.studentId);
      if(!student){ campusLog(['⚠️ Target not found.']); return; }
    } else {
      student={
        name:encounter.target.name,
        archetype:encounter.target.archetype,
        lbs:encounter.target.lbs,
        psych:{},
      };
    }
    const result=applyCampusDeviceEncounter({
      encounter, deviceId, modeId, student, week, exploration, rng:Math.random,
    });
    if(!result.ok){ campusLog(['⚠️ Device use failed.']); return; }
    const def=DEVICES[deviceId];
    if(encounter.target.type==='student'&&result.student){
      applyStudentDeviceResult(encounter.target.studentId,{ ok:true, ...result, student:result.student },def,false);
    }
    if(result.scrutinyDelta) addScrutiny(result.scrutinyDelta);
    if(result.malfunction&&(result.malfunction.tier==='major'||result.malfunction.tier==='critical')){
      setMalfunctionPopup({
        studentName:encounter.target.name,tier:result.malfunction.tier,
        text:result.malfunction.text,deviceLabel:def?.label,
      });
    }
    setCampusState(prev=>({
      ...prev,
      activeEncounter:null,
      exploration:result.exploration||prev.exploration,
      log:[...prev.log,...(result.logLines||[])].slice(-CAMPUS_CONFIG.logLimit),
    }));
  };

  const dismissCampusEncounter=()=>{
    setCampusState(prev=>({
      ...prev,
      activeEncounter:null,
      log:[...prev.log,'…You let the opportunity pass.'].slice(-CAMPUS_CONFIG.logLimit),
    }));
  };

  const moveToCampusNode=(nodeId)=>{
    const from=CAMPUS_NODES[campusState.at];
    if(!from.exits.includes(nodeId)) return;
    const node=CAMPUS_NODES[nodeId];
    const { lines:eventLines, exploration, deviceEncounter }=rollCampusEvent(nodeId,true);
    const lines=[`→ You walk to ${node.emoji} ${node.label}.`,node.desc,...eventLines];
    setCampusState(prev=>({
      ...prev,
      at:nodeId,
      exploration,
      activeEncounter:deviceEncounter||null,
      log:[...prev.log,...lines].slice(-CAMPUS_CONFIG.logLimit),
    }));
  };

  const lookAround=()=>{
    const node=CAMPUS_NODES[campusState.at];
    const flavor=node.flavor[rnd(0,node.flavor.length-1)];
    const { lines:eventLines, exploration:eventExploration, deviceEncounter }=rollCampusEvent(campusState.at,false);
    const ctx=getCampusExplorationCtx();
    let exploration=eventExploration;
    const lines=[flavor,...eventLines];
    const observeSecrets=availableSecretsAtNode(campusState.at,exploration,ctx).filter(s=>s.solve==='observe');
    if(observeSecrets.length){
      const secret=observeSecrets[0];
      const count=(exploration.observeCounts?.[campusState.at]||0)+1;
      exploration={...exploration,observeCounts:{...exploration.observeCounts,[campusState.at]:count}};
      if(count>=(secret.observeCount||2)){
        exploration=applySecretSolve(exploration,secret.id);
        lines.push(`🔓 ${secret.discover}`);
        if(secret.reward?.findId){
          const find=getExplorationFind(secret.reward.findId);
          if(find){
            grantExplorationReward(find.grants);
            lines.push(`   + ${find.label}`);
          }
        }
      } else {
        lines.push(`…${secret.hint} (${count}/${secret.observeCount||2} observations)`);
      }
    }
    setCampusState(prev=>({
      ...prev,
      exploration,
      activeEncounter:deviceEncounter||prev.activeEncounter,
      log:[...prev.log,...lines].slice(-CAMPUS_CONFIG.logLimit),
    }));
  };

  const searchCampus=()=>{
    const nodeId=campusState.at;
    const ctx=getCampusExplorationCtx();
    const exploration=campusState.exploration||defaultCampusExplorationState();
    const { lines, effects, exploration: searched }=searchCampusLocation(nodeId,exploration,ctx);
    let next=searched;
    if(effects.solvedSecret) next=applySecretSolve(next,effects.solvedSecret);
    if(effects.ingredientGrant||effects.foodGrant) grantExplorationReward({...effects.ingredientGrant,...(effects.foodGrant?{foodId:effects.foodGrant}:{})});
    if(effects.discoverElara) next={...next,elaraDiscovered:true};
    commitCampusExploration(next,lines);
  };

  const beginElaraQuest=(questId)=>{
    const exploration=campusState.exploration||defaultCampusExplorationState();
    if(!exploration.elaraDiscovered){ campusLog(['⚠️ You have not found Indiana Bones yet.']); return; }
    if(!exploration.elaraMet){ campusLog(['⚠️ Talk to Indiana or open her profile before taking her quests.']); return; }
    if(exploration.questId){ campusLog(['⚠️ Finish your current exploration quest first.']); return; }
    const quest=availableElaraQuests(exploration,getCampusExplorationCtx()).find(q=>q.id===questId);
    if(!quest){ campusLog(['⚠️ That quest is not available yet.']); return; }
    const next=startElaraQuest(exploration,questId);
    commitCampusExploration(next,[`🗺️ Indiana nods. "${quest.desc}"`, `→ First stop: ${quest.steps[0].nodeId.replace(/_/g,' ')}.`]);
  };

  // ── INVENTORY ──────────────────────────────────────────────────
  const getStockedCompounds=()=>pharmacistState?getStockedCompoundIds(pharmacistState):[];

  const guardHungerInterrupt=(onProceed)=>{
    if(skipHungerCheckRef.current){
      skipHungerCheckRef.current=false;
      onProceed();
      return;
    }
    const hungerEff=aggregateSkillEffects(ownedSkills);
    const inter=pickInterruptStudent(students,hungerEff,weeklyArms);
    if(inter){
      if(weeklyArms.devouringStudentId===inter.id&&!weeklyArms.devouringConsumed){
        setWeeklyArms(prev=>({...prev,devouringConsumed:true}));
      }
      setStudents(prev=>prev.map(s=>s.id===inter.id?inter:s));
      pendingAfterInterruptRef.current=onProceed;
      setHungerInterrupt({studentId:inter.id,after:'resume'});
      return;
    }
    onProceed();
  };

  const executeItemFeed=(item,studentId,compoundId)=>{
    const target=students.find(st=>st.id===studentId);
    if(!target) return;
    const compoundLabel=compoundId?COMPOUNDS[compoundId]?.label:null;
    const fed=feedStudentCalories(target,item.cal,item.full,1,
      `${item.emoji} ${item.label}${compoundLabel?` + ${compoundLabel}`:''}`,
      compoundId?{compoundId}:{});
    if(!fed) return;
    setInventory(prev=>({...prev,[item.id]:prev[item.id]-1}));
    setStudents(prev=>prev.map(st=>st.id===studentId?fed:st));
    const line=ITEM_USE_LINES[rnd(0,ITEM_USE_LINES.length-1)](target,item);
    setTimeout(()=>push(`🎒 ${line}${compoundLabel?` (${compoundLabel})`:''}`),80);
  };

  const useItemOn=(item,studentId)=>{
    if((inventory[item.id]||0)<=0) return;
    const target=students.find(st=>st.id===studentId);
    if(!target) return;
    setItemTargetPicker(null);
    const compounds=getStockedCompounds();
    if(compounds.length>0){
      setCompoundFeedPicker({kind:'item',item,studentId});
      return;
    }
    executeItemFeed(item,studentId,null);
  };

  // ── CORRUPTION: hidden psyche progression (general actions only) ──
  const addCorruption=(s,amount)=>{
    const before=getCorruptionTier(s.corruption||0).id;
    const newC=Math.min(CORRUPTION_CONFIG.max,(s.corruption||0)+amount);
    const after=getCorruptionTier(newC).id;
    if(after>before&&CORRUPTION_TIER_UP_LINES[after]){
      setTimeout(()=>push(`🕯️ ${CORRUPTION_TIER_UP_LINES[after](s)}`),200);
    }
    return newC;
  };

  // ── STOMACH MODEL: feed calories + fullness instead of direct lbs ──
  // Returns the updated student, or null if she refused (over capacity).
  const feedStudentCalories=(s,calories,fullnessCost,extraRel=0,label="",opts={})=>{
    if(opts.compoundId){
      const stocked=getStockedCompoundIds(pharmacistState||{});
      if(!stocked.includes(opts.compoundId)){
        push(`⚠️ No ${COMPOUNDS[opts.compoundId]?.label||opts.compoundId} doses left — run a synthesis session.`);
        return null;
      }
    }
    const eff=aggregateSkillEffects(ownedSkills);
    const stageId=getStage(s.lbs).id;
    const cap=(s.stomachCapacity||GAIN_CONFIG.baseCapacity)+softStartBonus(ownedSkills,stageId);
    let fullMult=1;
    if(opts.compoundId){
      const preview=applyCompoundToFeed(s,opts.compoundId,{},pharmacistState);
      fullMult=preview.feedResult.fullMult??1;
    }
    const scaledFullEarly=Math.round(fullnessCost*fullMult);
    const wouldExceed=(s.fullness||0)+scaledFullEarly>cap;
    let forced=false;
    if(wouldExceed){
      if(eff.totalSurrender&&(s.corruption||0)>=90){
        forced=true;
      } else {
        const corruptionBonus=Math.min(0.30,(s.corruption||0)*CORRUPTION_CONFIG.resistancePerPoint);
        let chance=forceFeedChance(s,fullnessCost,spiritLevel)+corruptionBonus;
        chance+=eff.forceFeedBonus||0;
        chance+=eff.extremeBonus||0;
        if(Math.random()>=chance){
          const line=REFUSAL_LINES[rnd(0,REFUSAL_LINES.length-1)](s);
          push(`🚫 ${line}`);
          return null;
        }
        forced=true;
      }
      const line=FORCE_SUCCESS_LINES[rnd(0,FORCE_SUCCESS_LINES.length-1)](s);
      setTimeout(()=>push(`🔥 ${line}`),60);
    }
    let calMult=1+(eff.calorieBonus||0)+(eff.conversionBonus||0);
    if(opts.compoundId){
      const preview=applyCompoundToFeed(s,opts.compoundId,{},pharmacistState);
      calMult*=(preview.feedResult.calMult??1);
    }
    const scaledCals=Math.round(calories*(s.gainMultiplier||1)*profGainMult*calMult);
    const scaledFull=scaledFullEarly;
    if(label) push(`🍽️ ${label} — ${s.name}: +${scaledCals.toLocaleString()} cal (fullness ${Math.min(999,(s.fullness||0)+scaledFull)}/${cap})`);
    if(Math.random()<CORRUPTION_CONFIG.dialogueChance){
      const tier=getCorruptionTier(s.corruption||0);
      const lines=CORRUPTION_FEED_LINES[tier.id];
      setTimeout(()=>push(`💭 ${lines[rnd(0,lines.length-1)](s)}`),120);
    }
    let corruption=s.corruption||0;
    let relGain=extraRel+(forced?1:0);
    if(forced){
      const priorForceCount=s.timesForceFed||0;
      let corruptGain=CORRUPTION_CONFIG.perForceFeed;
      if(eff.corruptionRate) corruptGain=Math.round(corruptGain*(1+eff.corruptionRate));
      if(eff.cravingSubmission){ corruptGain+=1; relGain+=2; }
      if(eff.firstCrack&&priorForceCount===0) corruptGain+=eff.firstCrack;
      corruption=addCorruption(s,corruptGain);
    }
    let result={
      ...s,
      consumedCalories:(s.consumedCalories||0)+scaledCals,
      fullness:(s.fullness||0)+scaledFull,
      corruption,
      timesForceFed:forced?(s.timesForceFed||0)+1:(s.timesForceFed||0),
      relationship:Math.min(100,s.relationship+relGain),
      playerFedThisWeek:true,
    };
    if(opts.compoundId){
      const applied=applyCompoundToFeed(result,opts.compoundId,{},pharmacistState);
      result=applied.student;
      if(applied.feedResult.corruptionGain) result.corruption=addCorruption(result,applied.feedResult.corruptionGain);
      if(applied.feedResult.relGain) result.relationship=Math.min(100,result.relationship+(applied.feedResult.relGain||0));
      const dm=applied.feedResult.digestMult??1;
      if(dm>1) result.weeklyDigestMult=Math.max(result.weeklyDigestMult||1,dm);
      if(applied.flavor) setTimeout(()=>push(`💊 ${applied.flavor}`),90);
    }
    if(opts.compoundId&&pharmacistState){
      setPharmacistState(prev=>consumeCompoundDose(prev,opts.compoundId));
    }
    if(opts.compoundId){
      const compound=COMPOUNDS[opts.compoundId];
      if(compound?.immediateLbsGain){
        const [lo,hi]=compound.immediateLbsGain;
        const lbsGain=rnd(lo,hi);
        result=processStudentGain(result,lbsGain,0);
        setTimeout(()=>push(`💊 ${compound.label} — ${s.name} gains ${lbsGain} lbs immediately. Fullness unchanged.`),75);
      }
    }
    const hungerEff=aggregateSkillEffects(ownedSkills);
    return feedResolvesHunger(result,Boolean(opts.compoundId),hungerEff,weeklyArms);
  };

  const processStudentGain=(s,gain,extraRel=0)=>{
    const scaledGain=Math.round(gain*(s.gainMultiplier||1)*skillGainMult);
    const {newLbs,oldStageId,newStageId,narrativeEvents}=applyGainToStudent(s,scaledGain);
    if(newStageId>oldStageId){
      setTimeout(()=>push(`📣 ${s.name} reaches ${WEIGHT_STAGES[newStageId].label}! "${getAttitude({...s,lbs:newLbs}, week, pharmacistTextOpts(pharmacistState, week))}"`) ,50);
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
    const hungerEff=aggregateSkillEffects(ownedSkills);
    if(!skipHungerCheckRef.current){
      const inter=pickInterruptStudent(students,hungerEff,weeklyArms);
      if(inter){
        if(weeklyArms.devouringStudentId===inter.id&&!weeklyArms.devouringConsumed){
          setWeeklyArms(prev=>({...prev,devouringConsumed:true}));
        }
        setStudents(prev=>prev.map(s=>s.id===inter.id?inter:s));
        setHungerInterrupt({studentId:inter.id,after:"week"});
        return;
      }
    }
    skipHungerCheckRef.current=false;
    setWeeklyArms({devouringStudentId:null,mesmerizingStudentId:null,devouringConsumed:false});
    const newWeek=week+1;
    setWeek(newWeek);
    const newAp=Math.min(ap+5+skillApBonus,20);
    setAp(newAp);

    // Semester events
    const semEv=SEMESTER_EVENTS.find(e=>e.week===newWeek);

    // Random event (30% chance)
    let randomEv=Math.random()<0.3?RANDOM_EVENTS[rnd(0,RANDOM_EVENTS.length-1)]:null;

    // Decrement Reneé digestion timer each week
    if(cultivatorState?.digestWeeksLeft>0){
      setCultivatorState(prev=>prev?{...prev,digestWeeksLeft:Math.max(0,prev.digestWeeksLeft-1)}:null);
    }
    let updated=students.map(s=>{
      if(!studentReceivesPassiveGain(s)) return s;
      if(s.id===LILITH_ID) return processStudentGain(s,LILITH_PASSIVE_GAIN,0); // Lilith only gains passively
      if(s.id===10&&cultivatorState?.digestWeeksLeft>0) return s; // Reneé digesting — no passive gain
      let gain=rnd(1,3)+skillPassiveBonus;
      gain=Math.max(0,Math.round(gain*withdrawalGainMultiplier(s)));
      // Corruption-driven autonomous eating (willingness made flesh)
      const cTier=getCorruptionTier(s.corruption||0).id;
      if(cTier===1) gain+=rnd(CORRUPTION_CONFIG.tier2AutoLbs[0],CORRUPTION_CONFIG.tier2AutoLbs[1]);
      if(cTier===2) gain+=rnd(CORRUPTION_CONFIG.tier3AutoLbs[0],CORRUPTION_CONFIG.tier3AutoLbs[1]);
      if(semEv) gain+=rnd(semEv.gain[0],semEv.gain[1]);
      if(randomEv){
        if(randomEv.target==="class") gain+=rnd(randomEv.gain[0],randomEv.gain[1]);
        else if(randomEv.target==="single"){
          const vis=students.filter(st=>!st.hidden);
          if(vis.length&&s.id===vis[rnd(0,vis.length-1)].id) gain+=rnd(randomEv.gain[0],randomEv.gain[1]);
        }
      }
      // Evolved skill passive bonuses
      if(s.evolvedForm&&(s.evolvedSkills||[]).length>0){
        const evTree=EVOLVED_SKILL_TREES[s.evolvedForm]||[];
        const evPassive=evTree.filter(sk=>(s.evolvedSkills||[]).includes(sk.id)&&sk.passiveBonus).reduce((a,b)=>a+(b.passiveBonus||0),0);
        gain+=evPassive;
      }
      let ns=processStudentGain(s,gain,0);
      ns=tickPhysicalTraits(ns,ownedSkills);
      ns=tickHungerAddiction(ns,!!ns.playerFedThisWeek,hungerEff,weeklyArms);
      if(hungerEff.gluttonsInstinct){
        const cap=ns.stomachCapacity||GAIN_CONFIG.baseCapacity;
        if((ns.fullness||0)/cap>=0.7&&Math.random()<0.45) ns=adjustHunger(ns,1);
      }
      return {...ns,playerFedThisWeek:false};
    });
    if(pharmacistState?.campusFattening){
      updated=updated.map(s=>{
        if(!studentReceivesPassiveGain(s)) return s;
        const extra=rollCampusPassiveLbs(pharmacistState,rnd);
        return extra>0?processStudentGain(s,extra,0):s;
      });
    }
    let nextPharmacistState=pharmacistState?tickPharmacistWeek(pharmacistState):null;
    if(nextPharmacistState?.cultActive){
      nextPharmacistState=tickCultWeek(nextPharmacistState,updated,rnd);
      const cultTick=nextPharmacistState._cultWeekly;
      if(cultTick?.passiveAddictedGain>0){
        updated=updated.map(s=>{
          if(!studentReceivesPassiveGain(s)||(s.addictionLevel??0)<1) return s;
          return processStudentGain(s,cultTick.passiveAddictedGain,0);
        });
      }
      const { _cultWeekly, ...cleanPs }=nextPharmacistState;
      nextPharmacistState=cleanPs;
    }
    if(pharmacistState) setPharmacistState(nextPharmacistState);
    const deviceTickEvents=[];
    updated=updated.map(s=>{
      let ns=clearExpiredOverrides(s,newWeek);
      const tick=tickEquippedDevices(ns,newWeek,Math.random);
      ns=tick.student;
      if(tick.tickEvents?.length){
        deviceTickEvents.push(...tick.tickEvents);
      }
      if(ns._pendingGainLbs){
        const g=ns._pendingGainLbs;
        const{ _pendingGainLbs,...rest}=ns;
        ns=processStudentGain(rest,g,0);
      }
      return ns;
    });
    if(deviceTickEvents.length){
      setDeviceTickQueue({ events: deviceTickEvents, index: 0 });
    }
    if(labState){
      let nextLab=tickLabWeek(ensureNetwork(labState));
      if((nextLab.stage??1)>=2&&nextLab.network){
        const netTick=tickNetworkWeek(nextLab,updated,newWeek,Math.random);
        nextLab=netTick.labState;
        netTick.lines.forEach((line,idx)=>setTimeout(()=>push(line),80+idx*50));
        if(netTick.studentDeltas?.length){
          updated=updated.map(s=>{
            const d=netTick.studentDeltas.find(x=>x.studentId===s.id);
            if(!d) return s;
            let ns=processStudentGain(s,d.gainLbs,0);
            if(d.psychDelta) ns={...ns,psych:applyPsychDelta(ns.psych||{},d.psychDelta)};
            return ns;
          });
        }
        if(netTick.scrutinyDelta) addScrutiny(netTick.scrutinyDelta);
      }
      setLabState(normalizeLabTechState(nextLab));
    }
    if(pharmacistState?.campusFattening&&Math.random()<getCampusWeeklyEventChance(pharmacistState)){
      const campusEv=pickPharmacistCampusEvent(updated,{
        hasMayaHive:!!students.find(s=>s.evolvedForm==='delivery_hive'),
      });
      if(campusEv){
        setTimeout(()=>{
          if(campusEv.target==='class'){
            push(`🌿 ${campusEv.text()}`);
            setStudents(prev=>prev.map(s=>studentReceivesPassiveGain(s)?processStudentGain(s,scaleCampusEventGain(campusEv.gain,pharmacistState,rnd),0):s));
          }else{
            const gainTargets=updated.filter(studentReceivesPassiveGain);
            const target=gainTargets.length?gainTargets[rnd(0,gainTargets.length-1)]:null;
            if(target){
              push(`🌿 ${campusEv.text(target)}`);
              setStudents(prev=>prev.map(s=>s.id===target.id?processStudentGain(s,scaleCampusEventGain(campusEv.gain,pharmacistState,rnd),0):s));
            }
          }
        },180);
      }
    }
    // ── PANTRY RESTOCK ──
    {
      const drops=rnd(INVENTORY_CONFIG.weeklyDrops[0],INVENTORY_CONFIG.weeklyDrops[1]);
      const found=[];
      setInventory(prev=>{
        const next={...prev};
        for(let i=0;i<drops;i++){
          const item=rollWeeklyItem();
          if((next[item.id]||0)<INVENTORY_CONFIG.maxStack){next[item.id]=(next[item.id]||0)+1;found.push(item);}
        }
        return next;
      });
      if(found.length) setTimeout(()=>push(`🎒 Pantry restocked: ${found.map(i=>`${i.emoji} ${i.label}`).join(", ")}`),100);
    }
    // ── WEEKLY DIGESTION: convert this week's fed calories into weight ──
    const digestLines=[];
    updated=updated.map(s=>{
      if((s.consumedCalories||0)<=0&&(s.fullness||0)<=0&&!s.stuffedStreak) return s;
      const d=digestStudent(s);
      const oldStageId=getStage(s.lbs).id;
      let ns=s;
      if(d.lbsGained>0) ns=processStudentGain(s,d.lbsGained,0);
      const stagedUp=getStage(ns.lbs).id>oldStageId;
      const growth=applyCapacityGrowth(ns,d.lbsGained,stagedUp);
      const capacityGained=d.capacityGained+(growth.stomachCapacity-(ns.stomachCapacity||GAIN_CONFIG.baseCapacity));
      if(d.lbsGained>0||capacityGained>0){
        digestLines.push(`${ns.name} +${d.lbsGained} lbs${d.stuffed?" · stuffed all week":""}${capacityGained>0?` · capacity +${capacityGained}`:""}`);
      }
      let corruption=ns.corruption||0;
      if(d.stuffed) corruption=addCorruption({...ns,corruption},CORRUPTION_CONFIG.perStuffedWeek);
      if(stagedUp) corruption=addCorruption({...ns,corruption},CORRUPTION_CONFIG.perStageUp);
      let carriedFullness=0;
      let selfStuffChance=CORRUPTION_CONFIG.tier3SelfStuffChance;
      if(hungerEff.willingVessel&&getCorruptionTier(corruption).id===2) selfStuffChance=Math.min(1,selfStuffChance*2);
      if(getCorruptionTier(corruption).id===2&&Math.random()<selfStuffChance){
        carriedFullness=Math.round((growth.stomachCapacity+d.capacityGained)*1.15);
        const autoLine=CORRUPTION_AUTO_LINES[rnd(0,CORRUPTION_AUTO_LINES.length-1)](ns);
        setTimeout(()=>push(`💭 ${autoLine}`),250);
      }
      return {...ns,
        stomachCapacity:growth.stomachCapacity+d.capacityGained,
        capacityChunkProgress:growth.capacityChunkProgress,
        stuffedStreak:d.stuffedStreak,
        corruption,
        weeklyDigestMult:undefined,
        ...d.reset,
        fullness:carriedFullness,
      };
    });
    if(digestLines.length) setTimeout(()=>push(`🧬 Digestion — ${digestLines.join(" · ")}`),150);

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


    const evs=collectEvents(updated);
    setStudents(updated);
    // Admin notices visibly large students (hidden students like Lilith don't trigger scrutiny)
    const visibleCount=updated.filter(s=>!s.hidden&&getStage(s.lbs).id>=5).length;
    if(visibleCount>0) addScrutiny(visibleCount);
    // Devoted students passively cover scrutiny
    const devotedCount=updated.filter(s=>getTier(s.relationship).id>=3).length;
    if(devotedCount>0) setAdminScrutiny(prev=>Math.max(0,prev-devotedCount));
    if(skillScrutinyPassiveReduce>0) setAdminScrutiny(prev=>Math.max(0,prev-skillScrutinyPassiveReduce));
    if(evolvedScrutinyReduce>0) setAdminScrutiny(prev=>Math.max(0,prev-evolvedScrutinyReduce));
    push(`📅 Week ${newWeek} begins. ${newAp} AP available.`);
    if(semEv) setTimeout(()=>push(`🎉 Semester Event: ${semEv.title} — ${semEv.text}`),100);
    if(randomEv){
      const visForEv=updated.filter(st=>!st.hidden);
      if(visForEv.length) setTimeout(()=>push(`🎲 ${randomEv.text(visForEv[rnd(0,visForEv.length-1)])}`),150);
      if(randomEv.scrutinyHit) addScrutiny(randomEv.scrutinyHit);
    }
    if(evs.length){
      setGlobalStats(g=>({...g,narrativeCount:g.narrativeCount+evs.length}));
      setEventQueue(prev=>[...prev,...evs]);
    }
    // Competitive Gainer: auto-post to group chat each new week
    const priyaCG=updated.find(s=>s.evolvedForm==='competitive_gainer');
    if(priyaCG){
      setCompetitiveGainerState(prev=>{
        if(!prev) return prev;
        const msgs=generateCGChatMessages(priyaCG,updated,prev,newWeek);
        if(!msgs.length) return prev;
        return{...prev,chatLog:[...prev.chatLog,...msgs],lastChatWeek:newWeek};
      });
    }
    const mayaHive=updated.find(s=>s.evolvedForm==='delivery_hive');
    if(mayaHive){
      setMayaHiveState(prev=>{
        if(!prev) return createInitialHiveState(mayaHive.id);
        const rooms=getHiveControl(prev.rooms);
        const trickle=Math.max(1,Math.round(rooms*0.55));
        return {
          ...prev,
          hiveBiomass:prev.hiveBiomass+trickle,
          spiritResonance:prev.spiritResonance+Math.max(1,Math.floor(rooms/6)),
          log:[{tag:"[MayaHive_WeeklyTrickle]",text:`The conquered rooms feed the Central Nest between classes. +${trickle} Biomass.`,type:"system"},...prev.log].slice(0,40),
        };
      });
    }
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
    const s=students.find(st=>st.id===studentId);
    if(formId==='eating_streamer'){
      setStudents(prev=>prev.map(st=>{
        if(st.id!==studentId) return st;
        return {...ensureStreamFields(st),evolvedForm:formId,evolvedSkills:[],brand:null};
      }));
      const meta=EVOLVED_ACTIVITY_META[formId];
      push(`✦ ${s?.name||"She"} has found her path: ${meta?.label||formId}.`);
      setEvolutionModal(null);
      setStreamBrandPickState({studentId,required:true});
      return;
    }
    setStudents(prev=>prev.map(st=>st.id!==studentId?st:{...st,evolvedForm:formId,evolvedSkills:[]}));
    const meta=EVOLVED_ACTIVITY_META[formId];
    push(`✦ ${s?.name||"She"} has found her path: ${meta?.label||formId}.`);
    setEvolutionModal(null);
    if(formId==='chapter_hostess'){
      setChapterHostessState({
        stageIdx:0, prepDaysLeft:0,
        menuUnlocks:0, atmosphereUnlocks:0, guestUnlocks:0,
        sisters:SISTER_INITIAL_STATE.map(x=>({...x})),
        camille:{lbs:CAMILLE_INITIAL_LBS},
        hangoutOpen:false, hangoutStudentId:null, hangoutPhaseIdx:0, hangoutHistory:[],
        feastPrepOpen:false,
        feastLogOpen:false, feastLog:[], feastGainTotal:0, feastRelTotal:0, feastDone:false,
      });
    }
    if(formId==='cultivator'){
      setCultivatorState({
        testerName:null, testerStageId:6, testerLbs:TESTER_START_LBS,
        fatBar:0, suspicion:0, harvestsCompleted:0, usedNames:[],
        modalPhase:null, session:null, pendingStageUp:false,
        harvestType:null, harvestVignetteText:null, growthGain:0, growthVignetteText:null,
        digestWeeksLeft:0, digestTotalWeeks:0,
      });
    }
    if(formId==='community_researcher'){
      setCommunityResearcherState({
        thesisComplete:false, boardPhase:0,
        caseStudyStage:0, lastPairId:null, pairsUsed:[],
        modalPhase:null, activePairId:null, eventText:null,
        totalSuspicion:0, boardReactionPairId:null,
        chatMemberIdx:0, chatPhaseIdx:0, chatHistory:[], chatWon:[],
        thesisApproved:false, thesisRejected:false, finalReviewText:null,
      });
    }
    if(formId==='competitive_gainer'&&s){
      setCompetitiveGainerState(prev=>prev||initCompetitiveGainerState(s));
    }
    if(formId==='delivery_hive'&&s){
      setMayaHiveState(prev=>prev||createInitialHiveState(s.id));
    }
    if(formId==='pharmacist'){
      setPharmacistState(defaultPharmacistState());
    }
    if(formId==='machine_goddess'){
      setLabState(ensureNetwork(defaultLabState()));
      setDeviceInventory(defaultDeviceInventory());
    }
  };

  const doEvolvedActivity=(s)=>{
    if(!s.evolvedForm) return;
    if(s.evolvedForm==='chapter_hostess') return; // handled by custom panel UI
    if(s.evolvedForm==='cultivator') return; // handled by custom panel UI
    if(s.evolvedForm==='pharmacist') return; // handled by custom panel UI
    if(s.evolvedForm==='machine_goddess') return; // handled by custom panel UI
    if(s.evolvedForm==='community_researcher') return; // handled by custom panel UI
    if(s.evolvedForm==='feedee_creator'){ openCollabPartnerPicker(s); return; }
    if(s.evolvedForm==='psych_researcher'){
      if(s.researchSubjectId==null){ openResearchSubjectPicker(s); return; }
    }
    if(s.evolvedForm==='homeroom_queen'){
      const meta=EVOLVED_ACTIVITY_META['homeroom_queen']; if(!meta) return;
      if(ap<meta.apCost){push(`⚠️ Need ${meta.apCost} AP.`);return;}
      setAp(a=>a-meta.apCost);
      setHomeroomSessionState({daisyStudentId:s.id,ap:3,log:[],daisyGain:0,relAccum:0,classGainAccum:0,momGainAccum:0,suspDeltaAccum:0,activeActivity:null});
      return;
    }
    if(s.evolvedForm==='wife_lessons'){
      const meta=EVOLVED_ACTIVITY_META['wife_lessons']; if(!meta) return;
      if(ap<meta.apCost){push(`⚠️ Need ${meta.apCost} AP.`);return;}
      setAp(a=>a-meta.apCost);
      openWifeLessonsSession(s);
      return;
    }
    if(s.evolvedForm==='competitive_gainer'){
      const meta=EVOLVED_ACTIVITY_META['competitive_gainer']; if(!meta) return;
      if(ap<meta.apCost){push(`⚠️ Need ${meta.apCost} AP.`);return;}
      setAp(a=>a-meta.apCost);
      openCompetitiveGainerModal(s);
      return;
    }
    if(s.evolvedForm==='delivery_hive'){
      const meta=EVOLVED_ACTIVITY_META['delivery_hive']; if(!meta) return;
      if(ap<meta.apCost){push(`⚠️ Need ${meta.apCost} AP.`);return;}
      setAp(a=>a-meta.apCost);
      openMayaHive(s);
      return;
    }
    if(s.evolvedForm==='state_fair_queen'){
      // Training collaborations hub — AP is deducted when a session is confirmed inside the modal
      setFairTrainingState(prev=>({...prev, open:true, view:'main', mjStudentId:s.id, pendingCollab:null, pendingRecruits:null}));
      return;
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
    let text=rawText?(typeof rawText==='function'?rawText(s):rawText):"She's in her element.";
    if(s.evolvedForm==='eating_streamer'){
      const offCtx=createContext({subject:s,week});
      offCtx.d.brand=s.brand;
      offCtx.d.streamVoice=s.streamVoice||getStreamVoice(ensureStreamFields(s));
      offCtx.d.brandControl=getBrandControlTier(s.brandStreaks?.[s.brand]||0);
      const off=render('{destiny.offstream.activity}',offCtx);
      if(off) text=`${off}\n\n${text}`;
    }
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
        if(st.archetype===targetArch&&st.id!==studentId){
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
      if(!ending.startsContest&&!ending.startsMatch&&!ending.startsStream&&!ending.startsFairDay&&!ending.startsSession&&!ending.startsPresentation&&!ending.startsDelivery&&!ending.startsChallenge) push(`✦ ${s.name} — ${evDef.title}: +${totalGain} lbs · +${totalRel} rel`);
      // handle recipe unlock (homestead_queen)
      if(ending.unlockRecipe){
        setStudents(ss=>ss.map(st=>st.id===s.id?{...st,mjRecipes:[...(st.mjRecipes||[]),ending.unlockRecipe].filter((v,i,a)=>a.indexOf(v)===i)}:st));
      }
      const endText=typeof ending.text==='function'?ending.text(newHistory,s,totalGain):ending.text;
      setEvolvedEventState(prev=>({...prev,phaseIdx:nextPhase,history:newHistory,logLines:newLog,gainAccum:newGain,relAccum:newRel,done:true,endingText:endText,gainBonus:ending.gainBonus||0,relBonus:ending.relBonus||0,classGain:ending.classGain||0,momGain:ending.momGain||0,startsContest:!!ending.startsContest,startsMatch:!!ending.startsMatch,startsStream:!!ending.startsStream,startsFairDay:!!ending.startsFairDay,startsSession:!!ending.startsSession,startsPresentation:!!ending.startsPresentation,startsDelivery:!!ending.startsDelivery,startsChallenge:!!ending.startsChallenge}));
    } else {
      setEvolvedEventState(prev=>({...prev,phaseIdx:nextPhase,history:newHistory,logLines:newLog,gainAccum:newGain,relAccum:newRel}));
    }
  };

  const closeEvolvedEvent=()=>{
    if(evolvedEventState?.formId==='homeroom_queen'&&evolvedEventState.done){
      const {history,classGain=0,momGain=0}=evolvedEventState;
      // Calculate suspicion delta from flags in history
      const suspDelta=Object.entries(HOMEROOM_SUSPICION_DELTAS).reduce((acc,[flag,delta])=>acc+(history.includes(flag)?delta:0),0);
      setBatchBakerState(prev=>{
        const newSusp=Math.max(0,Math.min(10,prev.suspicion+suspDelta));
        const newClass=prev.classWeight+classGain;
        const newMom=prev.momWeight+momGain;
        // Determine new arc stage from NPC weight thresholds
        const [ct1,ct2,ct3]=HOMEROOM_THRESHOLDS.class;
        const [mt1,mt2,mt3]=HOMEROOM_THRESHOLDS.mom;
        let newStage=0;
        if(newClass>=ct1)newStage=1;
        if(newMom>=mt1)newStage=2;
        if(newClass>=ct2)newStage=3;
        if(newMom>=mt2)newStage=4;
        if(newClass>=ct3&&newMom>=mt3)newStage=5;
        return{classWeight:newClass,momWeight:newMom,suspicion:newSusp,stage:Math.max(prev.stage,newStage)};
      });
    }
    setEvolvedEventState(null);
  };

  // ── HOMEROOM QUEEN handlers ───────────────────────────────────────
  const openHomeroomConference=(studentKey)=>{
    if(!homeroomSessionState||homeroomSessionState.ap<1||homeroomSessionState.activeActivity) return;
    setHomeroomSessionState(prev=>({...prev,ap:prev.ap-1,activeActivity:{type:'conference',key:studentKey,phaseIdx:0,history:[],done:false,resultText:null,revealsWeights:false,revealsParentWeights:false}}));
  };
  const startHomeroomGroupActivity=(actKey)=>{
    if(!homeroomSessionState||homeroomSessionState.activeActivity) return;
    const actDef=HOMEROOM_GROUP_ACTIVITIES[actKey]; if(!actDef) return;
    if(homeroomSessionState.ap<actDef.apCost) return;
    setHomeroomSessionState(prev=>({...prev,ap:prev.ap-actDef.apCost,activeActivity:{type:actKey,key:actKey,phaseIdx:0,history:[],done:false,resultText:null,revealsWeights:false,revealsParentWeights:false}}));
  };
  const makeHomeroomActivityChoice=(choiceId)=>{
    if(!homeroomSessionState?.activeActivity) return;
    const{type,key,phaseIdx,revealsWeights:prevRevW,revealsParentWeights:prevRevPW}=homeroomSessionState.activeActivity;
    let choice,hasNextPhase=false;
    if(type==='conference'){
      const evDef=HOMEROOM_CONFERENCE_EVENTS[key]; if(!evDef) return;
      choice=evDef.choices.find(c=>c.id===choiceId); if(!choice) return;
    } else {
      const actDef=HOMEROOM_GROUP_ACTIVITIES[type]; if(!actDef) return;
      const phases=actDef.phases||[{text:actDef.text,choices:actDef.choices||[]}];
      const phase=phases[phaseIdx]; if(!phase) return;
      choice=phase.choices.find(c=>c.id===choiceId); if(!choice) return;
      hasNextPhase=phaseIdx+1<phases.length;
    }
    const resultText=typeof choice.result==='function'?choice.result():choice.result;
    setHomeroomSessionState(prev=>({
      ...prev,
      daisyGain:prev.daisyGain+(choice.lbs||0),
      relAccum:prev.relAccum+(choice.rel||0),
      classGainAccum:prev.classGainAccum+(choice.classGain||0),
      momGainAccum:prev.momGainAccum+(choice.momGain||0),
      suspDeltaAccum:prev.suspDeltaAccum+(choice.suspDelta||0),
      activeActivity:{...prev.activeActivity,phaseIdx:hasNextPhase?phaseIdx+1:phaseIdx,history:[...prev.activeActivity.history,choiceId],resultText,done:!hasNextPhase,revealsWeights:prevRevW||!!choice.revealsWeights,revealsParentWeights:prevRevPW||!!choice.revealsParentWeights},
    }));
  };
  const advanceHomeroomActivityPhase=()=>{
    if(!homeroomSessionState?.activeActivity) return;
    setHomeroomSessionState(prev=>({...prev,activeActivity:{...prev.activeActivity,resultText:null}}));
  };
  const dismissHomeroomActivity=()=>{
    if(!homeroomSessionState?.activeActivity?.done) return;
    const{activeActivity}=homeroomSessionState;
    const confLabel=activeActivity.key?.replace(/_/g," ")||activeActivity.key;
    const logLine=activeActivity.type==='conference'?`✦ Conference — ${confLabel}`:activeActivity.type==='parent_meeting'?`✦ Parent Group Meeting`:activeActivity.type==='health_unit'?`✦ Health Unit — Measurements`:`✦ Activity`;
    setHomeroomSessionState(prev=>({...prev,log:[...prev.log,logLine],activeActivity:null}));
  };
  const closeHomeroomSession=()=>{
    if(!homeroomSessionState) return;
    const{daisyStudentId,daisyGain,relAccum,classGainAccum,momGainAccum,suspDeltaAccum}=homeroomSessionState;
    if(daisyGain>0||relAccum>0){
      setStudents(prev=>prev.map(st=>{
        if(st.id!==daisyStudentId) return st;
        return processStudentGain(st,daisyGain,relAccum);
      }));
      if(daisyGain>0) push(`✦ Daisy — Classroom Session: +${daisyGain} lbs · +${relAccum} rel`);
    }
    if(classGainAccum>0||momGainAccum>0||suspDeltaAccum!==0){
      setBatchBakerState(prev=>{
        const newSusp=Math.max(0,Math.min(10,prev.suspicion+suspDeltaAccum));
        const newClass=prev.classWeight+classGainAccum;
        const newMom=prev.momWeight+momGainAccum;
        const[ct1,ct2,ct3]=HOMEROOM_THRESHOLDS.class;
        const[mt1,mt2,mt3]=HOMEROOM_THRESHOLDS.mom;
        let newStage=0;
        if(newClass>=ct1)newStage=1;
        if(newMom>=mt1)newStage=2;
        if(newClass>=ct2)newStage=3;
        if(newMom>=mt2)newStage=4;
        if(newClass>=ct3&&newMom>=mt3)newStage=5;
        return{classWeight:newClass,momWeight:newMom,suspicion:newSusp,stage:Math.max(prev.stage,newStage)};
      });
    }
    setHomeroomSessionState(null);
  };

  // ── MEASUREMENT FORMULA ───────────────────────────────────────────
  const getMeasurements=(lbs,bodyType)=>{
    const ex=Math.max(0,lbs-120);
    const pw=(x,e)=>x<=0?0:Math.pow(x,e);
    let waist=33+0.305*pw(ex,0.85);
    let thigh=20+0.227*pw(ex,0.777);
    let arm  =11+0.064*pw(ex,0.932);
    const hgM=Math.max(0.03,0.22-ex*0.0009);
    let bust=waist*(1+hgM);
    let hip =waist*(1+hgM);
    switch(bodyType){
      case'apple':
        waist=37+0.305*pw(ex,0.85);
        bust=waist;
        hip=waist*(1+Math.max(0.03,0.10-ex*0.0004));
        break;
      case'pear':
        bust=waist;
        hip=waist*1.40;
        thigh=thigh*1.15;
        break;
      case'mom_bod':
        waist=37+0.305*pw(ex,0.85);
        bust=waist*(1+hgM);
        hip=waist*1.25;
        thigh=thigh*1.25;
        arm=arm*1.15;
        break;
      case'straight':{
        const sm=Math.min(0.15,ex*0.001);
        bust=waist*(1+sm);
        hip=waist*(1+sm);
        thigh=18+0.227*pw(ex,0.777);
        break;}
      case'voluptuous':
        waist=37+0.305*pw(ex,0.85);
        bust=waist*1.25;
        hip=waist*1.25;
        thigh=thigh*1.25;
        arm=arm*1.15;
        break;
      case'athletic':
        waist=30+0.305*pw(ex,0.85);
        bust=waist;
        hip=waist*1.10;
        arm=14+0.064*pw(ex,0.932);
        break;
      default: break;
    }
    const r=v=>Math.round(v*10)/10;
    return{waist:r(waist),bust:r(bust),hip:r(hip),thigh:r(thigh),arm:r(arm)};
  };

  const getCGSpiritTier=(spirit)=>{
    return CG_CONFIG.spiritTiers.find(t=>spirit>=t.min&&spirit<=t.max)||CG_CONFIG.spiritTiers[0];
  };

  const getCGStageKey=(lbs)=>{
    const idx=Math.max(0,Math.min(CG_STAGE_KEYS.length-1,getStage(lbs).id-5));
    return CG_STAGE_KEYS[idx];
  };

  const formatCGText=(text,vars={})=>{
    if(!text) return "";
    return String(text).replace(/\{(\w+)\}/g,(_,key)=>vars[key]??`{${key}}`);
  };

  const initCompetitiveGainerState=(s)=>({
    priyaStudentId:s.id,
    spirit:0,
    chatLog:[],
    measuredStudentIds:[],
    measuredComparisons:{},
    lastChatWeek:week,
    corkboardVisitCount:0,
  });

  const bodypartLabel=(cat)=>cat==="hip"?"hips":cat==="bust"?"bust":cat==="thigh"?"thighs":cat==="arm"?"arms":cat;

  const buildCGComparisonPools=(cgState,allStudents=students)=>{
    const priya=allStudents.find(s=>s.id===cgState?.priyaStudentId);
    if(!priya) return {larger:[],close:[],smaller:[]};
    const priyaM={...getMeasurements(priya.lbs,priya.bodyType),weight:Math.round(priya.lbs)};
    const ids=(cgState?.measuredStudentIds||[]).length?cgState.measuredStudentIds:allStudents.filter(s=>s.id!==priya.id&&!s.hidden).map(s=>s.id);
    const pools={larger:[],close:[],smaller:[]};
    ids.forEach(id=>{
      const target=allStudents.find(s=>s.id===id);
      if(!target||target.id===priya.id||(target.hidden&&!lilithUnlocked)) return;
      const targetM={...getMeasurements(target.lbs,target.bodyType),weight:Math.round(target.lbs)};
      [...CG_CONFIG.categories,"weight"].forEach(cat=>{
        const pVal=priyaM[cat];
        const tVal=targetM[cat];
        if(!pVal||!tVal) return;
        const item={studentId:target.id,girlName:target.name,bodypart:bodypartLabel(cat),category:cat,priyaValue:pVal,targetValue:tVal};
        if(tVal>pVal*(1+CG_CONFIG.threatFraction)) pools.larger.push(item);
        else if(tVal>=pVal*(1-CG_CONFIG.threatFraction)) pools.close.push(item);
        else pools.smaller.push(item);
      });
    });
    return pools;
  };

  const pickCGComparison=(cgState,optId)=>{
    const pools=buildCGComparisonPools(cgState);
    const threatPool=[...pools.larger,...pools.close];
    const source=(optId==="taunt"||optId==="challenge")?threatPool:pools.smaller;
    if(source.length===0) return null;
    return source[Math.floor(Math.random()*source.length)];
  };

  // ── WIFE LESSONS handlers ─────────────────────────────────────────

  const _wlCheckStageAdvance=(state)=>{
    const{stage,daughters}=state;
    if(stage>=8) return state;
    const cap=WL_CONFIG.stageCaps[stage];
    const allCapped=Object.values(daughters).every(w=>w>=cap);
    if(allCapped) return{...state,stage:stage+1};
    return state;
  };

  const openWifeLessonsSession=(s)=>{
    setWifeLessonsState(prev=>{
      const base=prev||{
        mjStudentId:s.id,
        stage:1,
        daughters:{...WL_CONFIG.daughterStart},
        moms:{...WL_CONFIG.momStart},
        session:null,
      };
      return{...base,mjStudentId:s.id,session:{lessonChosen:false,mjGainAccum:0,relAccum:0,conversationState:null,log:[]}};
    });
  };

  const chooseWifeLessonsLesson=(lessonId)=>{
    setWifeLessonsState(prev=>{
      if(!prev?.session||prev.session.lessonChosen) return prev;
      const{stage}=prev;
      const lesson=WL_LESSONS[stage]?.find(l=>l.id===lessonId);
      if(!lesson) return prev;
      let newDaughters={...prev.daughters};
      Object.keys(newDaughters).forEach(k=>{
        let gain=lesson.daughterLbs;
        if(k==='Chloe'&&stage>=WL_CONFIG.chloeRivalFrom) gain=Math.round(gain*WL_CONFIG.chloeRivalMult);
        newDaughters[k]=newDaughters[k]+gain;
      });
      let newMoms={...prev.moms};
      Object.keys(newMoms).forEach(k=>{ newMoms[k]=newMoms[k]+lesson.momLbs; });
      const logLine=`${lesson.label}: all daughters +${lesson.daughterLbs} lbs, all moms +${lesson.momLbs} lbs, you +${lesson.mjLbs} lbs`;
      let next={...prev,daughters:newDaughters,moms:newMoms,
        session:{...prev.session,lessonChosen:true,mjGainAccum:prev.session.mjGainAccum+lesson.mjLbs,relAccum:prev.session.relAccum+(lesson.rel||0),log:[...prev.session.log,logLine]}};
      next=_wlCheckStageAdvance(next);
      return next;
    });
  };

  const startWifeLessonsConversation=(personKey)=>{
    setWifeLessonsState(prev=>{
      if(!prev?.session) return prev;
      const{stage}=prev;
      const isDaughter=['Emma','Chloe','Kezia','Lila'].includes(personKey);
      if(isDaughter&&stage<WL_CONFIG.daughtersFrom) return prev;
      const dialogues=WL_DIALOGUES[personKey];
      if(!dialogues) return prev;
      const stageIdx=isDaughter?(stage-WL_CONFIG.daughtersFrom):(stage-1);
      const entry=dialogues[stageIdx];
      if(!entry) return prev;
      const isCapped=isDaughter&&prev.daughters[personKey]>=WL_CONFIG.stageCaps[stage];
      const overtook=personKey==='Emma'||personKey==='Darlene'?prev.daughters.Chloe>prev.daughters.Emma:false;
      const greetingText=isCapped&&entry.cappedGreeting?entry.cappedGreeting:(overtook&&entry.overtookGreeting?entry.overtookGreeting:entry.greeting);
      return{...prev,session:{...prev.session,conversationState:{person:personKey,stageEntry:entry,optionIdx:null,subIdx:null,done:false,resultText:greetingText,atGreeting:true}}};
    });
  };

  const makeWifeLessonsConversationChoice=(optionIdx)=>{
    setWifeLessonsState(prev=>{
      if(!prev?.session?.conversationState) return prev;
      const cs=prev.session.conversationState;
      if(cs.atGreeting){
        return{...prev,session:{...prev.session,conversationState:{...cs,atGreeting:false,optionIdx:null,resultText:null}}};
      }
      const entry=cs.stageEntry;
      const opt=entry.options[optionIdx];
      if(!opt) return prev;
      if(opt.subs&&opt.subs.length>0){
        return{...prev,session:{...prev.session,conversationState:{...cs,optionIdx,subIdx:null,resultText:opt.text}}};
      }
      return prev;
    });
  };

  const makeWifeLessonsSubChoice=(subIdx)=>{
    setWifeLessonsState(prev=>{
      if(!prev?.session?.conversationState) return prev;
      const cs=prev.session.conversationState;
      const entry=cs.stageEntry;
      const opt=entry.options[cs.optionIdx];
      if(!opt?.subs?.[subIdx]) return prev;
      const sub=opt.subs[subIdx];
      const{outcome}=sub;
      let newDaughters={...prev.daughters};
      let newMoms={...prev.moms};
      let logLine='';
      if(outcome.daughterKey&&outcome.daughterLbs){
        newDaughters[outcome.daughterKey]=(newDaughters[outcome.daughterKey]||0)+outcome.daughterLbs;
        logLine=`${cs.person}: +${outcome.daughterLbs} lbs, you +${outcome.mjLbs} lbs`;
      } else if(outcome.momKey&&outcome.momLbs){
        newMoms[outcome.momKey]=(newMoms[outcome.momKey]||0)+outcome.momLbs;
        logLine=`${cs.person}: +${outcome.momLbs} lbs, you +${outcome.mjLbs} lbs`;
      }
      const mjGain=outcome.mjLbs||0;
      const relGain=outcome.rel||0;
      let next={...prev,daughters:newDaughters,moms:newMoms,
        session:{...prev.session,mjGainAccum:prev.session.mjGainAccum+mjGain,relAccum:prev.session.relAccum+relGain,
          log:[...prev.session.log,logLine],
          conversationState:{...cs,subIdx,done:true,resultText:sub.text}}};
      next=_wlCheckStageAdvance(next);
      return next;
    });
  };

  const dismissWifeLessonsConversation=()=>{
    setWifeLessonsState(prev=>{
      if(!prev?.session) return prev;
      return{...prev,session:{...prev.session,conversationState:null}};
    });
  };

  const closeWifeLessonsSession=()=>{
    setWifeLessonsState(prev=>{
      if(!prev?.session) return prev;
      const{mjStudentId,session,stage}=prev;
      const{mjGainAccum,relAccum}=session;
      if(mjGainAccum>0||relAccum>0){
        setStudents(sp=>sp.map(st=>{
          if(st.id!==mjStudentId) return st;
          return processStudentGain(st,mjGainAccum,relAccum);
        }));
        push(`✦ Wife Lessons Session — Stage ${stage}: you +${mjGainAccum} lbs · +${relAccum} rel`);
      }
      return{...prev,session:null};
    });
  };

  // ── COMPETITIVE GAINER handlers ──────────────────────────────────

  // Chat message generator — called on week advance and on manual chat check
  const generateCGChatMessages=(priya,allStudents,cgState,currentWeek)=>{
    const tier=getCGSpiritTier(cgState.spirit);
    const stageKey=getCGStageKey(priya.lbs);
    const msgs=[];
    const priyaM=getMeasurements(priya.lbs,priya.bodyType);
    // Priya's opening post
    const postTemplate=CG_CHAT_TEMPLATES.priyaPost[stageKey]?.[tier.label]||CG_CHAT_TEMPLATES.priyaPost.Heavy?.Invested;
    msgs.push({text:`[Priya] ${postTemplate} (${Math.round(priya.lbs)} lbs | waist ${priyaM.waist}" | bust ${priyaM.bust}" | hips ${priyaM.hip}")`,isProf:false,wk:currentWeek});
    // Select 3-5 visible students weighted by measurement history and threat proximity.
    const visible=allStudents.filter(s=>s.id!==priya.id&&(!s.hidden||s.id===15));
    const candidates=visible
      .map(s=>{
        const measured=cgState.measuredStudentIds.includes(s.id);
        const m=getMeasurements(s.lbs,s.bodyType);
        const threatScore=CG_CONFIG.categories.reduce((acc,cat)=>acc+(m[cat]>=priyaM[cat]*(1-CG_CONFIG.threatFraction)?2:0),0);
        return {s,score:(measured?4:0)+threatScore+Math.random()};
      })
      .sort((a,b)=>b.score-a.score)
      .slice(0,Math.min(5,Math.max(3,visible.length)))
      .map(x=>x.s);
    let threatDetected=false;
    candidates.forEach(s=>{
      const templates=CG_CHAT_TEMPLATES.girls[s.name]||CG_CHAT_TEMPLATES.girls.Brittany;
      const measured=cgState.measuredStudentIds.includes(s.id);
      const sM=getMeasurements(s.lbs,s.bodyType);
      let replyType;
      if(!measured) replyType='unmeasured';
      else if(CG_CONFIG.categories.some(cat=>sM[cat]>priyaM[cat]*(1+CG_CONFIG.threatFraction))||s.lbs>priya.lbs*1.05) { replyType='ahead'; threatDetected=true; }
      else if(CG_CONFIG.categories.some(cat=>sM[cat]>=priyaM[cat]*(1-CG_CONFIG.threatFraction))||s.lbs>priya.lbs*0.95) { replyType='close'; threatDetected=true; }
      else if(s.lbs>priya.lbs*0.80)  replyType='proud';
      else replyType='behind';
      const replyText=templates[replyType]||templates.behind||'...';
      msgs.push({text:`[${s.name}] ${replyText}`,isProf:false,wk:currentWeek});
    });
    // Priya follow-up
    const followupKey=threatDetected?'threatened':'leading';
    const followup=CG_CHAT_TEMPLATES.priyaFollowup[followupKey]?.[tier.label]||"The board is updated.";
    msgs.push({text:`[Priya] ${followup}`,isProf:false,wk:currentWeek});
    return msgs;
  };

  const openCompetitiveGainerModal=(s)=>{
    setCompetitiveGainerState(prev=>{
      const base=prev||initCompetitiveGainerState(s);
      return{...base,priyaStudentId:s.id,open:true,view:null,subState:null};
    });
  };

  const closeCGModal=()=>{
    setCompetitiveGainerState(prev=>prev?{...prev,open:false,view:null,subState:null}:prev);
  };

  const doCGCorkboard=()=>{
    setCompetitiveGainerState(prev=>{
      if(!prev) return prev;
      const tier=getCGSpiritTier(prev.spirit);
      const scenes=CG_CORKBOARD_SCENES[tier.label]||CG_CORKBOARD_SCENES.Invested;
      const idx=(prev.corkboardVisitCount||0)%scenes.length;
      const sceneText=scenes[idx];
      // Spirit gain: check if any visible student is within threat range
      const priya=students.find(st=>st.id===prev.priyaStudentId);
      let spiritGain=rnd(CG_CONFIG.spiritGainNeutral[0],CG_CONFIG.spiritGainNeutral[1]);
      if(priya){
        const priyaM=getMeasurements(priya.lbs,priya.bodyType);
        const visible=students.filter(s=>s.id!==priya.id&&(!s.hidden||lilithUnlocked));
        visible.forEach(s=>{
          const sM=getMeasurements(s.lbs,s.bodyType);
          CG_CONFIG.categories.forEach(cat=>{
            if(sM[cat]>=priyaM[cat]*(1-CG_CONFIG.threatFraction)){
              spiritGain+=rnd(CG_CONFIG.spiritGainThreat[0],CG_CONFIG.spiritGainThreat[1]);
            }
          });
        });
      }
      const nextSpirit=prev.spirit+spiritGain;
      const priyaNow=students.find(st=>st.id===prev.priyaStudentId);
      const chatMsgs=priyaNow?generateCGChatMessages(priyaNow,students,{...prev,spirit:nextSpirit},week):[];
      return{...prev,spirit:nextSpirit,corkboardVisitCount:(prev.corkboardVisitCount||0)+1,chatLog:[...prev.chatLog,...chatMsgs],lastChatWeek:week,view:'corkboard',subState:{sceneText,spiritGain}};
    });
  };

  const doCGSelfReview=()=>{
    setCompetitiveGainerState(prev=>{
      if(!prev) return prev;
      const priya=students.find(s=>s.id===prev.priyaStudentId);
      if(!priya) return prev;
      const tier=getCGSpiritTier(prev.spirit);
      const stageKey=getCGStageKey(priya.lbs);
      const entry=CG_MEASUREMENT_SCENES.selfReview[stageKey]?.[tier.label]||CG_MEASUREMENT_SCENES.selfReview.Heavy.Invested;
      const priyaM=getMeasurements(priya.lbs,priya.bodyType);
      const focus=entry.focus||"waist";
      const sceneText=formatCGText(entry.text||entry,{measurement:priyaM[focus]??Math.round(priya.lbs), measurementCategory:bodypartLabel(focus), priyaWeight:Math.round(priya.lbs)});
      const spiritGain=rnd(2,5);
      return{...prev,spirit:prev.spirit+spiritGain,view:'self_review',subState:{sceneText,spiritGain}};
    });
  };

  const openCGMeasurementPicker=()=>{
    setCompetitiveGainerState(prev=>prev?{...prev,view:'measurement_picker',subState:null}:prev);
  };

  const doCGMeasurement=(targetStudentId)=>{
    setCompetitiveGainerState(prev=>{
      if(!prev) return prev;
      const priya=students.find(s=>s.id===prev.priyaStudentId);
      const target=students.find(s=>s.id===targetStudentId);
      if(!priya||!target) return prev;
      const priyaM=getMeasurements(priya.lbs,priya.bodyType);
      const targetM=getMeasurements(target.lbs,target.bodyType);
      // Determine threats by category
      const threats=[];
      const reactions={};
      const tier=getCGSpiritTier(prev.spirit);
      CG_CONFIG.categories.forEach(cat=>{
        let rel='priya_larger';
        if(targetM[cat]>priyaM[cat]*(1+CG_CONFIG.threatFraction)){rel='priya_smaller';threats.push(cat);}
        else if(targetM[cat]>=priyaM[cat]*(1-CG_CONFIG.threatFraction)){rel='priya_equal';threats.push(cat);}
        const template=CG_MEASUREMENT_SCENES.reactions?.[rel]?.[tier.label]?.[cat]||`[MeasureReaction_${rel}_${cat}_${tier.label}]`;
        reactions[cat]={rel,text:formatCGText(template,{targetName:target.name, girlName:target.name, bodypart:bodypartLabel(cat)})};
      });
      const spiritGain=threats.length>0
        ? threats.length*rnd(CG_CONFIG.spiritGainThreat[0],CG_CONFIG.spiritGainThreat[1])
        : rnd(CG_CONFIG.spiritGainNeutral[0],CG_CONFIG.spiritGainNeutral[1]);
      const sceneText=`[MeasurementScene_${target.name}_S${getStage(target.lbs).id}]`;
      const newMeasured=prev.measuredStudentIds.includes(targetStudentId)
        ? prev.measuredStudentIds
        : [...prev.measuredStudentIds,targetStudentId];
      const measuredComparisons={...(prev.measuredComparisons||{}),[targetStudentId]:{week,priyaM,targetM,reactions,threats}};
      return{...prev,spirit:prev.spirit+spiritGain,measuredStudentIds:newMeasured,measuredComparisons,
        view:'measurement_result',
        subState:{targetStudentId,priyaM,targetM,sceneText,reactions,threats,spiritGain}};
    });
  };

  const doCGBinge=()=>{
    // 1 AP cost already deducted from the modal's "Push Priya's Gains" button
    setCompetitiveGainerState(prev=>{
      if(!prev) return prev;
      const priya=students.find(s=>s.id===prev.priyaStudentId);
      if(!priya) return prev;
      const tier=getCGSpiritTier(prev.spirit);
      const tierIdx=CG_CONFIG.spiritTiers.indexOf(tier);
      const stageId=Math.min(7,getStage(priya.lbs).id);
      const baseGain=CG_CONFIG.minBinge+(CG_CONFIG.maxBinge-CG_CONFIG.minBinge)*Math.min(1,(stageId-1)/6);
      const mult=CG_CONFIG.bingeSpiritMults[Math.max(0,tierIdx)];
      const gain=Math.round(baseGain*mult*(0.85+Math.random()*0.30));
      const stageKey=getCGStageKey(priya.lbs);
      const sceneText=CG_BINGE_SCENES[stageKey]?.[tier.label]||CG_BINGE_SCENES.Heavy.Invested;
      return{...prev,view:'binge',subState:{gain,sceneText,done:false}};
    });
  };

  const applyAndCloseCGBinge=()=>{
    setCompetitiveGainerState(prev=>{
      if(!prev?.subState?.gain) return prev?{...prev,view:null,subState:null}:prev;
      const{gain}=prev.subState;
      setStudents(sp=>sp.map(s=>{
        if(s.id!==prev.priyaStudentId) return s;
        return processStudentGain(s,gain,0);
      }));
      push(`📊 Priya — Competitive Binge: +${gain} lbs`);
      return{...prev,view:null,subState:null};
    });
  };

  const cgProfessorReply=(optId)=>{
    const opt=CG_CHAT_TEMPLATES.professorReplies.find(r=>r.id===optId);
    if(!opt) return;
    setCompetitiveGainerState(prev=>{
      if(!prev) return prev;
      const priya=students.find(s=>s.id===prev.priyaStudentId);
      const stageKey=priya?getCGStageKey(priya.lbs):"Heavy";
      const comparison=pickCGComparison(prev,optId);
      const template=comparison?(opt.byStage?.[stageKey]||opt.fallback):opt.fallback;
      const text=formatCGText(template,{
        girlName:comparison?.girlName||"the class",
        bodypart:comparison?.bodypart||"measurements",
        priyaValue:comparison?.priyaValue,
        targetValue:comparison?.targetValue,
      });
      const msg={text:`[You] ${text}`,isProf:true,wk:week};
      return{...prev,spirit:prev.spirit+opt.spiritDelta,chatLog:[...prev.chatLog,msg]};
    });
  };

  // ── MAYA DELIVERY HIVE handlers ─────────────────────────────────
  const openMayaHive=(s)=>{
    setMayaHiveState(prev=>{
      const base=prev||createInitialHiveState(s.id);
      return {...base,mayaStudentId:s.id,open:true,view:"main",subState:null};
    });
  };

  const closeMayaHive=()=>{
    setMayaHiveState(prev=>prev?{...prev,open:false,view:"main",subState:null}:prev);
  };

  const chooseHiveVP=(vpId)=>{
    const opt=HIVE_VPS[vpId];
    if(!opt) return;
    if(opt.studentId===15&&!lilithUnlocked){push("⚠️ Lilith is not available yet.");return;}
    setMayaHiveState(prev=>{
      if(!prev) return prev;
      if(prev.vpId===vpId) return {...prev,view:"main"};
      const switching=!!prev.vpId;
      const cost=switching?25:0;
      if(prev.hiveBiomass<cost){
        push(`⚠️ Need ${cost} Hive Biomass to change VP.`);
        return prev;
      }
      const tag=makeHiveTag("VPChoice",{mayaStage:"Any",vpId,rooms:getHiveControl(prev.rooms),bmiTier:getHiveBmiTier(prev.avgBmi),task:"vp",roomId:prev.selectedRoomId});
      push(`🕸️ Maya names ${opt.name} Vice Queen.`);
      return {
        ...prev,
        vpId,
        hiveBiomass:prev.hiveBiomass-cost,
        view:"main",
        log:[{tag,text:`${opt.name} moves into the Central Nest as Vice Queen. ${opt.passive}`,type:"vp"},...prev.log].slice(0,40),
      };
    });
  };

  const adjustHiveAssignment=(taskId,delta)=>{
    setMayaHiveState(prev=>{
      if(!prev) return prev;
      const current=prev.assignments[taskId]||0;
      const assigned=Object.values(prev.assignments).reduce((a,b)=>a+b,0);
      if(delta>0&&assigned>=prev.members) return prev;
      const nextValue=Math.max(0,current+delta);
      return {...prev,assignments:{...prev.assignments,[taskId]:nextValue}};
    });
  };

  const executeMayaHiveShift=()=>{
    setMayaHiveState(prev=>{
      if(!prev) return prev;
      const maya=students.find(s=>s.id===prev.mayaStudentId);
      if(!maya) return prev;
      const assigned=Object.values(prev.assignments).reduce((a,b)=>a+b,0);
      if(assigned>prev.members){push("⚠️ Too many Hive members assigned.");return prev;}
      const next=executeHiveShift(prev,{mayaStageId:getStage(maya.lbs).id});
      const mayaGain=Math.max(2,Math.round((next.lastShift?.biomassGain||0)*0.32+getHiveControl(next.rooms)*0.2));
      setStudents(sp=>sp.map(s=>s.id===prev.mayaStudentId?processStudentGain(s,mayaGain,4):s));
      push(`🕸️ Maya — Delivery Hive Shift: +${mayaGain} lbs · Dorm Control ${Math.round((getHiveControl(next.rooms)/24)*100)}%`);
      // Modular-text intake scene when the shift recruits new bodies
      let withScene=next;
      const recruits=next.lastShift?.memberGain||0;
      if(recruits>0){
        const lilith=students.find(s=>s.id===LILITH_ID);
        if(lilith){
          const hiveBonus=getCampusHiveRecruitLbsBonus(pharmacistState);
          const victims=Array.from({length:Math.min(recruits,5)},()=>({
            name:"a dorm resident",
            lbs:Math.round(120+Math.random()*260+hiveBonus),
            bodyType:["pear","apple","hourglass","athletic","straight"][rnd(0,4)],
            corruption:0,relationship:0,
          }));
          const sceneText=renderHiveIntake(lilith,victims,week);
          const sceneTag=makeHiveTag("IntakeScene",{mayaStage:getStage(maya.lbs).label.replace(/\s+/g,""),vpId:next.vpId||"none",bmiTier:getHiveBmiTier(next.avgBmi),rooms:getHiveControl(next.rooms),task:"intake",roomId:next.selectedRoomId});
          withScene={...next,log:[{tag:sceneTag,text:sceneText,type:"scene"},...next.log].slice(0,40)};
        }
      }
      return {...withScene,lastShift:{...withScene.lastShift,mayaGain}};
    });
  };

  const doMayaHiveVisit=()=>{
    setMayaHiveState(prev=>{
      if(!prev) return prev;
      const maya=students.find(s=>s.id===prev.mayaStudentId);
      if(!maya) return prev;
      const mayaStage=getStage(maya.lbs).label.replace(/\s+/g,"");
      const bmiTier=getHiveBmiTier(prev.avgBmi);
      const rooms=getHiveControl(prev.rooms);
      const tag=makeHiveTag("CentralNestVisit",{mayaStage,vpId:prev.vpId||"none",bmiTier,rooms,task:"professor",roomId:prev.selectedRoomId});
      const gain=Math.round(8+getStage(maya.lbs).id*1.5+prev.hiveBiomass/35);
      const biomass=Math.round(gain*0.8);
      setStudents(sp=>sp.map(s=>s.id===prev.mayaStudentId?processStudentGain(s,gain,6):s));
      push(`🕸️ Maya — Central Nest Visit: +${gain} lbs`);
      return {
        ...prev,
        hiveBiomass:prev.hiveBiomass+biomass,
        spiritResonance:prev.spiritResonance+3,
        view:"visit",
        subState:{tag,gain,biomass,text:`${tag} The professor brings tribute directly to the Central Nest. Maya's quiet gravity accepts it, and the Hive records the warmth.`},
        log:[{tag,text:"Professor-directed feeding at the Central Nest.",type:"scene"},...prev.log].slice(0,40),
      };
    });
  };

  const doMayaHivePhoto=()=>{
    setMayaHiveState(prev=>{
      if(!prev) return prev;
      const maya=students.find(s=>s.id===prev.mayaStudentId);
      const mayaStage=maya?getStage(maya.lbs).label.replace(/\s+/g,""):"Unknown";
      const bmiTier=getHiveBmiTier(prev.avgBmi);
      const rooms=getHiveControl(prev.rooms);
      const tag=makeHiveTag("HiveStatePhoto",{mayaStage,vpId:prev.vpId||"none",bmiTier,rooms,task:"observation",roomId:prev.selectedRoomId});
      return {
        ...prev,
        spiritResonance:prev.spiritResonance+1,
        view:"photo",
        subState:{tag,text:`${tag} Maya documents the Hive: conquered rooms, delivery routes, soft bodies, and the faint gluttony-spirit pressure visible in every lavender-lit corner.`},
        log:[{tag,text:"Hive State observation archived.",type:"photo"},...prev.log].slice(0,40),
      };
    });
  };

  const doMayaHiveAbsorb=()=>{
    setMayaHiveState(prev=>{
      if(!prev||prev.vpId!=="lilith"||prev.members<=1) return prev;
      const maya=students.find(s=>s.id===prev.mayaStudentId);
      if(!maya) return prev;
      const rooms=getHiveControl(prev.rooms);
      const mayaStage=getStage(maya.lbs).label.replace(/\s+/g,"");
      const bmiTier=getHiveBmiTier(prev.avgBmi);
      const gain=Math.round(22+getStage(maya.lbs).id*4+rooms*1.5);
      const tag=makeHiveTag("LilithAbsorption",{mayaStage,vpId:"lilith",bmiTier,rooms,task:"absorb",roomId:prev.selectedRoomId});
      setStudents(sp=>sp.map(s=>s.id===prev.mayaStudentId?processStudentGain(s,gain,3):s));
      push(`🌑 Maya's Hive absorbs a devotee: +${gain} lbs`);
      return {
        ...prev,
        members:prev.members-1,
        hiveBiomass:prev.hiveBiomass+gain,
        spiritResonance:prev.spiritResonance+6,
        log:[{tag,text:"Lilith guides one devotee into Maya's stored biomass.",type:"absorb"},...prev.log].slice(0,40),
      };
    });
  };

  // ── CHAPTER HOSTESS handlers ──────────────────────────────────────
  const openHostessHangout=(studentId)=>{
    if(!chapterHostessState||chapterHostessState.prepDaysLeft<=0) return;
    setChapterHostessState(prev=>({...prev,hangoutOpen:true,hangoutStudentId:studentId,hangoutPhaseIdx:0,hangoutHistory:[]}));
  };
  const makeHostessHangoutChoice=(choiceId)=>{
    if(!chapterHostessState) return;
    const{hangoutStudentId,hangoutPhaseIdx}=chapterHostessState;
    const keyMap={2:'kylie',4:'fiona',10:'renee'};
    const key=keyMap[hangoutStudentId]; if(!key) return;
    const unlockIdx=key==='kylie'?chapterHostessState.guestUnlocks:key==='renee'?chapterHostessState.menuUnlocks:chapterHostessState.atmosphereUnlocks;
    const vignette=HOSTESS_HANGOUTS[key]?.[unlockIdx]; if(!vignette) return;
    if(hangoutPhaseIdx===0){
      setChapterHostessState(prev=>({...prev,hangoutPhaseIdx:1,hangoutHistory:[choiceId]}));
    } else {
      // Complete hangout — apply unlock and decrement days
      const bonus=vignette.gainBonus||0;
      const relBonus=vignette.relBonus||0;
      const tiffany=students.find(s=>s.evolvedForm==='chapter_hostess');
      if(tiffany){
        setStudents(prev=>prev.map(s=>s.id===tiffany.id?{...s,lbs:s.lbs+bonus,relationship:Math.min(100,s.relationship+relBonus)}:s));
        push(`✦ ${['Kylie','Fiona','Reneé'][[2,4,10].indexOf(hangoutStudentId)]} hangout — +${bonus} lbs · +${relBonus} rel`);
      }
      setChapterHostessState(prev=>{
        const newDays=Math.max(0,prev.prepDaysLeft-1);
        const newMenu=key==='renee'?Math.min(5,prev.menuUnlocks+1):prev.menuUnlocks;
        const newAtmo=key==='fiona'?Math.min(5,prev.atmosphereUnlocks+1):prev.atmosphereUnlocks;
        const newGuest=key==='kylie'?Math.min(5,prev.guestUnlocks+1):prev.guestUnlocks;
        return{...prev,prepDaysLeft:newDays,menuUnlocks:newMenu,atmosphereUnlocks:newAtmo,guestUnlocks:newGuest,hangoutOpen:false,hangoutStudentId:null,hangoutPhaseIdx:0,hangoutHistory:[]};
      });
    }
  };
  const openFeastPrep=()=>{
    if(!chapterHostessState) return;
    setChapterHostessState(prev=>({...prev,feastPrepOpen:true}));
  };
  const beginFeast=()=>{
    if(!chapterHostessState) return;
    const{stageIdx,menuUnlocks,atmosphereUnlocks,guestUnlocks,sisters,camille}=chapterHostessState;
    const{log,tiffanyGain,sisterGainMap,camilleGain,relGain}=generateFeastLog(stageIdx,menuUnlocks,atmosphereUnlocks,guestUnlocks,sisters,camille);
    const finalLog=(stageIdx>=1&&!lilithClueFound)?[...log,{text:CLUE_FEAST_LINE,type:'scene'}]:log;
    setChapterHostessState(prev=>({...prev,feastPrepOpen:false,feastLogOpen:true,feastLog:finalLog,feastGainTotal:tiffanyGain,feastRelTotal:relGain,feastDone:false,pendingSisterGains:sisterGainMap,pendingCamilleGain:camilleGain}));
  };
  const completeFeast=()=>{
    if(!chapterHostessState) return;
    const{stageIdx,feastGainTotal,feastRelTotal,pendingSisterGains,pendingCamilleGain,sisters,camille}=chapterHostessState;
    const tiffany=students.find(s=>s.evolvedForm==='chapter_hostess');
    if(tiffany){
      setStudents(prev=>prev.map(s=>s.id===tiffany.id?{...s,lbs:s.lbs+feastGainTotal,relationship:Math.min(100,s.relationship+feastRelTotal)}:s));
      push(`✦ ${tiffany.name} — Wednesday Feast: +${feastGainTotal} lbs · +${feastRelTotal} rel`);
    }
    const newStageIdx=Math.min(5,stageIdx+1);
    const newPrepDays=newStageIdx<6?3:0;
    const newSisters=sisters.map(sis=>({...sis,lbs:sis.lbs+(pendingSisterGains?.[sis.name]||0)}));
    const newCamilleLbs=camille.lbs+(pendingCamilleGain||0);
    setChapterHostessState(prev=>({...prev,stageIdx:newStageIdx,prepDaysLeft:newPrepDays,sisters:newSisters,camille:{lbs:newCamilleLbs},feastLogOpen:false,feastLog:[],feastGainTotal:0,feastRelTotal:0,feastDone:false,pendingSisterGains:null,pendingCamilleGain:0}));
    if(stageIdx>=1&&!lilithClueFound){ setLilithClueFound(true); setLilithClueModal('feast_clue'); }
  };

  // ── LILITH / FEASTING BEAUTY handlers ─────────────────────────────
  const LILITH_DORM_TEXT=(stageId)=>{
    if(stageId>=7) return "Getting out of the room takes a moment. Then the night air finds you, all of you — your chest leading, the cold biting exposed skin first, the rest of you following into the dark. The campus is quiet. You are hungry enough to go anyway.";
    if(stageId>=3) return "You turn the door handle and step out into the corridor. The cool air hits your skin all at once — there's a great deal of skin now — your cleavage catching the breeze first, then the rest of you following into the night. You are hungry. You decide to go somewhere the hunger can find what it needs.";
    return "The door clicks shut behind you. You step out into the corridor and the cold air hits — every exposed inch of you, and there is a great deal exposed tonight. Your cleavage catches the chill first. The campus spreads out ahead, mostly dark, mostly quiet. You are hungry. You are always hungry.";
  };
  const LILITH_TRAVEL={
    'dorm→quad':"You follow the main path out to the open quad. Lampposts at intervals, pools of orange light between stretches of dark.",
    'quad→dorm':"The familiar corridor. Room 312. The scent of incense and something you won't name.",
    'quad→dining_hall':"The fluorescent glow of the dining hall bleeds through its windows. You push through the double doors into the smell of institutional food and distracted people.",
    'quad→campus_park':"The campus park loop is mostly dark at this hour. The pond reflects the sky. A few shapes moving along the path.",
    'quad→admin':"The admin building's lobby is still half-lit. Men with ambition and nowhere useful to put it.",
    'quad→crossroads':"The south path slopes down to where it splits. The bench with the broken slat. The particular energy of people deciding which way to go.",
    'dining_hall→quad':"Back out through the double doors. The night air again.",
    'dining_hall→dorm_row':"The back exit leads to the long corridor of residence halls. Music from three directions. Doors propped open.",
    'dorm_row→dining_hall':"Back toward the warm fluorescent glow of the dining hall.",
    'crossroads→quad':"Back up the south path toward the quad.",
    'crossroads→gym':"Glass walls ahead, the gym lights still burning. You push through the door into the warmth and effort.",
    'crossroads→library':"The library's pale glow is steady and calm. You pass through the entrance, into the quiet.",
    'crossroads→frat_row':"Three houses ahead, music from two of them. You approach.",
    'crossroads→coffee_shop':"String lights still on. The playlist is too loud. You step inside into espresso and pretension.",
    'gym→crossroads':"Back out through the glass doors. The night air cold after the gym's warmth.",
    'library→crossroads':"Back through the entrance, out into the quiet of the night.",
    'frat_row→crossroads':"You leave the houses behind. Back toward the crossroads.",
    'coffee_shop→crossroads':"Out from the string lights, back into the dark.",
    'campus_park→quad':"The loop brings you back around toward the quad.",
    'admin→quad':"Back out through the lobby doors.",
  };
  const openLilithHunt=()=>{
    const lilith=students.find(s=>s.id===LILITH_ID); if(!lilith) return;
    const stageId=getStage(lilith.lbs).id;
    if(stageId>=9){
      setLilithHuntState({textLog:[{text:"ROOM 312 — DELIVERY",type:'location'},{text:DELIVERY_SCENE,type:'narrative'}],currentNode:'dorm',encounter:null,deliveryMode:true,deliveryDone:false});
      return;
    }
    setLilithHuntState({textLog:[{text:"HER DORM · ROOM 312",type:'location'},{text:LILITH_DORM_TEXT(stageId),type:'narrative'}],currentNode:'dorm',encounter:null,deliveryMode:false,deliveryDone:false});
  };
  const navigateHunt=(nodeId)=>{
    const node=HUNT_NODES[nodeId]; if(!node) return;
    const fromNode=lilithHuntState?.currentNode||'dorm';
    const travelKey=`${fromNode}→${nodeId}`;
    const travelText=LILITH_TRAVEL[travelKey]||null;
    const entries=[];
    if(travelText) entries.push({text:travelText,type:'action'});
    entries.push({text:node.label.toUpperCase(),type:'location'});
    entries.push({text:node.desc,type:'narrative'});
    setLilithHuntState(prev=>({...prev,currentNode:nodeId,encounter:null,textLog:[...prev.textLog,...entries]}));
  };
  const approachMan=(manId)=>{
    const lilith=students.find(s=>s.id===LILITH_ID); if(!lilith) return;
    const man=HUNT_MEN.find(m=>m.id===manId); if(!man) return;
    const stageId=getStage(lilith.lbs).id;
    const diff=getEffectiveDifficulty(man.difficulty,stageId);
    const willpower=WILLPOWER_START[diff]??45;
    const maxApprehension=MAX_APPREHENSION[diff]??5;
    const firstLine=getGuyLine(diff,willpower);
    const replies=drawReplies([]);
    const entries=[
      {text:`${man.name.toUpperCase()} — ${man.tag}`,type:'location'},
      {text:man.desc(stageId),type:'narrative'},
      {text:firstLine,type:'guy'},
    ];
    setLilithHuntState(prev=>({...prev,
      encounter:{manId,diff,willpower,apprehension:0,maxApprehension,
        failed:false,consumed:false,won:false,
        mode:'idle',replyOptions:replies,usedReplyIds:[],
        turnIdx:0,currentLine:firstLine},
      textLog:[...prev.textLog,...entries]
    }));
  };
  const encounterSetMode=(mode)=>{
    setLilithHuntState(prev=>({...prev,encounter:{...prev.encounter,mode}}));
  };
  const makeReply=(option)=>{
    if(!lilithHuntState?.encounter) return;
    const{encounter}=lilithHuntState;
    if(encounter.won||encounter.failed||encounter.consumed) return;
    const logs=[{text:option.label,type:'action'}];
    let{willpower,apprehension}=encounter;
    if(option.effect==='bad') apprehension=apprehension+1;
    else willpower=Math.max(0,willpower+(option.wpDelta||0));
    const won=willpower<=0;
    const failed=apprehension>=encounter.maxApprehension;
    if(won) logs.push({text:"His resistance is gone.",type:'system'});
    else if(failed) logs.push({text:"He pulls away. Something felt wrong.",type:'system'});
    else{
      const nextLine=getGuyLine(encounter.diff,willpower);
      logs.push({text:nextLine,type:'guy'});
    }
    const newUsedIds=[...encounter.usedReplyIds,option.id];
    const newReplies=drawReplies(newUsedIds);
    setLilithHuntState(prev=>({...prev,
      encounter:{...prev.encounter,willpower,apprehension,won,failed,
        mode:'idle',replyOptions:newReplies,usedReplyIds:newUsedIds,
        turnIdx:prev.encounter.turnIdx+1},
      textLog:[...prev.textLog,...logs]
    }));
  };
  const makeSeduction=(moveId)=>{
    if(!lilithHuntState?.encounter) return;
    const lilith=students.find(s=>s.id===LILITH_ID); if(!lilith) return;
    const move=PHYSICAL_MOVES[moveId]; if(!move) return;
    const{encounter}=lilithHuntState;
    if(encounter.won||encounter.failed||encounter.consumed) return;
    const stageId=getStage(lilith.lbs).id;
    const stageBand=stageId>=7?2:stageId>=3?1:0;
    const success=Math.random()<seduceSuccessChance(encounter.willpower,move.power||0);
    const logs=[{text:move.vignette(stageBand),type:'action'}];
    let{willpower,apprehension}=encounter;
    if(success){const wpDrop=Math.round(25+Math.random()*10);willpower=Math.max(0,willpower-wpDrop);}
    const won=willpower<=0;
    let newApp=apprehension;
    if(!success&&Math.random()<0.5) newApp=Math.min(encounter.maxApprehension,apprehension+1);
    const failed=newApp>=encounter.maxApprehension;
    if(won) logs.push({text:"He has no resistance left.",type:'system'});
    else if(failed) logs.push({text:"He pulls away. Something felt too strange.",type:'system'});
    else{const nextLine=getGuyLine(encounter.diff,willpower);logs.push({text:nextLine,type:'guy'});}
    const newReplies=drawReplies(encounter.usedReplyIds);
    setLilithHuntState(prev=>({...prev,
      encounter:{...prev.encounter,willpower,apprehension:newApp,won,failed,mode:'idle',
        replyOptions:newReplies,turnIdx:prev.encounter.turnIdx+1},
      textLog:[...prev.textLog,...logs]
    }));
  };
  const consumeMan=()=>{
    const lilith=students.find(s=>s.id===LILITH_ID); if(!lilith) return;
    const stageId=getStage(lilith.lbs).id;
    const nextStage=WEIGHT_STAGES[Math.min(10,stageId+1)];
    const gain=nextStage&&nextStage.id>stageId?Math.max(1,nextStage.min-Math.round(lilith.lbs)+5):20;
    setStudents(prev=>prev.map(s=>s.id===LILITH_ID?{...s,lbs:s.lbs+gain}:s));
    setLilithKillCount(k=>k+1);
    push(`🌑 Lilith — hunt complete: +${gain} lbs`);
    const consumeText=getConsumeText(stageId);
    setLilithHuntState(prev=>({...prev,encounter:{...prev.encounter,consumed:true},textLog:[...prev.textLog,{text:consumeText,type:'narrative'},{text:`✦ +${gain} lbs`,type:'system'}]}));
  };
  const deliveryScene=()=>{
    const lilith=students.find(s=>s.id===LILITH_ID); if(!lilith) return;
    const stageId=getStage(lilith.lbs).id;
    const nextStage=WEIGHT_STAGES[Math.min(10,stageId+1)];
    const gain=nextStage&&nextStage.id>stageId?Math.max(1,nextStage.min-Math.round(lilith.lbs)+5):25;
    setStudents(prev=>prev.map(s=>s.id===LILITH_ID?{...s,lbs:s.lbs+gain}:s));
    setLilithKillCount(k=>k+1);
    push(`🌑 Lilith — delivery: +${gain} lbs`);
    setLilithHuntState(prev=>({...prev,deliveryDone:true,textLog:[...prev.textLog,{text:`✦ +${gain} lbs`,type:'system'},{text:"You pick up your phone. You order again.",type:'narrative'}]}));
  };
  const closeHunt=()=>setLilithHuntState(null);
  const investigateClue=()=>{
    if(ap<1){push("⚠️ Need 1 AP to investigate.");return;}
    setAp(prev=>prev-1);
    setLilithClueModal('result');
  };
  const confirmInvestigation=()=>{
    setLilithClueModal(null);
    setLilithUnlocked(true);
    push("🌑 She's on your roster now. Room 312.");
  };

  // ── CULTIVATOR handlers ──────────────────────────────────────────────────
  const openCultivatorRecruit=()=>{
    if(!cultivatorState) return;
    if(cultivatorState.harvestsCompleted>=4) return;
    if(cultivatorState.digestWeeksLeft>0) return;
    setCultivatorState(prev=>({...prev,modalPhase:'recruit_setup'}));
  };
  const confirmCultivatorRecruit=()=>{
    const cs=cultivatorState; if(!cs) return;
    const available=TESTER_NAMES.filter(n=>!cs.usedNames.includes(n));
    if(available.length===0) return;
    const name=available[Math.floor(Math.random()*available.length)];
    setCultivatorState(prev=>({
      ...prev,
      testerName:name, testerStageId:6, testerLbs:getCampusTesterStartLbs(pharmacistState),
      fatBar:0, suspicion:0, session:null, pendingStageUp:false,
      usedNames:[...prev.usedNames,name],
      modalPhase:null,
    }));
    push(`🍰 Reneé has selected a taste tester: ${name}.`);
  };
  const startCultivatorSession=(s)=>{
    if(!cultivatorState||!cultivatorState.testerName) return;
    if(cultivatorState.harvestsCompleted>=4) return;
    if(cultivatorState.digestWeeksLeft>0){push(`⚠️ Reneé is digesting — ${cultivatorState.digestWeeksLeft} week(s) remaining.`);return;}
    if(ap<1){push("⚠️ Need 1 AP.");return;}
    setAp(a=>a-1);
    setCultivatorState(prev=>({...prev,modalPhase:'session',session:{foodType:null,junctionIdx:-1,choices:[],log:[],sessionFatAccum:0,sessionSuspAccum:0,complete:false,eatingReaction:''}}));
  };
  const pickCultivatorFood=(foodType)=>{
    setCultivatorState(prev=>({...prev,session:{...prev.session,foodType,junctionIdx:0}}));
  };
  const makeCultivatorChoice=(choice)=>{
    const cs=cultivatorState; if(!cs||!cs.session) return;
    const{session}=cs;
    const recipe=RECIPES[session.foodType]; if(!recipe) return;
    const junction=recipe.junctions[session.junctionIdx]; if(!junction) return;
    const newFat=session.sessionFatAccum+choice.fatGain;
    const newSusp=session.sessionSuspAccum+choice.suspChange;
    const newChoices=[...session.choices,choice.id];
    const newLog=[...session.log,choice.desc];
    const nextIdx=session.junctionIdx+1;
    const isDone=nextIdx>=recipe.junctions.length;
    if(isDone){
      const reaction=getEatingReaction(Math.max(0,cs.suspicion+newSusp));
      setCultivatorState(prev=>({...prev,session:{...prev.session,choices:newChoices,log:newLog,sessionFatAccum:newFat,sessionSuspAccum:newSusp,complete:true,eatingReaction:reaction}}));
    } else {
      setCultivatorState(prev=>({...prev,session:{...prev.session,choices:newChoices,log:newLog,sessionFatAccum:newFat,sessionSuspAccum:newSusp,junctionIdx:nextIdx}}));
    }
  };
  const confirmCultivatorSession=(s)=>{
    const cs=cultivatorState; if(!cs||!cs.session||!cs.session.complete) return;
    const{session}=cs;
    // Apply gains: fat bar and suspicion
    const newFatBar=cs.fatBar+session.sessionFatAccum;
    const rawSusp=Math.min(200,Math.max(0,cs.suspicion+session.sessionSuspAccum));
    const stageUp=newFatBar>=FAT_BAR_CAP;
    const nextStageId=Math.min(10,cs.testerStageId+(stageUp?1:0));
    // XP-style fat bar reset: carry overflow into next stage
    const finalFatBar=stageUp?Math.max(0,newFatBar-FAT_BAR_CAP):newFatBar;
    const nextTesterLbs=stageUp?(TESTER_STAGE_LBS[nextStageId]||cs.testerLbs):cs.testerLbs;
    // Suspicion resets on stage-up (carry-in fraction if > 75)
    const finalSusp=stageUp?(rawSusp>75?Math.round(rawSusp*SUSPICION_CARRY_FRACTION):0):rawSusp;
    // Reneé small quality-control gain (skip if already digesting)
    if(cs.digestWeeksLeft===0){
      const reneeGain=Math.round(2+Math.random()*6);
      setStudents(prev=>prev.map(st=>st.id===s.id?processStudentGain(st,reneeGain,5):st));
    }
    // Emergency harvest at suspicion 200 (only if no stage-up — stage-up takes priority with reset)
    if(rawSusp>=200&&!stageUp){
      const renee=students.find(st=>st.id===s.id)||s;
      const hGain=HARVEST_GAIN[cs.testerStageId]||HARVEST_GAIN[6];
      const digestW=DIGEST_WEEKS[cs.testerStageId]||2;
      const vignette=getEmergencyVignette(getStage(renee.lbs).id,cs.testerStageId,cs.testerName)||'[emergency harvest]';
      const _bSid=getStage(renee.lbs).id;
      const _stagesJumped=Math.max(1,getStage(renee.lbs+hGain).id-_bSid);
      const gVignette=getGrowthVignette(_bSid,hGain,_stagesJumped);
      setStudents(prev=>prev.map(st=>st.id===s.id?{...processStudentGain(st,hGain,8)}:st));
      setCultivatorState(prev=>({...prev,testerStageId:cs.testerStageId,fatBar:finalFatBar,suspicion:200,session:null,pendingStageUp:false,harvestType:'emergency',harvestVignetteText:vignette,growthGain:hGain,growthVignetteText:gVignette,harvestStagesJumped:_stagesJumped,digestWeeksLeft:digestW,digestTotalWeeks:digestW,modalPhase:'emergency'}));
      push(`🍰 EMERGENCY: ${cs.testerName} got suspicious — harvest triggered (+${hGain} lbs to Reneé)`);
      return;
    }
    // Normal session close — stage-up or continue
    if(stageUp){
      const stageText=STAGE_UP_TEXT[nextStageId]?.(cs.testerName)||'The subject has grown.';
      setCultivatorState(prev=>({...prev,testerStageId:nextStageId,testerLbs:nextTesterLbs,fatBar:finalFatBar,suspicion:finalSusp,session:null,pendingStageUp:false,stageUpText:stageText,modalPhase:'stage_up'}));
      push(`🍰 ${cs.testerName} advanced to ${getStage(nextTesterLbs).label} — suspicion reset.`);
    } else {
      setCultivatorState(prev=>({...prev,fatBar:finalFatBar,suspicion:finalSusp,session:null,pendingStageUp:false,modalPhase:null}));
    }
  };
  const openCultivatorHarvest=(s)=>{
    const cs=cultivatorState; if(!cs||!cs.testerName) return;
    if(cs.harvestsCompleted>=4) return;
    if(cs.digestWeeksLeft>0) return;
    if(ap<1){push("⚠️ Need 1 AP for harvest.");return;}
    setAp(a=>a-1);
    const renee=students.find(st=>st.id===s.id)||s;
    const hGain=HARVEST_GAIN[cs.testerStageId]||HARVEST_GAIN[6];
    const vignette=getPlannedVignette(getStage(renee.lbs).id,cs.testerStageId,cs.testerName)||'[planned harvest]';
    const _bSid=getStage(renee.lbs).id;
    const _stagesJumped=Math.max(1,getStage(renee.lbs+hGain).id-_bSid);
    const gVignette=getGrowthVignette(_bSid,hGain,_stagesJumped);
    setCultivatorState(prev=>({...prev,harvestType:'planned',harvestVignetteText:vignette,growthGain:hGain,growthVignetteText:gVignette,harvestStagesJumped:_stagesJumped,modalPhase:'harvest'}));
  };
  const confirmCultivatorHarvest=(s)=>{
    const cs=cultivatorState; if(!cs) return;
    const hGain=cs.growthGain;
    const digestW=DIGEST_WEEKS[cs.testerStageId]||2;
    setStudents(prev=>prev.map(st=>st.id===s.id?{...processStudentGain(st,hGain,12)}:st));
    push(`🍰 Reneé — harvest complete: +${hGain} lbs. Digesting for ${digestW} weeks.`);
    setCultivatorState(prev=>({...prev,testerName:null,testerStageId:6,testerLbs:TESTER_START_LBS,fatBar:0,suspicion:0,session:null,pendingStageUp:false,harvestsCompleted:prev.harvestsCompleted+1,harvestType:null,harvestVignetteText:null,digestWeeksLeft:digestW,digestTotalWeeks:digestW,modalPhase:'growth'}));
  };
  const closeCultivatorGrowth=()=>{
    setCultivatorState(prev=>prev?{...prev,modalPhase:null,growthVignetteText:null,growthGain:0}:null);
  };
  const dismissCultivatorStageUp=()=>{
    setCultivatorState(prev=>prev?{...prev,modalPhase:null,stageUpText:null}:null);
  };
  const openDigestCheck=()=>{
    setCultivatorState(prev=>prev?{...prev,modalPhase:'digest_check'}:null);
  };

  // ── PHARMACIST (Sophia) handlers ─────────────────────────────
  const runPharmacistSynthesis=(s)=>{
    if(!pharmacistState||s.evolvedForm!=='pharmacist') return;
    const act=PHARMACIST_ACTIVITIES[pharmacistState.stage]||PHARMACIST_ACTIVITIES[1];
    if((pharmacistState.synthesisPausedWeeks||0)>0){
      push(`⚠️ Corporate scrutiny paused home synthesis for ${pharmacistState.synthesisPausedWeeks} more week(s).`);
      return;
    }
    if(ap<act.apCost){push(`⚠️ Need ${act.apCost} AP.`);return;}
    guardHungerInterrupt(()=>{
      setPharmacistChemStudentId(s.id);
      setPharmacistChemSession(startChemSession(pharmacistState));
    });
  };

  const cancelPharmacistChem=()=>{
    setPharmacistChemSession(null);
    setPharmacistChemStudentId(null);
  };

  const confirmPharmacistChem=()=>{
    const s=students.find(st=>st.id===pharmacistChemStudentId);
    if(!s||!pharmacistChemSession||pharmacistChemSession.phase!=='summary') return;
    const act=PHARMACIST_ACTIVITIES[pharmacistChemSession.stageId||pharmacistState.stage]||PHARMACIST_ACTIVITIES[1];
    if(ap<act.apCost){push(`⚠️ Need ${act.apCost} AP.`);return;}
    setAp(a=>a-act.apCost);
    const gain=rnd(...act.sophiaGain);
    const ns=processStudentGain(s,gain,10);
    setStudents(prev=>prev.map(st=>st.id===s.id?ns:st));
    const prevState=pharmacistState;
    const stageId=pharmacistChemSession.stageId||pharmacistState.stage;
    let next=completePharmacistChemSession(pharmacistState,stageId,pharmacistChemSession);
    const exposureEv=rollExposureEvent(prevState,next);
    if(exposureEv){
      next=applyExposureEvent(next,exposureEv);
      setTimeout(()=>{
        push(`⚠️ ${exposureEv.text()}`);
        if(exposureEv.scrutiny) addScrutiny(exposureEv.scrutiny);
      },140);
    }
    setPharmacistState(next);
    const stageMeta=PHARMACIST_STAGES.find(x=>x.id===next.stage);
    const brewed=formatSynthesisGrant(next.lastSynthesisGrant);
    const narrative=CAMPUS_NARRATIVE_LABELS[getCampusNarrativeTier(next)];
    push(`🧪 ${s.name} — synthesis complete. ${stageMeta?.label||'Stage'} · exposure ${next.exposureRisk}%${brewed?` · brewed ${brewed}`:''}`);
    if(next.stage>(pharmacistState.stage)){
      setTimeout(()=>push(`✦ Sophia advances: ${stageMeta?.label}. New compounds unlocked.`),120);
    }
    if(!prevState.campusFattening&&next.campusFattening){
      setTimeout(()=>push(`🌿 ${narrative||'Campus Softening'} — the student body starts rounding out.`),160);
    }else if(narrative&&narrative!==CAMPUS_NARRATIVE_LABELS[getCampusNarrativeTier(prevState)]){
      setTimeout(()=>push(`🌿 Campus influence intensifies: ${narrative}.`),160);
    }
    if(!prevState.cultActive&&next.cultActive){
      setTimeout(()=>push(`🕯️ The circle is live — ${next.cult?.circleSize||4} devotees under Sophia's wellness supply.`),180);
    }
    cancelPharmacistChem();
  };

  const runPharmacistCultDistribution=(s)=>{
    if(!pharmacistState?.cultActive||s.evolvedForm!=='pharmacist') return;
    setPharmacistChemStudentId(s.id);
    setPharmacistCultSession({ phase: 'route' });
  };

  const cancelPharmacistCult=()=>{
    setPharmacistCultSession(null);
    setPharmacistChemStudentId(null);
  };

  // ── TALIA / MACHINE GODDESS handlers ─────────────────────────
  const taliaStudent=()=>students.find(st=>st.id===TALIA_STUDENT_ID);

  const getEffectiveLabParts=()=>{
    if(labSession?.pool) return labSession.pool;
    return labState?.parts||{};
  };

  const runLabSessionOpen=(s)=>{
    if(!labState||s.evolvedForm!=='machine_goddess') return;
    const act=INVENTOR_ACTIVITIES[1];
    if(ap<act.apCost){ push(`⚠️ Need ${act.apCost} AP.`); return; }
    setLabStudentId(s.id);
    setLabSession(startLabSession(labState));
  };

  const openNetworkControl=(s)=>{
    if(!labState||labState.stage<2) return;
    const act=INVENTOR_ACTIVITIES[labState.stage]||INVENTOR_ACTIVITIES[2];
    if(ap<(act.apCost||0)){ push(`⚠️ Need ${act.apCost} AP.`); return; }
    setAp(a=>a-(act.apCost||0));
    const gain=rnd(...(act.taliaGain||[2,4]));
    setStudents(prev=>prev.map(st=>st.id===s.id?processStudentGain(st,gain,0):st));
    setLabState(prev=>{
      const synced=syncSubjectInfluence(ensureNetwork(normalizeLabTechState(prev)),students);
      return {...synced,instability:Math.min(100,(synced.instability??0)+(act.instability||4))};
    });
    setView('network');
    push(`⚙️ ${act.label} — Talia jacked into the mesh.`);
  };

  const openNetworkView=()=>setView('network');

  const handleAddNetworkNode=(typeId)=>{
    const res=addNetworkNode(labState,typeId);
    if(!res.ok){ push(res.reason==='parts'?'⚠️ Need more scrap metal.':'⚠️ Could not add node.'); return; }
    setLabState(res.labState);
    push(`⚙️ Added ${typeId} node to the mesh.`);
  };

  const handleSlotExperiment=(nodeId,slotIndex,experimentId)=>{
    const res=slotExperimentOnNode(labState,nodeId,slotIndex,experimentId);
    if(!res.ok){ push('⚠️ Could not slot experiment.'); return; }
    setLabState(res.labState);
    push('⚙️ Experiment slotted.');
  };

  const handleClearExperimentSlot=(nodeId,slotIndex)=>{
    setLabState(clearExperimentSlot(labState,nodeId,slotIndex).labState);
  };

  const handleUpgradeNetworkNode=(nodeId)=>{
    const res=upgradeNetworkNode(labState,nodeId);
    if(!res.ok){ push(res.reason==='parts'?'⚠️ Need more circuits.':'⚠️ Node at max level.'); return; }
    setLabState(res.labState);
    push('⚙️ Node upgraded.');
  };

  const handleSetNodeAutomation=(nodeId,level)=>{
    setLabState(setNodeAutomation(labState,nodeId,level));
  };

  const handleExpandDeployment=(areaId)=>{
    const res=expandDeploymentArea(labState,areaId);
    if(!res.ok){ push('⚠️ Area already deployed or locked.'); return; }
    setLabState(res.labState);
    push(`⚙️ Network expanded — detection risk may rise.`);
  };

  const handleApproveProposal=(proposalId)=>{
    const res=approveProposal(labState,proposalId);
    if(!res.ok){ push('⚠️ Proposal unavailable.'); return; }
    setLabState(res.labState);
    push(`🌐 Approved: ${res.proposal?.label||'network proposal'}.`);
  };

  const handleDenyProposal=(proposalId)=>{
    setLabState(denyProposal(labState,proposalId));
    push('🌐 Proposal denied — stability ticks up slightly.');
  };

  const handleAdjustIntegration=(delta)=>{
    setLabState(adjustNexusIntegration(labState,delta));
    push(delta>0?'🌐 Talia deepens integration with the nexus.':'🌐 Talia pulls back from the mesh.');
  };

  const handleUpgradeNexus=()=>{
    const res=upgradeNexus(labState);
    if(!res.ok){ push('⚠️ Insufficient parts for nexus upgrade.'); return; }
    setLabState(res.labState);
    push('🌐 Nexus upgraded.');
  };

  const applyLabAcquisitionChoice=(choiceId)=>{
    setLabSession(prev=>prev?applyLabAcquisition(prev,choiceId,labState):null);
  };

  const cancelLabSession=()=>{
    setLabSession(null);
    setLabStudentId(null);
  };

  const confirmLabSession=()=>{
    const s=students.find(st=>st.id===labStudentId);
    if(!s||!labSession) return;
    const act=INVENTOR_ACTIVITIES[labSession.stageId||labState.stage]||INVENTOR_ACTIVITIES[1];
    if(ap<act.apCost){ push(`⚠️ Need ${act.apCost} AP.`); return; }
    setAp(a=>a-act.apCost);
    const gain=rnd(...act.taliaGain);
    const ns=processStudentGain(s,gain,8);
    setStudents(prev=>prev.map(st=>st.id===s.id?ns:st));
    const prevStage=labState.stage??1;
    const next=completeLabSession(labState,{
      ...labSession,
      poolAfter: labSession.pool,
      instabilityGained: act.instability||5,
    }, null, Math.random);
    setLabState(normalizeLabTechState(next));
    const btMsg=` +${(next.breakthroughs??0)-(labState.breakthroughs??0)} 💡`;
    if((next.stage??1)>prevStage){
      const stageMeta=INVENTOR_PATH_STAGES.find(x=>x.id===next.stage);
      push(`🎉 Talia advances — ${stageMeta?.label||'new stage'}! Sessions ${next.sessionsRun}${btMsg}`);
    } else {
      push(`🔧 ${s.name} — lab session saved. Instability ${next.instability}% · parts stocked${btMsg}.`);
    }
    cancelLabSession();
  };

  const unlockLabTech=(nodeId)=>{
    if(!labState) return;
    const res=unlockTechNode(normalizeLabTechState(labState),nodeId);
    if(!res.ok){
      const msg=res.reason==='cost'?'Not enough breakthroughs.':res.reason==='prereqs'?'Prerequisites not met.':res.reason==='stage'?'Requires a higher inventor stage.':'Already unlocked.';
      push(`⚠️ ${msg}`);
      return;
    }
    setLabState(res.state);
    push(`💡 Unlocked: ${res.node.label}${res.node.blueprint?' — blueprint ready to build':''}.`);
  };

  const buildLabDevice=(deviceDefId)=>{
    const recipe=BLUEPRINT_RECIPES[deviceDefId];
    const talia=taliaStudent();
    if(!recipe||!labState||!talia) return;
    const pool=getEffectiveLabParts();
    const affordState={ parts: pool };
    if(!canAfford(recipe,affordState,money)){
      push('⚠️ Insufficient parts or funds for this build.');
      return;
    }
    const weightCost=getBuildWeightCost(recipe);
    const minLbs=getMinLbsForBuild(recipe);
    if(talia.lbs<minLbs){
      push(`⚠️ Talia needs at least ${minLbs} lbs to spend on this build.`);
      return;
    }
    const spend=trySpend(money,recipe.money);
    if(!spend.ok){ push(`⚠️ Need ${formatMoney(recipe.money)}.`); return; }
    setMoney(spend.balance);
    const spentParts=spendRecipe({ parts: pool },recipe).parts;
    if(labSession){
      setLabSession(prev=>prev?{...prev,pool:spentParts}:null);
    }
    setLabState(prev=>({ ...prev, parts: spentParts }));
    setStudents(prev=>prev.map(st=>{
      if(st.id!==TALIA_STUDENT_ID) return st;
      return processStudentGain(st,-weightCost,0);
    }));
    setDeviceInventory(prev=>({ ...prev, [deviceDefId]: (prev[deviceDefId]||0)+1 }));
    const def=DEVICES[deviceDefId];
    push(`🔧 Built ${def?.label||deviceDefId} — Talia spent ${weightCost} lbs as raw material.`);
  };

  const applyStudentDeviceResult=(studentId,result,def,consumeInventory=false)=>{
    if(!result?.ok && result?.student==null) return;
    let ns=result.student;
    if(ns._pendingGainLbs){
      const g=ns._pendingGainLbs;
      const{ _pendingGainLbs,...rest}=ns;
      ns=processStudentGain(rest,g,0);
    }
    setStudents(prev=>prev.map(st=>st.id===studentId?ns:st));
    if(consumeInventory&&def?.id){
      setDeviceInventory(prev=>{
        const q=(prev[def.id]||0)-1;
        const next={ ...prev };
        if(q<=0) delete next[def.id]; else next[def.id]=q;
        return next;
      });
    }
    if(result.malfunction&&(result.malfunction.tier==='major'||result.malfunction.tier==='critical')){
      const subj=students.find(st=>st.id===studentId);
      setMalfunctionPopup({
        studentName:subj?.name,tier:result.malfunction.tier,
        text:result.malfunction.text,deviceLabel:def?.label,
      });
    }
  };

  const useDeviceOn=(def,studentId)=>{
    setDeviceTargetPicker(null);
    const result=useConsumableDevice(
      students.find(st=>st.id===studentId),
      def.id,week,Math.random,
    );
    if(!result.ok){ push('⚠️ Device use failed.'); return; }
    applyStudentDeviceResult(studentId,result,def,true);
    push(`💉 ${def.label} used — ${result.lines.join(' · ')}`);
  };

  const equipDeviceOn=(def,studentId,slot)=>{
    setEquipPicker(null);
    let s=students.find(st=>st.id===studentId);
    if(!s) return;
    if(s.equip?.[slot]){
      s=unequipDevice(s,slot).student;
    }
    const result=equipDevice(s,def.id,week);
    if(!result.ok){ push('⚠️ Could not equip device.'); return; }
    setStudents(prev=>prev.map(st=>st.id===studentId?result.student:st));
    setDeviceInventory(prev=>{
      const q=(prev[def.id]||0)-1;
      const next={ ...prev };
      if(q<=0) delete next[def.id]; else next[def.id]=q;
      return next;
    });
    push(`🛠 Equipped ${def.label} on ${s.name} (${slot}).`);
  };

  const attachDeviceOn=(def,studentId)=>{
    setAttachPicker(null);
    const s=students.find(st=>st.id===studentId);
    if(!s) return;
    const hostSlot=findAttachmentHostSlot(s,def.id);
    if(!hostSlot){ push('⚠️ No compatible host equipped.'); return; }
    const result=attachToDevice(s,hostSlot,def.id);
    if(!result.ok){ push('⚠️ Could not attach module.'); return; }
    setStudents(prev=>prev.map(st=>st.id===studentId?result.student:st));
    setDeviceInventory(prev=>{
      const q=(prev[def.id]||0)-1;
      const next={ ...prev };
      if(q<=0) delete next[def.id]; else next[def.id]=q;
      return next;
    });
    const hostLabel=DEVICES[s.equip[hostSlot]?.defId]?.label||'device';
    push(`🛠 Attached ${def.label} to ${s.name}'s ${hostLabel}.`);
  };

  const unequipDeviceSlot=(studentId,slot)=>{
    const s=students.find(st=>st.id===studentId);
    if(!s?.equip?.[slot]) return;
    const defId=s.equip[slot].defId;
    const result=unequipDevice(s,slot);
    setStudents(prev=>prev.map(st=>st.id===studentId?result.student:st));
    setDeviceInventory(prev=>({ ...prev, [defId]: (prev[defId]||0)+1 }));
    push(`🛠 Unequipped ${DEVICES[defId]?.label||defId} from ${s.name}.`);
  };

  const runDeviceAction=(actionId,studentId)=>{
    const s=students.find(st=>st.id===studentId);
    if(!s) return;
    if(actionId==='trigger_belt_bloat'){
      const result=triggerBeltBloatNow(s,week,Math.random);
      if(!result.ok){ push('⚠️ Belt not active.'); return; }
      applyStudentDeviceResult(studentId,result,DEVICES.auto_bloating_belt);
      const extra=result.lines?.filter(l=>!l.startsWith('⚠️')&&l!=='Belt cycles to aggressive bloat mode.').join(' ');
      push(`⭕ Belt bloat triggered on ${s.name}.${extra?` ${extra}`:''}`);
      return;
    }
    if(actionId==='run_feeder_session'){
      const effect={ gainLbs:[4,8], psychDelta:{ dependence:2 } };
      const applied=applyDeviceEffect(s,effect,{ week, sourceDeviceId:'auto_feeder_arm', rng:Math.random });
      const gain=applied.student._pendingGainLbs||0;
      const gl=growthLineForStudent(applied.student,gain);
      applyStudentDeviceResult(studentId,{ ok:true, ...applied, lines:[...applied.lines,...(gl?[gl]:[])] },DEVICES.auto_feeder_arm);
      push(`🦾 Feeder session run on ${s.name}.${gl?` ${gl}`:''}`);
      return;
    }
    if(actionId==='inject_serum'){
      const def=DEVICES.growth_serum_injector;
      if((deviceInventory[def.id]||0)<1){ push('⚠️ No serum injectors in inventory.'); return; }
      useDeviceOn(def,studentId);
      return;
    }
    if(actionId==='sculpt_redistribution'){
      const effect=DEVICES.weight_redistribution_rig.useEffect||{};
      const applied=applyDeviceEffect(s,effect,{ week, sourceDeviceId:'weight_redistribution_rig', rng:Math.random });
      applyStudentDeviceResult(studentId,{ ok:true, ...applied },DEVICES.weight_redistribution_rig);
      push(`⚖️ Sculpt cycle complete on ${s.name}.`);
      return;
    }
    if(actionId==='run_mask_session'){
      const effect=DEVICES.feeding_mask.useEffect||{};
      const applied=applyDeviceEffect(s,effect,{ week, sourceDeviceId:'feeding_mask', rng:Math.random });
      const gain=applied.student._pendingGainLbs||0;
      const gl=growthLineForStudent(applied.student,gain);
      applyStudentDeviceResult(studentId,{ ok:true, ...applied, lines:[...applied.lines,...(gl?[gl]:[])] },DEVICES.feeding_mask);
      push(`🎭 Mask session on ${s.name}.${gl?` ${gl}`:''}`);
      return;
    }
    if(actionId==='sleep_feed_gentle'){
      const effect={ gainLbs:[2,4], psychDelta:{ dependence:2 } };
      const applied=applyDeviceEffect(s,effect,{ week, sourceDeviceId:'sleep_feeding_system', rng:Math.random });
      applyStudentDeviceResult(studentId,{ ok:true, ...applied },DEVICES.sleep_feeding_system);
      push(`🌙 Gentle overnight prep on ${s.name}.`);
      return;
    }
    if(actionId==='sleep_feed_aggressive'){
      const effect={ gainLbs:[5,9], bodyOverride:{ stateType:'bloated', stageBump:2, durationWeeks:1 }, psychDelta:{ dependence:4 } };
      const applied=applyDeviceEffect(s,effect,{ week, sourceDeviceId:'sleep_feeding_system', rng:Math.random });
      const gain=applied.student._pendingGainLbs||0;
      const gl=growthLineForStudent(applied.student,gain);
      applyStudentDeviceResult(studentId,{ ok:true, ...applied, lines:[...applied.lines,...(gl?[gl]:[])] },DEVICES.sleep_feeding_system);
      push(`🌙 Aggressive sleep-feed cycle on ${s.name}.${gl?` ${gl}`:''}`);
      return;
    }
    if(actionId==='infuser_water_mode'){
      const def=DEVICES.liquid_fat_infuser;
      if((deviceInventory[def.id]||0)<1){ push('⚠️ No liquid fat infusers in inventory.'); return; }
      useDeviceOn(def,studentId);
      return;
    }
    if(actionId==='feed_furniture'){
      const effect=DEVICES.living_furniture_rig.useEffect||{};
      const applied=applyDeviceEffect(s,effect,{ week, sourceDeviceId:'living_furniture_rig', rng:Math.random });
      applyStudentDeviceResult(studentId,{ ok:true, ...applied },DEVICES.living_furniture_rig);
      const comfort=applied.student?.deviceState?.furnitureComfort;
      push(`🪑 Fed the furniture (${s.name}) — comfort ${comfort ?? '?'}/100.`);
      return;
    }
    if(actionId==='furniture_comfort_check'){
      const comfort=s.deviceState?.furnitureComfort??100;
      push(`🪑 ${s.name} furniture comfort: ${comfort}/100${comfort<40?' — unstable, needs feeding':''}.`);
    }
  };

  const openLabView=()=>setView('lab');

  const selectCultRoute=(routeId)=>{
    if(!pharmacistState) return;
    const route=CULT_DISTRIBUTION_ROUTES.find(r=>r.id===routeId);
    if(!route||ap<route.apCost){push(`⚠️ Need ${route?.apCost||1} AP.`);return;}
    setAp(a=>a-route.apCost);
    const { state: nextPs, outcome }=applyCultDistribution(pharmacistState,routeId,rnd);
    if(!outcome) return;
    let classGainApplied=0;
    let addictedGainApplied=0;
    if(outcome.classGainRange[1]>0){
      const g=rnd(...outcome.classGainRange);
      classGainApplied=g;
      setStudents(prev=>prev.map(st=>studentReceivesPassiveGain(st)?processStudentGain(st,g,0):st));
    }
    if(outcome.addictedGainRange[1]>0){
      const g=rnd(...outcome.addictedGainRange);
      addictedGainApplied=g;
      setStudents(prev=>prev.map(st=>{
        if(!studentReceivesPassiveGain(st)||(st.addictionLevel??0)<1) return st;
        return processStudentGain(st,g,0);
      }));
    }
    if(outcome.scrutiny) addScrutiny(outcome.scrutiny);
    setPharmacistState(nextPs);
    setPharmacistCultSession({
      phase: 'summary',
      outcome: { ...outcome, classGainApplied, addictedGainApplied },
    });
  };

  const confirmPharmacistCult=()=>{
    const o=pharmacistCultSession?.outcome;
    if(o) push(`🕯️ Distribution routed — circle at ${pharmacistState?.cult?.circleSize??0}, supply stock ${pharmacistState?.cult?.supplyReservoir??0}.`);
    cancelPharmacistCult();
  };

  // ── HUNGER INTERRUPT handlers ─────────────────────────────────
  const finishHungerInterrupt=(studentId,action,compoundId=null)=>{
    const s=students.find(st=>st.id===studentId);
    if(!s){setHungerInterrupt(null);return;}
    let ns=s;
    const after=hungerInterrupt?.after;
    if(action==='feed'){
      const fed=feedStudentCalories(ns,8000,35,6,'Emergency feeding');
      if(fed) ns=fed;
      setTimeout(()=>push(`🚪 ${renderHungerOutcome(ns,'feed',week)}`),100);
    }else if(action==='compound'){
      const cid=compoundId||pharmacistState?.unlockedCompounds?.[0]||'appetite_stimulant';
      const fed=feedStudentCalories(ns,6000,28,4,`Compound-laced meal (${COMPOUNDS[cid]?.label||cid})`,{compoundId:cid});
      if(fed) ns=fed;
      setTimeout(()=>push(`🚪 ${renderHungerOutcome(ns,'compound',week)}`),100);
    }else if(action==='deny'){
      ns=applyDenialConsequences(ns);
      setTimeout(()=>push(`🚪 ${renderHungerOutcome(ns,'deny',week)}`),100);
    }else if(action==='talk'){
      const hungerEff=aggregateSkillEffects(ownedSkills);
      ns=talkCalmsHunger(ns,hungerEff,weeklyArms);
      ns={...ns,relationship:Math.min(100,ns.relationship+3)};
      setTimeout(()=>push(`🚪 ${renderHungerOutcome(ns,'talk',week)}`),100);
    }
    setStudents(prev=>prev.map(st=>st.id===studentId?ns:st));
    setHungerInterrupt(null);
    skipHungerCheckRef.current=true;
    if(after==='week') advanceWeek();
    else if(after==='resume'){
      const resume=pendingAfterInterruptRef.current;
      pendingAfterInterruptRef.current=null;
      if(resume) resume();
    }
  };

  // ── COMMUNITY RESEARCHER handlers ─────────────────────────────
  const openThesisBoard=(s)=>{
    if(ap<1){push("⚠️ Need 1 AP for thesis defense.");return;}
    setCommunityResearcherState(prev=>prev?{...prev,modalPhase:'thesis_board',boardPhase:0}:null);
  };
  const advanceThesisBoard=()=>{
    setCommunityResearcherState(prev=>{
      if(!prev) return null;
      if(prev.boardPhase>=2) return {...prev,modalPhase:'thesis_success'};
      return {...prev,boardPhase:prev.boardPhase+1};
    });
  };
  const completeThesisDefense=(s)=>{
    setAp(a=>a-1);
    setStudents(prev=>prev.map(st=>st.id===s.id?{...processStudentGain(st,5,8)}:st));
    setCommunityResearcherState(prev=>prev?{...prev,thesisComplete:true,modalPhase:null,boardPhase:0}:null);
    push(`📋 ${s.name} — PhD proposal approved. Case studies unlocked.`);
  };
  const openCaseStudyGrid=(s)=>{
    if(ap<1){push("⚠️ Need 1 AP.");return;}
    setCommunityResearcherState(prev=>prev?{...prev,modalPhase:'case_study_grid'}:null);
  };
  const selectCasePair=(s,pairId)=>{
    const crs=communityResearcherState; if(!crs) return;
    const pair=CASE_STUDY_PAIRS.find(p=>p.id===pairId); if(!pair) return;
    const mTier=getMadelineTier(getStage(s.lbs).id);
    const pairStuds=pair.studentIds.map(id=>students.find(st=>st.id===id)).filter(Boolean);
    const text=pair.event(crs.caseStudyStage,mTier,pairStuds);
    setCommunityResearcherState(prev=>prev?{...prev,activePairId:pairId,eventText:text,modalPhase:'case_study_event'}:null);
  };
  const completeCaseStudy=(s)=>{
    const crs=communityResearcherState; if(!crs) return;
    const pair=CASE_STUDY_PAIRS.find(p=>p.id===crs.activePairId);
    const [gMin,gMax]=pair?.gainRange||[3,8];
    setAp(a=>a-1);
    const gain=rnd(gMin,gMax);
    setStudents(prev=>prev.map(st=>st.id===s.id?{...processStudentGain(st,gain,10)}:st));
    setCommunityResearcherState(prev=>prev?{
      ...prev,
      caseStudyStage:prev.caseStudyStage+1,
      lastPairId:prev.activePairId,
      pairsUsed:[...prev.pairsUsed,prev.activePairId],
      totalSuspicion:(prev.totalSuspicion||0)+(pair?.suspicion||0),
      boardReactionPairId:prev.activePairId,
      activePairId:null, eventText:null, modalPhase:'board_reaction',
    }:null);
    push(`📋 ${s.name} — case study complete: +${gain} lbs.`);
  };
  const dismissBoardReaction=()=>{
    setCommunityResearcherState(prev=>prev?{...prev,boardReactionPairId:null,modalPhase:null}:null);
  };
  const openFinalReview=(s)=>{
    const crs=communityResearcherState; if(!crs) return;
    if(ap<1){push("⚠️ Need 1 AP for final review.");return;}
    const text=getFinalReviewText(crs.pairsUsed,crs.totalSuspicion||0);
    setAp(a=>a-1);
    setCommunityResearcherState(prev=>prev?{...prev,finalReviewText:text,modalPhase:'final_review'}:null);
  };
  const proceedFromFinalReview=()=>{
    const crs=communityResearcherState; if(!crs) return;
    const bracket=getSuspicionBracket(crs.totalSuspicion||0);
    if(bracket==='green'||bracket==='yellow'){
      setCommunityResearcherState(prev=>prev?{...prev,modalPhase:'thesis_approved'}:null);
    } else {
      setCommunityResearcherState(prev=>prev?{...prev,modalPhase:'have_a_chat',chatMemberIdx:0,chatPhaseIdx:0,chatHistory:[],chatWon:[]}:null);
    }
  };
  const makeHaveAChatChoice=(choiceId)=>{
    const crs=communityResearcherState; if(!crs) return;
    const scene=HAVE_A_CHAT_SCENES[crs.chatMemberIdx]; if(!scene) return;
    const newHist=[...crs.chatHistory,choiceId];
    if(crs.chatPhaseIdx<scene.phases.length-1){
      setCommunityResearcherState(prev=>prev?{...prev,chatHistory:newHist,chatPhaseIdx:prev.chatPhaseIdx+1}:null);
      return;
    }
    const won=scene.winCondition(newHist);
    const newWon=won?[...crs.chatWon,crs.chatMemberIdx]:crs.chatWon;
    if(crs.chatMemberIdx<HAVE_A_CHAT_SCENES.length-1){
      setCommunityResearcherState(prev=>prev?{...prev,chatHistory:[],chatPhaseIdx:0,chatMemberIdx:prev.chatMemberIdx+1,chatWon:newWon}:null);
    } else {
      const bracket=getSuspicionBracket(crs.totalSuspicion||0);
      const required=bracket==='red'?3:2;
      const approved=newWon.length>=required;
      setCommunityResearcherState(prev=>prev?{...prev,chatWon:newWon,modalPhase:approved?'thesis_approved':'thesis_rejected'}:null);
    }
  };
  const closeThesisOutcome=(approved)=>{
    setCommunityResearcherState(prev=>prev?{...prev,modalPhase:null,thesisApproved:approved,thesisRejected:!approved}:null);
    if(approved) push("📋 Madeline — thesis approved. The research is complete.");
    else push("📋 Madeline — thesis rejected. The committee was not persuaded.");
  };

  const startRankedSession=(studentId,stageIdx)=>{
    const s=students.find(st=>st.id===studentId); if(!s) return;
    // maxFullness scales with weight — heavier = more capacity = longer sessions
    const maxFullnessByStage=[100,125,155,185,215,255];
    const maxFocusByStage=[90,85,80,75,70,65];
    const maxFullness=maxFullnessByStage[stageIdx]||100;
    const maxFocus=maxFocusByStage[stageIdx]||90;
    const raeStage=Math.min(5,stageIdx);
    setRankedFeedeeState({studentId,stageIdx,focus:maxFocus,maxFocus,fullness:0,maxFullness,gain:0,turn:0,log:[SESSION_NPC_LINES[raeStage].arrival+` ${SESSION_NPC_LINES[raeStage].extra||''}`],done:false,endReason:null,raeDelivered:raeStage<=1});
    setEvolvedEventState(null);
  };

  const pickSessionFood=(foodId)=>{
    if(!rankedFeedeeState||rankedFeedeeState.done) return;
    const food=SESSION_FOOD_ITEMS.find(f=>f.id===foodId); if(!food) return;
    const{studentId,stageIdx,focus,maxFocus,fullness,maxFullness,gain,turn,log,raeDelivered}=rankedFeedeeState;
    const s=students.find(st=>st.id===studentId); if(!s) return;
    // Decay focus first, then apply food
    const newFocus=Math.max(0,Math.min(maxFocus,focus-15+food.focusRestore));
    const newFullness=fullness+food.fullnessCost;
    const newGain=gain+food.gain;
    const newTurn=turn+1;
    const newLog=[...log,`${food.icon} ${food.label} — +${food.gain} lbs, focus ${newFocus>focus?'+':''}${Math.round(food.focusRestore-15)}`];
    // Apply gain to student
    setStudents(prev=>prev.map(st=>st.id===studentId?processStudentGain(st,food.gain,0):st));
    // Check Rae delivery event at turn 3 if not yet delivered and stage >= 2
    let updatedLog=newLog;
    let newRaeDelivered=raeDelivered;
    if(!raeDelivered&&newTurn===3&&stageIdx>=2){
      const raeNpc=SESSION_NPC_LINES[Math.min(5,stageIdx)];
      updatedLog=[...newLog,`📦 RAE: ${raeNpc.extra||'She appears with extra supplies.'}`];
      newRaeDelivered=true;
    }
    // Check end conditions
    if(newFullness>=maxFullness){
      setRankedFeedeeState(prev=>({...prev,focus:newFocus,fullness:newFullness,gain:newGain,turn:newTurn,log:updatedLog,raeDelivered:newRaeDelivered,done:true,endReason:'food_coma'}));
      push(`🎮 ${s.name} — Ranked session: +${Math.round(newGain)} lbs (food coma)`);
      return;
    }
    if(newFocus<=0){
      setRankedFeedeeState(prev=>({...prev,focus:0,fullness:newFullness,gain:newGain,turn:newTurn,log:updatedLog,raeDelivered:newRaeDelivered,done:true,endReason:'focus_out'}));
      push(`🎮 ${s.name} — Ranked session: +${Math.round(newGain)} lbs (focus out)`);
      return;
    }
    setRankedFeedeeState(prev=>({...prev,focus:newFocus,fullness:newFullness,gain:newGain,turn:newTurn,log:updatedLog,raeDelivered:newRaeDelivered}));
  };

  const quitRankedSession=()=>{
    if(!rankedFeedeeState||rankedFeedeeState.done) return;
    const{studentId,gain}=rankedFeedeeState;
    const s=students.find(st=>st.id===studentId);
    if(s) push(`🎮 ${s.name} — session ended early: +${Math.round(gain)} lbs`);
    setRankedFeedeeState(prev=>prev?({...prev,done:true,endReason:'quit'}):null);
  };

  const closeRankedSession=()=>setRankedFeedeeState(null);

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
    const{stageIdx}=eatingContestState;
    if(side==='your'){
      setEatingContestState(prev=>({...prev,yourFoods:prev.yourFoods.map(f=>f.key===key&&!f.consumed?{...f,selected:!f.selected}:f)}));
    } else if(side==='maya'&&stageIdx>=3){
      setEatingContestState(prev=>({...prev,mayaFoods:prev.mayaFoods.map(f=>f.key===key&&!f.consumed?{...f,selected:!f.selected}:f)}));
    }
  };

  const doDevour=()=>{
    if(!eatingContestState) return;
    const{studentId,stageIdx,yourFoods,mayaFoods,yourFullness,mayaFullness,maxMayaFullness,yourGain,mayaGain}=eatingContestState;
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
    const{stageIdx,yourFoods,mayaFoods,yourFullness,mayaFullness,maxYourFullness,maxMayaFullness,mayaGain,pantsFactor,actions}=eatingContestState;
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
    let tag,ringDelta=0;
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

  // ── Destiny Streaming Mini-Game (eating_streamer) ─────────────────────
  const buildStreamCtx=(session,student,extra={})=>{
    const ctx=createContext({subject:student,week});
    ctx.d.brand=session.brand;
    ctx.d.perf=extra.perf??session.lastRoundTier??session.currentRoundTierSoFar??'average';
    ctx.d.challengeType=session.challenge?.category;
    ctx.d.intensity=session.challenge?.intensity;
    ctx.d.addiction=session.addiction;
    ctx.d.audienceTier=session.audienceTier;
    ctx.d.trend=extra.trend??session.trend;
    ctx.d.brandStreak=session.brandStreak??0;
    ctx.d.brandControl=session.brandControlTier??getBrandControlTier(session.brandStreak??0);
    ctx.d.recentPerf=extra.recentPerf??deriveRecentPerf(session.tierHistory);
    ctx.d.streamVoice=student?.streamVoice??getStreamVoice(ensureStreamFields(student||{}));
    return ctx;
  };

  const selectStreamBrand=(studentId,brandId)=>{
    const brand=BRANDS[brandId];
    if(!brand) return;
    setStudents(prev=>prev.map(st=>{
      if(st.id!==studentId) return st;
      const favor={...(st.sponsorFavor||{})};
      favor[brandId]=Math.min(100,(favor[brandId]||0)+20);
      return {...ensureStreamFields(st),brand:brandId,sponsorFavor:favor};
    }));
    const s=students.find(st=>st.id===studentId);
    push(`📡 ${s?.name||'Destiny'} signs with ${brand.name} — sponsor locked in.`);
    setStreamBrandPickState(null);
  };

  const startStream=(s)=>{
    if(s.evolvedForm!=='eating_streamer') return;
    if(needsStreamBrand(s)){
      setStreamBrandPickState({studentId:s.id,required:true});
      push(`⚠️ ${s.name} needs a sponsor contract before going live.`);
      return;
    }
    if(ap<STREAM_AP_COST){push(`⚠️ Need ${STREAM_AP_COST} AP.`);return;}
    setAp(a=>a-STREAM_AP_COST);
    let dest=ensureStreamFields(s);
    const spendFx=aggregateDestinySpendEffects(dest.destinyPurchases);
    const burst=dest.destinyPendingBuffs?.audienceBurst||0;
    if(burst>0){
      dest={
        ...dest,
        audience:Math.round((dest.audience||120)+burst),
        destinyPendingBuffs:{...dest.destinyPendingBuffs,audienceBurst:0},
      };
      setStudents(prev=>prev.map(st=>st.id===s.id?dest:st));
    }
    const weightStageId=getStage(dest.lbs).id;
    const addiction=getCorruptionTier(dest.corruption||0).id;
    const audTier=streamAudienceTier(dest.audience);
    const resistance=deriveResistance({corruption:dest.corruption,_weightStageId:weightStageId},0);
    setStreamSessionState({
      studentId:s.id,
      phase:'preStream',
      weightStageId, addiction, resistance,
      audienceTier:audTier,
      brand:dest.brand,
      brandStreak:dest.brandStreaks?.[dest.brand]||0,
      brandControlTier:getBrandControlTier(dest.brandStreaks?.[dest.brand]||0),
      capacityMult:1, gainMult:spendFx.gainMult||1, audienceMult:spendFx.audienceMult||1,
      spendStaminaMult:spendFx.staminaMult||1,
      preStreamChoices:{}, preStreamVignettes:{},
      offeredChallenges:[], challenge:null,
      totalRounds:0, roundIndex:0,
      stamina:100, sessionGain:0,
      sessionFullness:dest.fullness||0,
      stomachCapacity:dest.stomachCapacity||GAIN_CONFIG.baseCapacity,
      tierHistory:[], tapOutCause:null,
      chatLines:[], lastRoundTier:null, lastRoundLbs:0,
      betweenRoundLine:'', roundStartLine:'',
      rewardsPreview:null, endingText:'', destinyMoneyFlavor:'',
      startLbs:dest.lbs, startStageId:weightStageId,
      trend:'steady',
    });
  };

  const preStreamAction=(actionId,choiceId)=>{
    setStreamSessionState(prev=>{
      if(!prev) return prev;
      if(actionId==='__done__'){
        if(Object.keys(prev.preStreamChoices).length<5) return prev;
        return {...prev,phase:'challengeSelect',offeredChallenges:selectChallenges(prev.brand,3,prev.brandStreak)};
      }
      const student=students.find(st=>st.id===prev.studentId);
      const newChoices={...prev.preStreamChoices,[actionId]:choiceId};
      const mults=mergePreStreamMultipliers(newChoices);
      const ctx=buildStreamCtx(prev,student);
      const vignette=render(`{stream.pre.${actionId}.${choiceId}}`,ctx);
      return {
        ...prev,
        preStreamChoices:newChoices,
        preStreamVignettes:{...prev.preStreamVignettes,[actionId]:vignette},
        capacityMult:mults.capacityMult,
        gainMult:mults.gainMult,
        audienceMult:mults.audienceMult,
        resistance:deriveResistance(
          {corruption:student?.corruption,_weightStageId:prev.weightStageId},
          mults.resistanceDelta,
        ),
      };
    });
  };

  const selectStreamChallenge=(challengeId)=>{
    setStreamSessionState(prev=>{
      const challenge=CHALLENGES.find(c=>c.id===challengeId);
      if(!challenge||!prev) return prev;
      const student=students.find(st=>st.id===prev.studentId);
      const totalRounds=pickRoundCount(challenge);
      const ctx=buildStreamCtx({...prev,challenge},student);
      const roundStartLine=render('{stream.roundStart}',ctx);
      return {
        ...prev,
        phase:'roundStart',
        challenge, totalRounds, roundIndex:0,
        roundStartLine,
        chatLines:[...prev.chatLines,`📡 ${challenge.label} — let's go!`].slice(-40),
      };
    });
  };

  const beginActiveRound=useCallback(()=>{
    setStreamSessionState(prev=>(prev&&prev.phase==='roundStart'?{...prev,phase:'round',currentRoundTierSoFar:'average'}:prev));
  },[]);

  const appendStreamChat=useCallback((line)=>{
    if(!line) return;
    setStreamSessionState(prev=>(prev?{...prev,chatLines:[...prev.chatLines,line].slice(-40)}:prev));
  },[]);

  const updateRoundPerf=useCallback((hits,misses,centerQualities=[])=>{
    setStreamSessionState(prev=>{
      if(!prev||prev.phase!=='round') return prev;
      const{tier}=computeRoundScore(hits,misses,centerQualities);
      if(prev.currentRoundTierSoFar===tier) return prev;
      return {...prev,currentRoundTierSoFar:tier};
    });
  },[]);

  const tickRoundStamina=useCallback((dtMs)=>{
    setStreamSessionState(prev=>{
      if(!prev||prev.phase!=='round') return prev;
      const control=prev.brandControlTier||getBrandControlTier(prev.brandStreak);
      const mult=STAMINA_DRAIN_CONTROL_MULT[control]||1;
      const drainMod=addictionDrainMod(prev.addiction,prev.roundIndex,prev.totalRounds);
      const drain=STAMINA_DRAIN_PER_SEC*mult*drainMod*(dtMs/1000);
      const newStamina=Math.max(0,prev.stamina-drain);
      if(Math.abs(newStamina-prev.stamina)<0.01) return prev;
      return {...prev,stamina:newStamina};
    });
  },[]);

  const finishActiveRound=useCallback((liveStats)=>{
    setStreamSessionState(prev=>{
      if(!prev||prev.phase!=='round') return prev;
      const{hits=0,misses=0,centerQualities=[]}=liveStats||{};
      const{tier}=computeRoundScore(hits,misses,centerQualities);
      const stamPen=staminaPenaltyFor(prev.stamina);
      const roundLbs=computeRoundLbs({
        challenge:prev.challenge, tier,
        capacityMult:prev.capacityMult, gainMult:prev.gainMult,
        weightStageId:prev.weightStageId, stamina:prev.stamina, staminaPenalty:stamPen,
      });
      const drain=(prev.challenge?.staminaDrain||10)
        +misses*MISS_STAMINA_PENALTY
        +stageStaminaTax(prev.weightStageId);
      const drainMod=addictionDrainMod(prev.addiction,prev.roundIndex,prev.totalRounds);
      let newStamina=prev.stamina-drain*drainMod;
      if(tier==='excellent') newStamina+=STAMINA_EXCELLENT_GAIN;
      newStamina=Math.max(0,Math.min(100,newStamina));
      const newFullness=prev.sessionFullness+roundLbs;
      const tierHistory=[...prev.tierHistory,tier];
      const student=students.find(st=>st.id===prev.studentId);
      const ctx=buildStreamCtx(prev,student,{perf:tier,trend:deriveTrend(tierHistory),recentPerf:deriveRecentPerf(tierHistory)});
      const betweenRoundLine=render('{stream.betweenRound}',ctx);
      let tapOutCause=prev.tapOutCause;
      if(!tapOutCause){
        tapOutCause=checkTapOutConditions({
          stamina:newStamina, tierHistory, resistance:prev.resistance,
          addiction:prev.addiction, fullness:newFullness, stomachCapacity:prev.stomachCapacity,
        });
      }
      const burst=[];
      for(let i=0;i<2;i++){
        const l=render(`{stream.chat.perf.${tier}}`,ctx);
        if(l) burst.push(l);
      }
      return {
        ...prev,
        phase:'betweenRound',
        stamina:newStamina,
        sessionGain:prev.sessionGain+roundLbs,
        sessionFullness:newFullness,
        tierHistory, lastRoundTier:tier, lastRoundLbs:roundLbs,
        betweenRoundLine, tapOutCause,
        chatLines:[...prev.chatLines,...burst].slice(-40),
        trend:deriveTrend(tierHistory),
        recentPerf:deriveRecentPerf(tierHistory),
      };
    });
  },[students, week]);

  const continueAfterBetweenRound=()=>{
    setStreamSessionState(prev=>{
      if(!prev) return prev;
      const done=prev.tapOutCause||prev.roundIndex+1>=prev.totalRounds;
      if(done){
        const student=students.find(st=>st.id===prev.studentId);
        const spendFx=aggregateDestinySpendEffects(ensureStreamFields(student).destinyPurchases);
        let rewardsPreview=computeRewards({
          sessionGain:prev.sessionGain,
          tierHistory:prev.tierHistory,
          challenge:prev.challenge,
          brandId:prev.brand,
          audience:student?.audience??120,
          sponsorFavor:student?.sponsorFavor??{},
          tapOutCause:prev.tapOutCause,
          spendEffects:spendFx,
        });
        const specialOutcomes=detectSpecialOutcomes(prev,rewardsPreview,student||{});
        rewardsPreview=applySpecialOutcomeBonuses(rewardsPreview,specialOutcomes);
        return {...prev,phase:'resolution',rewardsPreview,specialOutcomes};
      }
      const student=students.find(st=>st.id===prev.studentId);
      const nextIdx=prev.roundIndex+1;
      const ctx=buildStreamCtx({...prev,roundIndex:nextIdx},student);
      return {
        ...prev,
        phase:'roundStart',
        roundIndex:nextIdx,
        roundStartLine:render('{stream.roundStart}',ctx),
      };
    });
  };

  const tapOutStream=()=>{
    setStreamSessionState(prev=>{
      if(!prev) return prev;
      const cause=checkTapOutConditions({
        stamina:prev.stamina, tierHistory:prev.tierHistory,
        resistance:prev.resistance, addiction:prev.addiction,
        fullness:prev.sessionFullness, stomachCapacity:prev.stomachCapacity,
      })||'performance';
      const student=students.find(st=>st.id===prev.studentId);
      const ctx=buildStreamCtx(prev,student);
      const line=render(`{stream.tapOut.${cause}}`,ctx);
      const tapChat=render(`{stream.chat.tapOut.${cause}}`,ctx);
      const chatBurst=tapChat?[tapChat]:[];
      return {
        ...prev,tapOutCause:cause,
        betweenRoundLine:line||prev.betweenRoundLine,
        chatLines:[...prev.chatLines,...chatBurst].slice(-40),
      };
    });
  };

  const wrapStream=()=>{
    setStreamSessionState(prev=>{
      if(!prev||!prev.rewardsPreview) return prev;
      const r=prev.rewardsPreview;
      const student=students.find(st=>st.id===prev.studentId);
      if(!student) return prev;
      const before=ensureStreamFields(student);
      let updated=before;
      if(r.weightGain>0){
        updated=processStudentGain(updated,Math.round(r.weightGain),0);
        if(r.corruptionGain) updated={...updated,corruption:addCorruption(updated,r.corruptionGain)};
      }
      const brandKey=prev.brand||'none';
      const newFavor={...(updated.sponsorFavor||{})};
      newFavor[brandKey]=Math.min(100,(newFavor[brandKey]||0)+r.favorGain);
      const newStreaks={...(updated.brandStreaks||{})};
      if(prev.brand) newStreaks[prev.brand]=(newStreaks[prev.brand]||0)+1;
      const newAudience=Math.round((updated.audience||120)+r.audienceGain*prev.audienceMult);
      updated={
        ...updated,
        audience:newAudience,
        sponsorFavor:newFavor,
        brandStreaks:newStreaks,
        totalStreams:(updated.totalStreams||0)+1,
        fullness:prev.sessionFullness,
      };
      const{fired,milestones}=detectNewStreamMilestones(before,updated,prev.brand);
      const destinyShare=getDestinyShare(r);
      updated={
        ...updated,
        streamMilestones:milestones,
        destinyMoney:(updated.destinyMoney||0)+destinyShare,
      };
      updated=applyPersonaDrift(updated,prev.brand,r.favorGain);
      setStudents(p=>p.map(st=>st.id===prev.studentId?updated:st));
      if(r.playerShare>0) setMoney(m=>addFunds(m,r.playerShare));
      const ctx=buildStreamCtx(prev,updated,{perf:r.overallTier});
      const endLine=render(`{stream.endStream.${r.overallTier}}`,ctx);
      const tapLine=prev.tapOutCause?render(`{stream.tapOut.${prev.tapOutCause}}`,ctx):'';
      const specialLines=(prev.specialOutcomes||[]).map(id=>render(`{stream.special.${id}}`,ctx)).filter(Boolean);
      const milestoneLines=fired.map(key=>{
        const mod=key.startsWith('stage_')?'stream.milestone.stage':`stream.milestone.${key}`;
        return render(`{${mod}}`,ctx);
      }).filter(Boolean);
      const endingText=[tapLine,...specialLines,...milestoneLines,endLine].filter(Boolean).join('\n\n');
      const flavor=DESTINY_MONEY_FLAVOR[Math.floor(Math.random()*DESTINY_MONEY_FLAVOR.length)];
      fired.forEach((key,i)=>{
        const{label,emoji}=getStreamMilestoneLabel(key);
        setTimeout(()=>push(`📡 ${emoji} Milestone: ${label}`),80+i*120);
      });
      push(`📡 Stream wrapped — ${r.overallTier}. +${Math.round(r.weightGain)} lbs, +${r.audienceGain} audience, ${formatMoney(r.playerShare)} earned, Destiny +${formatMoney(destinyShare)}.`);
      return {
        ...prev,phase:'done',endingText,destinyMoneyFlavor:flavor,
        milestoneFired:fired,specialOutcomes:prev.specialOutcomes||[],
        destinyShare,
      };
    });
  };

  const closeStream=()=>setStreamSessionState(null);

  const openDestinySpend=(studentId)=>setDestinySpendState({studentId});

  const purchaseDestinyItem=(itemId)=>{
    if(!destinySpendState) return;
    setStudents(prev=>prev.map(st=>{
      if(st.id!==destinySpendState.studentId) return st;
      const{ok,student,reason,item}=tryDestinyPurchase(ensureStreamFields(st),itemId);
      if(ok){
        push(`📡 Destiny bought ${item.emoji} ${item.label}.`);
        return student;
      }
      if(reason==='funds') push('⚠️ Destiny cannot afford that.');
      if(reason==='maxed') push('⚠️ Already at max for that upgrade.');
      if(reason==='brand') push('⚠️ Needs a sponsor contract first.');
      return st;
    }));
  };

  const giftDestinyFunds=(amount)=>{
    if(!destinySpendState) return;
    const spent=trySpend(money,amount);
    if(!spent.ok){push(`⚠️ Need ${formatMoney(amount)} to gift Destiny.`);return;}
    setMoney(spent.balance);
    setStudents(prev=>prev.map(st=>st.id===destinySpendState.studentId
      ?{...ensureStreamFields(st),destinyMoney:(st.destinyMoney||0)+amount}:st));
    push(`💸 You gifted Destiny ${formatMoney(amount)}.`);
  };

  // ── Fair Training Collaborations + Fair Day (state_fair_queen) ─────────
  const clampFairStage=(lbs)=>Math.max(4,Math.min(10,getStage(lbs).id));
  const getFairPrideTier=(pride)=>FAIR_TRAINING_CONFIG.fairPrideTiers.find(t=>pride>=t.min&&pride<=t.max)||FAIR_TRAINING_CONFIG.fairPrideTiers[0];

  const startFairTrainingSession=(collabKey)=>{
    const ft=fairTrainingState;
    const mj=students.find(st=>st.id===ft.mjStudentId);
    if(!mj) return;
    if(ap<FAIR_TRAINING_CONFIG.apCost){push(`⚠️ Need ${FAIR_TRAINING_CONFIG.apCost} AP.`);return;}
    if(ft.sessionsThisCycle>=FAIR_TRAINING_CONFIG.maxSessionsPerCycle){push(`⚠️ Mary Jane is trained out — it's Fair Day.`);return;}
    const cfg=FAIR_TRAINING_CONFIG.collaborators[collabKey];
    const collab=students.find(st=>st.evolvedForm===cfg.evolvedForm);
    if(!collab){push(`⚠️ No evolved ${collabKey} available.`);return;}
    setAp(a=>a-FAIR_TRAINING_CONFIG.apCost);
    const mjStage=clampFairStage(mj.lbs);
    const cStage=clampFairStage(collab.lbs);
    let sceneTag, photoTag, recruits=null;
    if(collabKey==='Lilith'){
      const [lo,hi]=ft.lilithRecruitRange;
      recruits=[0,1,2].map(()=>({
        bodyType:FAIR_TRAINING_CONFIG.recruitBodyTypes[rnd(0,FAIR_TRAINING_CONFIG.recruitBodyTypes.length-1)],
        stage:rnd(lo,hi),
      }));
      const avg=recruits.reduce((a,r)=>a+r.stage,0)/3;
      const group=avg<=2?'Early':avg<=4?'Mid':'Late';
      sceneTag=FAIR_TRAINING_SCENES.Lilith[`MJ${mjStage}_L${cStage}_${group}`];
      photoTag=FAIR_TRAINING_PHOTOS.Lilith[`MJ${mjStage}_L${cStage}`];
    } else {
      sceneTag=FAIR_TRAINING_SCENES[collabKey][`MJ${mjStage}_C${cStage}`];
      photoTag=FAIR_TRAINING_PHOTOS[collabKey][`MJ${mjStage}_C${cStage}`];
    }
    // pride boost — halved if she keeps leaning on the same collaborator
    const boostCfg=FAIR_TRAINING_CONFIG.fairPrideBoosts[collabKey];
    let prideBoost=boostCfg.base+boostCfg.perStageBonus*cStage+(boostCfg.perRecruit?boostCfg.perRecruit*3:0);
    if(ft.lastCollaborator===collabKey) prideBoost=Math.round(prideBoost*0.5);
    prideBoost=Math.round(prideBoost);
    const boostTier=cStage<=5?'Low':cStage<=8?'Mid':'High';
    // gains
    const [mjLo,mjHi]=FAIR_TRAINING_CONFIG.gainRanges.MJ;
    const [cLo,cHi]=FAIR_TRAINING_CONFIG.gainRanges.collaborator;
    const mjGain=rnd(mjLo,mjHi), cGain=rnd(cLo,cHi);
    processStudentGain(mj,mjGain,3);
    if(collab.id!==mj.id) processStudentGain(collab,cGain,2);
    push(`🎡 Fair training — ${mj.name} × ${collabKey}: MJ +${mjGain} lbs, ${collabKey} +${cGain} lbs, Fair Pride +${prideBoost}`);
    setFairTrainingState(prev=>({...prev,
      sessionsThisCycle:prev.sessionsThisCycle+1,
      fairPride:prev.fairPride+prideBoost,
      lastCollaborator:collabKey,
      recentCollaborators:[...prev.recentCollaborators,collabKey].slice(-6),
      influenceFlags:[...prev.influenceFlags,collabKey],
      trophyPhotos:[...prev.trophyPhotos,{tag:photoTag,collab:collabKey,cycle:prev.cycleNum}],
      pendingCollab:collabKey, pendingRecruits:recruits,
      sessionSceneTag:sceneTag, sessionPhotoTag:photoTag,
      sessionBoostSummary:FAIR_BOOST_SUMMARIES[collabKey][boostTier],
      sessionLog:{mjGain,cGain,prideBoost,collabName:collab.name},
      view:'session',
    }));
  };

  const closeFairTraining=()=>setFairTrainingState(prev=>({...prev,open:false,view:'main',pendingCollab:null,pendingRecruits:null,sessionSceneTag:null,sessionPhotoTag:null,sessionBoostSummary:null,sessionLog:null}));

  const launchFairDayEvent=()=>{
    const ft=fairTrainingState;
    const mj=students.find(st=>st.id===ft.mjStudentId);
    if(!mj) return;
    const meta=EVOLVED_ACTIVITY_META['state_fair_queen']||{apCost:1};
    if(ap<meta.apCost){push(`⚠️ Need ${meta.apCost} AP.`);return;}
    const stageIdx=getEvolvedActivityStageIdx(mj);
    const evDef=EVOLVED_EVENTS['state_fair_queen']?.[stageIdx];
    if(!evDef){push(`⚠️ No fair event available at this stage.`);return;}
    setAp(a=>a-meta.apCost);
    setFairTrainingState(prev=>({...prev,open:false}));
    setEvolvedEventState({studentId:mj.id,formId:'state_fair_queen',stageIdx,phaseIdx:0,history:[],logLines:[],gainAccum:0,relAccum:0,done:false,endingText:null,gainBonus:0,relBonus:0});
  };

  const startFairDay=(s,stageIdx)=>{
    const flags=fairTrainingState.influenceFlags;
    let influenceKey='None';
    if(flags.length){
      const counts={};
      for(const f of flags) counts[f]=(counts[f]||0)+1;
      influenceKey=Object.entries(counts).sort((a,b)=>b[1]-a[1]||flags.lastIndexOf(b[0])-flags.lastIndexOf(a[0]))[0][0];
    }
    setEvolvedEventState(null);
    setFairDayState({
      studentId:s.id, stageIdx:Math.min(stageIdx,5), influenceKey,
      phase:'weighin', weighInChoice:null, weighInResultText:null, weighInGain:0, weighInRel:0,
      afterpartyChoice:null, afterpartyResultText:null, totalGain:0, relBonus:0,
    });
  };

  const chooseFairWeighIn=(choice)=>{
    setFairDayState(prev=>{
      if(!prev||prev.phase!=='weighin'||prev.weighInChoice) return prev;
      const sc=FAIR_DAY_SCENES.weighIn[`${prev.stageIdx}_${prev.influenceKey}`];
      const prideTier=getFairPrideTier(fairTrainingState.fairPride).label;
      const bonus=FAIR_TRAINING_CONFIG.weighInBonus[prideTier]||0;
      const baseGain=choice===1?sc.gainA:sc.gainB;
      const gain=Math.round(baseGain*(1+bonus));
      const rel=choice===1?sc.relA:sc.relB;
      return {...prev,weighInChoice:choice,
        weighInResultText:`${choice===1?sc.choice1.result:sc.choice2.result}\n\n${choice===1?sc.endingA:sc.endingB}`,
        weighInGain:gain,weighInRel:rel,totalGain:prev.totalGain+gain,relBonus:prev.relBonus+rel};
    });
  };

  const advanceFairDayPhase=()=>{
    setFairDayState(prev=>{
      if(!prev) return prev;
      if(prev.phase==='weighin') return {...prev,phase:'judging'};
      if(prev.phase==='judging') return {...prev,phase:'afterparty'};
      return prev;
    });
  };

  const chooseFairAfterparty=(choice)=>{
    setFairDayState(prev=>{
      if(!prev||prev.phase!=='afterparty'||prev.afterpartyChoice) return prev;
      const sc=FAIR_DAY_SCENES.afterparty[`${prev.stageIdx}_${prev.influenceKey}`];
      const gain=choice===1?sc.gainA:sc.gainB;
      const rel=choice===1?sc.relA:sc.relB;
      return {...prev,afterpartyChoice:choice,
        afterpartyResultText:`${choice===1?sc.choice1.result:sc.choice2.result}\n\n${sc.ending}`,
        totalGain:prev.totalGain+gain,relBonus:prev.relBonus+rel};
    });
  };

  const closeFairDay=()=>{
    const fd=fairDayState;
    if(!fd) return;
    const s=students.find(st=>st.id===fd.studentId);
    if(s){
      processStudentGain(s,fd.totalGain,fd.relBonus);
      setStudents(ss=>ss.map(st=>st.id===fd.studentId?{...st,contestCompletions:(st.contestCompletions||0)+1}:st));
      push(`🏆 Fair Day complete — ${s.name} +${Math.round(fd.totalGain)} lbs, +${fd.relBonus} rel`);
    }
    // new cycle: pride and sessions reset, recruit stage range drifts up every 2 fairs
    setFairTrainingState(prev=>{
      const nextCycle=prev.cycleNum+1;
      const rangeIdx=Math.min(FAIR_TRAINING_CONFIG.recruitStageRanges.length-1,Math.floor(nextCycle/2));
      return {...prev,cycleNum:nextCycle,sessionsThisCycle:0,fairPride:0,influenceFlags:[],lastCollaborator:null,lilithRecruitRange:FAIR_TRAINING_CONFIG.recruitStageRanges[rangeIdx]};
    });
    setFairDayState(null);
  };

  const openIntimacySelector=(s)=>{setIntimacySceneSelector({student:s});};

  const openWeighIn=(s)=>{ if(!s) return; setWeighInState({student:s,phase:"scene"}); };

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
    const {studentId,sceneId,phaseIdx,history,logLines,gainAccum,relAccum}=intimacyEventState;
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


  const startClass=()=>{
    const scenes=generateClassSession(students.filter(studentReceivesPassiveGain),week);
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
      newStudents=newStudents.map(s=>studentReceivesPassiveGain(s)?processStudentGain(s,gainAmt,0):s);
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

  const executeClassFeed=(action,compoundId)=>{
    setAp(a=>a-action.cost);
    let refusals=0,fedCount=0,totalCals=0;
    const compoundLabel=compoundId?COMPOUNDS[compoundId]?.label:null;
    const updated=students.map(s=>{
      if(!studentReceivesPassiveGain(s)) return s;
      const cals=rnd(action.cal[0],action.cal[1]);
      const fed=feedStudentCalories(s,cals,action.full,1,'',compoundId?{compoundId}:{});
      if(!fed){refusals++;return s;}
      fedCount++;totalCals+=cals;
      return fed;
    });
    push(`🎉 ${action.label}: ${fedCount} students dug in (~${Math.round(totalCals/Math.max(1,fedCount)).toLocaleString()} cal each)${refusals?` · ${refusals} too full to join`:""}${compoundLabel?` · laced with ${compoundLabel}`:""}.`);
    const evs=collectEvents(updated);
    setStudents(updated);
    if(evs.length){
      setGlobalStats(g=>({...g,narrativeCount:g.narrativeCount+evs.length}));
      setEventQueue(prev=>[...prev,...evs]);
    }
  };

  const doSingle=(action,s)=>{
    if(ap<action.cost){push("⚠️ Not enough AP!");return;}
    if(action.id==="restaurant"){ guardHungerInterrupt(()=>startDinner(s)); return; }
    guardHungerInterrupt(()=>{
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
    });
  };

  const doClass=(action)=>{
    if(ap<action.cost){push("⚠️ Not enough AP!");return;}
    if(action.id==="group_dinner"){
      setGroupDinnerPicker({count:2,selected:[]});
      return;
    }
    guardHungerInterrupt(()=>{
      const compounds=getStockedCompounds();
      if(compounds.length>0){
        setCompoundFeedPicker({kind:'class',action});
        return;
      }
      executeClassFeed(action,null);
    });
  };

  const openTalk=(s)=>{
    if(!s) return;
    if(s.hidden&&!(s.id===LILITH_ID&&lilithUnlocked)&&!(s.id===ELARA_ID&&elaraDiscovered)) return;
    if(s.id===ELARA_ID&&elaraDiscovered) markElaraMet();
    if(isWithdrawalAggressive(s)&&(s.withdrawalAggroWeeks||0)>0){
      push(`⚠️ ${s.name} is in withdrawal — irritable and snapping at anyone who isn't feeding her.`);
      return;
    }
    if(ap<TALK_CONFIG.apCost){ push(`⚠️ Need ${TALK_CONFIG.apCost} AP to talk.`); return; }
    guardHungerInterrupt(()=>{
      setAp(a=>a-TALK_CONFIG.apCost);
      setTalkStudentId(s.id);
    });
  };

  const armDevouringPresence=(studentId)=>{
    const name=students.find(s=>s.id===studentId)?.name||"her";
    setWeeklyArms(prev=>{
      const togglingOff=prev.devouringStudentId===studentId;
      return{
        devouringStudentId:togglingOff?null:studentId,
        mesmerizingStudentId:prev.mesmerizingStudentId,
        devouringConsumed:false,
      };
    });
    const togglingOff=weeklyArms.devouringStudentId===studentId;
    push(togglingOff?`😈 Devouring Presence disarmed on ${name}.`:`😈 Devouring Presence armed on ${name} — her hunger will surface this week.`);
  };

  const applyTalkEffect=(effect)=>{
    if(!talkStudentId||!effect) return;
    if(effect.cals){
      setStudents(prev=>{
        const st=prev.find(x=>x.id===talkStudentId);
        if(!st) return prev;
        const fed=feedStudentCalories(st,effect.cals,effect.full||0,effect.rel||0,effect.devourShift?"Devour":"Talk");
        if(!fed) return prev;
        let ns=fed;
        if(effect.devourShift){
          const cor=getCorruptionTier(ns.corruption||0).id;
          ns={
            ...ns,
            devourCount:(ns.devourCount||0)+1,
            mood:cor>=2?"content":cor>=1?"nervous":"stressed",
            corruption:addCorruption(ns,effect.corruption||0),
          };
          setTimeout(()=>push(`🩸 ${ns.name} has changed. Something in her eyes is different now.`),200);
        } else if(effect.corruption){
          ns={...ns,corruption:addCorruption(ns,effect.corruption)};
        }
        if(effect.rel && !effect.devourShift){
          ns={...ns,relationship:Math.min(100,ns.relationship+(effect.rel||0))};
        }
        return prev.map(x=>x.id===ns.id?ns:x);
      });
      return;
    }
    setStudents(prev=>prev.map(x=>{
      if(x.id!==talkStudentId) return x;
      let ns={...x};
      if(effect.rel) ns.relationship=Math.min(100,ns.relationship+(effect.rel||0));
      if(effect.corruption) ns={...ns,corruption:addCorruption(ns,effect.corruption)};
      return ns;
    }));
  };

  const buySkillRank=(sk)=>{
    const rank=ownedSkills[sk.id]||0;
    if(rank>=sk.maxRanks) return;
    if(!isTreeTierUnlocked(ownedSkills,sk.tree,sk.tier)) return;
    if(availableSkillPoints<RANK_COSTS[sk.tier]) return;
    const capKey=sk.effects?.capacityBonus;
    const capDelta=capKey?sk.effects.capacityBonus:0;
    setOwnedSkills(prev=>({...prev,[sk.id]:rank+1}));
    if(capDelta){
      setStudents(prev=>prev.map(st=>({
        ...st,
        stomachCapacity:(st.stomachCapacity||GAIN_CONFIG.baseCapacity)+capDelta,
      })));
    }
    push(`✦ ${sk.name}${sk.maxRanks>1?` — rank ${rank+1}`:" unlocked"}`);
  };

  const maxSkillRank=(sk)=>{
    let sim={...ownedSkills};
    let avail=availableSkillPoints;
    let bought=0;
    let capDelta=0;
    while((sim[sk.id]||0)<sk.maxRanks&&avail>=RANK_COSTS[sk.tier]&&isTreeTierUnlocked(sim,sk.tree,sk.tier)){
      sim[sk.id]=(sim[sk.id]||0)+1;
      avail-=RANK_COSTS[sk.tier];
      bought++;
      if(sk.effects?.capacityBonus) capDelta+=sk.effects.capacityBonus;
    }
    if(!bought) return;
    setOwnedSkills(sim);
    if(capDelta){
      setStudents(prev=>prev.map(st=>({
        ...st,
        stomachCapacity:(st.stomachCapacity||GAIN_CONFIG.baseCapacity)+capDelta,
      })));
    }
    push(`✦ ${sk.name}: +${bought} rank${bought>1?"s":""}${(sim[sk.id]||0)>=sk.maxRanks?" (maxed)":""}`);
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
  };

  // ── DINNER END (single) ──────────────────────────────────────
  const triggerDinnerEnd=(s,finalFullness,maxFullness,totalGain,relBonus)=>{
    const stId=getStage(s.lbs).id;
    const stGrp=stId<=2?0:stId<=5?1:stId<=7?2:3;
    const ratio=finalFullness/maxFullness;
    const fullGrp=ratio<=1.0?0:ratio<=1.3?1:ratio<=1.6?2:3;
    const narrative=DINNER_ENDING_TEXT[stGrp][fullGrp](s);
    guardHungerInterrupt(()=>{
      setAp(a=>a-2);
      push(`✅ Dinner with ${s.name} complete. +${totalGain.toLocaleString()} cal packed in (≈${Math.round(calsToLbs(totalGain))} lbs once digested) · +${relBonus} relationship.`);
      setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,relationship:Math.min(100,st.relationship+relBonus)}));
      const evs=collectEvents([s]);
      if(evs.length){setGlobalStats(g=>({...g,narrativeCount:g.narrativeCount+evs.length}));setEventQueue(prev=>[...prev,...evs]);}
      setDinnerEvent(null);
      setDinnerEndPopup({ student:s, finalFullness, maxFullness, totalGain, narrative });
    });
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
    const scaledGain=Math.round(gain*GAIN_CONFIG.calsPerLb*skillGainMult*(dinnerEvent.student.gainMultiplier||1));
    const prevFullness=dinnerEvent.fullness||0;
    const newFullness=prevFullness+(dish.fullness||15);
    const maxFull=dinnerEvent.maxFullness||80;
    const newTotalGain=dinnerEvent.totalGain+scaledGain;
    const newDishes=[...(dinnerEvent.dishes||[]),dish.id];
    setStudents(prev=>prev.map(s=>s.id!==dinnerEvent.student.id?s:{...s,consumedCalories:(s.consumedCalories||0)+scaledGain,fullness:(s.fullness||0)+Math.round((dish.fullness||15)*0.5)}));
    push(`🍴 ${dinnerEvent.student.name}: ${dish.label} (+${scaledGain.toLocaleString()} cal)`);
    // Overfill probabilistic ending
    if(newFullness>maxFull){
      const overfillRatio=(newFullness-maxFull)/maxFull;
      const endChance=Math.min(0.8,overfillRatio);
      if(Math.random()<endChance){
        const s=students.find(st=>st.id===dinnerEvent.student.id)||dinnerEvent.student;
        const sUpdated=s;
        const endMsg=getOverfillEndMsg(sUpdated,getStage(sUpdated.lbs).id);
        setDinnerLog(dl=>[...dl,`🍴 ${dish.label} arrives. ${dish.desc} (+${scaledGain.toLocaleString()} cal)`,`😵 ${endMsg}`]);
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
    setDinnerLog(dl=>[...dl,`🍴 ${dish.label} arrives. ${dish.desc} (+${scaledGain.toLocaleString()} cal)${fullMsg}`]);
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
    const scaledBonus=Math.round(gainBonus*GAIN_CONFIG.calsPerLb*skillGainMult*(s.gainMultiplier||1));
    const convText=conv.text(s,stId);
    const fullnessChange=conv.fullnessEffect||0;
    const newFullness=Math.max(0,(dinnerEvent.fullness||0)+fullnessChange);
    const newOffense=(dinnerEvent.offenseLevel||0)+(conv.offenseRisk||0);
    setDinnerLog(dl=>[...dl,`💬 ${convText}${scaledBonus>0?` (+${scaledBonus.toLocaleString()} cal)`:""}`]);
    push(`💬 Dinner conversation: ${conv.label}`);
    setDinnerEvent(prev=>({...prev,conversationUsed:[...prev.conversationUsed,conv.id],totalGain:prev.totalGain+scaledBonus,fullness:newFullness,offenseLevel:newOffense}));
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,consumedCalories:(st.consumedCalories||0)+scaledBonus,relationship:Math.min(100,st.relationship+(conv.relBonus||0))}));
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
    const scaledGain=Math.round(gain*GAIN_CONFIG.calsPerLb*skillGainMult*(target.gainMultiplier||1));
    const newFullness=target.fullness+(dish.fullness||15);
    const maxFull=target.maxFullness;
    const newTotalGain=target.totalGain+scaledGain;
    const newDishes=[...target.dishes,dish.id];
    setStudents(prev=>prev.map(s=>s.id!==targetId?s:{...s,consumedCalories:(s.consumedCalories||0)+scaledGain,fullness:(s.fullness||0)+Math.round((dish.fullness||15)*0.5)}));
    push(`🍴 ${target.name}: ${dish.label} (+${scaledGain.toLocaleString()} cal)`);

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
    push(`✅ Group dinner complete. ${totalG.toLocaleString()} cal total across ${groupDinnerEvent.students.length} girls (≈${Math.round(calsToLbs(totalG))} lbs once digested).`);
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


  // ── PRIVATE SESSION FUNCTIONS ──────────────────────────────────
  const startPrivateSession=(s)=>{
    const tier=getTier(s.relationship);
    if(tier.id<1){push(`⚠️ ${s.name} needs to be at least Close tier for a private session.`);return;}
    if(s.id===10&&cultivatorState?.digestWeeksLeft>0){push(`⚠️ Reneé is digesting — ${cultivatorState.digestWeeksLeft} week(s) remaining.`);return;}
    if(ap<2){push("⚠️ Need 2 AP.");return;}
    guardHungerInterrupt(()=>{
      const hist=sessionHistory[s.id]||{count:0,totalGain:0,capacityBonus:0};
      setSessionLog([]);
      setPrivateSession({
        student:s,phase:"venue",venue:null,foods:[],totalGain:0,
        fullness:0,maxFullness:100+hist.capacityBonus+skillSessionCapBonus,
        encouragementsUsed:[],toleranceBuffer:0,sessionNum:hist.count+1,
        refillRound:0,tappedOut:false,tapOutDialogue:null,
      });
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
    const scaledGain=Math.round(gain*GAIN_CONFIG.calsPerLb*skillGainMult*(s.gainMultiplier||1));
    const newFullness=privateSession.fullness+food.fullness;
    const effectiveMax=privateSession.maxFullness+privateSession.toleranceBuffer;
    const fPct=Math.round((newFullness/effectiveMax)*100);
    const fsStage=getFullnessStage(fPct);
    const descFns=SESSION_FULLNESS_DESCS[s.archetype]||SESSION_FULLNESS_DESCS.default;
    const desc=descFns[Math.min(fsStage.id,descFns.length-1)](s);
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,consumedCalories:(st.consumedCalories||0)+scaledGain}));
    push(`🍽️ ${food.label}: +${scaledGain.toLocaleString()} cal`);
    setSessionLog(sl=>[...sl,`🍽️ ${food.label} (+${scaledGain.toLocaleString()} cal) — ${food.desc}`,`   ${desc}`]);
    // Check for tap-out
    const tapProb=fPct<150?0:fPct>=250?Infinity:((fPct-150)/100)*0.90;
    const adjustedTapProb=tapProb===Infinity?1:Math.max(0,tapProb-skillTapOutResistance);
    const tapsOut=Math.random()<adjustedTapProb;
    if(tapsOut){
      const liveS=students.find(st=>st.id===s.id)||s;
      let tapLine;
      if(fPct>=250){
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
      setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,relationship:Math.min(100,st.relationship+4),fullness:Math.max(st.fullness||0,Math.round((st.stomachCapacity||GAIN_CONFIG.baseCapacity)*Math.min(2.5,fPct/100)))}));
      push(`⛔ ${s.name} taps out! Session ended — ${currentTotalGain.toLocaleString()} cal packed in (≈${Math.round(calsToLbs(currentTotalGain))} lbs once digested).`);
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
  const debugApply=(sid)=>{
    const inp=debugInputs[sid]||{};
    const newLbs=Math.max(80,parseInt(inp.lbs)||0);
    const newRel=inp.rel!==undefined?Math.min(100,Math.max(0,parseInt(inp.rel))):undefined;
    setStudents(prev=>prev.map(s=>{
      if(s.id!==sid) return s;
      const patch={...s,lbs:newLbs||s.lbs};
      if(newRel!==undefined) patch.relationship=newRel;
      return patch;
    }));
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
      setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,consumedCalories:(st.consumedCalories||0)+lbsBonus*GAIN_CONFIG.calsPerLb}));
    }
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,relationship:Math.min(100,st.relationship+enc.relBonus)}));
    setPrivateSession(prev=>({
      ...prev,
      encouragementsUsed:[...prev.encouragementsUsed,enc.id],
      toleranceBuffer:prev.toleranceBuffer+enc.toleranceBoost,
      totalGain:prev.totalGain+lbsBonus*GAIN_CONFIG.calsPerLb,
    }));
  };

  const endPrivateSession=()=>{
    const s=privateSession.student;
    const effectiveMax=privateSession.maxFullness+privateSession.toleranceBuffer;
    const fPct=Math.round((privateSession.fullness/effectiveMax)*100);
    guardHungerInterrupt(()=>{
    setAp(a=>a-2);
    addScrutiny(2);
    const hist=sessionHistory[s.id]||{count:0,totalGain:0,capacityBonus:0};
    const newCapBonus=hist.capacityBonus+8;
    setSessionHistory(prev=>({...prev,[s.id]:{count:hist.count+1,totalGain:hist.totalGain+privateSession.totalGain,capacityBonus:newCapBonus}}));
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,relationship:Math.min(100,st.relationship+4),fullness:Math.max(st.fullness||0,Math.round((st.stomachCapacity||GAIN_CONFIG.baseCapacity)*Math.min(2.5,fPct/100)))}));
    const aftermath=getAftermath(fPct);
    const liveStudent=students.find(st=>st.id===s.id)||s;
    push(`✅ Session with ${s.name} complete. ${privateSession.totalGain.toLocaleString()} cal packed in (≈${Math.round(calsToLbs(privateSession.totalGain))} lbs once digested) · session capacity expanded (+8).`);
    setSessionResult({student:liveStudent,totalGain:privateSession.totalGain,fullnessPct:fPct,scene:aftermath.scene(liveStudent),sessionCount:hist.count+1,capacityBonus:newCapBonus});
    setPrivateSession(null);
    });
  };

  const sel=selectedId!==null?students.find(s=>s.id===selectedId):null;
  const talkStudent=talkStudentId!=null?students.find(s=>s.id===talkStudentId):null;
  const totalGained=students.reduce((a,s)=>a+(s.lbs-s.startLbs),0);
  const spiritXp=Math.max(0,Math.round(totalGained));
  const spiritLevel=1+Math.floor(spiritXp/SPIRIT_XP_PER_LEVEL);
  const spiritRankProgress=Math.max(0,spiritLevel-1);
  const totalSkillPoints=Math.max(0,spiritLevel-1);
  const visibleStudents=students.filter(studentVisibleOnCampus);
  const avgLbs=Math.round(visibleStudents.reduce((a,s)=>a+s.lbs,0)/Math.max(1,visibleStudents.length));
  // ── PROFESSOR SUBJECT / TRAIT EFFECTS ───────────────────────
  const hasTrait=(id)=>professorProfile?.traits?.includes(id)||false;
  const hasSubj=(id)=>professorProfile?.subject===id;
  const profGainMult=1+(hasSubj("nutrition")?0.1:0)+(hasSubj("philosophy")?0.05:0)+(hasTrait("generous")?0.15:0);
  const profPassiveBonus=hasTrait("patient")?1:0;
  // ── SKILL TREE DERIVED VALUES ──────────────────────────────
  const skillEffects=aggregateSkillEffects(ownedSkills);
  const spentSkillPoints=computeSpentSkillPoints(ownedSkills);
  const availableSkillPoints=Math.max(0,totalSkillPoints-spentSkillPoints);
  const hasSkill=(id)=>(ownedSkills[id]||0)>0;
  const skillPassiveBonus=(skillEffects.passiveLbs||0)+profPassiveBonus;
  const skillApBonus=0;
  const skillGainMult=profGainMult;
  const skillScrutinyReduce=1;
  const skillScrutinyPassiveReduce=0;
  const skillSessionCapBonus=0;
  const skillTapOutResistance=0;
  // EP2: total weekly scrutiny reduction from evolved skills across all students
  const evolvedScrutinyReduce=students.reduce((total,s)=>{
    if(!s.evolvedForm||!(s.evolvedSkills||[]).length) return total;
    const tree=EVOLVED_SKILL_TREES[s.evolvedForm]||[];
    return total+tree.filter(sk=>(s.evolvedSkills||[]).includes(sk.id)&&sk.weeklyScrutinyReduce).reduce((a,b)=>a+(b.weeklyScrutinyReduce||0),0);
  },0);

  // ── EFFECTIVE ACTIONS (applying unlocked skill effects) ──────
  const effectiveSingleActions=ACTIONS_SINGLE;
  const effectiveClassActions=ACTIONS_CLASS;

  const availableVenues=DINNER_VENUES.filter(v=>{
    if(v.id==="home_dinner") return false;
    if(v.id==="atelier") return false; // filtered per-student inside dinner modal
    return true;
  });

  const views=["class","actions","achievements","log"];
  if(sel) views.splice(1,0,"student");

  // ── OPENING SPIRIT INTRO ───────────────────────────────────────
  if(!professorProfile){
    return(
      <div style={{...C.app,alignItems:"center",justifyContent:"center",padding:20}}>
        <div style={{...C.modal,maxWidth:680,background:"radial-gradient(circle at 50% 0%,#1d1034,#0d0618 52%,#070510)",border:"1px solid #6a2cc0",boxShadow:"0 0 80px rgba(130,60,220,0.32)"}}>
          <div style={{textAlign:"center",marginBottom:22}}>
            <div style={{fontSize:10,letterSpacing:4,color:"#8a4be0",marginBottom:8}}>A SPIRIT FINDS PURCHASE</div>
            <h1 style={{color:"#d8b0ff",margin:"0 0 8px",fontSize:28,fontWeight:400,fontFamily:"inherit"}}>Before the Semester Begins</h1>
            <div style={{color:"#7d68a8",fontSize:13}}>The professor is only the first door.</div>
          </div>

          <div style={{background:"rgba(255,255,255,0.035)",border:"1px solid rgba(140,80,220,0.25)",borderRadius:10,padding:"18px 20px",marginBottom:22}}>
            {SPIRIT_INTRO_PARAGRAPHS.map((paragraph,idx)=>(
              <p key={idx} style={{margin:idx===0?"0 0 14px":"14px 0 0",color:idx===0?"#ead8ff":"#c9b4e8",fontSize:idx===0?17:14,lineHeight:1.8}}>
                {paragraph}
              </p>
            ))}
          </div>

          <div style={{display:"flex",justifyContent:"center"}}>
            <button onClick={inhabitProfessor}
              style={{...C.btn("#7020c8"),fontSize:14,padding:"12px 34px",boxShadow:"0 0 24px rgba(112,32,200,0.35)"}}>
              Inhabit the Professor
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
              {" · "}{dinnerEndPopup.totalGain.toLocaleString()} cal tonight (≈+{Math.round(dinnerEndPopup.totalGain/3500)} lbs digesting)
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
                      {gev.students.reduce((a,s)=>a+s.totalGain,0).toLocaleString()} cal total
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

      {/* HEADER */}
      <div style={C.hdr}>
        <div>
          <div style={{fontSize:19,fontWeight:700,letterSpacing:2,color:"#b888ff"}}>PROFESSOR'S QUARTERS</div>
          <div style={{fontSize:10,color:"#60389a",letterSpacing:3}}>A WEIGHT MANAGEMENT SIMULATION</div>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
          {[["AP",ap,"#e0a8ff"],["Wk",week,"#e0a8ff"],["Spirit",`Lv ${spiritLevel}`,"#a0e0b0"],["Pts",availableSkillPoints,"#f0c060"]].map(([l,v,c])=>(
            <div key={l} style={{textAlign:"center",background:"rgba(80,18,140,0.3)",borderRadius:6,padding:"2px 11px"}}>
              <span style={{fontSize:17,fontWeight:700,color:c,display:"block"}}>{l==="Wk"?`Wk ${v}`:v}</span>
              <span style={{fontSize:9,color:"#60389a",letterSpacing:2}}>
                {l==="Wk"?"WEEK":l==="AP"?"ACTION PTS":l==="Spirit"?"SPIRIT":"SKILL PTS"}
              </span>
            </div>
          ))}
          {(()=>{
            const rank=([...PROFESSOR_RANKS].reverse().find(r=>spiritRankProgress>=r.min)||PROFESSOR_RANKS[0]);
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
          <WalletBadge balance={money} />
          {students.some(s=>s.evolvedForm==='competitive_gainer')&&(
            <button onClick={()=>setCgChatOpen(true)} style={{...C.btn("#7a1530"),fontSize:10,border:"1px solid #e8294a40"}}>💬 Softening Stats</button>
          )}
          <button onClick={()=>setDebugOpen(d=>!d)} style={{...C.btn("#222244"),fontSize:10,opacity:0.7}}>🐛 Debug</button>
        </div>
      </div>

      {/* NAV */}
      <div style={C.nav}>
        {[["class","📋 Roster"],["student","👤 "+(sel?.name||"Student")],["actions","🎭 Actions"],["inventory","🎒 Pantry"],["campus","🗺️ Campus"],["skills","🌒 Spirit"],["achievements","🏆 Achievements"],
          ...(labState?[["lab","🔧 The Lab"],["devices","🛠 Devices"],...(labState.stage>=2?[["network","⚙️ Network"]]:[])]:[]),
        ].map(([v,l])=>(
          v==="student"&&!sel?null:
          <button key={v} style={C.navB(view===v)} onClick={()=>setView(v)}>{l}</button>
        ))}
      </div>

      <div style={C.body}>
        <div style={C.main}>

          {/* ── CLASS VIEW ── */}
          {view==="class"&&<ClassView view={view} ap={ap} students={students} lilithUnlocked={lilithUnlocked} elaraDiscovered={elaraDiscovered} avgLbs={avgLbs} setSelectedId={setSelectedId} setView={setView} week={week} pharmacistState={pharmacistState}/>}

          {/* ── STUDENT DETAIL ── */}
          {view==="student"&&sel&&<StudentDetailView openWeighIn={openWeighIn} openTalk={openTalk} ap={ap} chapterHostessState={chapterHostessState} communityResearcherState={communityResearcherState} cultivatorState={cultivatorState} pharmacistState={pharmacistState} labState={labState} deviceInventory={deviceInventory} runPharmacistSynthesis={runPharmacistSynthesis} runPharmacistCultDistribution={runPharmacistCultDistribution} runLabSession={runLabSessionOpen} openLabView={openLabView} openNetworkView={openNetworkView} openNetworkControl={openNetworkControl} openEquipModal={setEquipModalStudentId} runDeviceAction={runDeviceAction} unequipDeviceSlot={unequipDeviceSlot} doEvolvedActivity={doEvolvedActivity} doSingle={doSingle} effectiveSingleActions={effectiveSingleActions} lilithKillCount={lilithKillCount} lilithUnlocked={lilithUnlocked} openCaseStudyGrid={openCaseStudyGrid} openCultivatorHarvest={openCultivatorHarvest} openCultivatorRecruit={openCultivatorRecruit} openDigestCheck={openDigestCheck} openEvolutionModal={openEvolutionModal} openFeastPrep={openFeastPrep} openFinalReview={openFinalReview} openIntimacySelector={openIntimacySelector} openLilithHunt={openLilithHunt} openThesisBoard={openThesisBoard} purchaseEvolvedSkill={purchaseEvolvedSkill} openDestinySpend={openDestinySpend} sel={sel} sessionHistory={sessionHistory} setChapterHostessState={setChapterHostessState} setNadiaNotesState={setNadiaNotesState} setStudents={setStudents} setSubjectJournalState={setSubjectJournalState} setView={setView} startCultivatorSession={startCultivatorSession} startPrivateSession={startPrivateSession} startRecordingSession={startRecordingSession} startStream={startStream} students={students} week={week}/>}

          {/* ── CLASS ACTIONS ── */}
          {view==="actions"&&<ActionsView ap={ap} doClass={doClass} effectiveClassActions={effectiveClassActions}/>}

          {/* ── PANTRY / INVENTORY ── */}
          {view==="inventory"&&<InventoryView inventory={inventory} setItemTargetPicker={setItemTargetPicker}/>}

          {view==="lab"&&<LabView
            labState={labState}
            taliaStudent={taliaStudent()}
            money={money}
            ap={ap}
            onBuild={buildLabDevice}
            onUnlockTech={unlockLabTech}
            onOpenSession={()=>{ const t=taliaStudent(); if(t) runLabSessionOpen(t); }}
          />}

          {view==="devices"&&<DeviceInventoryView
            deviceInventory={deviceInventory}
            setDeviceTargetPicker={setDeviceTargetPicker}
            setEquipPicker={setEquipPicker}
            setAttachPicker={setAttachPicker}
          />}

          {view==="network"&&<NetworkView
            labState={labState}
            deviceInventory={deviceInventory}
            students={students}
            onAddNode={handleAddNetworkNode}
            onSlotExperiment={handleSlotExperiment}
            onClearSlot={handleClearExperimentSlot}
            onUpgradeNode={handleUpgradeNetworkNode}
            onSetAutomation={handleSetNodeAutomation}
            onExpandArea={handleExpandDeployment}
            onApproveProposal={handleApproveProposal}
            onDenyProposal={handleDenyProposal}
            onAdjustIntegration={handleAdjustIntegration}
            onUpgradeNexus={handleUpgradeNexus}
          />}

          {/* ── CAMPUS EXPLORATION ── */}
          {view==="campus"&&<CampusView
            campusState={campusState}
            moveToCampusNode={moveToCampusNode}
            lookAround={lookAround}
            searchCampus={searchCampus}
            beginElaraQuest={beginElaraQuest}
            explorationCtx={getCampusExplorationCtx()}
            campusTier={getCampusNarrativeTier(pharmacistState)}
            elaraMet={elaraMet}
            deviceInventory={deviceInventory}
            useCampusDevice={useCampusDevice}
            dismissCampusEncounter={dismissCampusEncounter}
          />}

{/* ── SKILL TREE ── */}
          {view==="skills"&&<SkillTreeView availableSkillPoints={availableSkillPoints} ownedSkills={ownedSkills} skillEffects={skillEffects} students={students} onBuy={buySkillRank} onMax={maxSkillRank} spiritLevel={spiritLevel} spiritXp={spiritXp%SPIRIT_XP_PER_LEVEL} spiritXpForNextLevel={SPIRIT_XP_PER_LEVEL}/>}

          {view==="achievements"&&<AchievementsView achievements={achievements}/>}

        </div>

        {/* ── SIDEBAR: LIVE LOG ── */}
        <div style={{...C.side, display:"flex", flexDirection:"column"}}>
          <p style={{...C.secT, flexShrink:0}}>Event Log — {log.length} entries</p>
          <div ref={logRef} style={{flex:1, overflow:"auto"}}>
            {log.map((e,i)=><div key={i} style={C.logE}>{e}</div>)}
          </div>
        </div>
      </div>

      {/* ── STUDY CHECK-IN MODAL ── */}

      {/* ── ITEM TARGET PICKER ── */}
      {itemTargetPicker&&<ItemTargetPicker itemTargetPicker={itemTargetPicker} setItemTargetPicker={setItemTargetPicker} students={students} lilithUnlocked={lilithUnlocked} useItemOn={useItemOn}/>}

      {deviceTargetPicker&&<DeviceTargetPicker deviceTargetPicker={deviceTargetPicker} setDeviceTargetPicker={setDeviceTargetPicker} students={students} lilithUnlocked={lilithUnlocked} useDeviceOn={useDeviceOn}/>}
      {equipPicker&&<EquipPicker equipPicker={equipPicker} setEquipPicker={setEquipPicker} students={students} lilithUnlocked={lilithUnlocked} equipDeviceOn={equipDeviceOn}/>}
      {attachPicker&&<AttachPicker attachPicker={attachPicker} setAttachPicker={setAttachPicker} students={students} lilithUnlocked={lilithUnlocked} attachDeviceOn={attachDeviceOn}/>}
      {equipModalStudentId!=null&&(
        <StudentEquipModal
          student={students.find(st=>st.id===equipModalStudentId)}
          deviceInventory={deviceInventory}
          onClose={()=>setEquipModalStudentId(null)}
          onUnequip={unequipDeviceSlot}
          onEquip={equipDeviceOn}
          onAttach={attachDeviceOn}
        />
      )}
      {malfunctionPopup&&<MalfunctionPopup malfunctionPopup={malfunctionPopup} setMalfunctionPopup={setMalfunctionPopup}/>}
      {deviceTickQueue&&(
        <DeviceTickPopup
          queue={deviceTickQueue}
          onAdvance={()=>setDeviceTickQueue(q=>(q?{...q,index:q.index+1}:null))}
          onDismissAll={()=>setDeviceTickQueue(null)}
        />
      )}
      {labSession&&labStudentId!=null&&(()=>{
        const labStudent=students.find(st=>st.id===labStudentId);
        if(!labStudent) return null;
        return(
          <LabBuildModal
            labSession={labSession}
            setLabSession={setLabSession}
            taliaStudent={labStudent}
            onConfirm={confirmLabSession}
            onCancel={cancelLabSession}
            applyAcquisition={applyLabAcquisitionChoice}
          />
        );
      })()}

      {/* ── TIER-UP MODAL ── */}
      {tierUpModal&&<TierUpModal setStudents={setStudents} setTierUpModal={setTierUpModal} tierUpModal={tierUpModal}/>}

      {/* ── SOCIAL EVENT PICKER ── */}

      {/* ── SOCIAL EVENT RESULT ── */}

      {/* ── PRIVATE SESSION MODAL ── */}
      {privateSession&&<PrivateSessionModal chooseSessionVenue={chooseSessionVenue} endPrivateSession={endPrivateSession} feedInSession={feedInSession} getMoreFood={getMoreFood} privateSession={privateSession} sessionLog={sessionLog} setAp={setAp} setPrivateSession={setPrivateSession} skillTapOutResistance={skillTapOutResistance} startIntimacyScene={startIntimacyScene} useSessionEncouragement={useSessionEncouragement}/>}

      {/* ── EP5: INTIMACY SCENE SELECTOR ── */}
      {intimacySceneSelector&&<IntimacySceneSelector ap={ap} intimacySceneSelector={intimacySceneSelector} setIntimacySceneSelector={setIntimacySceneSelector} startIntimacyScene={startIntimacyScene}/>}

      {/* ── EP5: ACTIVE INTIMACY SCENE ── */}
      {intimacyEventState&&<ActiveIntimacyScene closeIntimacyEvent={closeIntimacyEvent} intimacyEventState={intimacyEventState} makeIntimacyChoice={makeIntimacyChoice} students={students}/>}

      {/* ── DEBUG PANEL ── */}
      {debugOpen&&<DebugPanel adminScrutiny={adminScrutiny} ap={ap} debugApply={debugApply} debugInputs={debugInputs} setAdminScrutiny={setAdminScrutiny} setAp={setAp} setDebugInputs={setDebugInputs} setDebugOpen={setDebugOpen} setLilithUnlocked={setLilithUnlocked} setStudents={setStudents} students={students}/>}

      {/* ── TAP-OUT POPUP ── */}
      {tapOutPopup&&<TapOutPopup setTapOutPopup={setTapOutPopup} tapOutPopup={tapOutPopup}/>}

      {/* ── WEIGH-IN MODAL ── */}
      {weighInState&&<WeighInModal
        weighInState={weighInState}
        setWeighInState={setWeighInState}
        bigScaleUnlocked={bigScaleUnlocked}
        brokeScaleIds={brokeScaleIds}
        onBreakScale={(sid)=>setBrokeScaleIds(arr=>arr.includes(sid)?arr:[...arr,sid])}
        onUnlockBigScale={()=>{ setBigScaleUnlocked(true); push("⚖ Ordered a heavy-duty 1000 lb scale."); }}
        week={week}
        campusFattening={!!pharmacistState?.campusFattening}
        campusTier={getCampusNarrativeTier(pharmacistState)}
      />}

      {/* ── SESSION RESULT ── */}
      {sessionResult&&<SessionResultModal sessionResult={sessionResult} setSessionResult={setSessionResult}/>}

      {/* ── GODDESS VISION MODAL ── */}

      {/* ── CONVERGENCE MODAL ── */}
      {/* ── EP2: EVOLUTION OFFER MODAL ── */}
      {evolutionModal&&<EvolutionOfferModal chooseEvolution={chooseEvolution} evolutionModal={evolutionModal} setEvolutionModal={setEvolutionModal}/>}

      {/* ── EP2: INTERACTIVE EVOLVED EVENT MODAL ── */}
      {evolvedEventState&&<EvolvedEventModal batchBakerState={batchBakerState} closeEvolvedEvent={closeEvolvedEvent} collabPartnerId={collabPartnerId} evolvedEventState={evolvedEventState} makeEvolvedEventChoice={makeEvolvedEventChoice} push={push} setChallengeState={setChallengeState} setDeliveryState={setDeliveryState} setEvolvedEventState={setEvolvedEventState} setPresentationState={setPresentationState} startCollabStream={startCollabStream} startEatingContest={startEatingContest} startFairDay={startFairDay} startRankedSession={startRankedSession} startSumoMatch={startSumoMatch} startStream={startStream} students={students}/>}

      {/* ── HOMEROOM QUEEN: CLASSROOM MINI-INTERFACE ── */}
      {homeroomSessionState&&<HomeroomQueenModal homeroomSessionState={homeroomSessionState} students={students} batchBakerState={batchBakerState} makeHomeroomActivityChoice={makeHomeroomActivityChoice} advanceHomeroomActivityPhase={advanceHomeroomActivityPhase} dismissHomeroomActivity={dismissHomeroomActivity} openHomeroomConference={openHomeroomConference} startHomeroomGroupActivity={startHomeroomGroupActivity} closeHomeroomSession={closeHomeroomSession}/>}

      {/* ── WIFE LESSONS MINI-GAME ── */}
      {wifeLessonsState?.session&&<WifeLessonsModal wifeLessonsState={wifeLessonsState} makeWifeLessonsConversationChoice={makeWifeLessonsConversationChoice} makeWifeLessonsSubChoice={makeWifeLessonsSubChoice} dismissWifeLessonsConversation={dismissWifeLessonsConversation} chooseWifeLessonsLesson={chooseWifeLessonsLesson} startWifeLessonsConversation={startWifeLessonsConversation} closeWifeLessonsSession={closeWifeLessonsSession}/>}

      {/* ── COMPETITIVE GAINER — GROUP CHAT MODAL (always accessible when evolved) ── */}
      {cgChatOpen&&<CompetitiveGainerChatModal competitiveGainerState={competitiveGainerState} students={students} getCGSpiritTier={getCGSpiritTier} cgProfessorReply={cgProfessorReply} setCgChatOpen={setCgChatOpen}/>}

      {/* ── COMPETITIVE GAINER — MAIN EVOLVED MODAL ── */}
      {competitiveGainerState?.open&&<CompetitiveGainerMainModal competitiveGainerState={competitiveGainerState} students={students} getCGSpiritTier={getCGSpiritTier} getMeasurements={getMeasurements} lilithUnlocked={lilithUnlocked} doCGMeasurement={doCGMeasurement} setCompetitiveGainerState={setCompetitiveGainerState} applyAndCloseCGBinge={applyAndCloseCGBinge} doCGCorkboard={doCGCorkboard} openCGMeasurementPicker={openCGMeasurementPicker} doCGSelfReview={doCGSelfReview} ap={ap} setAp={setAp} doCGBinge={doCGBinge} closeCGModal={closeCGModal}/>}

      {/* ── MAYA DELIVERY HIVE — TERRITORY MANAGEMENT MODAL ── */}
      {mayaHiveState?.open&&<MayaHiveModal hiveState={mayaHiveState} students={students} lilithUnlocked={lilithUnlocked} chooseHiveVP={chooseHiveVP} adjustHiveAssignment={adjustHiveAssignment} executeMayaHiveShift={executeMayaHiveShift} doMayaHiveVisit={doMayaHiveVisit} doMayaHivePhoto={doMayaHivePhoto} doMayaHiveAbsorb={doMayaHiveAbsorb} setMayaHiveState={setMayaHiveState} closeMayaHive={closeMayaHive}/>}

      {/* ── EATING CONTEST MINI-GAME MODAL ── */}
      {eatingContestState&&<EatingContestModal eatingContestState={eatingContestState} students={students} toggleFoodSelection={toggleFoodSelection} eatContestFood={eatContestFood} doContestAction={doContestAction} doDevour={doDevour} setEatingContestState={setEatingContestState} closeEatingContest={closeEatingContest} dismissContestPopup={dismissContestPopup}/>}

      {/* ── RANKED FEEDEE SESSION MINI-GAME MODAL ── */}
      {rankedFeedeeState&&(()=>{
        const{studentId,stageIdx,focus,maxFocus,fullness,maxFullness,gain,log,done,endReason}=rankedFeedeeState;
        const s=students.find(st=>st.id===studentId); if(!s) return null;
        const focusPct=Math.min(100,Math.round((focus/maxFocus)*100));
        const fullnessPct=Math.min(100,Math.round((fullness/maxFullness)*100));
        const STAGE_LABELS=["Bronze Session","Silver Grind","Gold Streak","Platinum Marathon","Diamond Run","Grandmaster Session"];
        const stageTitle=STAGE_LABELS[stageIdx]||"Ranked Session";
        const canQuit=stageIdx<2;
        const payoffFn=SESSION_PAYOFF_TEXT[stageIdx];
        const payoffText=done&&payoffFn?payoffFn(gain,endReason):`Session closed with ${Math.round(gain)} lbs gained.`;
        return(
          <div style={{...C.overlay,zIndex:1200}}>
            <div style={{...C.modal,maxWidth:580,background:"linear-gradient(160deg,#040810,#080e1a,#040810)",border:"1px solid #1a5a9050",maxHeight:"90vh",overflowY:"auto",padding:20}}>
              <div style={{fontSize:9,letterSpacing:4,color:"#3080c0",marginBottom:4}}>{stageTitle.toUpperCase()}</div>
              <div style={{fontSize:14,fontWeight:700,color:"#60a0e0",marginBottom:8}}>{s.name}</div>

              {/* BARS */}
              <div style={{display:"flex",gap:12,marginBottom:12}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:9,color:focusPct<30?"#e05030":focusPct<60?"#c0a020":"#4090d0",letterSpacing:2,marginBottom:3}}>FOCUS {Math.round(focus)}/{maxFocus}</div>
                  <div style={{height:8,background:"#04080f",borderRadius:4,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${focusPct}%`,background:focusPct<30?"#e05030":focusPct<60?"#c0a020":"#3070c0",transition:"width 0.3s"}}/>
                  </div>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:9,color:fullnessPct>85?"#e04020":fullnessPct>65?"#c07020":"#40a060",letterSpacing:2,marginBottom:3}}>FULLNESS {Math.round(fullness)}/{maxFullness}</div>
                  <div style={{height:8,background:"#04080f",borderRadius:4,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${fullnessPct}%`,background:fullnessPct>85?"#e04020":fullnessPct>65?"#c07020":"#306050",transition:"width 0.3s"}}/>
                  </div>
                </div>
              </div>

              {!done&&(
                <>
                  <div style={{fontSize:10,color:"#506080",marginBottom:10,fontStyle:"italic"}}>
                    {focusPct<30?"Focus dropping — eat something to stay in the game.":fullnessPct>80?"Pushing capacity — careful what you pick next.":"Session running. Pick your food."}
                  </div>
                  {/* Food menu */}
                  <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:12}}>
                    {SESSION_FOOD_ITEMS.map(food=>{
                      const wouldOverfill=fullness+food.fullnessCost>maxFullness;
                      const netFocus=food.focusRestore-15;
                      return(
                        <button key={food.id}
                          style={{...C.btn(wouldOverfill?"#1a0a04":"#04101c"),opacity:wouldOverfill?0.5:1,display:"flex",alignItems:"center",gap:10,padding:"8px 12px",textAlign:"left"}}
                          onClick={()=>pickSessionFood(food.id)}>
                          <span style={{fontSize:18}}>{food.icon}</span>
                          <span style={{flex:1,color:"#80b0e0",fontSize:12,fontWeight:600}}>{food.label}</span>
                          <span style={{color:"#ffcc60",fontSize:11}}>+{food.gain} lbs</span>
                          <span style={{color:netFocus>=0?"#60c080":"#e06040",fontSize:11}}>{netFocus>=0?"+":""}{netFocus} focus</span>
                          <span style={{color:wouldOverfill?"#e05020":"#806040",fontSize:11}}>+{food.fullnessCost} full</span>
                        </button>
                      );
                    })}
                  </div>
                  {canQuit&&<button style={{...C.btn("#1a0808"),width:"100%",fontSize:11,color:"#604040"}} onClick={quitRankedSession}>Log off for the night</button>}
                  {!canQuit&&<div style={{fontSize:9,color:"#2a3040",textAlign:"center",marginTop:4}}>Logging off isn't really an option anymore.</div>}
                </>
              )}

              {/* Session log */}
              {log.length>0&&(
                <div style={{marginTop:10,maxHeight:120,overflowY:"auto"}}>
                  {log.map((line,i)=>(
                    <div key={i} style={{fontSize:10,color:"#304a60",padding:"2px 0",borderBottom:"1px solid #0a1520"}}>{line}</div>
                  ))}
                </div>
              )}

              {/* Done state */}
              {done&&(
                <>
                  <div style={{marginTop:12,padding:12,background:"rgba(4,16,30,0.8)",borderRadius:8,border:"1px solid #1a4a7040"}}>
                    <div style={{fontSize:10,color:"#2a6080",letterSpacing:2,marginBottom:6}}>{endReason==='food_coma'?'FOOD COMA':'FOCUS OUT'}</div>
                    <div style={{fontSize:12,color:"#80b0d0",lineHeight:1.5}}>{payoffText}</div>
                    <div style={{fontSize:13,color:"#60c080",marginTop:8,fontWeight:700}}>+{Math.round(gain)} lbs</div>
                  </div>
                  <button style={{...C.btn("#1a5a7a"),width:"100%",marginTop:10}} onClick={closeRankedSession}>Session Saved ✓</button>
                </>
              )}
            </div>
          </div>
        );
      })()}

      {/* ── PRESENTATION DEFENSE MINI-GAME MODAL (placeholder) ── */}
      {presentationState&&<PresentationDefenseModal presentationState={presentationState} processStudentGain={processStudentGain} push={push} setPresentationState={setPresentationState} setStudents={setStudents} students={students}/>}

      {/* ── DELIVERY ORDER MINI-GAME MODAL (placeholder) ── */}
      {deliveryState&&<DeliveryOrderModal deliveryState={deliveryState} processStudentGain={processStudentGain} push={push} setDeliveryState={setDeliveryState} setStudents={setStudents} students={students}/>}

      {/* ── CAMPUS CHALLENGE MINI-GAME MODAL (placeholder) ── */}
      {challengeState&&<CampusChallengeModal challengeState={challengeState} processStudentGain={processStudentGain} push={push} setChallengeState={setChallengeState} setStudents={setStudents} students={students}/>}

      {/* ── CHAPTER HOSTESS — STUDENT PICKER / HANGOUT MODAL ── */}
      {chapterHostessState?.hangoutOpen&&<ChapterHostessHangoutModal chapterHostessState={chapterHostessState} students={students} openHostessHangout={openHostessHangout} setChapterHostessState={setChapterHostessState} makeHostessHangoutChoice={makeHostessHangoutChoice}/>}

      {/* ── CHAPTER HOSTESS — FEAST PREP MODAL ── */}
      {chapterHostessState?.feastPrepOpen&&<ChapterHostessFeastPrepModal chapterHostessState={chapterHostessState} beginFeast={beginFeast} setChapterHostessState={setChapterHostessState}/>}

      {/* ── CHAPTER HOSTESS — FEAST LOG MODAL ── */}
      {chapterHostessState?.feastLogOpen&&<ChapterHostessFeastLogModal chapterHostessState={chapterHostessState} completeFeast={completeFeast}/>}

      {/* ── LILITH — CLUE / INVESTIGATION MODAL ── */}
      {talkStudent&&<TalkModal student={talkStudent} skillEffects={skillEffects} week={week} weeklyArms={weeklyArms} onArmDevouring={()=>armDevouringPresence(talkStudent.id)} onClose={()=>setTalkStudentId(null)} onApplyEffect={applyTalkEffect} campusFattening={!!pharmacistState?.campusFattening} campusTier={getCampusNarrativeTier(pharmacistState)}/>}

      {pharmacistChemSession&&pharmacistChemStudentId!=null&&(()=>{
        const chemStudent=students.find(st=>st.id===pharmacistChemStudentId);
        if(!chemStudent) return null;
        return(
          <PharmacistChemModal
            student={chemStudent}
            chemSession={pharmacistChemSession}
            setChemSession={setPharmacistChemSession}
            pharmacistState={pharmacistState}
            onConfirm={confirmPharmacistChem}
            onCancel={cancelPharmacistChem}
            finalizeBrewPlan={finalizeBrewPlan}
            applyAcquisitionChoice={applyAcquisitionChoice}
            skipAcquisition={skipAcquisition}
          />
        );
      })()}

      {pharmacistCultSession&&pharmacistChemStudentId!=null&&(()=>{
        const cultStudent=students.find(st=>st.id===pharmacistChemStudentId);
        if(!cultStudent) return null;
        return(
          <PharmacistCultModal
            student={cultStudent}
            cultSession={pharmacistCultSession}
            pharmacistState={pharmacistState}
            ap={ap}
            onSelectRoute={selectCultRoute}
            onConfirm={confirmPharmacistCult}
            onCancel={cancelPharmacistCult}
          />
        );
      })()}
      {lilithClueModal&&<LilithClueModal lilithClueModal={lilithClueModal} investigateClue={investigateClue} setLilithClueModal={setLilithClueModal} confirmInvestigation={confirmInvestigation}/>}

      {/* ── LILITH — FEASTING BEAUTY (TEXT ADVENTURE) ── */}
      {lilithHuntState&&<LilithHuntModal lilithHuntState={lilithHuntState} students={students} setLilithHuntState={setLilithHuntState} navigateHunt={navigateHunt} deliveryScene={deliveryScene} closeHunt={closeHunt} approachMan={approachMan} consumeMan={consumeMan} encounterSetMode={encounterSetMode} makeReply={makeReply} makeSeduction={makeSeduction}/>}

      {/* ── SUMO MATCH MINI-GAME MODAL ── */}
      {sumoMatchState&&<SumoMatchModal sumoMatchState={sumoMatchState} students={students} sumoPlayMove={sumoPlayMove} sumoCornerFeed={sumoCornerFeed} sumoStartNextBout={sumoStartNextBout} setSumoMatchState={setSumoMatchState} closeSumoMatch={closeSumoMatch} dismissSumoPopup={dismissSumoPopup}/>}

      {/* ── FEEDEE CREATOR: COLLAB PARTNER PICKER ── */}
      {collabPartnerPicker&&<CollabPartnerPicker collabPartnerPicker={collabPartnerPicker} setCollabPartnerId={setCollabPartnerId} setCollabPartnerPicker={setCollabPartnerPicker} setEvolvedEventState={setEvolvedEventState} students={students}/>}

      {/* ── PSYCH RESEARCHER: SUBJECT PICKER ── */}
      {researchSubjectPicker&&<ResearchSubjectPicker researchSubjectPicker={researchSubjectPicker} setAp={setAp} setEvolvedEventState={setEvolvedEventState} setResearchSubjectPicker={setResearchSubjectPicker} setStudents={setStudents} students={students}/>}

      {/* ── PSYCH RESEARCHER: SUBJECT JOURNAL ── */}
      {subjectJournalState&&<SubjectJournalModal setSubjectJournalState={setSubjectJournalState} students={students} subjectJournalState={subjectJournalState}/>}

      {/* ── NADIA'S SUBJECT NOTES ── */}
      {nadiaNotesState&&<NadiaSubjectNotesModal nadiaNotesState={nadiaNotesState} setNadiaNotesState={setNadiaNotesState} students={students}/>}

      {/* ── COLLAB STREAM MINI-GAME MODAL ── */}
      {collabStreamState&&<CollabStreamModal collabStreamState={collabStreamState} students={students} doCollabAction={doCollabAction} closeCollabStream={closeCollabStream} dismissCollabPopup={dismissCollabPopup}/>}

      {/* ── RECORDING SESSION MODAL ── */}
      {recordingSessionState&&<RecordingSessionModal recordingSessionState={recordingSessionState} students={students} setRecordingSessionState={setRecordingSessionState} makeRecordingChoice={makeRecordingChoice} wrapRecordingSession={wrapRecordingSession} oneMoreTake={oneMoreTake} closeRecordingSession={closeRecordingSession} dismissRecordingChoicePopup={dismissRecordingChoicePopup}/>}
      {streamSessionState&&<StreamSessionModal streamSessionState={streamSessionState} students={students} week={week} preStreamAction={preStreamAction} selectChallenge={selectStreamChallenge} beginActiveRound={beginActiveRound} finishActiveRound={finishActiveRound} continueAfterBetweenRound={continueAfterBetweenRound} tapOutStream={tapOutStream} wrapStream={wrapStream} closeStream={closeStream} appendStreamChat={appendStreamChat} updateRoundPerf={updateRoundPerf} tickRoundStamina={tickRoundStamina}/>}
      {streamBrandPickState&&<StreamBrandSelectModal student={students.find(st=>st.id===streamBrandPickState.studentId)} required={streamBrandPickState.required} onSelect={selectStreamBrand} onClose={streamBrandPickState.required?null:()=>setStreamBrandPickState(null)}/>}
      {destinySpendState&&<DestinySpendModal student={students.find(st=>st.id===destinySpendState.studentId)} onPurchase={purchaseDestinyItem} onClose={()=>setDestinySpendState(null)} onGiftFromPlayer={giftDestinyFunds} playerMoney={money}/>}

      {/* ── FAIR TRAINING COLLABORATIONS HUB ── */}
      {fairTrainingState.open&&<FairTrainingHub ft={fairTrainingState} students={students} ap={ap} getFairPrideTier={getFairPrideTier} startFairTrainingSession={startFairTrainingSession} launchFairDayEvent={launchFairDayEvent} closeFairTraining={closeFairTraining} setFairTrainingState={setFairTrainingState}/>}

      {/* ── FAIR DAY MODAL (Weigh-In → Judging → Afterparty) ── */}
      {fairDayState&&<FairDayModal fd={fairDayState} students={students} fairPride={fairTrainingState.fairPride} getFairPrideTier={getFairPrideTier} chooseFairWeighIn={chooseFairWeighIn} advanceFairDayPhase={advanceFairDayPhase} chooseFairAfterparty={chooseFairAfterparty} closeFairDay={closeFairDay}/>}

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

      {/* ── COMMUNITY RESEARCHER MODAL ── */}
      {communityResearcherState?.modalPhase&&<CommunityResearcherModal communityResearcherState={communityResearcherState} students={students} lilithUnlocked={lilithUnlocked} lilithKillCount={lilithKillCount} advanceThesisBoard={advanceThesisBoard} completeThesisDefense={completeThesisDefense} selectCasePair={selectCasePair} setCommunityResearcherState={setCommunityResearcherState} completeCaseStudy={completeCaseStudy} dismissBoardReaction={dismissBoardReaction} proceedFromFinalReview={proceedFromFinalReview} makeHaveAChatChoice={makeHaveAChatChoice} closeThesisOutcome={closeThesisOutcome}/>}

      {/* ── CULTIVATOR MODAL ── */}
      {cultivatorState?.modalPhase&&<CultivatorModal cultivatorState={cultivatorState} students={students} setCultivatorState={setCultivatorState} confirmCultivatorRecruit={confirmCultivatorRecruit} pickCultivatorFood={pickCultivatorFood} makeCultivatorChoice={makeCultivatorChoice} confirmCultivatorSession={confirmCultivatorSession} dismissCultivatorStageUp={dismissCultivatorStageUp} confirmCultivatorHarvest={confirmCultivatorHarvest} closeCultivatorGrowth={closeCultivatorGrowth}/>}

      {hungerInterrupt&&(()=>{
        const hs=students.find(st=>st.id===hungerInterrupt.studentId);
        if(!hs) return null;
        return(
          <HungerInterruptModal
            student={hs}
            week={week}
            pharmacistState={pharmacistState}
            onFeed={()=>finishHungerInterrupt(hs.id,'feed')}
            onCompound={()=>{
              const compounds=getStockedCompounds();
              if(compounds.length>1){
                setCompoundFeedPicker({kind:'interrupt',studentId:hs.id});
              }else{
                finishHungerInterrupt(hs.id,'compound',pickInterruptCompound(compounds,hs)||compounds[0]||'appetite_stimulant');
              }
            }}
            onDeny={()=>finishHungerInterrupt(hs.id,'deny')}
            onTalk={()=>finishHungerInterrupt(hs.id,'talk')}
          />
        );
      })()}

      {compoundFeedPicker&&(()=>{
        const picker=compoundFeedPicker;
        const compounds=getStockedCompounds();
        let student=null;
        let feedLabel='';
        if(picker.kind==='item'){
          student=students.find(st=>st.id===picker.studentId);
          feedLabel=`${picker.item.emoji} ${picker.item.label} → ${student?.name}`;
        }else if(picker.kind==='interrupt'){
          student=students.find(st=>st.id===picker.studentId);
          feedLabel=`Compound-laced meal for ${student?.name}`;
        }else if(picker.kind==='class'){
          feedLabel=`${picker.action.label} — lace the whole class meal?`;
          student=students.find(st=>!st.hidden)||students[0];
        }
        if(!student) return null;
        return(
          <CompoundFeedModal
            student={student}
            unlockedCompoundIds={compounds}
            compoundInventory={pharmacistState?.compoundInventory}
            feedLabel={feedLabel}
            studentAddiction={student?.addictionLevel??0}
            onConfirm={(compoundId)=>{
              setCompoundFeedPicker(null);
              if(picker.kind==='item') executeItemFeed(picker.item,picker.studentId,compoundId);
              else if(picker.kind==='class') executeClassFeed(picker.action,compoundId);
              else if(picker.kind==='interrupt') finishHungerInterrupt(picker.studentId,'compound',compoundId);
            }}
            onCancel={()=>setCompoundFeedPicker(null)}
          />
        );
      })()}

    </div>
  );
}
