// Generate weeklyEvent/depth.js, weighIn/depth.js, settling/depth.js
// Pad weekly.*, wi.*, set.* catch-all (when: {}) pools to ≥3 wildcard texts.
// Run: node scripts/generateSceneDepthPass37.mjs
import { writeFileSync } from 'fs';

const OUT = {
  weekly: 'src/textEngine/scenes/weeklyEvent/depth.js',
  wi: 'src/textEngine/scenes/weighIn/depth.js',
  taliaWi: 'src/textEngine/scenes/talia/wiAsideDepth.js',
  settling: 'src/textEngine/scenes/settling/depth.js',
};

const WEEKLY_ALTS = {
  'weekly.chairBreaks.buildup': [
    'The chair protests under {subject.name} long before anything breaks.',
  ],
  'weekly.chairBreaks.break': [
    'Wood gives way with a sound the whole room hears.',
    'The seat fails without warning; {subject.name} catches herself on instinct.',
  ],
  'weekly.chairBreaks.afterDialogue': [
    'After class she admits the chair had been complaining for weeks.',
    'After class: "New chair, please." She pats her middle. "I earned this one."',
  ],
  'weekly.chair_breaks': [
    '{weekly.chairBreaks.buildup} {weekly.chairBreaks.break} {weekly.chairBreaks.playerAid}',
    '{weekly.chairBreaks.buildup} {weekly.chairBreaks.break} {weekly.chairBreaks.afterDialogue}',
  ],
  'weekly.team_weigh_in': [
    '{weekly.teamWeighIn.dodge} {weekly.teamWeighIn.forced} {weekly.teamWeighIn.verdict} {weekly.teamWeighIn.afterDialogue}',
  ],
  'weekly.uniform_split': [
    '{weekly.uniformSplit.incident} {weekly.uniformSplit.recovery}',
    '{weekly.uniformSplit.incident} {weekly.uniformSplit.afterDialogue}',
  ],
  'weekly.viral_post': [
    '{weekly.viralPost.hook} {weekly.viralPost.line}',
    '{weekly.viralPost.reaction} {weekly.viralPost.line}',
  ],
  'weekly.thesis_rewrite': [
    '{weekly.thesisRewrite.submit} {weekly.thesisRewrite.verdict}',
    '{weekly.thesisRewrite.title} {weekly.thesisRewrite.verdict}',
  ],
  'weekly.gaming_sponsor': [
    '{weekly.gamingSponsor.deal} {weekly.gamingSponsor.tag}',
    '{weekly.gamingSponsor.line} {weekly.gamingSponsor.tag}',
  ],
  'weekly.intervention_fails': [
    '{weekly.interventionFails.setup} {weekly.interventionFails.payoff}',
    '{weekly.interventionFails.turn} {weekly.interventionFails.payoff}',
  ],
  'weekly.art_exhibition': [
    '{weekly.artExhibition.opening} {weekly.artExhibition.line}',
    '{weekly.artExhibition.press} {weekly.artExhibition.line}',
  ],
  'weekly.quiet_opens_up': [
    '{weekly.quietOpen.setup} {weekly.quietOpen.close}',
    '{weekly.quietOpen.confession} {weekly.quietOpen.close}',
  ],
  'weekly.overachiever_pivot': [
    '{weekly.overachieverPivot.submit}',
    '{weekly.overachieverPivot.verdict}',
  ],
  'weekly.transfer_settled': [
    '{weekly.transferSettled.call} {weekly.transferSettled.after}',
    '{weekly.transferSettled.answer} {weekly.transferSettled.after}',
  ],
  'weekly.custom_clothing': [
    '{weekly.customClothing.announce} {weekly.customClothing.line}',
    '{weekly.customClothing.tone} {weekly.customClothing.line}',
  ],
  'weekly.immobility_peace': [
    '{weekly.immobilityPeace.scene} {weekly.immobilityPeace.tag}',
    '{weekly.immobilityPeace.line} {weekly.immobilityPeace.tag}',
  ],
  'weekly.blob_ending': [
    '{weekly.blobEnding.setup} {weekly.blobEnding.line}',
    '{weekly.blobEnding.court} {weekly.blobEnding.line}',
  ],
};

