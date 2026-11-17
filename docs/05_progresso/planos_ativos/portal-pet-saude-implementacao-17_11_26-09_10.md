---
titulo: Portal PET Saúde — plano de implementação
data: 17/11/2026
piloto: portal-pet-saude
status: vigente
---

# Plano de implementação — Portal PET Saúde

> **Piloto:** portal-pet-saude | **Data:** 17/11/2026  
> Chamado ITIL (C) e Projeto (R): a preencher quando houver IDs GLPI.

Documentos âncora: `vis_001`, `req_001`…`req_008`, `rn_001`…`rn_004`, `glo_001`, `arq_001`, `adr_001`…`adr_005`, `dic_*`, `lgp_001`.

## Organograma

```text
F1 Planejamento (estudo + docs) ──► F2 Implementação ──► F3 Testes ──► F4 Homologação ──► F5 Produção
```

---

## F1 — Planejamento

- [x] **F1.S1** Fechar estudo e documentação hexagonal
  - inicio: 2026-11-17 06:30
  - fim: 2026-11-17 12:00
  - inicio_real: 2026-11-17 06:30
  - fim_real: 2026-11-17 09:30

Anexo: [F1_S1_documentacao-17_11_26.md](anexos/F1_S1_documentacao-17_11_26.md)

---

## F2 — Implementação

- [x] **F2.S1** Ambiente, compose e proxy
  - inicio: 2026-11-17 14:00
  - fim: 2026-11-21 18:00
  - inicio_real: 2026-11-17 11:43
  - fim_real: 2026-11-17 11:53
  - Anexo: [F2_S1_ambiente-17_11_26.md](anexos/F2_S1_ambiente-17_11_26.md)

- [x] **F2.S2** Identidade LDAP e cadastros
  - inicio: 2026-11-24 09:00
  - fim: 2026-11-28 18:00
  - inicio_real: 2026-11-17 10:46
  - fim_real: 2026-11-17 11:08
  - Anexo: [F2_S2_identidade-17_11_26.md](anexos/F2_S2_identidade-17_11_26.md)

- [x] **F2.S3** Shell Bot_Pan
  - inicio: 2026-12-01 09:00
  - fim: 2026-12-05 18:00
  - inicio_real: 2026-11-17 11:15
  - fim_real: 2026-11-17 11:18
  - Anexo: [F2_S3_shell-17_11_26.md](anexos/F2_S3_shell-17_11_26.md)

- [x] **F2.S4** Adapter G1 (FAQ/Dashboard)
  - inicio: 2026-12-08 09:00
  - fim: 2026-12-12 18:00
  - inicio_real: 2026-11-17 11:20
  - fim_real: 2026-11-17 11:24
  - Anexo: [F2_S4_adapter_g1-17_11_26.md](anexos/F2_S4_adapter_g1-17_11_26.md)

- [ ] **F2.S5** Documentos, Sobre, placeholders G2–G5, relatórios MVP
  - inicio: 2026-12-15 09:00
  - fim: 2026-12-19 18:00
  - inicio_real:
  - fim_real:
  - Anexo: [F2_S5_conteudo-17_11_26.md](anexos/F2_S5_conteudo-17_11_26.md)

---

## F3 — Testes internos

- [ ] **F3.S1** Matriz de papéis, LDAP staging, regressão adapter G1
  - inicio: 2026-01-05 09:00
  - fim: 2026-01-09 18:00
  - inicio_real:
  - fim_real:

## F4 — Homologação

- [ ] **F4.S1** Homologação com Gestor PET e coordenadores
  - inicio: 2026-01-12 09:00
  - fim: 2026-01-16 18:00
  - inicio_real:
  - fim_real:

## F5 — Aprovação / produção

- [ ] **F5.S1** Cutover NPM petsaude → portal; checklist DTI
  - inicio: 2026-01-19 09:00
  - fim: 2026-01-23 18:00
  - inicio_real:
  - fim_real:

---

## Critérios de aceite do plano (MVP)

1. Login AD + vínculos funcionando (RN-001…003)
2. Shell Bot_Pan com menu completo
3. G1 FAQ R/W e PII conforme RN-004
4. Documentos/Sobre para autenticados sem vínculo
5. Portas `3861`/`3862`/`5500` na regra e no compose
6. Espelho Vercel do Dashboard mantido
