# Critterbar: Tauri Rewrite Guide

This document contains everything a future Claude session needs to rewrite Critterbar from Swift/AppKit to Tauri v2.

## Why Rewrite

The Swift/AppKit version works but has a critical limitation: **Claude cannot visually self-verify** the app in the Ralph loop. XCUITest can't interact with menu bar items, and AppleScript + screencapture is brittle. With Tauri, the critter rendering happens in a web page that **Playwright can fully control, inspect, and record video of**. This is the key unlock for autonomous development via Ralph.

## What Exists Today (Swift Version)

The current app is a macOS menu bar app with:
- 🐾 status bar icon with dropdown menu (Add Cat/Dog/Bird, Remove All, Quit)
- Transparent click-through overlay windows (one per screen)
- Emoji critters (🐱🐶🐦) that walk along all four screen edges
- Critters pause every 3-8s for a 1-3s "sniff", then resume
- 30fps update loop
- No dock icon (LSUIElement)

Tag `swift-version` preserves the Swift code if needed.

## Current Critter Logic (Port This to TypeScript)

### CritterType
| Type | Emoji | Speed (px/s) |
|------|-------|-------------|
| cat  | 🐱   | 25          |
| dog  | 🐶   | 35          |
| bird | 🐦   | 45          |

### Edge Walking Model
- Critters always walk along one of four screen edges: bottom, right, top, left
- Direction is clockwise or counterclockwise (random at spawn)
- One coordinate is pinned to the edge, the other moves
- Frame size: 48x48 pixels
- When reaching a corner, transition to the next edge with a 2px inward nudge to prevent oscillation

### Sniff Pauses
- Every 3-8 seconds of walking, critter enters "sniffing" state
- Sniffing lasts 1-3 seconds (random)
- During sniffing, critter doesn't move
- Display emoji stays the same (no visual change for sniffing)

### Movement Logic (per frame)
```
movement = speed * deltaTime
direction = movingForward ? 1.0 : -1.0

On bottom edge: x += movement * direction, y = minY
On right edge:  y += movement * direction, x = maxX - 48
On top edge:    x -= movement * direction, y = maxY - 48
On left edge:   y -= movement * direction, x = minX

Corner transition example (bottom → right, clockwise):
  when x >= maxX - 48:
    x = maxX - 48
    y = minY + 2  // nudge to prevent oscillation
    edge = right
```

### CritterManager
- Holds array of all critters
- `addCritter(type, screenIndex)`: creates critter at random position, snaps to edge
- `removeCritter(id)`, `removeAll()`
- `update(deltaTime)`: calls each critter's update with its screen bounds
- `boundsProvider`: callback returning screen bounds array

### Reference: Swift Source Files
The full Swift implementation is in:
- `Sources/CritterbarCore/Critter.swift` — complete movement model
- `Sources/CritterbarCore/CritterManager.swift` — manager

## Target Architecture (Tauri v2)

### Tech Stack
| Layer | Technology |
|---|---|
| App framework | Tauri v2 |
| Frontend | Vanilla TypeScript + Vite |
| Rendering | DOM elements (divs with emoji text) |
| Backend | Rust (minimal: tray, window config) |
| Unit tests | Vitest |
| E2E tests | Playwright (against Vite dev server) |

**Why DOM over Canvas**: Playwright can directly query, click, and assert on DOM elements. Canvas would require pixel-level comparison which is fragile.

### Project Structure
```
critterbar/
├── src/                          # Frontend
│   ├── index.html                # Transparent overlay page
│   ├── main.ts                   # Init, animation loop, tray event listeners
│   ├── style.css                 # Transparent body, critter positioning
│   ├── critter.ts                # Critter class (port from Swift)
│   ├── critterManager.ts         # Manager (port from Swift)
│   └── renderer.ts               # Creates/updates DOM elements
├── src-tauri/                    # Rust backend
│   ├── tauri.conf.json
│   ├── Cargo.toml
│   ├── capabilities/
│   │   └── default.json
│   └── src/
│       └── lib.rs                # Tray setup, window config
├── tests/
│   ├── unit/
│   │   ├── critter.test.ts
│   │   └── critterManager.test.ts
│   └── e2e/
│       └── critters.spec.ts      # Playwright visual tests with video
├── playwright.config.ts
├── vitest.config.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
├── PRD.md
├── progress.txt
├── CLAUDE.md
├── verify.sh
├── ralph-once.sh
├── afk-ralph.sh
├── install.sh
└── README.md
```

