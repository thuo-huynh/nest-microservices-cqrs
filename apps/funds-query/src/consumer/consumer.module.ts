import { Module } from '@nestjs/common';
import { FundsDepositedModule } from './fund-deposited/funds-deposited.module';

@Module({
  imports: [FundsDepositedModule],
})
export class ConsumerModule {}
