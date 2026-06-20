// ═══════════════════════════════════════════════════════════════
// DIALOGUE LAB — dev tool for tuning the modular text system.
// Roll batches of 5 random renders across dialogue sections with
// lockable state parameters. Flagging a sample shows a checkbox per
// dialogue node (engine trace provenance: module key + text); check
// a node, say what's wrong with it, save. Done → review all flags →
// copy-all payload (state + text + per-node problems) for pasting
// into a tuning session. Saves also append to the persistent flag log
// (localStorage) — export the full log from Debug → Download .txt.
// ═══════════════════════════════════════════════════════════════
import { useState } from 'react';
import { C } from '../styles.js';
import { INIT_STUDENTS } from '../gameData/students.js';
import { DINNER_CONVERSATION, GROUP_CONVERSATIONS } from '../gameData/sessions.js';
import { WEIGHT_STAGES, getStage } from '../gameData/stages.js';
import { getCorruptionTier } from '../gameData/corruption.js';
import { LILITH_ID } from '../gameData/lilith.js';
import { DEVICES } from '../gameData/devices.js';
import { createContext, render, pick, getEligibleVariants } from '../textEngine/engine.js';
import { formatTextFlagExport } from '../textEngine/textFlagFormat.js';
import { addTextFlag } from '../gameData/textFlagStore.js';
import {
  renderWeighInIntro, renderWeighInReaction, renderWeighInApproachV2,
  renderWeighInBreak, renderWeighInSwap, renderWeighInPurchase,
  WI_INTRO_LEGACY,
} from '../textEngine/scenes/weighIn/index.js';
import { renderEatScene } from '../textEngine/scenes/eating/index.js';
import { renderSlenderScene, renderSlenderEatBeat, renderSlenderMirrorBeat } from '../textEngine/scenes/earlyGain/index.js';
import { renderPsychShift } from '../textEngine/scenes/psychShift/index.js';
import { renderClothScene } from '../textEngine/scenes/clothing/index.js';
import { renderCampusScene } from '../textEngine/scenes/campus/index.js';
import { renderImmobScene } from '../textEngine/scenes/immobility/index.js';
import { buildTextContext, deriveClothingState } from '../gameData/textContext.js';
import { renderDeviceTickLine } from '../textEngine/scenes/deviceTick/index.js';
import { renderSuddenGrowthLine } from '../textEngine/scenes/suddenGrowth/index.js';
import { resolveGrowthZone } from '../textEngine/growthLexicon.js';
import { renderCampusDeviceEncounter, renderCampusDeviceResult } from '../textEngine/scenes/campusDevice/index.js';
import { renderHungerInterrupt, renderHungerOutcome } from '../textEngine/scenes/hungerInterrupt/index.js';
import {
  renderDinnerConversation, renderGroupDinnerConversation, renderGroupDinnerReaction,
  renderDinnerUnbutton, renderDinnerEnding, renderDinnerWaiter, renderDinnerDepth,
} from '../textEngine/scenes/dinner/index.js';
import { renderBodyPortrait } from '../textEngine/scenes/body/index.js';
import { renderFeedVoice } from '../textEngine/scenes/feedVoice/index.js';
import { renderFeedReaction } from '../textEngine/scenes/feedReaction/index.js';
import { renderWeekRecap } from '../textEngine/scenes/weekRecap/index.js';
import { renderIntimacyDepth } from '../textEngine/scenes/intimacy/index.js';
import { renderHuntNode, renderHuntTarget, renderLilithFeast, renderLilithDeliveryIntro } from '../textEngine/scenes/hunt/index.js';
import {
  renderCultivatorIntro,
  renderCultivatorChoice,
  renderCultivatorHarvestPlanned,
  renderCultivatorDigest,
  renderCultivatorGrowth,
  renderCultivatorRecruitment,
  renderCultivatorStageUp,
} from '../textEngine/scenes/cultivator/index.js';
import { renderDeviceFlavor } from '../textEngine/scenes/deviceFlavor.js';
import { renderSessionFullness, renderSessionAftermath } from '../textEngine/scenes/session/index.js';
import { renderAttitude } from '../textEngine/scenes/attitude.js';
import { renderHiveIntake } from '../textEngine/scenes/hiveIntake.js';
import '../textEngine/scenes/talkEncourage.js';
import '../textEngine/scenes/talkCodas.js';
import '../textEngine/scenes/talkSuggest.js';
import '../textEngine/scenes/talkRefusal.js';
import '../textEngine/scenes/talkCommandFinish.js';
import '../textEngine/scenes/campusSoftening.js';
import '../textEngine/scenes/hungerLexicon.js';
import '../textEngine/scenes/deviceBody.js';
import '../textEngine/scenes/campusDevice/fragments.js';

const MOODS = ["happy", "focused", "excited", "content", "tired", "stressed", "warm", "observant", "cheerful", "bemused", "curious", "nervous"];
const COR_POINTS = { 0: 10, 1: 50, 2: 90 };
const RANDOM = "random";
const DEVICE_IDS = Object.keys(DEVICES).filter(id => DEVICES[id].form === 'worn' || DEVICES[id].form === 'campus_tool');
const GROWTH_ZONES = ['belly', 'lower_body', 'curves', 'full', 'bust'];
const CAMPUS_LOCALES = ['hallway', 'lecture_hall', 'cafeteria', 'gym', 'dorm_room', 'stairwell', 'elevator', 'prof_office'];
const MEAL_TYPES = ['meal', 'campus_meal', 'binge'];
const CLOTHING_STATES = ['fitted', 'button_pop', 'zipper_fail', 'seam_split', 'waistband_surrender'];
const GAIN_STANCES = ['opposed', 'reluctant', 'neutral', 'secret'];
const PSYCH_BY_STANCE = {
  opposed: { shame: 60, fixation: 10, obsession: 20, dependence: 15 },
  reluctant: { shame: 30, fixation: 20, obsession: 25, dependence: 20 },
  neutral: { shame: 5, fixation: 5, obsession: 15, dependence: 10 },
  secret: { shame: 5, fixation: 65, obsession: 30, dependence: 20 },
};

const DINNER_CONV_IDS = DINNER_CONVERSATION.map((c) => c.id);
const GROUP_CONV_IDS = GROUP_CONVERSATIONS.map((c) => c.id);

const MOCK_EXPLORATION = { week: 6, campusTier: 1 };
const MOCK_ENCOUNTER = {
  target: { name: 'Maya', type: 'student', archetype: 'athletic', lbs: 220, studentId: 3 },
};

