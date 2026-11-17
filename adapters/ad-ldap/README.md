# Adapter AD LDAP

Implementa `UserDirectory` (ADR-002).

Configuração esperada (somente `.env`, nunca no Git):

- `LDAP_URL` (preferir `ldaps://`)
- `LDAP_BASE_DN`
- `LDAP_BIND_DN` / `LDAP_BIND_PASSWORD` (se bind de serviço)
- `LDAP_USER_FILTER` (ex.: `(sAMAccountName={{username}})`)

Status: stub — implementação em F2.S2.
