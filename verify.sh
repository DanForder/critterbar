#!/bin/bash
set -e

echo "========================================="
echo "  Critterbar Verification Suite"
echo "========================================="
echo ""

echo "--- Step 1: Vite Build ---"
npx vite build 2>&1 | tail -5
echo "[build] PASS"
echo ""

echo "--- Step 2: Unit Tests ---"
npx vitest run 2>&1
echo "[unit-tests] PASS"
echo ""

echo "--- Step 3: E2E Tests (Playwright) ---"
npx playwright test 2>&1
echo "[e2e] PASS"
echo ""

echo "========================================="
echo "  ALL VERIFICATION PASSED"
echo "  Videos: test-results/"
echo "========================================="
