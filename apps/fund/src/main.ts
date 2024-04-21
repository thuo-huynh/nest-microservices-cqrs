import { NestFactory } from '@nestjs/core';
import { FundModule } from './fund.module';

async function bootstrap() {
  const app = await NestFactory.create(FundModule);
  await app.listen(3000);
}
bootstrap();
