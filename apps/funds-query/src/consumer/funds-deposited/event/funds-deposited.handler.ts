import { FundsDepositedEvent } from '@app/common/events';
import { Funds } from '@app/funds-query/common/entity/funds.entity';
import { FundsRepository } from '@app/funds-query/common/repository/funds.repository';
import { HttpException, HttpStatus } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

@EventsHandler(FundsDepositedEvent)
export class FundsDepositedHandler implements IEventHandler<FundsDepositedEvent> {
  @InjectRepository(FundsRepository)
  private readonly repository: FundsRepository;

  public async handle(event: FundsDepositedEvent): Promise<void> {
    console.log('🚀 ~ FundsDepositedHandler ~ handle ~ event:', event);
    if (event.version === 0) {
      const funds: Funds = new Funds();
      funds.id = event.id;
      funds.balance = event.amount;

      await this.repository.save(funds);
      return;
    }
    const funds: Funds = await this.repository.findOne(event.id);
    if (!funds) {
      throw new HttpException('No account found', HttpStatus.NO_CONTENT);
    }
    this.repository.update(funds.id, { balance: funds.balance + event.amount });
  }
}
