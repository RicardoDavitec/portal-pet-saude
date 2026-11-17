import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { DocumentosController } from "./documentos.controller";

@Module({
  imports: [AuthModule],
  controllers: [DocumentosController],
})
export class DocumentosModule {}
