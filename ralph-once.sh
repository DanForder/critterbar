#!/bin/bash

claude --permission-mode acceptEdits "@PRD.md @progress.txt @CLAUDE.md \
1. Read the PRD, progress file, and CLAUDE.md. \
2. Find the next incomplete task and implement it. \
3. Run the verification suite: ./verify.sh \
4. If any verification step fails, fix the issue before proceeding. \
5. Commit your changes. \
6. Update progress.txt with what you did. \
ONLY DO ONE TASK AT A TIME."
