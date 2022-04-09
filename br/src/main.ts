import {HttpAdapterHost, NestFactory} from '@nestjs/core';
import { AppModule } from './app.module';
import {Model} from "mongoose"
import {HttpExceptionFilter} from "./exceptions/http-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(8080);
}
bootstrap();
