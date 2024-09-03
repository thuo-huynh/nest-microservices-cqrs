import { ReceiveFundsCommand } from '@app/common/commands';
import { BaseEvent } from 'nestjs-event-sourcing';

export class FundsReceivedEvent extends BaseEvent {
  public amount: number;

  constructor(command?: ReceiveFundsCommand) {
    super();

    if (!command) {
      return;
    }

    this.id = command.id;
    this.amount = command.getAmount();
  }
}
