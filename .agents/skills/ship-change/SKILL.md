---
name: ship-change
description: Workflow for every code or content change in this repo, from feature branch to approved commit. Use whenever you edit, add, or delete files.
---

# Ship a Change

Take any change from a fresh feature branch to an approved commit: make the smallest change that
solves the task, verify it passes lint and build, explain it, and commit only after the user approves.

## When to Use

- Before editing, adding, or deleting any file in this repo: pages, components, styles, content, config, or docs.
- When resuming work on an existing feature branch.
- Not needed for read-only tasks such as answering questions or explaining code.

## Instructions

Follow these steps in order. Never skip step 5.
If the task's requirements are unclear, use the ask questions tool to clarify them before starting.

### 1. Start on a feature branch

If you are not already on a branch for this task, create one from an up-to-date `main`:

```bash
git checkout main
git pull
git checkout -b <type>/<short-description>
```

- Types: `feat/`, `fix/`, `refactor/`, `chore/`, `docs/`, `style/`
- One branch per logical change. If the task grows into unrelated work, stop and propose a separate branch.

### 2. Make the smallest change that solves the task

- Touch only the files the task needs.
- If you think a new dependency is needed, stop and ask first. Explain why built-in APIs
  or a few lines of code aren't enough.
- Note anything unrelated you'd improve and list it as a suggestion in step 4 rather than changing it.

### 3. Verify

```bash
npm run lint
npm run build
```

- Both must pass with no errors. Fix lint warnings your change introduced.
- If a check fails, fix the cause and re-run both. Don't suppress errors to get a pass.
- For UI changes, check the page in `npm run dev` in both light and dark mode and at phone width.

### 4. Request approval

Present the change in this format, then stop and wait:

```markdown
**Branch:** feat/theme-toggle

**Files changed**
- `components/ThemeToggle.tsx` (new)
- `app/layout.tsx`

**What changed and why**
<One or two sentences per file.>

**Why this approach**
<The main alternative(s) considered and why this one is simpler or better.>

**Concepts used**
<Optional: brief explanation of any Next.js/React/TypeScript concept that may be new.>

**Checks**
- `npm run lint`: pass
- `npm run build`: pass

**Suggestions (not done)**
<Optional: unrelated improvements noticed.>

**Proposed commit:** `feat: add dark/light mode toggle`

Approve this commit?
```

Commit messages follow Conventional Commits: `<type>: <imperative summary>`, lowercase, under 72 characters.

### 5. Commit only after approval

- Wait for an explicit "yes". Silence or a question is not approval.
- If changes are requested, revise, return to step 3, and ask again.
- After approval, stage only the files listed in the approval request (never `git add -A` blindly)
  and commit with the agreed message:

  ```bash
  git add <files>
  git commit -m "<message>"
  ```

- Then ask whether to push the branch. Never push, merge into `main`, or rebase without approval.
