import { FundsReceivedEvent } from '@app/common/events/fund/funds-received.event';
import { AccountEventProducer } from '@app/common/producer/account-event.producer';
import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(FundsReceivedEvent)
export class FundsReceivedHandler implements IEventHandler<FundsReceivedEvent> {
  @Inject(AccountEventProducer)
  private readonly eventProducer: AccountEventProducer;

  public handle(event: FundsReceivedEvent): void {
    console.log('FundsReceivedEvent', { event });
    const { constructor }: FundsReceivedEvent = Object.getPrototypeOf(event);

    this.eventProducer.produce(constructor.name, event);
  }
}