// Each section declares which state params actually influence its text
const STATE_PARAMS = ["girl", "stage", "corruption", "mood", "hunger", "addiction", "withdrawal"];
const SECTIONS = {
  "weighIn.intro": { params: STATE_PARAMS,
    fn: (s, opts) => renderWeighInIntro(s, 6, false, opts) },
  "weighIn.introBig": { params: STATE_PARAMS, stageMin: 7,
    fn: (s, opts) => renderWeighInIntro(s, 6, true, opts) },
  "weighIn.introLegacy": { params: STATE_PARAMS,
    fn: (s, opts) => render(WI_INTRO_LEGACY, buildTextContext({
      subject: s, week: 6, campusFattening: opts.campusFattening, campusTier: opts.campusTier, bigScale: false,
    }), { trace: opts.trace }) },
  "weighIn.approachV2": { params: STATE_PARAMS,
    fn: (s, opts) => renderWeighInApproachV2(s, 6, false, opts) },
  "weighIn.approachV2Big": { params: STATE_PARAMS, stageMin: 7,
    fn: (s, opts) => renderWeighInApproachV2(s, 6, true, opts) },
  "weighIn.reaction": { params: [...STATE_PARAMS, "campus"],
    fn: (s, opts) => renderWeighInReaction(s, 6, { ...opts, bigScale: getStage(s.lbs).id >= 7 }) },
  "weighIn.break": { params: ["girl", "stage", "corruption"],
    fn: (s, opts) => renderWeighInBreak(s, 6, opts) },
  "weighIn.swap": { params: ["girl"],
    fn: (s, opts) => renderWeighInSwap(s, 6, opts) },
  "weighIn.purchase": { params: ["girl"],
    fn: (s, opts) => renderWeighInPurchase(s, 6, opts) },
  "talk.encourage": { params: STATE_PARAMS,
    fn: (s, opts) => render("{talk.encourage}", createContext({
      subject: s, week: 6,
      globals: { campusFattening: (opts.campusTier || 0) > 0, campusTier: opts.campusTier || 0 },
    }), { trace: opts.trace }) },
  "talk.coda": { params: [...STATE_PARAMS, "campus"],
    fn: (s, opts) => render("{talk.coda}", createContext({
      subject: s, week: 6,
      globals: { campusFattening: (opts.campusTier || 0) > 0, campusTier: opts.campusTier || 0 },
    }), { trace: opts.trace }) },
  "talk.suggest_indulgence": { params: STATE_PARAMS,
    fn: (s, opts) => render("{talk.suggest_indulgence}", createContext({
      subject: s, week: 6,
      globals: { campusFattening: (opts.campusTier || 0) > 0, campusTier: opts.campusTier || 0 },
    }), { trace: opts.trace }) },
  "talk.suggest_growth": { params: STATE_PARAMS,
    fn: (s, opts) => render("{talk.suggest_growth}", createContext({
      subject: s, week: 6,
      globals: { campusFattening: (opts.campusTier || 0) > 0, campusTier: opts.campusTier || 0 },
    }), { trace: opts.trace }) },
  "talk.refusal.command_finish": { params: STATE_PARAMS,
    fn: (s, opts) => render("{talk.refusal.command_finish}", createContext({ subject: s, week: 6 }), { trace: opts.trace }) },
  "talk.refusal.command_devour": { params: STATE_PARAMS,
    fn: (s, opts) => render("{talk.refusal.command_devour}", createContext({ subject: s, week: 6 }), { trace: opts.trace }) },
  "talk.command_finish": { params: STATE_PARAMS,
    fn: (s, opts) => render("{talk.command_finish}", createContext({ subject: s, week: 6 }), { trace: opts.trace }) },
  "body.portrait": { params: STATE_PARAMS,
    fn: (s, opts) => renderBodyPortrait(s, 6, opts) },
  "feed.voice": { params: STATE_PARAMS,
    fn: (s, opts) => renderFeedVoice(s, 6, opts) },
  "feed.react": { params: [...STATE_PARAMS, "foodKind", "feedRoom"],
    fn: (s, opts) => renderFeedReaction(s, 6, { foodKind: opts.foodKind, feedRoom: opts.feedRoom, trace: opts.trace }) },
  "week.recap": { params: [...STATE_PARAMS, "gainBand", "milestone"],
    fn: (s, opts) => renderWeekRecap(s, 6, {
      gainBand: opts.gainBand,
      stagedUp: opts.milestone === 'stageup',
      stuffedWeek: opts.milestone === 'stuffed',
      trace: opts.trace,
    }) },
  "dinner.depth": { params: STATE_PARAMS,
    fn: (s, opts) => renderDinnerDepth(s, 6, opts) },
  "intimacy.depth": { params: STATE_PARAMS,
    fn: (s, opts) => renderIntimacyDepth(s, 6, opts) },
  "jealousy.reaction": { params: [...STATE_PARAMS, "favoritism"],
    fn: (s, opts) => render('{jealousy.reaction}', createContext({ subject: s, week: 6, favoritism: opts.favoritism || 'neglected' }), { trace: opts.trace }) },
  "hunt.node": { params: STATE_PARAMS,
    fn: (s, opts) => renderHuntNode(opts.huntNode || 'quad', s, 6, opts) },
  "hunt.target": { params: STATE_PARAMS,
    fn: (s, opts) => renderHuntTarget(opts.huntTarget || 'chad_w', s, 6, opts) },
  "cultivator.harvest": { params: [...STATE_PARAMS, "reneeStage", "testerStage"],
    fn: (s, opts) => renderCultivatorHarvestPlanned(
      Number(opts.reneeStage ?? 6), Number(opts.testerStage ?? 7), s.name, 6) },
  "cultivator.digest": { params: [...STATE_PARAMS, "reneeStage", "stagesJumped", "digestLate"],
    fn: (s, opts) => renderCultivatorDigest(
      Number(opts.reneeStage ?? 6), s.name, Number(opts.stagesJumped ?? 1), opts.digestLate === 'late', 6) },
  "cultivator.growth": { params: ["reneeStage", "stagesJumped"],
    fn: (_s, opts) => renderCultivatorGrowth(
      Number(opts.reneeStage ?? 6), 130, Number(opts.stagesJumped ?? 1), 6) },
  "cultivator.stageUp": { params: [...STATE_PARAMS, "testerStage"],
    fn: (s, opts) => renderCultivatorStageUp(Number(opts.testerStage ?? 7), s.name, 6) },
  "cultivator.recruitment": { params: [],
    fn: () => renderCultivatorRecruitment(6) },
  "cultivator.intro": { params: STATE_PARAMS,
    fn: (s, opts) => renderCultivatorIntro(opts.recipeId || 'cake', s.name, 6) },
  "hunt.feast": { params: [...STATE_PARAMS, "feastStage"],
    fn: (s, opts) => renderLilithFeast(s, Number(opts.feastStage ?? 0), 6, opts) },
  "hunt.feast.deliveryIntro": { params: STATE_PARAMS,
    fn: (s, opts) => renderLilithDeliveryIntro(s, 6, opts) },
  "campusEvent.beat": { params: [...STATE_PARAMS, "campusTier"],
    fn: (s, opts) => render('{campusEvent.beat}', createContext({
      subject: s, week: 6,
      globals: { campusFattening: (opts.campusTier || 0) > 0, campusTier: opts.campusTier || 0 },
    }), { trace: opts.trace }) },
  "device.flavor": { params: [...STATE_PARAMS, "device"],
    fn: (s, opts) => renderDeviceFlavor(opts.device || 'feeding_mask', s, 6, opts) },
  "device.catalog": { params: [...STATE_PARAMS, "device"],
    fn: (s, opts) => renderDeviceCatalogDesc(opts.device || 'feeding_mask', s, 6, opts) },
  "talk.coda": { params: STATE_PARAMS,
    fn: (s, opts) => render('{talk.coda}', createContext({ subject: s, week: 6 }), { trace: opts.trace }) },
  "dinner.waiter": { params: [...STATE_PARAMS, "dinnerVenue"],
    fn: (s, opts) => renderDinnerWaiter(opts.dinnerVenue || 'bistro', s, 6, opts) },
  "session.fullness": { params: [...STATE_PARAMS, "fullnessStage"],
    fn: (s, opts) => renderSessionFullness(s, Number(opts.fullnessStage ?? 2), 6, opts) },
  "session.aftermath": { params: [...STATE_PARAMS, "fullnessPct"],
    fn: (s, opts) => renderSessionAftermath(s, Number(opts.fullnessPct ?? 110), 6, opts) },
  "dinner.conv": { params: [...STATE_PARAMS, "dinnerConv"],
    fn: (s, opts) => renderDinnerConversation(opts.dinnerConv || DINNER_CONV_IDS[0], s, 6, opts) },
  "dinner.groupConv": { params: [...STATE_PARAMS, "groupConv", "refGirl"],
    fn: (s, opts) => {
      const ref = INIT_STUDENTS.find((st) => String(st.id) === opts.refGirl) || INIT_STUDENTS[1];
      return renderGroupDinnerConversation(opts.groupConv || GROUP_CONV_IDS[0], s, ref, 6, opts);
    } },
  "dinner.reaction.thinJealousy": { params: [...STATE_PARAMS, "refGirl", "reactionLevel"],
    fn: (s, opts) => {
      const ref = INIT_STUDENTS.find((st) => String(st.id) === opts.refGirl) || INIT_STUDENTS[1];
      return renderGroupDinnerReaction('thinJealousy', s, ref, 6, { ...opts, reactionLevel: Number(opts.reactionLevel ?? 1) });
    } },
  "dinner.reaction.fatEncourage": { params: [...STATE_PARAMS, "refGirl", "reactionLevel"],
    fn: (s, opts) => {
      const ref = INIT_STUDENTS.find((st) => String(st.id) === opts.refGirl) || INIT_STUDENTS[1];
      return renderGroupDinnerReaction('fatEncourage', s, ref, 6, { ...opts, reactionLevel: Number(opts.reactionLevel ?? 1) });
    } },
  "dinner.reaction.fatRetort": { params: [...STATE_PARAMS, "refGirl", "reactionLevel"],
    fn: (s, opts) => {
      const ref = INIT_STUDENTS.find((st) => String(st.id) === opts.refGirl) || INIT_STUDENTS[1];
      return renderGroupDinnerReaction('fatRetort', s, ref, 6, { ...opts, reactionLevel: Number(opts.reactionLevel ?? 0) });
    } },
  "dinner.reaction.thinContextual": { params: [...STATE_PARAMS, "refGirl", "reactionLevel"],
    fn: (s, opts) => {
      const ref = INIT_STUDENTS.find((st) => String(st.id) === opts.refGirl) || INIT_STUDENTS[1];
      return renderGroupDinnerReaction('thinContextual', s, ref, 6, { ...opts, reactionLevel: Number(opts.reactionLevel ?? 1) });
    } },
  "dinner.reaction.jealousyDefault": { params: [...STATE_PARAMS, "refGirl"],
    fn: (s, opts) => {
      const ref = INIT_STUDENTS.find((st) => String(st.id) === opts.refGirl) || INIT_STUDENTS[1];
      return renderGroupDinnerReaction('jealousyDefault', s, ref, 6, opts);
    } },
  "dinner.unbutton": { params: STATE_PARAMS,
    fn: (s, opts) => renderDinnerUnbutton(s, 6, opts) },
  "dinner.ending": { params: STATE_PARAMS,
    fn: (s) => renderDinnerEnding(s, 92, 100, 6) },
  "grow.sudden": { params: [...STATE_PARAMS, "growthZone"],
    fn: (s, opts) => {
      const zone = opts.growthZone && opts.growthZone !== 'random'
        ? opts.growthZone
        : resolveGrowthZone(s);
      return renderSuddenGrowthLine(s, { gainLbs: 6, growthZone: zone, week: 6 });
    } },
  "device.tick": { params: [...STATE_PARAMS, "device", "deviceDep"],
    fn: (s, opts) => {
      const deviceId = opts.device || 'auto_feeder_arm';
      const def = DEVICES[deviceId] || DEVICES.auto_feeder_arm;
      const dep = Number(opts.deviceDep || 0);
      const mockStudent = {
        ...s,
        deviceDependence: { ...s.deviceDependence, [def.id]: dep },
      };
      return renderDeviceTickLine({
        student: mockStudent,
        deviceId: def.id,
        deviceLabel: def.label,
        slot: def.slot || 'waist',
        gainLbs: 4,
        week: 6,
        attachmentIds: [],
        isMalfunction: false,
      });
    } },
  "campus.deviceEncounter": { params: ["girl", "stage"],
    fn: (s) => renderCampusDeviceEncounter(
      { name: s.name, type: 'student', archetype: s.archetype, lbs: s.lbs, studentId: s.id },
      'quad',
      MOCK_EXPLORATION,
    ) },
  "campus.deviceResult": { params: ["girl", "stage"],
    fn: (s) => renderCampusDeviceResult(
      { ...MOCK_ENCOUNTER, target: { ...MOCK_ENCOUNTER.target, name: s.name, lbs: s.lbs } },
      'remote_feeding_system',
      'stealth',
      { discovered: false, modeId: 'stealth' },
      'quad',
    ) },
  "hunger.interrupt": { params: STATE_PARAMS,
    fn: (s) => renderHungerInterrupt(s, 6) },
  "hunger.outcome.feed": { params: STATE_PARAMS,
    fn: (s) => renderHungerOutcome(s, 'feed', 6) },
  "hunger.outcome.deny": { params: STATE_PARAMS,
    fn: (s) => renderHungerOutcome(s, 'deny', 6) },
  "attitude.line": { params: STATE_PARAMS,
    fn: (s, opts) => renderAttitude(s, 6, opts) },
  "hive.intake": { params: ["girl", "stage", "corruption"],
    fn: (s) => {
      const lilith = INIT_STUDENTS.find(st => st.id === LILITH_ID) || { name: 'Lilith', lbs: 520, corruption: 90, bodyType: 'hourglass', relationship: 50 };
      const victims = [{ name: s.name, lbs: s.lbs, bodyType: s.bodyType, corruption: s.corruption, relationship: 0 }];
      return renderHiveIntake(lilith, victims, 6);
    } },
  "eat.scene": { params: [...STATE_PARAMS, "mealType", "locale"],
    fn: (s, opts) => renderEatScene(s, 6, {
      mealType: opts.mealType, locale: opts.locale, trace: opts.trace,
    }) },
  "slender.scene": { params: [...STATE_PARAMS, "gainStance"], stageMax: 4, corruptionMax: 0,
    fn: (s, opts) => renderSlenderScene(s, 6, { trace: opts.trace, weekGainLbs: 3 }) },
  "slender.eat": { params: [...STATE_PARAMS, "gainStance"], stageMax: 4, corruptionMax: 0,
    fn: (s, opts) => renderSlenderEatBeat(s, 6, { trace: opts.trace }) },
  "slender.mirror": { params: [...STATE_PARAMS, "gainStance"], stageMax: 4, corruptionMax: 0,
    fn: (s, opts) => renderSlenderMirrorBeat(s, 6, { trace: opts.trace, weekGainLbs: 2 }) },
  "campus.scene": { params: [...STATE_PARAMS, "locale"],
    fn: (s, opts) => renderCampusScene(s, 6, { locale: opts.locale, trace: opts.trace }) },
  "cloth.scene": { params: [...STATE_PARAMS, "clothingState"],
    fn: (s, opts) => renderClothScene(s, 6, { clothingState: opts.clothingState, trace: opts.trace }) },
  "immob.scene": { params: STATE_PARAMS, stageMin: 10,
    fn: (s, opts) => renderImmobScene(s, 6, { trace: opts.trace }) },
  "psychShift.scene": { params: STATE_PARAMS,
    fn: (s, opts) => renderPsychShift(s, 6, { lastCorruptionShift: true, trace: opts.trace }) },
};
const SECTION_KEYS = Object.keys(SECTIONS);

