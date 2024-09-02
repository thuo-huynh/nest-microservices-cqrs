import { FundsWithdrawnEvent } from '@app/common/events/fund/funds-withdrawn.event';
import { AccountEventProducer } from '@app/common/producer/account-event.producer';
import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(FundsWithdrawnEvent)
export class FundsWithdrawnHandler implements IEventHandler<FundsWithdrawnEvent> {
  @Inject(AccountEventProducer)
  private readonly eventProducer: AccountEventProducer;

  public handle(event: FundsWithdrawnEvent): void {
    console.log('FundsWithdrawedHandler', { event });
    const { constructor }: FundsWithdrawnEvent = Object.getPrototypeOf(event);

    this.eventProducer.produce(constructor.name, event);
  }
}
