#!/usr/bin/env bash
cd "$(dirname "$0")"
export PATH="$PWD/.bin:$PATH"
echo "Starting Vehicle PDI Inspector dev server..."
npm run dev
