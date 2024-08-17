import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ConfigService } from '@nestjs/config';
import { Logger, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const logger: Logger = new Logger();
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<string>('PORT') || 3000;
  app.enableCors();
  app.enableVersioning({
    prefix: 'api',
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  await app.listen(port).then(async () => {
    const url = await app.getUrl();
    logger.log(`[NOD] ${process.version}`);
    logger.log(`[PORT] ${port}`);
    logger.log(`[URL] ${url}`);
    logger.log(`[ENV] ${process.env.NODE_ENV}`);
    logger.log(`[DKR] ${process.env.IS_DOCKER ? true : false}`);
  });;
}
bootstrap();
