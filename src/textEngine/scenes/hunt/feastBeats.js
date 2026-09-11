// The Squad — Lead: A2 Psych | Support: A3 Immobility, A5 Editor
// Lilith hunt feast — slot skeleton replacing FEAST_BY_STAGE as the player-facing scene.
import { registerDimension, registerPool } from '../../engine.js';

registerDimension('feastStage', (ctx) => ctx.globals?.feastStage ?? 0);

// Shape: FULL SENTENCE. Lure / approach.
registerPool('hunt.feast.lure', [
  { when: { feastStage: [0, 1] }, weight: 4, text: [
    'Incense, goth bass, a low-cut black top. Lilith at {subject.lbs} lbs lures him in with a whisper he mistakes for his idea.',
    'Narrow hips, a door left open. He grins like he chose this. She already has.',
  ] },
  { when: { feastStage: [2, 3, 4] }, weight: 4, text: [
    'She glides him inside on a teasing smile. {subject.lbs} lbs of gothic excess. His hands reach for yielding flesh.',
    'Corset working, potbelly leading. He drinks her in. She lets him believe he is the hunter.',
  ] },
  { when: { feastStage: [5, 6] }, weight: 4, text: [
    'She waddles him into the room. Belly first. {subject.lbs} lbs. He stares like drowning would be a privilege.',
    'Doorframe reports her hips. She laughs him closer. Hunger is already deciding.',
  ] },
  { when: { feastStage: [7, 8] }, weight: 4, text: [
    'No more seduction theater. She corners him with mass, belly pinning warmth, breasts resting on the gut that found him.',
    'Stall latch. Common-area plaster. She is {subject.lbs} lbs and the hunger does not wait for privacy.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'Galley leftover still in her. The hunt is a second course she already started.',
    'Kitchen tray from earlier. Prey on top of it. She hums like both were courses.',
  ] },
  { when: { huntSeasoned: true }, weight: 3, text: [
    'She has marked men before. The lure is lazy now. Confidence in the swallow to come.',
  ] },
  { when: {}, text: [
    'She draws him into dim incense and bass. The invitation was never his.',
    'A finger on his chest. A door. The particular smile that means hunger has a name.',
    'He follows the sway. She follows the appetite. Only one of those is honest.',
  ] },
]);

// Shape: FULL SENTENCE. The take / swallow.
registerPool('hunt.feast.take', [
  { when: { feastStage: [0, 1, 2] }, weight: 3, text: [
    'Jaw unhinges with eerie grace. Throat muscles pull. He slides into heat that was waiting.',
    'His hands were on her curves. Then her mouth is the whole argument. One long swallow.',
  ] },
  { when: { feastStage: [3, 4, 5, 6] }, weight: 3, text: [
    'She takes him in wet, rhythmic gulps. Already-vast body stretching around the meal.',
    'Dark lips part. The swallow is practice. Her mass makes room by becoming more of itself.',
  ] },
  { when: { feastStage: [7, 8] }, weight: 3, text: [
    'She engulfs him where they stand. Partitions, plaster, whoever might hear. She does not care.',
    'Belly pins. Jaw works. The campus keeps its other business. This is hers.',
  ] },
  { when: {}, text: [
    'She swallows. Heat. The prey is a course. The body is the table.',
    'One greedy motion and he is going down. She hums around the work.',
    'Throat, then belly. She catalogs the slide like a woman who intends to do this again.',
  ] },
]);

