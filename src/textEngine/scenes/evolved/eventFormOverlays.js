// Per-form evolved event overlays (batch) — complements streamer/sumo/salon/gallery files.
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
};

function poolKeyFor(formId) {
  return `evolved.scene.form.${formId}`;
}

const ENDING_SKELETON = '{evolved.ending.streamCoda|prefix:} {evolved.ending.relGain|prefix: }';

for (const [formId, lines] of Object.entries(FORM_LINES)) {
  const pk = poolKeyFor(formId);
  registerPool(pk, [{ when: {}, weight: 2, text: lines }]);
  const skeleton = `{${pk}|prefix:} {evolved.scene.atmosphere|prefix:} {evolved.scene.stakes|prefix: } {evolved.scene.hungerCue|prefix: }`;
  const stages = EVOLVED_EVENTS[formId];
  if (!Array.isArray(stages)) continue;
  stages.forEach((evDef, stageIdx) => {
    (evDef.phases || []).forEach((_, phaseIdx) => {
      registerModuleVariants(`evolved.event.${formId}.s${stageIdx}.p${phaseIdx}`, [
        {
          when: { evolvedFormId: [formId], weekMin: 20 },
          weight: 5,
          priority: 5,
          text: [skeleton],
        },
      ]);
    });
  });
}
