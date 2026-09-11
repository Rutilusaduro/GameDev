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
