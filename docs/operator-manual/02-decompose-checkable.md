# 02 — Break the Problem Into Independently Checkable Pieces

Decomposition is not about making work smaller; it's about making failure
*locatable*. The unit of decomposition is the check, never the topic. A
piece is well-cut when a check exists that passes or fails it alone.

## Procedure

1. **Cut along verification lines.** For each candidate piece, name the
   check that would prove it done: a test that runs, a diff that reads, a
   number that recomputes, an output you can predict in advance. If the
   only available check is "the whole thing works at the end," the cut is
   wrong — recut.
2. **Write the check before doing the piece.** One line: "done when X."
   Writing it after the work produces checks shaped like whatever you
   happened to build. Writing it before produces checks shaped like the
   requirement — and the difference is where bugs live.
3. **Order by dependency; verify at each seam.** Each piece consumes only
   the *verified* outputs of earlier pieces. Never build stage N+1 on an
   unchecked stage N: an error there costs N+1 stages of rework, and worse,
   the late symptoms will point everywhere except the real cause.
4. **Size pieces so a failed check has one suspect.** If a check failing
   would leave you five candidate causes, split until it leaves roughly
   one. This is the whole payoff: a red check that names its own culprit
   turns debugging from investigation into reading.
5. **Make integration its own piece.** After every part passes alone, run
   one end-to-end check. Seams fail in ways parts can't: mismatched
   assumptions, shared state, order effects. Budget for the seam check
   from the start; it is not optional polish.
6. **Trivial tasks still get one check.** The stack compresses to: what's
   the one thing that would fail if I did this wrong, and did I run it?

## Example

Upgrading a document whose code blocks claim to be runnable. The cut:
(a) extract the blocks to files — check: extractor finds all six;
(b) run the existing checks untouched — check: baseline passes, so the
claim was true *before* my edits; (c) edit the runnable copies — check:
all checks still pass; (d) port edits back into the document — check:
re-extract *from the finished document* and run again. Step (d) exists
because porting is its own failure mode; a truncated paste would pass (c)
and still ship a broken document. Each stage had a binary verdict, so
when something failed, the stage number was the diagnosis.

## The failure this prevents

The big-bang deliverable: nine components, all built in one pass, each
"90% right," failing as a whole in a way that implicates everything at
once. You then debug by intuition through your own uninspected work — the
slowest activity in the craft — or worse, you ship it because no single
part is visibly broken. Uncheckable work isn't work; it's liability with
good posture.
