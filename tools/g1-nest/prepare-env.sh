#!/usr/bin/env bash
# Gera .env.g1 a partir do chatbot .env + JWT_SECRET novo (se faltar).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
OUT="$ROOT/.env.g1"
SRC="${CHATBOT_ENV:-/home/petsaude/chatbot/chatbot-docs/.env}"

if [[ ! -f "$SRC" ]]; then
  echo "Fonte ausente: $SRC" >&2
  exit 1
fi

pick() {
  local key="$1"
  local line
  line="$(grep -E "^${key}=" "$SRC" | head -1 || true)"
  [[ -z "$line" ]] && return 0
  local val="${line#*=}"
  # dotenv com aspas: docker env_file não remove — strip aqui
  val="${val%$'\r'}"
  if [[ "$val" == \"*\" ]]; then val="${val:1:-1}"; fi
  if [[ "$val" == \'*\' ]]; then val="${val:1:-1}"; fi
  printf '%s=%s\n' "$key" "$val"
}

JWT_LINE="$(pick JWT_SECRET)"
if [[ -z "${JWT_LINE#JWT_SECRET=}" || "$JWT_LINE" == "JWT_SECRET=" ]]; then
  JWT_LINE="JWT_SECRET=$(openssl rand -hex 32)"
fi

{
  echo "# Gerado por tools/g1-nest/prepare-env.sh — NÃO commit"
  echo "PORT=3813"
  pick MONGODB_URI
  pick DATABASE_URL
  echo "DATABASE_SSL=true"
  echo "DB_RUN_MIGRATIONS=${DB_RUN_MIGRATIONS:-true}"
  echo "$JWT_LINE"
  echo "JWT_EXPIRES_IN_SECONDS=28800"
  pick GEMINI_API_KEY
  pick GEMINI_EMBEDDING_MODEL
  pick GEMINI_TASK_TYPE
  echo "CORS_ORIGINS=http://127.0.0.1:3862,http://localhost:3862,http://portal-pet-api:3000"
} >"$OUT"

chmod 600 "$OUT"
echo "Escrito $OUT (secrets locais)."
