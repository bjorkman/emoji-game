#!/bin/bash
# Copies .env.local from ~/.config/emoji-game/ into mobile-app/
# Run this after cloning or creating a new worktree.

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
SOURCE="$HOME/.config/emoji-game/.env.local"
DEST="$PROJECT_ROOT/mobile-app/.env.local"

if [ ! -f "$SOURCE" ]; then
  echo "Error: $SOURCE not found."
  echo "Create it with your Supabase credentials:"
  echo "  EXPO_PUBLIC_SUPABASE_URL=https://<project>.supabase.co"
  echo "  EXPO_PUBLIC_SUPABASE_ANON_KEY=<anon-key>"
  exit 1
fi

cp "$SOURCE" "$DEST"
echo "Copied .env.local to mobile-app/"
