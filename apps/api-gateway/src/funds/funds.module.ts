import {
  BANK_FUNDS_COMMAND_PACKAGE_NAME,
  BANK_FUNDS_COMMAND_SERVICE_NAME,
} from '@app/common/protos/bank-funds-command.pb';
import { BANK_FUNDS_QUERY_PACKAGE_NAME, BANK_FUNDS_QUERY_SERVICE_NAME } from '@app/common/protos/bank-funds-query.pb';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FundsController } from './funds.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: BANK_FUNDS_COMMAND_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50054',
          package: BANK_FUNDS_COMMAND_PACKAGE_NAME,
          protoPath: 'protos/bank-funds-command.proto',
        },
      },
      {
        name: BANK_FUNDS_QUERY_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50053',
          package: BANK_FUNDS_QUERY_PACKAGE_NAME,
          protoPath: 'protos/bank-funds-query.proto',
        },
      },
    ]),
  ],
  controllers: [FundsController],
})
export class FundsModule {}
