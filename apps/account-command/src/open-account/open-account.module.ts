import { AccountEventProducer } from "@app/common/producer/account-event.producer";
import { BANK_FUNDS_COMMAND_PACKAGE_NAME } from "@app/common/protos/bank-funds-command.pb";
import { BANK_FUNDS_QUERY_SERVICE_NAME } from "@app/common/protos/bank-funds-query.pb";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { EventSourcingHandler } from "nestjs-event-sourcing";
import { OpenAccountCommandHandler } from "./commands/open-account.handler";
import { OpenAccountController } from "./controllers/open-account.controler";
import { OpenAccountEventHandler } from "./events/account-opened.handler";


@Module({
  imports: [
    CqrsModule,
    // ClientsModule.registerAsync([
    //   {
    //     name: BANK_FUNDS_QUERY_SERVICE_NAME,
    //     imports: [ConfigModule],
    //     useFactory: (config: ConfigService) => ({
    //       transport: Transport.GRPC,
    //       options: {
    //         url: config.get('BANK_FUNDS_COMMAND_GRPC_URL'),
    //         package: BANK_FUNDS_COMMAND_PACKAGE_NAME,
    //         protoPath: 'protos/bank-account-command.proto',
    //       },
    //     }),
    //     inject: [ConfigService],
    //   },
    // ]),
  ],
  controllers: [OpenAccountController],
  providers: [OpenAccountCommandHandler, OpenAccountEventHandler, AccountEventProducer, EventSourcingHandler],
})
export class OpenAccountModule { }
