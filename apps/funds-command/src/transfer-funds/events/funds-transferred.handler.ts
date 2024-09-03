import { FundsTransferredEvent } from '@app/common/events';
import { AccountEventProducer } from '@app/common/producer/account-event.producer';
import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(FundsTransferredEvent)
export class FundsTransferredHandler implements IEventHandler<FundsTransferredEvent> {
  @Inject(AccountEventProducer)
  private readonly eventProducer: AccountEventProducer;

  public handle(event: FundsTransferredEvent): void {
    console.log('FundsTransferredHandler', { event });
    const { constructor }: FundsTransferredEvent = Object.getPrototypeOf(event);

    this.eventProducer.produce(constructor.name, event);
  }
}
