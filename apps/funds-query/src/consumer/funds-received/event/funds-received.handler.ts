import { FundsReceivedEvent } from '@app/common/events/fund/funds-received.event';
import { Funds } from '@app/funds-query/common/entity/funds.entity';
import { FundsRepository } from '@app/funds-query/common/repository/funds.repository';
import { HttpException, HttpStatus } from '@nestjs/common';
import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

@EventsHandler(FundsReceivedEvent)
export class FundsReceivedHandler implements IEventHandler<FundsReceivedEvent> {
  @InjectRepository(FundsRepository)
  private readonly repository: FundsRepository;

  public async handle(event: FundsReceivedEvent): Promise<void> {
    const funds: Funds = await this.repository.findOne(event.id);
    if (!funds) {
      throw new HttpException('No account found', HttpStatus.NO_CONTENT);
    }
    this.repository.update(event.id, { balance: funds.balance + event.amount });
  }
}
