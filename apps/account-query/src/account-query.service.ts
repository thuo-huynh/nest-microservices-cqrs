import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountQueryService {
  getHello(): string {
    return 'Hello World!';
  }
}
