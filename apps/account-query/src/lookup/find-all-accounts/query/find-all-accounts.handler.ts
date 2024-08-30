import { AccountRepository } from '@app/account-query/common/repository/account.repository';
import { FindAllAccountsResponseData } from '@app/common/protos/bank-account-query.pb';
import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllAccountsQuery } from './find-all-accounts.query';
import { Account } from '@app/account-query/common/entity/account.entity';

@QueryHandler(FindAllAccountsQuery)
export class FindAllAccountsQueryHandler implements ICommandHandler<FindAllAccountsQuery> {
  @InjectRepository(AccountRepository)
  private readonly repository: AccountRepository;

  public async execute(query: FindAllAccountsQuery): Promise<FindAllAccountsResponseData> {
    const take: number = 15;
    const total: number = await this.repository.count();
    const pageLength = Math.ceil(total / take) || 1;
    const page: number = query.page > pageLength ? 1 : query.page;
    const skip: number = page > 1 ? (page - 1) * take : 0;
    const accounts: Account[] = await this.repository.find({ skip, take, select: ['id', 'holder', 'isActive'] });
    return { accounts, page, total, count: accounts.length };
  }
}
