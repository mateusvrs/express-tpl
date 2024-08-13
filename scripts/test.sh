#!/bin/sh
set -e

# Start the services in detached mode
docker compose -f docker/docker-compose.test.yml up -d

# Get the container ID of the 'node' service
container_id=$(docker compose -f docker/docker-compose.test.yml ps -q node)

# Stream logs in real-time
docker compose -f docker/docker-compose.test.yml logs -f node

# Shut down the services and remove volumes
docker compose -f docker/docker-compose.test.yml down -v

exec "$@"
