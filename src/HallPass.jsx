import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { INTIMACY_SCENES, INTIMACY_CONTEXTUAL, evalIntimacyEndingCondition } from './gameData/intimacy.js';
import { GROUP_CONVERSATIONS, getTier, TIER_SCENES, PRIVATE_FOODS, getFullnessStage, DINNER_VENUES, DINNER_CONVERSATION, ACHIEVEMENT_LIST } from './gameData/sessions.js';
import { STAGE_DROP_REACTIONS, RA_RANKS, INFLUENCE_PAIRS, NARRATIVE_EVENTS } from './gameData/content.js';
import { narrativeEventText } from './gameData/weeklyEventText.js';
import { TextFlagToolbar, FlaggedProse } from './components/TextFlagToolbar.jsx';
import { buildStateLine, traceToFlagNodes } from './textEngine/textFlagFormat.js';
import { ACTIONS_SINGLE, ACTIONS_HALL } from './gameData/floorEvents.js';
import { gatewayFlagPatch, GATEWAY_FLAG_KEYS } from './gameData/gatewayMoments.js';
import { appendDossierSnapshot, pinPlayerMoment } from './gameData/dossier.js';
import { getPlayerPrefs, toggleInstantText, toggleSound } from './gameData/playerPrefs.js';
import { playHallPassSound } from './gameData/hallPassAudio.js';
import { ModalOverlay } from './components/ModalOverlay.jsx';
import { SceneStage } from './components/SceneStage.jsx';
import { EVOLVED_ACTIVITY_TEXT, EVOLVED_ACTIVITY_META, EVOLVED_EVENTS, EVOLUTION_OFFER, HOMEROOM_SUSPICION_DELTAS, HOMEROOM_THRESHOLDS, HOMEROOM_CONFERENCE_EVENTS, HOMEROOM_GROUP_ACTIVITIES, SESSION_FOOD_ITEMS, SESSION_NPC_LINES, SESSION_PAYOFF_TEXT, WL_CONFIG, WL_LESSONS, WL_DIALOGUES, CG_CONFIG, CG_CORKBOARD_SCENES, CG_MEASUREMENT_SCENES, CG_BINGE_SCENES, CG_CHAT_TEMPLATES, FAIR_TRAINING_CONFIG, FAIR_TRAINING_SCENES, FAIR_TRAINING_PHOTOS, FAIR_DAY_SCENES, FAIR_BOOST_SUMMARIES } from './gameData/evolvedForms.js';
import { getWlMomDialogueDepth, mergeWlDialogueEntry } from './gameData/wlMomDialogueDepth.js';
import { CONTEST_FOODS, CONTEST_STAGE_FOODS, CONTEST_MAYA_WEIGHTS, SUMO_RIVAL_NAME, SUMO_RIVAL_WEIGHTS, SUMO_TELEGRAPH, SUMO_CORNER_FEED, COLLAB_STREAM_FOODS, COLLAB_BLOB_ANNOUNCEMENT, RECORDING_PERFECT_COMBOS, RECORDING_FOOD_LBS, RECORDING_PACE_LBS, RECORDING_QUALITY_BONUS } from './gameData/miniGames.js';
import { CG_STAGE_KEYS } from './gameData/competitiveGainerText.js';
import { cgDrive, cgDriveDelta, migrateCompetitiveGainerState } from './gameData/competitiveGainerState.js';
import { subscribeOpenFieldNotes } from './gameData/hallPassEvents.js';
import { createInitialHiveState, executeHiveShift, getHiveBmiTier, getHiveControl, getHiveFloorResonance, makeHiveTag, HIVE_VPS } from './gameData/mayaHive.js';
import { EVOLVED_SKILL_TREES } from './gameData/skills.js';
import { IMMOBILE_REDIRECT, TAP_OUT_DIALOGUE, TAP_OUT_250, BLOB_PRIVATE_INTRO, INIT_STUDENTS, initDeviceState, initPsychState } from './gameData/students.js';
import { WEIGHT_STAGES, getStage } from './gameData/stages.js';
import { GAIN_CONFIG, initGainStats, calsToLbs, forceFeedChance, REFUSAL_LINES, FORCE_SUCCESS_LINES, digestStudent, applyCapacityGrowth } from './gameData/gainSystem.js';
import { CORRUPTION_CONFIG, getCorruptionTier, CORRUPTION_AUTO_LINES, CORRUPTION_TIER_UP_LINES } from './gameData/corruption.js';
import { TALK_CONFIG, isBodyComplimentUnwelcome, COMPLIMENT_BACKFIRE_REL, COMPLIMENT_BACKFIRE_SCRUTINY } from './gameData/talkSystem.js';
import { INVENTORY_CONFIG, rollWeeklyItem, ITEM_USE_LINES, ITEMS } from './gameData/items.js';
import { WALLET_CONFIG, formatMoney, trySpend, addFunds } from './gameData/wallet.js';
import { createInitialPlayer, updatePlayerField } from './gameData/player.js';
import { RaSetupWizard } from './components/RaSetupWizard.jsx';
import { RaPortraitChip } from './components/RaPortraitChip.jsx';
import { createCustomStudent, CUSTOM_STUDENT_ID } from './gameData/customStudent/index.js';
import {
  UNLOCK_POOL_IDS, getDorm, getLockedDormStudentIds, getStudentHomeDorm, dormUnlocksForWeek, DORMS,
} from './gameData/dorms.js';
import {
  RA_APPROACHES, FAVOR_MAX, FAVOR_REBATE, favorFill,
  profileGainMult, profileScrutinyMult, profilePassiveBonus, profileCorruptionMult,
  getProfileApproachId, getApproachLabel, migrateRaProfile,
} from './gameData/raApproaches.js';
import { getUnlockScene } from './gameData/unlockScenes.js';
import {
  applyWeeklyTrustDrip, pickRipeUnlock, ROSTER_TRUST_GATE, grantPassiveTrust,
} from './gameData/rosterUnlock.js';
import { renderEmbodiedArrive } from './textEngine/scenes/v2/embodiment/campusWalk.js';
import { WalletBadge } from './components/WalletBadge.jsx';
import { CAMPUS_NODES, CAMPUS_CONFIG } from './gameData/campus.js';
import {
  defaultCampusExplorationState, buildExplorationContext, rollTravelExploration,
  searchCampusLocation, applySecretSolve, resolveSecretDiscoverLine,
} from './gameData/campusExploration.js';
import { ELARA_ID, availableElaraQuests, startElaraQuest, advanceElaraQuestAtNode, takePendingQuestReward } from './gameData/relicHunter.js';
import { getExplorationFind } from './gameData/campusIngredients.js';
import { availableSecretsAtNode } from './gameData/campusSecrets.js';
import { HOSTESS_HANGOUTS, SISTER_INITIAL_STATE, CAMILLE_INITIAL_LBS, generateFeastLog } from './gameData/chapterHostess.js';
import { LILITH_ID, HUNT_NODES, HUNT_MEN, PHYSICAL_MOVES, drawReplies, getGuyLine, seduceSuccessChance, WILLPOWER_START, MAX_APPREHENSION, getEffectiveDifficulty, getConsumeText, DELIVERY_SCENE, CLUE_FEAST_LINE, LILITH_PASSIVE_GAIN } from './gameData/lilith.js';
import { TESTER_NAMES, TESTER_START_LBS, TESTER_STAGE_LBS, HARVEST_GAIN, FAT_BAR_CAP, DIGEST_WEEKS, SUSPICION_CARRY_FRACTION, RECIPES, getStageUpText, getPlannedVignette, getEmergencyVignette, getGrowthVignette } from './gameData/cultivator.js';
import { renderCultivatorIntro, renderCultivatorChoice, renderCultivatorReaction } from './textEngine/scenes/cultivator/index.js';
import { renderHuntNode, renderHuntTarget, renderLilithFeast, renderLilithDeliveryIntro } from './textEngine/scenes/hunt/index.js';
import { renderFloorSceneText, renderFloorChoiceResult } from './textEngine/scenes/campusEvent/index.js';
import { getSwimmerTier, CASE_STUDY_PAIRS, getSuspicionBracket, getFinalReviewText, HAVE_A_CHAT_SCENES } from './gameData/communityResearcher.js';
import { getAttitude, getEvolvedActivityStageIdx, rnd, generateFloorCheckIn, pharmacistTextOpts } from './utils/gameHelpers.js';
import {
  pickInterruptStudent, feedResolvesHunger, talkCalmsHunger,
  tickHungerAddiction, adjustHunger, applyDenialConsequences,
  withdrawalGainMultiplier, isWithdrawalAggressive,
  getInterruptFeedPortion, getInterruptCompoundPortion, getInterruptTalkRelGain,
  getInterruptDenyRelLoss,
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
import { renderHungerOutcome } from './textEngine/scenes/hungerInterrupt/index.js';
import './textEngine/scenes/hungerInterrupt/index.js';
import './textEngine/scenes/hungerLexicon.js';
import './textEngine/scenes/hungerInterruptPersonal.js';
import { renderJealousyReaction } from './textEngine/scenes/jealousyReaction.js';
import { renderDinnerEnding, renderDinnerDepth, renderDinnerConversation, renderGroupDinnerConversation, renderGroupDinnerReaction, renderDinnerUnbutton, renderDinnerWaiter, renderDinnerOverfill, renderDinnerDishDesc } from './textEngine/scenes/dinner/index.js';
import { renderFeedVoice } from './textEngine/scenes/feedVoice/index.js';
import { renderFeedReaction, foodKindFromFeed, feedRoomFromFullness } from './textEngine/scenes/feedReaction/index.js';
import { renderWeekRecap, gainBandFromLbs } from './textEngine/scenes/weekRecap/index.js';
import { WeekRecapModal } from './components/WeekRecapModal.jsx';
import { WeekPlannerModal } from './components/WeekPlannerModal.jsx';
import { buildWeekReviewExtras, emptyWeekPlan } from './gameData/weekPlanner.js';
import { renderMilestone } from './textEngine/scenes/milestone/index.js';
import { MilestoneCeremonyModal } from './components/MilestoneCeremonyModal.jsx';
import { renderAscensionAbility, renderAscensionCeremony, renderAscensionDecline, renderAscensionHeld, renderAscensionStirring } from './textEngine/scenes/ascension/index.js';
import { renderOriginStirring } from './textEngine/scenes/origin/index.js';
import { AscensionCeremonyModal } from './components/AscensionCeremonyModal.jsx';
import { appendMemory, pickStudentMemory, pickHallMemory } from './gameData/memory.js';
import { getDiscontentTier, bumpDiscontent, forceFeedIsBetrayal, discontentRefusalChance, grievanceGain, DISCONTENT_EASE_FEED, DISCONTENT_EASE_TALK, DISCONTENT_WEEKLY_DECAY, DISCONTENT_RIPPLE, shouldConfront, dominantGrievance, AMENDS_FLOOR, GIFT_FLOOR, GIFT_COST } from './gameData/discontent.js';
import { renderDiscontentRefusal } from './textEngine/scenes/discontent/index.js';
import { renderConfront } from './textEngine/scenes/confront/index.js';
import { ConfrontationModal } from './components/ConfrontationModal.jsx';
import { renderMemorySelf, renderMemoryHall } from './textEngine/scenes/memory/index.js';
import { renderSessionFullness, renderSessionAftermath } from './textEngine/scenes/session/index.js';
import { renderIntimacyChoice, renderIntimacyEnding, renderIntimacyPassout } from './textEngine/scenes/intimacy/index.js';
import { renderPreStreamVignette } from './textEngine/scenes/streamPreStream/index.js';
import { renderStreamBeat } from './textEngine/scenes/stream/liveBridge.js';
import { renderCollabStreamBeat, pickCollabWrenLine, renderCollabStageUp, renderCollabPayoff } from './textEngine/scenes/collabStream/index.js';
import {
  renderRecordingDirectionPopup,
  renderRecordingTakeResult,
  renderRecordingOneMoreTake,
  renderRecordingWrapText,
} from './textEngine/scenes/recordingSession/index.js';
import {
  renderContestFoodPopup,
  renderContestActionPopup,
  renderContestDevourPopup,
  renderContestWeighIn2,
  renderContestPayoff,
} from './textEngine/scenes/eatingContest/index.js';
import {
  renderSumoOpening,
  renderSumoExchangeLine,
  renderSumoBoutWon,
  renderSumoBoutLost,
  renderSumoFillRing,
  renderSumoCornerFeed,
  renderSumoNextBoutLine,
} from './textEngine/scenes/sumoMatch/index.js';
import { choiceCanPin, pinBlackoutChance, PIN_PASSOUT_REL_BONUS } from './gameData/intimacyGating.js';
import './textEngine/scenes/intimacy/scenes.js';
import './textEngine/scenes/dinner/endingScene.js';
import './textEngine/scenes/opposition/endgameBeat.js';
import './textEngine/scenes/corruptionVoice.js';
import { DINNER_LOG_PANEL_STYLE, dinnerLogDisplayText, getDinnerLogLineStyle } from './utils/dinnerLogStyle.js';
import { renderEatScene } from './textEngine/scenes/eating/index.js';
import './textEngine/scenes/eating/index.js';
import { renderSlenderScene, renderSlenderEatBeat } from './textEngine/scenes/earlyGain/index.js';
import './textEngine/scenes/earlyGain/index.js';
import { renderPsychShift } from './textEngine/scenes/psychShift/index.js';
import './textEngine/scenes/psychShift/index.js';
import { renderClothScene } from './textEngine/scenes/clothing/index.js';
import './textEngine/scenes/clothing/index.js';
import { renderImmobScene, renderImmobArrival, renderImmobRefit, renderImmobComfort, renderImmobHint, renderImmobPref, renderImmobVisit } from './textEngine/scenes/immobility/index.js';
import { renderGossipReact } from './textEngine/scenes/gossip/index.js';
import {
  getImmobilityArrival, markImmobilityArrived, immobilitySettleGain,
  needsRefit, markRefit, getRefitAction, COMFORT_MILESTONES,
  getAvailableComfortMilestones, markComfortMilestone,
  getNextHint, incrementHint, initFoodHint, confirmCourtPreference, getCourtBoonTier,
  getImmobilityTier, SETTLING_ACTIONS,
  incrementSettleCount, markFinalForm, FINAL_FORMS,
  GATHERING, getAttendees,
  finalFormSelfGain, applyFinalFormRadiate, chooseFinalForm,
} from './gameData/immobilityArrival.js';
import './textEngine/scenes/immobility/index.js';
import { renderSettlingScene } from './textEngine/scenes/settling/index.js';
import './textEngine/scenes/settling/index.js';
import { SettlingListView, SettlingDetailView } from './views/SettlingView.jsx';
import {
  corruptionStudentPatch, clearWeeklyTextFlags, dinnerVenueToLocale, clothingStateForStage,
  createSessionUsed, weekUsedFromStudent, weekUsedToPatch, isSlenderEligible,
} from './gameData/textContext.js';
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
import { getAscensionFormForStudent } from './gameData/ascension/forms.js';
import { abilityIsOnCooldown, getAscensionAbility, tickAscensionCooldowns } from './gameData/ascension/abilities.js';
import { maybeGrantAscensionCatalyst } from './gameData/ascension/catalysts.js';
import { applyEssenceFromGain, spendEssence } from './gameData/ascension/essence.js';
import { formPassiveGainMultiplier } from './gameData/ascension/gainRules.js';
import { applyAscensionRebirth, isAscended, isAscensionEligible } from './gameData/ascension/state.js';
import { FairTrainingHub, FairDayModal } from './components/FairModals.jsx';
import { EvolvedActivityModal } from './components/EvolvedActivityModal.jsx';
import { WifeLessonsModal } from './components/WifeLessonsModal.jsx';
import { CompetitiveGainerChatModal, CompetitiveGainerMainModal } from './components/CompetitiveGainerModals.jsx';
import { MayaHiveModal } from './components/MayaHiveModal.jsx';
import { EatingContestModal } from './components/EatingContestModal.jsx';
import { ForceFeederModal, buildForceFeederModalState, advanceForceFeederOnComplete } from './components/ForceFeederModal.jsx';
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
import { RosterView } from './views/RosterView.jsx';
import { InfluenceView } from './views/InfluenceView.jsx';
import { EmbodimentModal } from './components/v2/EmbodimentModal.jsx';
import { FeastRitualModal, DreamModal, EchoArchiveModal } from './components/v2/V2Modals.jsx';
import {
  handleEmbodimentStart, handleEmbodimentAction, handleEmbodimentRelease,
  handleEmbodiedMove, handleEmbodiedEventResolve,
  handleResonanceLink, handleRitual, handleDreamChoice, handleEchoResonate,
  handleFeedResonancePulse, captureStageUpEcho, captureWeighInEcho, captureFeedEcho,
  handleEchoReplay, runWeeklyV2Events, captureEvolutionEcho,
  captureDinnerUnbuttonEcho, captureImmobilityEcho, captureCorruptionTierEcho,
  applyResonanceSurgeBonus,
} from './gameData/v2/handlers.js';
import { echoDepthTier } from './gameData/v2/bodyEcho.js';
import { renderEchoReplay, renderEchoCapture } from './textEngine/scenes/v2/echo/index.js';
import { renderResonancePulse } from './textEngine/scenes/v2/resonance/index.js';
import { renderResonanceLink } from './textEngine/scenes/v2/resonance/index.js';
import { appendV2Depth } from './textEngine/scenes/v2/depthRenderer.js';
import { createInitialV2State, normalizeV2State, V2_CONFIG } from './gameData/v2/state.js';
import { appendEmbodimentWalkLog } from './gameData/v2/embodiedCampus.js';
import { canTriggerDream } from './gameData/v2/appetiteDreams.js';
import './textEngine/scenes/v2/index.js';
import { HallLoungeView } from './views/HallLoungeView.jsx';
import { StudentDetailView } from './views/StudentDetailView.jsx';
import { ActionsView } from './views/ActionsView.jsx';
import { InventoryView, ItemTargetPicker } from './views/InventoryView.jsx';
import { LabView } from './views/LabView.jsx';
import { NetworkView } from './views/NetworkView.jsx';
import { DeviceInventoryView } from './views/DeviceInventoryView.jsx';
import { SpriteTestView } from './views/SpriteTestView.jsx';
import {
  defaultLabState, defaultDeviceInventory, INVENTOR_ACTIVITIES, INVENTOR_PATH_STAGES,
  completeLabSession, tickLabWeek, TALIA_STUDENT_ID, maybeAdvanceInventorStage, LAB_SESSION_ACTIVITY,
  researchBlueprint,
} from './gameData/talia.js';
import { unlockTechNode, normalizeLabTechState, rollSessionBreakthroughs } from './gameData/labTechTree.js';
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
import { buildGrowthEvent } from './gameData/growthEvents.js';
import {
  getResearchNode, EXPERIMENT_SESSION_COST, spendExperimentMaterials, rollExperimentOutcome,
} from './gameData/researchTree.js';
import {
  unlockCircuitNode,
  getCircuitNode,
  recordForceFeederUse,
  forceUnlockArrivalNode,
} from './gameData/inventionUpgrades.js';
import {
  ensureNetwork,
  syncSubjectInfluence,
  tickNetworkWeek,
  addNetworkNode,
  slotExperimentOnNode,
  clearExperimentSlot,
  upgradeNetworkNode,
  setNodeAutomation,
  expandDeploymentArea,
  approveProposal,
  denyProposal,
  adjustNexusIntegration,
  upgradeNexus,
} from './gameData/networkState.js';
import { getForceFeedChanceBonuses, canStudentUseDevice, deviceAcceptanceBlockReason } from './gameData/deviceGating.js';
import {
  tickRelationshipDecay,
  applyFavoritismEcology,
  favoritismSummary,
} from './gameData/relationshipEcology.js';
import {
  tickCampusSaturationState,
  saturationWeeklyPassiveBonus,
  getSaturationTier,
} from './gameData/campusSaturation.js';
import {
  scrutinyApModifier,
  scrutinyBlocksClassFeast,
  scrutinyPrivateSessionCost,
  weeklyScrutinyNudge,
  getScrutinyTier,
} from './gameData/scrutinyConsequences.js';
import { appendWitnessLog } from './gameData/campusWitness.js';
import { normalizePerformanceTier, performanceResultLine, performanceRelMult } from './gameData/performanceContract.js';
import { getArrivalCapstone, markArrivalUnlocked, getArrivalBoardUnlock } from './gameData/arrivalCapstones.js';
import {
  tuningGainMult,
  scoreRouteSession,
  applyDeviceUsageReward,
  runStationaryDeviceSession,
  runRouteDeviceSession,
} from './gameData/deviceUsageEvents.js';
import { computePrestigeScore, prestigeApBonus, prestigeBreakthroughBonus, prestigeSummary } from './gameData/prestigeLite.js';
import { DeviceTuningModal, DeviceRouteModal } from './components/DeviceTuningModal.jsx';
import { CustomStudentWizard } from './components/CustomStudentWizard.jsx';
import { OriginPickModal } from './components/OriginPickModal.jsx';
import {
  buildForceFeederEffect,
  isForceFeederInstalled,
  isHighRelationship,
} from './gameData/forceFeederEvent.js';
import { renderForceFeederScene } from './textEngine/scenes/forceFeeder/index.js';
import { applyPsychDelta } from './gameData/psychState.js';
import { applyCampusDeviceEncounter } from './gameData/campusDeviceEncounters.js';
import { applyOriginPick, needsOriginPick } from './gameData/origins/index.js';
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
import { SalonAppetitModal } from './components/SalonAppetitModal.jsx';
import { ArtisanGalleryModal } from './components/ArtisanGalleryModal.jsx';
import { OversightView } from './views/OversightView.jsx';
import { SupernaturalAscensionModal } from './components/SupernaturalAscensionModal.jsx';
import { OppositionHearingModal } from './components/OppositionHearingModal.jsx';
import { OppositionEndgameModal } from './components/OppositionEndgameModal.jsx';
import { pickHearingEnding, REMOVAL_HEARING, EMERGENCY_HEARING } from './gameData/oppositionHearings.js';
import { renderHearingChoiceResult, renderHearingEnding } from './textEngine/scenes/opposition/index.js';
import {
  defaultOppositionState, processOppositionWeek, runAibCounter, checkSupernaturalTrigger,
  getOppositionGainMult, tickSupernaturalWeek, getAvailableCounters,
} from './gameData/opposition.js';
import { supernaturalActLine } from './gameData/oppositionText.js';
import { renderWifeLessonBeat, renderWifeLessonTalkLine } from './textEngine/scenes/wifeLessons/index.js';
import { renderHomeroomPool, homeroomConferencePoolKey, homeroomActivityPoolKey } from './textEngine/scenes/homeroom/index.js';
import { buildOppositionContext, getEvolvedOpMessage, counterGateReason, normalizeCounterId } from './gameData/oppositionIntegration.js';
import { consumePortionSaint, applyAsceticGardenProtest, ledgerWightRepelled, applyMirrorFastEncounter, applyLedgerWightEncounter } from './gameData/oppositionCampus.js';
import { aibMemberToHuntTarget, removeConsumedAibMember } from './gameData/lilithAibHunt.js';
import {
  getSessionCapacityCap,
  getFeedCapacity,
  getFullnessPercent,
  getDinnerFullnessGroup,
  rollOverfillEndChance,
  getTapOutProbability,
  getSessionCaloriesFed,
  getFeedingAppetiteNote,
  getFeedingModifiers,
  getSessionPaceModifiers,
  SESSION_PACE_ACTIONS,
  resolveFeedPayload,
  getVenuePantrySuggestions,
  runVenueFeedAttempt,
  buildSessionCapOpts,
  dinnerConversationStormThreshold,
} from './gameData/feedingSession.js';
import {
  computeHallLoungeSkillCurrency, buyHallLoungeSkill, aggregateHallLoungeSkillEffects, listPurchasableHallLoungeSkills,
  hasHallLoungeUnlock, getHallActionCost, isDinnerVenueUnlocked,
} from './gameData/hallLoungeSkills.js';
import {
  devourScarcityDamage, echoedWillReverseCurse, checkSynthesisEndgame, applySynthesisAlly,
} from './gameData/scarcityTools.js';
import {
  getSupernaturalActivityBonus, applySupernaturalActivityPressure,
  canSupernaturalEvolve, getSupernaturalFormForStudent, getSupernaturalGainMult, applyRefeedSurge,
  applyAscensionThinForm, hollowIconStreamDrain, canArchivistFreeDiscredit,
} from './gameData/supernaturalForms.js';
import {
  defaultSalonState, startSalonSession, salonPickMenu, salonServiceChoice, salonFinishDigestif,
} from './gameData/chloeSalon.js';
import {
  defaultGalleryState, enrollSubject, startStudioSession, studioAction, runFieldShoot, mountExhibition,
} from './gameData/fionaGallery.js';
import { WeighInModal } from './components/WeighInModal.jsx';
import { TalkModal } from './components/TalkModal.jsx';
import { DebugPanel } from './components/DebugPanel.jsx';
import { BugReportModal } from './components/BugReportModal.jsx';
import { RefeedSurgeModal } from './components/RefeedSurgeModal.jsx';
import './textEngine/scenes/customStudent/index.js';
import './textEngine/scenes/origin/index.js';
import { tickScarcityBanishment, checkOppositionEndgame } from './gameData/oppositionEndgame.js';
import { DormUnlockModal, EvolutionOfferModal, SessionResultModal, TapOutPopup, TierUpModal } from './components/MiscModals.jsx';
import { NadiaSubjectNotesModal, SubjectJournalModal, ResearchSubjectPicker, CollabPartnerPicker, CampusChallengeModal, DeliveryOrderModal, PresentationDefenseModal, ActiveIntimacyScene, IntimacySceneSelector } from './components/PickerModals.jsx';
import { C } from './styles.js';

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════

const REACH_XP_PER_LEVEL=40;

// Two-tab log: split the live feed into a narrative "Story" stream and a
// mechanical "Ledger" stream. Classified by leading marker so push() and
// every call site stay untouched. Ledger = receipts/stats/system; anything
// else (in-voice beats, reactions, milestones — incl. un-prefixed prose) is
// Story, the stream you actually want to read.
const LEDGER_LOG_PREFIXES = ['🍽️','🧬','🎒','🔧','✅','🍴','💰','💵','⚠️','📡','🪑','🌐','📋','🏆','🖼','💊','🚮','🩻'];
function isLedgerLogLine(text){
  const t = (text || '').trimStart();
  return LEDGER_LOG_PREFIXES.some((p) => t.startsWith(p));
}

export default function HallPass(){
  const [students,setStudents]=useState(()=>INIT_STUDENTS.map(st=>({
    ...st, ...initGainStats(st), ...initDeviceState(), psych: initPsychState(), corruption: 0,
    ascension: null, weekStartLbs: st.lbs,
  })));
  const [player, setPlayer] = useState(() => createInitialPlayer());
  const {
    money, ap, week, ownedSkills, ownedHallSkills, facultyAffinity, raProfile, adminScrutiny,
    globalStats, achievements, bigScaleUnlocked, hallCred, unlockedDorms, v2State,
  } = player;
  const patchPlayer = (patch) => setPlayer((p) => ({ ...p, ...patch }));
  const setMoney = (updater) => setPlayer((p) => updatePlayerField(p, 'money', updater));
  const setAp = (updater) => setPlayer((p) => updatePlayerField(p, 'ap', updater));
  const setWeek = (updater) => setPlayer((p) => updatePlayerField(p, 'week', updater));
  const setOwnedSkills = (updater) => setPlayer((p) => updatePlayerField(p, 'ownedSkills', updater));
  const setOwnedHallSkills = (updater) => setPlayer((p) => updatePlayerField(p, 'ownedHallSkills', updater));
  const setFacultyAffinity = (updater) => setPlayer((p) => updatePlayerField(p, 'facultyAffinity', updater));
  const setRaProfile = (updater) => setPlayer((p) => updatePlayerField(p, 'raProfile', (cur) => {
    const next = typeof updater === 'function' ? updater(cur) : updater;
    return migrateRaProfile(next);
  }));
  const setHallCred = (updater) => setPlayer((p) => updatePlayerField(p, 'hallCred', updater));
  const setUnlockedDorms = (updater) => setPlayer((p) => updatePlayerField(p, 'unlockedDorms', updater));
  const setAdminScrutiny = (updater) => setPlayer((p) => updatePlayerField(p, 'adminScrutiny', updater));
  const setGlobalStats = (updater) => setPlayer((p) => updatePlayerField(p, 'globalStats', updater));
  const setAchievements = (updater) => setPlayer((p) => updatePlayerField(p, 'achievements', updater));
  const setBigScaleUnlocked = (updater) => setPlayer((p) => updatePlayerField(p, 'bigScaleUnlocked', updater));
  const setV2State = (updater) => setPlayer((p) => updatePlayerField(p, 'v2State', updater));
  const [view,setView]=useState("roster");
  const [selectedId,setSelectedId]=useState(null);
  const [log,setLog]=useState(["📋 Hall Pass — Week one on your floor. Five residents, one master key, and a dining hall that never closes."]);
  const [logTab,setLogTab]=useState("story");
  const [sidebarOpen,setSidebarOpen]=useState(true);
  const [activeEvent,setActiveEvent]=useState(null);
  const [eventQueue,setEventQueue]=useState([]);
  const activeNarrativeCopy = useMemo(() => {
    if (!activeEvent) return null;
    const trace = [];
    const text = narrativeEventText(activeEvent.event, activeEvent.student, { week, trace });
    return {
      text,
      traceNodes: traceToFlagNodes(trace),
      event: activeEvent.event,
      student: activeEvent.student,
    };
  }, [activeEvent, week]);
  const [dinnerEvent,setDinnerEvent]=useState(null);
  const [dinnerLog,setDinnerLog]=useState([]);
  const [groupDinnerEvent,setGroupDinnerEvent]=useState(null);
  const [groupDinnerLog,setGroupDinnerLog]=useState([]);
  const [dinnerEndPopup,setDinnerEndPopup]=useState(null);
  const [endgameQueue,setEndgameQueue]=useState([]);
  const [groupDinnerPicker,setGroupDinnerPicker]=useState(null);
  // groupDinnerPicker: { count:2|3, selected:[] }
  const [immobileRedirect,setImmobileRedirect]=useState(null);
  // immobileRedirect: { student, text } | null
  const [debugOpen,setDebugOpen]=useState(false);
  const [debugInputs,setDebugInputs]=useState({});
  const [bugReportOpen,setBugReportOpen]=useState(false);
  const [fieldNoteError,setFieldNoteError]=useState(null);
  const [lastPlayerAction,setLastPlayerAction]=useState(null);
  // debugInputs: { [studentId]: { lbs:string, path:string, stage:number, rel:number } }
  const [floorCheckIn,setFloorCheckIn]=useState(null);
  const [_semesterData,setSemesterData]=useState({weeksCompleted:0,classHistory:[]});
  const [skillPurchase,setSkillPurchase]=useState(null);
  const [talkStudentId,setTalkStudentId]=useState(null);
  const [embodimentStudent,setEmbodimentStudent]=useState(null);
  const [feastRitualOpen,setFeastRitualOpen]=useState(false);
  const [dreamStudent,setDreamStudent]=useState(null);
  const [dreamPresetScenario,setDreamPresetScenario]=useState(null);
  const [echoReplay,setEchoReplay]=useState(null);
  const v2 = normalizeV2State(v2State || createInitialV2State());
  // raProfile lives on player object
  useEffect(() => {
    if (raProfile?.spiritId != null) setRaProfile(raProfile);
  }, [raProfile?.spiritId]);
  // DLC: Inner Circle
  const seenTiersRef=useRef(new Set());
  const prevRelsRef=useRef(Object.fromEntries(INIT_STUDENTS.map(s=>[s.id,s.relationship])));
  const [tierUpModal,setTierUpModal]=useState(null);
  const [dormUnlockModal,setDormUnlockModal]=useState(null);
  // DLC: Social Events
  // DLC: Private Sessions
  const [privateSession,setPrivateSession]=useState(null);
  // {student,venue,phase,foods:[],totalGain,sessionStartCalories,capacityBonus,encouragementsUsed:[],toleranceBuffer,sessionNum}
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
    saturation:{ score:0, tier:0, tierLabel:'Normal Campus', weeksAtTier:0 },
    witnessLog:[],
  });
  // {student, phase:"scene"|"analog"|"break"|"purchase"|"swap"|"digital"}
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
  // wifeLessonsState: persistent {mjStudentId,stage,daughters:{Emma,Chloe,Kezia,Lila},moms:{Darlene,Wanda,Patrice},session:null|{lessonChosen,lessonId,conversationState,log}}
  // session.conversationState: null|{person,stageEntry,optionIdx,subIdx,done,resultText}
  const [competitiveGainerState, setCompetitiveGainerStateRaw] = useState(null);
  const setCompetitiveGainerState = (updater) => setCompetitiveGainerStateRaw((cur) => {
    const base = migrateCompetitiveGainerState(cur);
    const next = typeof updater === 'function' ? updater(base) : updater;
    return migrateCompetitiveGainerState(next);
  });
  // competitiveGainerState: persistent {priyaStudentId,drive,chatLog:[{text,isRa,wk}],measuredStudentIds:[],measuredComparisons:{},lastChatWeek,corkboardVisitCount,open,view,subState}
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
  const [refeedSurgeState, setRefeedSurgeState] = useState(null);
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
  const [weekPulse, setWeekPulse] = useState(0);
  const [weekRecap, setWeekRecap] = useState(null);
  const [weekPlan, setWeekPlan] = useState(() => emptyWeekPlan());
  const [weekPlannerOpen, setWeekPlannerOpen] = useState(false);
  const [milestoneQueue, setMilestoneQueue] = useState(null);
  const [ascensionCeremony, setAscensionCeremony] = useState(null);
  const [originPickState, setOriginPickState] = useState(null);
  const [dossierOpen, setDossierOpen] = useState(false);
  const [sceneScrollback, setSceneScrollback] = useState([]);
  const [instantText, setInstantText] = useState(() => getPlayerPrefs().instantText);
  const [soundEnabled, setSoundEnabled] = useState(() => getPlayerPrefs().soundEnabled !== false);
  const [confrontation, setConfrontation] = useState(null);
  const [forceFeederState, setForceFeederState] = useState(null);
  const [deviceUsageModal, setDeviceUsageModal] = useState(null);
  const [weeklyFeedCounts, setWeeklyFeedCounts] = useState({});
  const [weeklyArms, setWeeklyArms] = useState({ devouringStudentId: null, mesmerizingStudentId: null, devouringConsumed: false });
  const skipHungerCheckRef = useRef(false);
  const pendingAfterInterruptRef = useRef(null);
  const pendingFeedContextRef = useRef(null);
  const pendingDinnerHungerResolveRef = useRef(null);
  const [compoundFeedPicker, setCompoundFeedPicker] = useState(null);
  const [communityResearcherState, setCommunityResearcherState] = useState(null);
  // communityResearcherState: {thesisComplete,boardPhase,caseStudyStage,lastPairId,pairsUsed,modalPhase,activePairId,eventText,totalSuspicion,boardReactionPairId,chatMemberIdx,chatPhaseIdx,chatHistory,chatWon,thesisApproved,thesisRejected,finalReviewText}
  const [presentationState, setPresentationState] = useState(null);
  const [deliveryState, setDeliveryState] = useState(null);
  const [challengeState, setChallengeState] = useState(null);
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
  const [opposition, setOpposition] = useState(() => defaultOppositionState());
  const [salonState, setSalonState] = useState(null);
  const [salonOpen, setSalonOpen] = useState(false);
  const [galleryState, setGalleryState] = useState(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [supernaturalModalOpen, setSupernaturalModalOpen] = useState(false);
  const [hearingState, setHearingState] = useState(null);
  // fairDayState: { studentId, stageIdx, phase:'weighin'|'judging'|'afterparty'|'done',
  //   influenceKey, weighInChoice:null, weighInResultText:null, weighInGain:0,
  //   afterpartyChoice:null, afterpartyResultText:null, totalGain:0, relBonus:0 }
  const [intimacySceneSelector,setIntimacySceneSelector]=useState(null);
  // intimacySceneSelector: {student}
  const logRef=useRef(null);

  useEffect(()=>{ if(logRef.current) logRef.current.scrollTop=logRef.current.scrollHeight; },[log,logTab]);

  useEffect(() => subscribeOpenFieldNotes((ev) => {
    setFieldNoteError(ev.detail?.error || null);
    setBugReportOpen(true);
  }), []);

  // Tier-up detection
  useEffect(()=>{
    if(!raProfile) return;
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
    if(ups.length>0){
      // Record a bondShift memory at every tier crossing so prose can call back to it.
      const bondValues=['trust+','trust++','trust+++'];
      setStudents(prev=>prev.map(s=>{
        const up=ups.find(u=>u.student.id===s.id);
        if(!up) return s;
        const v=bondValues[up.newTier.id-1]||'trust+';
        return {...s,memories:appendMemory(s.memories,'bondShift',week,v)};
      }));
      if(!tierUpModal){
        const u=ups[0];
        const scenes=TIER_SCENES[u.student.archetype]||TIER_SCENES.quiet;
        const fn=scenes[u.newTier.id-1];
        if(fn) setTierUpModal({student:u.student,oldTier:u.oldTier,newTier:u.newTier,scene:fn(u.student)});
      }
    }
  },[students,raProfile]);

  // Check achievements
  useEffect(()=>{
    const newAch=ACHIEVEMENT_LIST.filter(a=>!achievements.includes(a.id)&&a.check(students,globalStats));
    if(newAch.length){
      playHallPassSound('unlock', soundEnabled);
      newAch.forEach(a=>{ setTimeout(()=>push(`🏆 Achievement unlocked: ${a.label} — ${a.desc}`),100); });
      setAchievements(prev=>[...prev,...newAch.map(a=>a.id)]);
    }
  },[students,globalStats]);

  useEffect(() => {
    if (!floorCheckIn) return;
    playHallPassSound('session', soundEnabled);
  }, [soundEnabled, floorCheckIn?.sceneIdx, floorCheckIn?.pendingResult, !!floorCheckIn]);

  useEffect(() => {
    if (!skillPurchase) return;
    playHallPassSound('tier', soundEnabled);
  }, [soundEnabled, skillPurchase?.skill?.id]);

  useEffect(() => {
    if (!dinnerEvent) return;
    playHallPassSound('session', soundEnabled);
  }, [soundEnabled, dinnerEvent?.phase, dinnerEvent?.student?.id, dinnerEvent?.venue?.id]);

  useEffect(() => {
    if (!groupDinnerPicker) return;
    playHallPassSound('confirm', soundEnabled);
  }, [soundEnabled, groupDinnerPicker?.count]);

  useEffect(() => {
    if (!dinnerEndPopup) return;
    playHallPassSound('confirm', soundEnabled);
  }, [soundEnabled, dinnerEndPopup?.student?.id]);

  useEffect(() => {
    if (!groupDinnerEvent) return;
    playHallPassSound('session', soundEnabled);
  }, [soundEnabled, groupDinnerEvent?.phase, groupDinnerEvent?.venue?.id]);

  useEffect(() => {
    if (!activeNarrativeCopy) return;
    playHallPassSound('session', soundEnabled);
  }, [soundEnabled, activeNarrativeCopy?.event?.id]);

  useEffect(() => {
    if (!rankedFeedeeState) return;
    playHallPassSound('session', soundEnabled);
  }, [soundEnabled, rankedFeedeeState?.studentId, rankedFeedeeState?.stageIdx]);

  useEffect(()=>{
    const end=checkOppositionEndgame(opposition,students);
    const pending=[];
    const evolved=students.filter(s=>s.evolvedForm);
    if(end.scarcityBanished&&!globalStats.scarcityBanished){
      setGlobalStats(g=>({...g,scarcityBanished:true}));
      pending.push({ id:'scarcity_banished', week, detail:'Famine lifts. Scarcity curses thin out.' });
    }
    if(end.institutionalCapture&&!globalStats.institutionalCapture){
      setGlobalStats(g=>({...g,institutionalCapture:true}));
      pending.push({ id:'institutional_capture', week, detail:`${end.compromisedCount} members compromised — scarcity capped at 60.` });
    }
    if(end.vanceCompromised&&!globalStats.vanceCompromised){
      setGlobalStats(g=>({...g,vanceCompromised:true}));
      pending.push({ id:'vance_compromised', week, detail:'Removal hearings lose bite while she stays compromised.' });
    }
    if(evolved.length&&evolved.every(s=>s.supernaturalForm)&&!globalStats.allThinAscended){
      setGlobalStats(g=>({...g,allThinAscended:true}));
      pending.push({ id:'all_thin_ascended', week, detail:`${end.ascendedCount} ascended residents wear their thin skins.` });
    }
    if(checkSynthesisEndgame(opposition,students,pharmacistState?.stage) && !opposition?.supernatural?.synthesisAlly && !globalStats.synthesisAlly){
      setOpposition(prev=>applySynthesisAlly(prev));
      setGlobalStats(g=>({...g,synthesisAlly:true}));
      pending.push({ id:'synthesis_ally', week, detail:'Passive abundance +10% while synthesis holds.' });
    }
    if(pending.length){
      setEndgameQueue(q=>{
        const seen=new Set(q.map(b=>b.id));
        const novel=pending.filter(b=>!seen.has(b.id));
        return novel.length?[...q,...novel]:q;
      });
    }
  },[opposition,students,pharmacistState?.stage,globalStats.scarcityBanished,globalStats.institutionalCapture,globalStats.vanceCompromised,globalStats.allThinAscended,globalStats.synthesisAlly,week]);

  // Process event queue — hold events until hall session is done
  useEffect(()=>{
    if(eventQueue.length>0 && !activeEvent && !floorCheckIn){
      setActiveEvent(eventQueue[0]);
      setEventQueue(prev=>prev.slice(1));
    }
  },[eventQueue,activeEvent,floorCheckIn]);

  // (auto-end dinner removed — endings now handled by overfill check or manual "End Evening")

  const push=useCallback((msg)=>setLog(prev=>[...prev,msg]),[]);

  const trackAction=useCallback((label)=>setLastPlayerAction(label),[]);

  const getActiveModals=useCallback(()=>{
    const open=[];
    if(hearingState) open.push('hearing');
    if(supernaturalModalOpen) open.push('supernatural');
    if(salonOpen) open.push('salon');
    if(galleryOpen) open.push('gallery');
    if(evolvedEventState) open.push('evolvedEvent');
    if(debugOpen) open.push('debug');
    if(bugReportOpen) open.push('fieldNotes');
    return open;
  },[hearingState,supernaturalModalOpen,salonOpen,galleryOpen,evolvedEventState,debugOpen,bugReportOpen]);

  const getSnapshotContext=useCallback(()=>({
    week, ap, money, adminScrutiny, students, opposition, view, log,
    lastPlayerAction,
    activeModals: getActiveModals(),
    eventQueueLen: eventQueue.length,
    campusState,
    pharmacistState,
  }),[week,ap,money,adminScrutiny,students,opposition,view,log,lastPlayerAction,getActiveModals,eventQueue.length,campusState,pharmacistState]);

  const getSaveContext=useCallback(()=>({
    player, students, opposition, campusState, inventory, lilithUnlocked, lilithKillCount,
    labState, pharmacistState, deviceInventory, brokeScaleIds, view,
  }),[player,students,opposition,campusState,inventory,lilithUnlocked,lilithKillCount,labState,pharmacistState,deviceInventory,brokeScaleIds,view]);

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

  const startAsRA=({ approach, dorm, customDraft })=>{
    const apDef=RA_APPROACHES[approach.id];
    const hallDef=getDorm(dorm.id);
    if(!apDef||!hallDef) return;
    const profile={
      name:"You",
      role:"ra",
      origin:"resident_advisor",
      dormId:hallDef.id,
      subject:hallDef.id,
      approachId:apDef.id,
      traits:[...(apDef.traits||[])],
      color:hallDef.color,
      accentSoft:hallDef.accentSoft,
      lean:apDef.lean,
      appearance:{ hair:'red', build:'curvy' },
    };
    setRaProfile(profile);
    setUnlockedDorms([hallDef.id]);
    const startIds=[...hallDef.studentIds];
    const mods=apDef.startMods||{};
    const base=students.find(s=>s.id===CUSTOM_STUDENT_ID)||{};
    const custom=createCustomStudent(customDraft,base);
    const runtimeCustom={
      ...custom,
      ...initGainStats(custom),
      ...initDeviceState(),
      psych: custom.psych,
      corruption: 0,
      ascension: null,
      weekStartLbs: custom.lbs,
    };
    setStudents(list=>list.map(s=>{
      const seat = runtimeCustom && s.id === CUSTOM_STUDENT_ID ? runtimeCustom : s;
      if(seat.custom) return {...seat, lockState:'open', homeDorm:hallDef.id};
      s = seat;
      if(!UNLOCK_POOL_IDS.includes(s.id)) return s;
      const homeDorm=getStudentHomeDorm(s.id);
      const lockedIds=getLockedDormStudentIds([hallDef.id]);
      if(lockedIds.includes(s.id)) return {...s, lockState:'locked', passiveTrust:0, homeDorm};
      if(!startIds.includes(s.id)) return {...s, lockState:'locked', passiveTrust:0, homeDorm};
      let ns={...s, lockState:'open', homeDorm};
      if(mods.corruption) ns.corruption=(ns.corruption||0)+mods.corruption;
      if(mods.relationship) ns.relationship=Math.min(100,(ns.relationship||0)+mods.relationship);
      if(mods.hunger) ns=adjustHunger(ns,mods.hunger);
      return ns;
    }));
    push(`🏠 ${hallDef.label} — your hall. ${apDef.label} energy. ${startIds.length} doors open; the rest of campus waits.`);
  };

  // Hall cred meter — on-lean actions fill it; full → partial AP rebate.
  const gainFavor=(tag)=>{
    const fill=favorFill(getProfileApproachId(raProfile),tag);
    if(!fill) return;
    const next=(hallCred||0)+fill;
    if(next>=FAVOR_MAX){
      setHallCred(next-FAVOR_MAX);
      setAp(a=>Math.min(20,a+FAVOR_REBATE));
      push(`✨ Hall cred maxed — ${getApproachLabel(raProfile)} returns ${FAVOR_REBATE} AP.`);
    }else{
      setHallCred(next);
    }
  };

  const applyOppositionStudentPatches=(studentList,patches)=>{
    if(!patches?.length) return studentList;
    return studentList.map(s=>{
      const p=patches.find(x=>x.id===s.id);
      if(!p) return s;
      let ns={...s};
      if(p.relDelta!=null) ns.relationship=Math.max(0,Math.min(100,ns.relationship+(p.relDelta||0)));
      if(p.mood) ns.mood=p.mood;
      if(p.corruptionDelta!=null) ns.corruption=Math.max(0,(ns.corruption||0)+(p.corruptionDelta||0));
      if(p.passiveGainBlocked) ns.oppositionBlockedGain=true;
      if(p.hungerDelta) ns=adjustHunger(ns,p.hungerDelta);
      return ns;
    });
  };

  const addScrutiny=(n)=>{
    const loungeFx=aggregateHallLoungeSkillEffects(ownedHallSkills||{});
    const mult=profileScrutinyMult(raProfile)
              *(1-(raProfile?.traits?.includes("discreet")?0.35:0))
              *skillScrutinyReduce
              *(1-(loungeFx.scrutinyReduce||0));
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

  /** Hidden students stay frozen until discovered; Lilith only after unlock. */
  const studentReceivesPassiveGain=(st)=>{
    if(st.id===LILITH_ID) return lilithUnlocked;
    if(st.hidden) return st.id===ELARA_ID&&elaraDiscovered;
    return true;
  };

  const getCampusExplorationCtx=()=>buildExplorationContext({
    students, pharmacistState, week, lilithUnlocked,
    exploration:campusState.exploration||defaultCampusExplorationState(),
    labState, deviceInventory,
    asceticCircle:!!opposition?.proxies?.asceticCircle,
    opposition,
    saturationTier:campusState.saturation?.tier??0,
  });

  const huntPortionSaint=()=>{
    if(ap<2){push('⚠️ Need 2 AP.');return;}
    if(campusState.at!=='dining_hall'){push('⚠️ The Portion Saint haunts the dining hall.');return;}
    if(opposition?.supernatural?.portionSaintConsumed){push('⚠️ Already consumed.');return;}
    setAp(a=>a-2);
    setOpposition(prev=>consumePortionSaint(prev));
    setGlobalStats(g=>({...g,lilithSaint:true}));
    push('🩸 Lilith devours the Portion Saint — scarcity pressure collapses (−50).');
  };

  const purchaseHallLoungeSkill=(skillId)=>{
    const result=buyHallLoungeSkill(skillId,ownedHallSkills||{},students);
    if(!result.ok){push(`⚠️ ${result.reason}`);return;}
    setOwnedHallSkills(result.owned);
    push(`🏛️ Hall upgrade: ${result.skill.label} (${result.spent} lbs prestige).`);
  };

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
    if(effects.asceticShame) addScrutiny(2);
    if(effects.ledgerWightAudit){
      const ledgerFx=applyLedgerWightEncounter(opposition);
      if(ledgerFx.scrutinyDelta) addScrutiny(ledgerFx.scrutinyDelta);
      setOpposition(ledgerFx.opposition);
    }
    if(effects.ingredientGrant||effects.foodGrant) grantExplorationReward({...effects.ingredientGrant,...(effects.foodGrant?{foodId:effects.foodGrant}:{})});
    if(effects.trustGrants?.length){
      setStudents(prev=>{
        let next=prev;
        for(const g of effects.trustGrants){
          next=next.map(s=>s.id===g.studentId?grantPassiveTrust(s,g.amount,unlockedDorms):s);
        }
        return next;
      });
      const names=effects.trustGrants.map(g=>students.find(s=>s.id===g.studentId)?.name).filter(Boolean);
      if(names.length) extra.push(`🌒 ${names.join(', ')} felt your attention on campus — trust on your floor grows.`);
    }
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
    return {
      lines:[...lines,...extra],
      exploration,
      deviceEncounter:effects.deviceEncounter||null,
      asceticGardenProtest:!!effects.asceticGardenProtest,
      mirrorFastWeek:!!effects.mirrorFastWeek,
    };
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
      encounter, deviceId, modeId, student, week, exploration, labState, adminScrutiny, rng:Math.random,
    });
    if(!result.ok){ campusLog(['⚠️ Device use failed.']); return; }
    if(result.scrutinyDelta) addScrutiny(result.scrutinyDelta);
    if(result.witnessEntry){
      setCampusState(prev=>appendWitnessLog(prev,result.witnessEntry));
    }
    const def=DEVICES[deviceId];
    if(encounter.target.type==='student'&&result.student){
      const growthEv=applyStudentDeviceResult(encounter.target.studentId,{ ok:true, ...result, student:result.student },def,false,'campus');
      if(labState) awardDeviceMastery(deviceId, result.malfunction ? 'messy' : 'good');
      if(!growthEv&&result.malfunction&&(result.malfunction.tier==='major'||result.malfunction.tier==='critical')){
        setMalfunctionPopup({
          studentName:encounter.target.name,tier:result.malfunction.tier,
          text:result.malfunction.text,deviceLabel:def?.label,
        });
      }
    } else if(result.malfunction&&(result.malfunction.tier==='major'||result.malfunction.tier==='critical')){
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
    const { lines:eventLines, exploration, deviceEncounter, asceticGardenProtest, mirrorFastWeek }=rollCampusEvent(nodeId,true);
    const lines=[`→ You walk to ${node.emoji} ${node.label}.`,node.desc,...eventLines];
    setCampusState(prev=>{
      let next=asceticGardenProtest?applyAsceticGardenProtest(prev):prev;
      if(mirrorFastWeek){
        const fx=applyMirrorFastEncounter(next,opposition);
        next=fx.campus;
        if(fx.opposition) setOpposition(fx.opposition);
      }
      return {
        ...next,
        at:nodeId,
        exploration,
        activeEncounter:deviceEncounter||null,
        log:[...prev.log,...lines].slice(-CAMPUS_CONFIG.logLimit),
      };
    });
  };

  const lookAround=()=>{
    const node=CAMPUS_NODES[campusState.at];
    const flavor=node.flavor[rnd(0,node.flavor.length-1)];
    const { lines:eventLines, exploration:eventExploration, deviceEncounter, asceticGardenProtest, mirrorFastWeek }=rollCampusEvent(campusState.at,false);
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
        lines.push(resolveSecretDiscoverLine(secret, ctx, campusState.at));
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
    setCampusState(prev=>{
      let next=asceticGardenProtest?applyAsceticGardenProtest(prev):prev;
      if(mirrorFastWeek){
        const fx=applyMirrorFastEncounter(next,opposition);
        next=fx.campus;
        if(fx.opposition) setOpposition(fx.opposition);
      }
      return {
        ...next,
        exploration,
        activeEncounter:deviceEncounter||prev.activeEncounter,
        log:[...prev.log,...lines].slice(-CAMPUS_CONFIG.logLimit),
      };
    });
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

  const guardHungerInterrupt=(onProceed,context=null)=>{
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
      pendingFeedContextRef.current=context;
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
    if(target.lockState==='locked'){
      push("She's not close enough yet — you can't reach her like this.");
      setItemTargetPicker(null);
      return;
    }
    setItemTargetPicker(null);
    const compounds=getStockedCompounds();
    if(compounds.length>0){
      setCompoundFeedPicker({kind:'item',item,studentId});
      return;
    }
    executeItemFeed(item,studentId,null);
  };

  // ── CORRUPTION: hidden psyche progression (general actions only) ──
  const addCorruption=(s,amount,textOpts={})=>{
    const before=getCorruptionTier(s.corruption||0).id;
    const scaled=amount>0?amount*raCorruptionMult:amount;
    const newC=Math.min(CORRUPTION_CONFIG.max,(s.corruption||0)+scaled);
    const after=getCorruptionTier(newC).id;
    if(after>before){
      if(CORRUPTION_TIER_UP_LINES[after]){
        setTimeout(()=>push(`🕯️ ${CORRUPTION_TIER_UP_LINES[after]({...s,corruption:newC})}`),200);
      }
      const shiftLine=renderPsychShift({...s,corruption:newC},week,{lastCorruptionShift:true,...textOpts});
      if(shiftLine) setTimeout(()=>push(`💫 ${shiftLine}`),320);
      if((ownedSkills.memory_palace||0)>=1){
        const stageId=getStage(s.lbs).id;
        applyEchoCapture(s, prev=>captureCorruptionTierEcho(prev,s.id,week,stageId,after));
      }
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
    // A resident who has walked out won't engage until you make amends.
    if(s.withdrawn){
      push(`🚪 ${s.name} has walked out — make amends before she'll take anything from you.`);
      return null;
    }
    // An unhappy resident may simply refuse to be fed by you (real stakes).
    if(!opts.compoundId&&!opts.ignoreDiscontent&&getDiscontentTier(s).id>=2&&Math.random()<discontentRefusalChance(s)){
      const dl=renderDiscontentRefusal(s,week,{discontentTier:getDiscontentTier(s).id});
      push(`🙅 ${dl||`${s.name} refuses to take anything from you right now.`}`);
      return null;
    }
    const eff=aggregateSkillEffects(ownedSkills);
    const stageId=getStage(s.lbs).id;
    const cap=getFeedCapacity(s,{
      softStartBonus:softStartBonus(ownedSkills,stageId),
      capacityBonus:opts.capacityBonus||0,
      toleranceBuffer:opts.toleranceBuffer||0,
    });
    let fullMult=1;
    if(opts.compoundId){
      const preview=applyCompoundToFeed(s,opts.compoundId,{},pharmacistState);
      fullMult=preview.feedResult.fullMult??1;
    }
    const scaledFullEarly=Math.round(fullnessCost*fullMult*(opts.fullnessMult??1));
    const wouldExceed=(s.fullness||0)+scaledFullEarly>cap;
    let forced=false;
    if(wouldExceed){
      if(eff.totalSurrender&&(s.corruption||0)>=90){
        forced=true;
      } else {
        const bonuses=getForceFeedChanceBonuses(s);
        let chance=forceFeedChance(s,fullnessCost,reachLevel)+bonuses.corruptionBonus;
        if(opts.refusalBonus!=null) chance+=opts.refusalBonus;
        else chance+=bonuses.complianceBonus;
        chance+=bonuses.dependenceBonus||0;
        chance+=eff.forceFeedBonus||0;
        chance+=eff.extremeBonus||0;
        if(weeklyArms.mesmerizingStudentId===s.id&&eff.mesmerizingAura) chance+=TALK_CONFIG.auraBonus;
        if(s.suggestDebuffWeek===week) chance+=TALK_CONFIG.suggestResistReduction;
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
    const scaledCals=Math.round(calories*(s.gainMultiplier||1)*raGainMult*calMult);
    const scaledFull=scaledFullEarly;
    if(label) push(`🍽️ ${label} — ${s.name}: +${scaledCals.toLocaleString()} cal (fullness ${Math.min(999,(s.fullness||0)+scaledFull)}/${cap})`);
    let feedWeekUsed=null;
    if(label){
      const feedRoom=feedRoomFromFullness(((s.fullness||0)+scaledFull)/Math.max(1,cap),forced);
      // Render off a projected POST-feed snapshot so {word.fullness} agrees
      // with the room band (she can't read "still hungry" while she's stuffed).
      const projected={...s,fullness:(s.fullness||0)+scaledFull,stomachCapacity:cap};
      // Per-resident week bag → reaction lines don't repeat within a week.
      feedWeekUsed=weekUsedFromStudent(s);
      const reaction=renderFeedReaction(projected,week,{
        foodKind:foodKindFromFeed(label,calories,fullnessCost),feedRoom,
        weekUsed:feedWeekUsed,sessionUsed:createSessionUsed(),
      });
      if(reaction?.trim()){
        // Occasionally she references a recent meal/milestone mid-feed.
        // Pick from PRIOR history (s, pre-feed) so it reads as a callback.
        let out=reaction;
        const mem=pickStudentMemory(s,week);
        if(mem&&Math.random()<0.4){
          const memBeat=renderMemorySelf(projected,week,mem);
          if(memBeat?.trim()) out=`${reaction} ${memBeat}`;
        }
        setTimeout(()=>push(out),40);
      }
    }
    if(Math.random()<CORRUPTION_CONFIG.dialogueChance){
      const voiceLine=renderFeedVoice(s, week);
      if(voiceLine?.trim()){
        setTimeout(()=>push(`💭 ${voiceLine}`),120);
      }
    }
    let corruption=s.corruption||0;
    let relGain=extraRel+(forced?1:0);
    if(forced){
      const priorForceCount=s.timesForceFed||0;
      let corruptGain=CORRUPTION_CONFIG.perForceFeed;
      if(eff.corruptionRate) corruptGain=Math.round(corruptGain*(1+eff.corruptionRate));
      if(eff.cravingSubmission){ corruptGain+=1; relGain+=2; }
      if(eff.firstCrack&&priorForceCount===0) corruptGain+=eff.firstCrack;
      const newCorruption=addCorruption(s,corruptGain);
      corruption=newCorruption;
    }
    let result={
      ...s,
      ...(forced?corruptionStudentPatch(s,corruption,week):{corruption}),
      consumedCalories:(s.consumedCalories||0)+scaledCals,
      fullness:(s.fullness||0)+scaledFull,
      timesForceFed:forced?(s.timesForceFed||0)+1:(s.timesForceFed||0),
      relationship:Math.min(100,s.relationship+relGain),
      playerFedThisWeek:true,
    };
    if(opts.compoundId){
      const applied=applyCompoundToFeed(result,opts.compoundId,{},pharmacistState);
      result=applied.student;
      if(applied.feedResult.corruptionGain){
        const newCorruption=addCorruption(result,applied.feedResult.corruptionGain);
        result={...result,...corruptionStudentPatch(result,newCorruption,week)};
      }
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
        const preLbs=result.lbs;
        result=processStudentGain(result,lbsGain,0);
        const growthEv=buildGrowthEvent(result,{
          cause:{ type:'feature', featureId:'compound', locale:'office' },
          preLbs,
          gainLbs:lbsGain,
          week,
        });
        if(growthEv){
          setDeviceTickQueue(prev=>{
            const events=prev?.events?[...prev.events,growthEv]:[growthEv];
            return { events, index: prev?.index??0 };
          });
        }
        setTimeout(()=>push(`💊 ${compound.label} — ${s.name} gains ${lbsGain} lbs immediately. Fullness unchanged.`),75);
      }
    }
    if(feedWeekUsed) result={...result,...weekUsedToPatch(feedWeekUsed)};
    // Record a memory of a notable feed — a forced meal, or a real feast —
    // so the prose can call back to it later.
    const memEvent=forced?'forced':((fullnessCost>=40||/feast|banquet|platter/i.test(label||''))?'feast':null);
    if(memEvent) result={...result,memories:appendMemory(result.memories,memEvent,week)};
    // Force-feeding her before she trusts you is a betrayal — it festers.
    // A willing feed is attention, and eases discontent a little.
    if(forced&&forceFeedIsBetrayal(s)){
      result={...result,mood:"stressed",
        discontent:bumpDiscontent(result.discontent,grievanceGain(s,'betrayed')),
        memories:appendMemory(result.memories,'betrayed',week)};
    } else if(!forced&&(result.discontent||0)>0){
      result={...result,discontent:Math.max(0,(result.discontent||0)-DISCONTENT_EASE_FEED)};
    }
    const hungerEff=aggregateSkillEffects(ownedSkills);
    const fedStudent=feedResolvesHunger(result,Boolean(opts.compoundId),hungerEff,weeklyArms);
    setWeeklyFeedCounts(prev=>({...prev,[s.id]:(prev[s.id]||0)+1}));
    gainFavor((forced||fullnessCost>=40)?'stuff':'feed');
    if((ownedSkills.hunger_web||0)>=1&&scaledCals>=400){
      const pulseResult=handleFeedResonancePulse(s.id,scaledCals,students,v2);
      if(pulseResult.pulses?.length){
        setV2State(pulseResult.v2State);
        pulseResult.pulses.forEach((p)=>{
          setStudents(prev=>prev.map(st=>st.id===p.studentId?{
            ...st,
            consumedCalories:(st.consumedCalories||0)+p.calories,
            relationship:Math.min(100,(st.relationship||0)+p.rel),
          }:st));
        });
        const pulseProse=renderResonancePulse(createContext({ subject: s, week }));
        const pulseSnippet=pulseProse?.trim().slice(0,160);
        setTimeout(()=>push(`🔗 ${pulseSnippet||`Appetite resonates — ${pulseResult.pulses.length} linked resident(s) feel the pull.`}`),95);
      }
    }
    if((ownedSkills.memory_palace||0)>=1){
      const echoForced=forced&&(s.timesForceFed||0)===0;
      const echoFeast=fullnessCost>=40||/feast|banquet|platter/i.test(label||'');
      if(echoForced||echoFeast){
        applyEchoCapture(fedStudent, prev=>captureFeedEcho(prev,fedStudent,week,{forced:echoForced,feast:echoFeast&&!echoForced}));
      }
    }
    return fedStudent;
  };

  const processStudentGain=(s,gain,extraRel=0)=>{
    const scaledGain=Math.round(gain*(s.gainMultiplier||1)*skillGainMult);
    const {newLbs,oldStageId,newStageId,narrativeEvents}=applyGainToStudent(s,scaledGain);
    if(newStageId>oldStageId){
      setTimeout(()=>push(`📣 ${s.name} reaches ${WEIGHT_STAGES[newStageId].label}! "${getAttitude({...s,lbs:newLbs}, week, pharmacistTextOpts(pharmacistState, week))}"`) ,50);
      if((ownedSkills.memory_palace||0)>=1){
        applyEchoCapture({...s,lbs:newLbs}, prev=>captureStageUpEcho(prev,s.id,week,newStageId));
      }
    }
    const mergedTriggered=[...s.triggeredEvents,...narrativeEvents.map(e=>e.id)];
    const gained = {
      ...s,
      lbs:newLbs,
      relationship:Math.min(100,s.relationship+extraRel),
      triggeredEvents:mergedTriggered,
      mood: newStageId>=5?"content":s.mood,
      // Unlock any signature-beat diary gate her new state has earned.
      ...gatewayFlagPatch({...s,triggeredEvents:mergedTriggered},newStageId),
    };
    return applyEssenceFromGain(gained, scaledGain, { stagedUp: newStageId > oldStageId });
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
    trackAction('advanceWeek');
    if(opposition?.supernatural?.famineWeek){
      push('🕯️ Famine Week — the semester cannot advance until you complete a Refeast Ritual (4 AP hall action).');
      return;
    }
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
    setWeekPulse((p) => p + 1);
    playHallPassSound('week', soundEnabled);
    const startDorm=raProfile?.dormId||raProfile?.subject;
    let effectiveUnlockedDorms=unlockedDorms||[];
    if(startDorm){
      const newly=dormUnlocksForWeek(newWeek,startDorm).filter((id)=>effectiveUnlockedDorms.indexOf(id)<0);
      if(newly.length){
        effectiveUnlockedDorms=[...effectiveUnlockedDorms,...newly];
        setUnlockedDorms(effectiveUnlockedDorms);
        const unlockedHalls=newly.map((id)=>getDorm(id)).filter(Boolean);
        unlockedHalls.forEach((d)=>{
          push(`🔓 ${d.label} unlocked — residents from ${d.shortLabel} hall may appear on your roster.`);
        });
        if(unlockedHalls.length){
          playHallPassSound('unlock', soundEnabled);
          setDormUnlockModal(unlockedHalls);
        }
      }
    }
    const scrutinyTier=getScrutinyTier(adminScrutiny);
    const prestigeScore=computePrestigeScore({ week:newWeek, labState, campusSaturation:campusState.saturation, globalStats });
    const loungeSkillFx=aggregateHallLoungeSkillEffects(ownedHallSkills||{});
    const weeklyApBase=5+skillApBonus+(loungeSkillFx.apBonus||0)+prestigeApBonus(prestigeScore)+scrutinyApModifier(adminScrutiny);
    const newAp=Math.min(ap+weeklyApBase,20);
    setAp(newAp);

    // Decrement Reneé digestion timer each week
    if(cultivatorState?.digestWeeksLeft>0){
      setCultivatorState(prev=>prev?{...prev,digestWeeksLeft:Math.max(0,prev.digestWeeksLeft-1)}:null);
    }
    const oppGainMult=getOppositionGainMult(opposition);
    let updated=students.map(s=>{
      if((s.aibSuspensionWeeks||0)>0){
        const w=s.aibSuspensionWeeks-1;
        if(w<=0){
          const restoreHidden=s.wasHiddenBeforeSuspension??(s.id===LILITH_ID||s.id===ELARA_ID);
          return {...s,aibSuspensionWeeks:0,hidden:restoreHidden,wasHiddenBeforeSuspension:undefined};
        }
        return {...s,aibSuspensionWeeks:w};
      }
      if(s.oppositionBlockedGain) return {...s,oppositionBlockedGain:false};
      if(!studentReceivesPassiveGain(s)) return s;
      if(s.id===LILITH_ID&&lilithUnlocked) return processStudentGain(s,LILITH_PASSIVE_GAIN,0);
      if(s.id===10&&cultivatorState?.digestWeeksLeft>0) return s; // Reneé digesting — no passive gain
      let gain=rnd(1,3)+skillPassiveBonus+(loungeSkillFx.passiveBonus||0);
      const asceticMult=campusState?.asceticProtestWeek?0.88:1;
      const mirrorMult=campusState?.mirrorFastWeek?0.9:1;
      gain=Math.max(0,Math.round(gain*oppGainMult*asceticMult*mirrorMult*getSupernaturalGainMult(s)*formPassiveGainMultiplier(s)*(1+(loungeSkillFx.gainMult||0))*withdrawalGainMultiplier(s)));
      if(opposition?.supernatural?.synthesisAlly) gain=Math.max(0,Math.round(gain*1.1));
      // Corruption-driven autonomous eating (willingness made flesh)
      const cTier=getCorruptionTier(s.corruption||0).id;
      if(cTier===1) gain+=rnd(CORRUPTION_CONFIG.tier2AutoLbs[0],CORRUPTION_CONFIG.tier2AutoLbs[1]);
      if(cTier===2) gain+=rnd(CORRUPTION_CONFIG.tier3AutoLbs[0],CORRUPTION_CONFIG.tier3AutoLbs[1]);
      // Immobility "settling" — once she has Arrived, sustained care keeps her
      // gently growing without active feeding (the set-and-forget endgame).
      gain+=immobilitySettleGain(s,Math.random);
      // Ever-Expanding final form: her own settling uncaps further.
      gain+=finalFormSelfGain(s,Math.random);
      // Evolved skill passive bonuses
      if(s.evolvedForm&&(s.evolvedSkills||[]).length>0){
        const evTree=EVOLVED_SKILL_TREES[s.evolvedForm]||[];
        const evPassive=evTree.filter(sk=>(s.evolvedSkills||[]).includes(sk.id)&&sk.passiveBonus).reduce((a,b)=>a+(b.passiveBonus||0),0);
        gain+=evPassive;
      }
      let ns=processStudentGain(s,gain,0);
      ns=tickPhysicalTraits(ns,ownedSkills);
      ns=tickHungerAddiction(ns,!!ns.playerFedThisWeek,hungerEff,weeklyArms);
      ns=tickRelationshipDecay(ns);
      if(hungerEff.gluttonsInstinct){
        const cap=ns.stomachCapacity||GAIN_CONFIG.baseCapacity;
        if((ns.fullness||0)/cap>=0.7&&Math.random()<0.45) ns=adjustHunger(ns,1);
      }
      return {...ns,playerFedThisWeek:false};
    });
    // Final-form campus radiate: Comfort Queens soothe, The Adored warm.
    updated=applyFinalFormRadiate(updated);
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

    const satCtx={
      pharmacistState:nextPharmacistState||pharmacistState,
      labState,
      students:updated,
      cultSupply:nextPharmacistState?.cult?.supplyReservoir??pharmacistState?.cult?.supplyReservoir??0,
    };
    const nextSaturation=tickCampusSaturationState(campusState.saturation||{},satCtx);
    setCampusState(prev=>({...prev,saturation:nextSaturation}));
    if(nextSaturation.crossedTier){
      const tierMeta=getSaturationTier(nextSaturation.score);
      setTimeout(()=>push(`🌐 Campus saturation — ${tierMeta.label}: ${tierMeta.desc}`),130);
    }
    const satPassive=saturationWeeklyPassiveBonus(nextSaturation.tier);
    if(satPassive>0){
      updated=updated.map(s=>{
        if(!studentReceivesPassiveGain(s)) return s;
        return processStudentGain(s,satPassive,0);
      });
    }

    const favSummary=favoritismSummary(updated,weeklyFeedCounts);
    if(favSummary){
      updated=updated.map(s=>{
        const flag=favSummary.flags[s.id];
        if(!flag) return s;
        return applyFavoritismEcology(s,flag,newWeek);
      });
      favSummary.neglected.forEach((s,i)=>{
        const line=renderJealousyReaction(s,'neglected',newWeek);
        setTimeout(()=>push(line?`💔 ${line}`:`💔 ${s.name} feels sidelined by your attention this week.`),210+i*90);
      });
      favSummary.favored.slice(0,2).forEach((s,i)=>{
        const line=renderJealousyReaction(s,'favored',newWeek);
        if(line) setTimeout(()=>push(`✦ ${line}`),320+i*70);
      });
    }
    setWeeklyFeedCounts({});

    const deviceTickEvents=[];
    updated=updated.map(s=>{
      let ns=clearExpiredOverrides(s,newWeek);
      const preLbs=ns.lbs;
      const tick=tickEquippedDevices(ns,newWeek,Math.random,{ player, labState });
      ns=tick.student;
      if(ns._pendingGainLbs){
        const g=ns._pendingGainLbs;
        const{ _pendingGainLbs,...rest}=ns;
        ns=processStudentGain(rest,g,0);
      }
      if(tick.tickEvents?.length){
        for(const ev of tick.tickEvents){
          const growthEv=buildGrowthEvent(ns,{
            cause:{
              type:ev.isMalfunction?'device_malfunction':'weekly_tick',
              deviceId:ev.deviceId,
              malfunctionTier:ev.malfunction?.tier,
              locale:'lab',
            },
            preLbs,
            gainLbs:ev.gainLbs||Math.max(0,Math.round(ns.lbs-preLbs)),
            week:newWeek,
            malfunction:ev.malfunction,
          });
          deviceTickEvents.push(growthEv?{ ...growthEv, slot:ev.slot }:ev);
        }
      }
      if(ns.limitRemoved){
        const extra=rnd(2,4);
        const lrPre=ns.lbs;
        ns=processStudentGain(ns,extra,0);
        const lrEv=buildGrowthEvent(ns,{
          cause:{ type:'device_use', deviceId:'growth_serum_injector', locale:'campus' },
          preLbs:lrPre,
          gainLbs:extra,
          week:newWeek,
          isPermanent:true,
        });
        if(lrEv) deviceTickEvents.push(lrEv);
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
    if(pharmacistState?.campusFattening&&Math.random()<getCampusWeeklyEventChance(pharmacistState,nextSaturation?.tier??0)){
      const campusEv=pickPharmacistCampusEvent(updated,{
        hasMayaHive:!!students.find(s=>s.evolvedForm==='delivery_hive'),
      });
      if(campusEv){
        setTimeout(()=>{
          if(campusEv.target==='hall'){
            push(`🌿 ${campusEv.text()}`);
            setStudents(prev=>prev.map(s=>studentReceivesPassiveGain(s)?processStudentGain(s,scaleCampusEventGain(campusEv.gain,pharmacistState,rnd,nextSaturation?.tier??0),0):s));
          }else{
            const gainTargets=updated.filter(studentReceivesPassiveGain);
            const target=gainTargets.length?gainTargets[rnd(0,gainTargets.length-1)]:null;
            if(target){
              push(`🌿 ${campusEv.text(target)}`);
              setStudents(prev=>prev.map(s=>s.id===target.id?processStudentGain(s,scaleCampusEventGain(campusEv.gain,pharmacistState,rnd,nextSaturation?.tier??0),0):s));
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
    // ── V2.0 pre-digest weekly — resonance bonus/surge, embodiment reset ──
    const v2Weekly=runWeeklyV2Events(v2,updated,ownedSkills,ownedHallSkills||{},week);
    const nextV2State=v2Weekly.v2State;
    if(v2Weekly.passiveStudents) updated=v2Weekly.passiveStudents;
    for(const msg of v2Weekly.messages){
      if(msg.type==='surge'&&msg.applySurge){
        updated=applyResonanceSurgeBonus(updated,nextV2State.resonance);
      }
    }
    setV2State(nextV2State);
    v2Weekly.messages.forEach((msg,i)=>{
      if(msg.type==='passive') setTimeout(()=>push(`🔗 Resonance ${msg.tier} — hall appetite +${msg.bonus}.`),160+i*40);
      if(msg.type==='surge') setTimeout(()=>push(`🔗 Resonance surge — ${msg.text}`),200+i*50);
      if(msg.type==='dream'&&msg.interactive){
        const ds=updated.find(s=>s.id===msg.studentId);
        if(ds) setTimeout(()=>{
          setDreamPresetScenario(msg.scenarioId);
          setDreamStudent(ds);
        },420+i*120);
      }
    });
    // ── WEEKLY DIGESTION: convert this week's fed calories into weight ──
    const digestLines=[];
    const digestGrowthEvents=[];
    const recapMovers=[];
    const milestones=[];
    updated=updated.map(s=>{
      if((s.consumedCalories||0)<=0&&(s.fullness||0)<=0&&!s.stuffedStreak) return s;
      const digestTextSession={
        sessionUsed:createSessionUsed(),
        weekUsed:weekUsedFromStudent(s),
      };
      const textOpts=digestTextSession;
      const d=digestStudent(
        s.embodimentEchoWeek===newWeek
          ? { ...s, weeklyDigestMult: Math.max(s.weeklyDigestMult || 1, V2_CONFIG.embodimentEchoDigestMult) }
          : s,
      );
      const oldStageId=getStage(s.lbs).id;
      const preLbs=s.lbs;
      let ns=s;
      if(d.lbsGained>0) ns=processStudentGain(s,d.lbsGained,0);
      const stagedUp=getStage(ns.lbs).id>oldStageId;
      // Stage-ups route to the dedicated Milestone Ceremony (below), not the
      // generic growth-event popup — so big-gain-without-stageup still shows
      // there, but a stage crossing gets its own set-piece.
      const growthEv=(!stagedUp&&d.lbsGained>=8)?buildGrowthEvent(ns,{
        cause:{ type:'digest_stageup', locale:'campus' },
        preLbs,
        gainLbs:d.lbsGained,
        week:newWeek,
      }):null;
      if(growthEv) digestGrowthEvents.push(growthEv);
      const growth=applyCapacityGrowth(ns,d.lbsGained,stagedUp);
      const capacityGained=d.capacityGained+(growth.stomachCapacity-(ns.stomachCapacity||GAIN_CONFIG.baseCapacity));
      if(d.lbsGained>0||capacityGained>0){
        digestLines.push(`${ns.name} +${d.lbsGained} lbs${d.stuffed?" · stuffed all week":""}${capacityGained>0?` · capacity +${capacityGained}`:""}`);
      }
      if(s.embodimentEchoWeek===newWeek) ns={...ns,embodimentEchoWeek:undefined};
      if(d.lbsGained>0&&isSlenderEligible(ns)){
        const slenderLine=renderSlenderScene(ns,week,{weekGainLbs:d.lbsGained,...textOpts});
        if(slenderLine) setTimeout(()=>push(`✨ ${slenderLine}`),220);
      }
      let corruption=ns.corruption||0;
      if(d.stuffed){
        const newC=addCorruption({...ns,corruption},CORRUPTION_CONFIG.perStuffedWeek,textOpts);
        Object.assign(ns,{...corruptionStudentPatch({...ns,corruption},newC,week)});
        corruption=ns.corruption;
        ns.memories=appendMemory(ns.memories,'stuffed',week);
      }
      if(stagedUp){
        const newC=addCorruption(ns,CORRUPTION_CONFIG.perStageUp,textOpts);
        const newStageId=getStage(ns.lbs).id;
        const clothState=clothingStateForStage(newStageId);
        Object.assign(ns,{
          ...corruptionStudentPatch(ns,newC,week),
          clothingState:clothState,
          // Settling into a new stage can unlock her signature diary gate.
          ...gatewayFlagPatch(ns,newStageId),
        });
        corruption=ns.corruption;
        ns.memories=appendMemory(ns.memories,'stageUp',week,newStageId);
        // The stage crossing becomes a Milestone Ceremony: body-as-she-grows
        // + the garment giving way + her reaction, in its own popup.
        const milestoneTrace=[];
        const ceremony=renderMilestone({...ns,clothingState:clothState},week,{
          clothingState:clothState,trace:milestoneTrace,...textOpts,
        });
        if(ceremony?.trim()){
          milestones.push({
            id:ns.id,name:ns.name,stageLabel:WEIGHT_STAGES[newStageId]?.label,
            gainLbs:d.lbsGained,endLbs:Math.round(ns.lbs),prose:ceremony,
            traceNodes:milestoneTrace.filter(t=>t.text&&t.text.trim()&&!t.key.startsWith('subject.')),
          });
          setTimeout(()=>push(`✦ ${ns.name} crossed a threshold — ${WEIGHT_STAGES[newStageId]?.label}.`),120);
        }
        if(newStageId>=10){
          const immobLine=renderImmobScene(ns,week,textOpts);
          if(immobLine) setTimeout(()=>push(`🛋️ ${immobLine}`),480);
        }
      }
      let carriedFullness=0;
      let selfStuffChance=CORRUPTION_CONFIG.tier3SelfStuffChance;
      if(hungerEff.willingVessel&&getCorruptionTier(corruption).id===2) selfStuffChance=Math.min(1,selfStuffChance*2);
      if(getCorruptionTier(corruption).id===2&&Math.random()<selfStuffChance){
        carriedFullness=Math.round((growth.stomachCapacity+d.capacityGained)*1.15);
        const autoLine=CORRUPTION_AUTO_LINES[rnd(0,CORRUPTION_AUTO_LINES.length-1)](ns);
        setTimeout(()=>push(`💭 ${autoLine}`),250);
      }
      if(d.lbsGained>0||stagedUp||d.stuffed){
        const prose=renderWeekRecap(ns,newWeek,{
          lbsGained:d.lbsGained,gainBand:gainBandFromLbs(d.lbsGained),
          stagedUp,stuffedWeek:d.stuffed,...textOpts,
        });
        if(prose?.trim()){
          const curStageId=getStage(ns.lbs).id;
          const startStageId=getStage(ns.startLbs??ns.lbs).id;
          recapMovers.push({
            id:ns.id,name:ns.name,lbsGained:d.lbsGained,stagedUp,stuffed:d.stuffed,
            stageLabel:WEIGHT_STAGES[curStageId]?.label,prose,
            totalGained:Math.round((ns.lbs??0)-(ns.startLbs??ns.lbs??0)),
            startStageLabel:WEIGHT_STAGES[startStageId]?.label,
            journeyStages:curStageId-startStageId,
          });
        }
      }
      return {...ns,
        stomachCapacity:growth.stomachCapacity+d.capacityGained,
        capacityChunkProgress:growth.capacityChunkProgress,
        stuffedStreak:d.stuffedStreak,
        corruption,
        weeklyDigestMult:undefined,
        ...d.reset,
        fullness:carriedFullness,
        ...weekUsedToPatch(digestTextSession.weekUsed),
      };
    });
    if(digestLines.length) setTimeout(()=>push(`🧬 Digestion — ${digestLines.join(" · ")}`),150);
    if(digestGrowthEvents.length){
      setDeviceTickQueue(prev=>{
        const events=prev?.events?[...prev.events,...digestGrowthEvents]:digestGrowthEvents;
        return { events, index: prev?.index??0 };
      });
    }

    // ── DISCONTENT weekly tick ──────────────────────────────────
    // Cools if you've stopped offending; public exposure (high scrutiny)
    // stings visible residents who aren't yet comfortable being seen.
    let exposedCount=0;
    updated=updated.map(s=>{
      let disc=Math.max(0,(s.discontent||0)-DISCONTENT_WEEKLY_DECAY);
      let mems=s.memories,mood=s.mood;
      const exposed=scrutinyTier?.id>=2&&!s.hidden&&getStage(s.lbs).id>=5&&getCorruptionTier(s.corruption||0).id===0;
      if(exposed&&Math.random()<0.5){
        disc=bumpDiscontent(disc,grievanceGain(s,'exposed'));
        mems=appendMemory(mems,'exposed',newWeek);
        mood="stressed";
        exposedCount++;
      }
      if(disc===(s.discontent||0)&&mems===s.memories&&mood===s.mood) return s;
      return {...s,discontent:disc,memories:mems,mood};
    });
    if(exposedCount>0) setTimeout(()=>push(`😠 ${exposedCount} ${exposedCount===1?"resident bristles":"residents bristle"} at being paraded under this much scrutiny.`),170);

    // A resident pushed past the brink confronts you (one per week).
    const rebel=updated.find(s=>shouldConfront(s,newWeek));
    if(rebel){
      updated=updated.map(s=>s.id===rebel.id?{...s,lastConfrontWeek:newWeek}:s);
      const grievance=dominantGrievance(rebel);
      setConfrontation({
        studentId:rebel.id,name:rebel.name,lbs:rebel.lbs,grievance,winBack:false,withdrawn:false,
        prose:renderConfront(rebel,newWeek,{grievanceType:grievance||undefined}),
      });
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


    const evs=collectEvents(updated);

    // Opposition week-end processing (AIB agenda, proxies, supernatural)
    const wasActTriggered=!!opposition?.supernatural?.actTriggered;
    let nextOpposition=opposition||defaultOppositionState();
    const satTier=nextSaturation?.tier??campusState.saturation?.tier??0;
    const weeksAtRegional=(satTier===3)?(nextSaturation?.weeksAtTier??0):0;
    const cultStage=nextPharmacistState?.cult?.stage??pharmacistState?.cult?.stage??pharmacistState?.stage??0;
    const crSuspicion=communityResearcherState?.totalSuspicion??0;
    const informantRisk=crSuspicion>=18;
    nextOpposition=checkSupernaturalTrigger(nextOpposition,{
      week:newWeek,
      scrutiny:adminScrutiny,
      students:updated,
      campusSaturation:nextSaturation?.score??campusState.saturation?.score??0,
      weeksAtRegionalExcess:weeksAtRegional,
    });
    const wasAibUnlocked=!!opposition?.aib?.unlocked;
    const newlyTriggered=!wasActTriggered&&nextOpposition.supernatural.actTriggered;
    const oppResult=processOppositionWeek(nextOpposition,{
      week:newWeek,
      scrutiny:adminScrutiny,
      students:updated,
      rnd,
      saturationTier:satTier,
      weeksAtRegionalExcess:weeksAtRegional,
      pharmacistCultStage:cultStage,
      facultyInformantRisk:informantRisk,
    });
    nextOpposition=oppResult.opposition;
    updated=applyOppositionStudentPatches(updated,oppResult.studentPatches);
    const superTick=tickSupernaturalWeek(nextOpposition,updated,rnd,newWeek);
    nextOpposition=superTick.opposition;
    updated=applyOppositionStudentPatches(updated,superTick.studentPatches);
    nextOpposition=tickScarcityBanishment(nextOpposition,updated);
    if(oppResult.pendingDeviceConfiscation){
      const equipped=updated.find(st=>st.equip&&Object.values(st.equip).some(Boolean));
      if(equipped){
        const slot=Object.keys(equipped.equip).find(k=>equipped.equip[k]);
        if(slot){
          const defId=equipped.equip[slot].defId;
          const { student:stripped }=unequipDevice(equipped,slot);
          updated=updated.map(st=>st.id===equipped.id?stripped:st);
          setDeviceInventory(prev=>({...prev,[defId]:(prev[defId]||0)+1}));
          oppResult.logs.push(`🔧 Confiscated ${DEVICES[defId]?.label||defId} from ${equipped.name}.`);
        }
      }
      if((labState?.stage??1)>=2){
        setLabState(prev=>prev?{
          ...prev,
          network:{...(prev.network||{}),disabledWeeks:Math.max(prev.network?.disabledWeeks||0,2)},
        }:prev);
        oppResult.logs.push('📡 Compliance audit — lab network nodes disabled 2 weeks.');
      }
    }
    setOpposition(nextOpposition);
    if(!wasAibUnlocked&&nextOpposition.aib.unlocked) setGlobalStats(g=>({...g,aibUnlocked:true}));
    if(newlyTriggered) setGlobalStats(g=>({...g,supernaturalAct:true}));
    let hearingToOpen=null;
    if(nextOpposition.aib.pendingHearing){
      hearingToOpen={
        type:'removal',
        studentId:nextOpposition.aib.pendingHearing.studentId,
        phaseIdx:0,history:[],log:[],done:false,endingText:null,
      };
      nextOpposition={...nextOpposition,aib:{...nextOpposition.aib,pendingHearing:null}};
      setOpposition(nextOpposition);
    }else if(nextOpposition.aib.emergencyHearingDue){
      hearingToOpen={
        type:'emergency',
        studentId:null,
        phaseIdx:0,history:[],log:[],done:false,endingText:null,
      };
      nextOpposition={...nextOpposition,aib:{...nextOpposition.aib,emergencyHearingDue:false}};
      setOpposition(nextOpposition);
    }
    if(hearingToOpen) setHearingState(hearingToOpen);
    if(oppResult.scrutinyDelta) addScrutiny(oppResult.scrutinyDelta);
    if(oppResult.moneyDelta) setMoney(m=>m+oppResult.moneyDelta);
    [...oppResult.logs,...superTick.logs].forEach((msg,i)=>setTimeout(()=>push(msg),200+i*60));
    if(oppResult.forcedWeighInStudentId){
      const wid=oppResult.forcedWeighInStudentId;
      const ws=updated.find(st=>st.id===wid);
      setOpposition(prev=>({...prev,aib:{...prev.aib,pendingForcedWeighInStudentId:null}}));
      if(ws){
        setTimeout(()=>{
          push(`⚖️ AIB size review — mandatory weigh-in for ${ws.name}.`);
          setWeighInState({student:ws,phase:'scene',aibMandatory:true});
        },320);
      }
    }
    if(newlyTriggered&&!nextOpposition.meta?.supernaturalAnnounced){
      const line=supernaturalActLine(newWeek);
      if(line) setTimeout(()=>push(`👻 ${line}`),240);
      nextOpposition={...nextOpposition,meta:{...nextOpposition.meta,supernaturalAnnounced:true}};
      setOpposition(nextOpposition);
    }
    if(newlyTriggered&&!nextOpposition.supernatural.ascensionOffered) setSupernaturalModalOpen(true);

    // ── ROSTER UNLOCK ─ hall reach (slots) + passive trust (queue) ──
    updated = applyWeeklyTrustDrip(updated, { reachLevel, week: newWeek, unlockedDorms: effectiveUnlockedDorms, rng: Math.random });
    const ripe = pickRipeUnlock(updated, reachLevel, effectiveUnlockedDorms);
    if (ripe) {
      updated = updated.map((s) => (s.id === ripe.id ? { ...s, lockState: 'open' } : s));
      const scene = getUnlockScene(ripe.id) || `${ripe.name} finally trusts you enough to knock on your door. She's on your hall now.`;
      setTimeout(() => push(`🌒 ${scene}`), 160);
    }

    const ascensionReadyIds=[];
    updated=updated.map(s=>{
      let ns=tickAscensionCooldowns(s);
      const eligibility=isAscensionEligible(ns,{students:updated});
      if(eligibility.eligible){
        const pending=ns.ascensionPending;
        const formId=eligibility.form.formId;
        if(!pending||pending.formId!==formId){
          ns={...ns,ascensionPending:{formId,stirringWeeks:1,ceremonyReady:false,declinedWeek:null}};
          const line=renderAscensionStirring(ns,newWeek);
          if(line) setTimeout(()=>push(`✦ ${line}`),260);
        }else if(!pending.ceremonyReady){
          const stirringWeeks=(pending.stirringWeeks||0)+1;
          const ceremonyReady=stirringWeeks>=2;
          ns={...ns,ascensionPending:{...pending,stirringWeeks,ceremonyReady}};
          const line=renderAscensionStirring(ns,newWeek);
          if(line) setTimeout(()=>push(`✦ ${line}`),260);
          if(ceremonyReady) ascensionReadyIds.push(ns.id);
        }else if(pending.declinedWeek!==newWeek){
          ascensionReadyIds.push(ns.id);
        }
      }else if(eligibility.reason==='catalyst' && getStage(ns.lbs).id>=11 && ns.ascensionHeldWeek!==newWeek){
        ns={...ns,ascensionHeldWeek:newWeek};
        const held=renderAscensionHeld(ns,newWeek);
        if(held) setTimeout(()=>push(`✦ ${held}`),260);
      }
      return ns;
    });
    if(!ascensionCeremony&&ascensionReadyIds.length){
      const ready=updated.find(s=>s.id===ascensionReadyIds[0]);
      if(ready){
        const trace=[];
        const prose=renderAscensionCeremony(ready,newWeek,{trace});
        setAscensionCeremony({
          studentId:ready.id,
          prose,
          traceNodes:trace.filter(t=>t.text&&t.text.trim()&&!t.key.startsWith('subject.')),
        });
      }
    }

    const milestoneByStudent=Object.fromEntries(milestones.map((m)=>[m.id, m]));
    const dossierPre=updated.map((s)=>({
      id: s.id,
      triggeredEvents: [...(s.triggeredEvents || [])],
      gateway: Object.fromEntries(GATEWAY_FLAG_KEYS.map((k)=>[k, !!s[k]])),
    }));
    updated=updated.map((s)=>{
      const pre=dossierPre.find((p)=>p.id===s.id);
      return appendDossierSnapshot(s, week, {
        prevTriggeredEvents: pre?.triggeredEvents || [],
        prevGateway: pre?.gateway || {},
        milestoneByStudent,
      });
    });

    setStudents(updated.map(s=>clearWeeklyTextFlags(s,week)));
    if(recapMovers.length){
      const ordered=recapMovers
        .sort((a,b)=>(b.stagedUp?1:0)-(a.stagedUp?1:0)||b.lbsGained-a.lbsGained)
        .slice(0,6)
        .map(m=>{
          // Memory callback: her own history, or cross-resident gossip (~40%).
          const live=updated.find(u=>u.id===m.id)||m;
          const selfMem=pickStudentMemory(live,week);
          const hallMem=pickHallMemory(updated,week,m.id);
          let memoryProse='';
          if(hallMem&&(!selfMem||Math.random()<0.4)) memoryProse=renderMemoryHall(live,week,hallMem);
          else if(selfMem) memoryProse=renderMemorySelf(live,week,selfMem);
          return {...m,memoryProse};
        });
      setWeekRecap({
        week: newWeek,
        movers: ordered,
        extras: buildWeekReviewExtras(updated, week, pharmacistTextOpts(pharmacistState, week)),
      });
    }
    if(milestones.length) setMilestoneQueue({events:milestones,index:0});
    // Admin notices visibly large students (hidden students like Lilith don't trigger scrutiny)
    const visibleCount=updated.filter(s=>!s.hidden&&getStage(s.lbs).id>=5).length;
    if(visibleCount>0) addScrutiny(visibleCount);
    // Devoted students passively cover scrutiny
    const devotedCount=updated.filter(s=>getTier(s.relationship).id>=3).length;
    if(devotedCount>0) setAdminScrutiny(prev=>Math.max(0,prev-devotedCount));
    if(skillScrutinyPassiveReduce>0) setAdminScrutiny(prev=>Math.max(0,prev-skillScrutinyPassiveReduce));
    if(loungeSkillFx.scrutinyPassiveReduce>0) setAdminScrutiny(prev=>Math.max(0,prev-loungeSkillFx.scrutinyPassiveReduce));
    if(evolvedScrutinyReduce>0) setAdminScrutiny(prev=>Math.max(0,prev-evolvedScrutinyReduce));
    const scrutinyMsg=weeklyScrutinyNudge(adminScrutiny,scrutinyTier.id,nextOpposition);
    if(scrutinyMsg) setTimeout(()=>push(scrutinyMsg.message),170);
    push(`📅 Week ${newWeek} begins. ${newAp} AP available.${scrutinyTier.apPenalty?` (Scrutiny: −${scrutinyTier.apPenalty} AP)`:""}`);
    if(evs.length){
      setGlobalStats(g=>({...g,narrativeCount:g.narrativeCount+evs.length}));
      setEventQueue(prev=>[...prev,...evs]);
    }
    if(campusState?.asceticProtestWeek){
      setCampusState(prev=>({...prev,asceticProtestWeek:false}));
      setTimeout(()=>push('🕯️ Ascetic Circle protest fades — campus appetite recovers.'),280);
    }
    if(campusState?.mirrorFastWeek){
      setCampusState(prev=>({...prev,mirrorFastWeek:false}));
      setTimeout(()=>push('🪞 Mirror Fast dissolves — appetite returns to the body.'),300);
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
          floorResonance:getHiveFloorResonance(prev)+Math.max(1,Math.floor(rooms/6)),
          log:[{tag:"[MayaHive_WeeklyTrickle]",text:`The conquered rooms feed the Central Nest between hall rounds. +${trickle} Biomass.`,type:"system"},...prev.log].slice(0,40),
        };
      });
    }
    // V2 weekly events handled pre-digest above
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
    trackAction(`evolution:${formId}`);
    const s=students.find(st=>st.id===studentId);
    if(formId==='eating_streamer'){
      setStudents(prev=>prev.map(st=>{
        if(st.id!==studentId) return st;
        return {...ensureStreamFields(st),evolvedForm:formId,evolvedSkills:[],brand:null};
      }));
      if((ownedSkills.memory_palace||0)>=1&&s){
        const stageId=getStage(s.lbs).id;
        applyEchoCapture(s, prev=>captureEvolutionEcho(prev,studentId,week,stageId,formId));
      }
      const meta=EVOLVED_ACTIVITY_META[formId];
      push(`✦ ${s?.name||"She"} has found her path: ${meta?.label||formId}.`);
      setEvolutionModal(null);
      setStreamBrandPickState({studentId,required:true});
      return;
    }
    setStudents(prev=>prev.map(st=>st.id!==studentId?st:{...st,evolvedForm:formId,evolvedSkills:[]}));
    if((ownedSkills.memory_palace||0)>=1&&s){
      const stageId=getStage(s.lbs).id;
      setV2State(prev=>captureEvolutionEcho(prev||createInitialV2State(),studentId,week,stageId,formId));
    }
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
      setLabState(defaultLabState());
      setDeviceInventory(defaultDeviceInventory());
    }
    if(formId==='salon_appetit'){
      setSalonState(defaultSalonState(studentId));
    }
    if(formId==='artisan_gallery'){
      setGalleryState(defaultGalleryState(studentId));
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
    if(s.evolvedForm==='salon_appetit'){
      const meta=EVOLVED_ACTIVITY_META['salon_appetit']; if(!meta) return;
      const stageIdx=getEvolvedActivityStageIdx(s);
      const evDef=EVOLVED_EVENTS[s.evolvedForm]?.[stageIdx];
      if(evDef){
        if(ap<meta.apCost){push(`⚠️ Need ${meta.apCost} AP.`);return;}
        setAp(a=>a-meta.apCost);
        setEvolvedEventState({studentId:s.id,formId:s.evolvedForm,stageIdx,phaseIdx:0,history:[],logLines:[],gainAccum:0,relAccum:0,done:false,endingText:null,gainBonus:0,relBonus:0});
        return;
      }
      openSalonHub(s.id);
      return;
    }
    if(s.evolvedForm==='artisan_gallery'){
      const meta=EVOLVED_ACTIVITY_META['artisan_gallery']; if(!meta) return;
      const stageIdx=getEvolvedActivityStageIdx(s);
      const evDef=EVOLVED_EVENTS[s.evolvedForm]?.[stageIdx];
      if(evDef){
        if(ap<meta.apCost){push(`⚠️ Need ${meta.apCost} AP.`);return;}
        setAp(a=>a-meta.apCost);
        setEvolvedEventState({studentId:s.id,formId:s.evolvedForm,stageIdx,phaseIdx:0,history:[],logLines:[],gainAccum:0,relAccum:0,done:false,endingText:null,gainBonus:0,relBonus:0});
        return;
      }
      if(ap<meta.apCost){push(`⚠️ Need ${meta.apCost} AP.`);return;}
      setAp(a=>a-meta.apCost);
      openGalleryHub(s.id);
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
    const evolvedCtx=createContext({subject:s,week});
    text=appendV2Depth(text,'evolved',evolvedCtx,0.35);
    // Calculate bonuses from evolved skills
    const skills=(s.evolvedSkills||[]);
    const tree=EVOLVED_SKILL_TREES[s.evolvedForm]||[];
    const bonusGain=tree.filter(sk=>skills.includes(sk.id)&&sk.activityGainBonus).reduce((a,b)=>a+(b.activityGainBonus||0),0);
    const bonusRel=tree.filter(sk=>skills.includes(sk.id)&&sk.activityRelBonus).reduce((a,b)=>a+(b.activityRelBonus||0),0);
    const doubleCharge=tree.find(sk=>skills.includes(sk.id)&&sk.doubleActivityCharge);
    const rawGain=rnd(meta.gainRange[0],meta.gainRange[1])+bonusGain+getSupernaturalActivityBonus(s).gainBonus;
    const gain=doubleCharge?rawGain*2:rawGain;
    const relGain=meta.relBonus+bonusRel;
    setAp(a=>a-meta.apCost);
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,lbs:st.lbs+gain,relationship:Math.min(100,st.relationship+relGain)}));
    if(s.supernaturalForm){
      const pressureFx=applySupernaturalActivityPressure(opposition,s);
      setOpposition(pressureFx.opposition);
      if(pressureFx.scrutinyDelta) addScrutiny(pressureFx.scrutinyDelta);
    }
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
    // Handle feedOther — feed residents of matching archetype
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
        const next = processStudentGain(st,totalGain,totalRel+bonusRel);
        return maybeGrantAscensionCatalyst(next, {
          completedStageIdx: stageIdx,
          totalStages: EVOLVED_EVENTS[formId]?.length || 0,
        });
      }));
      if(!ending.startsContest&&!ending.startsMatch&&!ending.startsStream&&!ending.startsFairDay&&!ending.startsSession&&!ending.startsPresentation&&!ending.startsDelivery&&!ending.startsChallenge&&!ending.startsSalon&&!ending.startsGallery) push(`✦ ${s.name} — ${evDef.title}: +${totalGain} lbs · +${totalRel} rel`);
      // handle recipe unlock (homestead_queen)
      if(ending.unlockRecipe){
        setStudents(ss=>ss.map(st=>st.id===s.id?{...st,mjRecipes:[...(st.mjRecipes||[]),ending.unlockRecipe].filter((v,i,a)=>a.indexOf(v)===i)}:st));
      }
      const endText=typeof ending.text==='function'?ending.text(newHistory,s,totalGain):ending.text;
      setEvolvedEventState(prev=>({...prev,phaseIdx:nextPhase,history:newHistory,logLines:newLog,gainAccum:newGain,relAccum:newRel,done:true,endingText:endText,gainBonus:ending.gainBonus||0,relBonus:ending.relBonus||0,classGain:ending.classGain||0,momGain:ending.momGain||0,startsContest:!!ending.startsContest,startsMatch:!!ending.startsMatch,startsStream:!!ending.startsStream,startsFairDay:!!ending.startsFairDay,startsSession:!!ending.startsSession,startsPresentation:!!ending.startsPresentation,startsDelivery:!!ending.startsDelivery,startsChallenge:!!ending.startsChallenge,startsSalon:!!ending.startsSalon,startsGallery:!!ending.startsGallery}));
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

  // ── SALON DE L'APPÉTIT (Chloé) ───────────────────────────────────
  const openSalonHub=(studentId)=>{
    setSalonState(prev=>{
      if(prev?.chloeStudentId===studentId) return prev;
      return defaultSalonState(studentId);
    });
    setSalonOpen(true);
  };

  const closeSalonHub=()=>setSalonOpen(false);

  const startSalonEvening=(guestIds)=>{
    if(ap<2){push('⚠️ Need 2 AP to host a salon.');return;}
    if(!guestIds?.length){push('⚠️ Pick at least one guest.');return;}
    setAp(a=>a-2);
    setSalonState(prev=>startSalonSession(prev,guestIds));
    push('🥂 Chloé lights the candles. The soirée begins.');
  };

  const salonPickCourse=(courseId)=>{
    setSalonState(prev=>salonPickMenu(prev,courseId));
  };

  const salonMakeServiceChoice=(choiceId)=>{
    setSalonState(prev=>salonServiceChoice(prev,choiceId));
  };

  const salonCloseEvening=()=>{
    setSalonState(prev=>{
      const result=salonFinishDigestif(prev);
      if(!result?.done) return prev;
      const chloeId=prev.chloeStudentId;
      if(chloeId!=null){
        setStudents(st=>st.map(s=>s.id!==chloeId?s:processStudentGain(s,result.chloeLbs,8)));
      }
      if(result.scrutiny) addScrutiny(result.scrutiny);
      push(`🥂 ${result.log}`);
      return result.state;
    });
  };

  // ── ARTISAN GALLERY (Fiona) ──────────────────────────────────────
  const openGalleryHub=(studentId)=>{
    setGalleryState(prev=>{
      if(prev?.fionaStudentId===studentId) return prev;
      return defaultGalleryState(studentId);
    });
    setGalleryOpen(true);
  };

  const closeGalleryHub=()=>{
    setGalleryState(prev=>prev?{...prev,subjectPickerOpen:false}:prev);
    setGalleryOpen(false);
  };

  const galleryOpenSubjectPicker=()=>{
    setGalleryState(prev=>prev?{...prev,subjectPickerOpen:true}:prev);
  };

  const galleryConfirmEnroll=(studentId,studentName)=>{
    setGalleryState(prev=>{
      const { state:next, ok, reason }=enrollSubject(prev,studentId,studentName);
      if(!ok){push(`⚠️ ${reason}`);return prev;}
      push(`🖼 ${studentName} enrolled as gallery resident.`);
      return {...next,subjectPickerOpen:false};
    });
  };

  const galleryBeginStudio=(subjectId)=>{
    if(ap<2){push('⚠️ Need 2 AP for a studio session.');return;}
    setAp(a=>a-2);
    setGalleryState(prev=>startStudioSession(prev,subjectId,{motif:'portrait'}));
  };

  const galleryStudioAction=(actionId)=>{
    setGalleryState(prev=>{
      const next=studioAction(prev,actionId);
      if(next.pendingGains){
        const {subjectId,subjectLbs,fionaLbs,scrutiny}=next.pendingGains;
        const fionaId=next.fionaStudentId;
        setStudents(st=>st.map(s=>{
          if(s.id===subjectId) return processStudentGain(s,subjectLbs,5);
          if(s.id===fionaId&&fionaLbs) return processStudentGain(s,fionaLbs,0);
          return s;
        }));
        if(scrutiny) addScrutiny(scrutiny);
        (next.sessionLog||[]).forEach(line=>push(`🖼 ${line}`));
        const {pendingGains,sessionLog,...clean}=next;
        return clean;
      }
      return next;
    });
  };

  const galleryDoFieldShoot=(locationId)=>{
    if(ap<1){push('⚠️ Need 1 AP.');return;}
    setAp(a=>a-1);
    setGalleryState(prev=>{
      const {state:next,scrutiny,log}=runFieldShoot(prev,locationId);
      if(scrutiny) addScrutiny(scrutiny);
      push(`🖼 ${log}`);
      return next;
    });
  };

  const galleryDoExhibition=(theme)=>{
    if(ap<2){push('⚠️ Need 2 AP.');return;}
    const result=mountExhibition(galleryState,theme);
    if(!result.ok){push(`⚠️ ${result.reason}`);return;}
    setAp(a=>a-2);
    setGalleryState(result.state);
    if(result.scrutiny) addScrutiny(result.scrutiny);
    if(result.money) setMoney(m=>m+result.money);
    const fionaId=galleryState?.fionaStudentId;
    if(fionaId!=null&&result.fionaLbs){
      setStudents(prev=>prev.map(st=>st.id!==fionaId?st:processStudentGain(st,result.fionaLbs,6)));
    }
    push(`🖼 ${result.log}`);
  };

  // ── OPPOSITION / AIB ─────────────────────────────────────────────
  const runOppositionCounter=(counterId,options={})=>{
    counterId=normalizeCounterId(counterId);
    trackAction(`counter:${counterId}`);
    const oppCtx=buildOppositionContext({
      students, ownedSkills, ownedHallSkills, facultyAffinity,
      labState, pharmacistState, communityResearcherState, lilithUnlocked,
    });
    const available=getAvailableCounters(opposition,students,{...oppCtx,lilithUnlocked,pharmacistStage:pharmacistState?.stage??1});
    if(!available.find(c=>c.id===counterId)){
      const hint=counterGateReason?.({id:counterId},oppCtx);
      push(`⚠️ Counter unavailable${hint?`: ${hint}`:''}.`);
      return;
    }
    const memberId=options.memberId ?? null;
    const evolvedOpMessage=counterId==='evolved_student_op'?getEvolvedOpMessage(students):undefined;
    const archivistFree=counterId==='public_discredit'&&canArchivistFreeDiscredit(students,opposition);
    let echoedWillSpent=false;
    const spendEchoedWill=()=>{
      if((ownedSkills.echoed_will||0)<1) return false;
      if(opposition?.meta?.echoedWillSpentWeek===week) return false;
      echoedWillSpent=true;
      return true;
    };
    const result=runAibCounter(opposition,counterId,memberId,{
      ...options,
      evolvedOpMessage,
      archivistDiscreditFree:archivistFree,
      spendEchoedWill:counterId==='floor_pressure'?spendEchoedWill:undefined,
    });
    if(result.apCost&&ap<result.apCost){push(`⚠️ Need ${result.apCost} AP.`);return;}
    if(result.apCost) setAp(a=>a-result.apCost);
    let nextOpposition=result.opposition;
    if(echoedWillSpent){
      nextOpposition={
        ...nextOpposition,
        meta:{...nextOpposition.meta,echoedWillSpentWeek:week},
      };
    }
    if(counterId==='public_discredit'||counterId==='machine_fatten'){
      nextOpposition=ledgerWightRepelled(nextOpposition);
    }
    setOpposition(nextOpposition);
    if(result.scrutinyDelta) addScrutiny(result.scrutinyDelta);
    if(result.moneyDelta) setMoney(m=>m+(result.moneyDelta||0));
    if(result.message) push(result.message);
    else if(counterId!=='public_discredit') push('⚠️ Counter had no effect — check agenda queue or member resolve.');
    if(result.boardCompromised) setGlobalStats(g=>({...g,boardCompromised:(g.boardCompromised||0)+1}));
    if(counterId==='feast_bribe'&&adminScrutiny>=90){
      setGlobalStats(g=>({...g,boardFeastInvestigation:true}));
      push('🍷 Board Feast Investigation — Vance notes the catering invoices. Achievement progress logged.');
    }
    if(result.openLilithAibHunt&&result.aibMemberId) openLilithAibHunt(result.aibMemberId);
  };

  const startOppositionHearing=(type,studentId=null)=>{
    if(hearingState) return;
    const sid=type==='removal'
      ? (studentId??opposition?.aib?.pendingHearing?.studentId)
      : null;
    setHearingState({
      type,studentId:sid,phaseIdx:0,history:[],log:[],done:false,endingText:null,
    });
    if(type==='removal'&&opposition?.aib?.pendingHearing){
      setOpposition(prev=>({...prev,aib:{...prev.aib,pendingHearing:null}}));
    }
    if(type==='emergency'&&opposition?.aib?.emergencyHearingDue){
      setOpposition(prev=>({...prev,aib:{...prev.aib,emergencyHearingDue:false}}));
    }
  };

  const makeHearingChoice=(choiceId)=>{
    trackAction(`hearing:${choiceId}`);
    setHearingState(prev=>{
      if(!prev||prev.done) return prev;
      const def=prev.type==='emergency'?EMERGENCY_HEARING:REMOVAL_HEARING;
      const hearingType=prev.type==='emergency'?'emergency':'removal';
      const phase=def.phases[prev.phaseIdx];
      const ch=phase?.choices?.find(c=>c.id===choiceId);
      if(!ch) return prev;
      const student=students.find(s=>s.id===prev.studentId);
      const resultLine=ch.resultPool
        ?renderHearingChoiceResult(hearingType,choiceId,student,week,prev.phaseIdx)
        :(ch.result||'');
      const log=[...(prev.log||[]),resultLine];
      const history=[...(prev.history||[]),ch.flag||choiceId];
      const nextPhase=prev.phaseIdx+1;
      if(nextPhase>=def.phases.length){
        const ending=pickHearingEnding(def,history);
        const endingText=ending.poolKey
          ?renderHearingEnding(hearingType,ending.poolKey,student,week)
          :'';
        return {...prev,log,history,done:true,endingText,pendingEnding:ending};
      }
      return {...prev,log,history,phaseIdx:nextPhase};
    });
  };

  const closeHearing=()=>{
    const ending=hearingState?.pendingEnding;
    const type=hearingState?.type;
    const studentId=hearingState?.studentId;
    if(ending){
      if(ending.scrutinyDelta) addScrutiny(ending.scrutinyDelta);
      if(ending.moneyDelta) setMoney(m=>m+(ending.moneyDelta||0));
      if(ending.scandalDelta!=null){
        setOpposition(prev=>({
          ...prev,
          aib:{...prev.aib,scandalMeter:Math.max(0,Math.min(100,(prev.aib.scandalMeter||0)+(ending.scandalDelta||0)))},
        }));
      }
      if(ending.truceWeeks){
        setOpposition(prev=>({...prev,aib:{...prev.aib,truceWeeks:Math.max(prev.aib.truceWeeks||0,ending.truceWeeks)}}));
      }
      if(ending.resolveHitAll){
        setOpposition(prev=>({
          ...prev,
          aib:{...prev.aib,members:prev.aib.members.map(m=>({...m,resolve:Math.max(0,m.resolve-(ending.resolveHitAll||0))}))},
        }));
      }
      if(ending.memberResolveHit){
        setOpposition(prev=>{
          const target=[...prev.aib.members].sort((a,b)=>a.resolve-b.resolve)[0];
          if(!target) return prev;
          return {
            ...prev,
            aib:{
              ...prev.aib,
              members:prev.aib.members.map(m=>m.id!==target.id?m:{...m,resolve:Math.max(0,m.resolve-ending.memberResolveHit),stance:'wavering'}),
            },
          };
        });
      }
      if(ending.studentHiddenWeeks>0&&studentId!=null){
        setStudents(prev=>prev.map(s=>{
          if(s.id!==studentId) return s;
          return {...s,wasHiddenBeforeSuspension:s.hidden,aibSuspensionWeeks:ending.studentHiddenWeeks,hidden:true};
        }));
        push(`⚠️ ${students.find(s=>s.id===studentId)?.name||'Resident'} suspended from campus for ${ending.studentHiddenWeeks} weeks.`);
      }else if((type==='removal'&&ending.studentHiddenWeeks===0)||(type==='emergency'&&(ending.scandalDelta||0)<-10)){
        setGlobalStats(g=>({...g,oppositionHearingsWon:(g.oppositionHearingsWon||0)+1}));
      }
    }
    setHearingState(null);
  };

  const runOppositionCounterOnMember=(counterId,memberId)=>{
    runOppositionCounter(counterId,{ memberId });
  };

  const ascendSupernatural=(studentId,formId)=>{
    const s=students.find(st=>st.id===studentId);
    const form=getSupernaturalFormForStudent(s);
    if(!s||!form||formId!==form.id) return;
    setStudents(prev=>prev.map(st=>st.id!==studentId?st:applyAscensionThinForm(st,form)));
    setOpposition(prev=>({
      ...prev,
      supernatural:{
        ...prev.supernatural,
        scarcityPressure:Math.max(0,(prev.supernatural?.scarcityPressure||0)-(form.scrutinyDrain||2)),
      },
    }));
    push(`👻 ${s.name} ascends as ${form.label} — thin, hungry, remembering every pound.`);
  };

  const dismissSupernaturalAct=()=>{
    setOpposition(prev=>({...prev,supernatural:{...prev.supernatural,ascensionOffered:true}}));
    setSupernaturalModalOpen(false);
    push('👻 The Supernatural Act has begun. Scarcity watches — refeed your evolved residents.');
  };

  const openAscensionCeremony=(studentId)=>{
    const s=students.find(st=>st.id===studentId);
    if(!s) return;
    const trace=[];
    const prose=renderAscensionCeremony(s,week,{trace});
    setAscensionCeremony({
      studentId,
      prose,
      traceNodes:trace.filter(t=>t.text&&t.text.trim()&&!t.key.startsWith('subject.')),
    });
  };

  const confirmAscensionRebirth=(studentId)=>{
    const live=students.find(st=>st.id===studentId);
    const eligibility=isAscensionEligible(live,{students});
    if(!live||!eligibility.eligible){
      push(`⚠️ ${live?.name||'Resident'} is not ready to ascend.`);
      setAscensionCeremony(null);
      return;
    }
    const form=eligibility.form;
    setStudents(prev=>prev.map(st=>{
      if(st.id!==studentId) return st;
      const next=applyAscensionRebirth(st,{week,formId:form.formId});
      return {
        ...next,
        ascensionPending:null,
        memories:appendMemory(next.memories,'ascended',week,form.formId),
        triggeredEvents:[...(next.triggeredEvents||[]),`ascended_${form.formId}`].filter((v,i,a)=>a.indexOf(v)===i),
      };
    }));
    push(`✦ ${live.name} ascends — ${form.label}. Cycle 2 begins at 100 lbs.`);
    setAscensionCeremony(null);
  };

  const declineAscensionCeremony=(studentId)=>{
    const live=students.find(st=>st.id===studentId);
    if(!live){ setAscensionCeremony(null); return; }
    const decline=renderAscensionDecline(live,week);
    setStudents(prev=>prev.map(st=>{
      if(st.id!==studentId) return st;
      return {
        ...st,
        ascensionPending:{
          ...(st.ascensionPending||{}),
          formId:st.ascensionPending?.formId||getAscensionFormForStudent(st)?.formId,
          ceremonyReady:true,
          declinedWeek:week,
        },
        memories:appendMemory(st.memories,'ascensionDeclined',week),
      };
    }));
    push(`✦ ${decline}`);
    setAscensionCeremony(null);
  };

  const fireAscensionAbility=(studentId,abilityId)=>{
    const ability=getAscensionAbility(abilityId);
    const live=students.find(st=>st.id===studentId);
    if(!ability||!live?.ascension) return;
    if(abilityIsOnCooldown(live,abilityId)){
      push(`⚠️ ${ability.name} is still gathering.`);
      return;
    }
    if((live.ascension.essence||0)<ability.essenceCost){
      const form=getAscensionFormForStudent(live);
      push(`⚠️ Need ${ability.essenceCost} ${form?.essenceWord||'essence'} for ${ability.name}.`);
      return;
    }
    const abilityParams=ability.params||{};
    if(ability.hook==='economyMod'&&abilityParams.moneyDelta) setMoney(m=>m+abilityParams.moneyDelta);
    if(ability.hook==='campusMod'&&abilityParams.scrutinyDelta) addScrutiny(abilityParams.scrutinyDelta);
    setStudents(prev=>prev.map(st=>{
      if(st.id!==studentId) return st;
      const spent=spendEssence(st,ability.essenceCost,{publicSpend:ability.public});
      if(!spent.ok) return st;
      let ns=spent.student;
      const p=abilityParams;
      if(ability.hook==='feedEvent'){
        ns=processStudentGain(ns,p.lbsGain||0,p.rel||0);
        if(p.hungerDelta) ns=adjustHunger(ns,p.hungerDelta);
      }else if(ability.hook==='appetiteMod'){
        if(p.hungerDelta) ns=adjustHunger(ns,p.hungerDelta);
        if(p.weeklyDigestMult) ns={...ns,weeklyDigestMult:Math.max(ns.weeklyDigestMult||1,p.weeklyDigestMult)};
      }else if(ability.hook==='interruptSpawn'){
        ns={
          ...ns,
          relationship:Math.min(100,(ns.relationship||0)+(p.rel||0)),
          ascension:{
            ...ns.ascension,
            formFlags:{...(ns.ascension.formFlags||{}),[p.flag||ability.id]:p.value??true},
          },
        };
      }else if(ability.hook==='psychNudge'){
        ns={...ns,psych:applyPsychDelta(ns.psych||{},p)};
      }else if(ability.hook==='economyMod'||ability.hook==='wardrobeEvent'||ability.hook==='campusMod'){
        ns={
          ...ns,
          ascension:{
            ...ns.ascension,
            formFlags:{
              ...(ns.ascension.formFlags||{}),
              [p.flag||ability.id]:true,
              ...(p.delayFailureWeeks?{delayedWardrobeFailureWeeks:p.delayFailureWeeks}:{}),
              ...(p.repairRelic?{relicRepairReady:true}:{}),
            },
          },
        };
      }
      return {
        ...ns,
        ascension:{
          ...ns.ascension,
          abilities:{
            ...(ns.ascension.abilities||{}),
            unlocked:[...new Set([...(ns.ascension.abilities?.unlocked||[]),ability.id])],
            cooldowns:{...(ns.ascension.abilities?.cooldowns||{}),[ability.id]:ability.cooldownWeeks},
          },
        },
      };
    }));
    const abilityLine=renderAscensionAbility(live,week);
    push(`✦ ${live.name} — ${ability.name}: ${abilityLine||ability.desc}`);
  };

  // ── HALL KITCHEN QUEEN handlers ───────────────────────────────────
  const openHomeroomConference=(studentKey)=>{
    if(!homeroomSessionState||homeroomSessionState.ap<1||homeroomSessionState.activeActivity) return;
    const daisy=students.find(st=>st.id===homeroomSessionState.daisyStudentId);
    const evDef=HOMEROOM_CONFERENCE_EVENTS[studentKey];
    const phaseProse=daisy?renderHomeroomPool(homeroomConferencePoolKey(studentKey),daisy,week,{globals:{homeroomKey:studentKey}}):null;
    setHomeroomSessionState(prev=>({...prev,ap:prev.ap-1,activeActivity:{type:'conference',key:studentKey,phaseIdx:0,history:[],done:false,resultText:null,phaseProse,revealsWeights:false,revealsParentWeights:false}}));
  };
  const startHomeroomGroupActivity=(actKey)=>{
    if(!homeroomSessionState||homeroomSessionState.activeActivity) return;
    const actDef=HOMEROOM_GROUP_ACTIVITIES[actKey]; if(!actDef) return;
    if(homeroomSessionState.ap<actDef.apCost) return;
    const daisy=students.find(st=>st.id===homeroomSessionState.daisyStudentId);
    const phases=actDef.phases||[{text:actDef.text,choices:actDef.choices||[]}];
    const phaseProse=daisy?renderHomeroomPool(homeroomActivityPoolKey(actKey,0),daisy,week,{globals:{homeroomAct:actKey}}):null;
    setHomeroomSessionState(prev=>({...prev,ap:prev.ap-actDef.apCost,activeActivity:{type:actKey,key:actKey,phaseIdx:0,history:[],done:false,resultText:null,phaseProse,revealsWeights:false,revealsParentWeights:false}}));
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
    const daisy=students.find(st=>st.id===homeroomSessionState.daisyStudentId);
    const poolKey=type==='conference'
      ?homeroomConferencePoolKey(key,choiceId)
      :homeroomActivityPoolKey(type,phaseIdx,choiceId);
    const renderedResult=daisy&&poolKey?renderHomeroomPool(poolKey,daisy,week,{globals:{homeroomKey:key,homeroomChoice:choiceId}}):resultText;
    setHomeroomSessionState(prev=>({
      ...prev,
      daisyGain:prev.daisyGain+(choice.lbs||0),
      relAccum:prev.relAccum+(choice.rel||0),
      classGainAccum:prev.classGainAccum+(choice.classGain||0),
      momGainAccum:prev.momGainAccum+(choice.momGain||0),
      suspDeltaAccum:prev.suspDeltaAccum+(choice.suspDelta||0),
      activeActivity:{...prev.activeActivity,phaseIdx:hasNextPhase?phaseIdx+1:phaseIdx,history:[...prev.activeActivity.history,choiceId],resultText:renderedResult,done:!hasNextPhase,revealsWeights:prevRevW||!!choice.revealsWeights,revealsParentWeights:prevRevPW||!!choice.revealsParentWeights},
    }));
  };
  const advanceHomeroomActivityPhase=()=>{
    if(!homeroomSessionState?.activeActivity) return;
    const{type,phaseIdx}=homeroomSessionState.activeActivity;
    const daisy=students.find(st=>st.id===homeroomSessionState.daisyStudentId);
    let phaseProse=null;
    if(type!=='conference'){
      const actDef=HOMEROOM_GROUP_ACTIVITIES[type];
      const phases=actDef?.phases||[];
      const phase=phases[phaseIdx];
      if(daisy) phaseProse=renderHomeroomPool(homeroomActivityPoolKey(type,phaseIdx),daisy,week,{globals:{homeroomAct:type}});
    }
    setHomeroomSessionState(prev=>({...prev,activeActivity:{...prev.activeActivity,resultText:null,phaseProse}}));
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
      if(daisyGain>0) push(`✦ Daisy — Hall Kitchen Session: +${daisyGain} lbs · +${relAccum} rel`);
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

  const getCGDriveTier=(drive)=>{
    const tiers=CG_CONFIG.driveTiers;
    return tiers.find(t=>drive>=t.min&&drive<=t.max)||tiers[0];
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
    drive:0,
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
        const item={studentId:target.id,residentName:target.name,bodypart:bodypartLabel(cat),category:cat,priyaValue:pVal,targetValue:tVal};
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
      return _wlCheckStageAdvance({
        ...base,
        mjStudentId: s.id,
        session: { lessonChosen: false, lessonId: null, mjGainAccum: 0, relAccum: 0, conversationState: null, log: [] },
      });
    });
  };

  const chooseWifeLessonsLesson=(lessonId)=>{
    setWifeLessonsState(prev=>{
      if(!prev?.session||prev.session.lessonChosen) return prev;
      const{stage}=prev;
      const lesson=WL_LESSONS[stage]?.find(l=>l.id===lessonId);
      if(!lesson) return prev;
      const mjStudent=students.find(st=>st.id===prev.mjStudentId);
      const lessonProse=mjStudent?renderWifeLessonBeat(stage,lesson,mjStudent,week):lesson.text;
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
        session:{...prev.session,lessonChosen:true,lessonId:lesson.id,lessonProse,mjGainAccum:prev.session.mjGainAccum+lesson.mjLbs,relAccum:prev.session.relAccum+(lesson.rel||0),log:[...prev.session.log,logLine]}};
      next=_wlCheckStageAdvance(next);
      return next;
    });
  };

  const _wlTalkLine=(line,person,stage,mjStudentId)=>{
    const mj=students.find(st=>st.id===mjStudentId);
    return mj?renderWifeLessonTalkLine(line,person,stage,mj,week):line;
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
      let entry=dialogues[stageIdx];
      if(!entry) return prev;
      const depth=getWlMomDialogueDepth(personKey,stageIdx);
      if(depth) entry=mergeWlDialogueEntry(entry,depth);
      const isCapped=isDaughter&&prev.daughters[personKey]>=WL_CONFIG.stageCaps[stage];
      const overtook=personKey==='Emma'||personKey==='Darlene'?prev.daughters.Chloe>prev.daughters.Emma:false;
      const greetingText=isCapped&&entry.cappedGreeting?entry.cappedGreeting:(overtook&&entry.overtookGreeting?entry.overtookGreeting:entry.greeting);
      const greetingProse=_wlTalkLine(greetingText,personKey,stage,prev.mjStudentId);
      return{...prev,session:{...prev.session,conversationState:{person:personKey,stageEntry:entry,optionIdx:null,subIdx:null,done:false,atGreeting:true,history:[greetingProse]}}};
    });
  };

  const makeWifeLessonsConversationChoice=(optionIdx)=>{
    setWifeLessonsState(prev=>{
      if(!prev?.session?.conversationState) return prev;
      const cs=prev.session.conversationState;
      if(cs.atGreeting){
        return{...prev,session:{...prev.session,conversationState:{...cs,atGreeting:false,optionIdx:null,history:cs.history||[]}}};
      }
      const entry=cs.stageEntry;
      const opt=entry.options[optionIdx];
      if(!opt) return prev;
      if(opt.subs&&opt.subs.length>0){
        const optProse=_wlTalkLine(opt.text,cs.person,prev.stage,prev.mjStudentId);
        return{...prev,session:{...prev.session,conversationState:{...cs,optionIdx,subIdx:null,history:[...(cs.history||[]),optProse]}}};
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
      const subProse=_wlTalkLine(sub.text,cs.person,prev.stage,prev.mjStudentId);
      let next={...prev,daughters:newDaughters,moms:newMoms,
        session:{...prev.session,mjGainAccum:prev.session.mjGainAccum+mjGain,relAccum:prev.session.relAccum+relGain,
          log:[...prev.session.log,logLine],
          conversationState:{...cs,subIdx,done:true,history:[...(cs.history||[]),subProse]}}};
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
    const tier=getCGDriveTier(cgDrive(cgState));
    const stageKey=getCGStageKey(priya.lbs);
    const msgs=[];
    const priyaM=getMeasurements(priya.lbs,priya.bodyType);
    // Priya's opening post
    const postTemplate=CG_CHAT_TEMPLATES.priyaPost[stageKey]?.[tier.label]||CG_CHAT_TEMPLATES.priyaPost.Heavy?.Invested;
    msgs.push({text:`[Priya] ${postTemplate} (${Math.round(priya.lbs)} lbs | waist ${priyaM.waist}" | bust ${priyaM.bust}" | hips ${priyaM.hip}")`,isRa:false,wk:currentWeek});
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
      const templates=CG_CHAT_TEMPLATES.residents[s.name]||CG_CHAT_TEMPLATES.residents.Brittany;
      const measured=cgState.measuredStudentIds.includes(s.id);
      const sM=getMeasurements(s.lbs,s.bodyType);
      let replyType;
      if(!measured) replyType='unmeasured';
      else if(CG_CONFIG.categories.some(cat=>sM[cat]>priyaM[cat]*(1+CG_CONFIG.threatFraction))||s.lbs>priya.lbs*1.05) { replyType='ahead'; threatDetected=true; }
      else if(CG_CONFIG.categories.some(cat=>sM[cat]>=priyaM[cat]*(1-CG_CONFIG.threatFraction))||s.lbs>priya.lbs*0.95) { replyType='close'; threatDetected=true; }
      else if(s.lbs>priya.lbs*0.80)  replyType='proud';
      else replyType='behind';
      const replyText=templates[replyType]||templates.behind||'...';
      msgs.push({text:`[${s.name}] ${replyText}`,isRa:false,wk:currentWeek});
    });
    // Priya follow-up
    const followupKey=threatDetected?'threatened':'leading';
    const followup=CG_CHAT_TEMPLATES.priyaFollowup[followupKey]?.[tier.label]||"The board is updated.";
    msgs.push({text:`[Priya] ${followup}`,isRa:false,wk:currentWeek});
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
      const tier=getCGDriveTier(cgDrive(prev));
      const scenes=CG_CORKBOARD_SCENES[tier.label]||CG_CORKBOARD_SCENES.Invested;
      const idx=(prev.corkboardVisitCount||0)%scenes.length;
      const sceneText=scenes[idx];
      // Drive gain: check if any visible student is within threat range
      const priya=students.find(st=>st.id===prev.priyaStudentId);
      let driveGain=rnd(CG_CONFIG.driveGainNeutral[0],CG_CONFIG.driveGainNeutral[1]);
      if(priya){
        const priyaM=getMeasurements(priya.lbs,priya.bodyType);
        const visible=students.filter(s=>s.id!==priya.id&&(!s.hidden||lilithUnlocked));
        visible.forEach(s=>{
          const sM=getMeasurements(s.lbs,s.bodyType);
          CG_CONFIG.categories.forEach(cat=>{
            if(sM[cat]>=priyaM[cat]*(1-CG_CONFIG.threatFraction)){
              driveGain+=rnd(CG_CONFIG.driveGainThreat[0],CG_CONFIG.driveGainThreat[1]);
            }
          });
        });
      }
      const nextDrive=cgDrive(prev)+driveGain;
      const priyaNow=students.find(st=>st.id===prev.priyaStudentId);
      const chatMsgs=priyaNow?generateCGChatMessages(priyaNow,students,{...prev,drive:nextDrive},week):[];
      return{...prev,drive:nextDrive,corkboardVisitCount:(prev.corkboardVisitCount||0)+1,chatLog:[...prev.chatLog,...chatMsgs],lastChatWeek:week,view:'corkboard',subState:{sceneText,driveGain}};
    });
  };

  const doCGSelfReview=()=>{
    setCompetitiveGainerState(prev=>{
      if(!prev) return prev;
      const priya=students.find(s=>s.id===prev.priyaStudentId);
      if(!priya) return prev;
      const tier=getCGDriveTier(cgDrive(prev));
      const stageKey=getCGStageKey(priya.lbs);
      const entry=CG_MEASUREMENT_SCENES.selfReview[stageKey]?.[tier.label]||CG_MEASUREMENT_SCENES.selfReview.Heavy.Invested;
      const priyaM=getMeasurements(priya.lbs,priya.bodyType);
      const focus=entry.focus||"waist";
      const sceneText=formatCGText(entry.text||entry,{measurement:priyaM[focus]??Math.round(priya.lbs), measurementCategory:bodypartLabel(focus), priyaWeight:Math.round(priya.lbs)});
      const driveGain=rnd(2,5);
      return{...prev,drive:cgDrive(prev)+driveGain,view:'self_review',subState:{sceneText,driveGain}};
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
      const tier=getCGDriveTier(cgDrive(prev));
      CG_CONFIG.categories.forEach(cat=>{
        let rel='priya_larger';
        if(targetM[cat]>priyaM[cat]*(1+CG_CONFIG.threatFraction)){rel='priya_smaller';threats.push(cat);}
        else if(targetM[cat]>=priyaM[cat]*(1-CG_CONFIG.threatFraction)){rel='priya_equal';threats.push(cat);}
        const template=CG_MEASUREMENT_SCENES.reactions?.[rel]?.[tier.label]?.[cat]||`[MeasureReaction_${rel}_${cat}_${tier.label}]`;
        reactions[cat]={rel,text:formatCGText(template,{targetName:target.name, residentName:target.name, bodypart:bodypartLabel(cat)})};
      });
      const driveGain=threats.length>0
        ? threats.length*rnd(CG_CONFIG.driveGainThreat[0],CG_CONFIG.driveGainThreat[1])
        : rnd(CG_CONFIG.driveGainNeutral[0],CG_CONFIG.driveGainNeutral[1]);
      const sceneText=`[MeasurementScene_${target.name}_S${getStage(target.lbs).id}]`;
      const newMeasured=prev.measuredStudentIds.includes(targetStudentId)
        ? prev.measuredStudentIds
        : [...prev.measuredStudentIds,targetStudentId];
      const measuredComparisons={...(prev.measuredComparisons||{}),[targetStudentId]:{week,priyaM,targetM,reactions,threats}};
      return{...prev,drive:cgDrive(prev)+driveGain,measuredStudentIds:newMeasured,measuredComparisons,
        view:'measurement_result',
        subState:{targetStudentId,priyaM,targetM,sceneText,reactions,threats,driveGain}};
    });
  };

  const doCGBinge=()=>{
    // 1 AP cost already deducted from the modal's "Push Priya's Gains" button
    setCompetitiveGainerState(prev=>{
      if(!prev) return prev;
      const priya=students.find(s=>s.id===prev.priyaStudentId);
      if(!priya) return prev;
      const tier=getCGDriveTier(cgDrive(prev));
      const tierIdx=CG_CONFIG.driveTiers.indexOf(tier);
      const stageId=Math.min(7,getStage(priya.lbs).id);
      const baseGain=CG_CONFIG.minBinge+(CG_CONFIG.maxBinge-CG_CONFIG.minBinge)*Math.min(1,(stageId-1)/6);
      const mult=CG_CONFIG.bingeDriveMults[Math.max(0,tierIdx)];
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

  const cgRaReply=(optId)=>{
    const opt=CG_CHAT_TEMPLATES.raReplies?.find(r=>r.id===optId);
    if(!opt) return;
    setCompetitiveGainerState(prev=>{
      if(!prev) return prev;
      const priya=students.find(s=>s.id===prev.priyaStudentId);
      const stageKey=priya?getCGStageKey(priya.lbs):"Heavy";
      const comparison=pickCGComparison(prev,optId);
      const template=comparison?(opt.byStage?.[stageKey]||opt.fallback):opt.fallback;
      const text=formatCGText(template,{
        residentName:comparison?.residentName||comparison?.girlName||"the hall",
        bodypart:comparison?.bodypart||"measurements",
        priyaValue:comparison?.priyaValue,
        targetValue:comparison?.targetValue,
      });
      const msg={text:`[You] ${text}`,isRa:true,wk:week};
      const delta=cgDriveDelta(opt);
      return{...prev,drive:cgDrive(prev)+delta,chatLog:[...prev.chatLog,msg]};
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
          const hiveBonus=getCampusHiveRecruitLbsBonus(pharmacistState, campusState.saturation?.tier ?? 0);
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
      const tag=makeHiveTag("CentralNestVisit",{mayaStage,vpId:prev.vpId||"none",bmiTier,rooms,task:"ra",roomId:prev.selectedRoomId});
      const gain=Math.round(8+getStage(maya.lbs).id*1.5+prev.hiveBiomass/35);
      const biomass=Math.round(gain*0.8);
      setStudents(sp=>sp.map(s=>s.id===prev.mayaStudentId?processStudentGain(s,gain,6):s));
      push(`🕸️ Maya — Central Nest Visit: +${gain} lbs`);
      return {
        ...prev,
        hiveBiomass:prev.hiveBiomass+biomass,
        floorResonance:getHiveFloorResonance(prev)+3,
        view:"visit",
        subState:{tag,gain,biomass,text:`${tag} You bring tribute directly to the Central Nest. Maya's quiet gravity accepts it, and the Hive records the warmth.`},
        log:[{tag,text:"RA-directed feeding at the Central Nest.",type:"scene"},...prev.log].slice(0,40),
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
        floorResonance:getHiveFloorResonance(prev)+1,
        view:"photo",
        subState:{tag,text:`${tag} Maya documents the Hive: conquered rooms, delivery routes, soft bodies, and the faint hive resonance pressure visible in every lavender-lit corner.`},
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
        floorResonance:getHiveFloorResonance(prev)+6,
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
    const markedId=opposition?.aib?.markedForHunt;
    if(markedId){
      const member=opposition?.aib?.members?.find(m=>m.id===markedId);
      if(member&&member.stance!=='consumed'&&member.stance!=='removed'){
        openLilithAibHunt(markedId);
        return;
      }
    }
    const stageId=getStage(lilith.lbs).id;
    if(stageId>=9){
      const intro=renderLilithDeliveryIntro(lilith, week);
      setLilithHuntState({textLog:[{text:"ROOM 312 — DELIVERY",type:'location'},{text:intro,type:'narrative'}],currentNode:'dorm',encounter:null,deliveryMode:true,deliveryDone:false,aibTarget:null});
      return;
    }
    setLilithHuntState({textLog:[{text:"HER DORM · ROOM 312",type:'location'},{text:LILITH_DORM_TEXT(stageId),type:'narrative'}],currentNode:'dorm',encounter:null,deliveryMode:false,deliveryDone:false,aibTarget:null});
  };
  const openLilithAibHunt=(memberId)=>{
    const member=opposition?.aib?.members?.find(m=>m.id===memberId);
    const aibTarget=aibMemberToHuntTarget(member);
    if(!aibTarget) return;
    const lilith=students.find(s=>s.id===LILITH_ID);
    if(!lilith) return;
    const stageId=getStage(lilith.lbs).id;
    const node=HUNT_NODES[aibTarget.location];
    setLilithHuntState({
      textLog:[
        {text:'HER DORM · ROOM 312',type:'location'},
        {text:LILITH_DORM_TEXT(stageId),type:'narrative'},
        {text:`🩸 ${member.name} marked — find them at ${node?.label||aibTarget.location}.`,type:'system'},
      ],
      currentNode:'dorm',
      encounter:null,
      deliveryMode:false,
      deliveryDone:false,
      aibTarget,
    });
  };
  const navigateHunt=(nodeId)=>{
    const node=HUNT_NODES[nodeId]; if(!node) return;
    const fromNode=lilithHuntState?.currentNode||'dorm';
    const travelKey=`${fromNode}→${nodeId}`;
    const travelText=LILITH_TRAVEL[travelKey]||null;
    const entries=[];
    if(travelText) entries.push({text:travelText,type:'action'});
    entries.push({text:node.label.toUpperCase(),type:'location'});
    const lilith=students.find(s=>s.id===LILITH_ID);
    const nodeDesc=lilith?renderHuntNode(nodeId,lilith,week):node.desc;
    entries.push({text:nodeDesc||node.desc,type:'narrative'});
    setLilithHuntState(prev=>({...prev,currentNode:nodeId,encounter:null,textLog:[...prev.textLog,...entries]}));
  };
  const approachMan=(manId)=>{
    const lilith=students.find(s=>s.id===LILITH_ID); if(!lilith) return;
    let man=HUNT_MEN.find(m=>m.id===manId);
    if(!man&&lilithHuntState?.aibTarget?.id===manId) man=lilithHuntState.aibTarget;
    if(!man) return;
    const stageId=getStage(lilith.lbs).id;
    const diff=getEffectiveDifficulty(man.difficulty,stageId);
    const willpower=WILLPOWER_START[diff]??45;
    const maxApprehension=MAX_APPREHENSION[diff]??5;
    const firstLine=getGuyLine(diff,willpower);
    const replies=drawReplies([]);
    const desc=renderHuntTarget(man.id,lilith,week)||(typeof man.desc==='function'?man.desc(stageId):man.desc);
    const entries=[
      {text:`${man.name.toUpperCase()} — ${man.tag}`,type:'location'},
      {text:desc,type:'narrative'},
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
    const aibTarget=lilithHuntState?.aibTarget;
    const isAib=!!(aibTarget&&lilithHuntState?.encounter?.manId===aibTarget.id);
    const stageId=getStage(lilith.lbs).id;
    const nextStage=WEIGHT_STAGES[Math.min(10,stageId+1)];
    const gain=nextStage&&nextStage.id>stageId?Math.max(1,nextStage.min-Math.round(lilith.lbs)+5):20;
    setStudents(prev=>prev.map(s=>s.id===LILITH_ID?{...s,lbs:s.lbs+gain}:s));
    setLilithKillCount(k=>k+1);
    if(isAib){
      setOpposition(prev=>removeConsumedAibMember(prev,aibTarget.aibMemberId));
      addScrutiny(-15);
      push(`🩸 Lilith devours ${aibTarget.name} — board member removed (+${gain} lbs, −15 scrutiny)`);
      const consumeText=renderLilithFeast(lilith, stageId, week);
      setLilithHuntState(prev=>({
        ...prev,
        aibTarget:null,
        encounter:{...prev.encounter,consumed:true},
        textLog:[...prev.textLog,{text:consumeText,type:'narrative'},{text:`✦ +${gain} lbs · ${aibTarget.name} consumed`,type:'system'}],
      }));
      setOpposition(prev=>({
        ...prev,
        aib:{...prev.aib,markedForHunt:prev.aib?.markedForHunt===aibTarget.aibMemberId?null:prev.aib?.markedForHunt},
      }));
      return;
    }
    push(`🌑 Lilith — hunt complete: +${gain} lbs`);
    const consumeText=renderLilithFeast(lilith, stageId, week);
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
    const feastText=renderLilithFeast(lilith, stageId, week);
    setLilithHuntState(prev=>({...prev,deliveryDone:true,textLog:[...prev.textLog,{text:feastText,type:'narrative'},{text:`✦ +${gain} lbs`,type:'system'}]}));
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
      testerName:name, testerStageId:6, testerLbs:getCampusTesterStartLbs(pharmacistState, campusState.saturation?.tier ?? 0),
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
    const choiceLine=renderCultivatorChoice(session.foodType,choice.id,cs.testerName,week)||choice.desc;
    const newLog=[...session.log,choiceLine];
    const nextIdx=session.junctionIdx+1;
    const isDone=nextIdx>=recipe.junctions.length;
    if(isDone){
      const reaction=renderCultivatorReaction(cs.testerName,Math.max(0,cs.suspicion+newSusp),week);
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
      const reneePre=renee.lbs;
      const grown=processStudentGain(renee,hGain,8);
      const growthEv=buildGrowthEvent(grown,{
        cause:{ type:'feature', featureId:'cultivator', locale:'kitchen' },
        preLbs:reneePre,
        gainLbs:hGain,
        week,
      });
      setStudents(prev=>prev.map(st=>st.id===s.id?grown:st));
      setCultivatorState(prev=>({...prev,testerStageId:cs.testerStageId,fatBar:finalFatBar,suspicion:200,session:null,pendingStageUp:false,harvestType:'emergency',harvestVignetteText:vignette,growthGain:hGain,growthVignetteText:[gVignette,growthEv?.prose].filter(Boolean).join('\n\n'),harvestStagesJumped:_stagesJumped,digestWeeksLeft:digestW,digestTotalWeeks:digestW,modalPhase:'emergency'}));
      push(`🍰 EMERGENCY: ${cs.testerName} got suspicious — harvest triggered (+${hGain} lbs to Reneé)`);
      return;
    }
    // Normal session close — stage-up or continue
    if(stageUp){
      const stageText=getStageUpText(nextStageId,cs.testerName)||'The taste tester has grown.';
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
    const renee=students.find(st=>st.id===s.id)||s;
    const reneePre=renee.lbs;
    const grown=processStudentGain(renee,hGain,12);
    const growthEv=buildGrowthEvent(grown,{
      cause:{ type:'feature', featureId:'cultivator', locale:'kitchen' },
      preLbs:reneePre,
      gainLbs:hGain,
      week,
    });
    setStudents(prev=>prev.map(st=>st.id===s.id?grown:st));
    push(`🍰 Reneé — harvest complete: +${hGain} lbs. Digesting for ${digestW} weeks.`);
    setCultivatorState(prev=>({
      ...prev,
      testerName:null,
      testerStageId:6,
      testerLbs:TESTER_START_LBS,
      fatBar:0,
      suspicion:0,
      session:null,
      pendingStageUp:false,
      harvestsCompleted:prev.harvestsCompleted+1,
      harvestType:null,
      harvestVignetteText:null,
      digestWeeksLeft:digestW,
      digestTotalWeeks:digestW,
      modalPhase:'growth',
      growthVignetteText:[cs.growthVignetteText,growthEv?.prose].filter(Boolean).join('\n\n'),
    }));
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
      setTimeout(()=>push(`🌿 ${narrative||'Campus Softening'} — the resident body starts rounding out.`),160);
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

  const gatherLabParts=(s)=>{
    runLabSessionOpen(s);
  };

  const runLabSessionOpen=(s)=>{
    if(!labState||s.evolvedForm!=='machine_goddess') return;
    if((labState.instability??0)>=85){
      push('⚠️ Lab instability critical — run maintenance before another parts session.');
      return;
    }
    const act=INVENTOR_ACTIVITIES[1];
    if(ap<act.apCost){ push(`⚠️ Need ${act.apCost} AP.`); return; }
    setLabStudentId(s.id);
    setLabSession(startLabSession(labState));
  };

  const runArrivalCapstone=(s)=>{
    const capstone=getArrivalCapstone(s);
    if(!capstone) return;
    if(ap<capstone.apCost){ push(`⚠️ Need ${capstone.apCost} AP.`); return; }
    setAp(a=>a-capstone.apCost);
    const gain=Math.max(1,Math.round(rnd(8,14)*getSupernaturalGainMult(s)));
    const firstUnlock=capstone.firstUnlock;
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:markArrivalUnlocked(processStudentGain(st,gain,6))));
    if(firstUnlock&&labState){
      const unlock=getArrivalBoardUnlock(s);
      if(unlock){
        setLabState(prev=>normalizeLabTechState(forceUnlockArrivalNode(prev,unlock.deviceDefId,unlock.nodeId)));
        push(`⚡ Arrival branch unlocked on ${unlock.deviceDefId.replace(/_/g,' ')}.`);
      }
    }
    push(`✦ Arrival — ${capstone.label}: +${gain} lbs · ${firstUnlock?'capstone unlocked':'repeatable arrival'}`);
    setEvolvedActivityModal({ student:s, stageIdx:getEvolvedActivityStageIdx(s), text:capstone.desc });
  };

  const runImmobilityArrival=(s)=>{
    const arrival=getImmobilityArrival(s);
    if(!arrival) return;
    if(ap<arrival.apCost){ push(`⚠️ Need ${arrival.apCost} AP.`); return; }
    setAp(a=>a-arrival.apCost);
    const gain=Math.max(1,Math.round(rnd(arrival.gain[0],arrival.gain[1])*getSupernaturalGainMult(s)));
    const firstUnlock=arrival.firstUnlock;
    const hint=(s.courtHintWeek??-1)<week?getNextHint(s):null;
    let hintPatched=s;
    if(hint){
      hintPatched=incrementHint(hintPatched,hint.pref);
      if(hint.pref==='food'&&hint.tier===1) hintPatched=initFoodHint(hintPatched);
    }
    const prose=renderImmobArrival(s,week);
    const hintProse=hint?renderImmobHint(hintPatched,hint.pref,hint.tier,week):'';
    const fullProse=[prose,hintProse].filter(Boolean).join('\n\n');
    setStudents(prev=>prev.map(st=>{
      if(st.id!==s.id) return st;
      let next=markImmobilityArrived(processStudentGain(st,gain,arrival.rel));
      if(firstUnlock&&next.lastRefitLbs==null) next=markRefit(next);
      if(hint){
        next={...next,courtHints:hintPatched.courtHints,courtHintWeek:week};
        if(hintPatched.pendingCourtPreference) next={...next,pendingCourtPreference:hintPatched.pendingCourtPreference};
      }
      return next;
    }));
    if((ownedSkills.memory_palace||0)>=1&&firstUnlock){
      applyEchoCapture(s, prev=>captureImmobilityEcho(prev,s.id,week,getStage(s.lbs).id));
    }
    push(`✦ The Settling — ${arrival.label}: +${gain} lbs${firstUnlock?' · she has arrived, and now keeps settling on her own':' · still settling'}`);
    setEvolvedActivityModal({ student:s, stageIdx:getEvolvedActivityStageIdx(s), text:fullProse||arrival.desc });
  };

  const runImmobilityRefit=(s)=>{
    const action=getRefitAction(s);
    if(!action) return;
    if(ap<action.apCost){ push(`⚠️ Need ${action.apCost} AP.`); return; }
    setAp(a=>a-action.apCost);
    const prose=renderImmobRefit(s,week);
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:markRefit(st)));
    push(`✦ Re-fit — clothes remade for her size.`);
    setEvolvedActivityModal({ student:s, stageIdx:getEvolvedActivityStageIdx(s), text:prose||action.desc });
  };

  const runComfortMilestone=(s,key)=>{
    const ms=COMFORT_MILESTONES[key];
    if(!ms) return;
    if(ap<ms.apCost){ push(`⚠️ Need ${ms.apCost} AP.`); return; }
    setAp(a=>a-ms.apCost);
    gainFavor('comfort');
    const prose=renderImmobComfort(s,key,week);
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:markComfortMilestone(st,key)));
    push(`✦ ${ms.label} — comfort milestone complete.`);
    setEvolvedActivityModal({ student:s, stageIdx:getEvolvedActivityStageIdx(s), text:prose||ms.desc });
  };

  const runConfirmCourtPreference=(s)=>{
    if(!s.pendingCourtPreference) return;
    const boonTier=getCourtBoonTier(s,'food');
    const prose=renderImmobPref(s,'food',boonTier,week);
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:confirmCourtPreference(st)));
    push(`✦ Food preference confirmed — ${s.pendingCourtPreference}, she settles faster.`);
    if(prose) setEvolvedActivityModal({ student:s, stageIdx:getEvolvedActivityStageIdx(s), text:prose });
  };

  const runBrokeredVisit=(immobile,visitor)=>{
    if(ap<1){ push('⚠️ Need 1 AP.'); return; }
    setAp(a=>a-1);
    const visitProse=renderImmobVisit(immobile,visitor,week);
    const gossipProse=renderGossipReact(visitor,week,{memName:immobile.name,memType:'stageUp',memWeeksAgo:0});
    const fullProse=[visitProse,gossipProse].filter(Boolean).join('\n\n');
    setStudents(prev=>prev.map(st=>{
      if(st.id===immobile.id) return {...st,relationship:Math.min(100,(st.relationship??0)+3)};
      if(st.id===visitor.id) return adjustHunger({...st,relationship:Math.min(100,(st.relationship??0)+1)},1);
      return st;
    }));
    push(`✦ Visit — ${visitor.name} called on ${immobile.name}.`);
    setEvolvedActivityModal({ student:immobile, stageIdx:getEvolvedActivityStageIdx(immobile), text:fullProse||`${visitor.name} came to sit with ${immobile.name}.` });
  };

  // Unified handler for the Settling 3-tree loop. Special subs defer to the
  // existing flows (intimacy / private session / refit / comfort) that own
  // their own AP and prose; everything else runs through here.
  const runSettlingAction=(s,branch,sub)=>{
    if(sub.action==='openIntimacy'){ openIntimacySelector(s); return; }
    if(sub.action==='privateSession'){ startPrivateSession(s); return; }
    if(sub.action==='refit'){ runImmobilityRefit(s); return; }
    if(sub.action==='comfort'){ runComfortMilestone(s,sub.comfortKey); return; }

    const cost=sub.apCost||0;
    if(ap<cost){ push(`⚠️ Need ${cost} AP.`); return; }
    setAp(a=>a-cost);

    const eff=sub.effects||{};
    const rolled=eff.gain?Math.max(1,Math.round(rnd(eff.gain[0],eff.gain[1])*getSupernaturalGainMult(s))):0;
    // Hand-feeding her known preference carries the +20% taste bonus.
    const prefMult=(branch==='feed'&&sub.id==='preferred'&&s.courtPreference)?1.2:1;
    // Ever-Expanding loop: built stomach capacity makes every feed bigger, so
    // stuffing (capacity↑) and her own growth compound into all future feeding.
    const capBuilt=(s.stomachCapacity||GAIN_CONFIG.baseCapacity)-GAIN_CONFIG.baseCapacity;
    const capBonus=branch==='feed'?Math.floor(capBuilt/8):0;
    const finalGain=rolled>0?Math.round(rolled*prefMult)+capBonus:0;
    // The Adored: standing = accumulated socialize acts. The more the campus
    // already orbits her, the harder each new social act lands.
    const standing=s.settleCounts?.socialize??0;
    const relBonus=branch==='socialize'?Math.floor(standing/4):0;
    const finalRel=(eff.rel||0)+relBonus;

    // Care > Tend Her fires the hint escalation, once per week.
    const tendHint=(branch==='care'&&sub.id==='tend'&&(s.courtHintWeek??-1)<week)?getNextHint(s):null;
    let hintPatched=s;
    if(tendHint){
      hintPatched=incrementHint(hintPatched,tendHint.pref);
      if(tendHint.pref==='food'&&tendHint.tier===1) hintPatched=initFoodHint(hintPatched);
    }

    const prose=renderSettlingScene(sub.sceneKey,s,{week});
    const hintProse=tendHint?renderImmobHint(hintPatched,tendHint.pref,tendHint.tier,week):'';
    const fullProse=[prose,hintProse].filter(Boolean).join('\n\n');

    if(branch==='socialize') gainFavor('socialize');
    else if(branch==='care') gainFavor('comfort');

    setStudents(prev=>prev.map(st=>{
      if(st.id!==s.id) return st;
      let next=st;
      if(finalGain>0) next=processStudentGain(next,finalGain,finalRel);
      else if(finalRel) next={...next,relationship:Math.min(100,(next.relationship??0)+finalRel)};
      if(eff.capacity) next={...next,stomachCapacity:(next.stomachCapacity||GAIN_CONFIG.baseCapacity)+eff.capacity};
      next=markImmobilityArrived(next);
      if(next.lastRefitLbs==null) next=markRefit(next);
      next=incrementSettleCount(next,branch);
      if(getImmobilityTier(next)>=2) next=markFinalForm(next);
      if(tendHint){
        next={...next,courtHints:hintPatched.courtHints,courtHintWeek:week};
        if(hintPatched.pendingCourtPreference) next={...next,pendingCourtPreference:hintPatched.pendingCourtPreference};
      }
      return next;
    }));

    const toastExtra=[finalGain>0?`+${finalGain} lbs`:'',relBonus>0?`❤ +${finalRel}`:''].filter(Boolean).join(' · ');
    push(`✦ ${SETTLING_ACTIONS[branch].label} — ${sub.label}${toastExtra?`: ${toastExtra}`:''}`);
    setEvolvedActivityModal({ student:s, stageIdx:getEvolvedActivityStageIdx(s), text:fullProse||sub.label });
  };

  // Leviathan capstone: the others come to her unprompted. Form-neutral — it
  // never touches settleCounts, so it can't tip Adored vs Comfort Queen.
  const runGathering=(s)=>{
    const attendees=getAttendees(s,students);
    if(!attendees.length){ push('⚠️ No one free to attend her.'); return; }
    if(ap<GATHERING.apCost){ push(`⚠️ Need ${GATHERING.apCost} AP.`); return; }
    setAp(a=>a-GATHERING.apCost);
    const names=attendees.map(a=>a.name);
    const prose=renderSettlingScene('set.gather',s,{week,globals:{attendeeNames:names}});
    const ids=new Set(attendees.map(a=>a.id));
    gainFavor('comfort');
    setStudents(prev=>prev.map(st=>{
      if(st.id===s.id) return markImmobilityArrived({...st,relationship:Math.min(100,(st.relationship??0)+GATHERING.rel)});
      if(ids.has(st.id)){
        const g=Math.max(1,Math.round(rnd(GATHERING.attendeeGain[0],GATHERING.attendeeGain[1])*getSupernaturalGainMult(st)));
        return processStudentGain({...st,relationship:Math.min(100,(st.relationship??0)+GATHERING.attendeeRel)},g,0);
      }
      return st;
    }));
    push(`✦ Gather Her Court — ${names.join(', ')} attended.`);
    setEvolvedActivityModal({ student:s, stageIdx:getEvolvedActivityStageIdx(s), text:prose||GATHERING.desc });
  };

  // Tie-breaker: at leviathan with no dominant branch, the player picks her
  // final form by hand. chooseFinalForm no-ops if one is already locked.
  const chooseLeviathanForm=(s,branchKey)=>{
    setStudents(prev=>prev.map(st=>st.id===s.id?chooseFinalForm(st,branchKey):st));
    push(`✦ ${s.name} settles into ${FINAL_FORMS[branchKey].label}.`);
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
  const openLabView=()=>setView('lab');

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

  const confirmLabSession=(sessionToSave)=>{
    const session=sessionToSave||labSession;
    const s=students.find(st=>st.id===labStudentId);
    if(!s){ push('⚠️ Lab session expired — open a new session from Talia.'); return; }
    if(!session){ push('⚠️ No lab session to save.'); return; }
    if(!labState){ push('⚠️ Lab is not available.'); return; }
    if(session.phase!=='build'){ push('⚠️ Choose how to gather parts before saving.'); return; }
    const act=LAB_SESSION_ACTIVITY;
    if(ap<act.apCost){ push(`⚠️ Need ${act.apCost} AP.`); return; }
    setAp(a=>a-act.apCost);
    const gain=rnd(...act.taliaGain);
    const ns=processStudentGain(s,gain,8);
    setStudents(prev=>prev.map(st=>st.id===s.id?ns:st));
    const prevStage=labState.stage??1;
    const prestigeScore=computePrestigeScore({ week, labState, campusSaturation:campusState.saturation, globalStats });
    const btPrestige=prestigeBreakthroughBonus(prestigeScore);
    const sessionPayload={
      ...session,
      poolAfter: session.pool,
      instabilityGained: act.instability||5,
      breakthroughsGained: (session.breakthroughsGained ?? rollSessionBreakthroughs(Math.random)) + btPrestige,
    };
    let next=completeLabSession(labState, sessionPayload, null, Math.random);
    next=maybeAdvanceInventorStage(next);
    next=normalizeLabTechState(next);
    setLabState(next);
    const btMsg=` +${sessionPayload.breakthroughsGained} 💡`;
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
    const res=unlockTechNode(normalizeLabTechState(labState),nodeId,taliaStudent());
    if(!res.ok){
      const msg=res.reason==='cost'?'Not enough breakthroughs.':res.reason==='prereqs'?'Prerequisites not met.':res.reason==='relationship'?'Talia needs a closer bond first.':res.reason==='stage'?'Requires a higher inventor stage.':'Already unlocked.';
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
    const def=DEVICES[deviceDefId];
    const isLabInstall=def?.inventionKind==='event'&&(def?.form==='stationary'||def?.labStation);
    if(isLabInstall){
      setLabState(prev=>({
        ...prev,
        parts: spentParts,
        installedInventions: { ...(prev?.installedInventions||{}), [deviceDefId]: true },
      }));
      push(`🔧 Installed ${def?.label||deviceDefId} in the lab — Talia spent ${weightCost} lbs as raw material.`);
    }else{
      setDeviceInventory(prev=>({ ...prev, [deviceDefId]: (prev[deviceDefId]||0)+1 }));
      push(`🔧 Built ${def?.label||deviceDefId} — Talia spent ${weightCost} lbs as raw material.`);
    }
  };

  const runResearchExperiment=(blueprintId)=>{
    const node=getResearchNode(blueprintId);
    if(!node||!labState) return;
    if(ap<EXPERIMENT_SESSION_COST.ap){ push(`⚠️ Need ${EXPERIMENT_SESSION_COST.ap} AP.`); return; }
    const affordState={ ...labState };
    if(!canAfford({ parts: node.materials||{}, money: 0 }, affordState, money)){
      push('⚠️ Insufficient materials for this experiment.');
      return;
    }
    setAp(a=>a-EXPERIMENT_SESSION_COST.ap);
    const outcome=rollExperimentOutcome(node,Math.random);
    setLabState(prev=>{
      if(!prev) return prev;
      let next=spendExperimentMaterials(prev,node);
      if(outcome.ok){
        next=researchBlueprint(next,blueprintId);
        setTimeout(()=>push(`🖥 Experiment succeeded — ${node.label} blueprint unlocked.`),0);
      }else{
        next={ ...next, instability: Math.min(100,(next.instability??0)+(outcome.instabilityBonus??8)) };
        setTimeout(()=>push(`⚠️ Experiment failed — side effects spiked lab instability.`),0);
      }
      return next;
    });
  };

  const unlockLabCircuitNode=(deviceDefId,nodeId)=>{
    setLabState(prev=>{
      if(!prev) return prev;
      const next=unlockCircuitNode(prev,deviceDefId,nodeId,students);
      if(next===prev) return prev;
      const node=getCircuitNode(deviceDefId,nodeId);
      setTimeout(()=>push(`🔌 Circuit node installed — ${node?.label||nodeId}.`),0);
      return next;
    });
  };

  const openForceFeeder=()=>{
    if(!isForceFeederInstalled(labState)){ push('⚠️ Build the Force Feeder in the Workshop first.'); return; }
    setForceFeederState(buildForceFeederModalState('setup'));
  };

  const handleForceFeederSelectTarget=(targetId)=>{
    setForceFeederState(prev=>prev?{ ...prev, targetId }:null);
  };

  const handleForceFeederComplete=(payload)=>{
    setForceFeederState(prev=>{
      if(!prev) return null;
      const target=students.find(st=>st.id===prev.targetId);
      const next=advanceForceFeederOnComplete(prev,payload,target,week,labState);
      if(next.phase==='aftermath'&&target&&next.resultParams){
        const built=buildForceFeederEffect(target,next.resultParams.performanceTier,labState,week,{
          targetIsTalia: target.id===TALIA_STUDENT_ID,
          growthZone: next.resultParams.growthZone||'default',
          efficiencyPct: next.resultParams.efficiencyPct,
          chokeMeter: next.resultParams.chokeMeter,
          chokedOut: next.resultParams.chokedOut,
        });
        const applied=applyDeviceEffect(target,{
          gainLbs: built.gainLbs,
          bodyOverride: built.bodyOverride,
          psychDelta: built.psychDelta,
        },{ week, sourceDeviceId:'feeding_mask', rng:Math.random });
        applyStudentDeviceResult(target.id,{ ok:true, ...applied, zoneOverride: built.zoneOverride },DEVICES.feeding_mask);
        const usage=recordForceFeederUse(labState,{
          performanceTier: built.performanceTier,
          targetIsTalia: built.targetIsTalia,
          highRelationship: isHighRelationship(target),
          targetedZone: next.resultParams.growthZone,
        });
        setLabState(usage.labState);
        const proseParams={
          ...built,
          feedAttitude: built.feedAttitude,
          targetIsTalia: built.targetIsTalia,
          performanceTier: built.performanceTier,
          pointsEarned: usage.pointsEarned,
        };
        const prose=renderForceFeederScene(
          { ...target, lbs: applied.student?.lbs??target.lbs },
          week,
          proseParams,
        );
        const ptsMsg=usage.pointsEarned>0?` +${usage.pointsEarned} invention pts`:'';
        push(`🎭 Force Feeder — ${target.name} (${built.performanceTier}${ptsMsg}).`);
        if(usage.fieldDataBonus) setTimeout(()=>push('🔌 Field Data Accumulation — bonus invention point.'),80);
        return { ...next, resultParams: proseParams, prose };
      }
      return next;
    });
  };

  const closeForceFeeder=()=>setForceFeederState(null);

  const applyStudentDeviceResult=(studentId,result,def,consumeInventory=false,locale='lab')=>{
    if(!result?.ok && result?.student==null) return null;
    const preStudent=students.find(st=>st.id===studentId);
    const preLbs=preStudent?.lbs??130;
    let ns=result.student;
    if(ns._pendingGainLbs){
      const g=ns._pendingGainLbs;
      const{ _pendingGainLbs,...rest}=ns;
      ns=processStudentGain(rest,g,0);
    }
    const gainLbs=Math.max(0, Math.round(ns.lbs-preLbs));
    setStudents(prev=>prev.map(st=>st.id===studentId?ns:st));
    if(consumeInventory&&def?.id){
      setDeviceInventory(prev=>{
        const q=(prev[def.id]||0)-1;
        const next={ ...prev };
        if(q<=0) delete next[def.id]; else next[def.id]=q;
        return next;
      });
    }
    const growthEv=buildGrowthEvent(ns,{
      cause:{
        type:result.malfunction?'device_malfunction':'device_use',
        deviceId:def?.id,
        malfunctionTier:result.malfunction?.tier,
        locale,
        zoneOverride:result.zoneOverride,
      },
      preLbs,
      gainLbs,
      week,
      malfunction:result.malfunction,
      isPermanent:!!(result.malfunction?.effect?.permanentConvert||result.malfunction?.effect?.setFlags?.limitRemoved),
    });
    if(growthEv){
      setDeviceTickQueue(prev=>{
        const events=prev?.events?[...prev.events,growthEv]:[growthEv];
        return { events, index: prev?.index??0 };
      });
      return growthEv;
    }
    if(result.malfunction&&(result.malfunction.tier==='major'||result.malfunction.tier==='critical')){
      const subj=students.find(st=>st.id===studentId);
      setMalfunctionPopup({
        studentName:subj?.name,tier:result.malfunction.tier,
        text:result.malfunction.text,deviceLabel:def?.label,
      });
    }
    return null;
  };

  const useDeviceOn=(def,studentId)=>{
    setDeviceTargetPicker(null);
    const result=useConsumableDevice(
      students.find(st=>st.id===studentId),
      def.id,week,Math.random,{ labState },
    );
    if(!result.ok){ push('⚠️ Device use failed.'); return; }
    applyStudentDeviceResult(studentId,result,def,true);
    const tier=result.malfunction?(result.malfunction.tier==='minor'?'messy':'failure'):'good';
    awardDeviceMastery(def.id,tier);
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
    if(!result.ok){
      push(result.reason==='corruption_gate'&&result.message?`⚠️ ${result.message}`:'⚠️ Could not equip device.');
      return;
    }
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

  const completeDeviceUsage=(payload)=>{
    const modal=deviceUsageModal;
    if(!modal) return;
    const s=students.find(st=>st.id===modal.studentId);
    if(!s){ setDeviceUsageModal(null); return; }
    const { deviceDefId, actionId }=modal;
    const def=DEVICES[deviceDefId];
    let result;
    let gainMult=1;
    let performanceTier='good';
    if(payload?.performanceTier){
      performanceTier=payload.performanceTier;
      gainMult=tuningGainMult({ magnitude:payload.magnitude??0.5, stability:payload.stability??0.5, resultQuality:performanceTier },labState,deviceDefId);
      result=runStationaryDeviceSession(s,deviceDefId,week,Math.random,{ gainMult, performanceTier, labState });
    } else if(payload?.allocations){
      const routeScore=scoreRouteSession({ allocations:payload.allocations },0.15,labState,deviceDefId);
      performanceTier=routeScore.performanceTier;
      result=runRouteDeviceSession(s,deviceDefId,week,{ ...routeScore, labState },Math.random);
      if(routeScore.discoveryRisk>0.25) addScrutiny(Math.round(routeScore.discoveryRisk*10));
    } else {
      setDeviceUsageModal(null);
      return;
    }
    if(!result?.ok){
      const msg=result?.lines?.[0]||deviceAcceptanceBlockReason(s,deviceDefId)||'Device session failed.';
      push(msg.startsWith('⚠️')?msg:`⚠️ ${msg}`);
      setDeviceUsageModal(null);
      return;
    }
    if(actionId==='inject_serum'&&(deviceInventory[deviceDefId]||0)<1){
      push('⚠️ No serum injectors in inventory.');
      setDeviceUsageModal(null);
      return;
    }
    if(actionId==='run_chamber_session'&&(deviceInventory[deviceDefId]||0)<1){
      push('⚠️ No growth chamber in inventory.');
      setDeviceUsageModal(null);
      return;
    }
    applyStudentDeviceResult(modal.studentId,result,def,actionId==='inject_serum'||actionId==='run_chamber_session','lab');
    if(labState){
      const usage=applyDeviceUsageReward(labState,deviceDefId,performanceTier);
      setLabState(usage.labState);
      if(usage.pointsEarned>0) setTimeout(()=>push(`🔌 +${usage.pointsEarned} invention pts (${performanceTier}).`),70);
    }
    if(actionId==='inject_serum'||actionId==='run_chamber_session'){
      setDeviceInventory(prev=>({ ...prev, [deviceDefId]: Math.max(0,(prev[deviceDefId]||0)-1) }));
    }
    push(`${def?.icon||'🛠'} ${def?.label||deviceDefId} — ${s.name} (${performanceTier}).`);
    setDeviceUsageModal(null);
  };

  const awardDeviceMastery=(deviceDefId,performanceTier='good')=>{
    if(!labState) return;
    const usage=applyDeviceUsageReward(labState,deviceDefId,performanceTier);
    setLabState(usage.labState);
    if(usage.pointsEarned>0) setTimeout(()=>push(`🔌 +${usage.pointsEarned} invention pts (${performanceTier}).`),70);
  };

  const runDeviceAction=(actionId,studentId)=>{
    const s=students.find(st=>st.id===studentId);
    if(!s) return;
    const gateDeviceUse=(deviceDefId)=>{
      if(canStudentUseDevice(s,deviceDefId)) return true;
      push(`⚠️ ${deviceAcceptanceBlockReason(s,deviceDefId)}`);
      return false;
    };
    if(actionId==='trigger_belt_bloat'){
      if(!gateDeviceUse('auto_bloating_belt')) return;
      const result=triggerBeltBloatNow(s,week,Math.random);
      if(!result.ok){ push('⚠️ Belt not active.'); return; }
      applyStudentDeviceResult(studentId,result,DEVICES.auto_bloating_belt);
      awardDeviceMastery('auto_bloating_belt', result.malfunction ? 'messy' : 'good');
      const extra=result.lines?.filter(l=>!l.startsWith('⚠️')&&l!=='Belt cycles to aggressive bloat mode.').join(' ');
      push(`⭕ Belt bloat triggered on ${s.name}.${extra?` ${extra}`:''}`);
      return;
    }
    if(actionId==='run_feeder_session'){
      if(!gateDeviceUse('auto_feeder_arm')) return;
      setDeviceUsageModal({ type:'route', deviceDefId:'auto_feeder_arm', studentId, actionId, deviceLabel:DEVICES.auto_feeder_arm?.label });
      return;
    }
    if(actionId==='inject_serum'){
      if(!gateDeviceUse('growth_serum_injector')) return;
      setDeviceUsageModal({ type:'tuning', deviceDefId:'growth_serum_injector', studentId, actionId, deviceLabel:DEVICES.growth_serum_injector?.label });
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
      if(!gateDeviceUse('feeding_mask')) return;
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
      if(!gateDeviceUse('living_furniture_rig')) return;
      const effect=DEVICES.living_furniture_rig.useEffect||{};
      const applied=applyDeviceEffect(s,effect,{ week, sourceDeviceId:'living_furniture_rig', rng:Math.random });
      applyStudentDeviceResult(studentId,{ ok:true, ...applied },DEVICES.living_furniture_rig);
      awardDeviceMastery('living_furniture_rig', 'good');
      const comfort=applied.student?.deviceState?.furnitureComfort;
      push(`🪑 Fed the furniture (${s.name}) — comfort ${comfort ?? '?'}/100.`);
      return;
    }
    if(actionId==='furniture_comfort_check'){
      const comfort=s.deviceState?.furnitureComfort??100;
      push(`🪑 ${s.name} furniture comfort: ${comfort}/100${comfort<40?' — unstable, needs feeding':''}.`);
      return;
    }
    if(actionId==='run_chamber_session'){
      if(!gateDeviceUse('growth_accelerator_chamber')) return;
      setDeviceUsageModal({ type:'tuning', deviceDefId:'growth_accelerator_chamber', studentId, actionId, deviceLabel:DEVICES.growth_accelerator_chamber?.label });
      return;
    }
  };

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
      const feedCtx=pendingFeedContextRef.current;
      const hungerEff=aggregateSkillEffects(ownedSkills);
      if(feedCtx?.type==='dinner'&&feedCtx.studentId===studentId){
        ns=feedResolvesHunger(ns,false,hungerEff,weeklyArms);
        pendingDinnerHungerResolveRef.current=studentId;
        setTimeout(()=>push(`🚪 ${renderHungerOutcome(ns,'feed',week)} — you'll feed her properly at dinner.`),100);
      }else{
        const portion=getInterruptFeedPortion(ns);
        const fed=feedStudentCalories(ns,portion.calories,portion.fullness,portion.relGain,'Emergency feeding');
        if(fed) ns=fed;
        const eatLine=isSlenderEligible(fed||ns)
          ?renderSlenderEatBeat(fed||ns,week,{mealType:'binge'})
          :renderEatScene(fed||ns,week,{mealType:'binge'});
        if(eatLine) setTimeout(()=>push(`🍽️ ${eatLine}`),70);
        setTimeout(()=>push(`🚪 ${renderHungerOutcome(ns,'feed',week)}`),100);
      }
    }else if(action==='compound'){
      const cid=compoundId||pharmacistState?.unlockedCompounds?.[0]||'appetite_stimulant';
      const portion=getInterruptCompoundPortion(ns);
      const fed=feedStudentCalories(ns,portion.calories,portion.fullness,portion.relGain,`Compound-laced meal (${COMPOUNDS[cid]?.label||cid})`,{compoundId:cid});
      if(fed) ns=fed;
      setTimeout(()=>push(`🚪 ${renderHungerOutcome(ns,'compound',week)}`),100);
    }else if(action==='deny'){
      ns=applyDenialConsequences(ns);
      setTimeout(()=>push(`🚪 ${renderHungerOutcome(ns,'deny',week)}`),100);
    }else if(action==='talk'){
      const hungerEff=aggregateSkillEffects(ownedSkills);
      ns=talkCalmsHunger(ns,hungerEff,weeklyArms);
      const relGain=getInterruptTalkRelGain(ns);
      ns={...ns,relationship:Math.min(100,ns.relationship+relGain)};
      setTimeout(()=>push(`🚪 ${renderHungerOutcome(ns,'talk',week)}`),100);
    }else if(action==='echoed_will'){
      if((ownedSkills.echoed_will||0)<1){
        push('⚠️ Echoed Will not unlocked.');
        return;
      }
      if(opposition?.meta?.echoedWillSpentWeek===week){
        push('⚠️ Echoed Will already spent this week — Floor Pressure and curse reversal share one charge.');
        return;
      }
      const fx=echoedWillReverseCurse(opposition,studentId,adminScrutiny);
      if(fx.ok){
        setOpposition({
          ...fx.opposition,
          meta:{...fx.opposition.meta,echoedWillSpentWeek:week},
        });
        if(fx.scrutinyDelta) addScrutiny(fx.scrutinyDelta);
        push(fx.message);
        ns={...ns,oppositionBlockedGain:false};
      }else{
        push('⚠️ Echoed Will found no curse to reverse.');
      }
    }
    setStudents(prev=>prev.map(st=>st.id===studentId?ns:st));
    setHungerInterrupt(null);
    skipHungerCheckRef.current=true;
    pendingFeedContextRef.current=null;
    if(after==='week') advanceWeek();
    else if(after==='resume'){
      const resume=pendingAfterInterruptRef.current;
      pendingAfterInterruptRef.current=null;
      if(resume) resume();
    }
  };

  // ── LANE CAPTAIN handlers ─────────────────────────────
  const openThesisBoard=(s)=>{
    if(ap<1){push("⚠️ Need 1 AP for season plan review.");return;}
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
    push(`📋 ${s.name} — season plan approved. Floor case studies unlocked.`);
  };
  const openCaseStudyGrid=(s)=>{
    if(ap<1){push("⚠️ Need 1 AP.");return;}
    setCommunityResearcherState(prev=>prev?{...prev,modalPhase:'case_study_grid'}:null);
  };
  const selectCasePair=(s,pairId)=>{
    const crs=communityResearcherState; if(!crs) return;
    const pair=CASE_STUDY_PAIRS.find(p=>p.id===pairId); if(!pair) return;
    const mTier=getSwimmerTier(getStage(s.lbs).id);
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
    if(approved) push("📋 Cassidy — captain review approved. The season plan is locked.");
    else push("📋 Cassidy — captain review rejected. Coach wasn't persuaded.");
  };

  const startRankedSession=(studentId,stageIdx)=>{
    const s=students.find(st=>st.id===studentId); if(!s) return;
    gainFavor('session');
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
    playHallPassSound('click', soundEnabled);
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
    playHallPassSound('click', soundEnabled);
    const{studentId,gain}=rankedFeedeeState;
    const s=students.find(st=>st.id===studentId);
    if(s) push(`🎮 ${s.name} — session ended early: +${Math.round(gain)} lbs`);
    setRankedFeedeeState(prev=>prev?({...prev,done:true,endReason:'quit'}):null);
  };

  const closeRankedSession=()=>{ playHallPassSound('confirm', soundEnabled); setRankedFeedeeState(null); };

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
    const popup=renderContestFoodPopup(food.id,stageIdx,s,week);
    // Check end conditions
    const tableCleared=newYF.every(f=>f.consumed)&&newMF.every(f=>f.consumed);
    if(tableCleared){
      const tcp=renderContestActionPopup('table_cleared',stageIdx,s,week)||popup;
      setEatingContestState(prev=>({...prev,yourFoods:newYF,mayaFoods:newMF,yourFullness:newYourFull,mayaFullness:newMayaFull,yourGain:newYourGain,mayaGain:newMayaGain,popupText:tcp,phaseAfterPopup:'weigh_in_2'}));
      return;
    }
    // Too-full end condition only applies when devour is NOT available
    if(stageIdx<3){
      const newEffMax=maxYourFullness-pantsFactor;
      const tooFull=newYourFull>=newEffMax&&actions.unbuttoned&&actions.rubUses>=3;
      if(tooFull){
        const tfp=renderContestActionPopup('too_full',stageIdx,s,week)||popup;
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
    const popup=renderContestDevourPopup(stageIdx,s,week);
    const tableCleared=newYF.every(f=>f.consumed)&&finalMF.every(f=>f.consumed);
    if(tableCleared){
      const tcp=renderContestActionPopup('table_cleared',stageIdx,s,week)||popup;
      setEatingContestState(prev=>({...prev,yourFoods:newYF,mayaFoods:finalMF,yourFullness:newYourFull,mayaFullness:newMayaFull,yourGain:newYourGain,mayaGain:newMayaGain,popupText:tcp,phaseAfterPopup:'weigh_in_2'}));
      return;
    }
    setEatingContestState(prev=>({...prev,yourFoods:newYF,mayaFoods:finalMF,yourFullness:newYourFull,mayaFullness:newMayaFull,yourGain:newYourGain,mayaGain:newMayaGain,popupText:popup}));
  };

  const doContestAction=(action)=>{
    if(!eatingContestState) return;
    const{stageIdx,yourFoods,mayaFoods,yourFullness,mayaFullness,maxYourFullness,maxMayaFullness,mayaGain,pantsFactor,actions,studentId}=eatingContestState;
    const s=students.find(st=>st.id===studentId);
    let updates={};
    let popup='';
    if(action==='unbutton'){
      if(actions.unbuttoned) return;
      updates.pantsFactor=pantsFactor+15;
      updates.actions={...actions,unbuttoned:true};
      popup=s?renderContestActionPopup('unbutton',stageIdx,s,week):'';
    } else if(action==='rub'){
      if(actions.rubUses>=3) return;
      updates.yourFullness=Math.max(0,yourFullness-5);
      updates.actions={...actions,rubUses:actions.rubUses+1};
      popup=s?renderContestActionPopup('rub',stageIdx,s,week):'';
    } else if(action==='taunt'){
      if(actions.taunted) return;
      updates.actions={...actions,taunted:true};
      popup=s?renderContestActionPopup('taunt',stageIdx,s,week):'';
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
      if(tableCleared2){updates.phaseAfterPopup='weigh_in_2';updates.popupText=s?renderContestActionPopup('table_cleared',stageIdx,s,week):'';}
      else if(noRoom&&stageIdx<3){updates.phaseAfterPopup='weigh_in_2';updates.popupText=s?renderContestActionPopup('too_full',stageIdx,s,week):'';}
    }
    setEatingContestState(prev=>({...prev,...updates}));
  };

  const closeEatingContest=()=>{
    if(!eatingContestState) return;
    const{studentId,yourGain,mayaGain,stageIdx,phase,pantsFactor}=eatingContestState;
    const s=students.find(st=>st.id===studentId);
    const mayaLbs=CONTEST_MAYA_WEIGHTS[stageIdx]||330;
    const won=yourGain>=mayaGain;
    if(s){
      const tier=yourGain>=mayaGain*1.15?'perfect':won?'good':yourGain>=mayaGain*0.85?'messy':'failure';
      push(`🏆 ${s.name} — Competition: +${Math.round(yourGain)} lbs · ${won?'Victory':'Loss'} vs Maya (${mayaLbs} lbs) · ${performanceResultLine(tier,'contest')}`);
      if(yourGain>0){
        const growthEv=buildGrowthEvent(s,{
          cause:{ type:'feature', featureId:'contest', locale:'dining_hall', outfitHint:'contest' },
          preLbs:Math.max(80,s.lbs-yourGain),
          gainLbs:yourGain,
          week,
          pantsFactor:pantsFactor||0,
        });
        if(growthEv){
          setDeviceTickQueue(prev=>{
            const events=prev?.events?[...prev.events,growthEv]:[growthEv];
            return { events, index: prev?.index??0 };
          });
        }
      }
    }
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
    setSumoMatchState({studentId,stageIdx,oppLbs,ringPos:0,yourBalance:100,oppBalance:100,yourBouts:0,oppBouts:0,gainAccum:0,oppMove:move,telegraph,exchangeLine:renderSumoOpening(stageIdx,s,oppLbs,week),phase:'match',popupText:null,phaseAfterPopup:null,fillRingUsed:false});
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
      const fillText=renderSumoFillRing(st.stageIdx,s,week);
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
    const line=renderSumoExchangeLine(bucket,st.stageIdx,s,week,oppStumbleNote);
    if(ringPos>=100){
      const yourBouts=st.yourBouts+1;
      const matchOver=yourBouts>=2;
      setSumoMatchState({...st,ringPos:100,yourBalance,oppBalance,yourBouts,exchangeLine:line,popupText:renderSumoBoutWon(st.stageIdx,s,week),phaseAfterPopup:matchOver?'aftermath':'interbout'});
      return;
    }
    if(ringPos<=-100){
      const oppBouts=st.oppBouts+1;
      const matchOver=oppBouts>=2;
      setSumoMatchState({...st,ringPos:-100,yourBalance,oppBalance,oppBouts,exchangeLine:line,popupText:renderSumoBoutLost(st.stageIdx,s,week),phaseAfterPopup:matchOver?'aftermath':'interbout'});
      return;
    }
    const {move,telegraph}=pickOppMove(ringPos,oppBalance);
    setSumoMatchState({...st,ringPos,yourBalance,oppBalance,oppMove:move,telegraph,exchangeLine:line});
  };

  const sumoCornerFeed=()=>{
    if(!sumoMatchState) return;
    const st=sumoMatchState;
    const s=students.find(x=>x.id===st.studentId);
    const feed=SUMO_CORNER_FEED[st.stageIdx]||SUMO_CORNER_FEED[0];
    setStudents(prev=>prev.map(x=>x.id===st.studentId?processStudentGain(x,feed.lbs,0):x));
    setSumoMatchState({...st,gainAccum:st.gainAccum+feed.lbs,popupText:s?renderSumoCornerFeed(st.stageIdx,s,week):feed.text,phaseAfterPopup:'nextbout'});
  };

  const sumoStartNextBout=()=>{
    setSumoMatchState(prev=>{
      if(!prev) return null;
      const s=students.find(x=>x.id===prev.studentId);
      const {move,telegraph}=pickOppMove(0,100);
      const boutNum=prev.yourBouts+prev.oppBouts+1;
      const exchangeLine=s?renderSumoNextBoutLine(boutNum,prev.stageIdx,s,week,false):`Bout ${boutNum}. You square up at the center again. ${SUMO_RIVAL_NAME} sets her feet across from you.`;
      return {...prev,ringPos:0,yourBalance:100,oppBalance:100,oppMove:move,telegraph,exchangeLine,phase:'match',popupText:null,phaseAfterPopup:null,fillRingUsed:false};
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
        const s=students.find(x=>x.id===prev.studentId);
        const exchangeLine=s?renderSumoNextBoutLine(boutNum,prev.stageIdx,s,week,true):`Bout ${boutNum}. You return to center heavier than you left it. ${SUMO_RIVAL_NAME} sets her feet across from you.`;
        return {...prev,popupText:null,phaseAfterPopup:null,phase:'match',ringPos:0,yourBalance:100,oppBalance:100,oppMove:move,telegraph,exchangeLine};
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
    const initChat=[pickCollabWrenLine(stageIdx,kylie,partner,week)].filter(Boolean);
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
      if(Math.random()<0.35){
        const l=pickCollabWrenLine(stageIdx,kylie,partner,week);
        if(l&&!newChat.includes(l)) newChat=[...newChat.slice(-5),l];
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
      popupText=renderCollabStreamBeat('collab.stream.reveal.kylie',kylie,partner,week,stageIdx);
      addWren();
    } else if(action==='reveal_partner'){
      if(actions.partnerRevealed){push("⚠️ Already revealed partner's weight.");return;}
      newQual=Math.min(100,newQual+20);
      newActions={...newActions,partnerRevealed:true};
      const wLineReveal=pickCollabWrenLine(stageIdx,kylie,partner,week);
      popupText=renderCollabStreamBeat('collab.stream.reveal.partner',kylie,partner,week,stageIdx,{wrenLine:wLineReveal});
      addWren();
    } else if(action==='zoom_in'){
      if(actions.zoomUses<=0){push("⚠️ No zoom uses left.");return;}
      newQual=Math.min(100,newQual+8);
      newActions={...newActions,zoomUses:actions.zoomUses-1};
      popupText=renderCollabStreamBeat('collab.stream.zoom',kylie,partner,week,stageIdx);
    } else if(action==='chat_moment'){
      if(actions.chatUses<=0){push("⚠️ No chat engagement uses left.");return;}
      newQual=Math.min(100,newQual+6);
      newActions={...newActions,chatUses:actions.chatUses-1};
      const wLineChat=pickCollabWrenLine(stageIdx,kylie,partner,week);
      newChat=[...newChat.slice(-5),wLineChat];
      popupText=renderCollabStreamBeat('collab.stream.chat',kylie,partner,week,stageIdx,{wrenLine:wLineChat});
    } else if(action==='push_harder'){
      if(actions.pushUsed){push("⚠️ Already pushed harder this stream.");return;}
      const goodPush=Math.random()<0.6;
      if(goodPush){
        kylieGainThisAction=Math.floor(8+stageIdx*2);
        partnerGainThisAction=Math.floor(6+stageIdx*2);
        newQual=Math.min(100,newQual+15);
        popupText=renderCollabStreamBeat('collab.stream.push.good',kylie,partner,week,stageIdx);
      } else {
        newQual=Math.max(0,newQual-10);
        popupText=renderCollabStreamBeat('collab.stream.push.bad',kylie,partner,week,stageIdx);
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
            const stageUpText=renderCollabStageUp(stageIdx,kylie,partner,Math.round(updated.lbs),week);
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
      const payoff=renderCollabPayoff(stageIdx,finalKylieGain,finalPartnerGain,partner,kylie,week);
      setCollabStreamState(prev=>prev?{...prev,kylieGain:finalKylieGain,partnerGain:finalPartnerGain,qualityBar:newQual,foodQueue:newFoodQueue,chatLines:newChat,actions:newActions,phase:'scoreboard',popupText:payoff,phaseAfterPopup:'scoreboard_show'}:prev);
      // Record on Kylie's history
      setStudents(prev=>prev.map(st=>st.id===kylieId?{...st,collabHistory:[...(st.collabHistory||[]).filter(id=>id!==partnerId),partnerId],contestCompletions:(st.contestCompletions||0)+1}:st));
      push(`📹 ${kylie.name} — Collab Stream: +${Math.round(finalKylieGain)} lbs (Kylie) · +${Math.round(finalPartnerGain)} lbs (${partnerName})`);
      return;
    }

    // Check quality fail
    if(newQual<=0){
      const partnerName=partner.name;
      const crashText=renderCollabStreamBeat('collab.stream.crash',kylie,partner,week,stageIdx,{globals:{kylieGain:Math.round(newKylieGain),partnerGain:Math.round(newPartnerGain)}});
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
      const kylieForPopup=students.find(st=>st.id===prev.studentId);
      const popupText=kylieForPopup
        ?renderRecordingDirectionPopup(choiceId,prev.stageIdx,kylieForPopup,week)
        :null;
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
      const takeText=kylie
        ?renderRecordingTakeResult(quality,prev.stageIdx,postGainLbs,kylie,week)
        :'';
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
      const oneMoreText=kylie
        ?renderRecordingOneMoreTake(prev.stageIdx,kylie,week)
        :'She nods. One more.';
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
      const quality=normalizePerformanceTier(prev.bestClip||'okay');
      const kylie=students.find(st=>st.id===prev.studentId);
      const endText=kylie
        ?renderRecordingWrapText(prev.bestClip||'okay',prev.stageIdx,kylie,week)
        :'';
      const relBonuses={perfect:10,good:3,messy:1,failure:0};
      const relBonus=Math.round((relBonuses[quality]||1)*performanceRelMult(quality));
      if(kylie) setStudents(p=>p.map(st=>st.id===prev.studentId?{...st,relationship:Math.min(100,st.relationship+relBonus),contestCompletions:(st.contestCompletions||0)+1}:st));
      push(`🎬 Filming session wrapped — ${performanceResultLine(quality,'session')}. +${relBonus} relationship.`);
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
    if (extra.memScope) { ctx.d.memScope=extra.memScope; ctx.d.memType=extra.memType; ctx.d.memWeeksAgo=extra.memWeeksAgo; ctx.d.memValue=extra.memValue??null; ctx.d.scene='stream'; }
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
    if(s.supernaturalForm==='hollow_icon'){
      setOpposition(prev=>hollowIconStreamDrain(prev,4));
    }
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
      const vignette=renderPreStreamVignette(actionId, choiceId, ctx);
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
      const roundStartLine=renderStreamBeat('{stream.roundStart}',ctx);
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
      const memG=pickStudentMemory(student,week)??{};
      const ctx=buildStreamCtx(prev,student,{perf:tier,trend:deriveTrend(tierHistory),recentPerf:deriveRecentPerf(tierHistory),...memG});
      const betweenRoundLine=[renderStreamBeat('{stream.betweenRound}',ctx),memG.memScope?render('{memory.self}',ctx)?.trim():''].filter(Boolean).join('\n\n');
      let tapOutCause=prev.tapOutCause;
      if(!tapOutCause){
        tapOutCause=checkTapOutConditions({
          stamina:newStamina, tierHistory, resistance:prev.resistance,
          addiction:prev.addiction, fullness:newFullness, stomachCapacity:prev.stomachCapacity,
        });
      }
      const burst=[];
      for(let i=0;i<2;i++){
        const l=renderStreamBeat(`{stream.chat.perf.${tier}}`,ctx,{chat:true});
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
        roundStartLine:renderStreamBeat('{stream.roundStart}',ctx),
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
      const line=renderStreamBeat(`{stream.tapOut.${cause}}`,ctx);
      const tapChat=renderStreamBeat(`{stream.chat.tapOut.${cause}}`,ctx,{chat:true});
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
      const preLbs=before.lbs;
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
      const endLine=renderStreamBeat(`{stream.endStream.${r.overallTier}}`,ctx,{v2DepthChance:0.32});
      const tapLine=prev.tapOutCause?renderStreamBeat(`{stream.tapOut.${prev.tapOutCause}}`,ctx):'';
      const specialLines=(prev.specialOutcomes||[]).map(id=>renderStreamBeat(`{stream.special.${id}}`,ctx)).filter(Boolean);
      const milestoneLines=fired.map(key=>{
        const mod=key.startsWith('stage_')?'stream.milestone.stage':`stream.milestone.${key}`;
        return renderStreamBeat(`{${mod}}`,ctx,{v2DepthChance:0.3});
      }).filter(Boolean);
      const streamGrowth=Math.round(r.weightGain)>0?buildGrowthEvent(updated,{
        cause:{
          type:'feature',
          featureId:'stream',
          locale:'stream_setup',
          outfitHint:prev.preStreamChoices?.outfit||'casual',
        },
        preLbs,
        gainLbs:Math.round(r.weightGain),
        week,
      }):null;
      const endingText=[tapLine,...specialLines,...milestoneLines,streamGrowth?.prose,endLine].filter(Boolean).join('\n\n');
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

  const openIntimacySelector=(s)=>{gainFavor('intimacy');setIntimacySceneSelector({student:s});};

  const persistStudentWeekTextUsed=(studentId,patch)=>{
    if(!patch?.textUsedKeys) return;
    setStudents(prev=>prev.map(s=>s.id===studentId?{...s,...patch}:s));
  };

  const openOriginFor=(s)=>{
    if(!s) return false;
    if(needsOriginPick(s)){
      setOriginPickState({studentId:s.id});
      return true;
    }
    return false;
  };

  const pushSceneScrollback = useCallback((entry) => {
    setSceneScrollback((prev) => [...prev, entry].slice(-50));
  }, []);

  const pinSceneForStudent = useCallback((studentId, pin) => {
    setStudents((prev) => prev.map((s) => (s.id === studentId ? pinPlayerMoment(s, pin) : s)));
  }, []);

  const sceneStageShared = {
    scrollback: sceneScrollback,
    onScrollbackPush: pushSceneScrollback,
    instantText,
  };

  const openStudentDetail=(studentId, opts = {})=>{
    const s=students.find(st=>st.id===studentId);
    if(!s) return;
    if(openOriginFor(s)) return;
    setDossierOpen(!!opts.dossier);
    setSelectedId(s.id);
    setView('student');
  };

  const commitOriginPick=(studentId,originId)=>{
    const live=students.find(st=>st.id===studentId);
    setStudents(prev=>prev.map(st=>st.id===studentId?applyOriginPick(st,originId,week):st));
    setOriginPickState(null);
    if(live){
      setSelectedId(live.id);
      setView('student');
      const preview=renderOriginStirring({...live,origin:originId},week);
      push(`✦ ${live.name}'s origin is locked.${preview?` ${preview}`:''}`);
    }
  };

  const openWeighIn=(s)=>{ if(!s||openOriginFor(s)) return; setWeighInState({student:s,phase:"scene"}); };

  // ── V2.0 HANDLERS ───────────────────────────────────────────
  const applyEchoCapture=(student, runCapture)=>{
    setV2State(prev=>{
      const { v2State, didCapture }=runCapture(prev||createInitialV2State());
      if(didCapture&&student){
        const prose=renderEchoCapture(createContext({ subject: student, week }));
        const snippet=prose?.trim().slice(0,160);
        if(snippet) setTimeout(()=>push(`📜 Echo captured — ${snippet}`),115);
      }
      return v2State;
    });
  };
  const openEmbodiment=(s)=>{
    if(!s) return;
    setEmbodimentStudent(s);
  };
  const appendEmbodimentLog=(line)=>{
    if(!line) return;
    setV2State(prev=>appendEmbodimentWalkLog(prev,line));
  };
  const runEmbodimentStart=(studentId)=>{
    const s=students.find(st=>st.id===studentId);
    const result=handleEmbodimentStart(s,{ownedSkills,ownedHallSkills,embodimentState:v2.embodiment,week,v2State:v2});
    if(!result.ok){ push(`⚠️ ${result.reason}`); return; }
    if(ap<result.apCost){ push(`⚠️ Need ${result.apCost} AP`); return; }
    setAp(a=>a-result.apCost);
    setV2State(result.v2State);
    push(`🌒 You slip inside ${s.name}.`);
  };
  const runEmbodimentAction=(act,s)=>{
    const result=handleEmbodimentAction(act,s,v2);
    setV2State(result.v2State);
    setStudents(prev=>prev.map(st=>{
      if(st.id!==s.id) return st;
      return {
        ...st,
        consumedCalories:(st.consumedCalories||0)+(result.calories||0),
        fullness:Math.min((st.stomachCapacity||100),(st.fullness||0)+(result.fullness||0)),
        relationship:Math.min(100,(st.relationship||0)+(result.rel||0)),
        corruption:Math.min(100,(st.corruption||0)+(result.corruption||0)),
      };
    }));
    if(result.scrutiny) addScrutiny(result.scrutiny);
    push(`🌒 ${act.label} — warmth spreads through ${s.name}.`);
  };
  const runEmbodimentRelease=()=>{
    const activeId=v2.embodiment?.activeStudentId;
    const active=students.find(st=>st.id===activeId);
    const result=handleEmbodimentRelease(v2,week);
    setV2State(result.v2State);
    if(result.echoStudentId!=null){
      setStudents(prev=>prev.map(st=>st.id===result.echoStudentId?{
        ...st,
        embodimentEchoWeek:result.echoDigestWeek,
      }:st));
    }
    push(`🌒 You return to your RA desk.${active?' Her appetite will echo into next week.':''}`);
  };
  const runEmbodiedMove=(toId)=>{
    const activeId=v2.embodiment?.activeStudentId;
    const s=students.find(st=>st.id===activeId);
    if(!s) return null;
    const fromId=v2.embodiment?.at||'dorms';
    const moveResult=handleEmbodiedMove(s,fromId,toId,v2,week,{students,rng:Math.random});
    if(!moveResult.ok) return { error: moveResult.reason };
    setV2State(moveResult.v2State);
    const arriveText=renderEmbodiedArrive(s,toId,week);
    return { event: moveResult.event, arriveText };
  };
  const runEmbodiedEventResolve=(event)=>{
    const activeId=v2.embodiment?.activeStudentId;
    const s=students.find(st=>st.id===activeId);
    if(!s||!event) return;
    const result=handleEmbodiedEventResolve(s,event,v2,{students,rng:Math.random});
    setV2State(result.v2State);
    setStudents(prev=>{
      const byId=new Map(result.students.map(st=>[st.id,st]));
      return prev.map(st=>byId.get(st.id)||st).map(st=>{
        if(st.id!==s.id) return st;
        return result.student;
      });
    });
    if(result.scrutiny) addScrutiny(result.scrutiny);
    const witnessWorthy=result.scrutiny>=2||['bully_forcefeed','clothes_burst','stuck_door','gossip_whisper'].includes(event.id);
    if(witnessWorthy){
      setCampusState(prev=>appendWitnessLog(prev,{
        week,
        eventType:'embodiment',
        studentName:s.name,
        nodeId:event.nodeId||v2.embodiment?.at,
        witnessName:event.witnessStudent?.name||event.witnessName,
        label:event.label,
      }));
    }
    const snippet=event.prose?.trim().slice(0,140);
    if(snippet) push(`🌒 ${s.name} — ${event.label}. ${snippet}${snippet.length>=140?'…':''}`);
    if(result.trustGrants?.length){
      const names=result.trustGrants.map(g=>students.find(st=>st.id===g.studentId)?.name).filter(Boolean);
      if(names.length) push(`🌒 Campus gossip reaches ${names.join(', ')} — residents trust you more.`);
    }
  };
  const runResonanceLink=(aId,bId)=>{
    const result=handleResonanceLink(aId,bId,students,v2,ownedSkills,ownedHallSkills||{});
    if(!result.ok){ push(`⚠️ ${result.reason}`); return; }
    if(ap<result.apCost){ push(`⚠️ Need ${result.apCost} AP`); return; }
    setAp(a=>a-result.apCost);
    setV2State(result.v2State);
    if(result.relPatches?.length){
      setStudents(prev=>prev.map(st=>{
        const p=result.relPatches.find(x=>x.id===st.id);
        if(!p) return st;
        return {...st,relationship:Math.max(0,Math.min(100,(st.relationship||0)+(p.relDelta||0)))};
      }));
    }
    const a=students.find(s=>s.id===aId), b=students.find(s=>s.id===bId);
    const linkCtx=createContext({ subject:a, ref:b });
    const linkProse=renderResonanceLink(linkCtx);
    push(`🔗 ${a?.name} ↔ ${b?.name} — appetites linked.${linkProse?` ${linkProse.slice(0,100)}`:''}`);
  };
  const runFeastRitual=(ritualId,studentIds,text)=>{
    const result=handleRitual(ritualId,studentIds,{students,ownedSkills,ownedHallSkills:ownedHallSkills||{},week,reachLevel,v2State:v2});
    if(!result.ok){ push(`⚠️ ${result.reason}`); return; }
    if(ap<result.apCost){ push(`⚠️ Need ${result.apCost} AP`); return; }
    setAp(a=>a-result.apCost);
    setV2State(result.v2State);
    setStudents(prev=>prev.map(st=>{
      const eff=result.effects.find(e=>e.studentId===st.id);
      if(!eff) return st;
      return {
        ...st,
        consumedCalories:(st.consumedCalories||0)+eff.calories,
        relationship:Math.min(100,(st.relationship||0)+eff.rel),
        corruption:Math.min(100,(st.corruption||0)+eff.corruption),
      };
    }));
    push(`🕯️ Feast ritual complete.${text?` ${text.slice(0,120)}...`:''}`);
    if(result.hallCred){
      setHallCred(f=>(f||0)+result.hallCred);
      push(`✨ Floor feast — hall cred +${result.hallCred}.`);
    }
    setFeastRitualOpen(false);
  };
  const runDream=(s,scenario,choice,wakeText)=>{
    const manual=!dreamPresetScenario;
    if(manual){
      const check=canTriggerDream(s,{ownedSkills,ownedHallSkills:ownedHallSkills||{},dreamsState:v2.dreams,week,manual:true});
      if(!check.ok){ push(`⚠️ ${check.reason}`); setDreamStudent(null); return; }
      if(ap<(check.apCost||0)){ push(`⚠️ Need ${check.apCost} AP`); setDreamStudent(null); return; }
      setAp(a=>a-(check.apCost||0));
    }
    const lucid=v2.dreams?.lucidUnlocked;
    const isLucidSteer=choice.id?.startsWith('lucid_')||choice.lucidOnly;
    const mult=lucid&&!isLucidSteer?1.2:1;
    const boostedChoice={
      ...choice,
      calories:Math.round((choice.calories||0)*mult),
      rel:Math.round((choice.rel||0)*mult),
      corruption:Math.round((choice.corruption||0)*mult),
    };
    const result=handleDreamChoice(scenario,boostedChoice,s,v2,week);
    setV2State(result.v2State);
    setStudents(prev=>prev.map(st=>{
      if(st.id!==s.id) return st;
      return {
        ...st,
        consumedCalories:(st.consumedCalories||0)+(result.calories||0),
        relationship:Math.max(0,Math.min(100,(st.relationship||0)+(result.rel||0))),
        corruption:Math.min(100,(st.corruption||0)+(result.corruption||0)),
      };
    }));
    push(`💤 ${s.name} wakes from the dream.${wakeText?` ${wakeText.slice(0,80)}`:''}${lucid?' (lucid)':''}`);
    setDreamStudent(null);
    setDreamPresetScenario(null);
  };
  const runEchoResonate=(echo)=>{
    const result=handleEchoResonate(echo.id,v2,ownedSkills,ownedHallSkills||{});
    if(!result.ok){ push(`⚠️ ${result.reason}`); return; }
    if(ap<result.apCost){ push(`⚠️ Need ${result.apCost} AP`); return; }
    setAp(a=>a-result.apCost);
    setV2State(result.v2State);
    const s=students.find(st=>st.id===result.moment?.studentId);
    if(s) setStudents(prev=>prev.map(st=>st.id===s.id?{...st,gainMultiplier:(st.gainMultiplier||1)*1.05}:st));
    push(`📜 Echo resonated — ${s?.name||'her'} growth deepens.`);
    setEchoReplay(null);
  };
  const openEchoReplay=(echo)=>{
    const result=handleEchoReplay(v2,echo.id);
    setV2State(result.v2State);
    const updated=result.v2State.echoes?.moments?.find(m=>m.id===echo.id)||echo;
    const depth=echoDepthTier(updated.replayCount||0);
    const s=students.find(st=>st.id===echo.studentId)||sel;
    const ctx=createContext({ subject: s });
    const prose=renderEchoReplay(echo.type,depth,ctx);
    setEchoReplay({ echo: updated, prose, depth, student: s });
    push(`📜 Echo replayed — the memory deepens.`);
  };

  const startIntimacyScene=(s,sceneId)=>{
    const def=INTIMACY_SCENES.find(sc=>sc.id===sceneId)||INTIMACY_CONTEXTUAL[sceneId];
    if(!def) return;
    const cost=def.apCost||0;
    if(ap<cost){push(`⚠️ Need ${cost} AP.`);return;}
    if(cost>0) setAp(a=>a-cost);
    const tier=getTier(s.relationship).id;
    setIntimacyEventState({studentId:s.id,sceneId,tier,week,phaseIdx:0,history:[],logLines:[],gainAccum:0,relAccum:0,done:false,endingText:null,gainBonus:0,relBonus:0});
    setIntimacySceneSelector(null);
  };

  const makeIntimacyChoice=(choiceId)=>{
    if(!intimacyEventState) return;
    const {studentId,sceneId,phaseIdx,history,logLines,gainAccum,relAccum,week:sceneWeek}=intimacyEventState;
    const sceneWeekNum=sceneWeek??week;
    const s=students.find(st=>st.id===studentId); if(!s) return;
    const def=INTIMACY_SCENES.find(sc=>sc.id===sceneId)||INTIMACY_CONTEXTUAL[sceneId]; if(!def) return;
    const phase=def.phases[phaseIdx]; if(!phase) return;
    const choice=phase.choices.find(c=>c.id===choiceId); if(!choice) return;
    // Pin blackout — at settled size, letting her mass come over you is a gamble.
    // On a hit she pins you, you black out, and the week ends where you lie.
    if(choiceCanPin(sceneId,choiceId,s) && Math.random()<pinBlackoutChance(s)){
      const passGain=choice.lbs||0;
      const passRel=(choice.rel||0)+PIN_PASSOUT_REL_BONUS;
      setStudents(prev=>prev.map(st=>st.id!==studentId?st:processStudentGain(st,passGain,passRel)));
      push(`🕳️ ${s.name} pins you under her — the room goes dark. The week ends where you lie.`);
      setIntimacyEventState(prev=>({...prev,done:true,blackout:true,endingText:renderIntimacyPassout(s,sceneWeekNum),logLines:[...logLines,renderIntimacyChoice(sceneId,choiceId,s,sceneWeekNum)]}));
      return;
    }
    const newHistory=[...history,choiceId,...(choice.flag?[choice.flag]:[])];
    const newLog=[...logLines,renderIntimacyChoice(sceneId,choiceId,s,sceneWeekNum)];
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
      let endingIdx=def.endings.findIndex(e=>evalIntimacyEndingCondition(e.conditionSrc,newHistory));
      if(endingIdx<0) endingIdx=def.endings.length-1;
      const ending=def.endings[endingIdx];
      const totalGain=newGain+ending.gainBonus;
      const totalRel=newRel+ending.relBonus;
      setStudents(prev=>prev.map(st=>{
        if(st.id!==studentId) return st;
        return processStudentGain(st,totalGain>0?totalGain:0,totalRel);
      }));
      if(totalGain>0) push(`💜 ${s.name} — intimacy: +${totalGain} lbs · +${totalRel} rel`);
      else push(`💜 ${s.name} — intimacy: +${totalRel} rel`);
      setIntimacyEventState(prev=>({...prev,phaseIdx:nextPhase,history:newHistory,logLines:newLog,gainAccum:newGain,relAccum:newRel,done:true,endingText:renderIntimacyEnding(sceneId,endingIdx,s,sceneWeekNum),gainBonus:ending.gainBonus,relBonus:ending.relBonus}));
    } else {
      setIntimacyEventState(prev=>({...prev,phaseIdx:nextPhase,history:newHistory,logLines:newLog,gainAccum:newGain,relAccum:newRel}));
    }
  };

  const closeIntimacyEvent=()=>{
    const wasBlackout=intimacyEventState?.blackout;
    setIntimacyEventState(null);
    if(wasBlackout){ setAp(0); advanceWeek(); }
  };

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


  const startFloorCheckIn=()=>{
    playHallPassSound('click', soundEnabled);
    const scenes=generateFloorCheckIn(students.filter(studentReceivesPassiveGain),week);
    if(!scenes.length){advanceWeek();return;}
    setFloorCheckIn({scenes,sceneIdx:0,outcomes:[],pendingResult:null});
  };

  const makeChoice=(choiceIdx)=>{
    if(!floorCheckIn)return;
    playHallPassSound('click', soundEnabled);
    const{scenes,sceneIdx}=floorCheckIn;
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
    }else if(type==="hall"){
      gainAmt=rnd(choice.effect.gain[0],choice.effect.gain[1]);
      newStudents=newStudents.map(s=>studentReceivesPassiveGain(s)?processStudentGain(s,gainAmt,0):s);
      targetName="the hall";
    }
    const evs=collectEvents(newStudents);
    setStudents(newStudents);
    if(evs.length){
      setGlobalStats(g=>({...g,narrativeCount:g.narrativeCount+evs.length}));
      setEventQueue(prev=>[...prev,...evs]);
    }
    const resultText=renderFloorChoiceResult(scene, choiceIdx, student || newStudents[0], week, pharmacistTextOpts(pharmacistState, week));
    const outcome={sceneTitle:scene.title,choice:choice.label,result:resultText,gain:gainAmt,target:targetName};
    setFloorCheckIn(prev=>({...prev,pendingResult:outcome}));
  };

  const confirmResult=()=>{
    playHallPassSound('confirm', soundEnabled);
    setFloorCheckIn(prev=>({
      ...prev,
      sceneIdx:prev.sceneIdx+1,
      outcomes:[...prev.outcomes,prev.pendingResult],
      pendingResult:null,
    }));
  };

  const finishFloorCheckIn=()=>{
    playHallPassSound('confirm', soundEnabled);
    const{outcomes}=floorCheckIn;
    setSemesterData(prev=>({
      weeksCompleted:prev.weeksCompleted+1,
      classHistory:[...prev.classHistory,{week,outcomes}],
    }));
    setFloorCheckIn(null);
    advanceWeek();
  };

  const executeFloorFeed=(action,compoundId)=>{
    const actionCost=getHallActionCost(action,ownedHallSkills||{});
    setAp(a=>a-actionCost);
    if(action.id==='refeast_ritual'){
      setOpposition(prev=>({
        ...prev,
        supernatural:{
          ...prev.supernatural,
          scarcityPressure:Math.max(0,(prev.supernatural?.scarcityPressure||0)-15),
          curseQueue:[],
          famineWeek:false,
        },
      }));
      let fedCount=0,refused=0;
      let surgeStudent=null;
      const updated=students.map(s=>{
        let ns=s;
        if(s.supernaturalForm){
          const beforePct=(s.memoryMass??s.lbs)>0?Math.round((s.lbs/(s.memoryMass??s.lbs))*100):0;
          ns=applyRefeedSurge(ns,rnd(10,16));
          const afterPct=(ns.memoryMass??ns.lbs)>0?Math.round((ns.lbs/(ns.memoryMass??ns.lbs))*100):0;
          if(!surgeStudent&&(beforePct<50&&afterPct>=50)) surgeStudent=ns;
        }
        if(!studentReceivesPassiveGain(ns)) return ns;
        if(ns.lockState==='locked') return {...ns,lbs:ns.lbs+1,willpowerTaps:(ns.willpowerTaps||0)+1};
        const cals=rnd(action.cal[0],action.cal[1]);
        const fed=feedStudentCalories(ns,cals,action.full,2,'Refeast',{});
        if(!fed){refused++;return ns;}
        fedCount++;
        return {...fed,oppositionBlockedGain:false};
      });
      push(`👻 Refeast Ritual: ${fedCount} residents refed${refused?` · ${refused} too full`:""} — scarcity pressure eases.`);
      setStudents(updated);
      if(surgeStudent) setRefeedSurgeState({studentId:surgeStudent.id,taps:0,tapsNeeded:3});
      const evs=collectEvents(updated);
      if(evs.length){
        setGlobalStats(g=>({...g,narrativeCount:g.narrativeCount+evs.length}));
        setEventQueue(prev=>[...prev,...evs]);
      }
      return;
    }
    let refusals=0,fedCount=0,totalCals=0;
    const compoundLabel=compoundId?COMPOUNDS[compoundId]?.label:null;
    const updated=students.map(s=>{
      if(!studentReceivesPassiveGain(s)) return s;
      if(s.lockState==='locked') return {...s,lbs:s.lbs+1,willpowerTaps:(s.willpowerTaps||0)+1};
      const cals=rnd(action.cal[0],action.cal[1]);
      const fed=feedStudentCalories(s,cals,action.full,1,'',compoundId?{compoundId}:{});
      if(!fed){refusals++;return s;}
      fedCount++;totalCals+=cals;
      return fed;
    });
    push(`🎉 ${action.label}: ${fedCount} residents dug in (~${Math.round(totalCals/Math.max(1,fedCount)).toLocaleString()} cal each)${refusals?` · ${refusals} too full to join`:""}${compoundLabel?` · laced with ${compoundLabel}`:""}.`);
    const evs=collectEvents(updated);
    setStudents(updated);
    if(evs.length){
      setGlobalStats(g=>({...g,narrativeCount:g.narrativeCount+evs.length}));
      setEventQueue(prev=>[...prev,...evs]);
    }
  };

  const doSingle=(action,s)=>{
    if(ap<action.cost){push("⚠️ Not enough AP!");return;}
    if(action.id==="restaurant"){ guardHungerInterrupt(()=>startDinner(s),{type:'dinner',studentId:s.id}); return; }
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

  const doFloorAction=(action)=>{
    trackAction(`doFloorAction:${action.id}`);
    const actionCost=getHallActionCost(action,ownedHallSkills||{});
    if(ap<actionCost){push("⚠️ Not enough AP!");return;}
    if(scrutinyBlocksClassFeast(adminScrutiny,action.id)){
      push('⚠️ Administration review — public hall feasts are suspended until scrutiny eases.');
      return;
    }
    if(action.id==='refeast_ritual'&&!opposition?.supernatural?.actTriggered){
      push('⚠️ Refeast Ritual requires the Supernatural Act.');
      return;
    }
    if(action.id==="group_dinner"){
      setGroupDinnerPicker({count:2,selected:[]});
      return;
    }
    guardHungerInterrupt(()=>{
      const compounds=getStockedCompounds();
      if(compounds.length>0){
        setCompoundFeedPicker({kind:'hall',action});
        return;
      }
      executeFloorFeed(action,null);
    });
  };

  const openTalk=(s)=>{
    if(!s) return;
    if(openOriginFor(s)) return;
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

  const armMesmerizingPresence=(studentId)=>{
    const name=students.find(s=>s.id===studentId)?.name||"her";
    setWeeklyArms(prev=>{
      const togglingOff=prev.mesmerizingStudentId===studentId;
      return{
        devouringStudentId:prev.devouringStudentId,
        mesmerizingStudentId:togglingOff?null:studentId,
        devouringConsumed:prev.devouringConsumed,
      };
    });
    const togglingOff=weeklyArms.mesmerizingStudentId===studentId;
    push(togglingOff?`🌀 Mesmerizing Aura disarmed on ${name}.`:`🌀 Mesmerizing Aura armed on ${name} — +35% to her rolls this week.`);
  };

  const applyTalkEffect=(effect,meta={})=>{
    if(!talkStudentId) return;
    gainFavor('talk');
    const applySuggest=!!effect?.applySuggestDebuff||meta.topicId==='suggest_indulgence';
    if(applySuggest){
      setStudents(prev=>prev.map(x=>x.id===talkStudentId?{...x,suggestDebuffWeek:week}:x));
      push(`🗣 Suggestion planted — ${students.find(s=>s.id===talkStudentId)?.name||'she'} resists less this week.`);
    }
    if(!effect) return;
    // Body compliments that land wrong (she's not pretty fat yet AND not close
    // to you) are a negative interaction and draw scrutiny.
    if(meta.topicId==='compliment'){
      const target=students.find(x=>x.id===talkStudentId);
      if(target&&isBodyComplimentUnwelcome(target)){
        setStudents(prev=>prev.map(x=>x.id===talkStudentId
          ?{...x,relationship:Math.max(0,(x.relationship||0)-COMPLIMENT_BACKFIRE_REL),mood:"stressed",
             discontent:bumpDiscontent(x.discontent,grievanceGain(x,'creeped')),
             memories:appendMemory(x.memories,'creeped',week)}
          :x));
        addScrutiny(COMPLIMENT_BACKFIRE_SCRUTINY);
        push(`😬 ${target.name} bristles — unsolicited and unwelcome. −${COMPLIMENT_BACKFIRE_REL} relationship · scrutiny +${COMPLIMENT_BACKFIRE_SCRUTINY}.`);
        return;
      }
    }
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
          if(opposition?.supernatural?.actTriggered){
            const floorLbs=students.reduce((a,s)=>a+(s.lbs-s.startLbs),0);
            const sl=1+Math.floor(Math.max(0,Math.round(floorLbs))/REACH_XP_PER_LEVEL);
            setOpposition(prev=>devourScarcityDamage(prev,sl));
            push('👁 Devour tears a hole in Scarcity\'s counting — pressure eases.');
          }
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
      // Talking to her is attention — it cools discontent.
      if((ns.discontent||0)>0) ns.discontent=Math.max(0,ns.discontent-DISCONTENT_EASE_TALK);
      return ns;
    }));
  };

  // ── Confrontation resolution ─────────────────────────────────
  const confrontApologize=()=>{
    if(!confrontation) return;
    const {studentId,winBack}=confrontation;
    setStudents(prev=>prev.map(x=>x.id===studentId
      ?{...x,discontent:Math.min(x.discontent||0,AMENDS_FLOOR),mood:"focused",withdrawn:winBack?false:x.withdrawn}
      :x));
    const nm=students.find(s=>s.id===studentId)?.name||'She';
    push(winBack?`🕊 ${nm} comes back — wary, but back. The air clears a little.`:`🕊 You hear ${nm} out and own it. She's not over it, but she stays.`);
    setConfrontation(null);
  };
  const confrontGift=()=>{
    if(!confrontation) return;
    if(money<GIFT_COST){ push(`⚠️ Need ${formatMoney(GIFT_COST)} for a peace offering.`); return; }
    const {studentId,winBack}=confrontation;
    setMoney(m=>m-GIFT_COST);
    setStudents(prev=>prev.map(x=>x.id===studentId
      ?{...x,discontent:Math.min(x.discontent||0,GIFT_FLOOR),mood:"happy",withdrawn:winBack?false:x.withdrawn}
      :x));
    const nm=students.find(s=>s.id===studentId)?.name||'She';
    push(winBack?`🎁 A peace offering for ${nm} — she comes back, mood softened.`:`🎁 A peace offering for ${nm}. It goes a long way; she softens.`);
    setConfrontation(null);
  };
  const confrontStandFirm=()=>{
    if(!confrontation) return;
    const {studentId}=confrontation;
    let witnesses=0;
    setStudents(prev=>prev.map(x=>{
      if(x.id===studentId) return {...x,withdrawn:true,mood:"stressed"};
      // The rest of the room watches one of their own get driven out.
      if(x.hidden||x.withdrawn) return x;
      witnesses++;
      return {...x,discontent:bumpDiscontent(x.discontent,DISCONTENT_RIPPLE)};
    }));
    const nm=students.find(s=>s.id===studentId)?.name||'She';
    push(`🚪 ${nm} walks off your hall. She won't engage until you make it right.`);
    if(witnesses>0) setTimeout(()=>push(`😶 The room goes quiet — the others watched her go, and it sits with them.`),180);
    setConfrontation(null);
  };
  const openAmends=(studentId)=>{
    const s=students.find(x=>x.id===studentId);
    if(!s) return;
    const grievance=dominantGrievance(s);
    setConfrontation({
      studentId:s.id,name:s.name,lbs:s.lbs,grievance,winBack:true,withdrawn:!!s.withdrawn,
      prose:renderConfront(s,week,{grievanceType:grievance||undefined,winBack:true}),
    });
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
  const triggerDinnerEnd=(s,finalFullness,cap,totalGain,relBonus)=>{
    const narrative=renderDinnerDepth(s, week, pickStudentMemory(s,week)??{}) || renderDinnerEnding(s,finalFullness,cap,week);
    const textPatch=dinnerEvent?.textSession?.weekUsed?weekUsedToPatch(dinnerEvent.textSession.weekUsed):null;
    guardHungerInterrupt(()=>{
      setAp(a=>a-2);
      push(`✅ Dinner with ${s.name} complete. +${totalGain.toLocaleString()} cal packed in (≈${Math.round(calsToLbs(totalGain))} lbs once digested) · +${relBonus} relationship.`);
      setStudents(prev=>prev.map(st=>{
        if(st.id!==s.id) return st;
        return {...st,relationship:Math.max(0,Math.min(100,st.relationship+relBonus)),...(textPatch||{})};
      }));
      const evs=collectEvents([s]);
      if(evs.length){setGlobalStats(g=>({...g,narrativeCount:g.narrativeCount+evs.length}));setEventQueue(prev=>[...prev,...evs]);}
      setDinnerEvent(null);
      setDinnerEndPopup({ student:s, finalFullness, maxFullness:cap, totalGain, narrative });
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
    gainFavor('dinner');
    const sessionStartCalories=s.consumedCalories||0;
    const pendingHungerResolve=pendingDinnerHungerResolveRef.current===s.id;
    if(pendingHungerResolve) pendingDinnerHungerResolveRef.current=null;
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
      setDinnerEvent({student:s,phase:"dishes",venue:homeVenue,dishes:[],conversationUsed:[],totalGain:0,offenseLevel:0,sessionStartCalories,sessionPace:'steady',pendingHungerResolve,textSession:{sessionUsed:createSessionUsed(),weekUsed:weekUsedFromStudent(s)}});
      setDinnerLog([`You bring dinner to ${s.name}. ${venueDesc}`]);
      addScrutiny(2);
      push(`🏠 Visiting ${s.name}.`);
      return;
    }
    setDinnerEvent({ student:s, phase:"venue", venue:null, dishes:[], conversationUsed:[], totalGain:0, offenseLevel:0, sessionStartCalories, sessionPace:'steady', pendingHungerResolve, textSession:{sessionUsed:createSessionUsed(),weekUsed:weekUsedFromStudent(s)} });
    setDinnerLog([]);
    addScrutiny(2);
  };

  const chooseDinnerVenue=(venue)=>{
    setDinnerEvent(prev=>({...prev, venue, phase:"dishes"}));
    setDinnerLog(dl=>[...dl, [`You arrive at ${venue.label}. ${venue.desc}`, renderDinnerDepth(dinnerEvent.student, week, { globals: { venueId: venue.id }, ...(pickStudentMemory(dinnerEvent.student,week)??{}) })].filter(Boolean).join(' ')]);
    push(`🍽️ Dinner with ${dinnerEvent.student.name} at ${venue.label}.`);
  };

  const orderDish=(dish,opts={})=>{
    if((dinnerEvent.dishes||[]).includes(dish.id)&&!opts.forcePush) return;
    const s=students.find(st=>st.id===dinnerEvent.student.id)||dinnerEvent.student;
    const capOpts=buildSessionCapOpts(s,{softStartBonus:softStartBonus(ownedSkills,getStage(s.lbs).id)});
    const result=runVenueFeedAttempt({
      student:s,
      source:dish,
      feedStudentCalories,
      sessionCtx:{
        sessionStartCalories:dinnerEvent.sessionStartCalories||0,
        sessionPace:dinnerEvent.sessionPace||'steady',
        pendingHungerResolve:!!dinnerEvent.pendingHungerResolve,
      },
      gameCtx:{
        skillGainMult,
        raGainMult,
        softStartBonus:capOpts.softStartBonus,
        generousTrait:hasTrait('generous'),
        context:'dinner',
        forcePush:!!opts.forcePush,
        gainLbs:rnd(dish.gain[0],dish.gain[1]),
      },
    });
    if(!result.ok){
      setDinnerLog(dl=>[...dl,`🚫 ${s.name} refuses another bite of ${result.payload.label}.`]);
      return;
    }
    const { fed, payload, cap, prevFullness, newFullness, sessionCals, overfillEnd }=result;
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:fed));
    const newDishes=opts.forcePush?[...(dinnerEvent.dishes||[])]:[...(dinnerEvent.dishes||[]),dish.id];
    const eatOpts={
      mealType:'campus_meal',
      locale:dinnerVenueToLocale(dinnerEvent.venue?.id),
      sessionUsed:dinnerEvent.textSession?.sessionUsed,
      weekUsed:dinnerEvent.textSession?.weekUsed,
    };
    const eatLine=isSlenderEligible(fed)
      ?renderSlenderEatBeat(fed,week,eatOpts)
      :renderEatScene(fed,week,eatOpts);
    push(`🍴 ${s.name}: ${payload.label} (+${payload.calories.toLocaleString()} cal)`);
    if(overfillEnd){
      const endMsg=renderDinnerOverfill(fed, week);
      const dishDesc=renderDinnerDishDesc(dish, fed, week);
      setDinnerLog(dl=>[...dl,`🍴 ${payload.label} arrives. ${dishDesc} (+${payload.calories.toLocaleString()} cal)`,`😵 ${endMsg}`]);
      setTimeout(()=>triggerDinnerEnd(fed,newFullness,cap,sessionCals,6),1000);
      return;
    }
    const firstHit=result.firstHitCapacity;
    const fullMsg=firstHit?" — she's completely satisfied. The evening could end here..."
      :result.pastCapacity?" — she's past full, but she doesn't stop."
      :result.almostFull?" — getting full..."
      :"";
    setDinnerEvent(prev=>({
      ...prev,
      dishes:newDishes,
      totalGain:sessionCals,
      student:fed,
      pendingHungerResolve:result.clearedHungerResolve?false:prev.pendingHungerResolve,
    }));
    setDinnerLog(dl=>[...dl,
      `🍴 ${payload.label} arrives. ${renderDinnerDishDesc(dish, fed, week)} (+${payload.calories.toLocaleString()} cal)${fullMsg}`,
      ...(eatLine?[`💬 ${eatLine}`]:[]),
    ]);
  };

  const sharePantryItemAtDinner=(itemId)=>{
    if(!dinnerEvent) return;
    if((inventory[itemId]||0)<=0){push('⚠️ None left in the pantry.');return;}
    const item=ITEMS.find(i=>i.id===itemId);
    if(!item) return;
    const s=students.find(st=>st.id===dinnerEvent.student.id)||dinnerEvent.student;
    const capOpts=buildSessionCapOpts(s,{softStartBonus:softStartBonus(ownedSkills,getStage(s.lbs).id)});
    const result=runVenueFeedAttempt({
      student:s,
      source:{ id:item.id, itemId:item.id, label:item.label },
      feedStudentCalories,
      sessionCtx:{
        sessionStartCalories:dinnerEvent.sessionStartCalories||0,
        sessionPace:dinnerEvent.sessionPace||'steady',
        pendingHungerResolve:!!dinnerEvent.pendingHungerResolve,
      },
      gameCtx:{
        skillGainMult,
        raGainMult,
        softStartBonus:capOpts.softStartBonus,
        generousTrait:hasTrait('generous'),
        context:'dinner',
        extraRel:2,
      },
    });
    if(!result.ok){
      setDinnerLog(dl=>[...dl,`🚫 ${s.name} won't take the ${item.label.toLowerCase()} right now.`]);
      return;
    }
    setInventory(prev=>({...prev,[itemId]:Math.max(0,(prev[itemId]||0)-1)}));
    const { fed, cap, newFullness, sessionCals, prevFullness, overfillEnd }=result;
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:fed));
    const line=ITEM_USE_LINES[rnd(0,ITEM_USE_LINES.length-1)](fed,item);
    push(`🎒 ${item.label} shared at dinner.`);
    if(overfillEnd){
      setDinnerLog(dl=>[...dl,`🎒 ${line}`,`😵 ${renderDinnerOverfill(fed, week)}`]);
      setTimeout(()=>triggerDinnerEnd(fed,newFullness,cap,sessionCals,6),1000);
      return;
    }
    const fullMsg=newFullness>=cap&&prevFullness<cap?" — completely full."
      :newFullness>cap?" — past full.":"";
    setDinnerEvent(prev=>({
      ...prev,
      totalGain:sessionCals,
      student:fed,
      pendingHungerResolve:result.clearedHungerResolve?false:prev.pendingHungerResolve,
    }));
    setDinnerLog(dl=>[...dl,`🎒 ${line}${fullMsg}`]);
  };

  const callWaiter=()=>{
    const s=dinnerEvent.student;
    const venueId=dinnerEvent.venue.id;
    const desc=renderDinnerWaiter(venueId, s, week);
    setDinnerLog(dl=>[...dl,`🫆 ${desc}`]);
    setDinnerEvent(prev=>({...prev,dishes:[]}));
  };

  const useDinnerConversation=(conv)=>{
    if(dinnerEvent.conversationUsed.includes(conv.id)) return;
    const s=students.find(st=>st.id===dinnerEvent.student.id)||dinnerEvent.student;
    const gainBonus=rnd(conv.gainBonus[0],conv.gainBonus[1]);
    const scaledBonus=Math.round(gainBonus*GAIN_CONFIG.calsPerLb*skillGainMult*(s.gainMultiplier||1));
    const convText=renderDinnerConversation(conv.id, s, week);
    const fullnessChange=conv.fullnessEffect||0;
    const feedMods=getFeedingModifiers(s,{generousTrait:hasTrait('generous'),context:'dinner'});
    let fed=s;
    if(scaledBonus>0||fullnessChange!==0){
      const bonusFed=feedStudentCalories(s,scaledBonus,Math.max(0,fullnessChange),conv.relBonus||0,conv.label,{
        refusalBonus:feedMods.refusalBonus,
        fullnessMult:feedMods.fullnessMult,
      });
      if(bonusFed){
        fed=bonusFed;
        setStudents(prev=>prev.map(st=>st.id!==s.id?st:fed));
      }
    } else if(conv.relBonus){
      setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,relationship:Math.min(100,st.relationship+(conv.relBonus||0))}));
    }
    const newFullness=fed.fullness||0;
    const stageId=getStage(fed.lbs).id;
    const cap=getFeedCapacity(fed,{softStartBonus:softStartBonus(ownedSkills,stageId)});
    const sessionCals=getSessionCaloriesFed(fed,dinnerEvent.sessionStartCalories||0);
    setDinnerLog(dl=>[...dl,`💬 ${convText}${scaledBonus>0?` (+${scaledBonus.toLocaleString()} cal)`:""}`]);
    push(`💬 Dinner conversation: ${conv.label}`);
    const newOffense=(dinnerEvent.offenseLevel||0)+(conv.offenseRisk||0);
    setDinnerEvent(prev=>({...prev,conversationUsed:[...prev.conversationUsed,conv.id],totalGain:sessionCals,offenseLevel:newOffense,student:fed}));
    if(newOffense>=dinnerConversationStormThreshold(fed)){
      setTimeout(()=>{
        setDinnerLog(dl=>[...dl,`😤 ${s.name} sets her napkin down. "I think I should head home." She leaves.`]);
        triggerDinnerEnd(fed,newFullness,cap,sessionCals,-15);
      },800);
    }
  };

  const endEvening=()=>{
    const s=students.find(st=>st.id===dinnerEvent.student.id)||dinnerEvent.student;
    const stageId=getStage(s.lbs).id;
    const cap=getFeedCapacity(s,{softStartBonus:softStartBonus(ownedSkills,stageId)});
    const sessionCals=getSessionCaloriesFed(s,dinnerEvent.sessionStartCalories||0);
    triggerDinnerEnd(s,s.fullness||0,cap,sessionCals,9);
  };

  // ── GROUP DINNER ─────────────────────────────────────────────
  const startGroupDinner=(studentList)=>{
    const immobile=studentList.find(s=>getStage(s.lbs).id>=10||!!s.ascensionPath);
    if(immobile){push(`⚠️ ${immobile.name} can't leave her location. Visit her individually to bring food.`);return;}
    const apCost=studentList.length>=3?3:3;
    if(ap<apCost){push(`⚠️ Need ${apCost} AP for a group dinner.`);return;}
    guardHungerInterrupt(()=>{
      const gStudents=studentList.map(s=>({
        id:s.id, dishes:[], totalGain:0, sessionStartCalories:s.consumedCalories||0,
      }));
      setGroupDinnerEvent({ students:gStudents, phase:"venue", venue:null, conversationUsed:[], reactionLevels:{}, sessionPace:'steady' });
      setGroupDinnerLog([]);
      addScrutiny(5);
    });
  };

  const chooseGroupVenue=(venue)=>{
    setGroupDinnerEvent(prev=>({...prev,venue,phase:"dishes"}));
    const names=groupDinnerEvent.students.map(gs=>students.find(st=>st.id===gs.id)?.name?.split(' ')[0]||'her').join(" & ");
    setGroupDinnerLog(dl=>[...dl,`You arrive at ${venue.label} with ${names}. ${venue.desc}`]);
    push(`🍽️ Group dinner at ${venue.label}.`);
  };

  const orderGroupDish=(dish,targetId,opts={})=>{
    const evtStudent=groupDinnerEvent.students.find(s=>s.id===targetId);
    if(!evtStudent||(evtStudent.dishes.includes(dish.id)&&!opts.forcePush)) return;
    const live=students.find(st=>st.id===targetId);
    if(!live) return;
    const capOpts=buildSessionCapOpts(live,{softStartBonus:softStartBonus(ownedSkills,getStage(live.lbs).id)});
    const result=runVenueFeedAttempt({
      student:live,
      source:dish,
      feedStudentCalories,
      sessionCtx:{
        sessionStartCalories:evtStudent.sessionStartCalories||0,
        sessionPace:groupDinnerEvent.sessionPace||'steady',
      },
      gameCtx:{
        skillGainMult,
        raGainMult,
        softStartBonus:capOpts.softStartBonus,
        generousTrait:hasTrait('generous'),
        context:'group_dinner',
        forcePush:!!opts.forcePush,
        gainLbs:rnd(dish.gain[0],dish.gain[1]),
      },
    });
    if(!result.ok){
      setGroupDinnerLog(dl=>[...dl,`🚫 ${live.name} refuses ${result.payload.label}.`]);
      return;
    }
    const { fed, payload, cap, prevFullness, newFullness, sessionCals, overfillEnd }=result;
    setStudents(prev=>prev.map(s=>s.id!==targetId?s:fed));
    const newDishes=opts.forcePush?[...evtStudent.dishes]:[...evtStudent.dishes,dish.id];
    push(`🍴 ${live.name}: ${payload.label} (+${payload.calories.toLocaleString()} cal)`);

    const reactionLines=[];
    const newReactionLevels={...groupDinnerEvent.reactionLevels};
    groupDinnerEvent.students.filter(s=>s.id!==targetId).forEach(neg=>{
      const negLive=students.find(st=>st.id===neg.id);
      if(!negLive) return;
      const dishDiff=newDishes.length-neg.dishes.length;
      if(dishDiff<=2) return;
      const negStage=getStage(negLive.lbs).id;
      const fedStage=getStage(fed.lbs).id;
      const stageDiff=fedStage-negStage;
      const level=Math.min(3,newReactionLevels[neg.id]||0);
      const lines=[];
      if(Math.abs(stageDiff)>=2){
        if(stageDiff>=2){
          const jealousy=renderGroupDinnerReaction('thinJealousy',negLive,fed,week,{reactionLevel:level});
          if(jealousy) lines.push(jealousy);
          if(level>=2&&Math.random()<0.5){
            const ctx=renderGroupDinnerReaction('thinContextual',negLive,fed,week,{reactionLevel:level});
            if(ctx) lines.push(ctx);
          }
          if(level>=1&&Math.random()<0.65){
            const retort=renderGroupDinnerReaction('fatRetort',negLive,fed,week,{reactionLevel:level-1});
            if(retort) lines.push(retort);
          }
        } else {
          const encourage=renderGroupDinnerReaction('fatEncourage',negLive,fed,week,{reactionLevel:level});
          if(encourage) lines.push(encourage);
        }
      } else {
        const jealousy=renderGroupDinnerReaction('jealousyDefault',negLive,fed,week);
        if(jealousy) lines.push(jealousy);
      }
      if(lines.length){
        reactionLines.push(...lines.filter(Boolean));
        newReactionLevels[neg.id]=(newReactionLevels[neg.id]||0)+1;
      }
    });

    if(newFullness>cap&&prevFullness<=cap){
      const unbutton=renderDinnerUnbutton(fed,week);
      if(unbutton) reactionLines.push(unbutton);
      if((ownedSkills.memory_palace||0)>=1){
        applyEchoCapture(fed, prev=>captureDinnerUnbuttonEcho(prev,fed.id,week,getStage(fed.lbs).id));
      }
    }

    if(overfillEnd){
      const endMsg=renderDinnerOverfill(fed, week);
      setGroupDinnerLog(dl=>[...dl,`🍴 ${payload.label} for ${live.name}. (+${payload.calories.toLocaleString()} cal)`,`😵 ${endMsg}`,...reactionLines.map(r=>`👀 ${r}`)]);
        setGroupDinnerEvent(prev=>{
          const remaining=prev.students.filter(s=>s.id!==targetId);
          if(remaining.length===0){
            setTimeout(()=>{setAp(a=>a-3);push(`✅ Group dinner complete.`);setGroupDinnerEvent(null);},900);
            return prev;
          }
          return {...prev,students:remaining,reactionLevels:newReactionLevels};
        });
        setTimeout(()=>{
          setDinnerEndPopup({student:fed,finalFullness:newFullness,maxFullness:cap,totalGain:sessionCals,narrative:renderDinnerEnding(fed,newFullness,cap,week)});
          setStudents(prev=>prev.map(s=>s.id!==targetId?s:{...s,relationship:Math.min(100,s.relationship+5)}));
        },1100);
      return;
    }

    const firstHit=result.firstHitCapacity;
    const fullMsg=firstHit?` — ${live.name} is satisfied. You can keep going.`
      :result.pastCapacity?` — ${live.name} is past full.`
      :result.almostFull?` — ${live.name} is getting full.`:"";
    setGroupDinnerLog(dl=>[...dl,`🍴 ${payload.label} for ${live.name}. ${renderDinnerDishDesc(dish, live, week)} (+${payload.calories.toLocaleString()} cal)${fullMsg}`,...reactionLines.map(r=>`👀 ${r}`)]);
    setGroupDinnerEvent(prev=>({
      ...prev,
      students:prev.students.map(s=>s.id===targetId?{...s,dishes:newDishes,totalGain:sessionCals}:s),
      reactionLevels:newReactionLevels,
    }));
  };

  const sharePantryItemAtGroupDinner=(itemId,targetId)=>{
    if(!groupDinnerEvent) return;
    if((inventory[itemId]||0)<=0){push('⚠️ None left in the pantry.');return;}
    const item=ITEMS.find(i=>i.id===itemId);
    if(!item) return;
    const live=students.find(st=>st.id===targetId);
    const evtStudent=groupDinnerEvent.students.find(s=>s.id===targetId);
    if(!live||!evtStudent) return;
    const capOpts=buildSessionCapOpts(live,{softStartBonus:softStartBonus(ownedSkills,getStage(live.lbs).id)});
    const result=runVenueFeedAttempt({
      student:live,
      source:{ id:item.id, itemId:item.id, label:item.label },
      feedStudentCalories,
      sessionCtx:{
        sessionStartCalories:evtStudent.sessionStartCalories||0,
        sessionPace:groupDinnerEvent.sessionPace||'steady',
      },
      gameCtx:{
        skillGainMult,
        raGainMult,
        softStartBonus:capOpts.softStartBonus,
        generousTrait:hasTrait('generous'),
        context:'group_dinner',
        extraRel:2,
      },
    });
    if(!result.ok){
      setGroupDinnerLog(dl=>[...dl,`🚫 ${live.name} won't take the ${item.label.toLowerCase()} right now.`]);
      return;
    }
    setInventory(prev=>({...prev,[itemId]:Math.max(0,(prev[itemId]||0)-1)}));
    const { fed, sessionCals }=result;
    setStudents(prev=>prev.map(s=>s.id!==targetId?s:fed));
    push(`🎒 ${item.label} shared for ${live.name.split(' ')[0]}.`);
    setGroupDinnerEvent(prev=>({
      ...prev,
      students:prev.students.map(s=>s.id===targetId?{...s,totalGain:sessionCals}:s),
    }));
    setGroupDinnerLog(dl=>[...dl,`🎒 ${live.name.split(' ')[0]} — ${item.label} from your pantry.`]);
  };

  const callGroupWaiter=()=>{
    const vId=groupDinnerEvent.venue?.id||"bistro";
    const firstLive=students.find(st=>st.id===groupDinnerEvent.students[0]?.id);
    const desc=renderDinnerWaiter(vId, firstLive||{name:'she'}, week);
    setGroupDinnerLog(dl=>[...dl,`🫆 ${desc}`]);
    setGroupDinnerEvent(prev=>({...prev,students:prev.students.map(s=>({...s,dishes:[]}))}));
  };

  const useGroupConversation=(conv)=>{
    if(groupDinnerEvent.conversationUsed.includes(conv.id)) return;
    const liveStudents=groupDinnerEvent.students.map(gs=>students.find(st=>st.id===gs.id)).filter(Boolean);
    const [s1,s2]=liveStudents;
    if(!s1) return;
    const text=renderGroupDinnerConversation(conv.id, s1, s2||s1, week);
    const relB=conv.relBonus||0;
    const fullE=conv.fullnessEffect||0;
    setGroupDinnerLog(dl=>[...dl,`💬 ${text}`]);
    push(`💬 Group conversation: ${conv.label}`);
    if(fullE>0){
      liveStudents.forEach(ls=>{
        const mods=getFeedingModifiers(ls,{generousTrait:hasTrait('generous'),context:'group_dinner'});
        const fed=feedStudentCalories(ls,0,fullE,0,'',{
          refusalBonus:mods.refusalBonus,
          fullnessMult:mods.fullnessMult,
        });
        if(fed) setStudents(prev=>prev.map(st=>st.id!==ls.id?st:fed));
      });
    }
    setGroupDinnerEvent(prev=>({
      ...prev,
      conversationUsed:[...prev.conversationUsed,conv.id],
    }));
    setStudents(prev=>prev.map(s=>{
      const inGroup=groupDinnerEvent.students.some(gs=>gs.id===s.id);
      if(!inGroup) return s;
      return {...s,relationship:Math.min(100,s.relationship+relB)};
    }));
  };

  const endGroupDinner=()=>{
    const totalG=groupDinnerEvent.students.reduce((a,s)=>a+s.totalGain,0);
    guardHungerInterrupt(()=>{
      setAp(a=>a-3);
      push(`✅ Group dinner complete. ${totalG.toLocaleString()} cal total across ${groupDinnerEvent.students.length} residents (≈${Math.round(calsToLbs(totalG))} lbs once digested).`);
      setStudents(prev=>prev.map(s=>{
        const inGroup=groupDinnerEvent.students.some(gs=>gs.id===s.id);
        if(!inGroup) return s;
        return {...s,relationship:Math.min(100,s.relationship+7)};
      }));
      setGroupDinnerEvent(null);
    });
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
        capacityBonus:(hist.capacityBonus||0)+skillSessionCapBonus,
        sessionStartCalories:s.consumedCalories||0,
        encouragementsUsed:[],toleranceBuffer:0,sessionNum:hist.count+1,
        refillRound:0,tappedOut:false,tapOutDialogue:null,sessionPace:'steady',
      });
      const scrutinyCost=scrutinyPrivateSessionCost(adminScrutiny);
      if(scrutinyCost>0) addScrutiny(scrutinyCost);
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

  const feedInSession=(food,opts={})=>{
    const s=students.find(st=>st.id===privateSession.student.id)||privateSession.student;
    const capOpts=buildSessionCapOpts(s,{
      softStartBonus:softStartBonus(ownedSkills,getStage(s.lbs).id),
      capacityBonus:privateSession.capacityBonus||0,
      toleranceBuffer:privateSession.toleranceBuffer||0,
    });
    const result=runVenueFeedAttempt({
      student:s,
      source:food,
      feedStudentCalories,
      sessionCtx:{
        sessionStartCalories:privateSession.sessionStartCalories||0,
        sessionPace:privateSession.sessionPace||'steady',
        capacityBonus:capOpts.capacityBonus,
        toleranceBuffer:capOpts.toleranceBuffer,
      },
      gameCtx:{
        skillGainMult,
        raGainMult,
        softStartBonus:capOpts.softStartBonus,
        generousTrait:hasTrait('generous'),
        context:'private_session',
        forcePush:!!opts.forcePush,
        gainLbs:rnd(food.gain[0],food.gain[1]),
      },
    });
    if(!result.ok){
      setSessionLog(sl=>[...sl,`🚫 ${s.name} refuses ${result.payload.label}.`]);
      return;
    }
    const { fed, payload, sessionCals, capOpts: usedCap }=result;
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:fed));
    const fPct=getFullnessPercent(fed,usedCap);
    const fsStage=getFullnessStage(fPct);
    const desc=renderSessionFullness(fed, Math.min(fsStage.id, 5), week);
    push(`🍽️ ${payload.label}: +${payload.calories.toLocaleString()} cal`);
    setSessionLog(sl=>[...sl,`🍽️ ${payload.label} (+${payload.calories.toLocaleString()} cal) — ${renderDinnerDishDesc(food, fed, week)}`,`   ${desc}`]);
    const adjustedTapProb=getTapOutProbability(fPct,skillTapOutResistance)*(result.pace?.tapOutMult??1);
    const tapsOut=Math.random()<adjustedTapProb;
    if(tapsOut){
      const liveS=fed;
      let tapLine;
      if(fPct>=250){
        const entry250=TAP_OUT_250[s.id]||TAP_OUT_250.default;
        tapLine=typeof entry250==='function'?entry250(liveS):entry250;
      } else {
        const tapStage=liveS.lbs<160?0:liveS.lbs<240?1:liveS.lbs<320?2:3;
        const dialogueSet=TAP_OUT_DIALOGUE[s.id]||TAP_OUT_DIALOGUE.default;
        tapLine=dialogueSet[tapStage](liveS);
      }
      const currentTotalGain=sessionCals;
      const hist2=sessionHistory[s.id]||{count:0,totalGain:0,capacityBonus:0};
      const newCapBonus2=hist2.capacityBonus+8;
      setAp(a=>a-2);
      addScrutiny(2);
      setSessionHistory(prev=>({...prev,[s.id]:{count:hist2.count+1,totalGain:hist2.totalGain+currentTotalGain,capacityBonus:newCapBonus2}}));
      setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,relationship:Math.min(100,st.relationship+4)}));
      push(`⛔ ${s.name} taps out! Session ended — ${currentTotalGain.toLocaleString()} cal packed in (≈${Math.round(calsToLbs(currentTotalGain))} lbs once digested).`);
      setPrivateSession(null);
      setTapOutPopup({student:liveS,text:tapLine,totalGain:currentTotalGain});
    } else {
      setPrivateSession(prev=>({...prev,foods:[...prev.foods,food.id],totalGain:sessionCals,student:fed}));
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
    push(`🐛 Debug: resident #${sid} updated.`);
  };

  const useSessionEncouragement=(enc)=>{
    if(!privateSession||privateSession.encouragementsUsed.includes(enc.id)) return;
    const s=students.find(st=>st.id===privateSession.student.id)||privateSession.student;
    const stageId=getStage(s.lbs).id;
    const capOpts={
      softStartBonus:softStartBonus(ownedSkills,stageId),
      capacityBonus:privateSession.capacityBonus||0,
      toleranceBuffer:privateSession.toleranceBuffer||0,
    };
    const fPct=getFullnessPercent(s,capOpts);
    const lbsBonus=enc.lbsBonus?rnd(enc.lbsBonus[0],enc.lbsBonus[1]):0;
    const encLine=enc.line(s,fPct);
    push(`💬 ${encLine}`);
    setSessionLog(sl=>[...sl,`💬 ${encLine}`]);
    let fed=s;
    if(lbsBonus>0){
      const bonusCals=lbsBonus*GAIN_CONFIG.calsPerLb;
      const bonusFed=feedStudentCalories(s,bonusCals,0,enc.relBonus,enc.label,capOpts);
      if(bonusFed) fed=bonusFed;
    } else {
      setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,relationship:Math.min(100,st.relationship+enc.relBonus)}));
    }
    if(lbsBonus>0&&fed!==s){
      setStudents(prev=>prev.map(st=>st.id!==s.id?st:fed));
    }
    const sessionCals=getSessionCaloriesFed(fed,privateSession.sessionStartCalories||0);
    setPrivateSession(prev=>({
      ...prev,
      encouragementsUsed:[...prev.encouragementsUsed,enc.id],
      toleranceBuffer:prev.toleranceBuffer+enc.toleranceBoost,
      totalGain:sessionCals,
    }));
  };

  const endPrivateSession=()=>{
    const s=students.find(st=>st.id===privateSession.student.id)||privateSession.student;
    const stageId=getStage(s.lbs).id;
    const capOpts={
      softStartBonus:softStartBonus(ownedSkills,stageId),
      capacityBonus:privateSession.capacityBonus||0,
      toleranceBuffer:privateSession.toleranceBuffer||0,
    };
    const fPct=getFullnessPercent(s,capOpts);
    guardHungerInterrupt(()=>{
    setAp(a=>a-2);
    addScrutiny(2);
    const hist=sessionHistory[s.id]||{count:0,totalGain:0,capacityBonus:0};
    const newCapBonus=hist.capacityBonus+8;
    const sessionCals=getSessionCaloriesFed(s,privateSession.sessionStartCalories||0);
    setSessionHistory(prev=>({...prev,[s.id]:{count:hist.count+1,totalGain:hist.totalGain+sessionCals,capacityBonus:newCapBonus}}));
    setStudents(prev=>prev.map(st=>st.id!==s.id?st:{...st,relationship:Math.min(100,st.relationship+4)}));
    const scene=renderSessionAftermath(s, fPct, week);
    push(`✅ Session with ${s.name} complete. ${sessionCals.toLocaleString()} cal packed in (≈${Math.round(calsToLbs(sessionCals))} lbs once digested) · session capacity expanded (+8).`);
    setSessionResult({student:s,totalGain:sessionCals,fullnessPct:fPct,scene,sessionCount:hist.count+1,capacityBonus:newCapBonus});
    setPrivateSession(null);
    });
  };

  const sel=selectedId!==null?students.find(s=>s.id===selectedId):null;
  // Immobile residents (stage 10+) leave the roster and live in The Settling.
  const settledStudents=students.filter(s=>getImmobilityTier(s)>=1);
  const mobileStudents=students.filter(s=>getImmobilityTier(s)<1);
  const selSettled=!!sel&&getImmobilityTier(sel)>=1;
  const talkStudent=talkStudentId!=null?students.find(s=>s.id===talkStudentId):null;
  const totalGained=students.reduce((a,s)=>a+(s.lbs-s.startLbs),0);
  const reachXp=Math.max(0,Math.round(totalGained));
  const reachLevel=1+Math.floor(reachXp/REACH_XP_PER_LEVEL);
  const reachRankProgress=Math.max(0,reachLevel-1);
  const totalSkillPoints=Math.max(0,reachLevel-1);
  const visibleStudents=students.filter(studentVisibleOnCampus);
  const avgLbs=Math.round(visibleStudents.reduce((a,s)=>a+s.lbs,0)/Math.max(1,visibleStudents.length));
  // ── RA PROFILE / TRAIT EFFECTS ──────────────────────────────
  const hasTrait=(id)=>raProfile?.traits?.includes(id)||false;
  const hasSubj=(id)=>raProfile?.subject===id;
  const raGainMult=profileGainMult(raProfile);
  const raPassiveBonus=profilePassiveBonus(raProfile);
  const raCorruptionMult=profileCorruptionMult(raProfile);
  // ── SKILL TREE DERIVED VALUES ──────────────────────────────
  const skillEffects=aggregateSkillEffects(ownedSkills);
  const loungeSkillFx=aggregateHallLoungeSkillEffects(ownedHallSkills||{});
  const spentSkillPoints=computeSpentSkillPoints(ownedSkills);
  const availableSkillPoints=Math.max(0,totalSkillPoints-spentSkillPoints);
  const hasSkill=(id)=>(ownedSkills[id]||0)>0;
  const skillPassiveBonus=(skillEffects.passiveLbs||0)+raPassiveBonus;
  const skillApBonus=(skillEffects.apBonus||0);
  const skillGainMult=raGainMult;
  const skillScrutinyReduce=1;
  const skillScrutinyPassiveReduce=0;
  const skillSessionCapBonus=loungeSkillFx.sessionCapBonus||0;
  const skillTapOutResistance=loungeSkillFx.tapOutResistance||0;
  // EP2: total weekly scrutiny reduction from evolved skills across all students
  const evolvedScrutinyReduce=students.reduce((total,s)=>{
    if(!s.evolvedForm||!(s.evolvedSkills||[]).length) return total;
    const tree=EVOLVED_SKILL_TREES[s.evolvedForm]||[];
    return total+tree.filter(sk=>(s.evolvedSkills||[]).includes(sk.id)&&sk.weeklyScrutinyReduce).reduce((a,b)=>a+(b.weeklyScrutinyReduce||0),0);
  },0);

  // ── EFFECTIVE ACTIONS (applying unlocked skill effects) ──────
  const ownedHall=ownedHallSkills||{};
  const effectiveSingleActions=ACTIONS_SINGLE.filter(a=>{
    if(!a.requiresUnlock) return true;
    return hasHallLoungeUnlock(ownedHall,a.requiresUnlock);
  });
  const effectiveHallActions=ACTIONS_HALL.filter(a=>{
    if(a.supernaturalOnly&&!opposition?.supernatural?.actTriggered) return false;
    if(a.requiresUnlock&&!hasHallLoungeUnlock(ownedHall,a.requiresUnlock)) return false;
    return true;
  });

  const availableVenues=DINNER_VENUES.filter(v=>{
    if(v.id==="home_dinner") return false;
    if(v.id==="atelier") return false;
    return isDinnerVenueUnlocked(v.id,ownedHall);
  });

  const views=["roster","actions","achievements","log"];
  if(sel) views.splice(1,0,"student");

  // ── OPENING: RA INTRO → APPROACH → HALL → FIFTH RESIDENT ─────────
  if(!raProfile){
    return <RaSetupWizard students={students} onComplete={startAsRA} />;
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
          <ModalOverlay onClose={() => { playHallPassSound('click', soundEnabled); setSkillPurchase(null); }} soundEnabled={soundEnabled}>
            <div className="hall-pass-modal-in skill-purchase-modal" style={{...C.modal,maxWidth:580}}>
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
                <div style={C.secT}>Assign weight loss per resident</div>
                <button type="button" className="skill-purchase-choice-row" style={C.smBtn} onClick={distributeEvenly}>Distribute evenly</button>
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
                <button type="button" className="skill-purchase-choice-row" style={C.btn("#444")} onClick={()=>{ playHallPassSound('click', soundEnabled); setSkillPurchase(null); }}>Cancel</button>
                <button type="button" className="skill-purchase-choice-row" style={{...C.btn(canConfirm?"#5020a0":"#2a1040"),flex:1,opacity:canConfirm?1:0.6}}
                  onClick={()=>{ if(canConfirm){ playHallPassSound('confirm', soundEnabled); confirmSkillPurchase(); } }}>
                  {canConfirm?`🔓 Unlock ${skill.label}`:`Assign ${remaining} more lbs to unlock`}
                </button>
              </div>
            </div>
          </ModalOverlay>
        );
      })()}

{/* FLOOR CHECK-IN MODAL */}
      {floorCheckIn&&(()=>{
        const{scenes,sceneIdx,outcomes,pendingResult}=floorCheckIn;
        const isDone=sceneIdx>=scenes.length&&!pendingResult;
        const current=!isDone&&!pendingResult?scenes[sceneIdx]:null;
        return(
          <ModalOverlay dismissible={false} soundEnabled={soundEnabled}>
            <div className="hall-pass-modal-in floor-checkin-modal" style={{...C.modal,maxWidth:600,border:'1px solid #8040c860'}}>
              <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:3}}>FLOOR CHECK-IN — WEEK {week}</div>
              <h2 style={{margin:"0 0 4px",color:"#c898ff",fontSize:19}}>
                {isDone?"Check-In Wrapped":pendingResult?pendingResult.sceneTitle:current?.scene.title}
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
                  <FlaggedProse
                    section={`floorCheckIn.result.${pendingResult.sceneTitle}`}
                    text={pendingResult.result}
                    student={scenes[sceneIdx]?.student || students.find(s => s.name === pendingResult.target) || null}
                    week={week}
                    style={{...C.infoBox("rgba(100,40,200,0.1)"),fontSize:13,lineHeight:1.75,color:"#d0b8e8",marginBottom:8}}
                  />
                  {pendingResult.gain>0&&(
                    <div style={{fontSize:12,color:"#f0a060",marginBottom:12}}>
                      {pendingResult.target==="the hall"
                        ?`📊 Each resident gains ~${pendingResult.gain} lbs`
                        :`⚖️ ${pendingResult.target} gains ${pendingResult.gain} lbs`}
                    </div>
                  )}
                  <button type="button" className="scene-beat-advance" onClick={()=>{ playHallPassSound('click', soundEnabled); confirmResult(); }} style={C.btn("#5818a8")}>
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
                    <FlaggedProse
                      section={`floorCheckIn.scene.${scene.title}`}
                      text={student
                        ? renderFloorSceneText(scene, student, week, pharmacistTextOpts(pharmacistState, week))
                        : (typeof scene.text==="function"?scene.text(student):scene.text)}
                      student={student}
                      week={week}
                      style={{...C.infoBox("rgba(20,8,40,0.8)"),fontSize:13,lineHeight:1.75,color:"#c8a8e8",marginBottom:14}}
                    />
                    <div style={C.secT}>How do you respond?</div>
                    <div style={{display:"flex",flexDirection:"column",gap:8}}>
                      {scene.choices.map((ch,i)=>(
                        <div key={i} role="button" tabIndex={0} className="floor-checkin-choice" style={{...C.card,cursor:"pointer"}} onClick={()=>{ playHallPassSound('click', soundEnabled); makeChoice(i); }}
                          onKeyDown={(e)=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); playHallPassSound('click', soundEnabled); makeChoice(i); } }}>
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
                        {o.target==="the hall"?`Hall: +${o.gain} lbs each`:`${o.target}: +${o.gain} lbs`}
                      </div>}
                    </div>
                  ))}
                  <button onClick={()=>setWeekPlannerOpen(true)} style={{...C.btn("#2a2868"),marginTop:4,width:"100%"}}>📋 Plan Week</button>
                  <button onClick={finishFloorCheckIn} style={{...C.btn("#186028"),marginTop:4}}>⏩ End Week</button>
                </div>
              )}
            </div>
          </ModalOverlay>
        );
      })()}

{/* DINNER EVENT MODAL */}
      {dinnerEvent&&(()=>{
        const ds=students.find(s=>s.id===dinnerEvent.student.id)||dinnerEvent.student;
        const stId=getStage(ds.lbs).id;
        const feedCapOpts={softStartBonus:softStartBonus(ownedSkills,stId)};
        const cap=getFeedCapacity(ds,feedCapOpts);
        const rawPct=getFullnessPercent(ds,feedCapOpts);
        const fullnessPct=rawPct;
        const fullnessColor=rawPct>=130?"#801010":rawPct>=100?"#c02020":rawPct>=80?"#c08020":"#20a060";
        const isOverfull=rawPct>100;
        const isAtCapacity=rawPct>=100;
        const isAlmostFull=rawPct>=80;
        const appetiteNote=getFeedingAppetiteNote(ds);
        const pantryItems=ITEMS.filter(i=>(inventory[i.id]||0)>0);
        const venuePantryIds=dinnerEvent.venue?getVenuePantrySuggestions(dinnerEvent.venue.id).map(i=>i.id):[];
        const venuePantryItems=venuePantryIds.map(id=>ITEMS.find(i=>i.id===id)).filter(Boolean);
        const atelier=DINNER_VENUES.find(v=>v.id==="atelier");
        const showAtelier=hasSkill("dinner_accessible")&&stId>=6;
        const venueList=[...availableVenues,...(showAtelier?[atelier]:[])];
        const dismissDinnerVenue=()=>{ playHallPassSound('click', soundEnabled); setDinnerEvent(null); };
        return(
          <ModalOverlay onClose={dismissDinnerVenue} dismissible={dinnerEvent.phase==="venue"} soundEnabled={soundEnabled}>
            <div className="hall-pass-modal-in dinner-out-modal" style={{...C.modal,maxWidth:640}}>
              {/* Header */}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                <div>
                  <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:3}}>DINNER OUT</div>
                  <h2 style={{margin:0,color:"#c898ff",fontSize:20}}>Dinner with {ds.name}</h2>
                  <div style={{fontSize:11,color:"#5a309a",marginTop:3}}>{ds.lbs} lbs · {getStage(ds.lbs).label} · ❤ {ds.relationship}%</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:13,color:"#f0a060",fontWeight:700}}>{(dinnerEvent.totalGain||0).toLocaleString()} cal</div>
                  <div style={{fontSize:10,color:"#5a4070",marginTop:3}}>{dinnerEvent.dishes.length} dishes · {dinnerEvent.conversationUsed.length} conversations</div>
                </div>
              </div>
              {appetiteNote&&(
                <div style={{fontSize:10,color:"#a07090",fontStyle:"italic",marginBottom:10}}>{appetiteNote}</div>
              )}

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
                    {isOverfull&&<div style={{position:"absolute",left:`${Math.min(99,Math.round(100*cap/Math.max(1,ds.fullness||1)))}%`,top:0,bottom:0,width:2,background:"#ffffff44"}}/>}
                  </div>
                  {isOverfull&&<div style={{fontSize:10,color:"#c04020",marginTop:2,fontStyle:"italic"}}>Each additional dish risks ending the evening.</div>}
                </div>
              )}

              {dinnerEvent.phase==="dishes"&&(
                <>
                  <div style={{fontSize:9,letterSpacing:2,color:"#7a5090",marginBottom:6}}>FEEDING PACE</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:10}}>
                    {SESSION_PACE_ACTIONS.map(p=>(
                      <button key={p.id} type="button" className="dinner-lane-choice-row"
                        style={{...C.smBtn,opacity:(dinnerEvent.sessionPace||'steady')===p.id?1:0.55}}
                        onClick={()=>setDinnerEvent(prev=>({...prev,sessionPace:p.id}))}
                        title={p.desc}>
                        {p.label}
                      </button>
                    ))}
                  </div>
                  {isAtCapacity&&dinnerEvent.venue?.dishes?.length>0&&(
                    <button type="button" className="dinner-lane-choice-row" style={{...C.btn("#6a2848"),width:"100%",fontSize:10,marginBottom:10}}
                      onClick={()=>{
                        const dish=dinnerEvent.venue.dishes.find(d=>!(dinnerEvent.dishes||[]).includes(d.id))||dinnerEvent.venue.dishes[0];
                        if(dish) orderDish(dish,{forcePush:true});
                      }}>
                      Push past capacity — insist on another course
                    </button>
                  )}
                </>
              )}

              {/* PHASE: VENUE SELECTION */}
              {dinnerEvent.phase==="venue"&&(
                <div>
                  <div style={{fontSize:12,color:"#9070c0",marginBottom:12,fontStyle:"italic"}}>
                    Where would you like to take {ds.name} tonight?
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                    {venueList.map(v=>(
                      <div key={v.id} role="button" tabIndex={0} className="dinner-venue-choice-row" style={{...C.card,cursor:"pointer",border:v.id==="atelier"?"1px solid #806020":"1px solid #180830"}} onClick={()=>chooseDinnerVenue(v)}
                        onKeyDown={(e)=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); e.currentTarget.click(); } }}>
                        <div style={{fontWeight:700,fontSize:13,color:v.id==="atelier"?"#f0d060":"#d8a8ff",marginBottom:3}}>{v.label}</div>
                        <div style={{fontSize:11,color:"#6a4888",lineHeight:1.4,marginBottom:5}}>{v.desc}</div>
                        <div style={{fontSize:10,color:"#7a5040"}}>{v.baseCourses} courses · +{v.gainRange[0]}–{v.gainRange[1]} lbs est.</div>
                        {v.id==="atelier"&&<div style={{fontSize:9,color:"#a08030",marginTop:3}}>✦ Specialty — stage 6+ only</div>}
                      </div>
                    ))}
                  </div>
                  <button type="button" className="dinner-lane-choice-row" style={{...C.btn("#444"),marginTop:12}} onClick={()=>{ playHallPassSound('click', soundEnabled); setDinnerEvent(null); }}>Cancel</button>
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
                          <button type="button" className="dinner-lane-choice-row" style={{...C.btn("#4a2060")}} onClick={callWaiter}>🫆 Call for More</button>
                        </div>
                      ):(
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:12}}>
                          {availDishes.map(dish=>(
                            <div key={dish.id}
                              role="button"
                              tabIndex={0}
                              className="dinner-dish-choice-row"
                              style={{...C.card,cursor:"pointer",
                                border:`1px solid ${isOverfull?"#502020":"#180830"}`,
                                opacity:isOverfull?0.75:1}}
                              onClick={()=>orderDish(dish)}
                              onKeyDown={(e)=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); e.currentTarget.click(); } }}>
                              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                                <span style={{fontWeight:700,fontSize:12,color:isOverfull?"#e09090":"#d8a8ff"}}>{dish.label}</span>
                                <span style={{fontSize:9,color:"#a07050"}}>+{dish.gain[0]}–{dish.gain[1]} lbs</span>
                              </div>
                              <div style={{fontSize:10,color:"#6a4870",lineHeight:1.4,marginTop:2}}>{renderDinnerDishDesc(dish, ds, week)}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>);
                  })()}

                  {/* Pantry share */}
                  {pantryItems.length>0&&(
                    <>
                      <div style={{...C.secT,marginBottom:7}}>From your pantry</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:12}}>
                        {pantryItems.map(item=>(
                          <button key={item.id} type="button" className="dinner-lane-choice-row" style={C.smBtn} onClick={()=>sharePantryItemAtDinner(item.id)}>
                            {item.emoji} {item.label} ({inventory[item.id]})
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {venuePantryItems.length>0&&(
                    <>
                      <div style={{...C.secT,marginBottom:7}}>Venue specialties</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:12}}>
                        {venuePantryItems.map(item=>{
                          const qty=inventory[item.id]||0;
                          const inPantry=qty>0;
                          return(
                            <button key={item.id} type="button" className="dinner-lane-choice-row"
                              style={{...C.smBtn,opacity:inPantry?1:0.45}}
                              disabled={!inPantry}
                              title={inPantry?`Share ${item.label}`:`Bring ${item.label} from your pantry to share`}
                              onClick={()=>inPantry&&sharePantryItemAtDinner(item.id)}>
                              {item.emoji} {item.label}{inPantry?` (${qty})`:" — not in pantry"}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {/* Conversation */}
                  <div style={{...C.secT,marginBottom:7}}>Conversation</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:12}}>
                    {DINNER_CONVERSATION
                      .filter(conv=>!conv.requires||hasSkill(conv.requires))
                      .map(conv=>{
                        const used=dinnerEvent.conversationUsed.includes(conv.id);
                        return(
                          <button key={conv.id} type="button" className="dinner-lane-choice-row"
                            style={{...C.smBtn,opacity:used?0.4:1,textDecoration:used?"line-through":"none"}}
                            onClick={()=>!used&&useDinnerConversation(conv)}>
                            {conv.label}</button>
                        );
                      })}
                  </div>

                  {/* Dinner log */}
                  <div style={DINNER_LOG_PANEL_STYLE}>
                    {dinnerLog.length===0
                      ?<div style={{fontSize:12,color:"#5a3070",fontStyle:"italic"}}>{ds.name} looks at the menu with obvious interest.</div>
                      :dinnerLog.map((line,i)=>(
                        <div key={i} style={getDinnerLogLineStyle(line, i<dinnerLog.length-1)}>
                          {dinnerLogDisplayText(line)}
                        </div>
                      ))
                    }
                  </div>

                  <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                    <div style={{fontSize:11,color:"#f0a060",fontWeight:700,flex:1}}>{(dinnerEvent.totalGain||0).toLocaleString()} cal total</div>
                    {isAtCapacity&&(
                      <button type="button" className="dinner-lane-choice-row" style={C.btn("#2a6830")} onClick={()=>{ playHallPassSound('confirm', soundEnabled); endEvening(); }}>End Evening ✓</button>
                    )}
                    <button type="button" className="dinner-lane-choice-row" style={C.btn("#333")} onClick={()=>{ playHallPassSound('click', soundEnabled); setAp(a=>a-2); setDinnerEvent(null); }}>
                      Leave Early
                    </button>
                  </div>
                </div>
              )}
            </div>
          </ModalOverlay>
        );
      })()}


      {/* GIRL PICKER */}
      {/* IMMOBILE REDIRECT POPUP */}
      {immobileRedirect&&(
        <ModalOverlay onClose={() => { playHallPassSound('click', soundEnabled); setImmobileRedirect(null); }} soundEnabled={soundEnabled}>
          <div className="hall-pass-modal-in immobile-redirect-modal" style={{...C.modal,maxWidth:520}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#c05070",marginBottom:6}}>SHE CAN'T GO OUT</div>
            <div style={{fontSize:11,color:"#9070a0",marginBottom:14}}>
              {immobileRedirect.student.name} · {getStage(immobileRedirect.student.lbs).label} · {Math.round(immobileRedirect.student.lbs)} lbs
            </div>
            <p style={{lineHeight:1.9,color:"#e0d0b0",fontStyle:"italic",marginBottom:20}}>
              {immobileRedirect.text}
            </p>
            <button type="button" className="dinner-lane-choice-row" style={C.btn("#5818a8")} onClick={()=>{
              playHallPassSound('confirm', soundEnabled);
              const s=immobileRedirect.student;
              setImmobileRedirect(null);
              startDinner(s,{skipImmobileCheck:true});
            }}>Bring her food instead →</button>
            <button type="button" className="dinner-lane-choice-row" style={{...C.btn("#333"),width:"100%",marginTop:8}} onClick={()=>{ playHallPassSound('click', soundEnabled); setImmobileRedirect(null); }}>Cancel</button>
          </div>
        </ModalOverlay>
      )}

      {groupDinnerPicker&&(
        <ModalOverlay onClose={() => { playHallPassSound('click', soundEnabled); setGroupDinnerPicker(null); }} soundEnabled={soundEnabled}>
          <div className="hall-pass-modal-in group-dinner-picker-modal" style={{...C.modal,maxWidth:580}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:6}}>SELECT RESIDENTS</div>
            <div style={{fontSize:12,color:"#9070c0",marginBottom:14,fontStyle:"italic"}}>
              Choose {groupDinnerPicker.count} residents for dinner.
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
                    role="button"
                    tabIndex={isDisabled?-1:0}
                    aria-disabled={isDisabled||undefined}
                    className="group-dinner-picker-row"
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
                    }}
                    onKeyDown={(e)=>{ if(!isDisabled&&(e.key==='Enter'||e.key===' ')){ e.preventDefault(); e.currentTarget.click(); } }}>
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
                type="button"
                className="dinner-lane-choice-row"
                style={{...C.btn("#5818a8"),opacity:groupDinnerPicker.selected.length<groupDinnerPicker.count?0.4:1}}
                disabled={groupDinnerPicker.selected.length<groupDinnerPicker.count}
                onClick={()=>{
                  playHallPassSound('confirm', soundEnabled);
                  const chosen=groupDinnerPicker.selected.map(id=>students.find(s=>s.id===id)).filter(Boolean);
                  setGroupDinnerPicker(null);
                  startGroupDinner(chosen);
                }}>
                Confirm →
              </button>
              <button type="button" className="dinner-lane-choice-row" style={C.btn("#333")} onClick={()=>{ playHallPassSound('click', soundEnabled); setGroupDinnerPicker(null); }}>Cancel</button>
            </div>
          </div>
        </ModalOverlay>
      )}

      {/* DINNER ENDING POPUP */}
      {dinnerEndPopup&&(
        <ModalOverlay onClose={() => { playHallPassSound('click', soundEnabled); setDinnerEndPopup(null); }} soundEnabled={soundEnabled}>
          <div className="hall-pass-modal-in dinner-end-modal" style={{...C.modal,maxWidth:500}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:6}}>EVENING ENDS</div>
            <div style={{fontSize:11,color:"#7a5090",marginBottom:14}}>
              {dinnerEndPopup.student.name} · {getStage(dinnerEndPopup.student.lbs).label} · {dinnerEndPopup.student.lbs} lbs
              {" · "}{Math.round((dinnerEndPopup.finalFullness/dinnerEndPopup.maxFullness)*100)}% full
              {" · "}{dinnerEndPopup.totalGain.toLocaleString()} cal tonight (≈+{Math.round(dinnerEndPopup.totalGain/3500)} lbs digesting)
            </div>
            <p style={{lineHeight:1.95,color:"#f8ead8",fontSize:15,marginBottom:20,whiteSpace:"pre-line",background:"rgba(48,24,72,0.55)",padding:"14px 16px",borderRadius:8,borderLeft:"3px solid #c898ff"}}>
              {dinnerEndPopup.narrative}
            </p>
            <button type="button" className="dinner-lane-choice-row" style={C.btn("#5818a8")} onClick={()=>{ playHallPassSound('click', soundEnabled); setDinnerEndPopup(null); }}>Continue →</button>
          </div>
        </ModalOverlay>
      )}

      {/* GROUP DINNER MODAL */}
      {groupDinnerEvent&&(()=>{
        const gev=groupDinnerEvent;
        const venueList=[...availableVenues,...(hasSkill("dinner_accessible")&&gev.students.some(gs=>{const ls=students.find(st=>st.id===gs.id);return ls&&getStage(ls.lbs).id>=6;})?[DINNER_VENUES.find(v=>v.id==="atelier")]:[])].filter(Boolean);
        const allDishIds=gev.venue?.dishes.map(d=>d.id)||[];
        const allFed=gev.students.some(s=>allDishIds.every(id=>s.dishes.includes(id)));
        const groupPantryItems=ITEMS.filter(i=>(inventory[i.id]||0)>0);
        const venuePantryItems=gev.venue?getVenuePantrySuggestions(gev.venue.id):[];
        const dismissGroupDinnerVenue=()=>{ playHallPassSound('click', soundEnabled); setGroupDinnerEvent(null); };
        return(
          <ModalOverlay onClose={dismissGroupDinnerVenue} dismissible={gev.phase==="venue"} soundEnabled={soundEnabled}>
            <div className="hall-pass-modal-in group-dinner-modal" style={{...C.modal,maxWidth:640,padding:20}}>
              <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:8}}>GROUP DINNER</div>

              {/* Per-resident fullness bars */}
              <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap"}}>
                {gev.students.map(gs=>{
                  const live=students.find(st=>st.id===gs.id);
                  if(!live) return null;
                  const gStageId=getStage(live.lbs).id;
                  const rawP=getFullnessPercent(live,{softStartBonus:softStartBonus(ownedSkills,gStageId)});
                  const col=rawP>=130?"#801010":rawP>=100?"#c02020":rawP>=80?"#c08020":"#20a060";
                  const girlAppetite=getFeedingAppetiteNote(live);
                  return(
                    <div key={gs.id} style={{flex:1,minWidth:120}}>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:10,marginBottom:2}}>
                        <span style={{color:"#c0a0e0",fontWeight:700}}>{live.name.split(" ")[0]}</span>
                        <span style={{color:col,fontWeight:700}}>{rawP}%{rawP>=100?" 🔴":rawP>=80?" 🟡":""}</span>
                      </div>
                      <div style={{background:"#0d0816",borderRadius:3,height:5}}>
                        <div style={{width:`${Math.min(100,rawP)}%`,height:"100%",background:col,borderRadius:3,transition:"width 0.4s"}}/>
                      </div>
                      <div style={{fontSize:9,color:"#5a3060",marginTop:1}}>{(gs.totalGain||0).toLocaleString()} cal · {gs.dishes.length} dishes</div>
                      {girlAppetite&&<div style={{fontSize:8,color:"#806080",marginTop:2,fontStyle:"italic",lineHeight:1.3}}>{girlAppetite}</div>}
                    </div>
                  );
                })}
              </div>

              {gev.phase==="dishes"&&(
                <>
                  <div style={{fontSize:9,letterSpacing:2,color:"#7a5090",marginBottom:6}}>FEEDING PACE</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:12}}>
                    {SESSION_PACE_ACTIONS.map(p=>(
                      <button key={p.id} type="button" className="dinner-lane-choice-row"
                        style={{...C.smBtn,opacity:(gev.sessionPace||'steady')===p.id?1:0.55}}
                        onClick={()=>setGroupDinnerEvent(prev=>({...prev,sessionPace:p.id}))}
                        title={p.desc}>
                        {p.label}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Venue selection */}
              {gev.phase==="venue"&&(
                <div>
                  <div style={{fontSize:12,color:"#9070c0",marginBottom:10,fontStyle:"italic"}}>
                    Where are you taking {gev.students.map(gs=>students.find(st=>st.id===gs.id)?.name?.split(' ')[0]||'her').join(" & ")} tonight?
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:12}}>
                    {venueList.map(v=>(
                      <div key={v.id} role="button" tabIndex={0} className="dinner-venue-choice-row" style={{...C.card,cursor:"pointer",border:v.id==="atelier"?"1px solid #806020":"1px solid #180830"}}
                        onClick={()=>chooseGroupVenue(v)}
                        onKeyDown={(e)=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); e.currentTarget.click(); } }}>
                        <div style={{fontWeight:700,fontSize:12,color:v.id==="atelier"?"#f0d060":"#d8a8ff",marginBottom:2}}>{v.label}</div>
                        <div style={{fontSize:10,color:"#5a3860",lineHeight:1.4}}>{v.desc}</div>
                      </div>
                    ))}
                  </div>
                  <button type="button" className="dinner-lane-choice-row" style={C.btn("#444")} onClick={()=>{ playHallPassSound('click', soundEnabled); setGroupDinnerEvent(null); }}>Cancel</button>
                </div>
              )}

              {/* Dining phase */}
              {gev.phase==="dishes"&&gev.venue&&(
                <div>
                  <div style={{fontSize:10,color:"#7a5090",marginBottom:10,fontStyle:"italic"}}>{gev.venue.label} — {gev.venue.desc}</div>

                  {/* Menu — each dish shows Feed buttons per resident */}
                  <div style={{...C.secT,marginBottom:6}}>Menu</div>
                  {allFed?(
                    <div style={{textAlign:"center",padding:"8px 0",marginBottom:10}}>
                      <div style={{fontSize:11,color:"#6a4870",fontStyle:"italic",marginBottom:8}}>The table is cleared.</div>
                      <button type="button" className="dinner-lane-choice-row" style={C.btn("#4a2060")} onClick={callGroupWaiter}>🫆 Call for More</button>
                    </div>
                  ):(
                    <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:12}}>
                      {gev.venue.dishes.map(dish=>{
                        const unfedGirls=gev.students.filter(s=>!s.dishes.includes(dish.id));
                        if(unfedGirls.length===0) return null;
                        const isOver=gev.students.some(gs=>{
                          const ls=students.find(st=>st.id===gs.id);
                          return ls&&getFullnessPercent(ls)>100;
                        });
                        return(
                          <div key={dish.id} style={{...C.card,border:`1px solid ${isOver?"#502020":"#180830"}`}}>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                              <span style={{fontWeight:700,fontSize:12,color:"#d8a8ff"}}>{dish.label}</span>
                              <span style={{fontSize:9,color:"#a07050"}}>+{dish.gain[0]}–{dish.gain[1]} lbs</span>
                            </div>
                            <div style={{fontSize:10,color:"#6a4870",marginBottom:6}}>{renderDinnerDishDesc(dish, students.find(st=>st.id===gev.students[0]?.id), week)}</div>
                            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                              {unfedGirls.map(gs=>{
                                const live=students.find(st=>st.id===gs.id);
                                const gRaw=live?getFullnessPercent(live,{softStartBonus:softStartBonus(ownedSkills,getStage(live.lbs).id)}):0;
                                const overText=gRaw>=100?" (overfull!)":"";
                                const firstName=live?.name?.split(" ")[0]||"her";
                                return(
                                  <button key={gs.id} type="button" className="dinner-lane-choice-row"
                                    style={{...C.smBtn,borderColor:gRaw>=100?"#602020":"#4a1280",color:gRaw>=100?"#e08080":"#b080e8"}}
                                    onClick={()=>orderGroupDish(dish,gs.id)}>
                                    Feed {firstName}{overText}
                                  </button>
                                );
                              })}
                              {gev.students.filter(gs=>{
                                const live=students.find(st=>st.id===gs.id);
                                return live&&getFullnessPercent(live,{softStartBonus:softStartBonus(ownedSkills,getStage(live.lbs).id)})>=100;
                              }).map(gs=>{
                                const live=students.find(st=>st.id===gs.id);
                                const firstName=live?.name?.split(" ")[0]||"her";
                                return(
                                  <button key={`push-${gs.id}-${dish.id}`} type="button" className="dinner-lane-choice-row"
                                    style={{...C.smBtn,borderColor:"#802040",color:"#e0a0b0",fontSize:9}}
                                    onClick={()=>orderGroupDish(dish,gs.id,{forcePush:true})}>
                                    Push {firstName}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {(groupPantryItems.length>0||venuePantryItems.length>0)&&(
                    <>
                      <div style={{...C.secT,marginBottom:6}}>Share from pantry</div>
                      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:12}}>
                        {gev.students.map(gs=>{
                          const live=students.find(st=>st.id===gs.id);
                          if(!live) return null;
                          const firstName=live.name.split(" ")[0];
                          const shareItems=[...new Set([
                            ...groupPantryItems.map(i=>i.id),
                            ...venuePantryItems.map(i=>i.id),
                          ])].map(id=>ITEMS.find(i=>i.id===id)).filter(i=>i&&(inventory[i.id]||0)>0);
                          if(!shareItems.length) return null;
                          return(
                            <div key={gs.id} style={{...C.card,padding:"6px 8px"}}>
                              <div style={{fontSize:10,color:"#9070b0",marginBottom:4}}>{firstName}</div>
                              <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                                {shareItems.map(item=>(
                                  <button key={item.id} type="button" className="dinner-lane-choice-row" style={{...C.smBtn,fontSize:9}}
                                    onClick={()=>sharePantryItemAtGroupDinner(item.id,gs.id)}>
                                    {item.emoji} {item.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {/* Group conversations */}
                  <div style={{...C.secT,marginBottom:6}}>Conversation</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:10}}>
                    {GROUP_CONVERSATIONS.map(conv=>{
                      const used=gev.conversationUsed.includes(conv.id);
                      return(
                        <button key={conv.id} type="button" className="dinner-lane-choice-row"
                          style={{...C.smBtn,opacity:used?0.4:1,textDecoration:used?"line-through":"none"}}
                          onClick={()=>!used&&useGroupConversation(conv)}>
                          {conv.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Log */}
                  <div style={DINNER_LOG_PANEL_STYLE}>
                    {groupDinnerLog.length===0
                      ?<div style={{fontSize:12,color:"#5a3070",fontStyle:"italic"}}>{gev.students.map(gs=>students.find(st=>st.id===gs.id)?.name?.split(' ')[0]||'her').join(" and ")} look at the menu.</div>
                      :groupDinnerLog.map((line,i)=>(
                        <div key={i} style={getDinnerLogLineStyle(line, i<groupDinnerLog.length-1)}>
                          {dinnerLogDisplayText(line)}
                        </div>
                      ))
                    }
                  </div>

                  <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                    <div style={{fontSize:11,color:"#f0a060",fontWeight:700,flex:1}}>
                      {gev.students.reduce((a,s)=>a+s.totalGain,0).toLocaleString()} cal total
                    </div>
                    <button type="button" className="dinner-lane-choice-row" style={C.btn("#2a6830")} onClick={endGroupDinner}>End Evening ✓</button>
                    <button type="button" className="dinner-lane-choice-row" style={C.btn("#333")} onClick={()=>{ playHallPassSound('click', soundEnabled); setAp(a=>a-3); setGroupDinnerEvent(null); }}>Leave Early</button>
                  </div>
                </div>
              )}
            </div>
          </ModalOverlay>
        );
      })()}

      {/* NARRATIVE MODAL */}
      {activeNarrativeCopy&&(
        <ModalOverlay onClose={() => { playHallPassSound('click', soundEnabled); push(`📖 ${activeNarrativeCopy.event.title} — dismissed.`); setActiveEvent(null); }} soundEnabled={soundEnabled}>
          <div className="hall-pass-modal-in narrative-modal" style={C.modal}>
            <div style={{fontSize:9,letterSpacing:3,color:"#8040c8",marginBottom:4}}>NARRATIVE EVENT</div>
            <h2 style={{margin:"0 0 4px",color:"#c898ff",fontSize:20}}>{activeNarrativeCopy.event.title}</h2>
            <SceneStage
              prose={activeNarrativeCopy.text}
              traceNodes={activeNarrativeCopy.traceNodes}
              student={activeNarrativeCopy.student}
              week={week}
              locale={{ glyph: '📖', label: 'Campus' }}
              section={`weekly.narrative.${activeNarrativeCopy.event.id}`}
              stateLine={buildStateLine(activeNarrativeCopy.student, { week, stageLabel: getStage(activeNarrativeCopy.student.lbs).label })}
              accentColor="#2a7830"
              onPinBeat={(pin) => pinSceneForStudent(activeNarrativeCopy.student.id, pin)}
              {...sceneStageShared}
              footer={activeNarrativeCopy.event.gain[1]>0 ? (
                <p style={{ color: '#f09050', fontSize: 12, marginTop: 10 }}>
                  This event may result in {activeNarrativeCopy.event.gain[0]}–{activeNarrativeCopy.event.gain[1]} additional lbs gained.
                </p>
              ) : null}
              choices={[
                { id: 'continue', label: 'Continue →', intent: 'press', onClick: () => resolveNarrative(activeNarrativeCopy.event, activeNarrativeCopy.student, true) },
                { id: 'dismiss', label: 'Dismiss', intent: 'wait', onClick: () => { push(`📖 ${activeNarrativeCopy.event.title} — dismissed.`); setActiveEvent(null); } },
              ]}
            />
          </div>
        </ModalOverlay>
      )}

      {/* OBSERVE MODAL */}

      {/* HEADER */}
      <div
        className="ra-desk-header"
        style={{
          ...C.hdr,
          borderBottom:`2px solid ${raProfile?.color||"#4a1590"}`,
          background:`linear-gradient(135deg,#0a0414 0%,#140828 42%,${raProfile?.accentSoft||"rgba(80,18,140,0.18)"} 100%)`,
          boxShadow:`inset 0 -1px 0 ${raProfile?.accentSoft||"rgba(120,40,200,0.15)"}`,
        }}
      >
        <div style={{display:"flex",gap:12,alignItems:"center",minWidth:0}}>
          {raProfile&&(
            <RaPortraitChip
              accent={raProfile.color||"#c44a2a"}
              accentSoft={raProfile.accentSoft||"rgba(196,74,42,0.22)"}
              size={44}
            />
          )}
          <div style={{minWidth:0}}>
            <div style={{fontSize:19,fontWeight:700,letterSpacing:2,color:raProfile?.color||"#c44a2a",lineHeight:1.15}}>RA DESK — {getDorm(raProfile?.dormId||raProfile?.subject)?.label?.toUpperCase()||"YOUR HALL"}</div>
            <div style={{fontSize:10,color:"#8a5060",letterSpacing:3,marginTop:2}}>{getApproachLabel(raProfile)?`${getApproachLabel(raProfile).toUpperCase()} · WEEK ${week}`:"HALL PASS"}</div>
          </div>
        </div>
        <div className="ra-desk-stats-bar" style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
          {raProfile&&(
            <div className="ra-desk-stat-pill" title="Hall Cred — on-style actions fill it; full returns AP" style={{textAlign:"center",background:raProfile.accentSoft||"rgba(80,18,140,0.3)",borderRadius:6,padding:"3px 11px",minWidth:74}}>
              <div style={{height:6,background:"rgba(0,0,0,0.35)",borderRadius:3,overflow:"hidden",marginBottom:2}}>
                <div style={{height:"100%",width:`${Math.min(100,((hallCred||0)/FAVOR_MAX)*100)}%`,background:raProfile.color||"#a060ff",transition:"width 0.25s"}}/>
              </div>
              <span style={{fontSize:9,color:raProfile.color||"#c0a8e8",letterSpacing:2}}>CRED</span>
            </div>
          )}
          {[["AP",ap,"#e0a8ff"],["Wk",week,"#e0a8ff"],["Reach",`Lv ${reachLevel}`,"#a0e0b0"],["Pts",availableSkillPoints,"#f0c060"]].map(([l,v,c])=>(
            <div
              key={l}
              className={`ra-desk-stat-pill${l === 'Wk' ? ' ra-desk-week-tick' : ''}`}
              data-week-pulse={l === 'Wk' ? weekPulse : undefined}
              style={{textAlign:"center",background:"rgba(80,18,140,0.3)",borderRadius:6,padding:"2px 11px"}}
            >
              <span style={{fontSize:17,fontWeight:700,color:c,display:"block"}}>{l==="Wk"?`Wk ${v}`:v}</span>
              <span style={{fontSize:9,color:"#60389a",letterSpacing:2}}>
                {l==="Wk"?"WEEK":l==="AP"?"ACTION PTS":l==="Reach"?"REACH":"SKILL PTS"}
              </span>
            </div>
          ))}
          {(()=>{
            const rank=([...RA_RANKS].reverse().find(r=>reachRankProgress>=r.min)||RA_RANKS[0]);
            return(
              <div className="ra-desk-stat-pill" style={{textAlign:"center",background:"rgba(80,18,140,0.3)",borderRadius:6,padding:"2px 11px",minWidth:90}}>
                <span style={{fontSize:13,fontWeight:700,color:"#f0c060",display:"block",letterSpacing:0.5}}>{rank.label}</span>
                <span style={{fontSize:9,color:"#60389a",letterSpacing:2}}>RANK</span>
              </div>
            );
          })()}
          {(()=>{
            const legacy=prestigeSummary(computePrestigeScore({ week, labState, campusSaturation:campusState.saturation, globalStats }));
            if(!legacy) return null;
            return(
              <div className="ra-desk-stat-pill" style={{textAlign:"center",background:"rgba(80,18,140,0.3)",borderRadius:6,padding:"2px 11px",minWidth:72}} title={`+${legacy.apBonus} AP/wk · +${legacy.breakthroughBonus} breakthroughs on lab sessions`}>
                <span style={{fontSize:12,fontWeight:700,color:"#c0a8e8",display:"block"}}>{legacy.score}</span>
                <span style={{fontSize:8,color:"#60389a",letterSpacing:1}}>LEGACY</span>
              </div>
            );
          })()}
          {/* Admin scrutiny meter */}
          {adminScrutiny>0&&(
            <div className="ra-desk-stat-pill" style={{textAlign:"center",background:"rgba(80,18,140,0.3)",borderRadius:6,padding:"2px 11px",minWidth:70}}>
              <div style={{position:"relative",height:6,background:"rgba(255,255,255,0.08)",borderRadius:3,width:70,margin:"4px 0 2px"}}>
                <div style={{position:"absolute",left:0,top:0,height:"100%",borderRadius:3,width:`${adminScrutiny}%`,background:adminScrutiny>=80?"#c02020":adminScrutiny>=50?"#c08020":"#7a30c8",transition:"width 0.4s"}}/>
              </div>
              <span style={{fontSize:9,color:adminScrutiny>=80?"#ff6060":adminScrutiny>=50?"#ffaa40":"#60389a",letterSpacing:2}}>SCRUTINY</span>
            </div>
          )}
          {opposition?.supernatural?.actTriggered&&(
            <div className="ra-desk-stat-pill" style={{textAlign:"center",background:"rgba(80,18,140,0.3)",borderRadius:6,padding:"2px 11px",minWidth:70}}>
              <div style={{position:"relative",height:6,background:"rgba(255,255,255,0.08)",borderRadius:3,width:70,margin:"4px 0 2px"}}>
                <div style={{position:"absolute",left:0,top:0,height:"100%",borderRadius:3,width:`${opposition.supernatural.scarcityPressure||0}%`,background:(opposition.supernatural.scarcityPressure||0)>=80?"#4060a0":(opposition.supernatural.scarcityPressure||0)>=50?"#506888":"#304860",transition:"width 0.4s"}}/>
              </div>
              <span style={{fontSize:9,color:opposition.supernatural.famineWeek?"#ff8080":"#6080a0",letterSpacing:2}}>
                {opposition.supernatural.famineWeek?"FAMINE":"SCARCITY"}
              </span>
            </div>
          )}
          <button
            type="button"
            className="ra-desk-action-btn"
            onClick={startFloorCheckIn}
            style={{...C.btn(opposition?.supernatural?.famineWeek?"#333":"#186028"),opacity:opposition?.supernatural?.famineWeek?0.45:1}}
            title={opposition?.supernatural?.famineWeek?"Complete a Refeast Ritual first":"Advance the semester"}
          >
            {opposition?.supernatural?.famineWeek?"⏸ Famine Week":"⏩ Next Week (+5 AP)"}
          </button>
          <WalletBadge balance={money} />
          {students.some(s=>s.evolvedForm==='competitive_gainer')&&(
            <button type="button" className="ra-desk-utility-btn" onClick={()=>setCgChatOpen(true)} style={{...C.btn("#7a1530"),fontSize:10,border:"1px solid #e8294a40"}}>💬 Softening Stats</button>
          )}
          <button
            type="button"
            className="ra-desk-utility-btn"
            title={soundEnabled ? 'UI sounds on' : 'UI sounds off'}
            onClick={() => setSoundEnabled(toggleSound().soundEnabled)}
            style={{...C.btn(soundEnabled ? '#2a4a38' : '#222244'),fontSize:10,opacity:0.85,minWidth:36}}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
          <button type="button" className="ra-desk-utility-btn" onClick={()=>setDebugOpen(d=>!d)} style={{...C.btn("#222244"),fontSize:10,opacity:0.7}}>🐛 Debug</button>
        </div>
      </div>

      {/* NAV */}
      <div className="hall-pass-nav" style={C.nav}>
        {[["roster","📋 Roster"],["hall-lounge","🏠 Hall Lounge"],["influence","✨ Influence"],["student","👤 "+(sel?.name||"Resident")],["actions","🎭 Actions"],["inventory","🎒 Pantry"],["campus","🗺️ Campus"],["skills","📈 Reach"],["achievements","🏆 Achievements"],
          ...(settledStudents.length>0?[["settling","✦ The Settling"]]:[]),
          ...(week>=8||opposition?.aib?.unlocked||adminScrutiny>=25?[["oversight","👁 Oversight"]]:[]),
          ...(labState?[["lab","🔧 The Lab"],["devices","🛠 Devices"],...((labState.stage??1)>=2?[["network","🌐 Network"]]:[])]:[]),
        ].map(([v,l])=>{
          const active=view===v;
          const accent=raProfile?.color||"#7a24d8";
          return (
          v==="student"&&!sel?null:
          <button key={v} className="hall-pass-nav-btn" data-active={active ? 'true' : 'false'} style={{
            ...C.navB(active),
            ...(active?{borderBottomColor:accent,color:"#e8d8ff"}:{}),
          }} onClick={()=>{ playHallPassSound('nav', soundEnabled); setView(v); }}>{l}</button>
        );})}
      </div>

      <div className="hall-pass-body" style={C.body}>
        <div key={view} className="hall-pass-view-in" style={C.main}>

          {/* ── ROSTER VIEW ── */}
          {view==="roster"&&<RosterView view={view} students={mobileStudents} lilithUnlocked={lilithUnlocked} elaraDiscovered={elaraDiscovered} reachLevel={reachLevel} avgLbs={avgLbs} setSelectedId={setSelectedId} setView={setView} week={week} unlockedDorms={unlockedDorms} startDormId={raProfile?.dormId||raProfile?.subject} pharmacistState={pharmacistState} onAmends={openAmends} onOpenStudent={openStudentDetail} soundEnabled={soundEnabled}/>}

          {/* ── THE SETTLING (list) ── */}
          {view==="settling"&&<SettlingListView students={students} week={week} setSelectedId={setSelectedId} setView={setView}/>}

          {/* ── THE SETTLING (detail) ── */}
          {(view==="settling-detail"||(view==="student"&&selSettled))&&sel&&<SettlingDetailView sel={sel} students={students} ap={ap} week={week} setView={setView} openWeighIn={openWeighIn} runDeviceAction={runDeviceAction} deviceInventory={deviceInventory} player={player} runSettlingAction={runSettlingAction} runBrokeredVisit={runBrokeredVisit} runGathering={runGathering} chooseLeviathanForm={chooseLeviathanForm}/>}

          {view==="hall-lounge"&&<HallLoungeView students={students} ownedHallSkills={ownedHallSkills} onPurchaseHallLoungeSkill={purchaseHallLoungeSkill}/>}

          {view==="influence"&&<InfluenceView
            students={students}
            v2State={v2}
            ownedSkills={ownedSkills}
            ownedHallSkills={ownedHallSkills||{}}
            embodimentState={v2.embodiment}
            onOpenEmbodiment={openEmbodiment}
            onCreateLink={runResonanceLink}
            onOpenRituals={()=>setFeastRitualOpen(true)}
            onOpenDream={(s)=>setDreamStudent(s)}
            ap={ap}
            week={week}
            reachLevel={reachLevel}
            witnessLog={campusState?.witnessLog||[]}
          />}

          {/* ── RESIDENT DETAIL ── */}
          {view==="student"&&sel&&!selSettled&&<StudentDetailView openWeighIn={openWeighIn} openTalk={openTalk} openEmbodiment={openEmbodiment} openDream={(s)=>setDreamStudent(s)} openEchoReplay={openEchoReplay} v2State={v2} ownedSkills={ownedSkills} ownedHallSkills={ownedHallSkills} onEchoResonate={runEchoResonate} ap={ap} chapterHostessState={chapterHostessState} communityResearcherState={communityResearcherState} cultivatorState={cultivatorState} pharmacistState={pharmacistState} labState={labState} deviceInventory={deviceInventory} player={player} runPharmacistSynthesis={runPharmacistSynthesis} runPharmacistCultDistribution={runPharmacistCultDistribution} runLabSession={runLabSessionOpen} openLabView={openLabView} openNetworkView={openNetworkView} openNetworkControl={openNetworkControl} openEquipModal={setEquipModalStudentId} runDeviceAction={runDeviceAction} unequipDeviceSlot={unequipDeviceSlot} doEvolvedActivity={doEvolvedActivity} runArrivalCapstone={runArrivalCapstone} runImmobilityArrival={runImmobilityArrival} runImmobilityRefit={runImmobilityRefit} runComfortMilestone={runComfortMilestone} runConfirmCourtPreference={runConfirmCourtPreference} runBrokeredVisit={runBrokeredVisit} doSingle={doSingle} effectiveSingleActions={effectiveSingleActions} lilithKillCount={lilithKillCount} lilithUnlocked={lilithUnlocked} openCaseStudyGrid={openCaseStudyGrid} openCultivatorHarvest={openCultivatorHarvest} openCultivatorRecruit={openCultivatorRecruit} openDigestCheck={openDigestCheck} openEvolutionModal={openEvolutionModal} openFeastPrep={openFeastPrep} openFinalReview={openFinalReview} openIntimacySelector={openIntimacySelector} openLilithHunt={openLilithHunt} openThesisBoard={openThesisBoard} purchaseEvolvedSkill={purchaseEvolvedSkill} openDestinySpend={openDestinySpend} fireAscensionAbility={fireAscensionAbility} openAscensionCeremony={openAscensionCeremony} sel={sel} sessionHistory={sessionHistory} setChapterHostessState={setChapterHostessState} setNadiaNotesState={setNadiaNotesState} setStudents={setStudents} setSubjectJournalState={setSubjectJournalState} setView={setView} startCultivatorSession={startCultivatorSession} startPrivateSession={startPrivateSession} startRecordingSession={startRecordingSession} startStream={startStream} students={students} week={week} salonState={salonState} galleryState={galleryState} dossierOpen={dossierOpen} setDossierOpen={setDossierOpen} soundEnabled={soundEnabled}/>}

          {/* ── FLOOR ACTIONS ── */}
          {view==="actions"&&<ActionsView ap={ap} doFloorAction={doFloorAction} effectiveHallActions={effectiveHallActions} famineWeek={!!opposition?.supernatural?.famineWeek}/>}

          {/* ── PANTRY / INVENTORY ── */}
          {view==="inventory"&&<InventoryView inventory={inventory} setItemTargetPicker={setItemTargetPicker}/>}

          {view==="lab"&&<LabView
            labState={labState}
            taliaStudent={taliaStudent()}
            money={money}
            ap={ap}
            students={students}
            onBuild={buildLabDevice}
            onUnlockTech={unlockLabTech}
            onUnlockCircuit={unlockLabCircuitNode}
            onOpenSession={()=>{ const t=taliaStudent(); if(t) runLabSessionOpen(t); }}
            onOpenForceFeeder={openForceFeeder}
            labStage={labState?.stage??1}
            soundEnabled={soundEnabled}
          />}

          {view==="devices"&&<DeviceInventoryView
            deviceInventory={deviceInventory}
            students={students}
            week={week}
            player={player}
            labState={labState}
            setStudents={setStudents}
            setPlayer={setPlayer}
            setDeviceTargetPicker={setDeviceTargetPicker}
            setEquipPicker={setEquipPicker}
            setAttachPicker={setAttachPicker}
            openEquipModal={setEquipModalStudentId}
            pushLog={push}
          />}

          {view==="network"&&<NetworkView
            labState={labState}
            taliaStudent={taliaStudent()}
            onAddNode={handleAddNetworkNode}
            onUpgradeNode={handleUpgradeNetworkNode}
            onSetAutomation={handleSetNodeAutomation}
            onSlotExperiment={handleSlotExperiment}
            onClearSlot={handleClearExperimentSlot}
            onExpandDeployment={handleExpandDeployment}
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
            saturation={campusState.saturation}
            elaraMet={elaraMet}
            deviceInventory={deviceInventory}
            useCampusDevice={useCampusDevice}
            dismissCampusEncounter={dismissCampusEncounter}
            facultyAffinity={facultyAffinity}
            setFacultyAffinity={setFacultyAffinity}
            portionSaintAvailable={lilithUnlocked&&!!opposition?.supernatural?.actTriggered&&!opposition?.supernatural?.portionSaintConsumed&&campusState.at==='dining_hall'&&(opposition?.supernatural?.scarcityPressure||0)>=35}
            onHuntPortionSaint={huntPortionSaint}
            ap={ap}
          />}

{/* ── SKILL TREE ── */}
          {view==="skills"&&<SkillTreeView availableSkillPoints={availableSkillPoints} ownedSkills={ownedSkills} skillEffects={skillEffects} students={students} onBuy={buySkillRank} onMax={maxSkillRank} reachLevel={reachLevel} reachXp={reachXp%REACH_XP_PER_LEVEL} reachXpForNextLevel={REACH_XP_PER_LEVEL}/>}

          {view==="achievements"&&<AchievementsView achievements={achievements}/>}

          {view==="oversight"&&<OversightView opposition={opposition} adminScrutiny={adminScrutiny} ap={ap} students={students} week={week} lilithUnlocked={lilithUnlocked} pharmacistStage={pharmacistState?.stage??1} oppositionCtx={buildOppositionContext({students,ownedSkills,ownedHallSkills,facultyAffinity,labState,pharmacistState,communityResearcherState,lilithUnlocked})} onRunCounter={runOppositionCounter} onRunCounterOnMember={runOppositionCounterOnMember} onStartHearing={startOppositionHearing} onClose={()=>setView('roster')}/>}

          {view==="sprite-test"&&<SpriteTestView/>}

        </div>

        {/* ── SIDEBAR: LIVE LOG (Story / Ledger tabs) ── */}
        <div style={{...C.side, width:sidebarOpen?320:32, transition:"width 0.18s", display:"flex", flexDirection:"column", overflow:"hidden"}}>
          <button type="button" className="hall-pass-sidebar-toggle" onClick={()=>setSidebarOpen(o=>!o)}
            style={{alignSelf:"flex-end",background:"transparent",border:"none",color:"#7050a0",fontSize:14,cursor:"pointer",padding:"2px 4px",flexShrink:0,lineHeight:1}}>
            {sidebarOpen?"◀":"▶"}
          </button>
          {sidebarOpen&&(()=>{
            const entries=log.map((e,i)=>({e,i}));
            const story=entries.filter(x=>!isLedgerLogLine(x.e));
            const ledger=entries.filter(x=>isLedgerLogLine(x.e));
            const shown=logTab==="ledger"?ledger:story;
            const tabBtn=(id,label,count)=>(
              <button key={id} type="button" className="hall-log-tab" onClick={()=>setLogTab(id)}
                style={{flex:1,fontSize:10,fontWeight:700,padding:"4px 6px",cursor:"pointer",
                  border:"none",borderBottom:logTab===id?"2px solid #c090e8":"2px solid transparent",
                  background:"transparent",color:logTab===id?"#d8a8ff":"#6a5078"}}>
                {label} <span style={{opacity:0.6,fontWeight:400}}>{count}</span>
              </button>
            );
            return(<>
              <div style={{display:"flex",flexShrink:0,marginBottom:4}}>
                {tabBtn("story","📖 Story",story.length)}
                {tabBtn("ledger","📊 Ledger",ledger.length)}
              </div>
              <div ref={logRef} style={{flex:1, overflow:"auto"}}>
                {shown.length===0
                  ? <div style={{fontSize:11,color:"#5a3888",fontStyle:"italic",padding:"6px 2px"}}>
                      {logTab==="ledger"?"No receipts yet this session.":"Nothing's happened yet — feed a resident."}
                    </div>
                  : shown.map(({e,i})=>{
                    const tone=e.startsWith('🏆')?' hall-log-achievement':e.startsWith('🔓')?' hall-log-unlock':'';
                    const fresh=i===log.length-1?' hall-log-entry':'';
                    const cls=`${fresh}${tone}`.trim();
                    return <div key={i} className={cls||undefined} style={C.logE}>{e}</div>;
                  })}
              </div>
              <button type="button" onClick={()=>{ setFieldNoteError(null); setBugReportOpen(true); }}
                style={{...C.btn('#3a3028'), fontSize:9, marginTop:8, flexShrink:0, opacity:0.85}}>
                📋 Something wrong? Shift Log
              </button>
            </>);
          })()}
        </div>
      </div>

      {/* ── FLOOR CHECK-IN MODAL ── */}

      {/* ── ITEM TARGET PICKER ── */}
      {itemTargetPicker&&<ItemTargetPicker itemTargetPicker={itemTargetPicker} setItemTargetPicker={setItemTargetPicker} students={students} lilithUnlocked={lilithUnlocked} useItemOn={useItemOn} soundEnabled={soundEnabled}/>}

      {deviceTargetPicker&&<DeviceTargetPicker deviceTargetPicker={deviceTargetPicker} setDeviceTargetPicker={setDeviceTargetPicker} students={students} lilithUnlocked={lilithUnlocked} useDeviceOn={useDeviceOn} soundEnabled={soundEnabled}/>}
      {equipPicker&&<EquipPicker equipPicker={equipPicker} setEquipPicker={setEquipPicker} students={students} lilithUnlocked={lilithUnlocked} equipDeviceOn={equipDeviceOn} soundEnabled={soundEnabled}/>}
      {attachPicker&&<AttachPicker attachPicker={attachPicker} setAttachPicker={setAttachPicker} students={students} lilithUnlocked={lilithUnlocked} attachDeviceOn={attachDeviceOn} soundEnabled={soundEnabled}/>}
      {equipModalStudentId!=null&&(
        <StudentEquipModal
          student={students.find(st=>st.id===equipModalStudentId)}
          deviceInventory={deviceInventory}
          onClose={()=>setEquipModalStudentId(null)}
          onUnequip={unequipDeviceSlot}
          onEquip={equipDeviceOn}
          onAttach={attachDeviceOn}
          soundEnabled={soundEnabled}
        />
      )}
      {malfunctionPopup&&<MalfunctionPopup malfunctionPopup={malfunctionPopup} setMalfunctionPopup={setMalfunctionPopup} soundEnabled={soundEnabled}/>}
      {deviceTickQueue&&(
        <DeviceTickPopup
          queue={deviceTickQueue}
          onAdvance={()=>setDeviceTickQueue(q=>(q?{...q,index:q.index+1}:null))}
          onDismissAll={()=>setDeviceTickQueue(null)}
          soundEnabled={soundEnabled}
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
            soundEnabled={soundEnabled}
          />
        );
      })()}

      {/* ── DORM UNLOCK MODAL ── */}
      {dormUnlockModal&&<DormUnlockModal
        dorms={dormUnlockModal}
        soundEnabled={soundEnabled}
        onContinue={()=>{
          playHallPassSound('confirm', soundEnabled);
          setDormUnlockModal(null);
          setView('roster');
        }}
      />}

      {/* ── TIER-UP MODAL ── */}
      {tierUpModal&&<TierUpModal setStudents={setStudents} setTierUpModal={setTierUpModal} tierUpModal={tierUpModal} soundEnabled={soundEnabled}/>}

      {/* ── SOCIAL EVENT PICKER ── */}

      {/* ── SOCIAL EVENT RESULT ── */}

      {/* ── PRIVATE SESSION MODAL ── */}
      {privateSession&&<PrivateSessionModal chooseSessionVenue={chooseSessionVenue} endPrivateSession={endPrivateSession} feedInSession={feedInSession} getMoreFood={getMoreFood} privateSession={privateSession} sessionLog={sessionLog} setAp={setAp} setPrivateSession={setPrivateSession} skillTapOutResistance={skillTapOutResistance} startIntimacyScene={startIntimacyScene} useSessionEncouragement={useSessionEncouragement} liveStudent={students.find(st=>st.id===privateSession.student.id)||privateSession.student} soundEnabled={soundEnabled}/>}

      {/* ── EP5: INTIMACY SCENE SELECTOR ── */}
      {intimacySceneSelector&&<IntimacySceneSelector ap={ap} intimacySceneSelector={intimacySceneSelector} setIntimacySceneSelector={setIntimacySceneSelector} startIntimacyScene={startIntimacyScene} soundEnabled={soundEnabled}/>}

      {/* ── EP5: ACTIVE INTIMACY SCENE ── */}
      {intimacyEventState&&<ActiveIntimacyScene closeIntimacyEvent={closeIntimacyEvent} intimacyEventState={intimacyEventState} makeIntimacyChoice={makeIntimacyChoice} students={students} soundEnabled={soundEnabled}/>}

      {/* ── DEBUG PANEL ── */}
      {debugOpen&&<DebugPanel adminScrutiny={adminScrutiny} ap={ap} debugApply={debugApply} debugInputs={debugInputs} setAdminScrutiny={setAdminScrutiny} setAp={setAp} setOwnedSkills={setOwnedSkills} setOwnedHallSkills={setOwnedHallSkills} setDebugInputs={setDebugInputs} setDebugOpen={setDebugOpen} setLilithUnlocked={setLilithUnlocked} setStudents={setStudents} students={students} opposition={opposition} setOpposition={setOpposition} setHearingState={setHearingState} week={week} setWeek={setWeek} startDormId={raProfile?.dormId||raProfile?.subject} unlockedDorms={unlockedDorms} setUnlockedDorms={setUnlockedDorms} money={money} view={view} setView={setView} log={log} lastPlayerAction={lastPlayerAction} getSnapshotContext={getSnapshotContext} getSaveContext={getSaveContext} campusState={campusState} pharmacistState={pharmacistState} eventQueueLen={eventQueue.length} instantText={instantText} onInstantTextChange={setInstantText} soundEnabled={soundEnabled} onSoundEnabledChange={setSoundEnabled}/>}

      {bugReportOpen&&<BugReportModal getSnapshotContext={getSnapshotContext} getSaveContext={getSaveContext} prefillError={fieldNoteError} onClose={()=>{ setBugReportOpen(false); setFieldNoteError(null); }} soundEnabled={soundEnabled}/>}

      {/* ── TAP-OUT POPUP ── */}
      {tapOutPopup&&<TapOutPopup setTapOutPopup={setTapOutPopup} tapOutPopup={tapOutPopup} soundEnabled={soundEnabled}/>}

      {/* ── WEIGH-IN MODAL ── */}
      {weighInState&&<WeighInModal
        weighInState={weighInState}
        setWeighInState={setWeighInState}
        bigScaleUnlocked={bigScaleUnlocked}
        brokeScaleIds={brokeScaleIds}
        onBreakScale={(sid)=>{
          setBrokeScaleIds(arr=>arr.includes(sid)?arr:[...arr,sid]);
          setStudents(prev=>prev.map(s=>s.id===sid?{...s,memories:appendMemory(s.memories,'scaleBreak',week)}:s));
        }}
        onUnlockBigScale={()=>{ setBigScaleUnlocked(true); push("⚖ Ordered a heavy-duty 1000 lb scale."); }}
        onMandatorySkip={weighInState?.aibMandatory ? ()=>{
          addScrutiny(12);
          push(`⚖️ Mandatory AIB weigh-in refused — documentation gap (+12 scrutiny).`);
          setWeighInState(null);
        } : undefined}
        onPersistWeekTextUsed={persistStudentWeekTextUsed}
        onComplete={(s)=>{
          if((ownedSkills.memory_palace||0)>=1){
            const sid=getStage(s.lbs).id;
            applyEchoCapture(s, prev=>captureWeighInEcho(prev,s.id,week,sid));
          }
        }}
        week={week}
        campusFattening={!!pharmacistState?.campusFattening}
        campusTier={getCampusNarrativeTier(pharmacistState)}
        soundEnabled={soundEnabled}
      />}

      {/* ── SESSION RESULT ── */}
      {sessionResult&&<SessionResultModal sessionResult={sessionResult} setSessionResult={setSessionResult} soundEnabled={soundEnabled}/>}
      {weekPlannerOpen&&(
        <WeekPlannerModal
          students={students}
          week={week}
          initialPlan={weekPlan}
          soundEnabled={soundEnabled}
          onCommit={(plan)=>{ setWeekPlan(plan); setWeekPlannerOpen(false); push('📋 Week plan locked — your slots are set.'); }}
          onClose={()=>setWeekPlannerOpen(false)}
        />
      )}
      {weekRecap&&<WeekRecapModal weekRecap={weekRecap} onClose={()=>setWeekRecap(null)} onSelectResident={(id)=>{openStudentDetail(id,{dossier:true});setWeekRecap(null);}} soundEnabled={soundEnabled}/>}
      {milestoneQueue&&<MilestoneCeremonyModal queue={milestoneQueue}
        week={week}
        soundEnabled={soundEnabled}
        onAdvance={()=>setMilestoneQueue(q=>q?{...q,index:q.index+1}:null)}
        onDismissAll={()=>setMilestoneQueue(null)}
        onPinBeat={(pin)=>{const ev=milestoneQueue?.events?.[milestoneQueue.index];if(ev)pinSceneForStudent(ev.id,pin);}}
        {...sceneStageShared}/>}
      {ascensionCeremony&&(()=>{
        const ascStudent=students.find(st=>st.id===ascensionCeremony.studentId);
        if(!ascStudent) return null;
        return(
          <AscensionCeremonyModal
            student={ascStudent}
            prose={ascensionCeremony.prose}
            traceNodes={ascensionCeremony.traceNodes}
            week={week}
            soundEnabled={soundEnabled}
            onAccept={()=>confirmAscensionRebirth(ascStudent.id)}
            onDecline={()=>declineAscensionCeremony(ascStudent.id)}
            onClose={()=>setAscensionCeremony(null)}
            onPinBeat={(pin)=>pinSceneForStudent(ascStudent.id,pin)}
            {...sceneStageShared}
          />
        );
      })()}
      {originPickState&&(()=>{
        const originStudent=students.find(st=>st.id===originPickState.studentId);
        if(!originStudent) return null;
        return(
          <OriginPickModal
            student={originStudent}
            onPick={(originId)=>commitOriginPick(originStudent.id,originId)}
            soundEnabled={soundEnabled}
          />
        );
      })()}
      {confrontation&&<ConfrontationModal confrontation={confrontation} money={money} week={week}
        onApologize={confrontApologize} onGift={confrontGift}
        onStandFirm={confrontStandFirm} onLeave={()=>setConfrontation(null)}
        onPinBeat={(pin)=>pinSceneForStudent(confrontation.studentId,pin)}
        soundEnabled={soundEnabled}
        {...sceneStageShared}/>}

      {/* ── GODDESS VISION MODAL ── */}

      {/* ── CONVERGENCE MODAL ── */}
      {/* ── EP2: EVOLUTION OFFER MODAL ── */}
      {evolutionModal&&<EvolutionOfferModal chooseEvolution={chooseEvolution} evolutionModal={evolutionModal} setEvolutionModal={setEvolutionModal} soundEnabled={soundEnabled}/>}

      {/* ── EP2: INTERACTIVE EVOLVED EVENT MODAL ── */}
      {evolvedEventState&&<EvolvedEventModal batchBakerState={batchBakerState} closeEvolvedEvent={closeEvolvedEvent} collabPartnerId={collabPartnerId} evolvedEventState={evolvedEventState} makeEvolvedEventChoice={makeEvolvedEventChoice} openSalonHub={openSalonHub} openGalleryHub={openGalleryHub} push={push} setChallengeState={setChallengeState} setDeliveryState={setDeliveryState} setEvolvedEventState={setEvolvedEventState} setPresentationState={setPresentationState} startCollabStream={startCollabStream} startEatingContest={startEatingContest} startFairDay={startFairDay} startRankedSession={startRankedSession} startSumoMatch={startSumoMatch} startStream={startStream} students={students} week={week} soundEnabled={soundEnabled}/>}

      {salonOpen&&salonState&&<SalonAppetitModal salonState={salonState} students={students} onClose={closeSalonHub} onStartSession={startSalonEvening} onPickMenu={salonPickCourse} onService={salonMakeServiceChoice} onDigestif={salonCloseEvening} soundEnabled={soundEnabled}/>}

      {galleryOpen&&galleryState&&<ArtisanGalleryModal galleryState={galleryState} students={students} onClose={closeGalleryHub} onOpenSubjectPicker={galleryOpenSubjectPicker} onConfirmEnroll={galleryConfirmEnroll} onStartStudio={galleryBeginStudio} onStudioAction={galleryStudioAction} onFieldShoot={galleryDoFieldShoot} onExhibition={galleryDoExhibition} soundEnabled={soundEnabled}/>}

      {supernaturalModalOpen&&<SupernaturalAscensionModal students={students} opposition={opposition} onAscend={ascendSupernatural} onDismiss={dismissSupernaturalAct} soundEnabled={soundEnabled}/>}
      {refeedSurgeState&&(()=>{
        const surgeStudent=students.find(st=>st.id===refeedSurgeState.studentId);
        if(!surgeStudent) return null;
        return(
          <RefeedSurgeModal
            student={surgeStudent}
            tapsNeeded={refeedSurgeState.tapsNeeded}
            taps={refeedSurgeState.taps}
            onTap={()=>setRefeedSurgeState(prev=>prev?{...prev,taps:Math.min(prev.tapsNeeded,prev.taps+1)}:null)}
            onComplete={()=>{
              const bonus=rnd(4,8);
              setStudents(prev=>prev.map(st=>st.id!==surgeStudent.id?st:{...st,lbs:st.lbs+bonus}));
              push(`✨ ${surgeStudent.name} surges — memory floods back (+${bonus} lbs).`);
              setRefeedSurgeState(null);
            }}
            onDismiss={()=>setRefeedSurgeState(null)}
            soundEnabled={soundEnabled}
          />
        );
      })()}

      {endgameQueue[0]&&<OppositionEndgameModal beat={endgameQueue[0]} onDismiss={()=>setEndgameQueue(q=>q.slice(1))} soundEnabled={soundEnabled}/>}
      {hearingState&&<OppositionHearingModal hearingState={hearingState} students={students} opposition={opposition} week={week} onChoice={makeHearingChoice} onClose={closeHearing} soundEnabled={soundEnabled}/>}

      {/* ── HALL KITCHEN QUEEN MINI-INTERFACE ── */}
      {homeroomSessionState&&<HomeroomQueenModal homeroomSessionState={homeroomSessionState} students={students} batchBakerState={batchBakerState} makeHomeroomActivityChoice={makeHomeroomActivityChoice} advanceHomeroomActivityPhase={advanceHomeroomActivityPhase} dismissHomeroomActivity={dismissHomeroomActivity} openHomeroomConference={openHomeroomConference} startHomeroomGroupActivity={startHomeroomGroupActivity} closeHomeroomSession={closeHomeroomSession} soundEnabled={soundEnabled}/>}

      {/* ── WIFE LESSONS MINI-GAME ── */}
      {wifeLessonsState?.session&&<WifeLessonsModal wifeLessonsState={wifeLessonsState} makeWifeLessonsConversationChoice={makeWifeLessonsConversationChoice} makeWifeLessonsSubChoice={makeWifeLessonsSubChoice} dismissWifeLessonsConversation={dismissWifeLessonsConversation} chooseWifeLessonsLesson={chooseWifeLessonsLesson} startWifeLessonsConversation={startWifeLessonsConversation} closeWifeLessonsSession={closeWifeLessonsSession} soundEnabled={soundEnabled}/>}

      {/* ── COMPETITIVE GAINER — GROUP CHAT MODAL (always accessible when evolved) ── */}
      {cgChatOpen&&<CompetitiveGainerChatModal competitiveGainerState={competitiveGainerState} students={students} getCGDriveTier={getCGDriveTier} cgRaReply={cgRaReply} setCgChatOpen={setCgChatOpen} soundEnabled={soundEnabled}/>}

      {/* ── COMPETITIVE GAINER — MAIN EVOLVED MODAL ── */}
      {competitiveGainerState?.open&&<CompetitiveGainerMainModal competitiveGainerState={competitiveGainerState} students={students} getCGDriveTier={getCGDriveTier} getMeasurements={getMeasurements} lilithUnlocked={lilithUnlocked} doCGMeasurement={doCGMeasurement} setCompetitiveGainerState={setCompetitiveGainerState} applyAndCloseCGBinge={applyAndCloseCGBinge} doCGCorkboard={doCGCorkboard} openCGMeasurementPicker={openCGMeasurementPicker} doCGSelfReview={doCGSelfReview} ap={ap} setAp={setAp} doCGBinge={doCGBinge} closeCGModal={closeCGModal} soundEnabled={soundEnabled}/>}

      {/* ── MAYA DELIVERY HIVE — TERRITORY MANAGEMENT MODAL ── */}
      {mayaHiveState?.open&&<MayaHiveModal hiveState={mayaHiveState} students={students} lilithUnlocked={lilithUnlocked} chooseHiveVP={chooseHiveVP} adjustHiveAssignment={adjustHiveAssignment} executeMayaHiveShift={executeMayaHiveShift} doMayaHiveVisit={doMayaHiveVisit} doMayaHivePhoto={doMayaHivePhoto} doMayaHiveAbsorb={doMayaHiveAbsorb} setMayaHiveState={setMayaHiveState} closeMayaHive={closeMayaHive} soundEnabled={soundEnabled}/>}

      {/* ── EATING CONTEST MINI-GAME MODAL ── */}
      {eatingContestState&&<EatingContestModal eatingContestState={eatingContestState} students={students} week={week} toggleFoodSelection={toggleFoodSelection} eatContestFood={eatContestFood} doContestAction={doContestAction} doDevour={doDevour} setEatingContestState={setEatingContestState} closeEatingContest={closeEatingContest} dismissContestPopup={dismissContestPopup} soundEnabled={soundEnabled}/>}

      {forceFeederState&&<ForceFeederModal
        state={forceFeederState}
        students={students}
        labState={labState}
        week={week}
        onSelectTarget={handleForceFeederSelectTarget}
        onComplete={handleForceFeederComplete}
        onClose={closeForceFeeder}
        soundEnabled={soundEnabled}
      />}

      {deviceUsageModal?.type==='tuning'&&(
        <DeviceTuningModal
          deviceDefId={deviceUsageModal.deviceDefId}
          deviceLabel={deviceUsageModal.deviceLabel}
          studentName={students.find(st=>st.id===deviceUsageModal.studentId)?.name||'Resident'}
          onComplete={completeDeviceUsage}
          onClose={()=>setDeviceUsageModal(null)}
          soundEnabled={soundEnabled}
        />
      )}
      {deviceUsageModal?.type==='route'&&(
        <DeviceRouteModal
          deviceLabel={deviceUsageModal.deviceLabel}
          studentName={students.find(st=>st.id===deviceUsageModal.studentId)?.name||'Resident'}
          onComplete={completeDeviceUsage}
          onClose={()=>setDeviceUsageModal(null)}
          soundEnabled={soundEnabled}
        />
      )}

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
        const dismissRanked=()=>{
          playHallPassSound('click', soundEnabled);
          if (done) closeRankedSession();
          else if (canQuit) quitRankedSession();
        };
        return(
          <ModalOverlay onClose={dismissRanked} dismissible={done || canQuit} soundEnabled={soundEnabled} style={{ zIndex: 1200 }}>
            <div className="hall-pass-modal-in ranked-session-modal" style={{...C.modal,maxWidth:580,background:"linear-gradient(160deg,#040810,#080e1a,#040810)",border:"1px solid #1a5a9050",maxHeight:"90vh",overflowY:"auto",padding:20}}>
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
                        <button key={food.id} type="button" className="ranked-session-choice-row"
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
                  {canQuit&&<button type="button" className="ranked-session-choice-row" style={{...C.btn("#1a0808"),width:"100%",fontSize:11,color:"#604040"}} onClick={quitRankedSession}>Log off for the night</button>}
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
                  <button type="button" className="ranked-session-choice-row" style={{...C.btn("#1a5a7a"),width:"100%",marginTop:10}} onClick={closeRankedSession}>Session Saved ✓</button>
                </>
              )}
            </div>
          </ModalOverlay>
        );
      })()}

      {/* ── EVOLVED PATH MINI-GAMES ── */}
      {presentationState&&<PresentationDefenseModal presentationState={presentationState} processStudentGain={processStudentGain} push={push} setPresentationState={setPresentationState} setStudents={setStudents} students={students} soundEnabled={soundEnabled}/>}
      {deliveryState&&<DeliveryOrderModal deliveryState={deliveryState} processStudentGain={processStudentGain} push={push} setDeliveryState={setDeliveryState} setStudents={setStudents} students={students} soundEnabled={soundEnabled}/>}
      {challengeState&&<CampusChallengeModal challengeState={challengeState} processStudentGain={processStudentGain} push={push} setChallengeState={setChallengeState} setStudents={setStudents} students={students} soundEnabled={soundEnabled}/>}

      {/* ── CHAPTER HOSTESS — STUDENT PICKER / HANGOUT MODAL ── */}
      {chapterHostessState?.hangoutOpen&&<ChapterHostessHangoutModal chapterHostessState={chapterHostessState} students={students} openHostessHangout={openHostessHangout} setChapterHostessState={setChapterHostessState} makeHostessHangoutChoice={makeHostessHangoutChoice} soundEnabled={soundEnabled}/>}

      {/* ── CHAPTER HOSTESS — FEAST PREP MODAL ── */}
      {chapterHostessState?.feastPrepOpen&&<ChapterHostessFeastPrepModal chapterHostessState={chapterHostessState} beginFeast={beginFeast} setChapterHostessState={setChapterHostessState} soundEnabled={soundEnabled}/>}

      {/* ── CHAPTER HOSTESS — FEAST LOG MODAL ── */}
      {chapterHostessState?.feastLogOpen&&<ChapterHostessFeastLogModal chapterHostessState={chapterHostessState} completeFeast={completeFeast} soundEnabled={soundEnabled}/>}

      {/* ── LILITH — CLUE / INVESTIGATION MODAL ── */}
      {talkStudent&&<TalkModal student={talkStudent} skillEffects={skillEffects} week={week} weeklyArms={weeklyArms} onArmDevouring={()=>armDevouringPresence(talkStudent.id)} onArmMesmerizing={()=>armMesmerizingPresence(talkStudent.id)} onClose={()=>setTalkStudentId(null)} onApplyEffect={applyTalkEffect} campusFattening={!!pharmacistState?.campusFattening} campusTier={getCampusNarrativeTier(pharmacistState)} soundEnabled={soundEnabled}/>}

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
            soundEnabled={soundEnabled}
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
            soundEnabled={soundEnabled}
          />
        );
      })()}
      {lilithClueModal&&<LilithClueModal lilithClueModal={lilithClueModal} investigateClue={investigateClue} setLilithClueModal={setLilithClueModal} confirmInvestigation={confirmInvestigation} soundEnabled={soundEnabled}/>}

      {/* ── LILITH — FEASTING BEAUTY (TEXT ADVENTURE) ── */}
      {lilithHuntState&&<LilithHuntModal lilithHuntState={lilithHuntState} students={students} setLilithHuntState={setLilithHuntState} navigateHunt={navigateHunt} deliveryScene={deliveryScene} closeHunt={closeHunt} approachMan={approachMan} consumeMan={consumeMan} encounterSetMode={encounterSetMode} makeReply={makeReply} makeSeduction={makeSeduction} soundEnabled={soundEnabled}/>}

      {/* ── SUMO MATCH MINI-GAME MODAL ── */}
      {sumoMatchState&&<SumoMatchModal sumoMatchState={sumoMatchState} students={students} week={week} sumoPlayMove={sumoPlayMove} sumoCornerFeed={sumoCornerFeed} sumoStartNextBout={sumoStartNextBout} setSumoMatchState={setSumoMatchState} closeSumoMatch={closeSumoMatch} dismissSumoPopup={dismissSumoPopup} soundEnabled={soundEnabled}/>}

      {/* ── FEEDEE CREATOR: COLLAB PARTNER PICKER ── */}
      {collabPartnerPicker&&<CollabPartnerPicker collabPartnerPicker={collabPartnerPicker} setCollabPartnerId={setCollabPartnerId} setCollabPartnerPicker={setCollabPartnerPicker} setEvolvedEventState={setEvolvedEventState} students={students} soundEnabled={soundEnabled}/>}

      {/* ── PSYCH RESEARCHER: HALL LOG FOCUS PICKER ── */}
      {researchSubjectPicker&&<ResearchSubjectPicker researchSubjectPicker={researchSubjectPicker} setAp={setAp} setEvolvedEventState={setEvolvedEventState} setResearchSubjectPicker={setResearchSubjectPicker} setStudents={setStudents} students={students} soundEnabled={soundEnabled}/>}

      {/* ── PSYCH RESEARCHER: RESIDENT JOURNAL ── */}
      {subjectJournalState&&<SubjectJournalModal setSubjectJournalState={setSubjectJournalState} students={students} subjectJournalState={subjectJournalState} soundEnabled={soundEnabled}/>}

      {/* ── NADIA'S RESEARCH NOTES ── */}
      {nadiaNotesState&&<NadiaSubjectNotesModal nadiaNotesState={nadiaNotesState} setNadiaNotesState={setNadiaNotesState} students={students} soundEnabled={soundEnabled}/>}

      {/* ── COLLAB STREAM MINI-GAME MODAL ── */}
      {collabStreamState&&<CollabStreamModal collabStreamState={collabStreamState} students={students} doCollabAction={doCollabAction} closeCollabStream={closeCollabStream} dismissCollabPopup={dismissCollabPopup} soundEnabled={soundEnabled}/>}

      {/* ── RECORDING SESSION MODAL ── */}
      {recordingSessionState&&<RecordingSessionModal recordingSessionState={recordingSessionState} students={students} week={week} setRecordingSessionState={setRecordingSessionState} makeRecordingChoice={makeRecordingChoice} wrapRecordingSession={wrapRecordingSession} oneMoreTake={oneMoreTake} closeRecordingSession={closeRecordingSession} dismissRecordingChoicePopup={dismissRecordingChoicePopup} soundEnabled={soundEnabled}/>}
      {streamSessionState&&<StreamSessionModal streamSessionState={streamSessionState} students={students} week={week} preStreamAction={preStreamAction} selectChallenge={selectStreamChallenge} beginActiveRound={beginActiveRound} finishActiveRound={finishActiveRound} continueAfterBetweenRound={continueAfterBetweenRound} tapOutStream={tapOutStream} wrapStream={wrapStream} closeStream={closeStream} appendStreamChat={appendStreamChat} updateRoundPerf={updateRoundPerf} tickRoundStamina={tickRoundStamina} soundEnabled={soundEnabled}/>}
      {streamBrandPickState&&<StreamBrandSelectModal student={students.find(st=>st.id===streamBrandPickState.studentId)} required={streamBrandPickState.required} onSelect={selectStreamBrand} onClose={streamBrandPickState.required?null:()=>setStreamBrandPickState(null)} soundEnabled={soundEnabled}/>}
      {destinySpendState&&<DestinySpendModal student={students.find(st=>st.id===destinySpendState.studentId)} onPurchase={purchaseDestinyItem} onClose={()=>setDestinySpendState(null)} onGiftFromPlayer={giftDestinyFunds} playerMoney={money} soundEnabled={soundEnabled}/>}

      {/* ── FAIR TRAINING COLLABORATIONS HUB ── */}
      {fairTrainingState.open&&<FairTrainingHub ft={fairTrainingState} students={students} ap={ap} getFairPrideTier={getFairPrideTier} startFairTrainingSession={startFairTrainingSession} launchFairDayEvent={launchFairDayEvent} closeFairTraining={closeFairTraining} setFairTrainingState={setFairTrainingState} soundEnabled={soundEnabled}/>}

      {/* ── FAIR DAY MODAL (Weigh-In → Judging → Afterparty) ── */}
      {fairDayState&&<FairDayModal fd={fairDayState} students={students} fairPride={fairTrainingState.fairPride} getFairPrideTier={getFairPrideTier} chooseFairWeighIn={chooseFairWeighIn} advanceFairDayPhase={advanceFairDayPhase} chooseFairAfterparty={chooseFairAfterparty} closeFairDay={closeFairDay} soundEnabled={soundEnabled}/>}

      {/* ── EP2: EVOLVED ACTIVITY MODAL ── */}
      {evolvedActivityModal&&<EvolvedActivityModal modal={evolvedActivityModal} onClose={()=>setEvolvedActivityModal(null)} soundEnabled={soundEnabled}/>}

      {/* ── LANE CAPTAIN MODAL ── */}
      {communityResearcherState?.modalPhase&&<CommunityResearcherModal communityResearcherState={communityResearcherState} students={students} lilithUnlocked={lilithUnlocked} lilithKillCount={lilithKillCount} advanceThesisBoard={advanceThesisBoard} completeThesisDefense={completeThesisDefense} selectCasePair={selectCasePair} setCommunityResearcherState={setCommunityResearcherState} completeCaseStudy={completeCaseStudy} dismissBoardReaction={dismissBoardReaction} proceedFromFinalReview={proceedFromFinalReview} makeHaveAChatChoice={makeHaveAChatChoice} closeThesisOutcome={closeThesisOutcome} soundEnabled={soundEnabled}/>}

      {/* ── CULTIVATOR MODAL ── */}
      {cultivatorState?.modalPhase&&<CultivatorModal cultivatorState={cultivatorState} students={students} week={week} setCultivatorState={setCultivatorState} confirmCultivatorRecruit={confirmCultivatorRecruit} pickCultivatorFood={pickCultivatorFood} makeCultivatorChoice={makeCultivatorChoice} confirmCultivatorSession={confirmCultivatorSession} dismissCultivatorStageUp={dismissCultivatorStageUp} confirmCultivatorHarvest={confirmCultivatorHarvest} closeCultivatorGrowth={closeCultivatorGrowth} soundEnabled={soundEnabled}/>}

      {hungerInterrupt&&(()=>{
        const hs=students.find(st=>st.id===hungerInterrupt.studentId);
        if(!hs) return null;
        const echoedWillAvailable=(ownedSkills.echoed_will||0)>0
          &&!!opposition?.supernatural?.actTriggered
          &&opposition?.meta?.echoedWillSpentWeek!==week
          &&!!(opposition?.supernatural?.curseQueue||[]).some(c=>c.studentId===hs.id);
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
            echoedWillAvailable={echoedWillAvailable}
            onEchoedWill={()=>finishHungerInterrupt(hs.id,'echoed_will')}
            soundEnabled={soundEnabled}
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
        }else if(picker.kind==='hall'){
          feedLabel=`${picker.action.label} — lace the whole hall meal?`;
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
              else if(picker.kind==='hall') executeFloorFeed(picker.action,compoundId);
              else if(picker.kind==='interrupt') finishHungerInterrupt(picker.studentId,'compound',compoundId);
            }}
            onCancel={()=>setCompoundFeedPicker(null)}
            soundEnabled={soundEnabled}
          />
        );
      })()}

      {embodimentStudent&&(
        <EmbodimentModal
          student={embodimentStudent}
          week={week}
          ownedSkills={ownedSkills}
          ownedHallSkills={ownedHallSkills||{}}
          embodimentState={v2.embodiment}
          walkLog={v2.embodiment?.walkLog||[]}
          onAppendLog={appendEmbodimentLog}
          onStart={runEmbodimentStart}
          onAction={runEmbodimentAction}
          onMove={runEmbodiedMove}
          onEventResolve={runEmbodiedEventResolve}
          onRelease={runEmbodimentRelease}
          onClose={()=>setEmbodimentStudent(null)}
          soundEnabled={soundEnabled}
        />
      )}
      {feastRitualOpen&&(
        <FeastRitualModal
          students={students}
          ownedSkills={ownedSkills}
          ownedHallSkills={ownedHallSkills||{}}
          week={week}
          reachLevel={reachLevel}
          onRun={runFeastRitual}
          onClose={()=>setFeastRitualOpen(false)}
          soundEnabled={soundEnabled}
        />
      )}
      {dreamStudent&&(
        <DreamModal
          student={dreamStudent}
          presetScenarioId={dreamPresetScenario}
          lucidUnlocked={v2.dreams?.lucidUnlocked}
          onChoice={(scenario,choice,wakeText)=>runDream(dreamStudent,scenario,choice,wakeText)}
          onClose={()=>{ setDreamStudent(null); setDreamPresetScenario(null); }}
          soundEnabled={soundEnabled}
        />
      )}
      {echoReplay&&(
        <EchoArchiveModal
          student={echoReplay.student}
          echo={echoReplay.echo}
          prose={echoReplay.prose}
          depth={echoReplay.depth}
          resonated={echoReplay.echo?.resonated}
          onResonate={runEchoResonate}
          onClose={()=>setEchoReplay(null)}
          soundEnabled={soundEnabled}
        />
      )}

    </div>
  );
}
