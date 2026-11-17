---
id: REQ-004
tipo: requisito
titulo: CRUD de cadastros e vínculos
status: aprovado
versao: 1.0.0
data: 2026-11-17
autor: Coordenacao PET
classificacao: interno
codigo: F1.S1.P2
---

# REQ-004 — Cadastros

## Descrição

Gestor PET e Coordenador de grupo gerenciam vínculos usuário–grupo–papel, com auditoria e revogação de sessão ao desativar.

## Critérios de aceite

- [ ] Gestor cria/edita/desativa qualquer vínculo
- [ ] Coordenador só age no próprio grupo
- [ ] Promoção a gestor encerra vínculos (RN-002)
- [ ] Tutor cadastrado implica participante (RN-003)
- [ ] Cada alteração gera registro de auditoria

## Rastreabilidade

- RN-001, RN-002, RN-003, RN-008 (auditoria)
- Tarefas: F2.S2.*
