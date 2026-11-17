---
id: RN-004
tipo: regra_negocio
titulo: Permissões de FAQ no workspace G1
status: aprovado
versao: 1.0.0
data: 2026-11-17
autor: Coordenacao PET
classificacao: interno
codigo: F1.S1.P3
---

# RN-004 — FAQ G1

## Enunciado

No workspace do Grupo 1 (ChatBot):

- **Escrita** (criar/editar/importar FAQ): `gestor_pet`, `coordenador_grupo` (G1), `tutor` (G1)
- **Leitura**: `preceptor`, `orientador_servico`, `monitor`, `participante` (com vínculo G1), além dos que escrevem
- **Conversas / curadoria / PII**: `gestor_pet`, `coordenador_grupo` (G1), `tutor` (G1)

## Fonte

Decisões Q3 e C2 do estudo (2026-11-17).

## Exceções

APIs técnicas do adapter podem usar service account; não concedem UI a papéis não listados.
