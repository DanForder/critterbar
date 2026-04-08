# Critterbar

A macOS menu bar app that lets you drop little critters onto your screen from the menu bar. They wander around slowly, stick to window edges, and interact with each other — across all your screens.

## Quick Start

```bash
# Build
DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer swift build

# Run
.build/debug/Critterbar
```

Click the 🐾 in your menu bar to add critters.

## Development

```bash
# Run tests
DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer swift test

# Smoke test
.build/debug/Critterbar --smoke-test
```

## Ralph Loop (Autonomous AI Development)

```bash
# Human-in-the-loop: run one iteration, watch what happens
./ralph-once.sh

# AFK mode: run N iterations autonomously
./afk-ralph.sh 10
```

See `PRD.md` for the feature roadmap and `progress.txt` for completed work.
