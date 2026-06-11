// ═══════════════════════════════════════════════════════════════
// HUNGER LEXICON — word modules + hunger/eating/talk codas
// See docs/Pharmacist/Hunger Lexicon.txt
// ═══════════════════════════════════════════════════════════════
import { registerModule, pick } from '../engine.js';

const HUNGER_TIER_KEYS = ['normal', 'increased', 'high', 'craving', 'starving'];

const HUNGER_WORDS = {
  normal: ['a normal appetite', 'her usual hunger', 'nothing out of the ordinary appetite-wise'],
  increased: ['noticeably hungrier than usual', 'clearly thinking about food more often', 'her stomach growling more than normal'],
  high: ['very hungry', 'her stomach growling loudly', 'visibly distracted by hunger'],
  craving: ['craving food', 'restless with hunger', 'clearly fighting the urge to eat', 'stomach twisting with hunger'],
  starving: ['starving', 'desperate for food', 'visibly struggling with hunger', 'looking almost frantic with hunger'],
};

const ADDICTED_HUNGER_WORDS = {
  craving: [
    'craving your food specifically',
    'keeps glancing at you like she hopes you will feed her',
    'clearly wanting you to be the one feeding her',
  ],
  starving: [
    'starving for anything you will give her',
    'almost frantic — she needs you to feed her',
    'looking at you with that desperate, glassy hunger',
    'visibly aching for you to feed her',
  ],
};

const EATING_STYLE = {
  normal: ['eats steadily', 'eats with clear enjoyment', 'takes her time with each bite'],
  increased: ['eats faster than usual', 'keeps going for seconds without much thought', 'barely pauses between bites'],
  high: ['eats greedily', 'devours her food', 'barely comes up for air between bites'],
  craving: ['eats like she has been waiting for this', 'makes small desperate sounds between bites', 'eats with an almost grateful intensity'],
  starving: ['devours the food', 'eats like she is afraid it will be taken away', 'moans softly around mouthfuls', 'eats like she is starving'],
};

const ADDICTED_EATING = {
  moderate: [
    'keeps looking at you between bites like she wants more',
    'eats with an almost grateful intensity',
    'presses a little closer while eating',
  ],
  severe: [
    'makes needy little sounds when you feed her',
    'eats like she is worshiping the act of being fed',
    'keeps glancing at you with glassy, desperate eyes',
  ],
  dependent: [
    'eats like she is worshiping the act of being fed by you',
    'whimpers softly if you slow down',
    'looks almost dazed with relief and pleasure while you feed her',
    'presses into your hand while eating',
    'makes soft, broken sounds between bites',
  ],
};

const WITHDRAWAL_BEHAVIOR = {
  moderate: ['she is clearly irritable', 'she keeps snapping at small things', 'she is short-tempered and restless'],
  severe: ['she is visibly agitated', 'she is getting aggressive and snappy', 'she looks like she is barely holding it together'],
  dependent: ['she is outright aggressive', 'she is lashing out and clearly miserable', 'she is furious and desperate at the same time'],
};

const BEGGING_WORDS = {
  mild: ['she keeps glancing at you hopefully', 'she looks like she wants to ask for more'],
  moderate: ['she is clearly holding herself back from asking', 'she keeps opening her mouth like she wants to beg'],
  severe: ['she is barely stopping herself from begging', 'she looks like she is about to start pleading'],
  dependent: ['she is openly begging now', 'she is desperate and not even trying to hide it', 'she is whimpering and pleading for more'],
};

function hungerKey(tier) {
  return HUNGER_TIER_KEYS[Math.min(4, Math.max(0, tier ?? 0))];
}

function addictionEatKey(level) {
  if (level >= 4) return 'dependent';
  if (level >= 3) return 'severe';
  if (level >= 2) return 'moderate';
  return null;
}

function beggingKey(addiction, hunger) {
  if (addiction >= 4 || hunger >= 4) return 'dependent';
  if (addiction >= 3 || hunger >= 3) return 'severe';
  if (addiction >= 2 || hunger >= 2) return 'moderate';
  if (addiction >= 1 || hunger >= 1) return 'mild';
  return null;
}

function withdrawalKey(addiction) {
  if (addiction >= 4) return 'dependent';
  if (addiction >= 3) return 'severe';
  return 'moderate';
}

