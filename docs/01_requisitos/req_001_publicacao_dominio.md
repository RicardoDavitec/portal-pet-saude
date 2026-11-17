---
id: REQ-001
tipo: requisito
titulo: Publicar portal em petsaude.franca.sp.gov.br
status: aprovado
versao: 1.0.0
data: 2026-11-17
autor: Coordenacao PET
classificacao: interno
codigo: F1.S1.P2
---

# REQ-001 — Domínio do portal

## Descrição

O painel municipal deve responder em `https://petsaude.franca.sp.gov.br`, sem redirecionar para o chat.

## Critérios de aceite

- [x] HTTPS 200 na raiz após autenticação (ou tela de login)
- [x] Chat permanece em `https://chatbots.franca.sp.gov.br`
- [x] Proxy NPM aponta para o web do portal (`3862` / `portal-pet-web:8080`)

## Rastreabilidade

- Regras de negócio: RN-001
- Tarefas do plano: F2.S1.P3
- Testes: TST-001 (a criar na F3)
