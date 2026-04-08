# Critterbar - Product Requirements Document

A macOS menu bar app that puts little emoji critters on your screen. They wander around slowly, interact with each other, and roam across all displays.

## Phase 1: Core App (v0) ✅
- [x] Swift Package with CritterbarCore library + Critterbar executable
- [x] Menu bar icon (🐾) with dropdown to add Cat, Dog, Bird
- [x] Transparent click-through overlay windows on each screen
- [x] Emoji critters that wander randomly within screen bounds
- [x] Remove All and Quit menu options
- [x] 30fps update loop driving critter movement
- [x] Unit tests for Critter model and CritterManager
- [x] Smoke test mode (--smoke-test flag)

## Phase 2: Better Movement
- [ ] Edge-walking behavior: critters prefer to walk along screen edges (bottom, sides)
- [ ] Gravity-like behavior: critters slowly drift toward the bottom of the screen
- [ ] Idle states: critters occasionally stop and sit for a few seconds
- [ ] Screen transitions: critters can walk from one display to another
- [ ] Smoother direction changes with easing/interpolation instead of instant snaps
- [ ] Variable speed: critters sometimes speed up or slow down naturally

## Phase 3: Critter Interactions
- [ ] Proximity awareness: critters notice when another critter is nearby
- [ ] Following behavior: some critters follow others when close
- [ ] Play behavior: two critters near each other occasionally "play" (bounce around each other)
- [ ] Sleep state: critters that have been idle too long fall asleep (zzz emoji overlay)
- [ ] Startle: clicking near a critter (temporarily disable ignoresMouseEvents for click detection) makes it run away

## Phase 4: More Critter Types & Customization
- [ ] Add more critter types: rabbit 🐰, hamster 🐹, fox 🦊, frog 🐸, turtle 🐢
- [ ] Each critter type has unique behavior traits (fox is faster, turtle is slower, frog hops)
- [ ] Critter count display in menu bar (show number of active critters)
- [ ] Per-critter-type speed and behavior settings
- [ ] "Add Random" option that picks a random critter type

## Phase 5: Polish & Persistence
- [ ] Remember critter positions and types between app launches (UserDefaults)
- [ ] Launch at login option
- [ ] Preferences window with critter speed slider, max critter count
- [ ] About window with version info
- [ ] Keyboard shortcut to add a random critter
- [ ] Notification when critters interact with each other (optional, off by default)
- [ ] App icon for the menu bar (custom SF Symbol or small image instead of emoji)

## Phase 6: Advanced Features
- [ ] Critter names: each critter gets a randomly generated name shown on hover
- [ ] Critter moods: happy, sleepy, excited — affects behavior and emoji expression
- [ ] Weather awareness: critters react to system dark mode (sleep more in dark mode)
- [ ] Window awareness: critters walk along the edges of actual application windows, not just screen edges
- [ ] Mini pixel art sprites as an alternative to emoji rendering
- [ ] Sound effects (subtle, optional): tiny footstep sounds, purring, chirping
