import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import { LoggingInterceptor } from "./custom/interceptor/Logging.Interceptor";
import { TransformInterceptor } from "./custom/interceptor/TransformInterceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),);
  //전역으로 인터셉터 사용
    app.useGlobalInterceptors(new LoggingInterceptor(), new TransformInterceptor());

  app.setGlobalPrefix('/api');
  await app.listen(3000);
}
bootstrap();
