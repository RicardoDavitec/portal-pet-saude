import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { SobreController } from "./sobre.controller";

@Module({
  imports: [AuthModule],
  controllers: [SobreController],
})
export class SobreModule {}
