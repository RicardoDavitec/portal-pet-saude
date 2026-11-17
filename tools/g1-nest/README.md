# G1 Nest real (PEND-003)

Substitui `g1-mock` pelo Nest `Dashboard-PetSaude/back` em `127.0.0.1:3813`.

## Pré-requisitos

- Path do back: `/home/petsaude/chatbot/chatbot-docs/Dashboard-PetSaude/back` (override `G1_NEST_CONTEXT`)
- Arquivo `.env.g1` na raiz do portal (não versionado) com:
  - `MONGODB_URI`, `DATABASE_URL`, `DATABASE_SSL`, `JWT_SECRET` (≥32 chars)
  - `GEMINI_API_KEY` (Nest sobe sem, mas FAQs com embedding falham)
  - opcional: `CORS_ORIGINS`, `DB_RUN_MIGRATIONS=true` na 1ª subida

Gere o esqueleto:

```bash
./tools/g1-nest/prepare-env.sh
```

## Subir (troca o mock)

```bash
# .env
COMPOSE_PROFILES=g1-real
G1_DASHBOARD_API_URL_DOCKER=http://g1-dashboard:3813

docker compose --profile g1-real up -d --build g1-dashboard
curl -sS http://127.0.0.1:3813/
```

Obter JWT e apontar o portal:

```bash
G1_ADMIN_EMAIL=… G1_ADMIN_PASSWORD=… ./tools/g1-nest/issue-service-token.sh
# grava G1_SERVICE_TOKEN=<accessToken> no .env
docker compose up -d --force-recreate api
```

Voltar ao mock: `COMPOSE_PROFILES=g1-mock`, `G1_DASHBOARD_API_URL_DOCKER=http://g1-mock:3813`, `docker compose --profile g1-mock up -d g1-mock`.
