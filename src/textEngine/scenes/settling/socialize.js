// The Squad — Lead: A3 Immobility | Support: A7 Artisan, A5 Editor
// Settling socialize scenes — gossip / confide / praise.
// House voice: oracle warmth, campus gravity, celebrated and adored.
import { registerPool } from '../../engine.js';

// ── set.socialize.gossip ──────────────────────────────────────
// You bring the week's news. She is the oracle it passes through.
registerPool('set.socialize.gossip', [
  { when: {}, text: [
    `You pull up a chair and bring her the week. {subject.name} listens from where she rests, weighing each thing with the calm authority of someone who no longer has to leave to know what's happening.`,
    `She has become the room through which campus news filters. You bring it; she sorts it; she delivers the verdict. "Interesting," she says. You believe her.`,
  ]},
  { when: { stageMin: 10, stageMax: 10 }, weight: 2, text: [
    `You sit down beside the warm spread of her and give her the week — who said what, who went where, what everyone is pretending is not happening. She listens with her eyes slightly closed, the way a judge listens. Then she opens them and tells you what's actually going on.`,
    `She has become the campus oracle from a fixed point. You bring her the raw material and she processes it — the gossip sorted by weight, the drama classified, the real story behind the official one identified with no effort. "That won't last," she says about one thing. "That's going to be a problem," she says about another. She is right about everything.`,
    `{subject.name} receives the news of the week like someone receiving reports. You give her everything you know; she gives back better than what you brought. Her perspective has only sharpened since she stopped having to move through it. Distance, she says, is clarifying.`,
    `The chair you drag over is close enough that you can lower your voice and still be heard. You give her the week piece by piece, and she takes each bit with the patience of someone who is making a picture from pieces. "I thought so," she says. She is always thinking so.`,
    `She runs court from here now — warm, vast, immobile, and completely current. You bring the week's news and she unpacks it in two minutes flat. "What else?" she says, when you've given her everything. There's always what else.`,
  ]},
  { when: { stageMin: 11 }, weight: 3, text: [
    `At her scale she has become a kind of institution — immovable, present, and therefore authoritative. You bring her the week's developments and she considers them from the warm permanent center of her vantage. "I already heard some of that," she says. She always has. News finds its way to her.`,
    `You bring the outside to her where the outside can't reach — gossip, drama, the shape of the week as it happened without her. She receives each item with the unhurried confidence of someone who has made themselves the destination rather than the traveler. "Tell me the part they're leaving out," she says. You do.`,
    `They call it court now, which is accurate enough: you bring the news, she weighs it from the warm center of the room, and what she says about it becomes the answer. She is the clearinghouse. She doesn't move. Campus moves around her.`,
    `Half of what you tell her she's already heard through channels you don't fully understand. The other half she processes in real time, and what she says about it travels back out through those same channels. She is the still point the campus gossip web has organized itself around. She finds this arrangement correct.`,
  ]},
]);

// ── set.socialize.confide ─────────────────────────────────────
// Deeper intimacy: you confide, she receives; she confides back.
registerPool('set.socialize.confide', [
  { when: {}, text: [
    `You tell {subject.name} something. She listens with the particular weight of someone who has earned confidence — still, warm, entirely present. She keeps it.`,
    `There is an ease to telling her things. She is here. She is not going anywhere. She has the time and the stillness for it.`,
  ]},
  { when: { stageMin: 10, stageMax: 10 }, weight: 2, text: [
    `You tell her something you haven't told anyone. She receives it from the warm settled center of where she rests — no advice yet, not rushing to the next thing. She holds the fact of what you've said. Then: "How long have you been carrying that one around?" You realize you don't have an answer, and that the not-having is the whole problem.`,
    `She confides back. It's the deal: you bring her something real and she gives you something real in return. What she says is neither small nor performed — it is simply honest, offered from the particular perspective of someone who has been watching everything from a fixed point for months now. She knows things from here that she didn't know when she was moving through it.`,
    `"I've been thinking about something," she says, unprompted, when the gossip part is done. You listen. What she says is not for anyone else — just for the room, just for you, just for the intimate radius of the space she occupies now. It is real.`,
    `The conversation goes somewhere neither of you planned. That's the thing about confiding to someone who isn't going anywhere — you say more than you meant to, because she's still there when you run out of the easy version. She meets what you actually said. "Yeah," she says. "I know."`,
  ]},
  { when: { stageMin: 11 }, weight: 3, text: [
    `Something about her stillness makes telling her things easier than it should be. She is the fixed point. Whatever you bring her stays in this room — held by the same calm immensity that holds everything else she's collected.`,
    `She listens to the whole thing — the actual thing, not the comfortable version — without shifting, without interjecting. Then she hands it back smaller and truer: "So the problem isn't the thing itself. It's that you keep waiting for someone to give you permission." You sit with that longer than you mean to.`,
    `She tells you something she hasn't told anyone else. It arrives without ceremony: a fact about herself, a fear, something she's been sitting with for weeks in the particular way of someone who has no choice but to sit with things. She tells it straight and then lets the room absorb it. You don't make it into something. She appreciates this.`,
    `"You can tell me," she said, weeks ago. You didn't believe her at the time. You believe her now. There is a register of truth that only fits this room — her immobility, her stillness, the gravity of being in the presence of something that is not going to move and not going to forget. You use it.`,
  ]},
  { when: { corruption: [0] }, weight: 2, text: [
    `She's a little surprised every time you confide in her — that you'd bring her the real thing, not the performed version. She doesn't say so. She just listens with the careful attention of someone determined not to waste what she's been given.`,
  ]},
  { when: { corruption: [1] }, weight: 2, text: [
    `She knew, she says. Not everything — but the shape of it. She'd been waiting for you to say it out loud. "Now we can actually talk about it," she says, and means it.`,
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    `She tells you what she's already figured out about you — gently, directly, without making it a drama. You are not the first person to have sat in that chair and said too much. She remembers all of it.`,
  ]},
]);

