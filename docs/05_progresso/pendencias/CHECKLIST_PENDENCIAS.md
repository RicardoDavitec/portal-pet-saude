# Checklist de pendências atemporais

> **Convenções e instruções:** [`README.md`](README.md)  
> **Padrão de checklist:** skill `documente-o-plano` · **Alimentação:** skill `inserir-pendencia`

## Índice

| ID | Status | Módulo | Inserido em | Corrigido em | Título |
|----|--------|--------|-------------|--------------|--------|
| PEND-20261117-001 | [ ] | infra | 2026-11-17 10:50 | — | Completar F2.S1 (NPM + compose formal) |
| PEND-20261117-002 | [ ] | web | 2026-11-17 10:50 | — | Extrair tokens canônicos Bot_Pan via WSL |
| PEND-20261117-003 | [ ] | infra | 2026-11-17 10:50 | — | Substituir g1-mock pelo Nest Dashboard real :3813 |
| PEND-20261117-004 | [ ] | backend | 2026-11-17 10:50 | — | Parâmetros LDAP reais do DTI |
| PEND-20261117-005 | [ ] | docs | 2026-11-17 10:50 | — | IDs GLPI C/R no cabeçalho do plano |

## Pendências

- [ ] **PEND-20261117-001** Completar F2.S1 (NPM + compose formal)
  Módulo: `infra`
  Inserido em: `2026-11-17 10:50`
  Corrigido em: `—`
  Contexto: S2–S4 puxaram bootstrap mínimo de api/web/postgres; F2.S1.P3 (NPM petsaude→3862) e fechamento formal das P de S1 ficaram fora do escopo pedido.
  Critério: F2.S1 marcado [x] com NPM apontando e ops_001 validado.
  Evidência: `docker-compose.yml`; anexo `F2_S1_ambiente-17_11_26.md`
  Refs: `docs/05_progresso/planos_ativos/anexos/F2_S1_ambiente-17_11_26.md`
  <!-- glpi: plan_start="2026-11-17 10:50" plan_end="2026-11-21 18:00" -->

- [ ] **PEND-20261117-002** Extrair tokens canônicos Bot_Pan via WSL
  Módulo: `web`
  Inserido em: `2026-11-17 10:50`
  Corrigido em: `—`
  Contexto: Pasta `…/projetos/Bot_Pan` não encontrada nesta VM; shell usa tokens adaptados em `apps/web/src/styles/tokens.css` (ADR-001).
  Critério: Diff visual documentado contra Bot_Pan WSL e tokens atualizados.
  Evidência: N/A (path WSL ausente)
  Refs: `apps/web/src/styles/tokens.css`, ADR-001
  <!-- glpi: plan_start="2026-11-17 10:50" plan_end="2026-12-05 18:00" -->

- [ ] **PEND-20261117-003** Substituir g1-mock pelo Nest Dashboard real :3813
  Módulo: `infra`
  Inserido em: `2026-11-17 10:50`
  Corrigido em: `—`
  Contexto: Compose sobe `tools/g1-mock` em 3813 para health/adapter; Nest real (`Dashboard-PetSaude/back`) exige Mongo/Postgres próprios e não estava em execução.
  Critério: Serviço Nest G1 healthy em `127.0.0.1:3813` e `G1_DASHBOARD_API_URL` apontando para ele sem mock.
  Evidência: `tools/g1-mock/`; `/home/petsaude/chatbot/chatbot-docs/Dashboard-PetSaude/back`
  Refs: ADR-003, F2.S4.P1
  <!-- glpi: plan_start="2026-11-17 10:50" plan_end="2026-12-12 18:00" -->

- [ ] **PEND-20261117-004** Parâmetros LDAP reais do DTI
  Módulo: `backend`
  Inserido em: `2026-11-17 10:50`
  Corrigido em: `—`
  Contexto: Adapter LDAP pronto; ambiente usa `AUTH_MODE=dev` até DTI fornecer host/Base DN/bind/LDAPS.
  Critério: Login AD staging com `AUTH_MODE=ldap` e 401 sem vazamento de detalhes.
  Evidência: `adapters/ad-ldap/`
  Refs: REQ-003, ADR-002
  <!-- glpi: plan_start="2026-11-17 10:50" plan_end="2026-11-28 18:00" -->

- [ ] **PEND-20261117-005** IDs GLPI C/R no cabeçalho do plano
  Módulo: `docs`
  Inserido em: `2026-11-17 10:50`
  Corrigido em: `—`
  Contexto: Plano vigente ainda sem IDs de Chamado/Projeto GLPI.
  Critério: Cabeçalho do plano com C# e R# preenchidos.
  Evidência: N/A
  Refs: `docs/05_progresso/planos_ativos/portal-pet-saude-implementacao-17_11_26-09_10.md`
  <!-- glpi: plan_start="2026-11-17 10:50" plan_end="2026-12-19 18:00" -->

## Histórico (concluídas)

_Nenhuma ainda._
