# Critterbar - Product Requirements Document

A macOS menu bar app that puts little emoji critters on your screen. They wander around slowly, interact with each other, and roam across all displays.

## Phase 1: Core App (Tauri v2) ✅
- [x] Tauri v2 app with transparent click-through overlay window
- [x] System tray icon with dropdown to add Cat, Dog, Bird
- [x] Remove All and Quit menu options
- [x] Emoji critters that walk along screen edges (bottom, right, top, left)
- [x] Critters pause to sniff every 3-8 seconds with wiggle animation
- [x] Corner transitions (deterministic, no oscillation)
- [x] requestAnimationFrame update loop
- [x] No dock icon (Accessory activation policy)
- [x] Vitest unit tests + Playwright e2e tests with video recording
- [x] verify.sh, Ralph loop scripts, install.sh

## Phase 2: More Critters & Menu Management ✅
- [x] Add more critter types: rabbit 🐰, hamster 🐹, fox 🦊, frog 🐸, turtle 🐢
- [x] Each critter type has unique speed (fox fastest, turtle slowest, frog hops)
- [x] Only allow one of each critter type at a time (grey out or hide already-added types in the menu)
- [x] Show list of active critters in the tray menu with individual remove option (e.g. "Remove Cat 🐱")
- [x] "Add Random" option that picks a random critter type from the ones not yet on screen
- [x] Critter count shown in menu bar next to the 🐾 icon (e.g. "🐾 3")
- [x] Emoji rotation: critters rotate so their feet always face the screen edge they're walking on
- [x] "Add All" menu item that adds all critter types at once
- [x] Variable speed: critters occasionally speed up or slow down naturally

## Next Up
- [x] Panel auto-hides when clicking outside it (blur/focus-lost dismissal)
- [x] Remember active critters between app launches (Tauri store or localStorage)
- [x] Spread spawning: new critters spawn at the position on the edges furthest from all existing critters (maximise distance from nearest critter)
- [x] Launch at login option in tray menu
- [x] **Panel state sync on restore**: fix checkboxes, Remove All, and Add All state after quit/reopen — currently Remove All is greyed out and Add All is enabled but non-functional when all critters are active
- [x] **Persist critter positions**: save full critter state (x, y, edge, direction) between app launches, not just types — currently critters get reshuffled on quit/reopen
- [x] **Auto-restart after update**: clicking Check for Updates should auto-download and auto-restart seamlessly (no manual "Restart to update" step) — critters are persisted so restart is safe
- [ ] Sleep state (as part of moods feature): critters fall asleep with zzz overlay — tied to sleepy mood, not just idle time
- [x] **Critter names on hover**: each critter gets a randomly generated cute name (e.g. "Captain Whiskers", "Sir Hopsalot") shown as a tooltip on hover. Name should persist between app launches (save with critter state). Each critter type should have a themed name pool.
- [x] Critter collisions: critters on the same edge can't overlap — they reverse direction and nudge apart on contact (1D billiard physics)
- [x] **Accessible name label colours**: critter name text is currently white, invisible on light backgrounds. Dynamically pick a readable colour based on what's behind the label (e.g. sample the background pixel colour via canvas, or use a dark outline/stroke that works on both light and dark backgrounds)
- [ ] Proximity awareness: critters notice when another critter is nearby (within ~100px)
- [ ] Following behavior: some critter types follow others when close (e.g. dog follows cat)
- [ ] **Pixel art sprites for remaining critters**: add sprite sheets (walk1, walk2, idle frames) to `src/sprites.ts` for cat, dog, rabbit, hamster, fox, frog, and turtle. Follow the same pattern as the bird sprite (12x12 pixel color arrays, rendered to canvas). Each critter should have a distinctive colour palette and recognisable silhouette. Keep the same chunky pixel art style.
- [ ] Smoother direction changes with easing instead of instant snaps
- [ ] Custom app icon for the tray (replace default icon with a proper critter icon)

## Future
- [ ] Preferences window: critter speed slider, max critter count
- [ ] Keyboard shortcut to add a random critter (global hotkey)
- [ ] Mini pixel art sprites as an alternative to emoji rendering (toggle in preferences)
- [ ] Walking animation for pixel art sprites (2-3 frame sprite sheet)
- [ ] Idle/sniff/sleep sprite variations
- [ ] Menu bar notch awareness: critters walk right up to the camera notch and around it on notched MacBooks, and to the full top edge on non-notched Macs
- [ ] Custom DMG installer: branded background image with "drag to Applications" arrow, positioned app + Applications icons, custom volume icon
- [ ] Critter moods: happy, sleepy, excited — affects behavior and emoji expression
- [ ] Dark mode awareness: critters react to system dark mode (sleep more in dark mode)
- [ ] Window awareness: critters walk along the edges of actual application windows, not just screen edges
- [ ] Sound effects (subtle, optional): tiny footstep sounds, purring, chirping

## Tech Debt
- [ ] Migrate from deprecated `cocoa` crate to `objc2-app-kit` for NSWindow level and collection behavior (~15 lines in lib.rs)

## Deferred
- [ ] Tray menu stays open after clicking an item (macOS system tray menus close on click by default — no clean Tauri API to override)
