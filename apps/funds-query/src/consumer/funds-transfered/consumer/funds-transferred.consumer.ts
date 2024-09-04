import { FundsTransferredEvent } from '@app/common/events';
import { Controller, Inject } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { KafkaMessage } from 'kafkajs';

@Controller()
export class FundsTransferredConsumer {
  @Inject(EventBus)
  private readonly eventBus: EventBus;

  @MessagePattern('FundsTransferredEvent')
  private fundsTransferred(@Payload() message: KafkaMessage): void {
    const event: FundsTransferredEvent = plainToClass(FundsTransferredEvent, message);

    this.eventBus.publish(event);
  }
}
