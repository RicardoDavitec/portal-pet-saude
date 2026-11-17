---
id: ADR-002
tipo: adr
titulo: Autenticação LDAP/LDAPS direta na API
status: aprovado
versao: 1.0.0
data: 2026-11-17
autor: Coordenacao PET
classificacao: interno
codigo: F1.S1.P4
---

# ADR-002 — LDAP na API

## Contexto

Contas municipais estão no AD. Decisão Q1: autenticação direta na API do portal.

## Decisão

Implementar port `UserDirectory` com adapter LDAP/LDAPS. Sessões e vínculos ficam no Postgres do portal.

## Alternativas consideradas

| Alternativa | Vantagens | Desvantagens |
|---|---|---|
| OIDC/SAML | Padrão moderno | Infra extra no MVP |
| Google OAuth | Já no chat | Não é conta municipal |
| **LDAP direto** | Simples, alinhado ao AD | Precisa LDAPS e credenciais de bind |

## Consequências

DTI deve fornecer host, Base DN, bind user e política LDAPS. Segredos só em `.env` / secret store.
