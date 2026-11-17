import { Global, Module } from "@nestjs/common";
import { criarUserDirectoryFromEnv } from "@portal/ad-ldap";
import {
  getPrisma,
  PrismaSessionStore,
  PrismaUsuarioStore,
  PrismaVinculoStore,
  PrismaDocumentoStore,
} from "@portal/prisma-postgres";
import { G1DashboardHttpAdapter } from "@portal/g1-dashboard-http";
import { DevSeedService } from "./dev-seed.service";
import {
  CHATBOT_ANALYTICS,
  FAQ_CATALOG,
  SESSION_STORE,
  USER_DIRECTORY,
  USUARIO_STORE,
  VINCULO_STORE,
  DOCUMENTO_STORE,
} from "./tokens";

export * from "./tokens";

@Global()
@Module({
  providers: [
    DevSeedService,
    {
      provide: USER_DIRECTORY,
      useFactory: () => criarUserDirectoryFromEnv(process.env),
    },
    {
      provide: "PRISMA",
      useFactory: () => getPrisma(process.env.DATABASE_URL),
    },
    {
      provide: USUARIO_STORE,
      inject: ["PRISMA"],
      useFactory: (prisma: ReturnType<typeof getPrisma>) => new PrismaUsuarioStore(prisma),
    },
    {
      provide: SESSION_STORE,
      inject: ["PRISMA"],
      useFactory: (prisma: ReturnType<typeof getPrisma>) => new PrismaSessionStore(prisma),
    },
    {
      provide: VINCULO_STORE,
      inject: ["PRISMA"],
      useFactory: (prisma: ReturnType<typeof getPrisma>) => new PrismaVinculoStore(prisma),
    },
    {
      provide: DOCUMENTO_STORE,
      inject: ["PRISMA"],
      useFactory: (prisma: ReturnType<typeof getPrisma>) => new PrismaDocumentoStore(prisma),
    },
    {
      provide: FAQ_CATALOG,
      useFactory: () =>
        new G1DashboardHttpAdapter({
          baseUrl: process.env.G1_DASHBOARD_API_URL ?? "http://127.0.0.1:3813",
          serviceToken: process.env.G1_SERVICE_TOKEN,
        }),
    },
    {
      provide: CHATBOT_ANALYTICS,
      useExisting: FAQ_CATALOG,
    },
  ],
  exports: [
    USER_DIRECTORY,
    USUARIO_STORE,
    SESSION_STORE,
    VINCULO_STORE,
    DOCUMENTO_STORE,
    FAQ_CATALOG,
    CHATBOT_ANALYTICS,
  ],
})
export class InfrastructureModule {}
