// The Squad — Lead: A5 Editor | Support: A1 Mobile
// Auto-generated — run: node scripts/generateSceneDepthPass37.mjs
// Wildcard depth for weekly.* pools (Pass 37).
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants("weekly.chairBreaks.buildup", [{ when: {}, text: ["The chair protests under {subject.name} long before anything breaks."] }]);
registerModuleVariants("weekly.chairBreaks.break", [{ when: {}, text: ["Wood gives way with a sound the whole room hears.", "The seat fails without warning; {subject.name} catches herself on instinct."] }]);
registerModuleVariants("weekly.chairBreaks.afterDialogue", [{ when: {}, text: ["After floor rounds she admits the chair had been complaining for weeks.", "After floor rounds: \"New chair, please.\" She pats her middle. \"I earned this one.\""] }]);
registerModuleVariants("weekly.chair_breaks", [{ when: {}, text: ["{weekly.chairBreaks.buildup} {weekly.chairBreaks.break} {weekly.chairBreaks.playerAid}", "{weekly.chairBreaks.buildup} {weekly.chairBreaks.break} {weekly.chairBreaks.afterDialogue}"] }]);
registerModuleVariants("weekly.team_weigh_in", [{ when: {}, text: ["{weekly.teamWeighIn.dodge} {weekly.teamWeighIn.forced} {weekly.teamWeighIn.verdict} {weekly.teamWeighIn.afterDialogue}"] }]);
registerModuleVariants("weekly.uniform_split", [{ when: {}, text: ["{weekly.uniformSplit.incident} {weekly.uniformSplit.recovery}", "{weekly.uniformSplit.incident} {weekly.uniformSplit.afterDialogue}"] }]);
registerModuleVariants("weekly.viral_post", [{ when: {}, text: ["{weekly.viralPost.hook} {weekly.viralPost.line}", "{weekly.viralPost.reaction} {weekly.viralPost.line}"] }]);
registerModuleVariants("weekly.thesis_rewrite", [{ when: {}, text: ["{weekly.thesisRewrite.submit} {weekly.thesisRewrite.verdict}", "{weekly.thesisRewrite.title} {weekly.thesisRewrite.verdict}"] }]);
registerModuleVariants("weekly.gaming_sponsor", [{ when: {}, text: ["{weekly.gamingSponsor.deal} {weekly.gamingSponsor.tag}", "{weekly.gamingSponsor.line} {weekly.gamingSponsor.tag}"] }]);
registerModuleVariants("weekly.intervention_fails", [{ when: {}, text: ["{weekly.interventionFails.setup} {weekly.interventionFails.payoff}", "{weekly.interventionFails.turn} {weekly.interventionFails.payoff}"] }]);
registerModuleVariants("weekly.art_exhibition", [{ when: {}, text: ["{weekly.artExhibition.opening} {weekly.artExhibition.line}", "{weekly.artExhibition.press} {weekly.artExhibition.line}"] }]);
registerModuleVariants("weekly.quiet_opens_up", [{ when: {}, text: ["{weekly.quietOpen.setup} {weekly.quietOpen.close}", "{weekly.quietOpen.confession} {weekly.quietOpen.close}"] }]);
registerModuleVariants("weekly.overachiever_pivot", [{ when: {}, text: ["{weekly.overachieverPivot.submit}", "{weekly.overachieverPivot.verdict}"] }]);
registerModuleVariants("weekly.transfer_settled", [{ when: {}, text: ["{weekly.transferSettled.call} {weekly.transferSettled.after}", "{weekly.transferSettled.answer} {weekly.transferSettled.after}"] }]);
registerModuleVariants("weekly.custom_clothing", [{ when: {}, text: ["{weekly.customClothing.announce} {weekly.customClothing.line}", "{weekly.customClothing.tone} {weekly.customClothing.line}"] }]);
registerModuleVariants("weekly.immobility_peace", [{ when: {}, text: ["{weekly.immobilityPeace.scene} {weekly.immobilityPeace.tag}", "{weekly.immobilityPeace.line} {weekly.immobilityPeace.tag}"] }]);
registerModuleVariants("weekly.blob_ending", [{ when: {}, text: ["{weekly.blobEnding.setup} {weekly.blobEnding.line}", "{weekly.blobEnding.court} {weekly.blobEnding.line}"] }]);
