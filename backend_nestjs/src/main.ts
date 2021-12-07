import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.use(logger) => 미들웨어를 모든 경로에 등록 use() 사용
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),);
  app.setGlobalPrefix('/api');
  await app.listen(3000);
}
bootstrap();
