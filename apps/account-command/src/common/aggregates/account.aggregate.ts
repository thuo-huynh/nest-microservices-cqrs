import { OpenAccountCommand } from '@app/common/commands';
import { AccountOpenedEvent } from '@app/common/events';
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
}