---
id: SES-2026-11-17-S1
tipo: sessao
titulo: F2.S1 Ambiente compose e proxy
status: encerrado
versao: 1.0.0
data: 2026-11-17
autor: Agente Cursor
classificacao: interno
---

# Sessão — F2.S1

## Sumário

Fechou o buraco deixado por S2–S4: compose formal (api/web/postgres/g1-mock), Prisma init documentado, NPM `petsaude` → `portal-pet-web:8080` sem redirect para chatbots, OPS-001/002 e healthchecks. PEND-001 concluída.

## Health

- compose: postgres/api/web/g1-mock up
- `http://127.0.0.1:3861/api/health` ok
- `http://127.0.0.1:3862/` 200
- `https://petsaude.franca.sp.gov.br/` 200 (sem Location chatbots)
- chatbots inalterado

## Próximo

F2.S5 (conteúdo) ou F3 conforme prioridade.
