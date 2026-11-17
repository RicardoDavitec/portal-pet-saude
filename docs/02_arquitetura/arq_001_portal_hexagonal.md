---
id: ARQ-001
tipo: arquitetura
titulo: Arquitetura hexagonal do Portal PET Saúde
status: aprovado
versao: 1.0.0
data: 2026-11-17
autor: Coordenacao PET / DTI
classificacao: interno
codigo: F1.S1.P4
---

# ARQ-001 — Portal hexagonal

## 1. Introdução e metas

Painel municipal multi-grupo com domínio próprio (usuários, vínculos, documentos, relatórios) e integrações por ports/adapters (AD, Prisma, Dashboard G1, APIs Gitness futuras).

## 2. Restrições

- VM082; publicação só via NPM (`80`/`443`)
- Portas: API `3861`, Web `3862`, Postgres `5500`, Nest G1 `3813`
- Auth LDAP direto (sem OIDC no MVP)
- Não misturar segredos no Git
- Padrão documental `docs/12_padrao_documentacao`

## 3. Contexto e escopo

Ver VIS-001. Atores: usuários AD; sistemas: AD, Nest G1, Mongo FAQs, Gitness (futuro), NPM.

## 4. Estratégia da solução

Arquitetura hexagonal no monorepo do portal. UI = shell Bot_Pan. G1 = adapter HTTP (opção C). G2–G5 = placeholders até certificados.

## 5. Visão de blocos

```text
apps/web          → adaptador de entrada HTTP (UI)
apps/api          → adaptador de entrada HTTP (BFF/API)
packages/domain   → entidades e regras (Usuario, Vinculo, Grupo, Documento)
packages/application → casos de uso
packages/ports    → interfaces in/out
adapters/ad-ldap
adapters/prisma-postgres
adapters/g1-dashboard-http
adapters/gitness-http   (stub)
prisma/           → schema e migrations
```

## 6. Visão de execução

Login → LDAP → sessão Prisma → autorização por vínculo → UI carrega workspace → use cases chamam ports → adapters externos.

## 7. Visão de implantação

| Componente | Host bind |
|---|---|
| portal-api | `127.0.0.1:3861` |
| portal-web | `127.0.0.1:3862` |
| portal-postgres | `127.0.0.1:5500` |
| dashboard-g1-nest | `127.0.0.1:3813` |
| NPM | `petsaude.franca.sp.gov.br` → web/API |

Pasta: `/srv/pet-saude/portal/portal-pet-saude`.

## 8. Conceitos transversais

RBAC papel×grupo; auditoria de vínculos; LGPD em conversas G1; feature flags para workspaces G2–G5.

## 9. Decisões

- ADR-001 Shell Bot_Pan
- ADR-002 LDAP na API
- ADR-003 Adapter G1
- ADR-004 Prisma Postgres `5500`
- ADR-005 Portas COMUM/portal

## 10. Requisitos de qualidade

Disponibilidade do shell mesmo se G1 cair; sessão revogável; logs sem senha AD; tempo de login < 3s em rede interna.

## 11. Riscos e dívida técnica

| Risco | Prob. | Impacto | Mitigação |
|---|---|---|---|
| Parâmetros AD incompletos | M | Alto | Stub de diretório em dev; checklist DTI |
| Bot_Pan só na WSL local | M | Médio | Copiar `_ref/Bot_Pan` ou extrair tokens |
| G5 sem repo Gitness | M | Baixo | Placeholder |
| Dupla fonte usuários Nest×Portal | M | Médio | Portal = verdade; Nest recebe claims |

## 12. Glossário

Ver GLO-001.