const PARAM_DEFS = [
  { key: "section", label: "Section", options: SECTION_KEYS },
  { key: "girl", label: "Girl", options: INIT_STUDENTS.map((s) => String(s.id)), optionLabel: (v) => INIT_STUDENTS.find((s) => String(s.id) === v)?.name || v },
  { key: "stage", label: "Stage", options: WEIGHT_STAGES.map((w) => String(w.id)), optionLabel: (v) => `${v} · ${WEIGHT_STAGES[Number(v)].label}` },
  { key: "corruption", label: "Corruption", options: ["0", "1", "2"], optionLabel: (v) => ({ 0: "0 · Hesitant", 1: "1 · Conflicted", 2: "2 · Broken In" })[v] },
  { key: "mood", label: "Mood", options: MOODS },
  { key: "hunger", label: "Hunger", options: ["0", "1", "2", "3", "4"] },
  { key: "addiction", label: "Addiction", options: ["0", "1", "2", "3", "4"] },
  { key: "withdrawal", label: "Withdrawal", options: ["no", "yes"] },
  { key: "campus", label: "Campus tier", options: ["0", "1", "2", "3"] },
  { key: "device", label: "Device", options: DEVICE_IDS, optionLabel: (v) => DEVICES[v]?.label || v },
  { key: "deviceDep", label: "Device dep", options: ["0", "15", "30", "55", "80"], optionLabel: (v) => `${v} (${({ 0: 'Low', 15: 'Low+', 30: 'Elevated', 55: 'High', 80: 'Extreme' })[v]})` },
  { key: "growthZone", label: "Growth zone", options: [...GROWTH_ZONES, "random"], optionLabel: (v) => v === 'random' ? 'auto (body type)' : v },
  { key: "locale", label: "Locale", options: CAMPUS_LOCALES },
  { key: "mealType", label: "Meal type", options: MEAL_TYPES },
  { key: "clothingState", label: "Clothing", options: CLOTHING_STATES },
  { key: "gainStance", label: "Gain stance", options: GAIN_STANCES, optionLabel: (v) => ({ opposed: "opposed · high shame", reluctant: "reluctant · shame crack", neutral: "neutral · unfussed", secret: "secret · hidden appetite" })[v] || v },
  { key: "dinnerConv", label: "Dinner topic", options: DINNER_CONV_IDS },
  { key: "dinnerVenue", label: "Dinner venue", options: ["bistro", "italian", "steakhouse", "french", "japanese", "private_club", "chefs_table", "home_dinner", "brunch_hall", "atelier"] },
  { key: "fullnessStage", label: "Fullness stg", options: ["0", "1", "2", "3", "4", "5"] },
  { key: "fullnessPct", label: "Fullness %", options: ["40", "80", "100", "130", "180"] },
  { key: "groupConv", label: "Group topic", options: GROUP_CONV_IDS },
  { key: "refGirl", label: "Ref girl", options: INIT_STUDENTS.map((s) => String(s.id)), optionLabel: (v) => INIT_STUDENTS.find((s) => String(s.id) === v)?.name || v },
  { key: "reactionLevel", label: "Reaction lvl", options: ["0", "1", "2", "3"] },
  { key: "reneeStage", label: "Reneé stage", options: ["5", "6", "7", "8", "9", "10"], optionLabel: (v) => `${v} · ${WEIGHT_STAGES[Number(v)]?.label || v}` },
  { key: "testerStage", label: "Tester stage", options: ["6", "7", "8", "9", "10"], optionLabel: (v) => `${v} · ${WEIGHT_STAGES[Number(v)]?.label || v}` },
  { key: "stagesJumped", label: "Stages jumped", options: ["1", "2", "3"] },
  { key: "digestLate", label: "Digest phase", options: ["early", "late"] },
  { key: "recipeId", label: "Recipe", options: ["milkshake", "cookies", "cake"] },
  { key: "foodKind", label: "Food kind", options: ["sweet", "hearty", "drink", "spread"] },
  { key: "feedRoom", label: "Feed room", options: ["eager", "filling", "tight", "past"], optionLabel: (v) => ({ eager: "eager · room to spare", filling: "filling · warming up", tight: "tight · waistband presses", past: "past · stuffed beyond" })[v] || v },
  { key: "gainBand", label: "Week gain", options: ["trace", "solid", "big", "huge"], optionLabel: (v) => ({ trace: "trace · 1–3 lbs", solid: "solid · 4–8 lbs", big: "big · 9–15 lbs", huge: "huge · 16+ lbs" })[v] || v },
  { key: "milestone", label: "Milestone", options: ["none", "stageup", "stuffed"], optionLabel: (v) => ({ none: "none", stageup: "↑ staged up", stuffed: "stuffed all week" })[v] || v },
];

