import { DepositFundsRequest } from '@app/common/protos/bank-funds-command.pb';
import { IsNumber, IsUUID, Min } from 'class-validator';

export class DepositFundsDto implements DepositFundsRequest {
  @IsUUID()
  public id: string;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  @Min(1)
  public amount: number;
}
