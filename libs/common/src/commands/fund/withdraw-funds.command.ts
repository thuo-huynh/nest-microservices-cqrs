import { WithdrawFundsDto } from '@app/funds-command/withdraw-funds/controllers/withdraw-funds.dto';
import { BaseCommand } from 'nestjs-event-sourcing';

export class WithdrawFundsCommand extends BaseCommand {
  private amount: number;

  constructor(payload: WithdrawFundsDto) {
    super();

    this.id = payload.id;
    this.amount = payload.amount;
  }

  public getAmount(): number {
    return this.amount;
  }

  public setAmount(value: number) {
    this.amount = value;
  }
}
