import { AccountClosedEvent } from '@app/common/events';
import { Controller, Inject } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { KafkaMessage } from 'kafkajs';

@Controller()
export class AccountClosedConsumer {
  @Inject(EventBus)
  private readonly eventBus: EventBus;

  @MessagePattern('AccountClosedEvent')
  private consume(@Payload() message: KafkaMessage): void {
    const event: AccountClosedEvent = plainToClass(AccountClosedEvent, message);

    this.eventBus.publish(event);
  }
}
