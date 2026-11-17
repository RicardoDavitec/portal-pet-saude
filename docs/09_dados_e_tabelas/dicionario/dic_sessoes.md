---
id: DIC-003
tipo: dicionario_dados
titulo: Dicionário de dados – sessoes
status: aprovado
versao: 1.0.0
data: 2026-11-17
autor: Coordenacao PET
classificacao: interno
codigo: F1.S1.P5
---

# sessoes

## Finalidade

Sessões autenticadas revogáveis após login LDAP.

## Colunas

| Coluna | Tipo | Nulo? | Padrão | Descrição | Dado pessoal? | Fonte |
|---|---|---|---|---|---|---|
| id | uuid | não | uuid | PK | não | sistema |
| usuario_id | uuid | não | — | FK | não | portal |
| token_hash | char(64) | não | — | Hash do token | sensível | portal |
| criada_em | timestamptz | não | now | | não | sistema |
| expira_em | timestamptz | não | — | | não | portal |
| revogada_em | timestamptz | sim | — | Logout/disable | não | portal |
| user_agent | varchar(300) | sim | — | | sim | cliente |

## Relacionamentos

| Relação | Cardinalidade | Regra de exclusão |
|---|---|---|
| sessoes → usuarios | N:1 | cascata |

## Índices e restrições

Índice em `token_hash`; não armazenar token em claro.

## Regras de negócio relacionadas

RN-001; REQ-003.
