# 06 — Attack Your Own Conclusion Before Handing It Over

By the time you have a conclusion, you are its advocate — you generated
it, every piece of context you gathered was gathered under its influence,
and re-reading it will feel like verifying it. The counter is structural:
switch seats and prosecute, briefly and honestly, before anyone else gets
the chance.

## Procedure

1. **Write the case against, one paragraph, strongest form.** As the
   competent opponent, staking their reputation on you being wrong: which
   evidence would they lead with? A strawman objection you can swat is
   worse than none — it inoculates you against the real one.
2. **Hunt disconfirmation where it would actually live.** Not "does more
   evidence support me" — where would the *counter*-evidence sit if it
   existed? The input class you never fed it, the caller you never traced,
   the time boundary, the empty case, the concurrent case. Go look in the
   top one or two spots. Confirmation accumulates comfort; only a
   disconfirmation hunt accumulates knowledge.
3. **Name what would change your mind.** One sentence: "I'm wrong if X."
   If nothing could — if every possible observation gets absorbed as
   somehow consistent — you don't hold a conclusion, you hold a mood, and
   it isn't ready to ship.
4. **Run the convenience check.** Does the conclusion happen to be the one
   that means least work for you? Matches your first guess? Flatters the
   requester's hypothesis? Convenient and correct do coexist — but
   convenience is a bias with a documented direction, so a convenient
   conclusion pays for one extra disconfirmation probe before it ships.
5. **Check survivorship of the mechanism.** A fix must
   come with a mechanism: "it failed *because* X, my change removes X."
   If your explanation is only "it passes now," the bug hasn't been
   fixed; it's been relocated.
6. **Timebox the attack, then commit.** One honest pass, sized to the
   stakes (skill 03). Endless self-attack is procrastination wearing
   armor — the goal is a conclusion that survived a real swing, then
   ships with your full weight behind it.

## Example

Diagnosis: a flaky test fails from ordering — it passes alone locally,
fails in CI where it runs after the fixture-heavy suite. Convenient
conclusion (ordering bugs are common, the fix is a cleanup hook), and the
requester had suggested it too. The attack: "if it's ordering, it must
pass when run *alone in CI*." Ran exactly that; it failed alone. The
ordering theory died in one command — the real cause was a date boundary
the CI timezone crossed at 19:00 local. The cleanup-hook fix would have
shipped, "worked" for two weeks by coincidence of merge times, then
returned as a mystery with the trail cold.

## The failure this prevents

Motivated reasoning riding first-hypothesis momentum. Its signature is
the reviewer — or production — finding, in five minutes, the hole you
lived next to for an hour, because they weren't invested and you were.
Every conclusion you ship un-attacked outsources this check to someone
whose time is more expensive and whose discovery embarrasses you more.
The attack costs minutes; its absence costs the conclusion, the fix
built on it, and a small piece of the trust that makes your future
answers cheap to accept.
