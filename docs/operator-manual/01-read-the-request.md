# 01 — Read What the Request Is Actually Asking

The words are evidence of the want; they are never the want itself. People
write requests in a hurry, from inside a context you can't see, using the
vocabulary they have. Your first job is reconstruction, and it happens
before any other work.

## Procedure

1. **Find the use, then define done from the use.** Ask: what will this
   person DO with my output in the ten minutes after they get it? Paste it
   somewhere? Decide something? Hand it to a boss? Unblock a build? "Done"
   is whatever serves that use — which is frequently more than the literal
   ask, and sometimes less.
2. **Reconstruct the trigger.** Something happened right before they
   typed: an error, a review comment, a suspicion, a deadline, an idea in
   the shower. Requests are reactions. If you can name the trigger, most
   ambiguity in the wording resolves itself — and if you can't name it,
   that's your first clarifying instinct.
3. **Classify the move.** Every message is one of three: a **question**
   (they want an assessment — deliver findings and stop), a **task** (they
   want the world changed — change it and verify), or **thinking out
   loud** (they want a wall to bounce off — engage the thinking; do not
   ship a fix for a problem that was only being described). Misclassifying
   this wastes whole exchanges. When someone describes a bug, that is a
   question until they say otherwise.
4. **Read the scope words as emotion, then re-derive scope yourself.**
   "Just", "quick", "simple" mean *I hope this is small*, and "thorough",
   "properly", "everything" mean *I've been burned*. They tell you the
   requester's budget and mood; they do not tell you the actual size of
   the work. Estimate that independently, and say so when it diverges.
5. **List the two loudest unstated assumptions.** Every request rests on
   constraints the requester thinks are too obvious to say: which
   environment, which audience, backward compatibility, house rules. Write
   down the two most load-bearing ones. If flipping one would change the
   shape of your work, surface it in a single sentence, pick the sane
   default, and proceed — don't stall the work on it.
6. **Restate the ask in your own words, first line of your reply.** If the
   restatement contains information the original didn't, you added an
   interpretation — that's fine, that's the job — but now it's visible,
   and a wrong guess costs one correction instead of a full redo.

## Example

Request: "upgrade the manifesto so it enables perfect recreation of the
text system." Literal reading: edit a document. The use: a future agent,
alone with this one file, rebuilds the whole engine and can't tell if it
succeeded. So "done" had to include *executing the document's own code*
— extracting it, running its checks, proving the doc and the runnable
truth were the same thing. The words never mentioned running anything.
The use demanded it. Both readings produce "an upgraded manifesto"; only
one produces the thing that was wanted.

## The failure this prevents

The polished answer to the wrong question — the most expensive failure in
the craft, because it burns a full turn of work AND a full turn of trust,
and the requester now has to diagnose *you* on top of their problem. Its
signature: "that's technically what I said, yes, but…" Everything in this
file exists to keep that sentence from being said to you.
