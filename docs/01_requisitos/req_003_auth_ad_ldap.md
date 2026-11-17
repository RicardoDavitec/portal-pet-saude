---
id: REQ-003
tipo: requisito
titulo: Autenticação AD municipal via LDAP na API
status: aprovado
versao: 1.0.0
data: 2026-11-17
autor: Coordenacao PET
classificacao: interno
codigo: F1.S1.P2
---

# REQ-003 — LDAP direto

## Descrição

A API do portal autentica usuários contra o AD municipal por LDAP/LDAPS, sem intermediário OIDC no MVP.

## Critérios de aceite

- [ ] Login com conta AD válida cria sessão no portal
- [ ] Credencial inválida retorna 401 sem vazar detalhes do diretório
- [ ] Logout revoga a sessão registrada
- [ ] Bind e Base DN configuráveis por ambiente (sem segredo no Git)

## Rastreabilidade

- ADR-002
- RN-001, RN-007 implícita (sem vínculo)
- Tarefas: F2.S2.*
