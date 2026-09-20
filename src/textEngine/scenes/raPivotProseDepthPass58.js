// Curated depth pass — dorm / feed / hall voice (run alongside generateRaPivotBulkProse).
import { registerPool } from '../engine.js';

registerPool('dorm.upgrade.confirm', [
  { when: {}, weight: 2, text: [
    `You approve the work order and the hall exhales — warmer lights, wider doorways, a kitchen that finally admits what it is for.`,
    `The contractor leaves chalk on the floor: room names, load limits, a joke about structural appetite. You keep the chalk.`,
    `{ra.name} signs where the blueprint says FEED — and the word stops feeling metaphorical.`,
  ] },
]);

registerPool('feedReaction.stuffed.sigh', [
  { when: {}, weight: 2, text: [
    `She sighs the way people sigh after good news — full, slow, unwilling to rush the afterglow.`,
    `Fullness settles into her like a blanket someone else tucked. She does not apologize for taking up space.`,
    `Her hand rests on her belly as if checking a door she finally unlocked from the inside.`,
  ] },
]);

registerPool('hall.lounge.skill.unlock', [
  { when: {}, weight: 2, text: [
    `The lounge learns a new trick — not furniture, habit. Residents notice before you explain.`,
    `Someone left a note on the mini-fridge: "thank you for making second dinner normal."`,
    `The wing hums differently after the upgrade — less apology in the air, more permission.`,
  ] },
]);

registerPool('talk.suggest.indulgence', [
  { when: {}, weight: 2, text: [
    `You phrase it like care, not command. She hears both and chooses the part she wants.`,
    `"You could," you say — and the sentence finishes itself in her appetite.`,
    `{subject.name} nods before her mind catches up. The suggestion already feels like memory.`,
  ] },
]);

registerPool('room.visit.intro.meet', [
  { when: {}, weight: 1, text: [
    `The door opens on someone mid-reach for a snack — caught, unashamed, curious about you.`,
    `{ra.name} gets a once-over that measures trust, not threat. She steps aside.`,
    `"Hall check?" she asks. You hear: is it safe to be hungry here.`,
  ] },
]);
