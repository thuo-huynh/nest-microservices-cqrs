import {
  BANK_ACCOUNT_COMMAND_PACKAGE_NAME,
  BANK_ACCOUNT_COMMAND_SERVICE_NAME,
} from '@app/common/protos/bank-account-command.pb';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AccountController } from './account.controller';
import {
  BANK_ACCOUNT_QUERY_PACKAGE_NAME,
  BANK_ACCOUNT_QUERY_SERVICE_NAME,
} from '@app/common/protos/bank-account-query.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: BANK_ACCOUNT_COMMAND_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: BANK_ACCOUNT_COMMAND_PACKAGE_NAME,
          protoPath: 'protos/bank-account-command.proto',
        },
      },
      {
        name: BANK_ACCOUNT_QUERY_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          package: BANK_ACCOUNT_QUERY_PACKAGE_NAME,
          protoPath: 'protos/bank-account-query.proto',
        },
      },
    ]),
  ],
  controllers: [AccountController],
})
export class AccountModule {}
