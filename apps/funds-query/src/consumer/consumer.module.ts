import { Module } from '@nestjs/common';
import { FundsDepositedModule } from './funds-deposited/funds-deposited.module';

@Module({
  imports: [FundsDepositedModule],
})
export class ConsumerModule {}
