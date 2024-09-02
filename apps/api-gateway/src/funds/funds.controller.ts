import {
  BANK_FUNDS_COMMAND_SERVICE_NAME,
  BankFundsCommandServiceClient,
  DepositFundsRequest,
  DepositFundsResponse,
  TransferFundsRequest,
  TransferFundsResponse,
  WithdrawFundsRequest,
  WithdrawFundsResponse,
} from '@app/common/protos/bank-funds-command.pb';
import {
  BANK_FUNDS_QUERY_SERVICE_NAME,
  BankFundsQueryServiceClient,
  GetBalanceRequest,
} from '@app/common/protos/bank-funds-query.pb';
import { Body, Controller, Get, Inject, OnModuleInit, Param, Put } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller({
  path: 'bank-funds',
  version: '1',
})
export class FundsController implements OnModuleInit {
  private commandSvc: BankFundsCommandServiceClient;
  private querySvc: BankFundsQueryServiceClient;

  @Inject(BANK_FUNDS_COMMAND_SERVICE_NAME)
  private readonly clientCommand: ClientGrpc;

  @Inject(BANK_FUNDS_QUERY_SERVICE_NAME)
  private readonly clientQuery: ClientGrpc;

  public onModuleInit(): void {
    this.commandSvc = this.clientCommand.getService<BankFundsCommandServiceClient>(BANK_FUNDS_COMMAND_SERVICE_NAME);
    this.querySvc = this.clientQuery.getService<BankFundsQueryServiceClient>(BANK_FUNDS_QUERY_SERVICE_NAME);
  }

  constructor() {}

  @Get('get-balance')
  getBalance(@Param('id') id: string) {
    const payload: GetBalanceRequest = { id };
    return this.querySvc.getBalance(payload);
  }

  @Put('deposit-funds')
  async depositFunds(
    @Param('id') id: string,
    @Body() depositFundsRequest: DepositFundsRequest,
  ): Promise<Observable<DepositFundsResponse>> {
    depositFundsRequest.id = id;
    return this.commandSvc.depositFunds(depositFundsRequest);
  }

  @Put('transfer-funds')
  async transferFunds(
    @Param('id') id: string,
    @Body() transferFundsRequest: TransferFundsRequest,
  ): Promise<Observable<TransferFundsResponse>> {
    transferFundsRequest.fromId = id;
    return this.commandSvc.transferFunds(transferFundsRequest);
  }

  @Put('withdraw-funds')
  async withdrawFunds(
    @Param('id') id: string,
    @Body() withdrawFundsRequest: WithdrawFundsRequest,
  ): Promise<Observable<WithdrawFundsResponse>> {
    withdrawFundsRequest.id = id;
    return this.commandSvc.withdrawFunds(withdrawFundsRequest);
  }
}
