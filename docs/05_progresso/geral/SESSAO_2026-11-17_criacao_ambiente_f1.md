---
id: SES-2026-11-17
tipo: sessao
titulo: Criação do ambiente portal + documentação F1
status: encerrado
versao: 1.0.0
data: 2026-11-17
autor: Agente Cursor / Coordenacao PET
classificacao: interno
---

# Sessão 2026-11-17 — Ambiente e F1

## Feito

- Bootstrap `toolkit-agentes-skills` (`full-skeleton`) em `/srv/pet-saude/portal/portal-pet-saude`
- Emenda `REGRA_MULTIGRUPOS_VM082.md`: portas portal `5500`, `3861`, `3862`, pasta `portal/`
- Documentos: VIS, REQ, RN, GLO, ARQ, ADR×5, DIC×5, LGP-001
- Plano F/S/P vigente + anexos F1/F2
- Esqueleto hexagonal (`packages/`, `adapters/`, `prisma/schema.prisma`, `docker-compose` postgres)
- C2 FAQ: escrita gestor/coord/tutor; leitura preceptor/orientador/monitor/**participante**

## Pendências

- IDs GLPI (C/R) no cabeçalho do plano
- Parâmetros LDAP do DTI
- Shell Bot_Pan via WSL local (sem cópia na VM) — F2.S3
- Certificados/APIs G2–G5 por grupo
- Repo G5 ainda inexistente no inventário Gitness
- Implementação F2.S1 (compose api/web + NPM)
- Atalhos no home para o Cursor: `~/portal-pet-saude` e `~/pet-saude-portal` (criados 09:32)

## Próximo

Começar **F2.S1** conforme anexo `F2_S1_ambiente-17_11_26.md`.

## Repositório

- Público: https://github.com/RicardoDavitec/portal-pet-saude
- Commit inicial F1.S1 (bootstrap + docs + esqueleto) com push para `main`.
