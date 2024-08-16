import { AccountOpenedEvent } from "@app/common/events";
import { AccountEventProducer } from "@app/common/producer/account-event.producer";
import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

@EventsHandler(AccountOpenedEvent)
export class OpenAccountEventHandler implements IEventHandler<AccountOpenedEvent> {
    @Inject(AccountEventProducer)
    private readonly eventProducer: AccountEventProducer;

    public handle(event: AccountOpenedEvent): void {
        const { constructor }: AccountOpenedEvent = Object.getPrototypeOf(event);
        this.eventProducer.produce(constructor.name, event);
    }
}