const WI_ALTS = {
  'wi.needleVerb': ['dragged', 'inched'],
  'wi.mobilityClause': [''],
  'wi.soundClause': [''],
  'wi.scaleAttitude': [
    'She keeps her eyes on you until the scale is unavoidable.',
  ],
  'wi.platformReact': [
    'the platform taking her weight without comment',
  ],
  'wi.needleReact': [
    'The needle hunts, then finds its answer.',
    'The dial shudders before settling.',
  ],
  'wi.stepOff': [
    '{wi.numberSettle} {subject.name} {wi.dismount}{wi.platformAfter|prefix:, }.',
  ],
  'wi.dismount': [
    'steps down from the platform',
    'leaves the scale behind her',
  ],
  'wi.dismountBody': [''],
  'wi.platformAfter': [
    'the scale rocking once before stilling',
  ],
  'wi.numberLine': [
    'She reads {subject.lbs} and goes quiet.',
    '"{subject.lbs}," she says, like filing a fact.',
  ],
  'wi.replyDialogue': [
    'She takes the number in and nods once.',
    '"Okay," she says. "Same time next week."',
  ],
  'wi.foodAsk': ['', ''],
  'wi.swap': [
    '{wi.swapWave}',
    '{wi.swapPlatform}',
  ],
};

const TALIA_WI_ALTS = {
  'wi.taliaAside': ['', ''],
};

const SET_ALTS = {
  'set.care.tend.beat': [
    'Small attentions at her scale — cushions shifted, warmth tended, presence steady.',
  ],
  'set.care.tend.react': [
    'She exhales into the care and does not ask you to stop.',
  ],
  'set.care.tend': [
    '{set.care.tend.beat}',
    '{set.care.tend.react}{set.enorm|prefix: }',
  ],
  'set.socialize.gossip': [
    'You bring campus news; she sorts it from where she rests.',
  ],
  'set.socialize.confide': [
    'You tell her something real. She holds it without rushing to fix it.',
  ],
  'set.socialize.praise': [
    '{set.socialize.praise.react}',
    '{set.socialize.praise.line}',
  ],
  'set.socialize.praise.line': [
    '"Every week there is more of you," you say, palm sinking into warm softness. "I love watching it happen."',
  ],
  'set.socialize.praise.react': [
    'She receives the praise like warmth — slow, settling, pleased.',
  ],
  'set.feed.preferred': [
    'You bring what she craves. She opens before you finish setting it down.',
    'Her preference is known now. You meet it without ceremony.',
  ],
  'set.feed.spread': [
    'You lay out enough for an afternoon. She starts without commentary.',
  ],
  'set.feed.stuffing': [
    'You offer one more past full. She takes it anyway.',
  ],
  'set.gather': [
    'Others drift in and settle around her warmth. The room becomes hers.',
    'Her court gathers without summons — close enough to share heat and gossip.',
  ],
  'set.weigh.travel': [
    'Weigh-day means going to her. You find her exactly where she always is.',
  ],
  'set.weigh.rig': [
    'Pads slide beneath her mass; the rig totals what the floor has held all week.',
  ],
  'set.weigh.number': [
    'The cells sum to {subject.lbs}. You read it aloud; she listens.',
  ],
  'set.weigh.react': [
    'She lets the number settle over her, warm and satisfied.',
  ],
  'set.weigh.approach': [
    '{set.weigh.travel}',
    '{set.weigh.rig}',
  ],
  'set.weigh.result': [
    '{set.weigh.number}',
    '{set.weigh.react}',
  ],
  'set.enorm': [
    'Her warmth reaches you before you are close enough to touch.',
  ],
};

function esc(s) {
  return JSON.stringify(s);
}

function emitDepth(namespace, alts, passLabel) {
  const lines = [
    '// The Squad — Lead: A5 Editor | Support: A1 Mobile',
    `// Auto-generated — run: node scripts/generateSceneDepthPass37.mjs`,
    `// Wildcard depth for ${namespace} pools (${passLabel}).`,
    "import { registerModuleVariants } from '../../engine.js';",
    '',
  ];
  for (const [key, extras] of Object.entries(alts)) {
    const textList = extras.map((t) => esc(t)).join(', ');
    lines.push(`registerModuleVariants(${esc(key)}, [{ when: {}, text: [${textList}] }]);`);
  }
  return `${lines.join('\n')}\n`;
}

writeFileSync(OUT.weekly, emitDepth('weekly.*', WEEKLY_ALTS, 'Pass 37'));
writeFileSync(OUT.wi, emitDepth('wi.*', WI_ALTS, 'Pass 37'));
writeFileSync(OUT.taliaWi, emitDepth('wi.taliaAside', TALIA_WI_ALTS, 'Pass 37'));
writeFileSync(OUT.settling, emitDepth('set.*', SET_ALTS, 'Pass 37'));

console.log(`generateSceneDepthPass37: ${Object.keys(WEEKLY_ALTS).length} weekly pools → ${OUT.weekly}`);
console.log(`generateSceneDepthPass37: ${Object.keys(WI_ALTS).length} wi pools → ${OUT.wi}`);
console.log(`generateSceneDepthPass37: ${Object.keys(TALIA_WI_ALTS).length} talia wi pools → ${OUT.taliaWi}`);
console.log(`generateSceneDepthPass37: ${Object.keys(SET_ALTS).length} set pools → ${OUT.settling}`);
