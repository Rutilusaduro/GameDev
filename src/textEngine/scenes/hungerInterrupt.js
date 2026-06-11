// ═══════════════════════════════════════════════════════════════
// SCENE: HUNGER INTERRUPT — knock-at-the-door scenes
// See docs/Pharmacist/Hunger Event Lexicon.txt
// ═══════════════════════════════════════════════════════════════
import { registerModule, createContext, render } from '../engine.js';
import './hungerArchetypeBehavior.js';

registerModule("scene.hungerInterrupt.starter", [
  { when: { addictionLevel: [4], hungerTier: [4] }, priority: 2,
    text: [
      "There's a sharp, impatient knock at your door.",
      "You hear a quiet, almost desperate knock.",
      "Someone's knocking — and they sound impatient.",
    ] },
  { when: { inWithdrawal: true }, priority: 2,
    text: [
      "There's a knock at your door — harder than usual.",
      "You hear footsteps outside, then an irritated knock.",
    ] },
  { when: {},
    text: [
      "There's a knock at your door.",
      "You hear a soft knock.",
      "There's a hesitant knock at the door.",
    ] },
]);

registerModule("scene.hungerInterrupt.appearance", [
  { when: { stage: [11] }, priority: 3,
    text: [
      "She completely fills the doorway with her sheer mass.",
      "Her body is so vast she can barely fit in the frame.",
      "Soft flesh presses against both sides of the doorframe.",
    ] },
  { when: { stage: [8, 9, 10] }, priority: 2,
    text: [
      "She fills most of the doorframe with her girth.",
      "Her massive body takes up nearly the entire doorway.",
      "She has to turn slightly to fit through the frame.",
    ] },
  { when: {}, text: "" },
]);

registerModule("scene.hungerInterrupt.behavior", [
  { when: { addictionLevel: [4], hungerTier: [4] }, priority: 4,
    text: [
      "She's standing there looking almost frantic.",
      "She's breathing hard, eyes wide with need.",
      "She looks like she's barely holding herself together.",
      "She's visibly shaking as she stands in front of you.",
    ] },
  { when: { addictionLevel: [3, 4], hungerTier: [3, 4] }, priority: 3,
    text: [
      "She's shifting restlessly, clearly struggling.",
      "She keeps glancing at you with a desperate look.",
      "She looks like she's been pacing outside your door.",
    ] },
  { when: { inWithdrawal: true }, priority: 3,
    text: [
      "She looks visibly irritated and on edge.",
      "She's glaring at you, clearly short-tempered.",
      "She looks like she's fighting the urge to snap.",
    ] },
  { when: {},
    text: [
      "She's standing there looking restless.",
      "She shifts awkwardly in front of you.",
    ] },
]);

registerModule("scene.hungerInterrupt.request", [
  { when: { stage: [10, 11], hungerTier: [3, 4], addictionLevel: [3, 4] }, priority: 4,
    text: [
      "\"You're going to feed me.\"",
      "\"I'm not leaving until you feed me.\"",
      "\"Don't even think about turning me away right now.\"",
    ] },
  { when: { addictionLevel: [4], hungerTier: [4] }, priority: 4,
    text: [
      "\"I'm so hungry…\"",
      "\"Please… I'm starving. I need you to feed me.\"",
      "\"I can't stop thinking about food… please feed me.\"",
      "\"I'm starving. I need you to feed me right now.\"",
    ] },
  { when: { addictionLevel: [3], hungerTier: [3, 4] }, priority: 3,
    text: [
      "\"I've been thinking about you feeding me all day…\"",
      "\"I'm really hungry… can you feed me?\"",
      "\"I was hoping you'd be around… I'm so hungry.\"",
    ] },
  { when: { inWithdrawal: true }, priority: 3,
    text: [
      "\"I need something from you. Now.\"",
      "\"Don't ignore me. I'm not in the mood.\"",
      "\"You're not leaving me like this.\"",
    ] },
  { when: {},
    text: [
      "\"Hey… can we talk?\"",
      "\"Do you have a minute?\"",
    ] },
]);

