---
id: LGP-001
tipo: inventario_lgpd
titulo: Inventário LGPD — portal e dados G1 via adapter
status: aprovado
versao: 1.0.0
data: 2026-11-17
autor: Coordenacao PET
classificacao: interno
codigo: F1.S1.P6
---

# LGP-001 — Inventário LGPD

## Inventário

| Tabela | Campo | Dado | Sensível? | Finalidade | Base legal | Retenção | Acesso |
|---|---|---|---|---|---|---|---|
| usuarios | ad_sam, nome, email | Identidade AD | não (pessoal) | Autenticação e cadastro | Políticas públicas / vínculo PET (validar DPO) | Vínculo + prazo admin. | Autenticados conforme papel |
| vinculos_grupo | grupo, papel | Participação PET | não | Autorização | Idem | Idem | Gestor; coord. do grupo |
| sessoes | token_hash, user_agent | Sessão | token: sim | Segurança | Legítimo interesse / segurança | Expiração + log curto | Admin técnico |
| auditoria_vinculos | antes/depois | Histórico | pode | Accountability | Obrigação legal / governança | ≥ 24 meses projeto | Gestor PET |
| (G1 externo) | textos de conversa | Relato saúde | **sim** | Curadoria chatbot | Consentimento PWA + limites | Política ChatBot | gestor, coord. G1, tutor G1 |
| (G1 externo) | FAQ | Conteúdo institucional | não | Respostas chat | — | Enquanto vigente | Leitura G1 ampla; escrita restrita |

## Pendências de decisão

| Item | Pergunta | Responsável (DPO ou gestor) |
|---|---|---|
| Base legal formal | Confirmar enquadramento LGPD do portal vs SIG-PET | DPO / Gestor PET |
| Retenção conversas | Alinhar prazo com política do Dashboard G1 | Coord. G1 + DPO |
| Exportação/anonimização | Precisa de fluxo de titular no portal? | DPO |
