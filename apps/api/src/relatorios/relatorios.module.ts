import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { RelatoriosController } from "./relatorios.controller";

@Module({
  imports: [AuthModule],
  controllers: [RelatoriosController],
})
export class RelatoriosModule {}
