#!/bin/sh

echo "Wait start db..."
until nc -z -v -w30 "$DATABASE_HOST" "$DATABASE_PORT"; do
  echo "Waiting for PostgreSQL at $DATABASE_HOST:$DATABASE_PORT..."
  sleep 2
done

echo "DB is active. Running migrations..."

npm run migrate:up

echo "Starting backend..."
node dist/src/main