import { Module } from '@nestjs/common';
import { FundsQueryController } from './funds-query.controller';
import { FundsQueryService } from './funds-query.service';

@Module({
  imports: [],
  controllers: [FundsQueryController],
  providers: [FundsQueryService],
})
export class FundsQueryModule {}
