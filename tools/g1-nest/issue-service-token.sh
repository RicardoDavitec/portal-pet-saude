#!/usr/bin/env bash
# Login no Nest G1 e imprime accessToken (usar como G1_SERVICE_TOKEN).
set -euo pipefail
BASE="${G1_URL:-http://127.0.0.1:3813}"
EMAIL="${G1_ADMIN_EMAIL:?defina G1_ADMIN_EMAIL}"
PASS="${G1_ADMIN_PASSWORD:?defina G1_ADMIN_PASSWORD}"

resp="$(curl -sS -X POST "$BASE/auth/login" \
  -H 'Content-Type: application/json' \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\"}")"

token="$(python3 -c 'import json,sys; print(json.load(sys.stdin).get("accessToken",""))' <<<"$resp")"
if [[ -z "$token" ]]; then
  echo "Falha no login Nest: $resp" >&2
  exit 1
fi
echo "$token"
