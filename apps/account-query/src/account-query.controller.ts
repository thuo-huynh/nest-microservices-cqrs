import { Controller, Get } from '@nestjs/common';
import { AccountQueryService } from './account-query.service';

@Controller()
export class AccountQueryController {
  constructor(private readonly accountQueryService: AccountQueryService) {}

  @Get()
  getHello(): string {
    return this.accountQueryService.getHello();
  }
}
