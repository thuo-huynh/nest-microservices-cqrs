import { Controller, Get } from '@nestjs/common';
import { FundsQueryService } from './funds-query.service';

@Controller()
export class FundsQueryController {
  constructor(private readonly fundsQueryService: FundsQueryService) {}

  @Get()
  getHello(): string {
    return this.fundsQueryService.getHello();
  }
}
