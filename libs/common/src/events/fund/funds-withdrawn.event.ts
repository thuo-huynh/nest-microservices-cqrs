import { WithdrawFundsCommand } from '@app/common/commands/fund/withdraw-funds.command';
import { BaseEvent } from 'nestjs-event-sourcing';

export class FundsWithdrawnEvent extends BaseEvent {
  public amount: number;

  constructor(command?: WithdrawFundsCommand) {
    super();

    if (!command) {
      return;
    }

    this.id = command.id;
    this.amount = command.getAmount();
  }
}
