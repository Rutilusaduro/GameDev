// Per-form evolved event overlays — all main EVOLVED_EVENTS forms (except dedicated fragment files).
import { registerPool, registerModuleVariants } from '../../engine.js';
import { EVOLVED_EVENTS } from '../../../gameData/evolvedEvents.js';

const SKIP = new Set(['sumo', 'eating_streamer', 'salon_appetit', 'artisan_gallery']);

const FORM_LINES = {
  eating_captain: [
    'Competition bib strains; the crowd learns her name before the horn.',
    'Maya\'s marker cap clicks shut — rivalry sweet as funnel-cake smoke.',
    'Captain energy turns edible; every weigh-in reads like a pep rally for appetite.',
    'Late-semester circuit air smells like mustard and policy — she owns both.',
  ],
  state_fair_queen: [
    'Cotton candy haze and hay-scent braid around the scale — Mary Jane stands taller in the heat.',
    'Crowd noise swells when the judge calls her number; pride sits on her hips like a crown.',
    'Funnel cake grease on her fingers; she smiles like the fair never ends.',
    'Phones rise for the weigh-in; co-conspirator laughter follows every official pound.',
  ],
  homeroom_queen: [
    'Oven heat pools in the lounge; Calloway posters curl while flour dusts the counter.',
    'Wide tables groan under test batches — clipboard stays closed, appetite stays open.',
    'Floor check-in energy turns buttery; wellness framing ready before paperwork.',
    'Tuesday ritual hums: mothers, daughters, seconds without debate.',
  ],
  ranked_feedee: [
    'Cart squeaks down the hall; Rae arrives like a deadline made of warm trays.',
    'Clipboard, timer, second helping — session clock starts when shame leaves the room.',
    'Focus bar and food queue braid together; Destiny treats fullness like a ranked win.',
    'Late-semester sessions feel scripted — every bite logged, every pound celebrated.',
  ],
  wife_lessons: [
    'Yeasty warmth and gingham — fat is what makes a home feel like home.',
    'Steam and sweetness braid until the circle eats like policy the hall already voted for.',
    'Mary Jane\'s doctrine lands soft; daughters lean in, bellies rounding without apology.',
    'Table groans under every favorite; witness energy turns appetite into ritual.',
  ],
  feedee_creator: [
    'Ring light on two creators; chat donates to mutual growth like it is the format.',
    'Collab tables groan; Wren-types watch from the edges, hungry and loyal.',
    'Subscriber hunger mirrors on-camera appetite — honesty as content, softness as brand.',
    'Late-semester collabs feel inevitable — plates, cameras, pounds in parallel.',
  ],
  chapter_hostess: [
    'Wednesday feast steam rolls down the hall; chapter girls arrive already complicit.',
    'Wine, lace, and portion towers — hostess energy turns appetite into architecture.',
    'She sets the table like a throne; every guest learns to stay for seconds.',
    'Late-semester chapter nights smell like butter and belonging.',
  ],
  homestead_queen: [
    'Cinnamon and brown sugar cling to her apron — harvest identity worn soft and wide.',
    'Preserves gleam on the counter; the homestead rewards every honest appetite.',
    'Hay-scent memory meets kitchen heat; she feeds like the land taught her.',
    'Late-semester visitors leave heavier, happier, unsurprised.',
  ],
  community_researcher: [
    'Lane-captain log open beside an empty plate — case study and appetite share one notebook.',
    'Pool-deck steam fades; she documents floor meals with the same focus as interval splits.',
    'Clipboard margins fill with intake curves; she signs herself as witness and variable.',
    'Late-semester immersion means eating with the team — hunger as data, data as hunger.',
  ],
  home_nest: [
    'Delivery bags stack at the door like a nest wall — warmth, lavender, optional outside world.',
    'She arranges pillows and portions; the room learns her shape before the hallway does.',
    'Softness becomes architecture — every order another brick in a cozy, edible fortress.',
    'Late-semester nights: door closed, appetite honest, the building optional.',
  ],
  campus_legend: [
    'Booth steam and gossip braid — everyone claims they knew her before the myth.',
    'She feeds the line like a ritual; freshmen learn appetite from a woman who became folklore.',
    'Photos spread faster than menus; her belly leads the story the campus tells itself.',
    'Late-semester legend status means seconds are expected, refusals are remembered.',
  ],
  psych_researcher: [
    'Hall log columns align with snack trays — clinical tone, hungry variables.',
    'She watches residents eat like a trial; her own appetite enters the dataset without apology.',
    'Clipboard, lanyard, second helping — wellness framing ready for IRB and appetite alike.',
    'Late-semester notes blur observer and subject; every page wants more weight on the graph.',
  ],
  machine_goddess: [
    'Solder scent and warm paste — workshop hums while harness prototypes learn her curves.',
    'LED status pins blink along sleeves; she feeds the builds the way builds feed her.',
    'Blueprints treat flesh as tunable; appetite is just another input with delicious output.',
    'Late-semester lab nights: machines chew, belts cinch, inventor grows with invention.',
  ],
};

function poolKeyFor(formId) {
  return `evolved.scene.form.${formId}`;
}

const CHOICE_SKELETON = '{evolved.choice.chatReact|prefix:} {evolved.choice.bodyResult|prefix: }';
const ENDING_SKELETON = '{evolved.ending.streamCoda|prefix:} {evolved.ending.relGain|prefix: }';

function defaultLines(formId) {
  return [
    `${formId} path — appetite public, body proud, hall already complicit.`,
    'Fabric strains; chairs apologize; she keeps eating like the ending is hers.',
    'Late-semester evolved beats feel tender and absolute — growth on purpose.',
    'Every choice tonight shows on the scale and in the retelling she wants.',
  ];
}

function wireForm(formId, skeleton) {
  const stages = EVOLVED_EVENTS[formId];
  if (!Array.isArray(stages)) return;
  stages.forEach((evDef, stageIdx) => {
    (evDef.phases || []).forEach((_, phaseIdx) => {
      const phaseKey = `evolved.event.${formId}.s${stageIdx}.p${phaseIdx}`;
      registerModuleVariants(phaseKey, [
        {
          when: { evolvedFormId: [formId], weekMin: 20 },
          weight: 5,
          priority: 5,
          text: [skeleton],
        },
      ]);
      const phase = evDef.phases[phaseIdx];
      for (const ch of phase?.choices || []) {
        if (!ch?.id) continue;
        registerModuleVariants(`${phaseKey}.${ch.id}`, [
          {
            when: { evolvedFormId: [formId], weekMin: 18 },
            weight: 4,
            priority: 4,
            text: [CHOICE_SKELETON],
          },
        ]);
      }
    });
    (evDef.endings || []).forEach((_, endingIdx) => {
      registerModuleVariants(`evolved.event.${formId}.s${stageIdx}.end${endingIdx}`, [
        {
          when: { evolvedFormId: [formId], weekMin: 18 },
          weight: 4,
          priority: 4,
          text: [ENDING_SKELETON],
        },
      ]);
    });
  });
}

for (const formId of Object.keys(EVOLVED_EVENTS)) {
  if (SKIP.has(formId)) continue;
  const lines = FORM_LINES[formId] ?? defaultLines(formId);
  const pk = poolKeyFor(formId);
  registerPool(pk, [{ when: {}, weight: 2, text: lines }]);
  const skeleton = `{${pk}|prefix:} {evolved.scene.atmosphere|prefix:} {evolved.scene.stakes|prefix: } {evolved.scene.hungerCue|prefix: }`;
  wireForm(formId, skeleton);
}
