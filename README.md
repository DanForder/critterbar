# Critterbar

A macOS menu bar app that puts little emoji critters on your screen. They walk along the edges, pause to sniff, and can be added from the 🐾 menu bar icon.

Built with [Tauri v2](https://tauri.app), TypeScript, and Vite.

## Quick Start

```bash
npm install
npm run tauri:dev
```

Click the 🐾 in your menu bar to add critters.

## Install

```bash
./install.sh
```

Installs `Critterbar.app` to `/Applications`. Find it in Spotlight or Launchpad.

## Development

```bash
# Browser preview (no tray menu, but critters work)
npm run dev

# Unit tests
npx vitest run

# E2E tests with video recording
npx playwright test

# Full verification
./verify.sh
```

## Ralph Loop (Autonomous AI Development)

```bash
# Human-in-the-loop
./ralph-once.sh

# AFK mode
./afk-ralph.sh 10
```

See `PRD.md` for the feature roadmap.
