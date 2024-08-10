#!/bin/sh
set -e

echo 'Waiting for PostgreSQL to start...'

while ! nc -z $DATABASE_HOSTNAME $DATABASE_PORT; do
    sleep 0.1
done

echo 'PostgreSQL has started'

echo 'Transpiling TypeScript...'
npx tsc

exec "$@"