# Critterbar

A macOS menu bar app that puts emoji critters on your screen. They walk along screen edges, pause to sniff, and can be added/removed from the menu bar.

## Build & Test

```bash
# Build
DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer swift build

# Run unit tests (18 tests)
DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer swift test

# Build app bundle (creates .build/debug/Critterbar.app)
./bundle.sh

# Run the app
open .build/debug/Critterbar.app

# Run full verification suite (build + unit tests + bundle + e2e)
./verify.sh

# Run just the e2e test (AppleScript menu interaction + screenshots)
./e2e-test.sh
```

**Important**: Use `DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer` prefix for all swift commands. The default Command Line Tools toolchain doesn't include XCTest.

## Architecture

- **CritterbarCore** (library target): Pure logic, no AppKit. Fully testable.
  - `Critter.swift` — Single critter model with edge-walking movement, sniff pauses, boundary clamping
  - `CritterManager.swift` — Manages collection of critters, drives updates
- **Critterbar** (executable target): AppKit UI layer, depends on CritterbarCore
  - `main.swift` — App entry point, parses `--smoke-test` and `--visual-test` flags
  - `AppDelegate.swift` — Sets up menu bar, overlay windows, 30fps update loop, smoke/visual tests
  - `StatusBarController.swift` — Menu bar icon (🐾) with Add Cat/Dog/Bird, Remove All, Quit
  - `OverlayWindowController.swift` — Transparent click-through floating windows, one per screen
  - `CritterView.swift` — NSTextField subclass rendering emoji at critter position (48x48, 40pt font)
- **CritterbarTests** (test target): XCTest suite for CritterbarCore

## Critter Behavior

- Critters walk along screen edges (bottom, right, top, left) going clockwise or counterclockwise
- They turn corners when reaching the end of an edge
- Every 3-8 seconds they pause for 1-3 seconds (sniffing), then resume walking
- Each critter type has a different speed: cat (25), dog (35), bird (45) pixels/second
- Critters use 48x48 pixel frames on screen edges

## Verification Suite (verify.sh)

The verification suite runs 3 layers:
1. **Build check** — `swift build` compilation
2. **Unit tests** — 18 XCTest tests for Critter model and CritterManager
3. **E2E test** (e2e-test.sh) — Full AppleScript-driven test that:
   - Launches the .app bundle
   - Clicks the 🐾 menu bar to add Cat, Dog, Bird via AppleScript
   - Takes screenshots at each step (saved to /tmp/critterbar-e2e/)
   - Captures cropped edge-region screenshots for visual inspection
   - Verifies overlay windows exist
   - Clicks Remove All, then Quit via the menu
   - Verifies clean exit

**Accessibility**: The e2e test requires osascript accessibility permissions (System Settings > Privacy & Security > Accessibility). These are already enabled.

## App Bundle

`bundle.sh` creates `Critterbar.app` with `LSUIElement: true` (no dock icon, menu bar only).

## PRD & Progress

See `PRD.md` for the full feature roadmap. See `progress.txt` for completed work.
The Ralph loop (`ralph-once.sh` / `afk-ralph.sh`) picks tasks from the PRD and implements them incrementally.
