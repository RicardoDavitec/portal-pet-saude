import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { VinculosController } from "./vinculos.controller";

@Module({
  imports: [AuthModule],
  controllers: [VinculosController],
})
export class VinculosModule {}
