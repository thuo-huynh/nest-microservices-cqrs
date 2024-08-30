import { NestFactory } from '@nestjs/core';
import { FundsCommandModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(FundsCommandModule);
  await app.listen(3000);
}
bootstrap();
