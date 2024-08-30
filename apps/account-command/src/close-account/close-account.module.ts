import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingHandler } from 'nestjs-event-sourcing';

import { CloseAccountController } from './controllers/close-account.controller';
import { AccountClosedHandler } from './events/account-closed.handler';
import { CloseAccountHandler } from './command/close-account.handler';
import { AccountEventProducer } from '@app/common/producer/account-event.producer';

@Module({
  imports: [CqrsModule],
  controllers: [CloseAccountController],
  providers: [CloseAccountHandler, AccountClosedHandler, AccountEventProducer, EventSourcingHandler],
})
export class CloseAccountModule {}