function sectionFitsLockedParams(sectionKey, params) {
  const sec = SECTIONS[sectionKey];
  if (!sec) return false;
  if (sec.stageMin != null && params.stage !== RANDOM && Number(params.stage) < sec.stageMin) return false;
  if (sec.stageMax != null && params.stage !== RANDOM && Number(params.stage) > sec.stageMax) return false;
  if (sec.corruptionMax != null && params.corruption !== RANDOM && Number(params.corruption) > sec.corruptionMax) return false;
  return true;
}

// Resolve one sample's state: locked params stay, Random rolls fresh.
function rollSample(params) {
  const v = {};
  // Section first — its constraints shape the other rolls. A random
  // section respects a locked stage (no introBig for a small girl).
  if (params.section === RANDOM) {
    const eligible = SECTION_KEYS.filter((k) => sectionFitsLockedParams(k, params));
    v.section = pick(eligible.length ? eligible : SECTION_KEYS);
  } else {
    v.section = params.section;
  }
  const lockedSection = SECTIONS[v.section];
  const stageMin = lockedSection?.stageMin || 0;
  const stageMax = lockedSection?.stageMax;
  for (const def of PARAM_DEFS) {
    if (def.key === "section") continue;
    let options = def.options;
    if (def.key === "stage") {
      if (stageMin) options = options.filter((o) => Number(o) >= stageMin);
      if (stageMax != null) options = options.filter((o) => Number(o) <= stageMax);
    }
    v[def.key] = params[def.key] === RANDOM ? pick(options) : params[def.key];
  }
  const base = INIT_STUDENTS.find((s) => String(s.id) === v.girl);
  const stage = Number(v.stage);
  let addiction = Number(v.addiction);
  let hunger = Number(v.hunger);
  // mirror game rules: hunger 3+ needs addiction 2+; withdrawal needs addiction 2+
  if (hunger >= 3 && addiction < 2) addiction = 2;
  if (v.withdrawal === "yes" && addiction < 2) addiction = 2;
  const stanceKey = v.gainStance && v.gainStance !== RANDOM ? v.gainStance : null;
  const psych = stanceKey && PSYCH_BY_STANCE[stanceKey]
    ? { obsession: 25, dependence: 20, ...PSYCH_BY_STANCE[stanceKey] }
    : { fixation: 20, obsession: 30, dependence: 25, shame: 15 };
  const student = {
    ...base,
    lbs: WEIGHT_STAGES[stage].min + 10,
    corruption: COR_POINTS[v.corruption],
    mood: v.mood,
    hungerTier: hunger,
    addictionLevel: addiction,
    weeksWithoutPlayerFeed: v.withdrawal === "yes" ? 3 : 0,
    fullness: 10,
    stomachCapacity: 100,
    psych,
    weekStartLbs: WEIGHT_STAGES[stage].min,
  };
  const campusTier = Number(v.campus);
  const locale = v.locale === RANDOM ? pick(CAMPUS_LOCALES) : v.locale;
  const mealType = v.mealType === RANDOM ? pick(MEAL_TYPES) : v.mealType;
  const clothingState = v.clothingState === RANDOM ? deriveClothingState(student) : v.clothingState;
  const trace = [];
  const opts = {
    campusFattening: campusTier > 0,
    campusTier,
    trace,
    device: v.device,
    deviceDep: v.deviceDep,
    growthZone: v.growthZone,
    locale,
    mealType,
    clothingState,
    foodKind: v.foodKind,
    feedRoom: v.feedRoom,
    gainBand: v.gainBand,
    milestone: v.milestone,
  };
  const text = SECTIONS[v.section].fn(student, opts);
  // leaf fragments — the per-slot annotation units
  const leafNodes = trace.filter((t) => t.leaf && t.text.trim() && !t.key.startsWith("subject."));
  // skeleton nodes — depth-0 non-leaf templates (the "skeleton" the user wants to flag/inspect)
  const skeletonNodes = trace.filter((t) => !t.leaf && t.depth === 0 && t.text.trim() && !t.key.startsWith("subject."));
  // skeleton first so it's at the top of the flag annotator list
  const nodes = [...skeletonNodes, ...leafNodes];
  const stateLine =
    `${base.name} (id ${base.id}) · ${Math.round(student.lbs)} lbs (stage ${stage} ${WEIGHT_STAGES[stage].label})` +
    ` · corruption ${student.corruption} (tier ${getCorruptionTier(student.corruption).id})` +
    ` · mood ${v.mood} · hunger ${hunger} · addiction ${addiction}` +
    ` · withdrawal ${v.withdrawal} · campus ${campusTier}` +
    (lockedSection?.params?.includes('gainStance') ? ` · gainStance ${stanceKey || 'default'}` : '') +
    (lockedSection?.params?.includes('locale') ? ` · locale ${locale}` : '') +
    (lockedSection?.params?.includes('mealType') ? ` · meal ${mealType}` : '') +
    (lockedSection?.params?.includes('clothingState') ? ` · cloth ${clothingState}` : '');
  return { section: v.section, stateLine, text, nodes, fullTrace: trace, id: `${Date.now()}_${Math.random()}`, student, campusTier };
}

