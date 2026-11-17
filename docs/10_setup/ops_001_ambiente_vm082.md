---
id: OPS-001
tipo: operacao
titulo: Ambiente VM082 — portal PET
status: aprovado
versao: 1.0.0
data: 2026-11-17
autor: DTI
classificacao: interno
codigo: F2.S1.P4
---

# OPS-001 — Setup portal

## Quando usar

Ao provisionar, reiniciar ou verificar o ambiente do portal na VM082.

## Pré-requisitos

- Conta com acesso a `/srv/pet-saude/portal/portal-pet-saude` e grupo `docker`
- Rede Docker externa `infra-ia` (NPM `infra-npm`)
- Regra de portas §2.5: `5500`, `3861`, `3862`, Nest/mock G1 `3813`
- Arquivo `.env` a partir de `.env.example`

## Passos

1. `cd /srv/pet-saude/portal/portal-pet-saude`
2. `cp .env.example .env` e defina `POSTGRES_PASSWORD` (e LDAP quando for o caso)
3. `docker compose up -d --build`
4. Conferir binds locais:
   - `ss -tln | grep -E '5500|3861|3862|3813'`
5. NPM (`infra-npm`): host `petsaude.franca.sp.gov.br` → `portal-pet-web:8080` (rede `infra-ia`), **sem** redirect para `chatbots`
6. Chat permanece em `chatbots.franca.sp.gov.br` → serviço PWA (inalterado)

## Verificação (healthchecks)

```bash
docker compose ps
curl -sS http://127.0.0.1:3861/api/health
curl -sS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3862/
curl -sS http://127.0.0.1:3813/health
# HTTPS (após NPM):
curl -sS -o /dev/null -w '%{http_code}\n' https://petsaude.franca.sp.gov.br/
```

Esperado:

- `portal-pet-postgres`, `portal-pet-api`, `portal-pet-web`, `portal-pet-g1-mock` healthy/up
- Portas só em `127.0.0.1` (exceto 80/443 do NPM)
- Raiz HTTPS do portal: **200** (login), **não** 301 para chatbots

## Prisma

Migrations em `prisma/migrations/`. No container da API o entrypoint roda `prisma migrate deploy` antes do `node`.

## Reversão

```bash
docker compose down
# volume (apaga dados): docker volume rm portal-pet-saude_portal_pg_data
```

Reverter NPM: restaurar forward anterior do host `petsaude` (ver backup/audit do NPM) — o chatbots **não** deve ser alterado.

## Contatos e última validação

DTI / coordenação PET — 2026-11-17 (F2.S1).
