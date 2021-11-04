import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './cats/etc_tutorial/validation-pipe/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.use(logger) => 미들웨어를 모든 경로에 등록 use() 사용
  //pp.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api');
  await app.listen(3000);
}
bootstrap();
