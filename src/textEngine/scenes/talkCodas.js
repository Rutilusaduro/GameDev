// ═══════════════════════════════════════════════════════════════
// SCENE: TALK CODAS — register suffixes appended to talk responses
// Selector-driven replacement for the hardcoded coda chain in
// TalkModal (content migrated from talkSystem REGISTER_CODAS).
// The broken register wins over submissive at corruption tier 2
// via priority — the old if/else got this backwards.
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../engine.js';

registerPool("talk.coda", [
  // Broken register — corruption tier 2 + brokenMind skill
  { when: { corruption: [2], skill: "brokenMind" }, priority: 1,
    text: [
      (ctx) => `${ctx.subject.name}'s eyes have gone soft and depthless. "Whatever you want," she murmurs. "I stopped keeping track of where I end and your wanting begins."`,
      (ctx) => `"I used to have other plans," ${ctx.subject.name} says dreamily, patting herself. "Isn't that funny? I genuinely can't remember what they were."`,
    ] },
  // Submissive register — corruption tier 1+ + internalizedRole skill
  { when: { corruption: [1, 2], skill: "internalizedRole" },
    text: [
      (ctx) => `"...thank you for taking care of me," ${ctx.subject.name} adds, quieter. "Your greedy girl appreciates it."`,
      (ctx) => `${ctx.subject.name} adds, almost to herself: "I'm getting so big for you." She doesn't seem to notice she said 'for you.'`,
      (ctx) => `"You know exactly what I need," ${ctx.subject.name} says, voice low. "You always do."`,
      (ctx) => `${ctx.subject.name} leans into the attention like warmth. "Keep going. I'm yours to feed."`,
    ] },
  // High relationship — devoted register
  { when: { relationship: [3, 4] },
    text: [
      (ctx) => `${ctx.subject.name} catches your eye afterward, smiling like this was the best part of her week.`,
      (ctx) => `"I trust you," ${ctx.subject.name} says simply. "Even when you're pushing."`,
      (ctx) => `${ctx.subject.name} exhales, soft and full. "You always know how to reach me."`,
    ] },
  // Hunger-forward codas
  { when: { hungerTier: [3, 4], corruption: [1, 2] },
    text: [
      (ctx) => `${ctx.subject.name} licks her lips. "Don't stop talking. I'm still hungry."`,
      (ctx) => `The conversation trails off — ${ctx.subject.name} is already looking at the pantry.`,
    ] },
  { when: { stageMin: 7, relationship: [2, 3, 4] },
    text: [
      (ctx) => `${ctx.subject.name} shifts her weight — a slow reminder of how much body you're investing in.`,
      (ctx) => `At ${Math.round(ctx.subject.lbs)} lbs, ${ctx.subject.name} takes up the chair completely. She doesn't apologize for it.`,
    ] },
  { when: { mood: ['warm', 'content'], corruption: [1] },
    text: [
      (ctx) => `${ctx.subject.name} exhales, soft and full. "You always know how to reach me."`,
      (ctx) => `"This is the best part of my week," ${ctx.subject.name} admits quietly.`,
    ] },
  { when: { mood: ['stressed', 'tired'], relationship: [1, 2, 3, 4] },
    text: [
      (ctx) => `${ctx.subject.name} sags with relief afterward — fed, heard, steadier.`,
      (ctx) => `The tension drains out of her shoulders. "Thanks for not rushing me."`,
    ] },
  { when: { season: ['winter'], mood: ['content', 'warm'] },
    text: [
      (ctx) => `Winter cold outside; ${ctx.subject.name} stays in the warmth a moment longer.`,
      (ctx) => `She pulls her sweater tighter, pleased. "Don't let me leave hungry."`,
    ] },
  // Early gain — stages 0–4, corruption 0 (A6 Slender register)
  { when: { corruption: [0], stageMax: 4 },
    text: [
      (ctx) => `${ctx.subject.name} smooths her top and does not mention the tug. The silence says enough.`,
      (ctx) => `She laughs once, embarrassed, and changes the subject before appetite can.`,
      (ctx) => `${ctx.subject.name} tucks hair behind her ear. "Anyway." The word arrives a beat late.`,
      (ctx) => `Something unspoken passes between you — hunger noticed, not yet named.`,
    ] },
  { when: { corruption: [0], stageMin: 2, stageMax: 5, shameTierMin: 1 },
    text: [
      (ctx) => `${ctx.subject.name} crosses her arms over her middle without seeming to notice.`,
      (ctx) => `Her hand finds the waistband. She lets go again, slower than she meant to.`,
    ] },
  { when: { corruption: [1], stageMax: 5 },
    text: [
      (ctx) => `${ctx.subject.name} exhales, softer than before. "I'm not fighting it as much."`,
      (ctx) => `"It's getting easier to say yes," she admits. "To food. To you."`,
      (ctx) => `${ctx.subject.name} smiles without armor. Hunger sits in the room like a guest she's stopped pretending isn't there.`,
    ] },
  // Per-student corruption[2] codas — personality-specific end beats
  { when: { studentId: 0, corruption: [2] },
    text: [
      (ctx) => `"Captain's orders," ${ctx.subject.name} says, patting her belly. "Keep the squad fed. Starting with me."`,
      (ctx) => `${ctx.subject.name} rolls her shoulders back, taking up space on purpose. "Watch me win this one too."`,
    ] },
  { when: { studentId: 1, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} closes her notebook. "Hyposeason plan confirmed," she murmurs. "I like being full for you."`,
      (ctx) => `"The data supports it," ${ctx.subject.name} says, deadpan. Her hand rests on her middle like a citation.`,
    ] },
  { when: { studentId: 2, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} angles her phone without asking. "Off the record," she says. "On the record, I'm starving again."`,
      (ctx) => `"Clip that," ${ctx.subject.name} whispers, delighted. "No — don't. This one's just ours."`,
    ] },
  { when: { studentId: 3, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} stretches, slow and satisfied. "New PR," she says. "Personal record. Belly edition."`,
      (ctx) => `"Recovery day," ${ctx.subject.name} says, and does not mean rest.`,
    ] },
  { when: { studentId: 4, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} watches her own hands on her lap like they're someone else's work. "Beautiful," she says quietly. She means all of it.`,
      (ctx) => `"I want to paint this feeling," ${ctx.subject.name} murmurs. "The fullness. The warmth. You."`,
    ] },
  { when: { studentId: 5, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} pulls the hoodie tighter. "Don't go," she says to the doorway after you leave. The stream is still running.`,
      (ctx) => `"Hold on." ${ctx.subject.name} puts the controller down. "You don't have to go yet." She doesn't reach for it again.`,
    ] },
  { when: { studentId: 6, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} pours you something without asking. "Chapter business," she says. "Abundance policy."`,
      (ctx) => `"Everyone should eat like this," ${ctx.subject.name} declares, serene. "I'm starting with me."`,
    ] },
  { when: { studentId: 7, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} updates her planner and underlines one word: MORE.`,
      (ctx) => `"Exceeded projections," ${ctx.subject.name} says, pleased. "Again. Schedule more."`,
    ] },
  { when: { studentId: 8, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} meets your eyes once, long enough to count. "Stay," she says. Just that.`,
      (ctx) => `She doesn't explain. She doesn't need to. Her hand finds her belly and stays.`,
    ] },
  { when: { studentId: 9, corruption: [2] },
    text: [
      (ctx) => `"Americans call this indulgence," ${ctx.subject.name} says, amused. "I call it correct."`,
      (ctx) => `${ctx.subject.name} licks wine from her lip. "Another course, mon Professeur?"`,
    ] },
  { when: { studentId: 10, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} slides something across the table toward you. "I made extra," she says. "I always make extra now."`,
      (ctx) => `"You're the only person I cook for at this hour," ${ctx.subject.name} says. The pot is already on the stove. It was already on the stove.`,
    ] },
  { when: { studentId: 11, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} tucks a napkin into your hand. "Eat," she says. "Then eat more. I'll keep watch."`,
      (ctx) => `"Someone has to look after you too," ${ctx.subject.name} murmurs. Her other hand stays on her own full middle.`,
    ] },
  { when: { studentId: 12, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} writes one line in her notebook and closes it. "Subject reports satisfaction," she says. "No further questions."`,
      (ctx) => `"Fascinating," ${ctx.subject.name} whispers, watching her own breathing slow. "I'd like to repeat the trial."`,
    ] },
  { when: { studentId: 13, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} presses a foil-wrapped something into your palm. "For later," she says. "For now, watch me finish mine."`,
      (ctx) => `"Good kids clean their plates," ${ctx.subject.name} says, smiling. "So do good RAs."`,
    ] },
  { when: { studentId: 14, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} grins, sweet and shameless. "Mama always said eat till you're happy."`,
      (ctx) => `"Save room for pie," ${ctx.subject.name} says. She isn't joking.`,
    ] },
  { when: { studentId: 15, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} stills when you move to leave. Not pleading. Claiming. "Not yet."`,
      (ctx) => `Her smile shows teeth. "Hungry things shouldn't wander off alone."`,
    ] },
  { when: { studentId: 16, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} looks at you with something that isn't anxiety anymore. "Optimal outcome," she says. "I wrote it in the notes."`,
      (ctx) => `"The case study is ongoing," ${ctx.subject.name} adds quietly. "I don't want to conclude it." A pause. "I won't."`,
    ] },
  { when: { studentId: 17, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} taps her map. "X marks the spot," she says. "Right here. My appetite."`,
      (ctx) => `"Found something worth keeping," ${ctx.subject.name} murmurs, patting her belly. "Buried treasure."`,
    ] },
  { when: { studentId: 18, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} wipes grease from her fingers. "Prototype successful," she says. "Requesting larger test batch."`,
      (ctx) => `"Variables accounted for," ${ctx.subject.name} murmurs. "Except want. Want keeps scaling."`,
    ] },
  // Immobile scale — stage 10+
  { when: { stageMin: 10, corruption: [1, 2] },
    text: [
      (ctx) => `${ctx.subject.name} shifts by degrees. The room rearranges around her. "Stay," she says, easy and vast.`,
      (ctx) => `Conversation slows to her breathing. Fullness has become geography.`,
    ] },
  // Spirit embodiment register — player has ridden this week
  { when: { skill: "spirit_ride" }, weight: 2,
    text: [
      (ctx) => `Something in ${ctx.subject.name}'s voice carries an echo you recognize — appetite answered from the inside.`,
      (ctx) => `She pauses mid-sentence, hand on her belly, as if feeling you settle deeper.`,
      (ctx) => `${ctx.subject.name} smiles without explaining it. "You know what I need."`,
    ] },
  // No register unlocked — mostly silent; rare soft closers
  { when: {}, text: [
    "",
    "",
    "",
    (ctx) => `${ctx.subject.name} lets the moment settle — quiet, warm, complete.`,
    (ctx) => `Something unspoken passes between you. ${ctx.subject.name} nods once, private and pleased.`,
    (ctx) => `${ctx.subject.name} exhales softly. The conversation doesn't need more than that.`,
  ] },
]);
