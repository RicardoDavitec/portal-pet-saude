---
id: DIC-004
tipo: dicionario_dados
titulo: Dicionário de dados – auditoria_vinculos
status: aprovado
versao: 1.0.0
data: 2026-11-17
autor: Coordenacao PET
classificacao: interno
codigo: F1.S1.P5
---

# auditoria_vinculos

## Finalidade

Trilha de auditoria de criações, alterações, desativações e promoções a gestor.

## Colunas

| Coluna | Tipo | Nulo? | Padrão | Descrição | Dado pessoal? | Fonte |
|---|---|---|---|---|---|---|
| id | uuid | não | uuid | PK | não | sistema |
| ator_id | uuid | não | — | Quem alterou | não | portal |
| vinculo_id | uuid | sim | — | Alvo | não | portal |
| acao | varchar(32) | não | — | criar/atualizar/desativar/promover_gestor | não | portal |
| antes | jsonb | sim | — | Snapshot | pode conter pessoal | portal |
| depois | jsonb | sim | — | Snapshot | pode conter pessoal | portal |
| em | timestamptz | não | now | | não | sistema |

## Relacionamentos

| Relação | Cardinalidade | Regra de exclusão |
|---|---|---|
| auditoria → usuarios (ator) | N:1 | restringir |

## Índices e restrições

Índice por `em` e `ator_id` para consultas de auditoria.

## Regras de negócio relacionadas

REQ-004.
