import { ReceiveFundsCommand } from '@app/common/commands';
import { BankAccountQueryServiceClient } from '@app/common/protos/bank-account-query.pb';
import { AccountAggregate } from '@app/funds-command/common/aggregates/account.aggregate';
import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { EventSourcingHandler } from 'nestjs-event-sourcing';

@CommandHandler(ReceiveFundsCommand)
export class ReceiveFundsHandler implements ICommandHandler<ReceiveFundsCommand> {
  private accountQueryService: BankAccountQueryServiceClient;

  @Inject(EventSourcingHandler)
  private readonly eventSourcingHandler: EventSourcingHandler<AccountAggregate>;

  @Inject(EventPublisher)
  private readonly publisher: EventPublisher;

  public async execute(command: ReceiveFundsCommand): Promise<any | never> {
    const aggregate: AccountAggregate = await this.eventSourcingHandler.getById(AccountAggregate, command.id);
    //@ts-ignore
    this.publisher.mergeObjectContext(aggregate);
    aggregate.receiveFunds(command);

    await this.eventSourcingHandler.save(aggregate);

    aggregate.commit();
  }
}
