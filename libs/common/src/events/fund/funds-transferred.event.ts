import { TransferFundsCommand } from '@app/common/commands/fund/transfer-funds.command';
import { BaseEvent } from 'nestjs-event-sourcing';

export class FundsTransferredEvent extends BaseEvent {
  public targetedId: string;
  public amount: number;

  constructor(command?: TransferFundsCommand) {
    super();

    if (!command) {
      return;
    }

    this.id = command.id;
    this.targetedId = command.getTargetedId();
    this.amount = command.getAmount();
  }
}
