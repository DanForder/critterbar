# Critterbar - Product Requirements Document

A macOS menu bar app that puts little emoji critters on your screen. They wander around slowly, interact with each other, and roam across all displays.

## Phase 1: Core App (Tauri v2) ✅
- [x] Tauri v2 app with transparent click-through overlay window
- [x] System tray icon with dropdown to add Cat, Dog, Bird
- [x] Remove All and Quit menu options
- [x] Emoji critters that walk along screen edges (bottom, right, top, left)
- [x] Critters pause to sniff every 3-8 seconds
- [x] Corner transitions with nudge to prevent oscillation
- [x] requestAnimationFrame update loop
- [x] No dock icon (Accessory activation policy)
- [x] 17 Vitest unit tests for critter logic
- [x] 7 Playwright e2e tests with video recording
- [x] verify.sh (build + unit tests + e2e)
- [x] Ralph loop scripts (ralph-once.sh, afk-ralph.sh)
- [x] Install to /Applications via install.sh

## Phase 2: Better Movement
- [ ] Sniff animation: critters do a small bounce or side-to-side wiggle while sniffing (CSS animation on the critter div when data-state="sniffing")
- [ ] Smoother direction changes with easing/interpolation instead of instant snaps
- [ ] Variable speed: critters sometimes speed up or slow down naturally
- [ ] Gravity-like behavior: critters prefer the bottom edge more than top
- [ ] Screen transitions: critters can walk from one display to another
- [ ] Multi-monitor support: create overlay windows for each screen

## Phase 3: Critter Interactions
- [ ] Proximity awareness: critters notice when another critter is nearby
- [ ] Following behavior: some critters follow others when close
- [ ] Play behavior: two critters near each other occasionally "play" (bounce around each other)
- [ ] Sleep state: critters that have been idle too long fall asleep (zzz emoji overlay)
- [ ] Startle: clicking near a critter makes it run away

## Phase 4: More Critter Types & Customization
- [ ] Add more critter types: rabbit 🐰, hamster 🐹, fox 🦊, frog 🐸, turtle 🐢
- [ ] Each critter type has unique behavior traits (fox is faster, turtle is slower, frog hops)
- [ ] Critter count display in menu bar (show number of active critters)
- [ ] Per-critter-type speed and behavior settings
- [ ] "Add Random" option that picks a random critter type

## Phase 5: Polish & Persistence
- [ ] Remember critter positions and types between app launches (localStorage or Tauri store)
- [ ] Launch at login option
- [ ] Preferences window with critter speed slider, max critter count
- [ ] About window with version info
- [ ] Keyboard shortcut to add a random critter
- [ ] App icon for the menu bar (custom icon instead of default)

## Phase 6: Advanced Features
- [ ] Critter names: each critter gets a randomly generated name shown on hover
- [ ] Critter moods: happy, sleepy, excited — affects behavior and emoji expression
- [ ] Weather awareness: critters react to system dark mode (sleep more in dark mode)
- [ ] Window awareness: critters walk along the edges of actual application windows, not just screen edges
- [ ] Mini pixel art sprites as an alternative to emoji rendering
- [ ] Sound effects (subtle, optional): tiny footstep sounds, purring, chirping
