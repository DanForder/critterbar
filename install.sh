#!/bin/bash
set -e

echo "Building Tauri app..."
npx tauri build 2>&1 | tail -5

echo "Installing to /Applications..."
rm -rf /Applications/Critterbar.app
cp -R src-tauri/target/release/bundle/macos/Critterbar.app /Applications/Critterbar.app

echo "Done! Critterbar installed to /Applications/Critterbar.app"
echo "Find it in Spotlight, Launchpad, or Finder → Applications."
