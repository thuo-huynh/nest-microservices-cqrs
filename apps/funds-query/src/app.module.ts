import { Module } from '@nestjs/common';
import { FundsDepositedModule } from './consumer/fund-deposited/funds-deposited.module';

@Module({
  imports: [FundsDepositedModule],
  controllers: [],
  providers: [],
})
export class FundsQueryModule {}
