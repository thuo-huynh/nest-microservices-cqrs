import { Injectable } from '@nestjs/common';

@Injectable()
export class FundsQueryService {
  getHello(): string {
    return 'Hello World!';
  }
}
