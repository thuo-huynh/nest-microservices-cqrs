import { NestFactory } from '@nestjs/core';
import { FundsQueryModule } from './funds-query.module';

async function bootstrap() {
  const app = await NestFactory.create(FundsQueryModule);
  await app.listen(3000);
}
bootstrap();
