import { Client } from "ldapts";
import type { IdentidadeAd, UserDirectory } from "@portal/ports";

export type LdapConfig = {
  url: string;
  baseDn: string;
  bindDn?: string;
  bindPassword?: string;
  userFilter: string;
};

/**
 * Adapter LDAP/LDAPS (ADR-002).
 * Em falha de bind/usuário, retorna null sem vazar detalhes do diretório.
 */
export class LdapUserDirectory implements UserDirectory {
  constructor(private readonly cfg: LdapConfig) {}

  async autenticar(usuario: string, senha: string): Promise<IdentidadeAd | null> {
    if (!usuario || !senha) return null;
    const filter = this.cfg.userFilter.replaceAll("{{username}}", escapeLdap(usuario));
    const client = new Client({ url: this.cfg.url });
    try {
      if (this.cfg.bindDn) {
        await client.bind(this.cfg.bindDn, this.cfg.bindPassword ?? "");
      }
      const { searchEntries } = await client.search(this.cfg.baseDn, {
        scope: "sub",
        filter,
        attributes: ["dn", "sAMAccountName", "mail", "displayName", "cn"],
        sizeLimit: 1,
      });
      const entry = searchEntries[0];
      if (!entry?.dn) return null;
      await client.unbind().catch(() => undefined);

      const userClient = new Client({ url: this.cfg.url });
      try {
        await userClient.bind(String(entry.dn), senha);
      } catch {
        return null;
      } finally {
        await userClient.unbind().catch(() => undefined);
      }

      const sam = String(entry.sAMAccountName ?? usuario);
      const displayName = String(entry.displayName ?? entry.cn ?? sam);
      const email = entry.mail ? String(entry.mail) : undefined;
      return { samAccountName: sam, displayName, email };
    } catch {
      return null;
    } finally {
      await client.unbind().catch(() => undefined);
    }
  }
}

/** Diretório de desenvolvimento — AUTH_MODE=dev (nunca em produção municipal). */
export class DevUserDirectory implements UserDirectory {
  constructor(
    private readonly users: Record<string, { senha: string; nome: string; email?: string }> = {
      gestor: { senha: "gestor", nome: "Gestor PET Dev", email: "gestor@local" },
      coordg1: { senha: "coord", nome: "Coord G1 Dev", email: "coord@local" },
      tutor: { senha: "tutor", nome: "Tutor G1 Dev", email: "tutor@local" },
      leitor: { senha: "leitor", nome: "Participante G1 Dev", email: "leitor@local" },
    },
  ) {}

  async autenticar(usuario: string, senha: string): Promise<IdentidadeAd | null> {
    const u = this.users[usuario];
    if (!u || u.senha !== senha) return null;
    return { samAccountName: usuario, displayName: u.nome, email: u.email };
  }
}

export function criarUserDirectoryFromEnv(env: NodeJS.ProcessEnv = process.env): UserDirectory {
  if ((env.AUTH_MODE ?? "dev") === "dev") {
    return new DevUserDirectory();
  }
  const url = env.LDAP_URL;
  const baseDn = env.LDAP_BASE_DN;
  if (!url || !baseDn) {
    throw new Error("LDAP_URL e LDAP_BASE_DN obrigatorios quando AUTH_MODE!=dev");
  }
  return new LdapUserDirectory({
    url,
    baseDn,
    bindDn: env.LDAP_BIND_DN || undefined,
    bindPassword: env.LDAP_BIND_PASSWORD || undefined,
    userFilter: env.LDAP_USER_FILTER || "(sAMAccountName={{username}})",
  });
}

function escapeLdap(value: string): string {
  return value.replace(/[\\*()/\0]/g, (c) => `\\${c.charCodeAt(0).toString(16)}`);
}
