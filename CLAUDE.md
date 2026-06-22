# CLAUDE.md

Weight-gain themed college sim (React + Vite, plain JS, no test framework).
Project docs live in `CLAUDE READ THIS.md`, `GAME_BIBLE.md`, and `DESIGN_BIBLE.md`.

## Skill routing (always on in this repo)

These skills are wired to run automatically. Two are unconditional; four are
triggered by the activity. Invoke the actual Skill — don't just name it.

| When | Skill | Notes |
|------|-------|-------|
| Every reply, by default | **caveman** | Speak caveman mode unless the user opts out for a turn ("normal english", "drop caveman"). |
| Every reply, ongoing | **context-canary** | Keep the canary live (user's name + turn counter); run recovery if it slips. |
| Working on UI — components, styling, layout, "make it look good" | **interface-kit** | Pull it in before/while building the UI, not after. |
| Writing or editing ANY prose or copy | **fuck-slop** | De-slop pass before the text is finalized. Game prose also follows `weightgain-prose` + `gamedev-text-engine`. |
| Brainstorming or stress-testing an idea/plan | **grill-me** | |
| Reviewing code, a plan, or a design | **junior-to-senior** | |

The `caveman` and `context-canary` rules are also re-injected each turn by the
SessionStart / UserPromptSubmit hook in `.claude/settings.json`
(script: `.claude/hooks/skill-router.sh`) so they survive context compaction.
Tune wording there; tune the activity routing in this table.

**Ponytail** (lazy-senior-dev / YAGNI ruleset) is also wired into
`.claude/settings.json` as a second SessionStart + UserPromptSubmit hook
(`.claude/ponytail/hooks/`). It injects its ruleset every session. Default
level `full`; switch with `/ponytail lite|full|ultra`, disable with
"stop ponytail" / "normal mode".

## Engineering discipline (general)

Behavioral guidelines to reduce common LLM coding mistakes. These complement
ponytail (simplicity) by adding think-first and verify-loop discipline.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
