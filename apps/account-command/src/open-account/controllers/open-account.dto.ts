import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

import { AccountType } from '@app/common/enums';

export class OpenAccountDto {
  @IsString()
  @IsNotEmpty()
  public holder: string;

  @IsEmail()
  public email: string;

  @IsEnum(AccountType)
  public type: AccountType;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  @Min(0)
  public openingBalance: number;
}
