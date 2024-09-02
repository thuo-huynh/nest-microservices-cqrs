import { DepositFundsCommand } from '@app/common/commands';
import {
  BANK_ACCOUNT_QUERY_SERVICE_NAME,
  BankAccountQueryServiceClient,
  FindAccountResponse,
} from '@app/common/protos/bank-account-query.pb';
import { AccountAggregate } from '@app/funds-command/common/aggregates/account.aggregate';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ClientGrpc } from '@nestjs/microservices';
import { EventSourcingHandler } from 'nestjs-event-sourcing';
import { firstValueFrom } from 'rxjs';

@CommandHandler(DepositFundsCommand)
export class DepositFundsHandler implements ICommandHandler<DepositFundsCommand> {
  private accountQueryService: BankAccountQueryServiceClient;

  @Inject(EventSourcingHandler)
  private readonly eventSourcingHandler: EventSourcingHandler<AccountAggregate>;

  @Inject(EventPublisher)
  private readonly publisher: EventPublisher;

  @Inject(BANK_ACCOUNT_QUERY_SERVICE_NAME)
  private readonly accountClient: ClientGrpc;

  public onModuleInit() {
    this.accountQueryService = this.accountClient.getService<BankAccountQueryServiceClient>(
      BANK_ACCOUNT_QUERY_SERVICE_NAME,
    );
  }

  public async execute(command: DepositFundsCommand): Promise<void | never> {
    console.log('🚀 ~ DepositFundsHandler ~ execute ~ command:', command);
    const res: FindAccountResponse = await firstValueFrom(this.accountQueryService.findAccount({ id: command.id }));
    if (!res || !res.data) {
      throw new HttpException('Account not found!', HttpStatus.NOT_FOUND);
    }

    const aggregate: AccountAggregate = await this.eventSourcingHandler.getById(AccountAggregate, command.id);
    console.log('-------------', aggregate);
    console.log('-------------', aggregate.getBalance());
    //@ts-ignore
    this.publisher.mergeObjectContext(aggregate);
    aggregate.depositFunds(command);
    await this.eventSourcingHandler.save(aggregate);

    aggregate.commit();
  }
}
