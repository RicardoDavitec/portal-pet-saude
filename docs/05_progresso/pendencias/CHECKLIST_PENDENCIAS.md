# Checklist de pendências atemporais

> **Convenções e instruções:** [`README.md`](README.md)  
> **Padrão de checklist:** skill `documente-o-plano` · **Alimentação:** skill `inserir-pendencia`

## Índice

| ID | Status | Módulo | Inserido em | Corrigido em | Título |
|----|--------|--------|-------------|--------------|--------|
| PEND-20261117-001 | [x] | infra | 2026-11-17 10:50 | 2026-11-17 11:52 | Completar F2.S1 (NPM + compose formal) |
| PEND-20261117-002 | [x] | web | 2026-11-17 10:50 | 2026-11-17 14:10 | Extrair tokens canônicos Bot_Pan via WSL |
| PEND-20261117-003 | [x] | infra | 2026-11-17 10:50 | 2026-11-17 14:25 | Substituir g1-mock pelo Nest Dashboard real :3813 |
| PEND-20261117-004 | [ ] | backend | 2026-11-17 10:50 | — | Parâmetros LDAP reais do DTI |
| PEND-20261117-005 | [x] | docs | 2026-11-17 10:50 | 2026-11-17 14:54 | IDs GLPI C/R no cabeçalho do plano |

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

- [x] **PEND-20261117-003** Substituir g1-mock pelo Nest Dashboard real :3813
  Módulo: `infra`
  Inserido em: `2026-11-17 10:50`
  Corrigido em: `2026-11-17 14:25`
  Nota: Profile `g1-real` + `tools/g1-nest`; Nest healthy :3813; JWT serviço → `G1_SERVICE_TOKEN`; BFF FAQs 200.
  Critério: Nest G1 healthy em `127.0.0.1:3813` e `G1_DASHBOARD_API_URL` sem mock; service token/JWT alinhados.
  Evidência: anexo PEND_003; `curl :3813/` Hello World; BFF `/api/g1/faqs` 200
  Refs: `docs/05_progresso/planos_ativos/anexos/PEND_003_nest_g1-17_11_26.md`, `tools/g1-nest/`
  <!-- glpi: plan_start="2026-11-17 10:50" plan_end="2026-12-12 18:00" real_start="2026-11-17 14:07" real_end="2026-11-17 14:25" -->

- [ ] **PEND-20261117-004** Parâmetros LDAP reais do DTI
  Módulo: `backend`
  Inserido em: `2026-11-17 10:50`
  Corrigido em: `—`
  Contexto: Adapter LDAP pronto; ambiente usa `AUTH_MODE=dev` até DTI fornecer host/Base DN/bind/LDAPS.
  Nota 2026-11-17: procedimento OPS-003 publicado (`docs/10_setup/ops_003_auth_ldap.md`); ainda sem parâmetros reais DTI.
  Critério: Login AD staging com `AUTH_MODE=ldap` e 401 sem vazamento de detalhes.
  Evidência: `adapters/ad-ldap/`
  Refs: REQ-003, ADR-002
  <!-- glpi: plan_start="2026-11-17 10:50" plan_end="2026-11-28 18:00" -->

- [x] **PEND-20261117-005** IDs GLPI C/R no cabeçalho do plano
  Módulo: `docs`
  Inserido em: `2026-11-17 10:50`
  Corrigido em: `2026-11-17 14:54`
  Nota: C#17423 + R#96 (`GEP - Portal PET Saúde - 0. [PAI]`); Itil_Project vínculo id=78; App-Token válido; secrets só em `~/.secrets/glpi.env`.
  Critério: Cabeçalho do plano com C# e R# preenchidos.
  Evidência: plano C:17423 R:96; `Project/96` + link ticket
  Refs: `.glpi/project.yaml`, plano vigente
  <!-- glpi: plan_start="2026-11-17 10:50" plan_end="2026-12-19 18:00" real_start="2026-11-17 14:38" real_end="2026-11-17 14:54" -->

## Histórico (concluídas)

- PEND-20261117-005 — IDs GLPI C#17423 / R#96 (2026-11-17)
- PEND-20261117-003 — Nest G1 real :3813 (2026-11-17)
- PEND-20261117-002 — Tokens canônicos Bot_Pan (2026-11-17)
- PEND-20261117-001 — F2.S1 compose+NPM (2026-11-17)
