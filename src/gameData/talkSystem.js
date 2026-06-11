// ═══════════════════════════════════════════════════════════════
// TALK SYSTEM — conversations shaped by Influence skills and her
// corruption tier. Registers: normal → submissive (Internalized Role)
// → broken (Broken Mind). Responses are fn(student).
// Topic gates reference skillEffect keys from skillTrees.js.
// ═══════════════════════════════════════════════════════════════

export const TALK_TOPICS = [
  // ── always available ───────────────────────────────────────
  { id:"check_in", label:"Check in", icon:"💬", group:"talk",
    effect:{ rel:2 },
    responses:[
      [ (s)=>`"Oh — hi, Professor." ${s.name} tucks a strand of hair back. "I'm good. Busy. Hungry, kind of constantly, which is — anyway. Good."`,
        (s)=>`${s.name} smiles, a little guarded. "Things are fine. Classes are fine." A beat. "The dining hall got better, did you notice? Or I did. One of those."`,
      ],
      [ (s)=>`"Better now," ${s.name} says, and means the company, or possibly the snacks you tend to bring. Probably both.`,
        (s)=>`${s.name} stretches, comfortable in her skin in a way she wasn't a semester ago. "Honestly? Really good. I've stopped fighting myself about... most things."`,
      ],
      [ (s)=>`${s.name} lights up. "I was hoping you'd come by. Sit. Watch me finish this." She pats the seat beside her like she's granting an audience.`,
        (s)=>`"I'm wonderful," ${s.name} says simply. "I'm fed, I'm growing, and you're here. List complete."`,
      ],
    ]},
  { id:"compliment", label:"Compliment her figure", icon:"🌸", group:"talk",
    effect:{ rel:3 },
    responses:[
      [ (s)=>`${s.name} flushes scarlet. "I— you noticed? I mean. Of course you noticed. It's... a lot to notice." She doesn't sound entirely unhappy about it.`,
        (s)=>`"You can't just say that," ${s.name} mutters, hugging her arms over her middle and failing to hide either it or the smile.`,
      ],
      [ (s)=>`${s.name} does a slow half-turn, letting you appreciate the work in progress. "It's coming along," she says, mock-modest. "I've been diligent."`,
        (s)=>`"Keep talking," ${s.name} says, settling deeper into her chair, which acknowledges her with a creak. "No, really. Keep talking."`,
      ],
      [ (s)=>`${s.name} takes the compliment the way a queen takes tribute — as her due. "I know," she says warmly. "And there's more of me every week. You're welcome."`,
        (s)=>`${s.name} smooths both hands down the great curve of herself. "Say it again," she says, "slower."`,
      ],
    ]},
  { id:"encourage", label:"Encourage her appetite", icon:"🍽", group:"talk",
    effect:{ rel:1, corruption:1 },
    responses:[
      [ (s)=>`${s.name} laughs nervously. "You're a bad influence, you know that?" She is already reaching for the snack she was pretending not to think about.`,
        (s)=>`"I shouldn't," ${s.name} says, which both of you recognize as the opening move of someone who absolutely will.`,
      ],
      [ (s)=>`${s.name} considers, then nods like you've settled an argument she was having with herself. "You're right. Why am I rationing? It's not like it's working."`,
        (s)=>`"Permission granted, huh," ${s.name} murmurs. Something in her shoulders lets go. "Okay. Tonight I'm not counting anything."`,
      ],
      [ (s)=>`${s.name} grins. "You don't have to encourage me anymore, Professor. But I like it when you do. Watch this." She does not disappoint.`,
        (s)=>`"Already ahead of you," ${s.name} says, gesturing to the spread she's assembled. "But say the words anyway. They help it go down."`,
      ],
    ]},

  // ── Quiet Suggestion (Influence T1) ───────────────────────
  { id:"suggest_indulgence", label:"Plant a suggestion", icon:"🗣", group:"suggest", requires:"unlockSuggestion",
    effect:{ corruption:2, rel:1 },
    responses:[
      [ (s)=>`You let the idea drift into the conversation, soft as smoke. ${s.name} blinks. "...I was just thinking I'm hungry," she says, puzzled by her own timing.`,
        (s)=>`The suggestion settles in behind her eyes. ${s.name} loses her thread mid-sentence. "Sorry — what was I — do you smell food?"`,
      ],
      [ (s)=>`The suggestion lands on prepared ground. "You know what," ${s.name} says, already standing, "I'm going to get something to eat. Don't know why it feels urgent. It just does."`,
        (s)=>`${s.name} nods along to words you didn't quite say out loud. "Mm. Yeah. Second dinner. That's — yeah."`,
      ],
      [ (s)=>`There's barely anything left to suggest to. ${s.name} catches the shape of your intent before you finish it and smiles, slow. "Whatever it is — yes."`,
        (s)=>`${s.name}'s eyes go soft and distant for a half-second, then refocus on you with total trust. "Tell me what you want me to do."`,
      ]],
    suggestNote:"Her resistance softens this week (-10% refusal).",
  },
  { id:"suggest_growth", label:"Suggest she's meant for more", icon:"🌙", group:"suggest", requires:"unlockSuggestion",
    effect:{ corruption:3 },
    responses:[
      [ (s)=>`"Meant for... more?" ${s.name} repeats. She looks down at herself, and for a moment her expression isn't denial. It's vertigo.`,
        (s)=>`${s.name} laughs it off. Mostly. The laugh dies a little early, and her hand drifts to the new softness at her side as if checking the claim.`,
      ],
      [ (s)=>`${s.name} is quiet for a long moment. "I think about that," she admits. "Being... bigger. On purpose. Does that make me strange?" She doesn't actually want it to mean no.`,
        (s)=>`"More," ${s.name} echoes, tasting the word. "You keep saying it like a destination." She doesn't say it doesn't sound like one.`,
      ],
      [ (s)=>`"I know," ${s.name} says, before you've finished. "I've known for a while. There's a version of me I haven't reached yet, and she's enormous, and she's happy." Her certainty fills the room.`,
        (s)=>`${s.name} takes your hand and puts it on the warm crest of her belly. "This is the project," she says. "Talk to it, not me."`,
      ]],
  },

  // ── Dominant Will commands (Influence T3) — EXTREME ────────
  { id:"command_finish", label:"Command: clean every plate", icon:"👑", group:"command", requires:"unlockCommand", extreme:true,
    effect:{ cals:6000, full:30, corruption:3 },
    refusal:(s)=>`${s.name} wavers — the command lands, but her body outvotes it. "I can't," she whispers, and means the physics, not the will.`,
    responses:[
      [ (s)=>`The command takes her like gravity. ${s.name} eats with wide, surprised eyes — surprised at her own hands, which have stopped asking her opinion.`,
      ],
      [ (s)=>`${s.name} exhales, settles, and obeys — methodical, unhurried, thorough. When the last plate is clean she looks to you for the next instruction.`,
      ],
      [ (s)=>`"Yes, Professor." No hesitation, no negotiation, the words arriving with relief. ${s.name} cleans every plate and then sits, hands folded, hopeful there's more.`,
      ]],
  },
  { id:"command_devour", label:"Command: devour", icon:"🩸", group:"command", requires:"devourersThreshold", extreme:true,
    effect:{ cals:14000, full:60, corruption:5 },
    refusal:(s)=>`Something ancient in ${s.name} rises to meet the command — and falters at the brink. Not tonight. Not yet. She trembles with how close it was.`,
    responses:[
      [ (s)=>`What follows is not eating. ${s.name} devours — the feast disappears into her with a momentum that frightens her even as she fails, completely, to stop. Afterward she sits in the wreckage of the table, gasping, transformed by the knowledge of what she can do.`,
      ],
      [ (s)=>`${s.name} comes apart from her manners entirely. Plates, platters, the centerpiece arrangement that was technically decorative — it all goes into her, and the sound she makes when it's done is pure, shameless satisfaction.`,
      ],
      [ (s)=>`${s.name} smiles when she hears the word. She has been waiting for it. The devouring is ritual-slow and total, and when the table is bare she licks her fingers one by one, eyes never leaving yours, an offering completed.`,
      ]],
  },
];

// register: 0 normal · 1 submissive (Internalized Role) · 2 broken (Broken Mind)
// Lines appended to responses when the register is unlocked + tier qualifies.
export const REGISTER_CODAS = {
  submissive: [
    (s)=>`"...thank you for taking care of me, Professor," ${s.name} adds, quieter. "Your greedy girl appreciates it."`,
    (s)=>`${s.name} adds, almost to herself: "I'm getting so big for you." She doesn't seem to notice she said 'for you.'`,
  ],
  broken: [
    (s)=>`${s.name}'s eyes have gone soft and depthless. "Whatever you want," she murmurs. "I stopped keeping track of where I end and your wanting begins."`,
    (s)=>`"I used to have other plans," ${s.name} says dreamily, patting herself. "Isn't that funny? I genuinely can't remember what they were."`,
  ],
};

export const TALK_CONFIG = {
  apCost: 1,
  suggestResistReduction: 0.10, // suggest_indulgence weekly debuff
  auraBonus: 0.35,              // mesmerizing aura weekly bonus
  devouringBonus: 0.30,         // devouring presence weekly bonus
};
