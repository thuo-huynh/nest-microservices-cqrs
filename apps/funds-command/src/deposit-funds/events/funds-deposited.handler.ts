import { FundsDepositedEvent } from '@app/common/events';
import { AccountEventProducer } from '@app/common/producer/account-event.producer';
import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(FundsDepositedEvent)
export class FundsDepositedHandler implements IEventHandler<FundsDepositedEvent> {
  @Inject(AccountEventProducer)
  private readonly eventProducer: AccountEventProducer;

  public handle(event: FundsDepositedEvent): void {
    console.log('FundsDepositedHandler -------------------------', { event });
    const { constructor }: FundsDepositedEvent = Object.getPrototypeOf(event);

    console.log('🚀 ~ FundsDepositedHandler ~ handle ~ constructor.name:', constructor.name);
    this.eventProducer.produce(constructor.name, event);
  }
}