// ── set.socialize.praise — composed skeleton ──────────────────
// You say concrete things about her body, out loud. She reacts.
// Rule (Style Ledger): the praise LINE contains the actual praise,
// quoted and specific — never "you name it specifically" placeholders.
registerPool('set.socialize.praise', [
  { when: {}, text: [`{set.socialize.praise.line} {set.socialize.praise.react}`] },
]);

// ── set.socialize.praise.line ─────────────────────────────────
// Shape: DIALOGUE BEAT — YOU speaking, naming named body regions,
// architecture, or the number. Stage-keyed (what's true of her body).
registerPool('set.socialize.praise.line', [
  { when: {}, text: [
    `"There's so much of you now," you tell her, resting a hand where her belly spills warm over her thigh. "More every week. My arm doesn't reach even a part of you."`,
    `"You spread a little wider every time I come in," you say, and you show her where — palm flat to the soft slope of her side, sinking. "Right here. It keeps going."`,
  ]},
  { when: { stageMin: 10, stageMax: 10 }, weight: 2, text: [
    `"You've outgrown the bed," you say, tracing where she spills past its reinforced edge. "Your hip hangs over the side. Your arm doesn't fold shut anymore — there's too much of it to fold."`,
    `"{subject.lbs} pounds," you tell her — she likes the number aloud. "Your belly reaches your knees when you sit up. I lift it with both arms to find your lap." You do. She exhales.`,
    `"Look what your thighs do now," you say, pressing a palm into one until it's gone to the wrist in soft heat. "They meet in the middle and keep pushing. There's nowhere left for them to go but out."`,
    `"Your arms," you say, both hands on one, not spanning even half of it. "The cloth stops halfway up. You've filled it past where the sleeve was built to stop." She goes very still while you say it.`,
  ]},
  { when: { stageMin: 11 }, weight: 3, text: [
    `"You fill the room," you tell her — no figure of speech. Her sides touch the walls on both sides of the bed. "There's more of you than there's room for. I love that."`,
    `"{subject.lbs}," you say. "You've near doubled since you stopped walking. Your belly's its own country — I climb it to get to you." She goes quiet, and her breathing slows.`,
    `"I can't take you in all at once anymore," you tell her, standing back to see her. "You've gotten past a single glance. I look at you in pieces now, and every piece is enormous."`,
  ]},
]);

// ── set.socialize.praise.react ────────────────────────────────
// Shape: her reaction. Corruption-keyed psychology.
registerPool('set.socialize.praise.react', [
  { when: {}, text: [
    `She takes it in. Something settles in her at being named out loud.`,
    `She lets each word land and doesn't deflect a single one.`,
  ]},
  { when: { corruption: [0] }, weight: 2, text: [
    `She goes a little undone — something small and real, the way you come undone when a true thing is finally said to your face. "Thank you for saying it," she manages, after.`,
    `She isn't sure where to put it. She holds it somewhere warm and thanks you without quite meeting your eyes.`,
    `"Really?" she says, almost to the room. You say it again. She nods slow, not deflecting, just taking longer than expected to let it in. "Okay," she says finally. "Okay."`,
  ]},
  { when: { corruption: [1] }, weight: 2, text: [
    `She takes it without flinching. She's been working up to that for months. "Yeah," she says. "I know. But I like hearing it."`,
    `She receives it and settles a little softer into where she rests. Being seen this clearly, by someone who approves entirely, has its own weight.`,
    `"Say more," she says, after a moment. Not greedy — open. You're the audience she allows for this, and she'd like the full version.`,
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    `She takes it like tribute, because it's accurate and she rewards accuracy. "I know," she says warmly. "Keep going."`,
    `She has made complete peace with what she is, so the praise is just true, and true things please her. She smiles. "More."`,
    `"Exactly," she says when you name the specific thing. She'd been waiting for you to find that word. She settles a little deeper into herself, satisfied.`,
  ]},
]);
