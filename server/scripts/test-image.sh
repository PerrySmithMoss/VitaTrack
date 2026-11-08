#!/bin/sh
set -eu
image=${1:?Pass the built API image tag}
postgres_image=vitatrack-postgres:test
repo_root=$(CDPATH= cd -- "$(dirname "$0")/../.." && pwd)
platform=$(docker image inspect --format '{{.Os}}/{{.Architecture}}' "$image")
docker build --platform "$platform" -t "$postgres_image" "$repo_root/postgres"

fixture="api-smoke-$$"
database="$fixture-db"
api="$fixture-server"
cleanup() {
  docker rm -f "$api" "$database" >/dev/null 2>&1 || true
  docker network rm "$fixture" >/dev/null 2>&1 || true
}
trap cleanup EXIT
docker network create "$fixture" >/dev/null
docker run -d --platform "$platform" --name "$database" --network "$fixture" \
  -e POSTGRES_USER=fixture -e POSTGRES_PASSWORD=fixture -e POSTGRES_DB=fixture \
  "$postgres_image" >/dev/null
for attempt in $(seq 1 40); do
  if docker exec "$database" pg_isready -h 127.0.0.1 -U fixture -d fixture >/dev/null 2>&1; then
    break
  fi
  sleep 1
done
docker exec "$database" pg_isready -h 127.0.0.1 -U fixture -d fixture >/dev/null
docker run -d --platform "$platform" --name "$api" --network "$fixture" -p 127.0.0.1::5500 \
  -e DATABASE_URL="postgresql://fixture:fixture@$database:5432/fixture" \
  -e JWT_SECRET=fixture-signing-key-for-smoke-tests \
  -e CLIENT_URL=http://localhost -e SERVER_URL=http://localhost -e SERVER_DOMAIN=localhost \
  -e NODE_ENV=production "$image" >/dev/null
origin="http://$(docker port "$api" 5500/tcp)"
for attempt in $(seq 1 40); do
  health=$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{end}}' "$api")
  case "$health" in
    healthy) break ;;
    starting) sleep 1 ;;
    *) break ;;
  esac
done
if [ "$health" != healthy ]; then
  echo "VitaTrack container did not become healthy (status: ${health:-missing})" >&2
  docker logs "$api" >&2
  exit 1
fi
if ! SMOKE_API_ORIGIN="$origin" node "$(dirname "$0")/smoke-api.mjs"; then
  docker logs "$api" >&2
  exit 1
fi
