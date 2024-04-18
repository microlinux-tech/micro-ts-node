import "dotenv/config";
import App from "@/app";
import { UserController } from "@controllers/user.controller";

async function bootstrap() {
  const port = process.env.APP_PORT ? Number(process.env.APP_PORT) : 3000;
  const app = new App([UserController], port, "/v1");
  await app.listen();
}

bootstrap();
