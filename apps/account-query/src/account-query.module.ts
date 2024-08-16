import { Module } from '@nestjs/common';
import { AccountQueryController } from './account-query.controller';
import { AccountQueryService } from './account-query.service';

@Module({
  imports: [],
  controllers: [AccountQueryController],
  providers: [AccountQueryService],
})
export class AccountQueryModule {}
