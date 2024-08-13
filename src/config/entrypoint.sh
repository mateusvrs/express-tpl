#!/bin/sh
set -e

echo 'Waiting for PostgreSQL to start...'

while ! nc -z $DATABASE_HOSTNAME $DATABASE_PORT; do
    sleep 0.1
done

echo 'PostgreSQL has started'

echo 'Migrating database...'
npx prisma migrate deploy

echo 'Generate Prisma Client...'
npx prisma generate

echo 'Transpiling TypeScript...'
npx tsc

echo 'Typescript alias paths...'
npx tsc-alias

exec "$@"