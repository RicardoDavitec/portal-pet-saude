# Adapter AD LDAP

Implementa `UserDirectory` (ADR-002 / F2.S2.P1).

## Configuração (`.env`, nunca no Git)

- `AUTH_MODE=dev` — `DevUserDirectory` (usuários locais de desenvolvimento)
- `AUTH_MODE=ldap` — LDAP/LDAPS real:
  - `LDAP_URL` (preferir `ldaps://`)
  - `LDAP_BASE_DN`
  - `LDAP_BIND_DN` / `LDAP_BIND_PASSWORD`
  - `LDAP_USER_FILTER` (ex.: `(sAMAccountName={{username}})`)

Usuários dev: `gestor/gestor`, `coordg1/coord`, `tutor/tutor`, `leitor/leitor`.

Procedimento operacional: `docs/10_setup/ops_003_auth_ldap.md`.
