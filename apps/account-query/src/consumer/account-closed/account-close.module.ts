import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountClosedHandler } from './event/account-closed.handler';
import { AccountRepository } from '../../common/repository/account.repository';
import { AccountClosedConsumer } from './consumer/account-closed.consumer';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([{ name: 'KAFKA_SERVICE', transport: Transport.KAFKA }]),
    TypeOrmModule.forFeature([AccountRepository]),
  ],
  controllers: [AccountClosedConsumer],
  providers: [AccountClosedHandler],
})
export class AccountClosedModule {}
