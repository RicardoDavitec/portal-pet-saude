---
id: ADR-001
tipo: adr
titulo: Shell UI baseado no Bot_Pan
status: aprovado
versao: 1.0.0
data: 2026-11-17
autor: Coordenacao PET
classificacao: interno
codigo: F1.S1.P4
---

# ADR-001 — Shell Bot_Pan

## Contexto

O portal precisa de identidade visual municipal já usada em Panico/VitaGuard, com menu esquerdo e painéis colapsáveis.

## Decisão

Reutilizar o **design system / layout** do Bot_Pan como shell do portal, sem incorporar o domínio do Botão de Pânico.

## Alternativas consideradas

| Alternativa | Vantagens | Desvantagens |
|---|---|---|
| Manter UI do Dashboard-PetSaude | Já existe | Não atende requisito visual Pan |
| Design system novo | Liberdade | Custo e inconsistência municipal |
| **Shell Bot_Pan** | Padrão conhecido | Dependência de cópia/ref da WSL |

## Consequências

Referência em WSL local nesta máquina (`…/projetos/Bot_Pan`), aberta em outra janela do Cursor. **Não** há cópia na VM — o shell (F2.S3) consome essa pasta via acesso local/WSL.
