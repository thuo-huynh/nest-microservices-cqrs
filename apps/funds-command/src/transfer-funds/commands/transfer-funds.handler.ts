import { TransferFundsCommand } from '@app/common/commands/fund/transfer-funds.command';
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

@CommandHandler(TransferFundsCommand)
export class TransferFundsHandler implements ICommandHandler<TransferFundsCommand> {
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

  public async execute(command: TransferFundsCommand): Promise<void | never> {
    let res: FindAccountResponse = await firstValueFrom(this.accountQueryService.findAccount({ id: command.id }));
    if (!res || !res.data) {
      throw new HttpException('Account not found!', HttpStatus.NOT_FOUND);
    }

    res = await firstValueFrom(this.accountQueryService.findAccount({ id: command.getTargetedId() }));
    if (!res || !res.data) {
      throw new HttpException('Targeted account not found!', HttpStatus.NOT_FOUND);
    }

    console.log('🚀 ~ TransferFundsHandler ~ execute ~ res:', command.getTargetedId(), res);
    const aggregate: AccountAggregate = await this.eventSourcingHandler.getById(AccountAggregate, command.id);
    if (command.getAmount() > aggregate.getBalance()) {
      throw new HttpException('Withdraw declined, insufficient funds!', HttpStatus.CONFLICT);
    }
    //@ts-ignore
    this.publisher.mergeObjectContext(aggregate);
    aggregate.transferFunds(command);
    await this.eventSourcingHandler.save(aggregate);
    aggregate.commit();
  }
}
