#!/usr/bin/env bash
set -e  

# Directories to install dependencies
DIRS=(
  "limit-order-sdk"
  "fusion-sdk"
  "cross-chain-sdk"
)

# Enter each directory and execute npm install
for d in "${DIRS[@]}"; do
  echo "→ Enter directory $d and install dependencies"
  cd "$d"
  npm install --legacy-peer-deps
  cd ..
done

# Execute npm install in the root directory

echo "✅ Initialization completed!"