## Implementation Steps

### Step 1: Clean the repo
- Create git tag `swift-version` on current HEAD
- Remove: `Sources/`, `Tests/`, `Package.swift`, `bundle.sh`, `e2e-test.sh`, `verify.sh`, `install.sh`, `ralph-once.sh`, `afk-ralph.sh`
- Keep: `README.md`, `PRD.md`, `progress.txt`, `CLAUDE.md`, `REWRITE.md`

### Step 2: Scaffold Tauri project
```bash
npm create tauri-app@latest -- --template vanilla-ts
```
Or manually set up with `npm init`, install dependencies:
```bash
npm install -D typescript vite @tauri-apps/cli@latest
npm install @tauri-apps/api@latest
cargo install tauri-cli  # if not already installed
```

### Step 3: Configure Tauri

**tauri.conf.json** key settings:
```json
{
  "productName": "Critterbar",
  "identifier": "com.critterbar.app",
  "app": {
    "macOSPrivateApi": true,
    "windows": [],
    "security": {
      "csp": "default-src 'self'; style-src 'self' 'unsafe-inline'"
    }
  }
}
```

**lib.rs** — Rust backend:
- Set activation policy to Accessory (no dock icon):
  ```rust
  app.set_activation_policy(tauri::ActivationPolicy::Accessory);
  ```
- Create TrayIcon with menu: Add Cat 🐱, Add Dog 🐶, Add Bird 🐦, separator, Remove All, separator, Quit
- On tray menu click, emit events to frontend: `add-critter` with type payload, `remove-all`
- Create overlay window programmatically:
  ```rust
  let window = tauri::WebviewWindowBuilder::new(app, "overlay", tauri::WebviewUrl::App("index.html".into()))
      .transparent(true)
      .decorations(false)
      .always_on_top(true)
      .build()?;
  window.set_ignore_cursor_events(true)?;
  ```

### Step 4: Port critter logic to TypeScript

**src/critter.ts** — Direct port:
- `CritterType` enum with emoji and speed
- `CritterBounds` interface with minX, minY, maxX, maxY
- `Edge` enum: bottom, right, top, left
- `CritterState`: 'walking' | { sniffing: number }
- `Critter` class: same update(), snapToEdge() logic as Swift version

**src/critterManager.ts** — Direct port:
- Array of critters, add/remove/update methods
- boundsProvider callback

### Step 5: Build the renderer

**src/renderer.ts**:
- `addCritterElement(critter)`: Creates a `<div>` with:
  - `position: fixed`
  - `font-size: 40px`, `width: 48px`, `height: 48px`
  - `data-critter-id="<uuid>"`
  - `data-critter-type="cat|dog|bird"`
  - `data-edge="bottom|right|top|left"`
  - Text content = emoji
- `updateCritterElement(critter)`: Updates left/top CSS and data-edge attribute
- `removeCritterElement(id)`: Removes the div

**src/style.css**:
```css
html, body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: transparent;
  pointer-events: none;
}
```

**src/main.ts**:
- Listen for Tauri events (`add-critter`, `remove-all`) from tray menu
- Get window bounds from Tauri API for CritterBounds
- Run animation loop via `requestAnimationFrame`
- On each frame: call `manager.update(deltaTime)`, update all DOM elements
- **Expose `window.critterbar = { addCritter, removeAll, getCritters }` for Playwright**

### Step 6: Unit tests (Vitest)

Port the 18 existing tests. Key test cases:
- Critter initialization (type, position, screenIndex)
- Type emoji and speed values
- Edge walking stays on edge after many updates
- Stays within bounds
- Sniffs eventually (within ~15 simulated seconds)
- Display emoji stays consistent
- Unique IDs
- Bounds width/height properties
- snapToEdge works
- Manager add/remove/removeAll/update

**vitest.config.ts**:
```typescript
import { defineConfig } from 'vitest/config';
export default defineConfig({ test: { include: ['tests/unit/**/*.test.ts'] } });
```

### Step 7: E2E tests (Playwright)

