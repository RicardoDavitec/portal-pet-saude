---
id: SES-2026-11-17-PEND
tipo: sessao
titulo: Pendências Bot_Pan G1 Nest GLPI C/R
status: encerrado
versao: 1.0.0
data: 2026-11-17
autor: Agente Cursor
classificacao: interno
---

# Sessão — Pendências + GLPI (tarde)

## Sumário

Fechamento de pendências atemporais e alinhamento GLPI/G1 após F2.S1–S5.

| ID | Resultado |
|----|-----------|
| PEND-002 | Tokens canônicos Bot_Pan (GitHub → `tokens.css` / shell dark) |
| PEND-003 | Nest Dashboard real `:3813` (`COMPOSE_PROFILES=g1-real`), JWT serviço, BFF FAQs 200 |
| PEND-005 | C#**17423** · R#**96** (GEP - Portal PET Saúde - 0. [PAI]); Itil_Project ok |
| PEND-004 | **Aberta** — `AUTH_MODE=dev`; LDAP placeholder; falta DTI (OPS-003 pronto) |

## Auth AD

Portal permanece em **dev** (`gestor/gestor`). Credenciais AD municipais **não** autenticam até `AUTH_MODE=ldap` + `LDAP_*` reais.

## Health (encerramento)

- `api` healthy · `authMode=dev`
- `g1-dashboard` healthy · `GET :3813/` ok
- `web` 200 · GLPI `glpi auth` ok com App-Token atualizado (secrets só em `~/.secrets/glpi.env`)

## Próximo

1. DTI → LDAP (fechar PEND-004)  
2. F3.S1 testes internos (papéis, LDAP staging, regressão G1)
