---
id: REQ-008
tipo: requisito
titulo: Relatórios PET, Postgres Prisma e estrutura toolkit
status: aprovado
versao: 1.0.0
data: 2026-11-17
autor: Coordenacao PET
classificacao: interno
codigo: F1.S1.P2
---

# REQ-008 — Relatórios e infraestrutura documental

## Descrição

Relatórios concernentes ao PET (MVP: indicadores G1); banco Postgres próprio com Prisma na porta host `5500`; repositório com toolkit-agentes-skills e documentação hexagonal conforme `docs/12_padrao_documentacao`.

## Critérios de aceite

- [x] Tela Relatórios com ao menos um indicador G1 ou placeholder explícito
- [x] Compose sobe Postgres em `127.0.0.1:5500`
- [x] Árvore `docs/00`…`12` presente e plano F/S/P em `planos_ativos`

## Rastreabilidade

- ADR-004, ADR-005
- VIS-001
