---
id: REQ-006
tipo: requisito
titulo: Workspace G1 via adapter ao Dashboard Nest
status: aprovado
versao: 1.0.0
data: 2026-11-17
autor: Coordenacao PET
classificacao: interno
codigo: F1.S1.P2
---

# REQ-006 — Adapter G1

## Descrição

O portal integra o Dashboard/FAQ do ChatBot (Grupo 1) por adapter HTTP à API Nest hospedada na VM (`3813`), traduzindo papéis PET para o escopo da API. O deploy Vercel permanece como espelho.

## Critérios de aceite

- [ ] Listagem e escrita de FAQ conforme RN-004
- [ ] Conversas/PII só para gestor, coord. G1 e tutor G1
- [ ] Falha do Nest não derruba o restante do portal (erro isolado no workspace G1)
- [ ] Espelho Vercel continua publicável

## Rastreabilidade

- ADR-003, RN-004
- Tarefas: F2.S4.*
