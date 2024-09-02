import { HttpExceptionFilter } from '@app/common/filters/http-exception.filter';
import { BANK_FUNDS_COMMAND_PACKAGE_NAME } from '@app/common/protos/bank-funds-command.pb';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const logger: Logger = new Logger();
  await configure(app, config);

  app.listen(undefined, () => {
    logger.log(`[NOD] ${process.version}`);
    logger.log(`[ENV] ${process.env.NODE_ENV}`);
    logger.log(`[DKR] ${process.env.IS_DOCKER ? true : false}`);
    logger.log(`[KFK] ${config.get('KAFKA_URL')}`);
    logger.log(`[URL] ${config.get('FUNDS_COMMAND_GRPC_URL')}`);
  });
}

async function configure(app: INestApplication, config: ConfigService): Promise<void> {
  app.enableShutdownHooks();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.connectMicroservice(
    {
      transport: Transport.GRPC,
      options: {
        url: config.get('FUNDS_COMMAND_GRPC_URL'),
        package: BANK_FUNDS_COMMAND_PACKAGE_NAME,
        protoPath: 'protos/bank-funds-command.proto',
      },
    },
    { inheritAppConfig: true },
  );

  await app.startAllMicroservices();
}
bootstrap();
