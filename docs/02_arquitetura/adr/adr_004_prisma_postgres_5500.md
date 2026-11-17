---
id: ADR-004
tipo: adr
titulo: Postgres próprio do portal com Prisma na porta 5500
status: aprovado
versao: 1.0.0
data: 2026-11-17
autor: Coordenacao PET
classificacao: interno
codigo: F1.S1.P4
---

# ADR-004 — Prisma / Postgres 5500

## Contexto

O portal precisa de usuários, vínculos, sessões, auditoria e documentos sem colidir com `infra-postgres` (`5432`) nem com G1–G5 (`5510`…`5550`).

## Decisão

Postgres dedicado bind `127.0.0.1:5500`, ORM Prisma, migrations versionadas em `prisma/`.

## Alternativas consideradas

| Alternativa | Vantagens | Desvantagens |
|---|---|---|
| Reusar `5432` | Menos containers | Acoplamento e risco multi-tenant |
| Porta `5560` | Livre de G1–G5 | Parece “G6”; rejeitada (C1 → 5500) |
| **`5500` + Prisma** | Claro como COMUM/portal | Emendar regra de portas |

## Consequências

REGRA_MULTIGRUPOS atualizada (§2.1, §2.4, §2.5).
