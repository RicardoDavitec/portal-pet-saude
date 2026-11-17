import { Controller, Get, Inject } from "@nestjs/common";
import type { UserDirectory } from "@portal/ports";
import { USER_DIRECTORY } from "../common/infrastructure.module";

@Controller("health")
export class HealthController {
  constructor(@Inject(USER_DIRECTORY) private readonly directory: UserDirectory) {}

  @Get()
  root() {
    return {
      status: "ok",
      service: "portal-api",
      authMode: process.env.AUTH_MODE ?? "dev",
      directory: this.directory.constructor.name,
      ts: new Date().toISOString(),
    };
  }

  @Get("live")
  live() {
    return { status: "live" };
  }
}
