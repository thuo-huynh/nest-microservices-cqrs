import { Module } from '@nestjs/common';
import { AccountOpenedModule } from './account-opened/account-open.module';
import { AccountClosedModule } from './account-closed/account-close.module';

@Module({ imports: [AccountOpenedModule, AccountClosedModule] })
export class ConsumerModule {}
