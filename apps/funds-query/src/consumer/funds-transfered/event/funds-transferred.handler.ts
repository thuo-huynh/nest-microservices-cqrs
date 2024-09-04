import { FundsTransferredEvent } from '@app/common/events';
import { Funds } from '@app/funds-query/common/entity/funds.entity';
import { FundsRepository } from '@app/funds-query/common/repository/funds.repository';
import { HttpException, HttpStatus } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

@EventsHandler(FundsTransferredEvent)
export class FundsTransferredHandler implements IEventHandler<FundsTransferredEvent> {
  @InjectRepository(FundsRepository)
  private readonly repository: FundsRepository;

  public async handle(event: FundsTransferredEvent): Promise<void> {
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

    this.repository.update(funds.id, { balance: funds.balance - event.amount });
  }
}
