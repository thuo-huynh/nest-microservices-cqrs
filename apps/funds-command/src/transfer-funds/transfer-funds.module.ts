import { AccountEventProducer } from '@app/common/producer/account-event.producer';
import {
  BANK_ACCOUNT_QUERY_PACKAGE_NAME,
  BANK_ACCOUNT_QUERY_SERVICE_NAME,
} from '@app/common/protos/bank-account-query.pb';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventSourcingHandler } from 'nestjs-event-sourcing';
import { TransferFundsHandler } from './commands/transfer-funds.handler';
import { TransferFundsController } from './controllers/transfer-funds.controller';
import { FundsTransferredHandler } from './events/funds-transferred.handler';
import { TransferFundsSaga } from './sagas/transfer-funds.saga';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.registerAsync([
      {
        name: BANK_ACCOUNT_QUERY_SERVICE_NAME,
        imports: [ConfigModule],
        useFactory: (config: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: config.get('BANK_ACCOUNT_QUERY_GRPC_URL'),
            package: BANK_ACCOUNT_QUERY_PACKAGE_NAME,
            protoPath: 'protos/bank-account-query.proto',
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [TransferFundsController],
  providers: [
    TransferFundsHandler,
    FundsTransferredHandler,
    AccountEventProducer,
    EventSourcingHandler,
    TransferFundsSaga,
  ],
})
export class TransferFundsModule {}
