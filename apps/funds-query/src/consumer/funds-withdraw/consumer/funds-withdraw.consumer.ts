import { FundsWithdrawnEvent } from '@app/common/events';
import { Controller, Inject } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { KafkaMessage } from 'kafkajs';

@Controller()
export class FundsWithdrawnConsumer {
  @Inject(EventBus)
  private readonly eventBus: EventBus;

  @MessagePattern('FundsWithdrawnEvent')
  private fundsWithdrawn(@Payload() { value }: KafkaMessage): void {
    const event: FundsWithdrawnEvent = plainToClass(FundsWithdrawnEvent, value);

    this.eventBus.publish(event);
  }
}
