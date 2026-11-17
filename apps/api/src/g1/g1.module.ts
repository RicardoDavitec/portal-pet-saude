import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { G1Controller } from "./g1.controller";

@Module({
  imports: [AuthModule],
  controllers: [G1Controller],
})
export class G1Module {}
