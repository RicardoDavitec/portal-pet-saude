# OPS-003 — Sair de AUTH_MODE=dev e usar AD/LDAP

## Por que o AD “não funciona” agora

O compose sobe a API com **`AUTH_MODE=dev`** (padrão em `.env` / `.env.example`).
Nesse modo o adapter **não consulta o Active Directory**: usa `DevUserDirectory`
(`gestor/gestor`, `coordg1/coord`, `tutor/tutor`, `leitor/leitor`).

Credenciais AD reais **nunca** autenticam enquanto `AUTH_MODE=dev`.

## Como ativar LDAP (staging)

1. Obter com o DTI (e guardar só em `.env`, nunca no Git):
   - `LDAP_URL` — preferir `ldaps://…:636`
   - `LDAP_BASE_DN`
   - `LDAP_BIND_DN` / `LDAP_BIND_PASSWORD` (conta de serviço)
   - `LDAP_USER_FILTER` — típico `(sAMAccountName={{username}})`
2. No `.env` da raiz do portal:
   ```bash
   AUTH_MODE=ldap
   LDAP_URL=ldaps://ad.exemplo.prefeitura:636
   LDAP_BASE_DN=DC=exemplo,DC=local
   LDAP_BIND_DN=CN=portal-svc,OU=Servicos,DC=exemplo,DC=local
   LDAP_BIND_PASSWORD=***
   LDAP_USER_FILTER=(sAMAccountName={{username}})
   ```
3. Recriar a API:
   ```bash
   docker compose up -d --force-recreate api
   curl -sS http://127.0.0.1:3861/api/health | jq .authMode   # deve ser "ldap"
   ```
4. Testar login na UI com usuário AD municipal. Falha → **401 genérico** (sem vazamento de detalhe LDAP).

## Voltar ao modo dev

```bash
# .env
AUTH_MODE=dev
docker compose up -d --force-recreate api
```

## Critério PEND-004

Fechado só após login AD staging OK com `AUTH_MODE=ldap` e parâmetros reais do DTI.
Sem host/Base DN/bind, o procedimento acima fica pronto, mas a pendência permanece aberta.
