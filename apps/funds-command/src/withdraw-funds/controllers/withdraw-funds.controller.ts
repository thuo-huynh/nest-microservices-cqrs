import { BANK_FUNDS_COMMAND_SERVICE_NAME, WithdrawFundsResponse } from '@app/common/protos/bank-funds-command.pb';
import { Body, Controller, HttpStatus, Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { WithdrawFundsDto } from './withdraw-funds.dto';
import { WithdrawFundsCommand } from '@app/common/commands/fund/withdraw-funds.command';

@Controller()
export class WithdrawFundsController {
  @Inject(CommandBus)
  private readonly commandBus: CommandBus;

  @GrpcMethod(BANK_FUNDS_COMMAND_SERVICE_NAME, 'WithdrawFunds')
  public async withdrawFunds(@Body() payload: WithdrawFundsDto): Promise<WithdrawFundsResponse> {
    console.log('GRPC WithdrawFunds');
    const command: WithdrawFundsCommand = new WithdrawFundsCommand(payload);
    await this.commandBus.execute(command);

    return { status: HttpStatus.OK, error: null };
  }
}
