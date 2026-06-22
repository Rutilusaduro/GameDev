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
    `You tell her something you haven't told anyone. She receives it from the warm settled center of where she rests — no advice yet, not rushing to the next thing. She just holds the fact of what you've said, and then asks one question that gets directly to the thing you were actually trying to say.`,
    `She confides back. It's the deal: you bring her something real and she gives you something real in return. What she says is neither small nor performed — it is simply honest, offered from the particular perspective of someone who has been watching everything from a fixed point for months now. She knows things from here that she didn't know when she was moving through it.`,
    `"I've been thinking about something," she says, unprompted, when the gossip part is done. You listen. What she says is not for anyone else — just for the room, just for you, just for the intimate radius of the space she occupies now. It is real.`,
    `The conversation goes somewhere neither of you planned. That's the thing about confiding to someone who isn't going anywhere — you say more than you meant to, because she's still there when you run out of the easy version. She meets what you actually said. "Yeah," she says. "I know."`,
  ]},
  { when: { stageMin: 11 }, weight: 3, text: [
    `Something about her stillness makes telling her things easier than it should be. She is the fixed point. Whatever you bring her stays in this room — held by the same calm immensity that holds everything else she's collected.`,
    `She listens to the whole thing — the actual thing, not the comfortable version — without shifting, without interjecting, without letting the weight of the room come loose. She just receives it. Then she says the thing back to you in a form you can actually use. You leave lighter.`,
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

// ── set.socialize.praise ──────────────────────────────────────
// You name her size aloud. She receives it; the praise feeds her.
registerPool('set.socialize.praise', [
  { when: {}, text: [
    `You tell {subject.name} what she looks like to you. She takes it in.`,
    `You say it plainly. She receives it the same way.`,
  ]},
  { when: { stageMin: 10, stageMax: 10 }, weight: 2, text: [
    `You tell her how vast she is, how entirely she fills the room. You name it specifically — not vaguely, not euphemistically. She goes very still while you're saying it and then, after, exhales slowly. Something settles in her at being named.`,
    `"You know what you look like," you say, and then you tell her. She has been hearing it in her own head for months; hearing it from outside makes it more real, more fixed, more hers. Her chin lifts just slightly. "I do," she says.`,
    `You don't make it clinical. You make it true. She is soft and enormous and beautiful and she fills the room the way light fills a room — completely, without trying. You say all of it. She listens with her eyes half-closed and doesn't interrupt once.`,
    `You name the specific things: the softness of her arms at rest, the way her weight settles, the geography she has become. She lets each thing land. She doesn't deflect them. She collects them instead.`,
  ]},
  { when: { stageMin: 11 }, weight: 3, text: [
    `There is so much of her to name. You don't rush it. She receives each part you name with the stillness of something that has finally arrived at the size it was always going to be, and is glad to hear someone say it.`,
    `You tell her what she is at this scale: extraordinary. Specific. More than you have language for. You use the language you have. She listens from the warm permanent center of the room and her breathing goes slower and softer while you speak. After, she says nothing. She doesn't need to.`,
    `"You're impossible," you say — meaning the scale, the softness, the impossible warmth of her — and she accepts it the way she accepts everything now: from a position of absolute certainty about what she is. "I know," she says. She has been this for a while. She is glad you caught up.`,
  ]},
  { when: { corruption: [0] }, weight: 2, text: [
    `She goes a little undone. Not badly — something small and real, the way you go undone when something that was true quietly becomes acknowledged. She doesn't say anything right away. Then: "Thank you for saying it."`,
    `She isn't sure where to put what you've said. She accepts it quietly, holds it somewhere warm, and thanks you without entirely meeting your eyes. The praise has found its mark.`,
    `"Really?" she says, almost to herself. She is asking the room. You say it again. She nods slowly, not deflecting — just taking longer than expected to absorb it. "Okay," she says, finally. "Okay."`,
  ]},
  { when: { corruption: [1] }, weight: 2, text: [
    `She takes it without flinching. She has been working up to being able to do that for months. The ease of it now is its own small thing. "Yeah," she says. "I know. But I like hearing it."`,
    `She lets it land without deflecting it and without performing ease she doesn't feel. She just receives it — truly — and settles a little softer into where she rests. Being seen clearly by someone who approves entirely has its own weight.`,
    `"Say more," she says, after a moment. Not greedy — just open. You are the audience she allows for this, and she would like the full version.`,
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    `She accepts the praise with the placid certainty of someone who already knew this and is simply pleased you've caught up. "I know," she says warmly. "Keep going."`,
    `She receives it like due tribute — not because she is performing confidence, but because she has completely made peace with what she is, and what you're saying is simply accurate. She rewards accuracy. She smiles. "More."`,
    `"Exactly," she says, when you name the specific thing. She has been waiting for you to find that word. It was the right one. She settles a little deeper into herself, satisfied.`,
  ]},
]);
