// The Squad — Lead: A4 Architect | Support: A2 Psych
// Evolved forms — engine bridge from EVOLVED_EVENTS legacy prose.
import { buildTextContext } from '../../../gameData/textContext.js';
import { render } from '../../engine.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import '../proseOverhaulPass3.js';
import '../proseOverhaulPass4.js';
import './salonGalleryBeats.js';
import './activityBeats.js';
import './formBeats.js';
import './extraFormBeats.js';

/** Evolved form → optional second depth pool appended after evolved.v2.depth */
const EVOLVED_FORM_POOLS = {
  salon_appetit: 'evolved.salon.v2.depth',
  artisan_gallery: 'evolved.gallery.v2.depth',
  cultivator: 'evolved.cultivator.v2.depth',
  feedee_creator: 'evolved.feedee.v2.depth',
  machine_goddess: 'evolved.machine.v2.depth',
  pharmacist: 'evolved.pharmacist.v2.depth',
  competitive_gainer: 'evolved.gainer.v2.depth',
  homeroom_queen: 'evolved.homeroomQueen.v2.depth',
};

const EVOLVED_AFTERGLOW = {
  salon_appetit: 'salon.afterglow',
  artisan_gallery: 'gallery.afterglow',
};

const EVOLVED_BEATS = {
  salon_appetit: 'evolved.salon.beat',
  artisan_gallery: 'evolved.gallery.beat',
  eating_competitor: 'evolved.circuit.beat',
  pharmacist: 'evolved.pharmacist.beat',
  cultivator: 'evolved.cultivator.beat',
  eating_streamer: 'evolved.streamer.beat',
  homeroom_queen: 'evolved.homeroom.beat',
  wife_lessons: 'evolved.wife.beat',
  eating_captain: 'evolved.captain.beat',
  big_squad_captain: 'evolved.captain.beat',
  feedee_creator: 'evolved.feedee.beat',
  chapter_hostess: 'evolved.hostess.beat',
  campus_legend: 'evolved.legend.beat',
  machine_goddess: 'evolved.machine.beat',
  ranked_feedee: 'evolved.ranked.beat',
  home_nest: 'evolved.nest.beat',
  sumo: 'evolved.sumo.beat',
  speed_eater: 'evolved.speed.beat',
  asmr_creator: 'evolved.asmr.beat',
  eating_diarist: 'evolved.diarist.beat',
  food_photographer: 'evolved.photo.beat',
  body_positive_creator: 'evolved.bodypos.beat',
  food_researcher: 'evolved.research.beat',
  food_tourist: 'evolved.tourist.beat',
  homestead_queen: 'evolved.homestead.beat',
  state_fair_queen: 'evolved.fair.beat',
  ff_author: 'evolved.author.beat',
  psych_researcher: 'evolved.psych.beat',
  community_researcher: 'evolved.community.beat',
  body_positive_greek: 'evolved.greek.beat',
  installation_artist: 'evolved.install.beat',
  anonymous_blogger: 'evolved.blogger.beat',
  delivery_hive: 'evolved.hive.beat',
  competitive_gainer: 'evolved.gainer.beat',
};
export function renderEvolvedEventProse(text, student, week = 1, opts = {}) {
  const line = typeof text === 'string' ? text.trim() : '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: {
      featureId: opts.formId || student?.evolvedForm || 'evolved',
      stageIdx: opts.stageIdx ?? null,
      phaseIdx: opts.phaseIdx ?? null,
      leftoverFed: !!student?.leftoverFedThisWeek,
      ...(opts.globals || {}),
    },
    ...opts,
  });
  const chance = opts.v2DepthChance ?? 0.3;
  const formId = opts.formId || student?.evolvedForm;
  const beatKey = EVOLVED_BEATS[formId] || null;
  const beat = (!opts.skipBeats && beatKey)
    ? (render(`{${beatKey}}`, ctx)?.trim() || '')
    : '';
  const unique = beat ? '' : line;
  if (!unique && !beat) return '';
  let out = appendV2Depth(beat || unique, 'evolved', ctx, chance);
  const formPool = EVOLVED_FORM_POOLS[formId];
  if (formPool && out?.trim() && Math.random() < chance * 0.85) {
    const extra = render(`{${formPool}}`, ctx)?.trim();
    if (extra) out = `${out}\n\n${extra}`;
  }
  const glowKey = EVOLVED_AFTERGLOW[formId];
  if (glowKey && opts.ending && out?.trim()) {
    const glow = render(`{${glowKey}}`, ctx)?.trim();
    if (glow) out = `${out}\n\n${glow}`;
  }
  const lingerChance = opts.ending || student?.leftoverFedThisWeek || (week && student?.lastNightVisitWeek === week) ? 1 : 0.72;
  if (out?.trim() && Math.random() < lingerChance) {
    const linger = render('{evolved.linger}', ctx)?.trim();
    if (linger) out = `${out}\n\n${linger}`;
  }
  return out;
}

/** One-shot evolved activity — slot skeleton, then linger/afterglow wrap. */
export function renderEvolvedActivityBeat(student, week = 1, stageIdx = 0, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: {
      featureId: opts.formId || student.evolvedForm || 'evolved',
      stageIdx,
      leftoverFed: !!student.leftoverFedThisWeek,
      ...(opts.globals || {}),
    },
    ...opts,
  });
  const scene = render('{evolved.activity.scene}', ctx)?.trim();
  if (!scene) return '';
  return renderEvolvedEventProse(scene, student, week, {
    formId: opts.formId || student.evolvedForm,
    stageIdx,
    ending: true,
    skipBeats: true,
    v2DepthChance: opts.v2DepthChance ?? 0.35,
    globals: opts.globals,
  });
}
