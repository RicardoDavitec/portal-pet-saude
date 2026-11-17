---
id: DIC-005
tipo: dicionario_dados
titulo: Dicionário de dados – documentos
status: aprovado
versao: 1.0.0
data: 2026-11-17
autor: Coordenacao PET
classificacao: interno
codigo: F1.S1.P5
---

# documentos

## Finalidade

Documentos públicos do portal (LGPD, normativas, políticas) e conteúdo da área Documentos.

## Colunas

| Coluna | Tipo | Nulo? | Padrão | Descrição | Dado pessoal? | Fonte |
|---|---|---|---|---|---|---|
| id | uuid | não | uuid | PK | não | sistema |
| titulo | varchar(200) | não | — | Título | não | editor |
| slug | varchar(120) | não | — | URL amigável | não | editor |
| categoria | varchar(64) | não | — | lgpd, normativa… | não | editor |
| corpo_md | text | não | — | Markdown | não | editor |
| publicado | boolean | não | false | Visível | não | editor |
| versao | varchar(32) | não | — | Versão editorial | não | editor |
| atualizado_em | timestamptz | não | now | | não | sistema |

## Relacionamentos

| Relação | Cardinalidade | Regra de exclusão |
|---|---|---|
| — | — | Tabela autônoma no MVP |

## Índices e restrições

`slug` único.

## Regras de negócio relacionadas

REQ-007; RN-001 (acesso sem vínculo).
