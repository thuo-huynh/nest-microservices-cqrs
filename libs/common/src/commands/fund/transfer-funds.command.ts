import { TransferFundsDto } from '@app/funds-command/transfer-funds/controllers/transfer-funds.dto';
import { BaseCommand } from 'nestjs-event-sourcing';

export class TransferFundsCommand extends BaseCommand {
  private targetedId: string;
  private amount: number;

  constructor(payload: TransferFundsDto) {
    super();

    this.id = payload.fromId;
    this.targetedId = payload.toId;
    this.amount = payload.amount;
  }

  public getTargetedId(): string {
    return this.targetedId;
  }

  public setTargetedId(value: string) {
    this.targetedId = value;
  }

  public getAmount(): number {
    return this.amount;
  }

  public setAmount(value: number) {
    this.amount = value;
  }
}
