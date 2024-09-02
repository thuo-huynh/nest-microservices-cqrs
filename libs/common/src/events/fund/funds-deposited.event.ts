import { DepositFundsCommand } from '@app/common/commands';
import { BaseEvent } from 'nestjs-event-sourcing';

export class FundsDepositedEvent extends BaseEvent {
  public amount: number;

  constructor(command?: DepositFundsCommand) {
    console.log('🚀 ~ FundsDepositedEvent ~ constructor ~ command:', command);
    super();

    if (!command) {
      return;
    }

    this.id = command.id;
    this.amount = command.getAmount();
  }
}
