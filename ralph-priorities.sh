#!/bin/bash
# Ralph loop targeting the Top Priority + Tech Debt items in PRD.md.
# Runs N iterations, one PRD task per iteration.
#
# Implementation notes:
#   - Prompt is piped via stdin (heredoc) instead of passed as a
#     positional argument, to avoid the variadic --allowedTools flag
#     swallowing the prompt.
#   - --permission-mode bypassPermissions lets the inner Claude run
#     git commit / cargo / verify.sh without prompting (memory:
#     feedback_ralph_commits — -p mode otherwise blocks bash).
#   - After each iteration the wrapper auto-commits anything left
#     uncommitted as a safety net.
#
# Usage: ./ralph-priorities.sh [iterations]   (default 5)

set -e
export PATH="$HOME/.local/bin:$PATH"

ITERATIONS="${1:-5}"
LOG="/tmp/ralph-priorities.log"
START_SHA="$(git rev-parse HEAD)"

echo "=== Ralph priorities loop started $(date) ===" | tee "$LOG"
echo "Starting commit: $START_SHA" | tee -a "$LOG"
echo "Iterations: $ITERATIONS" | tee -a "$LOG"
echo "" | tee -a "$LOG"

for ((i=1; i<=ITERATIONS; i++)); do
  echo "=== Iteration $i of $ITERATIONS — $(date) ===" | tee -a "$LOG"

  claude -p --permission-mode bypassPermissions <<'PROMPT' 2>&1 | tee -a "$LOG"
@PRD.md @progress.txt @CLAUDE.md
You are working through Critterbar's prioritised backlog.

1. Read PRD.md, progress.txt, and CLAUDE.md.
2. Find the next incomplete task. Work the sections in this order: Top Priority, then Tech Debt, then Next Up. Pick the FIRST unchecked item in the highest-priority section that still has work.
3. Implement it. ONE task only — do not bundle multiple PRD items.
4. If your changes touch Rust under src-tauri/, run `cd src-tauri && cargo check` and fix any errors before continuing.
5. Run ./verify.sh and fix anything that fails.
6. Tick the PRD checkbox for the item you just completed.
7. Append a one-line summary to progress.txt (format: `YYYY-MM-DD: <what you did>`).
8. Commit the changes with a clear message describing the task.
9. If every Top Priority and Tech Debt item is already checked off, output exactly <promise>COMPLETE</promise> and stop.
PROMPT

  echo "" | tee -a "$LOG"

  # Safety net: commit anything claude left uncommitted.
  if [[ -n "$(git status --porcelain)" ]]; then
    echo "[wrapper] Uncommitted changes detected — auto-committing." | tee -a "$LOG"
    git add -A
    git commit -m "Ralph iteration $i — auto-commit safety net" | tee -a "$LOG"
  else
    echo "[wrapper] Working tree clean after iteration $i." | tee -a "$LOG"
  fi

  echo "" | tee -a "$LOG"

  # Stop early if claude signalled completion.
  if grep -q "<promise>COMPLETE</promise>" "$LOG" 2>/dev/null; then
    echo "=== PRD priorities complete after $i iterations ===" | tee -a "$LOG"
    exit 0
  fi
done

echo "=== Finished $ITERATIONS iterations at $(date) ===" | tee -a "$LOG"
echo "Commits added since start:" | tee -a "$LOG"
git log --oneline "$START_SHA"..HEAD | tee -a "$LOG"
