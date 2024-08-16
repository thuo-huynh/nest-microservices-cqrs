import { Test, TestingModule } from '@nestjs/testing';
import { AccountQueryController } from './account-query.controller';
import { AccountQueryService } from './account-query.service';

describe('AccountQueryController', () => {
  let accountQueryController: AccountQueryController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AccountQueryController],
      providers: [AccountQueryService],
    }).compile();

    accountQueryController = app.get<AccountQueryController>(AccountQueryController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(accountQueryController.getHello()).toBe('Hello World!');
    });
  });
});
