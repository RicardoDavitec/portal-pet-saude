# Portal PET Saúde Digital

Painel municipal em **`petsaude.franca.sp.gov.br`**: governança, cadastros, workspaces dos cinco grupos do PET Saúde Digital 2025, relatórios e documentos. O chat cidadão fica em `chatbots.franca.sp.gov.br`.

| | |
|---|---|
| Pasta | `/srv/pet-saude/portal/portal-pet-saude` |
| Kit | bootstrap `toolkit-agentes-skills` (`full-skeleton`) |
| Arquitetura | Hexagonal — ver `docs/02_arquitetura/arq_001_portal_hexagonal.md` |
| Plano | `docs/05_progresso/planos_ativos/portal-pet-saude-implementacao-17_11_26-09_10.md` |
| Portas | API `3861` · Web `3862` · Postgres `5500` · Nest G1 `3813` |

## Árvore

```text
apps/web, apps/api     # adaptadores de entrada (F2)
packages/domain        # regras e papéis PET
packages/application   # casos de uso (F2)
packages/ports         # interfaces
adapters/              # LDAP, Prisma, G1 HTTP, Gitness stub
prisma/                # schema
docs/                  # padrão 00–12
```

## Subir só o banco (agora)

```bash
cp .env.example .env   # edite a senha
docker compose up -d postgres
```

## Documentação

Comece por `docs/00_visao_geral/vis_001_portal_pet_saude.md` e o plano em `docs/05_progresso/planos_ativos/`. O padrão está em `docs/12_padrao_documentacao/`.

## Referência UX

Bot_Pan / VitaGuard — acesso direto ao WSL local desta máquina (`…/projetos/Bot_Pan`). **Não** copiar para a VM.

## Abrir no Cursor (workspace)

O código canônico está em `/srv/pet-saude/portal/…`. No home há atalhos:

- `~/portal-pet-saude` → `/srv/pet-saude/portal/portal-pet-saude`
- `~/pet-saude-portal` → `/srv/pet-saude/portal`

No Explorer: abra `portal-pet-saude` ou use **File → Open Folder** nesse caminho.

## Grupos Gitness (adapters futuros)

| Grupo | Repos |
|---|---|
| G1 | `api-chat-bot` (+ Dashboard Nest local) |
| G2 | `api-painel`, `web-painel` |
| G3 | `totem-api`, `totem-web` |
| G4 | `api-gestao-antirrabica`, `sgar-web` |
| G5 | *(ainda sem repo listado)* |
