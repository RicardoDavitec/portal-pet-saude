# PEND-20261117-002 — Tokens canônicos Bot_Pan

**Corrigido em:** 2026-11-17  
**Fonte:** https://github.com/RicardoDavitec/Bot_Pan (`apps/web/src/styles.css` `:root` + `apps/mobile/lib/theme.ts`)  
**Espelho local:** `_ref/Bot_Pan` (gitignored; clone via `gh`)

## Diff visual (antes → depois)

| Token | Antes (aproximação) | Bot_Pan canônico |
|-------|---------------------|------------------|
| `--bp-bg` | `#1a2332` | `#07111f` |
| `--bp-bg-elevated` | `#243044` | `#0f172a` |
| `--bp-panel` | `#2a3a52` | `#1e293b` |
| `--bp-accent` | `#3d8bfd` | `#38bdf8` |
| `--bp-accent-strong` | `#2a6fd6` | `#0ea5e9` |
| `--bp-danger` | `#c23b3b` | `#f87171` |
| `--bp-warn` | `#c47a2c` | `#fbbf24` |
| `--bp-ink` / muted | escuro/cinza | `#f1f5f9` / `#94a3b8` (admin dark) |
| `--bp-radius` | `4px` | `10px` (+ `--bp-radius-lg: 16px`) |
| fonte | Segoe/Fraunces | Inter (igual Bot_Pan web) |
| workspace | superfície clara | admin dark (gradiente `#07111f`→`#0f172a`) |
| login | card claro | `public-card` dark (`--panel` + shadow) |

## Arquivos

- `apps/web/src/styles/tokens.css` — mapa canônico
- `apps/web/src/styles/shell.css` — consumo alinhado ao admin/public Bot_Pan
- ADR-001 — referência atualizada (GitHub + `_ref`)
