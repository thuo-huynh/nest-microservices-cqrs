import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { Funds } from '@app/funds-query/common/entity/funds.entity';
import { FundsRepository } from '@app/funds-query/common/repository/funds.repository';
import { GetBalanceQuery } from './get-balance.query';

@QueryHandler(GetBalanceQuery)
export class GetBalanceQueryHandler implements ICommandHandler<GetBalanceQuery> {
  @InjectRepository(FundsRepository)
  private readonly repository: FundsRepository;

  public execute(query: GetBalanceQuery): Promise<Funds> {
    return this.repository.findOne(query.id);
  }
}