const selStyle = { background: "#181820", color: "#e0e0e0", border: "1px solid #444", borderRadius: 4, padding: "3px 4px", fontSize: 11, maxWidth: 150 };
const inputStyle = { background: "#181820", color: "#e0e0e0", border: "1px solid #555", borderRadius: 4, padding: "4px 6px", fontSize: 11, flex: 1 };

// Per-node annotation rows shown while flagging a sample.
function NodeAnnotator({ node, idx, anno, setAnno }) {
  const checked = idx in anno.notes;
  const editing = anno.open === idx;
  const toggle = () => {
    setAnno((a) => {
      const notes = { ...a.notes };
      if (checked) { delete notes[idx]; return { ...a, notes, open: a.open === idx ? null : a.open }; }
      notes[idx] = notes[idx] || "";
      return { ...a, notes, open: idx };
    });
  };
  return (
    <div style={{ marginBottom: 4 }}>
      <label style={{ display: "flex", gap: 6, alignItems: "flex-start", fontSize: 11, color: checked ? "#e0c090" : "#b0a890", cursor: "pointer" }}>
        <input type="checkbox" checked={checked} onChange={toggle} style={{ marginTop: 2 }} />
        <span><span style={{ color: "#7aa", fontSize: 9.5 }}>[{node.key}]</span> {node.text}</span>
      </label>
      {editing && (
        <div style={{ display: "flex", gap: 6, margin: "4px 0 4px 22px" }}>
          <input
            autoFocus
            style={inputStyle}
            placeholder={`What's the problem with [${node.key}]?`}
            value={anno.notes[idx] || ""}
            onChange={(e) => setAnno((a) => ({ ...a, notes: { ...a.notes, [idx]: e.target.value } }))}
            onKeyDown={(e) => { if (e.key === "Enter") setAnno((a) => ({ ...a, open: null })); }}
          />
          <button style={C.smBtn} onClick={() => setAnno((a) => ({ ...a, open: null }))}>Okay</button>
        </div>
      )}
      {checked && !editing && anno.notes[idx] && (
        <div style={{ margin: "2px 0 2px 22px", fontSize: 10, color: "#e0a050", fontStyle: "italic" }}>→ {anno.notes[idx]}</div>
      )}
    </div>
  );
}

