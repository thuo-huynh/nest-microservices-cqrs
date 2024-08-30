import { AccountOpenedEvent } from "@app/common/events";
import { Controller, Inject } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { plainToClass } from 'class-transformer';
import { KafkaMessage } from "kafkajs";

@Controller()
export class AccountOpenedConsumer {
    @Inject(EventBus)
    private readonly eventBus: EventBus;

    @MessagePattern('AccountOpenedEvent')
    private consume(@Payload() message: KafkaMessage): void {
        console.log("🚀 ~ AccountOpenedConsumer ~ consume ~ value:", message)
        const event: AccountOpenedEvent = plainToClass(AccountOpenedEvent, message);

        this.eventBus.publish(event);
    }
}