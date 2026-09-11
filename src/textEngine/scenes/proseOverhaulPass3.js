// The Squad — Lead: A5 Editor | Support: A6 Slender, A1 Mobile, A2 Psych
// Pass 3 linger slots for remaining families. New pools only.
import { registerPool, hasModule } from '../engine.js';

function oncePool(key, variants) {
  if (hasModule(key)) return;
  registerPool(key, variants);
}

oncePool('ge.linger', [
  { when: { stageMax: 3, corruption: [0] }, weight: 2, text: [
    'She tugs cloth that almost still works and files the warmth as weather.',
    'The change is small enough to deny and too warm to forget on the walk back.',
  ] },
  { when: { stageMin: 4, stageMax: 7 }, weight: 2, text: [
    'She rests both hands on the new of her and leaves them there a beat too long.',
    'The room has to learn her outline again. She enjoys the lesson.',
  ] },
  { when: { stageMin: 8 }, weight: 2, text: [
    'Settling takes minutes. She takes the minutes like rent she is happy to pay.',
    'The body keeps arriving after the cause is gone. She lets it.',
    'Vastness finishes moving. Warmth does not.',
  ] },
  { when: {}, text: [
    'Heat fades. Softness stays. She breathes around it like furniture.',
    'She looks down, then at you. The looking is the rest of the scene.',
    'Whatever caused it already finished. She is the result walking around.',
  ] },
]);

oncePool('weekly.linger', [
  { when: {}, text: [
    'The floor will retell this by Sunday, rounder in the telling.',
    'She carries the incident in her clothes. The clothes are already losing.',
    'You log nothing. The body is the minutes.',
  ] },
]);

oncePool('hunt.linger', [
  { when: {}, text: [
    'Hunger walks the path with her. The path makes room without being asked.',
    'Campus keeps its lights. She keeps her appetite and a slower gait.',
    'The hunt ends in someone feeding her without calling it that.',
  ] },
]);

oncePool('recording.afterglow', [
  { when: { leftoverFed: true, stageMax: 4 }, weight: 3, text: [
    'Camera down. Galley leftover still answering under the costume. She sits in both.',
    'Ring light off. Kitchen heat plus the take. The clip is the second sitting.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'You pack the lens. Last night\'s tray is still in her. So is the take.',
    'The camera is down. Leftover heat does not take direction.',
  ] },
  { when: {}, text: [
    'The camera is down. She is still eating the way the take taught her.',
    'Ring light off. Belly still answering. The clip already happened in her.',
    'You pack the lens. She does not pack the fullness.',
  ] },
]);

oncePool('contest.afterglow', [
  { when: {}, text: [
    'The table is wreckage. She is the rest of the event, sitting in it.',
    'Crowd noise fades. Fullness does not. She keeps a hand on the new weight.',
    'Maya looks over. The look is measurement. The measurement is hungry.',
  ] },
]);

oncePool('sumo.afterglow', [
  { when: {}, text: [
    'Dohyo dust on her. Mass still arriving after the bout called itself over.',
    'She breathes like a door closing. The ring remembers her outline.',
    'Dana resets. So does the belly. Only one of those is smaller now.',
  ] },
]);

oncePool('salon.afterglow', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Candles gut. Galley leftover still in Chloé. Prestige is the second sitting.',
    'Guests leave. Kitchen heat stays. She finishes both.',
  ] },
  { when: {}, text: [
    'Candles gut. Prestige stays. Chloé sits like the evening is still a course.',
    'Guests leave slower than they arrived. She eats the last of their leaving.',
    '*Encore* hangs in the silk. Nobody pretends it was a question.',
  ] },
]);

oncePool('gallery.afterglow', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'The shutter stops. Galley leftover still in the subject. Fiona pins both sittings.',
    'Prints dry. Kitchen heat does not. The wall of proof gains last night too.',
  ] },
  { when: {}, text: [
    'The shutter stops. The body in the frame does not. Fiona pins both.',
    'Prints dry. Softness does not. The wall of proof gains a new inch.',
    'Patrons murmur. She eats while they look. The looking is the caption.',
  ] },
]);

oncePool('wife.afterglow', [
  { when: {}, text: [
    'The lesson ends. The kitchen does not. Someone is still tasting.',
    'Moms leave with containers. Daughters leave with more of themselves.',
    'She wipes the counter and keeps a hand on her middle like a grade.',
  ] },
]);

oncePool('wife.linger', [
  { when: { stageMax: 3 }, weight: 2, text: [
    'She checks her shirt in the microwave door and files the new curve as steam.',
    'The kitchen light finds a softness she did not schedule. She lets it stay.',
  ] },
  { when: {}, text: [
    'Wine glasses sit dirty. Softness sits honest. Nobody hurries the doorway.',
    'She takes one more taste from the pan like the lesson asked a question.',
    'The hallway smells like butter after they go. She keeps a hand on her middle.',
  ] },
]);

oncePool('homeroom.afterglow', [
  { when: {}, text: [
    'The hall lounge smells like butter after they go. Daisy writes one line.',
    'Tuesday keeps happening in their clothes. The clothes are already losing.',
    'She packs the pan and does not pack the appetite. Next week is implied.',
  ] },
]);

oncePool('homeroom.linger', [
  { when: {}, text: [
    'Daisy wipes the table and leaves one tray where hands will find it.',
    'The lounge keeps the heat of whoever just ate. Forks wait for next Tuesday.',
    'She logs the session as hospitality. The floor logs it as inches.',
  ] },
]);

oncePool('origin.linger', [
  { when: { stageMax: 3 }, weight: 2, text: [
    'The old story still fits in her mouth. The new softness is the revision.',
  ] },
  { when: {}, text: [
    'She names where she came from, then takes another bite of here.',
    'Origin is a caption. Tonight is the picture filling the frame.',
    'A backstory shows itself in the way she reaches for seconds.',
  ] },
]);
