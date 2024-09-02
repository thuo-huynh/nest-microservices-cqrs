import { DepositFundsCommand } from '@app/common/commands';
import { FundsDepositedEvent } from '@app/common/events';
import { ExtendedAggregateRoot } from 'nestjs-event-sourcing';

export class AccountAggregate extends ExtendedAggregateRoot {
  private balance: number;

  constructor() {
    super();

    this.balance = 0;
  }

  public getBalance(): number {
    return this.balance;
  }

  public setBalance(value: number) {
    this.balance = value;
  }

  public depositFunds(command: DepositFundsCommand): void | never {
    console.log('🚀 ~ AccountAggregate ~ depositFunds ~ command:', command);
    const event: FundsDepositedEvent = new FundsDepositedEvent(command);
    this.apply(event);
  }

  public onFundsDepositedEvent(event: FundsDepositedEvent): void {
    this.id = event.id;
    this.setBalance(this.getBalance() + event.amount);
  }
}
