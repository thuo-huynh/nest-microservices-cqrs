import { NestFactory } from '@nestjs/core';
import { AccountQueryModule } from './account-query.module';

async function bootstrap() {
  const app = await NestFactory.create(AccountQueryModule);
  await app.listen(3000);
}
bootstrap();
