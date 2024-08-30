import { Controller, Get } from '@nestjs/common';
import { FundsCommandService } from './funds-command.service';

@Controller()
export class FundsCommandController {
  constructor(private readonly fundsCommandService: FundsCommandService) {}

  @Get()
  getHello(): string {
    return this.fundsCommandService.getHello();
  }
}
