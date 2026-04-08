#!/bin/bash
set -e

APP_NAME="Critterbar"
INSTALL_DIR="/Applications"

echo "Building..."
DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer swift build 2>&1 | tail -1

echo "Bundling..."
./bundle.sh 2>&1 | tail -1

echo "Installing to $INSTALL_DIR..."
mkdir -p "$INSTALL_DIR"

# Remove old version if present
rm -rf "$INSTALL_DIR/$APP_NAME.app"

# Copy new build
cp -R ".build/debug/$APP_NAME.app" "$INSTALL_DIR/$APP_NAME.app"

echo "Done! $APP_NAME installed to $INSTALL_DIR/$APP_NAME.app"
echo "You can find it in Spotlight, Launchpad, or Finder → Applications."
