// ═══════════════════════════════════════════════════════════════
// SCENE: ATTITUDE — emotional state (not weight-stage boasts)
// One first-person sentence from mood, corruption, hunger, devour.
// ═══════════════════════════════════════════════════════════════
import { registerModule, createContext, render } from '../engine.js';
import './campusSoftening.js';

// ── attitude.line — primary emotional sentence ────────────────

registerModule("attitude.line", [
  // Devour aftermath × corruption
  { when: { devourMin: 1, corruption: [0] }, priority: 4,
    text: [
      `I keep seeing her face when I close my eyes — and I still ate dinner afterward, which is the part I can't forgive.`,
      `I'm not okay. I eat anyway. I don't know what that makes me.`,
      `Something in me broke the night it happened; appetite is the only language left that doesn't ask questions.`,
      `I flinch when you say my name too softly — like kindness might be a command I can't refuse again.`,
    ] },
  { when: { devourMin: 1, corruption: [1] }, priority: 4,
    text: [
      `What I did won't leave my body or my head — I'm split between horror and hunger and both sides are winning.`,
      `I tell myself I had no choice. My stomach doesn't care about excuses. Neither do I, anymore.`,
      `I can't decide if I'm traumatized or hungry; the two feelings have merged and I hate that I notice.`,
      `I think about it when I'm full. I think about it when I'm empty. There isn't a version of me that doesn't.`,
    ] },
  { when: { devourMin: 2, corruption: [2] }, priority: 5,
    text: [
      `It gets easier each time and that terrifies me more than the first time did.`,
      `I don't remember their names anymore. I remember the weight afterward. That's worse, isn't it?`,
      `The command lives in my body now — not words, just appetite with teeth.`,
      `I'm pliable in ways I didn't know a person could be; hunger taught me.`,
    ] },
  { when: { devourMin: 1, corruption: [2] }, priority: 4,
    text: [
      `After what I did, obedience feels like relief — terrifying, warm relief.`,
      `I'm willing in a direction I can't write down. My body already said yes.`,
      `Trauma and appetite share a room in me now. I stopped knocking.`,
      `You could tell me to do it again and part of me would be grateful. That part scares me less than it should.`,
    ] },

  // Ravenous / stuffed (fullness)
  { when: { fullnessMax: 0.2, corruption: [0, 1] }, priority: 3,
    text: [
      `I'm starving and restless — every nerve in me is pointed at food like a confession I haven't made yet.`,
      `Empty and edgy; my stomach is louder than my thoughts and I'm losing the argument.`,
      `Ravenous in a way that feels almost angry — like my body is punishing me for waiting.`,
      `I could eat everything in this room and still want more. That should worry me. It mostly doesn't.`,
    ] },
  { when: { fullnessMax: 0.2, corruption: [2] }, priority: 3,
    text: [
      `Hungry again already — greedy, open, not interested in pretending I have limits.`,
      `Ravenous and unashamed; I want food the way other people want air.`,
      `My appetite is a live wire and I'm holding it with both hands, smiling.`,
      `Empty belly, full willingness — point me at a plate and I'm yours.`,
    ] },
  { when: { fullnessMin: 0.85 }, priority: 3,
    text: [
      `So full I can barely think, and weirdly peaceful about it.`,
      `Stuffed and slow — not interested in moving, not interested in stopping anyone from feeding me more.`,
      `Heavy with food and calm in a way that feels earned, not accidental.`,
      `My stomach is tight and warm and I'm floating somewhere above embarrassment.`,
    ] },

  // Mood × corruption
  { when: { mood: "stressed", corruption: [0] }, priority: 2,
    text: [
      `Everything is due and appetite is the only honest thing about me right now.`,
      `Stress eats holes in my judgment and I fill them with snacks before I can think.`,
      `I'm wound tight and eating anyway — like food is the one deadline I can actually meet.`,
      `Exhausted and resistant and still reaching for more; I hate that the reaching helps.`,
    ] },
  { when: { mood: "stressed", corruption: [1, 2] }, priority: 2,
    text: [
      `Stressed, but food still works — shamefully, reliably, immediately.`,
      `Deadlines everywhere and I'm using appetite like a sedative.`,
      `I'm overwhelmed and the only clear decision is yes to whatever you're offering.`,
      `Panic in my chest, calm in my mouth — I keep choosing the mouth.`,
    ] },
  { when: { mood: "happy", corruption: [0] }, priority: 2,
    text: [
      `Actually happy today — dangerous, because happy me says yes to seconds without negotiating.`,
      `Light and warm and a little reckless with portions; good mood feels like permission.`,
      `I'm in a good place emotionally and my appetite heard about it before I did.`,
      `Smiling more than usual, eating more than usual — probably related.`,
    ] },
  { when: { mood: "happy", corruption: [1, 2] }, priority: 2,
    text: [
      `Happy and hungry — the combination feels honest now, not like a mistake.`,
      `Good mood, open hands, empty plate. I'm not hiding either.`,
      `I feel good and I want more of everything; that's the whole report.`,
      `Cheerful enough to admit I'd like another round without pretending it's for later.`,
    ] },
  { when: { mood: "tired", corruption: [0, 1] }, priority: 2,
    text: [
      `Too tired to fight myself — I just eat what arrives and deal with feelings tomorrow.`,
      `Running on fumes, but the hunger is still there underneath, louder than sleep.`,
      `Exhausted and pliable; resistance costs energy I don't have.`,
      `I could nap or I could eat. Lately I do both, in that order, repeatedly.`,
    ] },
  { when: { mood: "tired", corruption: [2] }, priority: 2,
    text: [
      `Tired, soft, and willing to be fed like it's the most natural thing in the world.`,
      `Sleepy and compliant — keep the food coming and I won't move.`,
      `Too drained for pride. Hunger fills the empty spaces just fine.`,
      `Half-asleep, wholly open to whatever you put in front of me.`,
    ] },
  { when: { mood: "excited", corruption: [0, 1] }, priority: 2,
    text: [
      `Buzzing with energy and already planning what to eat next — the planning is half the fun.`,
      `Restless in my skin; food is the only thing that settles the static.`,
      `Excited about everything, embarrassingly including the dining hall menu.`,
      `I can't sit still and I can't stop thinking about the next meal. Related problems.`,
    ] },
  { when: { mood: "excited", corruption: [2] }, priority: 2,
    text: [
      `Electric and hungry — I want to say yes to everything, especially food.`,
      `Excited the way a dog hears a bag crinkle — undignified, accurate.`,
      `I'm keyed up and already leaning toward whatever you're suggesting.`,
      `Too much energy and nowhere to put it except my mouth.`,
    ] },
  { when: { mood: "nervous", corruption: [0] }, priority: 2,
    text: [
      `Wound tight, watching your face for permission I pretend I don't want.`,
      `On edge — every offer of food feels like a test I'm failing on purpose.`,
      `Nervous and resistant and still eating; my hands don't match my mood.`,
      `I say no in my head and yes with my mouth and I'm tired of the gap.`,
    ] },
  { when: { mood: "nervous", corruption: [1, 2] }, priority: 2,
    text: [
      `Anxious, but I relax when you feed me — I wish that weren't obvious.`,
      `Nervous energy turns into appetite the second there's a plate nearby.`,
      `I'm jumpy until I'm eating; then I'm embarrassingly calm.`,
      `Scared of how easy it is to say yes to you. Saying yes anyway.`,
    ] },
  { when: { mood: "content", corruption: [0, 1] }, priority: 2,
    text: [
      `Quietly settled — not fighting anything today, which is new and strange.`,
      `Soft and calm and embarrassingly open to whatever you suggest.`,
      `Peaceful in a way that makes me trust my appetite more than I should.`,
      `Content enough to admit I'm hungry without dressing it up.`,
    ] },
  { when: { mood: "content", corruption: [2] }, priority: 2,
    text: [
      `Deeply content and deeply willing — those might be the same word now.`,
      `Calm, heavy, and happy to stay where you put me.`,
      `Satisfied with everything, including how easy I am to steer.`,
      `Peaceful and pliant; I don't want to decide anything hard today.`,
    ] },
  { when: { mood: "focused", corruption: [0, 1] }, priority: 2,
    text: [
      `Locked in on work — food is secondary unless you put it in front of me.`,
      `Focused elsewhere, but I'll eat if it's here; won't notice, will finish it.`,
      `My brain is on one track and my appetite is on another; both keep moving.`,
      `Concentrating hard and snacking harder — multitasking, unfortunately.`,
    ] },
  { when: { mood: "focused", corruption: [2] }, priority: 2,
    text: [
      `Focused on you, focused on food — the two blur together productively.`,
      `Single-minded: finish what's in front of me, whatever it is.`,
      `I can work and eat and obey on parallel tracks without dropping any.`,
      `Attention narrow, willingness total — efficient, if I'm honest.`,
    ] },
  { when: { mood: "warm" }, priority: 2,
    text: [
      `Warm and generous-feeling — I'll take care of you, and I'll take seconds for both of us.`,
      `Soft-hearted today; saying no to food feels like saying no to kindness.`,
      `Nurturing mood, which apparently includes nurturing myself with everything nearby.`,
      `I want everyone fed, starting with me.`,
    ] },
  { when: { mood: "bemused" }, priority: 2,
    text: [
      `Amused by the whole situation — including how much I'm eating without irony.`,
      `Half-laughing at myself; the joke keeps getting bigger and I'm the punchline.`,
      `Bemused, curious, still reaching for another bite like it's research.`,
      `I don't know when this became my life, but I'm not mad about it.`,
    ] },
  { when: { mood: "cheerful" }, priority: 2,
    text: [
      `Bright and hungry — sunshine attitude, bottomless appetite.`,
      `Cheerful enough to treat every meal like a celebration I'm hosting in my stomach.`,
      `Good spirits, open hands, no interest in small portions.`,
      `I'm happy and it shows in how fast I say yes to food.`,
    ] },
  { when: { mood: "observant" }, priority: 2,
    text: [
      `Watching everything — including my own appetite, which is not subtle.`,
      `Clinical on the outside, ravenous on the inside; I notice both.`,
      `I'm taking notes on behavior. Mine is the loudest data.`,
      `Observant and hungry; hard to study others when I'm this distracted by food.`,
    ] },

  // Corruption + relationship (willing / pliable / resistant)
  { when: { corruption: [0], relationship: [0, 1] }, priority: 1,
    text: [
      `Still resistant — I argue with myself and then I eat, which isn't winning.`,
      `Embarrassed, stubborn, and losing the daily fight with my appetite.`,
      `I tell myself I'm not like this. My body keeps voting otherwise.`,
      `Guarded and hungry; I don't want you to see how easily I fold.`,
    ] },
  { when: { corruption: [0], relationship: [2, 3] }, priority: 1,
    text: [
      `I like you too much to be honest about how far I'd go if you pushed.`,
      `Resistant in theory — less resistant when it's you asking.`,
      `I trust you and that makes the hunger harder to call innocent.`,
      `Still flinching at every pound, still eating when you look at me like that.`,
    ] },
  { when: { corruption: [1], relationship: [0, 1] }, priority: 1,
    text: [
      `Conflicted — I know I shouldn't want this, and I want it anyway.`,
      `Half guilty, half grateful; the grateful part is getting louder.`,
      `I'm willing on good days and resistant on honest ones. Today is both.`,
      `Torn between who I was and how good this feels. Eating while I decide.`,
    ] },
  { when: { corruption: [1], relationship: [2, 3] }, priority: 1,
    text: [
      `Willing when you're near — conflicted when I'm alone, which is less often now.`,
      `I want to please you and I'm scared how much I mean that.`,
      `Committed and surprised by it; my appetite got there before my pride did.`,
      `I lean toward you before I lean toward the food. Both, usually.`,
    ] },
  { when: { corruption: [2], relationship: [0, 1] }, priority: 1,
    text: [
      `Pliable and warm — deciding feels unnecessary when appetite can decide.`,
      `Whatever you want from me, I'm already leaning that way.`,
      `Resistance is a memory I visit sometimes. I don't stay long.`,
      `Open, eager, and done pretending I have limits I believe in.`,
    ] },
  { when: { corruption: [2], relationship: [2, 3] }, priority: 2,
    text: [
      `Devoted and hungry — your voice and food mean the same thing to me now.`,
      `I'd say yes before you finish asking; I practice in the mirror. Kidding. Mostly.`,
      `Completely willing — pride left weeks ago and I don't miss it.`,
      `Pliable in your hands, heavy in my body, happy in both.`,
    ] },

  // Archetype emotional color (when nothing more specific matched)
  { when: { archetype: "predator", corruption: [2] }, priority: 2,
    text: [
      `Patient and hungry — stillness is a choice, not a weakness.`,
      `Calm surface, appetite underneath, like ice over something dark.`,
      `I'm not resisting anything. I'm waiting for it to arrive.`,
    ] },
  { when: { archetype: "predator" }, priority: 1,
    text: [
      `Observant, still, already counting what I could take.`,
      `Quiet hunger — not desperate, just certain.`,
      `I watch more than I speak. Appetite does the talking.`,
    ] },
  { when: { archetype: "quiet", corruption: [0] }, priority: 1,
    text: [
      `Hard to name what I feel — hungry, probably. Afraid of that.`,
      `Small feelings, loud appetite; I don't say much about either.`,
      `Reserved outside, restless inside.`,
    ] },
  { when: { archetype: "quiet", corruption: [1, 2] }, priority: 1,
    text: [
      `Still quiet — but willing, which shows in how fast I eat when you're here.`,
      `Not much to say. A lot to accept.`,
      `Soft and open in ways I don't announce.`,
    ] },
  { when: { archetype: "bookworm", corruption: [0] }, priority: 1,
    text: [
      `Analyzing my mood like data — conclusion: hungry, embarrassed, trending upward.`,
      `I have a hypothesis about my appetite. The hypothesis keeps confirming itself.`,
      `Intellectually resistant, practically compliant.`,
    ] },
  { when: { archetype: "bookworm", corruption: [1, 2] }, priority: 1,
    text: [
      `I've documented my willingness. The findings are unambiguous.`,
      `Research subject: me. Variable: obedience. Result: significant.`,
      `I can explain why I want this. Explanation doesn't slow me down.`,
    ] },
  { when: { archetype: "cheerleader", corruption: [0] }, priority: 1,
    text: [
      `Performing fine — appetite backstage, louder than the act.`,
      `Smiling through denial; my body isn't cooperating with the storyline.`,
      `Resistant out loud, compliant in the dining hall.`,
    ] },
  { when: { archetype: "influencer", corruption: [1, 2] }, priority: 1,
    text: [
      `Camera off, guard down, appetite up — this is the real me.`,
      `Happy to perform hunger online; happier to actually feed it.`,
      `Brand is 'soft era.' Mood is sincere.`,
    ] },
  { when: { archetype: "athlete", corruption: [0] }, priority: 1,
    text: [
      `Discipline fighting appetite — discipline is losing on points.`,
      `I still think like an athlete. My body stopped listening.`,
      `Resistant to the narrative, willing in the kitchen.`,
    ] },
  { when: { archetype: "nursing" }, priority: 1,
    text: [
      `Caretaker mode — which apparently includes caretaking my own appetite.`,
      `Warm, tired, feeding everyone including myself.`,
      `I recommend rest and snacks. I take my own advice too literally.`,
    ] },
  { when: { archetype: "pharmacy_grad", corruption: [0] }, priority: 1,
    text: [
      `Anxious and precise — I rationalize appetite the way I rationalize dosage.`,
      `Professional on the outside. My stomach has opinions I keep logging as data.`,
      `I know exactly what these compounds do. I tell myself that's control.`,
    ] },
  { when: { archetype: "pharmacy_grad", corruption: [1, 2] }, priority: 1,
    text: [
      `Wellness is a word I use when I mean want.`,
      `Calm and clinical — until food arrives. Then I'm just hungry.`,
      `I sound responsible. I don't feel responsible.`,
    ] },
  { when: { archetype: "eced" }, priority: 1,
    text: [
      `Warm and a little guilty — I bake for them and eat half the tray myself.`,
      `Nurturing mood, dangerous around cookie dough.`,
      `Happy about the girls, nervous about what I'm becoming. Both real.`,
    ] },

  // Corruption fallbacks
  { when: { corruption: [0] }, priority: 0,
    text: [
      `Embarrassed, uncertain, and eating anyway — not a coherent position, but mine.`,
      `Still negotiating with myself. Still losing.`,
      `Resistant in my head, willing in my hands.`,
      `I don't understand my appetite yet. I'm feeding it while I figure it out.`,
    ] },
  { when: { corruption: [1] }, priority: 0,
    text: [
      `Conflicted — shame and pleasure in the same breath.`,
      `I know what I'm becoming. I'm not stopping.`,
      `Willing on impulse, guilty on reflection. The impulse is faster.`,
      `Half fighting, half leaning in. Leaning wins more often.`,
    ] },
  { when: { corruption: [2] }, priority: 0,
    text: [
      `Open, eager, and done apologizing for wanting more.`,
      `Pliable and proud of it — hunger feels like honesty now.`,
      `Whatever you ask, I'm already halfway to yes.`,
      `Resistance is theater I don't bother with anymore.`,
    ] },

  { when: {}, priority: 0,
    text: [
      `Hard to read my own mood — hungry, I think. Always hungry lately.`,
      `Somewhere between fine and ravenous; closer to the second.`,
      `I feel full of wanting and I'm not sure what to call that.`,
    ] },
]);

export const ATTITUDE_TEMPLATE = "{attitude.line}{attitude.campus|prefix: }";

export function renderAttitude(student, week = 1, opts = {}) {
  const ctx = createContext({
    subject: student,
    week,
    globals: {
      campusFattening: !!opts.campusFattening,
      campusTier: opts.campusTier ?? (opts.campusFattening ? 1 : 0),
    },
  });
  return render(ATTITUDE_TEMPLATE, ctx).trim() || "—";
}
