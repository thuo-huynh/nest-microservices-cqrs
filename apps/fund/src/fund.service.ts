import { Injectable } from '@nestjs/common';

@Injectable()
export class FundService {
  getHello(): string {
    return 'Hello World!';
  }
}
