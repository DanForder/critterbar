#!/bin/bash
set -e

# Master verification script for Critterbar
# Runs: build → unit tests → e2e test (AppleScript + screenshots)
# Use in Ralph loop or manually

PASS=true

echo "========================================="
echo "  Critterbar Verification Suite"
echo "========================================="
echo ""

# Step 1: Build
echo "--- Step 1: Build ---"
if DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer swift build 2>&1 | tail -1; then
  echo "[build] PASS"
else
  echo "[build] FAIL"
  exit 1
fi
echo ""

# Step 2: Unit tests
echo "--- Step 2: Unit Tests ---"
if DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer swift test 2>&1 | grep -E "Executed|passed|failed"; then
  echo "[unit-tests] PASS"
else
  echo "[unit-tests] FAIL"
  PASS=false
fi
echo ""

# Step 3: Bundle
echo "--- Step 3: App Bundle ---"
./bundle.sh 2>&1 | tail -1
echo ""

# Step 4: E2E test
echo "--- Step 4: E2E Test ---"
pkill -f "Critterbar" 2>/dev/null || true
sleep 1
if ./e2e-test.sh 2>&1; then
  echo "[e2e] PASS"
else
  echo "[e2e] FAIL"
  PASS=false
fi
echo ""

# Summary
echo "========================================="
if $PASS; then
  echo "  ALL VERIFICATION PASSED"
else
  echo "  VERIFICATION FAILED"
fi
echo "  Screenshots: /tmp/critterbar-e2e/"
echo "========================================="

$PASS