// Slot Inspector helpers ─────────────────────────────────────────────────────

// Extract {slot} names from a raw variant template string
function extractSlotRefs(rawText) {
  if (!rawText || typeof rawText !== 'string') return [];
  const re = /\{([a-zA-Z][\w.]*)(?::[^|}]*)?(?:\|[^}]*)?\}/g;
  const found = [];
  const seen = new Set();
  let m;
  while ((m = re.exec(rawText)) !== null) {
    const key = m[1];
    if (!key.startsWith('subject.') && key !== 'join' && !seen.has(key)) {
      seen.add(key);
      found.push(key);
    }
  }
  return found;
}

// Find the most-specific non-leaf ancestor for a plain text segment
function findParentKey(plainText, fullTrace) {
  const trimmed = plainText.trim();
  if (!trimmed) return null;
  let best = null;
  let bestDepth = -1;
  for (const t of fullTrace) {
    if (!t.leaf && t.depth > bestDepth && t.text.includes(trimmed)) {
      best = { key: t.key, text: t.text };
      bestDepth = t.depth;
    }
  }
  return best;
}

function buildAnnotatedSegments(text, nodes) {
  let remaining = text;
  const segments = [];
  for (const node of nodes) {
    const idx = remaining.indexOf(node.text);
    if (idx === -1) continue;
    if (idx > 0) segments.push({ plain: remaining.slice(0, idx) });
    segments.push({ key: node.key, text: node.text });
    remaining = remaining.slice(idx + node.text.length);
  }
  if (remaining) segments.push({ plain: remaining });
  return segments;
}

function formatWhen(when) {
  if (!when || Object.keys(when).length === 0) return 'wildcard';
  return Object.entries(when)
    .map(([k, v]) => Array.isArray(v) ? `${k}:[${v.join(',')}]` : `${k}:${v}`)
    .join(' ');
}

