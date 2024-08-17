import { BANK_ACCOUNT_COMMAND_PACKAGE_NAME, BANK_ACCOUNT_COMMAND_SERVICE_NAME } from '@app/common/protos/bank-account-command.pb';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AccountController } from './account.controller';
import { BANK_FUNDS_COMMAND_PACKAGE_NAME } from '@app/common/protos/bank-funds-command.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: BANK_ACCOUNT_COMMAND_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50042',
          package: BANK_ACCOUNT_COMMAND_PACKAGE_NAME,
          protoPath: 'protos/bank-account-command.proto',
        },
      },
    ]),
  ],
  controllers: [AccountController],
})
export class AccountModule { }
