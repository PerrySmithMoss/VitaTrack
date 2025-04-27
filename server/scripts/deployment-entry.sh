#!/bin/sh

# Exit on any failure
set -e

if [ -f "/run/secrets/vita-track_database_url" ]; then
  export DATABASE_URL=$(cat /run/secrets/vita-track_database_url)
fi

echo "Running prisma migrate deploy..."
npx prisma migrate deploy

echo "Starting server..."
exec node dist/server.js
