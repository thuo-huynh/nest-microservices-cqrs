import { DepositFundsCommand, OpenAccountCommand } from '@app/common/commands';
import { CloseAccountCommand } from '@app/common/commands/account/close-account.command';
import { AccountClosedEvent, AccountOpenedEvent, FundsDepositedEvent } from '@app/common/events';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ExtendedAggregateRoot } from 'nestjs-event-sourcing';

export class AccountAggregate extends ExtendedAggregateRoot {
  private active: boolean;
  private balance: number;

  public getActive(): boolean {
    return this.active;
  }

  public setActive(value: boolean) {
    this.active = value;
  }

  public getBalance(): number {
    return this.balance;
  }

  public setBalance(value: number) {
    this.balance = value;
  }

  public openAccount(command: OpenAccountCommand): void {
    console.log('AccountAggregate/openAccount');
    const event: AccountOpenedEvent = new AccountOpenedEvent(command);
    this.apply(event);
  }

  public onAccountOpenedEvent(event: AccountOpenedEvent): void {
    console.log('AccountAggregate/onAccountOpenedEvent');
    this.id = event.id;
    this.setActive(true);
    this.setBalance(event.openingBalance);
  }

  public closeAccount(command: CloseAccountCommand): void | never {
    if (!this.active) {
      throw new HttpException('This account is already closed!', HttpStatus.BAD_REQUEST);
    }
    const event: AccountClosedEvent = new AccountClosedEvent(command);
    this.apply(event);
  }

  public onAccountClosedEvent(event: AccountClosedEvent): void {
    console.log('AccountAggregate/onAccountClosedEvent');
    this.id = event.id;
    this.setActive(false);
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
