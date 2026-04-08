#!/bin/bash
set -e
export PATH="$HOME/.local/bin:$PATH"

if [ -z "$1" ]; then
  echo "Usage: $0 <iterations>"
  exit 1
fi

for ((i=1; i<=$1; i++)); do
  echo "=== Ralph iteration $i of $1 ==="

  result=$(claude -p --permission-mode acceptEdits "@PRD.md @progress.txt @CLAUDE.md \
  1. Read the PRD, progress file, and CLAUDE.md. \
  2. Find the next incomplete task and implement it. \
  3. Run the verification suite: ./verify.sh \
  4. If any verification step fails, fix the issue before proceeding. \
  5. Update the PRD by checking off completed items. \
  6. Append your progress to progress.txt. \
  7. Commit your changes. \
  ONLY WORK ON A SINGLE TASK. \
  If the PRD is complete, output <promise>COMPLETE</promise>.")

  echo "$result"

  if [[ "$result" == *"<promise>COMPLETE</promise>"* ]]; then
    echo "PRD complete after $i iterations."
    exit 0
  fi
done

echo "Completed $1 iterations."
