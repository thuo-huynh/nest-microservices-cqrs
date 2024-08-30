import { AccountClosedEvent } from '@app/common/events';
import { AccountEventProducer } from '@app/common/producer/account-event.producer';
import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(AccountClosedEvent)
export class AccountClosedHandler implements IEventHandler<AccountClosedEvent> {
  @Inject(AccountEventProducer)
  private readonly eventProducer: AccountEventProducer;

  public async handle(event: AccountClosedEvent) {
    console.log('AccountClosedHandler/handle PUBLISH');

    const { constructor }: AccountClosedEvent = Object.getPrototypeOf(event);
    this.eventProducer.produce(constructor.name, event);
  }
}
