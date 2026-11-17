# Portal PET Saúde Digital

Painel municipal em **`petsaude.franca.sp.gov.br`**: governança, cadastros, workspaces dos cinco grupos do PET Saúde Digital 2025, relatórios e documentos. O chat cidadão fica em `chatbots.franca.sp.gov.br`.

| | |
|---|---|
| Pasta | `/srv/pet-saude/portal/portal-pet-saude` |
| Arquitetura | Hexagonal — `docs/02_arquitetura/arq_001_portal_hexagonal.md` |
| Plano | `docs/05_progresso/planos_ativos/portal-pet-saude-implementacao-17_11_26-09_10.md` |
| Portas | API `3861` · Web `3862` · Postgres `5500` · G1 `3813` |
| Ops | `docs/10_setup/ops_001_ambiente_vm082.md` · NPM `ops_002_npm_petsaude.md` |

## Subir o stack

```bash
cp .env.example .env   # edite POSTGRES_PASSWORD
docker compose up -d --build
curl -sS http://127.0.0.1:3861/api/health
curl -sS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3862/
```

Dev login (`AUTH_MODE=dev`): `gestor/gestor`, `coordg1/coord`, `tutor/tutor`, `leitor/leitor`.

## Árvore

```text
apps/web, apps/api
packages/domain, application, ports
adapters/ad-ldap, prisma-postgres, g1-dashboard-http
prisma/
tools/g1-mock/
docs/
```

## Documentação

Comece por `docs/00_visao_geral/vis_001_portal_pet_saude.md` e o plano em `docs/05_progresso/planos_ativos/`.
