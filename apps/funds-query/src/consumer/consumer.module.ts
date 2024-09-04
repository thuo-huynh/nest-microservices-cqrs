import { Module } from '@nestjs/common';
import { FundsDepositedModule } from './funds-deposited/funds-deposited.module';
import { FundsReceivedModule } from './funds-received/funds-received.module';
import { FundsTransferredModule } from './funds-transfered/funds-transferred.module';
import { FundsWithdrawnModule } from './funds-withdraw/funds-withdraw.module';

@Module({
  imports: [FundsDepositedModule, FundsReceivedModule, FundsTransferredModule, FundsWithdrawnModule],
})
export class ConsumerModule {}