registerModule('word.hunger', [{
  when: {},
  text: (ctx) => pick(HUNGER_WORDS[hungerKey(ctx.d.hungerTier)] || HUNGER_WORDS.normal),
}]);

registerModule('word.addictedHunger', [{
  when: { addictionLevelMin: 2 },
  text: (ctx) => {
    const key = ctx.d.hungerTier >= 4 ? 'starving' : 'craving';
    return pick(ADDICTED_HUNGER_WORDS[key] || ADDICTED_HUNGER_WORDS.craving);
  },
}]);

registerModule('word.eating', [{
  when: {},
  text: (ctx) => pick(EATING_STYLE[hungerKey(ctx.d.hungerTier)] || EATING_STYLE.normal),
}]);

registerModule('word.addictedEating', [{
  when: { addictionLevelMin: 2 },
  text: (ctx) => {
    const key = addictionEatKey(ctx.d.addictionLevel);
    return key ? pick(ADDICTED_EATING[key]) : pick(ADDICTED_EATING.moderate);
  },
}]);

registerModule('word.withdrawal', [{
  when: { inWithdrawal: true },
  text: (ctx) => pick(WITHDRAWAL_BEHAVIOR[withdrawalKey(ctx.d.addictionLevel)]),
}]);

registerModule('word.begging', [{
  when: {},
  text: (ctx) => {
    const key = beggingKey(ctx.d.addictionLevel, ctx.d.hungerTier);
    return key ? pick(BEGGING_WORDS[key]) : pick(BEGGING_WORDS.mild);
  },
}]);

registerModule('hunger.desc', [
  { when: { hungerTier: [4] }, priority: 4, text: (ctx) => `She is ${pick(HUNGER_WORDS.starving)}.` },
  { when: { hungerTier: [3] }, priority: 3, text: (ctx) => `She is ${pick(HUNGER_WORDS.craving)}.` },
  { when: { hungerTier: [2] }, priority: 2, text: (ctx) => `She is ${pick(HUNGER_WORDS.high)}.` },
  { when: { hungerTier: [1] }, priority: 1, text: (ctx) => `She is ${pick(HUNGER_WORDS.increased)}.` },
  { when: {}, text: 'Her appetite seems normal for now.' },
]);

registerModule('hunger.addictedDesc', [
  { when: { addictionLevelMin: 2, hungerTierMin: 3 }, priority: 3,
    text: (ctx) => `More than that — she is ${pick(ADDICTED_HUNGER_WORDS.starving)}.` },
  { when: { addictionLevelMin: 2 }, priority: 2,
    text: (ctx) => `Underneath it, she is ${pick(ADDICTED_HUNGER_WORDS.craving)}.` },
  { when: {}, text: '' },
]);

registerModule('eating.style', [
  { when: { addictionLevelMin: 3, hungerTierMin: 3 }, priority: 4,
    text: (ctx) => `She ${pick(ADDICTED_EATING.dependent)}.` },
  { when: { addictionLevelMin: 2, hungerTierMin: 2 }, priority: 3,
    text: (ctx) => `She ${pick(ADDICTED_EATING[addictionEatKey(ctx.d.addictionLevel)] || ADDICTED_EATING.moderate)}.` },
  { when: { hungerTierMin: 2 }, priority: 2,
    text: (ctx) => `She ${pick(EATING_STYLE[hungerKey(ctx.d.hungerTier)])}.` },
  { when: {}, text: (ctx) => `She ${pick(EATING_STYLE.normal)}.` },
]);

registerModule('talk.hungryCoda', [
  { when: { inWithdrawal: true }, priority: 4,
    text: (ctx) => ` ${pick(WITHDRAWAL_BEHAVIOR[withdrawalKey(ctx.d.addictionLevel)])}.` },
  { when: { addictionLevelMin: 2, hungerTierMin: 3 }, priority: 3,
    text: (ctx) => ` She keeps glancing at you with that hungry look — ${pick(ADDICTED_HUNGER_WORDS.craving)}.` },
  { when: { hungerTierMin: 2 }, priority: 2,
    text: (ctx) => ` ${pick(BEGGING_WORDS[beggingKey(ctx.d.addictionLevel, ctx.d.hungerTier)] || BEGGING_WORDS.mild)}.` },
  { when: {}, text: '' },
]);
