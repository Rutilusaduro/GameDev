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