**playwright.config.ts**:
```typescript
import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:1420',
    video: 'on',
    screenshot: 'on',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:1420',
    reuseExistingServer: true,
  },
});
```

**tests/e2e/critters.spec.ts** — Tests run against Vite dev server:
```typescript
import { test, expect } from '@playwright/test';

test('adding a cat creates a critter on a screen edge', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.critterbar.addCritter('cat'));
  const critter = page.locator('[data-critter-type="cat"]');
  await expect(critter).toBeVisible();
  const box = await critter.boundingBox();
  // Check it's on an edge (x=0, y=0, x=maxX-48, or y=maxY-48)
  expect(box.x === 0 || box.y === 0 || /* ... */).toBe(true);
});

test('critters move along edges over time', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.critterbar.addCritter('dog'));
  const critter = page.locator('[data-critter-type="dog"]');
  const pos1 = await critter.boundingBox();
  await page.waitForTimeout(2000);
  const pos2 = await critter.boundingBox();
  expect(pos1.x !== pos2.x || pos1.y !== pos2.y).toBe(true);
});

test('critters pause to sniff', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.critterbar.addCritter('cat'));
  // Wait long enough for a sniff (up to 8s)
  // Check position doesn't change during sniff
});

test('remove all clears critters', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    window.critterbar.addCritter('cat');
    window.critterbar.addCritter('dog');
  });
  await expect(page.locator('[data-critter-type]')).toHaveCount(2);
  await page.evaluate(() => window.critterbar.removeAll());
  await expect(page.locator('[data-critter-type]')).toHaveCount(0);
});

test('no corner oscillation', async ({ page }) => {
  await page.goto('/');
  // Add critter, observe over time, check edge doesn't change every frame
});
```

Videos saved to `test-results/` — Claude can inspect in interactive sessions.

### Step 8: Scripts

**verify.sh**:
```bash
#!/bin/bash
set -e
echo "--- Build ---"
npm run build
echo "--- Unit Tests ---"
npx vitest run
echo "--- E2E Tests ---"
npx playwright test
echo "ALL VERIFICATION PASSED"
```

**ralph-once.sh** and **afk-ralph.sh**: Same pattern as current, but call `./verify.sh`.

**install.sh**:
```bash
#!/bin/bash
set -e
npm run tauri build
cp -R src-tauri/target/release/bundle/macos/Critterbar.app /Applications/Critterbar.app
```

### Step 9: Update docs
- **CLAUDE.md**: New build commands (`npm run dev`, `npm run tauri dev`, `npx vitest`, `npx playwright test`, `./verify.sh`)
- **PRD.md**: Update Phase 1 checklist for Tauri, keep Phases 2-6
- **progress.txt**: Append Tauri rewrite entry
- **README.md**: New quick start instructions

## Key Tauri Gotchas

1. **macOSPrivateApi: true** is required for transparent windows. This disqualifies the app from the Mac App Store (not a concern for this project).
2. **Click-through** uses `window.set_ignore_cursor_events(true)` in Rust. Set this on window creation.
3. **Multi-monitor** has a known limitation in Tauri — windows may all land on the primary screen. For v0, target single screen. Multi-monitor is a Phase 2 PRD item.
4. **Playwright tests the web content via the Vite dev server**, not the Tauri app directly. This is by design — it gives full DOM access and video recording.
5. **System tray** on macOS: use `iconAsTemplate: true` for proper menu bar rendering.
6. **Activation policy**: Set to `Accessory` in Rust `setup()` to hide from Dock.

## Verification Checklist

After the rewrite is complete, verify:
- [ ] `npm run dev` — Vite dev server shows critters in browser at localhost:1420
- [ ] `npx vitest run` — all unit tests pass
- [ ] `npx playwright test` — all e2e tests pass, videos in `test-results/`
- [ ] `npm run tauri dev` — full app with tray menu, transparent overlay, critters on edges
- [ ] `npm run tauri build` — produces Critterbar.app
- [ ] `./install.sh` — installs to /Applications, launchable from Spotlight
- [ ] `./verify.sh` — full pipeline passes
- [ ] Critters walk along edges, pause to sniff, turn corners smoothly
- [ ] Tray menu: Add Cat/Dog/Bird works, Remove All works, Quit works
- [ ] No dock icon visible