function InspectorPanel({ initialKey, initialText, sampleCtx, fullTrace, onClose, onQuickFlag }) {
  const [stack, setStack] = useState([{ key: initialKey, text: initialText }]);
  const current = stack[stack.length - 1];
  const variants = getEligibleVariants(current.key, sampleCtx);

  const navigate = (key) => {
    const entry = (fullTrace || []).find(t => t.key === key);
    setStack(prev => [...prev, { key, text: entry?.text ?? '' }]);
  };
  const goBack = () => setStack(prev => prev.length > 1 ? prev.slice(0, -1) : prev);

  const panelStyle = {
    marginTop: 8, padding: 10,
    background: "rgba(20,40,70,0.95)", border: "1px solid #3060a0",
    borderRadius: 8, fontSize: 11,
  };
  const chipStyle = {
    display: "inline-block",
    background: "rgba(50,90,130,0.5)", border: "1px solid #3060a0",
    borderRadius: 3, padding: "1px 5px", cursor: "pointer",
    fontSize: 10, color: "#80c0e0", fontFamily: "monospace",
    marginRight: 4, marginTop: 3,
  };

  return (
    <div style={panelStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, gap: 4 }}>
        <div style={{ display: "flex", gap: 4, alignItems: "center", flexWrap: "wrap", flex: 1, minWidth: 0 }}>
          {stack.length > 1 && (
            <button style={{ ...C.smBtn, marginRight: 4 }} onClick={goBack}>← Back</button>
          )}
          {stack.map((frame, i) => (
            <span key={i} style={{ fontFamily: "monospace", fontSize: 10, color: i === stack.length - 1 ? "#70c0e0" : "#4a78a0" }}>
              {i > 0 && <span style={{ color: "#555", marginRight: 2 }}>›</span>}
              {frame.key}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
          <button
            style={{ ...C.smBtn, background: "rgba(120,40,40,0.55)" }}
            onClick={() => onQuickFlag(current.key, current.text)}
            title="Quick-flag this pool"
          >🚩</button>
          <button style={C.smBtn} onClick={onClose}>✕</button>
        </div>
      </div>
      {current.text && (
        <div style={{ color: "#c0a060", marginBottom: 8, fontStyle: "italic", fontSize: 10, wordBreak: "break-word" }}>
          Picked: "{current.text}"
        </div>
      )}
      {variants.length === 0 && <div style={{ color: "#888" }}>No eligible variants for current context.</div>}
      {variants.map((v, i) => (
        <div key={i} style={{ marginBottom: 8, paddingBottom: 8, borderBottom: i < variants.length - 1 ? "1px solid #2a4060" : "none" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
            <span style={{ color: "#50d090", fontWeight: "bold", minWidth: 36 }}>{v.probability}%</span>
            <span style={{ color: "#6090c0", fontSize: 10 }}>{formatWhen(v.when)}</span>
          </div>
          {v.texts.map((t, j) => {
            const isChosen = t === current.text;
            const subSlots = extractSlotRefs(t);
            return (
              <div key={j} style={{ paddingLeft: 8, marginBottom: subSlots.length ? 6 : 2 }}>
                <div style={{ color: isChosen ? "#e0c090" : "#a0b0c0", lineHeight: 1.5, fontStyle: isChosen ? "italic" : "normal" }}>
                  {isChosen && "→ "}{t}
                </div>
                {subSlots.length > 0 && (
                  <div style={{ marginTop: 2 }}>
                    {subSlots.map(ref => (
                      <span key={ref} style={chipStyle} onClick={() => navigate(ref)} title={`Inspect ${ref}`}>
                        {'{' + ref + '}'}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function DialogueLab({ onClose }) {
  const [params, setParams] = useState(() => Object.fromEntries(PARAM_DEFS.map((d) => [d.key, RANDOM])));
  const [samples, setSamples] = useState([]);
  const [flagged, setFlagged] = useState([]);
  const [phase, setPhase] = useState("lab");
  const [anno, setAnno] = useState(null); // { sampleId, notes: {nodeIdx: note}, open: nodeIdx|null }
  const [copied, setCopied] = useState(false);
  const [inspectMode, setInspectMode] = useState(false);
  const [inspector, setInspector] = useState(null); // { sampleId, key, resolvedText }

  const roll = () => { setSamples(Array.from({ length: 5 }, () => rollSample(params))); setAnno(null); setInspector(null); };
  const quickFlag = (sample, key, resolvedText) => {
    const entry = {
      id: `${sample.id}_${key}`,
      section: sample.section,
      stateLine: sample.stateLine,
      text: sample.text,
      problems: [{ key, text: resolvedText || '(skeleton)', note: '(flagged via inspector)' }],
    };
    addTextFlag(entry);
    setFlagged(prev => prev.some(f => f.id === entry.id) ? prev : [...prev, entry]);
  };
  const startFlag = (sample) => setAnno({ sampleId: sample.id, notes: {}, open: null });
  const saveFlag = (sample) => {
    const problems = Object.entries(anno.notes).map(([idx, note]) => ({
      key: sample.nodes[idx].key, text: sample.nodes[idx].text, note: note.trim(),
    }));
    const entry = { id: sample.id, section: sample.section, stateLine: sample.stateLine, text: sample.text, problems };
    addTextFlag(entry);
    setFlagged((prev) => prev.some((f) => f.id === sample.id)
      ? prev.map((f) => (f.id === sample.id ? entry : f))
      : [...prev, entry]);
    setAnno(null);
  };
  const isFlagged = (sample) => flagged.some((f) => f.id === sample.id);
  const copyAll = () => {
    navigator.clipboard?.writeText(formatTextFlagExport(flagged)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div style={{ ...C.overlay, alignItems: "flex-start", paddingTop: 16, overflowY: "auto", zIndex: 60 }}>
      <div style={{ ...C.modal, maxWidth: 760, width: "95%", maxHeight: "92vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: "#70c0e0" }}>🎲 DIALOGUE LAB</div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 10, color: flagged.length ? "#e0a050" : "#666" }}>🚩 {flagged.length} flagged</span>
            {phase === "lab" && (
              <button
                style={C.btn(inspectMode ? "#1a5050" : "#333")}
                onClick={() => { setInspectMode((m) => !m); setInspector(null); }}
              >
                {inspectMode ? "🔍 Inspecting" : "🔍 Inspect"}
              </button>
            )}
            {phase === "lab" && <button style={C.btn("#5a4010")} onClick={() => setPhase("review")} disabled={!flagged.length}>Done →</button>}
            <button style={C.btn("#333")} onClick={onClose}>✕ Close</button>
          </div>
        </div>

        {phase === "lab" && (
          <>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10, padding: 10, background: "rgba(255,255,255,0.04)", borderRadius: 8 }}>
              {PARAM_DEFS.map((def) => {
                const lockedSection = params.section !== RANDOM ? SECTIONS[params.section] : null;
                // dither params the selected section doesn't react to
                // (everything stays live while section is Random)
                const relevant = def.key === "section" || !lockedSection || lockedSection.params.includes(def.key);
                let options = def.options;
                if (def.key === "stage" && lockedSection) {
                  if (lockedSection.stageMin) options = options.filter((o) => Number(o) >= lockedSection.stageMin);
                  if (lockedSection.stageMax != null) options = options.filter((o) => Number(o) <= lockedSection.stageMax);
                }
                if (def.key === "corruption" && lockedSection?.corruptionMax != null) {
                  options = options.filter((o) => Number(o) <= lockedSection.corruptionMax);
                }
                const onChange = (e) => setParams((p) => {
                  const next = { ...p, [def.key]: e.target.value };
                  // picking a big-scale section invalidates a small locked stage
                  if (def.key === "section") {
                    const min = SECTIONS[e.target.value]?.stageMin;
                    const max = SECTIONS[e.target.value]?.stageMax;
                    if (min && next.stage !== RANDOM && Number(next.stage) < min) next.stage = RANDOM;
                    if (max != null && next.stage !== RANDOM && Number(next.stage) > max) next.stage = RANDOM;
                    const cmax = SECTIONS[e.target.value]?.corruptionMax;
                    if (cmax != null && next.corruption !== RANDOM && Number(next.corruption) > cmax) next.corruption = RANDOM;
                  }
                  return next;
                });
                return (
                  <label key={def.key} style={{ fontSize: 10, color: relevant ? "#aaa" : "#555", display: "flex", flexDirection: "column", gap: 2, opacity: relevant ? 1 : 0.35 }}>
                    {def.label}
                    <select style={selStyle} value={params[def.key]} disabled={!relevant} onChange={onChange}>
                      <option value={RANDOM}>🎲 Random</option>
                      {options.map((o) => (
                        <option key={o} value={o}>{def.optionLabel ? def.optionLabel(o) : o}</option>
                      ))}
                    </select>
                  </label>
                );
              })}
            </div>
            <button style={{ ...C.btn("#1a5878"), width: "100%", marginBottom: 12 }} onClick={roll}>
              🎲 Roll 5 {samples.length ? "again " : ""}(locked params stay, Random re-rolls per sample)
            </button>
            {samples.map((s) => {
              const annotating = anno?.sampleId === s.id;
              return (
                <div key={s.id} style={{ marginBottom: 10, padding: 10, background: "rgba(255,255,255,0.03)", borderRadius: 8, border: isFlagged(s) ? "1px solid #e0a05060" : annotating ? "1px solid #70c0e060" : "1px solid transparent" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "flex-start", marginBottom: 6 }}>
                    <div style={{ fontSize: 9.5, color: "#8aa", lineHeight: 1.5 }}>[{s.section}] {s.stateLine}</div>
                    {!annotating && (
                      <button
                        style={{ ...C.smBtn, background: isFlagged(s) ? "rgba(120,80,20,0.6)" : "rgba(120,40,40,0.4)", flexShrink: 0 }}
                        onClick={() => startFlag(s)}>
                        {isFlagged(s) ? "🚩 Re-flag" : "🚩 Flag"}
                      </button>
                    )}
                  </div>
                  {!annotating && !inspectMode && (
                    <div style={{ fontSize: 12, color: "#e0d0b0", lineHeight: 1.7, fontStyle: "italic", whiteSpace: "pre-wrap" }}>{s.text}</div>
                  )}
                  {!annotating && inspectMode && (() => {
                    const leafNodes = s.nodes.filter(n => !s.fullTrace?.find(t => t.key === n.key && t.depth === 0 && !t.leaf));
                    const segs = buildAnnotatedSegments(s.text, leafNodes);
                    const sampleCtx = buildTextContext({ subject: s.student, week: 6, campusFattening: s.campusTier > 0, campusTier: s.campusTier });
                    const inspThis = inspector?.sampleId === s.id ? inspector : null;
                    const rootKeys = (s.fullTrace || []).filter(t => t.depth === 0 && !t.leaf && t.text.trim() && !t.key.startsWith('subject.'));
                    return (
                      <>
                        {rootKeys.length > 0 && (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 6 }}>
                            <span style={{ fontSize: 10, color: "#557", marginRight: 2 }}>skeleton:</span>
                            {rootKeys.map(rk => (
                              <span
                                key={rk.key}
                                onClick={() => setInspector({ sampleId: s.id, key: rk.key, resolvedText: rk.text })}
                                style={{
                                  fontSize: 10, fontFamily: "monospace", cursor: "pointer",
                                  background: inspThis?.key === rk.key ? "rgba(80,160,200,0.35)" : "rgba(80,160,200,0.14)",
                                  border: `1px solid ${inspThis?.key === rk.key ? "#70c0e0" : "#2a5070"}`,
                                  borderRadius: 3, padding: "1px 5px", color: "#70c0d0",
                                }}
                                title={`Inspect skeleton: ${rk.key}`}
                              >{rk.key}</span>
                            ))}
                          </div>
                        )}
                        <div style={{ fontSize: 12, color: "#e0d0b0", lineHeight: 1.7, fontStyle: "italic", whiteSpace: "pre-wrap" }}>
                          {segs.map((seg, i) => {
                            if (seg.plain != null) {
                              const parent = findParentKey(seg.plain, s.fullTrace || []);
                              return parent
                                ? (
                                  <span
                                    key={i}
                                    title={`Part of: ${parent.key}`}
                                    onClick={() => setInspector({ sampleId: s.id, key: parent.key, resolvedText: parent.text })}
                                    style={{
                                      cursor: "pointer",
                                      background: inspThis?.key === parent.key ? "rgba(80,160,200,0.15)" : "transparent",
                                      borderBottom: "1px dotted #2a5070",
                                    }}
                                  >{seg.plain}</span>
                                )
                                : <span key={i}>{seg.plain}</span>;
                            }
                            return (
                              <span
                                key={i}
                                title={seg.key}
                                onClick={() => setInspector({ sampleId: s.id, key: seg.key, resolvedText: seg.text })}
                                style={{
                                  background: inspThis?.key === seg.key ? "rgba(80,160,200,0.3)" : "rgba(80,160,200,0.12)",
                                  borderBottom: `1px dashed ${inspThis?.key === seg.key ? "#70c0e0" : "#3080a0"}`,
                                  cursor: "pointer",
                                  borderRadius: 2,
                                }}
                              >
                                {seg.text}
                              </span>
                            );
                          })}
                        </div>
                        {inspThis && (
                          <InspectorPanel
                            key={inspThis.key + inspThis.resolvedText}
                            initialKey={inspThis.key}
                            initialText={inspThis.resolvedText}
                            sampleCtx={sampleCtx}
                            fullTrace={s.fullTrace}
                            onClose={() => setInspector(null)}
                            onQuickFlag={(key, text) => quickFlag(s, key, text)}
                          />
                        )}
                      </>
                    );
                  })()}
                  {annotating && (
                    <>
                      <div style={{ fontSize: 10, color: "#70c0e0", marginBottom: 6 }}>Check the node(s) that are wrong, say why, then save:</div>
                      {s.nodes.map((n, idx) => (
                        <NodeAnnotator key={idx} node={n} idx={idx} anno={anno} setAnno={setAnno} />
                      ))}
                      <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                        <button style={{ ...C.btn("#5a4010"), flex: 1 }} onClick={() => saveFlag(s)}>
                          💾 Save flag ({Object.keys(anno.notes).length} problem{Object.keys(anno.notes).length === 1 ? "" : "s"})
                        </button>
                        <button style={C.btn("#333")} onClick={() => setAnno(null)}>Cancel</button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </>
        )}

        {phase === "review" && (
          <>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <button style={C.btn("#1a5878")} onClick={() => setPhase("lab")}>← Back to lab</button>
              <button style={{ ...C.btn(copied ? "#206030" : "#5a4010"), flex: 1 }} onClick={copyAll}>
                {copied ? "✓ Copied!" : `📋 Copy all ${flagged.length} (text + state + problems)`}
              </button>
            </div>
            {flagged.map((f, i) => (
              <div key={f.id} style={{ marginBottom: 10, padding: 10, background: "rgba(120,80,20,0.08)", borderRadius: 8, border: "1px solid #e0a05030" }}>
                <div style={{ fontSize: 9.5, color: "#c0a070", marginBottom: 6 }}>#{i + 1} · [{f.section}] {f.stateLine}</div>
                <div style={{ fontSize: 12, color: "#e0d0b0", lineHeight: 1.7, fontStyle: "italic", whiteSpace: "pre-wrap" }}>{f.text}</div>
                {f.problems.map((p, j) => (
                  <div key={j} style={{ fontSize: 10, color: "#e0a050", marginTop: 4 }}>
                    ⚠ <span style={{ color: "#7aa" }}>[{p.key}]</span> "{p.text}" → {p.note || "(no note)"}
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
