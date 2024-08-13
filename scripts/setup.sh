#!/bin/sh
set -e

# Copy the .env.local file to .env
cp .env.local .env

# Give execution permissions
chmod +x ./scripts/test.sh
chmod +x ./src/config/entrypoint.sh

exec "$@"