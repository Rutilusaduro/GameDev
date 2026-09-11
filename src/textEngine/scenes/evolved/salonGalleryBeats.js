// The Squad — Lead: A5 Editor | Support: A2 Psych
// Salon / gallery evolved-event beats keyed on stageIdx + phaseIdx.
import { registerPool } from '../../engine.js';
import '../proseOverhaulPass4.js';

registerPool('evolved.salon.beat', [
  { when: { stageIdx: 0, phaseIdx: 0 }, weight: 4, text: [
    'Wine first. Butter second. Chloé at {subject.lbs} lbs already rearranging chairs like guests are a course.',
    'The dorm smells like a transfer who refused to stop. She pours and bites in the same breath.',
  ] },
  { when: { stageIdx: 0, phaseIdx: 1 }, weight: 4, text: [
    'Guests linger past the polite hour. Chloé looks at you over the glass, {subject.lbs} lbs and already planning weekly.',
    'Someone asks if this happens every week. She does not pretend the answer is no.',
  ] },
  { when: { stageIdx: 1, phaseIdx: 0 }, weight: 4, text: [
    'RA Mori follows coq au vin to the door. Chloé is {subject.lbs} lbs in black silk and offers dessert like a trap with manners.',
    'Staff in the doorway. Hostess unbothered. The wine keeps moving.',
  ] },
  { when: { stageIdx: 1, phaseIdx: 1 }, weight: 4, text: [
    'Food-science wing is talking. Chloé is {subject.lbs} lbs and calls rumor an appetizer.',
    'Word spreads heavier than the guests. She wants them hungry when they arrive.',
  ] },
  { when: { stageIdx: 2, phaseIdx: 0 }, weight: 4, text: [
    'A group chat she was not invited to names the dinners anyway. She reads it aloud, amused, {subject.lbs} lbs, pouring.',
    '"Chloé\'s dinners." She tastes the phrase like a second wine.',
  ] },
  { when: { stageIdx: 2, phaseIdx: 1 }, weight: 4, text: [
    'Campus paper wants an interview. She is {subject.lbs} lbs and says watching her eat is also a menu.',
    'A journalist at the threshold. Chloé treats curiosity as a reservation.',
  ] },
  { when: { stageIdx: 3, phaseIdx: 0 }, weight: 4, text: [
    'The journalist returns for seconds, not quotes. Chloé is {subject.lbs} lbs, feeding and being fed. "Write that down."',
    'Notebook open. Mouth open. She performs appetite with the lights low.',
  ] },
  { when: { stageIdx: 3, phaseIdx: 1 }, weight: 4, text: [
    '*A Transfer\'s Salon of Excess* is out. She is {subject.lbs} lbs and pleased they called her dangerous.',
    'She reads the piece twice and starts a feast before the second finish.',
  ] },
  { when: { stageIdx: 4, phaseIdx: 0 }, weight: 4, text: [
    'Rooftop, string lights, ten guests. Silk clings where she is fullest at {subject.lbs} lbs. Wellness slogans chant below. She toasts.',
    'Protest under the roof. Appetite on it. She raises a glass at both.',
  ] },
  { when: { stageIdx: 4, phaseIdx: 1 }, weight: 4, text: [
    'Scrutiny watches. She is {subject.lbs} lbs and does not shrink. Appetite is her specialty and she says so.',
    'Housing has opinions. The salon has courses. Courses win the evening.',
  ] },
  { when: { stageIdx: 5 }, weight: 3, text: [
    'The salon has outgrown the room. Chloé at {subject.lbs} lbs is the room. Guests orbit.',
    'Prestige in the guest book. Indulgence in her lap. Both still climbing.',
  ] },
  { when: {}, text: [
    'Candles. Butter. A hostess who treats leaving as a failed course.',
    'Wine rims keep fingerprints. Chloé keeps the rest of the evening in her lap.',
    '*Encore* hangs in the silk. Nobody pretends it was a question.',
  ] },
]);

registerPool('evolved.gallery.beat', [
  { when: { stageIdx: 0, phaseIdx: 0 }, weight: 4, text: [
    'First contact sheet on *In Progress*. Fiona is {subject.lbs} lbs. "The camera doesn\'t lie." The subject is mid-bite.',
    'A resident, laughing, mouth full. Fiona pins the proof like a contract.',
  ] },
  { when: { stageIdx: 0, phaseIdx: 1 }, weight: 4, text: [
    'Studio smells of paint and butter. She is {subject.lbs} lbs, editing. "I want a wall of proof."',
    'Thumbtacks, twine, bodies at every softness. She eats while she hangs.',
  ] },
  { when: { stageIdx: 1, phaseIdx: 0 }, weight: 4, text: [
    'Quad light, a shy yes, Fiona at {subject.lbs} lbs photographing softness she asked for this time.',
    'Field work. Hunger in the viewfinder. She gets the shot and then a plate.',
  ] },
  { when: { stageIdx: 1, phaseIdx: 1 }, weight: 4, text: [
    'Archive growing. She is {subject.lbs} lbs. "Abundance is everywhere. They just don\'t frame it."',
    'Dining-hall regulars, staff lounge risk. She shoots both like evidence.',
  ] },
  { when: { stageIdx: 2, phaseIdx: 0 }, weight: 4, text: [
    'Opening: eight prints, wine, cheese. Fiona is {subject.lbs} lbs in linen that will not survive the evening.',
    'Critics arrive. The linen already lost. She lets it.',
  ] },
  { when: { stageIdx: 2, phaseIdx: 1 }, weight: 4, text: [
    'She eats in the corner on purpose, {subject.lbs} lbs, public, fork as statement.',
    'The room talks. She chews. The performance is the point and the calories.',
  ] },
  { when: { stageIdx: 3, phaseIdx: 0 }, weight: 4, text: [
    'The model stands beside her own timeline, heavier live than in print. Fiona is {subject.lbs} lbs. "She continues."',
    'Earlier print on the wall. Later body in the room. Fiona introduces both.',
  ] },
  { when: { stageIdx: 3, phaseIdx: 1 }, weight: 4, text: [
    'A patron offers commission. Fiona is {subject.lbs} lbs and already planning the next body.',
    'Waiting list, cash, appetite. She accepts the money and the next model in the same breath.',
  ] },
  { when: { stageIdx: 4, phaseIdx: 0 }, weight: 4, text: [
    'Regional gallery email. She is {subject.lbs} lbs and reads it twice like a release form.',
    'They want the series. She wants the series fatter before it travels.',
  ] },
  { when: { stageIdx: 4, phaseIdx: 1 }, weight: 4, text: [
    'AIB calls it evidence. She is {subject.lbs} lbs and calls it archive. Same pictures.',
    'Mailing list heat. She either hides a print or publishes harder. Both feed the wall.',
  ] },
  { when: { stageIdx: 5 }, weight: 3, text: [
    'Gallery as habitat. Fiona at {subject.lbs} lbs is model and medium. Patrons come to her chair.',
    'The wall of proof outgrew the room. She did too.',
  ] },
  { when: {}, text: [
    'Shutter rest. Softness does not. The wall keeps the proof warm.',
    'Prints on twine. Appetite mid-bite. Growth made exhibition.',
    'Patrons leave slower than they entered. The subject stays seated on purpose.',
  ] },
]);
