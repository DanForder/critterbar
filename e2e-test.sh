#!/bin/bash
set -e

# E2E test for Critterbar using AppleScript + screenshots + accessibility checks
# Requires: Accessibility permissions for osascript/terminal

OUTPUT_DIR="/tmp/critterbar-e2e"
rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"
PASS=true

log() { echo "[e2e] $1"; }
fail() { echo "[e2e] FAIL: $1"; PASS=false; }
pass() { echo "[e2e] PASS: $1"; }

# Step 0: Build
log "Building..."
DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer swift build 2>&1 | tail -1
./bundle.sh 2>&1 | tail -1

# Step 1: Kill any existing instance
pkill -f "Critterbar" 2>/dev/null || true
sleep 1

# Step 2: Launch the app
log "Launching Critterbar..."
open .build/debug/Critterbar.app
sleep 2

# Verify it's running
if pgrep -f "Critterbar" > /dev/null; then
  pass "App launched successfully"
else
  fail "App failed to launch"
  exit 1
fi

# Step 3: Take baseline screenshot
screencapture -x "$OUTPUT_DIR/01-launched.png"
log "Captured baseline screenshot"

# Step 4: Click menu bar and add a cat via AppleScript
log "Adding cat via menu bar..."
osascript -e '
tell application "System Events"
    tell process "Critterbar"
        click menu bar item 1 of menu bar 1
        delay 0.5
        click menu item "Add Cat 🐱" of menu 1 of menu bar item 1 of menu bar 1
    end tell
end tell' 2>&1 && pass "Clicked Add Cat" || fail "Could not click Add Cat"

sleep 1

# Step 5: Add a dog
log "Adding dog via menu bar..."
osascript -e '
tell application "System Events"
    tell process "Critterbar"
        click menu bar item 1 of menu bar 1
        delay 0.5
        click menu item "Add Dog 🐶" of menu 1 of menu bar item 1 of menu bar 1
    end tell
end tell' 2>&1 && pass "Clicked Add Dog" || fail "Could not click Add Dog"

sleep 1

# Step 6: Add a bird
log "Adding bird via menu bar..."
osascript -e '
tell application "System Events"
    tell process "Critterbar"
        click menu bar item 1 of menu bar 1
        delay 0.5
        click menu item "Add Bird 🐦" of menu 1 of menu bar item 1 of menu bar 1
    end tell
end tell' 2>&1 && pass "Clicked Add Bird" || fail "Could not click Add Bird"

sleep 1

# Step 7: Screenshot with critters
screencapture -x "$OUTPUT_DIR/02-critters-added.png"
log "Captured screenshot with critters"

# Step 8: Wait for critters to walk, then screenshot
sleep 3
screencapture -x "$OUTPUT_DIR/03-after-walking.png"
log "Captured screenshot after 3s of walking"

# Step 8b: Capture cropped edge regions for visual verification
# Get screen dimensions
SCREEN_W=$(osascript -e 'tell application "Finder" to get bounds of window of desktop' 2>/dev/null | awk -F', ' '{print $3}' || echo "1920")
SCREEN_H=$(osascript -e 'tell application "Finder" to get bounds of window of desktop' 2>/dev/null | awk -F', ' '{print $4}' || echo "1080")
log "Screen: ${SCREEN_W}x${SCREEN_H}"

# Crop bottom edge (full width, bottom 80px)
screencapture -x -R "0,$((SCREEN_H - 80)),${SCREEN_W},80" "$OUTPUT_DIR/edge-bottom.png" 2>/dev/null
# Crop top edge (full width, top 80px)
screencapture -x -R "0,0,${SCREEN_W},80" "$OUTPUT_DIR/edge-top.png" 2>/dev/null
# Crop left edge (left 80px, full height)
screencapture -x -R "0,0,80,${SCREEN_H}" "$OUTPUT_DIR/edge-left.png" 2>/dev/null
# Crop right edge (right 80px, full height)
screencapture -x -R "$((SCREEN_W - 80)),0,80,${SCREEN_H}" "$OUTPUT_DIR/edge-right.png" 2>/dev/null
log "Captured edge region screenshots"

# Step 9: Verify app state
log "Checking app state..."
WINDOW_COUNT=$(osascript -e '
tell application "System Events"
    tell process "Critterbar"
        return count of windows
    end tell
end tell' 2>&1)
log "Window count: $WINDOW_COUNT"

if pgrep -f "Critterbar" > /dev/null; then
  pass "App still running after adding critters"
else
  fail "App crashed after adding critters"
fi

if [ "$WINDOW_COUNT" -ge 1 ] 2>/dev/null; then
  pass "Overlay windows exist ($WINDOW_COUNT windows)"
else
  fail "No overlay windows found"
fi

# Step 10: Remove all via menu
log "Removing all critters..."
osascript -e '
tell application "System Events"
    tell process "Critterbar"
        click menu bar item 1 of menu bar 1
        delay 0.5
        click menu item "Remove All" of menu 1 of menu bar item 1 of menu bar 1
    end tell
end tell' 2>&1 && pass "Clicked Remove All" || fail "Could not click Remove All"

sleep 1
screencapture -x "$OUTPUT_DIR/04-after-remove.png"
log "Captured screenshot after remove all"

# Step 11: Quit the app
log "Quitting app..."
osascript -e '
tell application "System Events"
    tell process "Critterbar"
        click menu bar item 1 of menu bar 1
        delay 0.5
        click menu item "Quit" of menu 1 of menu bar item 1 of menu bar 1
    end tell
end tell' 2>&1 && pass "Quit via menu" || fail "Could not quit via menu"

sleep 1

# Verify it's stopped
if pgrep -f "Critterbar" > /dev/null 2>&1; then
  fail "App still running after quit"
else
  pass "App exited cleanly"
fi

# Summary
echo ""
echo "============================="
if $PASS; then
  echo "[e2e] ALL TESTS PASSED"
else
  echo "[e2e] SOME TESTS FAILED"
fi
echo "Screenshots saved to: $OUTPUT_DIR/"
echo "============================="

$PASS
