# Critterbar

A macOS menu bar app (Tauri v2) where emoji critters walk along your screen edges, pause to sniff, and can be added/removed from the 🐾 tray menu.

## Build & Test

```bash
# Install deps (first time only)
npm install
npx playwright install webkit

# Dev server (browser preview at localhost:1420)
npm run dev

# Full Tauri app (tray menu, transparent overlay)
npm run tauri:dev

# Unit tests (17 tests — critter logic)
npx vitest run

# E2E tests with video recording (7 tests — Playwright against Vite dev server)
npx playwright test

# Full verification suite (build + unit tests + e2e)
./verify.sh

# Build production .app
npm run tauri:build

# Install to /Applications
./install.sh
```

## Architecture

### Frontend (src/)
- `critter.ts` — Critter model: edge-walking, sniff pauses, corner nudge. Pure logic, no DOM.
- `critterManager.ts` — Manages collection of critters, drives updates via boundsProvider
- `renderer.ts` — Creates/updates DOM elements (divs with emoji). Each div has `data-critter-type`, `data-edge`, `data-state` attributes for Playwright assertions.
- `main.ts` — Animation loop (requestAnimationFrame), Tauri event listeners, exposes `window.critterbar` API
- `style.css` — Transparent body, fixed-position critter divs, pointer-events: none

### Backend (src-tauri/)
- `lib.rs` — Tray menu (Add Cat/Dog/Bird, Remove All, Quit), emits events to frontend. Sets activation policy to Accessory (no dock icon). Configures transparent click-through window.
- `tauri.conf.json` — macOSPrivateApi for transparency, fullscreen borderless window, always on top

### Tests
- `tests/unit/` — Vitest: critter movement, edges, sniffing, bounds, manager add/remove
- `tests/e2e/` — Playwright: adds critters via `window.critterbar`, asserts DOM positions on edges, checks movement, remove all, corner oscillation. **Records video** to `test-results/`.

## Critter Behavior

- Critters walk along screen edges (bottom → right → top → left, clockwise or counterclockwise)
- Corner transitions use 2px nudge to prevent oscillation
- Sniff pause: every 3-8s, pauses for 1-3s, then resumes
- Speeds: cat 12, dog 17, bird 22 px/s
- Frame size: 24x24px, font-size: 20px
- Sniff pause: every 3-8s, lasts 2-5s, with ±1px CSS wiggle animation

## Playwright E2E — Self-Verification for Ralph

Playwright tests run against the Vite dev server (not Tauri). This gives:
- Full DOM access to critter divs
- `data-*` attribute assertions
- Video recording of every test run
- The Ralph loop runs `./verify.sh`, gets text PASS/FAIL output

`window.critterbar` API (exposed on window for Playwright):
- `addCritter(type)` — add a critter ("cat", "dog", "bird")
- `removeAll()` — remove all critters
- `getCritters()` — get critter state array

## PRD & Ralph Loop

See `PRD.md` for feature roadmap. See `progress.txt` for completed work.
- `./ralph-once.sh` — single iteration, human-in-the-loop
- `./afk-ralph.sh 10` — autonomous loop, 10 iterations
