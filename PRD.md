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

## Phase 2: More Critters & Menu Management
- [ ] Add more critter types: rabbit 🐰, hamster 🐹, fox 🦊, frog 🐸, turtle 🐢
- [ ] Each critter type has unique speed (fox fastest, turtle slowest, frog hops)
- [ ] Only allow one of each critter type at a time (grey out or hide already-added types in the menu)
- [ ] Show list of active critters in the tray menu with individual remove option (e.g. "Remove Cat 🐱")
- [ ] "Add Random" option that picks a random critter type from the ones not yet on screen
- [ ] Critter count shown in menu bar next to the 🐾 icon (e.g. "🐾 3")

## Phase 3: Better Movement & Behaviour
- [ ] Variable speed: critters occasionally speed up or slow down naturally
- [ ] Sleep state: critters that haven't moved for a long time fall asleep (zzz overlay), wake up after a bit
- [ ] Proximity awareness: critters notice when another critter is nearby (within ~100px)
- [ ] Following behavior: some critter types follow others when close (e.g. dog follows cat)
- [ ] Smoother direction changes with easing instead of instant snaps

## Phase 4: Persistence & Preferences
- [ ] Remember active critters between app launches (Tauri store or localStorage)
- [ ] Launch at login option in tray menu
- [ ] Preferences window: critter speed slider, max critter count
- [ ] Keyboard shortcut to add a random critter (global hotkey)

## Phase 5: Visual Polish
- [ ] Mini pixel art sprites as an alternative to emoji rendering (toggle in preferences)
- [ ] Walking animation for pixel art sprites (2-3 frame sprite sheet)
- [ ] Idle/sniff/sleep sprite variations
- [ ] Menu bar notch awareness: critters walk right up to the camera notch and around it on notched MacBooks, and to the full top edge on non-notched Macs
- [ ] Custom app icon for the tray (replace default icon with a proper critter icon)

## Phase 6: Advanced Features
- [ ] Critter names: each critter gets a randomly generated name shown on hover
- [ ] Critter moods: happy, sleepy, excited — affects behavior and emoji expression
- [ ] Dark mode awareness: critters react to system dark mode (sleep more in dark mode)
- [ ] Window awareness: critters walk along the edges of actual application windows, not just screen edges
- [ ] Sound effects (subtle, optional): tiny footstep sounds, purring, chirping
