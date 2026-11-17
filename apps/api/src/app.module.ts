import { Module } from "@nestjs/common";
import { HealthModule } from "./health/health.module";
import { AuthModule } from "./auth/auth.module";
import { VinculosModule } from "./vinculos/vinculos.module";
import { G1Module } from "./g1/g1.module";
import { DocumentosModule } from "./documentos/documentos.module";
import { SobreModule } from "./sobre/sobre.module";
import { RelatoriosModule } from "./relatorios/relatorios.module";
import { InfrastructureModule } from "./common/infrastructure.module";

@Module({
  imports: [
    InfrastructureModule,
    HealthModule,
    AuthModule,
    VinculosModule,
    G1Module,
    DocumentosModule,
    SobreModule,
    RelatoriosModule,
  ],
})
export class AppModule {}
