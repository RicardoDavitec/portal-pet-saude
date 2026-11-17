---
id: ADR-005
tipo: adr
titulo: Portas host do portal COMUM
status: aprovado
versao: 1.0.0
data: 2026-11-17
autor: DTI / Coordenacao PET
classificacao: interno
codigo: F1.S1.P4
---

# ADR-005 — Portas portal

## Contexto

Não havia bloco COMUM para o painel além de `5432`. Overflow `3860–3899` exige documentação.

## Decisão

| Serviço | Porta host |
|---|---|
| API | `3861` |
| Web | `3862` |
| Postgres | `5500` |
| Nest G1 adapter | `3813` |

## Alternativas consideradas

Usar faixas G1 (`381x`) para o portal — rejeitado (mistura COMUM com ChatBot).

## Consequências

Atualização canônica em `/srv/pet-saude/COMUM/Host-do-servidor/REGRA_MULTIGRUPOS_VM082.md`.
