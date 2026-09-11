// The Squad — Lead: A1 Mobile | Support: A6 Slender, A5 Editor
// Recording opening / take — leftover-aware skeletons. Unique miniGames text is fallback.
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';

registerPool('recording.open.setup', [
  { when: { leftoverFed: true, stageMax: 4 }, weight: 4, text: [
    'Camera up. Galley leftover still in {subject.name}. She sits like the first take already started in the kitchen.',
    'Ring light, then foil heat. {subject.name} pretends this is only filming.',
  ] },
  { when: { leftoverFed: true }, weight: 4, text: [
    'Last night\'s tray plus a lens. {subject.name} fills the chair before you call action.',
    'Kitchen heat under the outfit. She leans toward the camera already eating with her posture.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'You saw her after hours. Daylight filming uses the same appetite with better lighting.',
  ] },
  { when: { stageMax: 4, corruption: [0] }, weight: 3, text: [
    '{subject.name} sits neat for the lens. The waistband already has a different opinion.',
    'She smiles for the first mark. Softness answers before the clap.',
  ] },
  { when: { stageMin: 5, stageMax: 7 }, weight: 3, text: [
    'The chair takes more of her. She lets it. The camera loves the spill.',
    'Belly already in her lap. She adjusts the frame around it, not away from it.',
  ] },
  { when: { stageMin: 8 }, weight: 3, text: [
    'The set is a shoreline. {subject.name} is the tide. You roll because standing would waste the shot.',
    'Custom clothes, oversized chair, a middle that arrives first. Action is a formality.',
  ] },
  { when: {}, text: [
    '{subject.name} sits for the camera like the meal is part of the blocking.',
    'Ring light warm. She is warmer. You call the first mark.',
    'The lens finds her. She lets it. Appetite is already in the shot.',
  ] },
]);

registerPool('recording.open.growth', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Leftover heat plus stage food. Her middle reports both before the clap.',
    'The first swallow is easier because the galley already opened her.',
  ] },
  { when: { stageMax: 4 }, weight: 3, text: [
    'Each bite leaves a little more of her in the frame. She calls it posture.',
    'A new softness answers first. The clapboard does not have a column for that.',
  ] },
  { when: { stageMin: 5, stageMax: 7 }, weight: 3, text: [
    'Her belly rounds warmer against the table. Fabric argues. She keeps the take.',
    'Thighs take more of the chair. The camera stays. So does she.',
  ] },
  { when: { stageMin: 8 }, weight: 3, text: [
    'The gut surges in slow waves. The shot gets heavier without a cut.',
    'Vastness finishes moving after the swallow. The lens is patient. So is the belly.',
  ] },
  { when: {}, text: [
    'Fullness builds while the camera runs. She lets it.',
    'The body arrives between marks. Soft, warm, on schedule.',
    'She eats until the take has a middle the playback cannot crop.',
  ] },
]);

registerPool('recording.open.line', [
  { when: { leftoverFed: true }, weight: 3, text: [
    '"I already ate," {subject.name} says, fork still moving. "This is the logged second sitting."',
    'She glances at her middle. "Leftovers count. So does this."',
  ] },
  { when: { stageMax: 4, corruption: [0] }, weight: 3, text: [
    '"Just a few bites for the shot," she says, already committed.',
  ] },
  { when: {}, text: [
    '"Rolling," she says, which is also "feeding."',
    'She looks at the lens, then at the plate. The looking is the rest of the setup.',
    '"One more," {subject.name} says, before you ask.',
  ] },
]);

registerPool('recording.opening.scene', [
  { when: {}, text: [
    '{recording.open.setup} {recording.open.growth} {recording.open.line}',
    '{recording.open.setup} {recording.open.line} {recording.open.growth}',
    '{recording.open.growth} {recording.open.setup} {recording.open.line}',
  ] },
]);

registerPool('recording.take.setup', [
  { when: { leftoverFed: true }, weight: 4, text: [
    'Another take. Galley leftover still in her. She treats the plate like continuity.',
    'The kitchen sitting has not left. This take is stacked on it.',
  ] },
  { when: { takeQuality: 'perfect' }, weight: 3, text: [
    'The take locks. She eats like the clip already won.',
  ] },
  { when: { takeQuality: 'messy' }, weight: 3, text: [
    'The take wobbles. She laughs into the next bite and keeps the camera honest.',
  ] },
  { when: { stageMin: 6 }, weight: 3, text: [
    'The chair complains. She does not. The take continues around the complaint.',
  ] },
  { when: {}, text: [
    'Clap. Plate. She gives the lens the swallow.',
    'Another mark. Another bite. The middle keeps the receipts.',
    'You call the take. She answers with appetite.',
  ] },
]);

registerPool('recording.take.growth', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Heat from earlier plus this bite. Softness does the continuity work.',
  ] },
  { when: { takeQuality: 'perfect' }, weight: 3, text: [
    'The gain lands clean. Playback will show the swell arriving on cue.',
  ] },
  { when: { stageMax: 4 }, weight: 3, text: [
    'A little more against the waistband. She files it as lighting.',
  ] },
  { when: { stageMin: 8 }, weight: 3, text: [
    'Mass keeps arriving after you cut. The wrap will have to wait on it.',
  ] },
  { when: {}, text: [
    'The bite stays. So does the softness.',
    'Frame fills from the middle out.',
    'She swallows. The take gets heavier.',
  ] },
]);

registerPool('recording.take.line', [
  { when: { leftoverFed: true, takeQuality: 'perfect' }, weight: 4, text: [
    '"Both sittings," she says, satisfied, palm on the new weight.',
  ] },
  { when: { takeQuality: 'perfect' }, weight: 3, text: [
    '"That\'s the one," she says, already reaching for the next bite.',
  ] },
  { when: { takeQuality: 'good' }, weight: 3, text: [
    '"Keep it," she says. The belly agrees.',
  ] },
  { when: {}, text: [
    'She looks from playback to plate. The looking is another take.',
    '"Again," {subject.name} says, fond of the word.',
    'The camera is still rolling in her posture.',
  ] },
]);

registerPool('recording.take.scene', [
  { when: {}, text: [
    '{recording.take.setup} {recording.take.growth} {recording.take.line}',
    '{recording.take.setup} {recording.take.line} {recording.take.growth}',
    '{recording.take.growth} {recording.take.setup} {recording.take.line}',
  ] },
]);

export function renderRecordingOpeningBeat(student, week, stageIdx = 0) {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { featureId: 'recording_session', recordingStage: stageIdx },
  });
  return render('{recording.opening.scene}', ctx)?.trim() || '';
}

export function renderRecordingTakeBeat(student, week, stageIdx = 0, quality = 'okay') {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: {
      featureId: 'recording_session',
      recordingStage: stageIdx,
      takeQuality: quality || 'okay',
    },
  });
  return render('{recording.take.scene}', ctx)?.trim() || '';
}
