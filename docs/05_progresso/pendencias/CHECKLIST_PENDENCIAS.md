# Checklist de pendências atemporais

> **Convenções e instruções:** [`README.md`](README.md)  
> **Padrão de checklist:** skill `documente-o-plano` · **Alimentação:** skill `inserir-pendencia`

## Índice

| ID | Status | Módulo | Inserido em | Corrigido em | Título |
|----|--------|--------|-------------|--------------|--------|
| PEND-20261117-001 | [x] | infra | 2026-11-17 10:50 | 2026-11-17 11:52 | Completar F2.S1 (NPM + compose formal) |
| PEND-20261117-002 | [x] | web | 2026-11-17 10:50 | 2026-11-17 14:10 | Extrair tokens canônicos Bot_Pan via WSL |
| PEND-20261117-003 | [ ] | infra | 2026-11-17 10:50 | — | Substituir g1-mock pelo Nest Dashboard real :3813 |
| PEND-20261117-004 | [ ] | backend | 2026-11-17 10:50 | — | Parâmetros LDAP reais do DTI |
| PEND-20261117-005 | [ ] | docs | 2026-11-17 10:50 | — | IDs GLPI C/R no cabeçalho do plano |

## Pendências

- [x] **PEND-20261117-001** Completar F2.S1 (NPM + compose formal)
  Módulo: `infra`
  Inserido em: `2026-11-17 10:50`
  Corrigido em: `2026-11-17 11:52`
  Nota: F2.S1.P1–P4 fechados; compose full; NPM petsaude→portal-pet-web; OPS-001/002.
  Critério: F2.S1 marcado [x] com NPM apontando e ops_001 validado.
  Evidência: HTTPS petsaude 200; compose ps healthy; anexo F2_S1
  Refs: `docs/05_progresso/planos_ativos/anexos/F2_S1_ambiente-17_11_26.md`
  <!-- glpi: plan_start="2026-11-17 10:50" plan_end="2026-11-21 18:00" real_start="2026-11-17 11:43" real_end="2026-11-17 11:52" -->

- [x] **PEND-20261117-002** Extrair tokens canônicos Bot_Pan via WSL
  Módulo: `web`
  Inserido em: `2026-11-17 10:50`
  Corrigido em: `2026-11-17 14:10`
  Nota: Clone GitHub `RicardoDavitec/Bot_Pan` → `_ref/Bot_Pan`; tokens `:root` aplicados em `tokens.css` + shell dark admin/public-card; diff no anexo.
  Critério: Diff visual documentado contra Bot_Pan WSL e tokens atualizados.
  Evidência: anexo PEND_002; `apps/web/src/styles/tokens.css` = `#07111f` / `#38bdf8` / Inter
  Refs: `docs/05_progresso/planos_ativos/anexos/PEND_002_tokens_bot_pan-17_11_26.md`, ADR-001
  <!-- glpi: plan_start="2026-11-17 10:50" plan_end="2026-12-05 18:00" real_start="2026-11-17 14:00" real_end="2026-11-17 14:10" -->

- [ ] **PEND-20261117-003** Substituir g1-mock pelo Nest Dashboard real :3813
  Módulo: `infra`
  Inserido em: `2026-11-17 10:50`
  Corrigido em: `—`
  Contexto: Compose sobe `tools/g1-mock` em 3813; Nest real (`Dashboard-PetSaude/back`) usa `PORT` default **3333** (sem referência a 3813 no repo), JWT + roles `admin|editor|leitor`, Mongo (FAQs) + Postgres (users/sessions). Rotas alvo do adapter: `/faqs`, `/conversas` (PII admin-only no Nest).
  Critério: Nest G1 healthy em `127.0.0.1:3813` (bind/map `3813→3333` ou `PORT=3813`) e `G1_DASHBOARD_API_URL` sem mock; service token/JWT alinhados.
  Evidência: `tools/g1-mock/`; `/home/petsaude/chatbot/chatbot-docs/Dashboard-PetSaude/back/src/main.ts`
  Refs: ADR-003, F2.S4.P1; faqs.controller / conversas.controller
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

- PEND-20261117-002 — Tokens canônicos Bot_Pan (2026-11-17)
- PEND-20261117-001 — F2.S1 compose+NPM (2026-11-17)
