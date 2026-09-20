// Ranked feedee session mini-game data — MIGRATION.md extract.

export const SESSION_FOOD_ITEMS = [
  { id:"energy_drink", label:"Energy Drink",   icon:"⚡", gain:2,  focusRestore:28, fullnessCost:8  },
  { id:"chips",        label:"Bag of Chips",   icon:"🥔", gain:5,  focusRestore:12, fullnessCost:18 },
  { id:"ramen",        label:"Instant Ramen",  icon:"🍜", gain:9,  focusRestore:16, fullnessCost:28 },
  { id:"pizza",        label:"Pizza Slice",    icon:"🍕", gain:14, focusRestore:5,  fullnessCost:42 },
  { id:"full_order",   label:"Full Delivery",  icon:"📦", gain:24, focusRestore:22, fullnessCost:65 },
];

export const SESSION_NPC_LINES = {
  0:{ arrival:"Delivery.", exit:"Have a good session.", extra:null,
      desc:"New driver. Professional, quick, by the book." },
  1:{ arrival:"Order's here — got the item count wrong on a previous delivery, so these extras are on us.",
      exit:"Good luck with the game.", extra:"She leaves a dessert item. Unprompted.",
      desc:"She adds extras. Calls them mistakes. They are not." },
  2:{ arrival:"You were about to order, right? I was already heading over.",
      exit:"I'll be back when the queue runs.", extra:"She has the right snacks pre-staged.",
      desc:"She knows the schedule. She was already on her way." },
  3:{ arrival:"Hey. Lobby code still works.", exit:"I'll set up and get out of your way.", extra:null,
      desc:"She has the building code. She did not ask for it." },
  4:{ arrival:"Had a feeling you'd want this tonight.", exit:"I've got more in the car if the session runs.",
      extra:"She has the exact order Destiny was going to place.",
      desc:"She arrives before the order is placed." },
  5:{ arrival:"Hey.", exit:"I'm around.", extra:"She rearranges the desk slightly. Better now.",
      desc:"She's just here now. Sometimes with food. Always correct." },
};

export const SESSION_PAYOFF_TEXT = [
  (gain,reason)=>`Session complete. ${Math.round(gain)} pounds worth of food consumed. ${reason==='food_coma'?'Full stop — literally, food coma, done.':'Focus ran out before the food did. That\'s a new one.'} The Rae receipt is still on the desk. You\'re ordering from that place again.`,
  (gain,reason)=>`Session log: ${Math.round(gain)} lbs. ${reason==='food_coma'?'The extras she brought are all gone, every one of them, and you\'re too full to move.':'Ran out of focus. Which means you sat here eating and gaming until your eyes gave out.'} The rank went up anyway. You\'re not analyzing this.`,
  (gain,reason)=>`Game over — session, not match. You won the match. You also ate ${Math.round(gain)} pounds worth of food and you\'re very full and Rae said 'you\'re getting good at this' on the way out and you\'re not sure which part she meant. The setup was good. You feel, against all evidence, completely fine.`,
  (gain,reason)=>`Session log: ${Math.round(gain)} lbs, rank climbed. ${reason==='food_coma'?'The food ran out before the focus did — first time that\'s happened.':'Focus ran low and you kept going anyway and honestly that tracks.'} You feel different tonight — heavier, more settled. Rae texted to ask if she should bring more next time. You said yes before you finished reading it.`,
  (gain,reason)=>`${reason==='food_coma'?'Food coma.':'Focus out.'} ${Math.round(gain)} lbs. Diamond rank. You're very fat and very well-fed and Rae is somewhere in the room doing something quiet and efficient. You won four of the last five. You are choosing to focus on the wins and not whatever else is happening here. Working as intended.`,
  (gain,reason)=>`The session ended when Rae said it was ending. You were going to argue. You looked at the situation — ${Math.round(gain)} lbs worth of food consumed, rank at Grandmaster, every surface clear, your belly enormous and warm — and decided she was right. She said 'that\'s enough for today' the way someone says something they\'re also proud of. You think she might be right about that too.`,
];

