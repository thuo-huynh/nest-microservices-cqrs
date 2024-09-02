import {
  BANK_ACCOUNT_COMMAND_SERVICE_NAME,
  BankAccountCommandServiceClient,
  CloseAccountRequest,
  OpenAccountRequest,
  OpenAccountResponse,
} from '@app/common/protos/bank-account-command.pb';
import {
  BANK_ACCOUNT_QUERY_SERVICE_NAME,
  BankAccountQueryServiceClient,
  FindAccountRequest,
  FindAllAccountsRequest,
} from '@app/common/protos/bank-account-query.pb';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  OnModuleInit,
  Param,
  Post,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller({
  path: 'bank-account',
  version: '1',
})
export class AccountController implements OnModuleInit {
  private svcCommand: BankAccountCommandServiceClient;
  private svcQuery: BankAccountQueryServiceClient;

  @Inject(BANK_ACCOUNT_COMMAND_SERVICE_NAME)
  private readonly clientCommand: ClientGrpc;

  @Inject(BANK_ACCOUNT_QUERY_SERVICE_NAME)
  private readonly clientQuery: ClientGrpc;

  public onModuleInit(): void {
    this.svcCommand = this.clientCommand.getService<BankAccountCommandServiceClient>(BANK_ACCOUNT_COMMAND_SERVICE_NAME);
    this.svcQuery = this.clientQuery.getService<BankAccountQueryServiceClient>(BANK_ACCOUNT_QUERY_SERVICE_NAME);
  }

  constructor() {}

  @Get('find-one/:id')
  async findAccount(@Param('id') id: string) {
    const payload: FindAccountRequest = { id };
    return this.svcQuery.findAccount(payload);
  }

  @Get('find/:page')
  async findAllAccounts(@Param('page') page: number) {
    const payload: FindAllAccountsRequest = { page };
    return this.svcQuery.findAllAccounts(payload);
  }

  @Post('open')
  async openAccount(@Body() createAccountDto: OpenAccountRequest): Promise<Observable<OpenAccountResponse>> {
    try {
      return this.svcCommand.openAccount(createAccountDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_GATEWAY);
    }
  }

  @Delete('close/:id')
  async closeAccount(@Param('id') id: string) {
    const payload: CloseAccountRequest = { id };
    return this.svcCommand.closeAccount(payload);
  }
}
