#!/bin/sh
set -e

# Initialize variable
COVERAGE=false

# Parse arguments
for arg in "$@"; do
  case $arg in
    --coverage)
      COVERAGE=true
      shift
      ;;
    *)
      # unknown option
      ;;
  esac
done

if [ "$COVERAGE" = true ]; then
  # Run the test suite with coverage
  docker compose -f docker/docker-compose.test.yml run --rm node npm run test:exec:coverage
else
  # Run the test suite
  docker compose -f docker/docker-compose.test.yml run --rm node npm run test:exec
  rm -rf ./coverage
fi

# Shut down the services and remove volumes
docker compose -f docker/docker-compose.test.yml down -v

exec "$@"
