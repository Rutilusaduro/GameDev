// Weekly narrative incidents — late-game floor-echo overlays on composed skeletons.
import { registerPool, registerModuleVariants } from '../../engine.js';

registerPool('weekly.scene.floorEcho', [
  {
    when: {},
    weight: 2,
    text: [
      'Late-semester floor gossip travels fast — appetite dressed as news, growth as lifestyle.',
      'Hall Ambiance carries whispers down the wing; someone always smells like seconds.',
      'Residents peek out like the hallway itself is hungry for the story.',
      'Wellness framing stays thin; the incident stays thick and unmistakably bodily.',
      'Every pound on display feels like policy the hall already voted for.',
    ],
  },
]);

const OVERLAYS = [
  {
    key: 'weekly.uniform_split',
    skeleton: '{weekly.scene.floorEcho|prefix:} {weekly.uniformSplit.incident|prefix:} {weekly.uniformSplit.recovery|prefix: } {weekly.uniformSplit.afterDialogue|prefix: }',
  },
  {
    key: 'weekly.viral_post',
    skeleton: '{weekly.scene.floorEcho|prefix:} {weekly.viralPost.hook|prefix:} {weekly.viralPost.reaction|prefix: } {weekly.viralPost.line|prefix: }',
  },
  {
    key: 'weekly.chair_breaks',
    skeleton: '{weekly.scene.floorEcho|prefix:} {weekly.chairBreaks.buildup|prefix:} {weekly.chairBreaks.break|prefix: } {weekly.chairBreaks.afterDialogue|prefix: }',
  },
  {
    key: 'weekly.team_weigh_in',
    skeleton: '{weekly.scene.floorEcho|prefix:} {weekly.teamWeighIn.dodge|prefix:} {weekly.teamWeighIn.forced|prefix: } {weekly.teamWeighIn.verdict|prefix: }',
  },
  {
    key: 'weekly.gaming_sponsor',
    skeleton: '{weekly.scene.floorEcho|prefix:} {weekly.gamingSponsor.deal|prefix:} {weekly.gamingSponsor.line|prefix: } {weekly.gamingSponsor.tag|prefix: }',
  },
  {
    key: 'weekly.thesis_rewrite',
    skeleton: '{weekly.scene.floorEcho|prefix:} {weekly.thesisRewrite.submit|prefix:} {weekly.thesisRewrite.verdict|prefix: }',
  },
  {
    key: 'weekly.intervention_fails',
    skeleton: '{weekly.scene.floorEcho|prefix:} {weekly.interventionFails.setup|prefix:} {weekly.interventionFails.payoff|prefix: }',
  },
  {
    key: 'weekly.art_exhibition',
    skeleton: '{weekly.scene.floorEcho|prefix:} {weekly.artExhibition.opening|prefix:} {weekly.artExhibition.line|prefix: }',
  },
  {
    key: 'weekly.quiet_opens_up',
    skeleton: '{weekly.scene.floorEcho|prefix:} {weekly.quietOpen.setup|prefix:} {weekly.quietOpen.close|prefix: }',
  },
  {
    key: 'weekly.overachiever_pivot',
    skeleton: '{weekly.scene.floorEcho|prefix:} {weekly.overachieverPivot.submit|prefix:} {weekly.overachieverPivot.verdict|prefix: }',
  },
  {
    key: 'weekly.transfer_settled',
    skeleton: '{weekly.scene.floorEcho|prefix:} {weekly.transferSettled.call|prefix:} {weekly.transferSettled.after|prefix: }',
  },
  {
    key: 'weekly.custom_clothing',
    skeleton: '{weekly.scene.floorEcho|prefix:} {weekly.customClothing.announce|prefix:} {weekly.customClothing.line|prefix: }',
  },
  {
    key: 'weekly.immobility_peace',
    skeleton: '{weekly.scene.floorEcho|prefix:} {weekly.immobilityPeace.scene|prefix:} {weekly.immobilityPeace.line|prefix: } {weekly.immobilityPeace.tag|prefix: }',
  },
  {
    key: 'weekly.blob_ending',
    skeleton: '{weekly.scene.floorEcho|prefix:} {weekly.blobEnding.setup|prefix:} {weekly.blobEnding.line|prefix: }',
  },
];

for (const { key, skeleton } of OVERLAYS) {
  registerModuleVariants(key, [
    {
      when: { weekMin: 22 },
      weight: 6,
      priority: 6,
      text: [skeleton],
    },
    {
      when: { weekMin: 16 },
      weight: 4,
      priority: 4,
      text: [skeleton],
    },
  ]);
}
