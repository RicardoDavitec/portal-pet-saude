import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // NPM (1 salto) — necessário para IP real do cliente no rodapé.
  app.set("trust proxy", 1);
  app.enableCors({
    origin: (process.env.CORS_ORIGINS ?? "http://127.0.0.1:3862,http://localhost:3862")
      .split(",")
      .map((o) => o.trim())
      .filter(Boolean),
    credentials: true,
  });
  app.setGlobalPrefix("api");
  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port, "0.0.0.0");
  // eslint-disable-next-line no-console
  console.log(`portal-api listening on 0.0.0.0:${port}`);
}
bootstrap();
