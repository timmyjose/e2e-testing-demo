#!/usr/bin/env bash

set -eux

yarn install

echo "Deleting android and ios directories..."
rm -rf android ios

echo "Performing prebuild..."
npx expo prebuild
