import { Module } from '@nestjs/common';
import { FundsCommandController } from './funds-command.controller';
import { FundsCommandService } from './funds-command.service';

@Module({
  imports: [],
  controllers: [FundsCommandController],
  providers: [FundsCommandService],
})
export class FundsCommandModule {}
