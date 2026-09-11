// The Squad — Lead: A5 Editor | Support: A1 Mobile, A6 Slender
// Slot-composed recording-session beats. Renderers prefer these over monoliths.
import { registerPool, registerDimension } from '../../engine.js';

registerDimension('recordingAction', (ctx) => ctx.globals?.recordingAction ?? '');

registerPool('recording.open.scene', [
  { when: {}, text: [
    '{recording.open.setup} {recording.open.body}',
    '{recording.open.body} {recording.open.setup}',
    '{recording.open.setup}\n\n{recording.open.body}',
  ]},
]);

registerPool('recording.open.setup', [
  { when: {}, text: [
    'Ring light on. Tripod waiting. She is already on the bed like the shot started without you.',
    'The dorm is quiet except for the lights. She looks at the lens, then at you.',
    'Camera in your hands. She settles. The extra of her makes the mattress honest.',
  ]},
]);

registerPool('recording.open.body', [
  { when: {}, text: [
    '{word.size} of her fills the frame before she even eats. Soft mass, heat, the crop top losing.',
    'Belly between her thighs. She smiles into the lens like the take is already a promise.',
    'You read the week on her. {word.body} arriving half a beat before she says she is ready.',
  ]},
  { when: { stageMax: 4 }, weight: 2, text: [
    'Still a person on a bed with a camera. The softness is a rumor she keeps feeding.',
  ]},
  { when: { stageMin: 8 }, weight: 2, text: [
    'At this size the bed is a set. She does not get up. You bring the frame to her.',
  ]},
]);

registerPool('recording.take.scene', [
  { when: {}, text: [
    '{recording.take.setup} {recording.take.body}',
    '{recording.take.body} {recording.take.setup}',
    '{recording.take.setup}\n\n{recording.take.body}',
  ]},
]);

registerPool('recording.take.setup', [
  { when: {}, text: [
    'Rolling. She looks into the lens with the kind of hunger that wants a witness.',
    'The take begins. She sits like the chair and the bed are the same assignment.',
    'Camera live. She is ready to eat for you and for the channel in the same breath.',
  ]},
]);

registerPool('recording.take.body', [
  { when: {}, text: [
    '{word.size} of her is the subject. Soft mass working. She does not hide it.',
    'Belly forward. She chews like the swallow is the beat you came to film.',
    'The frame fills with her. Heat. The extra that was not here last week.',
  ]},
]);

registerPool('recording.direction.scene', [
  { when: {}, text: [
    '{recording.direction.setup} {recording.direction.body}',
    '{recording.direction.body} {recording.direction.setup}',
    '{recording.direction.setup}\n\n{recording.direction.body}',
  ]},
]);

registerPool('recording.direction.setup', [
  { when: {}, text: [
    'You call the shot. She takes it in her body first, then her mouth.',
    'Direction, then food. The lens stays. She uses both.',
    'A note from behind the camera. She adjusts. The extra of her follows.',
  ]},
  { when: { recordingAction: 'angle_low' }, weight: 4, text: [
    'You drop the camera. From below, her middle is the whole sky of the shot.',
    'Low angle. Belly hangs into the frame. She eats like she knows the worship is the point.',
  ]},
  { when: { recordingAction: 'angle_wide' }, weight: 4, text: [
    'You pull back. The room has to make room. She fills a generous portion of it.',
    'Wide shot. Bed, belly, the dorm shrinking around the fact of her.',
  ]},
  { when: { recordingAction: 'angle_close' }, weight: 4, text: [
    'You move in. Cheeks, swallow, the upper curve of her pressing the bottom of the frame.',
    'Close. She looks into the lens while she chews. The rest of her is implied and obvious.',
  ]},
  { when: { recordingAction: 'food_heavy' }, weight: 4, text: [
    'Dense food, both hands. She moans around the first bite like the calories were a cue.',
    'Heavy tray. She lifts it into herself. The middle takes the receipt on camera.',
  ]},
  { when: { recordingAction: 'food_build' }, weight: 4, text: [
    'Light, then heavier. She likes the paced stack. The belly rounds on a schedule.',
    'You build the meal. She smiles between bites like the escalation was the scene.',
  ]},
  { when: { recordingAction: 'food_hers' }, weight: 4, text: [
    'She picks. Richest option, no performance of surprise. The choice is the heat.',
    'Her hand goes to the dense one. She wanted you to watch her choose it.',
  ]},
  { when: { recordingAction: 'food_kitchen' }, weight: 4, text: [
    'Hall kitchen leftovers, still warm. She takes the tray like it was waiting off-camera.',
    'Floor seconds on the shoot. The tray looks small against her. She empties it.',
  ]},
  { when: { recordingAction: 'pace_push' }, weight: 4, text: [
    'You push the pace. She keeps eating. The softness answers faster.',
    'More, keep going. She obeys with flushed cheeks and a middle that does not pause.',
  ]},
  { when: { recordingAction: 'pace_settle' }, weight: 4, text: [
    'You let her set the rhythm. Slow swallows. The sensuality builds because nobody hurries it.',
    'Her pace. She savors. The belly rounds like it has all afternoon.',
  ]},
  { when: { recordingAction: 'pace_surge' }, weight: 4, text: [
    'Pause, let it land, then surge. She eats into the second wind on purpose.',
    'Hold. Then the push. The extra of her arrives in two beats and the lens catches both.',
  ]},
]);

registerPool('recording.direction.body', [
  { when: {}, text: [
    '{word.size} of her resettles. Soft mass, heat, a half-inch more in the lights.',
    'She puts the extra where the next bite can use it. The camera stays.',
    'Warmth, press, the take getting truer. Then food.',
  ]},
  { when: { stageMin: 8 }, weight: 2, text: [
    'At this size the direction is geography. You move the frame. She occupies it.',
  ]},
]);

registerPool('recording.result.scene', [
  { when: {}, text: [
    '{recording.result.setup} {recording.result.body}',
    '{recording.result.body} {recording.result.setup}',
    '{recording.result.setup}\n\n{recording.result.body}',
  ]},
]);

registerPool('recording.result.setup', [
  { when: {}, text: [
    'You watch the take back. The frame is full of her. The question is how true it got.',
    'Playback. She leans in to see herself eat. The extra of her is the subject.',
    'Monitor glow. She is still on the bed, still warm, still waiting on the verdict.',
  ]},
  { when: { takeQuality: 'perfect' }, weight: 4, text: [
    'Perfect take. The lens caught the swallow and the pride in the same beat.',
    'You do not need a second look. The clip is the body doing exactly what you asked.',
  ]},
  { when: { takeQuality: 'great' }, weight: 4, text: [
    'Great take. Heat, softness, the look she saved for you. Keepable.',
    'The footage sparkles. She knows. She is already thinking about one more bite for the next.',
  ]},
  { when: { takeQuality: 'good' }, weight: 3, text: [
    'Good take. Usable, warm, honest. The extra of her reads on camera.',
    'Solid clip. She looks heavier than the last session and she likes that it shows.',
  ]},
  { when: { takeQuality: 'okay' }, weight: 3, text: [
    'Okay take. Serviceable. The size is there. The spark is waiting on another pass.',
    'Fine footage. She is still the subject. The next take can be hungrier.',
  ]},
]);

registerPool('recording.result.body', [
  { when: {}, text: [
    '{word.size} of her fills the playback. Soft mass, heat, the crop top still losing.',
    'Belly in the frame. She watches herself chew like the clip was a promise kept.',
    'The extra that was not here last week is the whole shot. She does not hide it.',
  ]},
]);