registerModule("scene.hungerInterrupt.tone", [
  { when: { stage: [10, 11] }, priority: 2,
    text: "Her massive body shifts heavily as she waits for your answer." },
  { when: { stage: [8, 9] }, priority: 2,
    text: "She's clearly struggling to stay upright while she waits." },
  { when: { addictionLevel: [4], hungerTier: [4] }, priority: 2,
    text: "She looks like she might actually start crying if you turn her away." },
  { when: { inWithdrawal: true }, priority: 2,
    text: "She's angry, but underneath it she just looks miserable." },
  { when: {}, text: "She waits for your answer." },
]);

registerModule("scene.hunger.response.feed", [
  { when: { hungerTier: [4], addictionLevel: [4] }, priority: 3,
    text: "She practically lunges forward the moment you agree. She eats like she's been starving for days, making soft, desperate sounds between bites. By the time she's done, she looks dazed and deeply satisfied." },
  { when: { hungerTier: [4] }, priority: 2,
    text: "She eats fast and intensely, barely pausing. When she finishes, she looks at you with glassy, grateful eyes." },
  { when: { inWithdrawal: true }, priority: 2,
    text: "She eats quickly, still tense at first, but slowly relaxes as the food hits her. The aggression fades from her expression." },
  { when: {},
    text: "She eats eagerly, clearly relieved. She thanks you multiple times, looking much calmer afterward." },
]);

registerModule("scene.hunger.response.compound", [
  { when: { hungerTier: [4], addictionLevel: [3, 4] }, priority: 2,
    text: "Her eyes light up the moment she sees what you're offering. She takes it without hesitation. Within minutes her breathing slows and she looks almost drunk with relief." },
  { when: { inWithdrawal: true }, priority: 2,
    text: "She takes it almost aggressively, clearly desperate for relief. Her aggressive demeanor fades as the compound works." },
  { when: {},
    text: "She accepts it quickly. She visibly relaxes as the effects kick in." },
]);

registerModule("scene.hunger.response.deny", [
  { when: { hungerTier: [4], addictionLevel: [4] }, priority: 3,
    text: "Her face falls. For a second she looks like she might cry, then her expression twists into something more desperate and angry. She stares at you for a long moment before turning and leaving without another word." },
  { when: { inWithdrawal: true }, priority: 2,
    text: "She snaps at you, clearly furious, before storming off. You can hear her muttering angrily as she leaves." },
  { when: {},
    text: "She looks disappointed but doesn't argue. She just nods quietly and leaves." },
]);

registerModule("scene.hunger.response.talk", [
  { when: { hungerTier: [4], addictionLevel: [3, 4] }, priority: 2,
    text: "You manage to calm her down a little. She's still clearly struggling, but she listens to you. She eventually leaves, though she keeps looking back at you." },
  { when: { inWithdrawal: true }, priority: 2,
    text: "You manage to talk her down from her aggressive state. She's still irritable, but she eventually leaves without causing a bigger scene." },
  { when: {},
    text: "You talk to her for a while. She seems embarrassed about how desperate she got, but she calms down and eventually leaves on her own." },
]);

export const HUNGER_INTERRUPT_TEMPLATE =
  "{scene.hungerInterrupt.starter} You open the door and find {subject.name}. " +
  "{scene.hungerInterrupt.personal|prefix: }{scene.hungerInterrupt.appearance|prefix: }{scene.hungerInterrupt.archetypeBehavior|prefix: }{scene.hungerInterrupt.behavior|prefix: }" +
  "{scene.hungerInterrupt.archetypeRequest|prefix: }{scene.hungerInterrupt.request} {scene.hungerInterrupt.tone}";

export function renderHungerInterrupt(student, week = 1) {
  const ctx = createContext({ subject: student, week });
  return render(HUNGER_INTERRUPT_TEMPLATE, ctx).trim();
}

export function renderHungerOutcome(student, action, week = 1) {
  const key = { feed: "scene.hunger.response.feed", compound: "scene.hunger.response.compound", deny: "scene.hunger.response.deny", talk: "scene.hunger.response.talk" }[action];
  if (!key) return "";
  const ctx = createContext({ subject: student, week });
  let text = render(`{${key}}`, ctx).trim();
  if (action === "feed" || action === "compound") {
    const style = render("{eating.style}", ctx).trim();
    if (style) text = `${text} ${style}`;
  }
  return text;
}
