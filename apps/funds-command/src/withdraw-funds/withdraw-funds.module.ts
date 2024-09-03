import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventSourcingHandler } from 'nestjs-event-sourcing';

import { AccountEventProducer } from '@app/common/producer/account-event.producer';
import {
  BANK_ACCOUNT_QUERY_PACKAGE_NAME,
  BANK_ACCOUNT_QUERY_SERVICE_NAME,
} from '@app/common/protos/bank-account-query.pb';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WithdrawFundsHandler } from './commands/withdraw-funds.handler';
import { WithdrawFundsController } from './controllers/withdraw-funds.controller';
import { FundsWithdrawnHandler } from './events/funds-withdrawn.handler';

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
  controllers: [WithdrawFundsController],
  providers: [WithdrawFundsHandler, FundsWithdrawnHandler, AccountEventProducer, EventSourcingHandler],
})
export class WithdrawFundsModule {}
