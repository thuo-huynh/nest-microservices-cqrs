import { AccountAggregate } from '@app/account-command/common/aggregates/account.aggregate';
import { OpenAccountCommand } from '@app/common/commands';
import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { EventSourcingHandler } from 'nestjs-event-sourcing';


@CommandHandler(OpenAccountCommand)
export class OpenAccountCommandHandler implements ICommandHandler<OpenAccountCommand> {
    @Inject(EventSourcingHandler)
    private readonly eventSourcingHandler: EventSourcingHandler<AccountAggregate>;

    @Inject(EventPublisher)
    private readonly publisher: EventPublisher;

    public async execute(command: OpenAccountCommand): Promise<void> {
        const aggregate: AccountAggregate = new AccountAggregate();
        //@ts-ignore
        this.publisher.mergeObjectContext(aggregate);
        aggregate.openAccount(command);

        // Event sourcing insert into record history into mongo database
        await this.eventSourcingHandler.save(aggregate);

        aggregate.commit();
    }
}