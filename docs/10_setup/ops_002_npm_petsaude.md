---
id: OPS-002
tipo: operacao
titulo: NPM — petsaude.franca → portal web :3862
status: aprovado
versao: 1.0.0
data: 2026-11-17
autor: DTI
classificacao: interno
codigo: F2.S1.P3
---

# OPS-002 — Proxy NPM do portal

## Objetivo (REQ-001)

`https://petsaude.franca.sp.gov.br` serve o **portal** (web em `portal-pet-web:8080` / host `127.0.0.1:3862`), sem redirecionar para `chatbots.franca.sp.gov.br`.

## Pré-requisitos

- `docker compose up -d` do portal com serviço `web` na rede externa `infra-ia`
- Admin NPM em `http://127.0.0.1:81` (credenciais só no `.env` de `infra-ia`, nunca no Git)

## Configuração do Proxy Host

| Campo | Valor |
|---|---|
| Domain | `petsaude.franca.sp.gov.br` |
| Scheme | `http` |
| Forward Hostname / IP | `portal-pet-web` |
| Forward Port | `8080` |
| Websockets | on |
| Block common exploits | on |
| Custom Nginx Config / Advanced | **vazio** (remover `return 301 … chatbots`) |
| SSL | certificado existente do domínio (manter) |

`chatbots.franca.sp.gov.br` permanece apontando ao PWA do chat — **não** alterar neste passo.

## API NPM (opcional)

1. `POST /api/tokens` com identity/secret do admin
2. `GET /api/nginx/proxy-hosts` — localizar id do host `petsaude…`
3. `PUT /api/nginx/proxy-hosts/{id}` com forward para `portal-pet-web:8080` e `advanced_config: ""`

## Verificação

```bash
curl -sSI https://petsaude.franca.sp.gov.br/ | head -20
# Não deve haver Location: https://chatbots...
curl -sS -o /dev/null -w '%{http_code}\n' https://petsaude.franca.sp.gov.br/
```

## Relação com compose

O serviço `web` declara `networks: [portal, infra-ia]` para o NPM resolver `portal-pet-web` sem expor a porta em `0.0.0.0`.
