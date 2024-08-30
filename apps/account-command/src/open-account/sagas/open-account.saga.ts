import { AccountOpenedEvent } from '@app/common/events';
import {
  BANK_FUNDS_COMMAND_SERVICE_NAME,
  BankFundsCommandServiceClient,
  DepositFundsRequest,
  DepositFundsResponse,
} from '@app/common/protos/bank-funds-command.pb';
import { BANK_FUNDS_QUERY_SERVICE_NAME } from '@app/common/protos/bank-funds-query.pb';
import { Inject, OnModuleInit } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { ClientGrpc } from '@nestjs/microservices';
import { delay, firstValueFrom, map, Observable } from 'rxjs';

export class OpenAccountSaga implements OnModuleInit {
  @Inject(BANK_FUNDS_QUERY_SERVICE_NAME)
  private readonly client: ClientGrpc;

  private bankFundsCommandService: BankFundsCommandServiceClient;

  public onModuleInit() {
    this.bankFundsCommandService = this.client.getService<BankFundsCommandServiceClient>(
      BANK_FUNDS_COMMAND_SERVICE_NAME,
    );
  }

  @Saga()
  private onEvent(events$: Observable<AccountOpenedEvent>): Observable<ICommand> {
    const apply = map((event: AccountOpenedEvent) => {
      this.onAcountOpenedEvent(event);
      return null;
    });

    return <Observable<ICommand>>events$.pipe(ofType(AccountOpenedEvent), delay(1000), apply);
  }

  private async onAcountOpenedEvent(event: AccountOpenedEvent): Promise<void> {
    console.log('OpenAccountSaga/accountOpened', { event });
    const payload: DepositFundsRequest = { id: event.id, amount: event.openingBalance };
    const res: DepositFundsResponse = await firstValueFrom(this.bankFundsCommandService.depositFunds(payload));
    console.log('🚀 ~ OpenAccountSaga ~ onAcountOpenedEvent ~ payload:', payload);
    console.log('🚀 ~ OpenAccountSaga ~ onAcountOpenedEvent ~ res:', res);
  }
}
