import { Account } from '@app/account-query/common/entity/account.entity';
import { AccountRepository } from '@app/account-query/common/repository/account.repository';
import { AccountClosedEvent } from '@app/common/events';
import { HttpException, HttpStatus } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

@EventsHandler(AccountClosedEvent)
export class AccountClosedHandler implements IEventHandler<AccountClosedEvent> {
  @InjectRepository(AccountRepository)
  private repository: AccountRepository;

  public async handle(event: AccountClosedEvent) {
    const account: Account = await this.repository.findOne(event.id);

    if (!account) {
      throw new HttpException('No account found', HttpStatus.NO_CONTENT);
    }

    this.repository.update(account.id, { isActive: false });
  }
}