// Shape: FULL SENTENCE. Growth-as-event.
registerPool('hunt.feast.growth', [
  { when: { feastStage: [0, 1] }, weight: 4, text: [
    'Warmth blooms. Flat chest and concave belly round into first lush handfuls. Hips crack wider. She moans into the new of her.',
    'A euphoric shudder. Softness arrives in cheeks, thighs, breasts. She caresses every new inch like a prize.',
  ] },
  { when: { feastStage: [2, 3, 4] }, weight: 4, text: [
    'Ecstasy balloons her. Belly into a heavy dome. Ass into shelves. Breasts spilling lace. Hands greedy on the expansion.',
    'Potbelly sags lower. Thighs press together. She is {subject.lbs} lbs becoming more, and she pets the becoming.',
  ] },
  { when: { feastStage: [5, 6] }, weight: 4, text: [
    'A surge slams through her. Gut floor-grazing. Seams gone. Furniture creaks. She gropes the fresh mass in shameless rapture.',
    'Hips smash wider. Breasts slosh onto the new gut. She occupies the room the way a result occupies a log.',
  ] },
  { when: { feastStage: [7, 8] }, weight: 4, text: [
    'Cataclysmic swell. Stall walls buckle. Plaster cracks. She moans into mountainous softness that did not exist a swallow ago.',
    'Clothes shred. Pillars of thigh. Pendulous orbs slapping the gut. She stays where she is and lets it finish arriving.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'Kitchen leftover was already working. The feast lands on warm dough. Softness arrives faster.',
  ] },
  { when: {}, text: [
    'Heat spreads after the last gulp. Hips, breasts, belly. She smiles at the catalog.',
    'The prey is gone. The softness is not. Black-nailed hands keep it.',
    'Growth happens in the swallow\'s after. She keeps a hand on the new weight like a kept thing.',
  ] },
]);

// Shape: DIALOGUE BEAT / close.
registerPool('hunt.feast.line', [
  { when: { feastStage: [9] }, weight: 4, text: [
    '"Come closer, Mia," she says from the couch that has become the whole room. "I want you to get a good look."',
    'Mia whispers that it is so soft. Lilith lets her. Then the gut decides.',
  ] },
  { when: { feastStage: [0, 1, 2] }, weight: 3, text: [
    'She moans, black nails in new lush inches, already thinking about the next invitation.',
    'A pleased sound. The hunt heard it. She is already hungry again.',
  ] },
  { when: {}, text: [
    'She pets the fresh weight. Softness is the trophy. She intends to keep winning.',
    'A low hum. Hands roaming. The body keeps arriving after the scene names itself done.',
    'She smiles the slow one. Softness is the trophy. She intends to keep winning.',
  ] },
]);

// Shape: FULL SENTENCE. Stage-9 delivery / Mia.
registerPool('hunt.feast.mia.lure', [
  { when: {}, text: [
    'Too large to leave. She orders delivery. Knock, silence, recalculation. Mia steps in and stops dead at the mountain on the bed.',
    'The hallway is theoretical. Mia was 350 pounds last week and still looks small. "Lilith?!"',
    'Bag in the doorway. Mia\'s hands already reaching, trembling, into warm yielding slope.',
  ] },
]);

registerPool('hunt.feast.mia.take', [
  { when: {}, text: [
    'Mia kneads belly, lifts a breast she can barely hold, presses her own heavy middle in. Then the gut surges and pins her.',
    'Awe, touch, then engulf. Lilith\'s jaw takes Mia\'s head and shoulders. Powerful swallows. Room-filling stretch.',
    'The delivery was never the bag. Lilith lunges. Mia\'s muffled cry becomes heat going down.',
  ] },
]);

registerPool('hunt.feast.mia.growth', [
  { when: {}, text: [
    'The final surge hits harder. Belly detonates into a room-filling paunch. Hips smash the bed frame. Breasts like pale moons on the new gut.',
    'Furniture gives. Drywall cracks. She crosses a weight she had only dreamed, immobile and triumphant and still hungry in theory.',
    'She gropes every vast new inch. The room has to accept her. It does. Mia is the reason it has to.',
  ] },
]);

registerPool('hunt.feast.scene', [
  { when: { feastStage: [9] }, weight: 5, text: [
    '{hunt.feast.mia.lure} {hunt.feast.mia.take} {hunt.feast.mia.growth} {hunt.feast.line}',
    '{hunt.feast.mia.lure} {hunt.feast.line} {hunt.feast.mia.take} {hunt.feast.mia.growth}',
    '{hunt.feast.mia.take} {hunt.feast.mia.growth} {hunt.feast.mia.lure} {hunt.feast.line}',
  ] },
  { when: {}, text: [
    '{hunt.feast.lure} {hunt.feast.take} {hunt.feast.growth} {hunt.feast.line}',
    '{hunt.feast.lure} {hunt.feast.line} {hunt.feast.take} {hunt.feast.growth}',
    '{hunt.feast.take} {hunt.feast.growth} {hunt.feast.lure} {hunt.feast.line}',
  ] },
]);
