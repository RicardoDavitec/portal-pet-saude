---
id: OPS-001
tipo: operacao
titulo: Ambiente VM082 — portal PET
status: rascunho
versao: 0.1.0
data: 2026-11-17
autor: DTI
classificacao: interno
---

# OPS-001 — Setup portal

## Quando usar

Ao provisionar ou verificar o ambiente do portal na VM082.

## Pré-requisitos

- Conta com acesso a `/srv/pet-saude/portal/portal-pet-saude` e grupo `docker`
- Regra de portas atualizada (§2.5)
- Arquivo `.env` a partir de `.env.example`

## Passos

1. `cd /srv/pet-saude/portal/portal-pet-saude`
2. `cp .env.example .env` e defina `POSTGRES_PASSWORD`
3. `docker compose up -d postgres`
4. Conferir bind: `ss -tln | grep 5500`
5. (F2) Subir api/web e apontar NPM `petsaude.franca.sp.gov.br` → `127.0.0.1:3862`
6. (F2.S2) Preencher variáveis LDAP com o DTI

## Verificação

- `docker compose ps` mostra `portal-pet-postgres` healthy
- Porta `5500` só em `127.0.0.1`
- Documentação F1 presente em `docs/00`…`docs/02`

## Reversão

```bash
docker compose down
# volume: docker volume rm portal-pet-saude_portal_pg_data  # apaga dados
```

## Contatos e última validação

DTI / coordenação PET — 2026-11-17.
