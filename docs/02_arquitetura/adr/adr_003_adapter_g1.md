---
id: ADR-003
tipo: adr
titulo: Integração G1 por adapter HTTP (opção C)
status: aprovado
versao: 1.0.0
data: 2026-11-17
autor: Coordenacao PET
classificacao: interno
codigo: F1.S1.P4
---

# ADR-003 — Adapter G1

## Contexto

O Dashboard-PetSaude (Nest + FAQ Mongo) já existe; o portal precisa do workspace G1 sem reescrever tudo na F2 inicial. Espelho Vercel permanece (D7).

## Decisão

Port `FaqCatalog` / `ChatbotAnalytics` implementados por `adapters/g1-dashboard-http` contra Nest em `127.0.0.1:3813`. Papéis PET são traduzidos no application layer.

## Alternativas consideradas

| Alternativa | Vantagens | Desvantagens |
|---|---|---|
| Embed iframe Vercel | Rápido | Auth/UX dupla |
| Reescrita hexagonal total | Puro | Prazo alto |
| **Adapter C** | Meio-termo | Dívida até unificar usuários |

## Consequências

Nest legado continua; portal é fonte de verdade de identidade. Migração B pode ser ADR futuro.
