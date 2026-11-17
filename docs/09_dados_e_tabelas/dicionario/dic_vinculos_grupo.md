---
id: DIC-002
tipo: dicionario_dados
titulo: Dicionário de dados – vinculos_grupo
status: aprovado
versao: 1.0.0
data: 2026-11-17
autor: Coordenacao PET
classificacao: interno
codigo: F1.S1.P5
---

# vinculos_grupo

## Finalidade

Associa usuário AD a um grupo PET com um papel institucional.

## Colunas

| Coluna | Tipo | Nulo? | Padrão | Descrição | Dado pessoal? | Fonte |
|---|---|---|---|---|---|---|
| id | uuid | não | uuid | PK | não | sistema |
| usuario_id | uuid | não | — | FK usuarios | não | portal |
| grupo | enum G1..G5 | não | — | Grupo tutorial | não | portal |
| papel | enum | não | — | Papel no grupo | não | portal |
| ativo | boolean | não | true | | não | portal |
| inicio | date | não | — | Início do vínculo | não | portal |
| fim | date | sim | — | Encerramento | não | portal |
| criado_em | timestamptz | não | now | | não | sistema |

## Relacionamentos

| Relação | Cardinalidade | Regra de exclusão |
|---|---|---|
| vinculos_grupo → usuarios | N:1 | restringir |

## Índices e restrições

Índice `(usuario_id, grupo)`; no máximo um vínculo ativo por par usuário–grupo.

## Regras de negócio relacionadas

RN-001, RN-002, RN-003, RN-004.
