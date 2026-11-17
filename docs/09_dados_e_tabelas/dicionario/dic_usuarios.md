---
id: DIC-001
tipo: dicionario_dados
titulo: Dicionário de dados – usuarios
status: aprovado
versao: 1.0.0
data: 2026-11-17
autor: Coordenacao PET
classificacao: interno
codigo: F1.S1.P5
---

# usuarios

## Finalidade

Identidade local espelhada do AD municipal (sem armazenar senha).

## Colunas

| Coluna | Tipo | Nulo? | Padrão | Descrição | Dado pessoal? | Fonte |
|---|---|---|---|---|---|---|
| id | uuid | não | uuid | PK | não | sistema |
| ad_sam | varchar(64) | não | — | sAMAccountName | sim | AD |
| email | varchar(255) | sim | — | mail | sim | AD |
| nome | varchar(255) | não | — | displayName | sim | AD |
| gestor_pet | boolean | não | false | Papel global exclusivo | não | portal |
| ativo | boolean | não | true | Soft-disable | não | portal |
| criado_em | timestamptz | não | now | | não | sistema |
| atualizado_em | timestamptz | não | now | | não | sistema |

## Relacionamentos

| Relação | Cardinalidade | Regra de exclusão |
|---|---|---|
| usuarios → vinculos_grupo | 1:N | soft (ativo=false) ou restringir |
| usuarios → sessoes | 1:N | cascata ao excluir usuário |
| usuarios → auditoria_vinculos (ator) | 1:N | restringir |

## Índices e restrições

`ad_sam` único.

## Regras de negócio relacionadas

RN-001, RN-002.
