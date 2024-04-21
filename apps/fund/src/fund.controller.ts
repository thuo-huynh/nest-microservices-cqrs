import { Controller, Get } from '@nestjs/common';
import { FundService } from './fund.service';

@Controller()
export class FundController {
  constructor(private readonly fundService: FundService) {}

  @Get()
  getHello(): string {
    return this.fundService.getHello();
  }
}
