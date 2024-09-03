import { DepositFundsCommand, ReceiveFundsCommand } from '@app/common/commands';
import { TransferFundsCommand } from '@app/common/commands/fund/transfer-funds.command';
import { WithdrawFundsCommand } from '@app/common/commands/fund/withdraw-funds.command';
import { FundsDepositedEvent, FundsTransferredEvent } from '@app/common/events';
import { FundsReceivedEvent } from '@app/common/events/fund/funds-received.event';
import { FundsWithdrawnEvent } from '@app/common/events/fund/funds-withdrawn.event';
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

  public withdrawFunds(command: WithdrawFundsCommand): void | never {
    const event: FundsDepositedEvent = new FundsWithdrawnEvent(command);
    this.apply(event);
  }

  public onFundsWithdrawnEvent(event: FundsWithdrawnEvent): void {
    this.id = event.id;
    this.setBalance(this.getBalance() - event.amount);
  }

  public receiveFunds(command: ReceiveFundsCommand): void | never {
    const event: FundsReceivedEvent = new FundsReceivedEvent(command);
    this.apply(event);
  }

  public onFundsReceivedEvent(event: FundsReceivedEvent): void {
    this.id = event.id;
    this.setBalance(this.getBalance() + event.amount);
  }

  public transferFunds(command: TransferFundsCommand): void | never {
    const event: FundsTransferredEvent = new FundsTransferredEvent(command);
    this.apply(event);
  }

  public onFundsTransferredEvent(event: FundsTransferredEvent): void {
    this.id = event.id;
    this.setBalance(this.getBalance() - event.amount);
  }
}
