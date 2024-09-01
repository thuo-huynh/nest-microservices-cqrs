import { FundsDepositedEvent } from '@app/common/events';
import { Controller, Inject } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { KafkaMessage } from 'kafkajs';

@Controller()
export class FundsDepositedConsumer {
  @Inject(EventBus)
  private readonly eventBus: EventBus;

  @MessagePattern('FundsDepositedEvent')
  private fundsDeposited(@Payload() message: KafkaMessage): void {
    const event: FundsDepositedEvent = plainToClass(FundsDepositedEvent, message);
    console.log('on FundsDepositedEvent', { event });

    this.eventBus.publish(event);
  }
}
