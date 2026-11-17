import { PrismaClient } from "@prisma/client";

let singleton: PrismaClient | undefined;

export function getPrisma(url?: string): PrismaClient {
  if (!singleton) {
    singleton = new PrismaClient(url ? { datasources: { db: { url } } } : undefined);
  }
  return singleton;
}
