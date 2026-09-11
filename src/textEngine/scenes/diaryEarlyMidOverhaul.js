// The Squad — Lead: A6 Slender | Support: A2 Psych, A5 Editor
// Early/mid diary.innerBeat depth (stages 0–8, corruption-keyed).
import { registerModuleVariants } from '../engine.js';

const W = 3;

registerModuleVariants('diary.innerBeat', [
  { when: { stageMax: 2, corruption: [0] }, weight: W, text: [
    'First week I noticed the mirror lie — not cruel, just outdated. I ate anyway and wrote it down like homework.',
    'RA left snacks on the desk again. I told myself it was hospitality. My hands knew it was permission.',
  ]},
  { when: { stageMax: 2, corruption: [1] }, weight: W, text: [
    'I stopped pretending the second plate was an accident. It tasted like relief.',
    'The scale moved and I did not panic. That scared me more than the number.',
  ]},
  { when: { stageMax: 2, corruption: [2] }, weight: W, text: [
    'I want more and I am tired of translating that into something respectable.',
    'Full feels honest. Empty feels like performance. I choose honest.',
  ]},
  { when: { stageMin: 3, stageMax: 5, corruption: [0] }, weight: W, text: [
    'Clothes negotiate every morning. I am learning to side with comfort.',
    'Someone said I looked softer. I heard it as a compliment before I decided whether to accept it.',
  ]},
  { when: { stageMin: 3, stageMax: 5, corruption: [1] }, weight: W, text: [
    'Appetite stopped being a secret I kept from myself. It sits at the table now.',
    'I catch myself reaching for seconds before the thought finishes. The reaching feels like me.',
  ]},
  { when: { stageMin: 3, stageMax: 5, corruption: [2] }, weight: W, text: [
    'I do not apologize for the spread anymore. I arrange it.',
    'Hunger arrives like a friend who always knows the password.',
  ]},
  { when: { stageMin: 6, stageMax: 8, corruption: [0] }, weight: W, text: [
    'Movement costs more and I am strangely proud of what the cost buys.',
    'The body I live in now has opinions. I listen more than I argue.',
  ]},
  { when: { stageMin: 6, stageMax: 8, corruption: [1] }, weight: W, text: [
    'I measure weeks in meals that landed. This was a good week.',
    'Fullness is a language I speak without translating.',
  ]},
  { when: { stageMin: 6, stageMax: 8, corruption: [2] }, weight: W, text: [
    'I want to be kept full. Saying it on paper still feels like a door opening.',
    'Every chair remembers me. I like that more than I should admit.',
  ]},
  { when: { studentId: 8, stageMax: 4 }, weight: 4, text: [
    'Hands on my stomach when I wake. Still there at lunch. Warm. Mine. Good.',
    'The hall feels closer when I eat with everyone. Like belonging has calories.',
  ]},
  { when: { studentId: 0, stageMin: 3, stageMax: 6 }, weight: 4, text: [
    'Coach would call this off-season. I call it finally honest.',
    'The squad notices. I notice them noticing. Appetite spreads like team spirit.',
  ]},
  { when: { studentId: 5, stageMax: 5 }, weight: 4, text: [
    'Stream chat called it a cheat day. It was Tuesday. Both can be true.',
    'Boss fight: dessert tray. Cleared it. No cutscene. Just me and the respawn plate.',
  ]},
]);
