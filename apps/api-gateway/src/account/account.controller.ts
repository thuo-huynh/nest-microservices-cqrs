import { BANK_ACCOUNT_COMMAND_PACKAGE_NAME, BANK_ACCOUNT_COMMAND_SERVICE_NAME, BankAccountCommandServiceClient, OpenAccountRequest, OpenAccountResponse } from '@app/common/protos/bank-account-command.pb';
import { Body, Controller, HttpException, HttpStatus, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller({
  path: 'bank-account',
  version: '1',
})
export class AccountController implements OnModuleInit {
  private svc: BankAccountCommandServiceClient;

  @Inject(BANK_ACCOUNT_COMMAND_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc =
      this.client.getService<BankAccountCommandServiceClient>(BANK_ACCOUNT_COMMAND_SERVICE_NAME);
  }

  constructor() { }


  // @Get('find-one/:id')
  // findAccount(@Param('id') id: string) {
  //   return this.accountService.findAccount(id);
  // }

  // @Get('find/:page')
  // findAllAccounts(@Param('page') page: number) {
  //   return this.accountService.findAllAccounts(page);
  // }

  @Post('open')
  async openAccount(@Body() createAccountDto: OpenAccountRequest): Promise<Observable<OpenAccountResponse>> {
    try {
      return this.svc.openAccount(createAccountDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_GATEWAY);
    }
  }

  // @Delete('close/:id')
  // closeAccount(@Param('id') id: string) {
  //   return this.accountService.closeAccount(id);
  // }
}
